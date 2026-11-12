(() => {
'use strict';
const rows = [
['Soggetto e predicato','In «Ieri il gatto dormiva sul divano», quale frase conserva soggetto e predicato?','Il gatto dormiva',['Ieri sul divano','Il gatto sul divano'],'Il gatto concorda con dormiva; ieri e sul divano aggiungono informazioni.'],
['Soggetto e predicato','In «Domani nevicherà sulle montagne», qual è il verbo impersonale?','nevicherà',['domani','sulle montagne'],'Nevicherà indica un evento atmosferico e qui non ha soggetto.'],
['Soggetto e predicato','In «Il gruppo misura la stoffa con attenzione», quale gruppo indica chi compie la misura?','il gruppo',['la stoffa','con attenzione'],'Il gruppo è il soggetto e concorda con misura.'],
['Soggetto e predicato','In «Nel cortile sorridono le bambine», quale gruppo è il soggetto?','le bambine',['nel cortile','sorridono'],'Le bambine concorda con sorridono anche se segue il verbo.'],
['Soggetto e predicato','In «Abbiamo portato i campioni», quale soggetto è sottinteso?','noi',['voi','loro'],'Abbiamo portato è alla prima persona plurale.'],
['Soggetto e predicato','In «Di sera Luca riposa», quale gruppo aggiunge un’informazione sul tempo?','di sera',['Luca','riposa'],'Di sera colloca nel tempo l’azione.'],
['Soggetto, predicato e oggetto','In «La docente consegna il modello a Sara», quale gruppo indica il destinatario?','a Sara',['il modello','la docente'],'A Sara indica la persona a cui è consegnato il modello.'],
['Soggetto, predicato e oggetto','In «Il modellista taglia la carta sul tavolo», quale gruppo indica ciò che viene tagliato?','la carta',['il modellista','sul tavolo'],'La carta completa direttamente il verbo taglia.'],
['Soggetto, predicato e oggetto','In «Lea ripara il violino nel laboratorio», quale gruppo aggiunge il luogo?','nel laboratorio',['il violino','Lea'],'Nel laboratorio indica dove si svolge l’azione.'],
['Soggetto, predicato e oggetto','In «Una tavola lunga cade», qual è il nome centrale del gruppo soggetto?','tavola',['lunga','cade'],'Tavola è il nome centrale; lunga è un attributo.'],
['Soggetto, predicato e oggetto','In «Con cura Ada controlla il disegno», quale gruppo indica il modo?','con cura',['Ada','il disegno'],'Con cura dice in quale modo Ada controlla.'],
['Soggetto, predicato e oggetto','In «Oggi la classe prepara un cartello per la mostra», quale gruppo indica il fine?','per la mostra',['oggi','un cartello'],'Per la mostra indica lo scopo della preparazione.'],
['Termine e specificazione','In «Conosco il progetto e ne parlo», ne indica…','argomento',['specificazione','luogo'],'Ne riprende del progetto come tema del parlare.'],
['Termine e specificazione','In «Conosco il progetto e ne apprezzo i dettagli», ne indica…','specificazione',['argomento','luogo'],'Ne precisa i dettagli: i dettagli del progetto.'],
['Complemento partitivo','In «Ho cinque fogli e ne scelgo due», ne indica…','partitivo',['mezzo','fine'],'Ne riprende l’insieme dei fogli da cui sono scelti due elementi.'],
['Luogo e tempo','In «Entro in aula e ne esco», ne indica…','moto da luogo',['stato in luogo','tempo determinato'],'Ne significa dall’aula e segnala la provenienza dello spostamento.'],
['Termine e specificazione','In «Mi ha scritto», mi ha funzione di…','complemento di termine',['soggetto','complemento oggetto'],'Mi significa a me: ha scritto a me.'],
['Oggetto','In «Mi ha salutato», mi ha funzione di…','complemento oggetto',['soggetto','complemento di termine'],'Mi significa me: ha salutato me.'],
['Termine e specificazione','In «Vi mostro il modello», vi significa…','a voi',['voi come oggetto diretto','da voi'],'Il modello è oggetto; vi indica a chi lo mostro.'],
['Oggetto','In «Vi incontro davanti alla scuola», vi significa…','voi come oggetto diretto',['a voi','da voi'],'Il verbo incontro si riferisce direttamente a voi.'],
['Soggetto e predicato','In «Ieri Nora ha mostrato il progetto a Sam», quale gruppo è il predicato?','ha mostrato',['il progetto','a Sam'],'Ha mostrato è il tempo composto che costituisce il predicato verbale.'],
['Oggetto','In «Ieri Nora ha mostrato il progetto a Sam», quale gruppo è l’oggetto?','il progetto',['a Sam','ieri'],'Il progetto completa direttamente ha mostrato.'],
['Termine e specificazione','In «Ieri Nora ha mostrato il progetto a Sam», quale gruppo è termine?','a Sam',['il progetto','ieri'],'A Sam indica il destinatario.'],
['Luogo e tempo','In «Ieri Nora ha mostrato il progetto in laboratorio», quale elemento indica il tempo?','ieri',['il progetto','in laboratorio'],'Ieri colloca l’azione nel tempo.'],
['Luogo e tempo','In «Ieri Nora ha mostrato il progetto in laboratorio», quale gruppo indica lo stato in luogo?','in laboratorio',['ieri','il progetto'],'In laboratorio indica il luogo in cui avviene la presentazione.'],
['Attributo e apposizione','In «Nora, giovane liutaia, presenta il progetto», liutaia è…','apposizione di Nora',['oggetto di presenta','predicato verbale'],'Liutaia è il nome che precisa Nora.'],
['Attributo e apposizione','In «Nora, giovane liutaia, presenta il progetto», giovane è…','attributo di liutaia',['soggetto','complemento di luogo'],'Giovane accompagna il nome liutaia.'],
['Attributo e apposizione','In «La docente osserva il disegno preciso», preciso è attributo di…','disegno',['docente','osserva'],'Preciso accompagna direttamente disegno, che è oggetto.'],
['Predicativi del soggetto e dell’oggetto','In «Nora sembra soddisfatta», soddisfatta è…','predicativo del soggetto',['attributo diretto di Nora','oggetto'],'Soddisfatta si riferisce al soggetto attraverso sembra.'],
['Causa, fine, mezzo e modo','In «Per la pioggia la classe resta in aula», quale gruppo esprime la causa?','per la pioggia',['in aula','la classe'],'Per la pioggia spiega il motivo per cui la classe resta in aula.']
];
window.ATELIER_NEW_LOGICA_APPROFONDITA=rows.map(([topicGroup,prompt,solution,wrong,feedback],i)=>{const options=[solution,...wrong],answer=i%options.length; options.splice(answer,0,options.shift());return {id:`log-approf-${String(i+1).padStart(3,'0')}`,area:'frase',topicGroup,topic:topicGroup,level:2,pei:false,kind:'choice',title:'Ragiona sulla frase',prompt,options,answer,solution,feedback,minutes:2};});
})();
