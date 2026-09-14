(() => {
  const escapeHtml = value => String(value ?? '').replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' }[char]));
  const line = (label, value) => value ? `<p><strong>${label}:</strong> ${escapeHtml(value)}</p>` : '';
  const score = value => Number.isFinite(Number(value)) ? `${Number(value).toFixed(1)}/3` : '—';

  function buildReport() {
    const role = localStorage.getItem('stradivari-profile') === 'docente' ? 'Docente' : 'Alunno';
    const study = window.StradivariStudy?.getResults?.() || {};
    const assessment = window.StradivariAssessment?.getResults?.() || {};
    const dig = window.StradivariDig?.getResults?.() || {};
    const course = window.StradivariCourse?.getResults?.() || {};
    const available = [study.completed, assessment.completed, dig.completed, course.completed].filter(Boolean).length;
    const generated = new Date().toLocaleDateString('it-IT', { year: 'numeric', month: 'long', day: 'numeric' });
    const signedInUser = window.StradivariUser?.user;
    const name = document.getElementById('pdfStudentName')?.value.trim() || signedInUser?.nome || signedInUser?.email;
    const studentClass = document.getElementById('pdfStudentClass')?.value.trim();
    const teacherTest = course.teacherTest;
    const digSummary = dig.completed
      ? `${line('Profilo', dig.role)}${line('Livello prevalente', dig.level)}${line('Media', `${dig.average}/3`)}${dig.areas?.length ? `<div class="pdf-score-list">${dig.areas.map(area => `<p><strong>${escapeHtml(area.name)}:</strong> ${score(area.average)}</p>`).join('')}</div>` : ''}`
      : '<p>Check DigComp non ancora completato.</p>';
    const courseRows = course.modules?.length
      ? `<table class="pdf-course-results"><thead><tr><th>Capitolo</th><th>Esito</th></tr></thead><tbody>${course.modules.map(module => `<tr><td>${module.number}. ${escapeHtml(module.title)}</td><td>${module.completed ? `${module.correct}/${module.total}` : 'Non completato'}</td></tr>`).join('')}</tbody></table>`
      : '';
    const courseSummary = course.completed
      ? `<p><strong>Corso completato il:</strong> ${escapeHtml(course.completedAt || generated)}</p><p><strong>Risultato complessivo:</strong> ${course.correct}/${course.total} risposte corrette</p>${courseRows}`
      : `<p>Corso non ancora completato: per ottenere l'esito finale, completa e registra le verifiche degli otto capitoli.</p>${courseRows}`;
    return `<article class="pdf-page"><header><div class="pdf-eyebrow">Didattica e metodi · IIS Antonio Stradivari · Cremona</div><h1>Il mio percorso di autovalutazione</h1>${line('Studente', name)}${line('Classe', studentClass)}<p class="pdf-date">Report generato il ${escapeHtml(generated)} · Profilo ${role}</p></header><section><h2>Riepilogo</h2><p>Questo documento raccoglie i risultati disponibili nel percorso personale. Le autovalutazioni servono per orientare il miglioramento: non sono un giudizio definitivo.</p><p><strong>Attività completate:</strong> ${available} su 4 percorsi rilevati</p></section><section><h2>Metodo di studio</h2>${line('Brano sperimentato', study.sample)}${line('Strategie provate', study.strategies?.join(' · '))}${line('Riflessione', study.reflection)}<p>${study.completed ? 'Percorso completato: osservazione, strategie, prova guidata e piano personale.' : 'Percorso non ancora completato: il report conserva le informazioni già disponibili.'}</p></section><section><h2>Griglia di autovalutazione</h2>${line('Griglia', assessment.grid)}${assessment.vote ? line('Voto emerso', `${assessment.vote}/10`) : '<p>Nessuna griglia completata in questa sessione.</p>'}</section><section><h2>Profilo DigComp 3.0</h2>${digSummary}</section><section><h2>Corso DigComp 3.0</h2>${courseSummary}${teacherTest ? `<p><strong>Verifica interna docenti:</strong> ${teacherTest.correct}/30 · ${escapeHtml(teacherTest.message)}</p>` : ''}</section><footer><strong>Continua a sperimentare: ogni prova ti aiuta a conoscere meglio come impari.</strong><br>Benvenuto allo Stradivari!</footer></article>`;
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
