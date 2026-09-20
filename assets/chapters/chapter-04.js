/* 不定积分：统一教材专题正文与实验。仅在本章容器内挂载控件。 */
window.COURSE_CHAPTERS=window.COURSE_CHAPTERS||{};
window.COURSE_CHAPTERS["chapter-04"]={html:"\n\n<div class=\"cover\">\n  <div class=\"eyebrow\">第四章 · 第一节</div>\n  <h1>不定积分</h1>\n  <p class=\"lead\">导数告诉你\"变化率\",不定积分把过程反过来--已知变化率,把原来的函数找回来。从凑微分到分部、从有理式到万能公式,14 道分级例题配 4 个交互演示,把求积这条路走通。学完它,定积分只是套个上下限。</p>\n  <div class=\"meta\">\n    <div class=\"m\"><b>约 90 分钟</b></div>\n    <div class=\"m\"><b>14 例题 · 10 练习</b></div>\n    <div class=\"m\"><b>4 个交互演示</b></div>\n  </div>\n</div>\n\n<h2 id=\"intro\"><span class=\"n\">01</span>从\"求导的逆运算\"说起</h2>\n<p>前面学导数,解决的是<b>\"已知函数,求变化率\"</b>:$F(x)\\xrightarrow{\\;d/dx\\;}F'(x)$。现实中常反过来--<b>已知变化率 $f(x)$,把原来的函数找回来</b>。这就是积分要干的事。</p>\n\n<div class=\"card tip\"><span class=\"tag\">动机</span>\n<p>已知自由落体的瞬时速度 $v(t)=gt$,问位移 $s(t)$ 是什么?既然 $s'(t)=v(t)=gt$,而 $(\\tfrac12 gt^2)'=gt$,所以 $s(t)=\\tfrac12 gt^2$。这就是\"由导数反推原函数\"。</p></div>\n\n<div class=\"card def\"><span class=\"tag\">定义 · 原函数</span>\n<p>设 $f(x)$ 在区间 $I$ 上有定义。若存在 $F(x)$ 使对一切 $x\\in I$ 都有</p>\n<p class=\"ka\">$$F'(x)=f(x)\\quad(\\text{即 } dF(x)=f(x)\\,dx)$$</p>\n<p>就称 $F(x)$ 是 $f(x)$ 在 $I$ 上的一个<b>原函数</b>。</p></div>\n\n<h3>原函数不唯一:差一个常数</h3>\n<p>若 $F$ 是 $f$ 的原函数,那么 $F+1$、$F-7$、$F+C$(任意常数)也都是--因为常数求导得 0。所以原函数<b>有无穷多个,彼此差一个常数</b>。这串\"全体原函数\"就是不定积分。</p>\n\n<div class=\"card def\"><span class=\"tag\">定义 · 不定积分</span>\n<p>$f(x)$ 的<b>全体原函数</b>叫 $f(x)$ 的<b>不定积分</b>,记</p>\n<p class=\"ka\">$$\\int f(x)\\,dx = F(x) + C,\\qquad F'(x)=f(x)$$</p>\n<p>$\\int$ 叫积分号,$f(x)$ 叫<b>被积函数</b>,$f(x)\\,dx$ 叫被积式,$x$ 叫积分变量,$C$ 叫<b>积分常数</b>(任意常数,不能漏!)。</p></div>\n\n<div class=\"note\"><b>为什么有 $C$?</b> 因为求导\"吃掉\"常数信息($(x^2+5)'=2x$ 和 $(x^2)'=2x$ 一样),反过来就找不回那个 5,只能记作 $+C$ 表示\"差一个未知常数\"。<b>全体原函数</b>= 一条曲线整体上下平移得到的一族曲线。</div>\n\n<div class=\"viz\">\n<div class=\"vt\">交互演示</div>\n<h4>原函数族:被积函数 vs 它的积分</h4>\n<p>下面取 $f(x)=\\cos x$,其原函数 $F(x)=\\sin x$。上图是原函数族 $F(x)+C$(淡蓝是不同 $C$ 的同族曲线,加粗的是当前 $C$),下图是被积函数 $f$。拖动看:<b>蓝曲线上任意点的切线斜率(绿),恰等于下图同位置 $f$ 的高度(青)</b>。这就是\"积分 = 求导的逆\"的几何含义。</p>\n<canvas id=\"cv1\" width=\"780\" height=\"270\"></canvas>\n<div class=\"ctrl\">\n  <label>常数 C = <span class=\"val\" id=\"v1c\">+0.00</span></label>\n  <input type=\"range\" id=\"s1c\" min=\"-10\" max=\"10\" value=\"0\" style=\"width:200px\">\n  <label>x₀ = <span class=\"val\" id=\"v1x\">0.00</span></label>\n  <input type=\"range\" id=\"s1x\" min=\"-30\" max=\"30\" value=\"0\" style=\"width:200px\">\n  <span class=\"val\" style=\"color:var(--ok)\">绿切线斜率 = f(x₀)</span>\n</div>\n<div class=\"note\">$C$ 平移整条曲线但不改变斜率--所以同一 $f$ 对应一族\"形状相同、上下错开\"的原函数,$+C$ 正是概括这一族。</div>\n</div>\n\n<h2 id=\"form\"><span class=\"n\">02</span>基本积分公式表</h2>\n<p>把<b>导数公式反过来</b>就是积分公式。右边是导数,左边是积分,一一对应:</p>\n<div class=\"card def\"><span class=\"tag\">基本积分公式(14 条)</span>\n<table>\n<tr><th>被积函数 $f(x)$</th><th>不定积分 $\\int f(x)\\,dx$</th><th>对应的导数公式</th></tr>\n<tr><td>$0$</td><td>$C$</td><td>$(C)'=0$</td></tr>\n<tr><td>$x^\\alpha\\;(\\alpha\\ne-1)$</td><td>$\\dfrac{x^{\\alpha+1}}{\\alpha+1}+C$</td><td>$(x^\\alpha)'=\\alpha x^{\\alpha-1}$</td></tr>\n<tr><td>$\\dfrac1x$</td><td>$\\ln|x|+C$</td><td>$(\\ln|x|)'=\\dfrac1x$</td></tr>\n<tr><td>$a^x$</td><td>$\\dfrac{a^x}{\\ln a}+C$</td><td>$(a^x)'=a^x\\ln a$</td></tr>\n<tr><td>$e^x$</td><td>$e^x+C$</td><td>$(e^x)'=e^x$</td></tr>\n<tr><td>$\\sin x$</td><td>$-\\cos x+C$</td><td>$(\\cos x)'=-\\sin x$</td></tr>\n<tr><td>$\\cos x$</td><td>$\\sin x+C$</td><td>$(\\sin x)'=\\cos x$</td></tr>\n<tr><td>$\\sec^2 x$</td><td>$\\tan x+C$</td><td>$(\\tan x)'=\\sec^2 x$</td></tr>\n<tr><td>$\\csc^2 x$</td><td>$-\\cot x+C$</td><td>$(\\cot x)'=-\\csc^2 x$</td></tr>\n<tr><td>$\\sec x\\tan x$</td><td>$\\sec x+C$</td><td>$(\\sec x)'=\\sec x\\tan x$</td></tr>\n<tr><td>$\\csc x\\cot x$</td><td>$-\\csc x+C$</td><td>$(\\csc x)'=-\\csc x\\cot x$</td></tr>\n<tr><td>$\\dfrac1{1+x^2}$</td><td>$\\arctan x+C$</td><td>$(\\arctan x)'=\\dfrac1{1+x^2}$</td></tr>\n<tr><td>$\\dfrac1{\\sqrt{1-x^2}}$</td><td>$\\arcsin x+C$</td><td>$(\\arcsin x)'=\\dfrac1{\\sqrt{1-x^2}}$</td></tr>\n</table></div>\n\n<div class=\"card tip\"><span class=\"tag\">常用补充公式(直接记,提速)</span>\n<table>\n<tr><th>被积函数</th><th>积分结果</th><th>记忆要点</th></tr>\n<tr><td>$\\tan x$</td><td>$-\\ln|\\cos x|+C=\\ln|\\sec x|+C$</td><td>凑 $\\cos x$</td></tr>\n<tr><td>$\\cot x$</td><td>$\\ln|\\sin x|+C$</td><td>凑 $\\sin x$</td></tr>\n<tr><td>$\\sec x$</td><td>$\\ln|\\sec x+\\tan x|+C$</td><td>经典结果</td></tr>\n<tr><td>$\\dfrac1{x^2+a^2}$</td><td>$\\dfrac1a\\arctan\\dfrac{x}{a}+C$</td><td>把 $x$ 缩成 $x/a$</td></tr>\n<tr><td>$\\dfrac1{x^2-a^2}$</td><td>$\\dfrac1{2a}\\ln\\left|\\dfrac{x-a}{x+a}\\right|+C$</td><td>部分分式拆</td></tr>\n<tr><td>$\\dfrac1{\\sqrt{a^2-x^2}}$</td><td>$\\arcsin\\dfrac{x}{a}+C$</td><td>$a>0$</td></tr>\n<tr><td>$\\dfrac1{\\sqrt{x^2\\pm a^2}}$</td><td>$\\ln\\!\\left|x+\\sqrt{x^2\\pm a^2}\\right|+C$</td><td>三角换元推得</td></tr>\n</table></div>\n\n<div class=\"note\"><b>检验技巧</b>:积分做得对不对?对结果<b>求导</b>,看是否回到被积函数。这是最可靠的自我检查,务必养成习惯。</div>\n\n<h2 id=\"prop\"><span class=\"n\">03</span>不定积分的性质</h2>\n<div class=\"card thm\"><span class=\"tag\">两条线性性质</span>\n<p><b>① 数乘</b>:$\\displaystyle\\int k\\,f(x)\\,dx=k\\int f(x)\\,dx$($k$ 为非零常数,可提到积分号外)。</p>\n<p><b>② 加减</b>:$\\displaystyle\\int\\bigl[f(x)\\pm g(x)\\bigr]dx=\\int f(x)\\,dx\\pm\\int g(x)\\,dx$。</p>\n<p>合起来即<b>线性</b>:$\\displaystyle\\int\\bigl[\\alpha f(x)+\\beta g(x)\\bigr]dx=\\alpha\\int f\\,dx+\\beta\\int g\\,dx$。</p></div>\n\n<div class=\"card thm\"><span class=\"tag\">积分与微分互为逆运算(核心)</span>\n<p>这是不定积分最本质的性质--<b>积分号 $\\int$ 与微分号 $d$ 互相抵消</b>:</p>\n<p class=\"ka\">$$\\bigl[\\,\\textstyle\\int f(x)\\,dx\\,\\bigr]'=f(x)\\quad\\Longleftrightarrow\\quad d\\!\\left[\\textstyle\\int f(x)\\,dx\\right]=f(x)\\,dx$$</p>\n<p class=\"ka\">$$\\int F'(x)\\,dx=F(x)+C\\quad\\Longleftrightarrow\\quad \\int dF(x)=F(x)+C$$</p>\n<p>前者\"先积后微\"还原出被积函数(只剩 $f$,无 $C$);后者\"先微后积\"还原出原函数但<b>要补 $C$</b>(因为求导丢了常数)。</p></div>\n\n<div class=\"card tip\"><span class=\"tag\">差一个 $C$ 的细节</span>\n<p>$d[\\int f\\,dx]=f\\,dx$ <b>没有 $C$</b>(微分抵消,常数被吸收);而 $\\int dF=F+C$ <b>有 $C$</b>。这里要分清:前者是恒等式,后者要补常数。</p></div>\n\n<h2 id=\"sub1\"><span class=\"n\">04</span>第一类换元法(凑微分,重点)</h2>\n<p>复合函数求导用链式法则:$[F(g(x))]'=F'(g(x))\\,g'(x)$。<b>反过来</b>就得到积分的凑微分法。</p>\n\n<div class=\"card thm\"><span class=\"tag\">定理 · 第一类换元(凑微分)</span>\n<p>若 $u=g(x)$ 可导,$f$ 有原函数,则</p>\n<p class=\"ka\">$$\\int f\\bigl(g(x)\\bigr)\\,g'(x)\\,dx \\;=\\; \\int f(u)\\,du\\;\\Big|_{u=g(x)}$$</p>\n<p>关键:把被积式里<b>凑出 $g'(x)\\,dx$ 当作 $du$</b>,内层 $g(x)$ 当作 $u$,积分变量由 $x$ 换成 $u$。</p></div>\n\n<div class=\"card tip\"><span class=\"tag\">怎么\"凑\"</span>\n<p>看被积函数是不是\"复合函数 × 某个因子\"的形式--那个因子恰好是内层的导数。</p>\n<p>例:$\\int 2x\\cos(x^2)\\,dx$。内层 $x^2$,它的导数 $2x$ 正好摆在那。令 $u=x^2$,$du=2x\\,dx$,原式 $=\\int\\cos u\\,du=\\sin u+C=\\sin(x^2)+C$。</p>\n<p>若因子差一个常数倍,提到积分号外即可:$\\int x\\cos(x^2)\\,dx=\\tfrac12\\int 2x\\cos(x^2)\\,dx=\\tfrac12\\sin(x^2)+C$。</p></div>\n\n<div class=\"note\"><b>凑微分 = 链式求导的逆</b>。看到 $\\int(\\text{外层函数})(\\text{内层导数})dx$,就把内层导数连同 $dx$ 当 $du$、内层当 $u$。这种识别内层函数与其微分的方法，经常用于积分计算。</div>\n\n<div class=\"viz\">\n<div class=\"vt\">交互演示</div>\n<h4>凑微分步骤演示</h4>\n<p>选一个积分,拖动\"步骤\"看怎么把 $du$ 从被积式里<b>识别</b>出来。蓝 = 内层 $u$,橙 = 微分 $du$ 部分。</p>\n<canvas id=\"cv2\" width=\"780\" height=\"250\"></canvas>\n<div class=\"ctrl\">\n  <label>积分 <select id=\"sel2\">\n    <option>∫ 2x·cos(x²) dx</option>\n    <option>∫ 2x/(1+x²) dx</option>\n    <option>∫ e^(3x) dx</option>\n    <option>∫ sin(2x) dx</option>\n  </select></label>\n  <label>步骤 = <span class=\"val\" id=\"vst2\">0</span></label>\n  <input type=\"range\" id=\"st2\" min=\"0\" max=\"4\" value=\"0\" style=\"width:220px\">\n  <span class=\"val\" style=\"color:var(--acc)\">蓝=u</span>\n  <span class=\"val\" style=\"color:var(--warn)\">橙=du</span>\n</div>\n<div class=\"note\">步骤 0 是原式;步骤 1 令 $u$;步骤 2 算 $du$(必要时把 $dx$ 换算);步骤 3 换元成 $\\int f(u)\\,du$;步骤 4 积出后回代。前两例 $du$ 系数恰为 1,后两例要补系数。</div>\n</div>\n\n<div class=\"card eg\"><span class=\"tag\">例 1 · 凑微分基础</span>\n<p>求 $\\displaystyle\\int 2x\\cos(x^2)\\,dx$。</p>\n<div class=\"step\"><span class=\"sn\">01</span>认出内层 $g(x)=x^2$,其导数 $g'(x)=2x$ 恰为另一因子。</div>\n<div class=\"step\"><span class=\"sn\">02</span>令 $u=x^2$,则 $du=2x\\,dx$。</div>\n<div class=\"step\"><span class=\"sn\">03</span>原式 $=\\int\\cos u\\,du$。</div>\n<div class=\"step\"><span class=\"sn\">04</span>$=\\sin u+C=\\sin(x^2)+C$。$\\blacksquare$</div></div>\n\n<div class=\"card eg\"><span class=\"tag\">例 2 · 凑微分(补系数)</span>\n<p>求 $\\displaystyle\\int\\sin(3x)\\,dx$。</p>\n<div class=\"step\"><span class=\"sn\">01</span>内层 $u=3x$,$du=3\\,dx$,故 $dx=\\dfrac{du}{3}$。</div>\n<div class=\"step\"><span class=\"sn\">02</span>原式 $=\\int\\sin u\\cdot\\dfrac{du}{3}=\\dfrac13\\int\\sin u\\,du$。</div>\n<div class=\"step\"><span class=\"sn\">03</span>$=-\\dfrac13\\cos u+C=-\\dfrac13\\cos(3x)+C$。$\\blacksquare$</div>\n<div class=\"note\">系数差个 3,提到积分号外即可。$\\sin(3x)$ 前的 $\\tfrac13$ 别漏。</div></div>\n\n<div class=\"card eg\"><span class=\"tag\">例 3 · 凑微分(对数型)</span>\n<p>求 $\\displaystyle\\int\\dfrac{x}{1+x^2}\\,dx$。</p>\n<div class=\"step\"><span class=\"sn\">01</span>分母 $1+x^2$ 是内层,导数 $2x$ 与分子 $x$ 差个 2。</div>\n<div class=\"step\"><span class=\"sn\">02</span>令 $u=1+x^2$,$du=2x\\,dx$,即 $x\\,dx=\\dfrac{du}{2}$。</div>\n<div class=\"step\"><span class=\"sn\">03</span>原式 $=\\dfrac12\\int\\dfrac{du}{u}=\\dfrac12\\ln|u|+C$。</div>\n<div class=\"step\"><span class=\"sn\">04</span>$=\\dfrac12\\ln(1+x^2)+C$(此处 $1+x^2>0$,绝对值可去)。$\\blacksquare$</div></div>\n\n<h2 id=\"sub2\"><span class=\"n\">05</span>第二类换元法(三角换元·根式换元)</h2>\n<p>凑微分是把被积式<b>往里塞</b>($x\\to u$);第二类换元反过来--<b>把 $x$ 整个换掉</b>($x=\\varphi(t)$),专门对付被积函数里\"卡着根号\"的情形。</p>\n\n<div class=\"card thm\"><span class=\"tag\">定理 · 第二类换元</span>\n<p>设 $x=\\varphi(t)$ 单调可导,$\\varphi'(t)\\ne0$,且 $f(\\varphi(t))\\varphi'(t)$ 有原函数 $G(t)$,则</p>\n<p class=\"ka\">$$\\int f(x)\\,dx=G(t)+C=G\\!\\left(\\varphi^{-1}(x)\\right)+C$$</p></div>\n\n<div class=\"card tip\"><span class=\"tag\">三角换元三件套(按根号形状选)</span>\n<table>\n<tr><th>被积函数含</th><th>换元</th><th>用途</th><th>辅助关系</th></tr>\n<tr><td>$\\sqrt{a^2-x^2}$</td><td>$x=a\\sin t$</td><td>化掉根号</td><td>$\\sqrt{a^2-x^2}=a\\cos t$</td></tr>\n<tr><td>$\\sqrt{a^2+x^2}$</td><td>$x=a\\tan t$</td><td>化掉根号</td><td>$\\sqrt{a^2+x^2}=a\\sec t$</td></tr>\n<tr><td>$\\sqrt{x^2-a^2}$</td><td>$x=a\\sec t$</td><td>化掉根号</td><td>$\\sqrt{x^2-a^2}=a\\tan t$</td></tr>\n</table>\n<p>记忆口诀:<b>\"一sin、二tan、三sec\"</b>--根号下 $a^2-x^2$(平方差)用 sin,$a^2+x^2$(平方和)用 tan,$x^2-a^2$ 用 sec。换元后取 $t\\in(-\\pi/2,\\pi/2)$ 以保证单调可逆。</p></div>\n\n<div class=\"card tip\"><span class=\"tag\">根式换元(整式根号)</span>\n<p>若被积式含 $\\sqrt[n]{ax+b}$,直接令 $t=\\sqrt[n]{ax+b}$,解出 $x$ 代回去,把无理式变有理式。对 $\\sqrt{a^2-x^2}$ 等平方根号则优先用三角换元。</p></div>\n\n<div class=\"viz\">\n<div class=\"vt\">交互演示</div>\n<h4>三角换元的几何(辅助三角形)</h4>\n<p>换元后回代时,常画一个<b>辅助直角三角形</b>读出各边。拖 $t$、切换类型,看三角形各边如何对应。绿角是参数 $t$。</p>\n<canvas id=\"cv3\" width=\"780\" height=\"290\"></canvas>\n<div class=\"ctrl\">\n  <label>换元类型 <select id=\"sel3\">\n    <option value=\"sin\">x = a sin t  (√(a²−x²))</option>\n    <option value=\"tan\">x = a tan t  (√(a²+x²))</option>\n    <option value=\"sec\">x = a sec t  (√(x²−a²))</option>\n  </select></label>\n  <label>t = <span class=\"val\" id=\"vst3\">0.60</span> rad</label>\n  <input type=\"range\" id=\"st3\" min=\"30\" max=\"130\" value=\"60\" style=\"width:220px\">\n  <span class=\"val\" style=\"color:var(--acc)\">a = 2</span>\n</div>\n<div class=\"note\">三边一旦读出,就能把 $\\sin t,\\cos t,\\tan t$ 用 $x$ 表出,完成回代。这是三角换元题的标准收尾动作。</div>\n</div>\n\n<div class=\"card eg\"><span class=\"tag\">例 4 · 三角换元(sin 型)</span>\n<p>求 $\\displaystyle\\int\\sqrt{1-x^2}\\,dx$。</p>\n<div class=\"step\"><span class=\"sn\">01</span>含 $\\sqrt{1-x^2}$,令 $x=\\sin t$($t\\in[-\\pi/2,\\pi/2]$),$dx=\\cos t\\,dt$,$\\sqrt{1-x^2}=\\cos t$。</div>\n<div class=\"step\"><span class=\"sn\">02</span>原式 $=\\int\\cos t\\cdot\\cos t\\,dt=\\int\\cos^2 t\\,dt$。</div>\n<div class=\"step\"><span class=\"sn\">03</span>降幂:$\\cos^2 t=\\dfrac{1+\\cos 2t}{2}$,故 $\\int\\cos^2 t\\,dt=\\dfrac{t}{2}+\\dfrac{\\sin 2t}{4}+C$。</div>\n<div class=\"step\"><span class=\"sn\">04</span>回代:$t=\\arcsin x$,$\\sin 2t=2\\sin t\\cos t=2x\\sqrt{1-x^2}$。</div>\n<div class=\"step\"><span class=\"sn\">05</span>$=\\dfrac12\\arcsin x+\\dfrac{x}{2}\\sqrt{1-x^2}+C$。$\\blacksquare$</div>\n<div class=\"note\">这结果是经典公式,务必记。$\\sin 2t$ 回代靠辅助三角形或二倍角公式。</div></div>\n\n<div class=\"card eg\"><span class=\"tag\">例 5 · 三角换元(tan 型)</span>\n<p>求 $\\displaystyle\\int\\dfrac{dx}{\\sqrt{x^2+1}}$。</p>\n<div class=\"step\"><span class=\"sn\">01</span>含 $\\sqrt{x^2+1}$,令 $x=\\tan t$,$dx=\\sec^2 t\\,dt$,$\\sqrt{x^2+1}=\\sec t$。</div>\n<div class=\"step\"><span class=\"sn\">02</span>原式 $=\\int\\dfrac{\\sec^2 t}{\\sec t}\\,dt=\\int\\sec t\\,dt$。</div>\n<div class=\"step\"><span class=\"sn\">03</span>用公式 $\\int\\sec t\\,dt=\\ln|\\sec t+\\tan t|+C$。</div>\n<div class=\"step\"><span class=\"sn\">04</span>回代:$\\tan t=x$,$\\sec t=\\sqrt{x^2+1}$。</div>\n<div class=\"step\"><span class=\"sn\">05</span>$=\\ln\\!\\left|x+\\sqrt{x^2+1}\\right|+C$。$\\blacksquare$</div></div>\n\n<div class=\"card eg\"><span class=\"tag\">例 6 · 根式换元</span>\n<p>求 $\\displaystyle\\int\\dfrac{dx}{1+\\sqrt{x}}$。</p>\n<div class=\"step\"><span class=\"sn\">01</span>令 $t=\\sqrt{x}$,则 $x=t^2$,$dx=2t\\,dt$。</div>\n<div class=\"step\"><span class=\"sn\">02</span>原式 $=\\int\\dfrac{2t}{1+t}\\,dt=2\\int\\dfrac{t}{1+t}\\,dt$。</div>\n<div class=\"step\"><span class=\"sn\">03</span>分项:$\\dfrac{t}{1+t}=1-\\dfrac{1}{1+t}$,故 $2\\int\\!\\left(1-\\dfrac1{1+t}\\right)dt=2(t-\\ln|1+t|)+C$。</div>\n<div class=\"step\"><span class=\"sn\">04</span>回代 $t=\\sqrt{x}$:$=2\\sqrt{x}-2\\ln(1+\\sqrt{x})+C$。$\\blacksquare$</div></div>\n\n<h2 id=\"parts\"><span class=\"n\">06</span>分部积分法</h2>\n<p>当被积函数是<b>两类不同函数的乘积</b>(如 $x e^x$、$x\\ln x$、$e^x\\sin x$),凑微分和换元都使不上,得用乘积求导公式倒过来。</p>\n\n<div class=\"card thm\"><span class=\"tag\">定理 · 分部积分</span>\n<p>设 $u=u(x)$、$v=v(x)$ 可导,则</p>\n<p class=\"ka\">$$\\int u\\,dv = uv-\\int v\\,du$$</p>\n<p>由乘积微分 $d(uv)=u\\,dv+v\\,du$ 两边积分即得。用法:把被积式<b>拆成 $u$ 和 $dv$ 两部分</b>,目标是让 $\\int v\\,du$ 比原来简单。</p></div>\n\n<div class=\"card tip\"><span class=\"tag\">选 $u$ 的口诀:反对幂三指</span>\n<p>被积式是两类函数乘积时,按下面<b>优先级选 $u$</b>(排在前面的当 $u$,剩下的当 $dv$):</p>\n<p class=\"ka\">$$\\underbrace{\\text{反三角}}_{\\text{最难积}}\\;\\succ\\;\\underbrace{\\text{对数}}_{\\text{}}\\;\\succ\\;\\underbrace{\\text{幂(代数)}}_{\\text{}}\\;\\succ\\;\\underbrace{\\text{三角}}_{\\text{}}\\;\\succ\\;\\underbrace{\\text{指数}}_{\\text{最易积,当}dv}$$</p>\n<p><b>道理</b>:反三角、对数\"求导变简单\"(微分后变有理式),适合当 $u$;三角、指数\"积分不变难\",适合当 $dv$。</p></div>\n\n<div class=\"viz\">\n<div class=\"vt\">交互演示</div>\n<h4>分部积分:谁当 $u$ 谁当 $dv$</h4>\n<p>选一道题,蓝条是优先级更高的函数类型(当选 $u$),橙条是当选 $dv$ 的类型。下方给出 $u,dv,du,v$ 与最终结果。</p>\n<canvas id=\"cv4\" width=\"780\" height=\"250\"></canvas>\n<div class=\"ctrl\">\n  <label>题目 <select id=\"sel4\">\n    <option>∫ x·eˣ dx</option>\n    <option>∫ ln x dx</option>\n    <option>∫ x·sin x dx</option>\n    <option>∫ eˣ·sin x dx</option>\n    <option>∫ arctan x dx</option>\n  </select></label>\n  <span class=\"val\" style=\"color:var(--acc)\">■ u</span>\n  <span class=\"val\" style=\"color:var(--warn)\">■ dv</span>\n</div>\n<div class=\"note\">五道题分别让幂、对、幂、三、反三角当了 $u$--正好覆盖口诀全谱。$e^x\\sin x$ 是\"循环型\",分部两次后回到原积分,解方程即得。</div>\n</div>\n\n<div class=\"card eg\"><span class=\"tag\">例 7 · 分部(幂×指数)</span>\n<p>求 $\\displaystyle\\int x e^x\\,dx$。</p>\n<div class=\"step\"><span class=\"sn\">01</span>幂 $x$ 与指数 $e^x$,按\"反对幂三指\",幂在前,取 $u=x$,$dv=e^x dx$。</div>\n<div class=\"step\"><span class=\"sn\">02</span>则 $du=dx$,$v=e^x$。</div>\n<div class=\"step\"><span class=\"sn\">03</span>$\\int x e^x\\,dx=x e^x-\\int e^x\\,dx=x e^x-e^x+C$。</div>\n<div class=\"step\"><span class=\"sn\">04</span>$=(x-1)e^x+C$。$\\blacksquare$</div></div>\n\n<div class=\"card eg\"><span class=\"tag\">例 8 · 分部(对数)</span>\n<p>求 $\\displaystyle\\int\\ln x\\,dx$。</p>\n<div class=\"step\"><span class=\"sn\">01</span>$\\ln x$ 是对数,优先当 $u$;剩下 $dx$ 当 $dv$。取 $u=\\ln x$,$dv=dx$。</div>\n<div class=\"step\"><span class=\"sn\">02</span>$du=\\dfrac{dx}{x}$,$v=x$。</div>\n<div class=\"step\"><span class=\"sn\">03</span>$\\int\\ln x\\,dx=x\\ln x-\\int x\\cdot\\dfrac{dx}{x}=x\\ln x-\\int dx$。</div>\n<div class=\"step\"><span class=\"sn\">04</span>$=x\\ln x-x+C$。$\\blacksquare$</div></div>\n\n<div class=\"card eg\"><span class=\"tag\">例 9 · 分部(循环型)</span>\n<p>求 $\\displaystyle I=\\int e^x\\sin x\\,dx$。</p>\n<div class=\"step\"><span class=\"sn\">01</span>三角与指数,按口诀三角在前,取 $u=\\sin x$,$dv=e^x dx$。则 $du=\\cos x\\,dx$,$v=e^x$。</div>\n<div class=\"step\"><span class=\"sn\">02</span>$I=e^x\\sin x-\\int e^x\\cos x\\,dx$。对后者再次分部,仍取 $u=\\cos x$,$dv=e^x dx$:$\\int e^x\\cos x\\,dx=e^x\\cos x-\\int e^x(-\\sin x)\\,dx=e^x\\cos x+I$。</div>\n<div class=\"step\"><span class=\"sn\">03</span>代回:$I=e^x\\sin x-\\bigl(e^x\\cos x+I\\bigr)=e^x(\\sin x-\\cos x)-I$。</div>\n<div class=\"step\"><span class=\"sn\">04</span>$2I=e^x(\\sin x-\\cos x)$,故 $I=\\dfrac{e^x}{2}(\\sin x-\\cos x)+C$。$\\blacksquare$</div>\n<div class=\"note\"><b>循环型</b>特征:分部两次回到原积分。两次 $u$ 必须取<b>同一类</b>(都取三角,或都取指数),否则抵消归零。最后解方程得结果,$+C$ 别漏。</div></div>\n\n<h2 id=\"rat\"><span class=\"n\">07</span>有理函数的积分</h2>\n<p>有理函数 $R(x)=P(x)/Q(x)$($P,Q$ 为多项式)。若分子次数 $\\ge$ 分母,先<b>多项式除法</b>化为\"整式 + 真分式\";真分式则<b>部分分式分解</b>成可积的简单分式之和。</p>\n\n<div class=\"card def\"><span class=\"tag\">部分分式分解(真分式)</span>\n<p>设 $Q(x)$ 已分解为实系数一次与二次因式之积。每个因式对应一组待定系数:</p>\n<table>\n<tr><th>分母中的因式</th><th>对应的部分分式</th></tr>\n<tr><td>$(x-a)$</td><td>$\\dfrac{A}{x-a}$</td></tr>\n<tr><td>$(x-a)^k$</td><td>$\\dfrac{A_1}{x-a}+\\dfrac{A_2}{(x-a)^2}+\\cdots+\\dfrac{A_k}{(x-a)^k}$</td></tr>\n<tr><td>$(x^2+px+q)$ 不可约</td><td>$\\dfrac{Bx+C}{x^2+px+q}$</td></tr>\n<tr><td>$(x^2+px+q)^k$</td><td>$\\dfrac{B_1 x+C_1}{x^2+px+q}+\\cdots+\\dfrac{B_k x+C_k}{(x^2+px+q)^k}$</td></tr>\n</table>\n<p>用<b>待定系数法</b>(代入特殊值或比较同次项)解出 $A,B,C,\\ldots$,然后逐项积分。</p></div>\n\n<div class=\"card tip\"><span class=\"tag\">两类因式的积分</span>\n<p>① $\\int\\dfrac{dx}{x-a}=\\ln|x-a|+C$;<br>② $\\int\\dfrac{dx}{(x-a)^k}=\\dfrac{1}{(1-k)(x-a)^{k-1}}+C$($k\\ne1$);<br>③ 对不可约二次 $\\int\\dfrac{Bx+C}{x^2+px+q}\\,dx$:把分子凑成分母的导数(出 $\\ln$),剩余部分配成 $\\dfrac{1}{(x+\\tfrac p2)^2+a^2}$ 出 $\\arctan$。</p></div>\n\n<div class=\"card eg\"><span class=\"tag\">例 10 · 部分分式(两个一次因式)</span>\n<p>求 $\\displaystyle\\int\\dfrac{dx}{x^2-1}$。</p>\n<div class=\"step\"><span class=\"sn\">01</span>$x^2-1=(x-1)(x+1)$。设 $\\dfrac1{(x-1)(x+1)}=\\dfrac{A}{x-1}+\\dfrac{B}{x+1}$。</div>\n<div class=\"step\"><span class=\"sn\">02</span>通分:$1=A(x+1)+B(x-1)$。代 $x=1$:$1=2A\\Rightarrow A=\\tfrac12$;代 $x=-1$:$1=-2B\\Rightarrow B=-\\tfrac12$。</div>\n<div class=\"step\"><span class=\"sn\">03</span>原式 $=\\int\\!\\left[\\dfrac{1/2}{x-1}-\\dfrac{1/2}{x+1}\\right]dx=\\dfrac12\\ln|x-1|-\\dfrac12\\ln|x+1|+C$。</div>\n<div class=\"step\"><span class=\"sn\">04</span>$=\\dfrac12\\ln\\left|\\dfrac{x-1}{x+1}\\right|+C$。$\\blacksquare$</div></div>\n\n<div class=\"card eg\"><span class=\"tag\">例 11 · 部分分式(系数不全为 ±1)</span>\n<p>求 $\\displaystyle\\int\\dfrac{x+1}{(x-1)(x+2)}\\,dx$。</p>\n<div class=\"step\"><span class=\"sn\">01</span>设 $\\dfrac{x+1}{(x-1)(x+2)}=\\dfrac{A}{x-1}+\\dfrac{B}{x+2}$。</div>\n<div class=\"step\"><span class=\"sn\">02</span>通分:$x+1=A(x+2)+B(x-1)$。代 $x=1$:$2=3A\\Rightarrow A=\\tfrac23$;代 $x=-2$:$-1=-3B\\Rightarrow B=\\tfrac13$。</div>\n<div class=\"step\"><span class=\"sn\">03</span>原式 $=\\int\\!\\left[\\dfrac{2/3}{x-1}+\\dfrac{1/3}{x+2}\\right]dx=\\dfrac23\\ln|x-1|+\\dfrac13\\ln|x+2|+C$。$\\blacksquare$</div></div>\n\n<h2 id=\"trig\"><span class=\"n\">08</span>三角有理式 · 万能公式</h2>\n<p>被积函数由 $\\sin x,\\cos x$ 经四则运算构成($R(\\sin x,\\cos x)$)叫<b>三角有理式</b>。理论上都能用<b>万能公式</b>化成有理函数积分。</p>\n\n<div class=\"card thm\"><span class=\"tag\">万能公式 · 半角代换</span>\n<p>令 $t=\\tan\\dfrac{x}{2}$($-\\pi<x<\\pi$),则</p>\n<p class=\"ka\">$$\\sin x=\\frac{2t}{1+t^2},\\quad \\cos x=\\frac{1-t^2}{1+t^2},\\quad \\tan x=\\frac{2t}{1-t^2},\\quad dx=\\frac{2\\,dt}{1+t^2}$$</p>\n<p>于是 $\\int R(\\sin x,\\cos x)\\,dx$ 变为 $t$ 的<b>有理函数积分</b>,再用部分分式即可。</p></div>\n\n<div class=\"card tip\"><span class=\"tag\">万能但未必最优</span>\n<p>万能公式\"一定能做\",但有时算得很繁。能用<b>特殊技巧</b>(凑微分、$1{=}\\sin^2{+}\\cos^2$、倍角降幂)就别用万能。题里给 $1\\pm\\sin x$、$1\\pm\\cos x$ 时,优先想分子分母同乘共轭或倍角公式。</p></div>\n\n<div class=\"card eg\"><span class=\"tag\">例 12 · 万能公式</span>\n<p>求 $\\displaystyle\\int\\dfrac{dx}{1+\\sin x}$。</p>\n<div class=\"step\"><span class=\"sn\">01</span>令 $t=\\tan\\dfrac{x}{2}$,则 $\\sin x=\\dfrac{2t}{1+t^2}$,$dx=\\dfrac{2\\,dt}{1+t^2}$。</div>\n<div class=\"step\"><span class=\"sn\">02</span>$1+\\sin x=1+\\dfrac{2t}{1+t^2}=\\dfrac{(1+t)^2}{1+t^2}$。</div>\n<div class=\"step\"><span class=\"sn\">03</span>原式 $=\\int\\dfrac{\\tfrac{2\\,dt}{1+t^2}}{\\tfrac{(1+t)^2}{1+t^2}}=\\int\\dfrac{2\\,dt}{(1+t)^2}$。</div>\n<div class=\"step\"><span class=\"sn\">04</span>$=-\\dfrac{2}{1+t}+C=-\\dfrac{2}{1+\\tan(x/2)}+C$。$\\blacksquare$</div>\n<div class=\"note\">此题其实有更巧的做法:分子分母同乘 $1-\\sin x$,得 $\\dfrac{1-\\sin x}{\\cos^2 x}=\\sec^2 x-\\sec x\\tan x$,两项分别可积,结果 $=\\tan x-\\sec x+C$。两种答案差一个常数,都对。</div></div>\n\n<h2 id=\"irr\"><span class=\"n\">09</span>简单无理函数与综合例题</h2>\n<p>含根号的无理式,思路是<b>换元去根号</b>:线性根号 $\\sqrt{ax+b}$ 用根式换元;二次根号 $\\sqrt{ax^2+bx+c}$ 先<b>配方</b>再三角换元。</p>\n\n<div class=\"card eg\"><span class=\"tag\">例 13 · 配方 + 公式</span>\n<p>求 $\\displaystyle\\int\\dfrac{dx}{\\sqrt{x^2+2x+2}}$。</p>\n<div class=\"step\"><span class=\"sn\">01</span>配方:$x^2+2x+2=(x+1)^2+1$。</div>\n<div class=\"step\"><span class=\"sn\">02</span>令 $u=x+1$,$du=dx$,原式 $=\\int\\dfrac{du}{\\sqrt{u^2+1}}$。</div>\n<div class=\"step\"><span class=\"sn\">03</span>用补充公式 $\\int\\dfrac{du}{\\sqrt{u^2+a^2}}=\\ln\\!\\left|u+\\sqrt{u^2+a^2}\\right|+C$(此处 $a=1$)。</div>\n<div class=\"step\"><span class=\"sn\">04</span>$=\\ln\\!\\left|u+\\sqrt{u^2+1}\\right|+C=\\ln\\!\\left|x+1+\\sqrt{x^2+2x+2}\\right|+C$。$\\blacksquare$</div></div>\n\n<div class=\"card eg\"><span class=\"tag\">例 14 · 综合(换元 + 分部)</span>\n<p>求 $\\displaystyle\\int e^{\\sqrt{x}}\\,dx$。</p>\n<div class=\"step\"><span class=\"sn\">01</span>先去根号:令 $t=\\sqrt{x}$,则 $x=t^2$,$dx=2t\\,dt$。原式 $=\\int 2t\\,e^t\\,dt$。</div>\n<div class=\"step\"><span class=\"sn\">02</span>化为分部:幂 $2t$ 与指数 $e^t$,取 $u=2t$,$dv=e^t dt$。则 $du=2\\,dt$,$v=e^t$。</div>\n<div class=\"step\"><span class=\"sn\">03</span>$\\int 2t\\,e^t\\,dt=2t\\,e^t-\\int 2 e^t\\,dt=2t\\,e^t-2e^t+C=2e^t(t-1)+C$。</div>\n<div class=\"step\"><span class=\"sn\">04</span>回代 $t=\\sqrt{x}$:$=2e^{\\sqrt{x}}\\bigl(\\sqrt{x}-1\\bigr)+C$。$\\blacksquare$</div>\n<div class=\"note\"><b>检验</b>:对结果求导。设 $F=2e^{\\sqrt{x}}(\\sqrt{x}-1)$,令 $t=\\sqrt{x}$。$F=2e^t(t-1)$,$\\dfrac{dF}{dt}=2e^t(t-1)+2e^t=2e^t t$;又 $\\dfrac{dt}{dx}=\\dfrac1{2\\sqrt{x}}=\\dfrac1{2t}$。故 $F'=2e^t t\\cdot\\dfrac1{2t}=e^t=e^{\\sqrt{x}}$,回到被积函数,正确。</div></div>\n\n<h2 id=\"quiz\"><span class=\"n\">10</span>练习(10 题)</h2>\n<div class=\"quiz\"><q>1. 求 $\\int(3x^2+2x+1)\\,dx$。</q>\n<details><summary>看详解</summary><div class=\"ans\">逐项用幂函数公式:$=x^3+x^2+x+C$。</div></details></div>\n<div class=\"quiz\"><q>2. 求 $\\int x\\cos x\\,dx$(分部)。</q>\n<details><summary>看详解</summary><div class=\"ans\">幂×三角,取 $u=x$,$dv=\\cos x\\,dx$,则 $du=dx$,$v=\\sin x$。$=x\\sin x-\\int\\sin x\\,dx=x\\sin x+\\cos x+C$。</div></details></div>\n<div class=\"quiz\"><q>3. 求 $\\displaystyle\\int\\dfrac{dx}{1+\\sqrt{2x}}$(根式换元)。</q>\n<details><summary>看详解</summary><div class=\"ans\">令 $t=\\sqrt{2x}$,$x=\\tfrac{t^2}{2}$,$dx=t\\,dt$。$\\int\\dfrac{t\\,dt}{1+t}=\\int(1-\\tfrac1{1+t})dt=t-\\ln|1+t|+C=\\sqrt{2x}-\\ln(1+\\sqrt{2x})+C$。</div></details></div>\n<div class=\"quiz\"><q>4. 求 $\\int x^2 e^{x^3}\\,dx$(凑微分)。</q>\n<details><summary>看详解</summary><div class=\"ans\">令 $u=x^3$,$du=3x^2 dx$,故 $x^2 dx=\\tfrac{du}{3}$。原式 $=\\tfrac13\\int e^u\\,du=\\tfrac13 e^u+C=\\tfrac13 e^{x^3}+C$。</div></details></div>\n<div class=\"quiz\"><q>5. 求 $\\displaystyle\\int\\dfrac{dx}{x^2+4}$(用公式)。</q>\n<details><summary>看详解</summary><div class=\"ans\">用 $\\int\\dfrac{dx}{x^2+a^2}=\\tfrac1a\\arctan\\tfrac{x}{a}+C$,此处 $a=2$。$=\\tfrac12\\arctan\\tfrac{x}{2}+C$。</div></details></div>\n<div class=\"quiz\"><q>6. 求 $\\int e^x\\cos x\\,dx$(循环分部)。</q>\n<details><summary>看详解</summary><div class=\"ans\">取 $u=\\cos x$,$dv=e^x dx$。两次分部后:$I=e^x\\cos x+e^x\\sin x-I$,即 $2I=e^x(\\cos x+\\sin x)$,故 $I=\\tfrac{e^x}{2}(\\sin x+\\cos x)+C$。</div></details></div>\n<div class=\"quiz\"><q>7. 求 $\\displaystyle\\int\\dfrac{x+3}{(x-1)(x+2)}\\,dx$(部分分式)。</q>\n<details><summary>看详解</summary><div class=\"ans\">设 $\\tfrac{x+3}{(x-1)(x+2)}=\\tfrac{A}{x-1}+\\tfrac{B}{x+2}$。$x+3=A(x+2)+B(x-1)$。代 $x=1$:$4=3A\\Rightarrow A=\\tfrac43$;代 $x=-2$:$1=-3B\\Rightarrow B=-\\tfrac13$。$=\\tfrac43\\ln|x-1|-\\tfrac13\\ln|x+2|+C$。</div></details></div>\n<div class=\"quiz\"><q>8. 求 $\\displaystyle\\int\\dfrac{dx}{1+\\cos x}$(万能公式)。</q>\n<details><summary>看详解</summary><div class=\"ans\">令 $t=\\tan\\tfrac{x}{2}$,$\\cos x=\\tfrac{1-t^2}{1+t^2}$,$dx=\\tfrac{2\\,dt}{1+t^2}$。$1+\\cos x=\\tfrac{2}{1+t^2}$。原式 $=\\int\\dfrac{2\\,dt/(1+t^2)}{2/(1+t^2)}=\\int dt=t+C=\\tan\\tfrac{x}{2}+C$。也可用半角公式 $1+\\cos x=2\\cos^2(x/2)$，把原式写成 $\\int\\tfrac12\\sec^2(x/2)\\,dx=\\tan(x/2)+C$；以上结果在不跨越 $x=(2k+1)\\pi$（$k\\in\\mathbb Z$）的区间内成立。</div></details></div>\n<div class=\"quiz\"><q>9. 求 $\\int x\\ln x\\,dx$(分部)。</q>\n<details><summary>看详解</summary><div class=\"ans\">对数优先当 $u$:取 $u=\\ln x$,$dv=x\\,dx$,则 $du=\\tfrac{dx}{x}$,$v=\\tfrac{x^2}{2}$。$=\\tfrac{x^2}{2}\\ln x-\\int\\tfrac{x^2}{2}\\cdot\\tfrac{dx}{x}=\\tfrac{x^2}{2}\\ln x-\\tfrac{x^2}{4}+C$。</div></details></div>\n<div class=\"quiz\"><q>10. 求 $\\displaystyle\\int\\dfrac{dx}{\\sqrt{4-x^2}}$(三角换元 / 公式)。</q>\n<details><summary>看详解</summary><div class=\"ans\">用 $\\int\\dfrac{dx}{\\sqrt{a^2-x^2}}=\\arcsin\\tfrac{x}{a}+C$,此处 $a=2$。$=\\arcsin\\tfrac{x}{2}+C$。(若用换元 $x=2\\sin t$,同样得 $t+C=\\arcsin\\tfrac{x}{2}+C$。)</div></details></div>\n\n<div class=\"summary\">\n<div class=\"st\">本节小结</div>\n<p><span class=\"pill\">本质</span>不定积分 = 求导的逆,结果是\"一族\"原函数 $F(x)+C$。</p>\n<p><span class=\"pill\">公式</span>14 条基本公式 + 7 条补充公式,背熟后其余靠方法转化。</p>\n<p><span class=\"pill\">性质</span>线性;$\\int$ 与 $d$ 互逆:先微后积补 $C$,先积后微不补 $C$。</p>\n<p><span class=\"pill\">凑微分</span>第一换元,链式求导的逆;识别\"内层×内层导数\",最常用。</p>\n<p><span class=\"pill\">三角换元</span>$\\sqrt{a^2-x^2}\\to x{=}a\\sin t$,$\\sqrt{a^2{+}x^2}\\to x{=}a\\tan t$,$\\sqrt{x^2{-}a^2}\\to x{=}a\\sec t$。</p>\n<p><span class=\"pill\">分部</span>$\\int u\\,dv=uv-\\int v\\,du$;选 $u$ 口诀\"反对幂三指\";循环型两次分部解方程。</p>\n<p><span class=\"pill\">有理</span>多项式除法 + 部分分式分解,逐项积出 $\\ln$ 与 $\\arctan$。</p>\n<p><span class=\"pill\">三角有理</span>万能公式 $t=\\tan\\tfrac{x}{2}$,万能但非最优,先试特殊技巧。</p>\n<p><span class=\"pill\">无理</span>根式换元去根号;二次根号先配方再换元。</p>\n<p style=\"margin-top:16px;color:var(--txt3)\"><b>下一节</b>:定积分。把\"求原函数\"配上上下限 $a,b$,赋予积分\"曲边梯形面积\"的几何意义,并引入牛顿-莱布尼茨公式 $\\int_a^b f=\\bigl[F(x)\\bigr]_a^b$--本节所有原函数技巧届时直接派上用场。</p>\n</div>\n\n",mount(root){
 const document={getElementById:id=>root.querySelector('[id="'+id+'"]'),body:root};
 const window={addEventListener:()=>{}};

window.addEventListener('load',()=>{
  if(window.renderMathInElement) renderMathInElement(document.body,{delimiters:[{left:'$$',right:'$$',display:true},{left:'$',right:'$',display:false}],throwOnError:false});
});
function go(id){document.getElementById(id).scrollIntoView({behavior:'smooth'});}
window.addEventListener('scroll',()=>{
  const sc=document.documentElement.scrollTop,h=document.documentElement.scrollHeight-document.documentElement.clientHeight;
  document.getElementById('prog').style.width=(sc/h*100)+'%';
});

/* ===== Viz 1: 原函数族 F(x)+C ===== */
const cv1=document.getElementById('cv1'),c1=cv1.getContext('2d');
const s1c=document.getElementById('s1c'),v1c=document.getElementById('v1c');
const s1x=document.getElementById('s1x'),v1x=document.getElementById('v1x');
function draw1(){
  const C=+s1c.value/10, x0=+s1x.value/10;
  v1c.textContent=(C>=0?'+':'')+C.toFixed(2);
  v1x.textContent=x0.toFixed(2);
  const w=cv1.width,h=cv1.height;c1.clearRect(0,0,w,h);
  const padL=46,padR=22,xMin=-Math.PI,xMax=Math.PI;
  const sx=(w-padL-padR)/(xMax-xMin);
  const topY=105,botY=230,ys=32;
  const X=u=>padL+(u-xMin)*sx;
  c1.textBaseline='alphabetic';
  /* ghost family (faint) */
  c1.lineWidth=1;
  for(const Cg of [-1,-0.5,0,0.5,1]){
    if(Math.abs(Cg-C)<0.02)continue;
    c1.strokeStyle='rgba(110,142,245,0.12)';
    c1.beginPath();
    for(let i=0;i<=160;i++){const x=xMin+(xMax-xMin)*i/160;const px=X(x);const py=topY-(Math.sin(x)+Cg)*ys;if(i===0)c1.moveTo(px,py);else c1.lineTo(px,py);}
    c1.stroke();
  }
  /* axes */
  c1.strokeStyle='#d5deeb';c1.lineWidth=1;
  c1.beginPath();c1.moveTo(padL,topY);c1.lineTo(w-padR,topY);c1.moveTo(padL,botY);c1.lineTo(w-padR,botY);c1.stroke();
  /* f(x)=cos x bottom (teal) */
  c1.strokeStyle='#0e7288';c1.lineWidth=1.8;
  c1.beginPath();
  for(let i=0;i<=200;i++){const x=xMin+(xMax-xMin)*i/200;const px=X(x);const py=botY-Math.cos(x)*ys;if(i===0)c1.moveTo(px,py);else c1.lineTo(px,py);}
  c1.stroke();
  /* F(x)+C=sin x+C top (blue, bold) */
  c1.strokeStyle='#245cc5';c1.lineWidth=2.2;
  c1.beginPath();
  for(let i=0;i<=200;i++){const x=xMin+(xMax-xMin)*i/200;const px=X(x);const py=topY-(Math.sin(x)+C)*ys;if(i===0)c1.moveTo(px,py);else c1.lineTo(px,py);}
  c1.stroke();
  /* x0 vertical guide */
  const px0=X(x0);
  c1.strokeStyle='#526579';c1.setLineDash([3,3]);
  c1.beginPath();c1.moveTo(px0,40);c1.lineTo(px0,botY+ys+8);c1.stroke();
  c1.setLineDash([]);
  /* tangent on F at x0 (slope = cos x0 = f(x0)) */
  const Fy=topY-(Math.sin(x0)+C)*ys;
  const slopeC=-Math.cos(x0)*ys/sx;
  const tl=58;
  c1.strokeStyle='#147557';c1.lineWidth=2;
  c1.beginPath();c1.moveTo(px0-tl,Fy-slopeC*tl);c1.lineTo(px0+tl,Fy+slopeC*tl);c1.stroke();
  /* dots */
  c1.fillStyle='#245cc5';c1.beginPath();c1.arc(px0,Fy,4.5,0,7);c1.fill();
  const fy=botY-Math.cos(x0)*ys;
  c1.fillStyle='#0e7288';c1.beginPath();c1.arc(px0,fy,4.5,0,7);c1.fill();
  /* labels */
  c1.font='11px Inter,monospace';
  c1.fillStyle='#245cc5';c1.fillText('F(x)+C = sin x + C   (原函数族,当前 C)',padL,16);
  c1.fillStyle='#0e7288';c1.fillText('f(x) = cos x   (被积函数)',padL,botY-ys-10);
  c1.fillStyle='#147557';c1.fillText('切线斜率 = cos(x₀) = '+Math.cos(x0).toFixed(3),px0+8,Fy-9);
  c1.fillStyle='#0e7288';c1.fillText('f(x₀) = '+Math.cos(x0).toFixed(3),px0+8,fy+15);
}
s1c.oninput=draw1;s1x.oninput=draw1;draw1();

/* ===== Viz 2: 凑微分步骤 ===== */
const cv2=document.getElementById('cv2'),c2=cv2.getContext('2d');
const sel2=document.getElementById('sel2'),st2=document.getElementById('st2'),vst2=document.getElementById('vst2');
const W='#203044',B='#245cc5',O='#ae4c13';
const exs2=[
  {parts:[{t:'∫ ',c:W},{t:'2x',c:O},{t:'·cos(',c:W},{t:'x²',c:B},{t:')',c:W},{t:' dx',c:O}],
   u:'u = x²', du:'du = 2x dx', sub:'∫ cos(u) du', res:'sin(u) + C  =  sin(x²) + C'},
  {parts:[{t:'∫ ',c:W},{t:'2x',c:O},{t:'/',c:W},{t:'(1+',c:W},{t:'x²',c:B},{t:')',c:W},{t:' dx',c:O}],
   u:'u = 1 + x²', du:'du = 2x dx', sub:'∫ du / u', res:'ln|u| + C  =  ln(1 + x²) + C'},
  {parts:[{t:'∫ e^(',c:W},{t:'3x',c:B},{t:') ',c:W},{t:'dx',c:O}],
   u:'u = 3x', du:'du = 3 dx   ⇒   dx = du / 3', sub:'(1/3) ∫ eᵘ du', res:'(1/3) eᵘ + C  =  (1/3) e^(3x) + C'},
  {parts:[{t:'∫ sin(',c:W},{t:'2x',c:B},{t:') ',c:W},{t:'dx',c:O}],
   u:'u = 2x', du:'du = 2 dx   ⇒   dx = du / 2', sub:'(1/2) ∫ sin(u) du', res:'−(1/2) cos(u) + C  =  −(1/2) cos(2x) + C'},
];
function draw2(){
  const idx=sel2.selectedIndex, ex=exs2[idx], step=+st2.value;
  vst2.textContent=step;
  const w=cv2.width,h=cv2.height;c2.clearRect(0,0,w,h);
  c2.textBaseline='middle';
  /* Row 1: original integral with colored highlight boxes */
  c2.font='22px Inter,monospace';
  let cx=40;const y1=44;
  for(const p of ex.parts){
    const tw=c2.measureText(p.t).width;
    if(p.c===B){c2.fillStyle='rgba(110,142,245,0.18)';c2.fillRect(cx-2,y1-15,tw+4,30);}
    else if(p.c===O){c2.fillStyle='rgba(220,179,102,0.18)';c2.fillRect(cx-2,y1-15,tw+4,30);}
    c2.fillStyle=p.c;c2.fillText(p.t,cx,y1);
    cx+=tw;
  }
  /* legend */
  c2.font='11.5px Inter,monospace';
  c2.fillStyle=B;c2.fillRect(40,74,12,12);c2.fillStyle=W;c2.fillText('u (内层函数)',56,80);
  c2.fillStyle=O;c2.fillRect(190,74,12,12);c2.fillStyle=W;c2.fillText('du (微分部分)',206,80);
  let row=120;
  if(step>=1){c2.fillStyle=B;c2.font='16px Inter,monospace';c2.fillText('①  令   '+ex.u,40,row);}
  if(step>=2){c2.fillStyle=O;c2.font='16px Inter,monospace';c2.fillText('②  则   '+ex.du,40,row+32);}
  if(step>=3){c2.fillStyle=W;c2.font='17px Inter,monospace';c2.fillText('③  原式 =  '+ex.sub,40,row+66);}
  if(step>=4){c2.fillStyle='#147557';c2.font='17px Inter,monospace';c2.fillText('④  =  '+ex.res,40,row+98);}
}
sel2.onchange=draw2;st2.oninput=draw2;draw2();

/* ===== Viz 3: 三角换元辅助三角形 ===== */
const cv3=document.getElementById('cv3'),c3=cv3.getContext('2d');
const sel3=document.getElementById('sel3'),st3=document.getElementById('st3'),vst3=document.getElementById('vst3');
function draw3(){
  const type=sel3.value, t=+st3.value/100;
  vst3.textContent=t.toFixed(2);
  const a=2, scl=58;
  const w=cv3.width,h=cv3.height;c3.clearRect(0,0,w,h);
  c3.textBaseline='alphabetic';
  let AB,AC,hyp,labAB,labAC,labHyp,dxform,target,kindName;
  if(type==='sin'){
    AB=a*Math.cos(t);AC=a*Math.sin(t);hyp=a;
    labAB='√(a²−x²) = a cos t  = '+AB.toFixed(2);
    labAC='x = a sin t  = '+AC.toFixed(2);
    labHyp='a = '+a;
    dxform='dx = a cos t · dt';
    target='用于 √(a² − x²)';
    kindName='x = a sin t';
  }else if(type==='tan'){
    AB=a;AC=a*Math.tan(t);hyp=a/Math.cos(t);
    labAB='a = '+a;
    labAC='x = a tan t  = '+AC.toFixed(2);
    labHyp='√(a²+x²) = a sec t  = '+hyp.toFixed(2);
    dxform='dx = a sec²t · dt';
    target='用于 √(a² + x²)';
    kindName='x = a tan t';
  }else{
    AB=a;hyp=a/Math.cos(t);AC=a*Math.tan(t);
    labAB='a = '+a;
    labHyp='x = a sec t  = '+hyp.toFixed(2);
    labAC='√(x²−a²) = a tan t  = '+AC.toFixed(2);
    dxform='dx = a sec t · tan t · dt';
    target='用于 √(x² − a²)';
    kindName='x = a sec t';
  }
  const ACcap=Math.min(AC,3.4)*scl;
  const Ax=120, Ay=h-44;
  const Bx=Ax+AB*scl, By=Ay;
  const Cx=Ax, Cy=Ay-ACcap;
  /* triangle */
  c3.strokeStyle='#245cc5';c3.lineWidth=2;
  c3.beginPath();c3.moveTo(Ax,Ay);c3.lineTo(Bx,By);c3.lineTo(Cx,Cy);c3.closePath();c3.stroke();
  /* right-angle mark at A (above-right of A) */
  c3.strokeStyle='#526579';c3.lineWidth=1.5;
  c3.strokeRect(Ax,Ay-13,13,13);
  /* angle t arc at B (interior, above BA) */
  const angBA=Math.atan2(Ay-By,Ax-Bx);
  let angBC=Math.atan2(Cy-By,Cx-Bx);
  while(angBC<angBA)angBC+=2*Math.PI;
  c3.strokeStyle='#ae4c13';c3.lineWidth=1.6;
  c3.beginPath();c3.arc(Bx,By,22,angBA,angBC,false);c3.stroke();
  c3.fillStyle='#ae4c13';c3.font='13px Inter,monospace';c3.textAlign='center';
  c3.fillText('t',Bx-30,By-10);
  /* side labels */
  c3.fillStyle='#203044';c3.font='12.5px Inter,monospace';
  c3.textAlign='center';c3.fillText(labAB,(Ax+Bx)/2,By+20);
  c3.textAlign='right';c3.fillText(labAC,Ax-8,(Ay+Cy)/2+4);
  c3.textAlign='left';
  const mx=(Bx+Cx)/2,my=(By+Cy)/2;
  c3.fillText(labHyp,mx+10,my-6);
  /* info panel */
  c3.textAlign='left';
  c3.fillStyle='#245cc5';c3.font='bold 15px Inter,monospace';
  c3.fillText('换元:  '+kindName,410,46);
  c3.fillStyle='#405773';c3.font='12.5px Inter,monospace';
  c3.fillText(target,410,68);
  c3.fillStyle='#203044';c3.font='13px Inter,monospace';
  c3.fillText(dxform,410,96);
  c3.fillStyle='#0e7288';c3.fillText('t = '+t.toFixed(2)+' rad   ('+Math.round(t*180/Math.PI)+'°)',410,122);
  c3.fillStyle='#405773';
  c3.fillText('sin t = '+Math.sin(t).toFixed(3),410,150);
  c3.fillText('cos t = '+Math.cos(t).toFixed(3),410,170);
  c3.fillText('tan t = '+Math.tan(t).toFixed(3),410,190);
  c3.fillStyle='#526579';c3.font='11px Inter,monospace';
  c3.fillText('读三角形三边 → 把 sin/cos/tan 换回 x 表出 → 回代',410,218);
}
sel3.onchange=draw3;st3.oninput=draw3;draw3();

/* ===== Viz 4: 分部积分 LIATE 选择 ===== */
const cv4=document.getElementById('cv4'),c4=cv4.getContext('2d');
const sel4=document.getElementById('sel4');
const types=[{name:'反三角'},{name:'对数'},{name:'幂'},{name:'三角'},{name:'指数'}];
const exs4=[
  {expr:'∫ x · eˣ dx',          a:2,b:4, u:'x  (幂)',  dv:'eˣ dx',        du:'dx',           v:'eˣ',       result:'x eˣ − eˣ + C  =  (x−1) eˣ + C'},
  {expr:'∫ ln x dx',            a:1,b:2, u:'ln x  (对)',dv:'dx',           du:'(1/x) dx',     v:'x',        result:'x ln x − x + C'},
  {expr:'∫ x · sin x dx',       a:2,b:3, u:'x  (幂)',  dv:'sin x dx',     du:'dx',           v:'−cos x',   result:'−x cos x + sin x + C'},
  {expr:'∫ eˣ · sin x dx',      a:3,b:4, u:'sin x  (三)',dv:'eˣ dx',        du:'cos x dx',     v:'eˣ',       result:'(eˣ/2)(sin x − cos x) + C   (循环)'},
  {expr:'∫ arctan x dx',        a:0,b:2, u:'arctan x  (反)',dv:'dx',      du:'dx / (1+x²)', v:'x',        result:'x arctan x − ½ ln(1+x²) + C'},
];
function draw4(){
  const idx=sel4.selectedIndex, ex=exs4[idx];
  const w=cv4.width,h=cv4.height;c4.clearRect(0,0,w,h);
  c4.textBaseline='middle';
  /* priority bars */
  const barW=120,gap=14,x0=46,y0=44;
  c4.fillStyle='#526579';c4.textAlign='left';c4.font='11.5px Inter,monospace';
  c4.fillText('选 u 的优先级(高 → 低):',x0,y0-16);
  for(let i=0;i<5;i++){
    const bx=x0+i*(barW+gap);
    const isU=(i===ex.a),isDv=(i===ex.b);
    c4.fillStyle=isU?'rgba(110,142,245,0.4)':isDv?'rgba(220,179,102,0.4)':'#16181d';
    c4.fillRect(bx,y0,barW,28);
    c4.strokeStyle=isU?'#245cc5':isDv?'#ae4c13':'#272a31';
    c4.lineWidth=isU||isDv?2:1;c4.strokeRect(bx,y0,barW,28);
    c4.fillStyle=isU?'#245cc5':isDv?'#ae4c13':'#405773';
    c4.font='12.5px Inter,monospace';c4.textAlign='center';
    c4.fillText(types[i].name,bx+barW/2,y0+15);
  }
  c4.textAlign='left';c4.font='11px Inter,monospace';
  c4.fillStyle='#245cc5';c4.fillRect(x0,y0+44,12,12);c4.fillStyle=W;c4.fillText('选作 u(优先级更高)',x0+18,y0+50);
  c4.fillStyle='#ae4c13';c4.fillRect(x0+200,y0+44,12,12);c4.fillStyle=W;c4.fillText('选作 dv',x0+218,y0+50);
  /* expression */
  c4.fillStyle='#203044';c4.font='18px Inter,monospace';
  c4.fillText(ex.expr,x0,y0+90);
  /* assignment */
  c4.font='14.5px Inter,monospace';
  c4.fillStyle='#245cc5';c4.fillText('u = '+ex.u,x0,y0+120);
  c4.fillStyle='#ae4c13';c4.fillText('dv = '+ex.dv,x0+250,y0+120);
  c4.fillStyle='#405773';c4.font='13px Inter,monospace';
  c4.fillText('⇒  du = '+ex.du+',    v = '+ex.v,x0,y0+148);
  c4.fillStyle='#0e7288';c4.font='13px Inter,monospace';
  c4.fillText('∫ u dv = uv − ∫ v du',x0,y0+176);
  c4.fillStyle='#147557';c4.font='15px Inter,monospace';
  c4.fillText('= '+ex.result,x0,y0+206);
}
sel4.onchange=draw4;draw4();

}};
