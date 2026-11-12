(() => {
'use strict';
const topics = [
{g:'Articolo',c:[
['Per «___ zoccolo» quale articolo indeterminativo maschile è richiesto?','uno',['un','una'],'Davanti a z iniziale si usa uno.'],
['Quale determinativo accompagna «gnocchi»?','gli',['i','le'],'Davanti a gn iniziale il maschile plurale usa gli.'],
['In «il costo della seta», «della» è…','preposizione articolata',['articolo partitivo','pronome'],'Della seta precisa costo: della è di più la.'],
['In «abbiamo usato della seta», «della» è…','articolo partitivo',['preposizione articolata','congiunzione'],'Della seta indica una quantità non precisata usata.'],
['Quale gruppo relativo all’esposizione è scritto correttamente?','un’interessante esposizione',['un interessante esposizione','un’interessante quadro'],'Una si elide davanti all’aggettivo femminile interessante.'],
['In «L’oro è un metallo», quale articolo accompagna «oro» presentandolo come categoria generale?','L’',['un','metallo'],'L’oro indica qui la categoria del metallo.']
],e:[['Completa: ___ psicologo entra. Usa il determinativo maschile singolare.',['lo'],'Davanti a ps iniziale si usa lo.'],['Completa: ___ esami iniziano. Usa il determinativo maschile plurale.',['gli'],'Davanti a vocale il maschile plurale usa gli.']],t:[['Seleziona gli articoli semplici.',['La','classe','prepara','un','plastico','.'],[0,3],'La è determinativo; un è indeterminativo.'],['Seleziona il solo articolo partitivo.',['Acquistiamo','delle','perline','per','la','prova','.'],[1],'Delle indica una quantità indefinita; la è determinativo.']]},
{g:'Nome',c:[
['Quale nome designa un insieme di insetti?','sciame',['ape','miele'],'Sciame indica un insieme di insetti.'],
['Fra le parole proposte, quale denomina una qualità?','gentilezza',['banco','matita'],'Gentilezza nomina una qualità.'],
['Quale coppia contiene due nomi propri?','Luca; Parma',['ragazzo; Parma','Luca; città'],'Luca e Parma identificano una persona e un luogo.'],
['Quale nome unisce un verbo e un nome?','asciugamano',['mano','manina'],'Asciugamano unisce asciuga e mano.'],
['Quale plurale di «braccio» indica qui parti del corpo?','le braccia',['i bracci della gru','le braccie'],'Braccia è la forma usata normalmente per le parti del corpo.'],
['Quale parola è un falso alterato?','tacchino',['tacchetto','tacco'],'Tacchino non indica un piccolo tacco.']
],e:[['Scrivi il plurale di «freccia»: due ___.',['frecce'],'Freccia forma il plurale frecce, senza i grafica.'],['Scrivi il plurale di «ciliegia»: due ___.',['ciliegie'],'Ciliegia forma il plurale ciliegie, con i grafica.']],t:[['Seleziona i nomi comuni.',['La','sarta','prepara','il','cartamodello','.'],[1,4],'Sarta e cartamodello sono nomi comuni.'],['Seleziona i nomi propri della persona e della città.',['Nora','arriva','a','Bologna','domani','.'],[0,3],'Nora e Bologna identificano una persona e una città.']]},
{g:'Aggettivo',c:[
['Quale aggettivo concorda con «le cartelle»?','pesanti',['pesante','pesanto'],'Pesanti è plurale e concorda con cartelle.'],
['In «una soluzione migliore», migliore esprime…','comparativo di maggioranza',['superlativo assoluto','comparativo di minoranza'],'Migliore è una forma comparativa di buono.'],
['In «il più resistente del gruppo», il grado è…','superlativo relativo',['superlativo assoluto','comparativo di uguaglianza'],'Il confronto è delimitato dal gruppo.'],
['Quale espressione contiene un possessivo che accompagna il nome?','la nostra squadra',['la nostra','noi'],'Nostra accompagna squadra.'],
['In «lo stesso campione», stesso è…','aggettivo identificativo',['pronome personale','avverbio'],'Stesso accompagna campione e indica identità.'],
['Quale aggettivo è composto?','agrodolce',['dolce','dolcissimo'],'Agrodolce unisce due elementi lessicali.']
],e:[['Completa con il femminile plurale di «preciso»: le misure sono ___.',['precise'],'Precise concorda con misure.'],['Completa con il comparativo irregolare di buono: Questo risultato è ___ del precedente.',['migliore'],'Migliore è il comparativo di buono.']],t:[['Seleziona gli aggettivi che accompagnano il nome.',['Queste','due','lunghe','tavole','sono','pronte','.'],[0,1,2],'Queste, due e lunghe accompagnano tavole.'],['Seleziona l’aggettivo possessivo.',['Il','nostro','gruppo','ascolta','.'],[1],'Nostro accompagna il nome gruppo.']]},
{g:'Pronomi',c:[
['In «Vedo Marta e la saluto», la riprende…','Marta',['saluto','vedo'],'La sostituisce Marta come oggetto.'],
['In «Scrivo a Paolo e gli rispondo», gli significa…','a Paolo',['Paolo come oggetto diretto','di Paolo'],'Gli indica il destinatario della risposta.'],
['In «Le sedie che arrivano», che è…','pronome relativo soggetto di arrivano',['articolo','congiunzione causale'],'Che riprende sedie e svolge funzione di soggetto.'],
['In «Il foglio che leggo», che è…','pronome relativo oggetto di leggo',['soggetto di leggo','preposizione'],'Che riprende foglio ed è oggetto del verbo leggo.'],
['Quale frase indica una persona indefinita senza accompagnare un nome?','Qualcuno telefona.',['Qualche allievo telefona.','Ogni allievo telefona.'],'Qualcuno indica una persona senza accompagnare un nome.'],
['Quale frase usa il possessivo al posto di un nome?','Il tuo è pronto.',['Il tuo disegno è pronto.','Disegni bene.'],'Il tuo sostituisce un nome ricavabile dal contesto.']
],e:[['Completa con «lo»: «Il tavolo? Nora ___ misura».',['lo'],'Lo sostituisce il tavolo come oggetto.'],['Completa con «ci»: «In laboratorio? Sì, ___ andiamo».',['ci'],'Ci riprende il luogo già citato.']],t:[['Seleziona il pronome relativo.',['La','borsa','che','cerco','è','blu','.'],[2],'Che riprende borsa e introduce la relativa.'],['Seleziona il pronome personale oggetto.',['Il','foglio','è','pronto:','lo','firmo','.'],[4],'Lo sostituisce il foglio.']]},
{g:'Avverbi',c:[
['In «La lampada brilla intensamente», l’avverbio indica…','modo',['luogo','possesso'],'Intensamente descrive il modo del brillare.'],
['Quale avverbio indica un luogo?','laggiù',['ieri','poco'],'Laggiù colloca nello spazio.'],
['Quale avverbio indica incertezza?','probabilmente',['certamente','mai'],'Probabilmente presenta il fatto come probabile.'],
['In «molto morbido», molto modifica…','l’aggettivo morbido',['un nome espresso','una preposizione'],'Molto intensifica morbido.'],
['Quale frase contiene un avverbio interrogativo di luogo?','Dove appoggi il metro?',['Quale metro appoggi?','Quanti metri occorrono?'],'Dove domanda il luogo.'],
['Quale forma è un avverbio alterato?','benino',['bene','benissimo'],'Benino aggiunge una sfumatura moderata; benissimo è superlativo.']
],e:[['Completa con «domani»: «Oggi preparo il pezzo; ___ lo monto».',['domani'],'Domani indica il giorno successivo.'],['Completa con «qui»: «Vieni ___ vicino a me».',['qui'],'Qui indica il luogo vicino a chi parla.']],t:[['Seleziona l’avverbio di tempo.',['Presto','il','laboratorio','aprirà','.'],[0],'Presto colloca l’apertura nel tempo.'],['Seleziona la parola che precisa come Marta spiega.',['Marta','spiega','chiaramente','il','procedimento','.'],[2],'Chiaramente precisa come Marta spiega.']]},
{g:'Preposizioni',c:[
['Quale elemento è una preposizione semplice?','fra',['fino','perché'],'Fra è una preposizione semplice.'],
['La forma «alla» deriva da…','a + la',['a + il','da + la'],'Alla unisce a e la.'],
['Quale forma deriva da «in + gli»?','negli',['dagli','sugli'],'In più gli dà negli.'],
['In «Il foglio sotto il libro», sotto è…','preposizione impropria',['articolo','verbo'],'Sotto introduce il gruppo il libro.'],
['Quale gruppo contiene una locuzione che introduce un nome?','vicino alla finestra',['la finestra vicina','la finestra'],'Vicino a introduce il gruppo nominale.'],
['Quale preposizione completa la costruzione «partecipare ___ una gara»?','a',['da','su'],'La costruzione è partecipare a qualcosa.']
],e:[['Completa «su + la»: il disegno è ___ parete.',['sulla'],'Su più la forma sulla.'],['Completa «da + gli»: il disegno è stato creato ___ allievi.',['dagli'],'Da più gli forma dagli.']],t:[['Seleziona le preposizioni semplici.',['Il','filo','di','seta','arriva','da','Lia','.'],[2,5],'Di e da sono preposizioni semplici.'],['Seleziona la preposizione articolata.',['La','giacca','è','nella','scatola','.'],[3],'Nella unisce in e la.']]},
{g:'Congiunzioni',c:[
['Quale congiunzione presenta un’alternativa?','oppure',['infatti','benché'],'Oppure presenta possibilità alternative.'],
['In «Esco, ma torno presto», ma indica…','contrasto',['causa','fine'],'Ma coordina mettendo in contrasto.'],
['In «Studio perché desidero capire», perché introduce…','causa',['condizione','luogo'],'La subordinata esprime il motivo dello studio.'],
['In «Esco se smette di piovere», se introduce…','condizione',['domanda diretta','agente'],'Il fatto di uscire dipende dalla condizione.'],
['In «Non so se arriverà», se introduce…','interrogativa indiretta',['condizionale','conclusiva'],'La domanda dipende dal verbo non so.'],
['Quale coppia è correlativa?','sia… sia',['perché… perché','quando… ieri'],'Sia… sia collega elementi mediante due termini correlati.']
],e:[['Completa con «ma»: «Il cassetto è stretto, ___ capiente».',['ma'],'Ma mette in contrasto le due qualità.'],['Completa con «oppure»: «Preferisci seta ___ cotone?».',['oppure'],'Oppure presenta un’alternativa.']],t:[['Seleziona le congiunzioni coordinanti.',['La','classe','disegna','e','misura','ma','non','taglia','.'],[3,5],'E e ma collegano elementi sullo stesso piano.'],['Seleziona la parola che collega la permanenza alla sua causa.',['Resto','perché','piove','.'],[1],'Perché introduce qui una causa.']]},
{g:'Interiezioni',c:[
['Quale espressione richiama qualcuno?','Ehi!',['Ieri','Perché'],'Ehi è un richiamo.'],
['In «Uffa! Ho dimenticato il metro», uffa esprime…','fastidio',['possesso','un luogo'],'Uffa manifesta fastidio.'],
['In «Ahi! Mi sono punto», ahi esprime…','dolore',['tempo','confronto'],'Ahi manifesta dolore.'],
['In «Evviva! Il progetto è pronto», evviva esprime…','gioia',['materia','causa'],'Evviva manifesta gioia.'],
['Quale espressione è una locuzione interiettiva?','Mamma mia!',['mia mamma','la mamma'],'Mamma mia! è una reazione esclamativa composta.'],
['In quale frase «coraggio!» è un’esclamazione?','Coraggio! Riprova.',['Il coraggio aiuta.','Serve coraggio.'],'Coraggio! è usato autonomamente per incoraggiare.']
],e:[['Completa il richiamo con «ehi»: «___! Ti aspetto».',['ehi'],'Ehi richiama l’attenzione.'],['Completa la reazione con «ahi»: «___! Mi sono scottato».',['ahi'],'Ahi esprime dolore.']],t:[['Seleziona l’interiezione.',['Oh!','La','mostra','è','aperta','.'],[0],'Oh! esprime una reazione.'],['Seleziona l’espressione che incoraggia a riprovare.',['Forza!','Possiamo','riprovare','.'],[0],'Forza! incoraggia chi ascolta.']]},
{g:'Modi verbali',c:[
['Quale forma è un infinito presente?','scrivere',['scrivendo','scritto'],'Scrivere è l’infinito presente.'],
['Quale forma è un gerundio presente?','tagliando',['tagliare','tagliato'],'Tagliando è gerundio presente.'],
['In «Spero che tu riesca», riesca è…','congiuntivo presente',['indicativo imperfetto','condizionale passato'],'Riesca è una forma del congiuntivo presente.'],
['In «Se potessi, partirei», partirei è…','condizionale presente',['imperativo','congiuntivo presente'],'Partirei esprime qui la conseguenza ipotetica.'],
['Quale forma del verbo costruire è un participio passato?','costruito',['costruendo','costruire'],'Costruito è participio passato.'],
['In «Entrate con calma!», entrate è…','imperativo',['gerundio','infinito'],'Nel contesto è un invito rivolto a voi.']
],e:[['Completa con «studiando»: «Lina impara ___».',['studiando'],'Studiando è gerundio presente.'],['Scrivi l’infinito presente del verbo «abbiamo letto».',['leggere'],'Leggere è l’infinito presente del verbo.']],t:[['Seleziona la forma al congiuntivo.',['Spero','che','Marta','arrivi','presto','.'],[3],'Arrivi è congiuntivo presente nella subordinata.'],['Seleziona il gerundio.',['Lina','ascolta','prendendo','appunti','.'],[2],'Prendendo è gerundio presente.']]},
{g:'Tempi verbali',c:[
['In «Oggi misuro», misuro è all’indicativo…','presente',['imperfetto','futuro anteriore'],'Misuro è indicativo presente.'],
['In «Ieri ho misurato», ho misurato è…','passato prossimo',['imperfetto','futuro semplice'],'Ho misurato unisce ausiliare presente e participio.'],
['In «Da piccolo disegnavo spesso», disegnavo è…','imperfetto',['passato remoto','futuro anteriore'],'L’imperfetto presenta qui un’abitudine passata.'],
['In «Domani partirò», partirò è…','futuro semplice',['presente','trapassato prossimo'],'Partirò è futuro semplice.'],
['In «Quando arrivai, era già uscito», era uscito è…','trapassato prossimo',['passato prossimo','futuro semplice'],'Era uscito esprime un fatto precedente all’arrivo passato.'],
['In «Quando avrò finito, uscirò», avrò finito è…','futuro anteriore',['passato remoto','imperfetto'],'Avrò finito presenta un fatto completato prima dell’uscita futura.']
],e:[['Completa con «misurava»: «Ogni mattina, in passato, Luca ___ il tavolo».',['misurava'],'Misurava è imperfetto e presenta un’abitudine passata.'],['Completa con «partiremo»: «Domani noi ___».',['partiremo'],'Partiremo è futuro semplice.']],t:[['Seleziona l’intera forma al passato prossimo.',['Sara','ha','scelto','il','tessuto','.'],[1,2],'Ha scelto comprende ausiliare e participio.'],['Seleziona l’intera forma al trapassato prossimo.',['Lina','aveva','finito','prima','dell’arrivo','.'],[1,2],'Aveva finito comprende ausiliare e participio.']]}
];
const bank=[];
function push(group,kind,prompt,data,feedback,level){bank.push({id:`morf-pr-${String(bank.length+1).padStart(3,'0')}`,area:'parole',topicGroup:group,topic:group,level,pei:false,kind,title:kind==='tokens'?'Trova nel testo':kind==='exact'?'Completa':'Osserva e scegli',prompt,...data,feedback,minutes:2})}
const grades={Articolo:[2,2,3,3,2,2],Nome:[2,1,1,2,2,3],Aggettivo:[1,2,2,1,2,2],Pronomi:[2,2,3,3,2,2],Avverbi:[1,1,1,2,2,2],Preposizioni:[1,1,2,2,2,2],Congiunzioni:[1,1,2,2,3,2],Interiezioni:[1,1,1,1,2,2],'Modi verbali':[1,1,2,2,1,2],'Tempi verbali':[1,1,1,1,2,2]};
for(const x of topics){for(const [i,[prompt,correct,wrong,feedback]] of x.c.entries()){const options=[correct,...wrong],answer=bank.length%options.length;options.splice(answer,0,options.shift());push(x.g,'choice',prompt,{options,answer,solution:correct},feedback,grades[x.g][i])}for(const [prompt,answers,feedback] of x.e)push(x.g,'exact',prompt,{answers,solution:answers[0]},feedback,['Nome','Aggettivo'].includes(x.g)||prompt.includes('infinito')?2:1);for(const [prompt,tokens,answer,feedback] of x.t)push(x.g,'tokens',prompt,{tokens,answer,solution:answer.map(i=>tokens[i]).join(' · ')},feedback,2)}
window.ATELIER_NEW_MORFOLOGIA_PRATICA=bank;
})();
