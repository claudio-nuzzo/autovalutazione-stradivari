/* Initialise all progress modules only after an exclusive tab lock is held. */
(() => {
  'use strict';
  const dialog = document.getElementById('tabLockDialog');
  const note = document.getElementById('tabLockNote');
  if (!dialog || !note) return;
  dialog.addEventListener('cancel', event => event.preventDefault());
  document.getElementById('tabLockRetry').addEventListener('click', () => location.reload());
  if (typeof dialog.showModal !== 'function') {
    document.querySelector('main').textContent = 'Aggiorna il browser per proteggere i progressi tra schede.';
    return;
  }
  dialog.showModal();
  if (!navigator.locks?.request) {
    note.textContent = 'Questo browser non permette di proteggere i progressi tra schede. Apri Didattica e metodi con un browser aggiornato.';
    return;
  }
  window.addEventListener('pageshow', event => { if (event.persisted) location.reload(); });
  navigator.locks.request('stradilab-didattica-progress', {ifAvailable:true, mode:'exclusive'}, async lock => {
    if (!lock) {
      note.textContent = 'Didattica e metodi è già aperto in un’altra scheda di questo browser. Chiudi l’altra scheda e premi Riprova: così eviti di sovrascrivere i progressi.';
      return;
    }
    let leaving = false;
    const closed = new Promise(resolve => window.addEventListener('pagehide', () => { leaving = true; resolve(); }, {once:true}));
    for (const tag of document.querySelectorAll('script[type="application/x-stradilab"]')) {
      if (leaving) return;
      await new Promise((resolve, reject) => {
        const script = document.createElement('script'); script.src = tag.dataset.src;
        script.onload = resolve; script.onerror = reject; document.body.appendChild(script);
      });
      if (window.StradivariStorageTransaction?.ready === false) {
        note.textContent = 'Il ripristino precedente è conservato ma non è stato possibile recuperarlo. Libera spazio nel dispositivo e premi Riprova; se il problema continua, contatta il referente.';
        return;
      }
    }
    if (leaving) return;
    window.StradivariAppReady = true;
    dialog.close();
    await closed;
  }).catch(() => { note.textContent = 'Non è stato possibile avviare il portale in sicurezza. Ricarica la pagina o usa un browser aggiornato.'; });
})();
