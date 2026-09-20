const assert=require('node:assert/strict');
global.window={};require('../assets/elementary.js');require('../assets/lessons.js');require('../assets/foundations.js');require('../assets/linear.js');require('../assets/preparatory.js');require('../assets/calculus-theorems.js');require('../assets/books/derivative.js');require('../assets/books/linear-algebra.js');require('../assets/books/linear-systems.js');require('../assets/catalog.js');require('../assets/labs.js');require('../assets/linear-labs.js');require('../assets/preparatory-labs.js');
const m=window.LINEAR_MODELS,lessons=window.CALCULUS.lessons,labs=window.CALCULUS_LABS.labs;
const close=(x,y)=>assert(Math.abs(x-y)<1e-8,`${x} != ${y}`),dot=(a,b)=>a.reduce((s,x,i)=>s+x*b[i],0);
let checks=0;
for(const lesson of lessons.filter(l=>l.id.startsWith('linear-'))){if(lesson.book)assert(lesson.book.sections.some(s=>s.blocks.some(b=>b.type==='example'&&b.steps?.length)),'Continuous book needs explained examples');else assert(lesson.practice.length>=2&&lesson.examples.length>=1);for(const id of lesson.prerequisites)assert(lessons.findIndex(l=>l.id===id)<lessons.indexOf(lesson));for(const id of lesson.related)assert(lessons.some(l=>l.id===id.split('/')[0]));}
for(const s of [-2,0,1,2])for(const t of [-2,0,.5,2])for(const h of [-2,0,.25,2]){const r=m.span({s,t,h});assert.deepEqual(r.w,[s+t,h*t]);assert.equal(r.dimension,h===0?1:2);checks++;}
for(const angle of [0,5,45,90,135,180])for(const x of [-3,0,2,3])for(const y of [-3,0,1,3]){const p=m.projection({angle,x,y});close(dot(p.u,p.r),0);close(p.p[0]+p.r[0],x);close(p.p[1]+p.r[1],y);close(dot(p.p,p.p)+dot(p.r,p.r),x*x+y*y);for(const t of [-3,0,2])assert(Math.hypot(x-t*p.u[0],y-t*p.u[1])+1e-10>=p.distance);checks++;}
assert.deepEqual(m.mul(m.presets[4].A,[1,0]),[0,1]);assert.deepEqual(m.mul(m.presets[5].A,[1,0]),[1,1]);
for(const h of [-1.5,-.25,0,.25,1.5])for(const d of [-1.5,0,1.5])for(const t of [-2,.5,2]){const r=m.system({h,d,t});if(r.consistent){close(r.x[0]+r.x[1],1);close(h*r.x[1],d);assert.equal(r.rank,r.augmentedRank);}else{assert.equal(h,0);assert.notEqual(d,0);assert.equal(r.x,null);}checks++;}
let conicPoints=0;
for(const [a,b,c] of [[2,1,2],[-1,0,-1],[1,0,-1],[1,0,0],[0,0,0],[0,0,-1],[1,1,1]]){const points=m.quadraticPoints({a,b,c});for(const p of points){if(!p)continue;const [x,y]=p;close(a*x*x+2*b*x*y+c*y*y,1);conicPoints++;}if(a<=0&&c<=0&&b===0)assert(points.every(p=>p===null),'nonpositive form has no f=1 points');}
for(const mode of m.presets.keys())for(const x of [-2,0,2])for(const y of [-2,0,2]){const r=labs.linearMap.render({mode,x,y});assert(!/NaN|Infinity/.test(r.svg));close(...r.scale);checks++;}
for(const lambda of [-3,-2,0,1,2,5]){const A=[[1,1,1],[1,lambda,1],[1,1,lambda]],det=A[0][0]*(A[1][1]*A[2][2]-A[1][2]*A[2][1])-A[0][1]*(A[1][0]*A[2][2]-A[1][2]*A[2][0])+A[0][2]*(A[1][0]*A[2][1]-A[1][1]*A[2][0]);close(det,(lambda-1)**2);A.forEach(row=>close(dot(row,[1,0,0]),1));}
for(const n of [11,13,14,16])require('../assets/chapters/chapter-'+n+'.js');
assert(!window.COURSE_CHAPTERS['chapter-14'].html.includes('本题较难,自行展开'));
assert(!window.COURSE_CHAPTERS['chapter-16'].html.includes('已覆盖考研数一全部知识点'));
assert(window.COURSE_CHAPTERS['chapter-16'].html.includes('仅正交变换'));
console.log(`${checks} linear model cases, ${conicPoints} conic points, prerequisite links and correction regressions passed.`);
