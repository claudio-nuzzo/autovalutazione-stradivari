(() => {
  const escapeHtml = value => String(value ?? '').replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' }[char]));
  const levels = ['Da costruire', 'Con guida', 'In autonomia', 'So guidare altri'];
  const profiles = {
    alunno: [
      ['Informazione e dati', ['Formulo ricerche precise e confronto autore, data, scopo e prove.', 'Organizzo fonti e dati in modo da poterli ritrovare e citare.', 'Riconosco contenuti manipolati e distinguo fatti, opinioni e pubblicità.']],
      ['Comunicazione e collaborazione', ['Scelgo canale, tono e destinatari adatti.', 'Collaboro online rispettando ruoli, identità e contributi.', 'Condivido file e messaggi controllando permessi, privacy e tracce digitali.']],
      ['Creazione di contenuti', ['Creo e rielaboro contenuti accessibili in formati diversi.', 'Cito fonti e licenze e dichiaro l’eventuale uso dell’IA.', 'Adatto testo, immagini, audio e video allo scopo e al pubblico.']],
      ['Sicurezza e benessere', ['Proteggo account, dati personali e dispositivi.', 'Gestisco attenzione, tempo, reputazione e impatto ambientale.', 'Riconosco phishing, richieste anomale e situazioni che richiedono aiuto.']],
      ['Risoluzione di problemi', ['Definisco il bisogno, provo soluzioni e imparo dagli errori.', 'Valuto criticamente strumenti digitali e risposte dell’IA.', 'Scelgo strumenti accessibili e trasferisco ciò che ho imparato a un caso nuovo.']]
    ],
    docente: [
      ['Informazione e dati', ['Scelgo fonti affidabili per preparare lezioni e materiali.', 'Raccolgo solo i dati degli alunni che mi servono.', 'Cito le fonti e controllo che i materiali siano adatti alla classe.']],
      ['Comunicazione e collaborazione', ['Scrivo consegne digitali chiare.', 'Nei lavori di gruppo, assegno compiti e do consigli utili.', 'Controllo chi può accedere ai materiali e preparo alternative.']],
      ['Creazione di contenuti', ['Preparo materiali facili da leggere e usare.', 'Controllo se posso riutilizzare testi e immagini di altre persone.', 'Controllo i materiali creati con l’IA prima di usarli.']],
      ['Sicurezza e benessere', ['Proteggo i dati e gli account usati in classe.', 'Preparo alternative per chi ha difficoltà con dispositivi o connessione.', 'So che cosa fare e chi avvisare se c’è un problema di sicurezza.']],
      ['Risoluzione di problemi', ['Scelgo uno strumento perché è utile alla lezione.', 'Controllo i risultati dell’IA e decido se usarli.', 'Provo una soluzione, raccolgo le risposte degli alunni e la miglioro.']]
    ]
  };

  const lessons = [
    {
      title: 'Cercare e valutare informazioni', area: 'Area 1 · Ricerca, valutazione e gestione delle informazioni', time: '18–22 min',
      intro: 'Quando cerchi informazioni, fermati a chiederti: chi le ha pubblicate? Sono aggiornate? Ci sono prove? Una risposta che sembra sicura può essere sbagliata.',
      objectives: ['Cercare le informazioni giuste', 'Capire se una fonte è affidabile', 'Controllare le risposte trovate online o con l’IA'],
      sections: [
        ['Che cosa vuoi sapere?', 'Prima di cercare, scrivi una domanda precisa. Aggiungi parole come luogo, periodo o argomento. Se i risultati non rispondono alla domanda, prova parole diverse.', ['Scrivi una domanda precisa.', 'Prova parole simili.', 'Controlla che i risultati rispondano davvero alla domanda.']],
        ['Chi ha pubblicato queste informazioni?', 'Controlla chi ha scritto il contenuto, quando e su quali prove si basa. Una pagina bella da vedere non è per forza affidabile. Confrontala con almeno un’altra fonte.', ['Cerca il nome dell’autore.', 'Controlla la data.', 'Confronta le informazioni con un’altra fonte.']],
        ['Controlla prima di condividere', 'I motori di ricerca e l’IA scelgono quali contenuti mostrarti. Potrebbero tralasciare informazioni o contenere errori. Cerca conferme su altri siti, soprattutto per immagini e video.', ['Non fermarti al primo risultato.', 'Cerca una conferma.', 'Controlla quando e dove è stata pubblicata una foto o un video.']]
      ],
      steps: [['Domanda', 'Delimita ciò che vuoi sapere.'], ['Ricerca', 'Scegli termini e strumenti adatti.'], ['Confronta', 'Verifica origine, prove e scopo.'], ['Decidi', 'Usa e cita ciò che regge al controllo.']],
      studentExample: 'Per una presentazione sulla liuteria cremonese confronta il sito di un museo, una voce enciclopedica e un post social. Individua autore, data, prove e scopo; scegli la fonte migliore e spiega perché.',
      teacherExample: 'Mostra due fonti sulla stessa notizia. Chiedi alla classe quale è più affidabile e perché.',
      studentActivity: 'Scegli un’affermazione che hai visto online. Trova la fonte originale e controllala con altre due fonti indipendenti. Annota la data, lo scopo e la tua conclusione in cinque righe.',
      teacherActivity: 'Prepara un’attività per verificare una notizia o un’affermazione. Scrivi la domanda, una breve lista di controlli e chiedi agli alunni di raccontare come hanno verificato.',
      checklist: ['Ho definito la domanda', 'Conosco autore e data', 'Ho cercato la fonte originaria', 'Ho confrontato più fonti', 'So spiegare perché mi fido'],
      q: [['Prima di cercare online, che cosa conviene fare?', ['Aprire il primo risultato', 'Decidere che cosa voglio sapere', 'Cercare una parola generica'], 1], ['Come capisco se una fonte è affidabile?', ['Controllo autore, prove e riferimenti', 'Guardo quante immagini ha', 'Scelgo quella che appare per prima'], 0], ['Come controllo una notizia?', ['Rileggo solo la stessa pagina', 'Cerco conferme su altri siti affidabili', 'Leggo solo i commenti'], 1], ['Posso fidarmi subito di una risposta dell’IA?', ['Sì, è sempre una fonte originale', 'No, devo controllarla con fonti affidabili', 'Sì, è sempre aggiornata'], 1]]
    },
    {
      title: 'Organizzare dati e informazioni', area: 'Area 1 · Ricerca, valutazione e gestione delle informazioni', time: '16–20 min',
      intro: 'Dai ai file nomi chiari, tieni insieme quelli che servono e annota da dove arrivano le informazioni. Così tu e i tuoi colleghi ritrovate subito ciò che vi serve.',
      objectives: ['Dare nomi chiari ai file', 'Tenere in ordine fonti e dati', 'Raccogliere solo i dati necessari'],
      sections: [
        ['Dai nomi chiari ai file', 'Scegli nomi che facciano capire subito che cosa contiene il file e qual è la versione giusta. Per esempio: “Storia_ricerca_15ottobre”. Evita nomi come “finale2”.', ['Indica l’argomento nel nome.', 'Aggiungi la data se serve.', 'Fai capire qual è la versione aggiornata.']],
        ['Metti in ordine i dati', 'Se usi una tabella, scrivi che cosa significa ogni colonna e usa sempre le stesse unità di misura. Prima di condividere, controlla che non manchino dati e che non ci siano doppioni.', ['Usa le stesse regole per tutti i dati.', 'Controlla gli spazi vuoti.', 'Correggi eventuali doppioni.']],
        ['Tieni traccia delle fonti', 'Quando usi un’informazione, annota da dove viene e quando l’hai trovata. Se raccogli dati personali, prendi solo quelli che ti servono e limita chi può vederli.', ['Scrivi la fonte mentre lavori.', 'Fai una copia dei file importanti.', 'Non raccogliere dati che non ti servono.']]
      ],
      steps: [['Raccogli', 'Definisci prima campi e criteri.'], ['Ordina', 'Usa nomi, cartelle e versioni coerenti.'], ['Controlla', 'Trova errori, duplicati e vuoti.'], ['Conserva', 'Proteggi il necessario, scarta il superfluo.']],
      studentExample: 'Per una ricerca crea un archivio con cartella fonti, tabella bibliografica, materiali prodotti e versioni. Un compagno deve riuscire a trovare tutto senza chiederti aiuto.',
      teacherExample: 'Per il prossimo lavoro di gruppo, prepara una cartella condivisa e assegna a ogni file un nome chiaro.',
      studentActivity: 'Metti in ordine i file di un compito. Dai loro nomi chiari e uniformi, annota le fonti e indica quale file è la versione da consegnare.',
      teacherActivity: 'Pensa a un’attività con strumenti digitali. Annota quali dati raccogli, perché ti servono, chi li può vedere e dove conservi i materiali aggiornati.',
      checklist: ['Uso nomi coerenti', 'Ritrovo la versione valida', 'Registro le fonti', 'Confronto dati omogenei', 'Raccolgo solo ciò che serve'],
      q: [['Quale nome aiuta a trovare un file?', ['Ricerca_storia_15ottobre_v2', 'Nuovo', 'File123'], 0], ['Per confrontare due dati, è meglio…', ['usarli con le stesse regole', 'cambiare unità di misura', 'guardare solo il numero più alto'], 0], ['Quali dati è meglio raccogliere?', ['Tutti quelli possibili', 'Solo quelli necessari', 'Tutti e poi pubblicarli'], 1], ['Come faccio a risalire alla fonte di un’informazione?', ['La annoto mentre lavoro', 'Nascondo le modifiche', 'Non cito la fonte'], 0]]
    },
    {
      title: 'Comunicare e collaborare', area: 'Area 2 · Comunicazione e collaborazione', time: '18–22 min',
      intro: 'Prima di inviare un messaggio o condividere un file, pensa a chi lo leggerà e a che cosa deve fare. Controlla anche chi potrà aprire o modificare il file.',
      objectives: ['Scrivere messaggi chiari', 'Condividere file con le persone giuste', 'Lavorare bene insieme online'],
      sections: [
        ['Scrivi che cosa serve', 'Scegli se usare una mail, una chat o un documento condiviso. Nel messaggio scrivi subito che cosa chiedi e quando serve una risposta.', ['Usa un oggetto chiaro.', 'Scrivi che cosa deve fare chi legge.', 'Rispetta gli orari di lavoro.']],
        ['Controlla chi può aprire il file', 'Prima di condividere, controlla a chi stai mandando il link e che cosa potrà fare. Dai l’accesso solo alle persone che ne hanno bisogno.', ['Controlla i destinatari.', 'Scegli chi può leggere o modificare.', 'Non condividere messaggi privati senza permesso.']],
        ['Dividetevi il lavoro', 'Quando lavori con altre persone, chiarite chi fa che cosa e quando. Lasciate commenti utili e annotate le decisioni, così tutti possono seguire il lavoro.', ['Assegna un compito a ciascuno.', 'Segna le decisioni prese.', 'Dai consigli chiari e rispettosi.']]
      ],
      steps: [['Scopo', 'Chiarisci cosa deve accadere.'], ['Canale', 'Scegli ambiente, tono e tempo.'], ['Permessi', 'Apri solo gli accessi necessari.'], ['Feedback', 'Rendi il contributo migliorabile.']],
      studentExample: 'Organizza un lavoro di gruppo con obiettivo, ruoli, scadenza, cartella condivisa e regola per i commenti. Alla fine ricostruisci una decisione usando la cronologia.',
      teacherExample: 'Progetta uno spazio collaborativo in cui consegna, ruoli, permessi, criteri di feedback e tempi di disconnessione siano espliciti fin dall’inizio.',
      studentActivity: 'Riscrivi un messaggio poco chiaro: aggiungi che cosa va fatto e entro quando. Poi scegli chi può modificare il file e chi può solo leggerlo.',
      teacherActivity: 'Scrivi una consegna che dica chi fa che cosa e entro quando. Aggiungi una frase di commento che spieghi un punto riuscito e un prossimo passo.',
      checklist: ['Il canale è adatto', 'La richiesta è chiara', 'I permessi sono minimi', 'Ruoli e tempi sono visibili', 'Il tono rispetta le persone'],
      q: [['Prima di condividere un file, che cosa controllo?', ['Chi lo riceverà e che cosa potrà fare', 'Solo il colore', 'Quante righe contiene'], 0], ['Che cosa deve dire una consegna chiara?', ['Che cosa fare e entro quando', 'Solo un saluto', 'Molte abbreviazioni'], 0], ['Come si lavora bene in gruppo?', ['Si chiariscono compiti e decisioni', 'Una persona fa tutto', 'Si cancellano le modifiche'], 0], ['Come proteggo un file condiviso?', ['Do a ciascuno l’accesso che gli serve', 'Lascio il link aperto a tutti', 'Lo invio a tutta la scuola'], 0]]
    },
    {
      title: 'Creare contenuti accessibili', area: 'Area 3 · Creazione di contenuti digitali', time: '20–25 min',
      intro: 'Una presentazione o una scheda deve essere facile da leggere e capire. Usa immagini e testi che puoi riutilizzare e scrivi da dove vengono.',
      objectives: ['Creare materiali facili da leggere', 'Usare immagini e testi rispettando le regole', 'Controllare i contenuti creati con l’IA'],
      sections: [
        ['Fai capire il messaggio', 'Metti un titolo chiaro e dividi il testo in parti. Usa caratteri leggibili e non affidarti solo ai colori per spiegare qualcosa. Descrivi le immagini importanti.', ['Usa titoli chiari.', 'Aggiungi una descrizione alle immagini.', 'Aggiungi sottotitoli ai video.']],
        ['Usa testi e immagini con attenzione', 'Se usi parole o immagini di altre persone, cita la fonte. Controlla se puoi riutilizzarle: il fatto che siano online non significa che siano libere.', ['Scrivi da dove viene il contenuto.', 'Controlla se puoi riutilizzarlo.', 'Non togliere il nome dell’autore.']],
        ['Controlla ciò che crea l’IA', 'L’IA può creare testi, immagini o codice, ma può anche sbagliare. Controlla il risultato e spiega se hai usato l’IA. Non inserire dati personali o riservati.', ['Controlla che il risultato sia corretto.', 'Non inserire dati personali.', 'Spiega come hai usato l’IA.']]
      ],
      steps: [['Messaggio', 'Definisci pubblico e idea centrale.'], ['Progetto', 'Ordina testo, immagini e interazioni.'], ['Attribuisci', 'Controlla fonti e licenze.'], ['Verifica', 'Prova accessibilità, accuratezza e formato.']],
      studentExample: 'Crea una pagina su un’opera o una performance: titolo chiaro, testo breve, immagine con licenza, didascalia, testo alternativo e nota sull’eventuale uso dell’IA.',
      teacherExample: 'Riprogetta una scheda didattica per ridurre il carico superfluo: struttura prevedibile, consegne esplicite, formati accessibili e alternative equivalenti.',
      studentActivity: 'Scegli una tua vecchia presentazione. Rendila più facile da leggere, cita le fonti, descrivi le immagini e spiega che cosa hai modificato.',
      teacherActivity: 'Scegli un materiale per la classe. Controlla che si capisca anche senza immagini, colori o audio e prepara un’alternativa accessibile.',
      checklist: ['La gerarchia è chiara', 'Il contrasto è sufficiente', 'Le immagini hanno uno scopo', 'Fonti e licenze sono visibili', 'Ho verificato l’output dell’IA'],
      q: [['A che cosa serve descrivere un’immagine?', ['A far capire che cosa mostra', 'A decorare la pagina', 'A ridurre il file'], 0], ['Che cosa dice una licenza?', ['Come si può riusare un contenuto', 'Quanto è bello', 'Quante persone lo hanno visto'], 0], ['Come rendo chiaro un grafico?', ['Aggiungo parole o etichette, non solo colori', 'Uso solo colori', 'Tolgo il titolo'], 0], ['Come uso un contenuto creato dall’IA?', ['Lo controllo e dico che ho usato l’IA', 'Lo uso senza rileggerlo', 'Lo considero sempre originale'], 0]]
    },
    {
      title: 'Proteggere dati, account e dispositivi', area: 'Area 4 · Sicurezza', time: '18–22 min',
      intro: 'Proteggi i tuoi account e dispositivi. Fai attenzione ai messaggi che chiedono dati o password, soprattutto se ti mettono fretta.',
      objectives: ['Proteggere account e dispositivi', 'Riconoscere messaggi sospetti', 'Sapere a chi chiedere aiuto'],
      sections: [
        ['Proteggi i tuoi account', 'Usa password diverse e difficili da indovinare. Se puoi, attiva un secondo controllo per accedere. Aggiorna i dispositivi e blocca lo schermo quando ti allontani.', ['Non riutilizzare la stessa password.', 'Non condividere codici di accesso.', 'Aggiorna i dispositivi.']],
        ['Attenzione ai messaggi urgenti', 'Un messaggio può fingere di arrivare dalla scuola o da una banca e chiedere la password. Non cliccare subito. Controlla chi l’ha inviato usando un contatto che conosci già.', ['Fermati se il messaggio mette fretta.', 'Non inviare password o codici.', 'Chiedi conferma alla persona o all’ufficio.']],
        ['Se qualcosa non va', 'Se pensi che qualcuno sia entrato nel tuo account, avvisa subito il referente della scuola. Segui le sue indicazioni e cambia la password da un dispositivo sicuro.', ['Avvisa il referente.', 'Segui le istruzioni della scuola.', 'Non inoltrare il messaggio sospetto.']]
      ],
      steps: [['Previeni', 'Aggiorna, proteggi e fai backup.'], ['Riconosci', 'Nota urgenze e richieste insolite.'], ['Contieni', 'Limita accessi e cambia credenziali.'], ['Segnala', 'Attiva subito il canale corretto.']],
      studentExample: 'Ricevi un messaggio che chiede di “verificare subito” l’account scolastico. Non cliccare: confronta dominio, mittente e tono, poi segnala tramite il canale ufficiale.',
      teacherExample: 'Prima di usare un nuovo servizio con la classe, verifica dati richiesti, età, accessi, finalità, conservazione e possibilità di svolgere l’attività senza esporre informazioni non necessarie.',
      studentActivity: 'Controlla se il dispositivo è aggiornato e bloccato, quali permessi ha un’app e che cosa fare se ricevi un messaggio sospetto. MFA significa confermare l’accesso in più di un modo.',
      teacherActivity: 'Scegli un’attività digitale. Elimina i dati e gli accessi che non servono e limita la condivisione alle persone coinvolte.',
      checklist: ['Password diverse e MFA', 'Dispositivi aggiornati', 'Controllo link e mittenti', 'Permessi essenziali', 'Conosco il canale di segnalazione'],
      q: [['Quale scelta protegge meglio un account?', ['Usare la stessa password ovunque', 'Usare password diverse e una conferma in più', 'Condividere il codice in chat'], 1], ['Un messaggio chiede subito la password. Che cosa fai?', ['Controllo con la scuola usando un contatto noto', 'Rispondo subito', 'Lo inoltro a tutti'], 0], ['Quali dati raccolgo?', ['Solo quelli che mi servono', 'Li conservo per sempre', 'Li rendo pubblici'], 0], ['Penso che qualcuno abbia usato il mio account. Che cosa faccio?', ['Seguo le istruzioni della scuola e cambio password', 'Cancello ogni traccia', 'Aspetto senza avvisare'], 0]]
    },
    {
      title: 'Benessere e cittadinanza digitale', area: 'Area 4 · Sicurezza', time: '18–22 min',
      intro: 'Il digitale è utile, ma può distrarre o escludere qualcuno. Fai pause, rispetta la privacy delle altre persone e pensa a chi può partecipare.',
      objectives: ['Usare il digitale senza distrarsi troppo', 'Rispettare la privacy degli altri', 'Prevedere un modo per far partecipare tutti'],
      sections: [
        ['Fai una pausa', 'Le notifiche possono interrompere il lavoro. Metti il telefono da parte quando devi concentrarti e fai una pausa quando serve.', ['Disattiva le notifiche per un po’.', 'Fai pause.', 'Chiedi aiuto se non riesci a smettere.']],
        ['Rispetta la privacy', 'Chiedi il permesso prima di pubblicare una foto o una registrazione di un’altra persona. Se vedi un contenuto offensivo o pericoloso, segnalalo a un adulto o al referente.', ['Chiedi il permesso prima di condividere.', 'Non diffondere contenuti offensivi.', 'Pensa a chi vedrà il tuo messaggio.']],
        ['Fai partecipare tutti', 'Non tutti hanno lo stesso dispositivo o una buona connessione. Prepara un’alternativa. Usa i dispositivi più a lungo e sostituiscili solo quando serve.', ['Prepara un’alternativa senza internet.', 'Usa i dispositivi più a lungo.', 'Scegli il digitale quando è utile.']]
      ],
      steps: [['Osserva', 'Riconosci abitudini e segnali.'], ['Regola', 'Crea limiti e pause sostenibili.'], ['Rispetta', 'Proteggi consenso, dignità e diritti.'], ['Riequilibra', 'Scegli alternative inclusive.']],
      studentExample: 'Per una settimana osserva un’abitudine digitale che disturba studio o riposo. Introduci una sola modifica misurabile e descrivi che cosa cambia davvero.',
      teacherExample: 'Rivedi un’attività digitale considerando attenzione, accessibilità, tempi, disponibilità dei dispositivi e alternativa non digitale equivalente.',
      studentActivity: 'Per tre volte, annota la situazione, che cosa hai fatto col dispositivo e come ti ha fatto sentire. Scegli una regola semplice e controlla se ti è stata utile.',
      teacherActivity: 'Prepara una lezione alternando momenti con e senza schermo, lavoro individuale e confronto. Spiega perché usi il digitale in ciascun momento.',
      checklist: ['Gestisco le notifiche', 'Proteggo sonno e pause', 'Chiedo consenso', 'So come segnalare', 'Considero accesso e impatto'],
      q: [['Da che cosa dipende stare bene con il digitale?', ['Solo dal numero di ore', 'Da come e quando lo uso', 'Solo dal dispositivo'], 1], ['Prima di pubblicare una foto di un’altra persona…', ['Chiedo il suo permesso', 'La ritaglio', 'La mando in un gruppo'], 0], ['Come preparo un’attività a cui tutti possano partecipare?', ['Offro modi diversi per accedere', 'Chiedo a tutti lo stesso dispositivo', 'Uso solo i colori'], 0], ['Qual è una scelta utile per l’ambiente?', ['Usare più a lungo i dispositivi', 'Fare copie di ogni file', 'Cambiare un dispositivo che funziona'], 0]]
    },
    {
      title: 'Risolvere problemi con metodo', area: 'Area 5 · Individuazione e risoluzione di problemi', time: '20–25 min',
      intro: 'Quando qualcosa non funziona, prova a capire che cosa è successo prima di cambiare tutto. Fai una modifica alla volta e controlla se aiuta.',
      objectives: ['Capire qual è il problema', 'Scegliere uno strumento adatto', 'Provare una soluzione e controllare il risultato'],
      sections: [
        ['Descrivi che cosa succede', 'Scrivi che cosa volevi fare e che cosa è successo. Annota il messaggio di errore e i passaggi che hai già provato. Così sarà più facile trovare una soluzione o chiedere aiuto.', ['Scrivi che cosa ti aspettavi.', 'Scrivi che cosa è successo.', 'Cambia una cosa alla volta.']],
        ['Scegli uno strumento adatto', 'Non scegliere uno strumento solo perché è nuovo. Pensa a che cosa ti serve, a chi lo userà, alla privacy e a quanto costa. A volte carta e penna sono la soluzione migliore.', ['Pensa prima a che cosa ti serve.', 'Controlla chi può accedere ai dati.', 'Valuta anche una soluzione senza tecnologia.']],
        ['Prova e correggi', 'Fai una prova piccola. Guarda che cosa funziona e che cosa no. Correggi il problema e riprova. Annota i passaggi così potrai rifarli o spiegarli a un collega.', ['Prova con un esempio reale.', 'Segna che cosa non funziona.', 'Aggiorna i passaggi dopo la prova.']]
      ],
      steps: [['Definisci', 'Atteso, osservato e vincoli.'], ['Ipotizza', 'Formula una causa verificabile.'], ['Prova', 'Cambia una cosa e misura.'], ['Documenta', 'Conserva esito, limiti e passo seguente.']],
      studentExample: 'Un file non si apre durante un lavoro di gruppo. Descrivi formato, dispositivo ed errore, prova una modifica alla volta e prepara una soluzione ripetibile.',
      teacherExample: 'Parti da un bisogno didattico. Confronta due opzioni e una soluzione analogica con criteri di efficacia, accessibilità, privacy e sostenibilità.',
      studentActivity: 'Scegli un problema. Scrivi che cosa ti aspettavi, che cosa è successo, che cosa pensi sia la causa e che cosa hai provato. Chiedi a un compagno di ripetere i passaggi.',
      teacherActivity: 'Prepara dieci minuti di un’attività digitale e provala come se fossi uno studente. Annota che cosa potrebbe essere difficile e prepara un’alternativa.',
      checklist: ['Distinguo sintomo e causa', 'Cambio una variabile alla volta', 'Scelgo con criteri', 'Provo casi realistici', 'Documento soluzione e limiti'],
      q: [['Prima di provare a risolvere un problema…', ['Scrivo che cosa mi aspettavo e che cosa è successo', 'Cambio tutto insieme', 'Ignoro l’errore'], 0], ['Quale strumento scelgo?', ['Quello che risponde al bisogno', 'Quello più nuovo', 'Quello con più funzioni'], 0], ['A che cosa serve fare una prima prova?', ['A vedere se l’idea funziona', 'A evitare controlli', 'A nascondere i problemi'], 0], ['Quando posso imparare da un errore?', ['Quando capisco che cosa l’ha causato', 'Quando lo ripeto senza cambiare nulla', 'Quando cancello tutto'], 0]]
    },
    {
      title: 'Capire e valutare l’intelligenza artificiale', area: 'L’IA nei diversi ambiti DigComp 3.0', time: '22–28 min',
      intro: 'DigComp 3.0 include l’IA tra le competenze digitali. Non chiede di usarla in ogni materia: chiede di capire quando serve, controllare i risultati e sapere quando è meglio non usarla.',
      objectives: ['Capire che cosa può fare l’IA e dove può sbagliare', 'Controllare quello che produce', 'Decidere quando usarla e quando no'],
      sections: [
        ['L’IA può sbagliare', 'L’IA può scrivere una risposta convincente anche quando contiene errori o informazioni inventate. Non fidarti solo perché il testo sembra sicuro: controlla i fatti.', ['Controlla i nomi e le date.', 'Verifica le informazioni su altre fonti.', 'Ricorda: l’IA può sbagliare.']],
        ['Fai una richiesta chiara e controlla la risposta', 'Spiega all’IA che cosa ti serve e per chi. Non inserire dati personali. Poi rileggi la risposta e confrontala con fonti affidabili.', ['Spiega che cosa vuoi ottenere.', 'Non scrivere dati personali.', 'Controlla la risposta prima di usarla.']],
        ['Decidi se usarla', 'L’IA può aiutare a preparare una bozza o a trovare idee, ma la decisione resta tua. In alcune attività può essere utile; in altre, come eseguire uno strumento musicale, non serve. Se la usi, dillo e controlla il risultato.', ['Scegli se l’IA è utile per il compito.', 'Non lasciare che decida al posto tuo.', 'Spiega se l’hai usata.']]
      ],
      steps: [['Decidi', 'L’IA serve per questo compito?'], ['Chiedi', 'Spiega che cosa ti serve.'], ['Controlla', 'Verifica la risposta.'], ['Scegli', 'Usa, correggi o scarta il risultato.']],
      studentExample: 'Scrivi prima la tua risposta. Se è utile, chiedi all’IA un’altra idea. Controlla le informazioni e decidi che cosa tenere o correggere.',
      teacherExample: 'Se una funzione IA di Adobe è utile per preparare un’immagine o un materiale, controlla il risultato e i diritti d’uso. Per una lezione di strumento musicale, puoi scegliere di non usare l’IA: l’obiettivo è la pratica musicale.',
      studentActivity: 'Scrivi una prima risposta con parole tue. Confrontala con una risposta dell’IA e segna che cosa è corretto, sbagliato o nuovo. Spiega che cosa hai cambiato.',
      teacherActivity: 'Per una consegna, scrivi quando gli alunni possono usare l’IA e quando no. Spiega che cosa dovranno controllare e come mostreranno di aver capito.',
      checklist: ['So perché uso o non uso l’IA', 'Non inserisco dati personali', 'Controllo le risposte', 'Uso fonti affidabili', 'Spiego se ho usato l’IA'],
      q: [['Nel corso DigComp, dove si parla di IA?', ['Solo nel capitolo sui problemi', 'In tutti gli argomenti', 'Come sostituto delle decisioni umane'], 1], ['Una risposta dell’IA che sembra sicura…', ['Può essere sbagliata', 'È già stata verificata', 'È sempre una fonte'], 0], ['Che cosa aiuta l’IA a capire la richiesta?', ['Spiegare che cosa voglio e dare dettagli utili', 'Scrivere una sola parola', 'Aggiungere dati personali'], 0], ['Chi è responsabile della risposta usata?', ['La persona che la controlla e la sceglie', 'Sempre l’IA', 'Nessuno'], 0]]
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
    ['Valutare criticamente un sistema di IA significa anche considerare…', ['bias, omissioni, fonti, impatto e responsabilità', 'solo la fluidità della risposta', 'solo la velocità di generazione'], 0, 'Risoluzione di problemi'],
    ['Per migliorare il proprio metodo di insegnamento con il digitale è utile…', ['contare soltanto le app utilizzate', 'sperimentare un cambiamento mirato, raccogliere evidenze e rivedere le scelte', 'replicare sempre la stessa attività indipendentemente dai risultati'], 1, 'Risoluzione di problemi']
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
  let courseAnswers = lessons.map(lesson => Array(lesson.q.length).fill(null));
  let completedModules = Array(lessons.length).fill(false);
  let courseCompletedAt = null;
  let trainingDeclared = false;
  let courseLabNotes = lessons.map(() => '');

  const storageKey = () => {
    const email = window.StradivariUser?.email;
    return `stradivari-digcomp-progress:v2:${email ? String(email).toLowerCase() : 'ospite'}:${role}`;
  };

  function saveProgress() {
    const key = storageKey();
    if (!key) return;
    try { localStorage.setItem(key, JSON.stringify({ answers, lastResult, courseAnswers, completedModules, courseCompletedAt, teacherTestAnswers, trainingDeclared, courseLabNotes })); } catch (_) { /* Il percorso resta utilizzabile senza storage. */ }
  }

  function loadProgress() {
    const key = storageKey();
    if (!key) return;
    ['alunno','docente'].forEach(profile => Object.keys(answers[profile]).forEach(item => delete answers[profile][item]));
    lastResult = null;
    courseAnswers = lessons.map(lesson => Array(lesson.q.length).fill(null));
    completedModules = Array(lessons.length).fill(false);
    courseCompletedAt = null;
    teacherTestAnswers = Array(teacherQuestions.length).fill(null);
    teacherTestResult = null;
    trainingDeclared = false;
    courseLabNotes = lessons.map(() => '');
    try {
      const legacyEmail = window.StradivariUser?.email;
      const legacy = role === 'alunno' && legacyEmail ? localStorage.getItem(`stradivari-digcomp-progress:v1:${String(legacyEmail).toLowerCase()}`) : null;
      const saved = JSON.parse(localStorage.getItem(key) || legacy || 'null');
      if (!saved) return;
      ['alunno', 'docente'].forEach(profile => {
        Object.keys(answers[profile]).forEach(item => delete answers[profile][item]);
        Object.assign(answers[profile], saved.answers?.[profile] || {});
      });
      lastResult = saved.lastResult || null;
      courseAnswers = lessons.map((lesson, index) => lesson.q.map((_, question) => {
        const answer = saved.courseAnswers?.[index]?.[question];
        return Number.isInteger(answer) ? answer : null;
      }));
      completedModules = lessons.map((_, index) => Boolean(saved.completedModules?.[index]));
      courseCompletedAt = saved.courseCompletedAt || null;
      teacherTestAnswers = teacherQuestions.map((question,index) => {
        const value = saved.teacherTestAnswers?.[index];
        return Number.isInteger(value) && value >= 0 && value < question[1].length ? value : null;
      });
      if (teacherTestAnswers.every(value=>value!==null)) {
        const correct=teacherTestAnswers.reduce((sum,value,index)=>sum+(value===teacherQuestions[index][2]?1:0),0);
        teacherTestResult={correct,status:'complete',message:'Ripasso finale completato.'};
      }
      trainingDeclared = saved.trainingDeclared === true;
      courseLabNotes = lessons.map((_,index) => typeof saved.courseLabNotes?.[index] === 'string' ? saved.courseLabNotes[index] : '');
    } catch (_) {
      // Un salvataggio locale non valido non deve impedire di seguire il corso.
    }
  }

  function moduleResult(index) {
    const lesson = lessons[index];
    const values = courseAnswers[index] || [];
    const answered = values.filter(value => Number.isInteger(value)).length;
    const correct = values.reduce((total, value, question) => total + (value === lesson.q[question][2] ? 1 : 0), 0);
    return { number: index + 1, title: lesson.title, total: lesson.q.length, answered, correct, completed: Boolean(completedModules[index]) };
  }

  function courseResults() {
    const modules = lessons.map((_, index) => moduleResult(index));
    const completed = modules.every(module => module.completed);
    return {
      module: currentModule + 1,
      title: lessons[currentModule].title,
      role,
      completed,
      completedAt: completed ? courseCompletedAt : null,
      correct: modules.reduce((total, module) => total + module.correct, 0),
      total: modules.reduce((total, module) => total + module.total, 0),
      modules,
      teacherTest: teacherTestResult,
      labNotes: [...courseLabNotes]
    };
  }

  function completeModule(index) {
    const result = moduleResult(index);
    if (role === 'docente' && courseLabNotes[index].trim().length < 40) {
      alert('Documenta il laboratorio nel campo dedicato (almeno 40 caratteri): indica decisioni, prodotto e controllo effettuato.');
      return;
    }
    if (result.answered < result.total) {
      alert(`Completa tutte le ${result.total} domande del capitolo prima di registrarne l'esito.`);
      return;
    }
    completedModules[index] = true;
    if (completedModules.every(Boolean)) courseCompletedAt = new Date().toLocaleDateString('it-IT', { year: 'numeric', month: 'long', day: 'numeric' });
    saveProgress();
    renderCourse();
    document.dispatchEvent(new CustomEvent('stradivari-progress'));
  }

  function renderDig() {
    const grid = profiles[role];
    document.getElementById('digTitle').textContent = role === 'docente' ? 'DigComp per il docente' : 'La tua bussola DigComp';
    document.getElementById('digLead').textContent = role === 'docente' ? 'Quindici frasi sulle tue attività digitali. Se una frase non riguarda la tua materia, scegli “Non applicabile”. Questo check è facoltativo e non fa parte delle 4 ore del corso.' : 'Quindici frasi per riflettere su come cerchi, collabori, crei e usi il digitale.';
    document.getElementById('digGrid').innerHTML = grid.map((area, areaIndex) => `<article class="dig-card"><h3>${areaIndex + 1}. ${area[0]}</h3>${area[1].map((indicator, indicatorIndex) => { const key = `${areaIndex}-${indicatorIndex}`; const choices=role==='docente'?[...levels,'Non applicabile']:levels; return `<div class="dig-indicator"><p>${indicator}</p><div class="level">${choices.map((label, levelIndex) => `<label><input type="radio" name="dig-${role}-${key}" value="${levelIndex}" ${answers[role][key] === levelIndex ? 'checked' : ''}><span>${label}</span></label>`).join('')}</div></div>`; }).join('')}</article>`).join('');
    const result = document.getElementById('digResult');
    result.innerHTML = lastResult?.completed && lastResult.role === role
      ? lastResult.average === null
        ? '<strong>Check completato.</strong><br>Hai scelto “Non applicabile” per tutte le frasi. Se vuoi, riprendi quelle che possono aiutarti nella tua materia.'
        : `<strong>Il tuo risultato: ${lastResult.level}</strong><br>Media ${lastResult.average}/3. Le risposte “Non applicabile” non sono conteggiate. Usa il risultato per scegliere quale argomento riprendere.`
      : '';
    result.classList.toggle('show', Boolean(result.innerHTML));
  }

  function renderCourse() {
    document.getElementById('courseMap').innerHTML = lessons.map((lesson, index) => `<button class="module-btn ${index === currentModule ? 'active' : ''} ${completedModules[index] ? 'completed' : ''}" data-module="${index}" aria-label="Apri il capitolo ${index + 1}: ${lesson.title}"><b>CAPITOLO ${String(index + 1).padStart(2, '0')}</b><span>${lesson.title}</span><small>${completedModules[index] ? `Completato · ${moduleResult(index).correct}/${lesson.q.length}` : lesson.time}</small></button>`).join('');
    document.getElementById('glossary').innerHTML = glossary.map(item => `<div class="term"><b>${item[0]}</b>${item[1]}</div>`).join('');
    document.getElementById('advancedGlossaryGroups').innerHTML = advancedGlossary.map(group => `<section class="advanced-glossary-group"><div class="advanced-glossary-group-head"><h4>${group.title}</h4><p>${group.description}</p></div><div class="advanced-terms">${group.terms.map(item => `<div class="advanced-term"><b>${item[0]}</b><span>${item[1]}</span></div>`).join('')}</div></section>`).join('');
    renderLesson(currentModule, false);
    if (role === 'docente') document.querySelectorAll('.module-btn small').forEach((node,index) => { if (!completedModules[index]) node.textContent=`${index<5?21:20} min previsti · con laboratorio`; });
    renderTeacherTest();
  }

  function renderTeacherTest() {
    const section = document.getElementById('teacherCourseTest');
    if (!section) return;
    section.hidden = role !== 'docente';
    if (role !== 'docente') return;
    const authenticated = Boolean(window.StradivariTeacherAuth?.verified);
    const missing = trainingMissing();
    if (missing.length) trainingDeclared = false;
    const declaration = !missing.length ? `<label class="teach-options"><input type="checkbox" id="trainingDeclaration" ${trainingDeclared ? 'checked' : ''}><span>Dichiaro di aver svolto personalmente il percorso complessivo previsto di 4 ore, incluse letture ed esercitazioni. La durata non è misurata automaticamente.</span></label>` : '';
    const certificate = missing.length ? `<div class="teacher-certificate-login"><strong>Completa il percorso di autoformazione</strong><p>Prima dell’attestato: ${missing.join(' · ')}.</p><p>Il report PDF dei risultati parziali resta disponibile. Per le 4 ore il riconoscimento è subordinato alla validazione dell’Istituto.</p></div>` : (authenticated
      ? `<div class="teacher-certificate-ready"><div><span>Attestazione disponibile</span><strong>Corso di aggiornamento DigComp 3.0 · 4 ore</strong><p>Il PDF riporterà intestazione dell’Istituto, identità del docente, data e partecipazione dichiarata al percorso di 4 ore.</p><p><strong>Hai completato il corso!</strong> Scarica l’attestato e caricalo nel <a href="https://formazione-interna.stradilab.org/" target="_blank" rel="noopener noreferrer">portale Formazione interna</a> tramite <a href="https://docs.google.com/forms/d/e/1FAIpQLScctSPVyIyqqdnyfwjoeN6bdRLV0XRqA3O9c1xs7E-Vy0icTg/viewform" target="_blank" rel="noopener noreferrer">Inserisci le ore di formazione</a>.</p></div><button class="btn teacher-certificate-btn" id="teacherCertificatePdf" type="button">Crea attestato PDF</button></div>`
      : `<div class="teacher-certificate-login"><strong>Percorso completato.</strong><p>Per creare l’attestazione nominale accedi con l’account istituzionale autorizzato. Gli esterni possono conservare il report PDF; il corso resta aperto.</p></div>`);
    const result = `${teacherTestResult ? `<div class="teacher-test-result ${teacherTestResult.status}"><strong>Ripasso completato</strong><span>${teacherTestResult.message}</span><small>Le risposte restano salvate in questo browser.</small></div>` : ''}${declaration}${certificate.replace('Crea attestato PDF', 'Crea e archivia attestazione PDF')}`;
    document.getElementById('teacherTestContent').innerHTML = `<div class="teacher-test-meta"><span>Domande per ripassare i contenuti, senza voto.</span><b>${teacherTestAnswers.filter(answer => answer !== null).length}/30 risposte</b></div>${teacherQuestions.map((question, index) => `<article class="teacher-question"><div><span>${String(index + 1).padStart(2, '0')}</span><small>${question[3]}</small></div><p>${question[0]}</p>${question[1].map((option, optionIndex) => `<label><input type="radio" name="teacher-test-${index}" value="${optionIndex}" ${teacherTestAnswers[index] === optionIndex ? 'checked' : ''}><span>${option}</span></label>`).join('')}</article>`).join('')}<div class="teacher-test-actions"><button class="btn" id="teacherTestSubmit" type="button">Completa il ripasso</button><button class="btn secondary" id="teacherTestReset" type="button">Ricomincia</button></div>${result}`;
  }

  async function generateTeacherCertificate() {
    const auth = window.StradivariTeacherAuth;
    if (trainingMissing().length || !trainingDeclared) { alert('Completa il metodo di insegnamento, gli otto capitoli e le domande di ripasso; conferma poi lo svolgimento delle attività previste.'); return; }
    if (!teacherTestResult) { alert('Completa le domande di ripasso prima di creare l’attestazione.'); return; }
    if (!auth?.verified || !auth.user) { alert('Accedi con l’account istituzionale docente per creare l’attestazione nominale.'); return; }
    const user = auth.user;
    const teacherName = user.nome || user.name || user.email;
    const teacherEmail = user.email || '';
    const generated = new Date().toLocaleDateString('it-IT', { year: 'numeric', month: 'long', day: 'numeric' });
    const report = document.getElementById('pdfReport');
    report.innerHTML = `<article class="pdf-page certificate-page"><header class="certificate-header"><div class="certificate-school">Istituto di Istruzione Superiore “Antonio Stradivari”</div><div class="certificate-city">Cremona</div></header><main><div class="pdf-eyebrow">Formazione interna del personale docente</div><h1>Attestazione di partecipazione</h1><p class="certificate-subtitle">Corso di aggiornamento interno<br><strong>DigComp 3.0</strong></p><p class="certificate-declaration">Si attesta che</p><h2 class="certificate-name">${escapeHtml(teacherName)}</h2>${teacherEmail ? `<p class="certificate-email">${escapeHtml(teacherEmail)}</p>` : ''}<p class="certificate-copy">ha svolto il percorso autonomo di formazione e aggiornamento dedicato al quadro europeo delle competenze digitali <strong>DigComp 3.0</strong>, comprensivo di contenuti, casi guidati, laboratori e domande di ripasso.</p><div class="certificate-facts"><div><span>Durata del percorso</span><strong>4 ore</strong></div><div><span>Partecipazione</span><strong>Percorso dichiarato</strong></div><div><span>Data</span><strong>${escapeHtml(generated)}</strong></div></div><section class="certificate-areas"><h3>Ambiti del percorso</h3><p>Informazione e dati · comunicazione e collaborazione · creazione di contenuti · sicurezza e benessere · risoluzione di problemi · uso critico e responsabile dell’intelligenza artificiale.</p></section><p class="certificate-framework">Percorso riconducibile alla formazione in servizio obbligatoria, permanente e strutturale nell’ambito del piano triennale dell’Istituto, previa registrazione e validazione amministrativa.</p><section class="certificate-validation"><div><strong>Documento da inserire nel portale Formazione interna</strong><span>L’efficacia amministrativa è subordinata alla registrazione e alla validazione dell’Istituto.</span></div><div class="certificate-signature"><span>Spazio riservato alla validazione</span></div></section></main><footer>Documento generato dal portale “Didattica e metodi” · didattica.stradilab.org</footer></article>`;
    report.setAttribute('aria-hidden', 'false');
    report.querySelector('h1').textContent = 'Attestazione di partecipazione al corso';
    report.querySelector('.certificate-facts').insertAdjacentHTML('beforeend', '<div><span>Anno scolastico</span><strong>2026/27</strong></div>');
    report.querySelector('.certificate-subtitle').innerHTML = 'Metodo di insegnamento e competenze digitali<br><strong>DigComp 3.0</strong>';
    report.querySelector('.certificate-copy').innerHTML = 'ha dichiarato di aver svolto il percorso autonomo di autoformazione <strong>Metodo di insegnamento e DigComp 3.0</strong>: riflessione su una lezione e progettazione di un’attività; otto capitoli con evidenze dei laboratori; domande di ripasso dopo il corso. Completamenti ed evidenze sono registrati localmente nel browser, non verificati da un tutor.';
    report.querySelector('.certificate-areas p').textContent += ' Progettazione didattica, metacognizione, feedback formativo, inclusione e pratica riflessiva, orientati da DigCompEdu.';
    const button = document.getElementById('teacherCertificatePdf');
    const card = document.querySelector('.teacher-certificate-ready');
    let status = document.getElementById('certificateArchiveStatus');
    if (!status && card) { status = document.createElement('p'); status.id = 'certificateArchiveStatus'; status.setAttribute('role', 'status'); card.appendChild(status); }
    if (button) button.disabled = true;
    if (status) status.textContent = 'Creazione e archiviazione dell’attestazione di autoformazione…';
    try {
      const {module: currentChapter, title: currentTitle, ...course} = courseResults();
      const snapshot = {schoolYear: '2026/27', name: teacherName, course, finalTest: {completed: Boolean(teacherTestResult)},
        method: window.StradivariTeaching?.getResults?.(), declaration: trainingDeclared, completedAt: courseCompletedAt};
      const archive = await window.StradilabCertificateArchive.archive(snapshot,
        () => window.StradilabCertificateArchive.pdfBytes(report));
      if (status) status.textContent = 'Attestazione salvata nell’Archivio generale 2026/27, in Formazione e attestati → Corso DigComp 3.0. Scarica il PDF qui sotto e allegalo al modulo di Formazione interna per registrare le 4 ore.';
      let download = document.getElementById('downloadArchivedCertificate');
      if (!download && card) { download = document.createElement('button'); download.id = 'downloadArchivedCertificate'; download.className = 'btn'; download.type = 'button'; card.appendChild(download); }
      if (download) {
        download.textContent = 'Scarica attestazione archiviata';
        download.onclick = async () => {
          try { await window.StradilabCertificateArchive.download(archive.key); }
          catch (error) { if (status) status.textContent = error.message; }
        };
      }
    } catch (error) { if (status) status.textContent = error.message; }
    finally { if (button) button.disabled = false; report.setAttribute('aria-hidden', 'true'); }
  }

  function evaluateTeacherTest() {
    if (teacherTestAnswers.some(answer => answer === null)) { alert('Rispondi a tutte le 30 domande per completare il ripasso.'); return; }
    const correct = teacherTestAnswers.reduce((total, answer, index) => total + (answer === teacherQuestions[index][2] ? 1 : 0), 0);
    const status = 'complete';
    const message = 'Ripasso finale completato. Puoi rileggere i capitoli e cambiare le risposte quando vuoi.';
    teacherTestResult = { correct, status, message };
    saveProgress();
    renderTeacherTest();
    document.getElementById('teacherCourseTest')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    document.dispatchEvent(new CustomEvent('stradivari-progress'));
  }

  function renderLesson(index, updateHash = true) {
    currentModule = Math.max(0, Math.min(lessons.length - 1, index));
    document.querySelectorAll('.module-btn').forEach((button, buttonIndex) => button.classList.toggle('active', buttonIndex === currentModule));
    const lesson = lessons[currentModule];
    const isTeacher = role === 'docente';
    const result = moduleResult(currentModule);
    const isLastModule = currentModule === lessons.length - 1;
    const missingModules = lessons.map((_, index) => index + 1).filter((_, index) => !completedModules[index]);
    const completionAction = `<section class="course-completion ${result.completed ? 'done' : ''}"><div><div class="kicker">Esito del capitolo</div><h4>${result.completed ? `Capitolo registrato · ${result.correct}/${result.total}` : `Domande completate: ${result.answered}/${result.total}`}</h4><p>${isLastModule ? (missingModules.length ? `Per terminare il corso devono risultare completati i capitoli: ${missingModules.join(', ')}.` : 'Hai completato gli otto capitoli. Puoi ora generare il report personale.') : 'Dopo aver risposto alle quattro domande, registra l’esito prima di proseguire.'}</p></div><div class="course-completion-actions"><button class="btn ${result.completed ? 'secondary' : ''}" data-complete-module="${currentModule}" type="button">${isLastModule ? 'Concludi il corso' : result.completed ? 'Esito registrato' : 'Registra esito capitolo'}</button>${isLastModule && !missingModules.length ? '<button class="btn secondary" data-course-report type="button">Scarica il report PDF</button>' : ''}</div></section>`;
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
        <section class="activity lesson-lab"><div><div class="kicker">Laboratorio · in autonomia</div><h4>${isTeacher ? 'Domani in classe' : 'Prova con un compito'}</h4></div><p>${isTeacher ? lesson.teacherActivity : lesson.studentActivity}</p><div class="lab-output"><b>Annota</b> Che cosa hai provato? Che cosa è successo? Che cosa cambieresti?</div><div class="self-guided-note"><b>Prima di continuare</b> Rileggi la risposta e aggiungi un’idea da provare la prossima volta.</div></section>
        <section class="takeaway"><div><div class="kicker">Prima di proseguire</div><h4>Checklist del capitolo</h4></div><div class="takeaway-grid">${lesson.checklist.map(item => `<label><input type="checkbox"><span>${item}</span></label>`).join('')}</div></section>
        <section class="quiz"><div class="quiz-heading"><div><div class="kicker">Verifica formativa</div><h4>Quattro domande per controllarti</h4></div><span>Le risposte sono incluse nel risultato finale del corso.</span></div>${lesson.q.map((question, questionIndex) => `<div class="quiz-question"><p>${questionIndex + 1}. ${question[0]}</p>${question[1].map((option, optionIndex) => `<label><input type="radio" name="course-${currentModule}-${questionIndex}" value="${optionIndex}" ${courseAnswers[currentModule][questionIndex] === optionIndex ? 'checked' : ''}><span>${option}</span></label>`).join('')}<button class="btn secondary" data-check-course="${currentModule}-${questionIndex}">Verifica risposta</button><div class="quiz-feedback" id="course-feedback-${currentModule}-${questionIndex}" aria-live="polite"></div></div>`).join('')}</section>
        <p class="source-note">Adattamento didattico a cura di StradiLab, basato sul <a href="https://joint-research-centre.ec.europa.eu/scientific-activities/key-competences-lifelong-learning/digital-competence-framework-digcomp/digcomp-30_en" target="_blank" rel="noopener">quadro ufficiale DigComp 3.0</a>, Commissione europea – JRC (2025). Contenuti sintetizzati e contestualizzati per la scuola; la Commissione europea non è responsabile dell’adattamento.</p>
        ${completionAction}<nav class="lesson-nav" aria-label="Navigazione tra i capitoli"><button class="btn secondary" data-course-nav="${currentModule - 1}" ${currentModule === 0 ? 'disabled' : ''}>← Capitolo precedente</button><span>${currentModule + 1} / ${lessons.length}</span><button class="btn" data-course-nav="${currentModule + 1}" ${currentModule === lessons.length - 1 ? 'disabled' : ''}>Capitolo successivo →</button></nav>
      </article>`;
    if (isTeacher) {
      document.querySelector('#lesson .lesson-cover .kicker').textContent = `Capitolo ${currentModule+1} di ${lessons.length} · ${currentModule<5?21:20} min previsti con laboratorio`;
      document.querySelector('#lesson .lesson-lab').insertAdjacentHTML('beforeend', `<label class="teach-field">Evidenza del laboratorio (obbligatoria per il percorso docente)<small>Annota decisioni, prodotto realizzato, controllo e miglioramento (almeno 40 caratteri). Non inserire dati personali degli alunni.</small><textarea data-course-lab="${currentModule}" maxlength="5000">${escapeHtml(courseLabNotes[currentModule])}</textarea></label>`);
    }
    if (updateHash) history.replaceState(null, '', `#corso-${currentModule + 1}`);
  }

  document.getElementById('digGrid').addEventListener('change', event => {
    const match = event.target.name?.match(/^dig-(alunno|docente)-(\d+-\d+)$/);
    if (!match) return;
    answers[match[1]][match[2]] = Number(event.target.value);
    lastResult = null;
    document.getElementById('digResult').classList.remove('show');
    trainingDeclared = false;
    saveProgress();
    document.dispatchEvent(new CustomEvent('stradivari-progress'));
  });
  document.getElementById('digDone').addEventListener('click', () => {
    const values = Object.values(answers[role]);
    if (values.length < 15) { alert('Scegli una risposta per ciascuna delle 15 frasi.'); return; }
    const ratedValues=values.filter(value=>Number.isInteger(value)&&value>=0&&value<=3);
    if (!ratedValues.length && role !== 'docente') { alert('Scegli almeno una risposta per leggere il risultato.'); return; }
    const average = ratedValues.length ? ratedValues.reduce((a, b) => a + b, 0) / ratedValues.length : null;
    const names = ['Da costruire', 'Con guida', 'In autonomia', 'So guidare altri'];
    const areas = profiles[role].map((area, areaIndex) => {
      const values = area[1].map((_, indicatorIndex) => answers[role][`${areaIndex}-${indicatorIndex}`]);
      const rated=values.filter(value=>Number.isInteger(value)&&value>=0&&value<=3);
      return { name: area[0], average: rated.length ? (rated.reduce((sum, value) => sum + value, 0) / rated.length).toFixed(1) : null };
    });
    lastResult = { role, level: average === null ? 'Non applicabile' : names[Math.round(average)], average: average === null ? null : average.toFixed(1), areas, completed: true };
    renderDig();
    saveProgress();
    document.dispatchEvent(new CustomEvent('stradivari-progress'));
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
    if (event.target.id === 'trainingDeclaration') { trainingDeclared=event.target.checked; saveProgress(); return; }
    const match = event.target.name?.match(/^teacher-test-(\d+)$/);
    if (!match) return;
    teacherTestAnswers[Number(match[1])] = Number(event.target.value);
    teacherTestResult = null;
    trainingDeclared = false;
    saveProgress();
    const count = document.querySelector('.teacher-test-meta b');
    if (count) count.textContent = `${teacherTestAnswers.filter(answer => answer !== null).length}/30 risposte`;
    document.querySelector('.teacher-test-result')?.remove();
    document.querySelector('.teacher-certificate-ready')?.remove();
  });
  document.getElementById('teacherTestContent')?.addEventListener('click', event => {
    if (event.target.id === 'teacherTestSubmit') evaluateTeacherTest();
    if (event.target.id === 'teacherTestReset') { teacherTestAnswers = Array(teacherQuestions.length).fill(null); teacherTestResult = null; trainingDeclared=false; saveProgress(); renderTeacherTest(); }
    if (event.target.id === 'teacherCertificatePdf') generateTeacherCertificate();
  });
  document.getElementById('lesson').addEventListener('click', event => {
    const complete = event.target.closest('[data-complete-module]');
    if (complete) {
      completeModule(Number(complete.dataset.completeModule));
      return;
    }
    if (event.target.closest('[data-course-report]')) {
      document.getElementById('downloadPdf')?.click();
      return;
    }
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
    if (!checked) { feedback.textContent = 'Scegli una risposta e poi controlla.'; feedback.dataset.state = 'error'; return; }
    const correct = Number(checked.value) === lessons[moduleIndex].q[questionIndex][2];
    feedback.textContent = correct ? 'Giusto.' : 'Non è la risposta giusta. Rileggi il capitolo e riprova.';
    feedback.dataset.state = correct ? 'correct' : 'error';
    document.dispatchEvent(new CustomEvent('stradivari-progress'));
  });
  document.getElementById('lesson').addEventListener('change', event => {
    const match = event.target.name?.match(/^course-(\d+)-(\d+)$/);
    if (!match) return;
    const moduleIndex = Number(match[1]);
    const questionIndex = Number(match[2]);
    courseAnswers[moduleIndex][questionIndex] = Number(event.target.value);
    completedModules[moduleIndex] = false;
    courseCompletedAt = null;
    trainingDeclared = false;
    saveProgress();
    document.dispatchEvent(new CustomEvent('stradivari-progress'));
  });
  document.getElementById('lesson').addEventListener('input', event => {
    const index=event.target.dataset.courseLab;
    if(index===undefined)return;
    courseLabNotes[Number(index)]=event.target.value;
    completedModules[Number(index)]=false;
    courseCompletedAt=null;
    trainingDeclared=false;
    saveProgress();
    document.dispatchEvent(new CustomEvent('stradivari-progress'));
  });
  document.addEventListener('profilechange', event => {
    role = event.detail.role;
    loadProgress();
    renderDig(); renderCourse();
  });
  document.addEventListener('teacherlogin', renderTeacherTest);
  function trainingMissing() {
    return [!window.StradivariTeaching?.getResults().completed && 'metodo di insegnamento', !courseResults().completed && 'otto capitoli del corso', !teacherTestResult && 'domande di ripasso dopo il corso'].filter(Boolean);
  }
  document.addEventListener('stradivari-progress', () => { if(role==='docente') renderTeacherTest(); });

  document.addEventListener('stradivari-login', () => {
    loadProgress();
    renderDig();
    renderCourse();
    document.dispatchEvent(new CustomEvent('stradivari-progress'));
  });

  window.StradivariDig = { completed: () => Object.keys(answers.alunno).length + Object.keys(answers.docente).length, total: 30, getResults: () => lastResult || { completed: false, role } };
  window.StradivariCourse = { openModule: (index, updateHash = false) => renderLesson(index, updateHash), total: lessons.length, getResults: courseResults };
  loadProgress(); renderDig(); renderCourse();
})();
