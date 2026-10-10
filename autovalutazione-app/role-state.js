(() => {
  const copy = {
    alunno: {
      label: 'Profilo alunno',
      studyTitle: 'Trova il tuo metodo di studio',
      studyLead: 'Osserva le tue abitudini, scopri punti di forza e fragilità, prova strategie efficaci e costruisci un piano personale.',
      ptofTitle: 'Che voto ti dai?',
      ptofLead: 'Scegli una situazione reale, valuta tutti gli indicatori della griglia corrispondente e ottieni un voto da 1 a 10.',
      courseLead: 'Otto capitoli completi per imparare: spiegazioni, esempi, sintesi infografiche, laboratori, checklist e verifiche formative.'
    },
    docente: {
      label: 'Profilo docente',
      studyTitle: 'Il mio metodo di insegnamento',
      studyLead: 'Osserva le tue pratiche, scegli priorità fondate su evidenze e riprogetta una lezione: il digitale è un mezzo, l’apprendimento è il traguardo.',
      ptofTitle: 'Quale voto emerge dalle evidenze?',
      ptofLead: 'Accompagna l’alunno a compilare tutti gli indicatori PTOF, poi confrontate il voto emerso con osservazioni e feedback.',
      courseLead: 'Autoformazione da 4 ore previste: metodo di insegnamento (60 min), otto capitoli e laboratori DigComp (150 min), check e verifica finale (30 min). Attestazione soggetta alla validazione dell’Istituto.'
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
    document.querySelector('.teacher-tab')?.toggleAttribute('hidden', role !== 'docente');
    if (announce) document.dispatchEvent(new CustomEvent('profilechange', { detail: { role } }));
  }

  document.querySelectorAll('.role').forEach(button => button.addEventListener('click', () => update(button.dataset.role)));
  const initial = localStorage.getItem('stradivari-profile') || 'alunno';
  update(initial);
  window.StradivariRole = { get: () => localStorage.getItem('stradivari-profile') || 'alunno', set: update };
})();
