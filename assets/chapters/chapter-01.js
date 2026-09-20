/* 函数与极限：统一教材专题正文与实验。仅在本章容器内挂载控件。 */
window.COURSE_CHAPTERS=window.COURSE_CHAPTERS||{};
window.COURSE_CHAPTERS["chapter-01"]={html:"\n<h1>第一章 · 函数与极限</h1>\n<p style=\"color:#9aa\">本章是整个微积分的地基。微积分研究\"变化\",而<span class=\"tag\">极限</span>就是描述\"无限接近时趋于什么\"的工具。学好这一章,后面的导数、积分才能通透。</p>\n\n<!-- §1 -->\n<h2 id=\"intro\">§1 极限思想的引入</h2>\n<p>先建立直觉,再学严格定义。极限思想其实古人就有了:</p>\n<div class=\"card def\">\n<div class=\"label\">📌 直观例子</div>\n<p><b>1. 割圆术(刘徽,三国)</b>:在圆内接正六边形、正十二边形、正二十四边形……边越多,多边形周长越接近圆周长。\"割之弥细,所失弥少,割之又割,以至于不可割,则与圆周合体而无所失矣。\"</p>\n<p>这里\"边数趋于无穷时,周长趋于圆周长\"——这就是极限。</p>\n<p><b>2. 瞬时速度</b>:汽车 10 秒走了 200 米,平均速度 20 m/s。但第 3 秒那一瞬间的速度是多少?取 3 秒附近很短的时间 $\\Delta t$,算 $\\Delta s/\\Delta t$;让 $\\Delta t \\to 0$,比值就趋于瞬时速度。这也是极限。</p>\n</div>\n<div class=\"note\">🔑 <b>核心思想</b>:我们不关心\"最后那一瞬\",而关心\"无限趋近的过程\"会稳定到哪个值。这个\"目标值\"就是<b>极限</b>。</div>\n\n<!-- §2 -->\n<h2 id=\"seq\">§2 数列的极限</h2>\n<p>数列是按顺序排列的一串数 $x_1, x_2, x_3, \\ldots, x_n, \\ldots$,记作 $\\{x_n\\}$。我们先研究\"$n$ 越来越大时,$x_n$ 趋于什么\"。</p>\n\n<h3>2.1 直观描述</h3>\n<p>看数列 $x_n = \\dfrac{1}{n}$:$1,\\ \\dfrac12,\\ \\dfrac13,\\ \\dfrac14,\\ \\ldots$ 显然 $n$ 越大,$x_n$ 越接近 0。我们就说\"它趋于 0\",记 $\\lim\\limits_{n\\to\\infty}\\dfrac1n=0$。</p>\n<p>下面是交互演示:拖动滑块改变 $n$,看 $x_n=\\frac1n$ 的点如何逼近 0。</p>\n<canvas id=\"cv1\" width=\"780\" height=\"180\"></canvas>\n<div class=\"ctrl\">\n  <label>n = <span class=\"val\" id=\"v1\">10</span></label>\n  <input type=\"range\" id=\"s1\" min=\"1\" max=\"80\" value=\"10\" style=\"width:300px\">\n  <span style=\"color:#9aa\">$x_n = 1/n = $<span class=\"val\" id=\"v1b\">0.1000</span></span>\n</div>\n<div class=\"note\">观察:本例 $1/n$ 的每一项都不等于 0,但这不是极限的必要条件。常数数列 $a_n=0$ 的每一项都等于其极限。极限要求的是:任给正误差,从某项之后的所有项都落在误差带内。</div>\n\n<h3>2.2 严格的 $\\varepsilon$-$N$ 定义</h3>\n<p>直观\"越来越接近\"不够严谨(多近算接近?)。数学需要一个能<b>验证</b>的定义。19 世纪魏尔斯特拉斯等人给出了:</p>\n<div class=\"card def\">\n<div class=\"label\">📖 定义(数列极限)</div>\n<p>设数列 $\\{x_n\\}$,$a$ 为常数。若对<b>任意</b>给定的 $\\varepsilon>0$(无论多小),都<b>存在</b>正整数 $N$,使得当 $n>N$ 时,恒有</p>\n<p class=\"ka\">$$|x_n - a| < \\varepsilon$$</p>\n<p>则称数列 $\\{x_n\\}$ 的极限为 $a$,记作 $\\lim\\limits_{n\\to\\infty}x_n=a$ 或 $x_n\\to a\\,(n\\to\\infty)$。</p>\n</div>\n<p>逐字拆解这个定义(这是理解极限的核心，需要逐步掌握):</p>\n<div class=\"card\">\n<p><b>$\\varepsilon$ 是\"误差容忍度\"</b>:你给我一个多小的误差要求($\\varepsilon$),我都得满足。$\\varepsilon$ 是任意的、被挑战者指定的。</p>\n<p><b>$N$ 是\"充分远的项\"</b>:从第 $N$ 项之后,所有 $x_n$ 都要落在以 $a$ 为中心、半径 $\\varepsilon$ 的开区间 $(a-\\varepsilon,\\ a+\\varepsilon)$ 内。</p>\n<p><b>逻辑</b>:$\\forall\\varepsilon>0,\\ \\exists N\\in\\mathbb{N},\\ \\forall n>N:\\ |x_n-a|<\\varepsilon$。</p>\n<p>翻译成人话:<b>\"你随便给个精度要求,我都能找到足够远的项,使之后所有项都满足这个精度。\"</b>这就排除了\"凑巧接近\"的情况。</p>\n</div>\n\n<div class=\"card eg\">\n<div class=\"label\">✏️ 例 1(用定义证明)</div>\n<p>证明 $\\lim\\limits_{n\\to\\infty}\\dfrac{1}{n}=0$。</p>\n<p><b>证</b>:任给 $\\varepsilon>0$,要使 $\\left|\\dfrac1n - 0\\right| = \\dfrac1n < \\varepsilon$,只需 $n > \\dfrac1\\varepsilon$。</p>\n<p>取 $N = \\left\\lfloor\\dfrac1\\varepsilon\\right\\rfloor + 1$(保证 $N$ 是正整数且 $>1/\\varepsilon$)。则当 $n>N$ 时,$n>1/\\varepsilon$,从而 $\\dfrac1n<\\varepsilon$,即 $\\left|\\dfrac1n-0\\right|<\\varepsilon$。</p>\n<p>由定义,$\\lim\\limits_{n\\to\\infty}\\dfrac1n=0$。$\\blacksquare$</p>\n</div>\n<p>下面用交互图理解 $\\varepsilon$-$N$:调 $\\varepsilon$,程序自动算出所需的 $N$,并高亮 $n>N$ 的项(它们都落在绿色带内)。</p>\n<canvas id=\"cv2\" width=\"780\" height=\"200\"></canvas>\n<div class=\"ctrl\">\n  <label>ε = <span class=\"val\" id=\"v2\">0.15</span></label>\n  <input type=\"range\" id=\"s2\" min=\"2\" max=\"50\" value=\"15\" style=\"width:300px\">\n  <label>N = <span class=\"val\" id=\"v2b\">7</span></label>\n  <span style=\"color:#9ce\">绿带 = (−ε, +ε),n>N 的项全在里面</span>\n</div>\n\n<h3>2.3 几何意义</h3>\n<p>把数列画在数轴上:极限为 $a$ 意味着,无论 $\\varepsilon$ 多小(带子多窄),从某项开始,所有点都钻进 $(a-\\varepsilon,a+\\varepsilon)$ 这条带子里,且再不出来。</p>\n\n<!-- §3 -->\n<h2 id=\"fn\">§3 函数的极限</h2>\n<p>数列是离散的(只有 $n=1,2,3,\\ldots$)。函数 $f(x)$ 的自变量 $x$ 是连续的实数,极限有两种主要情形。</p>\n\n<h3>3.1 $x\\to\\infty$ 时的极限</h3>\n<p>类比数列:当 $|x|$ 无限增大时,$f(x)$ 趋于某个常数 $A$。严格定义用 $\\varepsilon$-$X$:</p>\n<div class=\"card def\">\n<div class=\"label\">📖 定义</div>\n<p>$\\forall\\varepsilon>0,\\ \\exists X>0,\\ \\forall |x|>X:\\ |f(x)-A|<\\varepsilon$,则 $\\lim\\limits_{x\\to\\infty}f(x)=A$。</p>\n<p>(把数列的 $N$ 换成 $X$,把 $n$ 换成连续的 $x$。)</p>\n</div>\n<p>例:$\\lim\\limits_{x\\to\\infty}\\dfrac1x=0$(和数列 $1/n$ 一样,只是 $x$ 连续)。</p>\n\n<h3>3.2 $x\\to x_0$ 时的极限($\\varepsilon$-$\\delta$ 定义)</h3>\n<p>这是理解函数极限的核心定义。研究 $x$ <b>无限靠近某一点 $x_0$</b>(但不必等于 $x_0$)时,$f(x)$ 趋于什么。</p>\n<div class=\"card def\">\n<div class=\"label\">📖 定义($\\varepsilon$-$\\delta$)</div>\n<p>设 $f$ 在 $x_0$ 的某去心邻域有定义。若 $\\forall\\varepsilon>0,\\ \\exists\\delta>0,\\ \\forall x:\\ 0<|x-x_0|<\\delta$,有</p>\n<p class=\"ka\">$$|f(x)-A|<\\varepsilon$$</p>\n<p>则 $\\lim\\limits_{x\\to x_0}f(x)=A$。</p>\n</div>\n<div class=\"card\">\n<p><b>关键点 1</b>:$0<|x-x_0|$ 表示 $x\\neq x_0$。也就是说<b>极限与 $f$ 在 $x_0$ 处的值无关</b>,$f(x_0)$ 甚至可以不存在。</p>\n<p><b>关键点 2</b>:$\\delta$ 依赖于 $\\varepsilon$(给精度,找范围)。$\\varepsilon$ 越小,$\\delta$ 通常越小。</p>\n<p><b>几何意义</b>:在 $y$ 轴上画宽 $\\varepsilon$ 的水平带 $(A-\\varepsilon,A+\\varepsilon)$,必能在 $x$ 轴上找到一个宽 $\\delta$ 的竖直带 $(x_0-\\delta,x_0+\\delta)$,使这个竖直带内的函数图像(除 $x_0$ 点外)全落在水平带里。</p>\n</div>\n<p>交互演示:以 $f(x)=2x+1$ 在 $x_0=1$ 处(极限应为 3)为例。调 $\\varepsilon$,程序自动找 $\\delta$,看图像如何被\"装进\"水平带。</p>\n<canvas id=\"cv3\" width=\"780\" height=\"280\"></canvas>\n<div class=\"ctrl\">\n  <label>ε = <span class=\"val\" id=\"v3\">0.5</span></label>\n  <input type=\"range\" id=\"s3\" min=\"5\" max=\"80\" value=\"50\" style=\"width:300px\">\n  <label>δ = <span class=\"val\" id=\"v3b\">0.25</span></label>\n  <span style=\"color:#9ce\">蓝竖带内的图像(除x₀)全在绿水平带内</span>\n</div>\n\n<h3>3.3 左极限与右极限</h3>\n<p>$x$ 从大于 $x_0$ 一侧逼近叫右极限($x\\to x_0^+$),从小于一侧叫左极限($x\\to x_0^-$)。</p>\n<div class=\"card thm\">\n<div class=\"label\">📐 定理(极限存在的充要条件)</div>\n<p class=\"ka\">$$\\lim_{x\\to x_0}f(x)=A \\iff \\lim_{x\\to x_0^-}f(x)=\\lim_{x\\to x_0^+}f(x)=A$$</p>\n<p>即:左右极限都存在且相等,极限才存在。这常用在分段函数、含绝对值的函数上。</p>\n</div>\n<div class=\"card eg\">\n<div class=\"label\">✏️ 例 2</div>\n<p>讨论 $f(x)=\\dfrac{|x|}{x}$ 在 $x\\to0$ 时的极限。</p>\n<p><b>解</b>:$x\\to0^+$ 时 $|x|=x$,$f(x)=\\dfrac{x}{x}=1$,右极限为 1。</p>\n<p>$x\\to0^-$ 时 $|x|=-x$,$f(x)=\\dfrac{-x}{x}=-1$,左极限为 $-1$。</p>\n<p>左右极限不相等($1\\neq-1$),所以 $\\lim\\limits_{x\\to0}\\dfrac{|x|}{x}$ <b>不存在</b>。$\\blacksquare$</p>\n</div>\n\n<!-- §4 -->\n<h2 id=\"op\">§4 极限的运算法则</h2>\n<p>有了定义,接下来怎么算。以下设 $\\lim f(x)=A,\\ \\lim g(x)=B$ 都存在:</p>\n<div class=\"card\">\n<p>① <b>加减</b>:$\\lim[f(x)\\pm g(x)] = A\\pm B$</p>\n<p>② <b>乘法</b>:$\\lim[f(x)\\cdot g(x)] = A\\cdot B$</p>\n<p>③ <b>除法</b>($B\\neq0$):$\\lim\\dfrac{f(x)}{g(x)} = \\dfrac{A}{B}$</p>\n<p>④ <b>常数倍</b>:$\\lim[c\\cdot f(x)] = c\\cdot A$</p>\n<p>⑤ <b>幂/根</b>($n$ 正整数,$A>0$ 时开偶次根):$\\lim[f(x)]^n = A^n$,$\\lim\\sqrt[n]{f(x)}=\\sqrt[n]{A}$</p>\n<p>⑥ <b>复合</b>:若 $\\lim\\limits_{x\\to x_0}g(x)=u_0$ 且 $\\lim\\limits_{u\\to u_0}f(u)=A$,则 $\\lim\\limits_{x\\to x_0}f(g(x))=A$(需条件)。</p>\n</div>\n<div class=\"note\">⚠️ <b>前提</b>:这些法则要求各部分极限<b>都存在</b>。如果某部分是 $\\infty$ 或不存在,不能直接套!要先用其他方法(约分、有理化、等价无穷小等)。</div>\n<div class=\"card eg\">\n<div class=\"label\">✏️ 例 3(代值型)</div>\n<p>求 $\\lim\\limits_{x\\to2}\\dfrac{x^2+3x-1}{x+5}$。</p>\n<p><b>解</b>:分母 $2+5=7\\neq0$,各部分极限都存在,直接代值:</p>\n<p class=\"ka\">$$\\lim_{x\\to2}\\dfrac{x^2+3x-1}{x+5}=\\dfrac{4+6-1}{7}=\\dfrac97$$</p>\n</div>\n<div class=\"card eg\">\n<div class=\"label\">✏️ 例 4($\\frac00$ 型,需约分)</div>\n<p>求 $\\lim\\limits_{x\\to1}\\dfrac{x^2-1}{x-1}$。</p>\n<p><b>解</b>:直接代入分子分母都是 0(不定式),不能套法则。因式分解约去零因子:</p>\n<p class=\"ka\">$$\\lim_{x\\to1}\\dfrac{(x-1)(x+1)}{x-1}=\\lim_{x\\to1}(x+1)=2$$</p>\n<p>($x\\to1$ 时 $x\\neq1$,可约去 $x-1$。)</p>\n</div>\n\n<!-- §5 -->\n<h2 id=\"crit\">§5 极限存在的两个准则</h2>\n<div class=\"card thm\">\n<div class=\"label\">📐 准则 I(夹逼准则)</div>\n<p>若在 $x_0$ 的某去心邻域内,$g(x)\\le f(x)\\le h(x)$,且 $\\lim g(x)=\\lim h(x)=A$,则 $\\lim f(x)=A$。</p>\n</div>\n<div class=\"card thm\">\n<div class=\"label\">📐 准则 II(单调有界准则)</div>\n<p>单调有界数列必有极限:单调增有上界→收敛于上确界;单调减有下界→收敛于下确界。</p>\n</div>\n<div class=\"card eg\">\n<div class=\"label\">✏️ 例 5(夹逼)</div>\n<p>求 $\\lim\\limits_{n\\to\\infty}\\dfrac{\\sin n}{n}$。</p>\n<p><b>解</b>:因为 $-1\\le\\sin n\\le1$,所以 $-\\dfrac1n\\le\\dfrac{\\sin n}{n}\\le\\dfrac1n$。</p>\n<p>而 $\\lim\\limits_{n\\to\\infty}\\left(-\\dfrac1n\\right)=\\lim\\limits_{n\\to\\infty}\\dfrac1n=0$。由夹逼准则,$\\lim\\limits_{n\\to\\infty}\\dfrac{\\sin n}{n}=0$。$\\blacksquare$</p>\n</div>\n\n<!-- §6 -->\n<h2 id=\"imp\">§6 两个重要极限</h2>\n<p>这两个极限会反复用于推导，应理解它们的<b>形式</b>和<b>结果</b>。</p>\n<div class=\"card thm\">\n<div class=\"label\">⭐ 重要极限一</div>\n<p class=\"ka\">$$\\lim_{x\\to0}\\frac{\\sin x}{x}=1$$</p>\n<p>几何证明:在单位圆中用面积夹逼(详见教材)。这里记住:当 $x\\to0$ 时,$\\sin x$ 与 $x$ 是<b>等价无穷小</b>,$\\sin x\\sim x$。</p>\n</div>\n<canvas id=\"cv4\" width=\"780\" height=\"240\"></canvas>\n<div class=\"ctrl\"><span style=\"color:#9aa\">观察 $\\sin x/x$(蓝)在 $x\\to0$ 时趋近 1(橙虚线)</span></div>\n\n<div class=\"card thm\">\n<div class=\"label\">⭐ 重要极限二</div>\n<p class=\"ka\">$$\\lim_{x\\to\\infty}\\left(1+\\frac1x\\right)^x=e\\approx2.71828\\ldots$$</p>\n<p>等价形式: $\\lim\\limits_{t\\to0}(1+t)^{1/t}=e$。数列形式 $\\lim\\limits_{n\\to\\infty}\\left(1+\\frac1n\\right)^n=e$。</p>\n<p>特征:$1^\\infty$ 型未定式。看到\"底趋于1、指数趋于∞\"就用这个。</p>\n</div>\n<div class=\"card eg\">\n<div class=\"label\">✏️ 例 6</div>\n<p>求 $\\lim\\limits_{x\\to\\infty}\\left(1+\\dfrac{2}{x}\\right)^x$。</p>\n<p><b>解</b>:凑成标准形式。令 $t=x/2$,则 $x=2t$,$x\\to\\infty$ 时 $t\\to\\infty$:</p>\n<p class=\"ka\">$$\\lim_{x\\to\\infty}\\left(1+\\frac2x\\right)^x=\\lim_{t\\to\\infty}\\left(1+\\frac1t\\right)^{2t}=\\left[\\lim_{t\\to\\infty}\\left(1+\\frac1t\\right)^t\\right]^2=e^2$$</p>\n</div>\n\n<!-- §7 例题 -->\n<h2 id=\"ex\">§7 综合例题</h2>\n<div class=\"card eg\">\n<div class=\"label\">✏️ 例 7($\\frac\\infty\\infty$ 型,抓大头)</div>\n<p>求 $\\lim\\limits_{x\\to\\infty}\\dfrac{3x^3-2x+1}{5x^3+x^2-4}$。</p>\n<p><b>解</b>:分子分母同除最高次 $x^3$:</p>\n<p class=\"ka\">$$\\lim_{x\\to\\infty}\\frac{3-\\frac2{x^2}+\\frac1{x^3}}{5+\\frac1x-\\frac4{x^3}}=\\frac{3-0+0}{5+0-0}=\\frac35$$</p>\n<p><b>规律</b>:有理函数 $x\\to\\infty$ 时,极限由最高次项系数决定。</p>\n</div>\n<div class=\"card eg\">\n<div class=\"label\">✏️ 例 8(有理化)</div>\n<p>求 $\\lim\\limits_{x\\to0}\\dfrac{\\sqrt{1+x}-1}{x}$。</p>\n<p><b>解</b>:分子有理化(乘共轭 $\\sqrt{1+x}+1$):</p>\n<p class=\"ka\">$$\\lim_{x\\to0}\\frac{(\\sqrt{1+x}-1)(\\sqrt{1+x}+1)}{x(\\sqrt{1+x}+1)}=\\lim_{x\\to0}\\frac{1+x-1}{x(\\sqrt{1+x}+1)}=\\frac1{1+1}=\\frac12$$</p>\n</div>\n<div class=\"card eg\">\n<div class=\"label\">✏️ 例 9(等价无穷小替换)</div>\n<p>求 $\\lim\\limits_{x\\to0}\\dfrac{\\tan 2x}{\\sin 3x}$。</p>\n<p><b>解</b>:$x\\to0$ 时 $\\tan 2x\\sim2x$,$\\sin3x\\sim3x$:</p>\n<p class=\"ka\">$$\\lim_{x\\to0}\\frac{\\tan2x}{\\sin3x}=\\lim_{x\\to0}\\frac{2x}{3x}=\\frac23$$</p>\n<div class=\"note\">⚠️ 等价无穷小只能用在<b>乘除</b>中,不能在加减中随意替换!</div>\n</div>\n\n<!-- §8 练习 -->\n<h2 id=\"quiz\">§8 练习题(点击展开看解析)</h2>\n\n<div class=\"quiz\">\n<q>1. 求 $\\lim\\limits_{n\\to\\infty}\\dfrac{2n^2+3n-1}{5n^2+n}$。</q>\n<details><summary>看解析</summary>\n<div class=\"ans\">\n同除 $n^2$:$\\dfrac{2+\\frac3n-\\frac1{n^2}}{5+\\frac1n}\\to\\dfrac{2+0-0}{5+0}=\\dfrac25$。\n</div></details>\n</div>\n\n<div class=\"quiz\">\n<q>2. 求 $\\lim\\limits_{x\\to2}\\dfrac{x^2-4}{x-2}$。</q>\n<details><summary>看解析</summary>\n<div class=\"ans\">\n约分:$\\dfrac{(x-2)(x+2)}{x-2}=x+2\\to4$。\n</div></details>\n</div>\n\n<div class=\"quiz\">\n<q>3. 求 $\\lim\\limits_{x\\to0}\\dfrac{\\sin 5x}{2x}$。</q>\n<details><summary>看解析</summary>\n<div class=\"ans\">\n$\\sin5x\\sim5x$:$\\dfrac{5x}{2x}=\\dfrac52$。\n</div></details>\n</div>\n\n<div class=\"quiz\">\n<q>4. 求 $\\lim\\limits_{x\\to\\infty}\\left(1+\\dfrac{1}{x}\\right)^{3x}$。</q>\n<details><summary>看解析</summary>\n<div class=\"ans\">\n凑重要极限二:$\\left[\\left(1+\\frac1x\\right)^x\\right]^3\\to e^3$。\n</div></details>\n</div>\n\n<div class=\"quiz\">\n<q>5. 证明:$\\lim\\limits_{n\\to\\infty}\\dfrac{(-1)^n}{n}=0$(用 $\\varepsilon$-$N$ 定义)。</q>\n<details><summary>看解析</summary>\n<div class=\"ans\">\n任给 $\\varepsilon>0$,要 $\\left|\\dfrac{(-1)^n}{n}-0\\right|=\\dfrac1n<\\varepsilon$,取 $N=\\lfloor1/\\varepsilon\\rfloor+1$。则 $n>N$ 时 $\\dfrac1n<\\varepsilon$。故极限为 0。<br>(注意:虽然 $(-1)^n$ 振荡,但绝对值 $\\to0$,故极限为 0。)\n</div></details>\n</div>\n\n<div class=\"note\" style=\"margin-top:32px\">📚 <b>本章小结</b>:极限是\"无限趋近的稳定值\"。<br>$\\varepsilon$-$N$、$\\varepsilon$-$\\delta$ 是严格语言;运算法则用于计算(注意未定式要先变形);夹逼与单调有界是判定存在的工具;两个重要极限要会凑形式。<br><br><b>下一章</b>:用极限定义\"连续\"与\"间断\",进而为导数做准备。</div>\n\n",mount(root){
 const document={getElementById:id=>root.querySelector('[id="'+id+'"]'),body:root};
 const window={addEventListener:()=>{}};

function scrollToSec(id){ document.getElementById(id).scrollIntoView({behavior:'smooth'}); }

// 等待 KaTeX 加载后渲染
window.addEventListener('load', ()=>{
  if(window.renderMathInElement){
    renderMathInElement(document.body, {
      delimiters:[{left:'$$',right:'$$',display:true},{left:'$',right:'$',display:false}],
      throwOnError:false
    });
  } else { setTimeout(()=>location.reload&&0, 500); }
});

// ===== 可视化 1:数列 1/n 趋近 0 =====
const cv1=document.getElementById('cv1'), ctx1=cv1.getContext('2d');
const s1=document.getElementById('s1'), v1=document.getElementById('v1'), v1b=document.getElementById('v1b');
function draw1(){
  const n=+s1.value; v1.textContent=n; v1b.textContent=(1/n).toFixed(4);
  const w=cv1.width,h=cv1.height; ctx1.clearRect(0,0,w,h);
  const cy=h-30, sx=(w-40)/80;
  // 坐标轴
  ctx1.strokeStyle='#3a3b55'; ctx1.lineWidth=1;
  ctx1.beginPath(); ctx1.moveTo(20,cy); ctx1.lineTo(w-20,cy); ctx1.stroke();
  // 0 线
  ctx1.strokeStyle='#ae4c13'; ctx1.setLineDash([5,5]);
  ctx1.beginPath(); ctx1.moveTo(20,cy-100); ctx1.lineTo(w-20,cy-100); ctx1.stroke(); ctx1.setLineDash([]);
  ctx1.fillStyle='#ae4c13'; ctx1.font='12px monospace'; ctx1.fillText('y=0 (极限)',24,cy-106);
  // 画前 n 个点
  for(let i=1;i<=n;i++){
    const y=1/i, px=20+i*sx, py=cy-y*90;
    ctx1.fillStyle='#245cc5'; ctx1.beginPath(); ctx1.arc(px,py,3,0,7); ctx1.fill();
  }
  // 当前点高亮
  const py=cy-(1/n)*90;
  ctx1.fillStyle='#147557'; ctx1.beginPath(); ctx1.arc(20+n*sx,py,5,0,7); ctx1.fill();
  ctx1.fillStyle='#147557'; ctx1.fillText('x_n=1/n',20+n*sx-20,py-10);
}
s1.oninput=draw1; draw1();

// ===== 可视化 2:ε-N 演示 =====
const cv2=document.getElementById('cv2'), ctx2=cv2.getContext('2d');
const s2=document.getElementById('s2'), v2=document.getElementById('v2'), v2b=document.getElementById('v2b');
function draw2(){
  const eps=+s2.value/100; v2.textContent=eps.toFixed(2);
  const N=Math.ceil(1/eps); v2b.textContent=N;
  const w=cv2.width,h=cv2.height; ctx2.clearRect(0,0,w,h);
  const cx=30, cy=h/2, sx=(w-60)/80, sc=70;
  // ε 绿带
  ctx2.fillStyle='rgba(158,206,106,.15)';
  ctx2.fillRect(cx, cy-eps*sc, w-60, eps*sc*2);
  ctx2.strokeStyle='#147557'; ctx2.setLineDash([4,4]);
  ctx2.beginPath(); ctx2.moveTo(cx,cy-eps*sc); ctx2.lineTo(w-30,cy-eps*sc);
  ctx2.moveTo(cx,cy+eps*sc); ctx2.lineTo(w-30,cy+eps*sc); ctx2.stroke(); ctx2.setLineDash([]);
  ctx2.fillStyle='#147557'; ctx2.font='11px monospace';
  ctx2.fillText('+ε',cx-22,cy-eps*sc+4); ctx2.fillText('-ε',cx-22,cy+eps*sc+4);
  // 轴
  ctx2.strokeStyle='#3a3b55'; ctx2.beginPath(); ctx2.moveTo(cx,cy); ctx2.lineTo(w-30,cy); ctx2.stroke();
  // N 竖线
  ctx2.strokeStyle='#ae4c13'; ctx2.setLineDash([2,2]);
  ctx2.beginPath(); ctx2.moveTo(cx+N*sx,10); ctx2.lineTo(cx+N*sx,h-10); ctx2.stroke(); ctx2.setLineDash([]);
  ctx2.fillStyle='#ae4c13'; ctx2.fillText('N='+N,cx+N*sx-15,12);
  // 数列点 1/n
  for(let i=1;i<=80;i++){
    const y=1/i, px=cx+i*sx, py=cy-y*sc;
    if(i>N){ ctx2.fillStyle='#147557'; }
    else { ctx2.fillStyle='#245cc5'; }
    ctx2.beginPath(); ctx2.arc(px,py,2.5,0,7); ctx2.fill();
  }
}
s2.oninput=draw2; draw2();

// ===== 可视化 3:ε-δ 演示 f(x)=2x+1, x0=1, A=3 =====
const cv3=document.getElementById('cv3'), ctx3=cv3.getContext('2d');
const s3=document.getElementById('s3'), v3=document.getElementById('v3'), v3b=document.getElementById('v3b');
function draw3(){
  const eps=+s3.value/100; v3.textContent=eps.toFixed(2);
  // f(x)=2x+1, x0=1, A=3. 要 |2x+1-3|=|2x-2|=2|x-1|<ε => |x-1|<ε/2 => δ=eps/2
  const delta=eps/2; v3b.textContent=delta.toFixed(3);
  const w=cv3.width,h=cv3.height; ctx3.clearRect(0,0,w,h);
  const x0=1, A=3;
  const cx0=120, cy0=h-50, sx=120, sy=70; // 原点在左下偏移
  const toPx=(x,y)=>[cx0+x*sx, cy0-y*sy];
  // ε 水平绿带
  ctx3.fillStyle='rgba(158,206,106,.12)';
  const [_,ty]=toPx(0,A+eps),[__,by]=toPx(0,A-eps);
  ctx3.fillRect(cx0-100, ty, w-140, by-ty);
  ctx3.strokeStyle='#147557'; ctx3.setLineDash([4,4]);
  ctx3.beginPath(); ctx3.moveTo(cx0-100,toPx(0,A+eps)[1]); ctx3.lineTo(w-20,toPx(0,A+eps)[1]);
  ctx3.moveTo(cx0-100,toPx(0,A-eps)[1]); ctx3.lineTo(w-20,toPx(0,A-eps)[1]); ctx3.stroke(); ctx3.setLineDash([]);
  // δ 竖直蓝带
  ctx3.fillStyle='rgba(122,162,247,.12)';
  const [lx,_l]=toPx(x0-delta,0),[rx,_r]=toPx(x0+delta,0);
  ctx3.fillRect(lx, 10, rx-lx, h-60);
  ctx3.strokeStyle='#245cc5'; ctx3.setLineDash([4,4]);
  ctx3.beginPath(); ctx3.moveTo(lx,10); ctx3.lineTo(lx,h-50);
  ctx3.moveTo(rx,10); ctx3.lineTo(rx,h-50); ctx3.stroke(); ctx3.setLineDash([]);
  // 坐标轴
  ctx3.strokeStyle='#3a3b55'; ctx3.lineWidth=1.5;
  ctx3.beginPath(); ctx3.moveTo(cx0-100,cy0); ctx3.lineTo(w-20,cy0);
  ctx3.moveTo(cx0,cy0+40); ctx3.lineTo(cx0,10); ctx3.stroke();
  ctx3.fillStyle='#889'; ctx3.font='11px monospace';
  ctx3.fillText('x',w-28,cy0-6); ctx3.fillText('y',cx0+6,16);
  // 函数 f(x)=2x+1
  ctx3.strokeStyle='#ae4c13'; ctx3.lineWidth=2;
  ctx3.beginPath();
  for(let x=-0.5;x<=2.5;x+=0.02){
    const y=2*x+1; const [px,py]=toPx(x,y);
    if(py>0&&py<h){ if(x===-0.5)ctx3.moveTo(px,py); else ctx3.lineTo(px,py); }
  }
  ctx3.stroke();
  // x0, A 点
  const [px0,py0]=toPx(x0,A);
  ctx3.fillStyle='#fff'; ctx3.beginPath(); ctx3.arc(px0,py0,4,0,7); ctx3.fill();
  ctx3.fillText('(1, 3)',px0+6,py0-6);
  // 标注
  ctx3.fillStyle='#147557'; ctx3.fillText('A+ε',cx0-34,toPx(0,A+eps)[1]+4);
  ctx3.fillText('A-ε',cx0-34,toPx(0,A-eps)[1]+4);
  ctx3.fillStyle='#245cc5'; ctx3.fillText('x₀-δ',lx-18,cy0+14);
  ctx3.fillText('x₀+δ',rx-18,cy0+14);
}
s3.oninput=draw3; draw3();

// ===== 可视化 4:sin(x)/x =====
const cv4=document.getElementById('cv4'), ctx4=cv4.getContext('2d');
function draw4(){
  const w=cv4.width,h=cv4.height; ctx4.clearRect(0,0,w,h);
  const cx=w/2, cy=h/2, sx=60, sy=80;
  // 轴
  ctx4.strokeStyle='#3a3b55'; ctx4.lineWidth=1;
  ctx4.beginPath(); ctx4.moveTo(0,cy); ctx4.lineTo(w,cy); ctx4.moveTo(cx,0); ctx4.lineTo(cx,h); ctx4.stroke();
  // y=1 虚线(极限)
  ctx4.strokeStyle='#ae4c13'; ctx4.setLineDash([5,4]);
  ctx4.beginPath(); ctx4.moveTo(0,cy-sy); ctx4.lineTo(w,cy-sy); ctx4.stroke(); ctx4.setLineDash([]);
  ctx4.fillStyle='#ae4c13'; ctx4.font='11px monospace'; ctx4.fillText('y=1 (极限)',6,cy-sy-4);
  // sin(x)/x
  ctx4.strokeStyle='#245cc5'; ctx4.lineWidth=2;
  ctx4.beginPath();
  for(let px=0;px<w;px++){
    const x=(px-cx)/sx;
    let y; if(Math.abs(x)<0.001) y=1; else y=Math.sin(x)/x;
    const py=cy-y*sy;
    if(px===0)ctx4.moveTo(px,py); else ctx4.lineTo(px,py);
  }
  ctx4.stroke();
  // sin x 参考
  ctx4.strokeStyle='#5a5b75'; ctx4.lineWidth=1;
  ctx4.beginPath();
  for(let px=0;px<w;px++){ const x=(px-cx)/sx; const py=cy-Math.sin(x)*sy; if(px===0)ctx4.moveTo(px,py); else ctx4.lineTo(px,py); }
  ctx4.stroke();
  ctx4.fillStyle='#245cc5'; ctx4.fillText('sin(x)/x',cx+sx+6,cy-sy+14);
  ctx4.fillStyle='#5a5b75'; ctx4.fillText('sin(x)',cx+sx+6,cy+14);
}
draw4();

}};
