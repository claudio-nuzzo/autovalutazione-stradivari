(() => {
'use strict';
const items = [];
function scelta(gruppo, livello, domanda, corretta, alternative, spiegazione) {
  const options = [corretta, ...alternative];
  items.push({id:`esp-periodo-${String(items.length+1).padStart(3,'0')}`,area:'periodo',topicGroup:gruppo,topic:gruppo,level:livello,pei:false,kind:'choice',title:'Analizza il periodo',prompt:domanda,options,answer:0,solution:corretta,feedback:spiegazione,minutes:2});
}
function completa(gruppo, livello, domanda, risposte, spiegazione) {
  items.push({id:`esp-periodo-${String(items.length+1).padStart(3,'0')}`,area:'periodo',topicGroup:gruppo,topic:gruppo,level:livello,pei:false,kind:'exact',title:'Completa la frase',prompt:domanda,answers:risposte,solution:risposte[0],feedback:spiegazione,minutes:2});
}
const dati = [
['Principale e proposizioni',1,'In «Quando suona la campana, gli allievi escono», qual è la principale?','gli allievi escono',['quando suona la campana','la campana'],'La principale regge la subordinata temporale iniziale.'],
['Principale e proposizioni',2,'Quante proposizioni contiene «Marta sceglie il tessuto e prepara il modello»?','due',['una','tre'],'Sceglie e prepara sono due predicati verbali.'],
['Principale e proposizioni',3,'In «Se il legno è asciutto, iniziamo il lavoro», quale proposizione regge la condizionale?','iniziamo il lavoro',['se il legno è asciutto','il legno è asciutto'],'La condizionale dipende dalla proposizione principale: iniziamo il lavoro.'],
['Coordinate',1,'In «Disegno il modello e taglio la stoffa», quale legame unisce le due proposizioni?','coordinazione copulativa',['subordinazione causale','coordinazione avversativa'],'La congiunzione e collega due azioni sullo stesso piano.'],
['Coordinate',2,'In «Il progetto è pronto, ma manca la firma», «ma manca la firma» è una coordinata…','avversativa',['copulativa','causale'],'Ma introduce un contrasto rispetto alla proposizione precedente.'],
['Coordinate',3,'In «Non solo disegna il mobile, ma ne costruisce il prototipo», il rapporto fra le due proposizioni è…','coordinazione correlativa',['subordinazione finale','coordinazione conclusiva'],'La coppia non solo… ma anche, qui con anche sottinteso, collega le due proposizioni.'],
['Subordinate e gradi',1,'In «Credo che il corso inizi», «che il corso inizi» dipende da…','credo',['il corso','inizi'],'Credo regge la proposizione che ne completa il significato.'],
['Subordinate e gradi',3,'In «So che Marta spera che tu arrivi», qual è il grado di «che tu arrivi» rispetto alla principale?','secondo grado',['primo grado','terzo grado'],'Dipende da spera, che è già subordinata alla principale so.'],
['Esplicite e implicite',1,'In «Prima di uscire, chiudi il laboratorio», la subordinata è…','implicita',['esplicita','principale'],'Uscire è un infinito, quindi un modo indefinito.'],
['Esplicite e implicite',2,'Quale subordinata è esplicita?','quando il laboratorio apre',['aprendo il laboratorio','dopo aver aperto il laboratorio'],'Apre è all’indicativo; aprendo e aver aperto sono forme indefinite.'],
['Causali',1,'In «Resto in aula perché piove», la subordinata esprime…','la causa',['il fine','una conseguenza'],'Perché piove spiega il motivo per cui resto.'],
['Causali',2,'Quale periodo contiene una causale implicita?','Essendo stanca, Lea si riposa.',['Per riposare, Lea si siede.','Sebbene sia stanca, Lea lavora.'],'Essendo stanca indica la causa ed è al gerundio.'],
['Finali',1,'In «Studiamo affinché il progetto riesca», la subordinata indica…','lo scopo',['la causa','il tempo'],'Affinché introduce il risultato perseguito attraverso l’azione di studiare.'],
['Finali',2,'Quale frase contiene una finale implicita?','Marta esercita la mano per tracciare linee precise.',['Marta trema per aver lavorato troppo.','Marta traccia linee mentre parla.'],'Per tracciare indica lo scopo ed è all’infinito.'],
['Temporali',1,'In «Appena il tessuto arriva, iniziamo il taglio», la subordinata indica…','il momento dell’inizio',['lo scopo del taglio','la causa dell’arrivo'],'Appena il tessuto arriva colloca nel tempo l’inizio del taglio.'],
['Temporali',2,'In «Dopo aver misurato la parete, scegliamo il mobile», la misura avviene…','prima della scelta',['dopo la scelta','nello stesso momento per forza'],'Dopo aver misurato indica un’azione anteriore alla scelta.'],
['Relative',1,'In «La sedia che abbiamo restaurato è antica», «che abbiamo restaurato» si riferisce a…','la sedia',['abbiamo','antica'],'Che riprende sedia e introduce una relativa.'],
['Relative',3,'In «La stoffa di cui parli è morbida», quale funzione svolge «di cui» nella relativa?','complemento richiesto da parlare',['soggetto','complemento oggetto diretto'],'Parlare di qualcosa richiede qui la preposizione di; cui riprende stoffa.'],
['Completive',2,'In «Mi sembra che il colore sia troppo scuro», la subordinata è…','soggettiva',['oggettiva','finale'],'La proposizione che il colore sia troppo scuro svolge la funzione di soggetto di sembra.'],
['Completive',2,'In «Credo che il disegno sia pronto», la subordinata è…','oggettiva',['relativa','temporale'],'Che il disegno sia pronto completa il significato del verbo credo.'],
['Dichiarative',2,'In «Ho una certezza: che il modello funzionerà», la subordinata precisa…','il contenuto della certezza',['il momento della certezza','la causa del funzionamento'],'La dichiarativa esplicita il contenuto del nome certezza.'],
['Interrogative indirette',2,'In «Non so se la colla sia asciutta», la subordinata è…','interrogativa indiretta',['condizionale','concessiva'],'Esprime una domanda dipendente: la colla è asciutta oppure no?'],
['Consecutive',1,'In «La colla era così forte che il pezzo resistette», la subordinata indica…','una conseguenza',['una condizione','una causa'],'Così… che collega l’intensità della proprietà al suo effetto.'],
['Concessive',2,'In «Sebbene sia tardi, finiamo il lavoro», la subordinata esprime…','una circostanza che non impedisce il lavoro',['lo scopo del lavoro','la conseguenza del lavoro'],'Sebbene introduce un fatto che potrebbe ostacolare, ma non impedisce, l’azione principale.'],
['Condizionali e periodo ipotetico',2,'In «Se il legno fosse pronto, inizieremmo», quale parte esprime la condizione?','se il legno fosse pronto',['inizieremmo','il legno'],'La protasi formula la condizione dalla quale dipende l’apodosi.'],
['Comparative',2,'In «La prova è andata meglio di quanto pensassimo», la subordinata esprime…','un confronto',['una causa','una finalità'],'Di quanto pensassimo è il secondo termine del confronto.'],
['Modali',2,'In «Sistema i materiali come ti ho mostrato», la subordinata indica…','il modo di sistemare',['la ragione della scelta','il tempo necessario'],'Come ti ho mostrato specifica il modo dell’azione.'],
['Strumentali',2,'In «Ha risolto il problema usando un modello», la subordinata indica…','il mezzo usato',['un ostacolo','una condizione'],'Usando un modello descrive il mezzo impiegato per risolvere il problema.'],
['Limitative',2,'In «Per quanto ne so, il corso comincia lunedì», la subordinata delimita…','l’ambito di validità di ciò che si afferma',['lo scopo del corso','la durata del corso'],'Per quanto ne so limita l’affermazione alle conoscenze di chi parla.'],
['Eccettuative',2,'In «Partiremo, a meno che non piova», la subordinata indica…','un’eccezione alla previsione',['una conseguenza','un paragone'],'A meno che non piova introduce il caso che esclude la partenza.'],
['Esclusive',2,'In «Ha finito senza chiedere aiuto», la subordinata indica…','una circostanza esclusa',['un fine','un confronto'],'Senza chiedere aiuto esclude il ricorso all’aiuto.'],
['Discorso diretto e indiretto',2,'Quale frase riporta in forma indiretta «Lia disse: “Tornerò domani”»?','Lia disse che sarebbe tornata il giorno seguente.',['Lia disse: “Tornerò domani”.','Lia disse che torno domani.'],'Nel passaggio al discorso indiretto il futuro può diventare condizionale passato e domani il giorno seguente.']
];
for (const row of dati) scelta(...row);
completa('Finali',2,'Completa con una congiunzione finale: «Ripassiamo ___ la prova riesca bene».',['affinché','perché'],'Affinché e perché, qui seguiti dal congiuntivo, possono introdurre uno scopo.');
completa('Concessive',2,'Completa con «sebbene»: «___ piova, il corso si svolge».',['sebbene'],'Sebbene introduce la circostanza che non impedisce lo svolgimento.');
completa('Temporali',2,'Completa usando «quando»: «___ il collante sarà asciutto, monteremo i pezzi».',['quando'],'Quando introduce il momento in cui monteremo i pezzi.');

const approfondimento = [
['Subordinate e gradi',3,'In «Penso che Lia dica che il progetto funziona», che grado ha «che il progetto funziona» rispetto a penso?','secondo',['primo','terzo'],'La proposizione dipende da dica, subordinata di primo grado a penso.'],
['Subordinate e gradi',3,'In «So che hai telefonato perché avevi bisogno di aiuto», sapendo che il bisogno è il motivo della telefonata, da quale verbo dipende «perché avevi bisogno di aiuto»?','hai telefonato',['so','avevi'],'La causale spiega il motivo della telefonata e dipende da hai telefonato.'],
['Coordinate',3,'In «Lavoro perché il tempo è poco e perché la consegna è vicina», che rapporto lega «perché la consegna è vicina» a «perché il tempo è poco»?','coordinazione fra due subordinate causali',['coordinazione alla principale','subordinazione relativa'],'La seconda causale è coordinata alla prima tramite e.'],
['Causali',3,'In «Poiché il legno era umido, non l’abbiamo usato», quale trasformazione mantiene il rapporto causale?','Non l’abbiamo usato perché il legno era umido.',['Non l’abbiamo usato affinché il legno fosse umido.','Non l’abbiamo usato se il legno era umido.'],'Poiché e perché introducono qui il motivo della scelta.'],
['Finali',3,'In «Abbiamo coperto il mobile perché non si rovinasse», la subordinata indica…','lo scopo',['la causa già avvenuta','una domanda indiretta'],'Perché non si rovinasse esprime il risultato che si vuole evitare.'],
['Finali',3,'Quale subordinata implicita mantiene il senso di «Lia studia affinché lei stessa migliori»?','per migliorare',['pur migliorando','dopo aver migliorato'],'Per migliorare esprime lo scopo; il soggetto è lo stesso di studia.'],
['Temporali',3,'In «Mentre Giada disegna, Marco prepara i materiali», le due azioni sono presentate come…','contemporanee',['la seconda necessariamente anteriore','la prima necessariamente successiva'],'Mentre mette le due azioni in rapporto di contemporaneità.'],
['Temporali',3,'In «Quando avrai finito, chiamami», il completamento è rispetto alla chiamata…','anteriore',['necessariamente successivo','privo di rapporto temporale'],'Il futuro anteriore avrai finito presenta il completamento prima della chiamata.'],
['Relative',3,'In «Conosco la ragazza a cui hai affidato il compito», quale elemento è ripreso da «cui»?','la ragazza',['il compito','conosco'],'Il pronome relativo cui riprende ragazza; a cui equivale qui ad a lei.'],
['Relative',3,'Quale frase contiene una relativa con valore di luogo riferita a un antecedente?','Questo è il laboratorio dove lavoro.',['Non so dove lavoro.','Lavoro dove capita.'],'Dove lavoro specifica il nome laboratorio.'],
['Completive',3,'In «È utile che tutti partecipino», che funzione svolge «che tutti partecipino»?','soggetto di è utile',['oggetto di tutti','complemento di fine'],'La subordinata soggettiva costituisce ciò che è utile.'],
['Completive',3,'In «Il docente desidera che gli allievi collaborino», la subordinata completa…','il significato del verbo desidera',['il nome docente come relativa','il verbo collaborino come soggetto'],'Il contenuto desiderato è espresso dalla subordinata oggettiva.'],
['Dichiarative',3,'In «Aveva una certezza: che il colore fosse adatto», la subordinata esplicita…','il contenuto della certezza',['la causa del colore','un confronto di colori'],'La proposizione chiarisce quale certezza avesse.'],
['Interrogative indirette',3,'In «Dimmi come hai risolto il problema», «come hai risolto il problema» è…','interrogativa indiretta',['modale dipendente da risolto','temporale'],'La richiesta riferisce una domanda sul modo: come hai risolto il problema?'],
['Consecutive',3,'In «Il mobile è troppo grande perché passi dalla porta», la subordinata indica…','una conseguenza impedita dal grado espresso da troppo',['lo scopo di rendere grande il mobile','la causa per cui è grande'],'La struttura troppo… perché presenta una conseguenza non realizzabile.'],
['Concessive',3,'Quale trasformazione mantiene il rapporto di «Pur essendo stanca, Lia continua»?','Sebbene sia stanca, Lia continua.',['Poiché è stanca, Lia continua.','Quando è stanca, Lia continua.'],'Pur con il gerundio e sebbene con il congiuntivo esprimono concessione.'],
['Condizionali e periodo ipotetico',3,'In «Se avessimo misurato bene, il pannello sarebbe entrato», si prospetta…','una condizione non realizzata nel passato',['una condizione certa nel presente','una domanda indiretta'],'Il trapassato congiuntivo e il condizionale passato esprimono l’irrealtà nel passato.'],
['Comparative',3,'In «Il prototipo pesa meno di quanto pensassi», si confrontano…','il peso effettivo e quello previsto',['il tempo e il prezzo','il peso e la lunghezza'],'Meno di quanto pensassi confronta il peso effettivo con l’aspettativa.'],
['Esclusive',3,'In «La classe è uscita senza che il docente se ne accorgesse», la subordinata è…','esclusiva esplicita',['esclusiva implicita','temporale implicita'],'Senza che introduce l’esclusione; accorgesse è congiuntivo, dunque la forma è esplicita.'],
['Eccettuative',3,'In «Accetterò il preventivo, a meno che il prezzo non aumenti», quale fatto potrebbe impedire l’accettazione?','l’aumento del prezzo',['il prezzo invariato','la ricezione del preventivo'],'A meno che introduce l’eventualità che costituisce un’eccezione.']
];
for (const row of approfondimento) scelta(...row);
completa('Causali',1,'Completa con «poiché»: «___ il laboratorio è chiuso, la lezione si svolge online».',['poiché'],'Poiché introduce la causa dello svolgimento online.');
completa('Finali',1,'Completa con «affinché»: «Controlla le misure ___ il mobile entri nello spazio».',['affinché'],'Affinché introduce lo scopo ed è seguito qui dal congiuntivo.');
completa('Concessive',1,'Completa con «sebbene»: «___ il tempo sia poco, controlliamo il risultato».',['sebbene'],'Sebbene introduce una concessione.');
completa('Temporali',1,'Completa con «mentre»: «___ Eva disegna, Luca misura».',['mentre'],'Mentre mette in relazione due azioni contemporanee.');
completa('Condizionali e periodo ipotetico',1,'Completa con «se»: «___ la prova fosse pronta, inizieremmo».',['se'],'Se introduce la condizione espressa dalla protasi.');
function cerca(gruppo,prompt,words,answer,feedback) {
 items.push({id:`esp-periodo-${String(items.length+1).padStart(3,'0')}`,area:'periodo',topicGroup:gruppo,topic:gruppo,level:3,pei:false,kind:'tokens',title:'Individua la subordinata',prompt,tokens:words,answer,solution:answer.map(i=>words[i]).join(' '),feedback,minutes:3});
}
cerca('Causali','Seleziona tutte e sole le parole della proposizione causale.',['Non','usiamo','il','pezzo','perché','presenta','una','crepa.'],[4,5,6,7],'La causale perché presenta una crepa spiega il motivo della scelta.');
cerca('Temporali','Seleziona tutte e sole le parole della subordinata temporale.',['Quando','il','corso','termina,','riordiniamo','il','banco.'],[0,1,2,3],'Quando il corso termina colloca nel tempo il riordino.');
cerca('Relative','Seleziona tutte e sole le parole della proposizione relativa.',['La','stoffa','che','abbiamo','scelto','è','morbida.'],[2,3,4],'Che abbiamo scelto si riferisce al nome stoffa.');
cerca('Finali','Seleziona tutte e sole le parole della subordinata finale.',['Misuriamo','la','parete','per','evitare','errori.'],[3,4,5],'Per evitare errori esprime lo scopo della misurazione.');
cerca('Concessive','Seleziona tutte e sole le parole della subordinata concessiva.',['Sebbene','sia','tardi,','controlliamo','la','cucitura.'],[0,1,2],'Sebbene sia tardi introduce un ostacolo che non impedisce il controllo.');
window.ATELIER_NEW_PERIODO = items;
})();
