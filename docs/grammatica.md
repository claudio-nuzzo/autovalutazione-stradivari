# Grammatica in Atelier · versione 1.1.0

Destinazione: https://didattica.stradilab.org/grammatica/ . Frontend statico nella sottocartella del portale esistente; API in Deepstrad, con archivio nel Drive già configurato. Nessun database persistente Cloudflare per i risultati.

## Percorsi e materiali

262 attività originali: 108 attività articolate delle tre banche editoriali, 33 interazioni aggiuntive, 92 quesiti sugli altri argomenti e 29 microattività PEI ricavate con modello esplicito. Comprendono scelta a 2/3/4 risposte, completamento, correzione, sostituzione, selezione di parole nei testi e risposte aperte con modello da confrontare. Il selettore offre 32 gruppi di argomenti nelle tre aree. I materiali richiedono sperimentazione e validazione didattica del docente; non si tratta di un certificatore di competenze.

Accesso libero agli argomenti; orientamento iniziale facoltativo. Standard: fino a 6 attività per serie; lingua semplificata e DSA: fino a 4; PEI: fino a 3 microattività. La scelta è dell'alunno. I supporti DSA/PEI/L2 restano nel browser. Le attività PEI mostrano un esempio e chiedono riconoscimento fra due risposte. Le traduzioni di aiuto accompagnano tutte le 30 pillole in inglese, arabo (RTL) e coreano; gli esercizi mantengono l'italiano come lingua da apprendere. Questi aiuti non sono tre corsi integralmente tradotti e richiedono revisione di parlanti competenti.

30 pillole con mini-schemi, glossario ricercabile e sintesi delle tre analisi. Timer di tempo attivo, pausa, sospensione a scheda nascosta e stime non vincolanti. Percorso consigliato entro 120 minuti per argomento e 30 a casa; per i verbi più sessioni. I tempi reali vanno osservati nel gruppo.

Stelline per completamento, 60% e 100% nelle serie chiuse; una di partecipazione per pratica guidata. Totale sul miglior risultato della medesima serie; traguardi incoraggianti, nessuna penalità per giorni saltati o velocità. Il docente vede dati utili al confronto, non voti automatici.

Il tutor cerca le pillole pertinenti: è uno strumento locale guidato, non un servizio di IA generativa. Il creatore consente esercizi personali a tre risposte con spiegazione ed esportazione JSON. Questi esercizi restano nel browser e non attribuiscono premi remoti; non sono pubblicati agli altri alunni.

## Accesso, dati e docente

Il login riusa `/stradilab-auth.js`; le API `/api/grammatica/profile`, `/students`, `/events`, `/dashboard` sul dominio Deepstrad verificano l'ID token e l'autorizzazione. Il gestore designato abilita o sospende singoli account scolastici e vede per alunno argomento, data, corrette/numero attività, pratica guidata, tempo attivo e stelline. La classe accetta solo etichette come `1B Moda`.

L'evento inviato contiene esclusivamente UUID, identificativo serie, area, corrette, totale, durata e modalità chiusa/guidata. Il server assegna data e stelline; non riceve risposte, preferenze DSA/PEI o diagnosi. Le API hanno verifiche indipendenti di ruolo e non si fidano del selettore nel browser. Le risposte corrette sono incluse nel frontend: il sistema serve ad allenarsi, non a prove sorvegliate.

Gli esiti conclusi sono sincronizzati su Drive e recuperati dopo accesso sul nuovo browser; le serie in corso, le risposte, il test iniziale e gli esercizi personali restano nel browser. La coda mantiene UUID stabili, riconcilia duplicati e nuovi eventi completati durante un invio; la conferma arriva soltanto dopo risposta e rilettura. Un errore mantiene la copia locale e permette riprova. Uscire dall'account usa il logout centrale e nasconde il pannello docente.

## Verifica

`node --test tests/grammar-content.test.cjs`, `npm run test:grammar-browser`, `npm run test:grammar-adapter`. Playwright è una dipendenza di sviluppo del repository. La CI comprende anche i controlli dei percorsi preesistenti e della sincronizzazione Drive. I test sintetici coprono tutti gli argomenti standard/PEI, 30 aiuti per ciascuna lingua, RTL, creazione esercizi, conferma della coda e layout a 375 px. I test simulati non attestano OAuth reale, iPad fisico o correttezza di ogni traduzione.
