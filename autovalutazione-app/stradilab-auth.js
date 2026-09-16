/**
 * stradilab-auth.js — login Google + livello utente per le pagine Stradilab.
 *
 * Livelli: 'nessuno' < 'docente' < 'staff' < 'dirigenza'  (decisi dal servizio centrale StradiLab Auth)
 *
 * USO MINIMO (in fondo alla pagina):
 *   <script src="https://accounts.google.com/gsi/client" async defer></script>
 *   <script src="stradilab-auth.js"></script>
 *   <div id="sl-login"></div>            ← qui compare il bottone "Accedi con Google"
 *   <script>
 *     StradilabAuth.init({
 *       progetto: 'uda',                 // nome della colonna nel foglio Ruoli
 *       minimo:   'docente',             // livello minimo per entrare nella pagina
 *       onReady:  function (u) {         // u = { email, nome, livello, isDocente, isStaff, isDirigenza, idToken }
 *         document.getElementById('app').style.display = 'block';
 *         if (u.isStaff) document.getElementById('pannello-staff').style.display = 'block';
 *       }
 *     });
 *   </script>
 *
 * Opzioni: mount (id del contenitore del bottone, default 'sl-login'), onDenied(u), onError(msg), endpoint (override).
 * Helper: StradilabAuth.utente() → ultimo utente; StradilabAuth.almeno('staff') → true/false;
 *         StradilabAuth.idToken() → token da inviare a un tuo Apps Script (che lo verifica con StradilabAuth.ruolo()).
 */
(function (w) {
  var CLIENT_ID = '465652157221-7utkqk1nq0avnh4caltbhibvbrd8eurp.apps.googleusercontent.com';
  var DOMINIO = 'istitutostradivari.it';
  // Endpoint Auth centrale condiviso da tutti i portali: non dipende dal Worker dell'hub.
  var ENDPOINT = 'https://accesso.stradilab.org/v1/profile';
  var LIVELLI = ['nessuno', 'docente', 'staff', 'dirigenza'];
  // Il profilo non contiene credenziali e puo essere condiviso tra le pagine
  // dello stesso portale. Il token Google resta invece nella sola scheda.
  var CACHE_MS = 5 * 60 * 1000;
  var CACHE_NS = 'stradilab-auth:v8:';
  var TOKEN_KEY = 'stradilab-auth:id-token';
  var REQUEST_TIMEOUT_MS = 10000;
  var MAX_ATTEMPTS = 2;
  var opt = {}, utente = null, token = null;

  function $(id) { return document.getElementById(id); }
  function msg(html, tipo) {
    var box = $(opt.mount + '-msg');
    if (!box) { box = document.createElement('div'); box.id = opt.mount + '-msg'; box.style.cssText = 'margin-top:.75rem;font-size:.9rem'; ($(opt.mount) || document.body).appendChild(box); }
    box.style.color = tipo === 'err' ? '#b3261e' : '#555'; box.innerHTML = html;
  }
  function parseJwt(t) {
    try {
      var p = t.split('.')[1].replace(/-/g, '+').replace(/_/g, '/');
      p += '='.repeat((4 - p.length % 4) % 4);
      return JSON.parse(decodeURIComponent(Array.prototype.map.call(atob(p), function (c) { return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2); }).join('')));
    } catch (e) { return null; }
  }
  function cacheKey(pl, progetto) { return CACHE_NS + String(pl.sub || pl.email) + ':' + (progetto || '*'); }
  function leggiCache(pl, progetto) {
    try {
      var x = JSON.parse(localStorage.getItem(cacheKey(pl, progetto)) || 'null');
      if (!x || x.scade < Date.now()) return null;
      return x.valore;
    } catch (e) { return null; }
  }
  function salvaCache(pl, progetto, valore) {
    try {
      var sicuro = Object.assign({}, valore); delete sicuro.idToken;
      localStorage.setItem(cacheKey(pl, progetto), JSON.stringify({ scade: Date.now() + CACHE_MS, valore: sicuro }));
    } catch (e) {}
  }
  function ruoloDaProfilo(p, progetto) {
    var a = p && p.accessi && p.accessi[progetto];
    return a ? Object.assign({ ok: true, email: p.email, nome: p.nome }, a) : null;
  }
  function ruoloInCache(pl) {
    var diretto = leggiCache(pl, opt.progetto);
    if (diretto) return diretto;
    if (opt.progetto) return ruoloDaProfilo(leggiCache(pl, ''), opt.progetto);
    return null;
  }
  function tokenValido(t) {
    var pl = parseJwt(t);
    return !!pl && (String(pl.email || '').split('@')[1] || '').toLowerCase() === DOMINIO && Number(pl.exp || 0) * 1000 > Date.now() + 60000;
  }
  function salvaToken(t) { try { sessionStorage.setItem(TOKEN_KEY, t); } catch (e) {} }
  function leggiToken() {
    try {
      var t = sessionStorage.getItem(TOKEN_KEY) || '';
      if (tokenValido(t)) return t;
      sessionStorage.removeItem(TOKEN_KEY);
    } catch (e) {}
    return '';
  }

  function attesa(ms) { return new Promise(function (resolve) { setTimeout(resolve, ms); }); }
  function erroreAuth(message, code, retryable) {
    var e = new Error(message); e.authCode = code; e.retryable = !!retryable; return e;
  }
  function fetchAuth(url, options) {
    var tentativo = 0;
    function esegui() {
      tentativo++;
      var controller = new AbortController();
      var timer = setTimeout(function () { controller.abort(); }, REQUEST_TIMEOUT_MS);
      var richiesta = Object.assign({}, options || {}, { signal: controller.signal });
      return fetch(url, richiesta).then(function (r) {
        clearTimeout(timer);
        if (r.status >= 500 && r.status <= 599 && tentativo < MAX_ATTEMPTS) {
          return r.arrayBuffer().catch(function () {}).then(function () { return attesa(250).then(esegui); });
        }
        return r;
      }).catch(function (e) {
        clearTimeout(timer);
        if (tentativo < MAX_ATTEMPTS) return attesa(250).then(esegui);
        if (e && e.name === 'AbortError') throw erroreAuth('Il servizio di accesso non risponde. Riprova fra poco.', 'AUTH_TIMEOUT', true);
        throw erroreAuth('Il servizio di accesso non è raggiungibile. Controlla la connessione e riprova.', 'AUTH_NETWORK', true);
      });
    }
    return esegui();
  }

  function messaggioErrore(e) {
    if (!e) return 'Errore imprevisto.';
    if (e.authCode === 'AUTH_TIMEOUT' || e.authCode === 'AUTH_NETWORK') return e.message;
    if (e.httpStatus === 401) return 'La sessione non è valida o è scaduta. Accedi di nuovo.';
    if (e.httpStatus === 403) return 'Account riconosciuto, ma non autorizzato per questo portale.';
    if (e.httpStatus >= 500) return 'Il servizio di accesso è temporaneamente indisponibile. Riprova fra poco.';
    return e.message || 'Errore imprevisto.';
  }
  function mostraErroreConRiprova(e, pl) {
    msg(messaggioErrore(e) + (e && e.retryable ? ' <button type="button" id="sl-auth-retry" style="margin-left:.5rem">Riprova</button>' : ''), 'err');
    var retry = $('sl-auth-retry');
    if (retry) retry.addEventListener('click', function () { verificaRuolo(pl); });
  }

  function applicaRuolo(u) {
    if (!u || !u.ok) throw new Error((u && u.error) || 'Risposta non valida');
    var pl = parseJwt(token) || {}, accessi = u.accessi || null, livello = LIVELLI.indexOf(u.livello) >= 0 ? u.livello : 'nessuno';
    var isAdmin = !!u.isAdmin || Object.keys(accessi || {}).some(function (k) { return !!(accessi[k] && accessi[k].isAdmin); });
    Object.keys(accessi || {}).forEach(function (k) { var l = accessi[k] && accessi[k].livello; if (LIVELLI.indexOf(l) > LIVELLI.indexOf(livello)) livello = l; });
    if (isAdmin) livello = 'dirigenza';
    utente = {
      email: u.email || pl.email || '',
      nome: u.nome || u.name || pl.name || u.email || pl.email || 'Utente StradiLab',
      livello: livello,
      isDocente: !!u.isDocente || LIVELLI.indexOf(livello) >= 1,
      isStaff: !!u.isStaff || LIVELLI.indexOf(livello) >= 2,
      isDirigenza: !!u.isDirigenza || LIVELLI.indexOf(livello) >= 3,
      isAdmin: isAdmin,
      ruoli: u.ruoli || [], accessi: accessi, progetti: u.progetti || [], idToken: token
    };
    if (!opt.progetto && accessi) w.StradilabAuth.profilo = utente;
    var m = $(opt.mount); if (m) m.style.display = 'none';
    if (LIVELLI.indexOf(livello) >= LIVELLI.indexOf(opt.minimo)) { opt.onReady && opt.onReady(utente); }
    else {
      if (m) { m.style.display = ''; }
      msg('Ciao ' + utente.nome + ': questa pagina è riservata (livello richiesto: <b>' + opt.minimo + '</b>, il tuo: <b>' + livello + '</b>). Se pensi sia un errore scrivi a nuzzo@istitutostradivari.it.', 'err');
      opt.onDenied && opt.onDenied(utente);
    }
  }

  function leggiJson(r) {
    return r.text().then(function (t) {
      var dati = null;
      try { dati = t ? JSON.parse(t) : null; } catch (e) { throw erroreAuth('Il servizio di accesso ha restituito dati non validi.', 'AUTH_BAD_RESPONSE', r.status >= 500); }
      if (!r.ok) {
        var err = erroreAuth((dati && dati.error) || ('Errore HTTP ' + r.status), dati && dati.code || 'AUTH_HTTP_ERROR', r.status >= 500);
        err.httpStatus = r.status; throw err;
      }
      if (!dati) throw erroreAuth('Il servizio di accesso ha restituito una risposta vuota.', 'AUTH_EMPTY_RESPONSE', true);
      return dati;
    });
  }

  function verificaRuolo(pl) {
    var cached = ruoloInCache(pl);
    if (cached) { applicaRuolo(cached); return; }
    msg('Verifica del ruolo in corso…');
    fetchAuth(opt.endpoint, { method: 'POST', credentials: 'include', headers: { 'Content-Type': 'text/plain;charset=utf-8' }, body: JSON.stringify({ idToken: token, progetto: opt.progetto }) })
      .then(leggiJson)
      .then(function (u) {
        if (!u || !u.ok) throw new Error((u && u.error) || 'Risposta non valida');
        salvaCache(pl, opt.progetto, u);
        applicaRuolo(u);
      })
      .catch(function (e) { mostraErroreConRiprova(e, pl); opt.onError && opt.onError(messaggioErrore(e), e); });
  }

  function profiloCompleto() {
    var pl = parseJwt(token), cached = pl && leggiCache(pl, '');
    if (cached && cached.accessi) { w.StradilabAuth.profilo = cached; return Promise.resolve(cached); }
    return fetchAuth(opt.endpoint, { method: 'POST', credentials: 'include', headers: { 'Content-Type': 'text/plain;charset=utf-8' }, body: JSON.stringify({ idToken: token }) })
      .then(leggiJson)
      .then(function (p) {
        if (!p || !p.ok) throw new Error((p && p.error) || 'Risposta non valida');
        if (pl) salvaCache(pl, '', p);
        w.StradilabAuth.profilo = p;
        return p;
      });
  }

  function onCredential(resp) {
    var pl = parseJwt(resp.credential);
    if (!pl || (String(pl.email || '').split('@')[1] || '').toLowerCase() !== DOMINIO) {
      msg('Accedi con il tuo account <b>@' + DOMINIO + '</b>.', 'err');
      try { google.accounts.id.disableAutoSelect(); } catch (e) {}
      return;
    }
    token = resp.credential;
    salvaToken(token);
    verificaRuolo(pl);
  }

  function provaSessioneCondivisa() {
    msg('Controllo accesso in corso…');
    fetchAuth(opt.endpoint, { method: 'POST', credentials: 'include', headers: { 'Content-Type': 'text/plain;charset=utf-8' }, body: JSON.stringify({ progetto: opt.progetto }) })
      .then(leggiJson)
      .then(function (u) {
        if (!u || !u.ok || !tokenValido(u.idToken || '')) throw new Error('Sessione non disponibile');
        token = u.idToken; salvaToken(token); salvaCache(parseJwt(token), opt.progetto, u); applicaRuolo(u);
      })
      .catch(function () { msg(''); start(); });
  }

  function start() {
    if (typeof google === 'undefined' || !google.accounts) { setTimeout(start, 250); return; }
    google.accounts.id.initialize({ client_id: CLIENT_ID, hd: DOMINIO, callback: onCredential, auto_select: true, cancel_on_tap_outside: false });
    var m = $(opt.mount);
    if (!m) { m = document.createElement('div'); m.id = opt.mount; document.body.insertBefore(m, document.body.firstChild); }
    var btn = document.createElement('div'); m.appendChild(btn);
    google.accounts.id.renderButton(btn, { theme: 'outline', size: 'large', text: 'signin_with', shape: 'rectangular', width: 280 });
    google.accounts.id.prompt();
  }

  w.StradilabAuth = {
    init: function (o) {
      opt = Object.assign({ progetto: '', minimo: 'docente', mount: 'sl-login', endpoint: ENDPOINT }, o || {});
      if (LIVELLI.indexOf(opt.minimo) < 0) opt.minimo = 'docente';
      token = leggiToken();
      if (token) { verificaRuolo(parseJwt(token)); return; }
      provaSessioneCondivisa();
    },
    utente: function () { return utente; },
    idToken: function () { return token; },
    esci: function () {
      var profiloDaRimuovere = parseJwt(token), prefisso = profiloDaRimuovere ? CACHE_NS + String(profiloDaRimuovere.sub || profiloDaRimuovere.email) + ':' : '';
      try { sessionStorage.removeItem(TOKEN_KEY); } catch (e) {}
      try { Object.keys(localStorage).filter(function (chiave) { return prefisso && chiave.indexOf(prefisso) === 0; }).forEach(function (chiave) { localStorage.removeItem(chiave); }); } catch (e) {}
      token = null; utente = null; w.StradilabAuth.profilo = null;
      var m = $(opt.mount); if (m) m.style.display = '';
      var box = $(opt.mount + '-msg'); if (box) box.textContent = '';
      try { google.accounts.id.cancel(); google.accounts.id.disableAutoSelect(); } catch (e) {}
      var logoutEndpoint = opt.endpoint.replace(/\/v1\/profile\/?$/, '/v1/logout');
      return fetchAuth(logoutEndpoint, { method: 'POST', credentials: 'include', headers: { 'Content-Type': 'text/plain;charset=utf-8' }, body: '{}' }).catch(function () { return null; });
    },
    almeno: function (l) { return !!utente && LIVELLI.indexOf(utente.livello) >= LIVELLI.indexOf(l); },
    profilo: null,
    caricaProfilo: profiloCompleto,
    LIVELLI: LIVELLI, ENDPOINT: ENDPOINT
  };
})(window);
