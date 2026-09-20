/* SVG 数学实验：数值与图形共用同一参数，不用像素距离代替数学计算。 */
(() => {
  'use strict';
  const blue='#245cc5',orange='#ae4c13',green='#147557',grey='#67778a';
  const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const fmt=(n,d=4)=>!Number.isFinite(n)?'未定义':n!==0&&Math.abs(n)<10**(-d)?n.toExponential(3):Number(n.toFixed(d)).toString();
  const control=(key,label,min,max,step,value)=>({key,label,min,max,step,value});
  const choice=(key,label,options,value=0)=>({...control(key,label,0,options.length-1,1,value),options});
  const metric=(label,value)=>[label,typeof value==='number'?fmt(value):value];
  const seq=(a,b,n=160)=>Array.from({length:n+1},(_,i)=>a+(b-a)*i/n);
  class Plot {
    constructor(x0=-3,x1=3,y0=-2,y1=5,xlabel='x',ylabel='y',equal=false,tickStep=null){
      if(equal){
        const unitsPerPixel=Math.max((x1-x0)/460,(y1-y0)/252),cx=(x0+x1)/2,cy=(y0+y1)/2;
        x0=cx-230*unitsPerPixel;x1=cx+230*unitsPerPixel;y0=cy-126*unitsPerPixel;y1=cy+126*unitsPerPixel;
      }
      Object.assign(this,{x0,x1,y0,y1});this.parts=[];
      this.x=v=>54+(v-x0)/(x1-x0)*460;this.y=v=>284-(v-y0)/(y1-y0)*252;
      this.parts.push('<defs><clipPath id="plot-clip"><rect x="54" y="32" width="460" height="252"/></clipPath></defs>');
      if(tickStep>0){
        for(let x=Math.ceil(x0/tickStep)*tickStep;x<=x1;x+=tickStep){
          this.parts.push(`<path d="M${this.x(x)},32 V284" stroke="#e8edf4" fill="none"/>`);
          this.textPixel(this.x(x),305,fmt(x,2),grey,'middle',11);
        }
        for(let y=Math.ceil(y0/tickStep)*tickStep;y<=y1;y+=tickStep){
          this.parts.push(`<path d="M54,${this.y(y)} H514" stroke="#e8edf4" fill="none"/>`);
          this.textPixel(45,this.y(y)+4,fmt(y,2),grey,'end',11);
        }
      }else for(let i=0;i<=5;i++){
        const x=x0+(x1-x0)*i/5,y=y0+(y1-y0)*i/5;
        this.parts.push(`<path d="M${this.x(x)},32 V284 M54,${this.y(y)} H514" stroke="#e8edf4" fill="none"/>`);
        this.textPixel(this.x(x),305,fmt(x,2),grey,'middle',11);this.textPixel(45,this.y(y)+4,fmt(y,2),grey,'end',11);
      }
      if(x0<=0&&x1>=0)this.line(0,y0,0,y1,'#b2bfd0',1);
      if(y0<=0&&y1>=0)this.line(x0,0,x1,0,'#b2bfd0',1);
      this.textPixel(513,325,xlabel,grey,'end',12);this.textPixel(16,19,ylabel,grey,'start',12);
    }
    add(s){this.parts.push(s);return this;}
    line(x1,y1,x2,y2,color=blue,width=2,dash=''){
      return this.add(`<path clip-path="url(#plot-clip)" d="M${this.x(x1)},${this.y(y1)} L${this.x(x2)},${this.y(y2)}" stroke="${color}" stroke-width="${width}" ${dash?`stroke-dasharray="${dash}"`:''} fill="none"/>`);
    }
    curve(f,color=blue,a=this.x0,b=this.x1,dash='',samples=240){
      let path='',pen=false;
      for(const x of seq(a,b,samples)){const y=f(x);if(!Number.isFinite(y)||Math.abs(y)>1e7){pen=false;continue;}path+=`${pen?'L':'M'}${this.x(x).toFixed(2)},${this.y(y).toFixed(2)} `;pen=true;}
      return this.add(`<path clip-path="url(#plot-clip)" d="${path}" stroke="${color}" stroke-width="2.6" fill="none" ${dash?`stroke-dasharray="${dash}"`:''}/>`);
    }
    poly(points,color=blue,opacity=.14,stroke='none'){
      return this.add(`<polygon clip-path="url(#plot-clip)" points="${points.map(([x,y])=>`${this.x(x)},${this.y(y)}`).join(' ')}" fill="${color}" fill-opacity="${opacity}" stroke="${stroke}"/>`);
    }
    area(f,a,b,color=blue){return this.poly([[a,0],...seq(a,b,100).map(x=>[x,f(x)]),[b,0]],color);}
    rect(a,b,c,d,color=green,opacity=.12){return this.poly([[a,c],[b,c],[b,d],[a,d]],color,opacity);}
    dot(x,y,color=blue,r=4,hollow=false){return this.add(`<circle clip-path="url(#plot-clip)" cx="${this.x(x)}" cy="${this.y(y)}" r="${r}" fill="${hollow?'white':color}" stroke="${color}" stroke-width="2"/>`);}
    textPixel(x,y,t,color=grey,anchor='start',size=12){return this.add(`<text x="${x}" y="${y}" fill="${color}" text-anchor="${anchor}" font-size="${size}" font-family="system-ui, sans-serif">${esc(t)}</text>`);}
    text(x,y,t,color=grey){return this.textPixel(this.x(x)+6,this.y(y)-9,t,color);}
    arrow(x,y,dx,dy,color=orange){
      this.line(x,y,x+dx,y+dy,color,2.5);
      const px=this.x(x+dx),py=this.y(y+dy),angle=Math.atan2(py-this.y(y),px-this.x(x));
      return this.add(`<path clip-path="url(#plot-clip)" d="M${px-9*Math.cos(angle-.45)},${py-9*Math.sin(angle-.45)} L${px},${py} L${px-9*Math.cos(angle+.45)},${py-9*Math.sin(angle+.45)}" stroke="${color}" stroke-width="2" fill="none"/>`);
    }
    circle(x,y,r,color=blue,fill=false){
      return this.add(`<ellipse clip-path="url(#plot-clip)" cx="${this.x(x)}" cy="${this.y(y)}" rx="${r*460/(this.x1-this.x0)}" ry="${r*252/(this.y1-this.y0)}" fill="${fill?color:'none'}" fill-opacity=".1" stroke="${color}" stroke-width="1.6"/>`);
    }
    finish(title){return `<svg viewBox="0 0 540 336" role="img" aria-label="${esc(title)}"><title>${esc(title)}</title>${this.parts.join('')}</svg>`;}
  }
  function result(p,title,metrics,note){return {svg:p.finish(title),metrics,note,bounds:{x:[p.x0,p.x1],y:[p.y0,p.y1]},scale:[460/(p.x1-p.x0),252/(p.y1-p.y0)]};}
  const labs={};
  labs.function={title:'让公式中的每个参数动起来',hint:'先拖 h 找顶点，再改变 a；最后移动 x，读出对应的函数值。',controls:[control('a','开口系数 a',-2,2,.1,1),control('h','水平位置 h',-2,2,.1,0),control('k','竖直位置 k',-2,2,.1,0),control('x','观察输入 x',-3,3,.1,1)],render:s=>{
    const f=x=>s.a*(x-s.h)**2+s.k,y=f(s.x),p=new Plot(-4,4,Math.min(-5,y-2),Math.max(8,y+2));p.curve(f);if(s.a!==0){p.dot(s.h,s.k,green);p.text(s.h,s.k,'顶点',green);}p.line(s.x,0,s.x,y,orange,2,'5 4');p.dot(s.x,y,orange);
    return result(p,'抛物线的平移、伸缩与函数取值',[metric('输入 x',s.x),metric('输出 f(x)',y)],s.a===0?'a=0 时图像退化为水平直线；此时没有唯一顶点。':`顶点在 (${fmt(s.h)}, ${fmt(s.k)})。橙点记录输入 ${fmt(s.x)} 对应的输出 ${fmt(y)}。`);
  }};
  labs.radian={title:'弧长与竖直高度不是同一个量',hint:'把角度缩小，比较橙色圆弧与绿色竖直线。坐标按相同比例显示。',controls:[control('theta','圆心角 θ（弧度）',.05,1.5,.01,.7)],render:s=>{
    const t=s.theta,p=new Plot(-1.65,1.65,-.4,1.408,'x / r','y / r');p.circle(0,0,1,grey);p.line(0,0,1,0,blue);p.line(0,0,Math.cos(t),Math.sin(t),blue);const pts=seq(0,t,60).map(a=>[Math.cos(a),Math.sin(a)]);for(let i=1;i<pts.length;i++)p.line(...pts[i-1],...pts[i],orange,4);p.line(Math.cos(t),0,Math.cos(t),Math.sin(t),green,3);p.dot(Math.cos(t),Math.sin(t));
    return result(p,'单位圆中圆弧长度与正弦高度',[metric('弧长 θ',t),metric('sin θ / θ',Math.sin(t)/t)],`单位圆弧长是 ${fmt(t)}，竖直高度是 ${fmt(Math.sin(t))}。比值接近 1 不代表两者在非零角度下完全相等。`);
  }};
  labs.sequence={title:'调窄误差带，看门槛向后移动',hint:'绿色带表示允许误差；虚线右边的全部项都要在带内。图只画有限项，文字证明管住整个尾部。',controls:[control('epsilon','允许误差 ε',.02,.5,.01,.15),control('mode','数列：0 为 1/n，1 为交错，2 为常数零',0,2,1,0)],render:s=>{
    const N=Math.floor(1/s.epsilon)+1,max=Math.max(35,N+15),p=new Plot(0,max,-.55,1.1,'n','aₙ');p.rect(0,max,-s.epsilon,s.epsilon,green);p.line(0,0,max,0,green);p.line(N,-.55,N,1.1,orange,2,'5 4');p.text(N,.9,'N='+N,orange);for(let n=1;n<=max;n++)p.dot(n,s.mode===2?0:(s.mode===1?(-1)**n:1)/n,n>N?green:blue,2.5);
    return result(p,'数列点与 epsilon 误差带',[metric('一个可用的 N',N),metric('带的半宽 ε',s.epsilon)],s.mode===2?'常数零数列每项都等于极限。任取 N 都可以；画出的 N 只是一个可用选择。':`n>${N} 时，1/n<${fmt(s.epsilon)}。交错数列虽然左右摆动，误差绝对值仍为 1/n。`);
  }};
  labs.limit={title:'输出精度决定输入窗口',hint:'先缩小 ε，再改动中心点函数值；看绿色目标高度是否随单点变化。',controls:[control('epsilon','输出误差 ε',.1,1.5,.05,.6),control('center','单独指定 f(1)',1,5,.1,3)],render:s=>{
    const d=s.epsilon/2,p=new Plot(0,2,0,6);p.rect(0,2,3-s.epsilon,3+s.epsilon,green);p.rect(1-d,1+d,0,6,blue,.09);p.curve(x=>2*x+1);p.line(0,3,2,3,green,1.5,'5 4');p.dot(1,3,blue,5,true);p.dot(1,s.center,orange,4);p.text(1,s.center,'f(1)',orange);
    return result(p,'函数极限中的输入窗口与输出误差带',[metric('选择 δ=ε/2',d),metric('附近的极限 L','3')],`蓝色窗口内（去掉 x=1），输出都在绿带内。当前 f(1)=${fmt(s.center)}，${s.center===3?'恰好等于极限，所以连续':'不等于极限，因此在 1 处有可去间断'}。`);
  }};
  labs.continuity={title:'让两个空心点与实心点对齐',hint:'b 决定右极限，c 决定点值。尝试只改 c，能否修好一个跳跃？',controls:[control('b','右侧截距 b',-1,3,.1,2),control('c','中心点值 c',-1,3,.1,1)],render:s=>{
    const p=new Plot(-1.5,1.5,-1.5,5);p.curve(x=>x+1,blue,-1.5,0);p.curve(x=>2*x+s.b,green,0,1.5);p.dot(0,1,blue,5,true);p.dot(0,s.b,green,5,true);p.dot(0,s.c,orange,3);
    const continuous=s.b===1&&s.c===1;return result(p,'分段函数的左右极限与函数值',[metric('左极限','1'),metric('右极限',s.b)],continuous?'左右极限与点值都等于 1，函数在 0 连续。':s.b!==1?'左右空心点高度不同，双侧极限不存在；仅改变中心点值无法消除跳跃。':'左右极限相等，但中心点不在共同目标上；把 c 调成 1 即可修复。');
  }};
  labs.sinc={title:'比值接近 1，误差仍然存在',hint:'缩小 x，比较 sin x / x 与三阶误差。x 不取零，避免把极限误当除以零。',controls:[control('x','观察位置 x',.02,1.5,.01,.8)],render:s=>{
    const p=new Plot(-1.6,1.6,-1.6,1.6);p.curve(Math.sin);p.curve(x=>x,green);p.line(s.x,Math.sin(s.x),s.x,s.x,orange,4);p.dot(s.x,Math.sin(s.x));
    return result(p,'sin x 与 x 的局部比较',[metric('sin x / x',Math.sin(s.x)/s.x),metric('(sin x − x) / x³',(Math.sin(s.x)-s.x)/s.x**3)],`绿色直线 y=x 与蓝色正弦之间仍有差。把 x 缩小，比值趋于 1，而三阶误差的比值趋于 −1/6≈−0.1667。`);
  }};
  const derivativeControls=[control('a','观察位置 a',-.8,1.8,.1,1),control('h','增量 h（取 0 时仅显示极限）',-1,1,.01,.6)];
  function derivativePlot(s,isDifferential){
    const a=s.a,h=s.h,f=x=>x*x,m=2*a+h,p=new Plot(-2,3,-2,8);p.curve(f);p.curve(x=>a*a+2*a*(x-a),green);if(h!==0)p.curve(x=>a*a+m*(x-a),orange,-2,3,'6 4');p.dot(a,a*a,green);p.dot(a+h,f(a+h),orange);p.line(a,a*a,a+h,a*a,orange,2,'4 3');p.line(a+h,a*a,a+h,f(a+h),orange,3);
    if(Math.abs(h)>.15){p.textPixel(p.x(a+h/2),p.y(a*a)+18,'Δx = h',orange,'middle',11);p.text(a+h,(a*a+f(a+h))/2,'Δy',orange);}
    if(isDifferential){p.dot(a+h,a*a+2*a*h,green);return result(p,'曲线真实增量与切线预测的差',[metric('真实 Δy',2*a*h+h*h),metric('线性 dy',2*a*h)],`误差 Δy−dy=h²=${fmt(h*h)}。${h===0?'此时增量为零，两点重合。':'把 h 的绝对值减半，误差将变为原来的四分之一。'}`);}
    return result(p,'割线趋于切线的导数实验',[metric('割线斜率',h===0?'0/0 未定义':m),metric('切线斜率 2a',2*a)],h===0?'h=0 时差商没有定义。绿色切线由极限值 2a 绘制，不能说它是把 h=0 代入差商得到的。':`橙色三角形的横边 h=${fmt(h)}，竖边 Δy=${fmt(2*a*h+h*h)}。斜率为 2a+h，与切线斜率相差 ${fmt(h)}。`);
  }
  labs.derivative={title:'割线怎样变成切线',hint:'先固定 a，把 h 从左右两侧推向零；再改变 a，比较各点的切线。',controls:derivativeControls,render:s=>derivativePlot(s,false)};
  labs.differential={title:'曲线给真实值，切线给预测值',hint:'橙点在曲线上，绿点在切线上。把 |h| 缩小，观察两点之间的误差。',controls:derivativeControls,render:s=>derivativePlot(s,true)};
  labs.cusp={title:'两边都接上了，斜率却对不上',hint:'缩短取样距离，左右割线斜率仍然保持不同。',controls:[control('h','两侧取样距离 |h|',.02,1.5,.02,.6)],render:s=>{
    const p=new Plot(-2,2,-.3,2.5);p.curve(Math.abs);p.line(0,0,-s.h,s.h,orange,4);p.line(0,0,s.h,s.h,green,4);p.dot(-s.h,s.h,orange);p.dot(s.h,s.h,green);
    return result(p,'绝对值函数的尖点',[metric('左差商','−1'),metric('右差商','1')],'两点都趋向原点，所以连续；但两侧差商不趋于同一个数，所以不可导。');
  }};
  labs.chain={title:'跟踪 x → u → y 的增量',hint:'观察点固定在 x=0.5；调小 h，让有限变化率接近两层导数的乘积。',controls:[control('h','输入增量 h',.01,.5,.01,.2)],render:s=>{
    const x=.5,u=2.5,du=3*s.h,dy=(u+du)**2-u*u,p=new Plot(0,1.2,0,22);p.curve(t=>(3*t+1)**2);p.dot(x,u*u,green);p.dot(x+s.h,(u+du)**2,orange);p.line(x,u*u,x+s.h,u*u,orange);p.line(x+s.h,u*u,x+s.h,(u+du)**2,orange);
    return result(p,'复合函数 (3x+1)² 的变化',[metric('实际 Δy / h',dy/s.h),metric('导数 2u × 3','15')],`x 增加 ${fmt(s.h)} → u 增加 ${fmt(du)} → y 增加 ${fmt(dy)}。一阶预测是 15h=${fmt(15*s.h)}，多出的 9h²=${fmt(9*s.h*s.h)} 在差商极限中消失。`);
  }};
  labs.mvt={title:'找到与割线平行的切线',hint:'对 x² 改变右端点 b，绿色切点 ξ 会自动移动。',controls:[control('b','右端点 b（左端固定为 0）',.4,3,.1,2)],render:s=>{
    const b=s.b,xi=b/2,p=new Plot(-.3,3.3,-1,10);p.curve(x=>x*x);p.line(0,0,b,b*b,orange,3);p.curve(x=>xi*xi+b*(x-xi),green);p.dot(xi,xi*xi,green);p.text(xi,xi*xi,'ξ='+fmt(xi),green);
    return result(p,'中值定理的平行切线',[metric('平均斜率',b),metric('ξ=b/2',xi)],`在区间 [0,${fmt(b)}] 上，割线斜率是 ${fmt(b)}。ξ=${fmt(xi)} 处的导数 2ξ 也等于 ${fmt(b)}，两条线平行。`);
  }};
  const factorial=n=>{let f=1;for(let k=2;k<=n;k++)f*=k;return f;};
  const expPoly=(x,n)=>seq(0,n,n||1).slice(0,n+1).reduce((sum,_,k)=>sum+x**k/factorial(k),0);
  labs.taylor={title:'增加阶数，比较近似与余项',hint:'蓝线是 eˣ，橙线是原点处的泰勒多项式；绿色竖段标出观察点的误差。',controls:[control('n','多项式阶数 n',0,8,1,2),control('x','观察位置 x',-2,2,.05,1)],render:s=>{
    const p=new Plot(-2,2,-1,8),approx=expPoly(s.x,s.n),actual=Math.exp(s.x);p.curve(Math.exp);p.curve(x=>expPoly(x,s.n),orange);p.line(s.x,approx,s.x,actual,green,4);p.dot(s.x,actual);
    return result(p,'指数函数与泰勒多项式',[metric('多项式值',approx),metric('绝对误差',Math.abs(actual-approx))],`在 x=${fmt(s.x)}，真实值 eˣ=${fmt(actual)}。可用误差上界 e^{|x|}|x|^{n+1}/(n+1)!=${fmt(Math.exp(Math.abs(s.x))*Math.abs(s.x)**(s.n+1)/factorial(s.n+1))}；这是上界，不是实际误差。`);
  }};
  labs.extrema={title:'同一点上比较高度、坡度和坡度变化',hint:'移动观察点，注意 f′ 变号的位置与 f″ 变号的位置不同。',controls:[control('x','观察位置 x',-2,2,.05,0)],render:s=>{
    const p=new Plot(-2.2,2.2,-4,12),x=s.x,y=x**3-3*x,d=3*x*x-3;p.curve(t=>t**3-3*t);p.curve(t=>3*t*t-3,orange);p.dot(x,y);p.dot(x,d,orange);p.line(x-.3,y-.3*d,x+.3,y+.3*d,green,3);p.dot(-1,2,green);p.dot(1,-2,green);
    return result(p,'三次函数与其导函数',[metric('f′(x)：上升或下降',d),metric('f″(x)：坡度变化',6*x)],`蓝线是 f，橙线是 f′。当前${d>0?'函数上升':d<0?'函数下降':'位于驻点'}；${x>0?'坡度递增，向上弯':x<0?'坡度递减，向下弯':'在拐点，二阶导数左右变号'}。`);
  }};
  labs.primitive={title:'上下平移，不改变坡度',hint:'拖动 C，看看每条原函数在 x=1 处的短切线是否仍平行。',controls:[control('c','积分常数 C',-3,3,.1,1)],render:s=>{
    const p=new Plot(-2,2,-4,7);for(const c of [-2,0,2])p.curve(x=>x*x+c,'#b7c6de');p.curve(x=>x*x+s.c);p.curve(x=>2*x,orange);p.line(.6,1+s.c-.8,1.4,1+s.c+.8,green,3);p.dot(1,1+s.c,green);
    return result(p,'原函数族 x²+C 与共同导函数 2x',[metric('F(1)=1+C',1+s.c),metric('F′(1)','2')],'蓝线是 F=x²+C，灰线是同族的其他曲线，橙线是共同导函数 2x。C 改变高度，却不改变任何点的坡度。');
  }};
  labs.substitution={title:'坐标换了，累计量保持相同',hint:'改变积分上限 b，比较 x 坐标下的 2x·x² 和 u 坐标下的 u。两块着色面积相等。',controls:[control('b','原变量上限 b',.2,1.4,.05,1)],render:s=>{
    const p=new Plot(0,2,0,6,'x 或 u','被积函数'),b=s.b;p.area(x=>2*x**3,0,b,blue);p.area(u=>u,0,b*b,orange);p.curve(x=>2*x**3);p.curve(u=>u,orange);p.line(b,0,b,2*b**3,blue,1,'4 4');p.line(b*b,0,b*b,b*b,orange,1,'4 4');
    return result(p,'换元前后被积函数与相等面积',[metric('原积分 ∫₀ᵇ 2x³ dx',b**4/2),metric('新积分 ∫₀ᵇ² u du',b**4/2)],`设 u=x²，du=2x dx。蓝色区域的上限 b=${fmt(b)}，橙色区域的上限 b²=${fmt(b*b)}；高度和横轴含义不同，但累计值相同。`);
  }};
  labs.parts={title:'乘积变化分成两部分累计',hint:'改变上限 b；两块面积相加恰好等于端点乘积 b³。',controls:[control('b','上限 b',.2,1.5,.05,1)],render:s=>{
    const b=s.b,p=new Plot(0,1.6,0,7);p.area(x=>2*x*x,0,b,blue);p.poly([...seq(0,b).map(x=>[x,2*x*x]),...seq(b,0).map(x=>[x,3*x*x])],orange,.18);p.curve(x=>2*x*x);p.curve(x=>3*x*x,orange);
    return result(p,'乘积微分中的两项累计',[metric('∫ u dv = 2b³/3',2*b**3/3),metric('∫ v du = b³/3',b**3/3)],`本例 u=x、v=x²。蓝色面积与其上方橙色带之和为 b³=${fmt(b**3)}，正好等于 [uv]₀ᵇ。`);
  }};
  labs.riemann={title:'自己把面积切得更细',hint:'试试左端、右端与中点取样。看数值误差，而不只看矩形是否够密。',controls:[control('n','矩形个数 n',2,80,1,8),control('sample','取样：0 左端，1 中点，2 右端',0,2,1,2)],render:s=>{
    const p=new Plot(0,1.1,0,1.2),n=s.n;let sum=0;for(let i=0;i<n;i++){const h=((i+s.sample/2)/n)**2;sum+=h/n;p.rect(i/n,(i+1)/n,0,h,orange,.25);p.line(i/n,h,(i+1)/n,h,orange,1);}p.curve(x=>x*x);p.area(x=>x*x,0,1,blue);
    return result(p,'x² 在零到一上的黎曼矩形和',[metric('矩形和',sum),metric('与 1/3 的差',sum-1/3)],`每个矩形宽度为 1/${n}。当前${['左端','中点','右端'][s.sample]}取样得到 ${fmt(sum)}，精确积分为 1/3≈0.3333。`);
  }};
  labs.ftc={title:'上限向前一点，累计增加多少',hint:'蓝线是 f(x)=x²，橙线是累计函数 A(x)=x³/3；绿线是 A 在当前点的切线。',controls:[control('x','移动上限 x',.1,2,.05,1)],render:s=>{
    const p=new Plot(0,2.2,0,5),x=s.x;p.area(t=>t*t,0,x,blue);p.curve(t=>t*t);p.curve(t=>t**3/3,orange);p.line(x-.3,x**3/3-.3*x*x,x+.3,x**3/3+.3*x*x,green,3);p.dot(x,x*x,blue);p.dot(x,x**3/3,orange);
    return result(p,'被积函数高度与累计函数坡度的对应',[metric('累计量 A(x)',x**3/3),metric('累计的导数 A′(x)',x*x)],`上限为 ${fmt(x)} 时，蓝色高度 f(x)=${fmt(x*x)}，恰好等于橙色累计曲线的切线斜率。累计量本身为 ${fmt(x**3/3)}，并不等于高度。`);
  }};
  labs.improper={title:'有限窗口之外，还有多少尾部',hint:'先固定 p，再把截断上限 B 推大；然后比较 p=1 与 p>1。',controls:[control('p','衰减指数 p',.5,3,.1,2),control('b','截断上限 B',2,40,1,8)],render:s=>{
    const b=s.b,pow=s.p,p=new Plot(1,Math.max(10,b),0,1.15),val=Math.abs(pow-1)<1e-9?Math.log(b):(b**(1-pow)-1)/(1-pow);p.area(x=>x**(-pow),1,b);p.curve(x=>x**(-pow));p.line(b,0,b,b**(-pow),orange,3);
    return result(p,'幂函数尾部的反常积分',[metric('已累计到 B',val),metric('无限累计',pow>1?fmt(1/(pow-1)):'发散')],pow>1?`还有未计入的尾部 B^(1−p)/(p−1)=${fmt(b**(1-pow)/(pow-1))}。曲线在当前窗口很低，不代表尾部恰好为零。`:'p≤1 时，累计量没有有限极限。把 B 推大只观察有限证据，发散结论仍来自极限计算。');
  }};
  labs.volume={title:'一片圆盘的半径和面积',hint:'蓝色三角区域绕 x 轴旋转成圆锥。图示为纵向剖面，橙色竖段是当前圆盘的直径。',controls:[control('x','薄片位置 x',.05,1,.05,.6)],render:s=>{
    const p=new Plot(-.1,1.2,-1.1,1.1),x=s.x;p.poly([[0,0],[1,1],[1,-1]],blue,.1);p.line(0,0,1,1);p.line(0,0,1,-1);p.line(1,-1,1,1);p.line(x,-x,x,x,orange,5);p.line(0,0,1.2,0,green,1,'4 4');
    return result(p,'绕 x 轴旋转的圆锥纵剖面',[metric('截面积 πx²',Math.PI*x*x),metric('累计到 x 的体积',Math.PI*x**3/3)],`当前半径 R=x=${fmt(x)}。厚度为 dx 的圆盘体积主项是 ${fmt(Math.PI*x*x)} dx。整个圆锥体积为 π/3。剖面三角形面积不是体积。`);
  }};
  function contour(p,f){
    const levels=[.5,1,2,3,4,6,8];
    // Marching squares: linearly interpolate each cell edge at a fixed height.
    const n=35;
    for(const level of levels)for(let i=0;i<n;i++)for(let j=0;j<n;j++){
      const x=p.x0+(p.x1-p.x0)*i/n,y=p.y0+(p.y1-p.y0)*j/n,dx=(p.x1-p.x0)/n,dy=(p.y1-p.y0)/n;
      const corners=[[x,y],[x+dx,y],[x+dx,y+dy],[x,y+dy]],hits=[];
      for(let e=0;e<4;e++){const a=corners[e],b=corners[(e+1)%4],fa=f(...a)-level,fb=f(...b)-level;if((fa<0)!==(fb<0)){const t=fa/(fa-fb);hits.push([a[0]+t*(b[0]-a[0]),a[1]+t*(b[1]-a[1])]);}}
      if(hits.length===2)p.line(...hits[0],...hits[1],'#9fb8df',1.2);
    }
  }
  labs.partial={title:'等高线上的真实变化与线性预测',hint:'固定起点 (1,1)，分别改变 dx、dy，再同时改变它们。等高线越向外，高度越高。',controls:[control('dx','x 方向增量 dx',-.7,.7,.05,.3),control('dy','y 方向增量 dy',-.7,.7,.05,.2)],render:s=>{
    const p=new Plot(-.2,2.2,-.2,2.2),x=1+s.dx,y=1+s.dy,actual=x*x+y*y-2,linear=2*s.dx+2*s.dy;contour(p,(x,y)=>x*x+y*y);p.dot(1,1,green);p.arrow(1,1,s.dx,s.dy,orange);p.dot(x,y,orange);
    return result(p,'抛物面等高线与两方向的增量',[metric('真实 Δz',actual),metric('全微分 dz',linear)],`从 (1,1) 走到 (${fmt(x)},${fmt(y)})。误差为 dx²+dy²=${fmt(s.dx*s.dx+s.dy*s.dy)}；本图是高度的等高线投影。`);
  }};
  labs.gradient={title:'把行进方向对准梯度',hint:'箭头起点为 (1,1)。绿色是梯度，橙色是单位行进方向。',controls:[control('angle','行进方向角 θ（度）',0,360,5,45)],render:s=>{
    const p=new Plot(-.5,3,-.5,3,'x','y',true),t=s.angle*Math.PI/180;contour(p,(x,y)=>x*x+y*y);p.arrow(1,1,1.2,1.2,green);p.arrow(1,1,Math.cos(t),Math.sin(t),orange);p.dot(1,1);
    return result(p,'梯度与任意方向的夹角',[metric('方向导数',[135,315].includes(s.angle)?0:2*Math.cos(t)+2*Math.sin(t)),metric('最大可能值 2√2',2*Math.SQRT2)],'梯度 (2,2) 指向 45°。横纵坐标等比例显示；绿色箭头按比例缩短。同向增长最快，反向下降最快，垂直时方向导数精确为零；不会将三角函数浮点误差误报为实际变化。');
  }};
  labs.hessian={title:'同一驻点，从碗底变成马鞍',hint:'蓝色曲线是 y=0 的截面；橙色曲线是 x=0 的截面。横轴表示沿各方向离原点的距离。',controls:[control('c','y² 前的系数 c',-2,2,.1,1)],render:s=>{
    const p=new Plot(-2,2,-5,5,'截面参数 t','高度 z');p.curve(t=>t*t);p.curve(t=>s.c*t*t,orange);p.dot(0,0,green);
    return result(p,'x²+c y² 在两个坐标方向的截面',[metric('D=4c',4*s.c),metric('原点性质',s.c>0?'严格极小':s.c<0?'鞍点':'非严格极小')],s.c===0?'c=0 时二阶判别法失效。直接看原式 f=x²≥0，可知原点仍是非严格极小值点，沿 y 轴高度不变。':s.c>0?'原式是两个非负平方项之和；所有非零方向高度都增加，因此原点是严格极小值点。':'x 方向的高度增加，y 方向的高度减少；两条路径就足以否定极大与极小。');
  }};
  labs.double={title:'换扫描方向，区域保持不变',hint:'选择竖条或横条，再移动切片；观察端点由哪两条边界决定。',controls:[control('direction','方向：0 竖条，1 横条',0,1,1,0),control('t','切片位置',.05,.95,.05,.5)],render:s=>{
    const p=new Plot(-.1,1.2,-.1,1.2);p.poly([[0,0],[1,0],[1,1]],blue,.15,blue);if(s.direction===0)p.line(s.t,0,s.t,s.t,orange,5);else p.line(s.t,s.t,1,s.t,orange,5);
    return result(p,'三角积分域与内层积分限',[metric('内层下限',s.direction?s.t:0),metric('内层上限',s.direction?1:s.t)],s.direction?`固定 y=${fmt(s.t)}，横条从 x=y=${fmt(s.t)} 延伸到 x=1。外层 y 从 0 走到 1。`:`固定 x=${fmt(s.t)}，竖条从 y=0 延伸到 y=x=${fmt(s.t)}。外层 x 从 0 走到 1。`);
  }};
  labs.polar={title:'同样的角宽，在外圈扫得更多',hint:'保持 dr=0.15、dθ=0.25 弧度，向外移动小扇环。图中采用等比例坐标。',controls:[control('r','扇环内半径 r',.2,1.7,.05,.8),control('theta','起始角 θ（弧度）',0,5.5,.1,.6)],render:s=>{
    const p=new Plot(-4,4,-2.19,2.19),dr=.15,dt=.25,t=s.theta,r=s.r;p.circle(0,0,r,'#9fb8df');p.circle(0,0,r+dr,'#9fb8df');const pts=[...seq(t,t+dt,35).map(a=>[r*Math.cos(a),r*Math.sin(a)]),...seq(t+dt,t,35).map(a=>[(r+dr)*Math.cos(a),(r+dr)*Math.sin(a)])];p.poly(pts,orange,.45,orange);p.line(0,0,(r+dr)*Math.cos(t),(r+dr)*Math.sin(t),blue);p.line(0,0,(r+dr)*Math.cos(t+dt),(r+dr)*Math.sin(t+dt),blue);
    return result(p,'极坐标中小扇环的面积',[metric('微元主项 r dr dθ',r*dr*dt),metric('有限扇环精确面积',((r+dr)**2-r*r)*dt/2)],'橙色区域的弧边随半径变长。有限扇环比微元主项多出 ½dr²dθ；当 dr 缩小时，相对误差才趋于零。');
  }};
  labs.shell={title:'从平面剖面理解三维球壳',hint:'橙色环是薄球壳的中轴剖面，右侧计算的是三维体积。',controls:[control('r','球壳内半径 r',.2,1.6,.05,.8)],render:s=>{
    const p=new Plot(-3.5,3.5,-1.92,1.92),r=s.r,dr=.1;p.circle(0,0,r+dr,orange,true);p.circle(0,0,r,blue);p.line(0,0,r,0,blue,3);p.line(r,0,r+dr,0,orange,6);
    return result(p,'薄球壳的圆形剖面',[metric('体积主项 4πr²dr',4*Math.PI*r*r*dr),metric('球壳精确体积',4*Math.PI*((r+dr)**3-r**3)/3)],'剖面圆环用来定位 r 与 dr，不能把其平面面积当成球壳体积。这里固定 dr=0.1，体积随半径的平方快速增大。');
  }};
  labs.plane={title:'垂线投影给出最短距离',hint:'例子是竖直平面 x+y=1 的 z=0 截面。移动点 P，绿色点是垂足。',controls:[control('x','点 P 的 x 坐标',-1,3,.1,2),control('y','点 P 的 y 坐标',-1,3,.1,2)],render:s=>{
    const p=new Plot(-3.4,5,-1.4,3.2),d=(s.x+s.y-1)/2,fx=s.x-d,fy=s.y-d;p.curve(x=>1-x);p.line(s.x,s.y,fx,fy,orange,3,'4 3');p.dot(s.x,s.y,orange);p.dot(fx,fy,green);p.text(fx,fy,'垂足',green);
    return result(p,'点到平面距离的二维截面',[metric('分子 |x+y−1|',Math.abs(s.x+s.y-1)),metric('距离 /√2',Math.abs(s.x+s.y-1)/Math.SQRT2)],'平面法向量是 (1,1,0)，长度 √2。图中橙色虚线沿法向方向到达绿色垂足；距离公式把投影按向量长度归一化。');
  }};
  function field(p,type){for(let x=-1.5;x<=1.5;x+=.5)for(let y=-1.5;y<=1.5;y+=.5){if(x===0&&y===0)continue;p.arrow(x,y,.16*(type==='spin'?-y:x),.16*(type==='spin'?x:y),'#acbdd5');}}
  labs.line={title:'反向走一遍，质量不变，功变号',hint:'改变圆弧长度，并用方向开关比较同一条弧的两种走法。',controls:[control('angle','圆弧角度 α（弧度）',.2,6.28,.02,3.14),control('reverse','方向：0 逆时针，1 顺时针',0,1,1,0)],render:s=>{
    const p=new Plot(-3,3,-1.644,1.644),a=s.angle,sign=s.reverse?-1:1;field(p,'spin');const points=seq(0,a,100).map(t=>[Math.cos(t),Math.sin(t)]);for(let i=1;i<points.length;i++)p.line(...points[i-1],...points[i],blue,3);const t=a/2;p.arrow(Math.cos(t),Math.sin(t),-.35*sign*Math.sin(t),.35*sign*Math.cos(t),orange);
    return result(p,'旋转场中的有向单位圆弧',[metric('密度为 1 的质量',a),metric('场做的功',sign*a)],`弧长为 α=${fmt(a)}。${s.reverse?'顺时针反向经过同一段圆弧，功为负，但长度与质量不变。':'逆时针位移与旋转场同向，功等于弧长。'}`);
  }};
  labs.green={title:'环流密度乘面积，等于边界总功',hint:'图中场 F=(−y,x) 的环流密度恒为 2；调大圆盘，看总环流按面积增长。',controls:[control('r','圆盘半径 R',.3,1.5,.05,1)],render:s=>{
    const p=new Plot(-3,3,-1.644,1.644),r=s.r;field(p,'spin');p.circle(0,0,r,blue,true);p.arrow(r,0,0,.35,orange);p.arrow(0,r,-.35,0,orange);
    return result(p,'圆盘区域与正向边界的环流',[metric('区域面积 πR²',Math.PI*r*r),metric('边界环流 2πR²',2*Math.PI*r*r)],'橙色箭头表示逆时针正向，灰色箭头表示旋转场。内部每单位面积贡献 2，总环流因此为 2 倍面积。');
  }};
  labs.flux={title:'向外流动：球面通量与体内源相等',hint:'圆是球面的剖面；灰箭头表示 F=(x,y,z) 在 z=0 平面的分量。数值按整个三维球计算。',controls:[control('r','球半径 R',.3,1.5,.05,1)],render:s=>{
    const r=s.r,p=new Plot(-3,3,-1.644,1.644);field(p,'radial');p.circle(0,0,r,blue,true);for(const a of [0,Math.PI/2,Math.PI,3*Math.PI/2])p.arrow(r*Math.cos(a),r*Math.sin(a),.3*Math.cos(a),.3*Math.sin(a),orange);
    return result(p,'球面外法向与径向流场',[metric('球面通量 R×4πR²',4*Math.PI*r**3),metric('体内累计 3×体积',4*Math.PI*r**3)],'球面上 F·n=R，散度恒为 3。两种计算得到同一个量。这里是球的剖面示意，不是平面圆周通量。');
  }};
  labs.series={title:'看总和稳定，而不只看某项变小',hint:'先试 q=0.5，再试负公比与 q=1。蓝色离散点表示部分和。',controls:[control('q','公比 q',-.95,1.05,.05,.5),control('n','前 n 项',2,60,1,15)],render:s=>{
    let total=0;const vals=[];for(let k=0;k<s.n;k++){total+=s.q**k;vals.push(total);}const target=Math.abs(s.q)<1?1/(1-s.q):null,max=Math.max(2,...vals,target||0),p=new Plot(0,s.n,Math.min(0,...vals)-.2,max*1.12,'n','Sₙ');if(target!==null)p.line(0,target,s.n,target,green,2,'5 4');vals.forEach((v,i)=>p.dot(i+1,v,blue,2.5));
    return result(p,'几何级数的部分和序列',[metric('当前部分和 Sₙ',total),metric('无限和',target===null?'发散':fmt(target))],target===null?'当前公比绝对值不小于 1，几何级数不收敛。有限部分和始终能计算，并不代表存在无限和。':`尾部误差 |S−Sₙ|=${fmt(Math.abs(target-total))}。${s.q<0?'部分和在目标两侧交替摆动，仍可以收敛。':'各项虽小，真正需要稳定的是累计总和。'}`);
  }};
  const powerSum=(x,n)=>{let sum=0,term=1;for(let k=1;k<=n;k++){term*=x;sum+=term/k;}return sum;};
  labs.power={title:'靠近端点，收敛速度会改变',hint:'增加项数 n，再把观察点推向两端。x=1 没有有限的无限和。',controls:[control('n','部分和项数 n',1,100,1,12),control('x','观察位置 x',-1,1,.02,.8)],render:s=>{
    const p=new Plot(-1.05,1.05,-1,5);p.curve(x=>powerSum(x,s.n),orange,-1,1);p.curve(x=>-Math.log(1-x),blue,-1,.985);p.dot(s.x,powerSum(s.x,s.n),orange);const target=s.x===1?null:-Math.log(1-s.x);
    return result(p,'幂级数的有限部分和与和函数',[metric('有限部分和',powerSum(s.x,s.n)),metric('该点无限和',target===null?'发散':fmt(target))],s.x===1?'x=1 时成为调和级数；有限和持续增长。图上的橙色曲线存在，不能说明无限和也存在。':s.x===-1?'左端点交错收敛，和为 −ln 2。这里单独验证端点，不能只根据半径判断。':`区间内部的和为 −ln(1−x)。当前误差 ${fmt(Math.abs(powerSum(s.x,s.n)-target))}；越接近右端点，通常需要更多项。`);
  }};
  labs.fourier={title:'把奇次谐波逐个叠上去',hint:'观察平坦区如何形成，再看跳变附近的超调。绿色点标出间断处级数和为零。',controls:[control('n','参与叠加的奇次谐波数',1,35,1,4)],render:s=>{
    const f=x=>{let v=0;for(let k=0;k<s.n;k++)v+=Math.sin((2*k+1)*x)/(2*k+1);return 4*v/Math.PI;},p=new Plot(-Math.PI,Math.PI,-1.5,1.5);p.line(-Math.PI,-1,0,-1,blue,2,'5 4');p.line(0,1,Math.PI,1,blue,2,'5 4');p.curve(f,orange);p.dot(0,0,green);const peak=Math.max(...seq(0,Math.PI,1800).map(f));
    return result(p,'方波的傅里叶部分和',[metric('最高频率',2*s.n-1),metric('当前采样峰值（近似）',peak)],'蓝色虚线是目标方波，橙色是有限谐波叠加。增加项数时波纹挤向跳变处，超调峰值不会趋于 1。');
  }};
  function slopeField(p,slope){for(let t=0;t<=5;t+=.4)for(let y=0;y<=5;y+=.5){const m=slope(t,y),dx=.09/Math.sqrt(1+m*m),dy=m*dx;p.line(t-dx,y-dy,t+dx,y+dy,'#adbed4',1.4);}}
  labs.ode={title:'让解曲线沿斜率场前进',hint:'灰色短线给定局部斜率；蓝色曲线由初值选定。改变增长率或初值。',controls:[control('k','比例增长率 k',-1,1,.05,.3),control('y0','初始值 y₀',0,3,.1,1)],render:s=>{
    const p=new Plot(0,5,0,5,'时间 t','y'),f=t=>s.y0*Math.exp(s.k*t);slopeField(p,(_,y)=>s.k*y);p.curve(f);p.dot(0,s.y0,orange);
    return result(p,'微分方程 y′=ky 的斜率场与特解',[metric('初始变化率 ky₀',s.k*s.y0),metric('t=2 时 y',f(2))],s.y0===0?'y₀=0 时整条解为零。这是分离变量时除以 y 容易丢掉的解。':`当前曲线在每一点与灰色短线的方向一致。${s.k>0?'增长超出窗口的部分仍继续存在。':s.k<0?'曲线逐渐靠近零，但有限时间内保持正值。':'k=0，所有解都保持初值不变。'}`);
  }};
  labs.linearode={title:'初值决定起点，输入决定平衡',hint:'固定损失系数为 1，改变输入 q 与初值 y₀。绿色虚线是平衡解。',controls:[control('q','恒定输入 q',0,4,.1,2),control('y0','初始值 y₀',0,5,.1,4)],render:s=>{
    const p=new Plot(0,5,0,5.5,'时间 t','y'),f=t=>s.q+(s.y0-s.q)*Math.exp(-t);slopeField(p,(_,y)=>s.q-y);p.line(0,s.q,5,s.q,green,2,'5 4');p.curve(f);p.dot(0,s.y0,orange);
    return result(p,'一阶线性方程的趋近平衡过程',[metric('平衡值',s.q),metric('t=2 时 y',f(2))],`解为 y=${fmt(s.q)}+(${fmt(s.y0-s.q)})e⁻ᵗ。初始值${s.y0>s.q?'高于':s.y0<s.q?'低于':'等于'}平衡值，因此曲线${s.y0>s.q?'下降':s.y0<s.q?'上升':'保持不变'}。`);
  }};
  function damped(t,z){
    if(Math.abs(z-1)<1e-8)return (1+t)*Math.exp(-t);
    if(z<1){const w=Math.sqrt(1-z*z);return Math.exp(-z*t)*(Math.cos(w*t)+z*Math.sin(w*t)/w);}
    const d=Math.sqrt(z*z-1),r1=-z+d,r2=-z-d;return (-r2*Math.exp(r1*t)+r1*Math.exp(r2*t))/(r1-r2);
  }
  labs.secondode={title:'同样的初值，不同的阻尼',hint:'初值始终是 y(0)=1、y′(0)=0。比较 ζ=0、ζ=1 和 ζ>1。',controls:[control('zeta','阻尼 ζ',0,2,.05,.25)],render:s=>{
    const z=s.zeta,p=new Plot(0,12,-1.2,1.2,'时间 t','位移 y');p.curve(t=>damped(t,z));p.line(0,0,12,0,green,1.5,'4 4');p.dot(0,1,orange);
    return result(p,'阻尼二阶方程的解曲线',[metric('阻尼类型',z<1?'欠阻尼':z===1?'临界阻尼':'过阻尼'),metric('t=4 时位移',damped(4,z))],z===0?'ζ=0 时没有衰减，解为 cos t。':z<1?'特征根有非零虚部，出现振荡；负实部使振幅衰减。':z===1?'重根 −1，解为 (1+t)e⁻ᵗ。第二个独立解必须带 t。':'两个特征根都是负实数，解由两种指数衰减叠加；当前初值下不越过平衡点。');
  }};
  labs.elementary={title:'每条公式都能用切线核验',hint:'先选函数，再切换导数或原函数。绿色短线的斜率对应另一个函数在同一横坐标的高度。',controls:[choice('family','选择函数',window.ELEMENTARY_FUNCTIONS.map(f=>f.label)),choice('view','观察关系',['求导：f 与 f′','积分：f 与原函数 F']),control('position','观察点在区间中的位置（%）',0,100,1,65)],render:s=>{
    const family=window.ELEMENTARY_FUNCTIONS[s.family],a=family.range[0],b=family.range[1],x=a+(b-a)*s.position/100,other=s.view?family.F:family.d;
    const values=seq(a,b).flatMap(t=>[family.f(t),other(t)]),lo=Math.min(0,...values),hi=Math.max(0,...values),margin=Math.max(.3,(hi-lo)*.12),p=new Plot(a,b,lo-margin,hi+margin);
    p.curve(family.f);p.curve(other,orange);p.dot(x,family.f(x),blue);p.dot(x,other(x),orange);
    const tangentHeight=s.view?family.F(x):family.f(x),slope=s.view?family.f(x):family.d(x),half=(b-a)*.08;
    p.line(x-half,tangentHeight-half*slope,x+half,tangentHeight+half*slope,green,3);
    return {...result(p,`${family.label}的${s.view?'原函数':'导函数'}图解`,[metric('观察点 x',x),metric(s.view?'F′(x)=f(x)':'f′(x)',slope)],`${family.domain} ${s.view?'积分视图取 C=0。橙线 F 的绿色切线斜率，等于蓝线 f 的高度。':'蓝线 f 的绿色切线斜率，等于橙线 f′ 的高度。'} 坐标范围随所选函数调整。`),formula:s.view?`\\int ${family.tex}\\,dx=${family.primitive}+C`:`(${family.tex})'=${family.derivative}`};
  }};
  labs.product={title:'两条细条是一阶，小角块是二阶',hint:'初始长 u=2、宽 v=1，随 x 改变时 u′=1、v′=2。把 h 缩小，比较主项和小角块。',controls:[control('h','输入增量 h',.01,.6,.01,.2)],render:s=>{
    const h=s.h,u=2,v=1,du=h,dv=2*h,p=new Plot(-.2,3,-.2,2.5,'长度 u','宽度 v',true);
    p.rect(0,u,0,v,blue,.22);p.rect(u,u+du,0,v,orange,.35);p.rect(0,u,v,v+dv,green,.25);p.rect(u,u+du,v,v+dv,'#9166ab',.45);
    p.text(.4,.5,'原面积 uv',blue);p.line(0,0,u+du,0,grey);p.line(0,0,0,v+dv,grey);
    return result(p,'乘积增量的两条细条与二阶角块',[metric('真实面积增加 Δ(uv)',5*h+2*h*h),metric('一阶预测 (u′v+uv′)h',5*h)],`橙色条面积为 h=${fmt(h)}，绿色条为 4h=${fmt(4*h)}，紫色角块为 2h²=${fmt(2*h*h)}。差商为 5+2h，h→0 时趋于 5。`);
  }};
  labs.implicit={title:'沿着圆走，跟踪切线方向',hint:'绿色线始终与半径垂直。试试 0° 和 180°，观察竖直切线。',controls:[control('angle','圆上位置角（度）',0,360,5,45)],render:s=>{
    const t=s.angle*Math.PI/180,x=[90,270].includes(s.angle)?0:Math.cos(t),y=[0,180,360].includes(s.angle)?0:Math.sin(t),vertical=y===0,p=new Plot(-1.3,1.3,-1.3,1.3,'x','y',true);
    p.circle(0,0,1,blue);p.line(0,0,x,y,orange);p.line(x+.8*y,y-.8*x,x-.8*y,y+.8*x,green,3);p.dot(x,y,blue);
    return result(p,'单位圆的隐函数斜率与竖直切线',[metric('切点 (x,y)',`(${fmt(x)}, ${fmt(y)})`),metric('dy/dx=−x/y',vertical?'无有限斜率':fmt(-x/y))],vertical?'此点 y=0，−x/y 不能计算，但绿色竖直切线存在。局部可改成 x 关于 y 的函数研究。':`在所选分支上，斜率为 ${fmt(-x/y)}。蓝色整个圆不是一个单值的 y=f(x)，本公式用于切点附近选定的分支。`);
  }};
  labs.lhopital={title:'两个函数不同，极限却可以相同',hint:'正常示例中让 x 靠近零；反例中把 x 推远，看原比值与导数比的区别。',controls:[choice('mode','比较示例',['sin x / x → 1','反例：(x+sin x)/x → 1']),control('position','观察位置（0 为起点，100 为终点）',0,100,1,50)],render:s=>{
    const counter=s.mode===1,a=counter?1:.005,b=counter?50:1.5,x=counter?a+(b-a)*s.position/100:b-(b-a)*s.position/100;
    const f=counter?t=>1+Math.sin(t)/t:t=>Math.sin(t)/t,g=counter?t=>1+Math.cos(t):Math.cos,p=new Plot(a,b,counter?-.15:0,counter?2.2:1.15);
    p.curve(f);p.curve(g,orange);p.line(a,1,b,1,green,1.5,'5 4');p.dot(x,f(x),blue);p.dot(x,g(x),orange);
    return result(p,'洛必达法则的函数比与导数比',[metric('原比值 f/g',f(x)),metric('导数比 f′/g′',g(x))],counter?`当前 x=${fmt(x)}。蓝线误差 |sin x/x|≤1/x，会趋于零；橙线 1+cos x 始终震荡。法则失效不意味着原极限不存在。`:`当前 x=${fmt(x)}。蓝线是 sin x/x，橙线是 cos x；在非零处并不相等，但 x→0 时共同趋向绿线 y=1。`);
  }};
  labs.curvature={title:'用同一比例观察抛物线与密切圆',hint:'移动切点。绿色圆与蓝色抛物线在切点附近贴合，橙色短线表示切线。',controls:[control('x','抛物线上的切点横坐标 x',-.8,.8,.05,0)],render:s=>{
    const x=s.x,y=x*x,d=2*x,K=2/(1+d*d)**1.5,r=1/K,cx=x-d*(1+d*d)/2,cy=y+(1+d*d)/2,p=new Plot(Math.min(-1.4,cx-r-.2),Math.max(1.4,cx+r+.2),-.3,cy+r+.3,'x','y',true);
    p.circle(cx,cy,r,green);p.curve(t=>t*t);p.dot(x,y,blue);p.line(x-.3,y-.3*d,x+.3,y+.3*d,orange,3);p.line(x,y,cx,cy,green,1,'4 4');p.dot(cx,cy,green,3);
    return result(p,'抛物线的曲率与密切圆',[metric('曲率 K',K),metric('半径 ρ=1/K',r)],`当前斜率 f′=${fmt(d)}。离开原点后 |斜率|增大，曲率反而减小。绿色圆心 (${fmt(cx)}, ${fmt(cy)}) 到切点的距离为 ${fmt(r)}。`);
  }};
  // 用有名称的选项替换离散数字滑块，避免把类别误解成连续数量。
  labs.sequence.controls[1]=choice('mode','数列类型',['1/n','(−1)ⁿ/n','常数零数列']);
  labs.riemann.controls[1]=choice('sample','矩形取样点',['左端点','中点','右端点'],2);
  labs.double.controls[0]=choice('direction','扫描方向',['竖条：先对 y 积分','横条：先对 x 积分']);
  labs.line.controls[1]=choice('reverse','沿同一圆弧的行进方向',['逆时针','顺时针']);
  labs.inverse={title:'交换坐标，观察反函数的对称',hint:'平方函数只取非负输入。移动蓝点，橙点把它的横、纵坐标交换；绿色虚线是 y=x。',controls:[control('a','原函数输入 a',0,2,.05,1.5)],render:s=>{
    const p=new Plot(-.3,4.3,-.3,4.3,'x','y',true),a=s.a;
    p.curve(x=>x*x,blue,0,2);p.curve(Math.sqrt,orange,0,4);p.line(0,0,4.2,4.2,green,1.5,'5 4');p.line(a,a*a,a*a,a,grey,1,'3 4');p.dot(a,a*a,blue);p.dot(a*a,a,orange);p.text(a,a*a,'(a, a²)',blue);p.text(a*a,a,'(a², a)',orange);
    const r=result(p,'非负半轴上的平方函数与平方根反函数',[metric('先平方 f(a)',a*a),metric('再开方 f⁻¹(f(a))',a)],`蓝点为 (${fmt(a)}, ${fmt(a*a)})，橙点为 (${fmt(a*a)}, ${fmt(a)})。非负限制保证 √(a²)=a；如果允许负输入，开方返回的是 |a|，便无法全部还原。`);r.formula=String.raw`f(x)=x^2\ (x\ge0),\qquad f^{-1}(x)=\sqrt{x}`;return r;
  }};
  labs.orders={title:'看函数的高度，也看相除后的比值',hint:'比较 α=c·xᵖ 与 β=x，只观察 x>0。先减小 x，再改变 p；判断比值是趋零、趋常数还是增大。',controls:[choice('power','指数 p',['1/2：比 x 消失得慢','1：与 x 同阶','2：比 x 消失得快'],2),control('c','系数 c',.5,3,.5,1),control('x','观察位置 x',.001,1,.001,.25)],render:s=>{
    const exponent=[.5,1,2][s.power],a=s.c*s.x**exponent,ratio=s.c*s.x**(exponent-1),p=new Plot(0,1.05,0,Math.max(1.2,s.c*1.1));
    p.curve(x=>s.c*x**exponent,blue,0,1);p.curve(x=>x,orange,0,1);p.dot(s.x,a,blue);p.dot(s.x,s.x,orange);p.line(s.x,s.x,s.x,a,green,2,'4 3');
    const relation=exponent>1?'比值趋于 0，α 是 β 的高阶无穷小。':exponent<1?'比值趋于正无穷，β 反而是 α 的高阶无穷小。':s.c===1?'比值恒为 1，两者等价（本例还完全相等）。':`比值恒为 ${fmt(s.c)}，两者同阶但不等价。`;
    const r=result(p,'幂次与无穷小相对消失速度',[metric('α=c·xᵖ',a),metric('α/β',ratio)],`当前 β=x=${fmt(s.x)}。固定 p 和 c，让 x→0⁺：${relation}滑块不取零，因为比值在零点是 0/0，极限不能由直接代入给出。`);r.formula=String.raw`\frac{c x^p}{x}=c x^{p-1}\quad(x>0)`;return r;
  }};
  labs.squeeze={title:'放大到原点：振荡被上下界一起夹住',hint:'缩小窗口半径，蓝色振荡仍存在，但 ±x² 的高度同时变小。图是有限采样；证明依赖 |sin|≤1。',controls:[control('radius','窗口半径 r',.02,1,.01,.5)],render:s=>{
    const r=s.radius,p=new Plot(-r,r,-1.2*r*r,1.2*r*r);
    p.curve(x=>x*x,green);p.curve(x=>-x*x,orange);p.curve(x=>x===0?0:x*x*Math.sin(1/x),blue,-r,r,'',1600);p.dot(0,0,blue,4,true);
    return result(p,'振荡函数与同时趋于零的上下界',[metric('窗口内 |f| 的统一上界',r*r),metric('窗口宽度',2*r)],`窗口纵轴也随之缩放，请看刻度：|x|≤${fmt(r)} 时，|x²sin(1/x)|≤${fmt(r*r)}。中心空心点不参与极限。若补定义 f(0)=0，函数就在原点连续。`);
  }};
  labs.ivt={title:'二分法：每一步都保留有根的区间',hint:'蓝线是 x³+x−1。调节二分次数，绿色带显示保留区间，橙点是中点近似，不是精确根。',controls:[control('n','二分次数 n',0,12,1,4)],render:s=>{
    const f=x=>x**3+x-1;let a=0,b=1;for(let i=0;i<s.n;i++){const m=(a+b)/2;if(f(m)<0)a=m;else b=m;}
    const m=(a+b)/2,p=new Plot(-.08,1.08,-1.2,1.2);p.rect(a,b,-1.2,1.2,green,.12);p.curve(f,blue,0,1);p.line(a,-1.2,a,1.2,green,1,'4 4');p.line(b,-1.2,b,1.2,green,1,'4 4');p.dot(m,f(m),orange);p.dot(a,f(a),green);p.dot(b,f(b),green);
    const r=result(p,'连续函数零点的二分包围区间',[metric('中点近似值',m),metric('绝对误差上界',(b-a)/2)],`第 ${s.n} 次二分后，根在 [${fmt(a,8)}, ${fmt(b,8)}] 内。中点 ${fmt(m,8)} 的误差≤${fmt((b-a)/2,8)}；图中函数单调递增使根唯一，但一般零点定理只保证至少一个。`);r.formula=String.raw`|m_n-\xi|\le\frac{b_0-a_0}{2^{n+1}}`;return r;
  }};
  labs.paths={title:'沿不同路线，看是否得到同一个目标',hint:'横轴 t>0 控制点沿路径靠近原点，纵轴是函数值，不是平面上的 y。切换反例，再比较蓝线和橙线。',controls:[choice('mode','要检查的函数',['xy/(x²+y²)：直线路径','x²y/(x⁴+y²)：直线与抛物线']),control('k','直线斜率 k',-2,2,.25,1),control('t','离原点的路径参数 t',.005,1,.005,.3)],render:s=>{
    const fn=t=>s.mode===0?s.k/(1+s.k*s.k):s.k===0?0:s.k*t/(t*t+s.k*s.k),reference=s.mode===0?0:.5,p=new Plot(0,1.05,-.6,.6,'路径参数 t','函数值');
    p.curve(fn,blue,.001,1);p.line(0,reference,1,reference,orange,2.5);p.dot(s.t,fn(s.t),blue);p.dot(s.t,reference,orange);p.dot(0,reference,orange,4,true);p.dot(0,s.mode===0?fn(s.t):0,blue,4,true);
    const note=s.mode===0?`蓝线沿 (t,kt)，值为 k/(1+k²)=${fmt(fn(s.t))}；橙线沿 (t,0)，值为 0。${s.k===0?'当前两条路重合，请把 k 改成 1：同样得到 0 的一条路径不能证明极限存在。':'当前两条路已给出不同极限，足以否定二元极限。'}`:`蓝线沿 (t,kt)，固定 k 时趋于 0；橙线沿 (t,t²)，恒为 1/2。每条固定直线都给出 0，却仍被抛物线路径否定。不能把“所有固定直线”误当“所有路径”。`;
    const r=result(p,'不同靠近路径上的函数值对照',[metric('直线 y=kx 上的值',fn(s.t)),metric(s.mode===0?'x 轴路径上的值':'抛物线 y=x² 上的值',reference)],note);r.formula=s.mode===0?String.raw`f(t,kt)=\frac{k}{1+k^2}`:String.raw`h(t,kt)=\frac{kt}{t^2+k^2},\quad h(t,t^2)=\frac12`;return r;
  }};
  window.CALCULUS_LABS={labs,fmt,esc,Plot,control,choice,metric,result};
})();
