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

## Sincronizzazione Drive — candidato 1.0.10

Il client richiede esclusivamente `https://www.googleapis.com/auth/drive.appdata`. Il token OAuth resta in memoria; prima di leggere o scrivere il client confronta l'account Drive con l'account scolastico verificato. Non vengono trasferiti progressi a D1/R2 o al Worker: le chiamate avvengono dal browser alle API Google.

- Premi «Collega Google Drive» su ogni dispositivo e concedi il permesso. Il client OAuth esistente deve avere Drive API e scope abilitati, origine `https://didattica.stradilab.org` autorizzata e accesso consentito dalle politiche Workspace. I browser richiedono un gesto dell'utente anche per rinnovare un token scaduto.
- I progressi vengono recuperati automaticamente dopo il collegamento. «Sincronizza ora» conferma il trasferimento prima di cambiare dispositivo; le modifiche locali attivano anche un tentativo dopo 15 secondi di inattività. Il browser può non mostrare un avviso alla chiusura su iOS: non promettere un salvataggio alla chiusura.
- Revisioni immutabili proteggono le copie concorrenti. In caso di divergenza, la scelta è esplicita e le altre revisioni restano archiviate. Un indice aggiornato tramite Drive Changes evita di rileggere ogni revisione a ogni salvataggio; lo storico continua a consumare quota. La pulizia dello storico non è implementata e non vengono eliminate revisioni automaticamente.
- La cartella dati dell'app è privata per account e non condivisibile: non abilita una dashboard docente. Se l'utente elimina i dati dell'app da Drive, elimina anche queste copie; la sincronizzazione non sostituisce un backup istituzionale.
- Una sola scheda per origine può modificare i progressi; il portale attende un Web Lock prima di inizializzare i moduli. Sono richiesti browser moderni con Web Locks e dialog modale; una seconda scheda informa come riaprire il lavoro. Le prove su Safari/iPad fisico restano una verifica di rilascio.
- Gli errori di memoria locale sono visibili e bloccano sincronizzazione, cambio profilo/account e ripristini che potrebbero scartare dati non salvati. Le copie locali possono essere recuperate dal pannello dedicato.

### Verifica e stato di rilascio

`npm run test:progress` prova il modello delle revisioni; `npm run test:progress-browser` usa un servizio Drive simulato e account sintetici per verificare identità, conflitti, ripristino, quote e più schede; `npm run test:browser` copre i percorsi preesistenti. Installare Chromium con `npx playwright install chromium`; per un eseguibile locale specifico usare `PLAYWRIGHT_CHROMIUM_EXECUTABLE`. I test non provano il consenso OAuth reale, le politiche Workspace o la consistenza del feed Google reale.

Prima della produzione: revisione dello SHA esatto, CI, autorizzazione OAuth con account di prova, salvataggio e ripristino su un secondo dispositivo, prova Safari/iPad e confronto degli asset pubblicati. La versione di manifest è un candidato, non una dichiarazione di pubblicazione. L'audit dipendenze ha segnalato avvisi preesistenti in DOMPurify e dipendenze Miniflare; questo intervento non modifica il bundle PDF e richiede una valutazione separata della raggiungibilità prima del rilascio.
