# Grammatica in Atelier · versione 1.2.1

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

`node --test tests/grammar-content.test.cjs`, `npm run test:grammar-browser`, `npm run test:grammar-adapter`. Playwright è una dipendenza di sviluppo del repository. La CI comprende anche i controlli dei percorsi preesistenti e della sincronizzazione Drive. I test sintetici coprono tutti gli argomenti standard/PEI per tutti e tre gli indirizzi, navigazione a schermata singola, campi inline e viewport 375/768/landscape,, 30 aiuti per ciascuna lingua, RTL, creazione esercizi, conferma della coda e layout a 375 px. I test simulati non attestano OAuth reale, iPad fisico o correttezza di ogni traduzione.

Per la revisione esterna: `node scripts/export-grammar-review.cjs /percorso/revisione.json` esporta soltanto le attività da un browser locale ospite isolato, senza dati di studenti. La revisione DeepSeek programmata usa l’esportazione completa e registra la copertura per ID.

## Verifiche finali per argomento

Ogni argomento propone una verifica finale raggiungibile dalla home dopo la scelta dell’argomento oppure dalla conclusione di una serie. Sono inclusi soltanto scelta, completamento e selezione parole con soluzione strutturata; sono escluse risposte aperte e sfide personali. Fino a 8 quesiti standard, 6 nei percorsi L2/DSA, 3 PEI, con riduzione quando la banca dell’argomento contiene meno quesiti diversi. La selezione è stabile e varia livelli e, nei verbi, lemmi. Correzione automatica e spiegazioni finali, percentuale, tempo attivo e tempo consigliato (3–20 minuti). Nessun blocco per tempo scaduto. Il docente riconosce la verifica dall’identificativo attività, riceve risultato e durata, senza diagnosi o voti automatici.

Le bozze conservano il testo delle opzioni scelte, così un diverso ordine delle risposte non altera il lavoro ripreso. Le bozze 1.1.0 vengono migrate attraverso le opzioni originali. Il timer non riparte mentre si consulta una sezione diversa dalla lezione.

## Correzione 1.2.1

La consegna articolo28 chiede di scegliere una frase e motivarla con due regole: ora è risposta aperta con confronto guidato ed è esclusa dalle verifiche automatiche. Le bozze precedenti conservano il testo dell’opzione scelta al posto del vecchio indice, anche nel passaggio da scelta a risposta aperta.
