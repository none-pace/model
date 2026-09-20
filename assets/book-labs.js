/* 随正文展开的数值模型；三维图为可旋转的正交投影，判据由代数模型给出。 */
(() => {
  const {labs,Plot,control,choice,metric,result,fmt,esc}=window.CALCULUS_LABS;
  const B='#245cc5',O='#ae4c13',G='#147557',V='#87519b',dot=(a,b)=>a.reduce((s,v,i)=>s+v*b[i],0);
  const add=(a,b)=>a.map((v,i)=>v+b[i]),mul=(a,t)=>a.map(v=>v*t),cross=(a,b)=>[a[1]*b[2]-a[2]*b[1],a[2]*b[0]-a[0]*b[2],a[0]*b[1]-a[1]*b[0]];
  const elimination=[
    {matrix:[[1,1,1,2],[2,3,4,5],[3,4,5,7]],operation:'原增广矩阵：每一行是一条平面方程'},
    {matrix:[[1,1,1,2],[0,1,2,1],[3,4,5,7]],operation:'R₂ ← R₂−2R₁：减掉第二行的第一个未知数'},
    {matrix:[[1,1,1,2],[0,1,2,1],[0,1,2,1]],operation:'R₃ ← R₃−3R₁：现在后两行完全相同'},
    {matrix:[[1,1,1,2],[0,1,2,1],[0,0,0,0]],operation:'R₃ ← R₃−R₂：0=0 表示第三条约束已冗余'},
    {matrix:[[1,0,-1,1],[0,1,2,1],[0,0,0,0]],operation:'R₁ ← R₁−R₂：主元列清零，读出 x=1+z、y=1−2z'}
  ];
  const planeCases=[
    {name:'唯一解：三面交于一点',A:[[1,1,1],[0,1,2],[0,0,1]],b:[2,1,0],rank:3,augmented:3,kind:'point',description:'三个独立约束把三个自由方向全部确定。公共点为 (1,1,0)，三个坐标都不能任取。'},
    {name:'无穷解：公共交线',A:[[1,1,1],[0,1,2],[1,2,3]],b:[2,1,3],rank:2,augmented:2,kind:'line',description:'第三式等于前两式相加，没有新约束。剩一个自由参数，所有解为 (1,1,0)+t(1,−2,1)。'},
    {name:'无穷解：重合平面',A:[[1,1,1],[2,2,2],[3,3,3]],b:[2,4,6],rank:1,augmented:1,kind:'plane',description:'三条方程只是同一约束的非零倍数，三面重合。可任取 y、z，再令 x=2−y−z，保留两个自由方向。'},
    {name:'无解：平行面冲突',A:[[1,1,1],[0,1,2],[0,1,2]],b:[2,1,2],rank:2,augmented:3,kind:'empty',description:'y+2z 不可能同时等于 1 和 2。相减得到 0=1；系数秩小于增广秩，没有公共解。'},
    {name:'无约束：整个三维空间',A:[[0,0,0],[0,0,0],[0,0,0]],b:[0,0,0],rank:0,augmented:0,kind:'space',description:'每一行都是 0=0，不是真正的平面方程。任何 (x,y,z) 都满足，三个自由参数，解集为整个 R³。'},
    {name:'两两相交，仍无公共解',A:[[1,0,0],[0,1,0],[1,1,0]],b:[0,0,1],rank:2,augmented:3,kind:'empty',description:'x=0 与 y=0 的交线是 z 轴，但轴上始终 x+y=0，达不到第三面 x+y=1。两两相交不保证三者共同相交。'}
  ];
  function planePolygon(n,d,bound=3){
    if(dot(n,n)===0)return [];
    const vertices=Array.from({length:8},(_,i)=>[0,1,2].map(k=>(i&(1<<k))?bound:-bound)),points=[];
    const push=p=>{if(!points.some(q=>Math.hypot(...p.map((v,i)=>v-q[i]))<1e-8))points.push(p);};
    for(let i=0;i<8;i++)for(let k=0;k<3;k++){const j=i^(1<<k);if(j<i)continue;const a=vertices[i],b=vertices[j],u=dot(n,a)-d,v=dot(n,b)-d;if(Math.abs(u)<1e-9)push(a);if(Math.abs(v)<1e-9)push(b);if(u*v<0)push(a.map((x,h)=>x+(b[h]-x)*u/(u-v)));}
    if(points.length<3)return points;
    const center=points.reduce((a,p)=>add(a,mul(p,1/points.length)),[0,0,0]),seed=Math.abs(n[0])<.8*Math.hypot(...n)?[1,0,0]:[0,1,0],u=cross(n,seed),v=cross(n,u);
    return points.sort((a,b)=>Math.atan2(dot(add(a,mul(center,-1)),v),dot(add(a,mul(center,-1)),u))-Math.atan2(dot(add(b,mul(center,-1)),v),dot(add(b,mul(center,-1)),u)));
  }
  function scene3d(A,b,kind,yaw,pitch,t=0){
    const ay=yaw*Math.PI/180,ap=pitch*Math.PI/180;
    const project=p=>{const x=p[0]*Math.cos(ay)-p[1]*Math.sin(ay),y=p[0]*Math.sin(ay)+p[1]*Math.cos(ay);return [270+35*x,180-35*(p[2]*Math.cos(ap)-y*Math.sin(ap)),p[2]*Math.sin(ap)+y*Math.cos(ap)];};
    const path=ps=>ps.map(p=>project(p).slice(0,2).map(n=>n.toFixed(2)).join(',')).join(' '),line=(a,b,color,width=1,dash='')=>`<polyline points="${path([a,b])}" stroke="${color}" stroke-width="${width}" ${dash?`stroke-dasharray="${dash}"`:''} fill="none"/>`;
    let svg='<svg viewBox="0 0 540 380" role="img" aria-label="三元线性方程的平面及公共解集；可调视角"><title>输入空间中的平面与公共解集，采用正交投影</title><rect width="540" height="380" fill="white"/>';
    const vs=Array.from({length:8},(_,i)=>[0,1,2].map(k=>(i&(1<<k))?3:-3));
    for(let i=0;i<8;i++)for(let k=0;k<3;k++){const j=i^(1<<k);if(j>i)svg+=line(vs[i],vs[j],'#d3dce8');}
    const faces=A.map((n,i)=>({points:planePolygon(n,b[i]),color:[B,O,V][i%3],i})).filter(f=>f.points.length>=3);
    faces.sort((a,b)=>a.points.reduce((s,p)=>s+project(p)[2]/a.points.length,0)-b.points.reduce((s,p)=>s+project(p)[2]/b.points.length,0));
    for(const f of faces)svg+=`<polygon points="${path(f.points)}" fill="${f.color}" fill-opacity=".15" stroke="${f.color}" stroke-width="1.5"/>`;
    for(let k=0;k<3;k++){const a=[0,0,0],v=[0,0,0];a[k]=-3.25;v[k]=3.4;svg+=line(a,v,'#67778a',1.4);const q=project(v);svg+=`<text x="${q[0]+5}" y="${q[1]-5}" fill="#435570" font-size="14">${['x','y','z'][k]}</text>`;}
    if(kind==='line')svg+=line([0,3,-1],[3,-3,2],G,4);
    if(kind==='plane')svg+=`<polygon points="${path(planePolygon([1,1,1],2))}" fill="${G}" fill-opacity=".15" stroke="${G}" stroke-width="3"/>`;
    if(kind==='space'){svg+=`<polygon points="${path([vs[0],vs[1],vs[3],vs[2]])}" fill="${G}" fill-opacity=".12"/>`;}
    if(kind==='point'||kind==='line'){const p=kind==='point'?[1,1,0]:[1+t,1-2*t,t],q=project(p);svg+=`<circle cx="${q[0]}" cy="${q[1]}" r="5" fill="${G}" stroke="white" stroke-width="2"/><text x="18" y="28" fill="${G}" font-size="14">公共解点 (${p.map(v=>fmt(v,2)).join(', ')})</text>`;}
    svg+='<text x="18" y="355" fill="#556579" font-size="12">仅显示 −3≤x,y,z≤3 内的一部分；平面与直线向外无限延伸。</text></svg>';
    return svg;
  }
  const derivativeModel=(family,a,h)=>{const f=family===0?x=>x*x:x=>x*x*x,d=family===0?2*a:3*a*a,delta=f(a+h)-f(a),error=family===0?h*h:3*a*h*h+h*h*h;return {f,d,delta,error,ratio:h===0?null:(family===0?h:3*a*h+h*h)};};
  const sideModel=(family,h)=>{
    const f=[x=>x*x,Math.abs,x=>x*Math.abs(x),x=>x===0?0:1][family];return {left:(f(-h)-f(0))/(-h),right:(f(h)-f(0))/h,derivative:[0,null,0,null][family],f};
  };
  window.BOOK_MODELS={elimination,planeCases,planePolygon,scene3d,derivativeModel,sideModel};
  labs.derivativeRing={title:'薄圆环的面积：周长乘厚度，还差多少',hint:'固定半径后缩小厚度 h。蓝色面积主项为 2πrh，橙色面积表示被略去的 πh²。',legend:['蓝：圆环与面积主项','橙：误差面积 πh²','绿：半径参考'],controls:[control('r','原半径 r',1,3,.25,2),control('h','增加的厚度 h',.01,1,.01,.2)],render:s=>{
    const {r,h}=s,L=2*Math.PI*r,p=new Plot(-4.5,4.5,-4.5,4.5,'长度','长度',true);
    const loop=radius=>Array.from({length:161},(_,i)=>{const t=i*Math.PI/80;return `${i?'L':'M'}${p.x(radius*Math.cos(t))},${p.y(radius*Math.sin(t))}`;}).join(' ')+'Z';
    p.add(`<path d="${loop(r+h)} ${loop(r)}" fill="${B}" fill-opacity=".2" fill-rule="evenodd"/>`);p.circle(0,0,r,B);p.circle(0,0,r+h,B);p.arrow(0,0,r,0,G);p.line(r,0,r+h,0,O,4);p.textPixel(62,25,`r=${fmt(r)}，h=${fmt(h)}`,G);
    const q=new Plot(0,L+Math.PI*h+.5,-.1,1.15,'面积对照的长边（纵横比例不同）','厚度 h');q.rect(0,L,0,h,B,.22);q.rect(L,L+Math.PI*h,0,h,O,.35);q.textPixel(145,19,'蓝：2πr × h       橙：πh × h',B);
    return {svg:`<div class="paired-plots"><h3>真正的圆环：两同心圆之间的面积</h3>${p.finish('半径从r增加h形成的薄圆环').replaceAll('plot-clip','ring-circle')}<h3>面积拆分示意，两个矩形面积之和与圆环相等</h3>${q.finish('面积主项与误差的两个矩形表示').replaceAll('plot-clip','ring-strip')}</div>`,formula:String.raw`\Delta A=\pi(r+h)^2-\pi r^2=2\pi rh+\pi h^2`,metrics:[metric('精确增量 ΔA',L*h+Math.PI*h*h),metric('线性主项 2πrh',L*h),metric('余项 πh²',Math.PI*h*h),metric('余项 / h',Math.PI*h)],note:'下图只比较面积，并非把圆环精确拉成了长条。余项除以 h 等于 πh，随厚度趋零而趋零，因此面积对半径的导数为 2πr。观察面积、增量和变化率是三个不同的量。'};
  }};
  labs.systemsPlanes={title:'三条方程的公共解：点、线、面与空集',hint:'改变方程类型，再转动视角；投影重合不能代替代数判据。',legend:['蓝：第一条方程','橙：第二条方程','绿：公共解集（紫：第三条）'],controls:[choice('mode','三维方程组',planeCases.map(c=>c.name)),control('yaw','水平视角（度）',-180,180,5,-40),control('pitch','俯视角（度）',10,70,5,25),control('t','交线上参数 t（仅交线模式）',-1,1,.1,0)],render:s=>{const c=planeCases[s.mode];return {svg:scene3d(c.A,c.b,c.kind,s.yaw,s.pitch,s.t),metrics:[metric('系数秩 r(A)',c.rank),metric('增广秩',c.augmented),metric('自由参数数',c.kind==='empty'?'无解，不计':3-c.rank)],note:c.description+' 图形是三维对象在屏幕上的投影；转动视角只改观察方向，不改方程。',formula:equations(c.A,c.b)};}};
  function equations(A,b){const term=row=>row.map((v,i)=>v===0?'':`${v<0?'-':'+'}${Math.abs(v)===1?'':Math.abs(v)}${['x','y','z'][i]}`).join('').replace(/^\+/,'')||'0';return String.raw`\begin{cases}`+A.map((row,i)=>term(row)+'='+b[i]).join('\\\\')+String.raw`\end{cases}`;}
  labs.systemsElimination={title:'消元改变每条平面，保留共同交线',hint:'一步步看行操作；将同一个绿色点代回当前三行，所有等式始终成立。',legend:['蓝：当前第一行','橙：当前第二行','绿：共同解线（紫：第三行）'],controls:[choice('step','消元步骤',elimination.map((e,i)=>`${i}. ${e.operation}`)),control('t','自由参数 z=t',-1,1,.1,.4),control('yaw','水平视角（度）',-180,180,5,-40)],render:s=>{
    const step=elimination[s.step],A=step.matrix.map(r=>r.slice(0,3)),b=step.matrix.map(r=>r[3]),x=[1+s.t,1-2*s.t,s.t];
    const matrix=String.raw`\left[\begin{array}{ccc|c}`+step.matrix.map(row=>row.join('&')).join('\\\\')+String.raw`\end{array}\right]`;
    return {svg:scene3d(A,b,'line',s.yaw,25,s.t),metrics:[metric('当前 x',x[0]),metric('当前 y',x[1]),metric('当前 z',x[2]),metric('代回残差最大值',Math.max(...A.map((r,i)=>Math.abs(dot(r,x)-b[i]))))],formula:matrix,note:step.operation+'。绿色交线在所有步骤中相同；零行 0=0 不再画成平面，因为它不限制任何点。最后保留两个主元和一个自由变量。'};
  }};
  labs.derivativeMicroscope={title:'放大以后，曲线怎样接近直线',hint:'缩小观察尺度 r。左右图同时使用 u=(x−a)/r，右图展示被线性项忽略的误差。',legend:['蓝：真实增量除以 r','橙：线性部分 f′(a)u','绿：误差基准 0'],controls:[choice('family','函数',['x²','x³']),control('a','观察中心 a',-1,1,.25,.5),control('zoom','放大级别（r=10⁻ᵏ）',0,4,1,1)],render:s=>{
    const r=10**(-s.zoom),d=s.family===0?2*s.a:3*s.a*s.a,trueChange=u=>s.family===0?2*s.a*u+r*u*u:3*s.a*s.a*u+3*s.a*r*u*u+r*r*u*u*u,p=new Plot(-1,1,-8,8,'u=(x−a)/r','增量 / r');p.curve(trueChange);p.curve(u=>d*u,O);const model=derivativeModel(s.family,s.a,r);p.dot(1,trueChange(1));p.dot(1,d,O);
    const e=new Plot(-1,1,-4.5,4.5,'u','误差 / r');e.curve(u=>trueChange(u)-d*u,O);e.line(-1,0,1,0,G);
    return {svg:`<div class="paired-plots"><h3>同一尺度上的真实变化与线性变化</h3>${p.finish('曲线在局部缩放后接近切线').replaceAll('plot-clip','microscope-main')}<h3>同一误差尺度；越来越靠近零线</h3>${e.finish('误差除以观察尺度').replaceAll('plot-clip','microscope-error')}</div>`,metrics:[metric('观察半径 r',r),metric('导数 f′(a)',d),metric('h=r 时 R(h)/h',model.ratio)],note:s.a===0?'中心导数为 0 仍然可以线性近似：线性增量为 0，真实增量比 h 更小。可导要求 R(h)/h→0，不是说真实增量等于 0；右图的纵轴保持不变，误差缩小可以直接比较。':'左图把输入和输出增量都除以 r，保留斜率。右图把遗漏的高阶部分除以 r；随窗口缩小趋向 0，说明线性部分相对于输入变化越来越准确。'};
  }};
  labs.derivativeSides={title:'固定同一个点值，比较左右差商',hint:'减小正数 h；左侧使用 −h 作分母，右侧使用 h，二者都减去实际 f(0)。',legend:['蓝：原函数','橙：右侧割线','绿：左侧割线'],controls:[choice('family','比较函数',['x²：光滑最低点','|x|：尖角','x|x|：过零变号且可导','f(0)=0，其余为 1：间断']),control('zoom','接近级别（h=10⁻ᵏ）',0,4,1,1)],render:s=>{
    const h=10**(-s.zoom),m=sideModel(s.family,h),p=new Plot(-1.2,1.2,-1.5,1.5);if(s.family===3){p.line(-1.2,1,1.2,1,B);p.dot(0,1,B,5,true);}else p.curve(m.f);p.dot(0,m.f(0),B);p.line(-h,m.f(-h),0,m.f(0),G,3);p.line(0,m.f(0),h,m.f(h),O,3);p.dot(-h,m.f(-h),G);p.dot(h,m.f(h),O);
    return result(p,'用同一个实际函数值计算左右割线斜率',[metric('正步长 h',h),metric('左差商',m.left),metric('右差商',m.right),metric('0 处有限导数',m.derivative===null?'不存在':m.derivative)],['两个差商分别为 −h、h，趋于同一个有限数 0。它们在 h≠0 时不相等并不妨碍极限相等。','左右差商恒为 −1 和 1，没有共同极限。缩短步长仍保留尖角，连续并不保证可导。','左右差商均为 h，趋于 0；x|x| 在两边公式不同，却在 0 可导。必须回定义检查，不能只看表达式是否分段。','左右差商为 −1/h 与 1/h，不能趋于同一有限数。附近公式为常数 1 并不代表 0 处导数为 0：实际点值必须使用 f(0)=0。'][s.family]);
  }};
  labs.derivativeFunction={title:'滑动切点，同时读出导函数的高度',hint:'左图读切线斜率，右图在相同横坐标读导数值。先比较斜率正负，再比较陡缓。',legend:['蓝：函数或导函数','橙：当前位置与切线','绿：零高度'],controls:[choice('family','函数',['x²','x³','sin x（求导公式见后续）']),control('a','切点位置 a',-2,2,.1,1)],render:s=>{
    const f=[x=>x*x,x=>x*x*x,Math.sin][s.family],d=[x=>2*x,x=>3*x*x,Math.cos][s.family],p=new Plot(-2.5,2.5,-8,8),q=new Plot(-2.5,2.5,-5,13,'x','f′(x)');p.curve(f);p.line(s.a-.5,f(s.a)-d(s.a)*.5,s.a+.5,f(s.a)+d(s.a)*.5,O);p.dot(s.a,f(s.a),O);q.curve(d);q.dot(s.a,d(s.a),O);q.line(-2.5,0,2.5,0,G,1);
    return {svg:`<div class="paired-plots"><h3>原函数：橙线表示切线</h3>${p.finish('原函数上的移动切线').replaceAll('plot-clip','function-original')}<h3>导函数：同一位置的高度表示斜率</h3>${q.finish('导函数的高度对应切线斜率').replaceAll('plot-clip','function-derivative')}</div>`,metrics:[metric('位置 a',s.a),metric('函数高度 f(a)',f(s.a)),metric('切线斜率 f′(a)',d(s.a))],note:'导函数的纵坐标记录斜率，和原函数高度不是同一个量。负导数表示向右下降，绝对值大才表示更陡；导数为 0 只说明切线水平，例如 x³ 在 0 处并无极值。正弦求导的推导在基本求导公式中继续。'};
  }};


  const span3dModes=[
    {name:'零子空间：只有原点',vectors:[[0,0,0],[0,0,0],[0,0,0]],dimension:0,kind:'zero'},
    {name:'一条直线：三个向量共线',vectors:[[1,0,0],[2,0,0],[-1,0,0]],dimension:1,kind:'line'},
    {name:'一个平面：第三个向量冗余',vectors:[[1,0,0],[0,1,0],[1,1,0]],dimension:2,kind:'plane'},
    {name:'整个三维空间：三个独立方向',vectors:[[1,0,0],[0,1,0],[1,1,1]],dimension:3,kind:'space'}
  ];
  const finiteNumber=(v,fallback)=>Number.isFinite(Number(v))?Number(v):fallback;
  function span3dModel(input={}){
    const index=Math.max(0,Math.min(3,Math.round(finiteNumber(input.mode,0)))),mode=span3dModes[index];
    const coefficients=['s','t','r'].map(k=>Math.max(-1,Math.min(1,finiteNumber(input[k],.5))));
    const point=mode.vectors.reduce((sum,v,i)=>add(sum,mul(v,coefficients[i])),[0,0,0]);
    return {mode:index,name:mode.name,vectors:mode.vectors.map(v=>v.slice()),coefficients,point,dimension:mode.dimension,kind:mode.kind};
  }
  function spanSvg(model,yaw,pitch){
    const ay=finiteNumber(yaw,-40)*Math.PI/180,ap=Math.max(-70,Math.min(70,finiteNumber(pitch,25)))*Math.PI/180;
    const scale=model.kind==='line'?31:38;
    const project=q=>{const x=q[0]*Math.cos(ay)-q[1]*Math.sin(ay),y=q[0]*Math.sin(ay)+q[1]*Math.cos(ay);return [270+scale*x,180-scale*(q[2]*Math.cos(ap)-y*Math.sin(ap))];};
    const xy=q=>project(q).map(x=>x.toFixed(2)).join(',');
    const line=(a,b,color,width=1,dash='')=>'<path d="M'+xy(a)+' L'+xy(b)+'" stroke="'+color+'" stroke-width="'+width+'" '+(dash?'stroke-dasharray="'+dash+'"':'')+' fill="none"/>';
    const arrow=(v,color,label,offset=0)=>{
      const a=project([0,0,0]),b=project(v),angle=Math.atan2(b[1]-a[1],b[0]-a[0]),head=8;
      let out='';
      if(Math.hypot(...v)>1e-12){out=line([0,0,0],v,color,2.7);
        if(Math.hypot(b[0]-a[0],b[1]-a[1])>2)out+='<path d="M'+(b[0]-head*Math.cos(angle-.45)).toFixed(2)+','+(b[1]-head*Math.sin(angle-.45)).toFixed(2)+' L'+b[0].toFixed(2)+','+b[1].toFixed(2)+' L'+(b[0]-head*Math.cos(angle+.45)).toFixed(2)+','+(b[1]-head*Math.sin(angle+.45)).toFixed(2)+'" stroke="'+color+'" stroke-width="2" fill="none"/>';
      }
      return out+'<text x="'+(b[0]+7).toFixed(2)+'" y="'+(b[1]-8+offset).toFixed(2)+'" fill="'+color+'" font-size="12">'+esc(label)+'</text>';
    };
    const bound=2,vertices=Array.from({length:8},(_,i)=>[0,1,2].map(k=>(i&(1<<k))?bound:-bound));
    const polygon=(points,color,opacity)=>'<polygon points="'+points.map(xy).join(' ')+'" fill="'+color+'" fill-opacity="'+opacity+'" stroke="'+color+'" stroke-opacity=".3"/>';
    let svg='<svg viewBox="0 0 540 380" role="img" aria-label="三维向量的张成集合"><title>三维向量、线性组合与张成集合</title><rect width="540" height="380" fill="white"/>';
    if(model.kind==='space')for(const face of [[vertices[0],vertices[1],vertices[3],vertices[2]],[vertices[4],vertices[5],vertices[7],vertices[6]],[vertices[0],vertices[1],vertices[5],vertices[4]]]){
      svg+=polygon(face,B,.06);
    }
    for(let i=0;i<8;i++)for(let k=0;k<3;k++){const j=i^(1<<k);if(j>i)svg+=line(vertices[i],vertices[j],'#dce4ef');}
    if(model.kind==='plane'){svg+=polygon([[-2,-2,0],[2,-2,0],[2,2,0],[-2,2,0]],B,.13);for(let k=-2;k<=2;k++)svg+=line([-2,k,0],[2,k,0],'#b3c7e7')+line([k,-2,0],[k,2,0],'#b3c7e7');}
    if(model.kind==='line')svg+=line([-4.5,0,0],[4.5,0,0],'#a8cbbd',7);
    for(let k=0;k<3;k++){const a=[0,0,0],b=[0,0,0];a[k]=-2.2;b[k]=2.25;svg+=line(a,b,'#718096');const q=project(b);svg+='<text x="'+(q[0]+5).toFixed(2)+'" y="'+(q[1]+4).toFixed(2)+'" fill="#435570" font-size="13">'+['x','y','z'][k]+'</text>';}
    const colors=[O,G,V];
    if(model.kind!=='zero')model.vectors.forEach((v,i)=>{svg+=arrow(v,colors[i],['u','v','w'][i]);});
    svg+=arrow(model.point,B,'p',18);
    const pp=project(model.point);svg+='<circle cx="'+pp[0].toFixed(2)+'" cy="'+pp[1].toFixed(2)+'" r="4.5" fill="'+B+'" stroke="white" stroke-width="2"/>';
    svg+='<text x="18" y="25" fill="'+G+'" font-size="14">'+esc(model.name)+'；维数 '+model.dimension+'</text>';
    svg+='<text x="18" y="333" fill="#556579" font-size="12">正交投影；空间朝向可能在屏幕上重合，请改变视角观察。</text><text x="18" y="355" fill="#556579" font-size="12">灰框是 [−2,2]³ 参考盒，组合点可在盒外；张成集合没有盒边界。</text></svg>';
    return svg;
  }
  window.BOOK_MODELS.span3d=span3dModel;
  labs.linearSpan3d={title:'三维张成：从一个点到整个空间',hint:'调节系数，观察组合点怎样留在张成集合中。先读向量坐标，再转动视角；屏幕投影重合不等于空间向量共线。',legend:['蓝：组合点 p 与张成平面','橙：u','绿：v；紫箭头为 w'],controls:[choice('mode','方向组模式',span3dModes.map(m=>m.name)),control('s','系数 s',-1,1,.25,.5),control('t','系数 t',-1,1,.25,.5),control('r','系数 r',-1,1,.25,.5),control('yaw','水平视角（度）',-180,180,5,-40),control('pitch','俯视角（度）',-70,70,5,25)],render:s=>{
    const m=span3dModel(s),vec=v=>'('+v.map(x=>fmt(x)).join(', ')+')',texVec=v=>'\\begin{pmatrix}'+v.join('\\\\')+'\\end{pmatrix}';
    const note=[
      'u、v、w 全为零。任何实数系数都只得到原点，所以维数为 0。零向量没有非零方向，图中只标组合点。',
      'v=2u，w=−u，组合为 (s+2t−r)u。三个系数只调节一个独立方向，真实张成是整条 x 轴。',
      'w=u+v，组合为 (s+r)u+(t+r)v。三个向量两两不共线，整组仍然相关；第三个向量没有增加离开 z=0 平面的方向。',
      '第三向量的 z 分量为 1。对任意目标 (a,b,c)，取 r=c、s=a−c、t=b−c 就能达到，所以张成整个 R³。'
    ][m.mode];
    return {svg:spanSvg(m,s.yaw,s.pitch),formula:'\\begin{gathered}u='+texVec(m.vectors[0])+',\\quad v='+texVec(m.vectors[1])+',\\quad w='+texVec(m.vectors[2])+'\\\\p=su+tv+rw\\end{gathered}',metrics:[metric('张成维数',m.dimension),metric('当前 p',vec(m.point)),metric('当前系数 (s,t,r)',vec(m.coefficients))],note:note+' 滑块只给有限示例，张成定义允许系数取所有实数；转动视角不改变代数结论。'};
  }};
  function basisModel(input={}){
    const k=Math.max(-2,Math.min(2,finiteNumber(input.k,0))),h=Math.max(-2,Math.min(2,finiteNumber(input.h,0))),x=Math.max(-2,Math.min(2,finiteNumber(input.x,0))),y=Math.max(-2,Math.min(2,finiteNumber(input.y,0)));
    const base={k,h,x,y,B:[[1,k],[0,h]],vector:[x,y],b1:[1,0],b2:[k,h]};
    if(h!==0){const c2=y/h,c1=x-k*c2;return {...base,kind:'unique',coordinates:[c1,c2],representatives:[[c1,c2]]};}
    if(y!==0)return {...base,kind:'empty',coordinates:null,representatives:[]};
    return {...base,kind:'infinite',coordinates:null,representatives:[[x,0],[x-k,1]],direction:[-k,1]};
  }
  window.BOOK_MODELS.basisCoordinates=basisModel;
  function basisPlots(m){
    const extent=m.kind==='unique'?Math.max(3,Math.abs(m.coordinates[0])+1,Math.abs(m.coordinates[1])+1):Math.max(3,Math.abs(m.x-m.k)+1);
    const p=new Plot(-3.2,3.2,-3.2,3.2,'标准坐标 x₁','标准坐标 x₂',true,1),q=new Plot(-extent,extent,-extent,extent,'系数 c₁','系数 c₂',true,Math.max(1,Math.ceil(extent/3)));
    if(m.h!==0){
      for(let n=-4;n<=4;n++){
        const a=add(mul(m.b1,n),mul(m.b2,-4)),b=add(mul(m.b1,n),mul(m.b2,4));p.line(...a,...b,'#bccde1',1,'3 3');
        const c=add(mul(m.b2,n),mul(m.b1,-10)),d=add(mul(m.b2,n),mul(m.b1,10));p.line(...c,...d,'#bccde1',1,'3 3');
      }
    }else p.line(p.x0,0,p.x1,0,'#9ebfae',6);
    const basis=[m.b1,m.b2],colors=[O,G];
    basis.forEach((v,i)=>{if(Math.hypot(...v)>1e-12)p.arrow(0,0,v[0],v[1],colors[i]);else p.dot(0,0,colors[i],4,true);p.textPixel(170+i*165,19,'b'+(i+1)+'=('+v.map(x=>fmt(x)).join(',')+')',colors[i]);});
    if(Math.hypot(...m.vector)>1e-12)p.arrow(0,0,m.x,m.y,B);
    p.dot(m.x,m.y,B,4);p.text(m.x,m.y,'目标 x',B);
    if(m.kind==='unique'){
      q.line(m.coordinates[0],0,m.coordinates[0],m.coordinates[1],B,1,'4 3');q.line(0,m.coordinates[1],m.coordinates[0],m.coordinates[1],B,1,'4 3');q.dot(...m.coordinates,B,5);q.text(...m.coordinates,'[x]B',B);
      q.textPixel(145,19,'蓝点是坐标，不是被移动后的实际向量',B,'start',11);
    }
    if(m.kind==='infinite'){
      const tMax=extent*3;
      q.line(m.x+m.k*tMax,-tMax,m.x-m.k*tMax,tMax,V,2.6);
      m.representatives.forEach((c,i)=>{q.dot(...c,i?G:O,4);q.text(...c,i?'另一组系数':'一组系数',i?G:O);});
      q.textPixel(145,19,'整条 c₁+k c₂=x₁ 都映到同一个目标',V,'start',11);
    }
    if(m.kind==='empty')q.textPixel(145,19,'目标 x₂≠0：没有满足 Bc=x 的点',O,'start',11);
    return '<div class="paired-plots"><h3>实际平面：目标保持不变，斜网格来自所选方向</h3>'+p.finish('实际向量与基方向，改变基不会移动目标向量').replaceAll('plot-clip','basis-actual')+'<h3>系数平面：寻找满足 Bc=x 的全部坐标</h3>'+q.finish('系数平面中的唯一坐标、全部表示或无表示').replaceAll('plot-clip','basis-coordinates')+'</div>';
  }
  labs.linearBasisCoordinates={title:'更换基：向量没移动，坐标为什么改变',hint:'固定目标的两个标准坐标，只改变 k、h。左图蓝箭头不动，右图系数改变；h=0 时这两个方向不再构成平面的一组基。',legend:['蓝：目标及唯一坐标','橙：b₁','绿：b₂；紫线为不唯一表示'],controls:[control('k','b₂ 的横分量 k',-2,2,.5,1),control('h','b₂ 的竖分量 h',-2,2,.5,1),control('x','目标标准坐标 x₁',-2,2,.5,1),control('y','目标标准坐标 x₂',-2,2,.5,1)],render:s=>{
    const m=basisModel(s),unique=m.kind==='unique',kindText={unique:'唯一基坐标',empty:'无法表示',infinite:'无穷多组表示'}[m.kind];
    const formula='B=\\begin{pmatrix}1&'+fmt(m.k)+'\\\\0&'+fmt(m.h)+'\\end{pmatrix},\\quad B\\begin{pmatrix}c_1\\\\c_2\\end{pmatrix}=\\begin{pmatrix}'+fmt(m.x)+'\\\\'+fmt(m.y)+'\\end{pmatrix}';
    return {svg:basisPlots(m),formula,metrics:[metric('表示状态',kindText),metric('唯一坐标 c₁',unique?m.coordinates[0]:'不存在唯一坐标'),metric('唯一坐标 c₂',unique?m.coordinates[1]:'不存在唯一坐标')],note:unique?'h≠0，第二行先得 c₂=x₂/h='+fmt(m.coordinates[1])+'，第一行再得 c₁=x₁−kc₂='+fmt(m.coordinates[0])+'。代回组合恢复左图同一支蓝箭头。右图为容纳坐标自动调节刻度，不应把两图屏幕长度直接比较。':m.kind==='empty'?'h=0 时两个方向只能张成 x 轴，目标的竖分量非零，所以没有任何组合系数。此时它们不是平面的一组基；右图不画不存在的坐标点。':'h=0 且目标在 x 轴，c₂可任取 t，c₁=x₁−kt。右图紫线上每一点都表示左图同一支目标箭头；两种示例系数并不是两个实际向量。此时不能称为唯一的基坐标。'};
  }};

})();
