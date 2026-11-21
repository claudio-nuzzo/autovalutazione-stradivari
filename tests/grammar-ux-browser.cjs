const {launchBrowser}=require('./browser-runtime.cjs');const assert=require('node:assert/strict');
const http=require('node:http'),fs=require('node:fs'),path=require('node:path');const base=path.resolve(__dirname,'../autovalutazione-app/grammatica');
const server=http.createServer((req,res)=>{const pathname=new URL(req.url,'http://localhost').pathname,file=path.join(base,pathname==='/'?'index.html':pathname);if(!file.startsWith(base+path.sep)){res.writeHead(403);res.end();return}try{res.setHeader('Content-Type',file.endsWith('.js')?'text/javascript':file.endsWith('.css')?'text/css':file.endsWith('.json')?'application/json':'text/html');res.end(fs.readFileSync(file))}catch{res.writeHead(404);res.end()}});
// Answers every visible exercise of the current series, correctly unless `wrong` is set, then checks the series.
const solve=wrong=>(async wrong=>{const bank=window.ATELIER_REVIEW_BANK,work=document.querySelector('#work'),pause=()=>new Promise(r=>setTimeout(r,60));for(let i=0;i<20;i++){const card=[...work.querySelectorAll('.exercise')].find(c=>!c.hidden);const id=card.querySelector('[data-item]')?.dataset.item||card.querySelector('[name]')?.getAttribute('name');const item=bank.find(x=>x.id===id)||bank.find(x=>id&&id.endsWith(x.id));if(item?.kind==='choice'){const radios=[...card.querySelectorAll('input[type=radio]')],want=item.options?.[item.answer]??item.answer;(radios.find(r=>(r.closest('label').textContent.trim()===want)!==wrong)||radios[0]).click()}else if(item?.kind==='tokens'){for(const t of card.querySelectorAll('[data-token]'))if(item.answer.includes(Number(t.dataset.token))!==wrong)t.click()}else{const input=card.querySelector('input:not([type=radio]),textarea');if(input){input.value=wrong?'xx':(item?.answers||['risposta'])[0];input.dispatchEvent(new Event('input',{bubbles:true}));input.dispatchEvent(new Event('change',{bubbles:true}))}}await pause();const next=work.querySelector('#nextExercise');if(next&&next.offsetParent)next.click();else{work.querySelector('#checkSeriesButton').click();return}await pause()}throw new Error('series did not end')})(wrong);
(async()=>{await new Promise(r=>server.listen(0,'127.0.0.1',r));const url='http://127.0.0.1:'+server.address().port+'/';const browser=await launchBrowser();
try{
  for(const motion of ['reduce','no-preference']){
    const page=await browser.newPage({viewport:{width:375,height:812},hasTouch:true,isMobile:true}),errors=[];page.on('pageerror',e=>errors.push(e.message));
    // Frozen clock: the new series gets exactly this savedAt, so a same-instant record can be placed after it.
    const instant='2026-11-21T10:00:00.000Z';await page.clock.setFixedTime(new Date(instant));
    await page.emulateMedia({reducedMotion:motion});await page.goto(url);await page.locator('[data-track=liuteria]').click();
    // Phone: the six learning steps stay on one swipeable row and never widen the page.
    const steps=await page.evaluate(()=>{const nav=document.querySelector('#learningSteps'),tops=new Set([...nav.querySelectorAll('li')].map(li=>Math.round(li.getBoundingClientRect().top)));return {height:nav.getBoundingClientRect().height,rows:tops.size,overflow:document.documentElement.scrollWidth>innerWidth}});
    assert.ok(steps.height<=70,'phone learning steps take at most 70px, got '+steps.height);assert.equal(steps.rows,1,'phone learning steps use one row');assert.equal(steps.overflow,false,'no horizontal page scroll on phone');
    const small=await page.evaluate(()=>[...document.querySelectorAll('.today>a,.learning-begin>a')].filter(a=>a.offsetParent&&a.getBoundingClientRect().height<44).map(a=>a.textContent));
    assert.deepEqual(small,[],'home links are at least 44px tall');
    await page.locator('#learningSteps [data-learning-go=topic]').click();await page.selectOption('#topic','parole|Articolo');
    await page.locator('#learningSteps [data-learning-go=practice]').click();await page.waitForSelector('#work .exercise:not([hidden])');await page.waitForTimeout(100);
    const visible=await page.evaluate(()=>{const row=document.querySelector('#learningSteps ol'),step=row.querySelector('[aria-current=step]').getBoundingClientRect(),box=row.getBoundingClientRect();return step.left>=box.left-1&&step.right<=box.right+1});
    assert.equal(visible,true,'current step is scrolled into view on the phone row');
    // Medal case lists all medals, earned or locked, before any activity.
    await page.evaluate(()=>document.dispatchEvent(new CustomEvent('atelier-progress-updated',{detail:{events:[]}})));
    assert.equal(await page.locator('#gameAwards .game-award').count(),6,'all six medals are listed');assert.equal(await page.locator('#gameAwards .game-award.locked').count(),6,'no medal is earned at start');
    // A stored record that sorts after the new series: a future date (first run) or the same instant
    // with a larger event ID (second run). The reward must still describe the series just checked.
    const decoy=motion==='reduce'
      ?{eventId:'future-record',activityId:'serie-futura',area:'logica',correct:1,total:5,mode:'closed',stars:1,savedAt:'2099-01-01T00:00:00.000Z',remote:false}
      :{eventId:'zzzz-same-instant',activityId:'serie-stesso-istante',area:'periodo',correct:1,total:5,mode:'closed',stars:1,savedAt:instant,remote:false};
    await page.evaluate(decoy=>{localStorage.setItem('atelier-events-v1:ospite',JSON.stringify([decoy]));window.__lastProgress=null;document.addEventListener('atelier-progress-updated',e=>{window.__lastProgress=e.detail.events})},decoy);
    // End of series: reward with stars, XP and progress meter inside the result status.
    await page.evaluate(solve,false);await page.waitForSelector('#seriesResult .reward-card');
    const check=await page.evaluate(decoyId=>{const id=window.ATELIER_LEARNING_BRIDGE.resultId(),events=window.__lastProgress,G=window.ATELIER_GAME,own=events.find(e=>e.eventId===id);
      const gained=G.summary(events).xp-G.summary(events.filter(e=>e.eventId!==id)).xp;
      const card=document.querySelector('#seriesResult .reward-card');
      return {id,decoyLast:events.at(-1).eventId===decoyId,own,gained,cardGained:Number(card.dataset.gained),title:card.querySelector('.reward-title').textContent,text:card.innerText,stars:card.querySelectorAll('.reward-star').length,on:card.querySelectorAll('.reward-star.on').length,meter:card.querySelector('[role=progressbar]').getAttribute('aria-valuenow'),hidden:card.querySelector('.reward-stars').getAttribute('aria-hidden'),animation:getComputedStyle(card).animationName,duration:parseFloat(getComputedStyle(card).animationDuration),medals:G.summary(events).awards.length}},decoy.eventId);
    assert.ok(check.id&&check.id!==decoy.eventId,'the bridge exposes the ID of the series just checked');
    assert.equal(check.decoyLast,true,'scenario check: the '+decoy.eventId+' record really sorts last');
    if(motion==='no-preference')assert.equal(check.own.savedAt,decoy.savedAt,'scenario check: identical timestamps');
    assert.equal(check.cardGained,check.gained,'reward XP comes from the series just checked, not from '+decoy.eventId);
    assert.equal(check.title,check.own.mode==='guided'?'Stellina di partecipazione':check.own.stars+(check.own.stars===1?' stellina':' stelline')+' su 3','reward stars come from the series just checked');
    assert.notEqual(check.title,'1 stellina su 3','the decoy one-star result is not shown');
    assert.match(check.text,/\+\d+ XP nel tuo atelier/,'first counted series awards XP');assert.ok(check.on>=1&&check.on<=check.stars,'earned stars are drawn');assert.equal(check.hidden,'true','decorative stars are hidden from assistive tech');assert.ok(Number(check.meter)>=0);
    if(motion==='reduce')assert.ok(check.animation==='none'||check.duration<0.01,'reduced motion removes the reward animation');else assert.equal(check.animation,'reward-rise','reward animates when motion is welcome');
    assert.match(await page.locator('#gameAwards').innerText(),new RegExp(check.medals+' di 6 medaglie'),'medal count follows the summary');
    // Repeating the same result cannot inflate XP, and the reward says so.
    const before=await page.evaluate(()=>window.ATELIER_GAME.summary(JSON.parse(localStorage.getItem('atelier-events-v1:ospite'))).xp);
    await page.evaluate(()=>{const id=window.ATELIER_LEARNING_BRIDGE.resultId(),events=JSON.parse(localStorage.getItem('atelier-events-v1:ospite'));const own=events.find(e=>e.eventId===id);events.push({...own,eventId:'0-earlier-copy'});localStorage.setItem('atelier-events-v1:ospite',JSON.stringify(events));document.dispatchEvent(new CustomEvent('atelier-progress-updated',{detail:{events}}));document.dispatchEvent(new Event('atelier-series-finished'))});
    assert.match(await page.locator('#seriesResult .reward-card').innerText(),/Nessun XP in più/,'a repeated result explains why no XP was added');
    assert.equal(await page.evaluate(()=>window.ATELIER_GAME.summary(JSON.parse(localStorage.getItem('atelier-events-v1:ospite'))).xp),before,'repeat keeps the same XP');
    assert.equal(await page.locator('#seriesResult .reward-card').count(),1,'only one reward card is shown');
    // An unknown or missing ID shows no reward rather than guessing from the list order.
    await page.evaluate(()=>{const bridge=window.ATELIER_LEARNING_BRIDGE,original=bridge.resultId;bridge.resultId=()=>'missing-id';document.dispatchEvent(new Event('atelier-series-finished'));bridge.resultId=original});
    assert.equal(await page.locator('#seriesResult .reward-card').count(),0,'no reward without a matching event ID');
    assert.deepEqual(errors,[]);await page.close();
  }
  // iPad portrait and landscape: six steps on one row, no horizontal scroll.
  for(const viewport of [{width:768,height:1024},{width:1024,height:768}]){
    const page=await browser.newPage({viewport,hasTouch:true});await page.emulateMedia({reducedMotion:'reduce'});await page.goto(url);await page.locator('[data-track=arredo]').click();
    const layout=await page.evaluate(()=>({rows:new Set([...document.querySelectorAll('#learningSteps li')].map(li=>Math.round(li.getBoundingClientRect().top))).size,overflow:document.documentElement.scrollWidth>innerWidth}));
    assert.equal(layout.rows,1,'tablet steps fit on one row at '+viewport.width);assert.equal(layout.overflow,false,'no horizontal scroll at '+viewport.width);await page.close();
  }
  console.log('PASS: phone steps row, touch targets, reward card, medal case, reduced motion and tablet layout');
}finally{await browser.close();server.close()}})().catch(error=>{console.error(error);process.exit(1)});
