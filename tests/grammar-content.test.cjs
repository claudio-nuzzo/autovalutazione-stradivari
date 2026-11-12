const {test}=require('node:test'),assert=require('node:assert/strict'),vm=require('node:vm'),fs=require('node:fs'),path=require('node:path');
const base=path.join(__dirname,'../autovalutazione-app/grammatica');const c={window:{}};for(const f of ['content.js','extra-data.js','topic-data.js','learning-extra.js','periodo-extra.js','verbi-extra.js','track-data.js','nuovi-articolo-nome.js','nuovi-logica.js','nuovi-periodo.js','nuovi-ortografia.js','nuovi-parti.js','nuovi-verbi-contesto.js','nuovi-complementi.js','nuovi-pronomi-aggettivi.js','nuovi-subordinate.js','nuovi-ortografia-avanzata.js','nuovi-subordinate-avanzate.js','nuovi-complementi-avanzati.js','nuovi-invariabili.js','nuovi-gruppi-rari.js','nuovi-complementi-rari.js','nuovi-passivo-riflessivo.js','nuovi-nome-articolo-avanzati.js','nuovi-congiunzioni-preposizioni.js','nuovi-complementi-pratica.js','nuovi-morfologia-pratica.js','nuovi-periodo-pratica.js','nuovi-basi-rinforzo.js','nuovi-periodo-rinforzo.js','nuovi-parole-rinforzo.js','nuovi-logica-contesto.js','nuovi-periodi-contesto.js','nuovi-parole-contesto.js','nuovi-logica-sfide.js','nuovi-periodo-sfide.js','nuovi-parole-sfide.js','nuovi-logica-approfondita.js','nuovi-periodo-approfondito.js','nuovi-casi-avanzati.js','pei-parole-verifiche.js','pei-frase-verifiche.js','pei-periodo-verifiche.js','engine.js'])vm.runInNewContext(fs.readFileSync(path.join(base,f),'utf8'),c);
test('grammar bank has unique IDs, valid answers and the topic resources without portal pills',()=>{const w=c.window,bank=[...w.ATELIER_CONTENT.exercises,...w.ATELIER_EXTRA,...w.ATELIER_TOPICS,...w.ATELIER_LEARNING_EXTRA,...w.ATELIER_PERIOD_EXTRA,...w.ATELIER_VERB_EXTRA,...w.ATELIER_TRACK_DATA,...w.ATELIER_NEW_ARTICOLO_NOME,...w.ATELIER_NEW_LOGICA,...w.ATELIER_NEW_PERIODO,...w.ATELIER_NEW_ORTOGRAFIA,...w.ATELIER_NEW_PARTI,...w.ATELIER_NEW_VERBI_CONTESTO,...w.ATELIER_NEW_COMPLEMENTI,...w.ATELIER_NEW_PRONOMI_AGGETTIVI,...w.ATELIER_NEW_SUBORDINATE,...w.ATELIER_NEW_ORTOGRAFIA_AVANZATA,...w.ATELIER_NEW_SUBORDINATE_AVANZATE,...w.ATELIER_NEW_COMPLEMENTI_AVANZATI,...w.ATELIER_NEW_INVARIABILI,...w.ATELIER_NEW_GRUPPI_RARI,...w.ATELIER_NEW_COMPLEMENTI_RARI,...w.ATELIER_NEW_PASSIVO_RIFLESSIVO,...w.ATELIER_NEW_NOME_ARTICOLO_AVANZATI,...w.ATELIER_NEW_CONGIUNZIONI_PREPOSIZIONI,...w.ATELIER_NEW_COMPLEMENTI_PRATICA,...w.ATELIER_NEW_MORFOLOGIA_PRATICA,...w.ATELIER_NEW_PERIODO_PRATICA,...w.ATELIER_NEW_BASI_RINFORZO,...w.ATELIER_NEW_PERIODO_RINFORZO,...w.ATELIER_NEW_PAROLE_RINFORZO,...w.ATELIER_NEW_LOGICA_CONTESTO,...w.ATELIER_NEW_PERIODI_CONTESTO,...w.ATELIER_NEW_PAROLE_CONTESTO,...w.ATELIER_NEW_LOGICA_SFIDE,...w.ATELIER_NEW_PERIODO_SFIDE,...w.ATELIER_NEW_PAROLE_SFIDE,...w.ATELIER_NEW_LOGICA_APPROFONDITA,...w.ATELIER_NEW_PERIODO_APPROFONDITO,...w.ATELIER_NEW_CASI_AVANZATI,...w.ATELIER_PEI_PAROLE,...w.ATELIER_PEI_FRASE,...w.ATELIER_PEI_PERIODO];assert.equal(bank.length,3544);assert.equal(new Set(bank.map(x=>x.id)).size,bank.length);assert.equal(w.ATELIER_CONTENT.pills,undefined);for(const item of bank){assert.ok(['parole','frase','periodo'].includes(item.area));assert.ok(item.prompt);if(item.kind==='choice'){assert.ok(item.answer>=0&&item.answer<item.options.length);assert.equal(new Set(item.options).size,item.options.length);assert.equal(item.solution,item.options[item.answer])}if(item.kind==='exact')assert.ok(item.answers.length);if(item.kind==='tokens')assert.ok(item.answer.every(i=>i>=0&&i<item.tokens.length))}});

test('balanced choice positions preserve correct answers and accept valid verb variants',()=>{const w=c.window,bank=[...w.ATELIER_CONTENT.exercises,...w.ATELIER_EXTRA,...w.ATELIER_TOPICS,...w.ATELIER_LEARNING_EXTRA,...w.ATELIER_PERIOD_EXTRA,...w.ATELIER_VERB_EXTRA,...w.ATELIER_TRACK_DATA,...w.ATELIER_NEW_ARTICOLO_NOME,...w.ATELIER_NEW_LOGICA,...w.ATELIER_NEW_PERIODO,...w.ATELIER_NEW_ORTOGRAFIA,...w.ATELIER_NEW_PARTI,...w.ATELIER_NEW_VERBI_CONTESTO,...w.ATELIER_NEW_COMPLEMENTI,...w.ATELIER_NEW_PRONOMI_AGGETTIVI,...w.ATELIER_NEW_SUBORDINATE,...w.ATELIER_NEW_ORTOGRAFIA_AVANZATA,...w.ATELIER_NEW_SUBORDINATE_AVANZATE,...w.ATELIER_NEW_COMPLEMENTI_AVANZATI,...w.ATELIER_NEW_INVARIABILI,...w.ATELIER_NEW_GRUPPI_RARI,...w.ATELIER_NEW_COMPLEMENTI_RARI,...w.ATELIER_NEW_PASSIVO_RIFLESSIVO,...w.ATELIER_NEW_NOME_ARTICOLO_AVANZATI,...w.ATELIER_NEW_CONGIUNZIONI_PREPOSIZIONI,...w.ATELIER_NEW_COMPLEMENTI_PRATICA,...w.ATELIER_NEW_MORFOLOGIA_PRATICA,...w.ATELIER_NEW_PERIODO_PRATICA,...w.ATELIER_NEW_BASI_RINFORZO,...w.ATELIER_NEW_PERIODO_RINFORZO,...w.ATELIER_NEW_PAROLE_RINFORZO,...w.ATELIER_NEW_LOGICA_CONTESTO,...w.ATELIER_NEW_PERIODI_CONTESTO,...w.ATELIER_NEW_PAROLE_CONTESTO,...w.ATELIER_NEW_LOGICA_SFIDE,...w.ATELIER_NEW_PERIODO_SFIDE,...w.ATELIER_NEW_PAROLE_SFIDE,...w.ATELIER_NEW_LOGICA_APPROFONDITA,...w.ATELIER_NEW_PERIODO_APPROFONDITO,...w.ATELIER_NEW_CASI_AVANZATI,...w.ATELIER_PEI_PAROLE,...w.ATELIER_PEI_FRASE,...w.ATELIER_PEI_PERIODO];w.ATELIER_ENGINE.balanceChoices(bank);for(const n of [2,3,4]){const a=bank.filter(x=>x.kind==='choice'&&x.options.length===n),counts=Array.from({length:n},(_,i)=>a.filter(x=>x.answer===i).length);assert.ok(Math.max(...counts)-Math.min(...counts)<=1);for(const x of a)assert.equal(x.options[x.answer],x.solution)}const items=w.ATELIER_VERB_EXTRA;assert.equal(items.length,768);const female=items.find(x=>x.prompt.includes('«partire»')&&x.prompt.includes('passato prossimo')&&x.prompt.includes('prima persona singolare'));assert.ok(female);assert.equal(w.ATELIER_ENGINE.grade(female,'sono partita').status,'correct');assert.equal(w.ATELIER_ENGINE.grade(female,'ho partito').status,'review')});

test('reasoned responses remain guided and outside automatic scoring',()=>{const item=c.window.ATELIER_CONTENT.exercises.find(x=>x.id==='parole-banca-28');assert.equal(item.kind,'open');assert.match(item.prompt,/B\. Un arco/);assert.equal(item.originalOptions[1],item.solution);assert.equal(c.window.ATELIER_ENGINE.grade(item,'Un arco, perché il nome è maschile.').status,'guided')});

test('optional final period does not invalidate a grammatical identification',()=>{
 const grade=c.window.ATELIER_ENGINE.grade;
 assert.equal(grade({kind:'exact',topicGroup:'Oggetto',answers:['la collega']},'la collega.').status,'correct');
 assert.equal(grade({kind:'exact',topicGroup:'Punteggiatura',answers:['.']},'').status,'empty');
 assert.equal(grade({kind:'exact',topicGroup:'Ortografia',answers:['perché']},'perché.').status,'review');
});

test('feminine articles accept both elided and full forms when the prompt allows them',()=>{
 const w=c.window, grade=w.ATELIER_ENGINE.grade;
 const amica=w.ATELIER_TOPICS.find(x=>x.id==='t81');
 const allieva=w.ATELIER_NEW_ORTOGRAFIA.find(x=>x.id==='ort-nuovo-008');
 for(const value of ['un’amica','una amica'])assert.equal(grade(amica,value).status,'correct');
 for(const value of ['un’allieva','una allieva'])assert.equal(grade(allieva,value).status,'correct');
 assert.equal(grade(amica,'un amica').status,'review');
});


test('all 82 theory topics are complete and generated data matches editorial sources',()=>{
 const sources=['parole','verbi','periodo'].flatMap(name=>JSON.parse(fs.readFileSync(path.join(base,'theory-'+name+'.json'),'utf8')));
 const generated={window:{}};vm.runInNewContext(fs.readFileSync(path.join(base,'theory-data.js'),'utf8'),generated);
 assert.deepEqual(JSON.parse(JSON.stringify(generated.window.ATELIER_THEORY)),sources,'Run npm run build:theory after editing a source lesson');
 const w=c.window,bank=[...w.ATELIER_CONTENT.exercises,...w.ATELIER_EXTRA,...w.ATELIER_TOPICS,...w.ATELIER_LEARNING_EXTRA,...w.ATELIER_PERIOD_EXTRA,...w.ATELIER_VERB_EXTRA,...w.ATELIER_TRACK_DATA,...w.ATELIER_NEW_ARTICOLO_NOME,...w.ATELIER_NEW_LOGICA,...w.ATELIER_NEW_PERIODO,...w.ATELIER_NEW_ORTOGRAFIA,...w.ATELIER_NEW_PARTI,...w.ATELIER_NEW_VERBI_CONTESTO,...w.ATELIER_NEW_COMPLEMENTI,...w.ATELIER_NEW_PRONOMI_AGGETTIVI,...w.ATELIER_NEW_SUBORDINATE,...w.ATELIER_NEW_ORTOGRAFIA_AVANZATA,...w.ATELIER_NEW_SUBORDINATE_AVANZATE,...w.ATELIER_NEW_COMPLEMENTI_AVANZATI,...w.ATELIER_NEW_INVARIABILI,...w.ATELIER_NEW_GRUPPI_RARI,...w.ATELIER_NEW_COMPLEMENTI_RARI,...w.ATELIER_NEW_PASSIVO_RIFLESSIVO,...w.ATELIER_NEW_NOME_ARTICOLO_AVANZATI,...w.ATELIER_NEW_CONGIUNZIONI_PREPOSIZIONI,...w.ATELIER_NEW_COMPLEMENTI_PRATICA,...w.ATELIER_NEW_MORFOLOGIA_PRATICA,...w.ATELIER_NEW_PERIODO_PRATICA,...w.ATELIER_NEW_BASI_RINFORZO,...w.ATELIER_NEW_PERIODO_RINFORZO,...w.ATELIER_NEW_PAROLE_RINFORZO,...w.ATELIER_NEW_LOGICA_CONTESTO,...w.ATELIER_NEW_PERIODI_CONTESTO,...w.ATELIER_NEW_PAROLE_CONTESTO,...w.ATELIER_NEW_LOGICA_SFIDE,...w.ATELIER_NEW_PERIODO_SFIDE,...w.ATELIER_NEW_PAROLE_SFIDE,...w.ATELIER_NEW_LOGICA_APPROFONDITA,...w.ATELIER_NEW_PERIODO_APPROFONDITO,...w.ATELIER_NEW_CASI_AVANZATI,...w.ATELIER_PEI_PAROLE,...w.ATELIER_PEI_FRASE,...w.ATELIER_PEI_PERIODO],defaults={parole:'Articolo',frase:'Soggetto, predicato e oggetto',periodo:'Principale, coordinate e subordinate'};
 const expected=[...new Set(bank.filter(x=>!x.pei&&!x.custom).map(x=>x.area+'|'+(x.topicGroup||defaults[x.area])))].sort();
 assert.equal(sources.length,82);assert.equal(new Set(sources.map(x=>x.area+'|'+x.topic)).size,82);
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

test('choice explanations identify the sentence even after options are rebalanced',()=>{
 const w=c.window,bank=[...w.ATELIER_CONTENT.exercises,...Object.values(w).filter(Array.isArray).flat()],byId=new Map(bank.map(x=>[x.id,x]));
 const expected={
  'am-extra-010':'Ho scelto delle perline','esp-parti-007':'Quel mobile è nuovo',
  'vc-contesto-025':'La porta è stata chiusa','vc-contesto-033':'In questa situazione posso poco',
  'pa-nuovo-018':'La nostra squadra misura il tavolo','pa-nuovo-041':'Il libro che leggo è utile',
  'sub-altre-004':'Riponi il cartone dove c’è posto','inv-nuovo-018':'Se piove, resto in aula',
  'inv-nuovo-022':'Penso che il progetto sia pronto','pass-rifl-005':'Il progetto è stato approvato',
  'pass-rifl-019':'Ho due matite','na-av-006':'Bevo dello sciroppo',
  'na-av-015':'Il rosso del campione è intenso','cp-nuovo-032':'Se la colla asciuga, montiamo il pezzo',
  'cp-nuovo-034':'Credo che il progetto funzioni','periodo-rinforzo-017':'Se il metro è qui, lo uso',
  'periodo-rinforzo-059':'Penso che la prova sia finita','log-contesto-013':'Conosco una liutaia esperta',
  'per-approf-002':'Hai riposto il metro?'
 };
 const chosen=Object.entries(expected).map(([id,phrase])=>{const item=byId.get(id);assert.ok(item,id);assert.ok(item.solution.includes(phrase),id);assert.ok(item.feedback.includes(phrase),id);return item});
 const positions=chosen.map(item=>item.answer);w.ATELIER_ENGINE.balanceChoices(chosen);
 assert.ok(chosen.some((item,i)=>item.answer!==positions[i]),'il test deve effettivamente cambiare almeno una posizione');
 for(const item of chosen){assert.equal(item.options[item.answer],item.solution,item.id);assert.ok(item.feedback.includes(expected[item.id]),item.id)}
});
