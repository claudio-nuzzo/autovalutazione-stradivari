(() => {
'use strict';
const items=[];
function choice(group,prompt,solution,wrong,feedback){const n=items.length,options=[solution,...wrong],answer=n%options.length;options.splice(answer,0,options.shift());items.push({id:`log-sfide-${String(n+1).padStart(3,'0')}`,area:'frase',topicGroup:group,topic:group,level:2,pei:false,kind:'choice',title:'Distingui nel contesto',prompt,options,answer,solution,feedback,minutes:3});}
function exact(group,prompt,answers,feedback){const n=items.length;items.push({id:`log-sfide-${String(n+1).padStart(3,'0')}`,area:'frase',topicGroup:group,topic:group,level:2,pei:false,kind:'exact',title:'Individua la funzione',prompt,answers,solution:answers[0],feedback,minutes:2});}
function tokens(group,prompt,words,answer,feedback){const n=items.length;items.push({id:`log-sfide-${String(n+1).padStart(3,'0')}`,area:'frase',topicGroup:group,topic:group,level:2,pei:false,kind:'tokens',title:'Cerca nella frase',prompt,tokens:words,answer,solution:answer.map(i=>words[i]).join(' · '),feedback,minutes:3});}
const data=[
['Soggetto e predicato',[
['In «Per la mostra la docente ha scelto tre modelli», quale gruppo è il soggetto?','la docente',['per la mostra','tre modelli'],'La docente concorda con ha scelto e compie l’azione.'],
['In «Sul tavolo sono rimaste due matite», quale gruppo è il soggetto?','due matite',['sul tavolo','sono rimaste'],'Due matite concorda con il predicato ed è posposto.'],
['In «Agli allievi piacciono le nuove attività», chi o che cosa svolge la funzione di soggetto?','le nuove attività',['agli allievi','piacciono'],'Le nuove attività concorda con piacciono; agli allievi è termine.'],
['In «Il tessuto della fodera è molto leggero», qual è il predicato nominale?','è molto leggero',['della fodera','il tessuto'],'È è la copula; molto leggero è la parte che descrive il soggetto.'],
['In «Dopo la pausa avremo completato il progetto», il soggetto sottinteso è…','noi',['voi','loro'],'Avremo completato è prima persona plurale.'],
['In «La collega di Sara è nel laboratorio», che valore ha «è»?','predicato verbale con significato di trovarsi',['copula seguita da un aggettivo','ausiliare di un participio'],'Qui essere significa trovarsi in un luogo.']
],[['Scrivi il soggetto completo in «Dopo pranzo arrivano i nuovi campioni».',['i nuovi campioni'],'I nuovi campioni concorda con arrivano.'],['Scrivi il predicato verbale in «Lina ha cucito la tasca».',['ha cucito'],'Ha cucito è un tempo composto.']],['Seleziona il soggetto completo.',['Sul','piano','restano','due','campioni','piccoli.'],[3,4,5],'Due campioni piccoli costituisce il gruppo del soggetto.']],
['Attributo e apposizione',[
['In «Il giovane liutaio ripara due violini antichi», quale attributo accompagna l’oggetto?','antichi',['giovane','ripara'],'Antichi accompagna violini, oggetto di ripara.'],
['In «La docente Lina saluta il gruppo», quale nome è apposizione di Lina?','docente',['gruppo','saluta'],'Docente precisa Lina mediante un nome.'],
['In «Il disegno è preciso», preciso è…','parte nominale del predicato',['attributo collegato direttamente al nome','oggetto'],'Preciso forma con è il predicato nominale.'],
['In «Considero preciso il disegno», preciso è…','predicativo dell’oggetto',['attributo del soggetto','apposizione'],'Preciso completa considero e si riferisce all’oggetto il disegno.'],
['In «Il disegno preciso è sul banco», preciso è…','attributo del soggetto',['parte nominale del predicato','complemento di mezzo'],'Preciso accompagna direttamente disegno.'],
['In «Nora, restauratrice esperta, spiega il metodo», qual è il nucleo dell’apposizione?','restauratrice',['esperta','metodo'],'Restauratrice è il nome che precisa Nora; esperta è attributo.']
],[['Scrivi l’attributo dell’oggetto in «Marta osserva il foglio grande».',['grande'],'Grande accompagna foglio, che è oggetto.'],['Scrivi il nome in apposizione in «Luca, il tecnico, arriva».',['tecnico'],'Tecnico precisa Luca.']],['Seleziona il gruppo in apposizione.',['Ada,','la','docente,','mostra','il','progetto.'],[1,2],'La docente precisa Ada.']],
['Oggetto',[
['In «Alla fine della prova Luca consegna il disegno alla docente», quale gruppo è oggetto?','il disegno',['alla docente','della prova'],'Il disegno riceve direttamente l’azione di consegna.'],
['In «I cartoni? Li tagliamo per la mostra», che cosa riprende li?','i cartoni',['la mostra','noi'],'Li sostituisce i cartoni come oggetto diretto.'],
['Quale frase contiene un oggetto partitivo?','Abbiamo scelto delle fotografie.',['Parliamo delle fotografie.','La cornice delle fotografie è chiara.'],'Delle fotografie indica alcune fotografie e completa direttamente scelto.'],
['In «Con cura Noor osserva i dettagli del pannello», qual è il nucleo dell’oggetto?','dettagli',['Noor','cura'],'I dettagli è l’oggetto; del pannello lo precisa.'],
['In «A Sara piace il modello», qual è il soggetto?','il modello',['a Sara','piace'],'Il modello concorda con piace; a Sara è termine, non oggetto.'],
['Quale frase contiene un oggetto diretto?','La classe costruisce una mensola.',['La classe parla della mensola.','La classe arriva alla mensola.'],'Una mensola completa direttamente costruisce.']
],[['Scrivi l’oggetto in «Dopo la lezione Sara saluta la collega».',['la collega'],'La collega è la persona salutata.'],['Scrivi l’oggetto in «Con pazienza Luca piega il foglio».',['il foglio'],'Il foglio riceve direttamente l’azione.']],['Seleziona il complemento oggetto completo.',['Prima','della','prova','Ada','controlla','le','misure','finali.'],[5,6,7],'Le misure finali è il gruppo oggetto.']],
['Termine e specificazione',[
['In «Il direttore mostra ai colleghi il progetto della classe», quale gruppo è termine?','ai colleghi',['della classe','il progetto'],'Ai colleghi indica i destinatari della presentazione.'],
['Nella frase «Il direttore mostra ai colleghi il progetto della classe», quale gruppo specifica il nome progetto?','della classe',['ai colleghi','il direttore'],'Della classe precisa il nome progetto.'],
['In «Il bordo del tessuto piace a Lia», del tessuto è…','specificazione',['termine','soggetto'],'Del tessuto specifica il nome bordo.'],
['In «Il bordo del tessuto piace a Lia», a Lia è…','termine',['specificazione','oggetto'],'A Lia indica a chi piace il bordo.'],
['In «Luca ha telefonato a Sara e le ha raccontato tutto», le significa…','a Sara',['Sara come oggetto diretto','in quella stanza'],'Le riprende il complemento di termine a Sara.'],
['Quale frase contiene specificazione?','La copertina del quaderno è rossa.',['Consegno il quaderno a Sara.','Poso il quaderno sul banco.'],'Del quaderno precisa il nome copertina.']
],[['Scrivi il complemento di termine in «Ada presenta il modello a Lina».',['a Lina'],'A Lina indica la destinataria.'],['Scrivi il complemento di specificazione in «La finestra del laboratorio è aperta».',['del laboratorio'],'Del laboratorio precisa la finestra.']],['Seleziona il complemento di termine.',['Oggi','consegniamo','il','progetto','alla','docente.'],[4,5],'Alla docente indica la persona destinataria.']],
['Luogo e tempo',[
['In «Durante la prova gli allievi restano in aula», in aula indica…','stato in luogo',['moto a luogo','tempo continuato'],'Restano colloca gli allievi nell’aula.'],
['In «Dopo la prova gli allievi entrano in aula», in aula indica…','moto a luogo',['stato in luogo','causa'],'Entrano indica uno spostamento verso l’aula.'],
['In «Dalla scuola Lea passa per il cortile», per il cortile indica…','moto per luogo',['moto da luogo','termine'],'Il cortile è il percorso; dalla scuola indica la partenza.'],
['In «Al mattino il laboratorio apre per tre ore», per tre ore indica…','durata',['momento preciso','luogo'],'Il gruppo indica quanto dura l’apertura.'],
['In «Al mattino il laboratorio apre per tre ore», al mattino indica…','tempo determinato',['moto a luogo','fine'],'Il gruppo colloca l’apertura nel tempo.'],
['In «La classe arriva dal museo alle cinque», dal museo indica…','luogo di provenienza',['destinazione','durata'],'Dal museo indica il luogo da cui arriva la classe.']
],[['Scrivi il gruppo di durata in «La visita dura due ore».',['due ore'],'Due ore misura la durata.'],['Scrivi il luogo di destinazione in «Marta va in biblioteca con Lia».',['in biblioteca'],'In biblioteca è la destinazione.']],['Seleziona il gruppo che indica il momento.',['Domani','mattina','il','gruppo','parte','per','Cremona.'],[0,1],'Domani mattina colloca la partenza nel tempo.']],
['Causa, fine, mezzo e modo',[
['In «Per il ritardo Lia viaggia in treno con calma», per il ritardo indica…','causa',['mezzo','modo'],'Il ritardo è la ragione indicata.'],
['Nella frase «Per il ritardo Lia viaggia in treno con calma», in treno indica…','mezzo',['causa','fine'],'Il treno è il mezzo di trasporto.'],
['Nella frase «Per il ritardo Lia viaggia in treno con calma», con calma indica…','modo',['mezzo','termine'],'Con calma descrive come viaggia Lia.'],
['In «Prepariamo i campioni per la mostra», per la mostra indica…','fine',['causa','modo'],'La mostra è lo scopo della preparazione.'],
['Quale frase usa con per indicare lo strumento?','Fisso il foglio con una clip.',['Esco con la collega.','Parlo con calma.'],'La clip è lo strumento usato.'],
['Quale frase usa per per indicare la causa?','Il campo è chiuso per la pioggia.',['Preparo il banco per la prova.','Passo per il cortile.'],'La pioggia è il motivo della chiusura.']
],[['Scrivi il mezzo in «Con un righello Ada misura il foglio».',['Con un righello'],'Il righello è lo strumento utilizzato.'],['Scrivi il modo in «Luca corregge il progetto con attenzione».',['con attenzione'],'Con attenzione descrive come Luca corregge.']],['Seleziona il complemento di causa.',['La','partita','è','rinviata','per','il','maltempo.'],[4,5,6],'Per il maltempo indica la causa del rinvio.']],
['Compagnia e unione',[
['In «Lia parte con il collega e con una valigia», con il collega indica…','compagnia',['unione','mezzo'],'Il collega è la persona che accompagna Lia.'],
['Nella frase «Lia parte con il collega e con una valigia», con una valigia indica…','unione',['compagnia','causa'],'La valigia è la cosa portata con sé.'],
['Quale frase usa con per indicare compagnia?','Luca visita il museo con un’amica.',['Luca apre la scatola con una chiave.','Luca viaggia con una valigia.'],'Un’amica è la persona con cui Luca visita.'],
['Quale frase usa con per indicare unione?','Ada esce con il quaderno nella borsa.',['Ada parte con il fratello.','Ada lavora con cura.'],'Il quaderno è la cosa portata con sé.'],
['In «Il bambino corre insieme al cane nel prato», il gruppo insieme al cane indica…','compagnia',['luogo','causa'],'Il cane è l’essere animato che accompagna il bambino.'],
['In «Nora lavora con Marta in aula», quale gruppo indica compagnia?','con Marta',['in aula','Nora'],'Con Marta indica la persona insieme alla quale Nora lavora.']
],[['Scrivi il gruppo di compagnia in «Ada rientra con Lia dal corso».',['con Lia'],'Con Lia indica la persona che accompagna Ada.'],['Scrivi il gruppo di unione in «Ada parte con un borsone».',['con un borsone'],'Il borsone è la cosa portata con sé.']],['Seleziona il gruppo di compagnia.',['Il','gruppo','lavora','insieme','alla','docente','in','aula.'],[3,4,5],'Insieme alla docente indica compagnia.']],
['Materia e qualità',[
['In «Un tavolo di legno sostiene un vaso di vetro», di legno indica…','materia',['qualità morale','destinatario'],'Di legno indica il materiale del tavolo.'],
['Nella frase «Un tavolo di legno sostiene un vaso di vetro», di vetro indica…','materia',['un argomento','un agente'],'Di vetro indica il materiale del vaso.'],
['In «Una ragazza di grande pazienza prepara il modello», il gruppo di grande pazienza indica…','qualità',['materia','luogo'],'Il gruppo descrive una caratteristica della ragazza.'],
['In «Luca ha scelto una scatola di latta», di latta indica…','materia',['causa','termine'],'Di latta precisa il materiale della scatola.'],
['Quale frase contiene un complemento di qualità?','Conosco una docente di grande esperienza.',['Conosco una docente di Cremona.','Conosco una docente in biblioteca.'],'Di grande esperienza descrive una qualità.'],
['Quale frase contiene un complemento di materia?','La cornice in ottone è sul banco.',['La cornice della mostra è sul banco.','La cornice è sul banco.'],'In ottone indica il materiale.']
],[['Scrivi il complemento di materia in «Un vaso di vetro è sul ripiano».',['di vetro'],'Di vetro indica il materiale.'],['Scrivi il complemento di qualità in «Un giovane di talento disegna».',['di talento'],'Di talento indica una caratteristica.']],['Seleziona il complemento di materia.',['La','tazza','di','ceramica','è','sul','tavolo.'],[2,3],'Di ceramica indica il materiale della tazza.']],
['Denominazione e argomento',[
['In «La città di Parma ospita la mostra di fotografia», di Parma indica…','denominazione',['argomento','mezzo'],'Parma è il nome della città.'],
['In «Durante la pausa discutiamo di fotografia», di fotografia indica…','argomento',['denominazione della città','termine'],'Di fotografia indica il tema della discussione.'],
['In «Durante la pausa parliamo di musica», di musica indica…','argomento',['tempo','luogo'],'Di musica esprime il tema del dialogo.'],
['In «Il mese di giugno precede il corso», di giugno indica…','denominazione',['soggetto','causa'],'Giugno è il nome del mese.'],
['Quale frase usa sulla per introdurre un argomento?','Leggo un articolo sulla liuteria.',['Lascio un articolo sulla mensola.','Poso un articolo sulla scrivania.'],'Sulla liuteria indica il tema dell’articolo.'],
['Quale frase contiene una denominazione?','Il lago di Garda è visitato.',['La riva del lago è visitata.','Parlo del lago.'],'Garda è il nome del lago.']
],[['Scrivi il complemento di argomento in «In aula discutiamo di arte».',['di arte'],'Di arte è il tema della discussione.'],['Scrivi il complemento di denominazione in «La città di Pisa è in Toscana».',['di Pisa'],'Pisa è il nome della città.']],['Seleziona il complemento di argomento.',['Lia','legge','un','libro','sulla','liuteria.'],[4,5],'Sulla liuteria precisa il tema del libro.']],
['Limitazione e paragone',[
['In «Il pannello è più alto della sedia ma meno largo del tavolo», della sedia indica…','secondo termine di paragone',['termine','causa'],'Della sedia introduce il confronto dell’altezza.'],
['Nella frase «Il pannello è più alto della sedia ma meno largo del tavolo», del tavolo indica…','secondo termine di paragone',['soggetto','tempo'],'Del tavolo introduce il confronto della larghezza.'],
['In «Quanto a precisione, il progetto di Lea è ottimo», quale gruppo delimita il giudizio?','quanto a precisione',['di Lea','il progetto'],'Il gruppo limita il giudizio all’aspetto della precisione.'],
['In «Ada è esperta in disegno e disponibile con i colleghi», in disegno indica…','limitazione',['stato in luogo','prezzo'],'In disegno delimita il campo di competenza.'],
['Quale frase contiene un secondo termine di paragone?','La stoffa è più leggera della tela.',['La stoffa è di lino.','La stoffa è sopra la tela.'],'Della tela introduce il termine del confronto.'],
['Quale frase contiene una limitazione?','Quanto a esperienza, Luca è preparato.',['Luca lavora con esperienza.','Luca arriva dal laboratorio.'],'Quanto a esperienza delimita l’ambito del giudizio.']
],[['Scrivi il termine di paragone in «La sedia è più alta del tavolo».',['del tavolo'],'Del tavolo introduce l’elemento confrontato.'],['Scrivi il complemento di limitazione in «Lina è esperta in ceramica».',['in ceramica'],'In ceramica delimita l’ambito della competenza.']],['Seleziona il secondo termine di paragone.',['Questo','foglio','è','più','largo','del','quaderno.'],[5,6],'Del quaderno introduce il termine del confronto.']]
];
for(const [group,cs,es,t] of data){for(const row of cs)choice(group,...row);for(const row of es)exact(group,...row);tokens(group,...t)}
window.ATELIER_NEW_LOGICA_SFIDE=items;
})();
