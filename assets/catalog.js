(() => {
  const {chapters,lessons}=window.CALCULUS;
  const linear=['行列式','矩阵','向量','线性方程组','特征值与特征向量','二次型'];
  linear.forEach((title,i)=>chapters.push([`线代第${i+1}章`,title,`math_ch${i+11}.html`]));
  // 基础目录按实际阅读顺序编号；参考材料不占主线章号。
  chapters[10][0]='第八章';
  const topics=chapters.slice(1).map((ch,i)=>({
    id:`chapter-${String(i+1).padStart(2,'0')}`,chapter:i+1,kind:'chapter',
    title:i<10?'专题推导与综合训练':ch[1],
    lead:`把${ch[1]}的概念、推导与应用串起来，沿正文顺序阅读，并用图形和完整例子核对每一步。`,
    scope:[8,9].includes(i+1)?'one':undefined,
    searchText:ch[1]
  }));
  topics.push({id:'sequence-practice',chapter:1,kind:'chapter',title:'数列极限专项推导与训练',lead:'用误差控制、子列与典型数列，把极限定义落实到证明和计算。',searchText:'数列 子列 放大法 夹逼 ε N 极限'});
  for(const topic of topics)lessons.push(topic);
  // 章节内的教学顺序显式维护，不让追加文件的先后决定先修关系。
  const sequence={
    0:window.PREPARATORY_UNITS.flatMap(u=>u.ids),
    1:['sequence','limit','limit-criteria','infinitesimal-order','equivalent','continuity','closed-interval','chapter-01','sequence-practice'],
    11:['linear-span','chapter-11'],12:['linear-map','chapter-12'],
    13:['linear-projection','chapter-13'],14:['linear-systems','chapter-14']
  };
  const rank=lesson=>{const i=sequence[lesson.chapter]?.indexOf(lesson.id);return i>=0?i:100;};
  lessons.sort((a,b)=>a.chapter-b.chapter||rank(a)-rank(b)||(a.kind==='chapter')-(b.kind==='chapter'));
  for(const l of lessons)if(l.book)l.searchText=[l.searchText||'',...l.book.sections.map(s=>[s.title,...s.blocks.map(b=>b.title||b.text||'')].join(' '))].join(' ');
  // 已展开的概念只有一个主讲位置；原小节地址直接进入相应正文。
  window.COURSE_READING_ALIASES={
    'chapter-02/intro':'derivative/average-rate','chapter-02/def':'derivative/definition',
    'chapter-02/geo':'derivative/tangent','chapter-02/lr':'derivative/one-sided','chapter-02/cont':'derivative/continuity',
    'chapter-14/def':'linear-systems/questions','chapter-14/solve':'linear-systems/elimination',
    'chapter-14/judge':'linear-systems/rank-test','chapter-14/homo':'linear-systems/homogeneous','chapter-14/nonh':'linear-systems/inhomogeneous'
  };
  Object.assign(lessons.find(l=>l.id==='chapter-02'),{title:'求导法则、公式推导与综合应用',lead:'导数定义与几何意义在本章前面的连续正文中展开；这里接着推导四则、复合、反函数与高阶求导公式，再说明隐函数、参数方程和微分的用法。'});
  Object.assign(lessons.find(l=>l.id==='chapter-14'),{title:'方程组的应用与方法对照',lead:'本章的消元原理、秩判据、基础解系与解的几何结构在前面的连续正文中展开。这里通过已有完整例子比较不同表示和计算方法。'});
  window.COURSE_SCOPE_SECTIONS={
    'chapter-06':['grad'],
    'chapter-07':['tri','cyl','sph'],
    'chapter-10':['bern'],
    'chapter-13':[]
  };
})();
