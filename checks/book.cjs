const assert=require('node:assert/strict');
global.window={};for(const file of ['elementary','lessons','foundations','linear','preparatory','calculus-theorems','books/derivative','books/linear-algebra','books/linear-systems','catalog','labs','linear-labs','preparatory-labs','book-labs'])require('../assets/'+file+'.js');
const {lessons}=window.CALCULUS,{labs}=window.CALCULUS_LABS,m=window.BOOK_MODELS;
const near=(a,b,tol=1e-8)=>assert(Math.abs(a-b)<=tol,`${a} != ${b}`),dot=(a,b)=>a.reduce((s,v,i)=>s+v*b[i],0);
function rank(input){const A=input.map(r=>r.slice()),rows=A.length,cols=A[0].length;let k=0;for(let j=0;j<cols&&k<rows;j++){let i=k;while(i<rows&&Math.abs(A[i][j])<1e-10)i++;if(i===rows)continue;[A[i],A[k]]=[A[k],A[i]];const pivot=A[k][j];for(let c=j;c<cols;c++)A[k][c]/=pivot;for(let r=k+1;r<rows;r++){const v=A[r][j];for(let c=j;c<cols;c++)A[r][c]-=v*A[k][c];}k++;}return k;}
let cases=0;
// Check the new geometry through independent elimination and reconstruction.
for(const mode of [0,1,2,3])for(const s of [-1,0,.5,1])for(const t of [-1,0,1])for(const r of [-1,0,1]){
  const v=m.span3d({mode,s,t,r}),A=[0,1,2].map(i=>v.vectors.map(u=>u[i]));
  assert.equal(rank(A),v.dimension);assert.equal(v.dimension,mode);
  for(let i=0;i<3;i++)near(dot(A[i],[s,t,r]),v.point[i]);
  if(mode===2){near(v.point[2],0);v.vectors[2].forEach((x,i)=>near(x,v.vectors[0][i]+v.vectors[1][i]));}
  cases++;
}
for(const k of [-2,-.5,0,1,2])for(const h of [-2,-.5,0,.5,2])for(const x of [-2,0,2])for(const y of [-2,0,1,2]){
  const v=m.basisCoordinates({k,h,x,y}),A=v.B,augmented=A.map((row,i)=>[...row,v.vector[i]]),consistent=rank(A)===rank(augmented);
  assert.deepEqual(v.vector,[x,y]);
  assert.equal(v.kind,!consistent?'empty':rank(A)===2?'unique':'infinite');
  if(v.kind==='unique'){
    A.forEach((row,i)=>near(dot(row,v.coordinates),v.vector[i]));
    // Scaling the second basis direction must halve its coefficient, keeping the vector fixed.
    if(Math.abs(k)<=1&&Math.abs(h)<=1){const scaled=m.basisCoordinates({k:k*2,h:h*2,x,y});near(scaled.coordinates[0],v.coordinates[0]);near(scaled.coordinates[1],v.coordinates[1]/2);}
  }else{
    assert.equal(v.coordinates,null);
    if(v.kind==='infinite')for(const t of [-3,0,2])A.forEach((row,i)=>near(dot(row,[x-k*t,t]),v.vector[i]));
  }
  cases++;
}
for(const c of m.planeCases){
  assert.equal(rank(c.A),c.rank);assert.equal(rank(c.A.map((r,i)=>[...r,c.b[i]])),c.augmented);
  c.A.forEach((n,i)=>{const poly=m.planePolygon(n,c.b[i]);if(n.every(v=>v===0))assert.equal(poly.length,0);for(const p of poly){near(dot(n,p),c.b[i]);assert(p.every(x=>Math.abs(x)<=3+1e-10));cases++;}});
  for(const yaw of [-180,-40,0,90,180])for(const pitch of [10,25,70]){const r=labs.systemsPlanes.render({mode:m.planeCases.indexOf(c),yaw,pitch,t:.3});assert(!/NaN|Infinity/.test(r.svg));cases++;}
  if(c.kind==='point'||c.kind==='line'){const t=c.kind==='point'?0:.37,x=[1+t,1-2*t,t];c.A.forEach((row,i)=>near(dot(row,x),c.b[i]));}
}
for(const step of m.elimination)for(const t of [-2,-1,-.3,0,.5,1,2]){
  const x=[1+t,1-2*t,t];step.matrix.forEach(r=>near(dot(r.slice(0,3),x),r[3]));assert.equal(rank(step.matrix.map(r=>r.slice(0,3))),2);assert.equal(rank(step.matrix),2);cases++;
}
for(const family of [0,1])for(const a of [-1,-.5,0,.5,1])for(const h of [-1,-.1,-.0001,.0001,.1,1]){const v=m.derivativeModel(family,a,h);near(v.delta,v.d*h+v.error);near(v.error/h,v.ratio);cases++;}
for(const h of [1,.1,.001,.0001]){
  near(m.sideModel(0,h).left,-h);near(m.sideModel(0,h).right,h);
  near(m.sideModel(1,h).left,-1);near(m.sideModel(1,h).right,1);
  near(m.sideModel(2,h).left,h);near(m.sideModel(2,h).right,h);
  near(m.sideModel(3,h).left,-1/h);near(m.sideModel(3,h).right,1/h);cases++;
}
for(const r of [1,2,3])for(const h of [.01,.2,1]){const out=labs.derivativeRing.render({r,h});near(Number(out.metrics[0][1]),Math.PI*((r+h)**2-r*r),.000051);near(Number(out.metrics[3][1]),Math.PI*h,.000051);cases++;}
for(const lesson of lessons.filter(l=>l.book)){
  const book=lesson.book,ids=book.sections.map(s=>s.id);assert.equal(new Set(ids).size,ids.length);assert(book.sources.every(s=>s.url.startsWith('https://')));
  for(const pre of book.prerequisites)assert(lessons.findIndex(l=>l.id===pre)<lessons.indexOf(lesson));
  for(const section of book.sections)for(const block of section.blocks){
    assert(!['exercise','activity'].includes(block.type),'New textbook material should explain through worked examples');
    if(block.type==='reference'){
      const [target,anchor]=block.id.split('/'),destination=lessons.find(l=>l.id===target);assert(destination,`Missing reference ${block.id}`);
      if(anchor&&destination.book)assert(destination.book.sections.some(s=>s.id===anchor),`Missing reference anchor ${block.id}`);
      if(anchor&&destination.kind==='chapter'){require('../assets/chapters/'+target+'.js');assert(window.COURSE_CHAPTERS[target].html.includes(`id="${anchor}"`),`Missing chapter reference ${block.id}`);}
    }
    if(block.type!=='figure')continue;assert(labs[block.lab],`Missing ${block.lab}`);
    const lab=labs[block.lab],base=Object.fromEntries(lab.controls.map(c=>[c.key,c.value]));
    for(const c of lab.controls)for(const value of [c.min,c.max]){const out=lab.render({...base,[c.key]:value});assert(out.svg.includes('<svg'));assert(!/NaN|Infinity/.test(out.svg));cases++;}
  }
}
for(const [alias,target]of Object.entries(window.COURSE_READING_ALIASES)){const [id,section]=target.split('/');assert(lessons.find(l=>l.id===id)?.book.sections.some(s=>s.id===section),`Broken primary section: ${alias}`);}
assert(!window.COURSE_SCOPE_SECTIONS['chapter-13'].includes('space'),'Shared prerequisites must stay visible in math two');
console.log(`${cases} independent geometry, derivative, figure-boundary and reading-link checks passed.`);
