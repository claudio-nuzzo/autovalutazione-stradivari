(() => {
'use strict';
const items=[];
function choice(area,group,q,a,w,f){const n=items.length,options=[a,...w],answer=n%options.length;options.splice(answer,0,options.shift());items.push({id:`basi-rinforzo-${String(n+1).padStart(3,'0')}`,area,topicGroup:group,topic:group,level:2,pei:false,kind:'choice',title:'Analizza il contesto',prompt:q,options,answer,solution:a,feedback:f,minutes:2});}
function exact(area,group,q,a,f){const n=items.length;items.push({id:`basi-rinforzo-${String(n+1).padStart(3,'0')}`,area,topicGroup:group,topic:group,level:2,pei:false,kind:'exact',title:'Completa o individua',prompt:q,answers:[a],solution:a,feedback:f,minutes:2});}
function tokens(area,group,q,words,answer,f){const n=items.length;items.push({id:`basi-rinforzo-${String(n+1).padStart(3,'0')}`,area,topicGroup:group,topic:group,level:2,pei:false,kind:'tokens',title:'Seleziona nella frase',prompt:q,tokens:words,answer,solution:answer.map(i=>words[i]).join(' · '),feedback:f,minutes:3});}
const groups=[
['frase','Soggetto e predicato',[
['In «Le scatole sono arrivate», qual è il soggetto?','le scatole',['sono arrivate','sottinteso: noi'],'Le scatole concorda con sono arrivate.'],
['In «Arrivano le scatole», il soggetto si trova…','dopo il verbo',['prima del verbo','necessariamente sottinteso'],'Le scatole è il soggetto posto dopo arrivano.'],
['In «Partiremo presto», il soggetto sottinteso è…','noi',['voi','loro'],'Partiremo è prima persona plurale.'],
['In «Il disegno sembra chiaro», il soggetto è…','il disegno',['chiaro','sembra'],'Il disegno è ciò di cui si afferma che sembra chiaro.'],
['In «Il disegno è chiaro», quale gruppo forma il predicato nominale?','è chiaro',['il disegno','è chiaro il disegno'],'La copula è e la parte nominale chiaro formano il predicato.'],
['In «Il gruppo ha discusso», quale gruppo forma il predicato verbale?','ha discusso',['il gruppo','discusso da solo'],'Ausiliare e participio formano il tempo composto.'],
['In «A Luca piacciono i film», il soggetto è…','i film',['a Luca','piacciono'],'I film concorda con piacciono; a Luca indica il destinatario.'],
['Quale frase ha un soggetto sottinteso?','Prepariamo i fogli.',['I ragazzi preparano i fogli.','I fogli sono pronti.'],'La desinenza di prepariamo sottintende noi.']
],[['Scrivi il soggetto in «Il tavolo oscilla».','il tavolo','Il tavolo concorda con oscilla.'],['Scrivi il soggetto sottinteso in «Partiamo domani».','noi','Partiamo indica la prima persona plurale.'],['Scrivi il predicato verbale in «Lia ha misurato».','ha misurato','Ha misurato comprende ausiliare e participio.']],[['Seleziona le parole del predicato verbale.',['Le','allieve','hanno','aperto','la','scatola.'],[2,3],'Hanno aperto è una forma composta.'],['Seleziona il soggetto espresso.',['Sono','arrivate','le','matite.'],[2,3],'Le matite è il soggetto posposto.']]],
['frase','Attributo e apposizione',[
['In «La cornice dorata brilla», «dorata» è…','attributo',['apposizione','predicato verbale'],'Dorata è aggettivo riferito al nome cornice.'],
['In «Luca, il liutaio, arriva», «il liutaio» è…','apposizione',['attributo','complemento di termine'],'Il nome liutaio precisa chi è Luca.'],
['In «Il mobile è robusto», «robusto» è…','parte nominale del predicato',['attributo direttamente legato al nome','complemento oggetto'],'Robusto con la copula è forma il predicato nominale.'],
['In «Osservo un mobile robusto», «robusto» è…','attributo dell’oggetto',['soggetto','complemento di causa'],'Robusto accompagna il nome mobile, oggetto di osservo.'],
['In «Nora, esperta restauratrice, lavora», il nucleo dell’apposizione è…','restauratrice',['esperta','lavora'],'Restauratrice è il nome che precisa Nora; esperta lo accompagna.'],
['Quale frase contiene un’apposizione?','La docente Ada spiega.',['Ada spiega con calma.','Ada spiega la regola.'],'Docente precisa Ada mediante un nome.'],
['Quale frase contiene un attributo?','La stoffa ruvida punge.',['La stoffa punge.','La stoffa è qui.'],'Ruvida accompagna il nome stoffa.'],
['In «Il piccolo libro di Sara è aperto», a quale nome si riferisce «piccolo»?','libro',['Sara','è'],'Piccolo qualifica il nome libro.']
],[['Scrivi l’attributo in «Il tavolo nuovo è pronto».','nuovo','Nuovo accompagna tavolo.'],['Scrivi il nome in apposizione in «Ada, la sarta, cuce».','sarta','Sarta precisa Ada.'],['Scrivi l’attributo in «Una sedia comoda è qui».','comoda','Comoda accompagna sedia.']],[['Seleziona l’attributo.',['La','robusta','mensola','sostiene','i','libri.'],[1],'Robusta qualifica mensola.'],['Seleziona l’apposizione comprensiva dell’articolo.',['Lina,','la','docente,','spiega.'],[1,2],'La docente precisa Lina.']]],
['parole','Transitività',[
['In «Lia ritaglia il cartone», il verbo è usato…','transitivamente',['impersonalmente','come ausiliare'],'Il cartone è oggetto diretto di ritaglia.'],
['In «Lia cammina lentamente», compare un oggetto diretto?','no',['sì, lentamente','sì, Lia'],'Lentamente indica modo; Lia è soggetto.'],
['Quale frase contiene un oggetto diretto?','Nora chiude la porta.',['Nora parla della porta.','Nora arriva alla porta.'],'La porta completa direttamente chiude.'],
['In «Parliamo del progetto», del progetto è…','complemento indiretto',['oggetto diretto','soggetto'],'Parlare di qualcosa introduce il gruppo con una preposizione.'],
['In «Ho letto il romanzo», il verbo è usato…','transitivamente',['impersonalmente','senza oggetto'],'Il romanzo è oggetto diretto di ho letto.'],
['In «La classe parte presto», quale gruppo è soggetto?','la classe',['presto','parte'],'La classe concorda con parte.'],
['Quale frase usa «vivere» transitivamente?','Abbiamo vissuto una giornata intensa.',['Abbiamo vissuto a Cremona.','Abbiamo vissuto bene.'],'Una giornata intensa è oggetto diretto di abbiamo vissuto.'],
['In «Sara telefona a Lia», a Lia è…','complemento di termine',['oggetto diretto','soggetto'],'Telefonare a qualcuno introduce qui il destinatario.']
],[['Scrivi l’oggetto diretto in «Ada osserva il modello».','il modello','Il modello completa direttamente osserva.'],['Scrivi l’oggetto diretto in «Lia legge una lettera».','una lettera','Una lettera è ciò che Lia legge.'],['Scrivi l’oggetto diretto in «Noor porta i fogli».','i fogli','I fogli è ciò che Noor porta.']],[['Seleziona il complemento oggetto.',['Lia','piega','il','foglio.'],[2,3],'Il foglio è oggetto diretto di piega.'],['Seleziona l’oggetto diretto.',['La','classe','osserva','una','mostra.'],[3,4],'Una mostra è oggetto diretto di osserva.']]],
['parole','Passivo',[
['Quale frase è passiva?','La misura è verificata da Ada.',['Ada verifica la misura.','Ada è arrivata.'],'È verificata presenta al passivo l’azione sulla misura.'],
['In «Il cartone è stato tagliato da Luca», chi compie l’azione?','Luca',['il cartone','il taglio'],'Da Luca è complemento d’agente.'],
['Qual è il passivo di «Lea apre la scatola»?','La scatola è aperta da Lea.',['Lea è aperta dalla scatola.','La scatola apre Lea.'],'L’oggetto la scatola diventa soggetto della passiva.'],
['Quale trasformazione conserva il passato prossimo di «Ada ha letto il testo»?','Il testo è stato letto da Ada.',['Il testo sarà letto da Ada.','Il testo era letto da Ada.'],'È stato letto è passato prossimo passivo.'],
['In «La finestra è stata mossa dal vento», il gruppo dal vento è…','causa efficiente',['agente umano','termine'],'Il vento è una forza non animata.'],
['Quale verbo costruisce qui il passivo? «La sedia viene riparata».','venire',['avere','potere'],'Venire più participio passato può formare il passivo nei tempi semplici.'],
['Quale frase omette l’agente?','Il pannello è stato dipinto.',['Il pannello è stato dipinto da Lia.','Ada dipinge il pannello.'],'Non è indicato chi ha dipinto il pannello.'],
['Nel passivo «I fogli sono raccolti», il participio concorda con…','i fogli',['una persona sottintesa obbligatoria','il verbo all’infinito'],'Raccolti concorda con il soggetto maschile plurale.']
],[['Completa con «da» o «a»: «Il mobile è stato montato ___ Lia».','da','Da introduce l’agente Lia.'],['Scrivi l’agente in «Il pannello è dipinto da Sara».','da Sara','Da Sara indica chi compie l’azione.'],['Completa con «sono» o «ha»: «Le sedie ___ state spostate».','sono','Sono state spostate è una forma passiva plurale.']],[['Seleziona la forma verbale passiva.',['Il','cartone','è','stato','tagliato','da','Lia.'],[2,3,4],'È stato tagliato è il predicato passivo.'],['Seleziona il complemento d’agente.',['Il','tavolo','è','stato','dipinto','da','Luca.'],[5,6],'Da Luca indica chi ha dipinto.']]],
['parole','Riflessivo',[
['In «Ada si pettina», chi riceve l’azione?','Ada stessa',['una persona sicuramente diversa','nessuno'],'Si riprende il soggetto Ada.'],
['In «Ada si lava le mani», l’oggetto diretto è…','le mani',['Ada','si'],'Le mani indica ciò che viene lavato; si significa a sé.'],
['In «Lia e Noor si salutano», si può esprimere…','reciprocità',['un articolo','una causa'],'Si può indicare che ciascuna saluta l’altra.'],
['Quale frase descrive chiaramente un’azione riflessiva diretta?','Luca si lava.',['Luca lava la macchina.','La macchina viene lavata.'],'Luca lava sé stesso.'],
['Quale frase descrive uno scambio reciproco?','Lina e Ada si abbracciano a vicenda.',['Lina abbraccia il cuscino.','Ada viene abbracciata.'],'A vicenda rende esplicito il valore reciproco.'],
['In «Mi preparo», mi si riferisce…','a chi parla',['a una persona certamente diversa','a un oggetto'],'Il pronome mi riprende la prima persona.'],
['In «Ti asciughi», il soggetto sottinteso è…','tu',['io','noi'],'Asciughi è seconda persona singolare.'],
['In «Noi ci vestiamo», ci riprende…','noi',['voi','loro'],'Ci è un pronome riferito alla prima persona plurale.']
],[['Completa con «mi» o «vi»: «Io ___ preparo».','mi','Mi riprende io.'],['Completa con «ci» o «si»: «Noi ___ laviamo».','ci','Ci riprende noi.'],['Completa con «si» o «ti»: «Lia ___ pettina».','si','Si riprende Lia.']],[['Seleziona il pronome riflessivo.',['Ada','si','pettina','prima','della','prova.'],[1],'Si riprende Ada.'],['Seleziona il pronome reciproco.',['Luca','e','Lina','si','salutano','a','vicenda.'],[3],'Si esprime qui reciprocità.']]],
['parole','Ausiliari',[
['In «Abbiamo cucito», abbiamo è…','ausiliare',['participio','aggettivo'],'Abbiamo aiuta a formare il passato prossimo.'],
['Quale frase contiene essere come ausiliare?','Lea è arrivata.',['Lea è paziente.','Lea è in aula.'],'È arrivata è un tempo composto di arrivare.'],
['Quale frase contiene avere come ausiliare?','Luca ha misurato.',['Luca ha un metro.','Luca misura.'],'Ha misurato è un tempo composto.'],
['In «Avevano preparato», quale parola è l’ausiliare?','avevano',['preparato','avevano preparato come participio'],'Avevano è una forma di avere.'],
['In «Eravamo partiti», quale parola è il participio?','partiti',['eravamo','noi'],'Partiti è il participio passato di partire.'],
['In «La classe è uscita», quale ausiliare è usato?','essere',['avere','dovere'],'È uscita è un tempo composto con essere.'],
['In «Ada ha visto il modello», quale ausiliare è usato?','avere',['essere','venire'],'Ha visto è formato con avere.'],
['Quale frase usa avere con significato autonomo di possesso?','Noor ha un quaderno.',['Noor ha scritto.','Noor è arrivata.'],'Ha indica possesso e non forma un tempo composto.']
],[['Completa con «ha» o «è»: «Ada ___ letto».','ha','Leggere forma qui il passato prossimo con avere.'],['Completa con «ha» o «è»: «Lia ___ partita».','è','Partire forma il passato prossimo con essere.'],['Completa con «hanno» o «sono»: «Le ragazze ___ arrivate».','sono','Arrivare usa qui essere come ausiliare.']],[['Seleziona l’ausiliare.',['Le','allieve','hanno','finito','il','lavoro.'],[2],'Hanno è ausiliare di finito.'],['Seleziona il participio passato.',['Ada','è','arrivata','in','aula.'],[2],'Arrivata è participio passato di arrivare.']]],
['parole','Verbi · Verbi servili',[
['In «Possiamo entrare», il verbo servile è…','possiamo',['entrare','posso entrare come nome'],'Possiamo accompagna l’infinito entrare.'],
['In «Devi verificare», dovere esprime…','necessità o obbligo',['possesso','un fatto già concluso'],'Devi aggiunge necessità all’azione di verificare.'],
['In «Voglio riposare», quale parola è all’infinito?','riposare',['voglio','io'],'Voglio accompagna l’infinito riposare.'],
['Quale frase usa potere con un infinito?','Posso uscire.',['Posso poco.','Ho potere.'],'Posso accompagna l’infinito uscire.'],
['Quale frase usa dovere senza un infinito dipendente?','Devo dieci euro a Lia.',['Devo telefonare a Lia.','Dobbiamo partire.'],'Devo ha qui significato autonomo: essere debitore.'],
['In «Vuole dipingere», il soggetto di dipingere è normalmente…','lo stesso di vuole',['necessariamente una persona diversa','il nome dipingere'],'La costruzione servile mantiene lo stesso soggetto.'],
['In «Potremmo andare», potremmo esprime…','possibilità',['un’azione già conclusa','negazione'],'Potere introduce qui una possibilità.'],
['Quale coppia è formata da servile e infinito?','devo studiare',['ho studiato','studio oggi'],'Devo accompagna l’infinito studiare.']
],[['Completa con «devo» o «dove»: «Io ___ lavorare».','devo','Devo è una forma del verbo dovere.'],['Completa con «posso» o «posato»: «Io ___ entrare».','posso','Posso accompagna entrare.'],['Scrivi l’infinito in «Voglio disegnare».','disegnare','Disegnare è l’infinito retto da voglio.']],[['Seleziona il verbo servile.',['Noi','possiamo','iniziare','la','prova.'],[1],'Possiamo accompagna iniziare.'],['Seleziona l’infinito.',['Lia','deve','verificare','la','misura.'],[2],'Verificare dipende dal servile deve.']]],
['parole','Verbi · Verbi impersonali',[
['In «Nevica da ore», il verbo è usato…','impersonalmente',['con il soggetto noi','come passivo'],'Nevica indica un fenomeno atmosferico senza soggetto espresso.'],
['In «Bisogna attendere», bisogna esprime…','necessità impersonale',['un soggetto determinato','possesso'],'Bisogna esprime una necessità senza indicare una persona specifica.'],
['In «Si lavora in silenzio», la costruzione è…','impersonale',['riflessiva diretta con soggetto espresso','passiva con oggetto espresso'],'Si lavora attribuisce l’azione a persone non specificate.'],
['Quale frase usa piovere in senso figurato con un soggetto?','Sono piovuti applausi.',['Piove da ore.','Nevica in montagna.'],'Applausi è il soggetto di sono piovuti.'],
['Quale frase esprime una necessità impersonale?','Occorre controllare.',['Noor controlla.','Noi controlliamo.'],'Occorre non indica una persona specifica.'],
['In «Si dice che la mostra aprirà», si dice è…','costruzione impersonale',['pronome riflessivo di un soggetto espresso','verbo all’infinito'],'La costruzione non identifica chi compie il dire.'],
['In «Albeggia», il verbo indica…','un fenomeno atmosferico o naturale',['un oggetto diretto','un ordine a voi'],'Albeggia è usato impersonalmente per l’arrivo dell’alba.'],
['Quale frase contiene un soggetto espresso?','Arrivano i campioni.',['Piove.','Si lavora.'],'I campioni è il soggetto espresso di arrivano.']
],[['Completa con «piove» o «piovono»: «Oggi ___».','piove','Piove indica qui un fenomeno atmosferico.'],['Completa con «bisogna» o «bisognano»: «___ controllare».','bisogna','Bisogna è usato impersonalmente.'],['Completa con «si» o «ci»: «In biblioteca ___ studia».','si','Si studia è una costruzione impersonale.']],[['Seleziona il verbo impersonale.',['Oggi','nevica','in','montagna.'],[1],'Nevica è un verbo atmosferico impersonale.'],['Seleziona la costruzione impersonale.',['In','biblioteca','si','studia','in','silenzio.'],[2,3],'Si studia non indica un soggetto determinato.']]]
];
for(const [area,group,choices,ex,ts] of groups){for(const x of choices)choice(area,group,...x);for(const x of ex)exact(area,group,...x);for(const x of ts)tokens(area,group,...x)}
window.ATELIER_NEW_BASI_RINFORZO=items;
})();
