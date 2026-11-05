/* Class challenges: the service owns membership, results and teacher access. */
(() => {
'use strict';
const A=window.AtelierAdapter,home=document.querySelector('#home'),teacher=document.querySelector('#teacher');
if(!A||!home)return;
const areas={parole:'grammaticale',frase:'logica',periodo:'periodo'};
const areaLabels={grammaticale:'Analisi grammaticale',logica:'Analisi logica',periodo:'Analisi del periodo'};
const tracks={moda:'Moda',arredo:'Arredo',liuteria:'Liuteria'};
const classPattern=/^[1-5][A-Z]{1,3}( (Moda|Arredo|Liuteria|Artistico|Musicale))?$/;
const uuidPattern=/^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/i;
let epoch=0,revision=0,contextKey='',scheduled=false,races=[],loaded=false,details=new Map(),pendingCreate=null;
let activeDetails=0;const detailQueue=[];
function queueDetail(task){return new Promise((resolve,reject)=>{detailQueue.push({task,resolve,reject});drainDetails()})}
function drainDetails(){while(activeDetails<4&&detailQueue.length){const job=detailQueue.shift();activeDetails++;Promise.resolve().then(job.task).then(job.resolve,job.reject).finally(()=>{activeDetails--;drainDetails()})}}
const el=(tag,text,className)=>{const node=document.createElement(tag);if(text!==undefined)node.textContent=String(text);if(className)node.className=className;return node};
const button=(text,handler,secondary=false)=>{const node=el('button',text,secondary?'secondary':'');node.type='button';node.addEventListener('click',handler);return node};
const allowed=()=>Boolean(A.session?.email&&(A.session.authorized===true||A.session.teacher===true));
const key=()=>JSON.stringify([A.session?.email||'',A.session?.authorized===true,A.session?.teacher===true]);
const snapshot=()=>({epoch,email:A.session?.email,key:key()});
const live=ctx=>ctx.epoch===epoch&&ctx.email===A.session?.email&&ctx.key===key()&&allowed();
async function request(path,options,ctx){if(!live(ctx))throw Error('Accesso cambiato.');const data=await A.request(path,options);if(!live(ctx))throw Error('Accesso cambiato.');if(data?.ok!==true)throw Error('Il servizio non conferma l’operazione.');return data}
const count=value=>Number.isFinite(Number(value))?Math.max(0,Math.floor(Number(value))):0;
function time(value){const seconds=Math.floor(count(value)/1000);return String(Math.floor(seconds/60)).padStart(2,'0')+':'+String(seconds%60).padStart(2,'0')}
function errorText(error){return (error?.message||'Il servizio gare non è disponibile.')+' Non è stato possibile aggiornare le gare. I progressi già salvati su questo browser restano disponibili.'}
const section=el('section');section.id='classRaces';section.setAttribute('aria-labelledby','classRacesTitle');
section.append(el('p','Una sfida, insieme','eyebrow'));
const heading=el('h2','Gare della classe');heading.id='classRacesTitle';section.append(heading);
section.append(el('p','Completa la tua prova, raccogli stelline e migliora il tuo risultato. Il tempo è un consiglio: nessuna penalità per la velocità.'));
const status=el('p',undefined,'small');status.id='raceStatus';status.setAttribute('role','status');
const actions=el('div',undefined,'race-actions');
const retry=button('Aggiorna gare',()=>scheduleRefresh(),true);actions.append(retry);
const cards=el('div',undefined,'race-grid');section.append(status,actions,cards);
home.insertBefore(section,home.querySelector('.settings,.areas'));
let teacherSection,teacherStatus,teacherList,teacherForm,labelInput,groupInput,trackSelect,topicSelect,minutesInput,createButton,groupOptions,boardHost,storageButton,storageStatus,storageDetails;
function formField(form,title,node){const label=el('label',title);label.append(node);form.append(label);return node}
function input(type,id){const node=el('input');node.type=type;node.id=id;return node}
function topics(){return Array.from(document.querySelectorAll('#topic option')).filter(o=>o.value&&areas[o.value.split('|')[0]]&&o.value.split('|')[1]!=='Le mie sfide')}
function syncTopics(){if(!topicSelect)return;const selected=topicSelect.value;topicSelect.replaceChildren();for(const source of topics()){const option=el('option',source.textContent);option.value=source.value;topicSelect.append(option)}if(Array.from(topicSelect.options).some(o=>o.value===selected))topicSelect.value=selected}
function buildTeacher(){
  if(!teacher)return;
  teacherSection=el('section');teacherSection.id='teacherRaces';teacherSection.hidden=true;
  teacherSection.append(el('h3','Gare della classe'),el('p','Assegna una prova a una classe già autorizzata. Stelline e miglioramenti sono premi didattici; i risultati individuali sono visibili solo a te.'));
  const storageActions=el('div',undefined,'race-actions');storageButton=button('Controlla archivio Drive',checkStorage,true);storageButton.id='raceStorageCheck';storageActions.append(storageButton);
  storageStatus=el('p',undefined,'small');storageStatus.id='raceStorageStatus';storageStatus.setAttribute('role','status');storageDetails=el('div');storageDetails.id='raceStorageDetails';teacherSection.append(storageActions,storageStatus,storageDetails);
  teacherForm=el('form');teacherForm.id='raceCreateForm';
  labelInput=formField(teacherForm,'Nome della gara',input('text','raceLabel'));labelInput.required=true;labelInput.maxLength=80;labelInput.placeholder='Per esempio: La sfida degli articoli';
  groupInput=formField(teacherForm,'Classe',input('text','raceGroup'));groupInput.required=true;groupInput.maxLength=30;groupInput.pattern='[1-5][A-Z]{1,3}( (Moda|Arredo|Liuteria|Artistico|Musicale))?';groupInput.placeholder='1B Moda';groupInput.setAttribute('list','raceGroups');
  const help=el('small','Solo classe e indirizzo: nessun nome o dato personale.');help.id='raceGroupHelp';groupInput.setAttribute('aria-describedby',help.id);teacherForm.append(help);
  groupOptions=el('datalist');groupOptions.id='raceGroups';teacherForm.append(groupOptions);
  trackSelect=formField(teacherForm,'Laboratorio',el('select'));trackSelect.id='raceTrack';for(const [value,name]of Object.entries(tracks)){const option=el('option',name);option.value=value;trackSelect.append(option)}
  topicSelect=formField(teacherForm,'Argomento della prova',el('select'));topicSelect.id='raceTopic';topicSelect.required=true;syncTopics();topicSelect.addEventListener('focus',syncTopics);
  minutesInput=formField(teacherForm,'Minuti consigliati',input('number','raceMinutes'));minutesInput.required=true;minutesInput.min='3';minutesInput.max='30';minutesInput.step='1';minutesInput.defaultValue='10';minutesInput.value='10';
  createButton=el('button','Crea gara');createButton.type='submit';teacherForm.append(createButton);
  teacherStatus=el('p');teacherStatus.id='teacherRaceStatus';teacherStatus.setAttribute('role','status');
  teacherList=el('div');teacherList.id='teacherRaceList';
  boardHost=el('div');boardHost.id='teacherRaceResults';boardHost.setAttribute('aria-live','polite');
  teacherSection.append(teacherForm,teacherStatus,teacherList,boardHost);teacher.append(teacherSection);
  teacherForm.addEventListener('submit',createRace);
}
function freeMission(message,waiting=false){cards.replaceChildren();const card=el('article',undefined,'race-card');card.append(el('h3','Missione libera'),el('p',message),button(waiting?'Ripassa':'Allenati',()=>{if(waiting)location.hash='pillole';else document.querySelector('#startSuggested')?.click()}));cards.append(card)}
async function checkStorage(){
  const ctx=snapshot();if(!live(ctx)||A.session?.teacher!==true||storageButton.disabled)return;storageButton.disabled=true;storageDetails.replaceChildren();storageStatus.textContent='Verifica dell’archivio Drive…';
  try{const data=await request('/races?storageStatus=1',undefined,ctx);if(!live(ctx)||A.session?.teacher!==true)return;renderStorage(data.storage)}
  catch{if(live(ctx)&&A.session?.teacher===true)storageStatus.textContent='Non è stato possibile verificare l’archivio Drive. Riprova il controllo.'}finally{if(live(ctx))storageButton.disabled=false}
}
// Diagnostic copy is a closed vocabulary: never display provider errors,
// principal names, arbitrary object keys or unvalidated backend URLs.
const storageStages={
  root_metadata:'Lettura della cartella principale',root_permissions:'Permessi della cartella principale',
  folder_lookup:'Ricerca della cartella Grammatica',folder_metadata:'Lettura della cartella Grammatica',
  folder_permissions:'Permessi della cartella Grammatica',disable_inheritance:'Limitazione dei permessi ereditati',
  folder_reattest:'Ricontrollo della cartella Grammatica',verification:'Verifica finale'
};
const storageFailures={
  DRIVE_NETWORK:'Connessione a Drive non riuscita',DRIVE_BAD_REQUEST:'Richiesta non accettata da Drive',
  DRIVE_UNAUTHORIZED:'Accesso del servizio non riconosciuto da Drive',DRIVE_FORBIDDEN:'Permesso negato da Drive',
  DRIVE_NOT_FOUND:'Cartella non trovata o non accessibile',DRIVE_RATE_LIMITED:'Troppe richieste a Drive',
  DRIVE_UNAVAILABLE:'Drive temporaneamente non disponibile',DRIVE_INVALID_RESPONSE:'Risposta di Drive non verificabile',
  FOLDER_LOOKUP_AMBIGUOUS:'Cartella Grammatica non identificata in modo univoco',FOLDER_ID_INVALID:'Riferimento alla cartella non valido',
  FOLDER_TYPE_INVALID:'La destinazione non risulta una cartella',ACL_INVALID_RESPONSE:'Elenco dei permessi non verificabile',
  ACL_INVALID_PAGINATION:'Lettura dei permessi non completata',ACL_TOO_LARGE:'Troppi permessi per completare il controllo',
  CANNOT_DISABLE_INHERITANCE:'Il servizio non può limitare i permessi ereditati',
  INHERITANCE_NOT_RESTRICTED:'I permessi ereditati non risultano limitati',CANNOT_LIST_CHILDREN:'Il servizio non può elencare i contenuti',
  BROAD_CONTENT_GRANTS:'Sono presenti accessi estesi al dominio o a chiunque',UNKNOWN_CONTENT_GRANTS:'Sono presenti accessi non riconosciuti come riservati'
};
const grantLabels={user:'Utenti',group:'Gruppi',domain:'Dominio',anyone:'Chiunque',other:'Altri tipi',administrators:'Proprietari e gestori',allowedUsers:'Utenti ammessi',metadataOnly:'Sola visibilità della cartella',unknownUsers:'Utenti non riconosciuti'};
const knownLabel=(labels,value)=>typeof value==='string'&&Object.hasOwn(labels,value)?labels[value]+' ('+value+')':null;
const safeCount=value=>Number.isSafeInteger(value)&&value>=0&&value<=10000;
function renderStorage(value){
  const storage=value&&typeof value==='object'?value:{};
  storageStatus.textContent=storage.verified===true?'Archivio Drive verificato dal servizio.':'Archivio Drive non verificato. Il servizio non conferma la corretta configurazione.';
  storageDetails.replaceChildren();if(storage.verified===true)return;
  storageDetails.append(el('h4','Dove si ferma il controllo'));
  const facts=el('ul');
  const enumFact=(label,labels,value)=>{const text=knownLabel(labels,value);if(text)facts.append(el('li',label+': '+text))};
  const boolFact=(label,value)=>{if(typeof value==='boolean')facts.append(el('li',label+': '+(value?'Sì':'No')))};
  const countFact=(label,value)=>{if(safeCount(value))facts.append(el('li',label+': '+value))};
  enumFact('Fase',storageStages,storage.stage);enumFact('Causa',storageFailures,storage.failureCode);
  enumFact('Fase del controllo principale',storageStages,storage.rootFailureStage);enumFact('Causa nella cartella principale',storageFailures,storage.rootFailureCode);
  boolFact('Cartella principale riservata',storage.rootRestricted);boolFact('Accesso limitato alla cartella Grammatica',storage.limitedAccess);
  boolFact('Identità del servizio configurata',storage.serviceIdentityKnown);
  boolFact('Il servizio può limitare i permessi ereditati',storage.capabilities?.canDisableInheritedPermissions);
  boolFact('Il servizio può elencare i contenuti',storage.capabilities?.canListChildren);
  countFact('Accessi estesi rilevati',storage.broadDirectGrants);countFact('Accessi da verificare',storage.unknownGrants);
  if(facts.childElementCount)storageDetails.append(facts);
  const hint=storage.failureCode==='CANNOT_DISABLE_INHERITANCE'||storage.failureCode==='INHERITANCE_NOT_RESTRICTED'?
    'Verifica l’accesso limitato nelle impostazioni di condivisione della cartella Grammatica. Può essere necessario l’intervento di un gestore del Drive condiviso.':
    storage.failureCode==='BROAD_CONTENT_GRANTS'||storage.failureCode==='UNKNOWN_CONTENT_GRANTS'?
    'Controlla le condivisioni della cartella Grammatica e della cartella principale. Il servizio riprenderà le attività quando potrà confermarne la riservatezza.':
    'Il gestore può verificare i permessi della cartella e del servizio, oppure comunicare al supporto la fase e la causa mostrate qui. Dopo il controllo, premi di nuovo «Controlla archivio Drive».';
  storageDetails.append(el('p',hint));
  const grants=el('details');grants.append(el('summary','Conteggi dei permessi, senza nomi'));
  for(const [field,title]of [['rootGrantTypes','Cartella principale'],['grantTypes','Cartella Grammatica']]){
    const types=storage[field];if(!types||typeof types!=='object')continue;const list=el('ul');
    for(const [type,label]of Object.entries(grantLabels))if(safeCount(types[type]))list.append(el('li',label+': '+types[type]));
    if(list.childElementCount)grants.append(el('h5',title),list);
  }
  if(grants.childElementCount>1)storageDetails.append(grants);
  const folderMatch=typeof storage.folderUrl==='string'?/^https:\/\/drive\.google\.com\/drive\/folders\/[a-zA-Z0-9_-]{1,160}$/.exec(storage.folderUrl):null;
  if(folderMatch&&folderMatch[0]===storage.folderUrl){
    const link=el('a','Apri cartella Grammatica');link.href=storage.folderUrl;link.target='_blank';link.rel='noopener noreferrer';storageDetails.append(link);
  }
}
function resultContent(host,data){
  host.replaceChildren();
  const own=data.own;
  if(own&&typeof own==='object'){
    const total=count(own.total),correct=Math.min(count(own.correct),total),stars=Math.min(count(own.stars),3);
    const medal=el('p',stars+' stelline · il tuo miglior risultato','medal');host.append(medal);
    host.append(el('p',correct+' risposte corrette su '+total+' · '+count(own.attempts)+' tentativi · tempo attivo '+time(own.durationMs)));
    if(own.improvement===true)host.append(el('p','Hai migliorato il tuo risultato.'));
    else if(typeof own.improvement==='number'&&Number.isFinite(own.improvement)&&own.improvement>0)host.append(el('p','Miglioramento: +'+Math.round(own.improvement*10)/10+' punti percentuali.'));
  }else host.append(el('p','Il tuo medagliere è pronto per la prima prova.'));
  if(data.aggregate&&typeof data.aggregate==='object'){
    const participants=count(data.aggregate.participants),completed=Math.min(count(data.aggregate.completed),participants);
    const progress=el('progress');progress.max=Math.max(participants,1);progress.value=completed;progress.setAttribute('aria-label','Prove completate nella classe');
    host.append(el('p',completed+' di '+participants+' partecipanti hanno completato la prova.'),progress);
  }
}
function renderCards(ctx,version){
  cards.replaceChildren();
  const assigned=races;
  if(!assigned.length){freeMission('Nessuna gara aperta assegnata. Puoi scegliere un allenamento e continuare il tuo percorso.');return}
  for(const race of assigned){
    const card=el('article',undefined,'race-card');card.dataset.raceId=race.raceId;
    card.append(el('p',race.enabled===false?'Gara conclusa':'Gara aperta','eyebrow'),el('h3',race.label||'Gara della classe'));
    card.append(el('p',(tracks[race.track]||race.track||'')+' · '+(areaLabels[race.area]||'')+' · '+String(race.topicGroup||'')));
    card.append(el('p',count(race.suggestedMinutes)+' minuti consigliati · puoi fare una pausa.','small'));
    const result=el('div');result.dataset.raceResult='';
    if(details.has(race.raceId))resultContent(result,details.get(race.raceId));else result.append(el('p',A.session?.teacher===true?'Consulta i risultati nell’area docente.':'Caricamento del tuo risultato…','small'));
    const go=button(details.get(race.raceId)?.own?'Riprova la gara':'Partecipa',()=>{
      if(!live(ctx)||version!==revision||race.enabled===false)return;
      document.dispatchEvent(new CustomEvent('atelier-race-start',{detail:{...race}}));
    });go.disabled=race.enabled===false;
    if(go.disabled)go.textContent='Gara chiusa';
    card.append(result,go);cards.append(card);
  }
}
function makeTable(headers){const table=el('table',undefined,'race-board'),thead=el('thead'),row=el('tr');for(const text of headers){const th=el('th',text);th.scope='col';row.append(th)}thead.append(row);const body=el('tbody');table.append(thead,body);return {table,body}}
function renderTeacher(ctx){
  if(!teacherSection)return;
  teacherSection.hidden=A.session?.teacher!==true;
  if(teacherSection.hidden)return;
  groupOptions.replaceChildren();for(const group of new Set(races.map(r=>r.group).filter(g=>classPattern.test(g)))){const option=el('option');option.value=group;groupOptions.append(option)}
  teacherList.replaceChildren();
  if(!races.length){teacherList.append(el('p','Nessuna gara creata.'));return}
  const {table,body}=makeTable(['Gara e classe','Argomento','Stato','Azioni']);
  for(const race of races){
    const row=el('tr');row.append(el('td',String(race.label||'Gara')+' · '+String(race.group||'')),el('td',String(race.topicGroup||'')+' · '+(tracks[race.track]||'')),el('td',race.enabled===false?'Chiusa':'Aperta'));
    const cell=el('td'),tools=el('div',undefined,'race-actions');
    const toggle=button(race.enabled===false?'Crea gara simile':'Chiudi',()=>race.enabled===false?cloneRace(race,ctx):toggleRace(race,toggle,ctx),true);
    const results=button('Visualizza esiti',()=>showBoard(race,results,ctx),true);tools.append(toggle,results);cell.append(tools);row.append(cell);body.append(row);
  }
  const wrap=el('div',undefined,'race-table-wrap');wrap.append(table);teacherList.append(wrap);
}
async function showBoard(race,trigger,ctx){
  if(!live(ctx)||A.session?.teacher!==true)return;trigger.disabled=true;teacherStatus.textContent='Caricamento esiti…';
  try{
    const data=await request('/races?raceId='+encodeURIComponent(race.raceId),undefined,ctx);if(!live(ctx)||A.session?.teacher!==true)return;
    boardHost.replaceChildren(el('h4','Esiti · '+String(race.label||'Gara')));
    boardHost.append(el('p','Vista riservata al docente. Il tempo documenta il lavoro e non determina i premi.','small'));
    const entries=Array.isArray(data.board)?data.board:[];
    if(!entries.length)boardHost.append(el('p','Nessun risultato registrato per questa gara.'));
    else{
      const {table,body}=makeTable(['Account','Miglior risultato','Stelline','Tentativi','Tempo attivo']);
      for(const entry of entries){const best=entry.best;const row=el('tr');row.append(el('td',entry.email||''),el('td',best?count(best.correct)+' / '+count(best.total):'Non completata'),el('td',best?Math.min(count(best.stars),3):'—'),el('td',count(entry.attempts)),el('td',best?time(best.durationMs):'—'));body.append(row)}
      const wrap=el('div',undefined,'race-table-wrap');wrap.append(table);boardHost.append(wrap);
    }
    teacherStatus.textContent='Esiti aggiornati dal servizio.';
  }catch(error){if(live(ctx)&&A.session?.teacher===true)teacherStatus.textContent=errorText(error)}finally{if(live(ctx))trigger.disabled=false}
}
function cloneRace(race,ctx){
  if(!live(ctx)||A.session?.teacher!==true)return;
  labelInput.value=String(race.label||'').slice(0,80);groupInput.value=race.group||'';trackSelect.value=race.track;minutesInput.value=race.suggestedMinutes;syncTopics();
  const area=Object.keys(areas).find(value=>areas[value]===race.area);topicSelect.value=area+'|'+race.topicGroup;pendingCreate=null;
  teacherStatus.textContent='Dati copiati nel modulo. Crea una nuova gara per assegnare un nuovo tentativo alla classe.';labelInput.focus();
}
async function toggleRace(race,trigger,ctx){
  if(!live(ctx)||A.session?.teacher!==true||race.enabled===false)return;trigger.disabled=true;teacherStatus.textContent='Aggiornamento della gara…';
  try{await request('/races',{method:'POST',body:JSON.stringify({...racePayload(race),enabled:false})},ctx);if(!live(ctx))return;teacherStatus.textContent='Chiusura confermata. Le gare chiuse restano consultabili.';scheduleRefresh()}
  catch(error){if(live(ctx))teacherStatus.textContent=errorText(error)}finally{if(live(ctx))trigger.disabled=false}
}
function racePayload(race){return Object.fromEntries(['raceId','group','track','area','topicGroup','label','suggestedMinutes','enabled'].map(field=>[field,race[field]]))}
async function createRace(event){
  event.preventDefault();if(createButton.disabled)return;const ctx=snapshot();if(!live(ctx)||A.session?.teacher!==true)return;
  const label=labelInput.value.trim(),group=groupInput.value.trim(),track=trackSelect.value,topic=topicSelect.value,minutes=Number(minutesInput.value);
  const [area,topicGroup]=topic.split('|');
  if(!label||label.length>80||/[<>\u0000-\u001f]/.test(label)){teacherStatus.textContent='Scrivi un nome della gara da 1 a 80 caratteri, senza codice HTML.';labelInput.focus();return}
  if(!classPattern.test(group)){teacherStatus.textContent='Indica solo una classe valida, per esempio 1B Moda.';groupInput.focus();return}
  if(!tracks[track]||!areas[area]||!topicGroup||!topics().some(o=>o.value===topic)){teacherStatus.textContent='Scegli un laboratorio e un argomento disponibile.';topicSelect.focus();return}
  if(!Number.isInteger(minutes)||minutes<3||minutes>30){teacherStatus.textContent='Il tempo consigliato deve essere compreso tra 3 e 30 minuti.';minutesInput.focus();return}
  if(!window.crypto?.randomUUID){teacherStatus.textContent='Creazione non disponibile in questo browser. Apri il sito con una connessione sicura.';return}
  const metadata={group,track,area:areas[area],topicGroup,label,suggestedMinutes:minutes,enabled:true},fingerprint=JSON.stringify(metadata);
  if(!pendingCreate||pendingCreate.fingerprint!==fingerprint)pendingCreate={fingerprint,raceId:crypto.randomUUID()};
  const race={raceId:pendingCreate.raceId,...metadata};
  createButton.disabled=true;teacherStatus.textContent='Creazione della gara…';
  try{const result=await request('/races',{method:'POST',body:JSON.stringify(race)},ctx);if(!live(ctx))return;pendingCreate=null;teacherStatus.textContent=result.race?.enabled===false?'La richiesta era già registrata e la gara è ora chiusa. Puoi creare una gara simile.':'Gara creata e confermata dal servizio.';labelInput.value='';scheduleRefresh()}
  catch(error){if(live(ctx))teacherStatus.textContent=errorText(error)}finally{if(live(ctx))createButton.disabled=false}
}
async function refresh(){
  if(!allowed())return;
  const ctx=snapshot(),version=++revision;retry.disabled=true;status.textContent='Aggiornamento delle gare…';
  try{
    const data=await request('/races',undefined,ctx);if(!live(ctx)||version!==revision)return;
    if(!Array.isArray(data.races))throw Error('Il servizio ha restituito un elenco gare non valido.');
    races=data.races.filter(r=>r&&uuidPattern.test(r.raceId));loaded=true;details.clear();
    for(const race of races)if(Object.hasOwn(race,'own'))details.set(race.raceId,{own:race.own,aggregate:race.aggregate});
    status.textContent=races.length?'Le gare assegnate sono aggiornate.':'';renderCards(ctx,version);renderTeacher(ctx);
    // Teacher boards load only on an explicit click. Pupil detail requests share
    // one queue, so overlapping refreshes never exceed four active requests.
    if(A.session?.teacher===true)return;
    await Promise.all(races.filter(r=>!details.has(r.raceId)).map(race=>queueDetail(async()=>{
      if(!live(ctx)||version!==revision)return;
      try{const result=await request('/races?raceId='+encodeURIComponent(race.raceId),undefined,ctx);if(!live(ctx)||version!==revision)return;
        const personal={own:result.own||null,aggregate:result.aggregate};details.set(race.raceId,personal);
        const card=Array.from(cards.children).find(n=>n.dataset.raceId===race.raceId);if(card){resultContent(card.querySelector('[data-race-result]'),personal);const go=card.querySelector('button');if(go&&!go.disabled&&personal.own)go.textContent='Riprova la gara'}
      }catch(error){if(!live(ctx)||version!==revision)return;const card=Array.from(cards.children).find(n=>n.dataset.raceId===race.raceId);if(card)card.querySelector('[data-race-result]').textContent=errorText(error)}
    })));
  }catch(error){if(live(ctx)&&version===revision){status.textContent=errorText(error);if(!loaded)cards.replaceChildren();if(teacherStatus&&A.session.teacher)teacherStatus.textContent=errorText(error)}}
  finally{if(live(ctx)&&version===revision)retry.disabled=false}
}
function scheduleRefresh(){if(scheduled||!allowed())return;scheduled=true;queueMicrotask(()=>{scheduled=false;void refresh()})}
function accessChanged(){
  const next=key();if(next!==contextKey){
    contextKey=next;++epoch;++revision;races=[];details.clear();pendingCreate=null;loaded=false;cards.replaceChildren();retry.disabled=false;
    if(teacherSection){teacherSection.hidden=true;teacherList.replaceChildren();boardHost.replaceChildren();groupOptions.replaceChildren();teacherForm.reset();labelInput.value='';groupInput.value='';createButton.disabled=false;teacherStatus.textContent='';storageStatus.textContent='';storageDetails.replaceChildren();storageButton.disabled=false;syncTopics()}
    if(!allowed()){
      retry.hidden=true;status.textContent=!A.enabled?'Le gare della classe sono attive sul sito con accesso scolastico.':A.session?'Il tuo account deve essere autorizzato dal docente per partecipare alle gare.':'Accedi con il tuo account scolastico per vedere le gare assegnate.';
      const waiting=Boolean(A.enabled&&A.session);freeMission(waiting?'Nell’attesa dell’autorizzazione puoi leggere le pillole e ripassare.':'Puoi avviare il tuo allenamento dal banco di lavoro.',waiting);return;
    }
    retry.hidden=false;if(teacherSection)teacherSection.hidden=A.session?.teacher!==true;
    scheduleRefresh();
  }
}
buildTeacher();A.subscribe(accessChanged);document.addEventListener('atelier-access',accessChanged);
document.addEventListener('atelier-events-restored',scheduleRefresh);
document.addEventListener('atelier-race-finished',scheduleRefresh);
accessChanged();
})();
