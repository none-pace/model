(() => {
  const {labs,fmt,Plot,control,choice,metric,result}=window.CALCULUS_LABS,model=window.LINEAR_MODELS;
  const blue='#245cc5',orange='#ae4c13',green='#147557',grey='#67778a';
  const vt=v=>'('+v.map(x=>fmt(x)).join(', ')+')';
  const vector=(p,v,color)=>Math.hypot(...v)<1e-12?p.dot(0,0,color):p.arrow(0,0,...v,color);
  labs.linearSpan={title:'组合能到哪里：方向退化时会发生什么',hint:'先改变系数 s、t，再把 h 调为 0。蓝箭头是 u，橙箭头是 v，绿点是组合；浅色网格只显示部分组合。',legend:['蓝：u 与组合网格','橙：v 与平移后的分量','绿：组合结果 w'],controls:[control('s','沿 u 的系数 s',-2,2,.25,1),control('t','沿 v 的系数 t',-2,2,.25,1),control('h','v 的竖直分量 h',-2,2,.25,1)],render:s=>{
    const m=model.span(s),p=new Plot(-4.5,4.5,-4.5,4.5,'第一坐标','第二坐标',true);
    if(s.h!==0){for(let a=-2;a<=2;a+=.5){p.line(a-2,-2*s.h,a+2,2*s.h,'#bacbe4',1);p.line(-2+a,a*s.h,2+a,a*s.h,'#bacbe4',1);}}else p.line(p.x0,0,p.x1,0,blue,4);
    vector(p,m.u,blue);vector(p,m.v,orange);p.line(s.s,0,...m.w,orange,2,'5 4');p.line(0,0,s.s,0,blue,4);p.dot(...m.w,green,5);
    return result(p,'线性组合及张成退化',[['w=su+tv',vt(m.w)],metric('张成维数',m.dimension)],s.h===0?`h=0 时 u=v=(1,0)，所有组合都在横轴。当前 s+t=${fmt(s.s+s.t)}；换另一组和相同的系数，也会得到同一个绿点。`:`h=${fmt(s.h)}≠0，两方向无关，张成整个平面。浅色网格只画 −2≤s,t≤2 的一部分，不是整个张成的边界。当前 w=${vt(m.w)}。`);
  }};
  labs.linearMap={title:'跟着基向量，看整张网格如何变化',hint:'绿色虚线是原单位方格，蓝网格是变换后；橙向量 x 与蓝向量 Ax 使用同一标准坐标。切换 RS 与 SR，比较相同输入的结果。',legend:['蓝：变换后网格与 Ax','橙：输入 x','绿：原方格与基向量的像'],controls:[choice('mode','变换类型',model.presets.map(p=>p.name)),control('x','输入第一坐标 x₁',-2,2,.25,1),control('y','输入第二坐标 x₂',-2,2,.25,1)],render:s=>{
    const {A,name}=model.presets[s.mode],v=[s.x,s.y],w=model.mul(A,v),p=new Plot(-4.5,4.5,-4.5,4.5,'第一坐标','第二坐标',true);
    for(let a=-2;a<=2;a+=.5){p.line(...model.mul(A,[-2,a]),...model.mul(A,[2,a]),'#a9bedf',1);p.line(...model.mul(A,[a,-2]),...model.mul(A,[a,2]),'#a9bedf',1);}
    p.poly([[0,0],A.map(r=>r[0]),model.mul(A,[1,1]),A.map(r=>r[1])],blue,.12);
    for(const [a,b] of [[[0,0],[1,0]],[[1,0],[1,1]],[[1,1],[0,1]],[[0,1],[0,0]]])p.line(...a,...b,green,2,'5 4');
    vector(p,v,orange);vector(p,w,blue);p.dot(...A.map(r=>r[0]),green,3);p.dot(...A.map(r=>r[1]),green,3);
    const det=A[0][0]*A[1][1]-A[0][1]*A[1][0],r=result(p,'矩阵的列、单位方格与整体变换',[['输入 x',vt(v)],['输出 Ax',vt(w)],metric('有向面积倍率 det A',det)],`${name}：第一列 Ae₁=${vt(A.map(r=>r[0]))}，第二列 Ae₂=${vt(A.map(r=>r[1]))}。${det===0?'两列共线，整个平面压到横轴，丢失输入信息，因此不可逆。':'蓝色平行四边形面积是原单位方格的 '+fmt(Math.abs(det))+' 倍。有限网格不是定义域边界。'}`);
    r.formula=String.raw`A=\begin{pmatrix}${A[0][0]}&${A[0][1]}\\${A[1][0]}&${A[1][1]}\end{pmatrix}`;return r;
  }};
  labs.linearProjection={title:'投影与残差：最近点来自正交条件',hint:'改变直线方向和 v。蓝线是投影直线，橙向量是 v，绿向量是投影 p；虚线残差垂直于蓝线。两坐标轴等比例。',legend:['蓝：投影直线 span{u}','橙：原向量 v','绿：投影 p；虚线为残差'],controls:[control('angle','直线方向角（度）',0,180,5,45),control('x','v 的第一坐标',-3,3,.25,2),control('y','v 的第二坐标',-3,3,.25,0)],render:s=>{
    const m=model.projection(s),p=new Plot(-4.5,4.5,-4.5,4.5,'第一坐标','第二坐标',true),v=[s.x,s.y];p.line(-10*m.u[0],-10*m.u[1],10*m.u[0],10*m.u[1],blue,2);vector(p,v,orange);vector(p,m.p,green);p.line(...m.p,...v,grey,2,'5 4');p.dot(...m.p,green,4);
    if(m.distance>.3){const a=m.u.map(x=>.18*x),b=m.r.map(x=>.18*x/m.distance),o=m.p;p.line(o[0]+a[0],o[1]+a[1],o[0]+a[0]+b[0],o[1]+a[1]+b[1],grey,1);p.line(o[0]+a[0]+b[0],o[1]+a[1]+b[1],o[0]+b[0],o[1]+b[1],grey,1);}
    return result(p,'正交投影与垂直残差',[['投影 p',vt(m.p)],['残差 r',vt(m.r)],metric('距离 ‖r‖',m.distance)],`本实验 u 取单位长度，方向角为 ${s.angle}°，系数 c=${fmt(m.c)}。p+r=v；uᵀr 数学上为 0。${m.distance<1e-12?'v 已在直线上，残差为零。':'任取直线上另一点 q，距离平方增加 ‖p−q‖²，所以绿点是唯一最近点。'}正文公式也适用于非单位 u，不能漏掉分母 uᵀu。`);
  }};
  labs.linearSystems={title:'同一个方程组，分开看输入与输出',hint:'固定 h=0，将 d 从 0 改为非零，再令 h≠0。t 只在无穷多解时有效。两图各自等比例，但范围可能不同。',legend:['蓝：输入约束 / 输出可达集合','橙：第二条约束 / 输出目标 b','绿：取样解 / 第二列向量'],controls:[control('h','矩阵参数 h',-1.5,1.5,.25,0),control('d','目标高度 d',-1.5,1.5,.25,0),control('t','自由参数 t（仅 h=0,d=0）',-2,2,.25,.5)],render:s=>{
    const m=model.system(s),extent=Math.max(3,...(m.x||[]).map(x=>Math.abs(x)+1)),p=new Plot(-extent,extent,-extent,extent,'输入 x₁','输入 x₂',true),out=new Plot(-2,2,-2,2,'输出 b₁','输出 b₂',true);
    p.curve(x=>1-x,blue);if(s.h!==0)p.line(p.x0,s.d/s.h,p.x1,s.d/s.h,orange,2);else if(s.d===0)p.curve(x=>-x,grey,p.x0,p.x1,'5 4');
    if(m.x)p.dot(...m.x,green,5);
    if(s.h===0)out.line(out.x0,0,out.x1,0,blue,4);else out.rect(out.x0,out.x1,out.y0,out.y1,blue,.1);
    vector(out,[1,0],blue);vector(out,[1,s.h],green);out.dot(...m.b,orange,5);
    const note=!m.consistent?'第二行是 0=d，而 d≠0，输入解集为空；蓝线仅满足第一式，不是整个方程组的解。输出图中目标不在横轴上，所以不可达。':s.h===0?`输入解集为 x₁+x₂=1（蓝线），灰虚线 x₁+x₂=0 是零空间；绿点 ${vt(m.x)} 是一个解。输出可达集合为横轴，目标 (1,0) 在其上。两图中的直线不是同一集合。`:`h≠0，两列无关，整个二维输出空间均可达；输入约束交于唯一绿点 ${vt(m.x)}。没有自由参数，改变 t 不会改变解。`;
    const r=result(p,'输入解集与输出列空间分图',[metric('系数秩 r(A)',m.rank),metric('增广秩',m.augmentedRank),['解的情况',!m.consistent?'无解':m.dimension===0?'唯一解':'无穷多解，1 个自由变量']],note);
    r.svg='<div class="paired-plots"><h3>① 输入空间：固定 b，寻找所有 x</h3>'+p.finish('输入空间中的约束与解集').replaceAll('plot-clip','linear-input-clip')+'<h3>② 输出空间：哪些 b 能被生成</h3>'+out.finish('输出空间中的列空间与目标').replaceAll('plot-clip','linear-output-clip')+'</div>';
    r.formula=String.raw`A=\begin{pmatrix}1&1\\0&${s.h}\end{pmatrix},\quad b=\begin{pmatrix}1\\${s.d}\end{pmatrix}`;return r;
  }};
})();
