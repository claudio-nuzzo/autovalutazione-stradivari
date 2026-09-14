/* Accesso con l'account d'istituto: il report finale resta associato allo studente. */
(() => {
  const status = document.getElementById('teacherAuthStatus');
  const login = document.getElementById('sl-login');
  if (!status || !login || !window.StradilabAuth) return;

  const setStatus = (message, state = 'guest') => {
    status.dataset.state = state;
    status.innerHTML = `<span class="guest-dot" aria-hidden="true"></span>${message}`;
  };

  StradilabAuth.init({
    // Il controllo del dominio è già effettuato dal componente condiviso. Non
    // richiediamo un livello minimo: anche gli alunni devono poter conservare
    // il proprio percorso e ottenere il report finale.
    progetto: '',
    minimo: 'nessuno',
    mount: 'sl-login',
    onReady: (user) => {
      const isTeacher = Boolean(user.isDocente);
      document.body.dataset.teacherAuth = 'verified';
      window.StradivariUser = { user, email: user.email, isTeacher };
      window.StradivariTeacherAuth = { verified: isTeacher, user };
      setStatus(`Accesso verificato · ${user.nome || user.email} · ${isTeacher ? 'docente' : 'alunno'} StradiLab`, 'verified');
      window.StradivariRole?.set(isTeacher ? 'docente' : 'alunno');
      document.dispatchEvent(new CustomEvent('stradivari-login', { detail: user }));
      if (isTeacher) document.dispatchEvent(new CustomEvent('teacherlogin', { detail: user }));
    },
    onDenied: (user) => {
      document.body.dataset.teacherAuth = 'guest';
      setStatus(`Accesso non abilitato per il ruolo ${user?.livello || 'rilevato'}: puoi comunque proseguire in modalità ospite.`, 'denied');
    },
    onError: (message) => {
      document.body.dataset.teacherAuth = 'guest';
      setStatus(`Login non disponibile in questo momento: ${message}. Puoi comunque proseguire in modalità ospite.`, 'error');
    }
  });
})();
