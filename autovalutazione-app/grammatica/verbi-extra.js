(() => {
'use strict';
// Allenamento originale di coniugazione: le forme sono esplicite, non ricavate
// con un algoritmo di desinenze. Non costituisce una trattazione completa dei verbi.
const activities = [];
const people = ['prima persona singolare (io)', 'seconda persona singolare (tu)', 'terza persona singolare (lui/lei)', 'prima persona plurale (noi)', 'seconda persona plurale (voi)', 'terza persona plurale (loro)'];
const modes = [
  ['indicativo-presente', 'indicativo', 'presente', 1],
  ['indicativo-imperfetto', 'indicativo', 'imperfetto', 1],
  ['indicativo-futuro', 'indicativo', 'futuro semplice', 2],
  ['indicativo-remoto', 'indicativo', 'passato remoto', 2],
  ['congiuntivo-presente', 'congiuntivo', 'presente', 2],
  ['congiuntivo-imperfetto', 'congiuntivo', 'imperfetto', 3],
  ['condizionale-presente', 'condizionale', 'presente', 2],
  ['imperativo-presente', 'imperativo', 'presente', 2]
];
const tables = {
  cantare: [
    ['canto','canti','canta','cantiamo','cantate','cantano'],
    ['cantavo','cantavi','cantava','cantavamo','cantavate','cantavano'],
    ['canterò','canterai','canterà','canteremo','canterete','canteranno'],
    ['cantai','cantasti','cantò','cantammo','cantaste','cantarono'],
    ['canti','canti','canti','cantiamo','cantiate','cantino'],
    ['cantassi','cantassi','cantasse','cantassimo','cantaste','cantassero'],
    ['canterei','canteresti','canterebbe','canteremmo','cantereste','canterebbero'],
    ['canta','cantiamo','cantate']
  ],
  lavorare: [
    ['lavoro','lavori','lavora','lavoriamo','lavorate','lavorano'],
    ['lavoravo','lavoravi','lavorava','lavoravamo','lavoravate','lavoravano'],
    ['lavorerò','lavorerai','lavorerà','lavoreremo','lavorerete','lavoreranno'],
    ['lavorai','lavorasti','lavorò','lavorammo','lavoraste','lavorarono'],
    ['lavori','lavori','lavori','lavoriamo','lavoriate','lavorino'],
    ['lavorassi','lavorassi','lavorasse','lavorassimo','lavoraste','lavorassero'],
    ['lavorerei','lavoreresti','lavorerebbe','lavoreremmo','lavorereste','lavorerebbero'],
    ['lavora','lavoriamo','lavorate']
  ],
  temere: [
    ['temo','temi','teme','temiamo','temete','temono'],
    ['temevo','temevi','temeva','temevamo','temevate','temevano'],
    ['temerò','temerai','temerà','temeremo','temerete','temeranno'],
    [['temetti','temei'],'temesti',['temette','temé'],'tememmo','temeste',['temettero','temerono']],
    ['tema','tema','tema','temiamo','temiate','temano'],
    ['temessi','temessi','temesse','temessimo','temeste','temessero'],
    ['temerei','temeresti','temerebbe','temeremmo','temereste','temerebbero'],
    ['temi','temiamo','temete']
  ],
  credere: [
    ['credo','credi','crede','crediamo','credete','credono'],
    ['credevo','credevi','credeva','credevamo','credevate','credevano'],
    ['crederò','crederai','crederà','crederemo','crederete','crederanno'],
    [['credetti','credei'],'credesti',['credette','credé'],'credemmo','credeste',['credettero','crederono']],
    ['creda','creda','creda','crediamo','crediate','credano'],
    ['credessi','credessi','credesse','credessimo','credeste','credessero'],
    ['crederei','crederesti','crederebbe','crederemmo','credereste','crederebbero'],
    ['credi','crediamo','credete']
  ],
  dormire: [
    ['dormo','dormi','dorme','dormiamo','dormite','dormono'],
    ['dormivo','dormivi','dormiva','dormivamo','dormivate','dormivano'],
    ['dormirò','dormirai','dormirà','dormiremo','dormirete','dormiranno'],
    ['dormii','dormisti','dormì','dormimmo','dormiste','dormirono'],
    ['dorma','dorma','dorma','dormiamo','dormiate','dormano'],
    ['dormissi','dormissi','dormisse','dormissimo','dormiste','dormissero'],
    ['dormirei','dormiresti','dormirebbe','dormiremmo','dormireste','dormirebbero'],
    ['dormi','dormiamo','dormite']
  ],
  partire: [
    ['parto','parti','parte','partiamo','partite','partono'],
    ['partivo','partivi','partiva','partivamo','partivate','partivano'],
    ['partirò','partirai','partirà','partiremo','partirete','partiranno'],
    ['partii','partisti','partì','partimmo','partiste','partirono'],
    ['parta','parta','parta','partiamo','partiate','partano'],
    ['partissi','partissi','partisse','partissimo','partiste','partissero'],
    ['partirei','partiresti','partirebbe','partiremmo','partireste','partirebbero'],
    ['parti','partiamo','partite']
  ],
  essere: [
    ['sono','sei','è','siamo','siete','sono'],
    ['ero','eri','era','eravamo','eravate','erano'],
    ['sarò','sarai','sarà','saremo','sarete','saranno'],
    ['fui','fosti','fu','fummo','foste','furono'],
    ['sia','sia','sia','siamo','siate','siano'],
    ['fossi','fossi','fosse','fossimo','foste','fossero'],
    ['sarei','saresti','sarebbe','saremmo','sareste','sarebbero'],
    ['sii','siamo','siate']
  ],
  avere: [
    ['ho','hai','ha','abbiamo','avete','hanno'],
    ['avevo','avevi','aveva','avevamo','avevate','avevano'],
    ['avrò','avrai','avrà','avremo','avrete','avranno'],
    ['ebbi','avesti','ebbe','avemmo','aveste','ebbero'],
    ['abbia','abbia','abbia','abbiamo','abbiate','abbiano'],
    ['avessi','avessi','avesse','avessimo','aveste','avessero'],
    ['avrei','avresti','avrebbe','avremmo','avreste','avrebbero'],
    ['abbi','abbiamo','abbiate']
  ]
};
for (const [verb, rows] of Object.entries(tables)) {
  modes.forEach(([key, mode, tense, level], modeIndex) => {
    rows[modeIndex].forEach((value, formIndex) => {
      const personIndex = mode === 'imperativo' ? [1,3,4][formIndex] : formIndex;
      const answers = Array.isArray(value) ? value : [value];
      const label = `${mode} ${tense}`;
      const introducedLabel = `${mode === 'indicativo' || mode === 'imperativo' ? 'all’' : 'al '}${label}`;
      const variant = answers.length > 1 ? ` Sono ammesse anche le varianti: ${answers.slice(1).join(', ')}.` : '';
      const rule = verb === 'essere' || verb === 'avere'
        ? `${verb === 'essere' ? 'Essere' : 'Avere'} ha una coniugazione irregolare: per la ${people[personIndex]}, ${introducedLabel}, la forma è «${answers[0]}».`
        : `La forma di «${verb}» ${introducedLabel}, ${people[personIndex]}, è «${answers[0]}».`;
      activities.push({
        id:`vx-${verb}-${key}-${personIndex + 1}`,
        area:'parole', topicGroup:`Verbi · ${label}`, topic:`Verbi: ${label} di ${verb}`,
        level, pei:false, kind:'exact', title:'Officina dei verbi',
        prompt:`Scrivi soltanto la forma verbale di «${verb}»: modo ${mode}, tempo ${tense}, ${people[personIndex]}.`,
        answers, solution:answers[0], feedback:rule + variant, minutes:1
      });
    });
  });
}

// Ogni domanda ha una sola risposta corretta. Le quattro posizioni corrette
// ricorrono dieci volte ciascuna nell'intera serie di quaranta domande.
const usage = [
  ['Uso dei tempi','imperfetto abituale',1,'In «Da piccolo, ogni estate dormivo dai nonni», quale valore ha dormivo?','Un’abitudine nel passato',['Un ordine rivolto ai nonni','Un evento futuro','Una condizione irreale nel presente'],'Ogni estate segnala la ripetizione: qui l’imperfetto descrive un’abitudine passata.'],
  ['Uso dei tempi','passato remoto narrativo',2,'In «Il viaggiatore partì all’alba e raggiunse il porto», partì presenta:','Un evento concluso nella narrazione passata',['Un’azione abituale nel presente','Un desiderio','Un ordine'],'Il passato remoto presenta qui la partenza come evento concluso nella sequenza narrativa.'],
  ['Uso dei tempi','futuro semplice',1,'In «Domani lavoreremo in biblioteca», lavoreremo colloca l’azione:','Dopo il momento in cui si parla',['Prima del momento in cui si parla','Sempre e senza limiti di tempo','Solo in un passato lontano'],'Il futuro semplice, insieme a domani, colloca il lavoro dopo il momento dell’enunciazione.'],
  ['Uso dei tempi','presente storico',2,'In un racconto storico leggi: «Nel 1861 nasce il Regno d’Italia». Quale uso ha nasce?','Presente storico',['Presente con valore di ordine','Futuro anteriore','Imperfetto abituale'],'Il presente storico racconta al presente un evento passato, come segnala la data 1861.'],
  ['Uso dei tempi','anteriorità nel passato',2,'In «Quando arrivai, Marta aveva già chiuso il negozio», quale azione avviene prima dell’arrivo?','La chiusura del negozio',['L’arrivo del narratore','Le due azioni avvengono necessariamente insieme','Non viene indicata alcuna azione precedente'],'Aveva chiuso è un trapassato prossimo: qui indica un’azione anteriore all’arrivo passato.'],
  ['Uso dei tempi','condizionale di cortesia',2,'In «Vorrei un’informazione, per favore», quale valore ha vorrei?','Una richiesta cortese',['Un ordine perentorio','Un fatto già concluso','Un’abitudine passata'],'Il condizionale presente attenua la richiesta e la rende cortese.'],
  ['Uso dei tempi','congiuntivo e desiderio',2,'Quale forma completa la frase con un congiuntivo presente? «Spero che voi ___ presto».','partiate',['partivate','partireste','partiste'],'Partiate è congiuntivo presente, seconda persona plurale di partire.'],
  ['Uso dei tempi','imperativo e istruzione',1,'In «Leggete prima le istruzioni», l’imperativo esprime:','Un’indicazione rivolta a più persone',['Un ricordo del parlante','Un’ipotesi sul passato','Un fatto futuro già concluso'],'Leggete, in questa frase, è un imperativo di seconda persona plurale con valore di istruzione.'],

  ['Passivo','trasformazione al presente',2,'Trasforma al passivo mantenendo il presente: «Il custode apre il cancello».','Il cancello è aperto dal custode.',['Il custode è aperto dal cancello.','Il cancello ha aperto il custode.','Il cancello era aperto dal custode.'],'Il complemento oggetto il cancello diventa soggetto; è aperto mantiene l’indicativo presente.'],
  ['Passivo','trasformazione al passato prossimo',3,'Trasforma al passivo mantenendo il passato prossimo: «Le ragazze hanno dipinto la parete».','La parete è stata dipinta dalle ragazze.',['La parete sarà dipinta dalle ragazze.','Le ragazze sono state dipinte dalla parete.','La parete ha dipinto le ragazze.'],'Il passato prossimo passivo è è stata dipinta; il participio concorda con la parete.'],
  ['Passivo','soggetto passivo',2,'Qual è il soggetto in «I bozzetti sono stati esposti dalla classe»?','I bozzetti',['Dalla classe','Sono stati','Esposti'],'I bozzetti è il soggetto della frase passiva; dalla classe indica chi compie l’azione.'],
  ['Passivo','agente',2,'In «Il concerto è diretto dalla maestra», chi compie l’azione di dirigere?','La maestra',['Il concerto','Il pubblico non nominato','Il verbo essere'],'Dalla maestra è il complemento d’agente: indica la persona che dirige.'],
  ['Passivo','tempo verbale',3,'Qual è il tempo di «sarà consegnato» in «Il pacco sarà consegnato domani»?','Indicativo futuro semplice passivo',['Indicativo futuro anteriore passivo','Indicativo passato prossimo passivo','Condizionale presente passivo'],'Sarà è futuro semplice di essere; consegnato è il participio che forma il passivo.'],
  ['Passivo','venire ausiliare del passivo',2,'In «Ogni sera la porta viene chiusa dal custode», viene chiusa è:','Una forma passiva',['Un futuro anteriore','Un riflessivo diretto','Una forma attiva con oggetto sottinteso'],'Venire con un participio può formare il passivo nei tempi semplici: qui viene chiusa.'],
  ['Passivo','verbi trasformabili',2,'Quale frase contiene un oggetto diretto e può essere trasformata al passivo?','La bibliotecaria sistema i volumi.',['Il bambino dorme.','Il treno parte.','La pioggia cade.'],'Sistemare è qui transitivo: i volumi è oggetto e può diventare soggetto della frase passiva.'],
  ['Passivo','concordanza del participio',2,'Completa il passivo: «Le finestre sono state ___ dal bidello».','aperte',['aperto','aperti','aprire'],'Nel passivo il participio concorda con il soggetto: finestre è femminile plurale, quindi aperte.'],

  ['Riflessivo','azione su se stessi',1,'In quale frase il soggetto compie su se stesso l’azione di lavare?','Ada si lava.',['Ada lava il pavimento.','Ada lava il cane.','Ada lava il bicchiere.'],'In Ada si lava, si corrisponde ad Ada stessa: il verbo è riflessivo diretto.'],
  ['Riflessivo','pronome di prima persona',1,'Completa con il pronome riflessivo: «Io ___ pettino».','mi',['ti','vi','si'],'Il pronome riflessivo concorda con io: io mi pettino.'],
  ['Riflessivo','pronome di seconda persona plurale',1,'Completa con il pronome riflessivo: «Voi ___ preparate per uscire».','vi',['mi','ci','ti'],'Con voi si usa vi: voi vi preparate.'],
  ['Riflessivo','passato prossimo',2,'Scegli la frase corretta al passato prossimo.','Luca si è lavato.',['Luca si ha lavato.','Luca si avere lavato.','Luca si è lavare.'],'I verbi riflessivi formano i tempi composti con essere: si è lavato.'],
  ['Riflessivo','reciprocità esplicita',2,'In «Marta e Leo si salutano l’un l’altro», si salutano ha valore:','Reciproco',['Passivo','Impersonale','Meteorologico'],'L’un l’altro rende esplicita la reciprocità: ciascuno saluta l’altro.'],
  ['Riflessivo','riflessivo apparente',3,'In «Giulia si lava le mani», che funzione ha si?','Indica a chi appartengono le mani lavate, cioè a Giulia stessa',['È il complemento oggetto del verbo','Indica una persona diversa da Giulia','Rende il verbo impersonale'],'Le mani è l’oggetto; si equivale qui ad a se stessa. È il cosiddetto riflessivo apparente o indiretto.'],
  ['Riflessivo','accordo del participio',2,'Completa: «Sara e Anna si sono ___ presto».','alzate',['alzato','alzati','alzare'],'Con essere il participio concorda con il soggetto: Sara e Anna è femminile plurale.'],
  ['Riflessivo','differenza da oggetto personale',2,'In «Marta mi saluta», mi è riflessivo?','No: indica chi riceve il saluto, diverso dal soggetto Marta',['Sì: ogni pronome mi è sempre riflessivo','Sì: saluta significa sempre salutarsi','No: mi è un articolo'],'Un pronome è riflessivo quando rinvia al soggetto. Qui mi indica il parlante, mentre il soggetto è Marta.'],

  ['Verbi servili','dovere e obbligo',1,'In «Devo consegnare il modulo entro oggi», devo esprime:','Un obbligo',['Un’abitudine passata','Un evento meteorologico','Un’azione passiva'],'Dovere accompagna l’infinito consegnare e aggiunge un valore di obbligo.'],
  ['Verbi servili','potere e possibilità',1,'In «Con questo biglietto possiamo entrare», possiamo esprime:','La possibilità di entrare',['Un ingresso già avvenuto','L’ordine di entrare subito','Un’abitudine conclusa'],'Potere accompagna l’infinito entrare ed esprime qui una possibilità consentita dal biglietto.'],
  ['Verbi servili','volere e intenzione',1,'In «Voglio imparare a nuotare», voglio esprime:','La volontà di imparare',['L’obbligo imposto da una legge','Un fatto meteorologico','Un’azione subita dal soggetto'],'Volere accompagna imparare ed esprime una volontà o un’intenzione.'],
  ['Verbi servili','infinito retto dal servile',2,'Quale forma segue il verbo servile in «Dobbiamo studiare»?','Un infinito',['Un participio passato','Un congiuntivo imperfetto','Un imperativo'],'Studiare è infinito presente; il servile dobbiamo ne precisa il valore di necessità.'],
  ['Verbi servili','riconoscimento',2,'Quale gruppo contiene un verbo servile seguito da un infinito?','Puoi aspettare.',['Hai aspettato.','Stai aspettando.','Aspetta fuori.'],'Puoi è il servile potere e aspettare è l’infinito che lo segue.'],
  ['Verbi servili','volere autonomo',2,'In quale frase volere è usato con significato autonomo, senza accompagnare un infinito?','Voglio una spremuta.',['Voglio partire.','Voglio leggere.','Voglio riposare.'],'In voglio una spremuta, volere regge direttamente un nome ed equivale a desiderare.'],
  ['Verbi servili','verbo che porta persona e numero',2,'In «Noi possiamo collaborare», quale forma esprime prima persona plurale?','possiamo',['collaborare','Noi possiamo collaborare è senza verbi','Nessuna: l’infinito indica sempre noi'],'Il servile possiamo è coniugato alla prima persona plurale; collaborare è un infinito.'],
  ['Verbi servili','richiesta con potere',2,'In «Puoi passarmi il quaderno, per favore?», il gruppo con potere serve a:','Formulare una richiesta',['Raccontare un evento del passato','Indicare un’azione passiva','Esprimere un fenomeno atmosferico'],'Potere può essere usato in una domanda per formulare una richiesta cortese.'],

  ['Verbi impersonali','fenomeno atmosferico',1,'Quale frase contiene un verbo meteorologico usato in modo impersonale?','Piove da mezz’ora.',['Piovono critiche sul progetto.','Le gocce cadono.','Il temporale arriva.'],'Piove, nel suo significato meteorologico, non ha un soggetto personale e si usa alla terza persona singolare.'],
  ['Verbi impersonali','si impersonale',2,'In «In biblioteca si parla a bassa voce», si parla indica:','Un’azione attribuita a persone in generale',['Che la biblioteca parla','Un’azione del soggetto su se stesso','Un oggetto che subisce un’azione'],'Il si impersonale presenta l’azione senza precisare chi la compie: in generale, le persone parlano a bassa voce.'],
  ['Verbi impersonali','bisognare',2,'Quale verbo è usato impersonalmente in «Bisogna aspettare il proprio turno»?','bisogna',['aspettare','proprio','turno'],'Bisognare si usa impersonalmente: bisogna esprime qui la necessità di aspettare.'],
  ['Verbi impersonali','espressione atmosferica',1,'Quale frase contiene un’espressione impersonale relativa al clima?','Oggi fa freddo.',['Luca fa una torta.','La classe fa silenzio.','Il vento fa cadere le foglie.'],'Fare è usato impersonalmente in espressioni atmosferiche come fa freddo o fa caldo.'],
  ['Verbi impersonali','persona grammaticale',2,'Nell’uso meteorologico letterale, quale forma completa «Da stamattina ___»?','nevica',['nevicano','nevichi tu','neviamo'],'Nevicare, nel significato meteorologico impersonale, si usa alla terza persona singolare: nevica.'],
  ['Verbi impersonali','si impersonale senza oggetto',2,'In quale frase si ha valore impersonale?','Qui si telefona solo nelle pause.',['Luca si pettina.','Anna si guarda allo specchio.','Marta si lava.'],'Telefonare è qui intransitivo: si telefona indica genericamente le persone che telefonano.'],
  ['Verbi impersonali','uso figurato personale',3,'In «Durante il dibattito piovono domande», qual è il soggetto?','domande',['Durante il dibattito','Nessuno: piovere è sempre impersonale','Il pubblico, necessariamente sottinteso'],'Piovere è usato in senso figurato e personale: domande è soggetto e determina il plurale piovono.'],
  ['Verbi impersonali','distinzione dal si passivante',3,'In «In questo negozio si vendono quaderni», il si è:','Passivante: quaderni è il soggetto plurale',['Riflessivo diretto: i quaderni vendono se stessi','Un pronome personale di prima persona','Impersonale con verbo necessariamente singolare'],'La frase equivale a in questo negozio vengono venduti quaderni: il verbo concorda al plurale con quaderni.']
];
usage.forEach(([group, topic, level, prompt, correct, distractors, feedback], index) => {
  const answer = index % 4;
  const options = [...distractors];
  options.splice(answer, 0, correct);
  activities.push({
    id:`vx-uso-${String(index + 1).padStart(2,'0')}`,
    area:'parole', topicGroup:`Verbi · ${group}`, topic:`Verbi: ${topic}`,
    level, pei:false, kind:'choice', title:'Officina dei verbi',
    prompt, options, answer, solution:correct, feedback, minutes:1
  });
});
// Tempi composti: l'indice collega ogni tempo alla riga del tempo semplice
// dell'ausiliare già dichiarata nelle tabelle sopra.
const compoundModes = [
  ['indicativo-passato-prossimo','indicativo','passato prossimo',0,1],
  ['indicativo-trapassato-prossimo','indicativo','trapassato prossimo',1,2],
  ['indicativo-trapassato-remoto','indicativo','trapassato remoto',3,3],
  ['indicativo-futuro-anteriore','indicativo','futuro anteriore',2,2],
  ['congiuntivo-passato','congiuntivo','passato',4,2],
  ['congiuntivo-trapassato','congiuntivo','trapassato',5,3],
  ['condizionale-passato','condizionale','passato',6,3]
];
const participles = {
  cantare:'cantato', lavorare:'lavorato', temere:'temuto', credere:'creduto',
  dormire:'dormito', partire:'partito', essere:'stato', avere:'avuto'
};
function auxiliaryFor(verb) {
  return verb === 'essere' || verb === 'partire' ? 'essere' : 'avere';
}
function agreedParticiples(verb, personIndex) {
  const participle = participles[verb];
  if (auxiliaryFor(verb) === 'avere') return [participle];
  const stem = participle.slice(0,-1);
  return personIndex < 3 ? [participle, `${stem}a`] : [`${stem}i`, `${stem}e`];
}
for (const verb of Object.keys(tables)) {
  const auxiliary = auxiliaryFor(verb);
  compoundModes.forEach(([key, mode, tense, auxiliaryRow, level]) => {
    people.forEach((person, personIndex) => {
      const auxiliaryForm = tables[auxiliary][auxiliaryRow][personIndex];
      const answers = agreedParticiples(verb, personIndex).map(participle => `${auxiliaryForm} ${participle}`);
      const label = `${mode} ${tense}`;
      const nominalLabel = `${mode === 'indicativo' ? 'L’' : 'Il '}${label}`;
      const agreement = auxiliary === 'essere'
        ? ' Il participio concorda con il soggetto: sono accettate entrambe le forme di genere, nel numero richiesto.'
        : ' In questa forma senza complemento oggetto espresso il participio resta nella forma indicata.';
      activities.push({
        id:`vx-${verb}-${key}-${personIndex + 1}`,
        area:'parole', topicGroup:`Verbi · ${label}`, topic:`Verbi: ${label} di ${verb}`,
        level, pei:false, kind:'exact', title:'Officina dei verbi',
        prompt:`Scrivi soltanto la forma verbale composta di «${verb}»: modo ${mode}, tempo ${tense}, ${person}.${auxiliary === 'essere' ? ' Puoi scegliere il maschile o il femminile, rispettando il numero della persona.' : ''}`,
        answers, solution:answers[0],
        feedback:`${nominalLabel} di «${verb}» si forma con l'ausiliare ${auxiliary} nella forma «${auxiliaryForm}» e il participio passato: ${answers.join(' / ')}.${agreement}`,
        minutes:1
      });
    });
  });
}

// Modi indefiniti: quattro forme per verbo. Il participio presente non è incluso.
const gerunds = {
  cantare:'cantando', lavorare:'lavorando', temere:'temendo', credere:'credendo',
  dormire:'dormendo', partire:'partendo', essere:'essendo', avere:'avendo'
};
for (const verb of Object.keys(tables)) {
  const auxiliary = auxiliaryFor(verb);
  const participleForms = auxiliary === 'essere'
    ? [...agreedParticiples(verb,0), ...agreedParticiples(verb,3)]
    : [participles[verb]];
  const pastInfinitives = participleForms.map(participle => `${auxiliary} ${participle}`);
  // Anche le normali forme troncate aver/esser sono risposte valide.
  const truncatedInfinitives = participleForms.map(participle => `${auxiliary.slice(0,-1)} ${participle}`);
  const pastGerunds = participleForms.map(participle => `${gerunds[auxiliary]} ${participle}`);
  const nonfiniteForms = [
    ['infinito','presente',[verb],1,`L'infinito presente di «${verb}» è «${verb}»; non esprime una persona grammaticale.`],
    ['infinito','passato',[...pastInfinitives,...truncatedInfinitives],2,`L'infinito passato si forma con l'infinito dell'ausiliare ${auxiliary} e il participio passato. Sono ammesse anche le forme troncate ${auxiliary.slice(0,-1)}.`],
    ['gerundio','presente',[gerunds[verb]],2,`Il gerundio presente di «${verb}» è «${gerunds[verb]}»; non esprime una persona grammaticale.`],
    ['gerundio','passato',pastGerunds,3,`Il gerundio passato si forma con ${gerunds[auxiliary]}, gerundio presente dell'ausiliare ${auxiliary}, e il participio passato.`]
  ];
  nonfiniteForms.forEach(([mode, tense, answers, level, feedback]) => {
    const label = `${mode} ${tense}`;
    const agreement = tense === 'passato' && auxiliary === 'essere'
      ? ' Poiché non è specificato un soggetto, sono accettate le forme del participio al maschile o femminile, singolare o plurale.'
      : '';
    activities.push({
      id:`vx-${verb}-${mode}-${tense}`,
      area:'parole', topicGroup:`Verbi · ${label}`, topic:`Verbi: ${label} di ${verb}`,
      level, pei:false, kind:'exact', title:'Officina dei verbi',
      prompt:`Scrivi soltanto la forma verbale di «${verb}»: modo ${mode}, tempo ${tense}.${agreement}`,
      answers, solution:answers[0], feedback:feedback + agreement, minutes:1
    });
  });
}
window.ATELIER_VERB_EXTRA = activities;
})();
