(() => {
  'use strict';
  const {chapters,lessons}=window.CALCULUS,{labs,fmt,esc}=window.CALCULUS_LABS;
  const $=id=>document.getElementById(id),storageKey='calculus-study-v1',session=new Map(),chapterLoads=new Map();
  let saved={done:[],scope:'two'},storageAvailable=true,current=null,params={},routeSerial=0;
  try{const data=JSON.parse(localStorage.getItem(storageKey)||'null');if(data&&Array.isArray(data.done))saved={done:[...new Set(data.done)].filter(id=>lessons.some(l=>l.id===id)),scope:'two',last:typeof data.last==='string'?data.last:''};}catch{storageAvailable=false;}
  const visibleLessons=()=>lessons.filter(l=>l.scope!=='one');
  function save(){try{localStorage.setItem(storageKey,JSON.stringify(saved));}catch{storageAvailable=false;}}
  function math(root){if(window.renderMathInElement)window.renderMathInElement(root,{delimiters:[{left:'$$',right:'$$',display:true},{left:'$',right:'$',display:false}],throwOnError:false,strict:false});else root.querySelectorAll('.formula-box,.atlas-formula').forEach(e=>e.classList.add('math-fallback'));}
  const paragraphs=items=>items.map(p=>`<p>${esc(p)}</p>`).join('');
  const steps=items=>`<ol class="steps">${items.map(p=>`<li>${esc(p)}</li>`).join('')}</ol>`;
  const scopeText=l=>l.scope==='one'?'后续专题':'基础知识';
  function renderNav(){
    const query=$('search').value.trim().toLowerCase(),available=visibleLessons();
    const filtered=available.filter(l=>[l.title,l.lead,l.formula||'',l.goal||'',l.searchText||'',chapters[l.chapter][1],l.trap||'',...(l.intuition||[]),...(l.reference||[]).map(r=>r.title+' '+r.explain),...(l.theorems||[]).map(t=>t.title+' '+t.statement)].join(' ').toLowerCase().includes(query));
    $('chapters').innerHTML=chapters.map((ch,i)=>{
      const group=filtered.filter(l=>l.chapter===i);if(!group.length)return '';
      return `<details class="chapter-group" ${query||current?.chapter===i?'open':''}><summary><small>${esc(ch[0])}</small>${esc(i===11?'向量基础与行列式':ch[1])}</summary>${group.map((l,j)=>`${l.unit&&l.unit!==group[j-1]?.unit?`<p class="nav-unit">${esc(l.unit)}</p>`:''}<a class="lesson-link" href="#${l.id}" ${current?.id===l.id?'aria-current="page"':''}><span class="tick" aria-label="${saved.done.includes(l.id)?'已掌握':'未标记'}">${saved.done.includes(l.id)?'✓':'·'}</span><span>${l.lessonNumber?`<span class="nav-num">${l.lessonNumber}. </span>`:''}${esc(l.title)}</span></a>`).join('')}</details>`;
    }).join('')||'<p class="empty-search">没有匹配内容。试试更短的关键词。</p>';
    const done=available.filter(l=>saved.done.includes(l.id)).length;
    $('progress-text').textContent=`已读懂 ${done} / ${available.length} 节${storageAvailable?'':' · 本次会话有效'}`;
    $('progress').max=available.length;$('progress').value=done;
  }
  function closeMenu(){const restore=$('sidebar').contains(document.activeElement)&&matchMedia('(max-width:720px)').matches;$('sidebar').classList.remove('open');$('menu-toggle').setAttribute('aria-expanded','false');if(restore)$('menu-toggle').focus();}
  function header(l){const ch=chapters[l.chapter];return `<header class="lesson-header"><p class="breadcrumb">${esc(ch[0])} / ${esc(ch[1])}</p><h1>${esc(l.title)}</h1><p class="lesson-lead">${esc(l.lead)}</p>${l.scope==='one'?'<p class="scope">这份参考材料可以在完成相关基础后阅读。<a href="calculus.html">返回上次阅读位置</a></p>':''}</header>`;}
  function footer(l){const available=visibleLessons(),i=available.indexOf(l),prev=i>0?available[i-1]:null,next=i>=0?available[i+1]:null;return `<footer class="next-step"><div class="reading-completion"><span>${i>=0?`第 ${i+1} / ${available.length} 节`:''}</span><button id="mark-done" aria-pressed="${saved.done.includes(l.id)}">${saved.done.includes(l.id)?'已读懂 · 撤销标记':'标记本节已读懂'}</button></div><div class="reading-pagination">${prev?`<a class="previous-lesson" rel="prev" href="#${prev.id}"><small>← 上一节</small>${esc(prev.title.split('：')[0])}</a>`:'<span></span>'}${next?`<a class="next-lesson" rel="next" href="#${next.id}"><small>接着读 →</small>${esc(next.title.split('：')[0])}</a>`:'<a class="next-lesson" href="math_index.html#curriculum">返回全书目录</a>'}</div></footer>${!window.renderMathInElement?'<p class="math-status">公式排版组件暂未加载，当前显示原始数学记法；图解和练习仍可使用。</p>':''}`;}
  function wireProgress(l){$('mark-done').addEventListener('click',()=>{saved.done=saved.done.includes(l.id)?saved.done.filter(id=>id!==l.id):[...saved.done,l.id];save();renderNav();const done=saved.done.includes(l.id);$('mark-done').setAttribute('aria-pressed',String(done));$('mark-done').textContent=done?'已读懂 · 撤销标记':'标记本节已读懂';});}
  function controls(lab){return lab.controls.map(c=>c.options?`<div class="choice-row"><label for="param-${c.key}">${esc(c.label)}</label><select id="param-${c.key}" data-param="${c.key}">${c.options.map((name,i)=>`<option value="${i}" ${params[c.key]===i?'selected':''}>${esc(name)}</option>`).join('')}</select></div>`:`<div class="slider-row"><label for="param-${c.key}">${esc(c.label)}</label><output id="out-${c.key}" for="param-${c.key}">${fmt(params[c.key])}</output><input id="param-${c.key}" data-param="${c.key}" type="range" min="${c.min}" max="${c.max}" step="${c.step}" value="${params[c.key]}"></div>`).join('');}
  function renderLab(){
    const lab=labs[current.lab],r=lab.render(params);$('lab-graph').innerHTML=r.svg;$('lab-readout').innerHTML=r.metrics.map(([label,value])=>`<div class="metric"><span>${esc(label)}</span><strong>${esc(value)}</strong></div>`).join('');$('lab-note').textContent=r.note;
    const formula=r.formula||'';if($('lab-formula').dataset.formula!==formula){$('lab-formula').dataset.formula=formula;$('lab-formula').textContent=formula?`$$${formula}$$`:'';math($('lab-formula'));}
    for(const c of lab.controls)if($(`out-${c.key}`))$(`out-${c.key}`).value=fmt(params[c.key]);
    session.set(current.id,{...session.get(current.id),params:{...params}});
  }
  function formulaTable(){return `<section><h2>常用公式与对应图解</h2><p>每行给出函数、导数和一个原函数；点击“看图”把这一行带入实验。所有原函数结果另加任意常数 C。</p><div class="formula-table" tabindex="0" role="region" aria-label="可横向滚动的常用公式表"><table><thead><tr><th>函数 f(x)</th><th>导数 f′(x)</th><th>原函数 F(x)</th><th>操作</th></tr></thead><tbody>${window.ELEMENTARY_FUNCTIONS.map((f,i)=>`<tr><td>$${f.tex}$</td><td>$${f.derivative}$</td><td>$${f.primitive}$</td><td><button data-family="${i}" aria-label="查看${esc(f.label)}的图解">看图</button></td></tr>`).join('')}</tbody></table></div></section>`;}
  function renderCore(l,anchor){
    if(l.book){window.renderTextbookChapter(l,anchor,{root:$('reading'),header,footer,math,wireProgress,session});return;}
    const lab=labs[l.lab],state=session.get(l.id)||{};params={...Object.fromEntries(lab.controls.map(c=>[c.key,c.value])),...state.params};
    if(l.id==='elementary'&&anchor){const i=window.ELEMENTARY_FUNCTIONS.findIndex(f=>f.id===anchor);if(i>=0)params.family=i;}
    $('reading').innerHTML=header(l)+`<div class="lesson-grid"><article class="prose"><section><h2 class="section-title">先建立直觉 <span>从一个具体问题出发</span></h2>${paragraphs(l.intuition)}</section><section><h2>把公式读成一句话</h2><div class="formula-box">$$${esc(l.formula)}$$<p class="formula-meaning">${esc(l.meaning)}</p></div><dl class="symbols">${l.symbols.map(([s,m])=>`<dt>${esc(s)}</dt><dd>${esc(m)}</dd>`).join('')}</dl><div class="conditions"><strong>什么时候可以用</strong>${esc(l.conditions)}</div></section>${l.id==='elementary'?formulaTable():''}<section><h2>一步一步，为什么成立</h2>${steps(l.steps)}</section><section><h2>把理解变成解题步骤</h2><div class="example"><h3>例题</h3><p>${esc(l.example.q)}</p>${steps(l.example.steps)}</div></section><section><div class="trap"><h3>这个地方最容易想错</h3><p>${esc(l.trap)}</p></div></section><section><h2>合上解析，自己判断一次</h2><p>${esc(l.quiz.q)}</p><div class="quiz-options">${l.quiz.options.map((o,i)=>`<button data-answer="${i}" aria-pressed="false">${String.fromCharCode(65+i)}. ${esc(o)}</button>`).join('')}</div><div id="quiz-feedback" class="feedback" role="status"></div><details><summary>需要一点提示</summary><p>${esc(l.quiz.hint)}</p></details><details><summary>查看完整解释</summary><p>答案：${String.fromCharCode(65+l.quiz.answer)}。${esc(l.quiz.why)}</p></details></section></article><aside class="lab-column" id="experiment" tabindex="-1" aria-label="公式交互图解"><section class="lab"><div class="lab-heading"><h2>${esc(lab.title)}</h2><p>${esc(lab.hint)}</p><div id="lab-formula"></div></div><div id="lab-graph"></div><div class="legend"><span><i></i>蓝：原函数或对象</span><span><i class="orange"></i>橙：变化或比较</span><span><i class="green"></i>绿：参考线或目标</span></div><div class="lab-controls">${controls(lab)}</div><div id="lab-readout" class="lab-readout"></div><div class="lab-explain"><p><b>当前图像说明了什么</b></p><p id="lab-note"></p></div><div class="lab-footer"><button id="reset-lab">恢复本节初始参数</button></div></section><p class="lab-caption">先预测 → 调参数 → 对照数值 → 返回推导。图形与数值是有限采样，不替代数学证明。</p></aside></div>`+footer(l);
    if(l.prerequisites||l.related){const links=document.createElement('div');links.className='lesson-connections';const link=id=>{const [unit]=id.split('/'),target=lessons.find(item=>item.id===unit);return target?`<a href="#${esc(id)}">${esc(target.kind==='chapter'?chapters[target.chapter][1]+'专题':target.title.split('：')[0])}</a>`:'';};links.innerHTML=(l.prerequisites?.length?'<p>先修回顾：'+l.prerequisites.map(link).join(' · ')+'</p>':(l.id==='linear-span'?'<p>线代篇起点：只需会坐标、加减与数乘，不要求先学微积分。</p>':'<p>预备篇起点：从实数运算与数轴开始。</p>'))+(l.related?.length?'<p>本节衔接：'+l.related.map(link).join(' · ')+'</p>':'');$('reading').querySelector('.lesson-header').append(links);}
    if(l.focus)$('reading').querySelector('.lesson-header').insertAdjacentHTML('beforeend',`<p class="lesson-focus"><strong>本课重点：</strong>${esc(l.focus)}</p>`);
    if(l.theorems?.length)$('reading').querySelector('.lesson-header').insertAdjacentHTML('beforeend',`<details class="section-index"><summary>本节目录</summary><nav class="chapter-toc" aria-label="本节定理课序">${l.theorems.map((t,i)=>`<a href="#${l.id}/theorem-${i+1}">${i+1}. ${esc(t.title.split('：')[0])}</a>`).join('')}</nav></details>`);
    const derivation=$('reading').querySelectorAll('.prose > section')[l.id==='elementary'?3:2];
    if(l.reference?.length)derivation.insertAdjacentHTML('afterend',`<section class="lesson-reference"><h2>公式整理：条件与来由一起记</h2>${l.reference.map(ref=>`<h3>${esc(ref.title)}</h3><div class="formula-box">$$${esc(ref.formula)}$$</div><p>${esc(ref.explain)}</p>`).join('')}</section>`);
    if(l.theorems?.length)derivation.insertAdjacentHTML('afterend',`<section class="theorem-sequence"><h2>定理正文：从条件到证明，再到使用</h2>${l.theorems.map((t,i)=>`<section class="theorem" id="theorem-${i+1}"><h3>${i+1}. ${esc(t.title)}</h3><p>${esc(t.problem)}</p><div class="conditions"><strong>准确表述与条件</strong>${esc(t.statement)}</div>${t.formula?`<div class="formula-box">$$${esc(t.formula)}$$</div>`:''}<h4>证明思路与逐步证明</h4>${steps(t.proof)}<h4>怎样使用</h4><p>${esc(t.use)}</p><div class="trap"><h4>条件不能怎样删</h4><p>${esc(t.counterexample)}</p></div></section>`).join('')}</section>`);
    if(lab.legend)$('reading').querySelector('.legend').innerHTML=lab.legend.map((label,i)=>`<span><i class="${['','orange','green'][i]}"></i>${esc(label)}</span>`).join('');
    const practiceSection=$('reading').querySelector('.prose > section:last-child');
    if(l.examples?.length){const section=document.createElement('section');section.innerHTML='<h2>再换一种问法，检查边界</h2>'+l.examples.map((example,i)=>`<div class="example"><h3>例题 ${i+2}</h3><p>${esc(example.q)}</p>${steps(example.steps)}</div>`).join('');practiceSection.before(section);}
    if(l.practice?.length){const section=document.createElement('section');section.className='independent-practice';section.innerHTML='<h2>独立练习：先写过程，再展开核对</h2>'+l.practice.map((exercise,i)=>`<div class="exercise"><h3>练习 ${i+1}</h3><p>${esc(exercise.q)}</p><details><summary>只看提示</summary><p>${esc(exercise.hint)}</p></details><details><summary>核对逐步解析</summary>${steps(exercise.steps)}</details></div>`).join('');practiceSection.after(section);}
    if(l.summary?.length)$('reading').querySelector('.prose').insertAdjacentHTML('beforeend',`<section class="lesson-summary"><h2>本课小结与过关要求</h2>${paragraphs(l.summary)}${l.exit?.length?'<h3>合上正文，检查自己</h3>'+steps(l.exit):''}${l.bridge?`<p class="lesson-bridge">${esc(l.bridge)}</p>`:''}</section>`);
    if(l.assessment?.length)$('reading').querySelector('.prose').insertAdjacentHTML('beforeend',`<section id="unit-review"><h2>${l.chapter===0?'预备篇':'本单元'}综合检测</h2><p>先在纸上完成并写明条件，再展开解析。基础计算过关后，还应能解释为什么这样做；卡在哪一题，就按回读提示返回相应小节。</p>${l.assessment.map((e,i)=>`<div class="exercise"><h3>综合题 ${i+1}</h3><p>${esc(e.q)}</p><details><summary>检查思路与完整解析</summary>${steps(e.steps)}<p>回读：<a href="#${esc(e.review)}">${esc(lessons.find(x=>x.id===e.review)?.title||e.review)}</a></p></details></div>`).join('')}</section>`);
    derivation.after($('reading').querySelector('.lab-column'));
    renderLab();math($('reading'));wireProgress(l);
    if(anchor==='review')document.getElementById('unit-review')?.scrollIntoView({block:'start'});
    if(/^theorem-\d+$/.test(anchor||''))document.getElementById(anchor)?.scrollIntoView({block:'start'});
    const feedback=answer=>{const correct=answer===l.quiz.answer;$('reading').querySelectorAll('[data-answer]').forEach(b=>b.setAttribute('aria-pressed',String(Number(b.dataset.answer)===answer)));$('quiz-feedback').className=`feedback${correct?' correct':''}`;$('quiz-feedback').textContent=correct?`判断正确。${l.quiz.why}`:`再想一想。${l.quiz.hint}`;math($('quiz-feedback'));session.set(l.id,{...session.get(l.id),answer});};
    if(Number.isInteger(state.answer))feedback(state.answer);
    $('reading').querySelectorAll('[data-answer]').forEach(b=>b.addEventListener('click',()=>feedback(Number(b.dataset.answer))));
    $('reading').querySelectorAll('[data-param]').forEach(input=>input.addEventListener('input',()=>{params[input.dataset.param]=Number(input.value);renderLab();}));
    $('reading').querySelectorAll('[data-family]').forEach(button=>button.addEventListener('click',()=>{params.family=Number(button.dataset.family);$('param-family').value=params.family;renderLab();$('experiment').scrollIntoView({block:'start'});$('experiment').focus({preventScroll:true});}));
    $('reset-lab').addEventListener('click',()=>{lab.controls.forEach(c=>{params[c.key]=c.value;$(`param-${c.key}`).value=c.value;});renderLab();});
  }
  function loadChapter(id){
    if(window.COURSE_CHAPTERS?.[id])return Promise.resolve(window.COURSE_CHAPTERS[id]);
    if(!chapterLoads.has(id))chapterLoads.set(id,new Promise((resolve,reject)=>{const script=document.createElement('script');script.src=`assets/chapters/${id}.js`;script.onload=()=>resolve(window.COURSE_CHAPTERS[id]);script.onerror=()=>{chapterLoads.delete(id);script.remove();reject(Error('章节文件加载失败'));};document.head.append(script);}));
    return chapterLoads.get(id);
  }
  function mountChapter(l,data,anchor){
    const doc=new DOMParser().parseFromString(data.html,'text/html');doc.querySelector('.cover')?.remove();doc.querySelectorAll('h1').forEach(e=>e.remove());doc.querySelectorAll('[style]').forEach(e=>e.removeAttribute('style'));
    const headings=[...doc.querySelectorAll('h2[id]')],sections=[];
    for(let i=0;i<headings.length;i++){
      const h=headings[i],range=doc.createRange();range.setStartBefore(h);if(headings[i+1])range.setEndBefore(headings[i+1]);else range.setEndAfter(doc.body.lastChild);
      const block=document.createElement('section');block.dataset.section=h.id;block.className='chapter-section';block.append(range.cloneContents());block.querySelectorAll('h2 .n').forEach(e=>e.remove());
      const one=window.COURSE_SCOPE_SECTIONS[l.id]?.includes(h.id);if(one){block.dataset.scope='one';block.querySelector('h2').insertAdjacentHTML('beforeend','<small class="scope-tag">后续专题</small>');}
      const primary=window.COURSE_READING_ALIASES?.[`${l.id}/${h.id}`];
      if(primary)block.dataset.primary=primary;
      sections.push({id:h.id,title:h.textContent.replace(/^\s*\d+\s*/,''),html:block.outerHTML,one,primary});
    }
    $('reading').innerHTML=header(l)+`<details class="section-index"><summary>本节目录</summary><nav class="chapter-toc" aria-label="本章专题">${sections.map(s=>`<a href="#${l.id}/${s.id}" data-section-link="${esc(s.id)}" ${s.one&&s.id!==anchor?'hidden':''}>${esc(s.title)}</a>`).join('')}</nav></details><div class="chapter-content">${sections.map(s=>s.html).join('')}</div>`+footer(l);
    const root=document.querySelector('.chapter-content');data.mount(root);
    for(const section of sections.filter(s=>s.primary)){
      const content=root.querySelector(`[data-section="${section.id}"]`);content.hidden=true;
      const link=document.querySelector(`.chapter-toc [data-section-link="${section.id}"]`);link.href='#'+section.primary;
    }
    for(const section of root.querySelectorAll('[data-scope="one"]'))section.hidden=section.dataset.section!==anchor;
    if(saved.scope==='two'){
      const extra=l.id==='chapter-06'?/方向导数|梯度/:l.id==='chapter-07'?/三重|柱坐标|球坐标/:l.id==='chapter-10'?/伯努利/:null;
      if(extra)root.querySelectorAll('.card.eg,.quiz').forEach(card=>{const title=card.querySelector('.tag,q')?.textContent||'';if(extra.test(title))card.hidden=true;});
    }
    root.querySelectorAll('canvas').forEach((canvas,i)=>{canvas.setAttribute('role','img');canvas.setAttribute('aria-label',`${chapters[l.chapter][1]}专题实验 ${i+1}；操作下方参数查看变化`);});
    root.querySelectorAll('.ctrl input,.ctrl select').forEach((input,i)=>{if(!input.labels?.length)input.setAttribute('aria-label',input.closest('.ctrl')?.querySelector('label')?.textContent||`${chapters[l.chapter][1]}实验参数 ${i+1}`);});
    math($('reading'));wireProgress(l);l.searchText=[l.searchText||'',...sections.map(s=>s.title)].join(' ');
    root.querySelectorAll('table').forEach(table=>{const wrap=document.createElement('div');wrap.className='formula-table';wrap.tabIndex=0;table.before(wrap);wrap.append(table);});
    if(anchor){const section=[...root.querySelectorAll('[data-section]')].find(e=>e.dataset.section===anchor);if(section&&!section.hidden){if(section.dataset.scope==='one'){const note=document.createElement('p');note.className='scope';note.textContent='已打开链接指向的参考专题；顺序阅读会略过本专题。';section.prepend(note);}section.scrollIntoView({block:'start'});}}
  }
  async function renderLesson(){
    const serial=++routeSerial;let route='';try{route=decodeURIComponent(location.hash.slice(1));}catch{}
    if(!location.hash&&typeof saved.last==='string'&&/^[a-z0-9-]+(?:\/[a-z0-9-]+)?$/.test(saved.last)&&visibleLessons().some(l=>l.id===saved.last.split('/')[0])){route=saved.last;history.replaceState(null,'',`#${route}`);}
    const alias=window.COURSE_READING_ALIASES?.[route];if(alias){route=alias;history.replaceState(null,'',`#${alias}`);}
    const [id,anchor]=route.split('/');let l=lessons.find(item=>item.id===id);if(!l){l=visibleLessons()[0];route=l.id;history.replaceState(null,'',`#${l.id}`);}current=l;document.title=`${l.title} · 数学笔记`;$('reading').dataset.lesson=l.id;
    $('search').value='';renderNav();closeMenu();$('reading').setAttribute('aria-busy','true');
    if(l.kind==='chapter'){
      $('reading').innerHTML=header(l)+'<p role="status">正在载入本章正文与实验…</p>';
      try{const data=await loadChapter(l.id);if(serial!==routeSerial)return;mountChapter(l,data,anchor);renderNav();}catch(error){if(serial!==routeSerial)return;$('reading').innerHTML=header(l)+'<p role="alert">本章未能载入。请检查章节文件是否完整。</p><button id="retry-chapter">重新载入</button>';$('retry-chapter').addEventListener('click',renderLesson);$('reading').setAttribute('aria-busy','false');console.error(error);return;}
    }else renderCore(l,anchor);
    $('reading').setAttribute('aria-busy','false');
    if(l.scope!=='one'&&!window.COURSE_SCOPE_SECTIONS[l.id]?.includes(anchor)){saved.last=route||l.id;save();}
  }
  let scrollPending=false;
  window.addEventListener('scroll',()=>{
    if(scrollPending)return;scrollPending=true;
    requestAnimationFrame(()=>{
      scrollPending=false;if(!current||current.scope==='one'||$('reading').getAttribute('aria-busy')==='true')return;
      const sections=[...$('reading').querySelectorAll('[data-book-section],.chapter-section,.theorem[id],#unit-review')].filter(el=>!el.hidden);
      if(!sections.length)return;
      const section=sections.filter(el=>el.getBoundingClientRect().top<=150).at(-1);
      if(section?.dataset.scope==='one')return;
      const anchor=section?.dataset.bookSection||section?.dataset.section||(section?.id==='unit-review'?'review':section?.id),route=current.id+(anchor?'/'+anchor:'');
      if(saved.last!==route){saved.last=route;save();}
    });
  },{passive:true});
  function renderAtlas(){
    const core=visibleLessons().filter(l=>l.kind!=='chapter');
    $('atlas-list').innerHTML=core.map(l=>`<a class="atlas-item" href="#${l.id}"><span>${esc(l.title)}<small>${scopeText(l)} · ${esc(l.meaning)}</small></span><span class="scope-tag">打开实验</span><span class="atlas-formula">$$${esc(l.formula)}$$</span></a>`).join('')+'<h3>常用初等函数：逐条图解</h3>'+window.ELEMENTARY_FUNCTIONS.map(f=>`<a class="atlas-item" href="#elementary/${f.id}"><span>${esc(f.label)}<small>${esc(f.domain)}</small></span><span class="scope-tag">打开实验</span><span class="atlas-formula">$$(${f.tex})'=${f.derivative},\\qquad\\int ${f.tex}\\,dx=${f.primitive}+C$$</span></a>`).join('');
    math($('atlas-list'));$('atlas-list').querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{$('atlas').close();if(a.hash===location.hash){$('experiment')?.scrollIntoView({block:'start'});$('experiment')?.focus({preventScroll:true});}}));
  }
  document.querySelector('.skip').addEventListener('click',e=>{e.preventDefault();$('reading').focus();window.scrollTo(0,0);});
  $('menu-toggle').addEventListener('click',()=>{$('menu-toggle').setAttribute('aria-expanded',String($('sidebar').classList.toggle('open')));});
  $('search').addEventListener('input',renderNav);$('chapters').addEventListener('click',e=>{if(e.target.closest('a'))closeMenu();});
  $('atlas-toggle').addEventListener('click',()=>{renderAtlas();$('atlas').showModal();$('atlas-toggle').setAttribute('aria-expanded','true');});$('atlas-close').addEventListener('click',()=>$('atlas').close());$('atlas').addEventListener('close',()=>$('atlas-toggle').setAttribute('aria-expanded','false'));
  document.addEventListener('keydown',e=>{if(e.key==='Escape')closeMenu();});
  window.addEventListener('hashchange',()=>{window.scrollTo(0,0);renderLesson();$('reading').focus({preventScroll:true});});renderLesson();
})();
