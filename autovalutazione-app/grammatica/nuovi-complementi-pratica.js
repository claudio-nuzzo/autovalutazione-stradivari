(() => {
'use strict';
const out=[];
function choice(group,prompt,solution,wrong,feedback){const n=out.length,options=[solution,...wrong],answer=n%options.length;options.splice(answer,0,options.shift());out.push({id:`compl-pratica-${String(n+1).padStart(3,'0')}`,area:'frase',topicGroup:group,topic:group,level:2,pei:false,kind:'choice',title:'Analizza la relazione',prompt,options,answer,solution,feedback,minutes:2});}
function exact(group,prompt,answer,feedback){const n=out.length;out.push({id:`compl-pratica-${String(n+1).padStart(3,'0')}`,area:'frase',topicGroup:group,topic:group,level:2,pei:false,kind:'exact',title:'Individua nella frase',prompt,answers:[answer],solution:answer,feedback,minutes:2});}
function tokens(group,prompt,words,answer,feedback){const n=out.length;out.push({id:`compl-pratica-${String(n+1).padStart(3,'0')}`,area:'frase',topicGroup:group,topic:group,level:2,pei:false,kind:'tokens',title:'Seleziona il gruppo',prompt,tokens:words,answer,solution:answer.map(i=>words[i]).join(' · '),feedback,minutes:3});}
const data=[
['Oggetto',[
['In «La classe osserva il campione», che funzione ha «il campione»?','oggetto',['termine','soggetto'],'Il campione riceve direttamente l’azione di osservare.'],
['In «Il tecnico le controlla», che cosa può riprendere «le»?','le misure',['ai tecnici','con le misure'],'Le può sostituire un oggetto diretto femminile plurale.'],
['Quale frase contiene un oggetto diretto?','Nora sposta il pannello.',['Nora parla del pannello.','Nora arriva al pannello.'],'Il pannello completa direttamente sposta.'],
['In «Sara compra dei fogli», «dei fogli» è…','oggetto partitivo',['termine','soggetto'],'Dei fogli è oggetto diretto e indica una quantità indefinita.'],
['In «Il progetto lo presentiamo lunedì», «lo» riprende…','il progetto',['lunedì','noi'],'Lo è un pronome oggetto che riprende il progetto.']
],['Scrivi il complemento oggetto in «Lia usa la squadra».','la squadra','La squadra è ciò che Lia usa.'],['Scrivi il complemento oggetto in «Il docente mostra un esempio».','un esempio','Un esempio è ciò che viene mostrato.'],['Seleziona il complemento oggetto.',['Il','gruppo','progetta','una','mensola.'],[3,4],'Una mensola riceve l’azione di progettare.']],
['Termine e specificazione',[
['In «Presto il metro a Lina», «a Lina» esprime…','termine',['specificazione','materia'],'A Lina indica la destinataria del prestito.'],
['In «Il bordo del tessuto è consumato», «del tessuto» esprime…','specificazione',['termine','agente'],'Del tessuto precisa il nome bordo.'],
['In «Le abbiamo scritto ieri», «le» significa…','a lei',['lei come oggetto diretto','in quel luogo'],'Le è qui pronome con valore di termine.'],
['Quale frase contiene una specificazione?','Il colore del mobile è scuro.',['Porto il colore a Nora.','Metto il colore sul mobile.'],'Del mobile precisa il nome colore.'],
['Quale frase contiene un termine?','Spediamo la foto al cliente.',['Vediamo il cliente.','Parliamo del cliente.'],'Al cliente indica il destinatario della spedizione.']
],['Scrivi il complemento di termine in «Ho risposto a Nina».','a Nina','A Nina è la destinataria della risposta.'],['Scrivi il complemento di specificazione in «Il quaderno di Ada è aperto».','di Ada','Di Ada precisa il nome quaderno.'],['Seleziona il complemento di termine.',['Offro','il','posto','alla','collega.'],[3,4],'Alla collega indica la persona a cui offro il posto.']],
['Luogo e tempo',[
['In «Poso i colori sul ripiano», «sul ripiano» indica…','moto a luogo',['moto da luogo','tempo continuato'],'Il ripiano è la destinazione del movimento di posa.'],
['In «Il barattolo resta sul ripiano», «sul ripiano» indica…','stato in luogo',['moto a luogo','causa'],'Resta colloca il barattolo in un luogo.'],
['In «La classe passa attraverso il cortile», «attraverso il cortile» indica…','moto per luogo',['tempo determinato','moto da luogo'],'Attraverso il cortile indica lo spazio percorso.'],
['In «Attenderemo fino a sera», il gruppo finale indica…','un limite temporale',['un materiale','un destinatario'],'Fino a sera indica il termine temporale dell’attesa.'],
['In «La prova durerà mezz’ora», «mezz’ora» indica…','durata',['luogo di partenza','agente'],'Mezz’ora esprime il tempo continuato della prova.']
],['Scrivi il gruppo che indica il momento in «La mostra apre sabato».','sabato','Sabato indica quando apre la mostra.'],['Scrivi il gruppo che indica la destinazione in «Nora entra in biblioteca».','in biblioteca','In biblioteca indica dove Nora entra.'],['Seleziona il complemento che indica la durata.',['La','lezione','prosegue','per','un’ora.'],[3,4],'Per un’ora indica quanto dura la lezione.']],
['Causa, fine, mezzo e modo',[
['In «Lia è arrossita per l’imbarazzo», il gruppo finale indica…','causa',['fine','mezzo'],'L’imbarazzo è la ragione dell’arrossire.'],
['In «Raccogliamo appunti per il ripasso», il gruppo finale indica…','fine',['causa','modo'],'Il ripasso è lo scopo della raccolta degli appunti.'],
['In «Il vetro è inciso con una punta», il gruppo finale indica…','mezzo',['compagnia','tempo'],'La punta è lo strumento usato.'],
['In «Nora risponde con calma», il gruppo finale indica…','modo',['mezzo','compagnia'],'Con calma descrive come Nora risponde.'],
['Quale gruppo indica una causa?','per il gelo in «Le piante soffrono per il gelo».',['per la mostra in «Prepariamo i materiali per la mostra».','con cura in «Lavoriamo con cura».'],'Il gelo provoca la sofferenza delle piante.']
],['Scrivi il complemento di mezzo in «Disegno con la matita».','con la matita','La matita è lo strumento usato.'],['Scrivi il complemento di modo in «La restauratrice procede con cautela».','con cautela','Con cautela indica come procede.'],['Seleziona il gruppo che indica la causa.',['La','partita','è','rinviata','per','la','pioggia.'],[4,5,6],'Per la pioggia indica il motivo del rinvio.']],
['Compagnia e unione',[
['In «Luca pranza con la sorella», il gruppo finale esprime…','compagnia',['unione','mezzo'],'La sorella è la persona insieme alla quale Luca pranza.'],
['In «Luca esce con una borsa», il gruppo finale esprime…','unione',['compagnia','termine'],'La borsa è la cosa portata insieme.'],
['Quale frase contiene compagnia?','Disegno insieme a un’amica.',['Disegno con una matita.','Disegno per un’amica.'],'Un’amica è la persona che partecipa all’azione.'],
['Quale frase contiene unione?','Viaggio con una valigia.',['Viaggio con la guida.','Viaggio verso la costa.'],'La valigia è una cosa portata con sé.'],
['In «Nina cammina con il cane», il gruppo finale esprime…','compagnia',['mezzo','materia'],'Il cane accompagna Nina.']
],['Scrivi il complemento di compagnia in «Lavoro con Ada».','con Ada','Ada è la persona insieme alla quale lavoro.'],['Scrivi il complemento di unione in «Esco con il quaderno».','con il quaderno','Il quaderno è la cosa portata con sé.'],['Seleziona il complemento di compagnia.',['Paolo','parte','insieme','a','Lia.'],[2,3,4],'Insieme a Lia indica la persona che accompagna Paolo.']],
['Materia e qualità',[
['In «Un vaso di vetro», il gruppo finale esprime…','materia',['qualità morale','termine'],'Di vetro indica la sostanza del vaso.'],
['In «Una persona di grande esperienza», il gruppo finale esprime…','qualità',['materia','fine'],'Di grande esperienza descrive una caratteristica della persona.'],
['Quale frase contiene un complemento di materia?','La cornice è fatta di rame.',['La cornice è sopra il tavolo.','Parliamo della cornice.'],'Di rame indica la materia della cornice.'],
['Quale frase contiene un complemento di qualità?','Cerco una collega di grande pazienza.',['Cerco una scatola di cartone.','Cerco una collega in laboratorio.'],'Di grande pazienza descrive una qualità.'],
['In «Un tavolo dalle gambe robuste», il gruppo finale descrive…','una qualità',['un luogo di partenza','il costo'],'Dalle gambe robuste descrive una caratteristica del tavolo.']
],['Scrivi il complemento di materia in «Un anello di argento brilla».','di argento','Di argento indica il materiale.'],['Scrivi il complemento di qualità in «Una donna di talento ci guida».','di talento','Di talento descrive una qualità.'],['Seleziona il complemento di materia.',['La','copertina','di','cartone','protegge','il','quaderno.'],[2,3],'Di cartone indica il materiale della copertina.']],
['Denominazione e argomento',[
['In «Il lago di Garda», «di Garda» indica…','denominazione',['materia','termine'],'Garda è il nome proprio del lago.'],
['In «Discutiamo di sostenibilità», il gruppo finale indica…','argomento',['luogo','peso'],'Di sostenibilità indica il tema della discussione.'],
['Quale frase contiene denominazione?','Il mese di maggio è iniziato.',['La pioggia di maggio è intensa.','Il calendario di maggio è pronto.'],'Maggio è il nome del mese.'],
['Quale frase contiene un argomento?','Leggo un saggio sul restauro.',['Lascio il saggio sul banco.','Sposto il saggio sul tavolo.'],'Sul restauro indica il tema del saggio.'],
['In «Parliamo del progetto», il gruppo finale indica…','argomento',['agente','moto da luogo'],'Del progetto indica ciò di cui parliamo.']
],['Scrivi il complemento di argomento in «Parliamo di musica».','di musica','Di musica indica il tema della conversazione.'],['Scrivi il complemento di denominazione in «La città di Parma è vicina».','di Parma','Parma è il nome della città.'],['Seleziona il complemento di argomento.',['Abbiamo','discusso','della','mostra.'],[2,3],'Della mostra indica il tema della discussione.']],
['Limitazione e paragone',[
['In «Nora è più alta di Lia», il gruppo finale indica…','paragone',['materia','termine'],'Di Lia introduce il secondo termine del confronto.'],
['In «Luca è esperto in botanica», il gruppo finale indica…','limitazione',['luogo','pena'],'In botanica delimita l’ambito della competenza.'],
['Quale frase contiene un secondo termine di paragone?','Il banco è meno largo della porta.',['Il banco è fatto di legno.','Il banco è vicino alla porta.'],'Della porta introduce il termine con cui si confronta la larghezza.'],
['Quale frase contiene un complemento di limitazione?','Quanto a precisione, il lavoro è ottimo.',['Il lavoro è fatto con precisione.','Il lavoro è sul banco.'],'Quanto a precisione limita il giudizio a un aspetto.'],
['In «La stoffa è leggera come una piuma», il gruppo finale introduce…','il secondo termine di paragone',['una causa','uno strumento'],'La piuma è il termine con cui si paragona la leggerezza.']
],['Scrivi il secondo termine di paragone in «Lia è più alta di Nora».','di Nora','Di Nora introduce il secondo termine del confronto.'],['Scrivi il complemento di limitazione in «Lia è esperta in ricamo».','in ricamo','In ricamo delimita l’ambito della competenza.'],['Seleziona il secondo termine di paragone.',['Il','filo','è','più','sottile','della','corda.'],[5,6],'Della corda introduce il termine confrontato.']],
['Complemento partitivo',[
['In «Tre dei campioni sono asciutti», il gruppo «dei campioni» indica…','l’insieme di cui tre sono una parte',['il materiale dei tre','il luogo dei tre'],'Il gruppo introduce l’insieme da cui si selezionano tre elementi.'],
['Quale frase contiene un complemento partitivo?','Alcuni tra noi disegnano.',['Il quaderno di Nora è nuovo.','Parliamo di Nora.'],'Tra noi indica il gruppo di cui alcuni sono una parte.'],
['In «Il migliore dei progetti sarà esposto», «dei progetti» indica…','l’insieme considerato dal superlativo',['il destinatario dell’esposizione','il luogo del progetto'],'Il migliore viene individuato entro l’insieme dei progetti.'],
['Quale «dei» introduce un complemento partitivo?','Due dei violini sono pronti.',['Riparo dei violini.','Il suono dei violini è intenso.'],'Dei violini indica l’insieme da cui si prendono due elementi.'],
['In «Qualcuno di voi conosce la risposta?», «di voi» indica…','l’insieme entro cui si individua qualcuno',['un oggetto diretto','un mezzo'],'Di voi introduce il gruppo considerato.']
],['Scrivi il complemento partitivo in «Uno degli allievi legge».','degli allievi','Degli allievi indica il gruppo da cui si considera uno.'],['Scrivi il complemento partitivo in «Alcuni fra noi cantano».','fra noi','Fra noi indica l’insieme di riferimento.'],['Seleziona il complemento partitivo.',['Due','delle','sedie','sono','pronte.'],[1,2],'Delle sedie indica l’insieme di cui due sono parte.']],
['Complementi di misura',[
['In «Il cartone pesa un chilo», «un chilo» indica…','peso',['prezzo','età'],'Un chilo misura il peso.'],
['In «Il vaso costa sei euro», «sei euro» indica…','prezzo',['lunghezza','peso'],'Sei euro misura il prezzo.'],
['In «La mensola è larga trenta centimetri», il gruppo finale indica…','estensione',['età','prezzo'],'Trenta centimetri misura la larghezza.'],
['In «Il museo dista cinque chilometri», il gruppo finale indica…','distanza',['peso','età'],'Cinque chilometri misura la distanza.'],
['In «Un ragazzo di sedici anni disegna», il gruppo «di sedici anni» indica…','età',['durata dell’azione','luogo'],'Il gruppo esprime l’età del ragazzo.']
],['Scrivi il complemento di prezzo in «La matita costa due euro».','due euro','Due euro indica il prezzo.'],['Scrivi il complemento di peso in «La scatola pesa tre chili».','tre chili','Tre chili indica il peso.'],['Seleziona il complemento che indica la lunghezza.',['La','striscia','è','lunga','due','metri.'],[4,5],'Due metri misura la lunghezza.']],
['Predicativi del soggetto e dell’oggetto',[
['In «La classe considera utile il manuale», «utile» è…','predicativo dell’oggetto',['attributo del soggetto','agente'],'Utile si riferisce all’oggetto il manuale tramite considera.'],
['In «Il manuale sembra utile», «utile» è…','predicativo del soggetto',['oggetto diretto','termine'],'Utile si riferisce al soggetto attraverso il verbo copulativo sembra.'],
['In «Hanno eletto Nora rappresentante», «rappresentante» si riferisce…','all’oggetto Nora',['al soggetto sottinteso','a hanno'],'Rappresentante è predicativo dell’oggetto Nora.'],
['In «Nora è stata eletta rappresentante», «rappresentante» si riferisce…','al soggetto Nora',['a un oggetto espresso','al complemento di termine'],'Nella costruzione passiva è predicativo del soggetto.'],
['Quale frase contiene un attributo anziché un predicativo?','Osservo il campione chiaro.',['Il campione sembra chiaro.','Considero chiaro il campione.'],'Chiaro accompagna direttamente il nome campione.']
],['Scrivi il predicativo dell’oggetto in «Giudico Marta affidabile».','affidabile','Affidabile si riferisce all’oggetto Marta.'],['Scrivi il predicativo del soggetto in «Il progetto sembra valido».','valido','Valido si riferisce al soggetto progetto tramite sembra.'],['Seleziona il predicativo dell’oggetto.',['La','giuria','ha','nominato','Nora','capitana.'],[5],'Capitana è il ruolo attribuito all’oggetto Nora.']],
['Agente e passivo',[
['In «Il mobile è stato montato da Samir», il gruppo finale è…','agente',['causa efficiente','termine'],'Samir compie l’azione nella frase passiva.'],
['In «Il telo è stato mosso dalla corrente», il gruppo finale è…','causa efficiente',['agente','termine'],'La corrente è la causa non animata dell’azione.'],
['Quale frase contiene un complemento d’agente?','Il disegno è stato corretto da Lia.',['Lia torna da scuola.','Lia corregge il disegno.'],'Da Lia indica chi compie l’azione passiva.'],
['Quale frase contiene una causa efficiente?','Il cartello è stato piegato dal vento.',['Il cartello è stato piegato da Ada.','Ada piega il cartello.'],'Il vento è la causa non animata che produce l’azione.'],
['In «La giacca è stata cucita dalla sarta», chi compie l’azione?','la sarta',['la giacca','la cucitura'],'Dalla sarta è il complemento d’agente.']
],['Scrivi il complemento d’agente in «Il quadro è stato appeso da Lia».','da Lia','Da Lia indica chi ha appeso il quadro.'],['Scrivi il complemento di causa efficiente in «La finestra è stata aperta dal vento».','dal vento','Dal vento indica la causa non animata.'],['Seleziona il complemento d’agente.',['Il','tavolo','è','stato','dipinto','dalla','classe.'],[5,6],'Dalla classe indica chi ha dipinto il tavolo.']],
['Altri complementi',[
['In «La scatola è piena di nastri», il gruppo finale indica…','abbondanza',['privazione','pena'],'Di nastri indica ciò che riempie la scatola.'],
['In «La stanza è priva di finestre», il gruppo finale indica…','privazione',['abbondanza','agente'],'Di finestre indica ciò che manca.'],
['In «La squadra raccoglie fondi a favore del museo», il gruppo finale indica…','vantaggio',['svantaggio','pena'],'Il museo beneficia della raccolta.'],
['In «L’atleta è accusato di frode», «di frode» indica…','colpa',['pena','materia'],'Il gruppo indica il fatto contestato.'],
['In «L’atleta è punito con una sospensione», il gruppo finale indica…','pena',['colpa','origine'],'La sospensione è la sanzione inflitta.']
],['Scrivi il complemento di privazione in «La vetrina è priva di maniglie».','di maniglie','Di maniglie indica ciò che manca.'],['Scrivi il complemento di abbondanza in «Il vaso è pieno di fiori».','di fiori','Di fiori indica ciò che riempie il vaso.'],['Seleziona il complemento di vantaggio.',['Raccogliamo','fondi','a','favore','della','biblioteca.'],[2,3,4,5],'A favore della biblioteca indica la beneficiaria della raccolta.']]
];
for(const [group,choices,e1,e2,t] of data){for(const [q,a,w,f] of choices)choice(group,q,a,w,f);exact(group,...e1);exact(group,...e2);tokens(group,...t)}
window.ATELIER_NEW_COMPLEMENTI_PRATICA=out;
})();
