(() => {
'use strict';
const items=[];
function choice(level,prompt,solution,wrong,feedback){const options=[solution,...wrong];const answer=items.length%options.length;options.splice(answer,0,options.shift());items.push({id:`sub-altre-${String(items.length+1).padStart(3,'0')}`,area:'periodo',topicGroup:'Altre subordinate',topic:'Altre subordinate',level,pei:false,kind:'choice',title:'Riconosci il rapporto',prompt,options,answer,solution,feedback,minutes:2});}
function exact(level,prompt,answers,feedback){items.push({id:`sub-altre-${String(items.length+1).padStart(3,'0')}`,area:'periodo',topicGroup:'Altre subordinate',topic:'Altre subordinate',level,pei:false,kind:'exact',title:'Completa il collegamento',prompt,answers,solution:answers[0],feedback,minutes:2});}
function tokens(level,prompt,words,answer,feedback){items.push({id:`sub-altre-${String(items.length+1).padStart(3,'0')}`,area:'periodo',topicGroup:'Altre subordinate',topic:'Altre subordinate',level,pei:false,kind:'tokens',title:'Individua la proposizione',prompt,tokens:words,answer,solution:answer.map(i=>words[i]).join(' '),feedback,minutes:3});}
choice(1,'In «Lascia il metro dove trovi spazio», la subordinata indica…','il luogo',['la causa','lo scopo'],'Dove trovi spazio indica il luogo in cui lasciare il metro.');
choice(2,'In «Posa il filo dove preferisci», quale proposizione è locativa?','dove preferisci',['posa il filo','il filo'],'Dove preferisci esprime il luogo della posa.');
choice(3,'In «Questo è il banco dove lavoro», «dove lavoro» precisa…','il nome banco',['il momento del lavoro','la ragione del banco'],'Dove riprende banco: la proposizione è relativa.');
choice(3,'Quale frase contiene una locativa senza antecedente nominale espresso?','Riponi il cartone dove c’è posto.',['Questo è il ripiano dove ripongo il cartone.','Visito il museo dove lavora Lea.'],'In «Riponi il cartone dove c’è posto», dove introduce il luogo senza riprendere un nome espresso.');
choice(2,'In «Oltre a misurare il pannello, Sara lo fotografa», oltre a misurare aggiunge…','un’altra azione',['il motivo della fotografia','il luogo della fotografia'],'Misurare è un’azione che si aggiunge a fotografare.');
choice(2,'Quale frase contiene un’aggiuntiva implicita?','Oltre a disegnare, Marta costruisce il modello.',['Oltre al disegno, Marta porta il modello.','Marta disegna perché serve un modello.'],'Oltre a disegnare contiene l’infinito disegnare e aggiunge un’azione.');
choice(3,'In «Oltre al disegno, porto il righello», perché oltre al disegno non è una subordinata?','Non contiene un predicato.',['Contiene un verbo finito.','È una frase interrogativa.'],'Il gruppo è nominale; una proposizione richiede un predicato.');
choice(2,'In «Invece di scartare il legno, lo recuperiamo», la subordinata esprime…','un contrasto fra scelte',['un luogo','una domanda'],'Invece di scartare contrappone l’azione non scelta a recuperare.');
choice(2,'Quale frase contiene una subordinata avversativa implicita?','Anziché uscire, resto in aula.',['Esco quando suona la campana.','Resto perché piove.'],'Anziché uscire contrappone l’uscita al rimanere ed è all’infinito.');
choice(3,'In «Mentre ieri il tavolo sembrava stabile, oggi oscilla», mentre esprime soprattutto…','un contrasto',['uno scopo','una domanda indiretta'],'Il periodo contrappone due situazioni in momenti diversi.');
choice(3,'In «Mentre Lea cuce, Marco ritaglia», mentre esprime soprattutto…','contemporaneità',['contrasto necessario','fine'],'Le due azioni vengono presentate come contemporanee.');
choice(3,'Quale frase contiene una coordinata avversativa introdotta da ma?','Volevo uscire, ma pioveva.',['Invece di uscire, leggo.','Anziché uscire, leggo.'],'Ma collega due proposizioni sullo stesso piano; invece di e anziché introducono subordinate.');
choice(3,'In «Cerco una collega che mi aiuti», che mi aiuti è una relativa con possibile sfumatura…','finale',['temporale obbligatoria','di paragone'],'La collega è cercata perché possa aiutare: la relativa ha una sfumatura di scopo.');
choice(3,'In «Luca, che conosce la strada, ci guiderà», che conosce la strada può suggerire…','una ragione per cui Luca guiderà',['un ordine diretto','un confronto numerico'],'La relativa aggiunge un’informazione che può spiegare perché Luca guiderà.');
choice(2,'In «Il progetto, credo, è pronto», quale parte è un commento incidentale?','credo',['il progetto','è pronto'],'Credo inserisce il punto di vista del parlante.');
choice(3,'In «La tavola, a mio parere, è resistente», perché «a mio parere» non è una proposizione incidentale?','Non contiene un predicato verbale.',['È una subordinata finale.','Contiene un verbo all’infinito.'],'È un inciso formato da un gruppo nominale, non una proposizione con predicato.');
choice(2,'Quale frase aggiunge un’azione a quella di progettare?','Oltre a progettare, costruisco il modello.',['Costruisco il modello perché lo progetto.','Costruisco il modello dove lavoro.'],'Oltre a progettare presenta l’azione aggiuntiva.');
choice(3,'Quale frase usa «dove» con un antecedente espresso?','Il cassetto dove trovi il filo è aperto.',['Cerca il filo dove credi.','Appoggia il filo dove vuoi.'],'Dove trovi il filo precisa il nome cassetto.');
choice(3,'In «Invece di tagliare, piego il foglio», il soggetto sottinteso di tagliare è…','io',['il foglio','una persona necessariamente diversa'],'Il soggetto sottinteso dell’infinito coincide qui con chi piega.');
choice(3,'In «Oltre a essere leggera, la sedia è robusta», che cosa aggiunge la subordinata?','la proprietà di essere leggera',['il luogo della sedia','il tempo della robustezza'],'Oltre a essere leggera aggiunge una proprietà a quella espressa nella reggente.');
exact(1,'Completa con «dove»: «Appoggia il quaderno ___ trovi spazio».',['dove'],'Dove introduce il luogo in cui appoggiare il quaderno.');
exact(1,'Completa con «anziché»: «___ buttare il legno, lo riuso».',['anziché'],'Anziché introduce qui una subordinata avversativa implicita.');
exact(1,'Completa con «mentre»: «___ Lia disegna, Nora misura».',['mentre'],'Mentre introduce qui due azioni contemporanee.');
tokens(2,'Seleziona tutte le parole della subordinata locativa.',['Metti','il','filo','dove','trovi','spazio.'],[3,4,5],'Dove trovi spazio indica il luogo.');
tokens(3,'Seleziona tutte le parole della subordinata aggiuntiva.',['Oltre','a','disegnare,','Lia','costruisce','un','modello.'],[0,1,2],'Oltre a disegnare aggiunge un’azione a costruire.');
window.ATELIER_NEW_SUBORDINATE=items;
})();
