(() => {
  function activate(name) {
    document.querySelectorAll('.tab').forEach(button => {
      const active = button.dataset.tab === name;
      button.classList.toggle('active', active);
      button.setAttribute('aria-selected', String(active));
    });
    document.querySelectorAll('.surface > .section').forEach(section => {
      const active = section.id === `tab-${name}`;
      section.classList.toggle('active', active);
      section.hidden = !active;
    });
    document.getElementById(`tab-${name}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  document.querySelectorAll('.tab').forEach(button => button.addEventListener('click', () => activate(button.dataset.tab)));
  document.addEventListener('profilechange', event => {
    if (event.detail.role === 'alunno' && document.getElementById('tab-ia-docenti')?.classList.contains('active')) activate('studio');
  });

  function progress() {
    const completed = (window.StradivariAssessment?.completed() || 0) + (window.StradivariDig?.completed() || 0) + (window.StradivariStudy?.completed() || 0);
    const total = (window.StradivariAssessment?.total() || 20) + (window.StradivariDig?.total || 20) + (window.StradivariStudy?.total || 5);
    document.getElementById('globalProgress').style.width = `${Math.min(100, completed / total * 100)}%`;
    document.getElementById('progressLabel').textContent = `${completed} attività completate`;
  }
  document.addEventListener('stradivari-progress', progress);
  activate('studio');
  progress();
})();
