/* A durable undo journal makes multi-key progress restores recoverable. */
(function (root) {
  'use strict';
  const prefix = 'stradivari-restore-journal:v1:';
  const allowed = email => [
    `stradivari-study-v1:${email}`, `stradivari-teaching-v1:${email}`,
    `stradivari-digcomp-progress:v2:${email}:alunno`, `stradivari-digcomp-progress:v2:${email}:docente`,
    `stradivari-assessment-v1:${email}:alunno`, `stradivari-assessment-v1:${email}:docente`,
    `stradivari-digcomp-v1-suppressed:${email}`
  ];
  function validate(email, entries) {
    const keys = allowed(email);
    if (!/^[^@\s]+@istitutostradivari\.it$/.test(email) || !Array.isArray(entries) || entries.length !== keys.length ||
        new Set(entries.map(entry => entry?.key)).size !== keys.length ||
        !entries.every(entry => keys.includes(entry.key) && (entry.value === null || typeof entry.value === 'string'))) {
      throw Error('Il registro di recupero locale non è valido.');
    }
  }
  function rollback(storage, entries) {
    // Remove new values first: restoring the original data must not require
    // more space than the original data plus the already persisted journal.
    entries.forEach(entry => storage.removeItem(entry.key));
    entries.forEach(entry => { if (entry.value !== null) storage.setItem(entry.key, entry.value); });
  }
  function replace(storage, email, updates) {
    validate(email, updates);
    const key = prefix + email;
    if (storage.getItem(key) !== null) throw Error('Un ripristino precedente deve essere recuperato prima di continuare.');
    const before = updates.map(entry => ({key:entry.key, value:storage.getItem(entry.key)}));
    // If this atomic write fails, no progress key has been touched.
    storage.setItem(key, JSON.stringify({version:1, entries:before}));
    try {
      updates.forEach(entry => { if (entry.value === null) storage.removeItem(entry.key); else storage.setItem(entry.key, entry.value); });
      storage.removeItem(key);
    } catch (cause) {
      let recoveryRequired = false;
      try { rollback(storage, before); storage.removeItem(key); }
      catch (_) { recoveryRequired = true; }
      const error = Error(recoveryRequired ? 'Ripristino interrotto: la copia precedente è conservata. Ricarica per recuperarla.' : 'Ripristino non riuscito: i progressi precedenti sono stati ripristinati.');
      error.recoveryRequired = recoveryRequired;
      error.cause = cause;
      throw error;
    }
  }
  function recoverAll(storage) {
    for (const key of Object.keys(storage).filter(key => key.startsWith(prefix))) {
      const email = key.slice(prefix.length), data = JSON.parse(storage.getItem(key));
      if (data?.version !== 1) throw Error('Il registro di recupero locale non è valido.');
      validate(email, data.entries);
      rollback(storage, data.entries);
      storage.removeItem(key);
    }
  }
  const api = {replace, recoverAll, ready:true};
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  root.StradivariStorageTransaction = api;
  if (typeof window !== 'undefined') {
    try { recoverAll(window.localStorage); }
    catch (_) { api.ready=false; }
  }
})(typeof globalThis !== 'undefined' ? globalThis : window);
