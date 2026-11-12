(() => {
'use strict';
const bank=[];
function choice(group,prompt,solution,wrong,feedback){const n=bank.length,options=[solution,...wrong],answer=n%options.length;options.splice(answer,0,options.shift());bank.push({id:`log-contesto-${String(n+1).padStart(3,'0')}`,area:'frase',topicGroup:group,topic:group,level:2,pei:false,kind:'choice',title:'Leggi e distingui',prompt,options,answer,solution,feedback,minutes:3});}
function exact(group,prompt,answer,feedback){const n=bank.length;bank.push({id:`log-contesto-${String(n+1).padStart(3,'0')}`,area:'frase',topicGroup:group,topic:group,level:2,pei:false,kind:'exact',title:'Individua nella frase',prompt,answers:[answer],solution:answer,feedback,minutes:2});}
function tokens(group,prompt,words,answer,feedback){const n=bank.length;bank.push({id:`log-contesto-${String(n+1).padStart(3,'0')}`,area:'frase',topicGroup:group,topic:group,level:2,pei:false,kind:'tokens',title:'Seleziona il gruppo',prompt,tokens:words,answer,solution:answer.map(i=>words[i]).join(' · '),feedback,minutes:3});}
const data=[
['Soggetto e predicato',[
['In «Sul banco della docente sono rimasti due pennelli», qual è il soggetto?','due pennelli',['sul banco','della docente'],'Due pennelli concorda con sono rimasti; il soggetto segue il verbo.'],
['In «Domani porteremo il progetto alla mostra», qual è il soggetto sottinteso?','noi',['voi','loro'],'Porteremo è prima persona plurale.'],
['In «Alla classe piacciono le nuove sedie», qual è il soggetto?','le nuove sedie',['alla classe','piacciono'],'Le nuove sedie concorda con piacciono; alla classe indica a chi piacciono.'],
['In «La parete del corridoio è molto chiara», qual è il predicato nominale?','è molto chiara',['del corridoio','la parete'],'La copula è e la parte nominale chiara con molto formano il predicato nominale.'],
['In «Dopo pranzo Nora ha verificato i disegni», quale gruppo costituisce il predicato verbale?','ha verificato',['dopo pranzo','i disegni'],'Ha verificato è un tempo composto formato da ausiliare e participio.']
],['Scrivi il soggetto completo in «In aula entrano tre docenti».','tre docenti','Tre docenti è soggetto posposto.'],['Scrivi il predicato verbale in «Lea ha aperto la cartella».','ha aperto','Ha aperto comprende ausiliare e participio.'],['Seleziona il soggetto completo.',['Nel','cassetto','restano','alcune','matite','colorate.'],[3,4,5],'Alcune matite colorate è il gruppo del soggetto.']],
['Attributo e apposizione',[
['In «La nuova mensola sostiene i libri pesanti», quale attributo si riferisce all’oggetto?','pesanti',['nuova','sostiene'],'Pesanti accompagna libri, oggetto di sostiene.'],
['In «Giada, giovane progettista, presenta il bozzetto», quale parola è il nucleo dell’apposizione?','progettista',['giovane','bozzetto'],'Progettista precisa Giada; giovane accompagna progettista.'],
['In «Il mobile è robusto e occupa la stanza», «robusto» è…','parte nominale del predicato',['attributo dell’oggetto','complemento di termine'],'Robusto con è forma il predicato nominale.'],
['In «La docente osserva il campione ruvido», «ruvido» è…','attributo del complemento oggetto',['predicativo del soggetto','apposizione'],'Ruvido accompagna campione, che è oggetto di osserva.'],
['In quale frase «esperta» accompagna direttamente un nome?','Conosco una liutaia esperta.',['La liutaia è esperta.','La liutaia lavora con cura.'],'In «Conosco una liutaia esperta», esperta qualifica direttamente liutaia.']
],['Scrivi l’attributo riferito a «stoffa» in «Una stoffa morbida copre il tavolo».','morbida','Morbida accompagna stoffa.'],['Scrivi il nome in apposizione in «Lia, la sarta, prepara il modello».','sarta','Sarta precisa Lia.'],['Seleziona l’attributo dell’oggetto.',['Marta','controlla','il','disegno','definitivo','con','cura.'],[4],'Definitivo accompagna disegno, complemento oggetto.']],
['Oggetto',[
['In «Alla fine della prova Ada consegna il progetto alla docente», qual è l’oggetto?','il progetto',['alla docente','della prova'],'Il progetto completa direttamente consegna.'],
['In «La restauratrice li pulisce con un panno», «li» può riprendere…','i pennelli',['alla restauratrice','con un panno'],'Li è pronome oggetto maschile plurale.'],
['Quale frase contiene un oggetto partitivo?','Abbiamo preparato delle etichette per la mostra.',['Abbiamo parlato delle etichette per la mostra.','Il colore delle etichette è chiaro.'],'Delle etichette è oggetto e indica alcune etichette.'],
['In «Il tecnico controlla la misura con cura», quale gruppo è oggetto?','la misura',['il tecnico','con cura'],'La misura riceve direttamente l’azione di controlla.'],
['In «Le foto le appendiamo domani in aula», «le» riprende…','le foto',['domani','in aula'],'Le riprende le foto come oggetto diretto.']
],['Scrivi l’oggetto in «Alla mostra Lea presenta il suo disegno».','il suo disegno','Il suo disegno è ciò che Lea presenta.'],['Scrivi l’oggetto in «Con attenzione Sara apre la finestra».','la finestra','La finestra è oggetto di apre.'],['Seleziona il complemento oggetto completo.',['Dopo','la','prova','Noor','ripone','i','pennelli','puliti.'],[5,6,7],'I pennelli puliti è il gruppo oggetto.']],
['Termine e specificazione',[
['In «Luca racconta alla classe la storia del progetto», quale gruppo indica il destinatario?','alla classe',['del progetto','la storia'],'Alla classe è complemento di termine.'],
['Nella stessa frase «Luca racconta alla classe la storia del progetto», quale gruppo precisa il nome storia?','del progetto',['alla classe','Luca'],'Del progetto è complemento di specificazione.'],
['In «Ada le ha mostrato il modello», «le» significa…','a lei',['lei come oggetto diretto','in quel luogo'],'Le ha valore di termine: a lei.'],
['In «Il colore della fodera piace a Nora», «della fodera» è…','specificazione',['termine','oggetto'],'Della fodera precisa il nome colore.'],
['In «Il colore della fodera piace a Nora», «a Nora» è…','termine',['specificazione','soggetto'],'A Nora indica la persona a cui piace il colore.']
],['Scrivi il complemento di termine in «La docente spiega il procedimento a Lia».','a Lia','A Lia è la destinataria della spiegazione.'],['Scrivi il complemento di specificazione in «La copertina del quaderno è blu».','del quaderno','Del quaderno precisa copertina.'],['Seleziona il complemento di termine.',['Abbiamo','mostrato','il','modello','alla','docente','ieri.'],[4,5],'Alla docente indica la destinataria.']],
['Luogo e tempo',[
['In «Ieri Lia ha portato la cornice in laboratorio», «in laboratorio» indica…','destinazione',['luogo di partenza','tempo'],'Il gruppo indica dove viene portata la cornice.'],
['In «Ieri la cornice era in laboratorio», «in laboratorio» indica…','stato in luogo',['moto a luogo','durata'],'Il verbo era colloca la cornice nel luogo.'],
['In «Dalla bottega Amir passa per il cortile», quale gruppo indica il luogo attraversato?','per il cortile',['dalla bottega','Amir'],'Per il cortile indica il percorso; dalla bottega la partenza.'],
['In «La mostra è aperta dal lunedì al venerdì», i due gruppi indicano…','inizio e termine di un intervallo temporale',['due luoghi','causa e scopo'],'I giorni delimitano l’intervallo di apertura.'],
['In «La classe ha lavorato in aula per due ore», quale gruppo indica durata?','per due ore',['in aula','la classe'],'Per due ore indica quanto è durato il lavoro.']
],['Scrivi il gruppo che indica il momento in «Sabato apriremo la mostra».','Sabato','Sabato colloca l’apertura nel tempo.'],['Scrivi il gruppo che indica la partenza in «Lea esce dal laboratorio con Sara».','dal laboratorio','Dal laboratorio indica il luogo da cui esce.'],['Seleziona il gruppo che indica la durata.',['In','aula','abbiamo','atteso','per','venti','minuti.'],[4,5,6],'Per venti minuti indica quanto è durata l’attesa.']],
['Causa, fine, mezzo e modo',[
['In «Per la pioggia la classe visita il museo con calma», quale gruppo indica la causa?','per la pioggia',['con calma','il museo'],'La pioggia è la ragione indicata; con calma indica il modo.'],
['In «Per la pioggia la classe visita il museo con calma», quale gruppo indica il modo?','con calma',['per la pioggia','il museo'],'Con calma descrive come si svolge la visita.'],
['In «Con un righello Ada misura il cartone per la mostra», quale gruppo indica il mezzo?','con un righello',['per la mostra','il cartone'],'Il righello è lo strumento usato per misurare.'],
['In «Con un righello Ada misura il cartone per la mostra», quale gruppo indica il fine?','per la mostra',['con un righello','il cartone'],'Per la mostra indica lo scopo della misurazione.'],
['Quale frase usa «per» per indicare una causa?','Il treno è fermo per un guasto.',['Il treno parte per Milano.','Il treno è pronto per il viaggio.'],'Il guasto è la causa della fermata.']
],['Scrivi il mezzo in «Con una pinza Luca piega il filo».','Con una pinza','La pinza è lo strumento usato.'],['Scrivi il modo in «Lia controlla il tessuto con pazienza».','con pazienza','Con pazienza descrive come controlla.'],['Seleziona il complemento di fine.',['Prepariamo','gli','appunti','per','il','ripasso.'],[3,4,5],'Per il ripasso esprime lo scopo.']],
['Compagnia e unione',[
['In «Lina arriva con il fratello e una valigia», «con il fratello» indica…','compagnia',['unione','mezzo'],'Il fratello è la persona che accompagna Lina.'],
['In «Lina arriva con il fratello e con una valigia», «con una valigia» indica…','unione',['compagnia','causa'],'La valigia è la cosa portata insieme.'],
['Quale frase usa «con» per introdurre compagnia?','Noor passeggia con la sorella nel parco.',['Noor taglia con le forbici.','Noor esce con lo zaino.'],'La sorella è la persona che accompagna Noor.'],
['Quale frase usa «con» per introdurre unione?','Ada parte con il violino nella custodia.',['Ada parte con Luca.','Ada misura con un metro.'],'Il violino è la cosa che Ada porta con sé.'],
['In «Il gruppo lavora insieme alla docente in aula», quale gruppo indica compagnia?','insieme alla docente',['in aula','il gruppo'],'Insieme alla docente indica la persona con cui il gruppo lavora.']
],['Scrivi il gruppo di compagnia in «Sara esce con Nora dal museo».','con Nora','Con Nora indica la persona che accompagna Sara.'],['Scrivi il gruppo di unione in «Luca viaggia con uno zaino verso il mare».','con uno zaino','Lo zaino è la cosa portata con sé.'],['Seleziona il complemento di compagnia.',['Lia','torna','dal','corso','insieme','a','Marta.'],[4,5,6],'Insieme a Marta indica la persona che accompagna Lia.']],
['Materia e qualità',[
['In «La cornice di noce protegge un disegno antico», «di noce» indica…','materia',['qualità della persona','destinatario'],'Di noce indica il legno della cornice.'],
['In «Una docente di grande esperienza guida il gruppo», «di grande esperienza» indica…','qualità',['materia','termine'],'Il gruppo descrive una caratteristica della docente.'],
['Quale gruppo indica il materiale in «Ho scelto una scatola di cartone resistente»?','di cartone',['resistente','ho scelto'],'Di cartone indica la materia della scatola.'],
['In «Una ragazza dagli occhi scuri osserva la mostra», il gruppo «dagli occhi scuri» indica…','qualità',['moto da luogo','agente'],'Il gruppo descrive una caratteristica della ragazza.'],
['Quale frase contiene un complemento di materia?','Il vaso di vetro è sul ripiano.',['Il vaso di Marta è sul ripiano.','Il vaso è accanto al ripiano.'],'Di vetro indica la sostanza del vaso.']
],['Scrivi il complemento di materia in «La scatola di latta è sul tavolo».','di latta','Di latta indica il materiale.'],['Scrivi il complemento di qualità in «Una persona di talento dirige la classe».','di talento','Di talento descrive una qualità.'],['Seleziona il complemento di materia.',['Il','contenitore','di','vetro','è','vicino','al','banco.'],[2,3],'Di vetro indica la materia del contenitore.']],
['Denominazione e argomento',[
['In «La città di Mantova ospita una mostra», «di Mantova» indica…','denominazione',['specificazione di possesso','termine'],'Mantova è il nome proprio della città.'],
['In «Durante la lezione discutiamo di restauro», «di restauro» indica…','argomento',['tempo','materia'],'Di restauro indica il tema della discussione.'],
['Quale frase contiene denominazione?','Il mese di aprile porta la primavera.',['Le piogge di aprile sono frequenti.','Parliamo di aprile.'],'Aprile è il nome del mese.'],
['In «Il saggio sulla musica è nella cartella», quale gruppo indica l’argomento?','sulla musica',['nella cartella','il saggio'],'Sulla musica precisa il tema del saggio.'],
['Quale frase contiene un complemento di argomento?','Leggiamo un libro sulla liuteria.',['Appoggiamo un libro sulla mensola.','Spostiamo un libro dalla mensola.'],'Sulla liuteria indica il tema del libro.']
],['Scrivi il complemento di denominazione in «La città di Genova è vicina».','di Genova','Genova è il nome della città.'],['Scrivi il complemento di argomento in «Oggi parliamo di disegno».','di disegno','Di disegno indica il tema della conversazione.'],['Seleziona il complemento di argomento.',['In','aula','discutiamo','della','mostra.'],[3,4],'Della mostra indica il tema discusso.']],
['Limitazione e paragone',[
['In «La mensola è più lunga del banco ma meno larga della porta», «del banco» è…','secondo termine di paragone',['termine','materia'],'Del banco introduce il termine con cui si confronta la lunghezza.'],
['Nella frase «La mensola è più lunga del banco ma meno larga della porta», «della porta» indica…','secondo termine di paragone',['causa','tempo'],'Della porta introduce il confronto relativo alla larghezza.'],
['In «Quanto a precisione, il disegno di Ada è notevole», quale gruppo delimita il giudizio?','quanto a precisione',['di Ada','il disegno'],'Quanto a precisione limita l’aspetto considerato.'],
['In «Lea è abile nel ricamo e paziente con gli allievi», «nel ricamo» esprime…','limitazione',['stato in luogo','pena'],'Nel ricamo delimita l’ambito dell’abilità.'],
['Quale frase contiene un secondo termine di paragone?','Il tessuto è più leggero della tela.',['Il tessuto è fatto di lino.','Il tessuto è vicino alla tela.'],'Della tela introduce il confronto di peso.']
],['Scrivi il secondo termine di paragone in «Il mobile è più alto della sedia».','della sedia','Della sedia introduce l’elemento confrontato.'],['Scrivi il complemento di limitazione in «Nora è esperta in ceramica».','in ceramica','In ceramica delimita il campo di esperienza.'],['Seleziona il secondo termine di paragone.',['Questa','tavola','è','meno','larga','del','banco.'],[5,6],'Del banco introduce il termine del confronto.']]
];
for(const [group,choices,e1,e2,t] of data){for(const [q,a,w,f] of choices)choice(group,q,a,w,f);exact(group,...e1);exact(group,...e2);tokens(group,...t)}
window.ATELIER_NEW_LOGICA_CONTESTO=bank;
})();
