(() => {
'use strict';
const data=[
{g:'Ortografia',c:[
['Quale frase distingue correttamente verbo e congiunzione?','Il tavolo è largo e stabile.',['Il tavolo e largo è stabile.','Il tavolo è largo è stabile.'],'È è verbo; e collega i due aggettivi.'],
['Quale grafia della domanda con qual è corretta?','qual è',['qual’è','qualé'],'Qual è non richiede apostrofo.'],
['Quale frase usa correttamente «ha»?','Ada ha una scatola.',['Ada ha scuola arriva.','Ada ha volte disegna.'],'Ha è una forma di avere; a scuola e a volte si scrivono senza h.'],
['Quale grafia della quantità di colla è corretta?','un po’ di colla',['un pò di colla','un po di colla'],'Po’ è una forma troncata con apostrofo.'],
['Quale frase usa correttamente l’accento?','Lì troverai il metro.',['Li troverai il metro.','Lì troverai li metro.'],'Lì è avverbio di luogo accentato.'],
['Quale frase contiene la grafia corretta?','Ho scelto un’opera originale.',['Ho scelto un opera originale.','Ho scelto un’oggetto originale.'],'Opera è femminile; una si elide davanti alla vocale.']
],e:[['Scrivi «è» con l’accento: Il modello ___ pronto.',['è'],'È è una forma del verbo essere.'],['Scrivi «hanno» con la h: Le allieve ___ finito.',['hanno'],'Hanno è una forma del verbo avere.']],t:[['Seleziona la forma del verbo avere.',['Lia','ha','un','ago','.'],[1],'Ha è verbo avere; a sarebbe una preposizione.'],['Seleziona la parola che indica un luogo.',['Metti','lì','il','foglio','.'],[1],'Lì è un avverbio di luogo.']]},
{g:'Articolo',c:[
['In «Ho trovato degli spilli», degli è…','articolo partitivo',['preposizione articolata di specificazione','pronome'],'Degli indica una quantità non precisata di spilli.'],
['In «La testa degli spilli è colorata», degli è…','preposizione articolata',['articolo partitivo','congiunzione'],'Degli unisce di e gli e introduce una specificazione.'],
['Quale gruppo contiene un articolo determinativo?','lo scaffale',['lo vedo','molto alto'],'Lo accompagna il nome scaffale.'],
['Quale forma completa «___ orologio è fermo»?','l’',['il','la'],'Davanti a vocale il determinativo singolare si elide.'],
['In «Il verde è intenso», verde è…','un aggettivo usato come nome',['un articolo','un verbo'],'L’articolo introduce verde come nome di colore.'],
['Quale frase usa un articolo indeterminativo davanti a un nome maschile?','Un esperto controlla la misura.',['Un’esperta controlla la misura.','Le esperte controllano la misura.'],'Un è la forma maschile senza apostrofo.']
],e:[['Inserisci «uno»: ___ pneumatico è nuovo.',['uno'],'Davanti a pn si usa uno.'],['Inserisci «le»: ___ assi sono sottili.',['le'],'Assi è femminile plurale nel contesto: le assi.']],t:[['Seleziona gli articoli che introducono classe e campione.',['La','classe','osserva','un','campione','.'],[0,3],'La e un introducono i rispettivi nomi.'],['Seleziona il solo articolo, non il pronome.',['Lo','scatolone','è','pesante','e','Lea','lo','sposta','.'],[0],'Il primo lo introduce scatolone; il secondo lo sostituisce.']]},
{g:'Nome',c:[
['Quale parola è il nome del gruppo «le nuove mensole»?','mensole',['nuove','le'],'Mensole è il nucleo nominale del gruppo.'],
['In quale frase «il bello» è un nome sostantivato?','Il bello di questo progetto è la semplicità.',['Il progetto bello è finito.','Il progetto è bello.'],'Il bello indica un aspetto positivo ed è usato come nome.'],
['Quale nome indica un insieme di foglie?','fogliame',['foglia','ramo'],'Fogliame indica un insieme di foglie.'],
['Quale coppia contiene nomi di genere comune?','il testimone; la testimone',['il fratello; la sorella','il sarto; la sarta'],'Testimone conserva la forma e cambia l’articolo.'],
['Quale plurale indica le fortificazioni cittadine?','le mura',['i muri della stanza','le mure'],'Le mura indica qui una cinta difensiva.'],
['Quale parola è un nome derivato?','giornalaio',['giornale','giorno'],'Giornalaio deriva dalla base di giornale.']
],e:[['Scrivi il plurale di «provincia»: due ___.',['province'],'Provincia forma il plurale province.'],['Scrivi il plurale di «farmacia»: due ___.',['farmacie'],'La i tonica si conserva nel plurale farmacie.']],t:[['Seleziona il nome che indica un insieme di navi.',['La','flotta','entra','nel','porto','.'],[1],'Flotta indica un insieme di navi.'],['Seleziona i nomi comuni della persona e dell’oggetto.',['Il','falegname','misura','la','tavola','.'],[1,4],'Falegname e tavola sono nomi comuni.']]},
{g:'Aggettivo',c:[
['In «Questa stoffa è morbida», quale parola accompagna direttamente il nome stoffa?','questa',['è','morbida come attributo diretto'],'Questa è un dimostrativo che accompagna stoffa; morbida è parte del predicato.'],
['In «La mia squadra è pronta», mia è…','aggettivo possessivo',['pronome relativo','avverbio'],'Mia accompagna squadra e indica possesso o relazione.'],
['Quale forma esprime il superlativo assoluto?','molto preciso',['più preciso di Luca','il più preciso del gruppo'],'Molto preciso intensifica la qualità senza confronto esplicito.'],
['In «Luca è meno rapido di Lia», meno rapido è…','comparativo di minoranza',['superlativo relativo','comparativo di maggioranza'],'Meno introduce un confronto di minoranza.'],
['Quale parola accompagna il nome in «quali progetti scegli»?','quali',['scegli','tu'],'Quali è aggettivo interrogativo riferito a progetti.'],
['Quale frase contiene un aggettivo indefinito?','Alcune allieve disegnano.',['Alcune disegnano.','Disegnano bene.'],'Alcune accompagna il nome allieve.']
],e:[['Completa con «uguali»: Le misure sono ___.',['uguali'],'Uguali concorda con misure al plurale.'],['Completa con «nostre»: Le ___ squadre sono pronte.',['nostre'],'Nostre concorda con squadre femminile plurale.']],t:[['Seleziona gli aggettivi riferiti a «cartelle».',['Queste','due','cartelle','rosse','sono','pronte','.'],[0,1,3],'Queste, due e rosse accompagnano cartelle.'],['Seleziona il possessivo che accompagna disegno.',['Il','vostro','disegno','è','chiaro','.'],[1],'Vostro accompagna disegno.']]},
{g:'Pronomi',c:[
['In «Nora osserva il bozzetto e lo corregge», lo riprende…','il bozzetto',['Nora','corregge'],'Lo sostituisce il bozzetto come oggetto diretto.'],
['In «Parlo a Marta e le rispondo», le significa…','a Marta',['Marta come oggetto diretto','di Marta'],'Le è pronome di termine riferito a Marta.'],
['In «La stoffa che scegli è leggera», che è…','pronome relativo oggetto',['congiunzione causale','soggetto di scegli'],'Scegli tu la stoffa: che riprende l’oggetto.'],
['Quale frase contiene un pronome dimostrativo?','Questo è adatto.',['Questo tessuto è adatto.','Il tessuto è adatto.'],'Questo sostituisce un nome ricavabile dal contesto.'],
['In «Ne preparo due», ne può indicare…','di quelli già menzionati',['necessariamente un luogo di arrivo','un articolo'],'Ne può riprendere l’insieme da cui si considerano due elementi.'],
['Quale frase contiene un pronome riflessivo?','Marta si pettina.',['Marta pettina Lea.','Marta è pettinata da Lea.'],'Si riprende il soggetto Marta.']
],e:[['Completa con «li»: I cartoni? Lea ___ sposta.',['li'],'Li riprende i cartoni come oggetto diretto.'],['Completa con «cui»: La persona a ___ telefono risponde.',['cui'],'A cui riprende la persona nella relativa.']],t:[['Seleziona il relativo che riprende mobile.',['Il','mobile','che','restauriamo','è','antico','.'],[2],'Che riprende mobile.'],['Seleziona il pronome che sostituisce il nome già citato.',['Il','foglio','è','pronto','e','lo','consegno','.'],[5],'Lo riprende il foglio.']]},
{g:'Avverbi',c:[
['In «L’allieva lavora lentamente», lentamente precisa…','il modo di lavorare',['il genere di allieva','il numero del nome'],'Lentamente modifica il verbo lavora.'],
['In «Il pezzo è molto fragile», molto modifica…','l’aggettivo fragile',['il nome pezzo','l’articolo il'],'Molto intensifica fragile.'],
['Quale parola indica dubbio in «Forse arriverà domani»?','forse',['domani','arriverà'],'Forse esprime incertezza.'],
['In «Dove hai messo il metro?», dove è…','avverbio interrogativo di luogo',['aggettivo possessivo','articolo'],'Dove introduce una domanda sul luogo.'],
['Quale frase usa «forte» come avverbio?','Parla forte.',['Ha una voce forte.','La voce è forte.'],'Forte modifica il verbo parla e resta invariabile.'],
['Quale gruppo funziona come locuzione avverbiale di tempo?','di tanto in tanto',['la parte interna','con il righello'],'Di tanto in tanto indica una frequenza.']
],e:[['Completa con «bene»: Marta lavora ___.',['bene'],'Bene precisa il modo dell’azione.'],['Completa con «presto»: La mostra aprirà ___.',['presto'],'Presto colloca l’apertura nel tempo.']],t:[['Seleziona l’avverbio di luogo.',['Il','metro','è','là','.'],[3],'Là indica il luogo.'],['Seleziona l’avverbio di dubbio.',['Forse','la','classe','uscirà','.'],[0],'Forse esprime possibilità.']]},
{g:'Preposizioni',c:[
['In «Il disegno di Luca», di introduce…','un gruppo collegato al nome disegno',['una congiunzione','un soggetto sottinteso'],'Di collega Luca al nome disegno.'],
['Da quali parole nasce «sulla»?','su + la',['su + il','da + la'],'Su e la formano sulla.'],
['In «La scatola sotto il tavolo», sotto è…','preposizione impropria',['verbo','pronome'],'Sotto introduce il gruppo il tavolo.'],
['Quale gruppo usa una locuzione prepositiva?','davanti alla scuola',['la scuola','scuola nuova'],'Davanti a introduce il gruppo nominale.'],
['Quale preposizione completa «dipendere ___ una decisione»?','da',['su','tra'],'Dipendere richiede qui la preposizione da.'],
['Quale frase contiene una preposizione articolata?','Il libro è nella borsa.',['Il libro è qui.','Il libro è aperto.'],'Nella unisce in e la.']
],e:[['Completa «in + il»: Il legno è ___ magazzino.',['nel'],'In più il dà nel.'],['Completa «a + le»: La guida parla ___ allieve.',['alle'],'A più le dà alle.']],t:[['Seleziona la preposizione che unisce su e il.',['La','matita','è','sul','banco','.'],[3],'Sul unisce su e il.'],['Seleziona le preposizioni che introducono partenza e destinazione.',['Lia','parte','da','Roma','per','Milano','.'],[2,4],'Da e per sono preposizioni semplici.']]},
{g:'Congiunzioni',c:[
['In «Leggo e scrivo», e collega…','due proposizioni coordinate',['un nome e il suo articolo','una sillaba e una lettera'],'E collega due proposizioni sullo stesso piano.'],
['Quale congiunzione introduce un contrasto?','ma',['oppure','infatti'],'Ma esprime opposizione.'],
['In «Esco se smette», se introduce…','una condizione',['una domanda indiretta','un paragone'],'L’uscita dipende dalla condizione.'],
['In «Non so se smette», se introduce…','una domanda indiretta',['una condizione per uscire','un agente'],'La frase riferisce il dubbio se smetta o no.'],
['In «Benché piova, esco», benché introduce…','una concessione',['un fine','una conseguenza'],'Benché presenta un ostacolo che non impedisce l’uscita.'],
['Quale frase contiene che come congiunzione?','Credo che Nora arrivi.',['La persona che arriva saluta.','La persona che vedo sorride.'],'Che introduce il contenuto di credo senza riprendere un nome.']
],e:[['Completa con «ma»: È tardi, ___ continuiamo.',['ma'],'Ma introduce il contrasto.'],['Completa con «oppure»: Usi seta ___ lino?',['oppure'],'Oppure introduce un’alternativa.']],t:[['Seleziona le congiunzioni.',['Nora','scrive','e','Lia','legge','ma','Paolo','disegna','.'],[2,5],'E e ma collegano proposizioni.'],['Seleziona la congiunzione causale.',['Resto','perché','piove','.'],[1],'Perché introduce la causa.']]}
];
const bank=[];function add(g,kind,prompt,props,feedback,level){bank.push({id:`par-cont-${String(bank.length+1).padStart(3,'0')}`,area:'parole',topicGroup:g,topic:g,level,pei:false,kind,title:kind==='choice'?'Ragiona nel contesto':kind==='tokens'?'Seleziona nel testo':'Completa',prompt,...props,feedback,minutes:2})}
for(const t of data){for(const [i,[prompt,correct,wrong,feedback]] of t.c.entries()){const options=[correct,...wrong],answer=bank.length%options.length;options.splice(answer,0,options.shift());add(t.g,'choice',prompt,{options,answer,solution:correct},feedback,i===2&&t.g==='Pronomi'?3:2)}for(const [prompt,answers,feedback] of t.e)add(t.g,'exact',prompt,{answers,solution:answers[0]},feedback,1);for(const [prompt,tokens,answer,feedback] of t.t)add(t.g,'tokens',prompt,{tokens,answer,solution:answer.map(i=>tokens[i]).join(' · ')},feedback,2)}
window.ATELIER_NEW_PAROLE_CONTESTO=bank;
})();
