// The gateway verifies the user's institutional ID token. No Drive OAuth,
// folder sharing or raw Drive file ID is used by this static frontend.
(function (w) {
  const UPLOAD = '/api/archive/upload';
  const MAX_BYTES = 5 * 1024 * 1024;
  function identity() {
    const auth = w.StradivariTeacherAuth;
    const current = w.StradilabAuth?.utente();
    const token = w.StradilabAuth?.idToken();
    const email = String(current?.email || '').trim().toLowerCase();
    if (!auth?.verified || !current?.isDocente || !token || !email ||
        email !== String(auth.user?.email || '').trim().toLowerCase()) {
      throw new Error('Accedi di nuovo con il tuo account docente per archiviare o scaricare.');
    }
    return {email, token};
  }
  async function hash(bytes) {
    return [...new Uint8Array(await crypto.subtle.digest('SHA-256', bytes))]
      .map(b => b.toString(16).padStart(2, '0')).join('');
  }
  async function fingerprint(email, body, bytes) {
    return hash(new TextEncoder().encode(JSON.stringify([
      email.trim().toLowerCase(), body.tipo, body.titolo, body.classe, body.materia,
      body.filename, body.mime, body.size, await hash(bytes)
    ])));
  }
  function openDatabase() {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open('stradilab-digcomp-archive-v1', 1);
      request.onupgradeneeded = () => request.result.createObjectStore('jobs', {keyPath: 'key'});
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(new Error('Salvataggio della richiesta non disponibile. Nessun invio avviato.'));
      request.onblocked = () => reject(new Error('Chiudi le altre schede del portale e riprova.'));
    });
  }
  async function readJob(key) {
    const db = await openDatabase();
    try {
      return await new Promise((resolve, reject) => {
        const tx = db.transaction('jobs', 'readonly');
        const req = tx.objectStore('jobs').get(key);
        req.onsuccess = () => resolve(req.result);
        req.onerror = () => reject(new Error('Richiesta salvata non leggibile.'));
      });
    } finally {db.close();}
  }
  async function saveJob(job, onlyIfAbsent = false) {
    const db = await openDatabase();
    try {
      return await new Promise((resolve, reject) => {
        const tx = db.transaction('jobs', 'readwrite'), store = tx.objectStore('jobs');
        let chosen = job;
        const req = store.get(job.key);
        req.onsuccess = () => {
          if (onlyIfAbsent && req.result) chosen = req.result;
          else store.put(job);
        };
        tx.oncomplete = () => resolve(chosen);
        tx.onerror = tx.onabort = () => reject(new Error('Impossibile conservare la richiesta per il retry. Nessun nuovo invio avviato.'));
      });
    } finally {db.close();}
  }
  function sameAccount(expectedEmail) {
    const user = identity();
    if (user.email !== expectedEmail) throw new Error('Account cambiato: riapri l’attestazione con il tuo account.');
    return user;
  }
  async function requestKey(email, snapshot) {
    return hash(new TextEncoder().encode(JSON.stringify([email, 'attestato-digcomp', snapshot])));
  }
  async function archive(snapshot, makeBytes) {
    const user = identity();
    const key = await requestKey(user.email, snapshot);
    let job = await readJob(key);
    if (!job) {
      const bytes = await makeBytes();
      if (!(bytes instanceof Uint8Array) || bytes.byteLength < 5 || bytes.byteLength > MAX_BYTES ||
          new TextDecoder().decode(bytes.subarray(0, 5)) !== '%PDF-') throw new Error('PDF non valido o oltre 5 MB.');
      const requestId = crypto.randomUUID();
      let binary = '';
      for (let i = 0; i < bytes.length; i += 32768) binary += String.fromCharCode(...bytes.subarray(i, i + 32768));
      const body = {
        tipo: 'attestato-digcomp', titolo: 'Attestazione di autoformazione Metodo di insegnamento e DigComp 3.0',
        classe: '', materia: 'Autoformazione docente', filename: 'Autoformazione-DigComp-2026-27-' + requestId + '.pdf',
        mime: 'application/pdf', size: bytes.byteLength, base64: btoa(binary),
        request_id: requestId, anno_scolastico: '2026/27'
      };
      body.fingerprint = await fingerprint(user.email, body, bytes);
      // Atomic IndexedDB choice survives reload, account changes and double clicks.
      job = await saveJob({key, owner: user.email, schoolYear: body.anno_scolastico,
        scope: 'self-declared-owner-output', snapshotJson: JSON.stringify(snapshot), body, recordId: null}, true);
    }
    const current = sameAccount(user.email);
    if (job.owner !== current.email) throw new Error('Richiesta non appartenente a questo account.');
    if (job.recordId) return {key, requestId: job.body.request_id, recordId: job.recordId};
    let response, result;
    try {
      response = await fetch(UPLOAD, {
        method: 'POST', headers: {'Content-Type': 'application/json', Authorization: 'Bearer ' + current.token},
        body: JSON.stringify(job.body), redirect: 'error', signal: AbortSignal.timeout(30000)
      });
      result = await response.json();
    } catch {
      throw new Error('Conferma archivio non ricevuta. La richiesta è salvata: ripremi lo stesso pulsante per riprovare.');
    }
    if (!response.ok || result?.ok !== true || !Number.isSafeInteger(result.id) || result.id < 1) {
      throw new Error('Archiviazione non confermata dal servizio centrale. La stessa richiesta rimane salvata per il retry.');
    }
    sameAccount(user.email);
    await saveJob({...job, recordId: result.id});
    return {key, requestId: job.body.request_id, recordId: result.id};
  }
  async function download(key) {
    const user = identity(), job = await readJob(key);
    if (!job?.recordId || job.owner !== user.email) throw new Error('Documento archiviato non disponibile per questo account.');
    const response = await fetch('/api/archive/records/' + job.recordId + '/file', {
      headers: {Authorization: 'Bearer ' + user.token}, cache: 'no-store', redirect: 'error'
    });
    if (!response.ok || !(response.headers.get('Content-Type') || '').startsWith('application/pdf')) {
      throw new Error('Download autenticato non disponibile. Il documento resta archiviato: riprova senza reinviarlo.');
    }
    const blob = await response.blob();
    sameAccount(user.email);
    if (blob.size > MAX_BYTES) throw new Error('Documento oltre il limite previsto.');
    const url = URL.createObjectURL(blob), a = document.createElement('a');
    a.href = url; a.download = job.body.filename; document.body.appendChild(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }
  function pdfBytes(report) {
    if (!w.StradilabJsPDF) throw new Error('Generatore PDF non disponibile.');
    const pdf = new w.StradilabJsPDF({unit: 'mm', format: 'a4'});
    const margin = 16, width = 178, bottom = 275;
    let y = 20, page = 1;
    const normalize = text => String(text).normalize('NFC').replace(/[‘’]/g, "'")
      .replace(/[“”«»]/g, '"').replace(/[–—]/g, '-').replace(/·/g, ' - ').replace(/…/g, '...');
    const nextPage = () => {pdf.addPage(); y = 20; page++;};
    const articles = [...report.querySelectorAll('article')];
    articles.forEach((article, index) => {
      if (index) nextPage();
      const blocks = [...article.querySelectorAll('h1,h2,h3,p,.certificate-school,.certificate-city,.certificate-facts > div,.certificate-validation > div,footer')];
      for (const node of blocks) {
        const heading = /^H[123]$/.test(node.tagName);
        const text = normalize(node.innerText || node.textContent).trim();
        if (!text) continue;
        pdf.setFont('helvetica', heading ? 'bold' : 'normal');
        pdf.setFontSize(node.tagName === 'H1' ? 17 : heading ? 12 : 10);
        pdf.setTextColor(heading ? '#2c4a6e' : '#222222');
        const lines = pdf.splitTextToSize(text, width);
        if (heading && y > bottom - 20) nextPage();
        for (const line of lines) {
          if (y > bottom) nextPage();
          pdf.text(line, margin, y); y += heading ? 6 : 4.8;
        }
        y += heading ? 4 : 3;
      }
    });
    const pages = pdf.internal.getNumberOfPages();
    for (let i = 1; i <= pages; i++) {
      pdf.setPage(i); pdf.setFont('helvetica', 'normal'); pdf.setFontSize(8); pdf.setTextColor('#666666');
      pdf.text("Autoformazione dichiarata - riconoscimento subordinato alla validazione dell'Istituto", margin, 286);
      pdf.text(i + '/' + pages, 194, 291, {align: 'right'});
    }
    return new Uint8Array(pdf.output('arraybuffer'));
  }
  w.StradilabCertificateArchive = {archive, download, pdfBytes};
})(typeof window === 'undefined' ? globalThis : window);
