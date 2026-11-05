const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const context = vm.createContext({window: {}});
for (const name of ['content', 'extra-data', 'topic-data', 'learning-extra', 'periodo-extra', 'verbi-extra', 'track-data', 'engine', 'assessments']) {
  vm.runInContext(fs.readFileSync(path.join(__dirname, '../autovalutazione-app/grammatica', name + '.js'), 'utf8'), context, {filename: name + '.js'});
}
const W = context.window, A = W.ATELIER_ASSESSMENTS, E = W.ATELIER_ENGINE;
const bank = [...W.ATELIER_EXTRA, ...W.ATELIER_CONTENT.exercises, ...W.ATELIER_TOPICS, ...W.ATELIER_LEARNING_EXTRA, ...W.ATELIER_PERIOD_EXTRA, ...W.ATELIER_VERB_EXTRA, ...W.ATELIER_TRACK_DATA];
const tracks = ['moda', 'arredo', 'liuteria'];
const patterns = {
  moda: /\b(sart[ae]|sarta|modellista|tessut[oi]|stoff[ae]|abit[oi]|asola|orlo|ag[oh]i?|cucire|cuce|cucito)\b/i,
  arredo: /\b(mobil[ei]|armadi[oi]|tavol[oi]|sedi[ae]|ripian[oi]|cornic[ei]|falegnam[ei]|cassetti?|cassetto)\b/i,
  liuteria: /\b(liutai[oa]|liut[oi]|violin[oi]|violoncell[oi]|archett[oi]|scalpell[oi])\b/i
};
const fits = (item, track) => {
  if (item.track) return item.track === track;
  const text = item.prompt + ' ' + (item.kind === 'tokens' ? item.tokens.join(' ') : (item.options || []).join(' '));
  return !Object.entries(patterns).some(([key, re]) => key !== track && re.test(text));
};
// The application creates one guided PEI variant per topic and track.
const peiGroups = new Map();
for (const track of tracks) for (const item of bank) {
  if (item.pei || !['choice', 'exact'].includes(item.kind) || !fits(item, track)) continue;
  const key = [item.area, item.topicGroup || A.defaultTopic(item), track].join('|');
  if (!peiGroups.has(key) || item.level < peiGroups.get(key).item.level) peiGroups.set(key, {item, track});
}
for (const {item, track} of peiGroups.values()) {
  const correct = item.kind === 'choice' ? item.options[item.answer] : item.answers[0];
  bank.push({...item, id: 'pei-' + track + '-' + item.id, track, pei: true, kind: 'choice', level: 1, prompt: 'Esempio da osservare: «' + correct + '». Tocca la stessa risposta fra le due proposte.', options: [correct, 'Una risposta diversa'], answer: 0, minutes: 2});
}
const topics = new Map(bank.filter(item => !item.pei).map(item => [[item.area, item.topicGroup || A.defaultTopic(item)].join('|'), {area: item.area, topicGroup: item.topicGroup || A.defaultTopic(item)}]));
assert.equal(topics.size, 80, 'The complete source bank contains 80 topics');
const frozen = JSON.stringify(bank);
let combinations = 0, graded = 0;
const ids = result => Array.from(result.items, item => item.id);
for (const topic of topics.values()) for (const track of tracks) for (const selectedPath of ['standard', 'l2', 'dsa', 'pei']) {
  const eligible = item => fits(item, track);
  const args = {bank, ...topic, track, path: selectedPath, eligible};
  const result = A.select(args), limit = selectedPath === 'pei' ? 3 : selectedPath === 'standard' ? 8 : 6;
  assert.ok(result.items.length > 0, JSON.stringify({...topic, track, selectedPath}));
  assert.ok(result.items.length <= limit);
  assert.equal(new Set(ids(result)).size, result.items.length);
  assert.deepEqual(ids(result), ids(A.select(args)), 'selection is deterministic');
  assert.deepEqual(ids(result), ids(A.select({...args, bank: [...bank].reverse()})), 'selection does not depend on bank order');
  assert.ok(result.suggestedMinutes >= 3 && result.suggestedMinutes <= 20);
  assert.match(result.label, /Verifica finale/);
  for (const item of result.items) {
    assert.ok(A.isGradable(item) && !item.custom && item.kind !== 'open');
    assert.equal(item.area, topic.area);
    assert.equal(item.topicGroup || A.defaultTopic(item), topic.topicGroup);
    assert.equal(Boolean(item.pei), selectedPath === 'pei');
    assert.ok(eligible(item));
    const value = item.kind === 'exact' ? item.answers[0] : item.answer;
    assert.equal(E.grade(item, value).status, 'correct', item.id);
    assert.equal(E.grade(item, item.kind === 'tokens' ? [] : undefined).status, 'empty', item.id);
    assert.equal(E.grade(item, item.kind === 'tokens' ? [item.tokens.length] : item.kind === 'choice' ? item.options.length : '__risposta errata__').status, 'review', item.id);
    graded++;
  }
  const availableTrack = bank.some(item => item.track === track && item.area === topic.area && (item.topicGroup || A.defaultTopic(item)) === topic.topicGroup && Boolean(item.pei) === (selectedPath === 'pei') && A.isGradable(item));
  if (availableTrack) assert.equal(result.items[0].track, track);
  combinations++;
}
assert.equal(JSON.stringify(bank), frozen, 'selector does not mutate the bank');
assert.equal(A.select({bank, area: 'parole', topicGroup: 'Nome', eligible: () => false}).items.length, 0);

const base = {id: 'valid', area: 'parole', level: 1, kind: 'choice', prompt: 'Una domanda?', options: ['sì', 'no'], answer: 0, minutes: 1};
const invalid = [
  {...base, id: 'open', kind: 'open'}, {...base, id: 'custom', custom: true},
  {...base, id: 'bad-choice', answer: 8}, {...base, id: 'same-choice', options: ['sì', 'SÌ']},
  {...base, id: 'empty-exact', kind: 'exact', answers: []}, {...base, id: 'blank-exact', kind: 'exact', answers: [' ']},
  {...base, id: 'bad-tokens', kind: 'tokens', tokens: ['uno'], answer: [1]},
  {...base, id: 'duplicate-tokens', kind: 'tokens', tokens: ['uno'], answer: [0, 0]}
];
for (const item of invalid) assert.equal(A.isGradable(item), false, item.id);
const synthetic = [base, ...invalid, {...base}, {...base, id: 'copy'}, {...base, id: 'track', track: 'moda', prompt: 'Domanda di moda?'}, {...base, id: 'wrong-track', track: 'arredo', prompt: 'Arredo?'}, {...base, id: 'blocked', prompt: 'Contesto escluso?', blocked: true}, {...base, id: 'pei', pei: true, prompt: 'PEI?'}];
assert.deepEqual(ids(A.select({bank: synthetic, area: 'parole', eligible: item => !item.blocked})).sort(), ['track', 'valid']);
assert.deepEqual(ids(A.select({bank: synthetic, area: 'parole', path: 'pei'})), ['pei']);
assert.equal(A.select({bank: [base], area: 'parole'}).suggestedMinutes, 3);
assert.equal(A.select({bank: [{...base, minutes: 90}], area: 'parole'}).suggestedMinutes, 20);
for (const [area, topicGroup] of [['frase', 'Soggetto, predicato e oggetto'], ['periodo', 'Principale, coordinate e subordinate']]) {
  assert.equal(A.select({bank: [{...base, area}], area, topicGroup}).items.length, 1);
}
const conjugations = bank.filter(item => item.topicGroup === 'Verbi · indicativo presente' && !item.pei);
const verbs = A.select({bank: conjugations, area: 'parole', topicGroup: 'Verbi · indicativo presente'}).items.map(item => item.topic.match(/ di (\S+)$/)[1]);
assert.equal(new Set(verbs).size, 8, 'Eight conjugations cover eight different verbs');
console.log(`PASS: ${topics.size} argomenti × 3 indirizzi × 4 percorsi = ${combinations} verifiche; ${graded} quesiti corretti/errati/vuoti verificati con engine.grade; filtri, PEI, determinismo, deduplicazione, tempi e varietà verbale.`);
