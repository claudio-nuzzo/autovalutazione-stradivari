(() => {
'use strict';
const data=[
['Principale, coordinate e subordinate',[
['In «Lia legge e Nora scrive», quante azioni indicano i verbi?','due','una','Legge e scrive indicano due azioni.'],
['In «Luca ride e Sara canta», quale parola collega le due parti?','e','Sara','E collega le due proposizioni.'],
['In «Se piove, resto», quale parte dice che cosa faccio?','resto','se piove','Resto è la proposizione principale.']]],
['Principale e proposizioni',[
['In «Quando arrivi, partiamo», qual è la principale?','partiamo','quando arrivi','Partiamo non dipende dall’altra proposizione.'],
['In «Se piove, leggo», qual è la principale?','leggo','se piove','Leggo è la parte principale.'],
['In «Se hai fame, mangia», qual è la principale?','mangia','se hai fame','Mangia è la proposizione principale.']]],
['Coordinate',[
['In «Ada legge e Luca scrive», quale parola unisce le due parti?','e','Ada','E collega le due proposizioni.'],
['In «Studio ma sono stanco», quale parola indica contrasto?','ma','studio','Ma collega due fatti in contrasto.'],
['In «Leggo oppure disegno», quale parola presenta una scelta?','oppure','leggo','Oppure indica un’alternativa.']]],
['Subordinate e gradi',[
['In «Spero che arrivi», da quale parola dipende «che arrivi»?','spero','arrivi','Che arrivi completa il significato di spero.'],
['In «Penso che piova», quale parte dipende da penso?','che piova','penso','Che piova dipende da penso.'],
['In «Credo che Luca legga», quale verbo regge la parte «che Luca legga»?','credo','legga','Che Luca legga dipende da credo.']]],
['Esplicite e implicite',[
['In «Prima di uscire, chiudi», quale verbo è all’infinito?','uscire','chiudi','Uscire è un infinito.'],
['In «Quando arrivi, chiamo», quale parola è un verbo della parte iniziale?','arrivi','quando','Arrivi è il verbo della subordinata.'],
['In «Dopo aver letto, dormo», quale parte contiene un infinito?','aver letto','dormo','Aver letto è un infinito passato.']]],
['Completive',[
['In «È bello che tu canti», che cosa è bello?','che tu canti','il banco','La parte che tu canti dice che cosa è bello.'],
['In «Credo che piova», che cosa credo?','che piova','che nevichi','Che piova esprime il contenuto della credenza.'],
['In «Spero che tu venga», che cosa spero?','che tu venga','che tu parta','Che tu venga completa il significato di spero.']]],
['Relative',[
['In «Il cane che corre è mio», chi corre?','il cane','il banco','Che riprende il cane.'],
['In «Il libro che leggo è nuovo», che cosa leggo?','il libro','il quaderno','Che riprende il libro.'],
['In «La borsa che porto è blu», che cosa porto?','la borsa','lo zaino','Che riprende la borsa.']]],
['Causali',[
['In «Resto perché piove», perché resto?','perché piove','perché c’è il sole','Perché piove indica il motivo.'],
['In «Bevo perché ho sete», perché bevo?','perché ho sete','perché ho sonno','La sete è il motivo indicato.'],
['In «Chiudo perché fa freddo», perché chiudo?','perché fa freddo','perché fa caldo','Il freddo è la causa indicata.']]],
['Finali',[
['In «Studio per imparare», per quale scopo studio?','per imparare','per dormire','Per imparare indica lo scopo.'],
['In «Corro per arrivare», per quale scopo corro?','per arrivare','per riposare','Per arrivare indica lo scopo.'],
['In «Chiamo per chiedere aiuto», per quale scopo chiamo?','per chiedere aiuto','per chiudere la porta','Per chiedere aiuto indica lo scopo.']]],
['Temporali',[
['In «Quando suona la campana, esco», quando esco?','quando suona la campana','quando piove','La prima parte indica il momento dell’uscita.'],
['In «Dopo aver mangiato, gioco», che cosa faccio prima?','mangio','gioco','Dopo aver mangiato indica che prima si mangia.'],
['In «Quando è sera, leggo», quando leggo?','quando è sera','quando è mattina','Quando è sera indica il tempo.']]],
['Interrogative indirette',[
['In «Non so dove sia il libro», che cosa non so?','dove sia il libro','chi sia il docente','La frase riferisce una domanda sul luogo del libro.'],
['In «Chiedo se Luca arriva», che cosa chiedo?','se Luca arriva','dove sia Luca','Se Luca arriva è una domanda indiretta.'],
['In «Non so quando parte», che cosa non so?','quando parte','dove dorme','La domanda indiretta riguarda il momento della partenza.']]],
['Dichiarative',[
['In «Ho una speranza: che tu riesca», che cosa spero?','che tu riesca','che tu parta','Che tu riesca spiega la speranza.'],
['In «Ho un timore: che piova», quale timore ho?','che piova','che sia sereno','Che piova esprime il contenuto del timore.'],
['In «Ho una certezza: che Lea arrivi», quale certezza ho?','che Lea arrivi','che Lea parta','Che Lea arrivi precisa il contenuto della certezza.']]],
['Consecutive',[
['In «È così buio che non vedo», che cosa succede?','non vedo','vedo bene','Che non vedo è la conseguenza del buio.'],
['In «È così alto che tocca il soffitto», che cosa succede?','tocca il soffitto','cade subito','Che tocca il soffitto indica la conseguenza.'],
['In «Corre tanto che si stanca», quale effetto viene indicato?','si stanca','si riposa','Che si stanca è la conseguenza del molto correre.']]],
['Concessive',[
['In «Anche se piove, esco», che cosa faccio?','esco','resto a casa','Esco anche se c’è la pioggia.'],
['In «Sebbene sia tardi, continuo», che cosa faccio?','continuo','mi fermo','Continuo nonostante sia tardi.'],
['In «Anche se è stanca, Lia legge», che cosa fa Lia?','legge','dorme','Lia legge nonostante la stanchezza.']]],
['Condizionali e periodo ipotetico',[
['In «Se piove, resto», quando resto?','se piove','se c’è il sole','Se piove pone la condizione.'],
['In «Se finisco, esco», quale condizione devo rispettare?','finire','dormire','Se finisco è la condizione per uscire.'],
['In «Se hai fame, mangia», quale parola introduce la condizione?','se','mangia','Se introduce la condizione.']]],
['Comparative',[
['In «Il banco è più alto di quanto pensassi», il banco è…','più alto del previsto','più basso del previsto','La frase confronta l’altezza reale con quella prevista.'],
['In «Il pacco pesa più di quanto pensassi», che cosa confronto?','il peso e la mia previsione','il peso e il colore','Di quanto pensassi introduce il confronto con la previsione.'],
['In «Il filo costa meno di quanto credevo», che cosa confronto?','il prezzo e la mia previsione','il prezzo e la lunghezza','Il prezzo viene confrontato con quello previsto.']]],
['Modali',[
['In «Piega il foglio come ti mostro», che cosa indica «come ti mostro»?','il modo di piegare','il luogo del foglio','La parte con come indica la maniera.'],
['In «Disegna come ti spiego», che cosa indica «come ti spiego»?','il modo di disegnare','la causa della carta','La parte con come indica la maniera.'],
['In «Sistema i libri come faccio io», che cosa indica la seconda parte?','il modo di sistemare','il colore dei libri','Come faccio io precisa la maniera.']]],
['Strumentali',[
['In «Fisso il foglio usando una clip», che cosa uso?','una clip','una tazza','Usando una clip indica il mezzo.'],
['In «Apro la scatola usando una chiave», che cosa uso?','una chiave','una matita','Usando una chiave indica il mezzo.'],
['In «Disegno usando una matita», che cosa uso?','una matita','un cucchiaio','Usando una matita indica il mezzo.']]],
['Limitative',[
['In «Per quanto ne so, il corso inizia», chi sa questa informazione?','chi parla','un compagno','Per quanto ne so limita ciò che dice chi parla.'],
['In «Che io sappia, Lia arriva», la frase esprime…','ciò che sa chi parla','un ordine','Che io sappia limita l’affermazione alle conoscenze di chi parla.'],
['In «Per quanto ricordo, la sala è aperta», la frase esprime…','un ricordo di chi parla','una misura della sala','Per quanto ricordo limita l’affermazione ai ricordi di chi parla.']]],
['Eccettuative',[
['In «Esco, a meno che non piova», quale fatto può fermarmi?','la pioggia','il sole','A meno che non piova indica il caso che impedirebbe l’uscita.'],
['In «Parto, a meno che non nevichi», quale fatto può fermarmi?','la neve','il caldo','La neve è l’eccezione alla partenza.'],
['In «Giochiamo, salvo che piova», quale fatto può fermare il gioco?','la pioggia','il sole','Salvo che piova indica l’eccezione.']]],
['Esclusive',[
['In «Esco senza salutare», che cosa non faccio?','non saluto','non esco','Senza salutare esclude il saluto.'],
['In «Entra senza parlare», che cosa non fa?','non parla','non entra','Senza parlare esclude il parlare.'],
['In «Parto senza aspettare», che cosa non faccio?','non aspetto','non parto','Senza aspettare esclude l’attesa.']]],
['Discorso diretto e indiretto',[
['Quale frase usa le virgolette per riportare le parole di Lea?','Lea dice: «Sono pronta».','Lea dice che è pronta.','Le virgolette riportano le parole direttamente.'],
['Quale frase riferisce senza virgolette le parole di Ada?','Ada dice che è pronta.','Ada dice: «Sono pronta».','Che è pronta riferisce il contenuto indirettamente.'],
['In «Nora chiede dove sia il metro», che cosa chiede?','dove sia il metro','quando piove','La frase riferisce una domanda sul luogo del metro.']]],
['Altre subordinate',[
['In «Posa il filo dove trovi spazio», la seconda parte indica…','il luogo','una domanda','Dove trovi spazio dice il luogo della posa.'],
['In «Oltre a disegnare, Lia colora», quale altra azione fa Lia?','disegna','dorme','Oltre a disegnare aggiunge un’azione.'],
['In «Anziché uscire, leggo», quale azione scelgo?','leggo','esco','La frase contrappone uscire e leggere: scelgo di leggere.']]]
];
const bank=[];
for(const [group,rows] of data)for(const [prompt,correct,wrong,feedback] of rows){const options=[correct,wrong],answer=bank.length%2;if(answer)options.reverse();bank.push({id:`pei-periodo-esame-${String(bank.length+1).padStart(3,'0')}`,area:'periodo',topicGroup:group,topic:group,level:1,pei:true,assessmentOnly:true,kind:'choice',title:'Scegli una risposta',prompt,options,answer,solution:correct,feedback,minutes:1});}
window.ATELIER_PEI_PERIODO=bank;
})();
