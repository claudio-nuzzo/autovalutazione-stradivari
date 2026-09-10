(() => {
  const level = (range, max, text) => ({ range, max, text });
  const commonBands = {
    conoscenza: [
      level('1–4', 4, 'Informazione molto lacunosa dei contenuti.'), level('5', 5, 'Informazione superficiale e imprecisa.'), level('6', 6, 'Informazione basilare dei contenuti.'), level('7', 7, 'Conoscenze estese anche alle nozioni particolari.'), level('8', 8, 'Informazione completa e precisa.'), level('9–10', 10, 'Conoscenze complete, approfondite e autonome.')
    ],
    comprensione: [
      level('1–4', 4, 'Comprende con molta difficoltà, anche se guidato.'), level('5', 5, 'Rielabora in modo impreciso o meccanico.'), level('6', 6, 'Rielabora in modo semplice gli aspetti fondamentali.'), level('7', 7, 'Rielabora autonomamente le conoscenze semplici e, se guidato, quelle complesse.'), level('8', 8, 'Comprende e rielabora autonomamente anche contenuti complessi.'), level('9–10', 10, 'Rielabora in modo autonomo e originale e formula nuove domande.')
    ],
    esposizione: [
      level('1–4', 4, 'Si esprime in modo molto confuso.'), level('5', 5, 'Espone con esitazioni e difficoltà espressive.'), level('6', 6, 'Espone in modo semplice ma generalmente corretto.'), level('7', 7, 'Espone in modo organico e corretto con linguaggio abbastanza autonomo.'), level('8', 8, 'Espone con organicità, indipendenza e proprietà di linguaggio.'), level('9–10', 10, 'Espone con estrema chiarezza, proprietà e disinvoltura.')
    ],
    analisi: [
      level('1–4', 4, 'Riconosce a fatica gli elementi e non stabilisce relazioni.'), level('5', 5, 'Riconosce gli elementi ma fatica a collegarli.'), level('6', 6, 'Riconosce gli elementi e, se guidato, le relazioni fondamentali.'), level('7', 7, 'Individua e collega autonomamente le relazioni fondamentali.'), level('8', 8, 'Analizza con abilità e individua rapidamente le correlazioni.'), level('9–10', 10, 'Riconosce con grande efficacia elementi e relazioni, anche sottili.')
    ],
    sintesi: [
      level('1–4', 4, 'Non compone le parti né individua gli aspetti fondamentali.'), level('5', 5, 'Compone le parti ma non sa sintetizzare gli aspetti fondamentali.'), level('6', 6, 'Con guida costruisce una sintesi essenziale.'), level('7', 7, 'Compone autonomamente gli aspetti essenziali.'), level('8', 8, 'Produce sintesi efficaci e personali tra argomenti collegati.'), level('9–10', 10, 'Costruisce visioni unitarie dentro la disciplina e tra discipline diverse.')
    ]
  };

  const practicalBands = {
    conoscenza: [
      level('1–4', 4, 'Non conosce gli aspetti fondamentali né le norme di sicurezza.'), level('5', 5, 'Conoscenza parziale dei contenuti basilari e della sicurezza.'), level('6', 6, 'Conosce gli elementi fondamentali e tiene presenti le norme di sicurezza.'), level('7', 7, 'Conosce adeguatamente attrezzature e uso del laboratorio; rispetta la sicurezza.'), level('8', 8, 'Conoscenza completa e precisa; sicurezza rispettata con continuità.'), level('9–10', 10, 'Conoscenza approfondita, trasferita a situazioni nuove; individua i rischi con accuratezza.')
    ],
    comprensione: [
      level('1–4', 4, 'Comprende le istruzioni solo con molta difficoltà.'), level('5', 5, 'Comprende le istruzioni in modo impreciso e poco chiaro.'), level('6', 6, 'Comprende e rielabora in modo semplice le istruzioni ricevute.'), level('7', 7, 'Rielabora autonomamente le istruzioni basilari e, se guidato, quelle complesse.'), level('8', 8, 'Comprende autonomamente anche istruzioni complesse.'), level('9–10', 10, 'Comprende e rielabora conoscenze complesse con ottima autonomia.')
    ],
    pratica: [
      level('1–4', 4, 'Gravi difficoltà nell’uso delle attrezzature e nella coordinazione.'), level('5', 5, 'Difficoltà nell’uso delle attrezzature e scarsa coordinazione.'), level('6', 6, 'Usa materiali e strumenti e assembla le parti in modo accettabile.'), level('7', 7, 'Usa strumenti e materiali in modo consapevole e adeguato.'), level('8', 8, 'Usa le attrezzature con destrezza; il manufatto è corretto e personale.'), level('9–10', 10, 'Usa attrezzature e materiali con eccellente destrezza, coordinazione e abilità.')
    ],
    autonomia: [
      level('1–4', 4, 'Non riesce a lavorare in autonomia.'), level('5', 5, 'Anche se indirizzato, fatica ad affrontare autonomamente le attività.'), level('6', 6, 'Attua le istruzioni essenziali negli aspetti di base.'), level('7', 7, 'Affronta il processo in modo scolastico ma tecnicamente corretto.'), level('8', 8, 'Lavora con responsabilità, indipendenza e consapevolezza.'), level('9–10', 10, 'Partecipa al processo in piena autonomia con apporto critico e creativo.')
    ]
  };

  const artBands = (texts) => [
    level('1–2', 2, texts[0]), level('3–4', 4, texts[1]), level('5', 5, texts[2]), level('6', 6, texts[3]), level('7', 7, texts[4]), level('8', 8, texts[5]), level('9–10', 10, texts[6])
  ];

  const grids = {
    comuni: {
      title: 'Materie comuni', hint: 'Criteri generali: interrogazione, verifica orale o scritta.',
      items: [
        { name: 'Conoscenza', prompt: 'Quanto sono complete e precise le informazioni che possiedo?', levels: commonBands.conoscenza },
        { name: 'Comprensione', prompt: 'Quanto comprendo e rielaboro i contenuti?', levels: commonBands.comprensione },
        { name: 'Capacità di esposizione', prompt: 'Quanto espongo in modo chiaro, corretto e autonomo?', levels: commonBands.esposizione },
        { name: 'Capacità di analisi', prompt: 'Quanto riconosco gli elementi e le relazioni tra essi?', levels: commonBands.analisi },
        { name: 'Capacità di sintesi', prompt: 'Quanto ricompongo gli aspetti essenziali in una visione coerente?', levels: commonBands.sintesi }
      ]
    },
    professionali: {
      title: 'Esercitazioni pratiche e professionali', hint: 'Criteri per laboratorio, manufatti, procedure e tecnologie.',
      items: [
        { name: 'Conoscenza, anche di contenuti e procedure informatiche', prompt: 'Conosco contenuti, attrezzature, procedure e norme di sicurezza?', levels: practicalBands.conoscenza },
        { name: 'Comprensione, anche di contenuti e procedure informatiche', prompt: 'Comprendo e rielaboro le istruzioni ricevute?', levels: practicalBands.comprensione },
        { name: 'Capacità pratiche e utilizzo delle tecnologie', prompt: 'Uso materiali, attrezzature e tecnologie con abilità e coordinazione?', levels: practicalBands.pratica },
        { name: 'Grado di autonomia, anche in ambiente digitale', prompt: 'Quanto affronto il processo di lavoro in autonomia?', levels: practicalBands.autonomia }
      ]
    },
    grafica: {
      title: 'Discipline di indirizzo del Liceo Artistico', hint: 'Criteri per progettazione, tecniche, digitale, partecipazione e metodo.',
      items: [
        { name: 'Conoscenze e procedure tecniche', prompt: 'Conosco e uso tecniche, strumenti e procedure?', levels: artBands(['Nessuna conoscenza o procedura.', 'Conoscenze frammentarie; tecniche usate in modo scorretto.', 'Conoscenze incerte e incomplete; uso difficoltoso delle tecniche.', 'Conoscenze semplici e tecniche accettabili.', 'Conosce gli elementi grafici fondamentali; tecniche corrette.', 'Uso consapevole e corretto; conoscenza piena.', 'Conoscenze complete e approfondite; padronanza personale di strumenti e tecniche.']) },
        { name: 'Competenze-metodo', prompt: 'Applico un metodo operativo e documento l’iter progettuale?', levels: artBands(['Nessun metodo.', 'Gravi errori anche con guida; non applica metodi semplici.', 'Procedure incerte e documentazione lacunosa.', 'Esegue compiti semplici; scelte operative imprecise.', 'Metodo semplice ma corretto e documentazione adeguata.', 'Documenta in modo completo e affronta compiti complessi.', 'Documenta in modo organico e risolve autonomamente compiti complessi.']) },
        { name: 'Competenze digitali', prompt: 'Uso procedure e strumenti digitali con autonomia e consapevolezza?', levels: artBands(['Nessuna competenza digitale.', 'Non riconosce procedure essenziali anche se guidato.', 'Ricorda procedure semplici solo con assistenza.', 'Comprende procedure semplici ma usa il digitale passivamente.', 'È indipendente su compiti definiti e usa il digitale consapevolmente.', 'Applica procedure in autonomia su compiti e problemi diversi.', 'Si adatta a situazioni complesse, risolve problemi creativamente e guida gli altri.']) },
        { name: 'Capacità-progetto', prompt: 'Analizzo, collego e sviluppo un percorso progettuale personale?', levels: artBands(['Nessuna capacità progettuale.', 'Gravi lacune nel percorso progettuale e nel linguaggio espressivo.', 'Percorso parziale, poco autonomo e da guidare.', 'Analisi superficiale; progetto semplice e meccanico.', 'Coglie i nessi fondamentali e interpreta in modo abbastanza personale.', 'Analizza situazioni nuove e motiva scelte espressive pertinenti.', 'Analizza, collega e sintetizza criticamente; progetto autonomo, creativo e personale.']) },
        { name: 'Impegno', prompt: 'Quanto lavoro con continuità e responsabilità?', levels: artBands(['Nessuno.', 'Inadeguato.', 'Discontinuo.', 'Superficiale.', 'Essenziale.', 'Diligente.', 'Notevole.']) },
        { name: 'Partecipazione', prompt: 'Quanto partecipo in modo interessato e costruttivo?', levels: artBands(['Nessuna.', 'Poco interessata o di disturbo.', 'Discontinua.', 'Interessata ma da sollecitare.', 'Ricettiva.', 'Responsabile.', 'Costruttiva.']) },
        { name: 'Metodo di lavoro', prompt: 'Quanto organizzo e sviluppo il lavoro in modo produttivo?', levels: artBands(['Nessuno.', 'Disorganizzato.', 'Non efficace e con lacune.', 'Ripetitivo.', 'Positivo ma non sempre produttivo.', 'Organizzato.', 'Elaborativo e autonomo.']) }
      ]
    },
    performance: {
      title: 'Esecuzione e interpretazione', hint: 'Criteri specifici del Liceo Musicale.',
      items: [
        { name: 'Competenza tecnico-esecutiva, anche in ambiente digitale', prompt: 'Mantengo equilibrio psicofisico: respirazione, postura, rilassamento e coordinazione?', levels: [level('1–5', 5, 'Raramente.'), level('6–7', 7, 'Qualche volta.'), level('8–10', 10, 'Sempre.')] },
        { name: 'Competenza esecutivo-strumentale, anche in ambiente digitale', prompt: 'Eseguo con scioltezza brani di adeguato livello?', levels: [level('1–4', 4, 'Raramente.'), level('5–6', 6, 'Non sempre correttamente.'), level('7–8', 8, 'Nella maggior parte dei casi.'), level('9–10', 10, 'Sempre correttamente.')] },
        { name: 'Capacità di interpretazione', prompt: 'Interpreto il repertorio con coerenza stilistica e originalità espressiva?', levels: [level('1–4', 4, 'Stentatamente.'), level('5–6', 6, 'Sufficientemente.'), level('7–8', 8, 'Adeguatamente.'), level('9–10', 10, 'Ampiamente.')] },
        { name: 'Conoscenza della specifica letteratura strumentale, solistica e d’insieme', prompt: 'Conosco il repertorio presentato?', levels: [level('1–4', 4, 'Con difficoltà.'), level('5–6', 6, 'In maniera imprecisa.'), level('7–8', 8, 'Adeguatamente.'), level('9–10', 10, 'In modo esaustivo.')] }
      ]
    }
  };

  let current = 'comuni';
  const answers = Object.fromEntries(Object.keys(grids).map(key => [key, {}]));
  const orderCache = {};
  const scoreFor = entry => {
    const values = entry.range.match(/\d+/g).map(Number);
    return values.reduce((sum, value) => sum + value, 0) / values.length;
  };
  const shuffledLevels = (gridKey, itemIndex, levels) => {
    const key = `${gridKey}-${itemIndex}`;
    if (!orderCache[key]) {
      const choices = levels.map((entry, levelIndex) => ({ entry, levelIndex }));
      for (let index = choices.length - 1; index > 0; index -= 1) {
        const target = Math.floor(Math.random() * (index + 1));
        [choices[index], choices[target]] = [choices[target], choices[index]];
      }
      const ascending = choices.every((choice, index) => choice.levelIndex === index);
      const descending = choices.every((choice, index) => choice.levelIndex === choices.length - index - 1);
      if (ascending || descending) choices.push(choices.shift());
      orderCache[key] = choices;
    }
    return orderCache[key];
  };

  function render() {
    const grid = grids[current];
    document.getElementById('assessmentTitle').textContent = grid.title;
    document.getElementById('assessmentHint').textContent = grid.hint;
    document.getElementById('rubricGrid').innerHTML = grid.items.map((item, index) => {
      const selected = answers[current][index];
      const choices = shuffledLevels(current, index, item.levels);
      return `<article class="rubric"><div class="rubric-number">${String(index + 1).padStart(2, '0')}</div><h3>${item.name}</h3><p class="rubric-prompt">${item.prompt}</p><div class="descriptor-choices" role="radiogroup" aria-label="Descrizioni per ${item.name}">${choices.map(({ entry, levelIndex }) => `<label class="descriptor-option"><input type="radio" name="ptofo-${current}-${index}" value="${levelIndex}" ${selected === levelIndex ? 'checked' : ''}><span>${entry.text}</span></label>`).join('')}</div></article>`;
    }).join('');
  }

  document.querySelectorAll('.assessment-type').forEach(button => button.addEventListener('click', () => {
    current = button.dataset.assessment;
    document.querySelectorAll('.assessment-type').forEach(item => {
      const active = item === button;
      item.classList.toggle('active', active);
      item.setAttribute('aria-selected', String(active));
    });
    document.getElementById('ptofoResult').classList.remove('show');
    render();
  }));

  document.getElementById('rubricGrid').addEventListener('change', event => {
    const match = event.target.name?.match(/^ptofo-([a-z]+)-(\d+)$/);
    if (!match) return;
    const [, gridKey, rawIndex] = match;
    const index = Number(rawIndex);
    answers[gridKey][index] = Number(event.target.value);
    document.dispatchEvent(new CustomEvent('stradivari-progress'));
  });

  document.getElementById('ptofoDone').addEventListener('click', () => {
    const grid = grids[current];
    const selections = Object.values(answers[current]);
    if (selections.length < grid.items.length) {
      alert('Completa tutti gli indicatori di questa griglia per ottenere il voto.');
      return;
    }
    const scores = grid.items.map((item, index) => scoreFor(item.levels[answers[current][index]]));
    const average = scores.reduce((sum, value) => sum + value, 0) / scores.length;
    const vote = Math.max(1, Math.min(10, Math.round(average)));
    document.getElementById('ptofoResult').innerHTML = `<h3>Il voto che emerge è ${vote}/10</h3><p>Hai scelto prima i descrittori che ti rappresentano, senza vedere la loro corrispondenza numerica. Il risultato usa tutti gli indicatori della griglia “${grid.title}”.</p><div class="score-row">${grid.items.map(item => `<div class="score"><strong aria-hidden="true">✓</strong><span>${item.name}</span></div>`).join('')}</div>`;
    document.getElementById('ptofoResult').classList.add('show');
    document.getElementById('ptofoResult').scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  });

  window.StradivariAssessment = {
    completed: () => Object.values(answers).reduce((sum, group) => sum + Object.keys(group).length, 0),
    total: () => Object.values(grids).reduce((sum, grid) => sum + grid.items.length, 0)
  };
  render();
})();
