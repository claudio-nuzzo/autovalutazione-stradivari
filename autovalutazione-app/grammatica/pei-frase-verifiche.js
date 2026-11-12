(() => {
'use strict';
const data=[
['Soggetto e predicato',[
['«Luca legge». Chi legge?','Luca',['Anna'],'Luca compie l’azione di leggere.'],
['«La porta si apre». Che cosa si apre?','la porta',['la finestra'],'La porta è il soggetto della frase.'],
['«Noi scriviamo». Quale parola dice che cosa facciamo?','scriviamo',['noi'],'Scriviamo è il predicato: indica l’azione.']]],
['Soggetto, predicato e oggetto',[
['«Lia apre la scatola». Chi apre?','Lia',['la scatola'],'Lia è il soggetto.'],
['«Marta legge un libro». Che cosa legge?','un libro',['Marta'],'Un libro è il complemento oggetto.'],
['«Il gatto dorme». Quale parola dice che cosa fa il gatto?','dorme',['il gatto'],'Dorme è il predicato.']]],
['Oggetto',[
['«Anna apre la porta». Che cosa apre Anna?','la porta',['Anna'],'La porta è ciò che viene aperto.'],
['«Luca legge il libro». Che cosa legge Luca?','il libro',['Luca'],'Il libro è ciò che Luca legge.'],
['«Sara prende la matita». Che cosa prende Sara?','la matita',['Sara'],'La matita è il complemento oggetto.']]],
['Attributo e apposizione',[
['«Il vaso rosso cade». Quale parola descrive il vaso?','rosso',['cade'],'Rosso è un attributo di vaso.'],
['«La lampada luminosa è qui». Quale parola descrive la lampada?','luminosa',['qui'],'Luminosa è un attributo di lampada.'],
['«Lia, la docente, parla». Quale nome spiega chi è Lia?','docente',['parla'],'Docente è l’apposizione di Lia.']]],
['Termine e specificazione',[
['«Luca scrive a Sara». A chi scrive?','a Sara',['il banco'],'A Sara è il complemento di termine.'],
['«La borsa di Lia è blu». Di chi è la borsa?','di Lia',['sul banco'],'Di Lia è il complemento di specificazione.'],
['«Ada dà il libro a Luca». A chi dà il libro?','a Luca',['in aula'],'A Luca è il complemento di termine.']]],
['Luogo e tempo',[
['«Il libro è sul banco». Dove si trova?','sul banco',['domani'],'Sul banco indica il luogo.'],
['«La mostra apre domani». Quando apre?','domani',['in aula'],'Domani indica il tempo.'],
['«Lia va in biblioteca». Dove va?','in biblioteca',['ieri'],'In biblioteca indica la destinazione.']]],
['Causa, fine, mezzo e modo',[
['«Luca taglia con le forbici». Con quale strumento taglia?','con le forbici',['con Sara'],'Le forbici sono il mezzo usato.'],
['«Lia parla con calma». Come parla?','con calma',['in aula'],'Con calma indica il modo.'],
['«La gara è rinviata per la pioggia». Per quale motivo?','per la pioggia',['per il vento'],'Per la pioggia indica la causa.']]],
['Compagnia e unione',[
['«Lia esce con Marta». Con quale persona esce?','con Marta',['con la borsa'],'Marta è la persona che accompagna Lia.'],
['«Luca parte con la valigia». Quale oggetto porta con sé?','la valigia',['il fratello'],'La valigia è la cosa portata insieme.'],
['«Sara studia con Anna». Con quale persona studia?','con Anna',['con la matita'],'Anna accompagna Sara nello studio.']]],
['Materia e qualità',[
['«Il vaso è di vetro». Di quale materiale è fatto?','vetro',['carta'],'Di vetro indica il materiale.'],
['«La scatola è di legno». Di quale materiale è fatta?','legno',['plastica'],'Di legno indica il materiale.'],
['«Lia è una persona di talento». Quale qualità viene indicata?','talento',['pazienza'],'Di talento indica una qualità.']]],
['Denominazione e argomento',[
['«La città di Parma è vicina». Come si chiama la città?','Parma',['Modena'],'Parma è il nome della città.'],
['«Parliamo di musica». Qual è il tema?','musica',['legno'],'Di musica indica l’argomento.'],
['«Il mese di aprile è iniziato». Come si chiama il mese?','aprile',['maggio'],'Aprile è il nome del mese.']]],
['Limitazione e paragone',[
['«Lia è più alta di Sara». Con chi si confronta Lia?','Sara',['Anna'],'Di Sara introduce il termine di paragone.'],
['«Il nastro è più lungo della corda». Con quale oggetto si confronta il nastro?','la corda',['la matita'],'Della corda introduce il termine di paragone.'],
['«Lia è esperta in disegno». In quale attività è esperta?','disegno',['nuoto'],'In disegno limita il campo della competenza.']]],
['Complemento partitivo',[
['«Due dei ragazzi leggono». Le due persone appartengono a quale gruppo?','ai ragazzi',['alle ragazze'],'Dei ragazzi indica l’insieme da cui si considerano due persone.'],
['«Uno dei libri è aperto». Uno appartiene a quale gruppo?','ai libri',['ai quaderni'],'Dei libri indica l’insieme considerato.'],
['«Alcuni di noi cantano». Le persone indicate da alcuni appartengono a quale gruppo?','a noi',['agli ospiti'],'Di noi indica l’insieme di riferimento.']]],
['Complementi di misura',[
['«La scatola pesa tre chili». Che cosa misura tre chili?','il peso',['il prezzo'],'Tre chili indica il peso.'],
['«La matita costa due euro». Che cosa indica due euro?','il prezzo',['il peso'],'Due euro indica il prezzo.'],
['«La striscia è lunga un metro». Che cosa misura un metro?','la lunghezza',['il prezzo'],'Un metro misura la lunghezza.']]],
['Predicativi del soggetto e dell’oggetto',[
['«La squadra elegge Lia capitana». Chi diventa capitana?','Lia',['la squadra'],'Capitana indica il ruolo attribuito a Lia.'],
['«La giuria nomina Luca vincitore». Chi diventa vincitore?','Luca',['la giuria'],'Vincitore indica il ruolo attribuito a Luca.'],
['«Il cartone sembra resistente». Quale qualità sembra avere il cartone?','resistente',['fragile'],'Resistente completa sembra e si riferisce al cartone.']]],
['Agente e passivo',[
['«Il foglio è tagliato da Anna». Chi taglia?','Anna',['Luca'],'Da Anna indica chi compie l’azione.'],
['«Il quadro è appeso da Luca». Chi appende il quadro?','Luca',['Anna'],'Da Luca indica l’agente.'],
['«Il telo è mosso dal vento». Che cosa muove il telo?','il vento',['la pioggia'],'Dal vento indica la causa efficiente.']]],
['Altri complementi',[
['«La scatola è piena di bottoni». Che cosa contiene?','bottoni',['matite'],'Di bottoni indica ciò che riempie la scatola.'],
['«La scatola è priva di maniglie». Che cosa manca?','le maniglie',['i quaderni'],'Di maniglie indica ciò che manca.'],
['«Raccogliamo fondi per la biblioteca». Chi riceve il beneficio?','la biblioteca',['la scuola'],'Per la biblioteca indica il beneficiario.']]]
];
const bank=[];
for(const [group,rows] of data)for(const [prompt,solution,wrong,feedback] of rows){const i=bank.length,options=[solution,...wrong],answer=i%options.length;options.splice(answer,0,options.shift());bank.push({id:`pei-ver-frase-${String(i+1).padStart(3,'0')}`,area:'frase',topicGroup:group,topic:group,level:1,pei:true,assessmentOnly:true,kind:'choice',title:'Osserva e scegli',prompt,options,answer,solution,feedback,minutes:2})}
window.ATELIER_PEI_FRASE=bank;
})();
