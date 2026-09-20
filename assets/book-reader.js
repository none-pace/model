/* 同一教材的连续正文：图解位于推理所需之处，每幅图保存独立参数。 */
(() => {
  const {labs,fmt,esc}=window.CALCULUS_LABS;
  window.renderTextbookChapter=(lesson,anchor,api)=>{
    const {root,header,footer,math,wireProgress,session}=api,book=lesson.book,figures=[];
    const para=t=>`<p>${esc(t)}</p>`,ordered=items=>`<ol class="steps">${items.map(t=>`<li>${esc(t)}</li>`).join('')}</ol>`;
    const sectionTitle=s=>{const match=s.title.match(/^(\d+)\.\s*(.*)$/);return match?`<span>${esc(match[1])}.</span> ${esc(match[2])}`:esc(s.title);};
    const lessonLink=id=>{const target=window.CALCULUS.lessons.find(l=>l.id===id.split('/')[0]);return target?`<a href="#${esc(id)}">${esc(target.title)}</a>`:'';};
    const state=session.get(lesson.id)||{},figureStates=state.bookLabs||{};
    function controlMarkup(lab,values,index){return lab.controls.map(c=>{const id=index===0?`param-${c.key}`:`book-${index}-param-${c.key}`;return c.options?`<div class="choice-row"><label for="${id}">${esc(c.label)}</label><select id="${id}" data-book-param="${c.key}">${c.options.map((label,i)=>`<option value="${i}" ${values[c.key]===i?'selected':''}>${esc(label)}</option>`).join('')}</select></div>`:`<div class="slider-row"><label for="${id}">${esc(c.label)}</label><output for="${id}" data-book-output="${c.key}">${fmt(values[c.key])}</output><input id="${id}" data-book-param="${c.key}" type="range" min="${c.min}" max="${c.max}" step="${c.step}" value="${values[c.key]}"></div>`;}).join('');}
    function block(b){
      if(b.type==='p')return para(b.text);
      if(b.type==='reference'){
        if(!/^[a-z0-9-]+(?:\/[a-z0-9-]+)?$/.test(b.id)||!window.CALCULUS.lessons.some(l=>l.id===b.id.split('/')[0]))throw Error('Invalid textbook reference: '+b.id);
        return `<p class="book-reference"><a href="#${esc(b.id)}">${esc(b.text)}</a></p>`;
      }
      if(b.type==='formula')return `<div class="formula-box">$$${esc(b.tex)}$$${b.explain?`<p class="formula-meaning">${esc(b.explain)}</p>`:''}</div>`;
      if(b.type==='definition'||b.type==='theorem')return `<div class="book-statement ${b.type}"><h3>${esc(b.title)}</h3>${para(b.text)}${b.proof?.length?`<h4>证明</h4>${ordered(b.proof)}`:''}${b.note?`<p class="book-condition">${esc(b.note)}</p>`:''}</div>`;
      if(['example','exercise','activity'].includes(b.type))return `<div class="book-problem ${b.type}"><h3>${esc(b.title)}${b.level?`<small>${esc(b.level)}</small>`:''}</h3>${para(b.q)}${b.hint?`<details><summary>思路提示</summary>${para(b.hint)}</details>`:''}${b.steps?.length?(b.type==='example'?ordered(b.steps):`<details><summary>${b.type==='activity'?'完成后对照讨论':'核对解答与推理'}</summary>${ordered(b.steps)}</details>`):''}</div>`;
      if(b.type==='table')return `<div class="formula-table" tabindex="0" role="region" aria-label="${esc(b.title||'本节对照表')}"><table><thead><tr>${b.headers.map(h=>`<th scope="col">${esc(h)}</th>`).join('')}</tr></thead><tbody>${b.rows.map(row=>`<tr>${row.map(cell=>`<td>${esc(cell)}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;
      if(b.type==='list')return `<ul>${b.items.map(t=>`<li>${esc(t)}</li>`).join('')}</ul>`;
      if(b.type==='summary')return `<div class="book-summary"><h3>${esc(b.title||'这一节的联系')}</h3>${ordered(b.items)}</div>`;
      if(b.type==='figure'){
        const index=figures.length,lab=labs[b.lab];if(!lab)throw Error('Missing textbook figure: '+b.lab);
        const values={...Object.fromEntries(lab.controls.map(c=>[c.key,c.value])),...(index===0?state.params:{}),...figureStates[index]};figures.push({lab,values,index});
        return `<figure class="book-figure" data-book-figure="${index}" ${index===0?'id="experiment"':''} tabindex="-1"><figcaption><span>图 ${index+1}</span><h3>${esc(lab.title)}</h3>${para(b.caption||lab.hint)}</figcaption>${b.tasks?.length?`<div class="figure-tasks"><h4>先想一想，再操作</h4>${ordered(b.tasks)}</div>`:''}<div class="book-figure-content"><div class="book-figure-visual"><div data-book-formula ${index===0?'id="lab-formula"':''}></div><div data-book-graph ${index===0?'id="lab-graph"':''}></div><div class="legend">${(lab.legend||['蓝：原对象','橙：比较对象','绿：目标或参考']).map((label,i)=>`<span><i class="${['','orange','green'][i]}"></i>${esc(label)}</span>`).join('')}</div></div><div class="book-figure-tools"><div class="lab-controls">${controlMarkup(lab,values,index)}</div><div class="lab-readout" data-book-readout ${index===0?'id="lab-readout"':''}></div><button class="book-reset" ${index===0?'id="reset-lab"':''}>恢复这幅图的初始参数</button></div></div><p class="book-figure-note" data-book-note ${index===0?'id="lab-note"':''}></p><p class="lab-caption">图形帮助提出和检查猜想；定理的理由在正文证明中。</p></figure>`;
      }
      throw Error('Unknown textbook block: '+b.type);
    }
    const content=book.sections.map(s=>`<section id="book-${s.id}" data-book-section="${s.id}" class="book-section"><h2>${sectionTitle(s)}</h2>${s.blocks.map(block).join('')}</section>`).join('');
    const q=lesson.quiz;
    root.innerHTML=header(lesson)+`<details class="section-index book-prerequisites"><summary>本节目录与先修回顾</summary><p>先修回顾：${(book.prerequisites||lesson.prerequisites||[]).map(lessonLink).join(' · ')||'从本节的问题开始，遇到新符号请先读定义。'}</p><nav class="book-toc" aria-label="本节阅读顺序">${book.sections.map(s=>`<a href="#${lesson.id}/${s.id}">${sectionTitle(s)}</a>`).join('')}</nav></details><article class="book-prose">${content}<details class="book-section book-check book-selfcheck"><summary>可选：检查一个关键条件</summary>${para(q.q)}<div class="quiz-options">${q.options.map((o,i)=>`<button data-answer="${i}" aria-pressed="false">${String.fromCharCode(65+i)}. ${esc(o)}</button>`).join('')}</div><div id="quiz-feedback" class="feedback" role="status"></div><details><summary>核对理由</summary>${para(q.why)}</details></details>${book.next?`<p class="book-next">${esc(book.next.text)}</p>`:''}${book.sources?.length?`<details class="book-sources"><summary>延伸阅读与编排参考</summary><p>本节正文、例题与交互独立编写。以下教材用于对照概念展开与学习活动的组织；正文按概念的先修关系逐步展开。</p><ul>${book.sources.map(s=>`<li><a href="${esc(s.url)}" target="_blank" rel="noopener noreferrer">${esc(s.title.replace(/^\d+\.\s*/,''))}</a>${s.note?para(s.note):''}</li>`).join('')}</ul></details>`:''}</article>`+footer(lesson);
    function remember(){session.set(lesson.id,{...session.get(lesson.id),bookLabs:Object.fromEntries(figures.map(f=>[f.index,{...f.values}])),params:{...figures[0]?.values}});}
    for(const figure of figures){
      const el=root.querySelector(`[data-book-figure="${figure.index}"]`),{lab,values,index}=figure;
      const draw=()=>{
        const r=lab.render(values),prefix=`book-${lesson.id}-${index}-`;
        el.querySelector('[data-book-graph]').innerHTML=r.svg.replace(/id="([^"]+)"/g,(_,id)=>`id="${prefix}${id}"`).replace(/url\(#([^)]+)\)/g,(_,id)=>`url(#${prefix}${id})`);
        el.querySelector('[data-book-readout]').innerHTML=r.metrics.map(([label,value])=>`<div class="metric"><span>${esc(label)}</span><strong>${esc(value)}</strong></div>`).join('');
        el.querySelector('[data-book-note]').textContent=r.note;
        const formula=el.querySelector('[data-book-formula]');formula.textContent=r.formula?`$$${r.formula}$$`:'';math(formula);
        el.querySelectorAll('[data-book-output]').forEach(output=>{output.value=fmt(values[output.dataset.bookOutput]);});remember();
      };
      el.querySelectorAll('[data-book-param]').forEach(input=>input.addEventListener('input',()=>{values[input.dataset.bookParam]=Number(input.value);draw();}));
      el.querySelector('.book-reset').addEventListener('click',()=>{for(const c of lab.controls){values[c.key]=c.value;el.querySelector(`[data-book-param="${c.key}"]`).value=c.value;}draw();});draw();
    }
    const feedback=answer=>{const correct=answer===q.answer;root.querySelectorAll('[data-answer]').forEach(b=>b.setAttribute('aria-pressed',String(Number(b.dataset.answer)===answer)));const el=root.querySelector('#quiz-feedback');el.className=`feedback${correct?' correct':''}`;el.textContent=correct?`判断正确。${q.why}`:`再想一想。${q.hint}`;math(el);session.set(lesson.id,{...session.get(lesson.id),answer});};
    root.querySelectorAll('[data-answer]').forEach(b=>b.addEventListener('click',()=>feedback(Number(b.dataset.answer))));if(Number.isInteger(state.answer))feedback(state.answer);
    math(root);wireProgress(lesson);
    if(anchor){const target=[...root.querySelectorAll('[data-book-section]')].find(el=>el.dataset.bookSection===anchor);target?.scrollIntoView({block:'start'});}
  };
})();
