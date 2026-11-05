# Grammatica in Atelier · versione 1.3.2

Destinazione: https://didattica.stradilab.org/grammatica/ . Frontend statico nella sottocartella del portale esistente; API in Deepstrad, con archivio nel Drive già configurato. Nessun database persistente Cloudflare per i risultati.

## Percorsi e materiali

1191 attività di base nelle banche: 108 attività articolate, 33 interazioni aggiuntive (incluse 12 PEI), 92 quesiti iniziali, 40 attività di lessico/fonologia e complementi, 60 sul periodo, 768 nell’officina dei verbi e 90 dedicate agli indirizzi. Le 768 attività dei verbi comprendono 360 forme semplici, 336 composte, 32 indefinite e 40 domande d’uso: sono allenamenti distinti, non 768 argomenti diversi. Si aggiungono 240 microattività PEI con esempio esplicito, una per ciascuna combinazione di indirizzo e argomento. Sono adattamenti guidati, non 240 nuovi concetti. Il selettore copre 80 gruppi di argomenti, con quantità adattata al percorso.

All’ingresso si sceglie Moda, Arredo o Liuteria. Gli esempi specifici dell’indirizzo hanno priorità; gli esercizi generali restano disponibili e i contesti palesemente di altri indirizzi vengono esclusi. La preferenza si conserva sul browser e si cambia dalla home. La contestualizzazione non pretende che ogni forma di coniugazione abbia un contesto professionale.

L’interfaccia presenta una sola attività per volta, barra di avanzamento, avanti/indietro, ritorno al ripasso e pausa. Nei completamenti il campo è nella frase al posto della lacuna; le trasformazioni senza lacuna hanno un campo breve accanto alla consegna. Le risposte aperte mantengono lo spazio di scrittura necessario. La correzione con spiegazioni avviene alla fine della serie. La revisione completa con DeepSeek è programmata separatamente per il 5 novembre 2026 alle 15:00: non è già avvenuta e non sostituisce la conferma dei singoli errori.

Accesso libero agli argomenti; orientamento iniziale facoltativo. Standard: fino a 6 attività per serie; lingua semplificata e DSA: fino a 4; PEI: fino a 3 microattività. La scelta è dell'alunno. I supporti DSA/PEI/L2 restano nel browser. Le attività PEI mostrano un esempio e chiedono riconoscimento fra due risposte. Le traduzioni di aiuto accompagnano tutte le 30 pillole in inglese, arabo (RTL) e coreano; gli esercizi mantengono l'italiano come lingua da apprendere. Questi aiuti non sono tre corsi integralmente tradotti e richiedono revisione di parlanti competenti.

30 pillole con mini-schemi, glossario ricercabile di 90 voci e sintesi delle tre analisi. Timer di tempo attivo, pausa, sospensione a scheda nascosta e stime non vincolanti. Percorso consigliato entro 120 minuti per argomento e 30 a casa; per i verbi più sessioni. I tempi reali vanno osservati nel gruppo.

Stelline per completamento, 60% e 100% nelle serie chiuse; una di partecipazione per pratica guidata. Totale sul miglior risultato della medesima serie; traguardi incoraggianti, nessuna penalità per giorni saltati o velocità. Il docente vede dati utili al confronto, non voti automatici.

Il tutor cerca le pillole pertinenti: è uno strumento locale guidato, non un servizio di IA generativa. Il creatore consente esercizi personali a tre risposte con spiegazione ed esportazione JSON. Questi esercizi restano nel browser e non attribuiscono premi remoti; non sono pubblicati agli altri alunni.

## Accesso, dati e docente

Il login riusa `/stradilab-auth.js`; le API `/api/grammatica/profile`, `/students`, `/events`, `/dashboard` sul dominio Deepstrad verificano l'ID token e l'autorizzazione. Il gestore designato abilita o sospende singoli account scolastici e vede per alunno argomento, data, corrette/numero attività, pratica guidata, tempo attivo e stelline. La classe accetta solo etichette come `1B Moda`.

L'evento inviato contiene esclusivamente UUID, identificativo serie, area, corrette, totale, durata e modalità chiusa/guidata. Il server assegna data e stelline; non riceve risposte, preferenze DSA/PEI o diagnosi. Le API hanno verifiche indipendenti di ruolo e non si fidano del selettore nel browser. Le risposte corrette sono incluse nel frontend: il sistema serve ad allenarsi, non a prove sorvegliate.

Gli esiti conclusi sono sincronizzati su Drive e recuperati dopo accesso sul nuovo browser; le serie in corso, le risposte, il test iniziale e gli esercizi personali restano nel browser. La coda mantiene UUID stabili, riconcilia duplicati e nuovi eventi completati durante un invio; la conferma arriva soltanto dopo risposta e rilettura. Un errore mantiene la copia locale e permette riprova. Uscire dall'account usa il logout centrale e nasconde il pannello docente.

## Verifica

`node --test tests/grammar-content.test.cjs`, `npm run test:grammar-browser`, `npm run test:grammar-adapter`. Playwright è una dipendenza di sviluppo del repository. La CI comprende anche i controlli dei percorsi preesistenti e della sincronizzazione Drive. I test sintetici coprono tutti gli argomenti standard/PEI per tutti e tre gli indirizzi, navigazione a schermata singola, campi inline e viewport 375/768/landscape, 30 aiuti per ciascuna lingua, RTL, creazione esercizi, conferma della coda e layout a 375 px. I test simulati non attestano OAuth reale, iPad fisico o correttezza di ogni traduzione.

Per la revisione esterna: `node scripts/export-grammar-review.cjs /percorso/revisione.json` esporta soltanto le attività da un browser locale ospite isolato, senza dati di studenti. La revisione DeepSeek programmata usa l’esportazione completa e registra la copertura per ID.

## Verifiche finali per argomento

Ogni argomento propone una verifica finale raggiungibile dalla home dopo la scelta dell’argomento oppure dalla conclusione di una serie. Sono inclusi soltanto scelta, completamento e selezione parole con soluzione strutturata; sono escluse risposte aperte e sfide personali. Fino a 8 quesiti standard, 6 nei percorsi L2/DSA, 3 PEI, con riduzione quando la banca dell’argomento contiene meno quesiti diversi. La selezione è stabile e varia livelli e, nei verbi, lemmi. Correzione automatica e spiegazioni finali, percentuale, tempo attivo e tempo consigliato (3–20 minuti). Nessun blocco per tempo scaduto. Il docente riconosce la verifica dall’identificativo attività, riceve risultato e durata, senza diagnosi o voti automatici.

Le bozze conservano il testo delle opzioni scelte, così un diverso ordine delle risposte non altera il lavoro ripreso. Le bozze 1.1.0 vengono migrate attraverso le opzioni originali. Il timer non riparte mentre si consulta una sezione diversa dalla lezione.

## Correzione 1.2.1

La consegna articolo28 chiede di scegliere una frase e motivarla con due regole: ora è risposta aperta con confronto guidato ed è esclusa dalle verifiche automatiche. Le bozze precedenti conservano il testo dell’opzione scelta al posto del vecchio indice, anche nel passaggio da scelta a risposta aperta.

## Frontend 1.3.0 · missioni, gare e livelli

Ispirazione grafica: [HUB Scuola, esercizi interattivi in pagina](https://assistenza.hubscuola.it/hc/it/articles/7460605781661-Videotutorial-Esercizi-interattivi-in-pagina-funzioni-per-il-docente). Campi nel testo, brani leggibili, modelli finali e controlli chiari accompagnano un percorso autonomo, una domanda alla volta. Il portale mantiene contenuti, account e identità StradiLab.

Tre accenti distinguono le analisi: blu per le parole, petrolio per la frase e ambra per il periodo; bordeaux per il marchio e sfondi chiari. Le etichette restano esplicite; barra di avanzamento e tempo compatto seguono la domanda su cellulare.

Ogni stellina del miglior risultato vale 10 XP. I livelli partono a 0, 60, 180, 360, 600, 900, 1400 e 2000 XP, poi proseguono ogni 500 XP. Nessun contenuto è bloccato dal livello. Le medaglie premiano prima missione, tre aree, tre giorni diversi (anche non consecutivi), miglioramento della precisione, verifica dall’80% e gara confermata. Non si perdono premi saltando un giorno. Il docente può leggere livelli, XP e risultati e tenerne conto nel proprio giudizio didattico: il portale non assegna voti.

Il docente crea una gara indicando classe, laboratorio, argomento, nome e minuti consigliati. Gli studenti autorizzati della stessa classe vedono la gara, il proprio miglior risultato e il numero aggregato dei partecipanti che hanno terminato. Gli esiti nominali restano nel pannello docente e vengono caricati solo su richiesta. La chiusura è definitiva; per una nuova gara si copia la precedente con un nuovo UUID. Non sono gare a chi finisce prima.

Le gare riusano le verifiche autocorrette e rispettano il percorso scelto dall’alunno, senza inviare preferenze di accessibilità. I tentativi della stessa gara valgono una sola volta per i premi, al miglior risultato, anche se cambia la serie. Se il docente chiude una gara durante il lavoro, il tentativo resta un allenamento personale e la sincronizzazione continua. Nessuna classifica pubblica con i nomi. I risultati sono formativi e inviati dal browser, non certificazioni di prove sorvegliate.

L’API Deepstrad `/api/grammatica/races` archivia le gare e gli esiti nello stesso Drive. Il manager dispone di un controllo dell’archivio che verifica i permessi prima di usare i dati. Se la riservatezza non è verificabile, le letture e scritture sui dati vengono bloccate; il login del manager resta disponibile per consultare il controllo. Non vengono aggiunte credenziali o nuovi scope.

`npm run test:grammar-game` verifica XP, premi, tentativi ripetuti e confini dei livelli. `npm run test:grammar-races` verifica ruoli, privacy dei risultati, gara con completamento inline e conferma, chiusura, retry e cambio account attraverso servizi sintetici. Restano separati i riscontri nominali in produzione.

## Correzione 1.3.1 · diagnostica dell’archivio Drive

Quando «Controlla archivio Drive» non conferma la riservatezza, il pannello del gestore mostra dove si interrompe il controllo, la causa e gli eventuali problemi della cartella principale. Fasi e codici vengono tradotti attraverso un elenco chiuso; booleani e conteggi ammettono soltanto valori del tipo previsto. Un dettaglio apribile riporta i conteggi per tipo di permesso, senza nomi di utenti, gruppi o dominio. L’identità del servizio «configurata» indica la presenza della configurazione rilevata dal backend, non una nuova attestazione dell’identità Google.

Il collegamento «Apri cartella Grammatica» compare solo per un URL canonico `https://drive.google.com/drive/folders/` seguito da un identificativo di 1–160 lettere, cifre, trattini o underscore. Apre una nuova scheda con `noopener noreferrer`; query, frammenti, altri host e schemi sono esclusi. Il collegamento e i dettagli restano riservati al gestore e vengono rimossi al cambio di account, anche durante una richiesta pendente. Errori grezzi del provider, indirizzi e chiavi diagnostiche sconosciute non vengono visualizzati.

Questa interfaccia usa i campi diagnostici dell’API Deepstrad 1.1.2. Non modifica i permessi Drive, le regole di autorizzazione o il blocco dei dati quando la riservatezza non è verificabile. Solo `verified: true` produce la conferma di archivio verificato; la disponibilità della diagnostica non dimostra che il problema operativo dell’archivio sia risolto.

`npm run test:grammar-races` comprende URL consentiti e malevoli, etichette ammesse e sconosciute, dati privati esclusi, valori booleani/conteggi non validi, accesso del solo gestore e rimozione dei dettagli al cambio di identità. I servizi dei test sono sintetici: non attestano i permessi reali del Drive né il consenso OAuth in produzione.

## Correzione 1.3.2 · ordine dei progressi ripristinati

Dopo il ripristino da Drive, lo storico viene letto in ordine cronologico anche quando gli eventi remoti arrivano dal più recente al più vecchio o si mescolano a tentativi locali. La vista Progressi mostra i 20 risultati più recenti in ordine decrescente; il suggerimento nella home usa l’ultimo risultato effettivo. Le date sono confrontate come istanti, con valore iniziale per date non valide e identificativo evento come criterio stabile a parità di data.

L’ordinamento lavora su una copia durante la lettura: non elimina eventi né riscrive la memoria locale per aggiornare la schermata. Stelline, XP e medaglie continuano a usare lo storico completo, compresi i risultati fuori dalle 20 righe visibili. `npm run test:grammar-migration` comprende un ripristino scolastico sintetico di 40 eventi in ordine decrescente mescolati a due tentativi locali, con date equivalenti in fusi diversi, una data non valida, ricaricamento e verifica della conservazione integrale dei dati. La prova automatica non sostituisce il riscontro reale tra browser.
