(() => {
  const levels = ['Da costruire', 'Con guida', 'In autonomia', 'Guido altri'];
  const profiles = {
    alunno: [
      ['Informazione e dati', ['Formulo ricerche precise e confronto autore, data, scopo e prove.', 'Organizzo fonti e dati in modo da poterli ritrovare e citare.']],
      ['Comunicazione e collaborazione', ['Scelgo canale, tono e destinatari adatti.', 'Collaboro online rispettando ruoli, identità e contributi.']],
      ['Creazione di contenuti', ['Creo e rielaboro contenuti accessibili in formati diversi.', 'Cito fonti e licenze e dichiaro l’eventuale uso dell’IA.']],
      ['Sicurezza e benessere', ['Proteggo account, dati personali e dispositivi.', 'Gestisco attenzione, tempo, reputazione e impatto ambientale.']],
      ['Risoluzione di problemi', ['Definisco il bisogno, provo soluzioni e imparo dagli errori.', 'Valuto criticamente strumenti digitali e risposte dell’IA.']]
    ],
    docente: [
      ['Informazione e dati', ['Seleziono fonti affidabili per progettare attività e materiali.', 'Organizzo dati didattici nel rispetto di finalità, minimizzazione e trasparenza.']],
      ['Comunicazione e collaborazione', ['Progetto ambienti e consegne digitali chiari e inclusivi.', 'Collaboro con colleghi e studenti rendendo visibili ruoli e feedback.']],
      ['Creazione di contenuti', ['Produco materiali accessibili, riusabili e coerenti con gli obiettivi.', 'Gestisco diritto d’autore, licenze e dichiarazione dell’uso dell’IA.']],
      ['Sicurezza e benessere', ['Tutelo dati, account e dispositivi nelle attività didattiche.', 'Progetto un uso equilibrato del digitale e prevengo esclusione e sovraccarico.']],
      ['Risoluzione di problemi', ['Scelgo tecnologie a partire dal bisogno didattico, non dallo strumento.', 'Valuto limiti, bias e impatto dell’IA e mantengo supervisione umana.']]
    ]
  };

  const lessons = [
    { title: 'Cercare informazioni affidabili', intro: 'Una ricerca efficace parte da una domanda precisa e confronta autorevolezza, data, scopo e prove.', student: 'Scegli una fonte utile a un compito e annota autore, data, scopo e due elementi di affidabilità.', teacher: 'Prepara una consegna che richieda agli alunni di confrontare due fonti e motivare la scelta.', q: [['Per rendere più affidabile una ricerca…', ['Uso il primo risultato', 'Confronto fonti e controllo autore e data', 'Scelgo il testo più lungo'], 1], ['Una fonte primaria è…', ['Un documento direttamente legato al fatto', 'Un riassunto anonimo', 'Un commento senza autore'], 0], ['Prima di usare un’immagine controllo…', ['Solo l’estetica', 'Autore, licenza e possibilità di riuso', 'Il numero di colori'], 1]] },
    { title: 'Organizzare dati e informazioni', intro: 'Criteri coerenti, tabelle e versioni trasformano dati sparsi in una base di lavoro verificabile.', student: 'Crea una tabella con fonte, data, informazione principale e attendibilità.', teacher: 'Definisci una struttura condivisa per raccogliere evidenze di apprendimento senza dati superflui.', q: [['Un buon nome di file contiene…', ['Solo “nuovo”', 'Contenuto, data o versione', 'Simboli casuali'], 1], ['Per confrontare dati devo…', ['Usare criteri uguali e dichiarati', 'Cambiare criterio', 'Guardare solo il dato maggiore'], 0], ['La minimizzazione richiede di…', ['Raccogliere ogni dato possibile', 'Raccogliere solo i dati necessari', 'Pubblicare i dati'], 1]] },
    { title: 'Comunicare e collaborare', intro: 'Ogni ambiente digitale ha pubblico, tono, regole e responsabilità.', student: 'Scrivi una consegna di gruppo con obiettivo, ruoli, scadenza e permessi.', teacher: 'Progetta ruoli, tempi, canali e criteri di feedback per un’attività collaborativa.', q: [['Prima di condividere un file…', ['Controllo destinatari e permessi', 'Invio a chiunque', 'Tolgo il nome'], 0], ['Un messaggio efficace contiene…', ['Obiettivo e richiesta chiara', 'Solo abbreviazioni', 'Indicazioni contraddittorie'], 0], ['Collaborare significa…', ['Rendere visibile il contributo di tutti', 'Modificare senza avvisare', 'Lasciare il lavoro a uno solo'], 0]] },
    { title: 'Creare contenuti accessibili', intro: 'Un contenuto efficace è leggibile, accessibile, originale o correttamente attribuito.', student: 'Crea una mini-presentazione con titolo, fonte, licenza, contrasto e testo alternativo.', teacher: 'Rivedi un materiale didattico applicando gerarchia, contrasto, testo alternativo e formati accessibili.', q: [['Una licenza indica…', ['Le condizioni di riuso', 'La grandezza del file', 'Chi lo ha scaricato'], 0], ['Per l’accessibilità posso…', ['Usare gerarchia, contrasto e testo alternativo', 'Usare solo il colore', 'Ridurre tutto il testo'], 0], ['Attribuire una fonte significa…', ['Dire da dove proviene', 'Cambiare il titolo', 'Eliminare la didascalia'], 0]] },
    { title: 'Proteggere dati e account', intro: 'Sicurezza e privacy sono pratiche quotidiane, non adempimenti occasionali.', student: 'Controlla un permesso, aggiorna un dispositivo e attiva una protezione aggiuntiva.', teacher: 'Rivedi un’attività e rimuovi dati personali non necessari; verifica accessi e conservazione.', q: [['La pratica più sicura è…', ['Password diverse e autenticazione a più fattori', 'Una password per tutto', 'Credenziali in chat'], 0], ['Un dato personale va condiviso…', ['Solo per uno scopo chiaro e con chi ne ha bisogno', 'Sempre se scolastico', 'Senza controlli'], 0], ['Un aggiornamento serve anche a…', ['Correggere vulnerabilità', 'Cambiare colore', 'Pubblicare il dispositivo'], 0]] },
    { title: 'Benessere e cittadinanza digitale', intro: 'Responsabilità digitale significa considerare persone, attenzione, ambiente e conseguenze.', student: 'Osserva un’abitudine digitale e scegli una modifica concreta per una settimana.', teacher: 'Progetta tempi, pause e alternative analogiche per un’attività digitale inclusiva.', q: [['Una pausa dallo schermo…', ['Aiuta attenzione e benessere', 'È sempre inutile', 'Impedisce di apprendere'], 0], ['Prima di pubblicare penso…', ['A destinatari e conseguenze', 'Solo alla viralità', 'Che non resti traccia'], 0], ['Cittadinanza digitale comprende…', ['Diritti, responsabilità e partecipazione', 'Solo usare app', 'Solo avere un account'], 0]] },
    { title: 'Risolvere problemi con metodo', intro: 'Definire il bisogno, provare, osservare l’errore e correggere rende il metodo trasferibile.', student: 'Descrivi un problema reale, prova due soluzioni e annota l’evidenza che ti fa scegliere.', teacher: 'Parti da un bisogno didattico, confronta due strumenti e motiva quello più adatto.', q: [['Davanti a un problema prima…', ['Lo definisco e raccolgo informazioni', 'Provo a caso', 'Do la colpa allo strumento'], 0], ['Un prototipo serve a…', ['Provare un’idea e raccogliere feedback', 'Evitare verifiche', 'Nascondere errori'], 0], ['Dopo un errore utile…', ['Capisco la causa e modifico il tentativo', 'Cancello senza riflettere', 'Ripeto identico'], 0]] },
    { title: 'Usare l’IA con responsabilità', intro: 'L’IA può sostenere esplorazione e revisione; risultati e decisioni restano sotto responsabilità umana.', student: 'Confronta una prima risposta tua con una proposta IA, verifica due fatti e dichiara le modifiche.', teacher: 'Progetta un compito con una fase senza IA, una di confronto e una revisione motivata e dichiarata.', q: [['Quando uso l’IA…', ['Dichiaro l’uso e verifico', 'Copio senza controllare', 'Nascondo sempre l’uso'], 0], ['Una risposta IA va verificata perché…', ['Può contenere errori o invenzioni', 'È sempre aggiornata', 'Decide al posto mio'], 0], ['Un buon prompt specifica…', ['Obiettivo, contesto, vincoli e formato', 'Una sola parola', 'Nessun contesto'], 0]] }
  ];

  const glossary = [['Fonte', 'Origine verificabile di un’informazione.'], ['Licenza', 'Condizioni con cui un contenuto può essere riusato.'], ['Accessibilità', 'Contenuti utilizzabili da persone e dispositivi diversi.'], ['Dato personale', 'Informazione che identifica o rende identificabile una persona.'], ['Bias', 'Distorsione sistematica nei dati, nel processo o nel risultato.'], ['IA generativa', 'Sistema che produce contenuti da istruzioni e dati: va verificato.'], ['Autonomia', 'Saper scegliere e agire chiedendo aiuto quando serve.'], ['Pensiero critico', 'Valutare prove, limiti e conseguenze prima di decidere.'], ['Agency', 'Capacità di comprendere, scegliere e mantenere il controllo delle proprie azioni.']];
  const answers = { alunno: {}, docente: {} };
  let role = localStorage.getItem('stradivari-profile') || 'alunno';
  let currentModule = 0;

  function renderDig() {
    const grid = profiles[role];
    document.getElementById('digTitle').textContent = role === 'docente' ? 'DigComp per il docente' : 'La tua bussola DigComp';
    document.getElementById('digLead').textContent = role === 'docente' ? 'Dieci indicatori per rileggere progettazione, collaborazione, contenuti, tutela e scelte tecnologiche.' : 'Dieci indicatori per rileggere come cerchi, collabori, crei, ti proteggi e risolvi problemi.';
    document.getElementById('digGrid').innerHTML = grid.map((area, areaIndex) => `<article class="dig-card"><h3>${areaIndex + 1}. ${area[0]}</h3>${area[1].map((indicator, indicatorIndex) => { const key = `${areaIndex}-${indicatorIndex}`; return `<div class="dig-indicator"><p>${indicator}</p><div class="level">${levels.map((label, levelIndex) => `<label><input type="radio" name="dig-${role}-${key}" value="${levelIndex}" ${answers[role][key] === levelIndex ? 'checked' : ''}><span>${label}</span></label>`).join('')}</div></div>`; }).join('')}</article>`).join('');
  }

  function renderCourse() {
    document.getElementById('courseMap').innerHTML = lessons.map((lesson, index) => `<button class="module-btn ${index === currentModule ? 'active' : ''}" data-module="${index}"><b>MODULO ${index + 1}</b><span>${lesson.title}</span></button>`).join('');
    document.getElementById('glossary').innerHTML = glossary.map(item => `<div class="term"><b>${item[0]}</b>${item[1]}</div>`).join('');
    renderLesson(currentModule);
  }

  function renderLesson(index) {
    currentModule = index;
    document.querySelectorAll('.module-btn').forEach((button, buttonIndex) => button.classList.toggle('active', buttonIndex === index));
    const lesson = lessons[index];
    document.getElementById('lesson').innerHTML = `<div class="kicker">Modulo ${index + 1} di ${lessons.length} · circa 8 minuti</div><h3>${lesson.title}</h3><p>${lesson.intro}</p><div class="activity"><strong>${role === 'docente' ? 'Progettazione didattica' : 'Attività autentica'}</strong>${role === 'docente' ? lesson.teacher : lesson.student}</div><div class="quiz"><strong>Tre domande di verifica</strong>${lesson.q.map((question, questionIndex) => `<div class="quiz-question"><p>${questionIndex + 1}. ${question[0]}</p>${question[1].map((option, optionIndex) => `<label><input type="radio" name="course-${index}-${questionIndex}" value="${optionIndex}"> ${option}</label>`).join('')}<button class="btn" data-check-course="${index}-${questionIndex}">Verifica</button><div id="course-feedback-${index}-${questionIndex}" aria-live="polite"></div></div>`).join('')}</div>`;
  }

  document.getElementById('digGrid').addEventListener('change', event => {
    const match = event.target.name?.match(/^dig-(alunno|docente)-(\d+-\d+)$/);
    if (!match) return;
    answers[match[1]][match[2]] = Number(event.target.value);
    document.dispatchEvent(new CustomEvent('stradivari-progress'));
  });
  document.getElementById('digDone').addEventListener('click', () => {
    const values = Object.values(answers[role]);
    if (values.length < 10) { alert('Completa tutti i dieci indicatori DigComp del profilo scelto.'); return; }
    const average = values.reduce((a, b) => a + b, 0) / values.length;
    const names = ['Da costruire', 'Con guida', 'In autonomia', 'So guidare altri'];
    const result = document.getElementById('digResult');
    result.innerHTML = `<strong>Livello prevalente: ${names[Math.round(average)]}</strong><br>Media ${average.toFixed(1)}/3 sul profilo ${role}. Il risultato serve per scegliere il prossimo modulo da allenare.`;
    result.classList.add('show');
  });
  document.getElementById('courseMap').addEventListener('click', event => { const button = event.target.closest('[data-module]'); if (button) renderLesson(Number(button.dataset.module)); });
  document.getElementById('lesson').addEventListener('click', event => {
    const button = event.target.closest('[data-check-course]');
    if (!button) return;
    const [moduleIndex, questionIndex] = button.dataset.checkCourse.split('-').map(Number);
    const checked = document.querySelector(`input[name="course-${moduleIndex}-${questionIndex}"]:checked`);
    const feedback = document.getElementById(`course-feedback-${moduleIndex}-${questionIndex}`);
    if (!checked) { feedback.textContent = 'Scegli una risposta.'; feedback.style.color = 'var(--red)'; return; }
    const correct = Number(checked.value) === lessons[moduleIndex].q[questionIndex][2];
    feedback.textContent = correct ? 'Risposta corretta.' : 'Riprova: rileggi l’idea chiave e valuta responsabilità e verificabilità.';
    feedback.style.color = correct ? 'var(--green)' : 'var(--red)';
    document.dispatchEvent(new CustomEvent('stradivari-progress'));
  });
  document.addEventListener('profilechange', event => { role = event.detail.role; renderDig(); renderCourse(); document.getElementById('digResult').classList.remove('show'); });

  window.StradivariDig = { completed: () => Object.keys(answers.alunno).length + Object.keys(answers.docente).length, total: 20 };
  renderDig();
  renderCourse();
})();
