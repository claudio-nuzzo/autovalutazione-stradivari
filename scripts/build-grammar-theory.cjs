const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm'),assert=require('node:assert/strict');
const root=path.resolve(__dirname,'../autovalutazione-app/grammatica');
const lessons=['parole','verbi','periodo'].flatMap(name=>JSON.parse(fs.readFileSync(path.join(root,'theory-'+name+'.json'),'utf8')));
const c={window:{}};for(const name of ['content','extra-data','topic-data','learning-extra','periodo-extra','verbi-extra','track-data'])vm.runInNewContext(fs.readFileSync(path.join(root,name+'.js'),'utf8'),c);
const w=c.window,bank=[...w.ATELIER_CONTENT.exercises,...w.ATELIER_EXTRA,...w.ATELIER_TOPICS,...w.ATELIER_LEARNING_EXTRA,...w.ATELIER_PERIOD_EXTRA,...w.ATELIER_VERB_EXTRA,...w.ATELIER_TRACK_DATA];
const defaults={parole:'Articolo',frase:'Soggetto, predicato e oggetto',periodo:'Principale, coordinate e subordinate'};
const expected=new Set(bank.filter(x=>!x.pei&&!x.custom).map(x=>x.area+'|'+(x.topicGroup||defaults[x.area]))),actual=new Set(lessons.map(x=>x.area+'|'+x.topic));
assert.equal(lessons.length,80);assert.equal(actual.size,80);assert.deepEqual([...actual].sort(),[...expected].sort());
for(const lesson of lessons){assert.ok(lesson.anchor?.sentence&&lesson.anchor?.explanation&&lesson.anchor?.memory,lesson.topic+' anchor');assert.ok(lesson.sections.length>=4,lesson.topic+' sections');assert.ok(lesson.diagram.steps.length>=3,lesson.topic+' infographic');assert.ok(lesson.review.length>=3,lesson.topic+' review');assert.ok(lesson.pitfalls.length>=2);for(const k of ['base','consolidamento','avanzato'])assert.ok(lesson.levels[k].example.sentence);for(const k of ['moda','arredo','liuteria'])assert.ok(lesson.trackExamples[k].sentence);assert.ok(lesson.simplified?.steps.length>=3&&lesson.pei?.rule)}
fs.writeFileSync(path.join(root,'theory-data.js'),'/* Original theory lessons; source JSON is validated by build-grammar-theory.cjs. */\nwindow.ATELIER_THEORY = '+JSON.stringify(lessons)+';\n');
console.log('PASS:80/80 theory lessons match all exercise topics, each with anchor, infographic, three levels, review and support paths');
