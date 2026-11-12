(() => {
'use strict';
const bank=[];let serial=0;const position={3:0,4:0};
function choice(area,group,prompt,correct,wrong,feedback,level=1){const options=[...wrong],answer=(position[options.length+1]++%(options.length+1));options.splice(answer,0,correct);bank.push({id:'nx'+String(++serial).padStart(3,'0'),area,topicGroup:group,topic:group,level,pei:false,kind:'choice',title:'Osserva, collega, prova',prompt,options,answer,solution:correct,feedback,minutes:2})}
function exact(area,group,prompt,answers,feedback,level=2){bank.push({id:'nx'+String(++serial).padStart(3,'0'),area,topicGroup:group,topic:group,level,pei:false,kind:'exact',title:'Una trasformazione alla volta',prompt,answers,solution:answers[0],feedback,minutes:2})}
function trio(area,group,rows){for(const r of rows)choice(area,group,...r)}
trio('parole','Suoni e sillabe',[
 ['Qual è la divisione in sillabe di «tavolo»?','ta-vo-lo',['tav-olo','t-a-vo-lo'],'Ogni sillaba comprende un nucleo vocalico. Tavolo ha tre sillabe.'],
 ['In quale parola le vocali indicate formano uno iato?','poeta: o-e',['piede: ie','fiore: io'],'Poeta si divide po-e-ta: le vocali o ed e appartengono a sillabe diverse.'],
 ['Quale coppia di lettere costituisce un digramma in «gnomo»?','gn',['no','mo'],'Gn rappresenta un solo suono consonantico. Non si divide fra due sillabe.']
]);
exact('parole','Suoni e sillabe','Dividi «stoffa» in sillabe usando soltanto il trattino.',['stof-fa'],'Le consonanti doppie si dividono: stof-fa.');
trio('parole','Punteggiatura',[
 ['Quale frase usa correttamente la virgola?','Dopo la prova, gli allievi riposano.',['Gli allievi, riposano dopo la prova.','Gli allievi riposano, dopo, la prova.'],'La virgola può separare l’elemento iniziale; non separa il soggetto dal suo predicato.'],
 ['Quale segno introduce un elenco annunciato da «Occorrono questi strumenti»?','due punti',['punto interrogativo','apostrofo'],'I due punti possono introdurre un elenco annunciato.'],
 ['Quale frase presenta correttamente un inciso?','Luca, il mio compagno, suona il violino.',['Luca il mio, compagno suona il violino.','Luca, il mio compagno suona, il violino.'],'Le due virgole delimitano l’inciso il mio compagno.']
]);
exact('parole','Punteggiatura','Sostituisci la virgola errata con i due punti e riscrivi: «Porto due strumenti, matita e righello.»',['Porto due strumenti: matita e righello.','Porto due strumenti: matita e righello'],'L’elenco esplicita quali sono i due strumenti.');
trio('parole','Formazione delle parole',[
 ['Quale parola deriva da «fiore» mediante un suffisso?','fioraio',['fiore','prato'],'Fioraio deriva dalla base fior- e dal suffisso -aio.'],
 ['In «rileggere», quale elemento aggiunge il significato di ripetizione?','il prefisso ri-',['il suffisso -ere','la lettera g'],'Il prefisso ri- indica qui che si legge di nuovo.'],
 ['Quale parola è composta?','portapenne',['penna','pennino'],'Portapenne unisce due elementi lessicali: porta e penne.']
]);
exact('parole','Formazione delle parole','Aggiungi il prefisso «ri-» al verbo «scrivere».',['riscrivere'],'Riscrivere significa, in questo contesto, scrivere di nuovo.');
trio('parole','Significato e registro',[
 ['Nella frase «Il tessuto è soffice», quale sinonimo è più adatto?','morbido',['rigido','ruvido'],'Morbido conserva il significato di soffice in questo contesto.'],
 ['Quale parola ha significato opposto a «preciso»?','impreciso',['accurato','esatto'],'Il prefisso im- forma qui il contrario di preciso.'],
 ['Quale richiesta è più adatta a una mail formale alla segreteria?','Potreste indicarmi l’orario di apertura?',['Ehi, quando aprite?','Oh, ditemi quando aprite!'],'Il condizionale e la formulazione cortese sono adatti al registro formale.']
]);
exact('parole','Significato e registro','Sostituisci soltanto «rapido» con il suo contrario «lento»: «Il movimento è rapido.»',['Il movimento è lento.','Il movimento è lento'],'Il contrario modifica il significato dell’aggettivo senza cambiare la struttura.');
trio('parole','Interiezioni',[
 ['Quale parola è un’interiezione in «Oh, che bel suono!»?','Oh',['che','suono'],'Oh esprime una reazione del parlante.'],
 ['Quale espressione richiama direttamente l’attenzione?','Ehi!',['Dunque','Mentre'],'Ehi è un’interiezione usata per richiamare qualcuno.'],
 ['In «Ahimè, ho dimenticato il quaderno», che cosa esprime «Ahimè»?','dispiacere',['possesso','un rapporto di luogo'],'Ahimè manifesta dispiacere; non collega elementi della frase.']
]);
trio('frase','Complemento partitivo',[
 ['In «Due degli allievi sono assenti», che funzione ha «degli allievi»?','complemento partitivo',['complemento oggetto','complemento di termine'],'Indica l’insieme di cui due costituiscono una parte.'],
 ['Quale frase contiene un complemento partitivo?','Alcuni fra noi suonano.',['Il quaderno di Sara è qui.','Scrivo a Sara.'],'Fra noi indica l’insieme dal quale si considera una parte.'],
 ['In «Il più alto dei tre entra», quale gruppo è partitivo?','dei tre',['il più alto','entra'],'Il confronto riguarda il gruppo dei tre.']
]);
trio('frase','Compagnia e unione',[
 ['In «Esco con Amir», «con Amir» indica…','compagnia',['mezzo','causa'],'Amir è la persona insieme alla quale il soggetto esce.'],
 ['In «Esco con lo zaino», «con lo zaino» indica…','unione',['compagnia','termine'],'Lo zaino è una cosa portata con sé, non un compagno animato.'],
 ['Quale gruppo indica compagnia?','con mia sorella, in «Studio con mia sorella»',['con le forbici, in «Taglio con le forbici»','con cura, in «Lavoro con cura»'],'Il significato e il rapporto con il verbo distinguono compagnia, mezzo e modo.']
]);
trio('frase','Materia e qualità',[
 ['In «Una cornice di legno», che cosa indica «di legno»?','materia',['specificazione di possesso','termine'],'Indica la sostanza di cui la cornice è fatta.'],
 ['In «Un ragazzo di grande pazienza», che cosa indica «di grande pazienza»?','qualità',['materia','mezzo'],'Il gruppo esprime una caratteristica della persona.'],
 ['Quale gruppo esprime la materia di un oggetto?','in acciaio, in «Una lama in acciaio»',['di Luca, in «La lama di Luca»','a Luca, in «Consegno la lama a Luca»'],'L’acciaio è il materiale; gli altri gruppi esprimono rapporti diversi.']
]);
trio('frase','Denominazione e argomento',[
 ['In «La città di Cremona», «di Cremona» indica…','denominazione',['causa','termine'],'Cremona è il nome proprio della città.'],
 ['In «Parliamo di musica», «di musica» indica…','argomento',['denominazione','causa efficiente'],'La musica è il tema del parlare.'],
 ['Quale frase contiene un complemento di argomento?','Discutiamo del progetto.',['La copertina del progetto è blu.','Consegno il progetto al docente.'],'Del progetto indica ciò di cui si discute.']
]);
trio('frase','Limitazione e paragone',[
 ['In «È abile nel disegno», «nel disegno» indica…','limitazione',['luogo','tempo'],'L’abilità viene circoscritta all’ambito del disegno.'],
 ['In «Il pino è più alto del melo», «del melo» è…','secondo termine di paragone',['complemento di causa','complemento di termine'],'Il melo è il secondo elemento del confronto.'],
 ['Quale gruppo limita il giudizio a un ambito?','in matematica, in «È preparata in matematica»',['in cortile, in «Aspetta in cortile»','in primavera, in «Fiorisce in primavera»'],'L’ambito del giudizio distingue la limitazione dal luogo e dal tempo.']
]);
trio('frase','Complementi di misura',[
 ['In «Il tavolo pesa venti chili», «venti chili» indica…','peso',['prezzo','età'],'La quantità misura il peso del tavolo.'],
 ['In «L’abito costa cinquanta euro», «cinquanta euro» indica…','prezzo',['distanza','estensione'],'Il gruppo esprime il costo dell’abito.'],
 ['In «Un’allieva di quindici anni», «di quindici anni» indica…','età',['tempo continuato dell’azione','mezzo'],'Si precisa l’età della persona.']
]);
trio('frase','Predicativi del soggetto e dell’oggetto',[
 ['In «Marta sembra stanca», «stanca» è…','predicativo del soggetto',['complemento oggetto','apposizione'],'L’aggettivo completa il verbo copulativo sembra e si riferisce a Marta.'],
 ['In «Considero Luca affidabile», «affidabile» è…','predicativo dell’oggetto',['predicativo del soggetto','complemento di modo'],'L’aggettivo si riferisce all’oggetto Luca e completa considero.'],
 ['In «Gli allievi hanno eletto Sara rappresentante», «rappresentante» si riferisce a…','Sara, complemento oggetto',['gli allievi, soggetto','hanno, ausiliare'],'Rappresentante è il predicativo dell’oggetto Sara.']
]);
trio('parole','Articolo',[
 ['Quale articolo indeterminativo completa «Ho trovato ___ ago sul tavolo»?','un',['uno','un’'],'Ago è maschile e comincia per vocale: si usa un, senza apostrofo.',2],
 ['Quale forma completa «La sarta cerca ___ stoffa resistente» se intende una quantità imprecisata?','della',['dello','degli'],'Della è un articolo partitivo femminile singolare; qui significa un po’ di.',2],
 ['In quale frase «degli» è un articolo partitivo?','Degli allievi preparano il modello.',['Il banco degli allievi è pulito.','Parlo degli allievi.'],'Qui degli significa alcuni; nelle altre frasi introduce un complemento.',3],
 ['Quale gruppo è scritto correttamente?','un’interessante proposta',['un interessante proposta','un’interessante progetto'],'Proposta è femminile: una si elide davanti a interessante.',2],
 ['Quale forma completa «___ strumenti dello scaffale sono accordati»?','Gli',['I','Le'],'Strumenti è maschile plurale e comincia per s seguita da consonante.',2],
 ['In «Il legno del violino è stagionato», quale parola è articolo determinativo semplice?','Il',['del','di'],'Il precede legno; del è formato da di più il.',2],
 ['Quale articolo completa «Osserva ___ xilofono esposto»?','lo',['il','l’'],'Davanti a x iniziale si usa lo: lo xilofono.',2],
 ['Quale frase contiene un articolo usato per indicare una categoria nel suo insieme?','Il violino è uno strumento ad arco.',['Ho lasciato il violino nella custodia.','Ho riparato un violino ieri.'],'Il violino indica qui la categoria degli strumenti chiamati violino.',3],
 ['Quale trasformazione mantiene il valore indefinito di «Una sarta entra»?','Alcune sarte entrano.',['Le sarte entrano.','La sarta entra.'],'Alcune esprime una quantità indefinita al plurale.',3],
 ['Quale coppia completa «___ zaino è vicino a ___ scaffale»?','lo; uno',['il; uno','lo; un'],'Davanti a z e a s più consonante si usano rispettivamente lo e uno.',2]
]);
trio('parole','Aggettivo',[
 ['In «Questa stoffa è più resistente di quella», il grado di «resistente» è…','comparativo di maggioranza',['superlativo assoluto','comparativo di uguaglianza'],'Più resistente di stabilisce una maggioranza nel confronto.',2],
 ['In «Il mobile è molto elegante», «molto elegante» è…','superlativo assoluto',['comparativo di maggioranza','superlativo relativo'],'Molto intensifica la qualità senza confrontarla con un gruppo.',2],
 ['In «Sara è la più veloce della squadra», il gruppo «della squadra» indica…','il gruppo entro cui si stabilisce il confronto',['la causa della velocità','il destinatario della squadra'],'Il superlativo relativo esprime il grado massimo all’interno di un gruppo.',3],
 ['Quale frase contiene un aggettivo dimostrativo?','Questa stoffa è morbida.',['Questa è morbida.','La stoffa è molto morbida.'],'Questa accompagna il nome stoffa; usato da solo può essere pronome.',2],
 ['Quale forma concorda con «le superfici»?','levigate',['levigato','levigati'],'Superfici è femminile plurale: anche l’aggettivo è femminile plurale.',1]
]);
trio('parole','Pronomi',[
 ['In «Ho visto Marta e le ho parlato», «le» sostituisce…','a Marta',['Marta come complemento oggetto','la parola parlato'],'Parlare a qualcuno richiede il complemento di termine: le significa a lei.',3],
 ['In «Il violino che ascolti è antico», «che» è…','pronome relativo con funzione di oggetto',['congiunzione causale','aggettivo dimostrativo'],'Che sostituisce il violino ed è oggetto di ascolti.',3],
 ['In «Questi sono pronti», «questi» è…','pronome dimostrativo',['aggettivo dimostrativo','articolo determinativo'],'Questi sostituisce un nome sottinteso e non lo accompagna.',2],
 ['Quale frase usa un pronome possessivo?','La mia cartella è rossa; la tua è blu.',['La tua cartella è blu.','La cartella è blu.'],'La tua sostituisce la tua cartella nella seconda parte.',2],
 ['In «Chi ha chiuso la finestra?», «chi» è…','pronome interrogativo',['pronome relativo','congiunzione subordinante'],'Chi introduce una domanda e indica una persona da identificare.',2]
]);
trio('parole','Congiunzioni',[
 ['In «La prova è finita, ma il lavoro continua», «ma» introduce…','un’opposizione',['una causa','un fine'],'Ma collega le due proposizioni mettendole in contrasto.',2],
 ['Quale congiunzione introduce una causa in «Resto perché devo finire»?','perché',['devo','finire'],'Perché introduce la ragione per cui il soggetto resta.',2],
 ['In «Se il colore asciuga, possiamo verniciare», «se» introduce…','una condizione',['una conclusione','una conseguenza'],'La subordinata indica la condizione posta per verniciare.',3],
 ['Quale frase contiene una congiunzione coordinante?','Taglio il tessuto e preparo il modello.',['Quando taglio il tessuto, preparo il modello.','Preparo il modello perché serve.'],'E collega due proposizioni sullo stesso piano.',3]
]);
window.ATELIER_LEARNING_EXTRA=bank;
})();
