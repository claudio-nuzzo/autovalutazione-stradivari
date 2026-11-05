/* Real grammar UI; only the service adapter is replaced by synthetic fixtures. */
const {launchBrowser}=require('./browser-runtime.cjs');
const http=require('node:http'),fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
const root=path.resolve(__dirname,'../autovalutazione-app/grammatica');
function installAdapter(){
  const teacher={email:'teacher@example.invalid',teacher:true,authorized:true};
  const state=window.__grammarFixture={
    session:null,schoolEnabled:false,calls:[],remote:{},storage:{verified:true},dashboardError:true,countRace:true,
    race:{raceId:'12345678-1234-4234-8234-123456789012',group:'1B Moda',track:'moda',area:'grammaticale',topicGroup:'Articolo',label:'Articolo in atelier',suggestedMinutes:10,enabled:true}
  };
  const listeners=[];
  const read=email=>JSON.parse(localStorage.getItem('atelier-events-v1:'+email)||'[]');
  const write=(email,events)=>localStorage.setItem('atelier-events-v1:'+email,JSON.stringify(events));
  state.setSession=session=>{
    state.session=session;listeners.forEach(listener=>listener(session));
    document.dispatchEvent(new CustomEvent('atelier-access',{detail:session}));
  };
  async function request(resource,options={}){
    const email=state.session?.email;
    if(!email||(!state.session.authorized&&!state.session.teacher))throw Error('Fixture: accesso non autorizzato.');
    state.calls.push({resource,options,email});
    await Promise.resolve();
    if(email!==state.session?.email)throw Error('Fixture: account cambiato.');
    if(resource==='/dashboard'){
      if(state.dashboardError)throw Error('Archivio non disponibile nella fixture.');
      return {ok:true,students:[{email:'board-pupil@example.invalid',group:'1B Moda',enabled:true}]};
    }
    if(resource==='/races?storageStatus=1')return {ok:true,storage:state.storage};
    if(resource==='/races')return {ok:true,races:[state.race]};
    if(resource.startsWith('/races?raceId=')){
      const events=(state.remote[email]||[]).filter(event=>event.raceCounted===true),best=events.reduce((previous,event)=>!previous||event.correct/event.total>previous.correct/previous.total?event:previous,null);
      const own=best?{...best,attempts:events.length,improvement:0}:null;
      return {ok:true,race:state.race,own,aggregate:{participants:1,completed:best?1:0},...(state.session.teacher?{board:[{email:'board-pupil@example.invalid',attempts:1,best:{correct:5,total:6,stars:2,durationMs:62000}}]}:{})};
    }
    if(resource==='/events'&&options.method==='POST'){
      const payload=JSON.parse(options.body),isRace=payload.activityId.startsWith('gara-');
      const event={...payload,stars:window.ATELIER_ENGINE.stars(payload),savedAt:new Date().toISOString(),...(isRace?{raceId:state.race.raceId,raceCounted:state.countRace}:{})};
      const remote=state.remote[email]||(state.remote[email]=[]),existing=remote.find(row=>row.eventId===event.eventId);
      if(!existing)remote.push(event);
      return {ok:true,event:existing||event};
    }
    if(resource.startsWith('/events'))return {ok:true,events:state.remote[email]||[],nextCursor:null};
    throw Error('Fixture: endpoint inatteso '+resource);
  }
  async function flush(){
    const email=state.session?.email;if(!email)return;
    for(const event of read(email).filter(row=>!row.remote&&!row.localOnly)){
      const payload=Object.fromEntries(['eventId','activityId','area','correct','total','durationMs','mode'].map(field=>[field,event[field]]));
      const result=await request('/events',{method:'POST',body:JSON.stringify(payload)});
      if(email!==state.session?.email)return;
      const latest=read(email),target=latest.find(row=>row.eventId===event.eventId);if(target)Object.assign(target,result.event,{remote:true});write(email,latest);
    }
    if(email!==state.session?.email)return;
    document.dispatchEvent(new Event('atelier-events-restored'));
    document.dispatchEvent(new CustomEvent('atelier-sync-status',{detail:'Progressi confermati su Drive.'}));
  }
  window.AtelierAdapter={get enabled(){return state.schoolEnabled},get session(){return state.session},subscribe(listener){listeners.push(listener)},request,flush,logout:()=>state.setSession(null),init(){setTimeout(()=>{state.schoolEnabled=true;state.setSession(teacher)},0)}};
}
const server=http.createServer((req,res)=>{
  const pathname=new URL(req.url,'http://127.0.0.1').pathname;
  if(pathname==='/adapter.js'){res.setHeader('Content-Type','text/javascript');res.end('('+installAdapter.toString()+')();');return}
  const file=path.resolve(root,'.'+(pathname==='/'?'/index.html':pathname));
  if(!file.startsWith(root+path.sep)){res.writeHead(403).end();return}
  try{res.setHeader('Content-Type',file.endsWith('.js')?'text/javascript':file.endsWith('.css')?'text/css':'text/html');res.end(fs.readFileSync(file))}catch{res.writeHead(404).end()}
});
(async()=>{
  await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
  const browser=await launchBrowser();
  try{
    const page=await browser.newPage({viewport:{width:375,height:812}}),errors=[],outsideRequests=[],kinds=new Set();
    page.on('pageerror',error=>errors.push(error.message));
    const origin='http://127.0.0.1:'+server.address().port;
    await page.route('**/*',route=>{
      if(new URL(route.request().url()).origin!==origin){outsideRequests.push(route.request().url());return route.abort()}
      return route.continue();
    });
    await page.emulateMedia({reducedMotion:'reduce'});
    await page.goto(origin+'/');
    await page.locator('[data-track="moda"]').click();
    await page.locator('#accountStatus').filter({hasText:'teacher@example.invalid'}).waitFor();
    assert.ok(await page.evaluate(()=>Array.isArray(window.ATELIER_REVIEW_BANK)),'local review bank is exposed before the fixture enters school mode');
    await page.locator('.bottom a[href="#progress"]').click();
    assert.equal(await page.locator('#teacher').isVisible(),true,'verified teacher keeps archive controls even when the dashboard fails');
    assert.match(await page.locator('#teacherStatus').innerText(),/Archivio non disponibile/);
    await page.getByRole('button',{name:'Visualizza esiti',exact:true}).waitFor();
    assert.equal(await page.evaluate(()=>__grammarFixture.calls.filter(call=>call.resource.includes('?raceId=')).length),0,'teacher refresh must not fetch a private board');
    await page.getByRole('button',{name:'Controlla archivio Drive',exact:true}).click();
    await page.getByText('Archivio Drive verificato dal servizio.',{exact:true}).waitFor();
    await page.evaluate(()=>{__grammarFixture.storage={verified:false,error:'SECRET_FOLDER_ACL <img src=x>'}});
    await page.getByRole('button',{name:'Controlla archivio Drive',exact:true}).click();
    await page.locator('#raceStorageStatus').filter({hasText:'Archivio Drive non verificato'}).waitFor();
    assert.equal((await page.locator('#raceStorageStatus').innerText()).includes('SECRET_FOLDER_ACL'),false);
    await page.getByRole('button',{name:'Visualizza esiti',exact:true}).click();
    await page.locator('#teacherRaceResults').filter({hasText:'board-pupil@example.invalid'}).waitFor();
    assert.equal((await page.locator('#classRaces').innerText()).includes('board-pupil@example.invalid'),false,'home cards never contain private board accounts');
    for(const width of [375,768]){
      await page.setViewportSize({width,height:812});
      assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false,'teacher layout overflows at '+width);
    }
    await page.setViewportSize({width:375,height:812});
    const setPupil=async email=>{
      await page.evaluate(email=>__grammarFixture.setSession({email,authorized:true,teacher:false,group:'1B Moda'}),email);
      await page.locator('.bottom a[href="#home"]').click();
      await page.getByRole('button',{name:'Partecipa',exact:true}).waitFor();
      assert.equal(await page.locator('#teacher').isVisible(),false);
      assert.equal(await page.locator('#teacherRaceResults').innerText(),'','account changes clear private teacher results');
      assert.equal(await page.locator('#raceStorageStatus').innerText(),'','account changes clear archive status');
    };
    const finishRace=async()=>{
      await page.getByRole('button',{name:'Partecipa',exact:true}).click();
      assert.match(await page.locator('#work .worktop').innerText(),/Gara di classe/i);
      assert.match(await page.locator('#work h2').innerText(),/Articolo in atelier/);
      const length=await page.locator('.exercise').count();assert.ok(length>0&&length<=8);
      for(let index=0;index<length;index++){
        const card=page.locator('.exercise.active');
        const item=await card.evaluate(node=>{
          const id=node.querySelector('input,textarea')?.name||node.querySelector('[data-token]')?.dataset.item;
          return window.ATELIER_REVIEW_BANK.find(entry=>entry.id===id);
        });
        assert.ok(item,'active exercise must resolve in the real balanced review bank');kinds.add(item.kind);
        if(item.kind==='choice')await card.locator('input[type="radio"]').nth(item.answer).check();
        else if(item.kind==='exact'){
          assert.equal(await card.locator('.gap-sentence .inline-gap').count(),1);
          await card.locator('.inline-gap').fill(item.answers[0]);
        }else if(item.kind==='tokens')for(const token of item.answer)await card.locator('[data-token="'+token+'"]').click();
        else assert.fail('a race assessment contains an unsupported question kind '+item.kind);
        if(index<length-1)await page.locator('#nextExercise').click();
        assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false,'active race exercise overflows on a phone');
      }
      await page.locator('#checkSeriesButton').click();
      await page.locator('#syncStatus').filter({hasText:'Progressi confermati su Drive.'}).waitFor();
      assert.match(await page.locator('#seriesResult').innerText(),/100%/);
      return page.evaluate(()=>JSON.parse(localStorage.getItem('atelier-events-v1:'+AtelierAdapter.session.email)).at(-1));
    };
    await setPupil('pupil@example.invalid');
    const first=await finishRace();
    assert.match(first.activityId,/^gara-12345678-1234-4234-8234-123456789012--serie-[a-z0-9]+$/);
    assert.equal(first.raceId,'12345678-1234-4234-8234-123456789012');assert.equal(first.remote,true);assert.equal(first.raceCounted,true);
    assert.equal(first.correct,first.total);assert.equal(first.stars,3);
    assert.match(await page.locator('#gameWidget').innerText(),/3 stelline · 30 XP/);
    assert.match(await page.locator('#gameAwards').innerText(),/Gara completata/);
    // Re-submitting the same completed series creates another attempt, never more XP.
    await page.locator('#checkSeriesButton').click();
    await page.waitForFunction(()=>JSON.parse(localStorage.getItem('atelier-events-v1:pupil@example.invalid')).filter(event=>event.remote).length===2);
    const second=await page.evaluate(()=>JSON.parse(localStorage.getItem('atelier-events-v1:pupil@example.invalid')).at(-1));
    assert.notEqual(first.eventId,second.eventId);assert.equal(first.activityId,second.activityId);
    assert.match(await page.locator('#gameWidget').innerText(),/3 stelline · 30 XP/);
    await page.locator('.bottom a[href="#home"]').click();
    await page.locator('#classRaces .medal').filter({hasText:'3 stelline'}).waitFor();
    assert.match(await page.locator('#classRaces').innerText(),/2 tentativi/);
    assert.equal((await page.locator('#classRaces').innerText()).includes('board-pupil@example.invalid'),false);
    for(const width of [375,768]){
      await page.setViewportSize({width,height:812});
      for(const view of ['home','progress']){
        await page.locator('.bottom a[href="#'+view+'"]').click();
        assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false,view+' layout overflows at '+width);
      }
    }
    // The server may retain a late/closed race submission as ordinary practice.
    await page.setViewportSize({width:375,height:812});
    await page.evaluate(()=>{__grammarFixture.countRace=false});
    await setPupil('ordinary-fallback@example.invalid');
    assert.match(await page.locator('#gameWidget').innerText(),/0 stelline · 0 XP/,'new identity starts with its own progress');
    assert.equal((await page.locator('#gameAwards').innerText()).includes('Gara completata'),false);
    const ordinary=await finishRace();
    assert.equal(ordinary.remote,true);assert.equal(ordinary.raceCounted,false);assert.equal(ordinary.correct,ordinary.total);
    assert.match(await page.locator('#gameWidget').innerText(),/3 stelline · 30 XP/);
    assert.equal((await page.locator('#gameAwards').innerText()).includes('Gara completata'),false,'ordinary fallback cannot earn a counted race medal');
    await page.locator('.bottom a[href="#progress"]').click();assert.match(await page.locator('#progressList').innerText(),/Confermato su Drive/);
    await page.evaluate(()=>__grammarFixture.setSession({email:'waiting@example.invalid',authorized:false,teacher:false}));
    await page.locator('.bottom a[href="#home"]').click();await page.getByRole('button',{name:'Ripassa',exact:true}).waitFor();
    assert.equal(await page.locator('#classRaces [data-race-id]').count(),0);assert.equal(await page.locator('#teacherRaceResults').innerText(),'');
    assert.match(await page.locator('#gameWidget').innerText(),/0 stelline · 0 XP/);
    const payloads=await page.evaluate(()=>__grammarFixture.calls.filter(call=>call.options.method==='POST').map(call=>JSON.parse(call.options.body)));
    assert.equal(payloads.length,3);
    for(const payload of payloads)assert.deepEqual(Object.keys(payload).sort(),['eventId','activityId','area','correct','total','durationMs','mode'].sort());
    assert.ok(kinds.has('choice'));assert.ok(kinds.has('exact'));assert.ok(kinds.has('tokens'));
    assert.deepEqual(outsideRequests,[]);assert.deepEqual(errors,[]);
    console.log('PASS: real race UI, Articolo choice/inline/tokens, confirmed event UUID, XP/medal, repeat deduplication, ordinary fallback, private teacher board, Drive verification, identity clearing and 375/768 layouts');
  }finally{await browser.close();server.close()}
})().catch(error=>{console.error(error);server.close();process.exit(1)});
