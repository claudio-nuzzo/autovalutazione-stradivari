(() => {
  const validTabs = new Set(['studio', 'ptofo', 'digcomp', 'corso', 'ia-docenti']);

  function activate(name, updateHash = false) {
    if (!validTabs.has(name)) name = 'studio';
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
    if (updateHash) history.replaceState(null, '', `#${name}`);
  }

  function activateRoute() {
    const route = location.hash.slice(1);
    const lessonMatch = route.match(/^lesson-(\d+)-(\d+)$/);
    if (lessonMatch) {
      activate('corso');
      window.StradivariCourse?.openModule(Number(lessonMatch[1]), false);
      requestAnimationFrame(() => document.getElementById(route)?.scrollIntoView({ block: 'start' }));
      return;
    }
    const courseMatch = route.match(/^corso(?:-(\d+))?$/);
    if (courseMatch) {
      activate('corso');
      if (courseMatch[1]) window.StradivariCourse?.openModule(Number(courseMatch[1]) - 1, false);
      return;
    }
    activate(validTabs.has(route) ? route : 'studio');
  }

  document.querySelectorAll('.tab').forEach(button => button.addEventListener('click', () => activate(button.dataset.tab, true)));
  window.addEventListener('hashchange', activateRoute);
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
  activateRoute();
  progress();
})();
