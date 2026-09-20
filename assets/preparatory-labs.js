/* 预备篇实验：角度端点、反函数分支和不等式解集使用同一数学模型。 */
(() => {
  const {labs,Plot,control,choice,metric,result,fmt}=window.CALCULUS_LABS;
  const B='#245cc5',O='#ae4c13',G='#147557',P=Math.PI,T=2*P;
  const clean=x=>Math.abs(x)<1e-12?0:x;
  const trig=t=>{const sin=clean(Math.sin(t)),cos=clean(Math.cos(t));return {sin,cos,tan:cos===0?null:sin/cos};};
  function sineLevel(c){
    if(c>1)return {roots:[],intervals:[]};
    if(c< -1)return {roots:[],intervals:[[0,T]]};
    const a=Math.asin(c),roots=[a,P-a,a+T,P-a+T].filter(x=>x>=-1e-12&&x<=T+1e-12).map(x=>Math.max(0,Math.min(T,x))).sort((a,b)=>a-b).filter((x,i,arr)=>!i||Math.abs(x-arr[i-1])>1e-10);
    const cuts=[0,...roots.filter(x=>x>0&&x<T),T],intervals=[];
    for(let i=1;i<cuts.length;i++)if(Math.sin((cuts[i-1]+cuts[i])/2)>=c-1e-12)intervals.push([cuts[i-1],cuts[i]]);
    for(const x of roots)if(!intervals.some(([a,b])=>x>=a&&x<=b))intervals.push([x,x]);
    return {roots,intervals:intervals.sort((a,b)=>a[0]-b[0])};
  }
  function wave(s,x){const u=s.w*x+s.phi*P,t=trig(u);return s.family===2&&t.tan===null?null:s.A*[t.sin,t.cos,t.tan][s.family]+s.k;}
  function poles(s,a,b){
    if(s.family!==2||s.w===0)return [];
    const low=Math.min(s.w*a+s.phi*P,s.w*b+s.phi*P),high=Math.max(s.w*a+s.phi*P,s.w*b+s.phi*P),out=[];
    for(let n=Math.ceil((low-P/2)/P);n<=Math.floor((high-P/2)/P);n++){const x=(P/2+n*P-s.phi*P)/s.w;if(x>a&&x<b)out.push(x);}
    return out.sort((a,b)=>a-b);
  }
  window.PREPARATORY_MODELS={trig,sineLevel,wave,poles};
  labs.mvtTheorems={title:'同一条割线，检查是否存在平行切线',hint:'依次切换罗尔、拉格朗日、柯西与两个反例。先读假设是否成立，再对照斜率。',legend:['蓝：函数或参数曲线','橙：端点割线','绿：中值点切线'],controls:[choice('mode','定理与条件对照',['罗尔：x(x−1)，[0,1]','拉格朗日：x³，[0,b]','柯西：(t²,t³)，t∈[1,b]','反例：|x|，有尖点','反例：端点值跳跃']),control('b','上端点 b（拉格朗日/柯西）',1.5,3,.1,2)],render:s=>{
    const mode=s.mode;
    if(mode>=3){const p=new Plot(-1.4,1.4,-.4,1.7);if(mode===3){p.curve(Math.abs,B,-1,1);p.line(-1,1,1,1,O);p.dot(0,0,O);}else{p.curve(x=>x,B,.00001,1);p.dot(0,0,B,5,true);p.dot(0,1,O,5);p.dot(1,1,B);p.line(0,1,1,1,O);}return result(p,'罗尔定理条件缺失时水平割线不保证水平切线',[metric('端点割线斜率',0),metric('内部导数',mode===3?'±1；0 处不可导':'恒为 1')],mode===3?'两端等高、闭区间连续，但内部尖点不可导，所以罗尔不适用。任何内点都没有导数为 0 的结论。':'两端等高、内部可导，但左端点的函数值与右极限不等，所以闭区间连续条件失效；内部导数恒为 1。');}
    let f,a,b,x,m,xi;
    if(mode===0){f=x=>x*(x-1);a=0;b=1;xi=x=.5;m=0;}
    if(mode===1){f=x=>x**3;a=0;b=s.b;xi=x=b/Math.sqrt(3);m=b*b;}
    if(mode===2){a=1;b=s.b*s.b;f=x=>x**1.5;m=(s.b**3-1)/(s.b**2-1);xi=2*m/3;x=xi*xi;}
    const p=new Plot(a-.3,b+.3,Math.min(-.7,f(a)-1),Math.max(1.5,f(b)+1),'横坐标：x（柯西为 g(t)）','纵坐标：f');p.curve(f,B,a,b);p.line(a,f(a),b,f(b),O);p.dot(a,f(a),O);p.dot(b,f(b),O);p.line(x-(b-a)/3,f(x)-m*(b-a)/3,x+(b-a)/3,f(x)+m*(b-a)/3,G);p.dot(x,f(x),G);
    return result(p,'满足假设时割线与某点切线平行',[metric(mode===2?'参数中值点 ξ':'中值点 ξ',xi),metric('割线斜率',m),metric(mode===2?'f′(ξ)/g′(ξ)':'f′(ξ)',m)],mode===2?'图中点为 (g(t),f(t))=(t²,t³)。中值点参数为 ξ，绿色点的横坐标为 ξ²，二者不能混淆。这里 g′=2t 非零，切线斜率为导数之比。':'本例明确算出了一个中值点来核对图形。一般定理只保证内部存在这样的点，不要求导数连续，也不保证中值点就是区间中点。');
  }};
  labs.prepAlgebra={title:'绝对值是一段距离',hint:'先预测两个端点，再改变中心 a 和半径 r。切换严格/非严格不等式，观察端点。',legend:['蓝：|x−a|','橙：距离上限 r','绿：满足条件的输入'],controls:[control('a','中心 a',-2,2,.5,1),control('r','距离上限 r',.5,3,.5,2),choice('closed','不等式',['|x−a|<r','|x−a|≤r'])],render:s=>{
    const p=new Plot(-6,6,-.7,6);p.curve(x=>Math.abs(x-s.a));p.line(-6,s.r,6,s.r,O);p.line(s.a-s.r,0,s.a+s.r,0,G,5);p.dot(s.a-s.r,0,G,5,!s.closed);p.dot(s.a+s.r,0,G,5,!s.closed);p.dot(s.a,0);return result(p,'V 形距离函数与数轴解集',[metric('左端点',s.a-s.r),metric('右端点',s.a+s.r),metric('解集',`${s.closed?'[':'('}${fmt(s.a-s.r)}, ${fmt(s.a+s.r)}${s.closed?']':')'}`)],'绿色线段上的输入，其蓝色高度低于橙线；非严格不等式也允许高度相等，所以使用实心端点。');
  }};
  labs.prepExpLog={title:'指数与对数交换输入和输出',hint:'切换底数，观察增减方向；再移动指数 u，比较两个互相交换坐标的点。',legend:['蓝：指数 y=aˣ','橙：对数 y=logₐx','绿：对称轴 y=x'],controls:[choice('base','底数 a',['2','1/2','e']),control('u','指数 u',-2,2,.1,1)],render:s=>{
    const a=[2,.5,Math.E][s.base],v=a**s.u,p=new Plot(-3,8,-3,8,'x','y',true);p.curve(x=>a**x);p.curve(x=>Math.log(x)/Math.log(a),O,.015,p.x1);p.line(p.x0,p.x0,p.x1,p.x1,G,1,'5 4');p.dot(s.u,v);p.dot(v,s.u,O);return result(p,'指数函数和对数函数的互逆关系',[metric('aᵘ',v),metric('logₐ(aᵘ)',s.u)],a<1?'底数小于 1 时两条曲线都递减。对数图像始终只在 x>0 处有定义；交换坐标并没有补上 x=0。':'底数大于 1 时两条曲线都递增。点 (u,aᵘ) 与 (aᵘ,u) 关于 y=x 对称，对应两个逆运算。');
  }};
  labs.prepProperties={title:'用一对输入检查对称',hint:'先判断 f(−x) 与 f(x) 的关系；切换到 1/x 时注意缺失的零点和分开的单调区间。',controls:[choice('family','函数',['x²','x³','1/x']),control('x','正侧观察值 x',0,2,.1,1)],render:s=>{
    const f=[x=>x*x,x=>x*x*x,x=>x===0?NaN:1/x][s.family],p=new Plot(-3,3,-9,9);if(s.family===2){p.curve(f,B,-3,-.015);p.curve(f,B,.015,3);}else p.curve(f);if(Number.isFinite(f(s.x))){p.dot(s.x,f(s.x),O);p.dot(-s.x,f(-s.x),G);}return result(p,'对称输入的函数值与函数图像',[metric('f(x)',f(s.x)),metric('f(−x)',f(-s.x)),metric('奇偶性',s.family===0?'偶函数':'奇函数')],s.family===2?'1/x 的定义域排除 0。它在两个半轴各自递减，但不能跨过 0 声称在整个定义域递减。':'一对点只能帮助观察；奇偶性的证明必须检查对称定义域，并对每个合法 x 验证代入 −x 后的等式。');
  }};
  function circleDiagram(deg,r){const t=deg*P/180,{sin,cos}=trig(t),p=new Plot(-1.4*r,1.4*r,-1.4*r,1.4*r,'x','y',true);p.circle(0,0,r,B);p.line(0,0,r,0,B);p.arrow(0,0,r*cos,r*sin,O);const n=Math.max(1,Math.ceil(Math.abs(deg)/4));for(let i=1;i<=n;i++)p.line(r*Math.cos(t*(i-1)/n),r*Math.sin(t*(i-1)/n),r*Math.cos(t*i/n),r*Math.sin(t*i/n),O,3);if(t!==0)p.arrow(r*Math.cos(t*.8),r*Math.sin(t*.8),-.15*r*Math.sin(t*.8)*Math.sign(t),.15*r*Math.cos(t*.8)*Math.sign(t),O);p.dot(r*cos,r*sin,O);return {p,t,sin,cos};}
  labs.prepRadian={title:'同一个转角，两种计量单位',hint:'先转到 −90°，再改变半径；角不变时，弧长随半径改变。正负号由旋转方向决定。',legend:['蓝：圆与始边','橙：本次转角及方向','绿：参考'],controls:[control('deg','有向角（度）',-360,360,15,60),control('r','半径 r',.5,3,.5,1)],render:s=>{const {p,t}=circleDiagram(s.deg,s.r);return result(p,'有向圆心角与非负弧长',[metric('θ（弧度）',t),metric('θ / π',s.deg/180),metric('弧长 r|θ|',s.r*Math.abs(t))],`${s.deg===0?'没有旋转':s.deg>0?'逆时针旋转':'顺时针旋转'}；弧长为 ${fmt(s.r*Math.abs(t))}。整周时终点回到始点，但走过的路程仍为 2πr；负角也不产生负路程。`);}};
  labs.prepCircle={title:'把 sin、cos 读成点的坐标',hint:'依次选择 0°、90°、180°、270°。比较投影的正负，并检查何时不能做 sin/cos。',legend:['蓝：单位圆','橙：终边与圆上点','绿：横纵投影'],controls:[control('deg','角 θ（度；读数同时给弧度）',-360,360,15,45)],render:s=>{const {p,t,sin,cos}=circleDiagram(s.deg,1);p.line(cos,0,cos,sin,G,2,'4 3');p.line(0,sin,cos,sin,G,2,'4 3');p.dot(cos,0,G);p.dot(0,sin,G);p.textPixel(70,22,`P = (${fmt(cos)}, ${fmt(sin)})`,O);return result(p,'单位圆的横坐标余弦与纵坐标正弦',[metric('θ / π',t/P),metric('cos θ',cos),metric('sin θ',sin),metric('tan θ',cos===0?'未定义（cos θ=0）':sin/cos)],cos===0?'此时横坐标为 0，sin θ / cos θ 不能计算。正切是没有定义，不是一个非常大的有限数。':'横坐标给 cos θ，纵坐标给 sin θ，二者的平方和为 1。投影的符号由点所在象限决定，正切为纵坐标除以横坐标。');}};
  labs.prepTrigGraph={title:'周期、振幅与平移分别改变什么',hint:'一次只改一个参数。先检查 A=0 或 ω=0 的退化情况，再切换正切，观察间断点不会被连起来。',controls:[choice('family','基础函数',['sin','cos','tan']),control('A','外部倍数 A',-2,2,.5,1),control('w','角频率 ω',-2,2,.5,1),control('phi','相位 φ / π',-1,1,.25,0),control('k','竖直平移 k',-2,2,.5,0)],render:s=>{
    const p=new Plot(-T,T,-5,5,'x（弧度）','y'),breaks=poles(s,-T,T),cuts=[-T,...breaks,T],undefinedAll=s.family===2&&s.w===0&&trig(s.phi*P).tan===null;
    if(!undefinedAll)for(let i=1;i<cuts.length;i++)p.curve(x=>wave(s,x)??NaN,B,cuts[i-1]+1e-5,cuts[i]-1e-5,'',180);
    for(const x of breaks){p.line(x,-5,x,5,O,1,'4 4');if(s.A===0)p.dot(x,s.k,B,4,true);}
    p.line(-T,s.k,T,s.k,G,1,'4 3');const constant=s.A===0||s.w===0,period=undefinedAll?'无定义域':constant?(s.family===2&&s.w!==0?`${fmt(P/Math.abs(s.w))}（定义域周期）`:'无最小正周期'):fmt((s.family===2?P:T)/Math.abs(s.w));
    const r=result(p,'三角函数的周期、平移与正切间断点',[metric('最小正周期',period),metric('振幅',s.family===2?'正切无振幅':s.w===0?'常数，无振幅变化':Math.abs(s.A)),metric('横向位移',s.w===0?'ω=0 不使用位移式':-s.phi*P/s.w)],undefinedAll?'ω=0 且相位落在正切无定义点，整个表达式无定义；即使 A=0，也不能用乘零把未定义的正切变成实数。':s.family===2?'橙虚线标出原正切的无定义点，图像逐段绘制。A=0 时这些点仍要排除，不能因乘零补点；正切没有有限振幅。':constant?'函数退化为常数，每个正数都是周期，没有最小正周期。不能把 2π/|ω| 不加条件地当作答案。':'增大 |ω| 会把横向周期压短；相位对应位移 −φ/ω，不能直接把 φ 读成位移。图上横轴单位为弧度。');r.formula=String.raw`y=${s.A}\,\${['sin','cos','tan'][s.family]}(${s.w}x+${s.phi}\pi)+${s.k}`;return r;
  }};
  labs.prepTrigIdentity={title:'和角公式来自旋转后的两个分量',hint:'蓝向量是 cos β 倍的 α 方向，绿向量是 sin β 倍的垂直方向；首尾相接得到橙色总向量。',legend:['蓝：cos β·(cos α,sin α)','橙：总向量，角为 α+β','绿：sin β·(−sin α,cos α)'],controls:[control('a','α（度）',-180,180,15,30),control('b','β（度）',-180,180,15,45),choice('coordinate','观察坐标',['纵坐标：正弦和角','横坐标：余弦和角'])],render:s=>{
    const a=s.a*P/180,b=s.b*P/180,u=[Math.cos(b)*Math.cos(a),Math.cos(b)*Math.sin(a)],v=[-Math.sin(b)*Math.sin(a),Math.sin(b)*Math.cos(a)],p=new Plot(-1.5,1.5,-1.5,1.5,'x','y',true);p.circle(0,0,1,G);p.arrow(0,0,...u,B);p.arrow(...u,...v,G);p.arrow(0,0,u[0]+v[0],u[1]+v[1],O);const i=s.coordinate===0?1:0,r=result(p,'两个旋转分量相加得到和角公式',[metric('第一分量',clean(u[i])),metric('第二分量（含符号）',clean(v[i])),metric('相加结果',clean(u[i]+v[i]))],'绿向量已包含 sin β 的正负；负分量会反向。横坐标相加得到 cos α cos β−sin α sin β，纵坐标相加得到 sin α cos β+cos α sin β。');r.formula=s.coordinate===0?String.raw`\sin(\alpha+\beta)=\sin\alpha\cos\beta+\cos\alpha\sin\beta`:String.raw`\cos(\alpha+\beta)=\cos\alpha\cos\beta-\sin\alpha\sin\beta`;return r;
  }};
  labs.prepTrigEquation={title:'同一幅图读出方程和不等式',hint:'把 c 移到 1、−1、0 和值域外。注意闭区间 [0,2π] 的两个端点是不同输入。',legend:['蓝：sin x','橙：水平线 y=c 与交点','绿：sin x≥c 的输入区间'],controls:[control('c','水平高度 c',-1.5,1.5,.25,.5)],render:s=>{
    const {roots,intervals}=sineLevel(s.c),p=new Plot(-.3,T+.3,-1.8,1.8,'x（弧度）','y');for(const [a,b]of intervals){p.rect(a,b,-1.8,1.8,G,.08);p.line(a,-1.6,b,-1.6,G,4);p.dot(a,-1.6,G,3);p.dot(b,-1.6,G,3);}p.curve(Math.sin,B,0,T);p.line(0,s.c,T,s.c,O);roots.forEach(x=>p.dot(x,s.c,O));return result(p,'正弦与水平线的交点及大于等于解集',[metric('方程解数',roots.length),metric('解的 x/π',roots.length?roots.map(x=>fmt(x/P)).join('，'):'无解'),metric('不等式解集（单位 π）',intervals.length?intervals.map(([a,b])=>a===b?`{${fmt(a/P)}}`:`[${fmt(a/P)},${fmt(b/P)}]`).join(' ∪ '):'空集')],'仅讨论闭区间 [0,2π]。橙点是相等的位置，绿色标记是曲线不低于水平线的输入；孤立的最高点也可能单独构成解集。读数为近似，精确角见例题。');
  }};
  labs.prepInverseTrig={title:'先选分支，再把坐标交换',hint:'蓝线只画选定的单调分支。改变输入 x，看橙色反函数点与蓝色原函数点如何对称。',legend:['蓝：原函数的指定分支','橙：反三角函数','绿：对称轴 y=x'],controls:[choice('family','反函数',['arcsin','arccos','arctan']),control('x','输入参数 t（arctan 用 4t）',-1,1,.1,.5)],render:s=>{
    const i=s.family,x=s.x*(i===2?4:1),y=[Math.asin,Math.acos,Math.atan][i](x),p=new Plot(-4.5,4.5,-3.5,4.5,'x','y',true);p.line(p.x0,p.x0,p.x1,p.x1,G,1,'4 4');if(i===0){p.curve(Math.sin,B,-P/2,P/2);p.curve(Math.asin,O,-1,1);[-1,1].forEach(v=>{p.dot(v,Math.asin(v),O);p.dot(Math.asin(v),v,B);});}if(i===1){p.curve(Math.cos,B,0,P);p.curve(Math.acos,O,-1,1);[0,P].forEach(v=>{p.dot(v,Math.cos(v),B);p.dot(Math.cos(v),v,O);});}if(i===2){p.curve(Math.tan,B,-P/2+.01,P/2-.01);p.curve(Math.atan,O);p.line(p.x0,P/2,p.x1,P/2,O,1,'3 4');p.line(p.x0,-P/2,p.x1,-P/2,O,1,'3 4');}p.dot(y,x,B,5);p.dot(x,y,O,5);return result(p,'三角函数主值分支和反函数的坐标交换',[metric('反函数输入 x',x),metric('输出角 y（弧度）',y),metric('y / π',y/P)],i===2?'arctan 的输出位于开区间 (−π/2,π/2)。两条橙虚线是水平渐近线，任何有限输入都不会给出端点角。':'只翻转选定分支，才得到单值的反函数。实心端点包含在定义域和值域中；换到区间外的角时，复合结果需要重新取主值。');
  }};
})();
