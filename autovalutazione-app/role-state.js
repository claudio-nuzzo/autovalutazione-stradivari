(() => {
  const copy = {
    alunno: {
      label: 'Profilo alunno',
      studyTitle: 'Trova il tuo metodo di studio',
      studyLead: 'Osserva le tue abitudini, scopri punti di forza e fragilità, prova strategie efficaci e costruisci un piano personale.',
      ptofTitle: 'Griglie di valutazione (PTOF)',
      ptofLead: 'Scegli una situazione reale, valuta tutti gli indicatori della griglia corrispondente e ottieni un voto da 1 a 10.',
      courseLead: 'Otto capitoli completi per imparare: spiegazioni, esempi, sintesi infografiche, laboratori, checklist e verifiche formative.'
    },
    docente: {
      label: 'Profilo docente',
      studyTitle: 'Il mio metodo di insegnamento',
      studyLead: 'Osserva le tue pratiche, scegli priorità fondate su evidenze e riprogetta una lezione: il digitale è un mezzo, l’apprendimento è il traguardo.',
      ptofTitle: 'Griglie di valutazione (PTOF)',
      ptofLead: 'Le griglie del PTOF mostrano agli allievi come sarà valutato un compito. Puoi usarle con la classe per spiegare i criteri prima della prova e confrontare l’autovalutazione degli allievi con il tuo feedback. Sono separate dal corso DigComp.',
      courseLead: 'Autoformazione di 4 ore previste: un’attività sul metodo di insegnamento (60 min), otto capitoli con laboratori (165 min) e domande di ripasso (15 min). Il check DigComp è facoltativo. Le griglie di valutazione (PTOF) sono disponibili a parte per il lavoro con gli allievi. Attestazione di partecipazione soggetta alla validazione dell’Istituto.'
    }
  };

  function setText(selector, value) { const element = document.querySelector(selector); if (element) element.textContent = value; }
  function update(role, announce = true) {
    const current = copy[role] || copy.alunno;
    localStorage.setItem('stradivari-profile', role);
    document.body.dataset.profile = role;
    document.querySelectorAll('.role').forEach(button => {
      const selected = button.dataset.role === role;
      button.classList.toggle('selected', selected);
      button.setAttribute('aria-pressed', String(selected));
    });
    setText('#activeProfile', `Stai lavorando come: ${current.label}`);
    setText('#roleStatus', current.label);
    ['#studioRole', '#ptofoRole', '#digRole', '#courseRole'].forEach(selector => setText(selector, current.label));
    setText('#tab-studio h2', current.studyTitle);
    setText('#tab-studio .section-head .lead', current.studyLead);
    setText('#tab-ptofo h2', current.ptofTitle);
    setText('#tab-ptofo .section-head .lead', current.ptofLead);
    setText('#courseLead', current.courseLead);
    const methodTab = document.querySelector('[data-tab="studio"]');
    if (methodTab) methodTab.innerHTML = `<b>01</b>${role === 'docente' ? 'Metodo di insegnamento' : 'Metodo di studio'}`;
    const gridsTab = document.querySelector('[data-tab="ptofo"]');
    if (gridsTab) gridsTab.innerHTML = '<b>05</b>Griglie di valutazione (PTOF)';
    document.getElementById('teacherResourcesLabel')?.toggleAttribute('hidden', role !== 'docente');
    setText('#tab-ptofo .notice', role === 'docente' ? 'Queste sono le griglie di valutazione (PTOF). Gli allievi possono usarle per autovalutarsi; i docenti possono applicarle nella valutazione e discutere i criteri con la classe. Sono fuori dal corso DigComp e non incidono sull’attestato.' : 'Usa la griglia di valutazione (PTOF) per confrontare il tuo lavoro con i criteri della materia. Il voto apparirà dopo aver completato tutti gli indicatori.');
    setText('.sidebar-title', role === 'docente' ? 'Corso e strumenti per la classe' : 'I cinque percorsi');
    document.querySelector('.teacher-tab')?.toggleAttribute('hidden', role !== 'docente');
    if (announce) document.dispatchEvent(new CustomEvent('profilechange', { detail: { role } }));
  }

  document.querySelectorAll('.role').forEach(button => button.addEventListener('click', () => update(button.dataset.role)));
  const initial = localStorage.getItem('stradivari-profile') || 'alunno';
  update(initial);
  window.StradivariRole = { get: () => localStorage.getItem('stradivari-profile') || 'alunno', set: update };
})();
