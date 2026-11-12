(() => {
'use strict';
const bank=[];
function item(level,prompt,solution,wrong,feedback){const options=[solution,...wrong],answer=bank.length%options.length;options.splice(answer,0,options.shift());bank.push({id:`ort-av-${String(bank.length+1).padStart(3,'0')}`,area:'parole',topicGroup:'Ortografia',topic:'Ortografia',level,pei:false,kind:'choice',title:'Controlla la frase',prompt,options,answer,solution,feedback,minutes:2});}
function exact(level,prompt,answers,feedback){bank.push({id:`ort-av-${String(bank.length+1).padStart(3,'0')}`,area:'parole',topicGroup:'Ortografia',topic:'Ortografia',level,pei:false,kind:'exact',title:'Completa nel contesto',prompt,answers,solution:answers[0],feedback,minutes:2});}
function tokens(level,prompt,words,answer,feedback){bank.push({id:`ort-av-${String(bank.length+1).padStart(3,'0')}`,area:'parole',topicGroup:'Ortografia',topic:'Ortografia',level,pei:false,kind:'tokens',title:'Individua nel testo',prompt,tokens:words,answer,solution:answer.map(i=>words[i]).join(' · '),feedback,minutes:3});}
item(2,'Scegli la frase scritta correttamente.','Ho un ago e un’asola.',['Ho un’ago e un asola.','O un ago e un’asola.'],'Ho è verbo; un ago è maschile e un’asola è femminile con elisione.');
item(2,'Quale frase distingue correttamente verbo e preposizione?','Ada ha dato il metro a Lia.',['Ada a dato il metro ha Lia.','Ada ha dato il metro ha Lia.'],'Ha è verbo avere; a introduce Lia.');
item(2,'Quale frase usa correttamente «anno» e «hanno»?','Quest’anno hanno costruito un modello.',['Quest’hanno anno costruito un modello.','Quest’anno anno costruito un modello.'],'Anno è un nome; hanno è verbo avere.');
item(2,'Quale frase distingue correttamente «è» ed «e»?','La colla è pronta e il pennello è pulito.',['La colla e pronta è il pennello è pulito.','La colla è pronta è il pennello e pulito.'],'È è verbo essere; e collega due proposizioni.');
item(3,'Quale frase usa correttamente «da» e «dà»?','Da lunedì Marco dà una mano in bottega.',['Dà lunedì Marco da una mano in bottega.','Da lunedì Marco da una mano in bottega.'],'Da è preposizione; dà è verbo dare.');
item(3,'Quale frase usa correttamente pronome e avverbio?','Li trovo lì, vicino al banco.',['Lì trovo li, vicino al banco.','Li trovo li, vicino al banco.'],'Li è un pronome; lì è un avverbio di luogo accentato.');
item(3,'Quale frase usa correttamente «ne» e «né»?','Ne prendo due, né più né meno.',['Né prendo due, ne più ne meno.','Ne prendo due, ne più né meno.'],'Ne è pronome senza accento; né è congiunzione negativa.');
item(3,'Quale frase distingue correttamente «se» e «sé»?','Se Lia viene, porterà con sé il progetto.',['Sé Lia viene, porterà con se il progetto.','Se Lia viene, porterà con se il progetto.'],'Se introduce una condizione; sé è pronome tonico.');
item(3,'Quale frase contiene un troncamento corretto?','Passa un po’ di colla sulla cornice.',['Passa un pò di colla sulla cornice.','Passa un po di colla sulla cornice.'],'Po’ si scrive con apostrofo perché deriva dal troncamento di poco.');
item(3,'Quale frase usa correttamente l’espressione interrogativa?','Qual è il colore del tessuto?',['Qual’è il colore del tessuto?','Qual é il colore del tessuto?'],'Qual è si scrive senza apostrofo; è ha l’accento grave.');
item(2,'Quale frase usa correttamente l’apostrofo?','Un’allieva prepara un modello.',['Un allieva prepara un modello.','Un’allieva prepara un’modello.'],'Una si elide davanti ad allieva; un modello non ha apostrofo.');
item(3,'Quale frase è scritta correttamente?','L’idea di Luca è interessante.',['Lidea di Luca è interessante.','L’ idea di Luca è interessante.'],'L’articolo eliso si unisce con l’apostrofo alla parola successiva.');
item(3,'Quale frase distingue correttamente «c’è» e «ce»?','C’è un disegno e ce lo mostra Lea.',['Ce un disegno e c’è lo mostra Lea.','Cè un disegno e ce lo mostra Lea.'],'C’è significa ci è; ce è una forma pronominale davanti a lo.');
item(3,'Quale frase distingue correttamente «l’ha» e «la»?','La giacca? Lea l’ha riparata.',['La giacca? Lea la riparata.','L’ha giacca? Lea la riparata.'],'La è articolo; l’ha unisce il pronome la alla forma ha.');
item(2,'Quale frase è corretta?','Le allieve hanno scelto due stoffe.',['Le allieve anno scelto due stofe.','Le allieve hanno scelto due stofe.'],'Hanno è ausiliare; stoffe si scrive con doppia f.');
item(3,'Quale frase corregge entrambi gli errori di «O scelto un panello»?','Ho scelto un pannello.',['O scelto un pannello.','Ho scelto un panello.'],'Ho è verbo avere; pannello ha doppia n.');
item(3,'Quale frase corregge entrambi gli errori di «Un’ago e sul tavolo»?','Un ago è sul tavolo.',['Un’ago è sul tavolo.','Un ago e sul tavolo.'],'Ago è maschile: un senza apostrofo; è è verbo.');
item(3,'Quale frase corregge l’errore di «Lia a una matita blu e la usa qui»?','Lia ha una matita blu e la usa qui.',['Lia a una matita blu è la usa qui.','Lia ha una matita blu è la usa quì.'],'Ha è verbo avere; e collega; qui non richiede accento.');
item(3,'Quale frase usa la maiuscola nel nome proprio e la minuscola nel nome della lingua?','Nora studia italiano a Cremona.',['Nora studia Italiano a cremona.','nora studia italiano a Cremona.'],'Nora e Cremona sono nomi propri; italiano indica una lingua.');
item(3,'Quale frase distingue la locuzione «a volte» dal participio «avvolte»?','A volte le stoffe sono avvolte nella carta.',['Avvolte le stoffe sono avolte nella carta.','Avolte le stoffe sono avvolte nella carta.'],'A volte significa talvolta; avvolte è participio di avvolgere.');
item(3,'Quale frase distingue l’avverbio «ancora» dal verbo «àncora»?','Il marinaio àncora la barca e aspetta ancora.',['Il marinaio ancora la barca e aspetta ancòra.','Il marinaio àncora la barca e aspetta ancóra.'],'Qui l’accento su àncora distingue la voce del verbo dall’avverbio ancora.');
item(3,'Quale frase usa correttamente l’imperativo?','Di’ a Sara che il lavoro è pronto.',['Di a Sara che il lavoro è pronto.','Dí a Sara che il lavoro è pronto.'],'Di’ è una forma troncata dell’imperativo di dire e porta l’apostrofo.');
item(3,'Quale frase è scritta correttamente?','Verrò lunedì perché oggi non posso.',['Verrò lunedi perchè oggi non posso.','Verro lunedì perchè oggi non posso.'],'Verrò e lunedì sono accentati; perché richiede accento acuto.');
item(3,'Quale frase usa correttamente la forma dell’imperativo?','Da’ il foglio a Luca.',['Dà il foglio a Luca.','Da il foglio a Luca.'],'Da’ con apostrofo è una forma dell’imperativo di dare.');
exact(2,'Completa con «ho» oppure «o»: «___ controllato le misure».',['ho'],'Ho è la prima persona del verbo avere.');
exact(2,'Completa con «hai» oppure «ai»: «Hai consegnato il foglio ___ compagni?».',['ai'],'Ai è la preposizione articolata a più i.');
exact(2,'Completa con «è» oppure «e»: «La cornice ___ pronta».',['è'],'È è una forma del verbo essere.');
exact(2,'Completa con «e» oppure «è»: «Nora cuce ___ Luca disegna».',['e'],'E collega due proposizioni.');
exact(3,'Completa con «ne» oppure «né»: «I campioni sono cinque; ___ scelgo due».',['ne'],'Ne significa di questi campioni ed è senza accento.');
exact(3,'Completa con «li» oppure «lì»: «I fogli? ___ porto in aula».',['li'],'Li è un pronome che riprende i fogli.');
exact(3,'Completa con «da» oppure «dà»: «Lia ___ il quaderno a Nora».',['dà'],'Dà è la terza persona singolare del presente di dare.');
exact(3,'Completa con «qual è» oppure «qual’è»: «___ il campione scelto?».',['qual è'],'Qual è non richiede apostrofo.');
tokens(3,'Seleziona le parole che contengono un apostrofo.',['Un’allieva','ha','un','ago','e','un’asola.'],[0,5],'Un’allieva e un’asola contengono l’articolo una eliso.');
tokens(3,'Seleziona le parole con accento grafico.',['Lì','c’è','già','un','modello.'],[0,1,2],'Lì, c’è e già contengono un accento grafico.');
tokens(2,'Seleziona le forme del verbo avere.',['Hai','un','filo,','ma','ho','solo','un','ago.'],[0,4],'Hai e ho sono forme del verbo avere.');
tokens(3,'Seleziona soltanto le parole scritte con doppia consonante.',['Il','pannello','di','legno','è','sul','carrello.'],[1,6],'Pannello contiene nn e ll; carrello contiene rr e ll.');
tokens(3,'Seleziona gli avverbi di luogo accentati.',['Lì','c’è','un','cassetto;','là','c’è','un','tavolo.'],[0,4],'Lì e là indicano luogo; c’è contiene una forma del verbo essere.');
tokens(3,'Seleziona le congiunzioni negative accentate.',['Non','vedo','né','ago','né','filo.'],[2,4],'Entrambe le forme né collegano elementi in una frase negativa.');
tokens(3,'Seleziona le due forme accentate del verbo dare.',['Marta','dà','un','filo','e','Luca','dà','una','matita.'],[1,6],'Dà è voce del verbo dare in entrambe le proposizioni.');
tokens(3,'Seleziona le due parole che contengono un apostrofo.',['L’ago','è','vicino','all’asola','nuova.'],[0,3],'L’ago e all’asola contengono forme elise con apostrofo.');
window.ATELIER_NEW_ORTOGRAFIA_AVANZATA=bank;
})();
