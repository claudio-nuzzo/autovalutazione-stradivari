const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
const {launchBrowser}=require('./browser-runtime.cjs');
(async()=>{
 const browser=await launchBrowser(),context=await browser.newContext({viewport:{width:390,height:844}}),events=[],page=await context.newPage(),errors=[];
 let firstPostGate,secondPostGate,firstPostSeen,secondPostSeen;
 page.on('pageerror',e=>errors.push(e.message));
 await page.route('**/*',async route=>{
  const u=new URL(route.request().url());
  if(u.hostname==='accounts.google.com')return route.fulfill({contentType:'text/javascript',body:'window.google={accounts:{}};'});
  if(u.pathname==='/stradilab-auth.js')return route.fulfill({contentType:'text/javascript',body:`window.StradilabAuth={idToken:()=> 'synthetic-test-token',init:options=>setTimeout(()=>options.onReady({email:'test@istitutostradivari.it'}),0)};`});
  if(u.hostname==='deepstrad.stradilab.org'){
   const headers={'access-control-allow-origin':'https://didattica.stradilab.org','access-control-allow-headers':'Authorization,Content-Type','access-control-allow-methods':'GET,POST,OPTIONS'};
   if(route.request().method()==='OPTIONS')return route.fulfill({status:204,headers});
   let data;
   if(u.pathname.endsWith('/profile'))data={ok:true,email:'test@istitutostradivari.it',authorized:true,teacher:false};
   else if(route.request().method()==='POST'){
    const e=route.request().postDataJSON();
    assert.deepEqual(Object.keys(e).sort(),['eventId','activityId','area','correct','total','durationMs','mode'].sort());
    assert.equal(e.mode,'closed');assert.equal(e.total,6);assert.equal(e.correct,6);
    if(e.eventId==='00000000-0000-4000-8000-000000000002'){firstPostSeen();await firstPostGate;}
    if(e.eventId==='00000000-0000-4000-8000-000000000003'){secondPostSeen();await secondPostGate;}
    const previous=events.find(x=>x.eventId===e.eventId);
    if(!previous)events.push({...e,stars:3,savedAt:new Date().toISOString()});
    data={ok:true,event:previous||events.at(-1),duplicate:Boolean(previous)};
   }else data={ok:true,events,nextCursor:null};
   return route.fulfill({headers,contentType:'application/json',body:JSON.stringify(data)});
  }
  const file=u.pathname.endsWith('/')?'index.html':path.basename(u.pathname),root=path.resolve(__dirname,'../autovalutazione-app/grammatica',file);
  return route.fulfill({contentType:file.endsWith('.js')?'text/javascript':file.endsWith('.css')?'text/css':'text/html',body:fs.readFileSync(root)});
 });
 await page.goto('https://didattica.stradilab.org/grammatica/');
 if(await page.locator('#trackChoice').isVisible())await page.locator('[data-track=moda]').click();await page.locator('#accountStatus').filter({hasText:'Accesso verificato'}).waitFor();
 await page.locator('[data-area="parole"]').click();
 const answerVisible=async()=>{const value=await page.locator('.exercise.active').evaluate(card=>{const id=card.querySelector('input,textarea,button[data-token]')?.name||card.querySelector('[data-token]')?.dataset.item;const bank=[...window.ATELIER_EXTRA,...window.ATELIER_CONTENT.exercises,...window.ATELIER_TOPICS,...window.ATELIER_LEARNING_EXTRA,...window.ATELIER_PERIOD_EXTRA,...window.ATELIER_VERB_EXTRA,...window.ATELIER_TRACK_DATA];return bank.find(x=>x.id===id)});const card=page.locator('.exercise.active');if(value.kind==='choice')await card.locator('input[type=radio]').nth(value.answer).check();else if(value.kind==='tokens'){for(const i of value.answer)await card.locator('[data-token="'+i+'"]').click()}else await card.locator('input.inline-gap').fill(value.answers[0]);};
 const length=await page.locator('.exercise').count();for(let i=0;i<length;i++){await answerVisible();if(i<length-1)await page.locator('#nextExercise').click()}
 await page.locator('#exerciseForm button[type=submit]').click();
 await page.locator('#syncStatus').filter({hasText:'Progressi confermati su Drive.'}).waitFor();
 assert.equal(events.length,1);assert.match(await page.locator('#progressList').innerText(),/Confermato su Drive/);
 // Hold POST #2. A completed second series is appended during that await and
 // calls flush while the first flush owns the outbox. It must not be ignored.
 let releaseFirst,releaseSecond;
 firstPostGate=new Promise(r=>releaseFirst=r);secondPostGate=new Promise(r=>releaseSecond=r);
 const firstSeen=new Promise(r=>firstPostSeen=r),secondSeen=new Promise(r=>secondPostSeen=r);
 await page.evaluate(()=>{window.__syncStatuses=[];document.addEventListener('atelier-sync-status',e=>window.__syncStatuses.push(e.detail));const key='atelier-events-v1:test@istitutostradivari.it',list=JSON.parse(localStorage.getItem(key));list.push({...list[0],eventId:'00000000-0000-4000-8000-000000000002',remote:false});localStorage.setItem(key,JSON.stringify(list));void AtelierAdapter.flush()});
 await firstSeen;
 await page.evaluate(()=>{const key='atelier-events-v1:test@istitutostradivari.it',list=JSON.parse(localStorage.getItem(key));list.push({...list[0],eventId:'00000000-0000-4000-8000-000000000003',remote:false});localStorage.setItem(key,JSON.stringify(list));void AtelierAdapter.flush()});
 assert.equal(await page.evaluate(()=>window.__syncStatuses.includes('Progressi confermati su Drive.')),false);
 releaseFirst();
 await secondSeen;
 assert.equal(events.length,2);
 assert.equal(await page.evaluate(()=>window.__syncStatuses.includes('Progressi confermati su Drive.')),false,'No success while a later POST remains unconfirmed');
 assert.equal(await page.evaluate(()=>JSON.parse(localStorage.getItem('atelier-events-v1:test@istitutostradivari.it')).filter(e=>!e.remote&&!e.localOnly).length),1);
 releaseSecond();
 await page.waitForFunction(()=>window.__syncStatuses.includes('Progressi confermati su Drive.'));
 assert.equal(events.length,3);
 assert.equal(await page.evaluate(()=>JSON.parse(localStorage.getItem('atelier-events-v1:test@istitutostradivari.it')).filter(e=>!e.remote&&!e.localOnly).length),0);
 await page.reload();
 await page.locator('#accountStatus').filter({hasText:'Accesso verificato'}).waitFor();
 await page.locator('#syncStatus').filter({hasText:'Progressi confermati su Drive.'}).waitFor();
 assert.equal(events.length,3);assert.match(await page.locator('#starCount').innerText(),/3 stelline/);assert.deepEqual(errors,[]);
 await browser.close();
 console.log('PASS adapter: evento minimizzato, POST ritardato e secondo evento durante flush, nessuna falsa conferma, outbox vuota, ripristino e retry senza duplicati. Non è prova OAuth/Drive reale.');
})().catch(e=>{console.error(e);process.exit(1)});
