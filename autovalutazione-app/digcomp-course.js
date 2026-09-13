(() => {
  const escapeHtml = value => String(value ?? '').replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' }[char]));
  const levels = ['Da costruire', 'Con guida', 'In autonomia', 'Guido altri'];
  const profiles = {
    alunno: [
      ['Informazione e dati', ['Formulo ricerche precise e confronto autore, data, scopo e prove.', 'Organizzo fonti e dati in modo da poterli ritrovare e citare.', 'Riconosco contenuti manipolati e distinguo fatti, opinioni e pubblicità.']],
      ['Comunicazione e collaborazione', ['Scelgo canale, tono e destinatari adatti.', 'Collaboro online rispettando ruoli, identità e contributi.', 'Condivido file e messaggi controllando permessi, privacy e tracce digitali.']],
      ['Creazione di contenuti', ['Creo e rielaboro contenuti accessibili in formati diversi.', 'Cito fonti e licenze e dichiaro l’eventuale uso dell’IA.', 'Adatto testo, immagini, audio e video allo scopo e al pubblico.']],
      ['Sicurezza e benessere', ['Proteggo account, dati personali e dispositivi.', 'Gestisco attenzione, tempo, reputazione e impatto ambientale.', 'Riconosco phishing, richieste anomale e situazioni che richiedono aiuto.']],
      ['Risoluzione di problemi', ['Definisco il bisogno, provo soluzioni e imparo dagli errori.', 'Valuto criticamente strumenti digitali e risposte dell’IA.', 'Scelgo strumenti accessibili e trasferisco ciò che ho imparato a un caso nuovo.']]
    ],
    docente: [
      ['Informazione e dati', ['Seleziono fonti affidabili per progettare attività e materiali.', 'Organizzo dati didattici nel rispetto di finalità, minimizzazione e trasparenza.', 'Rendo verificabili fonti, criteri di selezione e limiti dei materiali.']],
      ['Comunicazione e collaborazione', ['Progetto ambienti e consegne digitali chiari e inclusivi.', 'Collaboro con colleghi e studenti rendendo visibili ruoli e feedback.', 'Definisco permessi, canali, tempi di risposta e alternative di accesso.']],
      ['Creazione di contenuti', ['Produco materiali accessibili, riusabili e coerenti con gli obiettivi.', 'Gestisco diritto d’autore, licenze e dichiarazione dell’uso dell’IA.', 'Verifico leggibilità, interoperabilità e adeguatezza dei contenuti per destinatari diversi.']],
      ['Sicurezza e benessere', ['Tutelo dati, account e dispositivi nelle attività didattiche.', 'Progetto un uso equilibrato del digitale e prevengo esclusione e sovraccarico.', 'Applico minimizzazione, gestione degli incidenti e valutazione dei rischi.']],
      ['Risoluzione di problemi', ['Scelgo tecnologie a partire dal bisogno didattico, non dallo strumento.', 'Valuto limiti, bias e impatto dell’IA e mantengo supervisione umana.', 'Progetto prove, feedback e alternative per migliorare una soluzione didattica.']]
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

  const teacherQuestions = [
    ['Una ricerca digitale ben formulata parte da…', ['un tema molto ampio', 'una domanda delimitata e un bisogno informativo', 'il primo risultato del motore di ricerca'], 1, 'Informazione e dati'],
    ['Per valutare una fonte è utile controllare…', ['autore, data, scopo e prove', 'solo il numero di immagini', 'la posizione nella pagina'], 0, 'Informazione e dati'],
    ['La ricerca laterale consiste nel…', ['leggere più volte la stessa pagina', 'confrontare fonti indipendenti per verificare autore e contenuto', 'usare sempre lo stesso motore'], 1, 'Informazione e dati'],
    ['Una buona organizzazione dei dati richiede…', ['criteri, nomi e versioni coerenti', 'file chiamati “finale definitivo”', 'cartelle senza struttura'], 0, 'Informazione e dati'],
    ['La minimizzazione dei dati significa…', ['raccogliere ogni informazione possibile', 'raccogliere solo i dati necessari allo scopo dichiarato', 'pubblicare i dati per trasparenza'], 1, 'Informazione e dati'],
    ['Quando si usa un contenuto prodotto dall’IA, il docente deve…', ['considerarlo automaticamente corretto', 'verificare attendibilità, limiti e adeguatezza al contesto', 'eliminare ogni traccia del processo'], 1, 'Informazione e dati'],
    ['Prima di scegliere un canale digitale per una consegna occorre considerare…', ['solo la velocità', 'scopo, destinatari, tono, accessibilità e tracciabilità', 'il canale più nuovo'], 1, 'Comunicazione e collaborazione'],
    ['Condividere un documento in modo responsabile significa…', ['aprire il link a chiunque', 'assegnare a ciascuno il permesso minimo necessario', 'lasciare sempre tutti come editor'], 1, 'Comunicazione e collaborazione'],
    ['Una consegna digitale inclusiva dovrebbe…', ['dare istruzioni chiare e prevedere alternative equivalenti', 'presupporre lo stesso dispositivo per tutti', 'usare solo video'], 0, 'Comunicazione e collaborazione'],
    ['La collaborazione è documentabile quando…', ['ruoli e decisioni restano visibili nel processo', 'una sola persona svolge tutto', 'si cancella la cronologia'], 0, 'Comunicazione e collaborazione'],
    ['Un feedback formativo efficace è…', ['generico e riferito alla persona', 'specifico, rispettoso e collegato a criteri osservabili', 'dato solo alla fine dell’anno'], 1, 'Comunicazione e collaborazione'],
    ['Per tutelare la reputazione digitale degli studenti è importante…', ['pubblicare sempre i loro lavori con nome completo', 'definire pubblico, consenso e permanenza della condivisione', 'usare account condivisi'], 1, 'Comunicazione e collaborazione'],
    ['Un materiale accessibile usa…', ['gerarchia dei titoli, contrasto adeguato e alternative testuali', 'solo colori per distinguere le informazioni', 'testo piccolo per contenere tutto'], 0, 'Creazione di contenuti'],
    ['Una licenza indica…', ['come e a quali condizioni un contenuto può essere riusato', 'quanto è bello un contenuto', 'quanti studenti lo hanno visto'], 0, 'Creazione di contenuti'],
    ['La citazione di una fonte serve a…', ['rendere riconoscibile l’origine e verificabile il contenuto', 'sostituire la comprensione', 'rendere il testo più lungo'], 0, 'Creazione di contenuti'],
    ['Un’attività didattica con IA dovrebbe mantenere…', ['una fase di giudizio e responsabilità umana', 'la delega completa delle decisioni', 'l’assenza di dichiarazioni'], 0, 'Creazione di contenuti'],
    ['Per controllare un’immagine informativa è utile fornire…', ['un testo alternativo che ne espliciti funzione e significato', 'solo il nome del file', 'una didascalia vuota'], 0, 'Creazione di contenuti'],
    ['Interoperabilità significa che…', ['formati e sistemi diversi possono scambiare e usare dati', 'ogni file funziona solo in un programma', 'i dati non possono essere esportati'], 0, 'Creazione di contenuti'],
    ['Una password sicura per un account scolastico dovrebbe essere…', ['riutilizzata per comodità', 'lunga, unica e accompagnata da MFA quando possibile', 'condivisa con la classe'], 1, 'Sicurezza e benessere'],
    ['Davanti a una richiesta urgente di credenziali il docente dovrebbe…', ['verificare il mittente tramite un canale già noto', 'rispondere subito dal link ricevuto', 'inoltrare il messaggio a tutta la classe'], 0, 'Sicurezza e benessere'],
    ['In caso di sospetto incidente digitale è corretto…', ['cancellare ogni evidenza', 'limitare il danno, seguire la procedura e avvisare il referente', 'aspettare per vedere se passa'], 1, 'Sicurezza e benessere'],
    ['Un uso equilibrato del digitale considera…', ['solo il numero di ore', 'attenzione, pause, accessibilità, relazioni e contesto', 'soltanto il dispositivo usato'], 1, 'Sicurezza e benessere'],
    ['Per una scelta digitale sostenibile è utile…', ['prolungare la vita dei dispositivi e ridurre duplicati inutili', 'sostituire ogni anno ciò che funziona', 'conservare tutti i file per sempre'], 0, 'Sicurezza e benessere'],
    ['Privacy by design significa…', ['considerare protezione e minimizzazione fin dalla progettazione', 'aggiungere una privacy policy alla fine', 'raccogliere dati prima di definire lo scopo'], 0, 'Sicurezza e benessere'],
    ['Prima di risolvere un problema tecnico è utile distinguere…', ['sintomo, risultato atteso e causa ipotizzata', 'solo il programma più recente', 'chi ha commesso l’errore'], 0, 'Risoluzione di problemi'],
    ['Per confrontare due strumenti digitali è meglio definire prima…', ['criteri legati a bisogno, accessibilità, privacy e sostenibilità', 'il colore dell’interfaccia', 'quello usato dalla maggioranza'], 0, 'Risoluzione di problemi'],
    ['Cambiare una variabile alla volta permette di…', ['capire quale modifica produce un effetto', 'rendere il problema più confuso', 'evitare di documentare'], 0, 'Risoluzione di problemi'],
    ['Un buon prototipo didattico serve a…', ['provare presto una soluzione e raccogliere feedback', 'dimostrare che non servono revisioni', 'nascondere i limiti'], 0, 'Risoluzione di problemi'],
    ['Valutare criticamente un sistema di IA significa anche considerare…', ['bias, omissioni, fonti, impatto e responsabilità', 'solo la fluidità della risposta', 'solo la velocità di generazione'], 0, 'Risoluzione di problemi']
  ];

  const glossary = [['Fonte primaria', 'Documento o dato direttamente legato al fenomeno osservato.'], ['Ricerca laterale', 'Controllo di una fonte aprendo altre fonti indipendenti.'], ['Licenza', 'Condizioni con cui un contenuto può essere riusato.'], ['Accessibilità', 'Progettazione utilizzabile da persone e dispositivi diversi.'], ['Dato personale', 'Informazione che identifica o rende identificabile una persona.'], ['Phishing', 'Tentativo di sottrarre dati simulando un mittente affidabile.'], ['Bias', 'Distorsione sistematica nei dati, nel processo o nel risultato.'], ['IA generativa', 'Sistema che produce contenuti da istruzioni e dati: va verificato.'], ['Agency', 'Capacità di comprendere, scegliere e mantenere il controllo delle proprie azioni.'], ['Minimizzazione', 'Raccolta dei soli dati necessari a uno scopo dichiarato.'], ['Interoperabilità', 'Capacità di sistemi e formati diversi di scambiare e usare dati.'], ['MFA', 'Autenticazione che richiede più di un fattore di verifica.']];
  const advancedGlossary = [
    {
      title: '1. Fondamenti di intelligenza artificiale',
      description: 'Le parole necessarie per capire che cosa produce un sistema di IA e come lo fa.',
      terms: [
        ['Algoritmo', 'Sequenza di regole o istruzioni usata per trasformare dati in un risultato.'],
        ['Machine learning', 'Metodo con cui un sistema riconosce regolarità nei dati e migliora un compito senza ricevere ogni regola già scritta.'],
        ['Modello', 'Sistema matematico addestrato sui dati per classificare, prevedere o generare contenuti.'],
        ['IA generativa', 'Tecnologia che produce testo, immagini, audio, video o codice a partire da istruzioni e contesto.'],
        ['LLM', 'Large Language Model: modello linguistico addestrato su grandi quantità di testo per elaborare e generare linguaggio.'],
        ['Token', 'Piccola unità di testo elaborata da un modello: può essere una parola, una parte di parola o un segno.'],
        ['Prompt', 'Istruzione data a un sistema di IA, possibilmente completa di obiettivo, contesto, vincoli e formato atteso.'],
        ['Finestra di contesto', 'Quantità massima di testo e informazioni che un modello può considerare durante una singola elaborazione.']
      ]
    },
    {
      title: '2. Affidabilità e uso responsabile',
      description: 'Concetti per valutare risposte, rischi e responsabilità.',
      terms: [
        ['Allucinazione', 'Risposta plausibile ma falsa, inventata o non sostenuta da prove prodotta da un sistema di IA.'],
        ['Bias', 'Distorsione sistematica presente nei dati, nelle regole o nei risultati, capace di favorire o penalizzare persone e prospettive.'],
        ['Grounding', 'Collegamento della risposta a dati o fonti definite, per ridurre affermazioni non verificabili.'],
        ['Guardrail', 'Regola o controllo tecnico che limita comportamenti rischiosi, contenuti inappropriati o azioni non autorizzate.'],
        ['Human in the loop', 'Processo in cui una persona controlla, corregge o autorizza i passaggi importanti compiuti dal sistema.'],
        ['Prompt injection', 'Istruzione nascosta o malevola che tenta di far ignorare al sistema le regole o di ottenere dati e azioni non consentiti.'],
        ['Trasparenza', 'Possibilità di sapere quando è stata usata l’IA, con quali dati, per quale scopo e con quali limiti.'],
        ['Tracciabilità', 'Capacità di ricostruire fonti, passaggi, versioni e decisioni che hanno prodotto un risultato.']
      ]
    },
    {
      title: '3. RAG, agenti e automazioni',
      description: 'Come un sistema collega conoscenze, strumenti e azioni.',
      terms: [
        ['RAG', 'Retrieval-Augmented Generation: prima recupera informazioni da fonti selezionate, poi le usa per costruire la risposta.'],
        ['Embedding', 'Rappresentazione numerica di un contenuto che permette di confrontarne il significato con altri contenuti.'],
        ['Database vettoriale', 'Archivio ottimizzato per cercare contenuti simili attraverso gli embedding, spesso impiegato nei sistemi RAG.'],
        ['Agente IA', 'Sistema che riceve un obiettivo, pianifica passaggi, usa strumenti e controlla i risultati con un certo grado di autonomia.'],
        ['Tool calling', 'Capacità di un modello di richiamare uno strumento esterno, per esempio una ricerca, un calendario o un database.'],
        ['Workflow', 'Sequenza definita di attività, decisioni e controlli che porta da un input a un risultato.'],
        ['Loop engineering / ciclo agentico', 'Progettazione del ciclo osserva, pianifica, agisci e verifica, ripetuto finché il risultato soddisfa i criteri o richiede intervento umano.'],
        ['Orchestrazione', 'Coordinamento di più modelli, agenti, strumenti o fasi affinché collaborino senza perdere obiettivo e controlli.']
      ]
    },
    {
      title: '4. Dati, codice e infrastruttura',
      description: 'Il lessico di base per capire come sono costruiti i servizi digitali.',
      terms: [
        ['Dato', 'Rappresentazione di un fatto, una misura o un’informazione che può essere raccolta, elaborata e interpretata.'],
        ['Database', 'Archivio strutturato che consente di conservare, cercare, aggiornare e collegare dati.'],
        ['SQL', 'Linguaggio usato per interrogare e modificare database relazionali organizzati in tabelle.'],
        ['Python', 'Linguaggio di programmazione molto usato per automazione, analisi dei dati, didattica e intelligenza artificiale.'],
        ['API', 'Interfaccia che permette a programmi diversi di scambiarsi richieste e risultati secondo regole definite.'],
        ['JSON', 'Formato testuale leggero usato per rappresentare e scambiare dati strutturati tra applicazioni.'],
        ['Cloud', 'Uso di risorse informatiche remote via Internet per eseguire programmi, archiviare dati o offrire servizi.'],
        ['Open source', 'Software il cui codice sorgente può essere studiato, riusato e modificato secondo la licenza prevista.']
      ]
    },
    {
      title: '5. Strumenti, integrazioni e accessi',
      description: 'Termini che ricorrono quando applicazioni e account scolastici lavorano insieme.',
      terms: [
        ['Skill', 'Pacchetto di istruzioni e risorse che specializza un assistente nello svolgimento di un determinato compito.'],
        ['Connettore', 'Collegamento autorizzato che consente a un’applicazione di leggere o usare funzioni e dati di un altro servizio.'],
        ['Plugin', 'Componente aggiuntivo che estende un programma con nuove funzioni, strumenti o integrazioni.'],
        ['OAuth', 'Protocollo che autorizza un servizio ad accedere a funzioni limitate di un altro account senza condividere la password.'],
        ['SSO', 'Single Sign-On: accesso a più servizi mediante una sola identità, per esempio l’account scolastico.'],
        ['Webhook', 'Messaggio automatico inviato da un servizio a un altro quando accade un evento stabilito.'],
        ['Sandbox', 'Ambiente isolato in cui eseguire codice o prove riducendo i rischi per dati e sistemi reali.'],
        ['Permesso', 'Autorizzazione specifica concessa a una persona o applicazione per leggere, modificare o condividere una risorsa.']
      ]
    },
    {
      title: '6. Progettazione e qualità dell’esperienza',
      description: 'Parole utili per creare strumenti digitali chiari, inclusivi e verificabili.',
      terms: [
        ['UI', 'User Interface: ciò che una persona vede e usa, come testi, menu, pulsanti, campi e colori.'],
        ['UX', 'User Experience: qualità complessiva dell’esperienza, compresi chiarezza, facilità, tempi, errori e soddisfazione.'],
        ['UI/UX design', 'Progettazione coordinata dell’interfaccia e del percorso d’uso a partire dai bisogni reali delle persone.'],
        ['Accessibilità', 'Progettazione che rende contenuti e funzioni utilizzabili anche con disabilità, tecnologie assistive e condizioni diverse.'],
        ['Usabilità', 'Misura di quanto uno strumento permetta di raggiungere uno scopo in modo efficace, efficiente e comprensibile.'],
        ['Prototipo', 'Versione iniziale e ridotta di una soluzione, costruita per provarla e migliorarla prima della realizzazione definitiva.'],
        ['Design responsivo', 'Interfaccia che adatta struttura e controlli a telefono, tablet, computer e diverse dimensioni del testo.'],
        ['Interoperabilità', 'Capacità di strumenti e formati differenti di scambiare dati e continuare a utilizzarli correttamente.']
      ]
    }
  ];
  const answers = { alunno: {}, docente: {} };
  let role = localStorage.getItem('stradivari-profile') || 'alunno';
  let currentModule = 0;
  let lastResult = null;
  let teacherTestAnswers = Array(teacherQuestions.length).fill(null);
  let teacherTestResult = null;

  function renderDig() {
    const grid = profiles[role];
    document.getElementById('digTitle').textContent = role === 'docente' ? 'DigComp per il docente' : 'La tua bussola DigComp';
    document.getElementById('digLead').textContent = role === 'docente' ? 'Quindici indicatori per rileggere progettazione, collaborazione, contenuti, tutela e scelte tecnologiche.' : 'Quindici indicatori per rileggere come cerchi, collabori, crei, ti proteggi e risolvi problemi.';
    document.getElementById('digGrid').innerHTML = grid.map((area, areaIndex) => `<article class="dig-card"><h3>${areaIndex + 1}. ${area[0]}</h3>${area[1].map((indicator, indicatorIndex) => { const key = `${areaIndex}-${indicatorIndex}`; return `<div class="dig-indicator"><p>${indicator}</p><div class="level">${levels.map((label, levelIndex) => `<label><input type="radio" name="dig-${role}-${key}" value="${levelIndex}" ${answers[role][key] === levelIndex ? 'checked' : ''}><span>${label}</span></label>`).join('')}</div></div>`; }).join('')}</article>`).join('');
  }

  function renderCourse() {
    document.getElementById('courseMap').innerHTML = lessons.map((lesson, index) => `<button class="module-btn ${index === currentModule ? 'active' : ''}" data-module="${index}" aria-label="Apri il capitolo ${index + 1}: ${lesson.title}"><b>CAPITOLO ${String(index + 1).padStart(2, '0')}</b><span>${lesson.title}</span><small>${lesson.time}</small></button>`).join('');
    document.getElementById('glossary').innerHTML = glossary.map(item => `<div class="term"><b>${item[0]}</b>${item[1]}</div>`).join('');
    document.getElementById('advancedGlossaryGroups').innerHTML = advancedGlossary.map(group => `<section class="advanced-glossary-group"><div class="advanced-glossary-group-head"><h4>${group.title}</h4><p>${group.description}</p></div><div class="advanced-terms">${group.terms.map(item => `<div class="advanced-term"><b>${item[0]}</b><span>${item[1]}</span></div>`).join('')}</div></section>`).join('');
    renderLesson(currentModule, false);
    renderTeacherTest();
  }

  function renderTeacherTest() {
    const section = document.getElementById('teacherCourseTest');
    if (!section) return;
    section.hidden = role !== 'docente';
    if (role !== 'docente') return;
    const passed = teacherTestResult?.correct >= 21;
    const authenticated = Boolean(window.StradivariTeacherAuth?.verified);
    const certificate = passed ? (authenticated
      ? `<div class="teacher-certificate-ready"><div><span>Attestazione disponibile</span><strong>Corso di aggiornamento DigComp 3.0 · 4 ore</strong><p>Il PDF riporterà intestazione dell’Istituto, identità del docente, data, durata ed esito della verifica.</p></div><button class="btn teacher-certificate-btn" id="teacherCertificatePdf" type="button">Crea attestato PDF</button></div>`
      : `<div class="teacher-certificate-login"><strong>Verifica superata.</strong><p>Per creare l’attestazione nominale accedi con l’account istituzionale autorizzato. Il corso resta liberamente accessibile anche agli esterni.</p></div>`) : '';
    const result = teacherTestResult ? `<div class="teacher-test-result ${teacherTestResult.status}"><strong>${teacherTestResult.correct}/30 risposte esatte</strong><span>${teacherTestResult.message}</span><small>${teacherTestResult.status === 'fail' ? 'Rileggi i capitoli indicati e riprova.' : 'Esito registrato in questa sessione.'}</small></div>${certificate}` : '';
    document.getElementById('teacherTestContent').innerHTML = `<div class="teacher-test-meta"><span>0–20: insufficiente</span><span>21–25: superato</span><span>26–30: avanzato</span><b>${teacherTestAnswers.filter(answer => answer !== null).length}/30 risposte</b></div>${teacherQuestions.map((question, index) => `<article class="teacher-question"><div><span>${String(index + 1).padStart(2, '0')}</span><small>${question[3]}</small></div><p>${question[0]}</p>${question[1].map((option, optionIndex) => `<label><input type="radio" name="teacher-test-${index}" value="${optionIndex}" ${teacherTestAnswers[index] === optionIndex ? 'checked' : ''}><span>${option}</span></label>`).join('')}</article>`).join('')}<div class="teacher-test-actions"><button class="btn" id="teacherTestSubmit" type="button">Calcola il risultato</button><button class="btn secondary" id="teacherTestReset" type="button">Ricomincia</button></div>${result}`;
  }

  function generateTeacherCertificate() {
    const auth = window.StradivariTeacherAuth;
    if (!teacherTestResult || teacherTestResult.correct < 21) { alert('Per creare l’attestazione devi superare la verifica con almeno 21 risposte corrette.'); return; }
    if (!auth?.verified || !auth.user) { alert('Accedi con l’account istituzionale docente per creare l’attestazione nominale.'); return; }
    const user = auth.user;
    const teacherName = user.nome || user.name || user.email;
    const teacherEmail = user.email || '';
    const generated = new Date().toLocaleDateString('it-IT', { year: 'numeric', month: 'long', day: 'numeric' });
    const level = teacherTestResult.correct >= 26 ? 'avanzato' : 'superato';
    const report = document.getElementById('pdfReport');
    report.innerHTML = `<article class="pdf-page certificate-page"><header class="certificate-header"><div class="certificate-school">Istituto di Istruzione Superiore “Antonio Stradivari”</div><div class="certificate-city">Cremona</div></header><main><div class="pdf-eyebrow">Formazione interna del personale docente</div><h1>Attestazione di completamento</h1><p class="certificate-subtitle">Corso di aggiornamento interno<br><strong>DigComp 3.0</strong></p><p class="certificate-declaration">Si attesta che</p><h2 class="certificate-name">${escapeHtml(teacherName)}</h2>${teacherEmail ? `<p class="certificate-email">${escapeHtml(teacherEmail)}</p>` : ''}<p class="certificate-copy">ha svolto il percorso autonomo di formazione e aggiornamento dedicato al quadro europeo delle competenze digitali <strong>DigComp 3.0</strong>, comprensivo di contenuti, casi guidati, laboratori, verifiche formative e verifica finale.</p><div class="certificate-facts"><div><span>Durata del percorso</span><strong>4 ore</strong></div><div><span>Verifica finale</span><strong>${teacherTestResult.correct}/30</strong><small>Soglia: 21/30</small></div><div><span>Esito</span><strong>${escapeHtml(level)}</strong></div><div><span>Data</span><strong>${escapeHtml(generated)}</strong></div></div><section class="certificate-areas"><h3>Ambiti del percorso</h3><p>Informazione e dati · comunicazione e collaborazione · creazione di contenuti · sicurezza e benessere · risoluzione di problemi · uso critico e responsabile dell’intelligenza artificiale.</p></section><p class="certificate-framework">Percorso riconducibile alla formazione in servizio obbligatoria, permanente e strutturale nell’ambito del piano triennale dell’Istituto, previa registrazione e validazione amministrativa.</p><section class="certificate-validation"><div><strong>Documento da inserire nel portale Formazione interna</strong><span>L’efficacia amministrativa è subordinata alla registrazione e alla validazione dell’Istituto.</span></div><div class="certificate-signature"><span>Spazio riservato alla validazione</span></div></section></main><footer>Documento generato dal portale “Didattica e metodi” · didattica.stradilab.org</footer></article>`;
    report.setAttribute('aria-hidden', 'false');
    window.print();
    window.setTimeout(() => report.setAttribute('aria-hidden', 'true'), 1000);
  }

  function evaluateTeacherTest() {
    if (teacherTestAnswers.some(answer => answer === null)) { alert('Completa tutte le 30 domande prima di calcolare il risultato.'); return; }
    const correct = teacherTestAnswers.reduce((total, answer, index) => total + (answer === teacherQuestions[index][2] ? 1 : 0), 0);
    const status = correct < 21 ? 'fail' : correct < 26 ? 'pass' : 'advanced';
    const message = status === 'fail' ? 'Non ancora sufficiente: la soglia è 21/30.' : status === 'pass' ? 'Verifica superata: hai raggiunto la soglia di 21/30.' : 'Verifica superata con esito avanzato.';
    teacherTestResult = { correct, status, message };
    renderTeacherTest();
    document.getElementById('teacherCourseTest')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    document.dispatchEvent(new CustomEvent('stradivari-progress'));
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
    if (values.length < 15) { alert('Completa tutti i quindici indicatori DigComp del profilo scelto.'); return; }
    const average = values.reduce((a, b) => a + b, 0) / values.length;
    const names = ['Da costruire', 'Con guida', 'In autonomia', 'So guidare altri'];
    lastResult = { role, level: names[Math.round(average)], average: average.toFixed(1), completed: true };
    const result = document.getElementById('digResult');
    result.innerHTML = `<strong>Livello prevalente: ${names[Math.round(average)]}</strong><br>Media ${average.toFixed(1)}/3 sul profilo ${role}. Il risultato serve per scegliere il prossimo modulo da allenare.`;
    result.classList.add('show');
  });
  document.getElementById('courseMap').addEventListener('click', event => {
    const button = event.target.closest('[data-module]');
    if (button) renderLesson(Number(button.dataset.module));
  });
  document.getElementById('advancedGlossaryToggle')?.addEventListener('click', event => {
    const panel = document.getElementById('advancedGlossary');
    const willOpen = panel.hidden;
    panel.hidden = !willOpen;
    event.currentTarget.setAttribute('aria-expanded', String(willOpen));
    event.currentTarget.textContent = willOpen ? 'Chiudi glossario approfondito' : 'Glossario approfondito';
  });
  document.getElementById('teacherTestContent')?.addEventListener('change', event => {
    const match = event.target.name?.match(/^teacher-test-(\d+)$/);
    if (!match) return;
    teacherTestAnswers[Number(match[1])] = Number(event.target.value);
    teacherTestResult = null;
    const count = document.querySelector('.teacher-test-meta b');
    if (count) count.textContent = `${teacherTestAnswers.filter(answer => answer !== null).length}/30 risposte`;
    document.querySelector('.teacher-test-result')?.remove();
  });
  document.getElementById('teacherTestContent')?.addEventListener('click', event => {
    if (event.target.id === 'teacherTestSubmit') evaluateTeacherTest();
    if (event.target.id === 'teacherTestReset') { teacherTestAnswers = Array(teacherQuestions.length).fill(null); teacherTestResult = null; renderTeacherTest(); }
    if (event.target.id === 'teacherCertificatePdf') generateTeacherCertificate();
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
  document.addEventListener('teacherlogin', renderTeacherTest);

  window.StradivariDig = { completed: () => Object.keys(answers.alunno).length + Object.keys(answers.docente).length, total: 30, getResults: () => lastResult || { completed: false, role } };
  window.StradivariCourse = { openModule: (index, updateHash = false) => renderLesson(index, updateHash), total: lessons.length, getResults: () => ({ module: currentModule + 1, title: lessons[currentModule].title, role, completed: Boolean(lastResult), digcomp: lastResult, teacherTest: teacherTestResult }) };
  renderDig(); renderCourse();
})();
