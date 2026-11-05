const assert=require('node:assert/strict');
const fs=require('node:fs');
const vm=require('node:vm');
const context={window:{},document:undefined};vm.createContext(context);
vm.runInContext(fs.readFileSync(__dirname+'/../autovalutazione-app/grammatica/engine.js','utf8'),context);
vm.runInContext(fs.readFileSync(__dirname+'/../autovalutazione-app/grammatica/game.js','utf8'),context);
const E=context.window.ATELIER_ENGINE,G=context.window.ATELIER_GAME;
const event=(overrides={})=>({activityId:'serie-a',stars:3,mode:'closed',correct:6,total:6,area:'grammaticale',savedAt:'2026-11-01T10:00:00Z',...overrides});
assert.equal(E.totalStars([event(),event({eventId:'second'})]),3,'duplicate standard activity keeps its best score');
const race='gara-123e4567-e89b-42d3-a456-426614174000--serie-a';
assert.equal(E.totalStars([event({activityId:race,stars:2}),event({activityId:race.replace('serie-a','serie-b'),stars:3})]),3,'race retakes across series count once at best stars');
assert.equal(E.totalStars([event({activityId:race,stars:3,raceCounted:false}),event({activityId:race.replace('serie-a','serie-b'),stars:2,raceCounted:false})]),5,'uncounted race events use ordinary activity grouping');
assert.equal(E.totalStars([event({localOnly:true})]),0,'local-only events earn no game stars');
assert.equal(E.totalStars([event({stars:-500}),event({activityId:'other',stars:Infinity})]),3,'stars are finite and clamped');
assert.equal(G.summary([event(),event({eventId:'duplicate'})]).xp,30,'repeated event does not award duplicate XP');
assert.equal(G.summary([event({activityId:'oops-gara-bad--serie-a',stars:NaN,total:0,correct:NaN})]).xp,0,'invalid numeric results are excluded safely');
assert.equal(G.summary([event({localOnly:true})]).xp,0,'diagnostic and personal local-only data do not enter the game');
assert.equal(G.summary([]).levelNumber,1);
assert.equal(G.summary([event({activityId:'one',stars:6})]).stars,3,'input stars cap at three');
assert.equal(G.summary([event({activityId:'six',stars:3}),event({activityId:'twelve',stars:3})]).levelNumber,2,'60 XP reaches level two');
const xpEvents=xp=>Array.from({length:xp/10},(_,i)=>event({activityId:'xp-'+i,stars:1}));
assert.equal(G.summary(xpEvents(2500)).levelNumber,9,'2500 XP starts level nine');
assert.equal(G.summary(xpEvents(2500)).progressPercent,0,'level nine progress resets at its threshold');
assert.equal(G.summary(xpEvents(2990)).progressPercent,98,'2990 XP shows 98 percent toward level ten');
assert.equal(G.summary(xpEvents(3000)).levelNumber,10,'3000 XP starts level ten');
for(const xp of [0,60,180,360,600,900,1400,2000,2500,3000]){
  const stars=xp/10,rows=Array.from({length:stars},(_,i)=>event({activityId:'a'+i,stars:1}));
  assert.ok(Number.isFinite(G.summary(rows).progressPercent));
}
const badges=G.summary([
  event({activityId:'a',area:'grammaticale',savedAt:'2026-11-01T10:00:00Z',correct:4,total:5}),
  event({activityId:'b',area:'logica',savedAt:'2026-11-03T10:00:00Z',correct:5,total:5}),
  event({activityId:'c',area:'periodo',savedAt:'2026-11-05T10:00:00Z',correct:5,total:5}),
  event({activityId:'gara-123e4567-e89b-42d3-a456-426614174000--serie-a',raceCounted:true}),
  event({activityId:'verifica-standard-tema--serie-h',mode:'closed',correct:8,total:10}),
  event({activityId:'improve',correct:3,total:5}),event({activityId:'improve',correct:4,total:5})
]).awards.map(a=>a.id);
for(const id of ['first-mission','three-areas','three-days','improvement','race-finished','verification'])assert.ok(badges.includes(id),id+' badge is earned');
assert.ok(!G.summary([event({localOnly:true,raceCounted:true})]).awards.some(a=>a.id==='race-finished'));
const improvementBadge=events=>G.summary(events).awards.some(a=>a.id==='improvement');
assert.ok(improvementBadge([
  event({activityId:'same',mode:'closed',correct:9,total:10,savedAt:'2026-11-02T10:00:00Z'}),
  event({activityId:'same',mode:'closed',correct:4,total:5,savedAt:'2026-11-01T10:00:00Z'})
]),'unsorted history is sorted chronologically and compared by percentage');
assert.ok(!improvementBadge([
  event({activityId:'same',mode:'closed',correct:5,total:10,savedAt:'2026-11-01T10:00:00Z'}),
  event({activityId:'same',mode:'closed',correct:6,total:20,savedAt:'2026-11-02T10:00:00Z'})
]),'raw correct counts with a lower percentage do not count as improvement');
assert.ok(!improvementBadge([
  event({activityId:'same',mode:'guided',correct:1,total:2,savedAt:'2026-11-01T10:00:00Z'}),
  event({activityId:'same',mode:'closed',correct:2,total:2,savedAt:'2026-11-02T10:00:00Z'})
]),'guided attempts do not earn improvement badges');
assert.ok(improvementBadge([
  event({activityId:race,mode:'closed',raceCounted:true,correct:2,total:5,savedAt:'2026-11-01T10:00:00Z'}),
  event({activityId:race.replace('serie-a','serie-b'),mode:'closed',raceCounted:true,correct:4,total:5,savedAt:'2026-11-02T10:00:00Z'})
]),'counted race retakes group by race UUID');
const invalidEvents=[event({activityId:'',correct:2,total:3}),event({activityId:'bad',correct:4,total:3}),event({activityId:'nan',correct:NaN,total:3}),event({activityId:'zero',correct:0,total:0})];
assert.equal(G.summary(invalidEvents).xp,0,'invalid activities and results do not earn XP');
assert.equal(G.summary(invalidEvents).awards.length,0,'invalid events do not award badges');
console.log('game logic checks passed');
