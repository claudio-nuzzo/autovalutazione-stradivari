const { launchBrowser } = require('./browser-runtime.cjs');
const assert = require('node:assert/strict');
const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
(async () => {
  const root=path.resolve('autovalutazione-app');
  const server=http.createServer((req,res)=>{ const name=new URL(req.url,'http://localhost').pathname; const f=path.resolve(root,'.'+(name==='/'?'/index.html':name));
    if(!f.startsWith(root+path.sep)){res.writeHead(404);return res.end();}
    try {res.setHeader('content-type',f.endsWith('.js')?'text/javascript':f.endsWith('.css')?'text/css':'text/html');res.end(fs.readFileSync(f));} catch {res.writeHead(404);res.end();} });
  await new Promise(r=>server.listen(0,'127.0.0.1',r));
  const origin=`http://127.0.0.1:${server.address().port}`;
  const browser=await launchBrowser();
  const files=[]; let next=0;
  async function pageFor(email='studente@istitutostradivari.it', driveEmail=email, options={}) {
    let releaseAbout; const aboutGate = new Promise(resolve=>{releaseAbout=resolve;});
    const context=await browser.newContext({viewport:{width:390,height:844}}); const page=await context.newPage();
    await page.addInitScript(()=>{const original=window.setTimeout;window.setTimeout=(fn,ms,...args)=>original(fn,ms===15000?100:ms,...args);});
    await page.route('**/*',async route=>{
      const req=route.request(), u=new URL(req.url());
      if (u.origin===origin) return route.continue();
      if (u.hostname==='www.googleapis.com' && u.pathname==='/drive/v3/about') { if(options.holdAbout) await aboutGate; return route.fulfill({json:{user:{emailAddress:driveEmail}}}); }
      if (u.hostname==='www.googleapis.com' && u.pathname==='/drive/v3/changes/startPageToken') return route.fulfill({json:{startPageToken:String(next)}});
      if (u.hostname==='www.googleapis.com' && u.pathname==='/drive/v3/changes') {const cursor=Number(u.searchParams.get('pageToken'));return route.fulfill({json:{changes:files.filter(f=>f.seq>cursor).map(f=>({fileId:f.id,file:f})),newStartPageToken:String(next)}});}
      if (u.hostname==='www.googleapis.com' && u.pathname==='/drive/v3/files') {const offset=Number(u.searchParams.get('pageToken')||0), limit=1000; return route.fulfill({json:{files:files.slice(offset,offset+limit),...(offset+limit<files.length?{nextPageToken:String(offset+limit)}:{})}});}
      if (u.hostname==='www.googleapis.com' && /^\/drive\/v3\/files\//.test(u.pathname)) {const file=files.find(f=>f.id===u.pathname.split('/').at(-1)); return route.fulfill({json:file.body});}
      if (u.hostname==='www.googleapis.com' && u.pathname==='/upload/drive/v3/files') {
        const text=req.postData(); const matches=[...text.matchAll(/\{[^\r\n]+\}/g)].map(x=>JSON.parse(x[0]));
        const file={id:`file${++next}`,seq:next,name:matches[0].name,appProperties:matches[0].appProperties,body:matches[1],modifiedTime:new Date().toISOString()};files.push(file); return route.fulfill({json:{id:file.id}});
      }
      return route.abort();
    });
    await page.goto(origin); await page.waitForFunction(()=>window.StradivariAppReady === true);
    await page.evaluate(email=>{window.StradivariUser={email};window.StradilabAuth.idToken=()=> 'test'; window.google={accounts:{oauth2:{initTokenClient:({callback})=>({requestAccessToken:()=>callback({access_token:'synthetic',expires_in:3600})})}}};},email);
    return {context,page,releaseAbout};
  }
  try {
    const unsupported=await browser.newContext({viewport:{width:390,height:844}});const unsupportedPage=await unsupported.newPage();
    await unsupportedPage.addInitScript(()=>Object.defineProperty(navigator,'locks',{value:undefined}));
    await unsupportedPage.route('**/*',r=>new URL(r.request().url()).origin===origin?r.continue():r.abort());await unsupportedPage.goto(origin);
    await unsupportedPage.getByText('Questo browser non permette di proteggere i progressi tra schede.',{exact:false}).waitFor();
    assert.equal(await unsupportedPage.locator('#tabLockDialog').evaluate(e=>e.open),true); await unsupported.close();
    const tabs=await pageFor();
    const other=await tabs.context.newPage(); await other.route('**/*',r=>new URL(r.request().url()).origin===origin?r.continue():r.abort());
    await other.goto(origin); await other.getByText('Didattica e metodi è già aperto in un’altra scheda di questo browser.',{exact:false}).waitFor();
    assert.equal(await other.locator('#tabLockDialog').evaluate(e=>e.open),true);
    assert.equal(await other.evaluate(()=>!!window.StradilabAuth),false,'blocked tab must not initialise authentication or modules');
    await tabs.page.close(); await other.getByRole('button',{name:'Riprova',exact:true}).click();
    await other.waitForFunction(()=>!document.getElementById('tabLockDialog').open); await tabs.context.close();
    const held=await pageFor('studente@istitutostradivari.it','studente@istitutostradivari.it',{holdAbout:true});
    await held.page.evaluate(()=>localStorage.setItem('stradivari-study-v1:studente@istitutostradivari.it',JSON.stringify({step:1})));
    await held.page.click('#driveSyncConnect');
    await held.page.evaluate(()=>document.dispatchEvent(new Event('stradivari-study-saved')));
    await held.page.waitForTimeout(250); assert.equal(files.length,0,'must not write before Drive identity verification');
    held.releaseAbout(); await held.page.getByText('Progressi sincronizzati su Drive.').waitFor();
    assert.equal(files.length,1); files.splice(0); await held.context.close();
    const switched=await pageFor('studente@istitutostradivari.it','studente@istitutostradivari.it',{holdAbout:true});
    await switched.page.click('#driveSyncConnect');
    await switched.page.evaluate(()=>{window.StradivariUser={email:'altro@istitutostradivari.it'};document.dispatchEvent(new Event('stradivari-login'));});
    switched.releaseAbout(); await switched.page.waitForTimeout(250); assert.equal(files.length,0,'old account request must not write after an account switch'); await switched.context.close();
    const hidden=await pageFor('studente@istitutostradivari.it','studente@istitutostradivari.it',{holdAbout:true});
    await hidden.page.click('#driveSyncConnect'); await hidden.page.evaluate(()=>window.dispatchEvent(new Event('pagehide')));
    hidden.releaseAbout(); await hidden.page.waitForTimeout(250); assert.equal(files.length,0,'pagehide must invalidate pending Drive requests'); await hidden.context.close();
    const guarded=await pageFor();
    await guarded.page.evaluate(()=>{localStorage.setItem('stradivari-study-v1:ospite',JSON.stringify({step:2,school:'professionali'}));localStorage.setItem('stradivari-drive-backup:studente@istitutostradivari.it:test',JSON.stringify({part:'study',value:JSON.stringify({step:1,school:'professionali'})}));document.dispatchEvent(new Event('stradivari-login'));});
    await guarded.page.evaluate(()=>{const original=Storage.prototype.setItem;window._restoreGuard=()=>Storage.prototype.setItem=original;Storage.prototype.setItem=function(k,v){if(k==='stradivari-digcomp-progress:v2:studente@istitutostradivari.it:alunno')throw new DOMException('quota','QuotaExceededError');return original.call(this,k,v);};const el=document.querySelector('#digGrid input');el.checked=true;el.dispatchEvent(new Event('change',{bubbles:true}));});
    assert.equal(await guarded.page.evaluate(()=>window.StradivariStorageGuard.hasFailures()),true);
    const beforeImport=await guarded.page.evaluate(()=>window.StradivariDig.completed());
    await guarded.page.getByRole('button',{name:'Importa metodo di studio da ospite'}).click();
    await guarded.page.getByText('Prima salva le modifiche rimaste in memoria:',{exact:false}).waitFor();
    assert.equal(await guarded.page.evaluate(()=>localStorage.getItem('stradivari-study-v1:studente@istitutostradivari.it')),null,'guest import must be blocked');
    await guarded.page.locator('#localBackupPanel summary').click();await guarded.page.getByRole('button',{name:'Ripristina copia locale 1'}).click();
    assert.equal(await guarded.page.evaluate(()=>localStorage.getItem('stradivari-study-v1:studente@istitutostradivari.it')),null,'backup restore must be blocked');
    assert.equal(await guarded.page.evaluate(()=>window.StradivariDig.completed()),beforeImport,'unsaved in-memory data must survive');
    await guarded.page.evaluate(()=>document.dispatchEvent(new CustomEvent('stradivari-storage-ok',{detail:'stradivari-digcomp-progress:v2:studente@istitutostradivari.it:docente'})));
    assert.equal(await guarded.page.evaluate(()=>window.StradivariStorageGuard.hasFailures()),true,'other role cannot clear failure');
    await guarded.page.locator('[data-role=docente]').click();assert.equal(await guarded.page.evaluate(()=>document.body.dataset.profile),'alunno','profile change must preserve unsaved student state');
    await guarded.page.evaluate(async()=>{const original=window.StradilabAuth;window.StradilabAuth={...original,init:o=>window._testAuthReady=o.onReady};const script=await (await fetch('/teacher-auth.js')).text();(0,eval)(script);window._testAuthReady({email:'altro@istitutostradivari.it',isDocente:true});});
    assert.equal(await guarded.page.evaluate(()=>window.StradivariUser.email),'studente@istitutostradivari.it','account change must be blocked');
    assert.equal(await guarded.page.evaluate(()=>window.StradivariStorageGuard.hasBlockedAuth()),true);
    await guarded.page.evaluate(()=>{window._restoreGuard();const el=document.querySelector('#digGrid input');el.dispatchEvent(new Event('change',{bubbles:true}));});
    assert.equal(await guarded.page.evaluate(()=>window.StradivariStorageGuard.hasFailures()),false);
    await guarded.page.evaluate(()=>window._testAuthReady({email:'studente@istitutostradivari.it',isDocente:false}));
    assert.equal(await guarded.page.evaluate(()=>window.StradivariStorageGuard.hasBlockedAuth()),false,'retry after save restores auth');
    await guarded.page.evaluate(()=>{const original=Storage.prototype.setItem;window._restoreGuard=()=>Storage.prototype.setItem=original;Storage.prototype.setItem=function(k,v){if(k==='stradivari-assessment-v1:studente@istitutostradivari.it:alunno')throw new DOMException('quota','QuotaExceededError');return original.call(this,k,v);};const el=document.querySelector('#rubricGrid input');el.checked=true;el.dispatchEvent(new Event('change',{bubbles:true}));document.dispatchEvent(new CustomEvent('stradivari-storage-ok',{detail:'stradivari-assessment-v1:studente@istitutostradivari.it:docente'}));});
    assert.equal(await guarded.page.evaluate(()=>window.StradivariStorageGuard.hasFailures()),true,'other role must not clear grid failure');
    await guarded.page.locator('[data-role=docente]').click();assert.equal(await guarded.page.evaluate(()=>document.body.dataset.profile),'alunno');
    await guarded.page.evaluate(()=>{window._restoreGuard();const el=document.querySelector('#rubricGrid input');el.dispatchEvent(new Event('change',{bubbles:true}));});
    assert.equal(await guarded.page.evaluate(()=>window.StradivariStorageGuard.hasFailures()),false);await guarded.context.close();
    const quota=await pageFor();await quota.page.click('#driveSyncConnect');await quota.page.getByText('Drive collegato:',{exact:false}).waitFor();
    await quota.page.evaluate(()=>{const original=Storage.prototype.setItem;window._restoreStorage=()=>Storage.prototype.setItem=original;Storage.prototype.setItem=function(k,v){if(k.startsWith('stradivari-study-v1:'))throw new DOMException('quota','QuotaExceededError');return original.call(this,k,v);};const input=document.querySelector('input[name=study-q0]');input.checked=true;input.dispatchEvent(new Event('change',{bubbles:true}));});
    await quota.page.getByText('Il dispositivo non ha salvato alcune modifiche.',{exact:false}).waitFor();
    await quota.page.click('#driveSyncNow');await quota.page.waitForTimeout(250);assert.equal(files.length,0,'failed local storage must not report old data as synced');
    await quota.page.evaluate(()=>{window._restoreStorage();const input=document.querySelector('input[name=study-q1]');input.checked=true;input.dispatchEvent(new Event('change',{bubbles:true}));});
    await quota.page.getByText('Progressi sincronizzati su Drive.').waitFor();assert.equal(files.length,1);files.splice(0);await quota.context.close();
    for (const part of ['digcomp','griglie','insegnamento']) {
      const blocked=await pageFor();await blocked.page.click('#driveSyncConnect');await blocked.page.getByText('Drive collegato:',{exact:false}).waitFor();
      await blocked.page.evaluate(part=>{
        if(part==='insegnamento'){window.StradivariTeacherAuth={user:{email:window.StradivariUser.email}};window.StradivariRole.set('docente');document.dispatchEvent(new Event('teacherlogin'));}
        const original=Storage.prototype.setItem;window._restoreStorage=()=>Storage.prototype.setItem=original;
        Storage.prototype.setItem=function(k,v){if((part==='digcomp'&&k.startsWith('stradivari-digcomp-progress:'))||(part==='griglie'&&k.startsWith('stradivari-assessment-v1:'))||(part==='insegnamento'&&k.startsWith('stradivari-teaching-v1:')))throw new DOMException('quota','QuotaExceededError');return original.call(this,k,v);};
        const el=part==='digcomp'?document.querySelector('#digGrid input'):part==='griglie'?document.querySelector('#rubricGrid input'):document.querySelector('[data-teach-note=evidence]');
        if(part==='insegnamento'){el.value='Test sintetico senza dati personali';el.dispatchEvent(new Event('input',{bubbles:true}));}else{el.checked=true;el.dispatchEvent(new Event('change',{bubbles:true}));}
      },part);
      await blocked.page.getByText('Il dispositivo non ha salvato alcune modifiche.',{exact:false}).waitFor();await blocked.page.click('#driveSyncNow');
      assert.equal(files.length,0,`${part} failed local write must block sync`);
      await blocked.page.evaluate(part=>{window._restoreStorage();const el=part==='digcomp'?document.querySelector('#digGrid input'):part==='griglie'?document.querySelector('#rubricGrid input'):document.querySelector('[data-teach-note=evidence]');el.dispatchEvent(new Event(part==='insegnamento'?'input':'change',{bubbles:true}));},part);
      await blocked.page.getByText('Progressi sincronizzati su Drive.').waitFor({timeout:5000});assert.equal(files.length,1);files.splice(0);await blocked.context.close();
    }
    const guest=await pageFor();
    await guest.page.evaluate(()=>{localStorage.setItem('stradivari-study-v1:ospite',JSON.stringify({step:2,school:'professionali'}));localStorage.setItem('stradivari-digcomp-progress:v1:studente@istitutostradivari.it',JSON.stringify({legacy:true}));localStorage.setItem('stradivari-digcomp-progress:v2:ospite:alunno',JSON.stringify({guest:true}));localStorage.setItem('stradivari-study-v1:studente@istitutostradivari.it',JSON.stringify({step:1,school:'professionali'}));document.dispatchEvent(new Event('stradivari-login'));});
    assert.equal(await guest.page.getByRole('button',{name:'Sostituisci DigComp alunno con la copia ospite'}).count(),1,'legacy account progress must be acknowledged before import');
    await guest.page.getByRole('button',{name:'Sostituisci metodo di studio con la copia ospite'}).click();
    assert.equal(await guest.page.evaluate(()=>JSON.parse(localStorage.getItem('stradivari-study-v1:studente@istitutostradivari.it')).step),2);
    assert.equal(await guest.page.evaluate(()=>JSON.parse(localStorage.getItem('stradivari-study-v1:ospite')).step),2);
    assert.equal(await guest.page.evaluate(()=>Object.keys(localStorage).some(k=>k.startsWith('stradivari-drive-backup:'))),true);
    await guest.page.locator('#localBackupPanel summary').click();
    await guest.page.getByRole('button',{name:'Ripristina copia locale 1'}).click();
    assert.equal(await guest.page.evaluate(()=>JSON.parse(localStorage.getItem('stradivari-study-v1:studente@istitutostradivari.it')).step),1);
    assert.equal(await guest.page.evaluate(()=>JSON.parse(localStorage.getItem('stradivari-study-v1:ospite')).step),2);
    await guest.context.close();
    const wrong=await pageFor('studente@istitutostradivari.it','diverso@istitutostradivari.it');
    await wrong.page.click('#driveSyncConnect'); await wrong.page.getByText('L’account Drive non coincide con quello scolastico.').waitFor();
    assert.equal(files.length,0,'mismatched account must not receive writes'); await wrong.context.close();
    const xss=await pageFor();
    await xss.page.evaluate(()=>{localStorage.setItem('stradivari-study-v1:studente@istitutostradivari.it', JSON.stringify({step:3,school:'professionali',chosen:[0,1],answers:[],exercise:[],reflection:'',recall:'</textarea><img src=x onerror=window.__xss=1>'}));document.dispatchEvent(new Event('stradivari-drive-restored'));});
    assert.equal(await xss.page.evaluate(()=>window.__xss),undefined);
    assert.match(await xss.page.locator('#studyRecall').inputValue(), /<\/textarea>/);
    await xss.context.close();
    const one=await pageFor();
    await one.page.evaluate(()=>{localStorage.setItem('stradivari-study-v1:studente@istitutostradivari.it',JSON.stringify({step:1,school:'professionali'}));});
    await one.page.click('#driveSyncConnect'); await one.page.getByText('Progressi sincronizzati su Drive.').waitFor();
    assert.equal(files.length,1);
    const two=await pageFor(); await two.page.click('#driveSyncConnect'); await two.page.getByText('Progressi sincronizzati su Drive.').waitFor();
    assert.equal(await two.page.evaluate(()=>JSON.parse(localStorage.getItem('stradivari-study-v1:studente@istitutostradivari.it')).step),1);
    // Two independent devices edit from the same common ancestor.
    const warned=await one.page.evaluate(()=>{localStorage.setItem('stradivari-study-v1:studente@istitutostradivari.it',JSON.stringify({step:2,school:'professionali'})); document.dispatchEvent(new Event('stradivari-study-saved')); const event=new Event('beforeunload',{cancelable:true});window.dispatchEvent(event);return event.defaultPrevented;});
    assert.equal(warned,true,'unsynced changes must request unload confirmation when supported');
    await one.page.waitForFunction(()=>document.getElementById('driveSyncStatus').textContent==='Progressi sincronizzati su Drive.',null,{timeout:10000});
    // Wait until debounce actually produced the second revision.
    await one.page.waitForTimeout(400); assert.equal(files.length,2);
    await two.page.evaluate(()=>{localStorage.setItem('stradivari-study-v1:studente@istitutostradivari.it',JSON.stringify({step:3,school:'professionali'})); document.dispatchEvent(new Event('stradivari-study-saved'));});
    await two.page.getByText('Ci sono progressi diversi.',{exact:false}).waitFor({timeout:25000});
    assert.equal(files.length,2,'divergence must not overwrite either revision');
    await two.page.evaluate(()=>{const original=window.fetch;let held=false;window.fetch=async (...args)=>{if(!held&&String(args[0]).includes('/drive/v3/changes?')){held=true;window._testStarted=true;await new Promise(resolve=>window._testRelease=resolve);}return original(...args);};});
    await two.page.getByRole('button',{name:'Usa i progressi di questo dispositivo'}).click();
    await two.page.waitForFunction(()=>window._testStarted===true);
    await two.page.evaluate(()=>{localStorage.setItem('stradivari-study-v1:studente@istitutostradivari.it',JSON.stringify({step:4,school:'professionali'}));window._testRelease();});
    await two.page.getByText('I progressi locali sono cambiati: controlla di nuovo le copie.').waitFor();
    assert.equal(files.length,2,'old choice must not overwrite an edit while resolving');
    await two.page.getByRole('button',{name:'Usa i progressi di questo dispositivo'}).click();
    await two.page.getByText('Progressi salvati su Drive.').waitFor();
    assert.equal(JSON.parse(files.at(-1).body.progress.study).step,4,'conflict resolution must use latest local state');
    assert.equal(await two.page.evaluate(()=>JSON.parse(localStorage.getItem('stradivari-study-v1:studente@istitutostradivari.it')).step),4);
    await one.context.close();await two.context.close();
    files.splice(0); let parent=''; const blank={study:null,teaching:null,digStudent:null,digTeacher:null,assessmentStudent:null,assessmentTeacher:null};
    for(let i=0;i<2201;i++){const id=`old${++next}`; files.push({id,seq:next,name:'stradilab-didattica-progress-v1',modifiedTime:new Date().toISOString(),appProperties:{parents:JSON.stringify(parent?[parent]:[])},body:{version:1,progress:{...blank,study:JSON.stringify({step:1})}}});parent=id;}
    const many=await pageFor(); await many.page.click('#driveSyncConnect'); await many.page.getByText('Progressi sincronizzati su Drive.').waitFor();
    assert.equal(JSON.parse(await many.page.evaluate(()=>localStorage.getItem('stradivari-study-v1:studente@istitutostradivari.it'))).step,1,'initial scan must include history beyond 2000 revisions');
    assert.equal(files.length,2201,'no revisions may be deleted during sync');await many.context.close();
    files.splice(0); for(let i=0;i<3;i++){files.push({id:`branch${++next}`,seq:next,name:'stradilab-didattica-progress-v1',modifiedTime:new Date().toISOString(),appProperties:{parents:'[]'},body:{version:1,progress:{...blank,study:JSON.stringify({step:i+1})}}});}
    const multi=await pageFor();await multi.page.click('#driveSyncConnect');await multi.page.getByText('Ci sono progressi diversi.',{exact:false}).waitFor();
    await multi.page.getByRole('button',{name:/Usa copia Drive 1/}).click();await multi.page.getByText('Progressi salvati su Drive.').waitFor();
    assert.equal(files.length,5,'three branches must merge through two immutable revisions'); await multi.context.close();
    files.splice(0);files.push({id:`empty${++next}`,seq:next,name:'stradilab-didattica-progress-v1',modifiedTime:new Date().toISOString(),appProperties:{parents:'[]'},body:{version:1,progress:blank}});
    const legacy=await pageFor();await legacy.page.evaluate(()=>localStorage.setItem('stradivari-digcomp-progress:v1:studente@istitutostradivari.it',JSON.stringify({answers:{alunno:{a:1}}})));
    await legacy.page.click('#driveSyncConnect');await legacy.page.getByText('Ci sono progressi diversi.',{exact:false}).waitFor();
    await legacy.page.getByRole('button',{name:/Usa copia Drive 1/}).click();await legacy.page.getByText('Progressi salvati su Drive.').waitFor();
    assert.equal(await legacy.page.evaluate(()=>localStorage.getItem('stradivari-digcomp-v1-suppressed:studente@istitutostradivari.it')),'1');
    assert.notEqual(await legacy.page.evaluate(()=>localStorage.getItem('stradivari-digcomp-progress:v1:studente@istitutostradivari.it')),null,'legacy file retained for recovery');
    await legacy.context.close();
    console.log('PASS: mocked Drive restore, divergence, guest import, multi-tab lock and history beyond 2000 revisions');
  } finally {await browser.close(); await new Promise(r=>server.close(r));}
})().catch(e=>{console.error(e);process.exitCode=1;});
