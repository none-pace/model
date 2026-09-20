// 同一份定义供公式表、图谱和数值实验使用；区间端点避开导数不存在的位置。
(() => {
  const R=String.raw;
  window.ELEMENTARY_FUNCTIONS=[
    {id:'cube',label:'幂函数 x³',f:x=>x**3,d:x=>3*x*x,F:x=>x**4/4,tex:R`x^3`,derivative:R`3x^2`,primitive:R`\frac{x^4}{4}`,domain:'全体实数；一般幂函数在其可导区间内求导。',range:[-2,2],point:1},
    {id:'exp',label:'指数 eˣ',f:Math.exp,d:Math.exp,F:Math.exp,tex:R`e^x`,derivative:R`e^x`,primitive:R`e^x`,domain:'全体实数。自然指数的高度恰好等于自身的斜率。',range:[-2,2],point:0},
    {id:'baseexp',label:'指数 2ˣ',f:x=>2**x,d:x=>Math.LN2*2**x,F:x=>2**x/Math.LN2,tex:R`2^x`,derivative:R`2^x\ln2`,primitive:R`\frac{2^x}{\ln2}`,domain:'全体实数。一般底数 a>0 且 a≠1，求导乘 ln a，积分除以 ln a。',range:[-2,2],point:0},
    {id:'log',label:'对数 ln x',f:Math.log,d:x=>1/x,F:x=>x*Math.log(x)-x,tex:R`\ln x`,derivative:R`\frac1x`,primitive:R`x\ln x-x`,domain:'x>0。对数函数的原函数需要分部积分。',range:[.2,3],point:1},
    {id:'sin',label:'正弦 sin x',f:Math.sin,d:Math.cos,F:x=>-Math.cos(x),tex:R`\sin x`,derivative:R`\cos x`,primitive:R`-\cos x`,domain:'全体实数，x 为弧度。负余弦求导后才回到正弦。',range:[-Math.PI,Math.PI],point:0},
    {id:'cos',label:'余弦 cos x',f:Math.cos,d:x=>-Math.sin(x),F:Math.sin,tex:R`\cos x`,derivative:R`-\sin x`,primitive:R`\sin x`,domain:'全体实数，x 为弧度。余弦求导有负号。',range:[-Math.PI,Math.PI],point:0},
    {id:'tan',label:'正切 tan x',f:Math.tan,d:x=>1/Math.cos(x)**2,F:x=>-Math.log(Math.abs(Math.cos(x))),tex:R`\tan x`,derivative:R`\frac1{\cos^2x}`,primitive:R`-\ln|\cos x|`,domain:'cos x≠0，在每个不跨越奇点的区间使用。实验取 −1.2≤x≤1.2。',range:[-1.2,1.2],point:0},
    {id:'reciprocal',label:'倒数 1/x',f:x=>1/x,d:x=>-1/x**2,F:x=>Math.log(Math.abs(x)),tex:R`\frac1x`,derivative:R`-\frac1{x^2}`,primitive:R`\ln|x|`,domain:'x≠0，不能跨过零点使用同一个连续区间。实验展示正半轴。',range:[.3,3],point:1},
    {id:'sqrt',label:'平方根 √x',f:Math.sqrt,d:x=>1/(2*Math.sqrt(x)),F:x=>2*x**1.5/3,tex:R`\sqrt{x}`,derivative:R`\frac1{2\sqrt{x}}`,primitive:R`\frac23x^{3/2}`,domain:'函数定义于 x≥0；这里的有限导数公式要求 x>0。',range:[.1,3],point:1},
    {id:'arctan',label:'反正切 arctan x',f:Math.atan,d:x=>1/(1+x*x),F:x=>x*Math.atan(x)-Math.log1p(x*x)/2,tex:R`\arctan x`,derivative:R`\frac1{1+x^2}`,primitive:R`x\arctan x-\frac12\ln(1+x^2)`,domain:'全体实数。arctan x 是反函数，不是 1/tan x。',range:[-2,2],point:0},
    {id:'arcsin',label:'反正弦 arcsin x',f:Math.asin,d:x=>1/Math.sqrt(1-x*x),F:x=>x*Math.asin(x)+Math.sqrt(1-x*x),tex:R`\arcsin x`,derivative:R`\frac1{\sqrt{1-x^2}}`,primitive:R`x\arcsin x+\sqrt{1-x^2}`,domain:'函数定义于 [−1,1]；有限导数公式用于 |x|<1。实验避开两端点。',range:[-.95,.95],point:0},
    {id:'constant',label:'常数 2',f:()=>2,d:()=>0,F:x=>2*x,tex:R`2`,derivative:R`0`,primitive:R`2x`,domain:'全体实数。常数的导数为零，但常数的积分是一次函数。',range:[-2,2],point:0}
  ];
})();
