(() => {
'use strict';
const bank=[];
function base(g,l,k,p,f){return {id:`periodi-contesto-${String(bank.length+1).padStart(3,'0')}`,area:'periodo',topicGroup:g,topic:g,level:l,pei:false,kind:k,title:k==='tokens'?'Analizza il brano':k==='exact'?'Completa il collegamento':'Ragiona sul contesto',prompt:p,feedback:f,minutes:k==='tokens'?3:2}}
function c(g,l,p,a,w,f){const options=[a,...w],answer=bank.length%options.length;options.splice(answer,0,options.shift());bank.push({...base(g,l,'choice',p,f),options,answer,solution:a})}
function e(g,p,a,f){bank.push({...base(g,1,'exact',p,f),answers:a,solution:a[0]})}
function t(g,p,tokens,answer,f){bank.push({...base(g,2,'tokens',p,f),tokens,answer,solution:answer.map(i=>tokens[i]).join(' ')})}
function g(name,rows,x,y){for(const r of rows)c(name,...r);e(name,...x);t(name,...y)}
g('Coordinate',[
[2,'Nell’avviso «La mostra apre alle nove e la visita inizia alle dieci», quale rapporto unisce le proposizioni?','coordinazione copulativa',['subordinazione causale','subordinazione relativa'],'E collega due proposizioni sullo stesso piano.'],
[3,'In «Se arriva il corriere e la scatola è integra, apriamola», che rapporto lega «la scatola è integra» alla prima condizione?','coordinazione fra subordinate',['coordinazione alla principale','subordinazione relativa'],'Le due condizioni coordinate dipendono dalla reggente apriamola.'],
[3,'In «La colla asciuga, quindi possiamo procedere», quindi introduce…','una coordinata conclusiva',['una subordinata causale','una subordinata relativa'],'Quindi presenta una conclusione collegata alla precedente affermazione.']
],['Completa con «ma»: «Il pezzo è piccolo, ___ pesa molto».',['ma'],'Ma esprime il contrasto.'],['Seleziona la coordinata introdotta da «ma».',['Il','campione','sembra','asciutto,','ma','la','vernice','è','ancora','morbida.'],[4,5,6,7,8,9],'Ma la vernice è ancora morbida è coordinata alla prima proposizione.']);
g('Subordinate e gradi',[
[2,'In «Spero che la prova riesca», rispetto a spero la dipendente è di…','primo grado',['secondo grado','terzo grado'],'La dipendente è retta direttamente dalla principale.'],
[3,'In «Temo che la cliente pensi che il tessuto sia rigido», da quale verbo dipende l’ultima subordinata?','pensi',['temo direttamente','sia'],'Che il tessuto sia rigido completa pensi.'],
[3,'In «So che Ada spera che il treno arrivi», che grado ha «che il treno arrivi» rispetto a so?','secondo',['primo','terzo'],'La dipendente è retta da spera, che a sua volta dipende da so.']
],['Completa con «che»: «So ___ il corso inizia».',['che'],'Che il corso inizia dipende direttamente da so.'],['Seleziona la subordinata retta direttamente da «credo».',['Credo','che','il','laboratorio','apra','presto.'],[1,2,3,4,5],'Che il laboratorio apra presto è di primo grado.']);
g('Esplicite e implicite',[
[2,'In «Dopo aver pulito, Noor ripone i pennelli», la subordinata è…','implicita',['esplicita','principale'],'Aver pulito è un infinito passato.'],
[3,'Quale subordinata contiene un congiuntivo?','benché il colore sia asciutto',['pur essendo asciutto','dopo aver asciugato'],'Sia è congiuntivo e rende esplicita la subordinata.'],
[3,'Quale trasformazione esplicita conserva il significato di «Prima di uscire, chiudo» con soggetto io?','Prima che io esca, chiudo.',['Dopo che io esco, chiudo.','Chiudo affinché io esca.'],'Prima che io esca mantiene il rapporto temporale e il soggetto.']
],['Completa con «aver»: «Dopo ___ finito, consegno».',['aver'],'Aver finito è infinito passato.'],['Seleziona la subordinata implicita.',['Per','evitare','graffi,','copriamo','il','piano.'],[0,1,2],'Per evitare graffi usa l’infinito evitare.']);
g('Completive',[
[2,'In «È utile che la sala sia pronta», la dipendente è…','soggettiva',['temporale','relativa'],'La subordinata esprime ciò che è utile.'],
[3,'In «La cliente sostiene che il colore sia adatto», la dipendente completa…','il verbo sostiene',['il nome cliente come relativa','il verbo sia come soggetto'],'La proposizione esprime il contenuto sostenuto dalla cliente.'],
[3,'Quale frase contiene una soggettiva implicita?','È importante leggere il regolamento.',['Decido di leggere il regolamento.','Leggo il regolamento perché è breve.'],'Leggere il regolamento svolge funzione di soggetto di è importante.']
],['Completa con «che»: «È probabile ___ la spedizione arrivi».',['che'],'Che introduce la completiva soggettiva.'],['Seleziona la completiva oggettiva.',['La','classe','ritiene','che','la','prova','sia','utile.'],[3,4,5,6,7],'Che la prova sia utile completa ritiene.']);
g('Relative',[
[2,'In «Il pennello che uso è pulito», che riprende…','il pennello',['uso','pulito'],'Che è pronome relativo riferito a pennello.'],
[3,'In «La docente a cui scrivo risponde», a cui equivale a…','alla quale',['dalla quale','sulla quale'],'La preposizione a è richiesta dalla costruzione scrivere a qualcuno.'],
[3,'In «I campioni, che sono asciutti, verranno imballati», la relativa tra virgole è…','esplicativa',['restrittiva senza inciso','una causale introdotta da perché'],'La relativa aggiunge un’informazione al gruppo presentato come individuato.']
],['Completa con «cui»: «La scatola in ___ ripongo gli aghi è chiusa».',['cui'],'In cui riprende scatola.'],['Seleziona la proposizione relativa.',['La','sedia','che','abbiamo','riparato','è','pronta.'],[2,3,4],'Che abbiamo riparato precisa sedia.']);
g('Causali',[
[2,'In «Rimandiamo la prova perché manca il tessuto», la dipendente indica…','il motivo del rinvio',['lo scopo del tessuto','il luogo della prova'],'La mancanza del tessuto causa il rinvio.'],
[3,'Quale frase introduce una causa in forma implicita?','Essendo finiti i fogli, rimandiamo.',['Per conservare i fogli, li ripongo.','Pur avendo fogli, rimandiamo.'],'Essendo finiti i fogli esprime la ragione del rinvio.'],
[3,'In «Poiché la sala è occupata, ci spostiamo», la reggente è…','ci spostiamo',['poiché la sala è occupata','la sala è occupata'],'La causale precede la reggente ci spostiamo.']
],['Completa con «poiché»: «___ piove, lavoriamo in aula».',['poiché'],'Poiché introduce la causa.'],['Seleziona la causale.',['Non','partiamo','perché','la','strada','è','chiusa.'],[2,3,4,5,6],'Perché la strada è chiusa spiega il mancato viaggio.']);
g('Finali',[
[2,'In «Copri il banco affinché la vernice non lo macchi», la subordinata indica…','lo scopo della copertura',['la causa del banco','una domanda'],'La finale esprime il risultato che si vuole ottenere.'],
[3,'Quale frase contiene una finale implicita?','Chiudiamo il flacone per proteggere la colla.',['Chiudiamo il flacone perché la colla è secca.','Chiudiamo il flacone quando la colla è secca.'],'Per proteggere la colla esprime lo scopo ed è all’infinito.'],
[3,'In «Spiego il procedimento perché tutti possano ripeterlo», perché tutti possano ripeterlo indica…','il fine della spiegazione',['la causa che ha già prodotto la spiegazione','un contrasto'],'La subordinata esprime il risultato perseguito.']
],['Completa con «affinché»: «Segno il bordo ___ sia visibile».',['affinché'],'Affinché introduce lo scopo.'],['Seleziona la finale.',['Riordino','il','tavolo','per','liberare','spazio.'],[3,4,5],'Per liberare spazio indica il fine del riordino.']);
g('Temporali',[
[2,'In «Quando il pennello è pulito, lo ripongo», la subordinata indica…','il momento della posa',['lo scopo della pulizia','un confronto'],'Quando colloca l’azione nel tempo.'],
[3,'In «Dopo che la consegna è arrivata, firmiamo», l’arrivo precede…','la firma',['il momento della consegna necessariamente','una richiesta inesistente'],'Dopo che indica che prima arriva la consegna e poi si firma.'],
[3,'In «Finché la vernice asciuga, puliamo gli strumenti», le azioni sono presentate…','come sovrapposte nell’intervallo',['come necessariamente lontane anni','come causa e scopo'],'Finché delimita l’intervallo in cui si pulisce.']
],['Completa con «quando»: «___ la lezione termina, riordiniamo».',['quando'],'Quando introduce il momento del riordino.'],['Seleziona la temporale.',['Appena','suona','la','campana,','usciamo.'],[0,1,2,3],'Appena suona la campana indica il momento dell’uscita.']);
g('Interrogative indirette',[
[2,'In «Non so dove sia la colla», la dipendente esprime…','una domanda sul luogo',['una condizione','un ordine diretto'],'Dove sia la colla è una domanda dipendente.'],
[3,'Quale frase usa se con valore interrogativo?','Mi domando se il banco sia libero.',['Se il banco è libero, lavoro.','Se piove, torno.'],'Mi domando se introduce un dubbio.'],
[3,'Quale dipendente interrogativa è implicita?','come aprire la scatola, in «Non so come aprire la scatola»',['dove sia la scatola, in «Non so dove sia la scatola»','se la scatola sia aperta, in «Non so se la scatola sia aperta»'],'Aprire è un infinito; sia è un verbo di modo finito.']
],['Completa con «se»: «Verifico ___ il campione sia asciutto».',['se'],'Se introduce una domanda indiretta.'],['Seleziona la domanda indiretta.',['Lia','chiede','quando','arriverà','il','campione.'],[2,3,4,5],'Quando arriverà il campione esprime il contenuto della domanda.']);
g('Dichiarative',[
[2,'In «Ho una certezza: che il disegno sia corretto», la dipendente precisa…','il contenuto della certezza',['il luogo del disegno','il tempo della matita'],'La dichiarativa chiarisce il nome certezza.'],
[3,'In «Resta il dubbio che il pannello sia fragile», la subordinata precisa…','dubbio',['pannello come relativa','resta come complemento di luogo'],'Che il pannello sia fragile indica il contenuto del dubbio.'],
[3,'Quale confronto distingue dichiarativa e oggettiva?','Ho la certezza che arrivi; so che arriva.',['So che arriva; credo che parta.','Il treno che arriva; la nave che parte.'],'Nel primo periodo la dipendente precisa certezza; nel secondo completa il verbo so.']
],['Completa con «che»: «Ho un timore: ___ la colla secchi».',['che'],'Che introduce il contenuto del timore.'],['Seleziona la dichiarativa.',['Resta','la','speranza','che','il','progetto','riesca.'],[3,4,5,6],'Che il progetto riesca esplicita il contenuto della speranza.']);
g('Consecutive',[
[2,'In «La scatola è così grande che non passa», la dipendente esprime…','una conseguenza',['una causa','un fine'],'Così… che collega il grado della proprietà all’effetto.'],
[3,'Quale frase contiene una consecutiva implicita?','Il contenitore è troppo pesante per sollevarlo da soli.',['Sollevo il contenitore per liberare il banco.','Sollevo il contenitore quando arriva Lea.'],'Troppo pesante per sollevarlo indica un effetto impedito dal grado.'],
[3,'In «Ada ha lavorato tanto da meritare una pausa», da meritare indica…','la conseguenza del lavoro intenso',['una domanda indiretta','una condizione'],'Tanto… da esprime una conseguenza.']
],['Completa con «che»: «Il mobile è così alto ___ non passa».',['che'],'Così… che introduce la conseguenza.'],['Seleziona la conseguenza.',['Il','tessuto','era','così','leggero','che','volava','via.'],[5,6,7],'Che volava via esprime l’effetto.']);
g('Concessive',[
[2,'In «Benché faccia freddo, la classe esce», la subordinata presenta…','un ostacolo che non impedisce l’uscita',['la causa necessaria dell’uscita','la sua finalità'],'Benché introduce una concessione.'],
[3,'Quale frase contiene una concessiva implicita?','Pur avendo poco tempo, controllo il risultato.',['Controllo il risultato per risparmiare tempo.','Controllo il risultato perché ho tempo.'],'Pur avendo usa il gerundio e indica una concessione.'],
[3,'Quale frase esprime un rapporto concessivo?','Sebbene sia fragile, il modello resiste.',['Poiché è fragile, il modello resiste.','Il modello resiste per essere fragile.'],'Sebbene indica una circostanza nonostante la quale il modello resiste.']
],['Completa con «benché»: «___ piova, la mostra apre».',['benché'],'Benché introduce una circostanza concessiva.'],['Seleziona la concessiva.',['Pur','essendo','tardi,','Lia','controlla','il','disegno.'],[0,1,2],'Pur essendo tardi esprime la concessione.']);
g('Condizionali e periodo ipotetico',[
[2,'In «Se il legno è asciutto, lo lavoriamo», la protasi esprime…','la condizione',['la conseguenza','una domanda'],'Se il legno è asciutto pone la condizione.'],
[3,'In «Se avessimo misurato, ora conosceremmo la lunghezza», quando è collocata la condizione?','nel passato',['nel futuro certamente','dopo il momento presente'],'Avessimo misurato presenta una condizione passata.'],
[3,'Quale frase esprime irrealtà nel passato?','Se avessi controllato, avrei evitato l’errore.',['Se controllo, evito l’errore.','Quando controllo, evito l’errore.'],'Il trapassato congiuntivo e il condizionale passato presentano una condizione passata non realizzata.']
],['Completa con «se»: «___ il modello fosse pronto, inizieremmo».',['se'],'Se introduce la protasi.'],['Seleziona la protasi.',['Se','il','banco','è','libero,','iniziamo','la','prova.'],[0,1,2,3,4],'Se il banco è libero pone la condizione.']);
g('Comparative',[
[2,'In «Il modello è più leggero di quanto pensassi», la dipendente introduce…','il termine del confronto',['la causa del modello','il luogo della misura'],'Si confronta il peso effettivo con la previsione.'],
[3,'Quale frase contiene una comparativa?','La prova è durata meno di quanto sperassimo.',['La prova è finita quando siamo arrivati.','La prova è finita perché era tardi.'],'Di quanto sperassimo completa il confronto sulla durata.'],
[3,'In «Il tessuto costa più di quanto avessi previsto», si confrontano…','il costo effettivo e il costo previsto',['il luogo e il prezzo','il peso e la lunghezza'],'La comparativa richiama la previsione del costo.']
],['Completa con «quanto»: «Il tavolo pesa meno di ___ credevo».',['quanto'],'Di quanto credevo introduce il termine del confronto.'],['Seleziona la comparativa.',['La','borsa','pesa','più','di','quanto','immaginassi.'],[4,5,6],'Di quanto immaginassi è il secondo termine del confronto.']);
g('Modali',[
[2,'In «Disponi i campioni come ti ho mostrato», la subordinata indica…','il modo di disporre',['la causa della mostra','il tempo trascorso'],'Come ti ho mostrato precisa la maniera.'],
[3,'Quale frase contiene una modale?','Taglio il foglio come mi hai indicato.',['Non so come tagliare il foglio.','Il foglio che taglio è spesso.'],'Come mi hai indicato precisa la modalità del taglio.'],
[3,'Quale frase contiene invece una domanda indiretta?','Mi domando come incollare il pannello.',['Incollo il pannello come mi hai mostrato.','Incollo il pannello come facevo ieri.'],'Mi domando introduce un’incertezza sul modo.']
],['Completa con «come»: «Disponi i fogli ___ ti ho indicato».',['come'],'Come introduce il modo indicato.'],['Seleziona la modale.',['Riponi','gli','attrezzi','come','ti','ho','mostrato.'],[3,4,5,6],'Come ti ho mostrato precisa il modo di riporre.']);
g('Strumentali',[
[2,'In «Fisso il pannello usando i morsetti», la dipendente indica…','il mezzo impiegato',['una condizione','un ostacolo'],'Usando i morsetti indica lo strumento impiegato.'],
[3,'Quale frase contiene una strumentale implicita?','Abbiamo risparmiato stoffa riutilizzando i ritagli.',['Abbiamo risparmiato stoffa perché costava.','Abbiamo risparmiato stoffa quando potevamo.'],'Riutilizzando i ritagli indica il mezzo del risparmio.'],
[3,'In «Lea corregge l’errore confrontando i disegni», il confronto serve…','come mezzo della correzione',['come causa del disegno necessariamente','come domanda diretta'],'Il gerundio indica il mezzo adottato.']
],['Completa con «usando»: «Fisso il foglio ___ due clip».',['usando'],'Usando due clip indica il mezzo.'],['Seleziona la strumentale.',['Controlliamo','il','risultato','confrontando','le','misure.'],[3,4,5],'Confrontando le misure indica il mezzo del controllo.']);
window.ATELIER_NEW_PERIODI_CONTESTO=bank;
})();
