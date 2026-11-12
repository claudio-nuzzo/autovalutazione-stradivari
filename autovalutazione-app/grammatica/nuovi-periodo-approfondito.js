(() => {
'use strict';
const bank=[];
function base(group,kind,prompt,feedback){return{id:`per-approf-${String(bank.length+1).padStart(3,'0')}`,area:'periodo',topicGroup:group,topic:group,level:kind==='exact'?1:kind==='tokens'?2:3,pei:false,kind,title:kind==='tokens'?'Trova nel periodo':kind==='exact'?'Completa':'Analizza il periodo',prompt,feedback,minutes:kind==='tokens'?3:2}}
function choice(g,p,a,w,f){const options=[a,...w],answer=bank.length%options.length;options.splice(answer,0,options.shift());bank.push({...base(g,'choice',p,f),options,answer,solution:a})}
function exact(g,p,a,f){bank.push({...base(g,'exact',p,f),answers:[a],solution:a})}
function tokens(g,p,words,answer,f){bank.push({...base(g,'tokens',p,f),tokens:words,answer,solution:answer.map(i=>words[i]).join(' ')})}
const groups=[
['Principale e proposizioni',[
['Quale frase esprime una reazione esclamativa?','Che bella sorpresa!',['Quando arriva il corriere?','Il corriere arriva domani.'],'Che bella sorpresa! comunica una reazione esclamativa.'],
['Quale domanda diretta ammette normalmente sì oppure no?','Hai riposto il metro?',['Dove hai riposto il metro?','Quale metro hai riposto?'],'«Hai riposto il metro?» è una domanda totale: si può rispondere sì o no.'],
['Quale domanda presenta alternative?','Vuoi disegnare o costruire?',['Chi vuole disegnare?','Dove vuoi costruire?'],'La domanda propone due possibilità tra cui scegliere.'],
['In un discorso elogiativo, «Chi non desidera essere ascoltato?» può essere…','una domanda retorica',['un ordine con imperativo','una frase senza intenzione comunicativa'],'Nel contesto può suggerire una risposta condivisa senza richiederla.'],
['Quale domanda chiede un’informazione sul luogo?','Dove si riunisce la classe?',['La classe si riunisce?','La classe si riunisce o esce?'],'Dove chiede una singola informazione sul luogo.']
],['Scrivi «o» per completare la domanda con due alternative: «Preferisci leggere ___ disegnare?»','o','O presenta due possibilità.'],['Seleziona la domanda diretta completa.',['Sai','dove','lavora','Mia?'],[0,1,2,3],'L’intero enunciato è una domanda diretta; dove lavora Mia è una dipendente.']],
['Coordinate',[
['Quale frase collega più azioni ripetendo la stessa congiunzione?','E prende il metro, e misura, e annota.',['Prende il metro, misura, annota.','Prende il metro perché misura.'],'La ripetizione di e è un esempio di polisindeto.'],
['Quale collegamento si realizza senza congiunzioni espresse?','Entra, guarda, saluta.',['Entra e guarda e saluta.','Entra perché vuole salutare.'],'Le proposizioni sono accostate tramite punteggiatura: asindeto.'],
['In «Ora il cielo si scurisce, ora torna sereno», ora… ora esprime…','un’alternanza correlata',['una subordinata finale','una domanda indiretta'],'I due elementi ora si richiamano e presentano situazioni alternate.'],
['In «Né scrive né telefona», quale elemento viene ripetuto?','né',['scrive','telefona'],'La ripetizione di né collega i due verbi.'],
['Quale coppia correla due proposizioni presentando alternative?','o… o',['perché… durante','quando… motivo'],'O… o presenta alternative coordinate.']
],['Scrivi «e» per ripetere la congiunzione: «E misura, ___ ritaglia».','e','La congiunzione ripetuta produce polisindeto.'],['Seleziona entrambe le parole che formano la correlazione.',['Ora','il','vento','cresce,','ora','si','ferma.'],[0,4],'Ora e ora correlano due momenti alternati.']],
['Interrogative indirette',[
['In «Chiedo se Lea arrivi e se Amir partecipi», quanti predicati interrogativi dipendenti sono espressi?','due',['uno','nessuno'],'Arrivi e partecipi sono due predicati nelle interrogative dipendenti.'],
['Nella frase «Non so se Luca studi e se Anna lavori», la seconda interrogativa è…','coordinata alla prima dipendente',['principale indipendente','relativa con antecedente'],'Le due domande dipendono entrambe da non so e sono coordinate.'],
['In «Dimmi se preferisci carta o stoffa», quante proposizioni interrogative dipendenti sono espresse?','una',['due','nessuna'],'Preferisci è l’unico predicato della domanda dipendente; carta e stoffa sono alternative.'],
['Quale frase contiene due domande indirette coordinate?','Mi domando chi arrivi e chi parta.',['Mi domando chi arrivi.','Chi arriva e chi parte?'],'Arrivi e parta sono due predicati dipendenti e coordinati.'],
['In «Vorrei sapere dove lavori e quando torni», le due dipendenti chiedono…','luogo e tempo',['causa e conseguenza','due luoghi necessariamente'],'Dove chiede un luogo; quando chiede un momento.']
],['Completa con «se»: «Non so ___ Lea arrivi e se Luca parta».','se','Se introduce la prima domanda indiretta.'],['Seleziona la seconda interrogativa indiretta, incluso il collegamento.',['Non','so','se','Lia','arrivi','e','se','Mia','parta.'],[5,6,7,8],'E se Mia parta è coordinata alla prima interrogativa indiretta.']],
['Relative',[
['In «Ho visto Lia, che usciva dal negozio», la relativa può indicare anche…','il tempo dell’incontro',['una domanda indiretta','un ordine'],'Che usciva può suggerire quando è avvenuto l’incontro.'],
['In «Cerco una collega che mi aiuti», la relativa può esprimere anche…','uno scopo',['un’interrogazione diretta','una coordinazione'],'Che mi aiuti può indicare l’aiuto per cui si cerca una collega.'],
['In «Ammiriamo Marta, che lavora con cura», la relativa può suggerire…','una ragione dell’ammirazione',['una scelta alternativa','una domanda totale'],'La qualità descritta può spiegare l’ammirazione.'],
['In «Il pezzo, che era stato controllato, presentava ancora un difetto», la relativa può suggerire…','un fatto che non ha impedito il difetto',['uno scopo del controllo','una domanda'],'Il controllo non impedisce il difetto: è possibile una sfumatura concessiva.'],
['Una relativa con sfumatura circostanziale resta legata…','a un antecedente',['soltanto a una virgola','a una risposta sì o no'],'La sfumatura non elimina il legame con l’antecedente.']
],['Completa con «che»: «Saluto Nora, ___ entra in aula».','che','Che riprende Nora e introduce una relativa.'],['Seleziona la proposizione relativa.',['Ho','incontrato','Lia,','che','entrava','in','aula.'],[3,4,5,6],'Che entrava in aula precisa Lia e può suggerire il tempo dell’incontro.']],
['Principale, coordinate e subordinate',[
['In «Quando Lea arriva, Nora legge e Luca annota», quale proposizione è principale?','Nora legge',['quando Lea arriva','e Luca annota'],'Nora legge è la principale; Luca annota è coordinata.'],
['Nello stesso periodo, «e Luca annota» è…','coordinata alla principale',['subordinata causale','interrogativa indiretta'],'E collega la seconda azione alla principale sullo stesso piano.'],
['In «Nora spiega che il banco è libero perché la classe è uscita», da quale verbo dipende «perché la classe è uscita»?','è libero',['spiega direttamente','è uscita'],'La causale spiega perché il banco è libero.'],
['Nello stesso periodo, che grado ha la causale rispetto a spiega?','secondo',['primo','terzo'],'La causale dipende dalla completiva che il banco è libero, di primo grado.'],
['Qual è il primo passo per analizzare un periodo lungo?','individuare i predicati completi',['contare soltanto le virgole','cercare una sola congiunzione'],'I predicati aiutano a distinguere i nuclei delle proposizioni.']
],['Completa con «e»: «Lia misura ___ Nora annota».','e','E coordina le due proposizioni.'],['Seleziona la temporale iniziale.',['Quando','Lia','arriva,','Nora','legge','e','Luca','annota.'],[0,1,2],'Quando Lia arriva indica il momento.']]
];
for(const [g,cs,e,t] of groups){for(const row of cs)choice(g,...row);exact(g,...e);tokens(g,...t)}
window.ATELIER_NEW_PERIODO_APPROFONDITO=bank;
})();
