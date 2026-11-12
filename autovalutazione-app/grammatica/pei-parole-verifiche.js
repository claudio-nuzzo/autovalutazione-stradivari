(() => {
'use strict';
const entries={
'Articolo':[
['Scegli l’articolo: ___ libro.','il',['la'],'Libro è maschile singolare: il libro.'],
['Scegli l’articolo: ___ borse.','le',['lo'],'Borse è femminile plurale: le borse.'],
['Scegli l’articolo: ___ zaino.','lo',['la'],'Davanti a z si usa lo.']],
'Nome':[
['Quale parola indica una persona?','cuoca',['libro'],'Cuoca indica una persona.'],
['Quale parola indica un oggetto?','matita',['gatto'],'Matita indica un oggetto.'],
['Quale parola è un nome proprio?','Marta',['ragazza'],'Marta è il nome proprio di una persona.']],
'Aggettivo':[
['Quale parola descrive il libro: «Il libro è grande»?','grande',['libro'],'Grande indica una qualità del libro.'],
['Completa: le mele sono ___.','morbide',['morbido'],'Morbide concorda con mele, femminile plurale.'],
['Completa: il banco è ___.','pulito',['pulita'],'Pulito concorda con banco, maschile singolare.']],
'Pronomi':[
['Completa: Marta arriva. ___ saluta.','Lei',['Noi'],'Lei può riferirsi a Marta.'],
['Il foglio è pronto. Io ___ firmo.','lo',['la'],'Lo riprende il foglio.'],
['Le borse sono pronte. Io ___ sposto.','le',['lo'],'Le riprende il nome femminile plurale borse.']],
'Avverbi':[
['In «Lina lavora lentamente», quale parola dice come lavora?','lentamente',['Lina'],'Lentamente indica il modo di lavorare.'],
['Quale parola indica un luogo?','qui',['ieri'],'Qui indica un luogo.'],
['Quale parola indica un tempo?','domani',['lontano'],'Domani indica un tempo futuro.']],
'Preposizioni':[
['Completa: il quaderno ___ Sara.','di',['e'],'Di collega quaderno e Sara.'],
['Completa: vado ___ scuola.','a',['ma'],'A introduce la destinazione.'],
['Completa: studio ___ Luca.','con',['oppure'],'Con collega l’azione a Luca.']],
'Congiunzioni':[
['Completa: pane ___ latte.','e',['di'],'E collega due nomi.'],
['Completa: è piccolo ___ resistente.','ma',['nel'],'Ma collega le due qualità con contrasto.'],
['Completa: vuoi tè ___ acqua?','oppure',['sotto'],'Oppure presenta due alternative.']],
'Ortografia':[
['Quale forma del verbo avere è corretta?','ho',['o'],'Ho è una forma di avere.'],
['Quale gruppo è corretto?','un albero',['un’albero'],'Albero è maschile e un non richiede apostrofo.'],
['Completa: il banco ___ pronto.','è',['e'],'È è una forma del verbo essere.']],
'Modi verbali':[
['Quale parola è un verbo all’infinito?','leggere',['libro'],'Leggere è un verbo all’infinito.'],
['Quale forma è un gerundio?','leggendo',['libro'],'Leggendo è il gerundio di leggere.'],
['Quale forma è un infinito?','dormire',['letto'],'Dormire è all’infinito.']],
'Tempi verbali':[
['Completa: ieri io ___.','ho letto',['leggerò'],'Ho letto indica un fatto già avvenuto.'],
['Completa: domani io ___.','partirò',['sono partito'],'Partirò colloca l’azione nel futuro.'],
['Completa: ora io ___.','leggo',['leggevo ieri'],'Leggo può indicare un’azione presente.']],
'Ausiliari':[
['Completa: io ___ letto.','ho',['sono'],'Il passato prossimo di leggere usa avere.'],
['Completa: lei ___ arrivata.','è',['ha'],'Il passato prossimo di arrivare usa essere.'],
['Completa: noi ___ scritto.','abbiamo',['siamo'],'Il passato prossimo di scrivere usa avere.']],
'Transitività':[
['In «Lia taglia la carta», che cosa taglia?','la carta',['Lia'],'La carta è l’oggetto dell’azione.'],
['In «Marta legge il libro», che cosa legge?','il libro',['Marta'],'Il libro è l’oggetto dell’azione.'],
['In «Sara disegna una casa», che cosa disegna?','una casa',['Sara'],'Una casa è l’oggetto dell’azione.']],
'Passivo':[
['In «Il pacco è aperto da Luca», chi apre?','Luca',['il pacco'],'Da Luca indica chi compie l’azione.'],
['In «Il foglio è firmato da Lea», che cosa è firmato?','il foglio',['Lea'],'Il foglio riceve l’azione.'],
['In quale frase il banco è il soggetto?','Il banco è pulito da Nora.',['Nora pulisce il banco.'],'Il banco è soggetto nella frase passiva.']],
'Riflessivo':[
['In «Lia si lava», chi lava Lia?','sé stessa',['il banco'],'Si riprende il soggetto Lia.'],
['Completa: io ___ preparo.','mi',['ti'],'Mi riprende il soggetto io.'],
['Completa: noi ___ prepariamo.','ci',['vi'],'Ci riprende il soggetto noi.']],
'Suoni e sillabe':[
['Quante sillabe ha «casa»?','due',['una'],'Casa si divide ca-sa.'],
['Quale divisione di «palla» è corretta?','pal-la',['pa-lla'],'Le consonanti doppie si separano.'],
['Quante sillabe ha «mare»?','due',['una'],'Mare si divide ma-re.']],
'Punteggiatura':[
['Quale segno chiude una domanda diretta?','?',['.'],'Il punto interrogativo chiude una domanda diretta.'],
['Quale segno chiude una frase dichiarativa?','.',['?'],'Il punto può chiudere una frase dichiarativa.'],
['Quale segno chiude un’esclamazione?','!',[':'],'Il punto esclamativo chiude un’esclamazione.']],
'Formazione delle parole':[
['Quale parola indica una casa piccola?','casetta',['casone'],'Casetta è un diminutivo.'],
['Quale parola contiene il prefisso che indica ripetizione?','rileggere',['leggere'],'Ri- indica leggere di nuovo.'],
['Quale parola indica un contenitore per penne?','portapenne',['penne'],'Portapenne unisce porta e penne.']],
'Significato e registro':[
['Qual è il contrario di «grande»?','piccolo',['grande'],'Piccolo è il contrario di grande.'],
['Quale parola significa «veloce»?','rapido',['lento'],'Rapido può significare veloce.'],
['Quale richiesta è cortese?','Per favore, mi aiuti?',['Dammi tutto subito!'],'Per favore rende la richiesta cortese.']],
'Interiezioni':[
['Quale parola richiama una persona?','Ehi!',['Ieri'],'Ehi! richiama l’attenzione.'],
['Quale parola esprime gioia?','Evviva!',['Mai'],'Evviva! esprime gioia.'],
['Quale parola esprime dolore?','Ahi!',['Domani'],'Ahi! esprime dolore.']],
'Verbi · Uso dei tempi':[
['Completa: ora io ___.','studio',['studierò domani'],'Studio può indicare il presente.'],
['Completa: ieri io ___.','ho studiato',['studierò'],'Ho studiato indica un fatto passato.'],
['Completa: domani io ___.','studierò',['ho studiato'],'Studierò indica un fatto futuro.']],
'Verbi · Passivo':[
['In «La porta è dipinta da Ada», chi dipinge?','Ada',['la porta'],'Da Ada indica chi dipinge.'],
['In «Il pacco è aperto da Luca», che cosa è aperto?','il pacco',['Luca'],'Il pacco riceve l’azione.'],
['Completa: la tavola è ___ da Lea.','tagliata',['tagliato'],'Tagliata concorda con tavola.']],
'Verbi · Riflessivo':[
['Completa: io ___ lavo.','mi',['ti'],'Mi si riferisce al soggetto io.'],
['Completa: tu ___ prepari.','ti',['mi'],'Ti si riferisce al soggetto tu.'],
['Completa: noi ___ vestiamo.','ci',['vi'],'Ci si riferisce al soggetto noi.']],
'Verbi · Verbi servili':[
['Completa: io ___ studiare.','posso',['banco'],'Posso accompagna l’infinito studiare.'],
['Completa: tu ___ entrare.','puoi',['quaderno'],'Puoi accompagna l’infinito entrare.'],
['Completa: noi ___ lavorare.','dobbiamo',['matita'],'Dobbiamo accompagna l’infinito lavorare.']],
'Verbi · Verbi impersonali':[
['Quale frase parla del tempo atmosferico senza indicare una persona?','Piove.',['Marta legge.'],'Piove indica un fenomeno atmosferico senza soggetto personale.'],
['Quale frase indica un fenomeno atmosferico?','Nevica.',['Lia disegna.'],'Nevica indica una condizione atmosferica.'],
['Completa: oggi ___.','piove',['libro'],'Piove è una forma verbale impersonale.']],
'Verbi · infinito presente':[
['Quale forma è all’infinito?','cantare',['canto'],'Cantare è infinito presente.'],
['Quale forma è all’infinito?','leggere',['leggo'],'Leggere è infinito presente.'],
['Quale forma è all’infinito?','dormire',['dormo'],'Dormire è infinito presente.']],
'Verbi · infinito passato':[
['Quale forma è all’infinito passato?','avere cantato',['cantare'],'Avere cantato contiene infinito dell’ausiliare e participio.'],
['Quale forma è all’infinito passato?','avere letto',['leggere'],'Avere letto è infinito passato.'],
['Quale forma è all’infinito passato?','essere partito',['partire'],'Essere partito è infinito passato.']],
'Verbi · gerundio presente':[
['Quale forma è un gerundio presente?','cantando',['cantare'],'Cantando è il gerundio presente.'],
['Quale forma è un gerundio presente?','leggendo',['leggere'],'Leggendo è il gerundio presente.'],
['Quale forma è un gerundio presente?','dormendo',['dormire'],'Dormendo è il gerundio presente.']],
'Verbi · gerundio passato':[
['Quale forma è un gerundio passato?','avendo cantato',['cantando'],'Avendo cantato è gerundio passato.'],
['Quale forma è un gerundio passato?','avendo letto',['leggendo'],'Avendo letto è gerundio passato.'],
['Quale forma è un gerundio passato?','essendo partito',['partendo'],'Essendo partito è gerundio passato.']]
};
const paradigms=[
['indicativo presente',[['io','canto',['cantavo','canterò']],['tu','canti',['cantavi','canterai']],['noi','cantiamo',['cantavamo','canteremo']]]],
['indicativo imperfetto',[['io','cantavo',['canto','canterò']],['tu','cantavi',['canti','canterai']],['noi','cantavamo',['cantiamo','canteremo']]]],
['indicativo futuro semplice',[['io','canterò',['canto','cantavo']],['tu','canterai',['canti','cantavi']],['noi','canteremo',['cantiamo','cantavamo']]]],
['indicativo passato remoto',[['io','cantai',['canto','canterò']],['tu','cantasti',['canti','canterai']],['noi','cantammo',['cantiamo','canteremo']]]],
['congiuntivo presente',[['io','canti',['cantavo','canterò']],['noi','cantiamo',['cantavamo','canteremo']],['loro','cantino',['cantavano','canteranno']]]],
['congiuntivo imperfetto',[['io','cantassi',['canto','canterò']],['noi','cantassimo',['cantiamo','canteremo']],['loro','cantassero',['cantano','canteranno']]]],
['condizionale presente',[['io','canterei',['canto','cantavo']],['tu','canteresti',['canti','cantavi']],['noi','canteremmo',['cantiamo','cantavamo']]]],
['indicativo passato prossimo',[['io','ho cantato',['canto','avevo cantato']],['tu','hai cantato',['canti','avevi cantato']],['noi','abbiamo cantato',['cantiamo','avevamo cantato']]]],
['indicativo trapassato prossimo',[['io','avevo cantato',['ho cantato','avrò cantato']],['tu','avevi cantato',['hai cantato','avrai cantato']],['noi','avevamo cantato',['abbiamo cantato','avremo cantato']]]],
['indicativo trapassato remoto',[['io','ebbi cantato',['ho cantato','avrò cantato']],['tu','avesti cantato',['hai cantato','avrai cantato']],['noi','avemmo cantato',['abbiamo cantato','avremo cantato']]]],
['indicativo futuro anteriore',[['io','avrò cantato',['ho cantato','avevo cantato']],['tu','avrai cantato',['hai cantato','avevi cantato']],['noi','avremo cantato',['abbiamo cantato','avevamo cantato']]]],
['congiuntivo passato',[['io','abbia cantato',['ho cantato','avrò cantato']],['noi','abbiamo cantato',['avevamo cantato','avremo cantato']],['loro','abbiano cantato',['hanno cantato','avranno cantato']]]],
['congiuntivo trapassato',[['io','avessi cantato',['ho cantato','avrò cantato']],['noi','avessimo cantato',['avevamo cantato','avremo cantato']],['loro','avessero cantato',['hanno cantato','avranno cantato']]]],
['condizionale passato',[['io','avrei cantato',['ho cantato','avrò cantato']],['tu','avresti cantato',['hai cantato','avrai cantato']],['noi','avremmo cantato',['abbiamo cantato','avremo cantato']]]]
];
for(const [name,forms] of paradigms)entries['Verbi · '+name]=forms.map(([person,answer,wrong])=>[`Scegli il ${name} di «cantare» per «${person}».`,answer,wrong,`${answer} è la forma richiesta di cantare.`]);
entries['Verbi · imperativo presente']=[['Dai un invito a una persona: ___.','canta',['cantano'],'Canta è l’imperativo rivolto a tu.'],['Dai un invito a più persone: ___.','cantate',['cantano'],'Cantate è l’imperativo rivolto a voi.'],['Dai un invito a una persona: ___.','ascolta',['ascoltano'],'Ascolta è l’imperativo rivolto a tu.']];
const bank=[];
for(const [topicGroup,rows] of Object.entries(entries)) for(const [prompt,solution,wrong,feedback] of rows){const options=[solution,...wrong],answer=bank.length%options.length;options.splice(answer,0,options.shift());bank.push({id:`pei-par-ver-${String(bank.length+1).padStart(3,'0')}`,area:'parole',topicGroup,topic:topicGroup,level:1,pei:true,assessmentOnly:true,kind:'choice',title:'Una domanda alla volta',prompt,options,answer,solution,feedback,minutes:1})}
window.ATELIER_PEI_PAROLE=bank;
})();
