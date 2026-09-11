/**
 * Login Google + verifica del livello utente per le pagine StradiLab.
 * File condiviso con le pagine riservate dell'Istituto.
 */
(function (w) {
  var CLIENT_ID = '465652157221-7utkqk1nq0avnh4caltbhibvbrd8eurp.apps.googleusercontent.com';
  var DOMINIO = 'istitutostradivari.it';
  var ENDPOINT = 'https://script.google.com/macros/s/AKfycbxvZZxbp1H1Ow7X1kx6gkS2EP40u219u4fSNIfok0rwjTllKHWQ7lmPuTCezEbH9OFFhw/exec';
  var LIVELLI = ['nessuno', 'docente', 'staff', 'dirigenza'];
  var opt = {}, utente = null, token = null;

  function $(id) { return document.getElementById(id); }
  function msg(html, tipo) {
    var box = $(opt.mount + '-msg');
    if (!box) {
      box = document.createElement('div');
      box.id = opt.mount + '-msg';
      box.style.cssText = 'margin-top:.75rem;font-size:.9rem';
      ($(opt.mount) || document.body).appendChild(box);
    }
    box.style.color = tipo === 'err' ? '#b3261e' : '#555';
    box.innerHTML = html;
  }
  function parseJwt(t) {
    try { return JSON.parse(atob(t.split('.')[1].replace(/-/g, '+').replace(/_/g, '/'))); }
    catch (e) { return null; }
  }
  function profiloCompleto() {
    return fetch(opt.endpoint, { method: 'POST', headers: { 'Content-Type': 'text/plain;charset=utf-8' }, body: JSON.stringify({ idToken: token }) })
      .then(function (r) { return r.json(); })
      .then(function (p) {
        if (!p || !p.ok) throw new Error((p && p.error) || 'Risposta non valida');
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
    msg('Verifica del ruolo in corso…');
    token = resp.credential;
    fetch(opt.endpoint, { method: 'POST', headers: { 'Content-Type': 'text/plain;charset=utf-8' }, body: JSON.stringify({ idToken: token, progetto: opt.progetto }) })
      .then(function (r) { return r.json(); })
      .then(function (u) {
        if (!u || !u.ok) throw new Error((u && u.error) || 'Risposta non valida');
        if (!opt.progetto && u.accessi) w.StradilabAuth.profilo = u;
        utente = { email: u.email, nome: u.nome, livello: u.livello, isDocente: !!u.isDocente, isStaff: !!u.isStaff, isDirigenza: !!u.isDirigenza, isAdmin: !!u.isAdmin, ruoli: u.ruoli || [], accessi: u.accessi || null, progetti: u.progetti || [], idToken: token };
        var m = $(opt.mount); if (m) m.style.display = 'none';
        if (LIVELLI.indexOf(u.livello) >= LIVELLI.indexOf(opt.minimo)) opt.onReady && opt.onReady(utente);
        else {
          if (m) m.style.display = '';
          msg('Ciao ' + (u.nome || u.email) + ': accesso non abilitato per il livello richiesto.', 'err');
          opt.onDenied && opt.onDenied(utente);
        }
      })
      .catch(function (e) { msg('Impossibile verificare il ruolo: ' + e.message, 'err'); opt.onError && opt.onError(e.message); });
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
      start();
    },
    utente: function () { return utente; },
    idToken: function () { return token; },
    almeno: function (l) { return !!utente && LIVELLI.indexOf(utente.livello) >= LIVELLI.indexOf(l); },
    profilo: null,
    caricaProfilo: profiloCompleto,
    LIVELLI: LIVELLI,
    ENDPOINT: ENDPOINT
  };
})(window);
