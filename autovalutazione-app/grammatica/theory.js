/* Reading and practice share the same topic selector and the existing account gate. */
(() => {
  'use strict';
  const $ = selector => document.querySelector(selector);
  const bridge = window.ATELIER_LEARNING_BRIDGE;
  const lessons = window.ATELIER_THEORY || [];
  const host = $('#teoria');
  if (!bridge || !host) return;
  const esc = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const normalize = value => String(value).normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
  const slug = lesson => normalize(lesson.area + '-' + lesson.topic).replace(/[^a-z0-9]+/g,'-').replace(/-$/,'');
  const topicValue = lesson => lesson.area + '|' + lesson.topic;
  const titles = {parole:'Analisi grammaticale',frase:'Analisi logica',periodo:'Analisi del periodo'};
  const levels = {1:'base',2:'consolidamento',3:'avanzato'};
  const levelNames = {1:'Base',2:'Consolidamento',3:'Avanzato'};
  const steps = ['Livello','Argomento','Teoria','Ripasso','Esercizi','Verifica'];
  const stageNames = ['level','topic','theory','review','practice','assessment'];
  const bySlug = new Map(lessons.map(lesson => [slug(lesson), lesson]));
  let lastRoute = '', search = '';
  const selected = () => lessons.find(lesson => topicValue(lesson) === $('#topic').value);
  const key = () => 'atelier-learning-selection-v1:' + (window.AtelierAdapter?.session?.email || 'ospite');

  function storeSelection() {
    try { localStorage.setItem(key(), JSON.stringify({topic:$('#topic').value, level:$('#level').value})); } catch {}
  }
  function restoreSelection() {
    try {
      const saved = JSON.parse(localStorage.getItem(key()) || 'null');
      if (saved && ['1','2','3'].includes(saved.level)) $('#level').value = saved.level;
      if (saved?.topic && Array.from($('#topic').options).some(o => o.value === saved.topic)) $('#topic').value = saved.topic;
    } catch {}
  }
  function choose(lesson) {
    const value = topicValue(lesson);
    if (!Array.from($('#topic').options).some(o => o.value === value)) return false;
    $('#topic').value = value;
    storeSelection();
    return true;
  }
  function requestTopic() {
    location.hash = 'home';
    $('#learningSetup').scrollIntoView({block:'start'});
    $('#learningNotice').textContent = 'Scegli l’argomento che vuoi studiare.';
    $('#topic').focus({preventScroll:true});
  }
  function go(stage) {
    if (stage === 'level' || stage === 'topic') {
      location.hash = 'home';
      $(stage === 'level' ? '#level' : '#topic').focus();
      return;
    }
    if ($('#topic').value.endsWith('|Le mie sfide')) { bridge.practice(); return; }
    const lesson = selected();
    if (!lesson) { requestTopic(); return; }
    storeSelection();
    if (stage === 'practice') { bridge.practice(); return; }
    if (stage === 'assessment') { bridge.assessment(); return; }
    const hash = (stage === 'review' ? 'ripasso/' : 'teoria/') + slug(lesson);
    if (location.hash === '#' + hash) render(); else location.hash = hash;
    host.scrollIntoView({block:'start'});
  }

  const flow = document.createElement('nav');
  flow.id = 'learningSteps';
  flow.setAttribute('aria-label','Percorso di apprendimento');
  flow.innerHTML = '<ol>' + steps.map((label, index) => '<li><button type="button" data-learning-go="' + stageNames[index] + '"><span aria-hidden="true">' + (index + 1) + '</span>' + label + '</button></li>').join('') + '</ol>';
  $('#main').prepend(flow);
  flow.addEventListener('click', event => { const button = event.target.closest('[data-learning-go]'); if (button) go(button.dataset.learningGo); });

  // Reuse the existing settings so the chosen level/topic also select the exercises.
  const setup = document.createElement('div');
  setup.id = 'learningSetup';
  setup.innerHTML = '<h2>Da dove vuoi iniziare?</h2><p>Scegli il livello e l’argomento. Poi leggi, ripassa e prova.</p><div class="learning-selects"></div><div class="learning-begin"></div><p id="learningNotice" role="status"></p>';
  const levelLabel = $('#level').closest('label');
  const topicLabel = $('#topic').closest('label');
  levelLabel.firstChild.textContent = '1. Livello';
  topicLabel.firstChild.textContent = '2. Argomento';
  $('#topic option[value=""]').textContent = 'Scegli un argomento';
  setup.querySelector('.learning-selects').append(levelLabel, topicLabel);
  const start = $('#startSuggested');
  start.textContent = 'Leggi la teoria';
  setup.querySelector('.learning-begin').append(start);
  const libraryLink = document.createElement('a');
  libraryLink.href = '#pillole';
  libraryLink.textContent = 'Sfoglia tutta la teoria';
  setup.querySelector('.learning-begin').append(libraryLink);
  $('#home .track-current').after(setup);
  const heroActions = $('#home .hero .actions');
  const chooseLink = document.createElement('a');
  chooseLink.href = '#learningSetup';
  chooseLink.className = 'learning-start-link';
  chooseLink.textContent = 'Scegli livello e argomento';
  heroActions.prepend(chooseLink);
  $('#diagnostic').textContent = 'Orientamento facoltativo';
  $('#finalCheckButton').textContent = 'Vai alla verifica';
  const support = $('#path').closest('.settings');
  support.querySelector('label').firstChild.textContent = 'Supporti per studiare';
  for (const settings of $('#home').querySelectorAll('.settings')) if (!settings.querySelector('label')) settings.remove();

  function example(item, className = '') {
    return '<div class="theory-example ' + className + '"><p class="example-sentence">' + esc(item.sentence) + '</p><p>' + esc(item.explanation) + '</p></div>';
  }
  function diagram(lesson) {
    return '<figure class="theory-infographic" aria-label="Infografica: ' + esc(lesson.topic) + '"><figcaption>' + esc(lesson.diagram.title) + '</figcaption><ol>' + lesson.diagram.steps.map(step => '<li><strong>' + esc(step.label) + '</strong><p>' + esc(step.detail) + '</p></li>').join('') + '</ol></figure>';
  }
  function list(items, className = '') { return '<ul class="' + className + '">' + items.map(item => '<li>' + esc(item) + '</li>').join('') + '</ul>'; }
  function table(section) {
    if (!section.table?.headers?.length) return '';
    return '<div class="theory-table"><table><caption>' + esc(section.title) + '</caption><thead><tr>' + section.table.headers.map(h => '<th scope="col">' + esc(h) + '</th>').join('') + '</tr></thead><tbody>' + section.table.rows.map(row => '<tr>' + row.map(cell => '<td>' + esc(cell) + '</td>').join('') + '</tr>').join('') + '</tbody></table></div>';
  }
  function learningHeader(lesson, stage) {
    return '<a href="#pillole" class="back-to-theory">Tutti gli argomenti</a><h1 id="theoryHeading">Teoria e ripasso</h1><div class="theory-topic-heading"><h2>' + esc(lesson.topic) + '</h2><p>' + esc(titles[lesson.area]) + ' · ' + esc(levelNames[$('#level').value]) + '</p></div>' + (stage === 'review' ? '<p>Ricostruisci la regola con parole tue. Apri le risposte dopo aver provato.</p>' : '');
  }
  function renderLesson(lesson) {
    const state = bridge.state(), mode = state.path;
    const focus = lesson.levels[levels[state.level]];
    const supportText = mode === 'pei'
      ? '<aside class="theory-support"><h3>Un piccolo passo</h3><p>' + esc(lesson.pei.rule) + '</p>' + example(lesson.pei.example) + '<button type="button" data-expand-theory>Apri anche la spiegazione completa</button></aside>'
      : ['l2','dsa'].includes(mode) ? '<aside class="theory-support"><h3>La regola in parole semplici</h3><p>' + esc(lesson.simplified.lead) + '</p>' + list(lesson.simplified.steps) + example(lesson.simplified.example) + '</aside>' : '';
    const text = lesson.sections.map((section, index) => '<section class="theory-part" id="lesson-part-' + index + '"><h3>' + esc(section.title) + '</h3>' + section.text.split(/\n\s*\n/).map(p => '<p>' + esc(p) + '</p>').join('') + (section.examples || []).map(item => example(item)).join('') + table(section) + '</section>').join('');
    host.innerHTML = learningHeader(lesson, 'theory') + '<article class="theory-lesson" data-theory-topic="' + esc(topicValue(lesson)) + '" data-area="' + esc(lesson.area) + '"><div class="theory-anchor"><h3>L’esempio da ricordare</h3>' + example(lesson.anchor) + '<p class="theory-memory">' + esc(lesson.anchor.memory) + '</p></div>' + diagram(lesson) + supportText + '<div class="theory-focus"><h3>Il tuo livello: ' + esc(levelNames[state.level]) + '</h3><p>' + esc(focus.focus) + '</p>' + example(focus.example) + '</div><div id="fullTheory"' + (mode === 'pei' ? ' hidden' : '') + '><p class="theory-lead">' + esc(lesson.lead) + '</p><h3>Che cosa imparerai</h3>' + list(lesson.objectives) + text + '<section class="theory-part"><h3>Nel tuo laboratorio</h3>' + example(lesson.trackExamples[state.track] || lesson.trackExamples.moda) + '</section><section class="theory-part"><h3>Errori da evitare</h3>' + lesson.pitfalls.map(item => '<div class="theory-pitfall"><p><strong>Da rivedere:</strong> ' + esc(item.mistake) + '</p><p><strong>Correzione:</strong> ' + esc(item.correction) + '</p><p>' + esc(item.why) + '</p></div>').join('') + '</section></div><div class="learning-next"><p>Prova a spiegare la regola senza guardare gli esempi.</p><button id="goReview" type="button" data-learning-go="review">Passa al ripasso</button></div></article>';
    host.querySelector('[data-expand-theory]')?.addEventListener('click', event => { $('#fullTheory').hidden = false; event.currentTarget.hidden = true; });
  }
  function renderReview(lesson) {
    host.innerHTML = learningHeader(lesson, 'review') + '<article class="theory-review" data-theory-topic="' + esc(topicValue(lesson)) + '">' + diagram(lesson) + '<h3>Le cose da ricordare</h3>' + list(lesson.recap) + '<h3>Prova a rispondere</h3><div class="review-questions">' + lesson.review.map((item,index) => '<details><summary>' + esc(item.question) + '</summary><p>' + esc(item.answer) + '</p></details>').join('') + '</div><div class="learning-next"><a href="#teoria/' + slug(lesson) + '">Rileggi la spiegazione</a><button id="goPractice" type="button" data-learning-go="practice">Passa agli esercizi</button></div><p class="deepstrad-reference">Le pillole di grammatica sono in <a href="https://deepstrad.stradilab.org/" target="_blank" rel="noopener noreferrer">Deepstrad</a>.</p></article>';
  }
  function catalogue() {
    const state = bridge.state(), available = new Set(bridge.topics().map(item => item.value));
    const found = lessons.filter(lesson => available.has(topicValue(lesson)) && normalize(lesson.topic + ' ' + lesson.lead).includes(normalize(search)));
    const current = selected();
    host.innerHTML = '<h1 id="theoryHeading">Teoria e ripasso</h1><p>Una lezione per ogni argomento: esempio guida, infografica, spiegazioni e ripasso.</p>' + (current ? '<div class="theory-current"><h2>' + esc(current.topic) + '</h2><p>Livello ' + esc(levelNames[state.level]) + '</p><button type="button" data-theory-slug="' + slug(current) + '">Riprendi la teoria</button></div>' : '') + '<label class="theory-search">Cerca un argomento<input id="theorySearch" type="search" value="' + esc(search) + '" placeholder="Per esempio: articolo, soggetto, causali" aria-controls="theoryCatalogue"></label><p id="theoryCount" role="status">' + found.length + (found.length === 1 ? ' argomento' : ' argomenti') + '</p><div id="theoryCatalogue">' + Object.entries(titles).map(([area,title]) => {const group=found.filter(lesson=>lesson.area===area);return group.length?'<section class="theory-group"><h2>'+esc(title)+'</h2><ul>'+group.map(lesson=>'<li><button type="button" data-theory-slug="'+slug(lesson)+'"><span>'+esc(lesson.topic)+'</span><span class="theory-open" aria-hidden="true">Leggi</span></button></li>').join('')+'</ul></section>':''}).join('') + (!found.length ? '<p>Nessun argomento trovato. Prova una parola più breve.</p>' : '') + '</div><p class="deepstrad-reference">Le pillole di grammatica sono in <a href="https://deepstrad.stradilab.org/" target="_blank" rel="noopener noreferrer">Deepstrad</a>.</p>';
    $('#theorySearch').addEventListener('input', event => {
      search = event.target.value;
      const at = event.target.selectionStart;
      catalogue();
      $('#theorySearch').focus({preventScroll:true});
      $('#theorySearch').setSelectionRange(at, at);
    });
  }
  function render() {
    const hash = location.hash.slice(1);
    const match = hash.match(/^(teoria|ripasso)\/(.+)$/);
    if (match && bySlug.has(match[2])) {
      const lesson = bySlug.get(match[2]);
      choose(lesson);
      if (match[1] === 'ripasso') renderReview(lesson); else renderLesson(lesson);
    } else catalogue();
    const state = bridge.state();
    const stage = hash.startsWith('ripasso/') ? 'review' : hash.startsWith('teoria/') ? 'theory' : hash === 'work' ? (state.assessment ? 'assessment' : 'practice') : hash === 'home' || !hash || hash === 'learningSetup' ? 'level' : 'theory';
    flow.hidden = ['progress','teacher'].includes(hash);
    flow.querySelectorAll('button').forEach(button => {
      if (button.dataset.learningGo === stage) button.setAttribute('aria-current','step'); else button.removeAttribute('aria-current');
      button.disabled = !state.topic && !['level','topic'].includes(button.dataset.learningGo);
    });
    if (hash !== lastRoute && ['teoria','ripasso'].some(prefix=>hash.startsWith(prefix+'/'))) { host.tabIndex=-1;host.focus({preventScroll:true});host.scrollIntoView({block:'start'}); }
    lastRoute = hash;
  }
  host.addEventListener('click', event => {
    const lessonButton = event.target.closest('[data-theory-slug]');
    if (lessonButton) { const lesson=bySlug.get(lessonButton.dataset.theorySlug);if(lesson&&choose(lesson))go('theory'); }
    const next = event.target.closest('[data-learning-go]');
    if (next) go(next.dataset.learningGo);
  });
  for (const selector of ['#topic','#level','#path']) $(selector).addEventListener('change', () => { storeSelection();$('#learningNotice').textContent='';render(); });
  document.addEventListener('atelier-topics-updated', render);
  document.addEventListener('atelier-learning-work', render);
  window.addEventListener('hashchange', render);
  window.AtelierAdapter.subscribe(() => { restoreSelection();render(); });
  window.AtelierTheory = {start:()=>go('theory'),go,slug,lessons};
  restoreSelection();render();
})();
