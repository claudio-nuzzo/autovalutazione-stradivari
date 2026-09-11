(() => {
  const escapeHtml = value => String(value ?? '').replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' }[char]));
  const line = (label, value) => value ? `<p><strong>${label}:</strong> ${escapeHtml(value)}</p>` : '';

  function buildReport() {
    const role = localStorage.getItem('stradivari-profile') === 'docente' ? 'Docente' : 'Alunno';
    const study = window.StradivariStudy?.getResults?.() || {};
    const assessment = window.StradivariAssessment?.getResults?.() || {};
    const dig = window.StradivariDig?.getResults?.() || {};
    const course = window.StradivariCourse?.getResults?.() || {};
    const available = [study.completed, assessment.completed, dig.completed].filter(Boolean).length;
    const generated = new Date().toLocaleDateString('it-IT', { year: 'numeric', month: 'long', day: 'numeric' });
    const name = document.getElementById('pdfStudentName')?.value.trim();
    const studentClass = document.getElementById('pdfStudentClass')?.value.trim();
    return `<article class="pdf-page"><header><div class="pdf-eyebrow">IIS Antonio Stradivari · Cremona</div><h1>Il mio percorso di autovalutazione</h1>${line('Studente', name)}${line('Classe', studentClass)}<p class="pdf-date">Report generato il ${escapeHtml(generated)} · Profilo ${role}</p></header><section><h2>Riepilogo</h2><p>Questo documento raccoglie i risultati disponibili in questa sessione. Le autovalutazioni servono per orientare il miglioramento: non sono un giudizio definitivo.</p><p><strong>Attività completate:</strong> ${available} su 3 aree principali</p></section><section><h2>Metodo di studio</h2>${line('Brano sperimentato', study.sample)}${line('Strategie provate', study.strategies?.join(' · '))}${line('Riflessione', study.reflection)}<p>${study.completed ? 'Percorso completato: osservazione, strategie, prova guidata e piano personale.' : 'Percorso non ancora completato: il report conserva le informazioni già disponibili.'}</p></section><section><h2>Griglia di autovalutazione</h2>${line('Griglia', assessment.grid)}${assessment.vote ? line('Voto emerso', `${assessment.vote}/10`) : '<p>Nessuna griglia completata in questa sessione.</p>'}</section><section><h2>Check DigComp 3.0</h2>${dig.completed ? `${line('Profilo', dig.role)}${line('Livello prevalente', dig.level)}${line('Media', `${dig.average}/3`)}` : '<p>Check DigComp non ancora completato in questa sessione.</p>'}</section><section><h2>Corso DigComp 3.0</h2>${line('Ultimo capitolo consultato', `${course.module}. ${course.title}`)}<p>Il corso è organizzato per apprendimento autonomo, con esempi, laboratori, checklist e verifiche formative.</p></section><footer><strong>Continua a sperimentare: ogni prova ti aiuta a conoscere meglio come impari.</strong><br>Benvenuto allo Stradivari!</footer></article>`;
  }

  const dialog = document.getElementById('pdfIdentityDialog');
  document.getElementById('downloadPdf')?.addEventListener('click', () => {
    if (dialog?.showModal) { dialog.showModal(); document.getElementById('pdfStudentName')?.focus(); return; }
    generatePdf();
  });
  function generatePdf() {
    const report = document.getElementById('pdfReport');
    report.innerHTML = buildReport();
    report.setAttribute('aria-hidden', 'false');
    window.print();
    window.setTimeout(() => { report.setAttribute('aria-hidden', 'true'); }, 1000);
  }
  document.getElementById('pdfIdentityForm')?.addEventListener('submit', event => {
    if (event.submitter?.value === 'cancel') return;
    event.preventDefault();
    dialog?.close();
    generatePdf();
  });
})();
