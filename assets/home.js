(() => {
  const {chapters,lessons}=window.CALCULUS;
  const core=lessons.filter(l=>l.scope!=='one'),root=document.getElementById('curriculum-list');
  const parts=[{title:'预备篇',note:'先把基础补齐',from:0,to:0},{title:'高等数学',note:'从变化到累计',from:1,to:10},{title:'线性代数',note:'从向量到变换',from:11,to:16}];
  for(const part of parts){
    const section=document.createElement('div');section.className='contents-part';
    const heading=document.createElement('h3'),note=document.createElement('small');note.textContent=part.note;heading.append(note,document.createTextNode(part.title));
    const list=document.createElement('ol');
    chapters.forEach((chapter,i)=>{
      if(i<part.from||i>part.to)return;
      const group=core.filter(l=>l.chapter===i);if(!group.length)return;
      const item=document.createElement('li'),link=document.createElement('a'),number=document.createElement('small'),title=document.createElement('span'),arrow=document.createElement('span');
      link.href=`calculus.html#${group[0].id}`;number.textContent=chapter[0];title.textContent=i===11?'向量与空间基础 · 行列式':chapter[1];arrow.textContent='→';arrow.setAttribute('aria-hidden','true');link.append(number,title,arrow);item.append(link);list.append(item);
    });
    section.append(heading,list);root.append(section);
  }
  try{
    const saved=JSON.parse(localStorage.getItem('calculus-study-v1')||'null'),route=saved?.last;
    const lesson=typeof route==='string'&&/^[a-z0-9-]+(?:\/[a-z0-9-]+)?$/.test(route)?core.find(l=>l.id===route.split('/')[0]):null;
    if(lesson){document.getElementById('continue-reading').href=`calculus.html#${route}`;document.getElementById('continue-reading').textContent='继续阅读';document.getElementById('start-reading').hidden=false;document.getElementById('reading-position').textContent=`上次读到：${lesson.title}`;}
  }catch{/* Storage is optional; the first lesson remains available. */}
})();
