(() => {
'use strict';
const rows=[
[1,'In «La scatola è piena di bottoni», che cosa indica «di bottoni»?','abbondanza',['privazione','pena'],'Di bottoni indica ciò che è presente in abbondanza.'],
[1,'In «Il cassetto è privo di matite», «di matite» indica…','privazione',['vantaggio','colpa'],'Di matite indica ciò che manca.'],
[1,'In «Raccogliamo fondi a favore della biblioteca», il gruppo «a favore della biblioteca» indica…','vantaggio',['svantaggio','separazione'],'La biblioteca è la beneficiaria della raccolta.'],
[1,'In «La decisione va a danno dei partecipanti», «a danno dei partecipanti» indica…','svantaggio',['vantaggio','abbondanza'],'I partecipanti subiscono il danno.'],
[1,'In «Il giocatore è accusato di frode», «di frode» indica…','colpa',['pena','origine'],'Di frode indica il fatto contestato.'],
[1,'In «Il concorrente è stato punito con una squalifica», «con una squalifica» indica…','pena',['colpa','vantaggio'],'La squalifica è la sanzione inflitta.'],
[2,'In «Dividiamo i bottoni rotti da quelli integri», «da quelli integri» indica…','separazione',['moto da luogo','pena'],'Il gruppo indica da quali oggetti vengono separati i bottoni rotti.'],
[2,'In «La musicista discende da una famiglia di artigiani», «da una famiglia di artigiani» indica…','origine',['moto a luogo','privazione'],'Il gruppo indica l’origine familiare.'],
[2,'Quale frase contiene un complemento di abbondanza?','Il vaso è colmo di fiori.',['Il vaso è privo di fiori.','Il colore dei fiori è intenso.'],'Di fiori indica ciò che riempie il vaso.'],
[2,'Quale frase contiene un complemento di privazione?','Il mobile è sprovvisto di maniglie.',['Il mobile è ricco di dettagli.','Il colore delle maniglie è chiaro.'],'Di maniglie indica ciò che manca al mobile.'],
[2,'Quale frase presenta un beneficio per una persona?','Abbiamo organizzato una raccolta a favore di Chiara.',['Abbiamo parlato con Chiara.','Abbiamo incontrato Chiara.'],'A favore di Chiara indica la beneficiaria della raccolta.'],
[2,'In «La sarta libera il tessuto dalle spille», «dalle spille» è…','separazione',['compagnia','prezzo'],'Dalle spille indica gli oggetti rimossi dal tessuto.'],
[2,'In «La restauratrice proviene da una famiglia di liutai», «da una famiglia di liutai» è…','origine',['termine','pena'],'Il gruppo indica la famiglia di provenienza.'],
[2,'Quale frase distingue colpa e pena?','È stato accusato di frode e punito con una multa.',['È stato accusato di frode e ha studiato.','Ha pagato una multa in banca.'],'Di frode indica la colpa contestata; con una multa indica la pena.'],
[2,'In «Il tavolo è ricco di intarsi», «di intarsi» è…','abbondanza',['privazione','argomento'],'Di intarsi indica ciò di cui il tavolo è ricco.'],
[2,'In «La decisione è andata a svantaggio degli studenti», il gruppo finale è…','svantaggio',['vantaggio','materia'],'A svantaggio degli studenti indica chi ha subito il danno.'],
[3,'Quale frase contiene una separazione, non un luogo di partenza?','Ha distinto i fatti dalle opinioni.',['È uscita dalla scuola.','È partita dalla stazione.'],'Dalle opinioni indica il termine della distinzione, non un luogo.'],
[3,'In «Il cassetto è pieno di fili e privo di aghi», quali funzioni hanno i due gruppi nell’ordine?','abbondanza; privazione',['privazione; abbondanza','materia; argomento'],'Di fili indica ciò che è presente; di aghi ciò che manca.'],
[3,'In «Il nome deriva da una parola latina», il gruppo «da una parola latina» indica…','origine',['agente','moto a luogo'],'Il gruppo indica l’origine della parola.'],
[3,'In «Gli allievi lavorano per una mostra; raccolgono fondi per la scuola», quali rapporti esprimono i due gruppi con per?','fine; vantaggio',['vantaggio; fine','causa; materia'],'La mostra è lo scopo del lavoro; la scuola beneficia della raccolta.'],
[3,'Quale frase contiene un complemento di colpa?','L’atleta è accusato di una violazione del regolamento.',['L’atleta è punito con una sospensione.','L’atleta gareggia per la squadra.'],'Il gruppo introdotto da di esprime il fatto contestato.'],
[3,'In «La docente distingue il prototipo definitivo dai modelli preliminari», il gruppo «dai modelli preliminari» indica…','separazione',['origine familiare','tempo continuato'],'Il gruppo indica il termine rispetto al quale viene operata la distinzione.'],
[3,'In «Una scelta a danno dei soci», «dei soci» fa parte di un complemento di…','svantaggio',['vantaggio','agente'],'L’espressione completa a danno dei soci indica chi subisce il danno.'],
[3,'Quale frase presenta un complemento di origine familiare?','La liutaia discende da una famiglia di musicisti.',['La liutaia esce dalla bottega.','La liutaia va in bottega.'],'Da una famiglia di musicisti indica la famiglia di origine, non un percorso.']
];
window.ATELIER_NEW_COMPLEMENTI=rows.map(([topicGroupLevel,prompt,solution,wrong,feedback],i)=>{const options=[solution,...wrong],answer=i%options.length;options.splice(answer,0,options.shift());return{id:`compl-extra-${String(i+1).padStart(3,'0')}`,area:'frase',topicGroup:'Altri complementi',topic:'Altri complementi',level:topicGroupLevel,pei:false,kind:'choice',title:'Scopri il rapporto',prompt,options,answer,solution,feedback,minutes:2}});
})();
