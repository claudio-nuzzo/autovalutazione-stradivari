(() => {
  const questions = [
    ['pianificazione', 'Quando devi studiare un capitolo nuovo…', ['Inizio a leggere senza obiettivo', 'Guardo struttura e obiettivi, poi formulo domande', 'Copio tutto', 'Aspetto l’ultimo giorno'], 1],
    ['memoria', 'Per ricordare dopo alcuni giorni…', ['Rileggo soltanto', 'Provo a richiamare senza guardare e controllo cosa manca', 'Evidenzio quasi tutto', 'Studio tutto in una volta'], 1],
    ['pianificazione', 'Quando un compito sembra lungo…', ['Lo rimando', 'Lo divido in parti, tempi e primo passo', 'Faccio parti casuali', 'Cerco subito una soluzione pronta'], 1],
    ['attenzione', 'Durante una sessione di studio il telefono…', ['Resta accanto con le notifiche', 'È lontano o silenziato per un tempo stabilito', 'Lo controllo spesso', 'Non cambia la concentrazione'], 1],
    ['monitoraggio', 'Se sbagli un esercizio…', ['Guardi subito la soluzione', 'Individui il tipo di errore e riprovi', 'Lo salti', 'Memorizzi il risultato'], 1],
    ['memoria', 'Per preparare un’interrogazione…', ['Rileggi dall’inizio alla fine', 'Prepari domande e provi una spiegazione senza appunti', 'Impari frasi a memoria', 'Ripeti solo la sera prima'], 1],
    ['elaborazione', 'Per collegare argomenti diversi…', ['Li tieni separati', 'Confronti cause, effetti, esempi e parole chiave', 'Sottolinei ogni riga', 'Aspetti che il collegamento venga da sé'], 1],
    ['comprensione', 'Quando non capisci una consegna…', ['Parti comunque', 'La riscrivi con parole tue e chiarisci il prodotto richiesto', 'Copi un esempio', 'Rinunci'], 1],
    ['memoria', 'Una sessione efficace termina con…', ['Un’altra rilettura', 'Un breve richiamo senza libro e il prossimo passo', 'Altre evidenziazioni', 'Nessuna verifica'], 1],
    ['monitoraggio', 'Per capire se un metodo funziona…', ['Conti solo il tempo trascorso', 'Controlli cosa sai fare senza aiuti e modifichi il piano', 'Aspetti il voto', 'Cambi metodo ogni giorno'], 1],
    ['attenzione', 'Quando la concentrazione cala…', ['Continui senza capire', 'Fai una pausa breve e riparti con un obiettivo preciso', 'Apri i social', 'Abbandoni la materia'], 1],
    ['elaborazione', 'Dopo aver studiato un concetto nuovo…', ['Lo lasci isolato', 'Crei un esempio tuo e spieghi dove può essere usato', 'Ricopi la definizione', 'Memorizzi solo le parole in grassetto'], 1]
  ];

  const strategies = [
    ['Richiamo attivo', 'Ricostruisci ciò che sai senza guardare il materiale.', 'Studia 10 minuti, chiudi tutto, scrivi cinque idee e poi correggi in un altro colore.'],
    ['Pratica distribuita', 'Distribuisci richiami brevi nel tempo, evitando la sola vigilia.', 'Programma tre richiami: oggi, tra due giorni e tra una settimana.'],
    ['Alternanza degli esercizi', 'Mescola problemi o argomenti collegati per imparare a scegliere la procedura.', 'Alterna tre tipi di esercizio e spiega ogni volta perché scegli quel metodo.'],
    ['Elaborazione', 'Spiega perché, inventa esempi e collega il nuovo a ciò che già sai.', 'Rispondi a: “perché?”, “come lo so?”, “dove posso usarlo?”.'],
    ['Doppia codifica', 'Combina parole e rappresentazioni visive senza sostituire la spiegazione.', 'Crea una mappa di massimo sette nodi, poi spiegala senza leggere.'],
    ['Gestione dell’attenzione', 'Prepara ambiente, obiettivo, durata e pausa.', 'Fai un blocco da 25 minuti con telefono fuori portata e pausa di 5.'],
    ['Autospiegazione', 'Rendi espliciti i passaggi e i criteri che stai usando.', 'Durante un esercizio, verbalizza perché compi ogni passaggio.'],
    ['Registro degli errori', 'Classifica l’errore e annota la correzione che eviterà di ripeterlo.', 'Crea tre colonne: errore, causa, prossima strategia.']
  ];

  const state = { step: 0, answers: [], chosen: [], exercise: [], reflection: '' };
  const content = document.getElementById('studyContent');
  const button = (label, action, disabled = false, secondary = false) => `<button class="btn ${secondary ? 'secondary' : ''}" data-study-action="${action}" ${disabled ? 'disabled' : ''}>${label}</button>`;

  function updateSteps() {
    document.querySelectorAll('.study-step').forEach((step, index) => step.classList.toggle('active', index === state.step));
  }

  function render() {
    updateSteps();
    if (state.step === 0) {
      content.innerHTML = `<h3>1. Autoplacement: come studi oggi?</h3><p>Rispondi sulle tue abitudini reali, non su quelle ideali. Tempo previsto: 10 minuti.</p>${questions.map((question, index) => `<div class="study-question"><p>${index + 1}. ${question[1]}</p>${question[2].map((option, optionIndex) => `<label class="study-option"><input type="radio" name="study-q${index}" value="${optionIndex}" ${state.answers[index] === optionIndex ? 'checked' : ''}><span>${option}</span></label>`).join('')}</div>`).join('')}<div class="study-actions">${button('Calcola la mia mappa', 'diagnose')}</div>`;
    } else if (state.step === 1) {
      const areaNames = { pianificazione: 'Pianificazione', memoria: 'Memoria e richiamo', attenzione: 'Gestione dell’attenzione', monitoraggio: 'Controllo del metodo', elaborazione: 'Elaborazione e collegamenti', comprensione: 'Comprensione della consegna' };
      const scores = {};
      questions.forEach((question, index) => {
        const area = question[0];
        scores[area] ||= [];
        scores[area].push(state.answers[index] === question[3] ? 3 : 1);
      });
      const rows = Object.entries(scores).map(([area, values]) => [areaNames[area], values.reduce((a, b) => a + b, 0) / values.length]);
      const strongest = [...rows].sort((a, b) => b[1] - a[1])[0][0];
      const weakest = [...rows].sort((a, b) => a[1] - b[1])[0][0];
      content.innerHTML = `<h3>2. La tua mappa</h3><p><strong>Punto di forza:</strong> ${strongest}. <strong>Area da allenare:</strong> ${weakest}. Il profilo descrive abitudini modificabili, non capacità fisse.</p>${rows.map(([name, score]) => `<div class="study-card"><h4>${name} · ${score < 1.6 ? 'da allenare' : score < 2.6 ? 'in costruzione' : 'punto di forza'}</h4><div class="progress"><i style="width:${Math.round(score / 3 * 100)}%"></i></div></div>`).join('')}<div class="study-actions">${button('Rivedi le risposte', 'back', false, true)}${button('Conosci le strategie', 'strategies')}</div>`;
    } else if (state.step === 2) {
      content.innerHTML = `<h3>3. Strategie efficaci da provare</h3><p>Scegli esattamente due strategie che non usi ancora con regolarità. Tempo previsto: 15 minuti.</p>${strategies.map((strategy, index) => `<label class="study-option"><input type="checkbox" name="study-strategy" value="${index}" ${state.chosen.includes(index) ? 'checked' : ''}><span><strong>${strategy[0]}</strong> — ${strategy[1]}<br><small>${strategy[2]}</small></span></label>`).join('')}<div class="study-actions">${button('Torna alla mappa', 'back', false, true)}${button('Prepara la prova guidata', 'exercise', state.chosen.length !== 2)}</div>`;
    } else if (state.step === 3) {
      content.innerHTML = `<h3>4. Prova guidata · 20 minuti</h3><p>Scegli un contenuto reale: storia, matematica, italiano, lingua straniera o disciplina di indirizzo. Imposta 15 minuti di lavoro e 5 di verifica.</p>${state.chosen.map((strategyIndex, index) => `<div class="study-card"><h4>${index + 1}. ${strategies[strategyIndex][0]}</h4><p>${strategies[strategyIndex][2]}</p><label class="study-option"><input type="checkbox" name="study-exercise${index}" ${state.exercise[index] ? 'checked' : ''}><span>Ho svolto la prova e so spiegare che cosa ha funzionato.</span></label></div>`).join('')}<div class="study-question"><p>Che cosa hai notato?</p>${[['utile', 'La strategia mi ha mostrato cosa sapevo davvero.'], ['difficile', 'È stata difficile, ma ora so cosa allenare.'], ['riprovare', 'La riproverò con un contenuto più breve.']].map(([value, label]) => `<label class="study-option"><input type="radio" name="study-reflection" value="${value}" ${state.reflection === value ? 'checked' : ''}><span>${label}</span></label>`).join('')}</div><div class="study-actions">${button('Torna alle strategie', 'back', false, true)}${button('Costruisci il piano', 'plan', !state.exercise.every(Boolean) || !state.reflection)}</div>`;
    } else {
      content.innerHTML = `<h3>5. Il tuo piano per 7 giorni</h3><p>Trasforma l’esperimento in una routine breve e verificabile. Tempo previsto: 10 minuti.</p><div class="study-card"><h4>La mia routine</h4><p><strong>Prima:</strong> definisco un obiettivo concreto. <strong>Durante:</strong> uso ${state.chosen.map(index => strategies[index][0]).join(' e ')}. <strong>Dopo:</strong> richiamo senza libro e registro un errore utile.</p></div><div class="study-card"><h4>Impegno concreto</h4><p>Per sette giorni farò quattro blocchi da 25 minuti, con telefono fuori portata. Riprenderò lo stesso contenuto in almeno tre giorni diversi e controllerò ciò che ricordo senza aiuti.</p></div><div class="study-result show"><strong>Percorso completato · circa 65 minuti</strong><br>Hai osservato il tuo metodo, riconosciuto punti di forza e fragilità, provato due strategie e progettato un’applicazione settimanale.</div><div class="study-actions">${button('Rivedi la prova', 'back', false, true)}${button('Ricomincia', 'restart')}</div>`;
    }

    content.querySelectorAll('input[name="study-strategy"]').forEach(input => input.addEventListener('change', () => {
      const selected = [...content.querySelectorAll('input[name="study-strategy"]:checked')].map(item => Number(item.value));
      if (selected.length > 2) { input.checked = false; return; }
      state.chosen = selected;
      render();
    }));
    content.querySelectorAll('input[name^="study-exercise"]').forEach((input, index) => input.addEventListener('change', () => { state.exercise[index] = input.checked; render(); }));
    content.querySelectorAll('input[name="study-reflection"]').forEach(input => input.addEventListener('change', () => { state.reflection = input.value; render(); }));
  }

  document.addEventListener('click', event => {
    const trigger = event.target.closest('[data-study-action]');
    if (!trigger) return;
    const action = trigger.dataset.studyAction;
    if (action === 'diagnose') {
      state.answers = questions.map((_, index) => { const checked = document.querySelector(`input[name="study-q${index}"]:checked`); return checked ? Number(checked.value) : undefined; });
      if (state.answers.some(value => value === undefined)) { alert('Completa tutte le domande per ottenere la mappa.'); return; }
      state.step = 1;
    } else if (action === 'strategies') state.step = 2;
    else if (action === 'exercise') { state.exercise = state.chosen.map(() => false); state.step = 3; }
    else if (action === 'plan') state.step = 4;
    else if (action === 'back') state.step = Math.max(0, state.step - 1);
    else if (action === 'restart') Object.assign(state, { step: 0, answers: [], chosen: [], exercise: [], reflection: '' });
    render();
    content.scrollIntoView({ behavior: 'smooth', block: 'start' });
    document.dispatchEvent(new CustomEvent('stradivari-progress'));
  });

  window.StradivariStudy = { completed: () => state.step === 4 ? 5 : state.step, total: 5 };
  render();
})();
