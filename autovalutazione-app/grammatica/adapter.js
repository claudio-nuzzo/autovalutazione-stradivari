/* No credentials or student data are embedded. The service checks authorisation. */
(() => {
'use strict';
const origin='https://deepstrad.stradilab.org/api/grammatica';
let session=null,epoch=0,flushing=false,flushRequested=false;
const listeners=[];
const notify=()=>listeners.forEach(fn=>fn(session));
const prefix=email=>'atelier-events-v1:'+email;
function local(email){try{return JSON.parse(localStorage.getItem(prefix(email))||'[]')}catch{return []}}
function save(email,events){localStorage.setItem(prefix(email),JSON.stringify(events))}
const token=()=>window.StradilabAuth?.idToken()||'';
async function request(path,options={}){const generation=epoch,identity=session?.email,bearer=token();if(!identity||!bearer)throw Error('Accedi di nuovo con l’account scolastico.');const response=await fetch(origin+path,{...options,headers:{'Content-Type':'application/json',Authorization:'Bearer '+bearer,...options.headers},cache:'no-store'});if(generation!==epoch||identity!==session?.email)throw Error('L’account è cambiato: ripeti l’operazione.');const data=await response.json();if(generation!==epoch||identity!==session?.email)throw Error('L’account è cambiato: ripeti l’operazione.');if(!response.ok||!data.ok)throw Error(data.error||'Il servizio non conferma l’operazione.');return data}
async function profile(user){const generation=++epoch;session=null;notify();try{const bearer=token();if(!bearer)throw Error('Accesso Google non disponibile.');const response=await fetch(origin+'/profile',{headers:{Authorization:'Bearer '+bearer},cache:'no-store'});const data=await response.json();if(generation!==epoch)return;if(!response.ok||!data.ok||data.email?.toLowerCase()!==user.email?.toLowerCase())throw Error(data.error||'Impossibile verificare il tuo accesso.');session={email:data.email.toLowerCase(),authorized:data.authorized===true,teacher:data.teacher===true};notify();document.dispatchEvent(new CustomEvent('atelier-access',{detail:session}));if(session.authorized||session.teacher)await flush()}catch(e){document.dispatchEvent(new CustomEvent('atelier-sync-status',{detail:e.message}));}}
async function flush(){
  if(flushing){flushRequested=true;return}
  if(!session||(!session.authorized&&!session.teacher))return;
  flushing=true;
  const email=session.email,generation=epoch;
  const sameSession=()=>generation===epoch&&session?.email===email;
  const outbox=()=>local(email).filter(e=>!e.remote&&!e.localOnly);
  try{
    // Each pass reads the current outbox. Events created during a POST or GET
    // stay local and are drained on the next pass before any success message.
    while(sameSession()){
      flushRequested=false;
      for(const item of outbox()){
        const payload=Object.fromEntries(['eventId','activityId','area','correct','total','durationMs','mode'].map(k=>[k,item[k]]));
        const result=await request('/events',{method:'POST',body:JSON.stringify(payload)});
        if(!sameSession())return;
        const latest=local(email),target=latest.find(e=>e.eventId===item.eventId);
        if(target){Object.assign(target,result.event,{remote:true});save(email,latest)}
      }
      const all=[];let cursor='';
      do{
        const data=await request('/events'+(cursor?'?cursor='+encodeURIComponent(cursor):''));
        if(!sameSession())return;
        all.push(...data.events);cursor=data.nextCursor||'';
      }while(cursor);
      const merged=new Map(local(email).map(e=>[e.eventId,e]));
      for(const e of all)merged.set(e.eventId,{...merged.get(e.eventId),...e,remote:true});
      save(email,[...merged.values()]);
      document.dispatchEvent(new CustomEvent('atelier-events-restored'));
      if(!sameSession())return;
      if(outbox().length===0){
        document.dispatchEvent(new CustomEvent('atelier-sync-status',{detail:'Progressi confermati su Drive.'}));
        break;
      }
      document.dispatchEvent(new CustomEvent('atelier-sync-status',{detail:'Sincronizzazione delle nuove attività in corso…'}));
    }
  }catch(e){
    if(sameSession())document.dispatchEvent(new CustomEvent('atelier-sync-status',{detail:e.message+' I progressi restano su questo browser.'}));
  }finally{
    flushing=false;
    // A login to another account can request a flush while the old request is
    // still settling. Only restart automatically for that new session; network
    // failures retain the outbox for an explicit later retry.
    const restart=flushRequested&&!sameSession()&&session&&(session.authorized||session.teacher);
    flushRequested=false;
    if(restart)void flush();
  }
}
async function logout(){++epoch;session=null;notify();await window.StradilabAuth?.esci?.();location.reload()}
function init(){if(location.hostname!=='didattica.stradilab.org')return;const load=src=>new Promise((resolve,reject)=>{const s=document.createElement('script');s.src=src;s.onload=resolve;s.onerror=reject;document.head.append(s)});(async()=>{try{if(!window.google?.accounts)await load('https://accounts.google.com/gsi/client');if(!window.StradilabAuth)await load('/stradilab-auth.js?v=2');StradilabAuth.init({progetto:'',minimo:'nessuno',mount:'sl-login',onReady:profile,onDenied:()=>document.dispatchEvent(new CustomEvent('atelier-sync-status',{detail:'Account non abilitato. Chiedi al docente.'})),onError:()=>document.dispatchEvent(new CustomEvent('atelier-sync-status',{detail:'Accesso temporaneamente non disponibile.'}))});}catch{document.dispatchEvent(new CustomEvent('atelier-sync-status',{detail:'Servizio di accesso non disponibile.'}))}})()}
window.AtelierAdapter={get session(){return session},get enabled(){return location.hostname==='didattica.stradilab.org'},subscribe(fn){listeners.push(fn)},flush,request,init,logout};
})();
