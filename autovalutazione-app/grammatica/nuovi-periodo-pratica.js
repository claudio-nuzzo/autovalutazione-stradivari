(() => {
'use strict';
const bank=[];
function base(group,level,kind,prompt,feedback){return {id:`periodo-pratica-${String(bank.length+1).padStart(3,'0')}`,area:'periodo',topicGroup:group,topic:group,level,pei:false,kind,title:kind==='tokens'?'Individua nel periodo':kind==='exact'?'Completa il collegamento':'Ragiona sul periodo',prompt,feedback,minutes:kind==='tokens'?3:2};}
function choice(group,level,prompt,solution,wrong,feedback){const options=[solution,...wrong],answer=bank.length%options.length;options.splice(answer,0,options.shift());bank.push({...base(group,level,'choice',prompt,feedback),options,answer,solution});}
function exact(group,prompt,answers,feedback){bank.push({...base(group,2,'exact',prompt,feedback),answers,solution:answers[0]});}
function tokens(group,prompt,words,answer,feedback){bank.push({...base(group,3,'tokens',prompt,feedback),tokens:words,answer,solution:answer.map(i=>words[i]).join(' ')});}
function group(name,choices,e,t){for(const row of choices)choice(name,...row);exact(name,...e);tokens(name,...t);}
group('Principale e proposizioni',[
[2,'In «Se il nastro basta, termino l’orlo», quale proposizione è principale?','termino l’orlo',['se il nastro basta','il nastro basta'],'Termino l’orlo non dipende da un’altra proposizione.'],
[3,'Quanti predicati ci sono in «La classe ha preparato e poi ha illustrato il bozzetto»?','due',['quattro','uno'],'Ha preparato e ha illustrato sono due forme composte e due predicati.'],
[3,'In «Quando Lea arriva, la docente, che è già in aula, apre la prova», quale nucleo appartiene alla principale?','la docente apre la prova',['quando Lea arriva','che è già in aula'],'La relativa si inserisce nel nucleo principale la docente apre la prova.']
],['Completa con «che»: «Penso ___ il bozzetto sia pronto».',['che'],'Che introduce il contenuto dipendente da penso.'],['Seleziona tutte le parole della principale.',['Se','piove,','porterò','il','campione','dentro.'],[2,3,4,5],'Porterò il campione dentro è la principale.']);
group('Coordinate',[
[2,'In «Ada ritaglia e Noor incolla», la congiunzione collega…','due proposizioni sullo stesso piano',['una causa e il suo effetto necessariamente','un articolo e un nome'],'E collega due predicati allo stesso livello.'],
[3,'In «Il modello è solido, tuttavia pesa troppo», la seconda proposizione è…','coordinata avversativa',['subordinata finale','subordinata relativa'],'Tuttavia segnala il contrasto con la prima affermazione.'],
[3,'In «So che Nora disegna e che Amir cuce», le due dipendenti sono…','coordinate tra loro e subordinate a so',['entrambe principali','di gradi necessariamente diversi'],'Entrambe dipendono da so e sono collegate da e.']
],['Scegli «ma» o «perché»: «Il ripiano è piccolo, ___ è stabile».',['ma'],'Ma collega due proposizioni in contrasto.'],['Seleziona la coordinata introdotta da «e».',['Il','colore','asciuga','e','la','colla','tiene.'],[3,4,5,6],'E la colla tiene aggiunge una proposizione coordinata.']);
group('Subordinate e gradi',[
[2,'In «Temo che il nastro finisca», che grado ha la dipendente rispetto a temo?','primo',['secondo','terzo'],'La dipendente è retta direttamente dalla principale.'],
[3,'In «So che Ada chiede se il banco sia libero», quale proposizione regge l’interrogativa indiretta?','che Ada chiede',['so direttamente','sia libero'],'Se il banco sia libero completa il verbo chiede.'],
[3,'In «Credo che Sara sappia dove sia il metro», dove sia il metro è di…','secondo grado rispetto a credo',['primo grado rispetto a credo','terzo grado rispetto a credo'],'Dipende da sappia, a sua volta dipendente da credo.']
],['Completa con «che»: «Spero ___ la stoffa basti».',['che'],'Che introduce la dipendente di primo grado.'],['Seleziona la subordinata retta da «spero».',['Spero','che','la','stoffa','basti.'],[1,2,3,4],'Che la stoffa basti dipende direttamente da spero.']);
group('Esplicite e implicite',[
[2,'In «Pur essendo fragile, il cartone regge», la subordinata è…','implicita',['esplicita','principale'],'Essendo è un gerundio, modo indefinito.'],
[3,'Quale dipendente ha il verbo al congiuntivo?','benché la colla tenga',['tenendo la colla','dopo aver incollato'],'Tenga è congiuntivo presente; le altre forme sono indefinite.'],
[3,'Quale frase rende esplicito «Prima di partire, chiudo» mantenendo lo stesso soggetto?','Prima che io parta, chiudo.',['Dopo che io parto, chiudo.','Benché io parta, chiudo.'],'Prima che io parta esprime anteriorità rispetto alla partenza.']
],['Completa con il gerundio «leggendo»: «___ le istruzioni, capirai».',['leggendo'],'Leggendo forma una dipendente implicita.'],['Seleziona la subordinata implicita.',['Dopo','aver','pulito,','riponiamo','i','pennelli.'],[0,1,2],'Dopo aver pulito contiene un infinito passato.']);
group('Completive',[
[2,'In «È utile che il banco sia libero», la subordinata svolge la funzione di…','soggetto della reggente',['complemento di luogo','attributo del banco'],'Che il banco sia libero esprime ciò che è utile.'],
[3,'In «La docente afferma che il corso comincia», la dipendente è…','oggettiva',['temporale','relativa'],'La proposizione completa il contenuto dell’affermazione.'],
[3,'In quale frase la subordinata esplicita il contenuto del nome «notizia»?','La notizia che il museo apre ci rallegra.',['So che il museo apre.','Il museo che apre è vicino.'],'Che il museo apre precisa il contenuto della notizia.']
],['Completa con «che»: «È importante ___ la colla asciughi».',['che'],'Che introduce la soggettiva esplicita.'],['Seleziona la completiva oggettiva.',['Ada','ritiene','che','il','campione','sia','pronto.'],[2,3,4,5,6],'Che il campione sia pronto completa il verbo ritiene.']);
group('Relative',[
[2,'In «La cornice che ho dipinto è asciutta», che riprende…','la cornice',['ho dipinto','asciutta'],'Che è pronome relativo con antecedente cornice.'],
[3,'In «Il collega con cui lavoro è preciso», con cui significa…','con il quale',['al quale','del quale'],'La preposizione con è richiesta dal rapporto lavorare con qualcuno.'],
[3,'In «Il mobile che trasportiamo è fragile», che è…','oggetto di trasportiamo',['soggetto di trasportiamo','complemento di termine'],'Noi sottinteso trasportiamo il mobile: che è oggetto.']
],['Completa con «cui»: «La collega con ___ lavoro disegna».',['cui'],'Con cui riprende la collega.'],['Seleziona tutte le parole della relativa.',['La','sedia','che','Nora','ripara','è','antica.'],[2,3,4],'Che Nora ripara specifica il nome sedia.']);
group('Causali',[
[2,'In «Sospendiamo il taglio poiché manca il cartone», la dipendente indica…','la causa della sospensione',['il fine del taglio','un confronto'],'La mancanza del cartone è il motivo della sospensione.'],
[3,'Quale frase esprime una causa con gerundio?','Essendo esaurita la colla, rimandiamo.',['Per conservare la colla, chiudo il barattolo.','Pur avendo colla, rimandiamo.'],'Essendo esaurita la colla presenta la ragione del rinvio.'],
[3,'In «Per aver lasciato aperto il barattolo, Luca ha dovuto buttare la colla», la subordinata indica…','la causa della necessità di buttare la colla',['lo scopo di lasciare aperto','il luogo del barattolo'],'Luca ha lasciato aperto il barattolo: questo fatto è presentato come causa.']
],['Completa con «poiché»: «___ manca il filo, attendiamo».',['poiché'],'Poiché introduce il motivo dell’attesa.'],['Seleziona la causale.',['Rimando','la','prova','perché','manca','la','colla.'],[3,4,5,6],'Perché manca la colla esprime la causa del rinvio.']);
group('Finali',[
[2,'In «Chiudo il contenitore affinché la vernice si conservi», la subordinata indica…','lo scopo della chiusura',['la causa del contenitore','il luogo della vernice'],'Affinché introduce il risultato che si vuole ottenere.'],
[3,'Quale frase usa una finale implicita?','Preparo un modello per verificare le misure.',['Rimando la prova perché mancano le misure.','Riordino quando finisce la prova.'],'Per verificare indica lo scopo ed è all’infinito.'],
[3,'In «Porta una lampada che illumini il banco», la relativa può avere valore…','finale',['di domanda diretta','di tempo passato'],'Che illumini il banco descrive la proprietà cercata per illuminare.']
],['Completa con «affinché»: «Chiudo il flacone ___ la colla non secchi».',['affinché'],'Affinché introduce lo scopo della chiusura.'],['Seleziona la subordinata finale.',['Misuro','la','parete','per','collocare','il','mobile.'],[3,4,5,6],'Per collocare il mobile esprime lo scopo della misurazione.']);
group('Temporali',[
[2,'In «Appena il tessuto arriva, iniziamo», la subordinata indica…','il momento dell’inizio',['la causa della stoffa','il fine della consegna'],'Appena il tessuto arriva colloca nel tempo iniziamo.'],
[3,'In «Prima che la colla asciughi, correggo la posizione», la correzione avviene…','prima dell’asciugatura',['dopo l’asciugatura','necessariamente il giorno seguente'],'Prima che indica che la correzione precede l’asciugatura.'],
[3,'In «Mentre un gruppo misura, l’altro disegna», il rapporto è…','di contemporaneità',['di scopo','di interrogazione'],'Mentre presenta le due azioni nello stesso intervallo.']
],['Completa con «quando»: «___ il colore asciuga, ripongo il pennello».',['quando'],'Quando introduce la subordinata temporale.'],['Seleziona la subordinata temporale.',['Quando','il','colore','asciuga,','ripongo','il','pennello.'],[0,1,2,3],'Quando il colore asciuga indica il momento della reggente.']);
group('Interrogative indirette',[
[2,'In «Mi domando dove sia il metro», la dipendente esprime…','una domanda sul luogo',['un’indicazione di luogo già certa','una condizione'],'Mi domando introduce una domanda dipendente.'],
[3,'Quale frase contiene «se» interrogativo?','Verifico se il contenitore è chiuso.',['Se il contenitore è chiuso, esco.','Se piove, resto qui.'],'Verifico se presenta una domanda: è chiuso oppure no?'],
[3,'Quale frase contiene una domanda indiretta con forma implicita?','Non so come procedere.',['Procedi come ti ho mostrato.','Il procedimento che seguo funziona.'],'Come procedere dipende da non so e ha l’infinito.']
],['Completa con «se»: «Non so ___ il corso inizierà».',['se'],'Se introduce una domanda indiretta.'],['Seleziona la domanda indiretta.',['Nora','chiede','dove','sia','il','righello.'],[2,3,4,5],'Dove sia il righello dipende dal verbo chiede.']);
group('Dichiarative',[
[2,'In «Ho una speranza: che il mobile entri», la subordinata precisa…','il contenuto della speranza',['il materiale del mobile','il luogo della speranza'],'La subordinata chiarisce quale sia la speranza.'],
[3,'Quale frase contiene una dichiarativa legata a un nome?','Resta il dubbio che la misura sia sbagliata.',['Dubito che la misura sia corretta.','La misura che controlli è corretta.'],'La subordinata esplicita il contenuto del nome dubbio.'],
[3,'In «Ti chiedo questo: di ascoltare», di ascoltare precisa…','il pronome questo',['il nome ti','il verbo ascoltare'],'La dichiarativa implicita specifica ciò che viene chiesto.']
],['Completa con «che»: «Resta una possibilità: ___ il colore cambi».',['che'],'Che introduce il contenuto della possibilità.'],['Seleziona la dichiarativa.',['Ho','il','timore','che','la','colla','secchi.'],[3,4,5,6],'Che la colla secchi precisa il contenuto del timore.']);
group('Consecutive',[
[2,'In «La luce è così forte che abbaglia», la subordinata indica…','una conseguenza',['uno scopo','una condizione'],'Così… che lega il grado della luce al suo effetto.'],
[3,'Quale frase contiene una consecutiva implicita?','Il mobile è troppo largo per passare dalla porta.',['Allargo la porta per far passare il mobile.','La porta si apre quando passo.'],'Troppo largo per passare indica un effetto impedito dal grado espresso.'],
[3,'In «Aveva lavorato tanto da meritare una pausa», da meritare indica…','la conseguenza del molto lavoro',['il mezzo usato per lavorare','la causa della pausa prima del lavoro'],'Tanto… da collega l’intensità del lavoro alla conseguenza.']
],['Completa con «che»: «La valigia è così pesante ___ non si solleva facilmente».',['che'],'Così… che introduce la conseguenza.'],['Seleziona la consecutiva.',['Il','cartone','è','così','sottile','che','si','piega.'],[5,6,7],'Che si piega esprime la conseguenza del grado di sottigliezza.']);
group('Concessive',[
[2,'In «Anche se è tardi, controlliamo», la dipendente indica…','un ostacolo che non impedisce il controllo',['la causa necessaria del controllo','lo scopo del ritardo'],'Anche se è tardi segnala una circostanza concessiva.'],
[3,'Quale frase mantiene il senso di «Pur essendo stanca, Nora continua»?','Sebbene sia stanca, Nora continua.',['Poiché è stanca, Nora continua.','Nora continua per stancarsi.'],'Sebbene e pur essendo esprimono qui una concessione.'],
[3,'Quale subordinata concessiva è implicita?','pur arrivando tardi',['benché arrivi tardi','anche se arriva tardi'],'Pur arrivando contiene il gerundio; nelle altre alternative il verbo è di modo finito.']
],['Completa con «benché»: «___ sia tardi, controlliamo il modello».',['benché'],'Benché introduce la concessione.'],['Seleziona la concessiva.',['Sebbene','piova,','la','mostra','continua.'],[0,1],'Sebbene piova introduce l’ostacolo che non impedisce la mostra.']);
group('Condizionali e periodo ipotetico',[
[2,'In «Se il banco è libero, iniziamo», se il banco è libero è…','la condizione',['la conseguenza','una domanda indiretta'],'La possibilità di iniziare dipende dalla condizione.'],
[3,'Quale periodo usa il congiuntivo imperfetto nella condizione e il condizionale presente nella conseguenza?','Se avessi tempo, preparerei il modello.',['Se ho tempo, preparo il modello.','Quando preparo il modello, uso il banco.'],'Congiuntivo imperfetto e condizionale presente presentano qui una possibilità.'],
[3,'In «Se avessi cucito prima, ora avrei il costume pronto», la condizione è…','passata, con conseguenza presente',['presente, con conseguenza passata','una domanda indiretta'],'Avessi cucito colloca la condizione nel passato; ora avrei indica l’effetto presente.']
],['Completa con «se»: «___ il disegno fosse pronto, inizieremmo».',['se'],'Se introduce la condizione della protasi.'],['Seleziona la protasi.',['Se','il','nastro','basta,','terminiamo','l’orlo.'],[0,1,2,3],'Se il nastro basta pone la condizione.']);
group('Comparative',[
[2,'In «Il lavoro è più lungo di quanto credessi», la subordinata introduce…','il termine del confronto',['la causa del lavoro','il luogo del lavoro'],'Si confronta la durata effettiva con quella prevista.'],
[3,'Quale frase contiene una comparativa?','Il pannello pesa meno di quanto pensassi.',['Il pannello cade quando lo tocco.','Il pannello si rompe perché è fragile.'],'Di quanto pensassi introduce un termine di confronto.'],
[3,'In «La prova è andata meglio di quanto sperassimo», si confrontano…','il risultato e l’aspettativa',['il luogo e il tempo','due persone necessariamente'],'La valutazione del risultato viene confrontata con ciò che si sperava.']
],['Completa con «quanto»: «Il banco pesa più di ___ immaginassi».',['quanto'],'Di quanto immaginassi introduce il termine del confronto.'],['Seleziona la comparativa.',['Il','mobile','è','più','leggero','di','quanto','pensassi.'],[5,6,7],'Di quanto pensassi completa il confronto.']);
group('Modali',[
[2,'In «Piega il tessuto come ti ho mostrato», la subordinata indica…','il modo di piegare',['il motivo del tessuto','il tempo della stoffa'],'Come ti ho mostrato precisa come piegare il tessuto.'],
[3,'Quale frase contiene una modale?','Dispongo i pezzi come mi hai suggerito.',['Non so come disporre i pezzi.','Il pezzo che dispongo è piccolo.'],'La subordinata indica la maniera in cui i pezzi vengono disposti.'],
[3,'Quale frase contiene invece una domanda indiretta?','Mi chiedo come sia stato costruito.',['È stato costruito come indicato.','Costruiscilo come ti ho mostrato.'],'Mi chiedo introduce una domanda dipendente.']
],['Completa con «come»: «Disponi i pezzi ___ ti ho mostrato».',['come'],'Come introduce la maniera indicata.'],['Seleziona la subordinata modale.',['Piega','il','foglio','come','ti','ho','mostrato.'],[3,4,5,6],'Come ti ho mostrato precisa il modo di piegare.']);
group('Strumentali',[
[2,'In «Risolvo il problema confrontando le misure», la subordinata indica…','il mezzo usato',['un luogo','una concessione'],'Confrontando le misure indica il mezzo della soluzione.'],
[3,'Quale frase contiene una strumentale implicita?','Ho ridotto gli scarti riutilizzando i ritagli.',['Riduco gli scarti perché costano.','Riduco gli scarti quando posso.'],'Riutilizzando i ritagli indica il mezzo per ridurre gli scarti.'],
[3,'In «Apriamo la scatola utilizzando il cacciavite», l’azione strumentale è…','utilizzare il cacciavite',['aprire la scatola','rompere la scatola'],'Utilizzando il cacciavite descrive il mezzo impiegato.']
],['Completa con «usando»: «Fisso il pannello ___ due morsetti».',['usando'],'Usando due morsetti indica il mezzo.'],['Seleziona la strumentale.',['Lea','verifica','le','misure','confrontando','i','disegni.'],[4,5,6],'Confrontando i disegni indica il mezzo della verifica.']);
group('Limitative',[
[2,'In «Per quanto ricordo, il laboratorio apre lunedì», la subordinata limita…','l’affermazione ai ricordi del parlante',['la larghezza del laboratorio','la durata del corso'],'Per quanto ricordo circoscrive ciò che viene affermato.'],
[3,'Quale frase contiene una limitativa?','Che io sappia, la mostra è aperta.',['Poiché lo so, te lo dico.','La mostra è aperta perché è lunedì.'],'Che io sappia equivale a per quanto ne so.'],
[3,'In «Secondo quanto mi hanno detto, il banco è libero», il parlante…','delimita l’affermazione alle informazioni ricevute',['dà un ordine','esprime una causa dell’arredo'],'Secondo quanto mi hanno detto circoscrive la fonte dell’affermazione.']
],['Completa con «sappia»: «Che io ___, il banco è libero».',['sappia'],'Che io sappia esprime una limitazione di conoscenza.'],['Seleziona la limitativa.',['Per','quanto','ne','so,','il','tessuto','è','asciutto.'],[0,1,2,3],'Per quanto ne so circoscrive la conoscenza del parlante.']);
group('Eccettuative',[
[2,'In «Partiremo, a meno che non nevichi», la subordinata introduce…','un’eccezione alla partenza prevista',['lo scopo della partenza','un luogo di partenza'],'La neve è il caso che potrebbe impedire la partenza.'],
[3,'Quale frase contiene una subordinata eccettuativa?','Accetterò, salvo che il prezzo aumenti.',['Accetterò perché il prezzo è basso.','Accetterò quando arriverà il preventivo.'],'Salvo che il prezzo aumenti introduce il caso eccettuato.'],
[3,'In «Non possiamo fare altro che attendere», che attendere esprime…','l’azione che resta possibile',['la ragione dell’attesa','il momento della partenza'],'Che attendere esprime l’eccezione rispetto all’impossibilità di fare altro.']
],['Completa con «meno»: «Iniziamo, a ___ che non manchi la corrente».',['meno'],'A meno che non introduce il caso eccettuato.'],['Seleziona la subordinata eccettuativa.',['Andremo','in','aula,','salvo','che','non','nevichi.'],[3,4,5,6],'Salvo che non nevichi presenta il caso che potrebbe impedire l’andata.']);
group('Esclusive',[
[2,'In «Ada esce senza salutare», la subordinata indica…','un’azione esclusa',['la causa dell’uscita','la durata del saluto'],'Senza salutare esclude il saluto dall’azione di uscire.'],
[3,'Quale esclusiva è esplicita?','Il lavoro è finito senza che nessuno intervenisse.',['Il lavoro è finito senza chiedere aiuto.','Il lavoro è finito per aiutare.'],'Intervenisse è un congiuntivo; la subordinata è esplicita.'],
[3,'In «Lia apre la scatola senza romperla», chi non rompe la scatola?','Lia',['la scatola stessa','un soggetto necessariamente diverso'],'Il soggetto sottinteso dell’infinito è la persona che apre.']
],['Completa con «senza»: «Ada è uscita ___ salutare».',['senza'],'Senza introduce l’azione esclusa.'],['Seleziona l’esclusiva.',['Marco','ha','finito','senza','chiedere','aiuto.'],[3,4,5],'Senza chiedere aiuto esclude il ricorso all’aiuto.']);
group('Altre subordinate',[
[2,'In «Posa il filo dove trovi posto», la subordinata indica…','il luogo',['la causa','una domanda'],'Dove trovi posto indica il luogo della posa senza antecedente nominale espresso.'],
[3,'In «Oltre a cucire, progetto», la subordinata aggiunge…','un’azione',['una condizione','una domanda'],'Oltre a cucire aggiunge l’azione di cucire a progettare.'],
[3,'In «Anziché stampare, disegno a mano», quale rapporto è espresso?','contrasto fra azioni',['conseguenza necessaria','interrogazione'],'Anziché contrappone l’azione non scelta a quella svolta.']
],['Completa con «dove»: «Posa il metro ___ trovi spazio».',['dove'],'Dove introduce una locativa.'],['Seleziona l’aggiuntiva.',['Oltre','a','misurare,','Nora','fotografa','il','mobile.'],[0,1,2],'Oltre a misurare aggiunge un’azione.']);
window.ATELIER_NEW_PERIODO_PRATICA=bank;
})();
