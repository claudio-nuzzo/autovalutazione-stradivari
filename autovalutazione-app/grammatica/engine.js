(() => {
'use strict';
const normalize=value=>String(value??'').trim().toLocaleLowerCase('it').replace(/[’‘`]/g,"'").replace(/\s+/g,' ');
function grade(item,value){if(item.kind==='open')return {status:String(value||'').trim()?'guided':'empty',correct:null};if(item.kind==='choice')return {status:value===undefined?'empty':Number(value)===item.answer?'correct':'review',correct:Number(value)===item.answer};if(item.kind==='tokens'){const chosen=[...(value||[])].sort((a,b)=>a-b);return {status:!chosen.length?'empty':JSON.stringify(chosen)===JSON.stringify([...item.answer].sort((a,b)=>a-b))?'correct':'review',correct:JSON.stringify(chosen)===JSON.stringify([...item.answer].sort((a,b)=>a-b))}}const filled=normalize(value)!=='';const correct=filled&&item.answers.some(a=>normalize(a)===normalize(value));return {status:!filled?'empty':correct?'correct':'review',correct}}
function stars(event){return event.mode==='guided'?1:1+(event.total>0&&event.correct/event.total>=.6?1:0)+(event.total>0&&event.correct===event.total?1:0)}
function totalStars(events){const best=new Map();for(const e of events)best.set(e.activityId,Math.max(best.get(e.activityId)||0,Number.isInteger(e.stars)?e.stars:stars(e)));return [...best.values()].reduce((a,b)=>a+b,0)}
function idFor(ids){let h=2166136261;for(const c of ids.join('|')){h^=c.charCodeAt(0);h=Math.imul(h,16777619)}return 'serie-'+(h>>>0).toString(16)}
window.ATELIER_ENGINE={normalize,grade,stars,totalStars,idFor};
})();
