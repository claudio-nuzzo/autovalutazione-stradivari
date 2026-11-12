(() => {
'use strict';
const bank=[];
function base(g,l,k,p,f){return{id:`periodo-sfide-${String(bank.length+1).padStart(3,'0')}`,area:'periodo',topicGroup:g,topic:g,level:l,pei:false,kind:k,title:k==='tokens'?'Trova nel contesto':k==='exact'?'Completa il legame':'Analizza il contesto',prompt:p,feedback:f,minutes:k==='tokens'?3:2}}
function c(g,l,p,a,w,f){const options=[a,...w],answer=bank.length%options.length;options.splice(answer,0,options.shift());bank.push({...base(g,l,'choice',p,f),options,answer,solution:a})}
function e(g,p,a,f){bank.push({...base(g,1,'exact',p,f),answers:[a],solution:a})}
function t(g,p,words,answer,f){bank.push({...base(g,2,'tokens',p,f),tokens:words,answer,solution:answer.map(i=>words[i]).join(' ')})}
function group(g,cs,es,ts){for(const x of cs)c(g,...x);e(g,...es);t(g,...ts)}
group('Coordinate',[
[2,'Nel messaggio «Il metro è sul banco, ma la matita è nel cassetto», il secondo fatto è collegato al primo con…','coordinazione avversativa',['subordinazione causale','coordinazione conclusiva'],'Ma mette in contrasto le due proposizioni.'],
[3,'In «Se la classe arriva e la sala è aperta, iniziamo», le due condizioni sono…','subordinate coordinate fra loro',['due principali','una principale e una relativa'],'Le condizioni dipendono da iniziamo e sono coordinate con e.'],
[3,'In «Il cartone era troppo spesso, quindi abbiamo cambiato materiale», quindi introduce…','una coordinata conclusiva',['una subordinata relativa','una subordinata interrogativa'],'Quindi segnala una conclusione.']
],['Inserisci «oppure»: «Possiamo incollare ___ possiamo cucire».','oppure','Oppure collega due alternative.'],['Seleziona la coordinata con ma.',['La','sala','è','libera,','ma','il','docente','è','assente.'],[4,5,6,7,8],'Ma il docente è assente è coordinata avversativa.']);
group('Subordinate e gradi',[
[2,'In «Penso che il corriere arrivi», la dipendente rispetto a penso è di…','primo grado',['secondo grado','terzo grado'],'Che il corriere arrivi dipende direttamente da penso.'],
[3,'In «Credo che Sara sappia come si ripara il telaio», da quale proposizione dipende «come si ripara il telaio»?','che Sara sappia',['credo direttamente','il telaio'],'L’interrogativa indiretta completa il verbo sappia.'],
[3,'In «So che Mia spera che la merce arrivi», l’ultima proposizione è rispetto a so…','di secondo grado',['di primo grado','di terzo grado'],'Dipende da spera, che è dipendente di primo grado.']
],['Inserisci «che»: «Credo ___ la sala sia aperta».','che','Che introduce una dipendente di primo grado.'],['Seleziona la dipendente da «so».',['So','che','la','sala','è','aperta.'],[1,2,3,4,5],'Che la sala è aperta dipende da so.']);
group('Esplicite e implicite',[
[2,'Nel promemoria «Prima di imballare, controlla i bordi», la subordinata è…','implicita',['esplicita','una principale'],'Imballare è all’infinito.'],
[3,'Quale proposizione contiene un verbo di modo finito?','benché il banco sia pulito',['pur essendo pulito','dopo aver pulito'],'Sia è congiuntivo; le altre sono forme indefinite.'],
[3,'Quale riscrittura rende esplicita «Dopo aver misurato, taglio» con soggetto io?','Dopo che ho misurato, taglio.',['Prima che io misuri, taglio.','Taglio affinché io misuri.'],'Dopo che ho misurato mantiene l’anteriorità della misura.']
],['Inserisci «aver»: «Dopo ___ disegnato, ritaglio».','aver','Aver disegnato è infinito passato.'],['Seleziona la subordinata implicita.',['Pur','avendo','sonno,','Sara','continua','il','lavoro.'],[0,1,2],'Pur avendo sonno contiene il gerundio.']);
group('Completive',[
[2,'In «È opportuno che il tavolo sia stabile», la dipendente svolge la funzione di…','soggetto della reggente',['complemento di luogo','relativa'],'La subordinata esprime ciò che è opportuno.'],
[3,'In «Il gruppo ritiene che il progetto funzioni», la dipendente esprime…','il contenuto ritenuto dal gruppo',['il luogo del progetto','una condizione'],'La subordinata completa il verbo ritiene.'],
[3,'Quale frase contiene una soggettiva implicita?','È necessario controllare la misura.',['Desidero controllare la misura.','Controllo perché la misura è incerta.'],'Controllare la misura è il soggetto di è necessario.']
],['Inserisci «che»: «È probabile ___ la colla tenga».','che','Che introduce la soggettiva esplicita.'],['Seleziona la completiva oggettiva.',['Mia','pensa','che','il','modello','sia','pronto.'],[2,3,4,5,6],'Che il modello sia pronto completa pensa.']);
group('Relative',[
[2,'In «La sedia che ho scelto è leggera», che riprende…','la sedia',['ho scelto','leggera'],'Che è pronome relativo riferito a sedia.'],
[3,'In «La collega a cui parlo disegna», a cui equivale a…','alla quale',['dalla quale','sulla quale'],'Parlare a qualcuno richiede qui la preposizione a.'],
[3,'In «I partecipanti, che hanno firmato, entrano», le virgole presentano la relativa come…','informazione aggiunta al gruppo individuato',['condizione per selezionare soltanto alcuni','proposizione principale'],'La relativa esplicativa aggiunge un’informazione sui partecipanti.']
],['Inserisci «cui»: «Il quaderno di ___ parli è qui».','cui','Di cui riprende quaderno.'],['Seleziona la relativa.',['Il','mobile','che','Lia','restaura','è','antico.'],[2,3,4],'Che Lia restaura precisa mobile.']);
group('Causali',[
[2,'Nel messaggio «Ritardiamo perché il ponte è chiuso», la dipendente indica…','la causa del ritardo',['il suo scopo','una condizione ipotetica'],'La chiusura del ponte è presentata come motivo.'],
[3,'Quale frase contiene una causale implicita?','Essendo finiti i cartoni, ci fermiamo.',['Per comprare cartoni, esco.','Pur avendo cartoni, mi fermo.'],'Essendo finiti i cartoni spiega la fermata.'],
[3,'In «Poiché il banco è occupato, misuriamo altrove», la reggente è…','misuriamo altrove',['poiché il banco è occupato','il banco è occupato'],'La causale precede la principale.']
],['Inserisci «poiché»: «___ manca il filo, aspettiamo».','poiché','Poiché introduce la ragione dell’attesa.'],['Seleziona la causale.',['Rimandiamo','il','viaggio','perché','nevica.'],[3,4],'Perché nevica spiega il rinvio.']);
group('Finali',[
[2,'In «Copriamo il tavolo affinché la vernice non lo macchi», la dipendente indica…','lo scopo della copertura',['la causa della vernice','una domanda'],'Affinché introduce il fine perseguito.'],
[3,'Quale frase contiene una finale implicita?','Chiudo il flacone per conservare la colla.',['Chiudo il flacone perché la colla è secca.','Chiudo il flacone quando arrivi.'],'Per conservare la colla esprime lo scopo.'],
[3,'In «Lascio un segno perché tutti possano orientarsi», perché tutti possano orientarsi indica…','il fine del segno',['la causa già verificata del segno','un paragone'],'La subordinata presenta il risultato voluto.']
],['Inserisci «affinché»: «Segno il bordo ___ sia visibile».','affinché','Affinché introduce uno scopo.'],['Seleziona la finale.',['Chiudo','la','scatola','per','proteggere','il','contenuto.'],[3,4,5,6],'Per proteggere il contenuto esprime lo scopo.']);
group('Temporali',[
[2,'In «Appena suona la campana, usciamo», la dipendente indica…','il momento dell’uscita',['la causa della campana','una domanda'],'Appena colloca l’uscita nel tempo.'],
[3,'In «Dopo aver preparato la colla, Nora monta il pezzo», la preparazione è…','anteriore al montaggio',['successiva al montaggio','senza rapporto temporale'],'Dopo aver preparato indica un fatto precedente.'],
[3,'In «Mentre un gruppo cuce, l’altro disegna», le due azioni sono presentate come…','contemporanee',['necessariamente distanti anni','in rapporto di scopo'],'Mentre indica qui contemporaneità.']
],['Inserisci «quando»: «___ la prova termina, usciamo».','quando','Quando introduce il momento dell’uscita.'],['Seleziona la temporale.',['Quando','il','colore','asciuga,','spostiamo','il','vaso.'],[0,1,2,3],'Quando il colore asciuga colloca l’azione nel tempo.']);
group('Interrogative indirette',[
[2,'In «Non so dove sia il nastro», la subordinata esprime…','una domanda sul luogo',['una condizione','un ordine'],'Dove sia il nastro è una domanda dipendente.'],
[3,'In quale frase se introduce una domanda indiretta?','Mi chiedo se la porta sia chiusa.',['Se la porta è chiusa, esco.','Se piove, rimango.'],'Mi chiedo se introduce un dubbio.'],
[3,'In «Nora chiede come aprire la scatola», la dipendente è…','interrogativa indiretta implicita',['relativa esplicita','condizionale'],'Come aprire contiene un infinito e riferisce una domanda.']
],['Inserisci «dove»: «Dimmi ___ hai messo il metro».','dove','Dove introduce la domanda sul luogo.'],['Seleziona la domanda indiretta.',['Lia','chiede','quando','inizierà','il','corso.'],[2,3,4,5],'Quando inizierà il corso completa chiede.']);
group('Dichiarative',[
[2,'In «Ho un dubbio: che la vernice non tenga», la dipendente precisa…','il contenuto del dubbio',['il luogo della vernice','il colore del dubbio'],'La dichiarativa esplicita il contenuto di dubbio.'],
[3,'Quale frase contiene una dichiarativa riferita a un nome?','Ho la certezza che il pezzo entrerà.',['So che il pezzo entrerà.','Il pezzo che entra è piccolo.'],'Che il pezzo entrerà precisa il nome certezza.'],
[3,'In «Ti raccomando questo: di essere puntuale», di essere puntuale precisa…','il pronome questo',['il nome ti','il nome ascoltare'],'La dichiarativa specifica il contenuto indicato da questo.']
],['Inserisci «che»: «Ho una speranza: ___ tutto funzioni».','che','Che introduce il contenuto della speranza.'],['Seleziona la dichiarativa.',['Resta','il','timore','che','la','colla','secchi.'],[3,4,5,6],'Che la colla secchi precisa il contenuto di timore.']);
group('Consecutive',[
[2,'In «Il banco è così alto che non lo raggiungo», la dipendente esprime…','una conseguenza',['una causa','uno scopo'],'Così… che collega il grado all’effetto.'],
[3,'Quale frase contiene una consecutiva implicita?','Il pacco è troppo grande per passare dalla porta.',['Apro la porta per far passare il pacco.','Il pacco passa quando apro.'],'Troppo grande per passare indica una conseguenza impedita dal grado.'],
[3,'In «Il suono era tanto debole da non sentirsi», quale parola intensifica la proprietà?','tanto',['era','suono'],'Tanto accompagna debole e anticipa la conseguenza.']
],['Inserisci «che»: «Il tavolo è così alto ___ non passa».','che','Così… che introduce un effetto.'],['Seleziona la conseguenza.',['Il','rumore','era','così','forte','che','copriva','la','voce.'],[5,6,7,8],'Che copriva la voce indica la conseguenza.']);
group('Concessive',[
[2,'In «Sebbene piova, la classe parte», la subordinata presenta…','un ostacolo che non impedisce la partenza',['lo scopo della pioggia','un ordine'],'Sebbene introduce una concessione.'],
[3,'Quale frase contiene una concessiva implicita?','Pur essendo stanca, Lea controlla il modello.',['Lea controlla perché è stanca.','Lea controlla per stancarsi.'],'Pur essendo contiene un gerundio e presenta un ostacolo non determinante.'],
[3,'Quale frase esprime un rapporto concessivo?','Anche se è fragile, il mobile resiste.',['Poiché è fragile, il mobile resiste.','Il mobile resiste per essere fragile.'],'Anche se introduce il fatto che non impedisce la resistenza.']
],['Inserisci «benché»: «___ sia tardi, continuiamo».','benché','Benché introduce una concessione.'],['Seleziona la concessiva.',['Sebbene','faccia','freddo,','la','mostra','apre.'],[0,1,2],'Sebbene faccia freddo è la concessiva.']);
group('Condizionali e periodo ipotetico',[
[2,'In «Se il campione basta, iniziamo», la subordinata pone…','una condizione',['una domanda indiretta','una conclusione'],'La possibilità di iniziare dipende dalla condizione.'],
[3,'In «Se avessi studiato, ora sapresti rispondere», la condizione è…','passata con conseguenza presente',['futura con conseguenza passata','una domanda'],'Avessi studiato è passato; ora sapresti indica un effetto presente.'],
[3,'Quale frase presenta un’ipotesi non realizzata nel passato?','Se avessi misurato, avrei evitato l’errore.',['Se misuro, evito l’errore.','Quando misuro, evito l’errore.'],'La coppia trapassato congiuntivo e condizionale passato esprime qui irrealtà passata.']
],['Inserisci «se»: «___ il banco fosse libero, lavorerei».','se','Se introduce la condizione.'],['Seleziona la protasi.',['Se','il','filo','basta,','terminiamo','la','cucitura.'],[0,1,2,3],'Se il filo basta esprime la condizione.']);
group('Comparative',[
[2,'In «Il mobile costa meno di quanto pensassi», la subordinata introduce…','il termine del confronto',['un motivo','un luogo'],'Si confronta il prezzo effettivo con quello previsto.'],
[3,'Quale frase contiene una comparativa?','La prova dura più di quanto immaginassi.',['La prova termina quando arrivi.','La prova termina perché è tardi.'],'Di quanto immaginassi completa il confronto.'],
[3,'In «La stoffa pesa più di quanto sperassimo», si confrontano…','il peso reale e quello sperato',['il peso e il prezzo','due colori'],'La subordinata richiama l’aspettativa sul peso.']
],['Inserisci «quanto»: «Il banco pesa meno di ___ pensassi».','quanto','Di quanto pensassi introduce il confronto.'],['Seleziona la comparativa.',['La','scatola','pesa','più','di','quanto','credessi.'],[4,5,6],'Di quanto credessi è il termine del confronto.']);
group('Modali',[
[2,'In «Piega il foglio come ti ho mostrato», la dipendente indica…','il modo di piegare',['il tempo trascorso','il fine del foglio'],'Come ti ho mostrato precisa la maniera.'],
[3,'Quale frase contiene una subordinata modale?','Dispongo i pezzi come mi hai suggerito.',['Non so come disporre i pezzi.','Il pezzo che dispongo è piccolo.'],'La subordinata specifica la maniera di disporre.'],
[3,'Quale frase presenta una domanda indiretta sul modo?','Mi chiedo come riporre gli attrezzi.',['Ripongo gli attrezzi come mi hai mostrato.','Ripongo gli attrezzi come facevo ieri.'],'Mi chiedo introduce una domanda dipendente.']
],['Inserisci «come»: «Sistema i fogli ___ ti ho indicato».','come','Come introduce il modo indicato.'],['Seleziona la modale.',['Riponi','la','stoffa','come','ti','ho','mostrato.'],[3,4,5,6],'Come ti ho mostrato indica il modo.']);
group('Strumentali',[
[2,'In «Fissiamo il pannello usando i morsetti», la subordinata indica…','il mezzo impiegato',['una condizione','una concessione'],'Usando i morsetti indica il mezzo del fissaggio.'],
[3,'Quale frase contiene una strumentale implicita?','Riduciamo gli scarti riutilizzando i ritagli.',['Riduciamo gli scarti perché costano.','Riduciamo gli scarti quando possiamo.'],'Riutilizzando i ritagli indica il mezzo.'],
[3,'In «Confrontando i campioni, Lea controlla la misura», il confronto indica…','il mezzo del controllo',['un ostacolo','un ordine'],'Il gerundio indica il mezzo con cui Lea controlla.']
],['Inserisci «usando»: «Fisso il foglio ___ due clip».','usando','Usando due clip indica il mezzo.'],['Seleziona la strumentale.',['Controlliamo','la','misura','confrontando','i','disegni.'],[3,4,5],'Confrontando i disegni indica il mezzo del controllo.']);
group('Altre subordinate',[
[2,'In «Posa il metro dove trovi spazio», la dipendente indica…','il luogo della posa',['una causa','una domanda'],'Dove trovi spazio esprime il luogo senza antecedente nominale espresso.'],
[3,'In «Oltre a disegnare, Lia costruisce», la subordinata è…','aggiuntiva',['causale','consecutiva'],'Oltre a disegnare aggiunge un’azione a costruire.'],
[3,'In «Anziché stampare, disegno a mano», la subordinata esprime…','un contrasto fra azioni',['una domanda indiretta','una causa'],'Anziché contrappone l’azione non scelta a quella svolta.']
],['Inserisci «dove»: «Riponi il filo ___ trovi spazio».','dove','Dove introduce una locativa.'],['Seleziona l’aggiuntiva.',['Oltre','a','disegnare,','Samir','costruisce','un','modellino.'],[0,1,2],'Oltre a disegnare aggiunge un’azione.']);
group('Esclusive',[
[2,'In «Ada è uscita senza salutare», la dipendente indica…','un’azione esclusa',['una causa','una condizione'],'Senza salutare esclude il saluto dall’uscita.'],
[3,'Quale frase contiene un’esclusiva esplicita?','È entrata senza che nessuno se ne accorgesse.',['È entrata senza salutare.','È entrata per salutare.'],'Senza che nessuno se ne accorgesse contiene un congiuntivo.'],
[3,'In «Lia ripone il vaso senza romperlo», il soggetto sottinteso di rompere è…','Lia',['il vaso','una persona necessariamente diversa'],'Lia è il soggetto della reggente e dell’infinito.']
],['Inserisci «senza»: «Nora è uscita ___ salutare».','senza','Senza introduce l’azione esclusa.'],['Seleziona l’esclusiva.',['Nora','ha','finito','senza','chiedere','aiuto.'],[3,4,5],'Senza chiedere aiuto indica ciò che non è avvenuto.']);
window.ATELIER_NEW_PERIODO_SFIDE=bank;
})();
