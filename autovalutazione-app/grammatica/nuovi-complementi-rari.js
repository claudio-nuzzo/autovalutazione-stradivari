(() => {
'use strict';
const rows=[
['Agente e passivo','In «Il disegno è stato firmato da Nadia», «da Nadia» è…','agente',['causa efficiente','moto a luogo'],'Nadia compie l’azione espressa dalla forma passiva.'],
['Agente e passivo','In «Il telone è stato sollevato dal vento», «dal vento» è…','causa efficiente',['agente','termine'],'Il vento è una forza inanimata che produce l’azione.'],
['Agente e passivo','In quale frase il gruppo introdotto da «da» esprime l’agente?','La tavola è stata misurata da Marta.',['Marta torna da scuola.','Marta va da Luca.'],'Da Marta indica chi ha compiuto la misurazione.'],
['Agente e passivo','Nella frase «La vernice è stata stesa dagli allievi», chi riceve l’azione?','la vernice',['gli allievi','la forma verbale'],'La vernice è il soggetto della frase passiva.'],
['Agente e passivo','Quale frase è passiva?','Il telaio viene controllato da Luca.',['Luca controlla il telaio.','Luca è arrivato presto.'],'Viene controllato presenta l’azione dal punto di vista del telaio.'],
['Complemento partitivo','In «Alcuni degli strumenti sono accordati», «degli strumenti» indica…','l’insieme da cui si considerano alcuni elementi',['l’oggetto dell’accordare','il materiale degli strumenti'],'Alcuni seleziona una parte dell’insieme degli strumenti.'],
['Complemento partitivo','Quale gruppo è partitivo?','fra i tessuti in «Uno fra i tessuti è leggero».',['dei tessuti in «Acquisto dei tessuti».','del tessuto in «Il colore del tessuto è chiaro».'],'Fra i tessuti indica l’insieme da cui si individua un elemento.'],
['Complemento partitivo','In «La più giovane delle allieve parla», «delle allieve» indica…','il gruppo entro cui si individua la più giovane',['il destinatario del parlare','il luogo in cui si parla'],'Il superlativo relativo individua una persona all’interno di un insieme.'],
['Complemento partitivo','In «Chi di voi presenta il lavoro?», «di voi» è…','partitivo',['termine','materia'],'Di voi indica il gruppo da cui è individuata la persona interrogata.'],
['Complemento partitivo','In quale frase «dei» introduce un complemento partitivo?','Tre dei cartoni sono pronti.',['Compro dei cartoni.','Il bordo dei cartoni è diritto.'],'Dei cartoni indica l’insieme di cui tre sono una parte.'],
['Compagnia e unione','In «La sarta arriva con la collega», «con la collega» è…','compagnia',['unione','mezzo'],'La collega è una persona che accompagna la sarta.'],
['Compagnia e unione','In «La sarta arriva con un quaderno nello zaino», «con un quaderno» esprime…','unione',['compagnia','fine'],'Il quaderno è una cosa portata con sé.'],
['Compagnia e unione','Quale frase mostra «con» usato per uno strumento?','Misuro con il righello.',['Esco con un righello nella borsa.','Esco con la compagna.'],'Il righello è usato per misurare: è mezzo.'],
['Compagnia e unione','In «Amir passeggia insieme al cane», il gruppo finale indica…','compagnia',['materia','tempo'],'Il cane è l’essere animato che accompagna Amir.'],
['Compagnia e unione','In «La ragazza entra con una valigia», il gruppo finale esprime…','unione',['agente','causa'],'La valigia è una cosa portata con sé.'],
['Materia e qualità','In «Una cornice di noce», «di noce» indica…','materia',['qualità morale','termine'],'Il noce indica il legno con cui è realizzata la cornice.'],
['Materia e qualità','In «Un’allieva di grande pazienza», il gruppo finale indica…','qualità',['materia','tempo'],'Di grande pazienza descrive una caratteristica dell’allieva.'],
['Materia e qualità','In quale frase il gruppo indica la sostanza di un oggetto?','Ho scelto una maniglia in ottone.',['Ho lavorato con attenzione.','La maniglia è sul banco.'],'In ottone indica il materiale della maniglia.'],
['Materia e qualità','Quale frase contiene un complemento di qualità?','Il tavolo ha gambe di notevole robustezza.',['Il tavolo è di legno.','Il tavolo è in aula.'],'Di notevole robustezza descrive una caratteristica delle gambe.'],
['Materia e qualità','In «Una persona dagli occhi chiari», «dagli occhi chiari» indica…','qualità',['materia','moto da luogo'],'Il gruppo descrive una caratteristica della persona.'],
['Denominazione e argomento','In «La città di Mantova», «di Mantova» è…','denominazione',['possesso','materia'],'Mantova è il nome proprio della città.'],
['Denominazione e argomento','In «Parliamo di strumenti ad arco», il gruppo finale è…','argomento',['termine','mezzo'],'Il gruppo indica il tema della conversazione.'],
['Denominazione e argomento','Quale frase contiene un complemento di denominazione?','Il mese di aprile è iniziato.',['La pioggia di aprile è intensa.','Il calendario di aprile è sul tavolo.'],'Aprile è il nome del mese indicato.'],
['Denominazione e argomento','In «Un articolo sulla liuteria», «sulla liuteria» indica…','argomento',['stato in luogo','agente'],'Il gruppo esprime il tema dell’articolo.'],
['Denominazione e argomento','In quale frase «su» introduce un argomento?','Abbiamo letto un saggio sulla musica.',['Il saggio è sul tavolo.','Il saggio cade sul tappeto.'],'Sulla musica precisa il tema del saggio.'],
['Limitazione e paragone','In «Amir è esperto nel disegno», «nel disegno» indica…','limitazione',['stato in luogo','pena'],'Il gruppo delimita l’ambito della competenza.'],
['Limitazione e paragone','In «La mensola è più lunga del piano», «del piano» è…','secondo termine di paragone',['termine','oggetto'],'Il piano è l’elemento confrontato con la mensola.'],
['Limitazione e paragone','Quale frase contiene una limitazione?','La docente è competente in botanica.',['La docente entra in serra.','La docente parla con calma.'],'In botanica delimita l’ambito della competenza.'],
['Limitazione e paragone','In «Lina è abile nel ricamo», che cosa specifica «nel ricamo»?','l’ambito dell’abilità',['il destinatario','la durata'],'La persona è giudicata abile nell’ambito indicato.'],
['Limitazione e paragone','In «Il tessuto è leggero come una piuma», «come una piuma» indica…','il secondo termine di paragone',['la causa della leggerezza','il materiale del tessuto'],'La piuma è il secondo elemento del confronto.'],
['Complementi di misura','In «Il pannello pesa quattro chili», «quattro chili» indica…','peso',['prezzo','età'],'Quattro chili quantifica il peso del pannello.'],
['Complementi di misura','In «La stoffa costa dodici euro», «dodici euro» indica…','prezzo',['distanza','tempo'],'La somma indica il costo della stoffa.'],
['Complementi di misura','In «Il laboratorio dista due chilometri dalla scuola», «due chilometri» indica…','distanza',['peso','età'],'La quantità misura la distanza tra laboratorio e scuola.'],
['Complementi di misura','In «La mensola è lunga un metro», «un metro» indica…','estensione',['prezzo','agente'],'Un metro misura la lunghezza.'],
['Complementi di misura','In «Un’allieva di quindici anni arriva», «di quindici anni» indica…','età',['materiale','modo'],'Il gruppo indica l’età dell’allieva.'],
['Predicativi del soggetto e dell’oggetto','In «La commissione ha nominato Sara rappresentante», «rappresentante» è…','predicativo dell’oggetto',['apposizione del soggetto','termine'],'Rappresentante si riferisce all’oggetto Sara attraverso il verbo nominare.'],
['Predicativi del soggetto e dell’oggetto','In «Sara è stata nominata rappresentante», «rappresentante» è…','predicativo del soggetto',['oggetto','attributo'],'Rappresentante si riferisce al soggetto Sara attraverso il verbo passivo.'],
['Predicativi del soggetto e dell’oggetto','In «Il piano sembra stabile», «stabile» è…','predicativo del soggetto',['attributo direttamente legato a piano','complemento di termine'],'Stabile si riferisce al soggetto attraverso il verbo copulativo sembra.'],
['Predicativi del soggetto e dell’oggetto','In «Considero utile questo schema», «utile» è…','predicativo dell’oggetto',['predicativo del soggetto','agente'],'Utile attribuisce una qualità all’oggetto questo schema.'],
['Predicativi del soggetto e dell’oggetto','In quale frase l’aggettivo è attributo?','La classe osserva il piano stabile.',['Il piano sembra stabile.','La classe considera stabile il piano.'],'Stabile accompagna direttamente il nome piano.']
];
const items=rows.map(([group,prompt,correct,wrong,feedback],i)=>{const options=[correct,...wrong],answer=i%options.length;options.splice(answer,0,options.shift());return{id:`log-rari-${String(i+1).padStart(3,'0')}`,area:'frase',topicGroup:group,topic:group,level:i%5===0?1:2,pei:false,kind:'choice',title:'Osserva il rapporto',prompt,options,answer,solution:correct,feedback,minutes:2}});
function exact(group,prompt,answers,feedback){items.push({id:`log-rari-${String(items.length+1).padStart(3,'0')}`,area:'frase',topicGroup:group,topic:group,level:2,pei:false,kind:'exact',title:'Individua il gruppo',prompt,answers,solution:answers[0],feedback,minutes:2})}
function token(group,prompt,words,answer,feedback){items.push({id:`log-rari-${String(items.length+1).padStart(3,'0')}`,area:'frase',topicGroup:group,topic:group,level:2,pei:false,kind:'tokens',title:'Seleziona il gruppo',prompt,tokens:words,answer,solution:answer.map(i=>words[i]).join(' · '),feedback,minutes:3})}
exact('Agente e passivo','Scrivi il complemento d’agente completo in «La sedia è stata montata da Paolo».',['da Paolo','da paolo'],'Da Paolo indica chi ha montato la sedia.');
exact('Complemento partitivo','Scrivi il complemento partitivo completo in «Due tra gli ospiti suonano».',['tra gli ospiti'],'Tra gli ospiti indica il gruppo da cui si considerano due persone.');
exact('Compagnia e unione','Scrivi il complemento di compagnia completo in «Marta studia con Luca».',['con Luca','con luca'],'Con Luca indica la persona con cui Marta studia.');
exact('Materia e qualità','Scrivi il complemento di materia completo in «Una tazza di ceramica è sul banco».',['di ceramica'],'Di ceramica indica il materiale della tazza.');
exact('Denominazione e argomento','Scrivi il complemento di argomento completo in «Parliamo di ambiente».',['di ambiente'],'Di ambiente indica il tema della conversazione.');
exact('Limitazione e paragone','Scrivi il complemento di limitazione completo in «Lina è abile nel ricamo».',['nel ricamo'],'Nel ricamo delimita l’ambito dell’abilità.');
exact('Complementi di misura','Scrivi il complemento di peso completo in «Il pannello pesa tre chili».',['tre chili'],'Tre chili esprime il peso del pannello.');
exact('Predicativi del soggetto e dell’oggetto','Scrivi il predicativo dell’oggetto in «Gli allievi eleggono Lea rappresentante».',['rappresentante'],'Rappresentante indica il ruolo attribuito all’oggetto Lea.');
token('Agente e passivo','Seleziona tutto il complemento d’agente.',['Il','bozzetto','è','stato','disegnato','dagli','studenti','.'],[5,6],'Dagli studenti indica chi ha disegnato il bozzetto.');
token('Complemento partitivo','Seleziona tutto il complemento partitivo.',['Alcuni','dei','partecipanti','sono','arrivati','.'],[1,2],'Dei partecipanti indica il gruppo di cui alcuni costituiscono una parte.');
token('Compagnia e unione','Seleziona tutto il complemento di compagnia.',['Lina','arriva','insieme','alla','collega','.'],[2,3,4],'Insieme alla collega indica la persona che accompagna Lina.');
token('Materia e qualità','Seleziona tutto il complemento di materia.',['La','scatola','di','cartone','è','pronta','.'],[2,3],'Di cartone indica il materiale della scatola.');
token('Denominazione e argomento','Seleziona tutto il complemento di argomento.',['Discutiamo','della','mostra','.'],[1,2],'Della mostra indica il tema della discussione.');
token('Limitazione e paragone','Seleziona tutto il secondo termine di paragone.',['Sara','è','più','alta','di','Luca','.'],[4,5],'Di Luca esprime il secondo termine del confronto.');
token('Complementi di misura','Seleziona tutto il complemento di distanza.',['La','fermata','dista','due','chilometri','da','qui','.'],[3,4],'Due chilometri indica la misura della distanza.');
token('Predicativi del soggetto e dell’oggetto','Seleziona il predicativo dell’oggetto.',['La','classe','ha','eletto','Sara','rappresentante','.'],[5],'Rappresentante è il ruolo attribuito all’oggetto Sara.');
window.ATELIER_NEW_COMPLEMENTI_RARI=items;
})();
