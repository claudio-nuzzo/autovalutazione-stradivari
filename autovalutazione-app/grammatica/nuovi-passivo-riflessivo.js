(() => {
'use strict';
const bank=[];
function choice(group,level,prompt,solution,wrong,feedback){const options=[solution,...wrong],answer=bank.length%options.length;options.splice(answer,0,options.shift());bank.push({id:`pass-rifl-${String(bank.length+1).padStart(3,'0')}`,area:'parole',topicGroup:group,topic:group,level,pei:false,kind:'choice',title:'Il verbo in azione',prompt,options,answer,solution,feedback,minutes:2});}
function exact(group,level,prompt,answers,feedback){bank.push({id:`pass-rifl-${String(bank.length+1).padStart(3,'0')}`,area:'parole',topicGroup:group,topic:group,level,pei:false,kind:'exact',title:'Trasforma la forma verbale',prompt,answers,solution:answers[0],feedback,minutes:2});}
function tokens(group,level,prompt,words,answer,feedback){bank.push({id:`pass-rifl-${String(bank.length+1).padStart(3,'0')}`,area:'parole',topicGroup:group,topic:group,level,pei:false,kind:'tokens',title:'Trova nella frase',prompt,tokens:words,answer,solution:answer.map(i=>words[i]).join(' · '),feedback,minutes:3});}
const rows=[
['Passivo',1,'Quale frase è passiva?','Il pannello è levigato da Nora.',['Nora leviga il pannello.','Nora leviga con cura.'],'Il soggetto il pannello riceve l’azione espressa dal verbo passivo.'],
['Passivo',2,'In «La sedia è restaurata da Lea», chi compie il restauro?','Lea',['la sedia','nessuno'],'Da Lea indica l’agente dell’azione passiva.'],
['Passivo',2,'Quale passivo conserva il presente di «Marta controlla il modello»?','Il modello è controllato da Marta.',['Il modello era controllato da Marta.','Il modello sarà controllato da Marta.'],'È controllato è una forma passiva al presente.'],
['Passivo',3,'Qual è il soggetto di «Le prove sono state preparate dagli allievi»?','le prove',['gli allievi','sono state'],'Le prove concorda con la forma verbale passiva plurale.'],
['Passivo',2,'Quale frase non specifica l’agente dell’azione passiva?','Il progetto è stato approvato.',['Il progetto è stato approvato dal docente.','Il progetto è stato approvato dalla classe.'],'In «Il progetto è stato approvato» non è espresso chi ha approvato.'],
['Riflessivo',1,'In «Sara si pettina», chi viene pettinata?','Sara stessa',['la sorella necessariamente','nessuno'],'Si riprende il soggetto: Sara pettina sé stessa.'],
['Riflessivo',2,'Quale frase esprime un’azione reciproca?','Luca e Lea si salutano a vicenda.',['Luca saluta Lea.','Luca saluta sé stesso.'],'A vicenda chiarisce che ciascuno saluta l’altro.'],
['Riflessivo',2,'In «Io mi lavo», quale parola riprende il soggetto?','mi',['io come oggetto','lavo come pronome'],'Mi indica la stessa persona che compie l’azione.'],
['Riflessivo',3,'In «Lina si lava le mani», qual è il complemento oggetto?','le mani',['si','Lina'],'Le mani indica ciò che Lina lava; si indica a sé stessa.'],
['Riflessivo',3,'Quale frase contiene un riflessivo diretto?','Lea si asciuga dopo la pioggia.',['Lea asciuga il tavolo.','Il tavolo viene asciugato da Lea.'],'Lea asciuga sé stessa; il pronome si coincide con il soggetto.'],
['Transitività',1,'In «Ada cuce la fodera», quale gruppo è oggetto diretto?','la fodera',['Ada','cuce'],'La fodera riceve direttamente l’azione di cucire.'],
['Transitività',2,'In «Ada telefona a Nora», «a Nora» è…','complemento di termine',['oggetto diretto','soggetto'],'Telefonare a qualcuno introduce qui il destinatario con a.'],
['Transitività',2,'In «La sarta cuce», quale affermazione è corretta?','L’oggetto non è espresso.',['Il soggetto non esiste.','Cuce è un ausiliare.'],'Cucire può avere un oggetto diretto, ma qui non è espresso.'],
['Transitività',3,'Quale frase usa un oggetto diretto espresso?','La squadra attraversa il cortile.',['La squadra cammina nel cortile.','La squadra arriva in cortile.'],'Il cortile completa direttamente attraversa; negli altri esempi il luogo è introdotto da preposizione.'],
['Transitività',3,'Quale verbo è seguito da un oggetto diretto nella frase proposta?','Marta osserva il disegno.',['Marta parla del disegno.','Marta pensa al disegno.'],'Il disegno è oggetto di osserva; negli altri esempi il nome è preceduto da preposizione.'],
['Ausiliari',1,'In «Ho scelto il filo», quale parola aiuta a formare il tempo composto?','ho',['scelto','filo'],'Ho è una forma dell’ausiliare avere.'],
['Ausiliari',2,'In «Sono arrivati i campioni», quale ausiliare compare?','essere',['avere','stare'],'Sono è una forma dell’ausiliare essere.'],
['Ausiliari',2,'Quale frase contiene essere con funzione di copula, non ausiliare?','La cornice è leggera.',['La cornice è stata riparata.','La cornice è caduta.'],'È collega il soggetto alla qualità leggera; nelle altre frasi partecipa a forme verbali composte.'],
['Ausiliari',3,'Quale frase contiene avere con significato di possesso?','Ho due matite.',['Ho comprato due matite.','Ho scelto due matite.'],'In «Ho due matite», ho è verbo autonomo e indica possesso; in «Ho comprato» e «Ho scelto» forma tempi composti.'],
['Ausiliari',3,'Quale forma concorda con «le allieve»?','sono arrivate',['sono arrivato','hanno arrivate'],'Con essere il participio arrivato concorda con il soggetto femminile plurale.'],
['Verbi · Passivo',1,'Quale passivo corrisponde a «Il tecnico monta il tavolo»?','Il tavolo è montato dal tecnico.',['Il tecnico è montato dal tavolo.','Il tavolo monta il tecnico.'],'Il tavolo, oggetto dell’attiva, diventa soggetto della passiva.'],
['Verbi · Passivo',2,'Quale forma mantiene il passato prossimo di «Lia ha cucito la fodera»?','La fodera è stata cucita da Lia.',['La fodera sarà cucita da Lia.','La fodera è cucita da Lia.'],'È stata cucita è un passato prossimo passivo.'],
['Verbi · Passivo',2,'In «Il telo viene spostato dal vento», il soggetto è…','il telo',['il vento','spostato'],'Il telo subisce l’azione; dal vento esprime la causa efficiente.'],
['Verbi · Passivo',3,'Quale trasformazione conserva l’imperfetto di «La squadra preparava i campioni»?','I campioni erano preparati dalla squadra.',['I campioni sono preparati dalla squadra.','I campioni saranno preparati dalla squadra.'],'Erano preparati conserva l’imperfetto nella costruzione passiva.'],
['Verbi · Passivo',3,'In «La sedia è stata riparata dalla falegname», quale parte esprime il predicato verbale passivo completo?','è stata riparata',['dalla falegname','la sedia'],'Ausiliare e participio formano insieme la forma passiva composta.'],
['Verbi · Riflessivo',1,'Quale frase descrive un’azione compiuta dal soggetto su sé stesso?','Giada si veste.',['Giada veste la bambola.','La bambola veste Giada.'],'Si veste significa qui veste sé stessa.'],
['Verbi · Riflessivo',2,'In «Ci prepariamo per la prova», il soggetto sottinteso è…','noi',['voi','loro'],'Prepariamo è prima persona plurale e ci riprende noi.'],
['Verbi · Riflessivo',2,'In «Marta e Lia si scambiano un messaggio», si può esprimere…','reciprocità',['un articolo','un luogo'],'Le due persone compiono l’azione l’una verso l’altra.'],
['Verbi · Riflessivo',3,'In «Nora si lava il viso», quale gruppo riceve direttamente l’azione di lavare?','il viso',['Nora come oggetto diretto','si come oggetto diretto'],'Il viso è oggetto diretto; si indica a sé stessa.'],
['Verbi · Riflessivo',2,'Quale frase usa il pronome riflessivo di prima persona singolare?','Mi preparo.',['Ti prepari.','Ci prepariamo.'],'Mi e preparo si riferiscono alla prima persona singolare.']
];
for(const row of rows)choice(...row);
exact('Passivo',2,'Completa il presente passivo di «Luca misura la tavola»: «La tavola ___ misurata da Luca».',['è','viene'],'È misurata e viene misurata sono forme passive al presente e concordano con tavola.');
exact('Passivo',2,'Completa con «da»: «La giacca è stata cucita ___ Lea».',['da'],'Da introduce l’agente Lea.');
exact('Riflessivo',2,'Completa con il pronome riflessivo di prima persona: «Io ___ preparo».',['mi'],'Mi riprende il soggetto io.');
exact('Riflessivo',2,'Completa con il pronome riflessivo di terza persona: «Luca ___ lava».',['si'],'Si riprende il soggetto Luca.');
exact('Transitività',2,'Completa con il pronome oggetto «lo»: «Il modello? Lia ___ osserva».',['lo'],'Lo riprende il modello come oggetto diretto.');
exact('Transitività',2,'Completa con il pronome oggetto femminile plurale: «Le stoffe? Ada ___ taglia».',['le'],'Le sostituisce le stoffe come oggetto diretto.');
exact('Ausiliari',2,'Completa con l’ausiliare corretto: «Gli allievi ___ arrivati».',['sono'],'Il passato prossimo di arrivare richiede qui l’ausiliare essere.');
exact('Ausiliari',2,'Completa con l’ausiliare corretto: «Io ___ preparato il tavolo».',['ho'],'Il passato prossimo di preparare richiede qui l’ausiliare avere.');
exact('Verbi · Passivo',3,'Completa l’imperfetto passivo: «Il modello ___ costruito da Lara ogni anno».',['era','veniva'],'Era costruito e veniva costruito sono entrambe forme passive all’imperfetto.');
exact('Verbi · Passivo',3,'Completa il futuro semplice passivo: «Il tessuto ___ controllato domani».',['sarà','verrà'],'Sarà controllato e verrà controllato esprimono entrambe il futuro passivo.');
exact('Verbi · Riflessivo',2,'Completa con il pronome corretto: «Noi ___ prepariamo».',['ci'],'Ci riprende il soggetto noi.');
exact('Verbi · Riflessivo',2,'Completa con il pronome corretto: «Voi ___ asciugate».',['vi'],'Vi riprende il soggetto voi.');
tokens('Passivo',2,'Seleziona le parole della forma passiva.',['La','cornice','è','stata','dipinta','da','Luca.'],[2,3,4],'È stata dipinta forma il predicato passivo.');
tokens('Passivo',3,'Seleziona tutte le parole del complemento d’agente.',['Il','tavolo','viene','misurato','dalla','sarta.'],[4,5],'Dalla sarta indica la persona che compie l’azione.');
tokens('Riflessivo',2,'Seleziona il pronome e il verbo della forma riflessiva.',['Lia','si','prepara','prima','della','prova.'],[1,2],'Si prepara contiene il pronome che riprende Lia.');
tokens('Transitività',2,'Seleziona tutte le parole del complemento oggetto.',['Nora','sceglie','un','tessuto','leggero.'],[2,3,4],'Un tessuto leggero è il gruppo oggetto di sceglie.');
tokens('Ausiliari',2,'Seleziona l’ausiliare del tempo composto.',['Lea','ha','preparato','la','colla.'],[1],'Ha è ausiliare di preparato.');
tokens('Verbi · Passivo',3,'Seleziona tutte le parole della forma verbale passiva.',['I','campioni','sono','stati','controllati','dal','docente.'],[2,3,4],'Sono stati controllati è una forma passiva composta.');
tokens('Verbi · Riflessivo',2,'Seleziona il pronome e il verbo della forma riflessiva.',['Noi','ci','prepariamo','per','la','prova.'],[1,2],'Ci prepariamo comprende il pronome riferito a noi.');
tokens('Verbi · Riflessivo',3,'Seleziona il pronome e il verbo che esprimono l’azione reciproca.',['Luca','e','Sara','si','salutano','a','vicenda.'],[3,4],'Si salutano esprime qui un’azione scambiata tra i due soggetti.');
window.ATELIER_NEW_PASSIVO_RIFLESSIVO=bank;
})();
