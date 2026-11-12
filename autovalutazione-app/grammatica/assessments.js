(() => {
  'use strict';

  const defaults = {
    parole: 'Articolo',
    frase: 'Soggetto, predicato e oggetto',
    periodo: 'Principale, coordinate e subordinate'
  };
  const text = value => typeof value === 'string' && value.trim() !== '';
  const normalize = value => String(value ?? '').trim().toLocaleLowerCase('it').replace(/[’‘`]/g, "'").replace(/\s+/g, ' ');

  function defaultTopic(item) {
    return defaults[item.area] || '';
  }

  // These are exactly the three response shapes understood by engine.grade.
  function isGradable(item) {
    if (!item || item.custom || !text(item.id) || !text(item.prompt)) return false;
    if (item.kind === 'choice') {
      return Array.isArray(item.options) && item.options.length >= 2 && item.options.every(text)
        && new Set(item.options.map(normalize)).size === item.options.length
        && Number.isInteger(item.answer) && item.answer >= 0 && item.answer < item.options.length;
    }
    if (item.kind === 'exact') return Array.isArray(item.answers) && item.answers.length > 0 && item.answers.every(text);
    if (item.kind === 'tokens') {
      return Array.isArray(item.tokens) && item.tokens.length > 0 && item.tokens.every(text)
        && Array.isArray(item.answer) && item.answer.length > 0
        && new Set(item.answer).size === item.answer.length
        && item.answer.every(index => Number.isInteger(index) && index >= 0 && index < item.tokens.length);
    }
    return false;
  }

  // A quoted solution in the instructions is useful practice, but not a final test.
  function isIndependent(item) {
    if (item.assessmentEligible === false) return false;
    if (item.kind !== 'exact') return true;
    const quoted = [...item.prompt.matchAll(/«([^»]+)»/g)].map(match => normalize(match[1]));
    return !item.answers.some(answer => {
      const value = normalize(answer);
      if (quoted.includes(value)) return true;
      if (!/_{2,}/.test(item.prompt)) return false;
      const literal = value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const word = new RegExp('(?:^|[^\\p{L}\\p{N}])' + literal + '(?=$|[^\\p{L}\\p{N}])', 'u');
      if (new RegExp('infinito\\s+(?:presente|passato)\\s+di\\s+' + literal + '(?=$|[^\\p{L}\\p{N}])', 'u').test(normalize(item.prompt))) return true;
      return quoted.some(segment => !/_{2,}/.test(segment) && word.test(segment));
    });
  }

  function hash(value) {
    let result = 2166136261;
    for (const char of value) result = Math.imul(result ^ char.charCodeAt(0), 16777619);
    return result >>> 0;
  }

  function lemma(item) {
    return normalize(item.lemma || item.verb || (/^Verbi:/i.test(item.topic || '') ? item.topic.match(/ di (\S+)$/i)?.[1] : ''));
  }

  // Repeated copies of the same question must not inflate a short assessment.
  function signature(item) {
    return JSON.stringify([item.kind, normalize(item.prompt), (item.options || item.tokens || []).map(normalize)]);
  }

  function select({bank = [], area, topicGroup, path = 'standard', track = 'moda', eligible = () => true} = {}) {
    const group = topicGroup || defaults[area] || '';
    const limit = path === 'pei' ? 3 : ['l2', 'dsa'].includes(path) ? 6 : 8;
    const seed = [area, group, path, track].join('|');
    const seenIds = new Set(), seenQuestions = new Set();
    const candidates = (Array.isArray(bank) ? bank : []).filter(item =>
      isGradable(item) && isIndependent(item) && item.area === area && (item.topicGroup || defaultTopic(item)) === group
      && (path === 'pei' ? item.pei === true && item.assessmentOnly === true : !item.pei && !item.assessmentOnly)
      && (!item.track || item.track === track) && eligible(item)
    ).map(item => ({item, rank: hash(seed + '|' + item.id)}))
      .sort((a, b) => Number(b.item.track === track) - Number(a.item.track === track)
        || a.rank - b.rank || a.item.id.localeCompare(b.item.id, 'it'))
      .filter(({item}) => {
        const question = signature(item);
        if (seenIds.has(item.id) || seenQuestions.has(question)) return false;
        seenIds.add(item.id);
        seenQuestions.add(question);
        return true;
      });

    const items = [], levels = new Map(), kinds = new Map(), verbs = new Map();
    const count = (map, key) => map.get(key) || 0;
    while (items.length < limit && candidates.length) {
      let best = 0, bestScore = Infinity;
      candidates.forEach(({item}, index) => {
        // Visit different verbs before further persons of an already seen verb.
        // Include several levels and response mechanics where the topic permits.
        const verb = lemma(item);
        const score = (verb ? count(verbs, verb) * 12 : 0)
          + count(levels, item.level) * 3 + count(kinds, item.kind) * 2;
        const firstTrack = items.length === 0 && candidates.some(candidate => candidate.item.track === track);
        if (firstTrack && item.track !== track) return;
        if (score < bestScore) { best = index; bestScore = score; }
      });
      const {item} = candidates.splice(best, 1)[0];
      items.push(item);
      for (const [map, key] of [[levels, item.level], [kinds, item.kind], [verbs, lemma(item)]]) map.set(key, count(map, key) + 1);
    }
    if (path === 'pei' && items.length < 3) return {items: [], suggestedMinutes: 0, label: 'Verifica finale · ' + group};
    const minutes = items.reduce((sum, item) => sum + (Number.isFinite(item.minutes) && item.minutes > 0 ? item.minutes : 2), 0);
    return {items, suggestedMinutes: Math.max(3, Math.min(20, Math.ceil(minutes))), label: 'Verifica finale · ' + group};
  }

  window.ATELIER_ASSESSMENTS = {select, defaultTopic, isGradable, isIndependent};
})();
