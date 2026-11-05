# Didattica e metodi · Stradivari

Portale statico “Didattica e metodi” dell'IIS Antonio Stradivari.

Online su https://didattica.stradilab.org

Il percorso è autonomo: non richiede Google Apps Script per caricare le griglie o calcolare i risultati. Comprende:

- griglie di autovalutazione delle materie, con aree generali e criteri per esercitazioni pratiche/professionali, grafiche, musicali e di laboratorio;
- check delle cinque aree DigComp 3.0;
- mini corso con attività, verifiche e glossario;
- percorso differenziato per alunni e docenti.
- nel percorso “Metodo di studio”, tre prove per le classi prime: professionale, tecnico e liceo, con livelli di guida diversi.

Pagina principale: `autovalutazione-app/index.html`.
La guida autonoma al metodo Reverse AI, raggiungibile dalla scheda docente sotto il riquadro introduttivo, è `autovalutazione-app/reverse-ai.html`.

## Autoformazione docenti · aggiornamento 15 ottobre 2026

Il profilo docente sostituisce il metodo di studio con un percorso pratico sul metodo di insegnamento. Propone esempi per discipline diverse, attività da provare in classe e un piano di miglioramento. Il confronto con un collega è facoltativo.

Le 4 ore previste comprendono metodo di insegnamento (60 min), otto capitoli e attività DigComp (165 min), domande di ripasso (15 min). Non è richiesto un voto minimo. Il check DigComp di 15 frasi resta disponibile come attività facoltativa, con risposta «Non applicabile» per il docente; non rientra nelle 4 ore. Le griglie di valutazione (PTOF) sono disponibili per gli allievi che vogliono autovalutarsi e per i docenti che le applicano nella valutazione. Sono separate dal corso e non incidono sull’attestato. Il PDF di partecipazione viene creato e archiviato per un docente autenticato che completa il percorso e dichiara le 4 ore. Per il riconoscimento occorre allegarlo a Formazione interna e attendere la validazione dell’Istituto.

I progressi dei percorsi (studio, insegnamento, DigComp e griglie) sono conservati localmente per account e profilo e possono essere sincronizzati nel Drive personale con «Collega Google Drive». La sincronizzazione richiede una concessione OAuth separata dal login e non costituisce un registro ufficiale. Gli ospiti possono lavorare localmente; dopo l'accesso possono importare esplicitamente i propri dati ospite, con conservazione della copia precedente. Nessun dato personale degli alunni va inserito nelle evidenze del corso docente.

## Sincronizzazione Drive — 1.0.10

Il client richiede esclusivamente `https://www.googleapis.com/auth/drive.appdata`. Il token OAuth resta in memoria; prima di leggere o scrivere il client confronta l'account Drive con l'account scolastico verificato. Non vengono trasferiti progressi a D1/R2 o al Worker: le chiamate avvengono dal browser alle API Google.

- Premi «Collega Google Drive» su ogni dispositivo e concedi il permesso. Il client OAuth esistente deve avere Drive API e scope abilitati, origine `https://didattica.stradilab.org` autorizzata e accesso consentito dalle politiche Workspace. I browser richiedono un gesto dell'utente anche per rinnovare un token scaduto.
- I progressi vengono recuperati automaticamente dopo il collegamento. «Sincronizza ora» conferma il trasferimento prima di cambiare dispositivo; le modifiche locali attivano anche un tentativo dopo 15 secondi di inattività. Il browser può non mostrare un avviso alla chiusura su iOS: non promettere un salvataggio alla chiusura.
- Revisioni immutabili proteggono le copie concorrenti. In caso di divergenza, la scelta è esplicita e le altre revisioni restano archiviate. Un indice aggiornato tramite Drive Changes evita di rileggere ogni revisione a ogni salvataggio; lo storico continua a consumare quota. La pulizia dello storico non è implementata e non vengono eliminate revisioni automaticamente.
- La cartella dati dell'app è privata per account e non condivisibile: non abilita una dashboard docente. Se l'utente elimina i dati dell'app da Drive, elimina anche queste copie; la sincronizzazione non sostituisce un backup istituzionale.
- Una sola scheda per origine può modificare i progressi; il portale attende un Web Lock prima di inizializzare i moduli. Sono richiesti browser moderni con Web Locks e dialog modale; una seconda scheda informa come riaprire il lavoro. Il ripristino reale tra Chrome e Safari su macOS è stato verificato il 5 novembre 2026; iPad fisico non provato.
- Gli errori di memoria locale sono visibili e bloccano sincronizzazione, cambio profilo/account e ripristini che potrebbero scartare dati non salvati. Le copie locali possono essere recuperate dal pannello dedicato.
- Il ripristino delle chiavi locali salva prima un registro di annullamento. Se una scrittura fallisce, tutte le chiavi precedenti vengono ripristinate; se anche questo recupero fallisce, il registro resta disponibile e il portale blocca il lavoro. Al successivo avvio il recupero viene tentato prima di caricare i percorsi, senza presentare dati parziali come un ripristino riuscito.

### Verifica e stato di rilascio

`npm run test:progress` prova il modello delle revisioni e il registro di annullamento; `npm run test:progress-browser` usa un servizio Drive simulato e account sintetici per verificare identità, conflitti, ripristino, quota anche a metà ripristino e più schede; `npm run test:browser` copre i percorsi preesistenti. Installare Chromium con `npx playwright install chromium` e Poppler (`pdfinfo`, pacchetto `poppler-utils` in Ubuntu); per un eseguibile locale specifico usare `PLAYWRIGHT_CHROMIUM_EXECUTABLE`. I test non provano il consenso OAuth reale, le politiche Workspace o la consistenza del feed Google reale.

La versione 1.0.10 è stata pubblicata tramite PR #5 dopo revisione indipendente dello SHA esatto e CI. Il 5 novembre 2026 il collegamento OAuth reale, il salvataggio su Drive e il ripristino passando da Chrome a Safari su macOS sono stati verificati con il titolare. iPad fisico non provato. L'audit dipendenze ha segnalato avvisi preesistenti in DOMPurify e dipendenze Miniflare; questo intervento non modifica il bundle PDF e richiede una valutazione separata della raggiungibilità prima del rilascio.

## Grammatica in Atelier — 1.3.3

Nuovo portale in `autovalutazione-app/grammatica/`, collegato dalla home: esercizi di analisi grammaticale, logica e del periodo, missioni autonome, gare di classe, XP, livelli e medaglie, ripasso visuale, supporti di lettura, accesso autorizzato dal docente e progressi su Drive. Dettagli in [docs/grammatica.md](docs/grammatica.md).

La correzione 1.3.1 aggiunge al controllo archivio del solo gestore fasi, cause e conteggi dei permessi senza dati nominali, con un collegamento validato alla cartella Grammatica. Non cambia i permessi o le regole di accesso e non attesta la risoluzione del problema Drive in produzione.

La correzione 1.3.2 ordina cronologicamente i progressi ripristinati prima di scegliere gli ultimi 20 risultati e il suggerimento della home. Lo storico completo e i relativi XP restano conservati.

La revisione 1.3.3 controlla con DeepSeek Flash tutti i 1431 ID originali (1191 attività di base e 240 adattamenti PEI), confermando separatamente le segnalazioni prima di correggerle. Migliora 408 feedback verbali, 20 consegne/feedback generali e il contesto dei 240 modelli PEI; conserva soluzioni, varianti, ID e attività aperte. Il controllo esterno non equivale a certificazione editoriale e non comprende la validazione delle traduzioni.

## Correzione di navigazione e layout · 1.3.4

Il collegamento «Grammatica in Atelier» nella home resta visibile dopo il caricamento e il cambio profilo: l’introduzione dinamica aggiorna soltanto il paragrafo dedicato. Il pannello accesso/Drive dispone messaggi e scelte su righe leggibili, mantenendo pulsanti utilizzabili su telefono e tablet. Banche degli esercizi, servizi di autenticazione e sincronizzazione invariati.
