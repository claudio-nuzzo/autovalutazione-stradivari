(() => {
const topics = [];
function choice(id, topic, area, level, prompt, options, answer, feedback) {
  topics.push({id,topic,topicGroup:groupFor(topic),area,level,pei:false,kind:'choice',title:'Allenamento',prompt,options,answer,solution:options[answer],feedback,minutes:3,review:'revisionato'});
}
function exact(id, topic, area, level, prompt, answers, feedback) {
  topics.push({id,topic,topicGroup:groupFor(topic),area,level,pei:false,kind:'exact',title:'Completa o trasforma',prompt,answers,solution:answers[0],feedback,minutes:3,review:'revisionato'});
}
function tokens(id, topic, area, level, prompt, words, answer, solution, feedback) {
  topics.push({id,topic,topicGroup:groupFor(topic),area,level,pei:false,kind:'tokens',title:'Cerca nel brano',prompt,tokens:words,answer,solution,feedback,minutes:4,review:'revisionato'});
}
function groupFor(topic) {
 const t=topic.toLowerCase();
 if(/^nome/.test(t))return 'Nome';
 if(/aggettivo/.test(t))return 'Aggettivo';
 if(/^pronomi/.test(t))return 'Pronomi';
 if(/^avverb/.test(t))return 'Avverbi';
 if(/^preposizioni/.test(t))return 'Preposizioni';
 if(/^congiunzioni/.test(t))return 'Congiunzioni';
 if(/^ortografia/.test(t))return 'Ortografia';
 if(/^verbo/.test(t)){if(/modo|modi/.test(t))return 'Modi verbali';if(/tempi|futuro/.test(t))return 'Tempi verbali';if(/ausiliare/.test(t))return 'Ausiliari';if(/transitiv/.test(t))return 'Transitività';if(/passiv/.test(t))return 'Passivo';return 'Riflessivo'}
 if(/attributo|apposizione/.test(t))return 'Attributo e apposizione';
 if(/complement/.test(t)){if(/termine|specificazione/.test(t))return 'Termine e specificazione';if(/luogo|tempo/.test(t))return 'Luogo e tempo';if(/causa|fine|mezzo|modo/.test(t))return 'Causa, fine, mezzo e modo';if(/agente/.test(t))return 'Agente e passivo';return 'Oggetto'}
 if(/predicato|soggetto/.test(t)&&!/^completiv/.test(t))return 'Soggetto e predicato';
 if(/causale|finale o causale/.test(t))return 'Causali';
 if(/finale/.test(t))return 'Finali';
 if(/temporal/.test(t))return 'Temporali';
 if(/relativ/.test(t))return 'Relative';
 if(/completiva|oggettiva|soggettiva/.test(t))return 'Completive';
 if(/esplicita|implicita/.test(t))return 'Esplicite e implicite';
 if(/coordinat|coordinaz/.test(t))return 'Coordinate';
 if(/principale|conteggio/.test(t))return 'Principale e proposizioni';
 return 'Subordinate e gradi';
}

// Nome, aggettivo, pronomi, avverbi, preposizioni, congiunzioni e ortografia.
choice('t01','Nome: comune e proprio','parole',1,'Quale parola è un nome proprio?',['fiume','Po','città'],1,'Po è il nome proprio del fiume; fiume e città sono nomi comuni.');
choice('t02','Nome: concreto e astratto','parole',2,'Quale nome indica una qualità astratta?',['coraggio','cassetto','violino','finestra'],0,'Coraggio è un nome astratto: indica una qualità, non un oggetto percepibile.');
choice('t03','Nome: genere e numero','parole',1,'Completa: «Le ___ sono aperte».',['portone','porte','porta'],1,'Porte è femminile plurale e concorda con le.');
exact('t04','Nome: plurale irregolare','parole',2,'Trasforma al plurale, riferendoti agli arti del corpo umano: il braccio.',['le braccia'],'Nel significato di arti del corpo umano, il plurale collettivo è le braccia.');
choice('t05','Nome: alterati','parole',2,'In «un librone», il suffisso -one indica:',['un libro molto grande','un libro piccolo','un libro affettuoso'],0,'Librone è un accrescitivo: indica un libro grande.');
choice('t06','Aggettivo qualificativo','parole',1,'Qual è l’aggettivo in «La strada stretta sale»?',['strada','stretta','sale'],1,'Stretta qualifica il nome strada.');
choice('t07','Gradi dell’aggettivo','parole',2,'«Più veloce di» esprime il comparativo:',['di maggioranza','di minoranza','di uguaglianza'],0,'Più… di introduce un comparativo di maggioranza.');
exact('t08','Aggettivo: superlativo','parole',2,'Forma il superlativo assoluto di «gentile».',['gentilissimo','molto gentile'],'Gentilissimo (oppure molto gentile) esprime il superlativo assoluto.');
choice('t09','Aggettivo: concordanza','parole',1,'Scegli la forma corretta: «Le finestre sono ___».',['aperta','aperti','aperte'],2,'L’aggettivo concorda con finestre, femminile plurale.');
choice('t10','Pronomi personali','parole',1,'In «Loro arrivano domani», quale parola è pronome personale?',['arrivano','domani','Loro'],2,'Loro è un pronome personale soggetto.');
choice('t11','Pronomi: uso del pronome','parole',2,'Evita la ripetizione: «Ho visto Sara e ___ ho salutata».',['la','le','li','ne'],0,'La sostituisce Sara e svolge la funzione di complemento oggetto.');
choice('t12','Pronomi possessivi','parole',2,'In «Questa penna è la mia», mia è:',['aggettivo possessivo','pronome possessivo','articolo'],1,'Mia è pronome perché sta al posto del nome penna.');
choice('t13','Pronomi relativi','parole',2,'Completa: «Il libro ___ mi hai prestato è avvincente».',['che','cui','chi'],0,'Che riprende libro e svolge la funzione di oggetto di hai prestato.');
choice('t14','Avverbi di modo','parole',1,'Quale avverbio completa «Cammina ___»?',['silenziosamente','silenziosa','silenzio'],0,'Silenziosamente è un avverbio di modo e modifica cammina.');
choice('t15','Avverbi di tempo e luogo','parole',1,'In «Ci vediamo domani», domani è un avverbio di:',['luogo','tempo','modo','quantità'],1,'Domani indica quando avverrà l’incontro.');
choice('t16','Avverbi di quantità','parole',2,'Quale parola è un avverbio di quantità?',['abbastanza','laggiù','ieri'],0,'Abbastanza indica in quale misura.');
choice('t17','Preposizioni semplici','parole',1,'Completa: «Il gatto salta ___ divano».',['sul','perché','molto'],0,'Sul (su + il) introduce il luogo su cui salta il gatto.');
choice('t18','Preposizioni articolate','parole',2,'«Dagli amici» è formato da:',['da + gli','di + gli','a + gli'],0,'Dagli unisce la preposizione da e l’articolo gli.');
choice('t19','Congiunzioni coordinanti','parole',2,'In «Vorrei uscire, ma piove», ma è:',['avversativa','conclusiva','dichiarativa'],0,'Ma oppone il desiderio di uscire al fatto che piove.');
choice('t20','Congiunzioni subordinanti','parole',2,'Completa con una congiunzione causale: «Resto a casa ___ sono stanco».',['perché','sebbene','affinché','mentre'],0,'Perché introduce la causa del restare a casa.');
choice('t21','Ortografia: accento','parole',1,'Qual è la grafia corretta?',['perche','perché','perchè'],1,'Perché vuole l’accento acuto sulla e finale.');
choice('t22','Ortografia: apostrofo','parole',1,'Scegli la forma corretta:',['qual è','qual’è','qual-e'],0,'Qual è si scrive senza apostrofo: qual è la forma tronca di quale, non un’elisione.');
choice('t23','Ortografia: h','parole',1,'Completa: «___ detto che arriverà».',['A','Ha','Ah'],1,'Ha è voce del verbo avere e richiede l’h.');
choice('t24','Ortografia: doppie','parole',1,'Quale grafia indica il primo pasto della mattina?',['colazione','collazione','colazzione'],0,'Colazione si scrive con una sola l e una sola z.');
choice('t25','Verbo: modi finiti','parole',2,'In «Spero che tu venga», venga è al modo:',['indicativo','congiuntivo','condizionale'],1,'Dopo spero che si usa il congiuntivo venga.');
choice('t26','Verbo: modi indefiniti','parole',1,'Quale forma è un infinito?',['partire','partì','partiremo'],0,'Partire è infinito presente.');
choice('t27','Verbo: tempi dell’indicativo','parole',1,'«Avevamo finito» è:',['trapassato prossimo','passato prossimo','futuro anteriore'],0,'Avevamo finito è trapassato prossimo, formato da imperfetto dell’ausiliare e participio.');
choice('t28','Verbo: futuro semplice','parole',1,'Completa al futuro semplice: «Domani noi ___ il museo».',['visitiamo','visiteremo','visitavamo'],1,'Visiteremo è futuro semplice, coerente con domani.');
choice('t29','Verbo: ausiliare','parole',2,'Completa: «Giulia ___ uscita presto».',['ha','è','aveva'],1,'Uscire, in questo uso intransitivo, forma il passato prossimo con essere.');
choice('t30','Verbo: transitivo e intransitivo','parole',2,'Quale verbo è usato transitivamente?',['Il bimbo dorme.','Marta legge un romanzo.','Il treno parte.'],1,'Legge un romanzo: il verbo regge un complemento oggetto.');
choice('t31','Verbo: forma passiva','parole',2,'Trasforma «Il vento muove le foglie» al passivo.',['Le foglie sono mosse dal vento.','Il vento è mosso dalle foglie.','Le foglie muovono il vento.','Le foglie hanno mosso il vento.'],0,'Le foglie diventano soggetto; il verbo passa alla forma passiva.');
choice('t32','Verbo riflessivo','parole',2,'Quale frase contiene un verbo riflessivo?',['Luca lava l’auto.','Luca si lava.','Luca lava i piatti.'],1,'In si lava il soggetto compie l’azione su se stesso.');

// Funzioni nella frase.
choice('t33','Attributo','frase',1,'In «Il vecchio ponte resiste», qual è l’attributo?',['ponte','vecchio','resiste'],1,'Vecchio accompagna il nome ponte e ne indica una qualità.');
choice('t34','Apposizione','frase',2,'In «Dante, poeta fiorentino, scrisse la Commedia», quale gruppo è apposizione?',['Dante','poeta fiorentino','scrisse la Commedia'],1,'Poeta fiorentino spiega e rinomina Dante.');
choice('t35','Complemento di termine','frase',1,'In «Ho consegnato il pacco a Luca», a Luca è complemento di:',['termine','specificazione','causa'],0,'Risponde alla domanda a chi ho consegnato?');
choice('t36','Complemento di specificazione','frase',1,'In «Il tetto della casa è rosso», della casa è complemento di:',['termine','specificazione','luogo'],1,'Della casa specifica di chi è il tetto.');
choice('t37','Complemento di luogo','frase',1,'In «I ragazzi giocano nel cortile», nel cortile indica:',['luogo','tempo','mezzo'],0,'Nel cortile indica il luogo in cui giocano.');
choice('t38','Complemento di tempo','frase',1,'In «Partiremo venerdì», venerdì indica:',['tempo','modo','fine'],0,'Venerdì precisa quando partiremo.');
choice('t39','Complemento di causa','frase',2,'In «Tremava per il freddo», per il freddo esprime:',['causa','fine','mezzo'],0,'Il freddo è la causa del tremare.');
choice('t40','Complemento di fine','frase',2,'In «Mi alleno per la gara», per la gara indica:',['fine o scopo','causa','modo'],0,'La gara è lo scopo dell’allenamento.');
choice('t41','Complemento di mezzo','frase',2,'In «Ho tagliato il cartone con le forbici», con le forbici indica:',['mezzo','compagnia','causa'],0,'Le forbici sono lo strumento usato per tagliare.');
choice('t42','Complemento di modo','frase',2,'In «Rispose con gentilezza», con gentilezza indica:',['modo','luogo','termine'],0,'Con gentilezza descrive il modo in cui rispose.');
choice('t43','Riconoscere il complemento oggetto','frase',1,'In «Sara prepara una torta», qual è il complemento oggetto?',['Sara','prepara','una torta'],2,'Prepara che cosa? Una torta.');
choice('t44','Predicato nominale','frase',2,'In «Il cielo è limpido», il predicato nominale è:',['il cielo','è limpido','limpido'],1,'È limpido comprende copula e nome del predicato.');
choice('t45','Soggetto sottinteso','frase',1,'In «Abbiamo vinto la partita», il soggetto sottinteso è:',['noi','voi','loro'],0,'La desinenza -iamo indica la prima persona plurale: noi.');
choice('t46','Complemento d’agente','frase',2,'In «La notizia fu diffusa da Luca», da Luca è:',['complemento d’agente','complemento oggetto','specificazione'],0,'La forma passiva introduce con da chi compie l’azione.');
choice('t47','Complementi di luogo: moto a luogo','frase',2,'In «Domani andiamo a Torino», a Torino esprime:',['moto a luogo','stato in luogo','moto da luogo','moto per luogo'],0,'Andiamo a Torino: indica la destinazione.');
choice('t48','Complementi di tempo: durata','frase',2,'In «Abbiamo camminato per due ore», per due ore esprime:',['tempo continuato','tempo determinato','causa'],0,'Per due ore indica quanto è durata la camminata.');
choice('t49','Attributo e nome','frase',1,'Quale aggettivo è attributo in «Abbiamo visto tre rondini»?',['abbiamo','visto','tre'],2,'Tre accompagna il nome rondini; è un aggettivo numerale con funzione di attributo.');
choice('t50','Apposizione semplice','frase',2,'In «Elena, mia sorella, telefona», «mia sorella» è:',['gruppo appositivo riferito a Elena','soggetto','predicato'],0,'Il nome sorella è apposizione di Elena, accompagnato dal possessivo mia.');
choice('t51','Complemento di termine: pronome','frase',2,'In «Le ho scritto una lettera», le significa:',['a lei','di lei','con lei'],0,'Le è pronome personale con funzione di complemento di termine: ho scritto a lei.');
choice('t52','Complemento di specificazione: domanda','frase',1,'Quale domanda individua «del pittore» in «il quadro del pittore»?',['di chi?','a chi?','quando?'],0,'Del pittore risponde alla domanda di chi è il quadro.');
choice('t53','Complemento di causa: riconoscimento','frase',2,'Quale frase contiene un complemento di causa?',['È pallido per la paura.','È partito per Roma.','Disegna con la matita.'],0,'Per la paura indica la causa dell’essere pallido.');
choice('t54','Complemento di fine: riconoscimento','frase',2,'Quale gruppo esprime uno scopo?',['un vaso per i fiori','un vaso sul tavolo','un vaso di vetro'],0,'Per i fiori indica la destinazione o lo scopo del vaso.');

// Proposizioni nel periodo.
choice('t55','Proposizione principale','periodo',1,'In «Quando finisce la pioggia, usciremo», qual è la principale?',['Quando finisce la pioggia','usciremo','la pioggia'],1,'Usciremo è la proposizione che regge la subordinata temporale.');
choice('t56','Proposizione coordinata','periodo',1,'In «Ho chiamato e ho lasciato un messaggio», la seconda proposizione è:',['coordinata copulativa alla principale','subordinata causale','subordinata temporale'],0,'E coordina due proposizioni sullo stesso piano.');
choice('t57','Proposizione subordinata','periodo',1,'In «Resto qui perché aspetto Marta», perché aspetto Marta è:',['principale','coordinata','subordinata'],2,'La proposizione introdotta da perché dipende da resto qui.');
choice('t58','Esplicita e implicita','periodo',2,'Quale subordinata è implicita?',['mentre preparo la cena','per preparare la cena','quando preparo la cena'],1,'Per preparare la cena ha il verbo all’infinito, senza persona espressa.');
choice('t59','Esplicita e implicita: participio','periodo',3,'In «Terminato il lavoro, siamo usciti», «Terminato il lavoro» è:',['subordinata implicita','proposizione principale','coordinata esplicita','subordinata esplicita'],0,'Terminato è participio: la subordinata è implicita.');
choice('t60','Completiva oggettiva','periodo',2,'In «Credo che abbiano ragione», che abbiano ragione è:',['oggettiva','relativa','temporale'],0,'Completa il significato di credo e risponde a che cosa credo?');
choice('t61','Completiva soggettiva','periodo',3,'In «È importante che tu riposi», che tu riposi è:',['soggettiva','oggettiva','finale','relativa'],0,'La subordinata funge da soggetto dell’espressione è importante.');
choice('t62','Completiva dichiarativa','periodo',3,'In «Ho la certezza che tornerà», che tornerà è:',['dichiarativa','oggettiva','causale'],0,'La subordinata dichiara il contenuto del nome certezza.');
choice('t63','Subordinata relativa','periodo',2,'In «La ragazza che saluta è mia cugina», che saluta è:',['relativa','finale','causale'],0,'Che riprende ragazza: la subordinata è relativa.');
choice('t64','Subordinata causale','periodo',2,'«Dato che era tardi, prendemmo un taxi»: la subordinata è:',['causale','finale','temporale'],0,'Dato che era tardi spiega la causa della scelta.');
choice('t65','Subordinata finale esplicita','periodo',3,'Quale frase contiene una finale esplicita?',['Ti scrivo affinché tu sappia tutto.','Ti scrivo perché sono libero.','Ti scrivo mentre aspetto.','Ti scrivo dopo aver cenato.'],0,'Affinché tu sappia tutto ha verbo finito al congiuntivo ed esprime lo scopo.');
choice('t66','Subordinata finale implicita','periodo',2,'In «È uscito per comprare il pane», per comprare il pane è:',['finale implicita','causale esplicita','temporale implicita'],0,'L’infinito introdotto da per esprime lo scopo dell’uscita.');
choice('t67','Subordinata temporale esplicita','periodo',2,'In «Appena arrivò, ci sedemmo», appena arrivò è:',['temporale esplicita','finale implicita','relativa'],0,'Appena introduce il momento in cui ci sedemmo; arrivò è finito.');
choice('t68','Subordinata temporale implicita','periodo',3,'In «Prima di partire, chiudi le finestre», prima di partire è:',['temporale implicita','causale esplicita','oggettiva'],0,'Prima di + infinito introduce una subordinata temporale implicita.');
choice('t69','Coordinazione avversativa','periodo',2,'In «Volevo telefonare, però era tardi», però introduce:',['coordinata avversativa','coordinata conclusiva','subordinata causale'],0,'Però collega le proposizioni opponendole.');
choice('t70','Coordinazione conclusiva','periodo',2,'Completa con una congiunzione conclusiva: «Era ormai buio, ___ tornammo».',['perciò','eppure','mentre'],0,'Perciò introduce la conseguenza del fatto che era buio.');
choice('t71','Conteggio delle proposizioni','periodo',1,'Quante proposizioni in «Luca legge mentre Anna disegna»?',['una','due','tre'],1,'Legge e disegna sono due predicati: due proposizioni.');
choice('t72','Grado della subordinata','periodo',3,'In «So che Marta dice che partirà», che partirà è subordinata di:',['primo grado','secondo grado','terzo grado'],1,'Che partirà dipende da dice, nella subordinata di primo grado: è di secondo grado.');
choice('t73','Causale esplicita','periodo',2,'Quale frase presenta una causale esplicita?',['Non esco perché piove.','Non esco per riposare.','Non esco quando piove.'],0,'Perché piove ha verbo finito e fornisce la causa.');
choice('t74','Finale o causale','periodo',2,'In «Ho abbassato la voce per non svegliare il bimbo», la subordinata indica:',['fine','causa','tempo'],0,'Non svegliare il bimbo è lo scopo per cui ho abbassato la voce.');
choice('t75','Temporale: congiunzione','periodo',1,'Completa: «___ avrai finito, potrai uscire».',['Quando','Affinché','Sebbene'],0,'Quando introduce il momento in cui sarà possibile uscire.');
choice('t76','Relativa: antecedente','periodo',2,'In «Il sentiero che attraversa il bosco è ripido», qual è l’antecedente di che?',['sentiero','bosco','ripido'],0,'Che riprende il nome sentiero.');
choice('t77','Oggettiva o soggettiva','periodo',3,'In «Sembra che tutto funzioni», la subordinata è:',['soggettiva','oggettiva','relativa','finale'],0,'Che tutto funzioni è il soggetto della costruzione impersonale sembra.');
choice('t78','Principale e subordinata','periodo',1,'In «Se studi, supererai la prova», qual è la principale?',['Se studi','supererai la prova','la prova'],1,'Supererai la prova può reggere la subordinata introdotta da se.');
choice('t79','Subordinata causale implicita','periodo',3,'In «Essendo stanca, Anna si fermò», la subordinata è:',['causale implicita','finale esplicita','relativa implicita'],0,'Essendo stanca spiega perché Anna si fermò; il gerundio la rende implicita.');
choice('t80','Coordinata copulativa','periodo',1,'In «Marco ascolta e prende appunti», e introduce una coordinata:',['copulativa','avversativa','conclusiva'],0,'E aggiunge una seconda azione: coordinazione copulativa.');

// Risposte esatte circoscritte e selezione di parole: tre meccaniche distribuite.
exact('t81','Ortografia: apostrofo','parole',1,'Riscrivi correttamente: «un amica».',['un’amica'],'Amica è femminile e inizia per vocale: si scrive un’amica.');
exact('t82','Verbo: ausiliare','parole',2,'Completa scegliendo l’ausiliare corretto: «Noi ___ arrivati» al passato prossimo.',['siamo'],'Arrivare forma il passato prossimo con essere.');
exact('t83','Complemento di modo','frase',2,'In «Ha risolto il problema con pazienza», trascrivi il complemento di modo.',['con pazienza'],'Con pazienza indica il modo in cui ha risolto il problema.');
exact('t84','Proposizione temporale','periodo',2,'Completa scegliendo soltanto «quando» oppure «appena»: «___ suona la sveglia, mi alzo».',['Quando','Appena'],'Quando (o appena) introduce il momento dell’alzarsi.');
tokens('t85','Nome: individuazione','parole',1,'Seleziona tutti i nomi nel breve testo.',['Il','pilota','osserva','le','nuvole','chiare'],[1,4],'pilota · nuvole','Pilota e nuvole sono nomi; il e le sono articoli e chiare è un aggettivo.');
tokens('t86','Aggettivo qualificativo','parole',2,'Seleziona gli aggettivi qualificativi.',['Una','lunga','strada','attraversa','campi','verdi'],[1,5],'lunga · verdi','Lunga qualifica strada e verdi qualifica campi.');
tokens('t87','Avverbio di modo','parole',2,'Seleziona l’avverbio di modo.',['Il','cane','corre','velocemente','nel','prato'],[3],'velocemente','Velocemente modifica il verbo corre e indica il modo.');
tokens('t88','Attributo','frase',1,'Seleziona l’attributo del soggetto.',['Le','vecchie','querce','crescono','qui'],[1],'vecchie','Vecchie accompagna e qualifica il soggetto querce.');
tokens('t89','Complemento di termine','frase',2,'Seleziona le parole del complemento di termine.',['La','maestra','spiega','la','regola','agli','alunni'],[5,6],'agli alunni','Spiega a chi? Agli alunni.');
tokens('t90','Proposizione principale','periodo',2,'Seleziona la proposizione principale.',['Poiché','il','sentiero','è','bagnato,','procediamo','con','cautela'],[5,6,7],'procediamo con cautela','Poiché il sentiero è bagnato è la causale; procediamo con cautela è la principale.');
tokens('t91','Subordinata temporale','periodo',2,'Seleziona la subordinata temporale.',['Quando','sorge','il','sole,','gli','escursionisti','partono'],[0,1,2,3],'Quando sorge il sole','La subordinata dice quando partono gli escursionisti.');
tokens('t92','Proposizione finale','periodo',2,'Seleziona la subordinata finale implicita.',['Abbiamo','risparmiato','per','comprare','una','bicicletta'],[2,3,4,5],'per comprare una bicicletta','Per comprare una bicicletta esprime lo scopo del risparmio.');

const positions={3:0,4:0};for(const item of topics){if(item.kind!=='choice')continue;const n=item.options.length,correct=item.options[item.answer],rest=item.options.filter((_,i)=>i!==item.answer),target=positions[n]++%n;rest.splice(target,0,correct);item.options=rest;item.answer=target}
window.ATELIER_TOPICS = topics;
})();
