(() => {
'use strict';
const rows = [
['Termine e specificazione',2,'In «Alla classe consegno il disegno», quale funzione ha «alla classe»?','termine',['specificazione','moto a luogo'],'Alla classe indica il destinatario della consegna.'],
['Termine e specificazione',3,'In «Le consegno il cartamodello», riferito a Lina, «le» significa…','a Lina',['Lina come oggetto diretto','di Lina'],'Il pronome le esprime il destinatario: consegno a Lina.'],
['Termine e specificazione',3,'In «Il colore della stoffa piace a Marta», quali funzioni hanno i gruppi introdotti da preposizione?','specificazione; termine',['materia; oggetto','termine; specificazione'],'Della stoffa precisa il colore; a Marta indica a chi piace.'],
['Luogo e tempo',2,'In «Il modello resta sul banco», «sul banco» indica…','stato in luogo',['moto a luogo','moto da luogo'],'Il gruppo colloca il modello senza indicare una destinazione.'],
['Luogo e tempo',2,'In «La classe entra in laboratorio», «in laboratorio» indica…','moto a luogo',['stato in luogo','moto per luogo'],'Entra presenta il laboratorio come destinazione.'],
['Luogo e tempo',2,'In «Il gruppo passa attraverso il corridoio», il gruppo «attraverso il corridoio» indica…','moto per luogo',['moto da luogo','stato in luogo'],'Il corridoio è il luogo attraversato.'],
['Luogo e tempo',3,'In «Giovedì lavoriamo per tre ore», quali rapporti indicano i gruppi di tempo?','tempo determinato; tempo continuato',['tempo continuato; tempo determinato','tempo determinato; causa'],'Giovedì colloca il lavoro; per tre ore ne indica la durata.'],
['Causa, fine, mezzo e modo',2,'In «La carta si è arricciata per il calore», «per il calore» indica…','causa',['fine','modo'],'Il calore è la causa dell’arricciamento.'],
['Causa, fine, mezzo e modo',2,'In «Gli allievi si preparano per la mostra», «per la mostra» indica…','fine',['causa','materia'],'La mostra è lo scopo della preparazione.'],
['Causa, fine, mezzo e modo',2,'In «La modellista misura con il metro», «con il metro» indica…','mezzo',['compagnia','modo'],'Il metro è lo strumento usato per misurare.'],
['Causa, fine, mezzo e modo',2,'In «La modellista taglia con precisione», «con precisione» indica…','modo',['mezzo','compagnia'],'Con precisione descrive come è svolta l’azione.'],
['Oggetto',2,'In «Sara lo misura», riferito al pannello, quale parola svolge la funzione di oggetto?','lo',['Sara','misura'],'Lo sostituisce il pannello, oggetto diretto del verbo.'],
['Oggetto',3,'Quale frase contiene un complemento oggetto introdotto dall’articolo partitivo?','Ho comprato dei pennelli.',['Parlo dei pennelli.','Il manico dei pennelli è pulito.'],'Dei pennelli significa alcuni pennelli ed è oggetto di ho comprato.'],
['Agente e passivo',2,'In «Il prototipo è stato realizzato dagli allievi», «dagli allievi» è…','complemento d’agente',['complemento di termine','moto da luogo'],'Gli allievi compiono l’azione espressa dalla forma passiva.'],
['Agente e passivo',3,'In «La finestra è stata danneggiata dalla grandine», «dalla grandine» è…','causa efficiente',['agente','moto da luogo'],'La grandine è una causa inanimata dell’azione passiva.'],
['Compagnia e unione',2,'In «Lina esce con la collega», «con la collega» esprime…','compagnia',['mezzo','unione'],'La collega è la persona che accompagna Lina.'],
['Compagnia e unione',3,'In «Lina esce con il quaderno nello zaino», «con il quaderno» indica…','unione',['mezzo con cui esce','compagnia'],'Il quaderno è un oggetto portato con sé, non lo strumento dell’uscita.'],
['Complemento partitivo',2,'In «Due delle sedie sono pronte», «delle sedie» indica…','l’insieme da cui si considerano due elementi',['la materia delle sedie','il destinatario'],'Due individua una parte; delle sedie esprime l’insieme.'],
['Complemento partitivo',3,'Quale gruppo è un complemento partitivo?','fra gli iscritti in «Tre fra gli iscritti suonano».',['dei tessuti in «Scelgo dei tessuti».','del tavolo in «Il bordo del tavolo è liscio».'],'Fra gli iscritti indica il gruppo da cui si selezionano tre persone.'],
['Materia e qualità',2,'In «Una cornice di acero», «di acero» indica…','materia',['qualità morale','termine'],'Il gruppo indica il materiale della cornice.'],
['Materia e qualità',2,'In «Un’artigiana di grande pazienza», il gruppo finale indica…','qualità',['materia','moto da luogo'],'Il gruppo descrive una qualità dell’artigiana.'],
['Denominazione e argomento',2,'In «Il mese di maggio è iniziato», «di maggio» è…','denominazione',['materia','mezzo'],'Maggio è il nome del mese indicato.'],
['Denominazione e argomento',2,'In «Discutiamo del progetto», «del progetto» è…','argomento',['agente','tempo continuato'],'Il gruppo indica ciò di cui si discute.'],
['Limitazione e paragone',3,'In «Lina è esperta di disegno», «di disegno» indica…','limitazione',['moto da luogo','pena'],'Il giudizio di competenza è limitato all’ambito del disegno.'],
['Limitazione e paragone',3,'In «Il ripiano è più largo del tavolo», «del tavolo» è…','secondo termine di paragone',['specificazione del ripiano','complemento oggetto'],'Il tavolo è l’elemento con cui si confronta la larghezza del ripiano.'],
['Complementi di misura',2,'In «La tavola pesa cinque chili», «cinque chili» indica…','peso',['prezzo','età'],'Cinque chili misura il peso della tavola.'],
['Complementi di misura',2,'In «Il biglietto costa dieci euro», «dieci euro» indica…','prezzo',['distanza','materia'],'Dieci euro indica il prezzo del biglietto.'],
['Predicativi del soggetto e dell’oggetto',3,'In «Gli allievi hanno eletto Marta rappresentante», «rappresentante» è…','predicativo dell’oggetto',['apposizione del soggetto','complemento di termine'],'Rappresentante completa eletto e si riferisce all’oggetto Marta.'],
['Predicativi del soggetto e dell’oggetto',3,'In «Marta è stata eletta rappresentante», «rappresentante» è…','predicativo del soggetto',['complemento oggetto','attributo'],'Rappresentante completa il verbo passivo e si riferisce al soggetto Marta.'],
['Altri complementi',2,'In «La scatola è priva di bottoni», «di bottoni» indica…','privazione',['abbondanza','fine'],'Il gruppo indica ciò che manca.']
];
const items=rows.map(([topicGroup,level,prompt,correct,wrong,feedback],i)=>{const options=[correct,...wrong];const answer=i%options.length;options.splice(answer,0,options.shift());return{id:`log-av-${String(i+1).padStart(3,'0')}`,area:'frase',topicGroup,topic:topicGroup,level,pei:false,kind:'choice',title:'Analizza la frase',prompt,options,answer,solution:correct,feedback,minutes:2}});
function exact(group,level,prompt,answers,feedback){items.push({id:`log-av-${String(items.length+1).padStart(3,'0')}`,area:'frase',topicGroup:group,topic:group,level,pei:false,kind:'exact',title:'Trova il complemento',prompt,answers,solution:answers[0],feedback,minutes:2})}
function tokens(group,level,prompt,words,answer,feedback){items.push({id:`log-av-${String(items.length+1).padStart(3,'0')}`,area:'frase',topicGroup:group,topic:group,level,pei:false,kind:'tokens',title:'Seleziona nella frase',prompt,tokens:words,answer,solution:answer.map(i=>words[i]).join(' · '),feedback,minutes:3})}
exact('Oggetto',2,'Scrivi il complemento oggetto completo in «La sarta prepara un abito».',['un abito'],'Un abito è ciò che la sarta prepara.');
exact('Termine e specificazione',2,'Scrivi il complemento di termine completo in «Sara consegna il modello a Luca».',['a Luca','a luca'],'A Luca indica il destinatario della consegna.');
exact('Luogo e tempo',2,'Scrivi il complemento di tempo continuato completo in «Luca studia per due ore».',['per due ore'],'Per due ore esprime la durata dello studio.');
exact('Causa, fine, mezzo e modo',2,'Scrivi il complemento di mezzo completo in «Taglia il cartone con le forbici».',['con le forbici'],'Con le forbici indica lo strumento adoperato.');
exact('Complemento partitivo',3,'Scrivi il complemento partitivo completo in «Due delle ragazze suonano».',['delle ragazze'],'Delle ragazze indica il gruppo da cui sono selezionate due persone.');
tokens('Oggetto',2,'Seleziona tutte le parole del complemento oggetto.',['Lina','prepara','una','nuova','tavola','.'],[2,3,4],'Una nuova tavola è il gruppo che svolge la funzione di oggetto.');
tokens('Luogo e tempo',2,'Seleziona tutto il complemento di moto a luogo.',['Le','allieve','entrano','nel','laboratorio','.'],[3,4],'Nel laboratorio indica la destinazione del movimento.');
tokens('Causa, fine, mezzo e modo',2,'Seleziona tutto il complemento di modo.',['Marta','lavora','con','grande','cura','.'],[2,3,4],'Con grande cura descrive la maniera in cui Marta lavora.');
tokens('Agente e passivo',2,'Seleziona tutto il complemento d’agente.',['Il','mobile','è','stato','montato','dagli','allievi','.'],[5,6],'Dagli allievi indica le persone che compiono l’azione della passiva.');
tokens('Materia e qualità',2,'Seleziona tutto il complemento di materia.',['La','cornice','di','legno','è','pronta','.'],[2,3],'Di legno indica il materiale della cornice.');
window.ATELIER_NEW_COMPLEMENTI_AVANZATI=items;
})();
