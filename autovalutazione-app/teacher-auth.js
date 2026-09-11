/* Accesso opzionale per i docenti interni, coerente con le pagine riservate StradiLab. */
(() => {
  const status = document.getElementById('teacherAuthStatus');
  const login = document.getElementById('sl-login');
  if (!status || !login || !window.StradilabAuth) return;

  const setStatus = (message, state = 'guest') => {
    status.dataset.state = state;
    status.innerHTML = `<span class="guest-dot" aria-hidden="true"></span>${message}`;
  };

  StradilabAuth.init({
    // "formazione" è la colonna già usata dalle pagine di aggiornamento interne.
    progetto: 'formazione',
    minimo: 'docente',
    mount: 'sl-login',
    onReady: (user) => {
      document.body.dataset.teacherAuth = 'verified';
      window.StradivariTeacherAuth = { verified: true, user };
      setStatus(`Accesso verificato · ${user.nome || user.email} · docente StradiLab`, 'verified');
      window.StradivariRole?.set('docente');
      document.dispatchEvent(new CustomEvent('teacherlogin', { detail: user }));
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
