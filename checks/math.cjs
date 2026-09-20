// Run: node checks/math.cjs — no installation required.
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
global.window={};
require('../assets/elementary.js');require('../assets/lessons.js');require('../assets/foundations.js');require('../assets/linear.js');require('../assets/preparatory.js');require('../assets/calculus-theorems.js');require('../assets/books/derivative.js');require('../assets/books/linear-algebra.js');require('../assets/books/linear-systems.js');require('../assets/catalog.js');require('../assets/labs.js');require('../assets/linear-labs.js');require('../assets/preparatory-labs.js');
const {lessons,chapters}=window.CALCULUS,{labs}=window.CALCULUS_LABS;
assert.equal(new Set(lessons.map(l=>l.id)).size,lessons.length,'unique links');
let renders=0;
for(const lesson of lessons){
  if(lesson.kind==='chapter'){require('../assets/chapters/'+lesson.id+'.js');assert(window.COURSE_CHAPTERS[lesson.id].html.includes('<h2'));continue;}
  assert(labs[lesson.lab],`missing visualization: ${lesson.id}`);
  assert(lesson.quiz.hint,`missing targeted hint: ${lesson.id}`);
  assert(lesson.quiz.answer>=0&&lesson.quiz.answer<lesson.quiz.options.length);
  assert(fs.existsSync(path.join(__dirname,'..',chapters[lesson.chapter][2])));
  const lab=labs[lesson.lab],base=Object.fromEntries(lab.controls.map(c=>[c.key,c.value]));
  const samples=[base];
  for(const c of lab.controls)for(const value of [c.min,c.max,0])if(value>=c.min&&value<=c.max)samples.push({...base,[c.key]:value});
  for(const values of samples){
    const r=lab.render(values);assert(r.svg.includes('<svg'));assert(!/NaN|Infinity/.test(r.svg),`invalid coordinates: ${lesson.id} ${JSON.stringify(values)}`);assert(r.note.length>15);renders++;
  }
}
const value=(lab,params,index)=>Number(labs[lab].render(params).metrics[index][1]);
const near=(actual,expected)=>assert(Math.abs(actual-expected)<.00015,`${actual} differs from ${expected}`);
// Independent numerical checks against exact values and defining identities.
near(value('derivative',{a:2,h:-.5},0),3.5);
assert.equal(labs.derivative.render({a:1,h:0}).metrics[0][1],'0/0 未定义');
near(value('differential',{a:1,h:.1},0),.21);
near(value('differential',{a:1,h:.1},1),.2);
near(value('substitution',{b:1.2},0),1.2**4/2);
near(value('parts',{b:1.2},0)+value('parts',{b:1.2},1),1.2**3);
for(const n of [2,5,20,80]){
  assert(value('riemann',{n,sample:0},0)<1/3);
  assert(value('riemann',{n,sample:2},0)>1/3);
}
near(value('ftc',{x:1.5},0),1.125);near(value('ftc',{x:1.5},1),2.25);
near(value('improper',{p:1,b:10},0),Math.log(10));
near(value('improper',{p:2,b:10},0),.9);
near(value('partial',{dx:.3,dy:.2},0),1.13);
near(value('gradient',{angle:45},0),2*Math.SQRT2);
near(value('gradient',{angle:135},0),0);
near(value('line',{angle:Math.PI,reverse:1},1),-Math.PI);
near(value('green',{r:2},1),8*Math.PI);
near(value('flux',{r:1},0),4*Math.PI);
near(value('linearode',{q:2,y0:5},1),2+3*Math.exp(-2));
near(value('secondode',{zeta:0},1),Math.cos(4));
near(value('secondode',{zeta:1},1),5*Math.exp(-4));
assert.notEqual(window.CALCULUS_LABS.fmt(1e-8),'0','nonzero errors must not be rounded to zero');
const scales=labs.gradient.render({angle:135}).scale;near(scales[0],scales[1]);
const extreme=labs.function.render({a:2,h:-2,k:2,x:3});assert(extreme.bounds.y[1]>52,'observed point must stay visible');
assert(!labs.function.render({a:0,h:1,k:2,x:3}).svg.includes('顶点'),'constant has no unique vertex');
for(const f of window.ELEMENTARY_FUNCTIONS){
  for(const t of [.15,.5,.85]){const x=f.range[0]+t*(f.range[1]-f.range[0]),h=1e-5;near((f.f(x+h)-f.f(x-h))/(2*h),f.d(x));near((f.F(x+h)-f.F(x-h))/(2*h),f.f(x));}
}
near(value('curvature',{x:0},0),2);near(value('curvature',{x:0},1),.5);
assert.equal(labs.implicit.render({angle:0}).metrics[1][1],'无有限斜率');
near(value('product',{h:.1},0),.52);near(value('product',{h:.1},1),.5);
near(value('inverse',{a:1.5},0),2.25);near(value('inverse',{a:1.5},1),1.5);
near(value('orders',{power:2,c:1,x:.1},1),.1);
near(value('orders',{power:0,c:1,x:.01},1),10);
near(value('orders',{power:1,c:3,x:.001},1),3);
near(value('squeeze',{radius:.02},0),.0004);
near(value('ivt',{n:4},0),.65625);near(value('ivt',{n:4},1),1/32);
const f=x=>x*x*x+x-1;let lo=0,hi=1;for(let i=0;i<60;i++){const mid=(lo+hi)/2;if(f(mid)<0)lo=mid;else hi=mid;}const root=(lo+hi)/2;
for(let n=0;n<=12;n++){const output=labs.ivt.render({n});const approximation=Number(output.metrics[0][1]),bound=Number(output.metrics[1][1]);assert(Math.abs(root-approximation)<=bound+.00006,'bisection enclosure');}
near(value('paths',{mode:0,k:1,t:.1},0),.5);near(value('paths',{mode:1,k:1,t:.1},0),.1/1.01);
for(const t of [.001,.03,.2,1])near(value('paths',{mode:1,k:0,t},0),0);
for(const id of ['inverse-functions','infinitesimal-order','limit-criteria','closed-interval','multivariable-limit']){const l=lessons.find(l=>l.id===id);assert(l.examples.length>=1&&l.practice.length>=2);assert(l.practice.every(e=>e.hint&&e.steps.length>=2));}
console.log(`${lessons.length} lessons; ${renders} default/boundary render checks; mathematical identity checks passed.`);
