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
// Every medal is listed in the personal medal case, earned or still to unlock, with a concrete hint.
const MEDALS=[
  {id:'first-mission',title:'Prima missione · hai completato la tua prima attività',name:'Prima missione',hint:'Completa una serie di esercizi.'},
  {id:'three-areas',title:'Esploratore · hai praticato in tutte e tre le aree',name:'Esploratore',hint:'Prova le parole, la frase e il periodo.'},
  {id:'three-days',title:'Costanza · hai praticato in tre giorni diversi',name:'Costanza',hint:'Allenati in tre giorni diversi, anche pochi minuti.'},
  {id:'improvement',title:'Un passo avanti · hai migliorato una stessa attività',name:'Un passo avanti',hint:'Ripeti una serie e supera il tuo risultato.'},
  {id:'race-finished',title:'Gara completata · hai concluso una gara conteggiata',name:'Gara completata',hint:'Concludi una gara della classe.'},
  {id:'verification',title:'Verifica superata · almeno l’80% di precisione',name:'Verifica superata',hint:'Supera una verifica finale con almeno l’80%.'}
];
const AREAS=new Set(['grammaticale','logica','periodo']);
const RACE_ACTIVITY=/^gara-([0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12})--serie-[a-z0-9]+$/i;
let latestEvents=[];
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
  const level=LEVELS[levelIndex];let levelNumber=levelIndex+1,levelBase=level.xp,nextXp,nextLabel;
  if(xp>=2000){const extra=Math.floor((xp-2000)/500);levelNumber=8+extra;levelBase=2000+extra*500;nextXp=levelBase+500;nextLabel=level.label}else{nextXp=LEVELS[levelIndex+1].xp;nextLabel=LEVELS[levelIndex+1].label}
  const progressPercent=Math.max(0,Math.min(100,((xp-levelBase)/(nextXp-levelBase))*100));
  const earned=new Set();
  const add=(id,ok)=>{if(ok)earned.add(id)};
  add('first-mission',valid.length>0);
  add('three-areas',new Set(valid.map(e=>e.area).filter(a=>AREAS.has(a))).size===3);
  const days=new Set(valid.map(e=>typeof e.savedAt==='string'&&/^\d{4}-\d{2}-\d{2}/.test(e.savedAt)?e.savedAt.slice(0,10):null).filter(Boolean));
  add('three-days',days.size>=3);
  add('improvement',hasImprovement(valid));
  add('race-finished',valid.some(e=>e.raceCounted===true&&RACE_ACTIVITY.test(e.activityId)));
  add('verification',valid.some(e=>typeof e.activityId==='string'&&e.activityId.startsWith('verifica-')&&e.mode==='closed'&&Number.isFinite(Number(e.total))&&Number(e.total)>0&&Number.isFinite(Number(e.correct))&&Number(e.correct)/Number(e.total)>=.8));
  const awards=MEDALS.filter(m=>earned.has(m.id)).map(({id,title})=>({id,title}));
  const medals=MEDALS.map(m=>({...m,earned:earned.has(m.id)}));
  return {xp,stars,levelNumber,levelLabel:level.label,nextXp,nextLabel,xpToNext:Math.max(0,nextXp-xp),progressPercent,awards,medals};
}
const NS='http://www.w3.org/2000/svg';
function svgMedal(){
  const svg=document.createElementNS(NS,'svg');svg.setAttribute('viewBox','0 0 32 32');svg.setAttribute('width','32');svg.setAttribute('height','32');svg.setAttribute('aria-hidden','true');svg.setAttribute('focusable','false');
  const ribbon=document.createElementNS(NS,'path');ribbon.setAttribute('d','M9 2h6l1 10-5-3-5 3zM23 2h-6l-1 10 5-3 5 3z');ribbon.setAttribute('fill','currentColor');
  const medal=document.createElementNS(NS,'circle');medal.setAttribute('cx','16');medal.setAttribute('cy','21');medal.setAttribute('r','9');medal.setAttribute('fill','none');medal.setAttribute('stroke','currentColor');medal.setAttribute('stroke-width','2');
  const star=document.createElementNS(NS,'path');star.setAttribute('d','m16 15 1.8 3.7 4.1.6-3 2.9.7 4.1-3.6-1.9-3.6 1.9.7-4.1-3-2.9 4.1-.6z');star.setAttribute('fill','currentColor');svg.append(ribbon,medal,star);return svg;
}
function svgStar(){
  const svg=document.createElementNS(NS,'svg');svg.setAttribute('viewBox','0 0 24 24');svg.setAttribute('aria-hidden','true');svg.setAttribute('focusable','false');
  const p=document.createElementNS(NS,'path');p.setAttribute('d','m12 2.6 2.9 5.9 6.5.9-4.7 4.6 1.1 6.5L12 17.4l-5.8 3.1 1.1-6.5-4.7-4.6 6.5-.9z');svg.append(p);return svg;
}
function el(tag,className,text){const node=document.createElement(tag);if(className)node.className=className;if(text!==undefined)node.textContent=text;return node}
function meter(percent,label){
  const m=el('div','game-meter');m.setAttribute('role','progressbar');m.setAttribute('aria-label',label);m.setAttribute('aria-valuemin','0');m.setAttribute('aria-valuemax','100');m.setAttribute('aria-valuenow',String(Math.round(percent)));
  const bar=el('div');bar.style.width=percent+'%';m.append(bar);return m;
}
function nextText(result){return 'Mancano '+result.xpToNext+' XP al livello '+(result.levelNumber+1)+' · '+result.nextLabel}
function render(events){
  const result=summary(events),widget=document.querySelector('#gameWidget'),medals=document.querySelector('#gameAwards');
  latestEvents=Array.isArray(events)?events:[];
  if(widget){widget.replaceChildren();widget.classList.add('game-widget');
    widget.append(el('h2','','Il tuo livello'));
    const level=el('p','game-level'),badge=el('span','game-badge',String(result.levelNumber));badge.setAttribute('aria-hidden','true');
    level.append(badge,el('span','','Livello '+result.levelNumber+' · '+result.levelLabel));widget.append(level);
    widget.append(el('p','game-stats',result.stars+' stelline · '+result.xp+' XP'));
    widget.append(meter(result.progressPercent,'Progresso verso il prossimo livello'));
    widget.append(el('p','game-next',nextText(result)));
  }
  if(medals){medals.replaceChildren();medals.classList.add('game-awards');
    medals.append(el('h2','','Medagliere personale'));
    medals.append(el('p','game-awards-count',result.awards.length+' di '+result.medals.length+' medaglie. Le altre si sbloccano con costanza, non con la velocità.'));
    for(const medal of result.medals){
      const item=el('article','game-award'+(medal.earned?'':' locked'));item.dataset.medal=medal.id;item.append(svgMedal());
      const text=el('div');text.append(el('h3','',medal.earned?medal.title:medal.name));
      if(!medal.earned)text.append(el('p','','Da sbloccare · '+medal.hint));
      item.append(text);medals.append(item);
    }
  }
  return result;
}
// End-of-series reward, shown only after a saved and counted series, inside the existing result box.
function reward(){
  const box=document.querySelector('#seriesResult');if(!box||!latestEvents.length)return;
  const last=latestEvents[latestEvents.length-1];
  if(!last||last.localOnly===true||!validEvents([last]).length)return;
  const before=summary(latestEvents.slice(0,-1)),after=summary(latestEvents);
  const gained=after.xp-before.xp,guided=last.mode==='guided',earnedNow=guided?1:Math.max(1,Math.min(3,Math.round(Number(last.stars)||1)));
  box.querySelector('.reward-card')?.remove();
  const card=el('div','reward-card');card.dataset.gained=String(gained);
  const row=el('p','reward-stars');row.setAttribute('aria-hidden','true');
  for(let i=0;i<(guided?1:3);i++){const s=el('span','reward-star'+(i<earnedNow?' on':''));s.style.setProperty('--i',String(i));s.append(svgStar());row.append(s)}
  card.append(row);
  card.append(el('p','reward-title',guided?'Stellina di partecipazione':earnedNow+(earnedNow===1?' stellina':' stelline')+' su 3'));
  card.append(el('p','reward-xp',gained>0?'+'+gained+' XP nel tuo atelier':'Nessun XP in più: per questa serie conta già il tuo risultato migliore.'));
  const levelUp=after.levelNumber>before.levelNumber;
  if(levelUp)card.append(el('p','reward-levelup','Nuovo livello! '+after.levelNumber+' · '+after.levelLabel));
  for(const medal of after.awards.filter(a=>!before.awards.some(b=>b.id===a.id))){const p=el('p','reward-medal');p.append(svgMedal(),el('span','','Nuova medaglia: '+MEDALS.find(m=>m.id===medal.id).name));card.append(p)}
  const m=meter(levelUp?0:before.progressPercent,'Progresso verso il prossimo livello');m.setAttribute('aria-valuenow',String(Math.round(after.progressPercent)));card.append(m);
  card.append(el('p','game-next',nextText(after)));
  box.append(card);
  const bar=m.firstElementChild;requestAnimationFrame(()=>requestAnimationFrame(()=>{bar.style.width=after.progressPercent+'%'}));
}
window.ATELIER_GAME={summary,render,medals:MEDALS.map(m=>({...m}))};
if(typeof document!=='undefined'){document.addEventListener('atelier-progress-updated',event=>render(event.detail?.events));document.addEventListener('atelier-series-finished',reward)}
})();
