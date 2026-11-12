(() => {
'use strict';
const bank=[];
function item(group,level,prompt,correct,wrong,feedback){const options=[correct,...wrong];const answer=bank.length%options.length;options.splice(answer,0,options.shift());bank.push({id:`vc-contesto-${String(bank.length+1).padStart(3,'0')}`,area:'parole',topicGroup:group,topic:group,level,pei:false,kind:'choice',title:'Il verbo nel contesto',prompt,options,answer,solution:correct,feedback,minutes:2});}
function exact(group,level,prompt,answers,feedback){bank.push({id:`vc-contesto-${String(bank.length+1).padStart(3,'0')}`,area:'parole',topicGroup:group,topic:group,level,pei:false,kind:'exact',title:'Completa il verbo',prompt,answers,solution:answers[0],feedback,minutes:2});}
const rows=[
['Modi verbali',1,'In «Spero che tu trovi il righello», trovi è al…','congiuntivo presente',['indicativo imperfetto','condizionale passato'],'Trovi è congiuntivo presente, seconda persona singolare, retto qui da spero che.'],
['Modi verbali',1,'In «Vorrei un campione più chiaro», vorrei è al…','condizionale presente',['indicativo futuro','congiuntivo presente'],'Vorrei è condizionale presente del verbo volere.'],
['Modi verbali',2,'In «Avendo finito il progetto, Lea esce», avendo finito è…','gerundio passato',['infinito presente','participio presente'],'Avendo finito è formato dal gerundio dell’ausiliare e dal participio.'],
['Modi verbali',2,'La docente ordina: «Chiudete il laboratorio!». Che cosa esprime qui chiudete?','un ordine rivolto a voi',['una possibilità passata','una domanda indiretta'],'Nel contesto esclamativo chiudete ha valore di imperativo.'],
['Modi verbali',2,'Quale forma è un participio passato?','costruito',['costruendo','costruire'],'Costruito è participio passato; costruendo è gerundio e costruire infinito.'],
['Modi verbali',3,'In «Se avessi più tempo, leggerei il manuale», avessi è al…','congiuntivo imperfetto',['indicativo trapassato','condizionale passato'],'Avessi è congiuntivo imperfetto; leggerei è condizionale presente.'],
['Tempi verbali',1,'In «Domani monteremo la mensola», monteremo è…','futuro semplice',['passato prossimo','imperfetto'],'Monteremo è futuro semplice, prima persona plurale.'],
['Tempi verbali',1,'In «Ieri Giada ha cucito la fodera», ha cucito è…','passato prossimo',['passato remoto','futuro anteriore'],'Ha è presente dell’ausiliare avere e cucito è participio passato.'],
['Tempi verbali',2,'In «Da bambina Sara disegnava spesso», disegnava presenta…','un’azione abituale nel passato',['un ordine','un’azione futura rispetto a oggi'],'L’imperfetto può descrivere abitudini passate.'],
['Tempi verbali',2,'In «Quando entrai, Luca aveva già spento la luce», quale azione viene prima?','Luca aveva spento la luce.',['Io entrai.','Le due azioni iniziano per forza insieme.'],'Il trapassato prossimo aveva spento colloca lo spegnimento prima dell’entrata.'],
['Tempi verbali',3,'In «Quando avrai finito, potremo uscire», il futuro anteriore presenta il completamento…','prima dell’uscita futura',['dopo l’uscita','come un ordine passato'],'Avrai finito indica un evento concluso prima di un altro evento futuro.'],
['Tempi verbali',3,'In «Pensavo che Lea fosse già partita», fosse partita è…','congiuntivo trapassato',['indicativo passato prossimo','condizionale presente'],'Fosse è congiuntivo imperfetto dell’ausiliare e partita è il participio passato.'],
['Verbi · Uso dei tempi',2,'Quale frase descrive un’abitudine passata?','Ogni estate visitavamo il laboratorio.',['Domani visiteremo il laboratorio.','Visita subito il laboratorio!'],'L’imperfetto visitavamo, con ogni estate, esprime un’abitudine passata.'],
['Verbi · Uso dei tempi',2,'Quale completamento colloca la preparazione prima della consegna passata? «Quando consegnai il lavoro, lo ___ già».','avevo terminato',['terminerò','termino'],'Il trapassato prossimo esprime un evento anteriore a consegnai.'],
['Verbi · Uso dei tempi',3,'Completa il periodo ipotetico dell’irrealtà nel passato: «Se avessi misurato, il pannello ___».','sarebbe entrato',['entra','entrerà'],'Il condizionale passato sarebbe entrato esprime la conseguenza non realizzata nel passato.'],
['Verbi · Uso dei tempi',3,'In «Disse che sarebbe tornata il giorno seguente», sarebbe tornata esprime…','un evento futuro rispetto a disse',['un’abitudine precedente a disse','un ordine diretto'],'Il condizionale passato può esprimere il futuro nel passato.'],
['Transitività',1,'In «La modellista taglia la stoffa», il verbo taglia è usato…','transitivamente con oggetto espresso',['come ausiliare','come verbo impersonale'],'La stoffa è l’oggetto diretto di taglia.'],
['Transitività',2,'In «Il liutaio lavora in silenzio», quale affermazione è corretta?','In questa frase non compare un oggetto diretto.',['In silenzio è oggetto diretto.','Il liutaio è oggetto diretto.'],'In silenzio indica il modo; il liutaio è il soggetto.'],
['Transitività',3,'Quale frase usa «correre» con un complemento oggetto?','L’atleta corre una maratona.',['L’atleta corre nel parco.','L’atleta corre velocemente.'],'Una maratona è oggetto interno che precisa il tipo di corsa; nel parco indica luogo.'],
['Transitività',2,'In «Giulia telefona a Samir», «a Samir» è…','complemento di termine',['complemento oggetto diretto','soggetto'],'Telefonare a qualcuno introduce qui il destinatario con la preposizione a.'],
['Verbi · Passivo',1,'Qual è il passivo di «Luca ripara la sedia»?','La sedia è riparata da Luca.',['Luca è riparato dalla sedia.','La sedia ripara Luca.'],'L’oggetto della frase attiva diventa soggetto della passiva.'],
['Verbi · Passivo',2,'In «La cornice è stata verniciata da Ada», chi compie l’azione?','Ada',['la cornice','la vernice'],'Da Ada è il complemento d’agente della frase passiva.'],
['Verbi · Passivo',2,'Quale forma è passiva?','Il mobile viene restaurato.',['Il mobile resta in aula.','Il mobile ha restaurato un tavolo.'],'Venire più participio passato può costruire il passivo nei tempi semplici.'],
['Verbi · Passivo',3,'Quale trasformazione conserva il tempo di «Le studentesse hanno progettato la sedia»?','La sedia è stata progettata dalle studentesse.',['La sedia era progettata dalle studentesse.','La sedia sarà progettata dalle studentesse.'],'Il passato prossimo attivo corrisponde qui al passato prossimo passivo è stata progettata.'],
['Verbi · Passivo',3,'Quale frase non ha un complemento d’agente espresso?','La porta è stata chiusa.',['La porta è stata chiusa da Rina.','La porta è stata chiusa dal custode.'],'Nella prima frase non è indicato chi ha compiuto l’azione.'],
['Verbi · Riflessivo',1,'In «Lia si pettina», chi riceve l’azione di pettinare?','Lia stessa',['un’altra persona certamente','nessuno'],'Lia compie l’azione su sé stessa: si ha valore riflessivo diretto.'],
['Verbi · Riflessivo',2,'In «Luca e Sara si salutano», quale interpretazione è naturale?','Luca saluta Sara e Sara saluta Luca.',['Ciascuno saluta soltanto sé stesso.','Nessuno saluta nessuno.'],'Si può indicare un’azione reciproca fra i due soggetti.'],
['Verbi · Riflessivo',3,'In «Lia si lava le mani», quale gruppo è oggetto diretto di lava?','le mani',['Lia','si come oggetto diretto'],'Le mani risponde a che cosa lava; si indica a sé stessa.'],
['Verbi · Riflessivo',2,'Quale frase contiene un’azione riflessiva?','Marta si veste.',['Marta veste la bambola.','La bambola veste Marta.'],'Si veste significa qui veste sé stessa.'],
['Verbi · Verbi servili',1,'In «Possiamo iniziare», quale verbo accompagna l’infinito?','possiamo',['iniziare','inizio'],'Possiamo è forma di potere e accompagna iniziare.'],
['Verbi · Verbi servili',2,'In «Devi controllare le misure», il verbo servile esprime…','necessità o obbligo',['possesso','un’azione già conclusa'],'Dovere aggiunge al verbo controllare un significato di necessità.'],
['Verbi · Verbi servili',2,'In «Voglio scegliere il tessuto», quale verbo è all’infinito?','scegliere',['voglio','tessuto'],'Voglio accompagna l’infinito scegliere.'],
['Verbi · Verbi servili',3,'In quale frase il verbo potere è usato senza un infinito dipendente?','In questa situazione posso poco.',['Posso entrare.','Potremo uscire.'],'Nella prima frase posso è usato autonomamente; nelle altre accompagna un infinito.'],
['Verbi · Verbi impersonali',1,'In «Piove da stamattina», piove è usato…','senza soggetto espresso',['con soggetto la pioggia','con soggetto noi'],'Il verbo atmosferico piove è usato in modo impersonale.'],
['Verbi · Verbi impersonali',2,'In «Bisogna attendere», bisogna esprime…','una necessità in forma impersonale',['un ordine con soggetto voi espresso','una domanda diretta'],'Bisogna è usato senza indicare una persona determinata.'],
['Verbi · Verbi impersonali',3,'In «Si lavora meglio con calma», si lavora è…','una costruzione impersonale',['un passivo con soggetto espresso','un riflessivo diretto con soggetto espresso'],'Si lavora indica un’azione attribuita a persone non specificate.'],
['Verbi · Verbi impersonali',3,'Quale frase usa il verbo atmosferico in senso figurato con un soggetto?','Sono piovute critiche.',['Piove da ore.','Nevica in montagna.'],'Critiche è il soggetto di sono piovute; piove e nevica sono impersonali nelle altre frasi.'],
['Ausiliari',2,'Quale frase usa essere come ausiliare?','La squadra è arrivata.',['La squadra è pronta.','La squadra è in aula.'],'È arrivata è un tempo composto di arrivare; nelle altre frasi è ha funzione autonoma o di copula.'],
['Ausiliari',2,'In «Abbiamo scelto il colore», abbiamo è…','ausiliare di scegliere',['participio passato','verbo servile'],'Abbiamo aiuta a formare il passato prossimo abbiamo scelto.'],
['Verbi · Uso dei tempi',3,'In «Se avessi ascoltato, sapresti già la risposta», il periodo collega…','una condizione passata a una conseguenza presente',['una condizione futura a una conseguenza passata','due ordini al presente'],'Il trapassato congiuntivo presenta la condizione passata; sapresti indica una conseguenza presente.']
];
for (const row of rows) item(...row);
exact('Tempi verbali',2,'Completa con la prima persona plurale del futuro semplice di finire: «Domani ___ il lavoro».',['finiremo'],'Finiremo è futuro semplice, prima persona plurale.');
exact('Tempi verbali',2,'Completa con la terza persona singolare dell’indicativo imperfetto di cucire: «Da piccola Sara ___ spesso».',['cuciva'],'Cuciva è indicativo imperfetto, terza persona singolare.');
exact('Modi verbali',2,'Completa con il gerundio presente di leggere: «___ le istruzioni, troverai la risposta».',['leggendo'],'Leggendo è il gerundio presente di leggere.');
exact('Modi verbali',2,'Completa con l’infinito presente di costruire: «Vogliamo ___ una mensola».',['costruire'],'Costruire è l’infinito presente che dipende da vogliamo.');
exact('Verbi · Verbi servili',2,'Completa con la prima persona singolare dell’indicativo presente di potere: «Oggi ___ partecipare».',['posso'],'Posso è la prima persona singolare dell’indicativo presente di potere.');
exact('Verbi · Verbi impersonali',2,'Completa con la terza persona singolare dell’indicativo presente di piovere: «Oggi ___».',['piove'],'Piove è una forma usata impersonalmente per un fenomeno atmosferico.');
exact('Verbi · Uso dei tempi',3,'Completa con il condizionale presente, prima persona singolare, di scegliere: «Se potessi, ___ il blu».',['sceglierei'],'Sceglierei accompagna qui il congiuntivo imperfetto potessi.');
exact('Ausiliari',2,'Completa con l’ausiliare appropriato: «Le ragazze ___ arrivate».',['sono'],'Con arrivare, in questa forma composta si usa essere: sono arrivate.');
exact('Verbi · Passivo',1,'Completa con «da»: «Il tavolo è stato dipinto ___ Lea».',['da'],'Da introduce qui il complemento d’agente Lea.');
exact('Transitività',1,'Completa con il pronome oggetto «la»: «La stoffa? Marta ___ taglia».',['la'],'La riprende la stoffa come complemento oggetto diretto.');
window.ATELIER_NEW_VERBI_CONTESTO=bank;
})();
