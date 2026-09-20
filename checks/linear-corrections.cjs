// Exercise the actual legacy Canvas mounts; compare their drawings/readouts with
// independent elimination, polygon area and repeated matrix multiplication.
const assert=require('node:assert/strict');
global.window={};
for(const n of [11,13,15,16])require('../assets/chapters/chapter-'+n+'.js');
const chapters=window.COURSE_CHAPTERS;
const close=(a,b,eps=1e-8)=>assert(Math.abs(a-b)<=eps,`${a} != ${b}`);
function det(rows){
  const a=rows.map(row=>row.slice());let value=1;
  for(let j=0;j<a.length;j++){
    let p=j;while(p<a.length&&Math.abs(a[p][j])<1e-12)p++;
    if(p===a.length)return 0;
    if(p!==j){[a[p],a[j]]=[a[j],a[p]];value=-value;}
    const pivot=a[j][j];value*=pivot;
    for(let i=j+1;i<a.length;i++){const scale=a[i][j]/pivot;for(let k=j;k<a.length;k++)a[i][k]-=scale*a[j][k];}
  }
  return value;
}
function context(){
  const c={texts:[],paths:[],path:[],fillStyle:'',strokeStyle:'',clearRect(){this.texts=[];this.paths=[];this.path=[];},beginPath(){this.path=[];},moveTo(x,y){this.path.push([x,y]);},lineTo(x,y){this.path.push([x,y]);},closePath(){},stroke(){this.paths.push({type:'stroke',color:this.strokeStyle,points:this.path.slice()});},fill(){this.paths.push({type:'fill',color:this.fillStyle,points:this.path.slice()});},fillText(text,x,y){this.texts.push({text,x,y});}};
  return c;
}
function mount(n){
  const chapter=chapters['chapter-'+n],nodes={};
  for(const tag of chapter.html.matchAll(/<[^>]+\bid="([^"]+)"[^>]*>/g)){
    const raw=tag[0],node={textContent:'',value:raw.match(/\bvalue="([^"]+)"/)?.[1]??''};
    if(raw.startsWith('<canvas')){node.width=+raw.match(/\bwidth="(\d+)"/)[1];node.height=+raw.match(/\bheight="(\d+)"/)[1];node.ctx=context();node.getContext=()=>node.ctx;}
    nodes[tag[1]]=node;
  }
  chapter.mount({querySelector(selector){const id=selector.match(/\[id="([^"]+)"\]/)?.[1];assert(nodes[id],'unknown element '+selector);return nodes[id];}});
  return nodes;
}
const determinant=mount(11);let matrixStates=0;
for(let a=-5;a<=5;a++)for(let b=-5;b<=5;b++)for(let c=-5;c<=5;c++){
  for(const [id,value] of [['ra',a],['rb',b],['rc',c]])determinant[id].value=String(value);
  determinant.ra.oninput();
  const ctx=determinant.cv2.ctx,numbers=ctx.texts.filter(t=>typeof t.text==='number');
  assert.equal(numbers.length,15,'three original columns and two repeated columns');
  const rows=Array.from({length:3},(_,i)=>numbers.slice(i*5,i*5+3).map(t=>t.text));
  assert.deepEqual(rows,[[a,1,1],[1,b,1],[1,1,c]]);
  for(let i=0;i<3;i++)assert.deepEqual(numbers.slice(i*5+3,i*5+5).map(t=>t.text),rows[i].slice(0,2));
  const expected=det(rows),readout=Number(determinant.d2.textContent.split('=')[1]);close(readout,expected);
  const diagonals=ctx.paths.filter(p=>p.type==='stroke'&&['#147557','#99436e'].includes(p.color));
  assert.equal(diagonals.length,6,'each of the six products has a drawn diagonal');
  let illustrated=0;
  for(const line of diagonals){
    const [start,end]=line.points;let product=1;
    for(let i=0;i<3;i++){
      const x=start[0]+i/2*(end[0]-start[0]),y=start[1]+i/2*(end[1]-start[1]);
      const cell=numbers.find(t=>Math.abs(t.x-x)<1e-8&&Math.abs(t.y-y)<1e-8);
      assert(cell,'Sarrus line must pass through an actual displayed cell');product*=cell.text;
    }
    illustrated+=(line.color==='#147557'?1:-1)*product;
  }
  close(illustrated,expected);matrixStates++;
}
let areaStates=0;
for(const [u,v] of [[0,90],[90,0],[0,0],[0,180],[37,156],[350,5],[180,270],[270,180]]){
  determinant.s1.value=String(u);determinant.s2.value=String(v);determinant.s1.oninput();
  const polygon=determinant.cv1.ctx.paths.find(p=>p.type==='fill').points;
  let twiceArea=0;for(let i=0;i<polygon.length;i++){const p=polygon[i],q=polygon[(i+1)%polygon.length];twiceArea+=p[0]*q[1]-p[1]*q[0];}
  const readout=Number(determinant.d1.textContent.match(/^D = (-?[\d.]+)/)[1]);
  close(readout,-twiceArea/(2*110*110),.000501);
  const [origin,end]=[polygon[0],polygon[1]];close(Math.hypot(end[0]-origin[0],end[1]-origin[1])/110,1.2);
  areaStates++;
}
const eigen=mount(15);let eigenStates=0;
for(let angle=0;angle<=180;angle++){
  eigen.s1.value=String(angle);eigen.s1.oninput();
  const t=angle*Math.PI/180,x=Math.cos(t),y=Math.sin(t),cross=x*y-y*2*x;
  const isEigen=Math.abs(cross)<1e-12;
  assert.equal(eigen.v1b.textContent==='特征方向(只伸缩)',isEigen,'angle '+angle);
  assert(eigen.cv1.ctx.texts.every(t=>t.y>=0&&t.y<=eigen.cv1.height),'eigen labels must fit canvas');
  eigenStates++;
}
const rankExample=chapters['chapter-13'].html.match(/<q>5\. 求 ([\s\S]*?)<\/details>/)[1];
const vectors=[...rankExample.split('</q>')[0].matchAll(/\((\d+),(\d+),(\d+)\)/g)].map(m=>m.slice(1).map(Number));
assert.equal(vectors.length,3);close(det(vectors),1);assert(rankExample.includes('秩为 3'));assert(rankExample.includes('三个原向量本身就是极大无关组'));
function matrices(text){return [...text.matchAll(/\\begin\{pmatrix\}([^]*?)\\end\{pmatrix\}/g)].map(m=>m[1].split('\\\\').map(row=>row.split('&').map(Number))).filter(m=>m.every(row=>row.every(Number.isFinite)));}
const powerExample=chapters['chapter-15'].html.split('例 7 · 矩阵幂')[1].split('例 8 ·')[0],powerMatrices=matrices(powerExample);
const mul=(a,b)=>a.map(row=>b[0].map((_,j)=>row.reduce((s,v,k)=>s+v*b[k][j],0)));
let power=[[1,0],[0,1]];for(let i=0;i<10;i++)power=mul(power,powerMatrices[0]);
assert.deepEqual(power,powerMatrices.at(-1));assert.deepEqual(power,[[29525,29524],[29524,29525]]);
assert(!chapters['chapter-15'].html.includes('实际求'));assert(chapters['chapter-15'].html.includes('设 $a\\in\\mathbb R$'));
const definiteExample=chapters['chapter-16'].html.split('例 10 · 证明')[1].split('<h2')[0];
assert(!definiteExample.includes('⟺'));assert(definiteExample.includes('不能反推正定'));assert(definiteExample.includes('$A=-I_2$'));
const counterexample=[[-1,0],[0,-1]];close(det(counterexample),1);
for(const v of [[1,0],[0,1],[1,2]])assert(v.reduce((s,x,i)=>s+x*counterexample[i].reduce((t,y,j)=>t+y*v[j],0),0)<0);
for(const n of [11,13,15,16]){
  const html=chapters['chapter-'+n].html,count=(html.match(/<canvas\b/g)||[]).length;
  assert(html.includes(count+' 个交互演示'),'chapter '+n+' must report its actual diagram count');
}
console.log(`${matrixStates} actual Sarrus drawings, ${areaStates} signed-area states, ${eigenStates} exact eigen-directions; rank, matrix power and positive-definiteness regressions passed.`);
