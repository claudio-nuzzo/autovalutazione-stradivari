/* Progress on Drive: explicit authorisation and append-only immutable snapshots. */
(() => {
  'use strict';
  const CLIENT = '465652157221-7utkqk1nq0avnh4caltbhibvbrd8eurp.apps.googleusercontent.com';
  const SCOPE = 'https://www.googleapis.com/auth/drive.appdata';
  const NAME = 'stradilab-didattica-progress-v1';
  const status = document.getElementById('driveSyncStatus');
  const connect = document.getElementById('driveSyncConnect');
  const syncNow = document.getElementById('driveSyncNow');
  const choices = document.getElementById('driveSyncChoices');
  const guestChoices = document.getElementById('guestProgressChoices');
  const backupPanel = document.getElementById('localBackupPanel');
  const backupChoices = document.getElementById('localBackupChoices');
  if (!status || !connect || !syncNow || !choices || !guestChoices || !backupPanel || !backupChoices) return;
  let accessToken = '', signedIn = '', expiresAt = 0, busy = false, pending = false, resolving = null, timer, epoch = 0, verified = false, dirty = false;
  const activeRequests = new Set();
  const storageFailures = new Set();
  let authBlocked = false;
  const message = text => { status.textContent = text; };
  window.StradivariStorageGuard = {
    hasFailures: () => storageFailures.size > 0,
    hasBlockedAuth: () => authBlocked,
    blockAuth: () => { authBlocked=true; epoch++; verified=false; accessToken=''; syncNow.hidden=true; clearTimeout(timer); activeRequests.forEach(controller => controller.abort()); activeRequests.clear(); },
    allowAuth: () => { authBlocked=false; },
    explain: () => message('Prima salva le modifiche in questa schermata o esporta il PDF: il dispositivo non è riuscito a conservarle. Non cambiare profilo o account finché non sono salvate.')
  };
  const activeEmail = () => String(window.StradivariUser?.email || '').trim().toLowerCase();
  const keys = email => ({ study:`stradivari-study-v1:${email}`, teaching:`stradivari-teaching-v1:${email}`,
    digStudent:`stradivari-digcomp-progress:v2:${email}:alunno`, digTeacher:`stradivari-digcomp-progress:v2:${email}:docente`,
    assessmentStudent:`stradivari-assessment-v1:${email}:alunno`, assessmentTeacher:`stradivari-assessment-v1:${email}:docente` });
  const pointerKey = email => `stradivari-drive-head:v1:${email}`;
  const suppressLegacyKey = email => `stradivari-digcomp-v1-suppressed:${email}`;
  const snapshot = email => Object.fromEntries(Object.entries(keys(email)).map(([part, key]) => [part,
    localStorage.getItem(key) ?? (part === 'digStudent' && !localStorage.getItem(suppressLegacyKey(email)) ? localStorage.getItem(`stradivari-digcomp-progress:v1:${email}`) : null)]));
  const nonempty = data => data && Object.values(data).some(value => value !== null);
  const validate = data => data && typeof data === 'object' && Object.keys(data).length === 6 &&
    ['study','teaching','digStudent','digTeacher','assessmentStudent','assessmentTeacher'].every(key => data[key] === null || (typeof data[key] === 'string' && data[key].length <= 500000));
  function assertSession() {
    if (authBlocked || !accessToken || Date.now() >= expiresAt || !signedIn || activeEmail() !== signedIn || !window.StradilabAuth?.idToken()) {
      accessToken = ''; throw Error('Collega di nuovo Drive con lo stesso account scolastico.');
    }
  }
  function assertFlow(startEpoch, email) {
    if (epoch !== startEpoch || signedIn !== email) throw Error('Account cambiato; ricollega Drive.');
    assertSession();
    if (storageFailures.size) throw Error('Il dispositivo non ha salvato alcune modifiche. Esporta il PDF e risolvi il problema di spazio prima di sincronizzare.');
  }
  async function request(url, options = {}) {
    assertSession();
    const requestEpoch = epoch;
    const controller = new AbortController();
    activeRequests.add(controller);
    const timeout = setTimeout(() => controller.abort(), 30000);
    try {
      const response = await fetch(url, {...options, headers:{...(options.headers || {}), Authorization:`Bearer ${accessToken}`}, cache:'no-store', signal:controller.signal});
      if (epoch !== requestEpoch) throw Error('Account cambiato; ricollega Drive.');
      assertSession();
      if (!response.ok) throw Error(response.status === 401 ? 'Autorizzazione scaduta: collega di nuovo Drive.' : 'Drive non disponibile; il lavoro resta su questo dispositivo.');
      return response;
    } finally { clearTimeout(timeout); activeRequests.delete(controller); }
  }
  async function requestJson(url, options) {
    const requestEpoch = epoch;
    const data = await (await request(url, options)).json();
    if (epoch !== requestEpoch) throw Error('Account cambiato; ricollega Drive.');
    assertSession();
    return data;
  }
  // Keep an index of current heads, updated through Drive's change feed. The
  // initial scan is paginated; subsequent syncs do not re-read every version.
  async function revisions() {
    const startEpoch = epoch, email = signedIn, cacheKey = `stradivari-drive-index:v1:${signedIn}`;
    let cached;
    try { cached = JSON.parse(localStorage.getItem(cacheKey) || 'null'); } catch (_) { cached = null; }
    if (!cached || typeof cached.token !== 'string' || !Array.isArray(cached.heads) ||
        !cached.heads.every(item => typeof item.id === 'string' && Array.isArray(item.parents))) cached = null;
    let heads, token;
    const parse = item => {
      let parents;
      try { parents = JSON.parse(item.appProperties?.parents || '[]'); }
      catch (_) { throw Error('Indice Drive non valido; nessun dato è stato modificato.'); }
      if (!Array.isArray(parents) || !parents.every(id => typeof id === 'string')) throw Error('Indice Drive non valido; nessun dato è stato modificato.');
      return {id:item.id, parents, modifiedTime:item.modifiedTime};
    };
    if (!cached) {
      const start = await requestJson('https://www.googleapis.com/drive/v3/changes/startPageToken');
      assertFlow(startEpoch,email);
      if (!start.startPageToken) throw Error('Indice Drive non disponibile.');
      token = start.startPageToken;
      const all = []; let pageToken = '';
      do {
        const query = new URLSearchParams({spaces:'appDataFolder', fields:'nextPageToken,files(id,name,modifiedTime,appProperties)', pageSize:'1000', q:`trashed = false and name = '${NAME}'`});
        if (pageToken) query.set('pageToken',pageToken);
        const data = await requestJson(`https://www.googleapis.com/drive/v3/files?${query}`);
        assertFlow(startEpoch,email);
        for (const item of data.files || []) all.push(parse(item));
        pageToken = data.nextPageToken || '';
      } while (pageToken);
      heads = StradivariProgressModel.heads(all);
    } else { heads = cached.heads; token = cached.token; }
    let page = token, newToken = '';
    do {
      const query = new URLSearchParams({spaces:'appDataFolder', pageSize:'1000', pageToken:page,
        fields:'nextPageToken,newStartPageToken,changes(fileId,removed,file(id,name,modifiedTime,appProperties,trashed))'});
      const data = await requestJson(`https://www.googleapis.com/drive/v3/changes?${query}`);
      assertFlow(startEpoch,email);
      for (const change of data.changes || []) {
        if (change.removed || change.file?.trashed) {
          // Removal can change the graph: discard the cache and demand a new scan.
          if (heads.some(head => head.id === change.fileId)) {
            localStorage.removeItem(cacheKey);
            throw Error('Indice Drive cambiato. Ricollega Drive per riesaminarlo.');
          }
          continue;
        }
        if (change.file?.name !== NAME) continue;
        const item = parse(change.file);
        heads = heads.filter(head => head.id !== item.id && !item.parents.includes(head.id));
        heads.push(item);
      }
      page = data.nextPageToken || '';
      newToken = data.newStartPageToken || newToken;
    } while (page);
    if (!newToken) throw Error('Indice Drive incompleto; nessun dato è stato modificato.');
    assertFlow(startEpoch,email);
    try { localStorage.setItem(cacheKey, JSON.stringify({token:newToken,heads})); } catch (_) { /* Re-scan next time if local cache is unavailable. */ }
    return heads;
  }
  async function read(id) {
    const data = await requestJson(`https://www.googleapis.com/drive/v3/files/${encodeURIComponent(id)}?alt=media`);
    if (data?.version !== 1 || !validate(data.progress)) throw Error('Il salvataggio Drive non è valido.');
    return data.progress;
  }
  async function write(progress, parents) {
    if (!validate(progress) || parents.length > 2) throw Error('Impossibile salvare automaticamente queste revisioni.');
    const boundary = `stradilab_${crypto.randomUUID().replaceAll('-', '')}`;
    const metadata = {name:NAME, parents:['appDataFolder'], appProperties:{parents:JSON.stringify(parents)}};
    const body = `--${boundary}\r\nContent-Type: application/json; charset=UTF-8\r\n\r\n${JSON.stringify(metadata)}\r\n--${boundary}\r\nContent-Type: application/json; charset=UTF-8\r\n\r\n${JSON.stringify({version:1,progress})}\r\n--${boundary}--`;
    const data = await requestJson('https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart&fields=id', {method:'POST',headers:{'Content-Type':`multipart/related; boundary=${boundary}`},body});
    if (!data.id) throw Error('Salvataggio Drive non confermato.');
    return data.id;
  }
  function restore(data, email = signedIn) {
    if (storageFailures.size) throw Error('Prima salva le modifiche rimaste in memoria: il dispositivo non è riuscito a conservarle.');
    if (!validate(data)) throw Error('Salvataggio non valido.');
    if (!email || activeEmail() !== email || !window.StradilabAuth?.idToken()) throw Error('Accedi di nuovo con lo stesso account.');
    const existing = snapshot(email);
    // Preserve existing local work before replacing any keys; fail closed on quota errors.
    if (nonempty(existing)) localStorage.setItem(`stradivari-drive-backup:${email}:${crypto.randomUUID()}`, JSON.stringify(existing));
    const updates = Object.entries(keys(email)).map(([part,key]) => ({key,value:data[part]}));
    updates.push({key:suppressLegacyKey(email), value:data.digStudent === null ? '1' : null});
    try { StradivariStorageTransaction.replace(localStorage,email,updates); }
    catch (error) {
      if (error.recoveryRequired) {
        storageFailures.add(`stradivari-restore-journal:v1:${email}`);
        window.StradivariStorageGuard.blockAuth();
        const dialog=document.getElementById('tabLockDialog');
        document.getElementById('tabLockNote').textContent=error.message;
        if (!dialog.open) dialog.showModal();
      }
      throw error;
    }
    document.dispatchEvent(new CustomEvent('stradivari-drive-restored'));
    showBackups();
  }
  function showConflict(heads, local) {
    resolving = {heads,local}; choices.replaceChildren();
    message('Ci sono progressi diversi. Scegli quale copia riprendere: le altre restano archiviate ma non saranno visibili nel portale.');
    const add = (label, callback) => { const b=document.createElement('button'); b.type='button'; b.className='btn secondary'; b.textContent=label; b.addEventListener('click', callback); choices.appendChild(b); };
    if (nonempty(local)) add('Usa i progressi di questo dispositivo', () => {
      const current = snapshot(signedIn); resolveConflict(current, JSON.stringify(current));
    });
    heads.forEach((head, index) => add(`Usa copia Drive ${index + 1} (${new Date(head.modifiedTime).toLocaleString('it-IT')})`, async () => {
      try {
        const expectedLocal = JSON.stringify(snapshot(signedIn));
        const data = await read(head.id);
        await resolveConflict(data, expectedLocal);
      } catch (e) {message(e.message);}
    }));
  }
  async function resolveConflict(data, expectedLocal) {
    if (busy || !resolving || !verified) return;
    if (storageFailures.size) { message('Il dispositivo non ha salvato alcune modifiche. Esporta il PDF e risolvi il problema di spazio prima di sincronizzare.'); return; }
    busy = true;
    const startEpoch = epoch, email = signedIn;
    try {
      const before = JSON.stringify(snapshot(signedIn));
      if (before !== expectedLocal) throw Error('I progressi locali sono cambiati: controlla di nuovo le copie.');
      const current = StradivariProgressModel.heads(await revisions());
      assertFlow(startEpoch, email);
      if (current.map(x=>x.id).sort().join() !== resolving.heads.map(x=>x.id).sort().join()) throw Error('I dati sono cambiati: ricollega Drive e controlla di nuovo.');
      if (before !== JSON.stringify(snapshot(signedIn))) throw Error('I progressi locali sono cambiati: controlla di nuovo le copie.');
      if (JSON.stringify(data) !== JSON.stringify(snapshot(signedIn))) restore(data);
      let parents = current.map(x=>x.id), id;
      // Each immutable revision has at most two parents. Merge any larger
      // conflict sequentially; an interrupted merge leaves all data on Drive.
      do {
        const pair = parents.splice(0,2);
        id = await write(data,pair);
        assertFlow(startEpoch, email);
        parents.unshift(id);
      } while (parents.length > 1);
      localStorage.setItem(pointerKey(signedIn), id);
      resolving = null; choices.replaceChildren();
      dirty = JSON.stringify(data) !== JSON.stringify(snapshot(signedIn));
      if (dirty) { pending=true; message('Ci sono altre modifiche da sincronizzare.'); }
      else message('Progressi salvati su Drive.');
    } catch(e) { message(e.message); }
    finally { busy = false; if (pending && !resolving) { pending=false; schedule(); } }
  }
  async function sync() {
    if (!verified) return;
    if (storageFailures.size) { message('Il dispositivo non ha salvato alcune modifiche. Esporta il PDF e risolvi il problema di spazio prima di sincronizzare.'); return; }
    if (busy) { pending = true; return; }
    if (resolving) return;
    busy = true; pending = false;
    const startEpoch = epoch, email = signedIn;
    try {
      assertSession();
      const local = snapshot(signedIn), all = await revisions(), heads = StradivariProgressModel.heads(all);
      assertFlow(startEpoch, email);
      const cloud = heads.length === 1 ? await read(heads[0].id) : null;
      assertFlow(startEpoch, email);
      if (JSON.stringify(local) !== JSON.stringify(snapshot(signedIn))) { pending=true; return; }
      const action = StradivariProgressModel.decide({local:nonempty(local)?local:null,remote:cloud,
        localRevision:localStorage.getItem(pointerKey(signedIn)),remoteHeads:heads});
      if (action === 'conflict') { showConflict(heads,local); return; }
      if (action === 'download') { restore(cloud); localStorage.setItem(pointerKey(signedIn), heads[0].id); }
      if (action === 'same') localStorage.setItem(pointerKey(signedIn), heads[0].id);
      if (action === 'upload') {
        const id = await write(local, heads.map(head=>head.id));
        assertFlow(startEpoch, email);
        localStorage.setItem(pointerKey(signedIn), id);
        // A write may have raced another device: detect it without deleting either copy.
        const latest = StradivariProgressModel.heads(await revisions());
        assertFlow(startEpoch, email);
        if (latest.length > 1) { showConflict(latest,snapshot(signedIn)); return; }
      }
      const applied = action === 'download' ? cloud : local;
      dirty = JSON.stringify(applied) !== JSON.stringify(snapshot(signedIn)) && !(action === 'empty' && !nonempty(snapshot(signedIn)));
      if (dirty) { pending=true; message('Ci sono altre modifiche da sincronizzare.'); }
      else message(action === 'empty' ? 'Drive collegato: i prossimi progressi saranno salvati.' : 'Progressi sincronizzati su Drive.');
    } catch (e) { message(e.message || 'Sincronizzazione non disponibile.'); }
    finally { busy = false; if (pending && !resolving) { pending=false; schedule(); } }
  }
  function schedule() {
    if (storageFailures.size) { dirty=true; message('Il dispositivo non ha salvato alcune modifiche. Esporta il PDF e risolvi il problema di spazio prima di sincronizzare.'); return; }
    if (!accessToken || !verified) return;
    dirty = true;
    if (resolving) return;
    message('Modifiche da sincronizzare. Puoi premere “Sincronizza ora”.');
    clearTimeout(timer); timer=setTimeout(sync,15000);
  }
  syncNow.addEventListener('click', () => { clearTimeout(timer); sync(); });
  document.addEventListener('stradivari-storage-failed', event => { storageFailures.add(event.detail); clearTimeout(timer); dirty=true; message('Il dispositivo non ha salvato alcune modifiche. Esporta il PDF e risolvi il problema di spazio prima di sincronizzare.'); });
  document.addEventListener('stradivari-storage-ok', event => { storageFailures.delete(event.detail); });
  window.addEventListener('beforeunload', event => { if (dirty) { event.preventDefault(); event.returnValue = ''; } });
  document.addEventListener('visibilitychange', () => { if (document.hidden && dirty && verified && !busy && !resolving) { clearTimeout(timer); sync(); } });
  window.addEventListener('pagehide', () => {
    epoch++; verified=false; accessToken=''; clearTimeout(timer);
    activeRequests.forEach(controller => controller.abort()); activeRequests.clear();
  });
  function showBackups() {
    backupChoices.replaceChildren();
    const email = activeEmail();
    const prefix = `stradivari-drive-backup:${email}:`;
    const entries = email ? Object.keys(localStorage).filter(key => key.startsWith(prefix)) : [];
    backupPanel.hidden = entries.length === 0;
    entries.forEach((key, index) => {
      const button = document.createElement('button'); button.type='button'; button.className='btn secondary';
      button.textContent = `Ripristina copia locale ${index+1}`;
      button.addEventListener('click', () => {
        try {
          if (activeEmail() !== email) throw Error('Account cambiato; accedi di nuovo.');
          const saved = JSON.parse(localStorage.getItem(key) || 'null');
          let target;
          if (validate(saved)) target = saved;
          else if (saved && Object.keys(keys(email)).includes(saved.part) && typeof saved.value === 'string') {
            target = snapshot(email); target[saved.part] = saved.value;
          } else throw Error('Questa copia locale non è valida.');
          restore(target,email); message('Copia locale ripristinata. Il lavoro precedente è stato conservato.'); schedule();
        } catch(e) { message(e.message || 'Impossibile ripristinare la copia.'); }
      });
      backupChoices.appendChild(button);
    });
  }
  function showGuestChoices() {
    guestChoices.replaceChildren();
    const email = activeEmail();
    if (!email || !window.StradilabAuth?.idToken()) return;
    const guest = keys('ospite'), account = keys(email);
    const labels = {study:'metodo di studio', teaching:'metodo di insegnamento', digStudent:'DigComp alunno',
      digTeacher:'DigComp docente', assessmentStudent:'griglie alunno', assessmentTeacher:'griglie docente'};
    const available = Object.keys(guest).filter(part => localStorage.getItem(guest[part]) !== null);
    if (!available.length) return;
    const intro = document.createElement('p');
    intro.textContent = 'Su questo dispositivo sono presenti progressi svolti come ospite. Importa solo quelli che riconosci come tuoi; la copia ospite resterà disponibile.';
    guestChoices.appendChild(intro);
    for (const part of available) {
      const guestValue = localStorage.getItem(guest[part]);
      const accountValue = snapshot(email)[part];
      if (guestValue === accountValue) continue;
      const b = document.createElement('button'); b.type='button'; b.className='btn secondary';
      b.textContent = accountValue === null ? `Importa ${labels[part]} da ospite` : `Sostituisci ${labels[part]} con la copia ospite`;
      b.addEventListener('click', () => {
        try {
          if (storageFailures.size) throw Error('Prima salva le modifiche rimaste in memoria: il dispositivo non è riuscito a conservarle.');
          if (activeEmail() !== email || !window.StradilabAuth?.idToken() || localStorage.getItem(guest[part]) !== guestValue || snapshot(email)[part] !== accountValue) throw Error('I dati sono cambiati. Riapri le opzioni e controlla le copie.');
          if (accountValue !== null) localStorage.setItem(`stradivari-drive-backup:${email}:${crypto.randomUUID()}`, JSON.stringify({part,value:accountValue}));
          localStorage.setItem(account[part], guestValue);
          document.dispatchEvent(new CustomEvent('stradivari-drive-restored'));
          message(`Importato ${labels[part]}. La copia ospite è conservata su questo dispositivo.`);
          showGuestChoices(); showBackups(); schedule();
        } catch(e) { message(e.message || 'Importazione non riuscita; nessun dato è stato eliminato.'); }
      });
      guestChoices.appendChild(b);
    }
  }
  connect.addEventListener('click', () => {
    const email = activeEmail();
    if (authBlocked || storageFailures.size) { message('Salva le modifiche e accedi di nuovo prima di collegare Drive.'); return; }
    if (!email || !window.StradilabAuth?.idToken()) { message('Prima accedi con il tuo account scolastico.'); return; }
    if (!window.google?.accounts?.oauth2) { message('Il servizio Google non è disponibile. Riprova.'); return; }
    epoch++; verified=false; accessToken=''; syncNow.hidden=true; clearTimeout(timer);
    const attempt = epoch;
    const client = google.accounts.oauth2.initTokenClient({client_id:CLIENT,scope:SCOPE,login_hint:email,callback:async result => {
      if (epoch !== attempt) return;
      if (result.error || !result.access_token) { message('Collegamento a Drive non autorizzato.'); return; }
      if (activeEmail() !== email || !window.StradilabAuth?.idToken()) { message('Account cambiato; ricollega Drive.'); return; }
      epoch++; accessToken=result.access_token; signedIn=email; expiresAt=Date.now()+Math.max(0,(Number(result.expires_in)||0)-30)*1000;
      const callbackEpoch = epoch;
      try {
        const profile = await requestJson('https://www.googleapis.com/drive/v3/about?fields=user(emailAddress)');
        if (String(profile?.user?.emailAddress || '').trim().toLowerCase() !== email) throw Error('L’account Drive non coincide con quello scolastico.');
        verified=true;
        syncNow.hidden=false;
        resolving=null; choices.replaceChildren(); message('Verifico i progressi…'); await sync();
      } catch(e) { if (epoch === callbackEpoch) { accessToken=''; message(e.message || 'Impossibile verificare l’account Drive.'); } }
    }});
    client.requestAccessToken({prompt:'select_account'});
  });
  document.addEventListener('stradivari-progress',schedule);
  document.addEventListener('stradivari-dig-saved',schedule);
  document.addEventListener('stradivari-study-saved',schedule);
  document.addEventListener('stradivari-login',()=>{epoch++;verified=false;accessToken='';signedIn='';resolving=null;syncNow.hidden=true;clearTimeout(timer);choices.replaceChildren();message('Per sincronizzare, collega Google Drive.');showGuestChoices();showBackups();});
})();
