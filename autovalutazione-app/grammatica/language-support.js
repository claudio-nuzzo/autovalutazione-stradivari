/* A small bilingual aid. Lessons and exercises remain in Italian. */
(() => {
  'use strict';
  const root = document.querySelector('#main');
  if (!root) return;
  const dictionaries = {
    en: {name:'English', direction:'ltr', title:'Study guide', intro:'This guide translates the steps and some grammar words. Lessons and exercises are in Italian.', steps:['Choose a level.','Choose a topic.','Read the explanation.','Review the rules.','Practise with exercises.','Take the final test.'], glossary:'Useful words', terms:['spelling','article','noun','adjective','pronoun','verb','adverb','preposition','conjunction','sentence','subject','predicate','direct object','complement','attribute','apposition','main clause','coordinate clause','subordinate clause','cause','purpose','time','place','reason','example','answer','correct','mistake','check','review']},
    ar: {name:'العربية', direction:'rtl', title:'دليل الدراسة', intro:'يترجم هذا الدليل خطوات الدراسة وبعض مصطلحات النحو. الدروس والتمارين باللغة الإيطالية.', steps:['اختر المستوى.','اختر الموضوع.','اقرأ الشرح.','راجع القواعد.','تدرّب على التمارين.','أجرِ الاختبار النهائي.'], glossary:'كلمات مفيدة', terms:['الإملاء','أداة التعريف أو التنكير','الاسم','الصفة','الضمير','الفعل','الظرف','حرف الجر','أداة ربط','الجملة','فاعل أو مبتدأ (بحسب السياق)','المسند','المفعول به','متمّم','نعت','اسم يوضّح اسماً آخر','جملة رئيسية','جملة معطوفة','جملة تابعة','سبب','غاية','زمان','مكان','سبب','مثال','إجابة','صحيح','خطأ','تحقّق','مراجعة']},
    ko: {name:'한국어', direction:'ltr', title:'학습 안내', intro:'이 안내는 학습 단계와 문법 용어 일부를 번역합니다. 수업과 문제는 이탈리아어로 되어 있습니다.', steps:['수준을 선택하세요.','주제를 선택하세요.','설명을 읽으세요.','규칙을 복습하세요.','문제를 풀어 연습하세요.','마지막 평가를 보세요.'], glossary:'유용한 단어', terms:['철자법','관사','명사','형용사','대명사','동사','부사','전치사','접속사','문장','주어','서술어','직접목적어','문장의 보충 성분 (목적어·부사어 등)','명사를 꾸미는 형용사 (관형어)','동격어','주절','등위절','종속절','원인','목적','시간','장소','이유','예문','답','정답','오류','확인','복습']}
  };
  const italian = ['Ortografia','Articolo','Nome','Aggettivo','Pronome','Verbo','Avverbio','Preposizione','Congiunzione','Frase','Soggetto','Predicato','Complemento oggetto','Complemento','Attributo','Apposizione','Proposizione principale','Proposizione coordinata','Proposizione subordinata','Causa','Fine','Tempo','Luogo','Motivo','Esempio','Risposta','Corretto','Errore','Controlla','Ripasso'];
  const box = document.createElement('details');
  box.className = 'language-help';
  const summary = document.createElement('summary');
  summary.textContent = 'Aiuto linguistico · English · العربية · 한국어';
  box.append(summary);
  const body = document.createElement('div'); body.className='language-help-body'; box.append(body);
  const label=document.createElement('label'); label.htmlFor='language-help-choice'; label.textContent='Lingua / Language / اللغة / 언어'; body.append(label);
  const select=document.createElement('select'); select.id='language-help-choice';
  for (const [code,data] of Object.entries(dictionaries)) { const option=document.createElement('option'); option.value=code; option.textContent=data.name; option.lang=code; select.append(option); }
  body.append(select);
  const content=document.createElement('div'); content.className='language-help-content'; body.append(content);
  const text=(tag,value,parent,lang,dir)=>{const e=document.createElement(tag);e.textContent=value;if(lang)e.lang=lang;if(dir)e.dir=dir;parent.append(e);return e};
  function render() {
    const code=select.value, data=dictionaries[code]; content.replaceChildren();
    text('h2',data.title,content,code,data.direction); text('p',data.intro,content,code,data.direction);
    const ol=document.createElement('ol'); ol.lang=code; ol.dir=data.direction; data.steps.forEach(step=>text('li',step,ol));content.append(ol);
    text('h3',data.glossary,content,code,data.direction);
    const dl=document.createElement('dl');dl.className='language-help-terms';
    italian.forEach((word,i)=>{text('dt',word,dl,'it','ltr');text('dd',data.terms[i],dl,code,data.direction)});content.append(dl);
    try { localStorage.setItem('atelier-language-help-v1',code); } catch (_) {}
  }
  try { const saved=localStorage.getItem('atelier-language-help-v1'); if(dictionaries[saved]) select.value=saved; } catch (_) {}
  select.addEventListener('change',render); render();
  root.insertBefore(box,root.firstChild);
})();
