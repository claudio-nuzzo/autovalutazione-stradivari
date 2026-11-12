(() => {
'use strict';
const data=[
{g:'Ortografia',c:[
['Quale frase distingue correttamente la congiunzione dal verbo?','Il mobile è solido e leggero.',['Il mobile e solido è leggero.','Il mobile è solido è leggero.'],'È è verbo; e collega gli aggettivi.'],
['Quale frase usa correttamente gli articoli?','Un’idea guida un nuovo progetto.',['Un idea guida un nuovo progetto.','Un’idea guida un’nuovo progetto.'],'Idea è femminile: la forma elisa è un’; progetto è maschile e richiede un.'],
['Quale frase distingue correttamente la forma verbale dall’avverbio di luogo?','Lia dà il foglio e lo ripone là.',['Lia da il foglio e lo ripone la.','Lia dà il foglio e lo ripone la.'],'Dà è verbo e là indica un luogo: entrambi vogliono l’accento.'],
['Quale versione è corretta?','Qual è il colore che hai scelto?',['Qual’è il colore che ai scelto?','Qual è il colore che ai scelto?'],'Qual è è senza apostrofo; hai è una forma di avere.'],
['Quale frase usa correttamente una forma verbale e un nome di tempo?','Hanno lavorato tutto l’anno.',['Anno lavorato tutto l’hanno.','Hanno lavorato tutto l’hanno.'],'Hanno è verbo avere; anno è un nome.'],
['Quale coppia usa correttamente accento acuto e grave?','perché; caffè',['perchè; caffé','perché; caffé'],'Perché richiede accento acuto; caffè richiede il grave.']
],e:[['Completa con la terza persona singolare del presente di dare: Ada ___ il metro a Lia.',['dà'],'Dà, con accento grave, è una forma del verbo dare.'],['Completa con la forma abbreviata di «poco»: Nel barattolo c’è un ___ di colla.',['po’',"po'"],'Po’ è la forma troncata di poco e richiede l’apostrofo.']],t:[['Seleziona le due forme del verbo avere.',['Nora','ha','una','squadra','e','io','ho','un','metro','.'],[1,6],'Ha e ho sono forme del verbo avere.'],['Seleziona l’avverbio di luogo con accento.',['Li','controllo','lì','sul','tavolo','.'],[2],'Lì indica luogo; li è un pronome.']]},
{g:'Articolo',c:[
['In quale frase «dei» accompagna un nome come articolo partitivo?','Abbiamo scelto dei cartoni.',['Il colore dei cartoni è chiaro.','Parliamo dei cartoni.'],'Dei cartoni indica una quantità indefinita scelta.'],
['Quale gruppo contiene un articolo e un aggettivo sostantivato?','il necessario',['il progetto necessario','necessario e utile'],'Nel gruppo il necessario, necessario funziona come nome.'],
['In quale frase «la» è un pronome?','La vedo sul banco.',['La matita è sul banco.','La misura è corretta.'],'La sostituisce un nome; non introduce un nome espresso.'],
['Quale articolo completa «___ psicologi osservano»?','gli',['i','le'],'Davanti a ps iniziale il maschile plurale usa gli.'],
['In «Il suono dello strumento», dello è…','preposizione articolata',['articolo partitivo','pronome'],'Dello equivale a di più lo e introduce una specificazione.'],
['Quale frase indica uno strumento identificato dal contesto?','Ho accordato il violino che userai.',['Ho accordato un violino qualsiasi.','Ho accordato alcuni violini.'],'Il violino è identificato dalla relativa che userai.']
],e:[['Completa con il determinativo maschile singolare: ___ xilofono è accordato.',['lo'],'Davanti a x iniziale si usa lo.'],['Completa con l’indeterminativo maschile singolare: ___ amico ci aspetta.',['un'],'Amico è maschile: un non richiede apostrofo.']],t:[['Seleziona soltanto l’articolo partitivo.',['Delle','allieve','sistemano','le','sedie','.'],[0],'Delle equivale ad alcune; le è determinativo.'],['Seleziona solo l’articolo, non il pronome.',['La','tavola','è','pronta','e','Lia','la','sposta','.'],[0],'La introduce tavola; il secondo la la sostituisce.']]},
{g:'Nome',c:[
['In quale frase «costruzione» indica un’attività?','La costruzione del mobile richiede tempo.',['La costruzione ha tre piani.','La costruzione è un edificio antico.'],'Qui costruzione indica il processo del costruire.'],
['Quale coppia contiene un nome individuale e uno collettivo?','albero; foresta',['foresta; albero','albero; ramo'],'Foresta indica un insieme di alberi.'],
['Quale frase contiene un nome proprio?','Cremona ospita la mostra.',['La città ospita la mostra.','La scuola ospita la mostra.'],'Cremona identifica una città specifica.'],
['Quale nome non cambia forma al plurale?','crisi',['porta','lezione'],'Si dice la crisi e le crisi.'],
['Quale coppia distingue i significati dei due plurali di «muro»?','i muri della stanza; le mura della città',['i muri della città; le mure della città','le mura della stanza; i murii della casa'],'Muri indica qui pareti; mura indica la cinta cittadina.'],
['Quale nome è derivato da «dente»?','dentista',['dente','medico'],'Dentista si forma dalla base di dente con un suffisso.']
],e:[['Scrivi il plurale di «spiaggia»: due ___.',['spiagge'],'Spiaggia forma il plurale spiagge, senza i grafica.'],['Scrivi il plurale di «arancia»: due ___.',['arance'],'Arancia forma il plurale arance, senza i grafica.']],t:[['Seleziona i nomi propri.',['Lina','viaggia','da','Modena','a','Parma','.'],[0,3,5],'Lina, Modena e Parma sono nomi propri.'],['Seleziona il nome collettivo.',['Una','squadra','di','atlete','si','allena','.'],[1],'Squadra indica un insieme di persone.']]},
{g:'Aggettivo',c:[
['In «La seconda prova è difficile», quale parola è un aggettivo numerale ordinale?','seconda',['prova','difficile'],'Seconda indica l’ordine della prova.'],
['In «La prova è più difficile della precedente», il grado è…','comparativo di maggioranza',['superlativo assoluto','comparativo di minoranza'],'Più difficile esprime maggioranza nel confronto.'],
['Quale frase contiene un aggettivo dimostrativo?','Quella classe disegna.',['Quella disegna.','Disegna bene.'],'Quella accompagna classe.'],
['In «Le idee altrui meritano rispetto», altrui è…','aggettivo possessivo invariabile',['pronome relativo','avverbio'],'Altrui accompagna idee e indica appartenenza ad altre persone.'],
['Quale gruppo contiene un aggettivo composto?','un motivo agrodolce',['un motivo dolce','un motivo dolcissimo'],'Agrodolce unisce due elementi lessicali.'],
['Quale frase usa «proprio» riferito al soggetto?','Marta controlla il proprio disegno.',['Marta controlla il disegno di Luca.','Marta controlla il disegno.'],'Proprio riferisce il disegno al soggetto Marta.']
],e:[['Completa con il comparativo irregolare di «buono»: Il risultato è ___ del precedente.',['migliore'],'Migliore è un comparativo di buono.'],['Completa con il femminile plurale di «piccolo»: Le scatole sono ___.',['piccole'],'Piccole concorda con scatole.']],t:[['Seleziona gli aggettivi che accompagnano il nome.',['Queste','tre','tavole','sottili','sono','pronte','.'],[0,1,3],'Queste, tre e sottili accompagnano tavole.'],['Seleziona l’aggettivo possessivo.',['La','propria','misura','è','precisa','.'],[1],'Propria accompagna misura.']]},
{g:'Pronomi',c:[
['In «Sara cerca Nora e la chiama», la è…','pronome oggetto riferito a Nora',['articolo riferito a chiama','preposizione'],'La sostituisce Nora come oggetto di chiama.'],
['In «Sara scrive a Nora e le chiede aiuto», le significa…','a Nora',['Nora come oggetto diretto','di Nora'],'Le indica il destinatario della richiesta.'],
['In «Il libro che ho letto è sul banco», che è…','pronome relativo oggetto',['congiunzione causale','soggetto di ho letto'],'Che riprende libro come oggetto di ho letto.'],
['In «Il libro che cade è nuovo», che è…','pronome relativo soggetto',['pronome oggetto','preposizione'],'Che riprende libro ed è soggetto di cade.'],
['Quale frase contiene un pronome possessivo?','Il tuo è nello zaino.',['Il tuo quaderno è nello zaino.','Il quaderno è nello zaino.'],'Il tuo sostituisce un nome ricavabile dal contesto.'],
['Quale frase usa un pronome indefinito?','Alcuni sono arrivati.',['Alcuni ospiti sono arrivati.','Gli ospiti sono arrivati.'],'Alcuni sostituisce un nome; nell’altra frase accompagna ospiti.']
],e:[['Completa con il pronome oggetto femminile plurale: Le tavole? Giada ___ misura.',['le'],'Le riprende le tavole come oggetto diretto.'],['Completa con il pronome relativo retto da «a»: La collega a ___ scrivo risponde.',['cui'],'A cui riprende la collega.']],t:[['Seleziona i due pronomi oggetto.',['Il','campione','è','pronto:','lo','osservo','e','lo','ripongo','.'],[4,7],'Entrambi i lo riprendono il campione.'],['Seleziona il pronome relativo.',['La','collega','che','conosci','arriva','.'],[2],'Che riprende collega.']]},
{g:'Avverbi',c:[
['In «Marta lavora molto bene», molto modifica…','l’avverbio bene',['il nome Marta','un articolo'],'Molto intensifica bene.'],
['In quale frase «molto» è avverbio?','Il mobile è molto stabile.',['Ho molti mobili.','Molti sono arrivati.'],'Molto modifica stabile e resta invariabile.'],
['In quale frase «piano» è avverbio?','Parlate piano.',['Il piano è pronto.','Il piano superiore è chiuso.'],'Piano modifica parlate e indica modo.'],
['In «Forse domani pioverà», forse esprime…','dubbio',['luogo','quantità'],'Forse presenta il fatto come possibile.'],
['In «Quando parti?», quando è…','avverbio interrogativo di tempo',['aggettivo possessivo','articolo'],'Quando domanda il momento della partenza.'],
['Quale espressione indica gradualità?','a poco a poco',['il poco tempo','pochissimi fogli'],'A poco a poco è una locuzione avverbiale.']
],e:[['Completa con l’avverbio di luogo accentato che termina per «a», opposto a «qui»: Appoggia il metro ___.',['là'],'Là indica un luogo e richiede l’accento.'],['Completa con l’avverbio che indica il giorno successivo a oggi: Oggi misuro; ___ taglio.',['domani'],'Domani indica un tempo successivo.']],t:[['Seleziona i due avverbi.',['Forse','Lina','partirà','domani','.'],[0,3],'Forse esprime dubbio e domani indica tempo.'],['Seleziona l’avverbio che modifica l’aggettivo.',['La','tavola','è','molto','larga','.'],[3],'Molto modifica larga.']]},
{g:'Preposizioni',c:[
['In «La sedia sotto la finestra», sotto è…','preposizione impropria',['pronome','verbo'],'Sotto introduce il gruppo la finestra.'],
['In «La sedia è sotto», sotto è…','avverbio di luogo',['preposizione con complemento espresso','articolo'],'Sotto non introduce qui un gruppo espresso e indica luogo.'],
['Quale preposizione articolata corrisponde a «da + le»?','dalle',['della','alle'],'Da più le dà dalle.'],
['In «Un quaderno per Lia», per introduce…','un gruppo collegato al nome quaderno',['un verbo','un articolo'],'Per introduce il gruppo per Lia.'],
['Quale gruppo contiene una locuzione prepositiva?','a causa della pioggia',['la pioggia','pioggia intensa'],'A causa di introduce il gruppo della pioggia.'],
['Quale preposizione completa «pensare ___ un progetto»?','a',['da','tra'],'Pensare a qualcosa significa qui rivolgere il pensiero al progetto.']
],e:[['Completa «su + le»: I fogli sono ___ mensole.',['sulle'],'Su più le dà sulle.'],['Completa «in + gli»: I pennelli sono ___ astucci.',['negli'],'In più gli dà negli.']],t:[['Seleziona le preposizioni semplici.',['La','classe','va','da','Lia','con','il','metro','.'],[3,5],'Da e con sono preposizioni semplici.'],['Seleziona la preposizione articolata.',['Il','foglio','è','sotto','al','banco','.'],[4],'Al unisce a e il; sotto introduce il gruppo.']]},
{g:'Congiunzioni',c:[
['In «La mostra apre e la classe entra», e unisce…','due proposizioni coordinate',['un articolo e un nome','un pronome e il suo antecedente'],'E collega proposizioni sullo stesso piano.'],
['In «Spero che arrivi», che è…','congiunzione subordinante',['pronome relativo','articolo'],'Che introduce il contenuto di spero.'],
['In «Il treno che arriva è lungo», che è…','pronome relativo',['congiunzione causale','articolo'],'Che riprende treno ed è soggetto di arriva.'],
['In «Se il banco è libero, lavoro», se introduce…','una condizione',['un’interrogativa indiretta','una causa'],'La condizione è che il banco sia libero.'],
['In «Non so se il banco sia libero», se introduce…','un’interrogativa indiretta',['una condizione per lavorare','un agente'],'La frase riferisce un dubbio con risposta sì o no.'],
['In «Sebbene piova, partiamo», sebbene esprime…','concessione',['fine','paragone'],'La pioggia è un possibile ostacolo che non impedisce la partenza.']
],e:[['Completa con la congiunzione avversativa di due lettere: Il foglio è sottile, ___ resistente.',['ma'],'Ma introduce il contrasto.'],['Completa con la congiunzione alternativa di sei lettere che inizia per «opp»: Usi matita ___ penna?',['oppure'],'Oppure introduce un’alternativa.']],t:[['Seleziona le congiunzioni coordinanti.',['Lia','prepara','e','Nora','controlla','ma','Luca','aspetta','.'],[2,5],'E e ma collegano proposizioni.'],['Seleziona la congiunzione causale.',['Restiamo','perché','piove','.'],[1],'Perché introduce la causa.']]},
{g:'Formazione delle parole',c:[
['Quale parola deriva da «pane»?','panettiere',['pane','piano'],'Panettiere deriva dalla base di pane.'],
['Quale parola è composta?','portachiavi',['chiave','chiavetta'],'Portachiavi unisce porta e chiavi.'],
['In «rileggere», ri- esprime…','ripetizione',['negazione','un plurale'],'Ri- aggiunge qui il significato di leggere di nuovo.'],
['Quale parola è un alterato diminutivo?','casetta',['casa','casato'],'Casetta modifica con un suffisso il nome casa.'],
['Quale parola è un falso alterato?','burrone',['burretto','burro'],'Burrone non significa piccolo burro.'],
['Quale coppia contiene una base e un derivato?','sale; saliera',['sale; pepe','sale; sabbia'],'Saliera deriva dalla base di sale.']
],e:[['Aggiungi «ri-» a «scrivere».',['riscrivere'],'Riscrivere indica qui scrivere di nuovo.'],['Scrivi il diminutivo di tavolo con suffisso -ino: Il ___ occupa poco spazio.',['tavolino'],'Tavolino è un diminutivo di tavolo.']],t:[['Seleziona la parola composta.',['Il','portapacchi','è','nuovo','.'],[1],'Portapacchi unisce porta e pacchi.'],['Seleziona il nome derivato da «fiore».',['La','fioraia','apre','il','negozio','.'],[1],'Fioraia deriva dalla base di fiore.']]}
];
const bank=[];function add(g,kind,prompt,props,feedback,level){bank.push({id:`par-sf-${String(bank.length+1).padStart(3,'0')}`,area:'parole',topicGroup:g,topic:g,level,pei:false,kind,title:kind==='choice'?'Sfida nel contesto':kind==='tokens'?'Trova nel testo':'Completa',prompt,...props,feedback,minutes:2})}
for(const t of data){for(const [i,[prompt,correct,wrong,feedback]] of t.c.entries()){const options=[correct,...wrong],answer=bank.length%options.length;options.splice(answer,0,options.shift());add(t.g,'choice',prompt,{options,answer,solution:correct},feedback,(({Articolo:[0,2,4],Nome:[0,4],Aggettivo:[3,5],Pronomi:[2,3],Avverbi:[1,2],Preposizioni:[0,1],Congiunzioni:[1,2,4],Ortografia:[1,2], 'Formazione delle parole':[4]})[t.g]||[]).includes(i)?3:2)}for(const [prompt,answers,feedback] of t.e)add(t.g,'exact',prompt,{answers,solution:answers[0]},feedback,2);for(const [prompt,tokens,answer,feedback] of t.t)add(t.g,'tokens',prompt,{tokens,answer,solution:answer.map(i=>tokens[i]).join(' · ')},feedback,2)}
window.ATELIER_NEW_PAROLE_SFIDE=bank;
})();
