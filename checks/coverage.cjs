const assert=require('node:assert/strict');
global.window={};
require('../assets/lessons.js');require('../assets/foundations.js');require('../assets/linear.js');require('../assets/preparatory.js');require('../assets/calculus-theorems.js');require('../assets/books/derivative.js');require('../assets/books/linear-algebra.js');require('../assets/books/linear-systems.js');require('../assets/catalog.js');require('../assets/coverage.js');
const {lessons}=window.CALCULUS,items=window.COURSE_COVERAGE.groups.flatMap(g=>g.items);
for(const item of items){
  assert(item.title&&item.gap&&['one','both'].includes(item.scope));
  if(!item.target)continue;
  const [id,anchor]=item.target.split('/'),lesson=lessons.find(l=>l.id===id);assert(lesson,`Missing lesson: ${id}`);
  if(anchor){if(lesson.book)assert(lesson.book.sections.some(s=>s.id===anchor),`Missing textbook section: ${item.target}`);else{require('../assets/chapters/'+id+'.js');assert(window.COURSE_CHAPTERS[id].html.includes(`id="${anchor}"`),`Missing anchor: ${item.target}`);}}
}
const index=id=>lessons.findIndex(l=>l.id===id);
for(const [before,after] of [['functions','inverse-functions'],['limit','limit-criteria'],['infinitesimal-order','equivalent'],['continuity','closed-interval'],['multivariable-limit','partial']])assert(index(before)<index(after),`Prerequisite order: ${before} before ${after}`);
assert(window.COURSE_COVERAGE.groups.at(-1).items.every(i=>i.scope==='one'&&!i.target),'unwritten probability content must stay explicit');
console.log(`${items.length} planning items; ${items.filter(i=>!i.target).length} without sections; all reading links and prerequisite checks passed.`);
