(() => {
'use strict';
const rows=[
['Articolo',2,'Quale articolo completa «Ho scelto ___ scialle blu»?','uno',['un','una'],'Davanti a s seguita da consonante si usa uno.'],
['Articolo',2,'Quale articolo completa «Abbiamo preparato ___ orlo della giacca»?','l’',['il','lo'],'Davanti a vocale lo si elide: l’orlo.'],
['Articolo',2,'Quale gruppo è scritto correttamente?','un’antica bottega',['un antica bottega','un’antico laboratorio'],'Antica bottega è femminile; una si elide davanti a vocale.'],
['Articolo',2,'Quale gruppo è scritto correttamente?','un ottimo intarsio',['un’ottimo intarsio','uno ottimo intarsio'],'Intarsio è maschile; un non richiede apostrofo.'],
['Articolo',2,'Quale articolo introduce una quantità non precisa nella frase «Servono ___ corde di ricambio»?','delle',['dello','del'],'Delle è partitivo femminile plurale e qui equivale ad alcune.'],
['Articolo',3,'Quale frase usa «dello» come articolo partitivo?','Bevo dello sciroppo.',['La superficie dello strumento è lucida.','Parliamo dello strumento.'],'Nella prima frase dello significa un po’ di; negli altri casi introduce un gruppo retto da un nome o verbo.'],
['Articolo',3,'Quale frase usa «delle» come preposizione articolata?','Il colore delle fodere è chiaro.',['Ho acquistato delle fodere.','Delle fodere sono pronte.'],'Delle fodere precisa il nome colore; nelle altre frasi delle indica alcune.'],
['Articolo',3,'Quale articolo si accorda con «studenti» nella frase «___ studenti lavorano»?','gli',['i','le'],'Studenti è maschile plurale e inizia per s più consonante.'],
['Articolo',3,'In quale frase «lo» è articolo?','Lo strumento è accordato.',['Lo accordo domani.','Lo vedo qui.'],'Lo accompagna il nome strumento; negli altri casi sostituisce un nome.'],
['Articolo',3,'In «Un’ampia aula è pronta», perché compare l’apostrofo?','Una si elide davanti alla vocale di ampia.',['Un maschile si tronca davanti a vocale.','Ampia è plurale.'],'L’articolo femminile una perde la vocale davanti ad ampia.'],
['Articolo',3,'Quale frase usa l’articolo per indicare un’intera categoria?','La viola è uno strumento ad arco.',['La viola di Giulia è nella custodia.','Quella viola è nella custodia.'],'La viola indica qui il tipo di strumento, non un esemplare preciso.'],
['Articolo',3,'Quale riscrittura mantiene il riferimento indefinito al plurale di «Una tavola è pronta»?','Alcune tavole sono pronte.',['Le tavole sono pronte.','Quelle tavole sono pronte.'],'Alcune indica un numero non precisato senza presentare le tavole come già identificate.'],
['Articolo',2,'Quale forma completa «___ xilofoni sono esposti»?','gli',['i','le'],'Davanti a x iniziale, il maschile plurale usa gli.'],
['Articolo',2,'Quale forma completa «___ gnomo intagliato è sul tavolo»?','lo',['il','la'],'Davanti a gn iniziale il determinativo maschile singolare è lo.'],
['Articolo',3,'Quale frase contiene un articolo davanti a una parola usata come nome di colore?','Il rosso del campione è intenso.',['Il campione rosso è intenso.','Il campione diventa rosso.'],'Nel primo caso rosso è presentato come nome del colore.'],
['Nome',2,'Quale nome indica un insieme pur essendo singolare?','equipaggio',['passeggero','valigia'],'Equipaggio indica un gruppo di persone ed è un nome collettivo.'],
['Nome',2,'Quale parola è un nome astratto?','precisione',['righello','telaio'],'Precisione nomina una qualità, non un oggetto materiale.'],
['Nome',2,'Quale coppia contiene un nome proprio e uno comune, nell’ordine?','Cremona; città',['città; Cremona','viola; violino'],'Cremona identifica una città particolare; città indica una categoria.'],
['Nome',2,'Qual è il plurale invariabile di «la città»?','le città',['le cittài','le cittade'],'Città mantiene la stessa forma; cambia l’articolo.'],
['Nome',2,'Quale plurale è corretto per «valigia»?','valigie',['valiggiee','valiggie'],'Nel plurale valigie si mantiene la i grafica.'],
['Nome',2,'Quale plurale è corretto per «doccia»?','docce',['doccie','doccè'],'Nel plurale docce la i non compare.'],
['Nome',3,'Quale coppia mostra una forma maschile e femminile dello stesso nome di genere comune?','il cantante; la cantante',['il maestro; la maestra','il fratello; la sorella'],'Cantante conserva la forma; l’articolo segnala il genere.'],
['Nome',3,'Quale coppia è formata da nomi indipendenti per maschile e femminile?','padre; madre',['cuoco; cuoca','cantante; cantante'],'Padre e madre sono parole diverse per i due referenti.'],
['Nome',3,'Quale nome è un alterato diminutivo di «tavolo»?','tavolino',['tavola','tavolato'],'Tavolino è formato con un suffisso diminutivo.'],
['Nome',3,'Quale nome è composto?','apriscatole',['scatola','scatolina'],'Apriscatole unisce gli elementi apri e scatole.'],
['Nome',3,'Quale parola è derivata dal nome «bosco»?','boscaiolo',['bosco','prato'],'Boscaiolo deriva dalla base di bosco con un suffisso.'],
['Nome',3,'Quale parola è un falso alterato, non una grande torre?','torrone',['torretta','torricella'],'Torrone è il nome di un dolce, non un accrescitivo di torre.'],
['Nome',3,'Quale plurale indica le pareti di una stanza?','i muri',['le mura della città','le mure'],'I muri indica qui le pareti; le mura indica spesso la cinta di una città.'],
['Nome',3,'In «La classe ascolta», come concorda normalmente il verbo con il nome collettivo singolare?','al singolare',['al plurale perché gli studenti sono molti','all’infinito'],'Il verbo concorda con classe, che è singolare.'],
['Nome',3,'Quale nome conserva la stessa forma al singolare e al plurale?','film',['mobile','tavolo'],'Si dice il film e i film: il nome è invariabile.']
];
const items=rows.map(([topicGroup,level,prompt,correct,wrong,feedback],i)=>{let options=[correct,...wrong],answer=i%options.length;options.splice(answer,0,options.shift());return{id:`na-av-${String(i+1).padStart(3,'0')}`,area:'parole',topicGroup,topic:topicGroup,level,pei:false,kind:'choice',title:'Analizza il contesto',prompt,options,answer,solution:correct,feedback,minutes:2}});
function exact(topicGroup,level,prompt,answers,feedback){items.push({id:`na-av-${String(items.length+1).padStart(3,'0')}`,area:'parole',topicGroup,topic:topicGroup,level,pei:false,kind:'exact',title:'Completa',prompt,answers,solution:answers[0],feedback,minutes:2})}
function tokens(topicGroup,level,prompt,words,answer,feedback){items.push({id:`na-av-${String(items.length+1).padStart(3,'0')}`,area:'parole',topicGroup,topic:topicGroup,level,pei:false,kind:'tokens',title:'Trova nel testo',prompt,tokens:words,answer,solution:answer.map(i=>words[i]).join(' · '),feedback,minutes:3})}
exact('Articolo',2,'Inserisci il determinativo maschile plurale: ___ zaini sono nell’armadio.',['gli'],'Davanti a z iniziale si usa gli al maschile plurale.');
exact('Articolo',2,'Inserisci l’indeterminativo maschile singolare: ___ ago è sul piano.',['un'],'Ago è maschile: un non prende apostrofo.');
exact('Articolo',2,'Inserisci il determinativo femminile plurale: ___ stoffe sono pronte.',['le'],'Stoffe è femminile plurale: le stoffe.');
exact('Articolo',2,'Inserisci l’indeterminativo maschile singolare: ___ specchio è appeso.',['uno'],'Davanti a s più consonante si usa uno.');
exact('Articolo',3,'Inserisci il partitivo femminile plurale: Servono ___ spille.',['delle'],'Delle spille indica una quantità indefinita di spille.');
exact('Nome',2,'Scrivi il plurale di «arancia»: due ___.',['arance'],'Il plurale di arancia è arance, senza i grafica.');
exact('Nome',2,'Scrivi il plurale di «camicia»: due ___.',['camicie','camice'],'Camicie è la grafia corrente; è attestata anche camice, meno frequente e ambigua.');
exact('Nome',2,'Scrivi il singolare di «mensole»: una ___.',['mensola'],'Mensola è il singolare di mensole.');
exact('Nome',2,'Scrivi il plurale di «tavolo»: due ___.',['tavoli'],'Tavoli è il plurale di tavolo.');
exact('Nome',1,'Completa con il nome collettivo «orchestra»: Un’___ di musicisti si prepara.',['orchestra'],'Orchestra è un nome collettivo che indica un insieme di musicisti.');
tokens('Articolo',2,'Seleziona tutti gli articoli semplici della frase.',['La','modellista','prepara','una','tasca','e','il','colletto','.'],[0,3,6],'La e il sono determinativi; una è indeterminativo.');
tokens('Articolo',2,'Seleziona gli articoli semplici; non selezionare la preposizione articolata.',['Un','allievo','apre','la','porta','del','laboratorio','.'],[0,3],'Un e la sono articoli; del è una preposizione articolata.');
tokens('Articolo',3,'Seleziona gli articoli partitivi.',['Abbiamo','comprato','dei','nastri','e','delle','spille','.'],[2,5],'Dei e delle indicano qui quantità non precisate.');
tokens('Articolo',3,'Seleziona l’articolo determinativo e l’articolo indeterminativo.',['Lo','strumento','riposa','in','una','custodia','.'],[0,4],'Lo accompagna strumento e una accompagna custodia.');
tokens('Articolo',3,'Seleziona soltanto la parola «lo» usata come articolo.',['Lo','scaffale','è','alto','e','Lina','lo','misura','.'],[0],'Il primo lo accompagna scaffale; il secondo sostituisce il nome.');
tokens('Nome',2,'Seleziona i due nomi comuni della frase.',['Il','liutaio','vernicia','la','tavola','.'],[1,4],'Liutaio nomina una persona; tavola nomina una cosa.');
tokens('Nome',2,'Seleziona i due nomi propri.',['Marta','lavora','a','Cremona','in','laboratorio','.'],[0,3],'Marta e Cremona identificano una persona e un luogo.');
tokens('Nome',3,'Seleziona il nome collettivo.',['La','squadra','prepara','il','modello','.'],[1],'Squadra è singolare ma indica un insieme di persone.');
tokens('Nome',3,'Seleziona i due nomi derivati.',['Il','fioraio','incontra','la','fioraia','in','piazza','.'],[1,4],'Fioraio e fioraia sono derivati dalla base di fiore.');
tokens('Nome',3,'Seleziona il nome astratto.',['La','pazienza','aiuta','la','modellista','.'],[1],'Pazienza nomina una qualità; modellista nomina una persona.');
window.ATELIER_NEW_NOME_ARTICOLO_AVANZATI=items;
})();
