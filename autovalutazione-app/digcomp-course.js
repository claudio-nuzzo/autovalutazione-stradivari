(() => {
  const levels = ['Da costruire', 'Con guida', 'In autonomia', 'Guido altri'];
  const profiles = {
    alunno: [
      ['Informazione e dati', ['Formulo ricerche precise e confronto autore, data, scopo e prove.', 'Organizzo fonti e dati in modo da poterli ritrovare e citare.']],
      ['Comunicazione e collaborazione', ['Scelgo canale, tono e destinatari adatti.', 'Collaboro online rispettando ruoli, identità e contributi.']],
      ['Creazione di contenuti', ['Creo e rielaboro contenuti accessibili in formati diversi.', 'Cito fonti e licenze e dichiaro l’eventuale uso dell’IA.']],
      ['Sicurezza e benessere', ['Proteggo account, dati personali e dispositivi.', 'Gestisco attenzione, tempo, reputazione e impatto ambientale.']],
      ['Risoluzione di problemi', ['Definisco il bisogno, provo soluzioni e imparo dagli errori.', 'Valuto criticamente strumenti digitali e risposte dell’IA.']]
    ],
    docente: [
      ['Informazione e dati', ['Seleziono fonti affidabili per progettare attività e materiali.', 'Organizzo dati didattici nel rispetto di finalità, minimizzazione e trasparenza.']],
      ['Comunicazione e collaborazione', ['Progetto ambienti e consegne digitali chiari e inclusivi.', 'Collaboro con colleghi e studenti rendendo visibili ruoli e feedback.']],
      ['Creazione di contenuti', ['Produco materiali accessibili, riusabili e coerenti con gli obiettivi.', 'Gestisco diritto d’autore, licenze e dichiarazione dell’uso dell’IA.']],
      ['Sicurezza e benessere', ['Tutelo dati, account e dispositivi nelle attività didattiche.', 'Progetto un uso equilibrato del digitale e prevengo esclusione e sovraccarico.']],
      ['Risoluzione di problemi', ['Scelgo tecnologie a partire dal bisogno didattico, non dallo strumento.', 'Valuto limiti, bias e impatto dell’IA e mantengo supervisione umana.']]
    ]
  };

  const lessons = [
    {
      title: 'Cercare e valutare informazioni', area: 'Area 1 · Ricerca, valutazione e gestione delle informazioni', time: '18–22 min',
      intro: 'Cercare non significa soltanto trovare: significa formulare bene il bisogno, capire come è stata prodotta un’informazione e decidere se merita fiducia.',
      objectives: ['Trasformare un tema in domande e parole chiave efficaci', 'Valutare fonte, contenuto e processo di produzione', 'Riconoscere manipolazioni, disinformazione e risposte non verificate'],
      sections: [
        ['Dalla domanda alla ricerca', 'Una ricerca utile nasce da una domanda delimitata. Prima di aprire il motore di ricerca chiarisci argomento, periodo, luogo, tipo di fonte e uso finale. Combina parole specifiche, virgolette per le espressioni esatte, esclusioni e filtri; poi modifica la ricerca se i risultati non rispondono davvero al bisogno.', ['Scrivi ciò che vuoi sapere, non soltanto il tema.', 'Usa sinonimi e termini disciplinari.', 'Conserva le query migliori: fanno parte del metodo.']],
        ['Valutare fonte e contenuto', 'Controlla chi pubblica, con quali competenze e per quale scopo. Data, riferimenti, prove, tono e possibilità di risalire all’origine aiutano a distinguere informazione, opinione, pubblicità e propaganda. Una pagina curata può comunque essere inaffidabile: la veste grafica non è una prova.', ['Risalire alla fonte primaria.', 'Confrontare almeno due fonti indipendenti.', 'Separare fatti, interpretazioni e pubblicità.']],
        ['Controllare anche il processo', 'DigComp 3.0 chiede di valutare anche il processo che genera il risultato. Motori, piattaforme e IA ordinano o producono contenuti con criteri non sempre visibili. Chiediti quali dati usano, cosa potrebbe mancare e quale verifica esterna puoi compiere.', ['Apri altre fonti invece di restare sulla prima pagina.', 'Cerca conferme e smentite autorevoli.', 'Per immagini e video controlla contesto, data e provenienza.']]
      ],
      steps: [['Domanda', 'Delimita ciò che vuoi sapere.'], ['Ricerca', 'Scegli termini e strumenti adatti.'], ['Confronta', 'Verifica origine, prove e scopo.'], ['Decidi', 'Usa e cita ciò che regge al controllo.']],
      studentExample: 'Per una presentazione sulla liuteria cremonese confronta il sito di un museo, una voce enciclopedica e un post social. Individua autore, data, prove e scopo; scegli la fonte migliore e spiega perché.',
      teacherExample: 'Proponi tre fonti sullo stesso tema, una delle quali debole o fuorviante. Chiedi di rendere visibili query, criteri di confronto e motivazione della scelta, non soltanto il prodotto finale.',
      studentActivity: 'Scegli un’affermazione incontrata online. Costruisci una tabella con fonte originaria, due conferme indipendenti, data, scopo e verdetto motivato in cinque righe.',
      teacherActivity: 'Trasforma una normale ricerca in un compito di verifica: consegna una domanda controversa, una scheda di controllo e una breve restituzione orale sul processo seguito.',
      checklist: ['Ho definito la domanda', 'Conosco autore e data', 'Ho cercato la fonte originaria', 'Ho confrontato più fonti', 'So spiegare perché mi fido'],
      q: [['Qual è il primo passo di una ricerca efficace?', ['Aprire il primo risultato', 'Definire una domanda delimitata', 'Cercare una frase molto generica'], 1], ['Una fonte è affidabile soprattutto quando…', ['mostra autore, prove e riferimenti verificabili', 'ha molte immagini', 'compare per prima'], 0], ['La ricerca laterale consiste nel…', ['restare sulla stessa pagina', 'aprire altre fonti per controllare autore e affermazioni', 'leggere soltanto i commenti'], 1], ['Una risposta prodotta dall’IA…', ['è una fonte primaria', 'va verificata con fonti attendibili', 'è sempre aggiornata'], 1]]
    },
    {
      title: 'Organizzare dati e informazioni', area: 'Area 1 · Ricerca, valutazione e gestione delle informazioni', time: '16–20 min',
      intro: 'Informazioni ben raccolte ma disordinate si perdono. Organizzare significa dare struttura, rendere rintracciabile l’origine e conservare soltanto ciò che serve.',
      objectives: ['Costruire cartelle, nomi e versioni coerenti', 'Raccogliere dati con criteri dichiarati', 'Proteggere, ritrovare e citare le informazioni'],
      sections: [
        ['Una struttura che parla', 'Cartelle, etichette e nomi di file devono permettere a te e agli altri di capire subito contenuto, data e versione. Evita “finale_definitivo2”: adotta uno schema stabile, per esempio data–progetto–contenuto–versione.', ['Poche cartelle con criteri chiari.', 'Nomi coerenti e comprensibili.', 'Una posizione condivisa per la versione valida.']],
        ['Dati confrontabili', 'Una tabella è utile se ogni colonna ha un significato preciso, le unità sono uniformi e i dati mancanti sono riconoscibili. Prima di raccogliere stabilisci domanda, categorie e criterio; dopo, controlla duplicati, errori e valori anomali.', ['Non cambiare criterio durante il confronto.', 'Distingui dato grezzo e interpretazione.', 'Rappresenta i dati senza deformare le proporzioni.']],
        ['Tracciabilità e minimizzazione', 'Ogni informazione importante deve poter tornare alla propria origine. Registra autore, titolo, data, collegamento e licenza. Con dati personali, raccogli solo quelli necessari allo scopo, limita gli accessi e stabilisci quando cancellarli.', ['Annota la fonte mentre lavori.', 'Fai copie di sicurezza dei materiali essenziali.', 'Non raccogliere dati “nel caso possano servire”.']]
      ],
      steps: [['Raccogli', 'Definisci prima campi e criteri.'], ['Ordina', 'Usa nomi, cartelle e versioni coerenti.'], ['Controlla', 'Trova errori, duplicati e vuoti.'], ['Conserva', 'Proteggi il necessario, scarta il superfluo.']],
      studentExample: 'Per una ricerca crea un archivio con cartella fonti, tabella bibliografica, materiali prodotti e versioni. Un compagno deve riuscire a trovare tutto senza chiederti aiuto.',
      teacherExample: 'Per un’attività collaborativa predisponi struttura, convenzione dei nomi, permessi e criteri di conservazione. Raccogli soltanto i dati utili alla valutazione dichiarata.',
      studentActivity: 'Riordina cinque file di un compito: rinominali con uno schema comune, crea una tabella fonti e indica chiaramente quale versione consegnare.',
      teacherActivity: 'Esegui una mini-audit: quali dati raccogli, perché, chi può vederli, per quanto tempo e dove si trova la versione ufficiale dei materiali?',
      checklist: ['Uso nomi coerenti', 'Ritrovo la versione valida', 'Registro le fonti', 'Confronto dati omogenei', 'Raccolgo solo ciò che serve'],
      q: [['Un buon nome di file contiene…', ['contenuto, data o versione', 'solo “nuovo”', 'simboli casuali'], 0], ['Dati confrontabili richiedono…', ['criteri uguali e dichiarati', 'unità sempre diverse', 'solo il valore maggiore'], 0], ['Minimizzare i dati significa…', ['raccogliere tutto', 'raccogliere solo ciò che serve allo scopo', 'pubblicare l’archivio'], 1], ['La tracciabilità permette di…', ['risalire all’origine dell’informazione', 'nascondere le revisioni', 'evitare le citazioni'], 0]]
    },
    {
      title: 'Comunicare e collaborare', area: 'Area 2 · Comunicazione e collaborazione', time: '18–22 min',
      intro: 'Comunicare online è una scelta di contesto: canale, tono, pubblico, tempi, accessi e tracce devono essere coerenti con lo scopo.',
      objectives: ['Scegliere canale e registro adeguati', 'Condividere con permessi consapevoli', 'Collaborare rendendo visibili ruoli e contributi'],
      sections: [
        ['Il contesto prima del messaggio', 'Chat, mail, registro elettronico e documento condiviso non sono equivalenti. Considera urgenza, formalità, destinatari, reperibilità futura e sensibilità dei contenuti. Un messaggio efficace dichiara subito oggetto, richiesta e scadenza.', ['Usa un oggetto informativo.', 'Distingui “per conoscenza” da “serve un’azione”.', 'Rispetta orari, tono e diritto alla disconnessione.']],
        ['Condividere non è pubblicare', 'Prima di inviare un link controlla chi può accedere e con quali poteri. Dai a ciascuno il permesso minimo necessario: leggere, commentare o modificare. Ricontrolla allegati e destinatari, soprattutto con dati personali.', ['Evita link aperti se non necessari.', 'Non inoltrare contenuti privati senza consenso.', 'Gestisci identità e reputazione digitale.']],
        ['Collaborare con metodo', 'Il digitale aiuta il gruppo quando rende chiari obiettivo, ruoli, turni, scadenze e criteri di decisione. Cronologia e commenti servono a comprendere il processo. Il feedback deve essere specifico, rispettoso e orientato a un miglioramento possibile.', ['Definisci chi coordina, produce e controlla.', 'Lascia traccia delle decisioni.', 'Riconosci il contributo degli altri.']]
      ],
      steps: [['Scopo', 'Chiarisci cosa deve accadere.'], ['Canale', 'Scegli ambiente, tono e tempo.'], ['Permessi', 'Apri solo gli accessi necessari.'], ['Feedback', 'Rendi il contributo migliorabile.']],
      studentExample: 'Organizza un lavoro di gruppo con obiettivo, ruoli, scadenza, cartella condivisa e regola per i commenti. Alla fine ricostruisci una decisione usando la cronologia.',
      teacherExample: 'Progetta uno spazio collaborativo in cui consegna, ruoli, permessi, criteri di feedback e tempi di disconnessione siano espliciti fin dall’inizio.',
      studentActivity: 'Riscrivi un messaggio confuso trasformandolo in una comunicazione completa; poi configura un file con accessi diversi per autore, revisore e lettore.',
      teacherActivity: 'Crea una consegna con matrice “chi fa cosa entro quando” e una frase-modello per un feedback descrittivo e non giudicante.',
      checklist: ['Il canale è adatto', 'La richiesta è chiara', 'I permessi sono minimi', 'Ruoli e tempi sono visibili', 'Il tono rispetta le persone'],
      q: [['Prima di condividere un file controllo…', ['destinatari e permessi', 'solo il colore', 'quanti caratteri contiene'], 0], ['Un messaggio operativo indica…', ['obiettivo, azione e tempi', 'solo un saluto', 'molte abbreviazioni'], 0], ['Una buona collaborazione digitale…', ['rende visibili ruoli e decisioni', 'lascia tutto a una persona', 'elimina la cronologia'], 0], ['Il permesso minimo necessario tutela…', ['accessi e responsabilità', 'la velocità della rete', 'la dimensione del file'], 0]]
    },
    {
      title: 'Creare contenuti accessibili', area: 'Area 3 · Creazione di contenuti digitali', time: '20–25 min',
      intro: 'Un contenuto digitale è riuscito quando comunica bene, può essere usato da persone diverse e rende trasparenti fonti, licenze e trasformazioni.',
      objectives: ['Progettare una gerarchia chiara e accessibile', 'Integrare e rielaborare contenuti legalmente', 'Dichiarare fonti, licenze e uso dell’IA'],
      sections: [
        ['Progettare per chi legge', 'Parti dal messaggio essenziale e costruisci una gerarchia: titolo, sezioni, esempi, conclusione. Usa contrasto sufficiente, caratteri leggibili, spazio bianco e linguaggio diretto. Il colore non deve essere l’unico modo per distinguere un’informazione.', ['Titoli in ordine logico.', 'Testo alternativo per immagini informative.', 'Sottotitoli o trascrizioni per audio e video.']],
        ['Rielaborare, non assemblare', 'Integrare contenuti significa comprenderli e trasformarli per un nuovo scopo. Distingui citazione, parafrasi e creazione originale. “Trovato online” non vuol dire libero: verifica la licenza e attribuisci autore, opera e fonte.', ['Scegli formati modificabili e interoperabili.', 'Cita vicino al contenuto usato.', 'Non rimuovere firme o filigrane.']],
        ['IA, codice e responsabilità', 'Testi, immagini o codice generati con IA richiedono controllo umano. Verifica fatti, stereotipi, somiglianze indesiderate e accessibilità; dichiara come lo strumento ha contribuito. Se automatizzi, prova casi normali, limiti ed errori.', ['Conserva prompt e revisioni rilevanti.', 'Non inserire dati riservati senza autorizzazione.', 'La responsabilità finale resta umana.']]
      ],
      steps: [['Messaggio', 'Definisci pubblico e idea centrale.'], ['Progetto', 'Ordina testo, immagini e interazioni.'], ['Attribuisci', 'Controlla fonti e licenze.'], ['Verifica', 'Prova accessibilità, accuratezza e formato.']],
      studentExample: 'Crea una pagina su un’opera o una performance: titolo chiaro, testo breve, immagine con licenza, didascalia, testo alternativo e nota sull’eventuale uso dell’IA.',
      teacherExample: 'Riprogetta una scheda didattica per ridurre il carico superfluo: struttura prevedibile, consegne esplicite, formati accessibili e alternative equivalenti.',
      studentActivity: 'Scegli una vecchia presentazione e migliora cinque aspetti: gerarchia, contrasto, attribuzione, testo alternativo e dichiarazione delle rielaborazioni.',
      teacherActivity: 'Esegui una revisione di accessibilità su un materiale reale e prepara una versione equivalente fruibile anche senza immagini, colore o audio.',
      checklist: ['La gerarchia è chiara', 'Il contrasto è sufficiente', 'Le immagini hanno uno scopo', 'Fonti e licenze sono visibili', 'Ho verificato l’output dell’IA'],
      q: [['Il testo alternativo serve a…', ['descrivere la funzione di un’immagine', 'decorare la pagina', 'ridurre il file'], 0], ['Una licenza indica…', ['le condizioni di riuso', 'la qualità estetica', 'il numero di lettori'], 0], ['Per rendere accessibile un grafico…', ['uso anche etichette e spiegazioni testuali', 'uso soltanto colori', 'tolgo il titolo'], 0], ['Un contenuto generato con IA…', ['va verificato e dichiarato secondo il contesto', 'non richiede revisione', 'è automaticamente originale'], 0]]
    },
    {
      title: 'Proteggere dati, account e dispositivi', area: 'Area 4 · Sicurezza', time: '18–22 min',
      intro: 'La sicurezza digitale è una catena di piccole decisioni: prevenire, riconoscere segnali anomali, limitare il danno e sapere a chi rivolgersi.',
      objectives: ['Proteggere credenziali e dispositivi', 'Riconoscere phishing e manipolazioni', 'Applicare privacy, minimizzazione e procedure di risposta'],
      sections: [
        ['Difese di base', 'Usa password lunghe e diverse, meglio con un gestore affidabile, e attiva l’autenticazione a più fattori. Aggiorna sistema e applicazioni, blocca lo schermo e conserva copie di sicurezza. Le credenziali scolastiche sono personali.', ['Un account, una password diversa.', 'MFA dove disponibile.', 'Backup verificato, non soltanto dichiarato.']],
        ['Fermarsi prima di cliccare', 'Phishing e truffe sfruttano urgenza, paura, premio o autorità. Controlla indirizzo reale, dominio del link e richiesta insolita. Non usare il contatto indicato nel messaggio sospetto: verifica attraverso un canale già noto.', ['Diffida dell’urgenza artificiale.', 'Non inviare codici temporanei.', 'Segnala senza inoltrare indiscriminatamente.']],
        ['Dati personali e incidenti', 'Prima di raccogliere o condividere un dato chiedi: è necessario, per quale scopo, chi lo vede e fino a quando? Se sospetti una compromissione, limita l’accesso, cambia le credenziali da un dispositivo sicuro, avvisa il referente e conserva le evidenze.', ['Rivedi periodicamente permessi e accessi.', 'Non diffondere le prove dell’incidente.', 'Seguire la procedura è parte della competenza.']]
      ],
      steps: [['Previeni', 'Aggiorna, proteggi e fai backup.'], ['Riconosci', 'Nota urgenze e richieste insolite.'], ['Contieni', 'Limita accessi e cambia credenziali.'], ['Segnala', 'Attiva subito il canale corretto.']],
      studentExample: 'Ricevi un messaggio che chiede di “verificare subito” l’account scolastico. Non cliccare: confronta dominio, mittente e tono, poi segnala tramite il canale ufficiale.',
      teacherExample: 'Prima di usare un nuovo servizio con la classe, verifica dati richiesti, età, accessi, finalità, conservazione e possibilità di svolgere l’attività senza esporre informazioni non necessarie.',
      studentActivity: 'Controlla aggiornamenti, blocco schermo, MFA, permessi di un’app e procedura da seguire in caso di messaggio sospetto.',
      teacherActivity: 'Applica una scheda “privacy by design” a un’attività reale e riduci dati, account e condivisioni a ciò che è strettamente necessario.',
      checklist: ['Password diverse e MFA', 'Dispositivi aggiornati', 'Controllo link e mittenti', 'Permessi essenziali', 'Conosco il canale di segnalazione'],
      q: [['La protezione più solida è…', ['password unica per tutto', 'password diversa più MFA', 'codice condiviso in chat'], 1], ['Un messaggio urgente chiede la password: devo…', ['verificare con un canale ufficiale', 'rispondere subito', 'inoltrarlo a tutti'], 0], ['Minimizzare i dati significa…', ['limitarsi a quelli necessari', 'conservarli per sempre', 'renderli pubblici'], 0], ['Dopo un sospetto accesso abusivo…', ['seguo la procedura e cambio credenziali in sicurezza', 'cancello ogni prova', 'aspetto senza avvisare'], 0]]
    },
    {
      title: 'Benessere e cittadinanza digitale', area: 'Area 4 · Sicurezza', time: '18–22 min',
      intro: 'Stare bene negli ambienti digitali richiede attenzione a tempo, corpo, relazioni, reputazione, diritti e impatto ambientale.',
      objectives: ['Gestire attenzione e carico digitale', 'Agire con rispetto, consenso e responsabilità', 'Valutare impatti sociali e ambientali delle tecnologie'],
      sections: [
        ['Attenzione e autoregolazione', 'Notifiche, passaggi continui e design persuasivo frammentano l’attenzione. Osserva quando, perché e per quanto usi uno strumento; crea finestre senza notifiche, pause e confini tra lavoro e riposo. Conta la qualità dell’uso, non solo il numero di ore.', ['Alterna concentrazione e recupero.', 'Proteggi postura e sonno.', 'Chiedi aiuto se l’uso diventa incontrollabile.']],
        ['Diritti, consenso e partecipazione', 'Online valgono dignità, responsabilità e regole di convivenza. Chiedi consenso prima di pubblicare immagini o registrazioni, proteggi chi è in difficoltà e segnala contenuti dannosi. La libertà di espressione non rende accettabili molestie o odio.', ['Pensa a pubblico e permanenza della traccia.', 'Non alimentare contenuti dannosi.', 'Partecipa in modo informato, non impulsivo.']],
        ['Inclusione e sostenibilità', 'Una scelta digitale può escludere chi non ha dispositivo, connessione o condizioni adeguate. Prevedi alternative e tempi realistici. Prolunga la vita dei dispositivi e riduci archivi inutili: anche produzione, energia e smaltimento hanno un impatto.', ['Offri modalità equivalenti di accesso.', 'Ripara e riusa quando possibile.', 'Usa il digitale quando porta un beneficio reale.']]
      ],
      steps: [['Osserva', 'Riconosci abitudini e segnali.'], ['Regola', 'Crea limiti e pause sostenibili.'], ['Rispetta', 'Proteggi consenso, dignità e diritti.'], ['Riequilibra', 'Scegli alternative inclusive.']],
      studentExample: 'Per una settimana osserva un’abitudine digitale che disturba studio o riposo. Introduci una sola modifica misurabile e descrivi che cosa cambia davvero.',
      teacherExample: 'Rivedi un’attività digitale considerando attenzione, accessibilità, tempi, disponibilità dei dispositivi e alternativa non digitale equivalente.',
      studentActivity: 'Compila un diario di tre momenti: situazione, comportamento, effetto. Scegli una regola personale verificabile e confrontane l’esito.',
      teacherActivity: 'Progetta una lezione con ritmo esplicito: attivazione, uso mirato dello schermo, confronto tra pari, pausa e restituzione. Motiva ogni passaggio digitale.',
      checklist: ['Gestisco le notifiche', 'Proteggo sonno e pause', 'Chiedo consenso', 'So come segnalare', 'Considero accesso e impatto'],
      q: [['Il benessere digitale dipende…', ['solo dalle ore', 'anche da qualità, contesto e controllo', 'solo dal dispositivo'], 1], ['Prima di pubblicare una foto altrui…', ['chiedo consenso', 'la ritaglio', 'la mando in un gruppo'], 0], ['Un’attività inclusiva…', ['prevede accessi e alternative equivalenti', 'richiede lo stesso dispositivo a tutti', 'usa solo il colore'], 0], ['Una scelta sostenibile può essere…', ['prolungare la vita dei dispositivi', 'duplicare ogni file', 'sostituire sempre ciò che funziona'], 0]]
    },
    {
      title: 'Risolvere problemi con metodo', area: 'Area 5 · Individuazione e risoluzione di problemi', time: '20–25 min',
      intro: 'La competenza non è conoscere ogni strumento, ma saper definire un bisogno, scegliere, provare, leggere l’errore e trasferire ciò che si è imparato.',
      objectives: ['Diagnosticare un problema prima di agire', 'Confrontare strumenti a partire dal bisogno', 'Sperimentare, documentare e migliorare una soluzione'],
      sections: [
        ['Definire il problema', 'Descrivi risultato atteso, ciò che accade davvero e condizioni dell’errore. Raccogli messaggi, passaggi già provati e modifiche recenti. Separare sintomo e causa evita tentativi casuali e rende possibile chiedere aiuto con precisione.', ['Riproduci il problema quando è sicuro.', 'Cambia una variabile alla volta.', 'Annota evidenze, non impressioni.']],
        ['Scegliere con criteri', 'Lo strumento migliore non è il più nuovo, ma quello adeguato a scopo, persone e vincoli. Confronta accessibilità, privacy, costi, interoperabilità, affidabilità ed esportazione. Considera anche una soluzione non digitale.', ['Definisci i criteri prima del confronto.', 'Distingui requisito e preferenza.', 'Evita di dipendere da un solo formato.']],
        ['Prototipare e imparare', 'Costruisci una versione piccola, provala con casi realistici e raccogli feedback. L’errore diventa utile quando ne identifichi la causa e cambi il tentativo. Documenta la soluzione perché altri possano ripeterla e migliorarla.', ['Prova anche casi limite.', 'Spiega cosa non funziona ancora.', 'Aggiorna la procedura dopo il test.']]
      ],
      steps: [['Definisci', 'Atteso, osservato e vincoli.'], ['Ipotizza', 'Formula una causa verificabile.'], ['Prova', 'Cambia una cosa e misura.'], ['Documenta', 'Conserva esito, limiti e passo seguente.']],
      studentExample: 'Un file non si apre durante un lavoro di gruppo. Descrivi formato, dispositivo ed errore, prova una modifica alla volta e prepara una soluzione ripetibile.',
      teacherExample: 'Parti da un bisogno didattico. Confronta due opzioni e una soluzione analogica con criteri di efficacia, accessibilità, privacy e sostenibilità.',
      studentActivity: 'Scegli un problema reale, crea una scheda atteso/osservato/ipotesi/prova/esito e chiedi a un compagno di ripetere la soluzione.',
      teacherActivity: 'Realizza un prototipo di dieci minuti di un’attività digitale, provalo come studente e annota attriti, prerequisiti e piano alternativo.',
      checklist: ['Distinguo sintomo e causa', 'Cambio una variabile alla volta', 'Scelgo con criteri', 'Provo casi realistici', 'Documento soluzione e limiti'],
      q: [['Prima di tentare una soluzione…', ['definisco atteso e osservato', 'cambio tutto insieme', 'ignoro l’errore'], 0], ['Uno strumento è adatto quando…', ['risponde al bisogno e ai vincoli', 'è il più nuovo', 'ha più funzioni'], 0], ['Un prototipo serve a…', ['provare presto e raccogliere feedback', 'evitare controlli', 'nascondere i limiti'], 0], ['Un errore è informativo quando…', ['ne osservo causa ed effetto', 'lo ripeto identico', 'cancello ogni traccia'], 0]]
    },
    {
      title: 'Usare l’IA con responsabilità', area: 'Competenza IA trasversale alle 5 aree DigComp 3.0', time: '22–28 min',
      intro: 'DigComp 3.0 integra l’intelligenza artificiale in tutte le 21 competenze: comprenderla, usarla e valutarla è una responsabilità trasversale, non un capitolo isolato.',
      objectives: ['Capire che cosa può e non può fare un sistema di IA', 'Progettare richieste e verificare gli output', 'Mantenere agency, trasparenza, equità e supervisione umana'],
      sections: [
        ['Un sistema probabilistico, non un oracolo', 'L’IA generativa produce risposte plausibili da regolarità apprese nei dati: può inventare fatti, citazioni o collegamenti. I risultati dipendono da dati, progetto, contesto e richiesta; fluidità e sicurezza del tono non dimostrano accuratezza.', ['Distingui generazione, ricerca e decisione.', 'Chiedi evidenze verificabili.', 'Non attribuire intenzioni umane al sistema.']],
        ['Prompt, confronto e verifica', 'Una buona richiesta specifica obiettivo, contesto, destinatario, vincoli e formato. Lavora per iterazioni: ottieni una bozza, individua lacune, chiedi alternative e confronta con fonti indipendenti. Per compiti importanti stabilisci prima i criteri.', ['Non inserire dati personali o riservati.', 'Controlla fatti, calcoli, citazioni e omissioni.', 'Conserva il tuo ragionamento, non solo l’output.']],
        ['Agency e responsabilità', 'L’IA può sostenere ideazione, spiegazione, traduzione e revisione, ma non deve sostituire il giudizio. Considera bias, persone penalizzate, diritto d’autore e accessibilità. Dichiara l’uso e assicurati di poter spiegare il prodotto finale.', ['Decidi prima quali fasi delegare.', 'Mantieni una fase personale senza IA.', 'Rivedi, modifica e attribuisci responsabilmente.']]
      ],
      steps: [['Intenzione', 'Decidi perché l’IA serve.'], ['Istruzione', 'Dai contesto, vincoli e formato.'], ['Verifica', 'Controlla fatti, bias e omissioni.'], ['Responsabilità', 'Rielabora, dichiara e mantieni il controllo.']],
      studentExample: 'Scrivi prima una risposta con le tue idee. Chiedi poi all’IA una proposta alternativa, verifica due affermazioni e annota che cosa hai accettato, corretto o rifiutato.',
      teacherExample: 'Progetta un compito con tre evidenze: fase personale, confronto dichiarato con l’IA e difesa orale delle revisioni. Valuta il processo, non solo l’eleganza dell’output.',
      studentActivity: 'Prepara una prima versione, confrontala con un output IA, marca conferme/errori/aggiunte e scrivi una nota di trasparenza.',
      teacherActivity: 'Definisci per una consegna reale: uso consentito, uso vietato, evidenze richieste, criteri di verifica e prova della padronanza personale.',
      checklist: ['So perché uso l’IA', 'Non inserisco dati riservati', 'Verifico fatti e fonti', 'Cerco bias e assenze', 'Dichiaro l’uso e rispondo del risultato'],
      q: [['DigComp 3.0 tratta l’IA…', ['solo nell’area problemi', 'trasversalmente nelle 21 competenze', 'come sostituto del giudizio'], 1], ['Un output convincente…', ['può comunque essere errato', 'è automaticamente verificato', 'è sempre una fonte'], 0], ['Un buon prompt include…', ['obiettivo, contesto, vincoli e formato', 'soltanto una parola', 'dati personali non necessari'], 0], ['Mantenere agency significa…', ['comprendere, scegliere e restare responsabili', 'delegare ogni decisione', 'nascondere l’uso dell’IA'], 0]]
    }
  ];

  const glossary = [['Fonte primaria', 'Documento o dato direttamente legato al fenomeno osservato.'], ['Ricerca laterale', 'Controllo di una fonte aprendo altre fonti indipendenti.'], ['Licenza', 'Condizioni con cui un contenuto può essere riusato.'], ['Accessibilità', 'Progettazione utilizzabile da persone e dispositivi diversi.'], ['Dato personale', 'Informazione che identifica o rende identificabile una persona.'], ['Phishing', 'Tentativo di sottrarre dati simulando un mittente affidabile.'], ['Bias', 'Distorsione sistematica nei dati, nel processo o nel risultato.'], ['IA generativa', 'Sistema che produce contenuti da istruzioni e dati: va verificato.'], ['Agency', 'Capacità di comprendere, scegliere e mantenere il controllo delle proprie azioni.'], ['Minimizzazione', 'Raccolta dei soli dati necessari a uno scopo dichiarato.'], ['Interoperabilità', 'Capacità di sistemi e formati diversi di scambiare e usare dati.'], ['MFA', 'Autenticazione che richiede più di un fattore di verifica.']];
  const answers = { alunno: {}, docente: {} };
  let role = localStorage.getItem('stradivari-profile') || 'alunno';
  let currentModule = 0;

  function renderDig() {
    const grid = profiles[role];
    document.getElementById('digTitle').textContent = role === 'docente' ? 'DigComp per il docente' : 'La tua bussola DigComp';
    document.getElementById('digLead').textContent = role === 'docente' ? 'Dieci indicatori per rileggere progettazione, collaborazione, contenuti, tutela e scelte tecnologiche.' : 'Dieci indicatori per rileggere come cerchi, collabori, crei, ti proteggi e risolvi problemi.';
    document.getElementById('digGrid').innerHTML = grid.map((area, areaIndex) => `<article class="dig-card"><h3>${areaIndex + 1}. ${area[0]}</h3>${area[1].map((indicator, indicatorIndex) => { const key = `${areaIndex}-${indicatorIndex}`; return `<div class="dig-indicator"><p>${indicator}</p><div class="level">${levels.map((label, levelIndex) => `<label><input type="radio" name="dig-${role}-${key}" value="${levelIndex}" ${answers[role][key] === levelIndex ? 'checked' : ''}><span>${label}</span></label>`).join('')}</div></div>`; }).join('')}</article>`).join('');
  }

  function renderCourse() {
    document.getElementById('courseMap').innerHTML = lessons.map((lesson, index) => `<button class="module-btn ${index === currentModule ? 'active' : ''}" data-module="${index}" aria-label="Apri il capitolo ${index + 1}: ${lesson.title}"><b>CAPITOLO ${String(index + 1).padStart(2, '0')}</b><span>${lesson.title}</span><small>${lesson.time}</small></button>`).join('');
    document.getElementById('glossary').innerHTML = glossary.map(item => `<div class="term"><b>${item[0]}</b>${item[1]}</div>`).join('');
    renderLesson(currentModule, false);
  }

  function renderLesson(index, updateHash = true) {
    currentModule = Math.max(0, Math.min(lessons.length - 1, index));
    document.querySelectorAll('.module-btn').forEach((button, buttonIndex) => button.classList.toggle('active', buttonIndex === currentModule));
    const lesson = lessons[currentModule];
    const isTeacher = role === 'docente';
    document.getElementById('lesson').innerHTML = `
      <article class="lesson-page" aria-labelledby="lesson-title">
        <header class="lesson-cover">
          <div class="lesson-progress" aria-label="Capitolo ${currentModule + 1} di ${lessons.length}"><i style="width:${(currentModule + 1) / lessons.length * 100}%"></i></div>
          <div class="kicker">Capitolo ${currentModule + 1} di ${lessons.length} · ${lesson.time}</div>
          <h3 id="lesson-title">${lesson.title}</h3><p>${lesson.intro}</p>
          <div class="lesson-meta"><span>${lesson.area}</span><span>Profilo ${isTeacher ? 'docente' : 'alunno'}</span></div>
        </header>
        <section class="lesson-objectives"><div><div class="kicker">Traguardi</div><h4>Alla fine saprai…</h4></div><ol>${lesson.objectives.map(item => `<li>${item}</li>`).join('')}</ol></section>
        <div class="chapter-index" aria-label="Indice del capitolo">${lesson.sections.map((section, sectionIndex) => `<a href="#lesson-${currentModule}-${sectionIndex}">${sectionIndex + 1}. ${section[0]}</a>`).join('')}</div>
        <div class="lesson-body">${lesson.sections.map((section, sectionIndex) => `<section class="lesson-section" id="lesson-${currentModule}-${sectionIndex}"><div class="section-number">0${sectionIndex + 1}</div><div><h4>${section[0]}</h4><p>${section[1]}</p><ul>${section[2].map(item => `<li>${item}</li>`).join('')}</ul></div></section>`).join('')}</div>
        <section class="infographic"><div class="infographic-head"><div class="kicker">Sintesi infografica</div><h4>Il metodo in quattro mosse</h4></div><div class="infographic-flow">${lesson.steps.map((step, stepIndex) => `<div class="infographic-step"><span>${stepIndex + 1}</span><b>${step[0]}</b><small>${step[1]}</small></div>`).join('')}</div></section>
        <section class="role-example"><div class="role-example-label">Caso guidato · prospettiva ${isTeacher ? 'docente' : 'alunno'}</div><h4>${isTeacher ? 'Portalo nella progettazione' : 'Provalo su un compito vero'}</h4><p>${isTeacher ? lesson.teacherExample : lesson.studentExample}</p></section>
        <section class="activity lesson-lab"><div><div class="kicker">Laboratorio · in autonomia</div><h4>${isTeacher ? 'Esercitazione per il docente' : 'Esercitazione per l’alunno'}</h4></div><p>${isTeacher ? lesson.teacherActivity : lesson.studentActivity}</p><div class="lab-output"><b>Prodotto atteso</b> Una breve evidenza del processo: decisioni, controlli eseguiti, risultato e un possibile miglioramento.</div><div class="self-guided-note"><b>Controllo finale</b> Prima di passare oltre, rileggi il prodotto, confrontalo con i criteri del capitolo e annota una cosa riuscita e una da migliorare.</div></section>
        <section class="takeaway"><div><div class="kicker">Prima di proseguire</div><h4>Checklist del capitolo</h4></div><div class="takeaway-grid">${lesson.checklist.map(item => `<label><input type="checkbox"><span>${item}</span></label>`).join('')}</div></section>
        <section class="quiz"><div class="quiz-heading"><div><div class="kicker">Verifica formativa</div><h4>Quattro domande per controllarti</h4></div><span>Nessun voto: usa il feedback per rileggere.</span></div>${lesson.q.map((question, questionIndex) => `<div class="quiz-question"><p>${questionIndex + 1}. ${question[0]}</p>${question[1].map((option, optionIndex) => `<label><input type="radio" name="course-${currentModule}-${questionIndex}" value="${optionIndex}"><span>${option}</span></label>`).join('')}<button class="btn secondary" data-check-course="${currentModule}-${questionIndex}">Verifica risposta</button><div class="quiz-feedback" id="course-feedback-${currentModule}-${questionIndex}" aria-live="polite"></div></div>`).join('')}</section>
        <p class="source-note">Adattamento didattico a cura di StradiLab, basato sul <a href="https://joint-research-centre.ec.europa.eu/scientific-activities/key-competences-lifelong-learning/digital-competence-framework-digcomp/digcomp-30_en" target="_blank" rel="noopener">quadro ufficiale DigComp 3.0</a>, Commissione europea – JRC (2025). Contenuti sintetizzati e contestualizzati per la scuola; la Commissione europea non è responsabile dell’adattamento.</p>
        <nav class="lesson-nav" aria-label="Navigazione tra i capitoli"><button class="btn secondary" data-course-nav="${currentModule - 1}" ${currentModule === 0 ? 'disabled' : ''}>← Capitolo precedente</button><span>${currentModule + 1} / ${lessons.length}</span><button class="btn" data-course-nav="${currentModule + 1}" ${currentModule === lessons.length - 1 ? 'disabled' : ''}>Capitolo successivo →</button></nav>
      </article>`;
    if (updateHash) history.replaceState(null, '', `#corso-${currentModule + 1}`);
  }

  document.getElementById('digGrid').addEventListener('change', event => {
    const match = event.target.name?.match(/^dig-(alunno|docente)-(\d+-\d+)$/);
    if (!match) return;
    answers[match[1]][match[2]] = Number(event.target.value);
    document.dispatchEvent(new CustomEvent('stradivari-progress'));
  });
  document.getElementById('digDone').addEventListener('click', () => {
    const values = Object.values(answers[role]);
    if (values.length < 10) { alert('Completa tutti i dieci indicatori DigComp del profilo scelto.'); return; }
    const average = values.reduce((a, b) => a + b, 0) / values.length;
    const names = ['Da costruire', 'Con guida', 'In autonomia', 'So guidare altri'];
    const result = document.getElementById('digResult');
    result.innerHTML = `<strong>Livello prevalente: ${names[Math.round(average)]}</strong><br>Media ${average.toFixed(1)}/3 sul profilo ${role}. Il risultato serve per scegliere il prossimo modulo da allenare.`;
    result.classList.add('show');
  });
  document.getElementById('courseMap').addEventListener('click', event => {
    const button = event.target.closest('[data-module]');
    if (button) renderLesson(Number(button.dataset.module));
  });
  document.getElementById('lesson').addEventListener('click', event => {
    const nav = event.target.closest('[data-course-nav]');
    if (nav && !nav.disabled) {
      renderLesson(Number(nav.dataset.courseNav));
      document.getElementById('lesson').scrollIntoView({ behavior: 'smooth', block: 'start' });
      return;
    }
    const button = event.target.closest('[data-check-course]');
    if (!button) return;
    const [moduleIndex, questionIndex] = button.dataset.checkCourse.split('-').map(Number);
    const checked = document.querySelector(`input[name="course-${moduleIndex}-${questionIndex}"]:checked`);
    const feedback = document.getElementById(`course-feedback-${moduleIndex}-${questionIndex}`);
    if (!checked) { feedback.textContent = 'Scegli una risposta prima di verificare.'; feedback.dataset.state = 'error'; return; }
    const correct = Number(checked.value) === lessons[moduleIndex].q[questionIndex][2];
    feedback.textContent = correct ? 'Corretto: il criterio è applicato bene.' : 'Riprova: rileggi il nucleo del capitolo e cerca la scelta più verificabile e responsabile.';
    feedback.dataset.state = correct ? 'correct' : 'error';
    document.dispatchEvent(new CustomEvent('stradivari-progress'));
  });
  document.addEventListener('profilechange', event => {
    role = event.detail.role;
    renderDig(); renderCourse();
    document.getElementById('digResult').classList.remove('show');
  });

  window.StradivariDig = { completed: () => Object.keys(answers.alunno).length + Object.keys(answers.docente).length, total: 20 };
  window.StradivariCourse = { openModule: (index, updateHash = false) => renderLesson(index, updateHash), total: lessons.length };
  renderDig(); renderCourse();
})();
