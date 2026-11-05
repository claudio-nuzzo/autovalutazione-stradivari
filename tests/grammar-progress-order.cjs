/* Real history/game UI, with the service adapter replaced by a restore fixture. */
const {launchBrowser}=require('./browser-runtime.cjs');
const http=require('node:http'),fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
const root=path.resolve(__dirname,'../autovalutazione-app/grammatica');
const email='restore-order@example.invalid',key='atelier-events-v1:'+email;
const remote=Array.from({length:40},(_,index)=>{
  const number=40-index;
  return {eventId:'00000000-0000-4000-8000-'+String(number).padStart(12,'0'),activityId:'restore-order-'+number,area:'grammaticale',mode:'closed',correct:number===1?100:number,total:100,stars:number===1?3:1,durationMs:60000,remote:true,savedAt:number===40?'2026-10-09T23:00:00-13:00':number===39?'2026-10-10T02:00:00+14:00':new Date(Date.UTC(2026,8,number,12)).toISOString()};
});
const local=[
  {eventId:'ffffffff-ffff-4fff-8fff-ffffffffffff',activityId:'local-tied-date',area:'grammaticale',mode:'closed',correct:91,total:100,stars:2,durationMs:60000,remote:false,savedAt:'2026-10-09T12:00:00Z'},
  {eventId:'invalid-date-local',activityId:'local-invalid-date',area:'grammaticale',mode:'closed',correct:0,total:100,stars:1,durationMs:60000,remote:false,savedAt:'not-a-date'}
];
function installAdapter(remote,email){
  let session=null;const listeners=[];
  const state=window.__restoreFixture={restored:0};
  async function flush(){
    const key='atelier-events-v1:'+email;
    // Match the real adapter's Map merge: previous insertion order survives,
    // while a first remote restore inserts newest-first records newest-first.
    const merged=new Map(JSON.parse(localStorage.getItem(key)||'[]').map(event=>[event.eventId,event]));
    for(const event of remote)merged.set(event.eventId,{...merged.get(event.eventId),...event});
    localStorage.setItem(key,JSON.stringify([...merged.values()]));state.restored++;
    document.dispatchEvent(new Event('atelier-events-restored'));
  }
  window.AtelierAdapter={enabled:true,get session(){return session},subscribe(listener){listeners.push(listener)},flush,request:async resource=>{if(resource==='/races')return {ok:true,races:[]};throw Error('Unexpected fixture request '+resource)},init(){setTimeout(()=>{session={email,authorized:true,teacher:false};listeners.forEach(listener=>listener(session));document.dispatchEvent(new CustomEvent('atelier-access',{detail:session}));void flush()},0)},logout(){session=null;listeners.forEach(listener=>listener(session))}};
}
const server=http.createServer((req,res)=>{
  const pathname=new URL(req.url,'http://localhost').pathname;
  if(pathname==='/adapter.js'){res.setHeader('Content-Type','text/javascript');res.end('('+installAdapter.toString()+')('+JSON.stringify(remote)+','+JSON.stringify(email)+');');return}
  const file=path.resolve(root,'.'+(pathname==='/'?'/index.html':pathname));if(!file.startsWith(root+path.sep))return res.writeHead(403).end();
  try{res.setHeader('Content-Type',file.endsWith('.js')?'text/javascript':file.endsWith('.css')?'text/css':'text/html');res.end(fs.readFileSync(file))}catch{res.writeHead(404).end()}
});
(async()=>{
  await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));const browser=await launchBrowser();
  try{
    const page=await browser.newPage({viewport:{width:375,height:812}}),errors=[];page.on('pageerror',error=>errors.push(error.message));
    await page.addInitScript(({local,key})=>{localStorage.setItem('atelier-track','moda');if(!localStorage.getItem(key))localStorage.setItem(key,JSON.stringify(local))},{local,key});
    const check=async()=>{
      await page.waitForFunction(()=>window.__restoreFixture?.restored===1);
      const rows=await page.locator('#progressList .progressrow span').allTextContents();
      assert.equal(rows.length,20);
      assert.deepEqual(rows.map(text=>Number(text.match(/(\d+)\/100 corrette/)[1])),[40,91,...Array.from({length:18},(_,index)=>39-index)],'latest twenty must descend by parsed time and stable eventId, irrespective of merge order');
      assert.equal(await page.locator('#suggestion').textContent(),'Un ripasso può aiutarti: rileggi una pillola e riprova una serie.','home suggestion must use the latest partial result, not the oldest perfect result');
      assert.match(await page.locator('#gameWidget').innerText(),/45 stelline · 450 XP/,'XP includes all 42 events, not just the displayed twenty');
      const stored=await page.evaluate(key=>localStorage.getItem(key),key),events=JSON.parse(stored);
      assert.equal(events.length,42);assert.deepEqual(events.map(event=>event.eventId),[...local,...remote].map(event=>event.eventId),'rendering must leave the persisted merge/insertion order untouched');
      assert.equal(events.find(event=>event.eventId==='invalid-date-local').savedAt,'not-a-date','invalid dates are tolerated without rewriting records');
      return stored;
    };
    await page.goto('http://127.0.0.1:'+server.address().port+'/#progress');const before=await check();
    await page.locator('.bottom a[href="#home"]').click();await page.locator('.bottom a[href="#progress"]').click();
    assert.equal(await page.evaluate(key=>localStorage.getItem(key),key),before,'navigation does not persist a sorted projection');
    await page.reload();assert.equal(await check(),before,'reload/restore preserves every record and its stored order');
    assert.deepEqual(errors,[]);console.log('PASS: 40 remote DESC + mixed local restore, latest20 by normalized date/stable ID, latest suggestion, all-history XP and unchanged storage/reload');
  }finally{await browser.close();server.close()}
})().catch(error=>{console.error(error);server.close();process.exit(1)});
