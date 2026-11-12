(() => {
'use strict';
const data=[
{g:'Formazione delle parole',c:[
['Quale parola deriva da «carta»?','cartiera',['carta','penna'],'Cartiera deriva dalla base di carta.'],
['Quale parola unisce due elementi lessicali?','portafoto',['foto','fotina'],'Portafoto unisce due elementi lessicali.'],
['Quale prefisso esprime ripetizione in «riscrivere»?','ri-',['-ere','-scri-'],'Ri- indica qui che l’azione è ripetuta.'],
['Quale nome è diminutivo di «scatola»?','scatolina',['scatolone','scatolame'],'Il suffisso di scatolina suggerisce piccole dimensioni.'],
['Quale parola è un falso alterato e non indica un piccolo burro?','burrone',['burretto','burro'],'Burrone ha un significato autonomo.'],
['Quale coppia contiene una base e un suo derivato?','fiore; fioraio',['fiore; prato','fiore; acqua'],'Fioraio deriva dalla base di fiore.']
],e:[['Aggiungi il prefisso «ri-» a «leggere».',['rileggere'],'Rileggere significa leggere di nuovo.'],['Scrivi il diminutivo «casetta» nella frase: Una ___ è sul colle.',['casetta'],'Casetta è un alterato diminutivo di casa.']],t:[['Seleziona la parola composta.',['Il','portapenne','è','sul','banco','.'],[1],'Portapenne unisce porta e penne.'],['Seleziona la parola derivata da «latte».',['Il','lattaio','arriva','presto','.'],[1],'Lattaio deriva dalla base di latte.']]},
{g:'Significato e registro',c:[
['Quale sinonimo sostituisce «rapido» in «un intervento rapido»?','veloce',['lento','tardivo'],'Veloce conserva il significato nel contesto.'],
['Qual è il contrario di «ampio»?','stretto',['largo','spazioso'],'Stretto esprime il significato opposto.'],
['Quale richiesta è adatta a una comunicazione formale?','Potreste indicarmi l’orario?',['Ehi, dimmi quando apri!','Oh, rispondimi subito!'],'Il condizionale e la formula cortese sono adatti a una richiesta formale.'],
['In «una voce calda», calda indica principalmente…','un timbro pieno e avvolgente',['una temperatura misurata della voce','una dimensione'],'Nel contesto caldo è usato in senso figurato.'],
['Quale parola è più generale di «violino»?','strumento musicale',['archetto','corda'],'Violino è un tipo di strumento musicale.'],
['In «la stoffa è ruvida», quale parola è più vicina a ruvida?','scabra',['liscia','setosa'],'Scabra indica una superficie non liscia.']
],e:[['Completa con il contrario «lento»: «Il movimento non è rapido: è ___».',['lento'],'Lento è il contrario di rapido.'],['Completa con il sinonimo «morbida»: «La stoffa soffice è ___».',['morbida'],'Morbida conserva qui il senso di soffice.']],t:[['Seleziona la parola usata come sinonimo di veloce.',['La','risposta','è','rapida','.'],[3],'Rapida significa veloce nel contesto.'],['Seleziona l’aggettivo che esprime il contrario di pesante.',['La','tavola','è','leggera','.'],[3],'Leggera esprime il contrario di pesante.']]},
{g:'Punteggiatura',c:[
['Quale frase separa correttamente un inciso?','La guida, molto paziente, risponde.',['La guida molto, paziente risponde.','La guida, molto paziente risponde.'],'Le virgole delimitano l’inciso.'],
['Quale segno chiude normalmente una domanda formulata direttamente?','punto interrogativo',['punto e virgola','due punti'],'Il punto interrogativo chiude una domanda diretta.'],
['Quale segno può introdurre un elenco annunciato?','due punti',['apostrofo','trattino di divisione'],'I due punti possono introdurre un elenco.'],
['Quale frase evita di separare soggetto e verbo con la virgola?','Le allieve controllano il disegno.',['Le allieve, controllano il disegno.','Le, allieve controllano il disegno.'],'Di norma una virgola non separa il soggetto dal predicato.'],
['Quale segno chiude un’esclamazione intensa?','punto esclamativo',['apostrofo','virgola obbligatoria'],'Il punto esclamativo rende il tono esclamativo.'],
['In un elenco, quale segno separa normalmente elementi semplici?','virgola',['accento','apostrofo'],'La virgola separa gli elementi di un elenco semplice.']
],e:[['Sostituisci la parola «punto» con il segno che chiude la frase: «Il lavoro è finito punto»; scrivi soltanto il segno.',['.'],'Il punto chiude una frase dichiarativa.'],['Scrivi il segno che chiude una domanda diretta.',['?'],'Il punto interrogativo segnala la domanda.']],t:[['Seleziona il punto interrogativo.',['Quando','arriverai','?'],[2],'Il punto interrogativo chiude la domanda.'],['Seleziona i due punti che introducono l’elenco.',['Porto','due','cose',':','matita','e','righello','.'],[3],'I due punti introducono l’elenco.']]},
{g:'Verbi · infinito presente',c:[
['Quale forma del verbo levigare è un infinito presente?','levigare',['levigando','levigato'],'Levigare è infinito presente.'],
['Quale verbo appartiene alla seconda coniugazione?','temere',['cantare','partire'],'La seconda coniugazione ha infinito in -ere.'],
['In «posso studiare», quale parola è all’infinito?','studiare',['posso','io'],'Studiare è infinito presente.'],
['In «il leggere aiuta», leggere funziona anche come…','nome',['preposizione','articolo'],'L’infinito è qui usato come nome.'],
['Quale forma contiene un pronome unito all’infinito?','prepararlo',['lo prepara','preparato'],'Lo si unisce all’infinito preparare.'],
['Quale infinito appartiene alla terza coniugazione?','dormire',['vedere','parlare'],'La terza coniugazione ha infinito in -ire.']
],e:[['Scrivi l’infinito presente di «noi scegliamo».',['scegliere'],'Scegliere è l’infinito del verbo.'],['Scrivi l’infinito presente di «loro finiscono».',['finire'],'Finire è l’infinito del verbo.']],t:[['Seleziona l’infinito.',['Possiamo','aprire','la','finestra','.'],[1],'Aprire è infinito presente.'],['Seleziona l’infinito con pronome unito.',['Voglio','terminarlo','oggi','.'],[1],'Terminarlo unisce terminare e lo.']]},
{g:'Verbi · infinito passato',c:[
['Quale forma è all’infinito passato?','avere scelto',['scegliere','scegliendo'],'Avere scelto unisce infinito dell’ausiliare e participio.'],
['In «dopo aver finito», il lavoro è…','anteriore al fatto reggente',['necessariamente futuro','sempre contemporaneo'],'L’infinito passato esprime anteriorità.'],
['Quale forma usa essere come ausiliare?','essere partiti',['avere letto','avere preso'],'Essere partiti usa l’ausiliare essere.'],
['Quale forma concorda con «Anna»?','essere arrivata',['essere arrivato','avere arrivata'],'Con essere il participio concorda con il soggetto.'],
['Quale forma è composta?','avere cucito',['cucire','cucendo'],'Avere cucito contiene ausiliare e participio.'],
['In «sono felice di aver studiato», lo studio è…','precedente alla felicità',['necessariamente successivo','privo di rapporto temporale'],'Aver studiato colloca lo studio prima del riferimento.']
],e:[['Completa l’infinito passato di leggere: «avere ___».',['letto'],'Letto è il participio passato di leggere.'],['Completa l’infinito passato di finire: «avere ___».',['finito'],'Finito è il participio passato di finire.']],t:[['Seleziona l’intera forma all’infinito passato.',['Dopo','avere','scelto','la','stoffa','usciamo','.'],[1,2],'Avere scelto è l’infinito passato.'],['Seleziona l’ausiliare e il participio.',['Lina','ricorda','di','essere','arrivata','presto','.'],[3,4],'Essere arrivata è l’infinito passato.']]},
{g:'Verbi · gerundio presente',c:[
['Quale forma di costruire è un gerundio presente?','costruendo',['costruire','costruito'],'Costruendo è gerundio presente.'],
['In «cammino ascoltando», ascoltando indica un’azione…','contemporanea al cammino',['necessariamente precedente','sempre successiva'],'Le due azioni avvengono insieme nel contesto.'],
['In «parlando sorride», chi parla?','il soggetto di sorride',['necessariamente un’altra persona','il complemento oggetto'],'Il soggetto del gerundio coincide qui con quello della reggente.'],
['Quale gerundio deriva da «finire»?','finendo',['finito','finire'],'Finendo è il gerundio presente di finire.'],
['In «entra sorridendo», sorridendo indica…','il modo in cui entra',['il nome di un oggetto','una persona diversa'],'Il gerundio precisa il modo dell’entrata.'],
['Quale gruppo usa stare con il gerundio?','sta disegnando',['ha disegnato','aveva disegnato'],'Stare più gerundio presenta un’azione nel suo svolgimento.']
],e:[['Completa con «cantando»: «Marta cammina ___».',['cantando'],'Cantando è gerundio presente.'],['Scrivi il gerundio presente di «leggere».',['leggendo'],'Leggendo è il gerundio presente di leggere.']],t:[['Seleziona il gerundio presente.',['Luca','corre','ridendo','.'],[2],'Ridendo è gerundio presente.'],['Seleziona il gruppo con stare e gerundio.',['Sara','sta','leggendo','il','libro','.'],[1,2],'Sta leggendo comprende stare e gerundio.']]},
{g:'Verbi · gerundio passato',c:[
['Quale forma è gerundio passato?','avendo finito',['finendo','avere finito'],'Avendo finito unisce gerundio dell’ausiliare e participio.'],
['In «avendo finito, esco», finire avviene…','prima di uscire',['dopo essere uscito','necessariamente domani'],'Il gerundio passato colloca il completamento prima dell’uscita.'],
['Quale forma usa l’ausiliare essere?','essendo arrivata',['avendo mangiato','avendo scritto'],'Essendo arrivata usa essere.'],
['Quale forma si accorda al femminile plurale con «le allieve»?','essendo partite',['essendo partito','avendo partite'],'Con essere il participio concorda col soggetto.'],
['In «avendo studiato, Nora risponde», chi ha studiato?','Nora',['necessariamente il banco','nessuno'],'Il soggetto del gerundio è qui Nora.'],
['Quale coppia distingue gerundio presente e passato?','scrivendo; avendo scritto',['scrivere; scritto','scrive; scrisse'],'Il gerundio passato contiene ausiliare e participio.']
],e:[['Completa il gerundio passato di leggere: «avendo ___».',['letto'],'Letto è il participio passato di leggere.'],['Completa il gerundio passato di uscire, femminile singolare: «essendo ___».',['uscita'],'Con essere il participio concorda al femminile singolare.']],t:[['Seleziona l’intera forma al gerundio passato.',['Avendo','terminato',',','Luca','esce','.'],[0,1],'Avendo terminato è gerundio passato.'],['Seleziona la forma composta.',['Essendo','arrivata',',','Marta','saluta','.'],[0,1],'Essendo arrivata è gerundio passato.']]},
{g:'Verbi · Uso dei tempi',c:[
['In «Ogni sera leggevo», l’imperfetto indica…','un’abitudine passata',['un ordine','un futuro certo'],'Leggevo presenta un’azione abituale nel passato.'],
['In «Quando arrivai, avevo già telefonato», telefonare è…','anteriore all’arrivo',['successivo all’arrivo','necessariamente contemporaneo'],'Avevo telefonato colloca il fatto prima di arrivai.'],
['In «Domani apriremo», il futuro semplice indica…','un fatto futuro rispetto al momento in cui si parla',['un passato concluso','un comando all’infinito'],'Apriremo colloca il fatto dopo il presente.'],
['In «Quando avrò studiato, uscirò», lo studio termina…','prima dell’uscita',['dopo l’uscita','necessariamente ieri'],'Il futuro anteriore indica anteriorità rispetto all’uscita futura.'],
['In «Mentre studiavo, il telefono squillò», l’imperfetto presenta…','lo sfondo nel suo svolgimento',['un’azione futura','un nome'],'Studiavo è l’azione in corso quando avviene lo squillo.'],
['In «Disse che sarebbe arrivata», sarebbe arrivata esprime…','posteriorità rispetto al dire passato',['un imperativo','un gerundio'],'Il condizionale passato può presentare un futuro visto dal passato.']
],e:[['Completa con «leggevo»: «Da piccolo, ogni sera, ___ un racconto».',['leggevo'],'L’imperfetto esprime qui un’abitudine passata.'],['Completa con «arriveremo»: «Domani noi ___ alle nove».',['arriveremo'],'Il futuro colloca l’arrivo dopo il momento attuale.']],t:[['Seleziona la forma che esprime il fatto precedente.',['Quando','arrivai',',','Lina','era','uscita','.'],[4,5],'Era uscita indica un fatto anteriore all’arrivo.'],['Seleziona la forma che esprime l’abitudine passata.',['Ogni','sera','Marta','disegnava','.'],[3],'Disegnava è imperfetto con valore abituale.']]}
];
const bank=[];
function push(g,kind,prompt,props,feedback,level){bank.push({id:`par-rin-${String(bank.length+1).padStart(3,'0')}`,area:'parole',topicGroup:g,topic:g,level,pei:false,kind,title:kind==='tokens'?'Trova nel testo':kind==='exact'?'Completa':'Osserva e scegli',prompt,...props,feedback,minutes:2})}
for(const t of data){for(const [i,[prompt,correct,wrong,feedback]] of t.c.entries()){const options=[correct,...wrong],answer=bank.length%options.length;options.splice(answer,0,options.shift());push(t.g,'choice',prompt,{options,answer,solution:correct},feedback,i===0?1:i===5&&t.g==='Verbi · Uso dei tempi'?3:2)}for(const [prompt,answers,feedback] of t.e)push(t.g,'exact',prompt,{answers,solution:answers[0]},feedback,prompt.includes('Scrivi')?2:1);for(const [prompt,tokens,answer,feedback] of t.t)push(t.g,'tokens',prompt,{tokens,answer,solution:answer.map(i=>tokens[i]).join(' · ')},feedback,2)}
window.ATELIER_NEW_PAROLE_RINFORZO=bank;
})();
