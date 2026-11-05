/* Personal game progression, derived only from the events supplied by the app. */
(() => {
'use strict';
const LEVELS=[
  {xp:0,label:'Apprendista delle parole'},
  {xp:60,label:'Cacciatore di indizi'},
  {xp:180,label:'Intrecciatore di frasi'},
  {xp:360,label:'Esploratore del periodo'},
  {xp:600,label:'Custode delle regole'},
  {xp:900,label:'Maestro di bottega'},
  {xp:1400,label:'Architetto della lingua'},
  {xp:2000,label:'Artigiano delle parole'}
];
const AREAS=new Set(['grammaticale','logica','periodo']);
const RACE_ACTIVITY=/^gara-([0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12})--serie-[a-z0-9]+$/i;
function validEvents(events){return (Array.isArray(events)?events:[]).filter(e=>e&&typeof e==='object'&&e.localOnly!==true&&typeof e.activityId==='string'&&e.activityId.trim()!==''&&Number.isFinite(e.total)&&e.total>0&&Number.isFinite(e.correct)&&e.correct>=0&&e.correct<=e.total)}
function improvementKey(event){const race=event.raceCounted===true&&event.activityId.match(RACE_ACTIVITY);return race?'race-'+race[1].toLowerCase():event.activityId}
function hasImprovement(events){
  const chronological=events.map((event,index)=>({event,index,time:Date.parse(event.savedAt)})).filter(row=>row.event.mode==='closed'&&Number.isFinite(row.time)).sort((a,b)=>a.time-b.time||a.index-b.index);
  const best=new Map();
  for(const {event} of chronological){const key=improvementKey(event),score=event.correct/event.total,previous=best.get(key);if(previous!==undefined&&score>previous)return true;if(previous===undefined||score>previous)best.set(key,score)}
  return false;
}
function summary(events){
  const valid=validEvents(events),stars=window.ATELIER_ENGINE.totalStars(valid),xp=stars*10;
  let levelIndex=0;
  for(let i=1;i<LEVELS.length;i++)if(xp>=LEVELS[i].xp)levelIndex=i;else break;
  const level=LEVELS[levelIndex];let levelNumber=levelIndex+1,levelBase=level.xp,nextXp;
  if(xp>=2000){const extra=Math.floor((xp-2000)/500);levelNumber=8+extra;levelBase=2000+extra*500;nextXp=levelBase+500}else nextXp=LEVELS[levelIndex+1].xp;
  const progressPercent=Math.max(0,Math.min(100,((xp-levelBase)/(nextXp-levelBase))*100));
  const awards=[];
  const add=(id,title,earned)=>{if(earned)awards.push({id,title})};
  add('first-mission','Prima missione · hai completato la tua prima attività',valid.length>0);
  add('three-areas','Esploratore · hai praticato in tutte e tre le aree',new Set(valid.map(e=>e.area).filter(a=>AREAS.has(a))).size===3);
  const days=new Set(valid.map(e=>typeof e.savedAt==='string'&&/^\d{4}-\d{2}-\d{2}/.test(e.savedAt)?e.savedAt.slice(0,10):null).filter(Boolean));
  add('three-days','Costanza · hai praticato in tre giorni diversi',days.size>=3);
  add('improvement','Un passo avanti · hai migliorato una stessa attività',hasImprovement(valid));
  add('race-finished','Gara completata · hai concluso una gara conteggiata',valid.some(e=>e.raceCounted===true&&RACE_ACTIVITY.test(e.activityId)));
  add('verification','Verifica superata · almeno l’80% di precisione',valid.some(e=>typeof e.activityId==='string'&&e.activityId.startsWith('verifica-')&&e.mode==='closed'&&Number.isFinite(Number(e.total))&&Number(e.total)>0&&Number.isFinite(Number(e.correct))&&Number(e.correct)/Number(e.total)>=.8));
  return {xp,stars,levelNumber,levelLabel:level.label,nextXp,progressPercent,awards};
}
function svgMedal(){
  const svg=document.createElementNS('http://www.w3.org/2000/svg','svg');svg.setAttribute('viewBox','0 0 32 32');svg.setAttribute('width','32');svg.setAttribute('height','32');svg.setAttribute('aria-hidden','true');
  const ribbon=document.createElementNS(svg.namespaceURI,'path');ribbon.setAttribute('d','M9 2h6l1 10-5-3-5 3zM23 2h-6l-1 10 5-3 5 3z');ribbon.setAttribute('fill','currentColor');
  const medal=document.createElementNS(svg.namespaceURI,'circle');medal.setAttribute('cx','16');medal.setAttribute('cy','21');medal.setAttribute('r','9');medal.setAttribute('fill','none');medal.setAttribute('stroke','currentColor');medal.setAttribute('stroke-width','2');
  const star=document.createElementNS(svg.namespaceURI,'path');star.setAttribute('d','m16 15 1.8 3.7 4.1.6-3 2.9.7 4.1-3.6-1.9-3.6 1.9.7-4.1-3-2.9 4.1-.6z');star.setAttribute('fill','currentColor');svg.append(ribbon,medal,star);return svg;
}
function render(events){
  const result=summary(events),widget=document.querySelector('#gameWidget'),medals=document.querySelector('#gameAwards');
  if(widget){widget.replaceChildren();widget.classList.add('game-widget');
    const title=document.createElement('h2');title.textContent='Il tuo livello';widget.append(title);
    const level=document.createElement('p');level.className='game-level';level.textContent='Livello '+result.levelNumber+' · '+result.levelLabel;widget.append(level);
    const stats=document.createElement('p');stats.textContent=result.stars+' stelline · '+result.xp+' XP';widget.append(stats);
    const meter=document.createElement('div');meter.className='game-meter';meter.setAttribute('role','progressbar');meter.setAttribute('aria-label','Progresso verso il prossimo livello');meter.setAttribute('aria-valuemin','0');meter.setAttribute('aria-valuemax','100');meter.setAttribute('aria-valuenow',String(Math.round(result.progressPercent)));
    const bar=document.createElement('div');bar.style.width=result.progressPercent+'%';meter.append(bar);widget.append(meter);
    const next=document.createElement('p');next.className='game-next';next.textContent='Prossimo traguardo: '+result.nextXp+' XP';widget.append(next);
  }
  if(medals){medals.replaceChildren();medals.classList.add('game-awards');const heading=document.createElement('h2');heading.textContent='Medagliere personale';medals.append(heading);
    if(!result.awards.length){const empty=document.createElement('p');empty.textContent='Le medaglie appariranno qui mentre completi le missioni.';medals.append(empty)}
    for(const award of result.awards){const item=document.createElement('article');item.className='game-award';item.append(svgMedal());const name=document.createElement('h3');name.textContent=award.title;item.append(name);medals.append(item)}
  }
  return result;
}
window.ATELIER_GAME={summary,render};
if(typeof document!=='undefined')document.addEventListener('atelier-progress-updated',event=>render(event.detail?.events));
})();
