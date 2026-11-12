(() => {
'use strict';
const items=[];
function choice(group,level,prompt,correct,wrong,feedback){
 const options=[correct,...wrong];
 const offset=items.length%options.length;
 options.splice(offset,0,options.shift());
 items.push({id:`am-extra-${String(items.length+1).padStart(3,'0')}`,area:'parole',topicGroup:group,topic:group,level,pei:false,kind:'choice',title:'Metti alla prova la regola',prompt,options,answer:options.indexOf(correct),solution:correct,feedback,minutes:2});
}
function exact(group,level,prompt,answers,feedback){
 items.push({id:`am-extra-${String(items.length+1).padStart(3,'0')}`,area:'parole',topicGroup:group,topic:group,level,pei:false,kind:'exact',title:'Scrivi nella frase',prompt,answers,solution:answers[0],feedback,minutes:2});
}
function tokens(group,level,prompt,words,answer,feedback){
 items.push({id:`am-extra-${String(items.length+1).padStart(3,'0')}`,area:'parole',topicGroup:group,topic:group,level,pei:false,kind:'tokens',title:'Cerca nel testo',prompt,tokens:words,answer,solution:answer.map(i=>words[i]).join(' · '),feedback,minutes:3});
}
choice('Articolo',1,'Quale articolo determinativo completa «___ tavolo è pronto»?','Il',['Lo','La'],'Tavolo è maschile singolare e inizia con consonante semplice.');
choice('Articolo',1,'Quale articolo completa «___ stoffe sono piegate»?','Le',['La','Gli'],'Stoffe è femminile plurale: le stoffe.');
choice('Articolo',1,'Quale articolo completa «___ zaino è sul banco»?','Lo',['Il','La'],'Davanti a z iniziale si usa lo.');
choice('Articolo',1,'Quale articolo indeterminativo completa «___ amica cuce»?','un’',['un','uno'],'Amica è femminile e inizia per vocale: una si elide.');
choice('Articolo',1,'Quale articolo indeterminativo completa «___ ago è caduto»?','un',['un’','uno'],'Ago è maschile: un non prende apostrofo.');
choice('Articolo',1,'Quale articolo completa «___ strumenti sono accordati»?','Gli',['I','Le'],'Strumenti inizia con s seguita da consonante: gli strumenti.');
exact('Articolo',1,'Completa con l’articolo determinativo maschile singolare: ___ violino è nella custodia.',['il'],'Violino è maschile singolare e inizia con consonante semplice: il violino.');
exact('Articolo',1,'Completa con l’articolo determinativo plurale: ___ sedie sono impilate.',['le'],'Sedie è femminile plurale: le sedie.');
tokens('Articolo',1,'Seleziona gli articoli presenti nella frase.',['La','sarta','prepara','un','cartamodello','.'],[0,3],'La è determinativo e un è indeterminativo.');
choice('Articolo',2,'In quale frase «delle» indica una quantità imprecisata?','Ho scelto delle perline.',['Il colore delle perline è intenso.','Parliamo delle perline.'],'In «Ho scelto delle perline», delle significa alcune: è partitivo.');
choice('Articolo',2,'Quale coppia completa «___ specchio riflette ___ luce»?','Lo; la',['Il; la','Lo; le'],'Specchio comincia per s più consonante; luce è femminile singolare.');
choice('Articolo',2,'Quale gruppo è scritto correttamente?','un’ampia sala',['un ampia sala','un’ampio salone'],'Ampia sala è femminile: una si elide davanti alla vocale.');
choice('Articolo',2,'Quale gruppo è scritto correttamente?','un elegante mobile',['un’elegante mobile','uno elegante mobile'],'Mobile è maschile: un non si elide e non vuole apostrofo.');
choice('Articolo',2,'Quale forma completa «Abbiamo usato ___ colla» per indicare una quantità?','della',['degli','dei'],'Colla è femminile singolare: della equivale a un po’ di.');
choice('Articolo',2,'In «Cerco uno sgabello», uno è un articolo…','indeterminativo',['determinativo','partitivo'],'Uno presenta uno sgabello non specificato.');
choice('Articolo',2,'Quale frase usa correttamente l’articolo davanti a «psicologo»?','Lo psicologo entra.',['Il psicologo entra.','L’ psicologo entra.'],'Davanti a ps iniziale si usa lo.');
exact('Articolo',2,'Inserisci l’articolo indeterminativo femminile: ___ zebra è raffigurata sul tessuto.',['una'],'Zebra è femminile singolare: una zebra.');
exact('Articolo',2,'Inserisci l’articolo determinativo plurale: ___ occhi del manichino sono dipinti.',['gli'],'Davanti a un nome maschile plurale che inizia per vocale si usa gli.');
tokens('Articolo',2,'Seleziona gli articoli semplici, senza selezionare le preposizioni articolate.',['Un','allievo','pulisce','il','banco','della','bottega','.'],[0,3],'Un e il sono articoli semplici; della è una preposizione articolata.');
choice('Articolo',3,'In quale frase l’articolo determinativo indica la specie in generale?','Il violino appartiene alla famiglia degli archi.',['Il violino di Anna è sul banco.','Quel violino è sul banco.'],'Il violino indica qui la categoria degli strumenti chiamati violino.');
choice('Articolo',3,'In quale frase «dei» è una preposizione articolata?','Il suono dei violini riempie la sala.',['Dei violini sono in riparazione.','Abbiamo acquistato dei violini.'],'Dei violini specifica di quali strumenti è il suono: dei equivale a di più i.');
choice('Articolo',3,'Quale riscrittura conserva il valore indefinito di «Una matita è sul tavolo» al plurale?','Alcune matite sono sul tavolo.',['Le matite sono sul tavolo.','Queste matite sono sul tavolo.'],'Alcune mantiene il riferimento a un numero non precisato.');
choice('Articolo',3,'Quale frase contiene un articolo partitivo e una preposizione articolata?','Delle sarte parlano delle misure.',['Le sarte parlano delle misure.','Delle sarte lavorano.'],'Il primo delle significa alcune; il secondo significa di più le.');
choice('Articolo',3,'Nella frase «Luca indossa un abito», perché un non ha apostrofo?','Perché abito è maschile.',['Perché abito è plurale.','Perché un è determinativo.'],'Un è la forma maschile dell’articolo indeterminativo davanti a vocale.');
choice('Articolo',3,'Quale gruppo richiede «gli» al plurale?','studenti',['tavoli','sedie'],'Studenti è maschile plurale e inizia con s più consonante.');
choice('Nome',1,'Quale parola è un nome proprio?','Cremona',['città','liutaio'],'Cremona identifica una città precisa ed è un nome proprio.');
choice('Nome',1,'Quale parola è un nome comune di persona?','modellista',['Cremona','violino'],'Modellista indica una persona attraverso il mestiere.');
choice('Nome',1,'Quale parola è un nome di cosa?','forbici',['sarta','Cremona'],'Forbici indica un oggetto.');
choice('Nome',1,'Qual è il plurale di «tavolo»?','tavoli',['tavole','tavola'],'Il nome maschile tavolo forma il plurale in -i.');
choice('Nome',1,'Qual è il singolare di «sedie»?','sedia',['sedio','sedii'],'Sedia è femminile singolare; sedie è il plurale.');
choice('Nome',1,'Quale nome indica un animale?','gatto',['pennello','sarto'],'Gatto indica un animale.');
exact('Nome',1,'Completa con il plurale di «filo»: due ___ rossi.',['fili'],'Il plurale di filo, nel senso di filamento, è fili.');
exact('Nome',1,'Completa con il singolare di «tessuti»: un ___ morbido.',['tessuto'],'Tessuto è il singolare di tessuti.');
tokens('Nome',1,'Seleziona i due nomi comuni nella frase.',['La','sarta','cuce','la','tasca','.'],[1,4],'Sarta indica una persona; tasca indica una cosa.');
choice('Nome',2,'Quale nome è astratto?','pazienza',['tavolo','violino'],'Pazienza indica una qualità, non un oggetto percepibile direttamente.');
choice('Nome',2,'Quale nome è collettivo?','orchestra',['musicista','violino'],'Orchestra è singolare ma indica un insieme di musicisti.');
choice('Nome',2,'Quale nome è alterato diminutivo?','casetta',['casa','casato'],'Nel caso richiesto il diminutivo di casa è casetta.');
choice('Nome',2,'Quale nome deriva da «fiore»?','fioraio',['fiore','prato'],'Fioraio deriva dalla base fior- con il suffisso -aio.');
choice('Nome',2,'Quale nome è composto?','portapenne',['penna','pennino'],'Portapenne è formato da due elementi lessicali: porta e penne.');
choice('Nome',2,'Quale plurale è corretto per «camicia»?','camicie',['camicce','camiccie'],'Camicia conserva la i nel plurale camicie.');
choice('Nome',2,'Quale plurale è corretto per «arancia»?','arance',['arancie','arancii'],'Nel plurale arance la i grafica non compare.');
choice('Nome',2,'Quale nome ha genere grammaticale femminile?','la mano',['il piede','il gomito'],'Mano è femminile anche se termina in -o.');
exact('Nome',2,'Scrivi il plurale di «valigia»: due ___.',['valigie','valige'],'La grafia corrente è valigie; è attestata anche la variante valige.');
exact('Nome',2,'Scrivi il plurale di «sedia»: tre ___.',['sedie'],'Il plurale di sedia è sedie.');
tokens('Nome',2,'Seleziona i nomi propri.',['A','Cremona','Marta','studia','liuteria','.'],[1,2],'Cremona e Marta indicano rispettivamente un luogo e una persona determinati.');
choice('Nome',3,'In quale frase «classe» indica un insieme di studenti?','La classe visita il museo.',['La classe del treno è indicata sul biglietto.','La classe energetica è A.'],'Qui classe indica collettivamente gli studenti.');
choice('Nome',3,'Quale nome è invariabile nel plurale?','città',['tavolo','sedia'],'Città ha la stessa forma al singolare e al plurale: la città, le città.');
choice('Nome',3,'Quale gruppo contiene un nome concreto e uno astratto, in questo ordine?','legno; abilità',['abilità; legno','pazienza; coraggio'],'Legno indica una materia; abilità indica una qualità.');
choice('Nome',3,'Quale parola è un falso alterato e non indica una piccola botte?','bottone',['botticella','botticina'],'Bottone non è il diminutivo di botte: ha un significato proprio.');
choice('Nome',3,'In quale frase «capitale» è femminile e indica una città?','Roma è la capitale d’Italia.',['Il capitale è stato investito.','Il capitale iniziale è aumentato.'],'La capitale indica una città; il capitale indica denaro o beni.');
choice('Nome',3,'Quale coppia contiene due nomi primitivi, non derivati?','legno; fiore',['legname; fioraio','legnoso; fiorista'],'Legno e fiore sono basi da cui derivano altre parole.');
choice('Nome',3,'Quale nome composto ha plurale invariabile?','il portacenere → i portacenere',['il capostazione → i capistazione','la ferrovia → le ferrovie'],'Portacenere resta uguale nella forma; cambia l’articolo.');
choice('Nome',3,'Quale plurale indica le due parti del corpo umano?','le braccia',['i bracci','le braccie'],'Il plurale braccia indica normalmente le parti del corpo; bracci si usa anche per elementi meccanici.');
window.ATELIER_NEW_ARTICOLO_NOME=items;
})();
