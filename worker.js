const CENTRAL = 'https://anagrafica.stradilab.org';
const TITLE = 'Attestazione di autoformazione Metodo di insegnamento e DigComp 3.0';
const KEYS = ['tipo','titolo','classe','materia','filename','mime','size','base64','request_id','fingerprint','anno_scolastico'];
const noStore = {'Cache-Control': 'private, no-store', 'X-Content-Type-Options': 'nosniff'};
const json = (data, status) => Response.json(data, {status, headers: noStore});
const email = value => String(value || '').trim().toLowerCase();
async function hash(bytes) {
  return [...new Uint8Array(await crypto.subtle.digest('SHA-256', bytes))].map(b => b.toString(16).padStart(2, '0')).join('');
}
async function user(token) {
  if (!token || token.length > 10000) return null;
  try {
    const response = await fetch('https://accesso.stradilab.org/v1/profile', {
      method: 'POST', headers: {'Content-Type': 'text/plain;charset=utf-8'},
      body: JSON.stringify({idToken: token}), redirect: 'error', signal: AbortSignal.timeout(15000)
    });
    if (!response.ok) return null;
    const profile = await response.json();
    if (!profile?.ok || profile.isDocente !== true || !email(profile.email).endsWith('@istitutostradivari.it')) return null;
    return profile;
  } catch {return null;}
}
export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (!url.pathname.startsWith('/api/archive/')) return env.ASSETS.fetch(request);
    // Never accept credentials, URLs or file IDs through query strings.
    if (url.search) return json({ok:false,error:'Richiesta non valida.'}, 400);
    const upload = url.pathname === '/api/archive/upload' && request.method === 'POST';
    const record = url.pathname.match(/^\/api\/archive\/records\/([1-9][0-9]{0,14})\/file$/);
    if (!upload && !(record && request.method === 'GET')) return json({ok:false,error:'Percorso archivio non valido.'}, 404);
    const auth = request.headers.get('Authorization') || '';
    const token = auth.startsWith('Bearer ') ? auth.slice(7) : '';
    const profile = await user(token);
    if (!profile) return json({ok:false,error:'Accedi con un account docente autorizzato.'}, 401);
    const authorization = {Authorization: 'Bearer ' + token};
    if (upload) {
      let body, bytes;
      try {
        if (Number(request.headers.get('Content-Length')) > 7100000) return json({ok:false,error:'File oltre il limite.'}, 413);
        const text = await request.text();
        if (new TextEncoder().encode(text).byteLength > 7100000) return json({ok:false,error:'File oltre il limite.'}, 413);
        body = JSON.parse(text);
        if (!body || typeof body !== 'object' || Array.isArray(body) || Object.keys(body).some(key => !KEYS.includes(key))) throw new Error();
        if (body.tipo !== 'attestato-digcomp' || body.titolo !== TITLE || body.classe !== '' ||
            body.materia !== 'Autoformazione docente' || body.mime !== 'application/pdf' ||
            body.anno_scolastico !== '2026/27' || !Number.isSafeInteger(body.size) ||
            body.size < 5 || body.size > 5 * 1024 * 1024 ||
            !/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/.test(body.request_id) ||
            body.filename !== 'Autoformazione-DigComp-2026-27-' + body.request_id + '.pdf' ||
            typeof body.base64 !== 'string' || body.base64.length > 7100000) throw new Error();
        bytes = Uint8Array.from(atob(body.base64), ch => ch.charCodeAt(0));
        if (bytes.length !== body.size || new TextDecoder().decode(bytes.subarray(0,5)) !== '%PDF-') throw new Error();
        const fingerprint = await hash(new TextEncoder().encode(JSON.stringify([
          email(profile.email), body.tipo, body.titolo, body.classe, body.materia,
          body.filename, body.mime, body.size, await hash(bytes)
        ])));
        if (body.fingerprint !== fingerprint) throw new Error();
      } catch {return json({ok:false,error:'I dati dell’attestazione non sono validi.'}, 400);}
      try {
        const response = await fetch(CENTRAL + '/carica-file', {
          method:'POST', headers:{...authorization, 'Content-Type':'application/json'},
          body:JSON.stringify(body), redirect:'error', signal:AbortSignal.timeout(30000)
        });
        const result = await response.json();
        if (!response.ok || result?.ok !== true || !Number.isSafeInteger(result.id) || result.id < 1) {
          return json({ok:false,error:'Archiviazione centrale non confermata; riprova la stessa richiesta.'}, response.ok ? 502 : response.status);
        }
        // The central database binds the file to this authenticated user.
        // Do not return private Drive URLs as author links.
        return json({ok:true,id:result.id}, response.status);
      } catch {return json({ok:false,error:'Conferma archivio non ricevuta; riprova la stessa richiesta.'}, 503);}
    }
    try {
      // Browser supplied an application record ID, never a Drive file ID.
      // Derive the permitted record on the gateway and check owner/type before
      // requesting its already authenticated GAS-backed download.
      const metadata = await fetch(CENTRAL + '/consegne/' + record[1], {headers:authorization, redirect:'error', signal:AbortSignal.timeout(15000)});
      if (!metadata.ok) return json({ok:false,error:'Documento non disponibile.'}, metadata.status);
      const result = await metadata.json(), saved = result?.consegna;
      if (!saved || !Number.isSafeInteger(saved.id) || String(saved.id) !== record[1] || saved.tipo !== 'attestato-digcomp' || email(saved.email) !== email(profile.email)) {
        return json({ok:false,error:'Documento non disponibile.'}, 404);
      }
      const response = await fetch(CENTRAL + '/consegne/' + saved.id + '/file', {headers:authorization, redirect:'error', signal:AbortSignal.timeout(30000)});
      if (!response.ok) return json({ok:false,error:'Download privato non disponibile.'}, response.status);
      if (!(response.headers.get('Content-Type') || '').startsWith('application/pdf')) return json({ok:false,error:'Documento non valido.'}, 502);
      return new Response(response.body, {headers:{
        ...noStore, 'Content-Type':'application/pdf',
        'Content-Disposition':'attachment; filename="Autoformazione-DigComp-' + saved.id + '.pdf"'
      }});
    } catch {return json({ok:false,error:'Servizio archivio non disponibile.'}, 503);}
  }
};
