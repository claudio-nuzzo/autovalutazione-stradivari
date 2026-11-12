(() => {
'use strict';
const bank=[];
function choice(group,level,prompt,solution,wrong,feedback){const options=[solution,...wrong],answer=bank.length%options.length;options.splice(answer,0,options.shift());bank.push({id:`gr-rari-${String(bank.length+1).padStart(3,'0')}`,area:'periodo',topicGroup:group,topic:group,level,pei:false,kind:'choice',title:'Interpreta il periodo',prompt,options,answer,solution,feedback,minutes:3});}
function exact(group,prompt,answers,feedback){bank.push({id:`gr-rari-${String(bank.length+1).padStart(3,'0')}`,area:'periodo',topicGroup:group,topic:group,level:2,pei:false,kind:'exact',title:'Completa il collegamento',prompt,answers,solution:answers[0],feedback,minutes:2});}
function tokens(group,prompt,words,answer,feedback){bank.push({id:`gr-rari-${String(bank.length+1).padStart(3,'0')}`,area:'periodo',topicGroup:group,topic:group,level:3,pei:false,kind:'tokens',title:'Seleziona il segmento',prompt,tokens:words,answer,solution:answer.map(i=>words[i]).join(' '),feedback,minutes:3});}
const data=[
['Esplicite e implicite',[
[2,'In «Prima di tagliare, misura», la subordinata è…','implicita',['esplicita','coordinata'],'Tagliare è all’infinito, un modo indefinito.'],
[2,'In «Quando il campione arriva, iniziamo», la subordinata è…','esplicita',['implicita','un gruppo nominale'],'Arriva è un verbo di modo finito.'],
[3,'Quale subordinata contiene un gerundio composto?','avendo controllato',['Quando avremo controllato.','Prima che controlliamo.'],'Avendo controllato è gerundio passato, formato dal gerundio dell’ausiliare e dal participio.'],
[3,'Quale riscrittura conserva il rapporto temporale di «Dopo aver misurato, taglio»?','Dopo che ho misurato, taglio.',['Prima che misuri, taglio.','Sebbene abbia misurato, taglio.'],'Dopo che ho misurato rende esplicita l’anteriorità della misurazione.']
],['Completa con «dopo»: «___ aver misurato, taglio».',['dopo'],'Dopo aver misurato è una subordinata temporale implicita.'],['Seleziona la subordinata implicita.',['Prima','di','uscire,','spegni','la','luce.'],[0,1,2],'Prima di uscire contiene l’infinito uscire.']],
['Subordinate e gradi',[
[2,'In «Credo che Lea arrivi», che grado ha la subordinata rispetto a credo?','primo',['secondo','terzo'],'La subordinata dipende direttamente dalla principale.'],
[3,'In «Credo che Lea sappia dove lavorerà», che grado ha «dove lavorerà» rispetto a credo?','secondo',['primo','terzo'],'Dove lavorerà dipende da sappia, a sua volta dipendente da credo.'],
[3,'In «So che Lara pensa che Amir abbia telefonato», da quale proposizione dipende «che Amir abbia telefonato»?','che Lara pensa',['so direttamente','abbia telefonato'],'Il contenuto pensato è espresso dalla subordinata che dipende da pensa.'],
[3,'In «Spero che il corso inizi e che tutti partecipino», il grado delle due dipendenti rispetto a spero è…','primo per entrambe',['primo e secondo','secondo per entrambe'],'Le due completive sono coordinate e dipendono entrambe da spero.']
],['Completa con «che»: «Penso ___ il progetto sia pronto».',['che'],'Che introduce la completiva retta da penso.'],['Seleziona la subordinata che dipende direttamente da «spero».',['Spero','che','il','corso','inizi.'],[1,2,3,4],'Che il corso inizi dipende direttamente da spero.']],
['Modali',[
[2,'In «Disponi i fogli come ti ho mostrato», la subordinata indica…','il modo di disporre i fogli',['il luogo della dimostrazione','la ragione della carta'],'Come ti ho mostrato precisa il modo dell’azione.'],
[3,'Quale frase contiene una subordinata modale?','Si è comportata come le avevano suggerito.',['Mi chiedo come si sia comportata.','La persona che parla è gentile.'],'La subordinata precisa in che modo si è comportata.'],
[3,'In «Come mi hai chiesto, dispongo i campioni», il legame esprime…','conformità alla richiesta',['una condizione irreale','una domanda senza risposta'],'Come mi hai chiesto indica la maniera conforme alla richiesta.'],
[3,'Quale frase usa «come» per introdurre una domanda indiretta?','Non so come sistemare il banco.',['Sistema il banco come ti ho mostrato.','Sistema il banco come faccio io.'],'Non so introduce una domanda sul modo di sistemare.']
],['Completa con «come»: «Disponi le sedie ___ ti ho mostrato».',['come'],'Come introduce il modo indicato nella frase.'],['Seleziona tutte le parole della subordinata modale.',['Riponi','i','fogli','come','ti','ho','mostrato.'],[3,4,5,6],'Come ti ho mostrato precisa il modo di riporre i fogli.']],
['Strumentali',[
[2,'In «Ha fissato il tessuto usando gli spilli», la subordinata esprime…','il mezzo impiegato',['il tempo trascorso','una concessione'],'Usando gli spilli indica il mezzo per fissare il tessuto.'],
[3,'Quale frase contiene una strumentale implicita?','Ho risolto il problema confrontando le misure.',['Ho risolto il problema perché era urgente.','Ho risolto il problema quando sei arrivata.'],'Confrontando le misure indica il mezzo utilizzato.'],
[3,'In «Riduciamo lo spreco riutilizzando i ritagli», quale azione permette di ridurre lo spreco?','riutilizzare i ritagli',['sprecare i ritagli','aumentare la quantità di tessuto'],'La subordinata al gerundio indica il mezzo.'],
[3,'Quale rapporto esprime «mediante il confronto delle misure» in «Abbiamo verificato il risultato mediante il confronto delle misure»?','mezzo espresso da un gruppo nominale',['subordinata con verbo finito','subordinata con gerundio'],'Il gruppo indica il mezzo, ma non contiene un predicato e non è una proposizione.']
],['Completa con il gerundio indicato: «Ho verificato il dato ___ le due misure» (confrontare).',['confrontando'],'Confrontando esprime il mezzo impiegato per la verifica.'],['Seleziona la subordinata che indica il mezzo.',['Riduciamo','gli','scarti','riutilizzando','i','ritagli.'],[3,4,5],'Riutilizzando i ritagli indica il mezzo con cui si riducono gli scarti.']],
['Limitative',[
[2,'In «Per quanto ne so, la mostra è aperta», la subordinata…','limita l’affermazione alle conoscenze di chi parla',['indica lo scopo della mostra','esprime una causa'],'La precisazione circoscrive la validità di ciò che viene detto.'],
[3,'Quale periodo contiene una limitativa?','Per quello che ricordo, il corso inizia lunedì.',['Poiché ricordo la data, te la comunico.','Quando ricordo la data, te la comunico.'],'Per quello che ricordo delimita l’affermazione ai ricordi del parlante.'],
[3,'In «Che io sappia, il banco è libero», la subordinata indica…','un limite di conoscenza',['una conseguenza','una destinazione'],'Che io sappia equivale a per quanto io sappia.'],
[3,'Quale analisi descrive «quanto a precisione» in «Quanto a precisione, il progetto è notevole»?','gruppo di limitazione senza verbo',['proposizione con verbo finito','proposizione con verbo all’infinito'],'Quanto a precisione circoscrive il giudizio, ma non contiene un predicato.']
],['Completa con «sappia»: «Per quanto io ___, il banco è libero».',['sappia'],'Che io sappia limita l’affermazione a ciò che è noto al parlante.'],['Seleziona la proposizione che limita la conoscenza.',['Per','quanto','ne','so,','il','corso','inizia','lunedì.'],[0,1,2,3],'Per quanto ne so indica il limite delle conoscenze di chi parla.']],
['Eccettuative',[
[2,'In «Usciremo, a meno che non piova», la subordinata indica…','un’eccezione alla previsione di uscire',['lo scopo dell’uscita','una conseguenza dell’uscita'],'La pioggia costituirebbe il caso che impedisce l’uscita.'],
[3,'Quale periodo presenta un’eccezione?','Accetto il preventivo, salvo che il prezzo aumenti.',['Accetto il preventivo perché il prezzo è basso.','Accetto il preventivo per risparmiare.'],'Salvo che il prezzo aumenti introduce il caso escluso.'],
[3,'In «Non posso fare altro che aspettare», che cosa esprime «che aspettare»?','l’unica azione non esclusa',['il motivo dell’attesa','il momento dell’attesa'],'Che aspettare esprime l’eccezione rispetto all’impossibilità di fare altro.'],
[3,'Quale frase mantiene il valore di «Partiremo, salvo che non ci siano ritardi»?','Partiremo, a meno che non ci siano ritardi.',['Partiremo perché ci sono ritardi.','Partiremo affinché ci siano ritardi.'],'Salvo che non e a meno che non introducono qui una circostanza che impedirebbe la partenza.']
],['Completa con «meno»: «Partiremo, a ___ che non piova».',['meno'],'A meno che non introduce un’eventualità che farebbe eccezione.'],['Seleziona tutte le parole della subordinata eccettuativa.',['Partiremo,','a','meno','che','non','piova.'],[1,2,3,4,5],'A meno che non piova introduce il caso che impedirebbe la partenza.']],
['Esclusive',[
[2,'In «È uscita senza salutare», la subordinata esprime…','un’azione esclusa',['un’azione necessaria','il luogo dell’uscita'],'Senza salutare indica che l’uscita avviene senza il saluto.'],
[3,'Quale frase contiene una esclusiva esplicita?','È uscita senza che nessuno se ne accorgesse.',['È uscita senza salutare.','È uscita per salutare.'],'Senza che nessuno se ne accorgesse ha un verbo finito al congiuntivo.'],
[3,'In «Ha concluso il lavoro senza chiedere aiuto», chi non ha chiesto aiuto?','la persona che ha concluso il lavoro',['necessariamente un’altra persona','il lavoro stesso'],'Il soggetto dell’infinito è ricavabile dal soggetto della reggente.'],
[3,'Quale trasformazione conserva il significato di «Luca entra senza farsi notare»?','Luca entra senza che gli altri lo notino.',['Luca entra perché gli altri lo notino.','Luca entra affinché gli altri lo notino.'],'Senza che gli altri lo notino mantiene l’azione esclusa, rendendola esplicita.']
],['Completa con «senza»: «Luca è uscito ___ salutare».',['senza'],'Senza salutare indica l’azione esclusa.'],['Seleziona tutte le parole della subordinata esclusiva.',['Lia','è','uscita','senza','chiedere','aiuto.'],[3,4,5],'Senza chiedere aiuto è una subordinata esclusiva implicita.']],
['Dichiarative',[
[2,'In «Ho una certezza: che il progetto riuscirà», la subordinata esplicita…','il contenuto della certezza',['il luogo del progetto','il momento della certezza'],'Che il progetto riuscirà chiarisce il contenuto del nome certezza.'],
[3,'Quale frase contiene una dichiarativa che precisa un nome?','Avevo il timore che il tessuto si rovinasse.',['Temevo che il tessuto si rovinasse.','Il tessuto che ho scelto si è rovinato.'],'La subordinata precisa il contenuto del nome timore.'],
[3,'In «Ti chiedo questo: che tu controlli la misura», la dichiarativa precisa…','il pronome questo',['il nome misura','il verbo controlli'],'Che tu controlli la misura esplicita il contenuto di questo.'],
[3,'Quale distinzione è corretta?','In «So che arrivi» la dipendente completa il verbo; in «Ho la certezza che arrivi» precisa un nome.',['Entrambe sono relative perché iniziano con che.','In entrambe che è soggetto della subordinata.'],'La funzione dipende dalla costruzione: oggettiva nel primo caso, dichiarativa nel secondo.']
],['Completa con «che»: «Ho una certezza: ___ il lavoro riuscirà».',['che'],'Che introduce il contenuto della certezza.'],['Seleziona la subordinata che precisa il contenuto del nome «speranza».',['Ho','una','speranza:','che','il','corso','inizierà.'],[3,4,5,6],'Che il corso inizierà esplicita il contenuto della speranza.']],
['Comparative',[
[2,'In «Il mobile è meno pesante di quanto pensassi», la subordinata introduce…','il termine del confronto',['lo scopo del mobile','il luogo del mobile'],'Il peso effettivo è confrontato con quello previsto.'],
[3,'Quale periodo contiene una comparativa?','La prova è stata più lunga di quanto immaginassi.',['La prova è terminata quando sei arrivata.','La prova è stata annullata perché pioveva.'],'Di quanto immaginassi introduce il secondo termine del confronto.'],
[3,'In «Il lavoro è più semplice di quanto avevamo previsto», il rapporto è…','di confronto con la previsione',['di causa della misura','di condizione irreale'],'Di quanto avevamo previsto confronta il risultato con la previsione.'],
[3,'Quale confronto è contenuto in «Il tessuto costa più di quanto sperassi»?','prezzo effettivo e prezzo sperato',['peso e lunghezza','tempo e luogo'],'Il prezzo effettivo supera quello sperato.']
],['Completa con «quanto»: «Il pannello pesa meno di ___ pensassi».',['quanto'],'Di quanto pensassi introduce il termine di confronto.'],['Seleziona la subordinata comparativa.',['Il','mobile','pesa','meno','di','quanto','pensassi.'],[4,5,6],'Di quanto pensassi è il secondo termine del confronto.']],
['Discorso diretto e indiretto',[
[2,'Quale frase riporta indirettamente «Lia dice: “Il modello è pronto”»?','Lia dice che il modello è pronto.',['Lia dice: «Il modello è pronto».','Lia: «Il modello è pronto?».'],'La proposizione introdotta da che riferisce il contenuto senza riportarlo come citazione diretta.'],
[3,'Quale frase riporta indirettamente «Luca disse: “Partirò domani”»?','Luca disse che sarebbe partito il giorno seguente.',['Luca disse: «Partirò domani».','Luca disse che parti ieri.'],'Nel discorso indiretto dipendente da un passato si può usare il condizionale passato per il futuro nel passato.'],
[3,'Quale frase riporta indirettamente «Marta chiese: “Dove hai riposto il righello?”»?','Marta chiese dove avessi riposto il righello.',['Marta chiese: «Dove hai riposto il righello?».','Marta chiese perché il righello era blu.'],'Dove introduce un’interrogativa indiretta che conserva la domanda sul luogo.'],
[3,'Quale modifica può essere necessaria quando si riferisce una frase pronunciata ieri?','Adeguare espressioni come domani al nuovo momento del racconto.',['Lasciare ogni riferimento temporale identico in ogni contesto.','Eliminare sempre il verbo della frase riferita.'],'Il riferimento temporale dipende dal momento in cui si racconta e può richiedere un adattamento.']
],['Completa con «che»: «Lia dice ___ il modello è pronto».',['che'],'Che introduce il contenuto riferito in forma indiretta.'],['Seleziona le parole che riportano la domanda indiretta.',['Marta','chiede','dove','sia','il','righello.'],[2,3,4,5],'Dove sia il righello è una domanda indiretta dipendente da chiede.']]
];
for(const [group,cs,e,t] of data){for(const row of cs)choice(group,...row);exact(group,...e);tokens(group,...t)}
window.ATELIER_NEW_GRUPPI_RARI=bank;
})();
