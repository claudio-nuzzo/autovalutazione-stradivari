const {test}=require('node:test'),assert=require('node:assert/strict'),vm=require('node:vm'),fs=require('node:fs'),path=require('node:path');
const base=path.join(__dirname,'../autovalutazione-app/grammatica');const c={window:{}};for(const f of ['content.js','extra-data.js','topic-data.js','learning-extra.js','periodo-extra.js','verbi-extra.js','track-data.js','engine.js'])vm.runInNewContext(fs.readFileSync(path.join(base,f),'utf8'),c);
test('grammar bank has unique IDs, valid answers and the topic resources without portal pills',()=>{const w=c.window,bank=[...w.ATELIER_CONTENT.exercises,...w.ATELIER_EXTRA,...w.ATELIER_TOPICS,...w.ATELIER_LEARNING_EXTRA,...w.ATELIER_PERIOD_EXTRA,...w.ATELIER_VERB_EXTRA,...w.ATELIER_TRACK_DATA];assert.equal(bank.length,1191);assert.equal(new Set(bank.map(x=>x.id)).size,1191);assert.equal(w.ATELIER_CONTENT.pills,undefined);for(const item of bank){assert.ok(['parole','frase','periodo'].includes(item.area));assert.ok(item.prompt);if(item.kind==='choice'){assert.ok(item.answer>=0&&item.answer<item.options.length);assert.equal(new Set(item.options).size,item.options.length);assert.equal(item.solution,item.options[item.answer])}if(item.kind==='exact')assert.ok(item.answers.length);if(item.kind==='tokens')assert.ok(item.answer.every(i=>i>=0&&i<item.tokens.length))}});

test('balanced choice positions preserve correct answers and accept valid verb variants',()=>{const w=c.window,bank=[...w.ATELIER_CONTENT.exercises,...w.ATELIER_EXTRA,...w.ATELIER_TOPICS,...w.ATELIER_LEARNING_EXTRA,...w.ATELIER_PERIOD_EXTRA,...w.ATELIER_VERB_EXTRA,...w.ATELIER_TRACK_DATA];w.ATELIER_ENGINE.balanceChoices(bank);for(const n of [2,3,4]){const a=bank.filter(x=>x.kind==='choice'&&x.options.length===n),counts=Array.from({length:n},(_,i)=>a.filter(x=>x.answer===i).length);assert.ok(Math.max(...counts)-Math.min(...counts)<=1);for(const x of a)assert.equal(x.options[x.answer],x.solution)}const items=w.ATELIER_VERB_EXTRA;assert.equal(items.length,768);const female=items.find(x=>x.prompt.includes('«partire»')&&x.prompt.includes('passato prossimo')&&x.prompt.includes('prima persona singolare'));assert.ok(female);assert.equal(w.ATELIER_ENGINE.grade(female,'sono partita').status,'correct');assert.equal(w.ATELIER_ENGINE.grade(female,'ho partito').status,'review')});

test('reasoned responses remain guided and outside automatic scoring',()=>{const item=c.window.ATELIER_CONTENT.exercises.find(x=>x.id==='parole-banca-28');assert.equal(item.kind,'open');assert.match(item.prompt,/B\. Un arco/);assert.equal(item.originalOptions[1],item.solution);assert.equal(c.window.ATELIER_ENGINE.grade(item,'Un arco, perché il nome è maschile.').status,'guided')});


test('all 80 theory topics are complete and generated data matches editorial sources',()=>{
 const sources=['parole','verbi','periodo'].flatMap(name=>JSON.parse(fs.readFileSync(path.join(base,'theory-'+name+'.json'),'utf8')));
 const generated={window:{}};vm.runInNewContext(fs.readFileSync(path.join(base,'theory-data.js'),'utf8'),generated);
 assert.deepEqual(JSON.parse(JSON.stringify(generated.window.ATELIER_THEORY)),sources,'Run npm run build:theory after editing a source lesson');
 const w=c.window,bank=[...w.ATELIER_CONTENT.exercises,...w.ATELIER_EXTRA,...w.ATELIER_TOPICS,...w.ATELIER_LEARNING_EXTRA,...w.ATELIER_PERIOD_EXTRA,...w.ATELIER_VERB_EXTRA,...w.ATELIER_TRACK_DATA],defaults={parole:'Articolo',frase:'Soggetto, predicato e oggetto',periodo:'Principale, coordinate e subordinate'};
 const expected=[...new Set(bank.filter(x=>!x.pei&&!x.custom).map(x=>x.area+'|'+(x.topicGroup||defaults[x.area])))].sort();
 assert.equal(sources.length,80);assert.equal(new Set(sources.map(x=>x.area+'|'+x.topic)).size,80);
 assert.deepEqual(sources.map(x=>x.area+'|'+x.topic).sort(),expected);
 const prose=sentence=>assert.ok(typeof sentence==='string'&&sentence.trim().length>0);
 for(const lesson of sources){
  for(const p of Object.values(lesson.anchor))prose(p);
  assert.ok(lesson.sections.length>=4,lesson.topic);assert.ok(lesson.sections.every(s=>s.title&&s.text));
  assert.ok(lesson.sections.flatMap(s=>s.examples||[]).length>=5,lesson.topic+' explained examples');
  assert.ok(lesson.diagram.steps.length>=3);assert.ok(lesson.review.length>=3);assert.ok(lesson.pitfalls.length>=2);assert.ok(lesson.recap.length>=4);
  for(const section of lesson.sections)if(section.table){assert.ok(section.table.headers.length>=2);for(const row of section.table.rows)assert.equal(row.length,section.table.headers.length)}
  for(const level of ['base','consolidamento','avanzato']){prose(lesson.levels[level].focus);prose(lesson.levels[level].example.sentence);prose(lesson.levels[level].example.explanation)}
  for(const track of ['moda','arredo','liuteria']){prose(lesson.trackExamples[track].sentence);prose(lesson.trackExamples[track].explanation)}
  assert.ok(lesson.simplified.steps.length>=3);prose(lesson.pei.rule);prose(lesson.pei.example.sentence);
 }
});
