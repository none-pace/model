const assert=require('node:assert/strict');
global.window={};
for(const file of ['elementary','lessons','foundations','linear','preparatory','calculus-theorems','books/derivative','books/linear-algebra','books/linear-systems','catalog','labs','linear-labs','preparatory-labs'])require('../assets/'+file+'.js');
const {lessons}=window.CALCULUS,{labs}=window.CALCULUS_LABS,m=window.PREPARATORY_MODELS,P=Math.PI;
const near=(a,b,e=1e-9)=>assert(Math.abs(a-b)<e,`${a} != ${b}`);
const ids=window.PREPARATORY_UNITS.flatMap(u=>u.ids);
assert.equal(ids.length,11);assert.deepEqual(lessons.filter(l=>l.chapter===0).map(l=>l.id),ids);
for(const [i,id]of ids.entries()){
  const l=lessons.find(l=>l.id===id);assert.equal(l.lessonNumber,i+1);
  assert(l.summary.length&&l.focus&&l.exit.length&&l.bridge);
  assert(l.examples.length>=1&&l.practice.length>=2,`Worked examples and independent practice: ${id}`);
  assert(labs[l.lab]);
  for(const pre of l.prerequisites)assert(ids.indexOf(pre)<i);
}
for(const id of ['limit','mvt']){
  const l=lessons.find(l=>l.id===id);assert(l.theorems.length>=5);
  for(const t of l.theorems)assert(t.statement&&t.proof.length>=3&&t.counterexample&&t.use);
  for(const pre of l.prerequisites)assert(lessons.findIndex(x=>x.id===pre)<lessons.indexOf(l),`Prerequisite ${pre}`);
}
assert.equal(lessons.find(l=>l.id==='inverse-trig').assessment.length,7);
let checks=0;
// Independent exact axis/triangle values, including angles with undefined tangent.
for(const [angle,sin,cos]of [[0,0,1],[P/6,.5,Math.sqrt(3)/2],[P/2,1,0],[P,0,-1],[3*P/2,-1,0],[-P/2,-1,0],[2*P,0,1]]){const t=m.trig(angle);near(t.sin,sin);near(t.cos,cos);assert.equal(t.tan===null,cos===0);checks++;}
// Verify all reported roots and shaded intervals against the original inequality.
for(const c of [-1.5,-1,-.999,-.5,0,.5,.999,1,1.5]){
  const {roots,intervals}=m.sineLevel(c);
  roots.forEach(x=>{assert(x>=0&&x<=2*P);near(Math.sin(x),c);});
  for(let i=0;i<=800;i++){const x=i*2*P/800,inside=intervals.some(([a,b])=>x>=a-1e-10&&x<=b+1e-10);assert.equal(inside,Math.sin(x)>=c-1e-10,`sin(${x}) >= ${c}`);checks++;}
}
assert.equal(m.sineLevel(0).roots.length,3);assert.equal(m.sineLevel(1).roots.length,1);
assert.deepEqual(m.sineLevel(1).intervals,[[P/2,P/2]]);
for(const family of [0,1,2])for(const w of [-2,-.5,0,.5,2])for(const phi of [-1,-.5,0,.5,1])for(const A of [-2,0,2]){
  const s={family,w,phi,A,k:1},r=labs.prepTrigGraph.render(s);
  assert(!/NaN|Infinity/.test(r.svg));
  for(const x of m.poles(s,-2*P,2*P)){near(Math.cos(w*x+phi*P),0);assert.equal(m.wave(s,x),null);}
  if(w!==0)for(const x of [.23,.61]){const period=(family===2?P:2*P)/Math.abs(w);const a=m.wave(s,x),b=m.wave(s,x+period);if(a!==null&&b!==null)near(a,b,1e-7);}
  if(family===2&&w===0&&Math.abs(phi)===.5)assert.equal(m.wave(s,.12),null,'multiplying zero cannot define tangent at pole');
  checks++;
}
for(const a of [-150,-90,-30,0,60,90,180])for(const b of [-180,-45,0,30,90])for(const coordinate of [0,1]){
  const r=labs.prepTrigIdentity.render({a,b,coordinate});near(Number(r.metrics[2][1]),(coordinate===0?Math.sin:Math.cos)((a+b)*P/180),.0001);checks++;
}
for(const family of [0,1,2])for(const x of [-1,-.5,0,.5,1]){
  const r=labs.prepInverseTrig.render({family,x}),input=Number(r.metrics[0][1]),angle=Number(r.metrics[1][1]);
  near([Math.sin,Math.cos,Math.tan][family](angle),input,.001);
  if(family===2)assert(angle>-P/2&&angle<P/2);
  checks++;
}
for(const mode of [0,1,2,3,4])for(const b of [1.5,2,3]){
  const r=labs.mvtTheorems.render({mode,b});assert(!/NaN|Infinity/.test(r.svg));
  if(mode===1)near(3*Number(r.metrics[0][1])**2,b*b,.001);
  if(mode===2)near(3*Number(r.metrics[0][1])/2,(b**3-1)/(b*b-1),.001);
  checks++;
}
console.log(`11-lesson sequence, theorem structure, and ${checks} independent trigonometry / theorem checks passed.`);
