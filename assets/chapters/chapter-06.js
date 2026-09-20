/* 多元函数微分学：统一教材专题正文与实验。仅在本章容器内挂载控件。 */
window.COURSE_CHAPTERS=window.COURSE_CHAPTERS||{};
window.COURSE_CHAPTERS["chapter-06"]={html:"\n\n<div class=\"cover\">\n  <div class=\"eyebrow\">第六章 · 多元函数微分学</div>\n  <h1>多元函数微分学</h1>\n  <p class=\"lead\">从一张曲面图出发,把偏导、全微分、链式、隐函数、梯度、极值一气贯通。微积分从一维升到二维,核心只多了一个变量--但所有定理都得\"换个壳\"。配 12 道分级例题与 8 道练习。学完它,多元微分就只剩一道重积分的门槛。</p>\n  <div class=\"meta\">\n    <div class=\"m\"><b>约 80 分钟</b></div>\n    <div class=\"m\"><b>12 例题 · 8 练习</b></div>\n    <div class=\"m\"><b>4 个交互演示</b></div>\n  </div>\n</div>\n\n<h2 id=\"intro\"><span class=\"n\">01</span>从曲面说起:多元函数与它的图</h2>\n<p>一元函数 $y=f(x)$ 是平面上的一条曲线。把自变量再添一个,得到二元函数 $z=f(x,y)$--它的图像 $\\{(x,y,z):z=f(x,y)\\}$ 是<b>空间中的一张曲面</b>。</p>\n<p>怎么\"看见\"一张曲面?两个办法。一是直接画三维图;二是把它\"切片\"--把 $z$ 取相同值的所有 $(x,y)$ 点连起来,得到平面上的曲线,叫<b>等高线(等值线)</b>。山地图用的就是这套:每条线代表同一海拔,线越密坡越陡。</p>\n\n<div class=\"card def\"><span class=\"tag\">定义 · 二元函数</span>\n<p>设 $D$ 是 $xy$ 平面上的一个点集。若对每个 $(x,y)\\in D$,按某规则有唯一实数 $z$ 与之对应,则称 $z=f(x,y)$ 是 $D$ 上的二元函数,$D$ 是定义域,$f(D)$ 是值域。</p></div>\n\n<div class=\"card def\"><span class=\"tag\">定义 · 二重极限</span>\n<p>设 $f$ 在 $(x_0,y_0)$ 的某去心邻域有定义。若存在常数 $A$,使对任意 $\\varepsilon>0$,存在 $\\delta>0$,当</p>\n<p class=\"ka\">$$0<\\sqrt{(x-x_0)^2+(y-y_0)^2}<\\delta$$</p>\n<p>时恒有 $|f(x,y)-A|<\\varepsilon$,则称 $(x,y)\\to(x_0,y_0)$ 时 $f\\to A$,记 $\\lim\\limits_{(x,y)\\to(x_0,y_0)}f(x,y)=A$。</p></div>\n\n<div class=\"card tip\"><span class=\"tag\">关键陷阱</span>\n<p>二重极限要求<b>从任何方向</b>趋近都得到同一个 $A$。沿 $y=kx$、沿抛物线 $y=x^2$、沿任意路径,只要有一条路径极限不存在或与其它不同,二重极限就不存在。一条反例路径即可否定极限存在；有限条路径相同则不能证明极限存在。</p></div>\n\n<div class=\"card def\"><span class=\"tag\">定义 · 连续</span>\n<p>若 $\\lim\\limits_{(x,y)\\to(x_0,y_0)}f(x,y)=f(x_0,y_0)$,称 $f$ 在 $(x_0,y_0)$ <b>连续</b>。直观理解:曲面上没有\"洞\"和\"跳\"。多元初等函数在其定义域内连续。</p></div>\n\n<div class=\"viz\">\n<div class=\"vt\">交互演示</div>\n<h4>曲面与等高线</h4>\n<p>以 $z=f(x,y)=x^2+y^2$ 为例(开口朝上的旋转抛物面,顶在原点)。橙虚圆是等高线 $z=1,2,4,6,9$。拖动点 $P$,右上角实时显示 $f(P)$--它在告诉你\"站在这一点,海拔多高\"。</p>\n<canvas id=\"cv1\" width=\"780\" height=\"340\"></canvas>\n<div class=\"ctrl\">\n  <label>P.x = <span class=\"val\" id=\"v1x\">1.0</span></label>\n  <input type=\"range\" id=\"s1x\" min=\"-2.5\" max=\"2.5\" step=\"0.1\" value=\"1\" style=\"width:200px\">\n  <label>P.y = <span class=\"val\" id=\"v1y\">1.0</span></label>\n  <input type=\"range\" id=\"s1y\" min=\"-2.5\" max=\"2.5\" step=\"0.1\" value=\"1\" style=\"width:200px\">\n  <span class=\"val\" id=\"v1z\" style=\"color:var(--ok)\">z = 2.00</span>\n</div>\n<div class=\"note\">原点是最低点(海拔 0),离原点越远 $z$ 越大。这一张图后面会反复出现:偏导、梯度、极值都长在它身上。</div>\n</div>\n\n<h2 id=\"partial\"><span class=\"n\">02</span>偏导数:固定一个变量看变化</h2>\n<p>站在曲面某点 $P=(x_0,y_0)$,你脚下能朝两个独立方向走--朝 $x$ 或朝 $y$。只朝 $x$ 方向走(把 $y$ 死死按住不变),脚下坡度就是<b>对 $x$ 的偏导数</b> $f_x$。</p>\n\n<div class=\"card def\"><span class=\"tag\">定义 · 偏导数</span>\n<p>$f$ 在 $(x_0,y_0)$ 对 $x$ 的偏导数:</p>\n<p class=\"ka\">$$f_x(x_0,y_0)=\\lim_{\\Delta x\\to 0}\\frac{f(x_0+\\Delta x,\\,y_0)-f(x_0,y_0)}{\\Delta x}$$</p>\n<p>对 $y$ 同理(把 $x$ 固定,让 $y$ 变)。记号:$f_x,\\ \\dfrac{\\partial f}{\\partial x},\\ \\partial_x f$。</p></div>\n\n<div class=\"card tip\"><span class=\"tag\">计算口诀</span>\n<p>求 $f_x$ 时,把 $y$ 当作常数,对 $x$ 用一元求导法则(同样可用链式、乘积、商法则)。求 $f_y$ 反过来。$y$ 当常数后,$\\sin(xy)$ 对 $x$ 求导还得用复合:$y\\cos(xy)$。</p></div>\n\n<h3>二阶偏导与 Schwarz 定理</h3>\n<p>偏导仍是 $x,y$ 的函数,可继续求偏,得四个二阶偏导:</p>\n<p class=\"ka\">$$f_{xx},\\quad f_{xy}=\\frac{\\partial^2 f}{\\partial y\\partial x},\\quad f_{yx}=\\frac{\\partial^2 f}{\\partial x\\partial y},\\quad f_{yy}$$</p>\n<div class=\"card thm\"><span class=\"tag\">定理 · Schwarz(混合偏导相等)</span>\n<p>若 $f_{xy}$ 与 $f_{yx}$ 在 $(x_0,y_0)$ 都连续,则</p>\n<p class=\"ka\">$$f_{xy}(x_0,y_0)=f_{yx}(x_0,y_0)$$</p>\n<p>交换混合偏导的次序前，须核对上述邻域内连续条件；不能只凭函数有初等表达式就默认可以交换。</p></div>\n\n<div class=\"viz\">\n<div class=\"vt\">交互演示</div>\n<h4>偏导 = 固定 y 时的切线斜率</h4>\n<p>固定 $y=y_0$,曲面被\"切\"出一条曲线 $z=x^2+y_0^2$。在 $x=x_0$ 处作切线,斜率正是 $f_x(x_0,y_0)=2x_0$。蓝曲线随 $y_0$ 上下平移,橙虚切线随 $x_0$ 改变斜率。</p>\n<canvas id=\"cv2\" width=\"780\" height=\"300\"></canvas>\n<div class=\"ctrl\">\n  <label>y₀ = <span class=\"val\" id=\"v2y\">0.5</span></label>\n  <input type=\"range\" id=\"s2y\" min=\"-2\" max=\"2\" step=\"0.1\" value=\"0.5\" style=\"width:200px\">\n  <label>x₀ = <span class=\"val\" id=\"v2x\">1.0</span></label>\n  <input type=\"range\" id=\"s2x\" min=\"-2.5\" max=\"2.5\" step=\"0.1\" value=\"1\" style=\"width:200px\">\n  <span class=\"val\" id=\"v2s\" style=\"color:var(--warn)\">f_x = 2.00</span>\n</div>\n<div class=\"note\">把 $y_0$ 拖到不同值,蓝曲线上下平移但形状不变(因为固定 $y$ 时 $z=x^2+y_0^2$ 仍是 $x$ 的抛物线)。切线斜率 $2x_0$ 与 $y_0$ 无关--这就是\"偏导只看一个方向\"。</div>\n</div>\n\n<h2 id=\"diff\"><span class=\"n\">03</span>全微分:两个变量同时变的\"线性近似\"</h2>\n<p>偏导只看一个方向。但现实中 $x,y$ 经常一起变一点点 $\\Delta x,\\Delta y$。$z$ 总共变多少?若 $f$ 足够光滑,变化量可拆成\"线性主部 + 高阶小量\":</p>\n\n<div class=\"card def\"><span class=\"tag\">定义 · 可微与全微分</span>\n<p>若 $\\Delta z$ 能写成</p>\n<p class=\"ka\">$$\\Delta z=f_x(x_0,y_0)\\,\\Delta x+f_y(x_0,y_0)\\,\\Delta y+o(\\rho),\\quad \\rho=\\sqrt{\\Delta x^2+\\Delta y^2}$$</p>\n<p>则称 $f$ 在 $(x_0,y_0)$ <b>可微</b>。线性主部叫<b>全微分</b>:</p>\n<p class=\"ka\">$$dz=f_x\\,dx+f_y\\,dy$$</p></div>\n\n<div class=\"card thm\"><span class=\"tag\">关系链(必背)</span>\n<p><b>① 可微 ⇒ 偏导存在</b>(且 $f$ 在该点连续)。</p>\n<p><b>② 偏导存在 ⇏ 可微</b>(经典反例见例 4)。</p>\n<p><b>③ 偏导连续 ⇒ 可微</b>(常用充分条件,初等函数都满足)。</p>\n<p><b>④ 可微 ⇒ 连续</b>;但偏导存在 ⇏ 连续。</p></div>\n\n<div class=\"note\"><b>直觉</b>:全微分是\"用切平面代替曲面\"的近似。$\\Delta z$ 是真实爬升,$dz$ 是切平面上的爬升,误差是 $o(\\rho)$--比 $\\rho$ 更快趋于 0。这就是为何能用 $dz$ 算近似值的根本。</div>\n\n<h2 id=\"chain\"><span class=\"n\">04</span>复合函数求导:链式法则的多元版</h2>\n<p>一元链式 $\\frac{d}{dx}f(g(x))=f'(g)\\cdot g'(x)$。到了多元,因为中间变量可以多个、自变量也可以多个,公式变成\"沿每条路径相乘再相加\"。</p>\n\n<div class=\"card thm\"><span class=\"tag\">定理 · 链式法则(基本形)</span>\n<p>若 $z=f(u,v)$ 可微,$u=u(x,y),\\ v=v(x,y)$ 可微,则</p>\n<p class=\"ka\">$$\\frac{\\partial z}{\\partial x}=\\frac{\\partial z}{\\partial u}\\frac{\\partial u}{\\partial x}+\\frac{\\partial z}{\\partial v}\\frac{\\partial v}{\\partial x},\\quad \\frac{\\partial z}{\\partial y}=\\frac{\\partial z}{\\partial u}\\frac{\\partial u}{\\partial y}+\\frac{\\partial z}{\\partial v}\\frac{\\partial v}{\\partial y}$$</p></div>\n\n<div class=\"card tip\"><span class=\"tag\">画树图防错</span>\n<p>把变量关系画成树:$z$ 在顶,$z\\to u,v$;$u\\to x,y$,$v\\to x,y$。求 $\\partial z/\\partial x$ 时,从 $z$ 走到 $x$ 的每条路径都\"逐段相乘,路径相加\"。两条路径:$z\\to u\\to x$ 与 $z\\to v\\to x$。这就是公式的来历,画错就漏项。</p></div>\n\n<div class=\"card thm\"><span class=\"tag\">全微分形式不变性</span>\n<p>无论 $u,v$ 是自变量还是中间变量,$z=f(u,v)$ 的全微分形式不变:</p>\n<p class=\"ka\">$$dz=f_u\\,du+f_v\\,dv$$</p>\n<p>这一性质让你可以\"假装 $u,v$ 独立\"来算 $dz$,在抽象函数题里特别好用。</p></div>\n\n<h2 id=\"implicit\"><span class=\"n\">05</span>隐函数求导:方程藏起来的函数</h2>\n<p>有的函数不是显式给出 $y=f(x)$,而是藏在方程 $F(x,y)=0$ 里。给定条件后能解出 $y$ 的偏导吗?</p>\n\n<div class=\"card thm\"><span class=\"tag\">定理 · 一个方程 $F(x,y)=0$</span>\n<p>若 $F_y\\ne 0$,方程在局部确定 $y=y(x)$,且</p>\n<p class=\"ka\">$$\\frac{dy}{dx}=-\\frac{F_x}{F_y}$$</p>\n<p>三元 $F(x,y,z)=0$ 确定 $z=z(x,y)$ 时:$\\dfrac{\\partial z}{\\partial x}=-\\dfrac{F_x}{F_z}$,$\\dfrac{\\partial z}{\\partial y}=-\\dfrac{F_y}{F_z}$。规律:把要求的变量放右边分母,其余变量与\"求导变量\"轮流做分子并加负号。</p></div>\n\n<h3>方程组情形</h3>\n<p>若方程组 $\\begin{cases}F(x,y,u,v)=0\\\\ G(x,y,u,v)=0\\end{cases}$ 确定 $u=u(x,y),\\ v=v(x,y)$,常用做法是<b>两边对某变量求偏导再解线性方程组</b>。公式也可用雅可比行列式写,也可以直接逐步求导，并核验线性方程组可解的条件。</p>\n\n<div class=\"card def\"><span class=\"tag\">雅可比(参考)</span>\n<p>记 $J=\\dfrac{\\partial(F,G)}{\\partial(u,v)}=\\begin{vmatrix}F_u&F_v\\\\G_u&G_v\\end{vmatrix}$,则 $J\\ne 0$ 时</p>\n<p class=\"ka\">$$\\frac{\\partial u}{\\partial x}=-\\frac{1}{J}\\frac{\\partial(F,G)}{\\partial(x,v)},\\quad \\frac{\\partial v}{\\partial x}=-\\frac{1}{J}\\frac{\\partial(F,G)}{\\partial(u,x)}$$</p></div>\n\n<h2 id=\"grad\"><span class=\"n\">06</span>方向导数与梯度:最陡上升方向</h2>\n<p>偏导只看了 $x$、$y$ 两个方向。任意方向 $\\mathbf{l}=(\\cos\\alpha,\\cos\\beta)$(单位向量),函数沿 $\\mathbf{l}$ 走的变化率是多少?这就是<b>方向导数</b>。</p>\n\n<div class=\"card def\"><span class=\"tag\">定义 · 方向导数</span>\n<p>沿单位方向 $\\mathbf{l}=(\\cos\\alpha,\\cos\\beta)$,</p>\n<p class=\"ka\">$$\\frac{\\partial f}{\\partial \\mathbf{l}}=f_x\\cos\\alpha+f_y\\cos\\beta=\\nabla f\\cdot \\mathbf{l}$$</p></div>\n\n<div class=\"card def\"><span class=\"tag\">定义 · 梯度</span>\n<p>向量 $\\nabla f=\\mathrm{grad}\\,f=(f_x,f_y)$ 称为 $f$ 在该点的<b>梯度</b>。</p></div>\n\n<div class=\"card thm\"><span class=\"tag\">梯度的三大意义(必背)</span>\n<p><b>① 方向导数 = 梯度在方向上的投影</b>:$\\frac{\\partial f}{\\partial\\mathbf{l}}=\\nabla f\\cdot\\mathbf{l}=|\\nabla f|\\cos\\theta$,$\\theta$ 为 $\\nabla f$ 与 $\\mathbf{l}$ 夹角。</p>\n<p><b>② 最大方向导数 = $|\\nabla f|$</b>,方向就是 $\\nabla f$ 的方向--梯度方向是\"最陡上升方向\"。</p>\n<p><b>③ 梯度垂直于等值线</b>:沿等值线方向走,$f$ 不变,方向导数为 0,故 $\\mathbf{l}\\perp\\nabla f$。山地图上等高线越密,梯度越大、坡越陡。</p></div>\n\n<div class=\"note\"><b>直觉</b>:把曲面想象成山坡,梯度是\"指南针\",永远指向\"最陡上坡\"。沿它走升得最快;反方向(负梯度)下坡最快;沿等高线走不动海拔。</div>\n\n<div class=\"viz\">\n<div class=\"vt\">交互演示</div>\n<h4>梯度场与方向导数</h4>\n<p>仍在 $f=x^2+y^2$ 上。粉红箭头是梯度 $\\nabla f=(2x,2y)$--永远指向外(往高处)。青箭头是任选方向 $\\mathbf{l}$。转方向角度,看右下角方向导数怎么变:与梯度同向时最大,反向时最小(负)。</p>\n<canvas id=\"cv3\" width=\"780\" height=\"340\"></canvas>\n<div class=\"ctrl\">\n  <label>P.x = <span class=\"val\" id=\"v3x\">1.0</span></label>\n  <input type=\"range\" id=\"s3x\" min=\"-2\" max=\"2\" step=\"0.1\" value=\"1\" style=\"width:160px\">\n  <label>P.y = <span class=\"val\" id=\"v3y\">1.0</span></label>\n  <input type=\"range\" id=\"s3y\" min=\"-2\" max=\"2\" step=\"0.1\" value=\"1\" style=\"width:160px\">\n  <label>方向角 θ = <span class=\"val\" id=\"v3t\">0°</span></label>\n  <input type=\"range\" id=\"s3t\" min=\"0\" max=\"360\" step=\"5\" value=\"0\" style=\"width:160px\">\n</div>\n<div class=\"ctrl\">\n  <span class=\"val\" style=\"color:var(--pink)\">∇f = (2.0, 2.0), |∇f| = 2.83</span>\n  <span class=\"val\" id=\"v3d\" style=\"color:var(--teal)\">方向导数 D_u f = 2.00</span>\n</div>\n<div class=\"note\">把 $\\theta$ 转到与梯度同向(此例约 $45°$),方向导数达到最大 $|\\nabla f|=2.83$;转到反方向($225°$)变 $-2.83$(最陡下降);转到与等高线相切($135°$ 或 $315°$)变 0。这就是\"梯度 = 最陡上升\"的全部含义。</div>\n</div>\n\n<h2 id=\"extr\"><span class=\"n\">07</span>多元极值:无条件与条件</h2>\n<h3>无条件极值</h3>\n<div class=\"card thm\"><span class=\"tag\">必要条件</span>\n<p>若 $f$ 在 $(x_0,y_0)$ 取得极值且偏导存在,则</p>\n<p class=\"ka\">$$f_x(x_0,y_0)=0,\\quad f_y(x_0,y_0)=0$$</p>\n<p>满足此式的点叫<b>驻点</b>。极值点必是驻点或偏导不存在的点。</p></div>\n\n<div class=\"card thm\"><span class=\"tag\">充分条件 · 二阶判别(Hessian)</span>\n<p>设 $(x_0,y_0)$ 是驻点,$f$ 在该点二阶偏导连续。记</p>\n<p class=\"ka\">$$A=f_{xx},\\quad B=f_{xy},\\quad C=f_{yy},\\quad \\Delta=AC-B^2$$</p>\n<table>\n<tr><th>$\\Delta$</th><th>$A$</th><th>结论</th></tr>\n<tr><td>$>0$</td><td>$>0$</td><td>极小值</td></tr>\n<tr><td>$>0$</td><td>$<0$</td><td>极大值</td></tr>\n<tr><td>$<0$</td><td>—</td><td>鞍点(非极值)</td></tr>\n<tr><td>$=0$</td><td>—</td><td>无法判定,需另法</td></tr>\n</table>\n<p>$\\Delta=AC-B^2$ 是 Hessian 矩阵 $\\begin{pmatrix}A&B\\\\B&C\\end{pmatrix}$ 的行列式。</p></div>\n\n<h3>条件极值(拉格朗日乘数法)</h3>\n<p>求 $f(x,y)$ 在约束 $\\varphi(x,y)=0$ 下的极值,引入拉格朗日函数</p>\n<p class=\"ka\">$$L(x,y,\\lambda)=f(x,y)-\\lambda\\,\\varphi(x,y)$$</p>\n<p>解方程组 $\\begin{cases}L_x=0\\\\L_y=0\\\\\\varphi=0\\end{cases}$,得到的点即可能极值点。约束是等式时,该方法把\"有约束优化\"变成\"无约束驻点\"。</p>\n\n<div class=\"card tip\"><span class=\"tag\">为什么 $\\lambda$ 有用</span>\n<p>极值点处,$\\nabla f$ 必与约束曲线相切方向垂直--也就是与 $\\nabla\\varphi$ 平行(因 $\\nabla\\varphi$ 也垂直于约束曲线)。即 $\\nabla f=\\lambda\\nabla\\varphi$,这正是 $L_x=0,L_y=0$ 的几何含义。$\\lambda$ 就是两个梯度的\"比例\"。</p></div>\n\n<div class=\"viz\">\n<div class=\"vt\">交互演示</div>\n<h4>极值点的三种长相</h4>\n<p>切换函数,看驻点(原点)附近的等高线长相。<b>极小</b>:等高线一圈圈向外变大(碗);<b>极大</b>:等高线一圈圈向外变小(倒碗);<b>鞍点</b>:等高线是双曲线,有\"上坡也有下坡\"。</p>\n<canvas id=\"cv4\" width=\"780\" height=\"340\"></canvas>\n<div class=\"ctrl\">\n  <label>函数 <select id=\"sel4\">\n    <option value=\"min\">z = x²+y²(极小)</option>\n    <option value=\"max\">z = -(x²+y²)(极大)</option>\n    <option value=\"saddle\">z = x²-y²(鞍点)</option>\n  </select></label>\n  <span class=\"val\" id=\"v4t\" style=\"color:var(--warn)\">驻点(0,0):极小值</span>\n</div>\n<div class=\"note\">鞍点的几何:沿 $x$ 轴是开口朝上的抛物线(升),沿 $y$ 轴是开口朝下的(降)--所以既不是极大也不是极小。这正是 $\\Delta<0$ 的几何含义。</div>\n</div>\n\n<h2 id=\"eg\"><span class=\"n\">08</span>例题精讲(12 道,由易到难)</h2>\n\n<div class=\"card eg\"><span class=\"tag\">例 1 · 偏导基础</span>\n<p>设 $z=x^2y+\\sin(xy)$,求 $\\dfrac{\\partial z}{\\partial x},\\dfrac{\\partial z}{\\partial y}$。</p>\n<div class=\"step\"><span class=\"sn\">01</span>对 $x$ 求偏导,把 $y$ 当常数:$\\dfrac{\\partial z}{\\partial x}=2xy+\\dfrac{\\partial}{\\partial x}\\sin(xy)$。</div>\n<div class=\"step\"><span class=\"sn\">02</span>$\\sin(xy)$ 对 $x$ 用复合($y$ 是常数):$\\dfrac{d}{dx}\\sin(xy)=y\\cos(xy)$。</div>\n<div class=\"step\"><span class=\"sn\">03</span>所以 $\\dfrac{\\partial z}{\\partial x}=2xy+y\\cos(xy)=y\\bigl(2x+\\cos(xy)\\bigr)$。</div>\n<div class=\"step\"><span class=\"sn\">04</span>同理对 $y$:$\\dfrac{\\partial z}{\\partial y}=x^2+x\\cos(xy)=x\\bigl(x+\\cos(xy)\\bigr)$。$\\blacksquare$</div></div>\n\n<div class=\"card eg\"><span class=\"tag\">例 2 · 高阶偏导 + Schwarz</span>\n<p>设 $z=\\ln(x+y^2)$,求全部二阶偏导并验证 $f_{xy}=f_{yx}$。</p>\n<div class=\"step\"><span class=\"sn\">01</span>一阶:$z_x=\\dfrac{1}{x+y^2}$,$z_y=\\dfrac{2y}{x+y^2}$。</div>\n<div class=\"step\"><span class=\"sn\">02</span>$z_{xx}=\\dfrac{\\partial}{\\partial x}\\dfrac{1}{x+y^2}=-\\dfrac{1}{(x+y^2)^2}$。</div>\n<div class=\"step\"><span class=\"sn\">03</span>$z_{xy}=\\dfrac{\\partial}{\\partial y}\\dfrac{1}{x+y^2}=-\\dfrac{2y}{(x+y^2)^2}$。</div>\n<div class=\"step\"><span class=\"sn\">04</span>$z_{yx}=\\dfrac{\\partial}{\\partial x}\\dfrac{2y}{x+y^2}=-\\dfrac{2y}{(x+y^2)^2}$。</div>\n<div class=\"step\"><span class=\"sn\">05</span>比较:$z_{xy}=z_{yx}=-\\dfrac{2y}{(x+y^2)^2}$,验证 Schwarz 定理成立(初等函数二阶混合偏导连续)。$z_{yy}=\\dfrac{2(x-y^2)}{(x+y^2)^2}$。$\\blacksquare$</div></div>\n\n<div class=\"card eg\"><span class=\"tag\">例 3 · 全微分计算</span>\n<p>设 $z=e^{xy}$,求 $dz$。</p>\n<div class=\"step\"><span class=\"sn\">01</span>求偏导:$z_x=ye^{xy}$,$z_x$ 把 $y$ 当常数,$e^{xy}$ 对 $x$ 求导乘 $y$。</div>\n<div class=\"step\"><span class=\"sn\">02</span>同理 $z_y=xe^{xy}$。</div>\n<div class=\"step\"><span class=\"sn\">03</span>$dz=z_x\\,dx+z_y\\,dy=e^{xy}(y\\,dx+x\\,dy)$。$\\blacksquare$</div>\n<div class=\"note\">结果可写成 $dz=e^{xy}(y\\,dx+x\\,dy)$,这种\"提取公因子\"的形式更利后续计算。</div></div>\n\n<div class=\"card eg\"><span class=\"tag\">例 4 · 偏导存在但不可微(经典反例)</span>\n<p>设 $f(x,y)=\\dfrac{xy}{\\sqrt{x^2+y^2}}$ ($x^2+y^2\\ne 0$),$f(0,0)=0$。证明 $f_x(0,0),f_y(0,0)$ 存在,但 $f$ 在原点不可微。</p>\n<div class=\"step\"><span class=\"sn\">01</span>用定义求 $f_x(0,0)$:$f_x(0,0)=\\lim\\limits_{\\Delta x\\to 0}\\dfrac{f(\\Delta x,0)-f(0,0)}{\\Delta x}=\\lim\\dfrac{0/\\lvert\\Delta x\\rvert-0}{\\Delta x}=0$。</div>\n<div class=\"step\"><span class=\"sn\">02</span>同理 $f_y(0,0)=0$。偏导存在。</div>\n<div class=\"step\"><span class=\"sn\">03</span>若可微,$\\Delta z=0\\cdot dx+0\\cdot dy+o(\\rho)$,即 $\\lim\\limits_{(h,k)\\to(0,0)}\\dfrac{f(h,k)}{\\sqrt{h^2+k^2}}=0$。</div>\n<div class=\"step\"><span class=\"sn\">04</span>算此极限:$\\dfrac{f(h,k)}{\\sqrt{h^2+k^2}}=\\dfrac{hk}{h^2+k^2}$。</div>\n<div class=\"step\"><span class=\"sn\">05</span>取路径 $k=mh$:$\\dfrac{mh^2}{h^2(1+m^2)}=\\dfrac{m}{1+m^2}$,依赖 $m$,极限不存在。</div>\n<div class=\"step\"><span class=\"sn\">06</span>故 $f$ 在原点不可微。$\\blacksquare$</div>\n<div class=\"note\">此例揭示:\"偏导存在\"是\"可微\"的<b>必要非充分</b>条件。判可微还得验证 $o(\\rho)$ 那一项。</div></div>\n\n<div class=\"card eg\"><span class=\"tag\">例 5 · 复合链式(显式)</span>\n<p>设 $z=e^u\\sin v$,$u=xy$,$v=x+y$,求 $\\dfrac{\\partial z}{\\partial x},\\dfrac{\\partial z}{\\partial y}$。</p>\n<div class=\"step\"><span class=\"sn\">01</span>$\\dfrac{\\partial z}{\\partial u}=e^u\\sin v$,$\\dfrac{\\partial z}{\\partial v}=e^u\\cos v$。</div>\n<div class=\"step\"><span class=\"sn\">02</span>$\\dfrac{\\partial u}{\\partial x}=y$,$\\dfrac{\\partial v}{\\partial x}=1$。</div>\n<div class=\"step\"><span class=\"sn\">03</span>链式:$\\dfrac{\\partial z}{\\partial x}=e^u\\sin v\\cdot y+e^u\\cos v\\cdot 1=e^{xy}\\bigl[y\\sin(x+y)+\\cos(x+y)\\bigr]$。</div>\n<div class=\"step\"><span class=\"sn\">04</span>同理 $\\dfrac{\\partial u}{\\partial y}=x$,$\\dfrac{\\partial v}{\\partial y}=1$,故 $\\dfrac{\\partial z}{\\partial y}=e^{xy}\\bigl[x\\sin(x+y)+\\cos(x+y)\\bigr]$。$\\blacksquare$</div></div>\n\n<div class=\"card eg\"><span class=\"tag\">例 6 · 复合(抽象函数)</span>\n<p>设 $z=f(x^2-y^2,\\,e^{xy})$,$f$ 有连续二阶偏导,求 $\\dfrac{\\partial z}{\\partial x},\\dfrac{\\partial z}{\\partial y}$。</p>\n<div class=\"step\"><span class=\"sn\">01</span>记 $u=x^2-y^2$,$v=e^{xy}$,用 $f_1,f_2$ 表示 $f$ 对第 1、2 中间变量的偏导。</div>\n<div class=\"step\"><span class=\"sn\">02</span>$\\dfrac{\\partial u}{\\partial x}=2x$,$\\dfrac{\\partial v}{\\partial x}=ye^{xy}$。</div>\n<div class=\"step\"><span class=\"sn\">03</span>链式:$\\dfrac{\\partial z}{\\partial x}=2x\\,f_1+ye^{xy}\\,f_2$。</div>\n<div class=\"step\"><span class=\"sn\">04</span>$\\dfrac{\\partial u}{\\partial y}=-2y$,$\\dfrac{\\partial v}{\\partial y}=xe^{xy}$。</div>\n<div class=\"step\"><span class=\"sn\">05</span>$\\dfrac{\\partial z}{\\partial y}=-2y\\,f_1+xe^{xy}\\,f_2$。$\\blacksquare$</div>\n<div class=\"note\">抽象函数题的<b>记号约定</b>:$f_1$ 表示 $f$ 对第一个中间变量求偏,$f_2$ 对第二个。结果<b>不能</b>再写回显式形式。</div></div>\n\n<div class=\"card eg\"><span class=\"tag\">例 7 · 隐函数(一个方程)</span>\n<p>设 $\\sin y+e^x-xy=0$,求 $\\dfrac{dy}{dx}$。</p>\n<div class=\"step\"><span class=\"sn\">01</span>令 $F(x,y)=\\sin y+e^x-xy$。</div>\n<div class=\"step\"><span class=\"sn\">02</span>$F_x=e^x-y$(对 $x$ 求偏,$y$ 是常数,$-xy$ 变 $-y$)。</div>\n<div class=\"step\"><span class=\"sn\">03</span>$F_y=\\cos y-x$(对 $y$ 求偏,$x$ 是常数,$-xy$ 变 $-x$)。</div>\n<div class=\"step\"><span class=\"sn\">04</span>$\\dfrac{dy}{dx}=-\\dfrac{F_x}{F_y}=-\\dfrac{e^x-y}{\\cos y-x}=\\dfrac{y-e^x}{\\cos y-x}$。$\\blacksquare$</div>\n<div class=\"note\">诀窍:对 $x$ 求偏时,固定 $y$,只让 $x$ 变化;对 $y$ 求偏时,固定 $x$,只让 $y$ 变化。因此 $(-xy)_x=-y$,$(-xy)_y=-x$。沿隐函数分支对 $x$ 求全导数时,$y$ 才随 $x$ 改变,这与求偏导是两件事。</div></div>\n\n<div class=\"card eg\"><span class=\"tag\">例 8 · 隐函数(方程组)</span>\n<p>设 $u,v$ 由方程组 $\\begin{cases}u^2-v=x\\\\u+v^2=y\\end{cases}$ 确定,求 $\\dfrac{\\partial u}{\\partial x},\\dfrac{\\partial v}{\\partial x}$。</p>\n<div class=\"step\"><span class=\"sn\">01</span>两边对 $x$ 求偏($u,v$ 看成 $x,y$ 的函数,$y$ 当常数)。</div>\n<div class=\"step\"><span class=\"sn\">02</span>第一式:$2u\\cdot u_x-v_x=1$。</div>\n<div class=\"step\"><span class=\"sn\">03</span>第二式:$u_x+2v\\cdot v_x=0$。</div>\n<div class=\"step\"><span class=\"sn\">04</span>由第二式得 $u_x=-2v\\,v_x$,代入第一式:$2u(-2v\\,v_x)-v_x=1$。</div>\n<div class=\"step\"><span class=\"sn\">05</span>整理:$v_x(-4uv-1)=1\\Rightarrow v_x=-\\dfrac{1}{4uv+1}$。</div>\n<div class=\"step\"><span class=\"sn\">06</span>代回:$u_x=-2v\\cdot\\Bigl(-\\dfrac{1}{4uv+1}\\Bigr)=\\dfrac{2v}{4uv+1}$。$\\blacksquare$</div></div>\n\n<div class=\"card eg\"><span class=\"tag\">例 9 · 方向导数</span>\n<p>求 $u=\\ln(x^2+y^2)$ 在点 $(1,1)$ 沿方向 $\\mathbf{l}=(3,4)$ 的方向导数。</p>\n<div class=\"step\"><span class=\"sn\">01</span>偏导:$u_x=\\dfrac{2x}{x^2+y^2}$,$u_y=\\dfrac{2y}{x^2+y^2}$。</div>\n<div class=\"step\"><span class=\"sn\">02</span>在 $(1,1)$:$u_x=\\dfrac{2}{2}=1$,$u_y=1$。</div>\n<div class=\"step\"><span class=\"sn\">03</span>方向 $\\mathbf{l}=(3,4)$ 单位化:$|\\mathbf{l}|=5$,$\\mathbf{e}_l=(\\tfrac35,\\tfrac45)$。</div>\n<div class=\"step\"><span class=\"sn\">04</span>$\\dfrac{\\partial u}{\\partial\\mathbf{l}}=u_x\\cdot\\tfrac35+u_y\\cdot\\tfrac45=\\tfrac35+\\tfrac45=\\tfrac75$。$\\blacksquare$</div></div>\n\n<div class=\"card eg\"><span class=\"tag\">例 10 · 梯度应用</span>\n<p>设 $f=x^2y^3$,在点 $(1,2)$ 求梯度、最大方向导数及最速上升方向。</p>\n<div class=\"step\"><span class=\"sn\">01</span>$f_x=2xy^3$,$f_y=3x^2y^2$。</div>\n<div class=\"step\"><span class=\"sn\">02</span>在 $(1,2)$:$f_x=2\\cdot1\\cdot 8=16$,$f_y=3\\cdot1\\cdot4=12$。</div>\n<div class=\"step\"><span class=\"sn\">03</span>梯度 $\\nabla f(1,2)=(16,12)$。</div>\n<div class=\"step\"><span class=\"sn\">04</span>$|\\nabla f|=\\sqrt{16^2+12^2}=\\sqrt{400}=20$,即最大方向导数为 20。</div>\n<div class=\"step\"><span class=\"sn\">05</span>最速上升方向:$\\dfrac{\\nabla f}{|\\nabla f|}=\\bigl(\\tfrac45,\\tfrac35\\bigr)$。$\\blacksquare$</div></div>\n\n<div class=\"card eg\"><span class=\"tag\">例 11 · 无条件极值</span>\n<p>求 $f(x,y)=x^3-y^3+3x^2+3y^2-9x$ 的极值。</p>\n<div class=\"step\"><span class=\"sn\">01</span>解驻点:$f_x=3x^2+6x-9=3(x+3)(x-1)=0\\Rightarrow x=-3$ 或 $1$。</div>\n<div class=\"step\"><span class=\"sn\">02</span>$f_y=-3y^2+6y=-3y(y-2)=0\\Rightarrow y=0$ 或 $2$。</div>\n<div class=\"step\"><span class=\"sn\">03</span>四个驻点:$(-3,0),(-3,2),(1,0),(1,2)$。</div>\n<div class=\"step\"><span class=\"sn\">04</span>二阶:$A=f_{xx}=6x+6$,$B=f_{xy}=0$,$C=f_{yy}=-6y+6$,$\\Delta=AC-B^2=AC$。</div>\n<div class=\"step\"><span class=\"sn\">05</span>$(-3,0)$:$A=-12,C=6,\\Delta=-72<0$,鞍点。</div>\n<div class=\"step\"><span class=\"sn\">06</span>$(-3,2)$:$A=-12,C=-6,\\Delta=72>0$ 且 $A<0$,极大值。$f(-3,2)=-27-8+27+12+27=31$。</div>\n<div class=\"step\"><span class=\"sn\">07</span>$(1,0)$:$A=12,C=6,\\Delta=72>0$ 且 $A>0$,极小值。$f(1,0)=1+0+3+0-9=-5$。</div>\n<div class=\"step\"><span class=\"sn\">08</span>$(1,2)$:$A=12,C=-6,\\Delta=-72<0$,鞍点。</div>\n<div class=\"step\"><span class=\"sn\">09</span>结论:极大值 $31$ 在 $(-3,2)$,极小值 $-5$ 在 $(1,0)$。$\\blacksquare$</div></div>\n\n<div class=\"card eg\"><span class=\"tag\">例 12 · 拉格朗日条件极值</span>\n<p>求 $z=xy$ 在约束 $x+y=1$ 下的极值。</p>\n<div class=\"step\"><span class=\"sn\">01</span>构造 $L=xy-\\lambda(x+y-1)$。</div>\n<div class=\"step\"><span class=\"sn\">02</span>$L_x=y-\\lambda=0\\Rightarrow \\lambda=y$。</div>\n<div class=\"step\"><span class=\"sn\">03</span>$L_y=x-\\lambda=0\\Rightarrow \\lambda=x$。</div>\n<div class=\"step\"><span class=\"sn\">04</span>故 $x=y$,代入约束 $2x=1\\Rightarrow x=y=\\tfrac12$,$\\lambda=\\tfrac12$。</div>\n<div class=\"step\"><span class=\"sn\">05</span>可能极值点 $(\\tfrac12,\\tfrac12)$,$z=\\tfrac14$。</div>\n<div class=\"step\"><span class=\"sn\">06</span>判别:约束曲线 $y=1-x$ 上 $z=x(1-x)$ 是开口向下的抛物线,顶点恰在 $x=\\tfrac12$,故为<b>极大值</b> $\\tfrac14$。$\\blacksquare$</div>\n<div class=\"note\">条件极值的判别常用<b>几何或参数化</b>验证;若需严格,可用拉格朗日函数二阶微分判别,几何直觉用于提出猜想，最终仍需用约束上的函数值比较或相应判别条件证明。</div></div>\n\n<h2 id=\"quiz\"><span class=\"n\">09</span>练习(8 题)</h2>\n<div class=\"quiz\"><q>1. 求 $z=x^3y-4xy^2$ 的 $\\dfrac{\\partial z}{\\partial x},\\dfrac{\\partial z}{\\partial y}$。</q>\n<details><summary>看详解</summary><div class=\"ans\">$\\dfrac{\\partial z}{\\partial x}=3x^2y-4y^2$;$\\dfrac{\\partial z}{\\partial y}=x^3-8xy$。</div></details></div>\n<div class=\"quiz\"><q>2. 求 $z=x\\ln y$ 的全微分 $dz$。</q>\n<details><summary>看详解</summary><div class=\"ans\">$z_x=\\ln y$,$z_y=\\dfrac{x}{y}$,故 $dz=\\ln y\\,dx+\\dfrac{x}{y}\\,dy$。</div></details></div>\n<div class=\"quiz\"><q>3. 设 $z=u^2v$,$u=\\sin x$,$v=\\cos x$,求 $\\dfrac{dz}{dx}$。</q>\n<details><summary>看详解</summary><div class=\"ans\">$\\dfrac{dz}{dx}=2uv\\cdot\\cos x+u^2\\cdot(-\\sin x)=2\\sin x\\cos^2 x-\\sin^3 x=\\sin x(2\\cos^2 x-\\sin^2 x)$。</div></details></div>\n<div class=\"quiz\"><q>4. 设 $\\sin(x+y)+y-x=0$,求 $\\dfrac{dy}{dx}$。</q>\n<details><summary>看详解</summary><div class=\"ans\">$F=\\sin(x+y)+y-x$,$F_x=\\cos(x+y)-1$,$F_y=\\cos(x+y)+1$,$\\dfrac{dy}{dx}=-\\dfrac{F_x}{F_y}=\\dfrac{1-\\cos(x+y)}{1+\\cos(x+y)}$。</div></details></div>\n<div class=\"quiz\"><q>5. 求 $f=x^2+y^2$ 在 $(1,1)$ 沿方向 $(1,1)$ 的方向导数。</q>\n<details><summary>看详解</summary><div class=\"ans\">$\\nabla f=(2,2)$,方向单位化 $\\mathbf{e}=(\\tfrac1{\\sqrt2},\\tfrac1{\\sqrt2})$,$D_{\\mathbf{e}}f=2\\cdot\\tfrac1{\\sqrt2}+2\\cdot\\tfrac1{\\sqrt2}=2\\sqrt2$。</div></details></div>\n<div class=\"quiz\"><q>6. 求 $f(x,y)=x^2+xy+y^2+x-y$ 的极值。</q>\n<details><summary>看详解</summary><div class=\"ans\">解 $2x+y+1=0,\\ x+2y-1=0$ 得驻点 $(-1,1)$。$A=2,B=1,C=2,\\Delta=4-1=3>0$ 且 $A>0$,极小值 $f(-1,1)=-1$。</div></details></div>\n<div class=\"quiz\"><q>7. 用拉格朗日法求 $x^2+y^2$ 在 $x+y=1$ 下的极小值。</q>\n<details><summary>看详解</summary><div class=\"ans\">$L=x^2+y^2-\\lambda(x+y-1)$。$L_x=2x-\\lambda=0$,$L_y=2y-\\lambda=0\\Rightarrow x=y=\\tfrac12$。极小值 $=\\tfrac14+\\tfrac14=\\tfrac12$。</div></details></div>\n<div class=\"quiz\"><q>8. 判定 $f=(x-1)^2+(y-2)^2$ 的极值。</q>\n<details><summary>看详解</summary><div class=\"ans\">$f_x=2(x-1)=0\\Rightarrow x=1$,$f_y=2(y-2)=0\\Rightarrow y=2$,驻点 $(1,2)$。$A=2,B=0,C=2,\\Delta=4>0,A>0$,极小值 $f(1,2)=0$。</div></details></div>\n\n<div class=\"summary\">\n<div class=\"st\">本节小结</div>\n<p><span class=\"pill\">概念</span>二元函数是空间曲面,等高线是其\"切片\";极限要求任意路径趋近同值。</p>\n<p><span class=\"pill\">偏导</span>固定其他变量对一个求导,几何是固定方向的切线斜率。</p>\n<p><span class=\"pill\">全微分</span>$dz=f_x\\,dx+f_y\\,dy$;可微 ⟸ 偏导连续,可微 ⟹ 连续;偏导存在 ⇏ 可微。</p>\n<p><span class=\"pill\">链式</span>沿树图每条路径相乘再相加;全微分形式不变。</p>\n<p><span class=\"pill\">隐函数</span>$\\dfrac{dy}{dx}=-\\dfrac{F_x}{F_y}$;方程组两边求导解线性组。</p>\n<p><span class=\"pill\">梯度</span>$\\nabla f=(f_x,f_y)$,方向是最陡上升,模为最大方向导数,垂直于等值线。</p>\n<p><span class=\"pill\">极值</span>无条件用 Hessian $\\Delta=AC-B^2$;条件极值用拉格朗日乘数法。</p>\n<p style=\"margin-top:16px;color:var(--txt3)\"><b>下一章</b>:重积分--把\"微分反过来累加\"从一元推广到平面区域与空间区域,用二重/三重积分算面积、体积、质量与质心。本章的偏导、全微分与极值,正是重积分换元与场论的基石。</p>\n</div>\n\n",mount(root){
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
function arrow(ctx,x1,y1,x2,y2,color){
  ctx.strokeStyle=color;ctx.fillStyle=color;ctx.lineWidth=1.8;
  ctx.beginPath();ctx.moveTo(x1,y1);ctx.lineTo(x2,y2);ctx.stroke();
  const ang=Math.atan2(y2-y1,x2-x1),ah=8;
  ctx.beginPath();
  ctx.moveTo(x2,y2);
  ctx.lineTo(x2-ah*Math.cos(ang-0.4),y2-ah*Math.sin(ang-0.4));
  ctx.lineTo(x2-ah*Math.cos(ang+0.4),y2-ah*Math.sin(ang+0.4));
  ctx.closePath();ctx.fill();
}
// cv1: contour + movable point on f = x^2+y^2
const cv1=document.getElementById('cv1'),c1=cv1.getContext('2d');
const s1x=document.getElementById('s1x'),s1y=document.getElementById('s1y'),v1x=document.getElementById('v1x'),v1y=document.getElementById('v1y'),v1z=document.getElementById('v1z');
function draw1(){
  const px=+s1x.value,py=+s1y.value;v1x.textContent=px.toFixed(1);v1y.textContent=py.toFixed(1);
  const fz=px*px+py*py;v1z.textContent='z = '+fz.toFixed(2);
  const w=cv1.width,h=cv1.height;c1.clearRect(0,0,w,h);
  const cx=w/2,cy=h/2,scale=Math.min(w,h)/7;
  c1.strokeStyle='#d5deeb';c1.lineWidth=1;c1.beginPath();
  c1.moveTo(20,cy);c1.lineTo(w-20,cy);c1.moveTo(cx,20);c1.lineTo(cx,h-20);c1.stroke();
  c1.fillStyle='#526579';c1.font='11px Inter,monospace';c1.fillText('x',w-26,cy-6);c1.fillText('y',cx+6,22);
  c1.strokeStyle='#272a31';
  for(const lvl of [1,2,4,6,9]){
    c1.beginPath();c1.arc(cx,cy,Math.sqrt(lvl)*scale,0,7);c1.stroke();
    c1.fillStyle='#526579';c1.fillText('z='+lvl,cx+Math.sqrt(lvl)*scale+3,cy-3);
  }
  const sx=cx+px*scale,sy=cy-py*scale;
  c1.strokeStyle='#ae4c13';c1.setLineDash([5,4]);c1.beginPath();c1.arc(cx,cy,Math.sqrt(fz)*scale,0,7);c1.stroke();c1.setLineDash([]);
  c1.fillStyle='#147557';c1.beginPath();c1.arc(sx,sy,5,0,7);c1.fill();
  c1.fillStyle='#147557';c1.fillText('P('+px.toFixed(1)+', '+py.toFixed(1)+')',sx+8,sy-8);
}
s1x.oninput=draw1;s1y.oninput=draw1;draw1();
// cv2: partial derivative tangent (fixed y0)
const cv2=document.getElementById('cv2'),c2=cv2.getContext('2d');
const s2x=document.getElementById('s2x'),s2y=document.getElementById('s2y'),v2x=document.getElementById('v2x'),v2y=document.getElementById('v2y'),v2s=document.getElementById('v2s');
function draw2(){
  const x0=+s2x.value,y0=+s2y.value;v2x.textContent=x0.toFixed(1);v2y.textContent=y0.toFixed(1);
  const slope=2*x0;v2s.textContent='f_x = '+slope.toFixed(2);
  const w=cv2.width,h=cv2.height;c2.clearRect(0,0,w,h);
  const padL=42,padB=30,padT=18,padR=20,xMin=-3,xMax=3,zMin=0,zMax=12;
  const sx=x=>padL+(x-xMin)/(xMax-xMin)*(w-padL-padR);
  const sz=z=>h-padB-(z-zMin)/(zMax-zMin)*(h-padB-padT);
  c2.strokeStyle='#d5deeb';c2.lineWidth=1;c2.beginPath();
  c2.moveTo(padL,sz(zMin));c2.lineTo(w-padR,sz(zMin));
  c2.moveTo(padL,sz(zMin));c2.lineTo(padL,sz(zMax));c2.stroke();
  c2.fillStyle='#526579';c2.font='11px Inter,monospace';
  c2.fillText('x',w-padR-6,sz(zMin)-6);c2.fillText('z',padL+6,sz(zMax)+12);
  for(let x=-3;x<=3;x++){c2.fillText(x,sx(x)-4,sz(zMin)+14);}
  c2.strokeStyle='#245cc5';c2.lineWidth=1.8;c2.beginPath();
  for(let i=0;i<=120;i++){
    const x=xMin+(xMax-xMin)*i/120,z=x*x+y0*y0;
    if(i===0)c2.moveTo(sx(x),sz(z));else c2.lineTo(sx(x),sz(z));
  }
  c2.stroke();
  c2.fillStyle='#245cc5';c2.fillText('曲线 z = x² + '+(y0*y0).toFixed(2)+'  (y₀='+y0.toFixed(1)+')',sx(-2.9)+0,padT+8);
  const z0=x0*x0+y0*y0;
  c2.strokeStyle='#ae4c13';c2.lineWidth=1.5;c2.setLineDash([5,4]);c2.beginPath();
  const tx1=xMin,tz1=z0+slope*(tx1-x0),tx2=xMax,tz2=z0+slope*(tx2-x0);
  c2.moveTo(sx(tx1),sz(Math.max(zMin,Math.min(zMax,tz1))));
  c2.lineTo(sx(tx2),sz(Math.max(zMin,Math.min(zMax,tz2))));
  c2.stroke();c2.setLineDash([]);
  c2.fillStyle='#147557';c2.beginPath();c2.arc(sx(x0),sz(z0),5,0,7);c2.fill();
  c2.fillStyle='#147557';c2.fillText('切点('+x0.toFixed(1)+', '+z0.toFixed(2)+')',sx(x0)+8,sz(z0)-8);
  c2.fillStyle='#ae4c13';c2.fillText('切线斜率 = 2x₀ = '+slope.toFixed(2),padL+8,sz(zMax)+12);
}
s2x.oninput=draw2;s2y.oninput=draw2;draw2();
// cv3: gradient + direction derivative
const cv3=document.getElementById('cv3'),c3=cv3.getContext('2d');
const s3x=document.getElementById('s3x'),s3y=document.getElementById('s3y'),s3t=document.getElementById('s3t');
const v3x=document.getElementById('v3x'),v3y=document.getElementById('v3y'),v3t=document.getElementById('v3t'),v3d=document.getElementById('v3d');
function draw3(){
  const px=+s3x.value,py=+s3y.value,th=+s3t.value;v3x.textContent=px.toFixed(1);v3y.textContent=py.toFixed(1);v3t.textContent=th+'°';
  const theta=th*Math.PI/180;
  const gx=2*px,gy=2*py,gmag=Math.sqrt(gx*gx+gy*gy);
  const Duf=gx*Math.cos(theta)+gy*Math.sin(theta);
  v3d.textContent='方向导数 D_u f = '+Duf.toFixed(2);
  const gLabel=document.getElementById('v3d').previousElementSibling;
  gLabel.textContent='∇f = ('+gx.toFixed(1)+', '+gy.toFixed(1)+'), |∇f| = '+gmag.toFixed(2);
  const w=cv3.width,h=cv3.height;c3.clearRect(0,0,w,h);
  const cx=w/2,cy=h/2,scale=Math.min(w,h)/7;
  c3.strokeStyle='#d5deeb';c3.lineWidth=1;c3.beginPath();
  c3.moveTo(20,cy);c3.lineTo(w-20,cy);c3.moveTo(cx,20);c3.lineTo(cx,h-20);c3.stroke();
  c3.fillStyle='#526579';c3.font='11px Inter,monospace';c3.fillText('x',w-26,cy-6);c3.fillText('y',cx+6,22);
  c3.strokeStyle='#272a31';
  for(const lvl of [1,2,4,6,9]){c3.beginPath();c3.arc(cx,cy,Math.sqrt(lvl)*scale,0,7);c3.stroke();}
  const sxp=cx+px*scale,syp=cy-py*scale;
  // direction unit vector
  const ulen=scale*0.9;
  const ux=Math.cos(theta)*ulen,uy=-Math.sin(theta)*ulen;
  arrow(c3,sxp,syp,sxp+ux,syp+uy,'#0e7288');
  // gradient arrow (scaled)
  if(gmag>0.001){
    const gsc=scale*0.35;
    const dx=gx/gmag*gmag*gsc,dy=-gy/gmag*gmag*gsc;
    arrow(c3,sxp,syp,sxp+dx,syp+dy,'#99436e');
  }
  c3.fillStyle='#147557';c3.beginPath();c3.arc(sxp,syp,4,0,7);c3.fill();
  c3.fillStyle='#99436e';c3.fillText('∇f',sxp+ (gmag>0.001?gmag*scale*0.35+6:8),syp-(gmag>0.001?gmag*scale*0.35*0.7:8));
  c3.fillStyle='#0e7288';c3.fillText('l',sxp+ux*0.5-4,syp+uy*0.5-4);
}
s3x.oninput=draw3;s3y.oninput=draw3;s3t.oninput=draw3;draw3();
// cv4: extremum types
const cv4=document.getElementById('cv4'),c4=cv4.getContext('2d');
const sel4=document.getElementById('sel4'),v4t=document.getElementById('v4t');
function draw4(){
  const type=sel4.value;
  const labels={min:'驻点(0,0):极小值 z=0',max:'驻点(0,0):极大值 z=0',saddle:'驻点(0,0):鞍点(非极值)'};
  v4t.textContent=labels[type];
  const w=cv4.width,h=cv4.height;c4.clearRect(0,0,w,h);
  const cx=w/2,cy=h/2,scale=Math.min(w,h)/7;
  c4.strokeStyle='#d5deeb';c4.lineWidth=1;c4.beginPath();
  c4.moveTo(20,cy);c4.lineTo(w-20,cy);c4.moveTo(cx,20);c4.lineTo(cx,h-20);c4.stroke();
  c4.fillStyle='#526579';c4.font='11px Inter,monospace';c4.fillText('x',w-26,cy-6);c4.fillText('y',cx+6,22);
  c4.strokeStyle='#272a31';
  if(type==='min'||type==='max'){
    for(const lvl of [0.5,1,2,4,6,9]){
      c4.beginPath();c4.arc(cx,cy,Math.sqrt(lvl)*scale,0,7);c4.stroke();
    }
  }else{
    for(const lvl of [0.5,1,2,4]){
      // x^2 - y^2 = lvl (opening along x)
      c4.beginPath();
      for(let i=0;i<=120;i++){
        const y=-3+6*i/120,x=Math.sqrt(lvl+y*y);
        const pxp=cx+x*scale,pyp=cy-y*scale;
        if(i===0)c4.moveTo(pxp,pyp);else c4.lineTo(pxp,pyp);
      }
      c4.stroke();
      c4.beginPath();
      for(let i=0;i<=120;i++){
        const y=-3+6*i/120,x=-Math.sqrt(lvl+y*y);
        const pxp=cx+x*scale,pyp=cy-y*scale;
        if(i===0)c4.moveTo(pxp,pyp);else c4.lineTo(pxp,pyp);
      }
      c4.stroke();
      // x^2 - y^2 = -lvl (opening along y)
      c4.beginPath();
      for(let i=0;i<=120;i++){
        const x=-3+6*i/120,y=Math.sqrt(x*x+lvl);
        const pxp=cx+x*scale,pyp=cy-y*scale;
        if(i===0)c4.moveTo(pxp,pyp);else c4.lineTo(pxp,pyp);
      }
      c4.stroke();
      c4.beginPath();
      for(let i=0;i<=120;i++){
        const x=-3+6*i/120,y=-Math.sqrt(x*x+lvl);
        const pxp=cx+x*scale,pyp=cy-y*scale;
        if(i===0)c4.moveTo(pxp,pyp);else c4.lineTo(pxp,pyp);
      }
      c4.stroke();
    }
    // asymptotes y = ±x
    c4.strokeStyle='#526579';c4.setLineDash([3,3]);
    c4.beginPath();c4.moveTo(cx-3*scale,cy+3*scale);c4.lineTo(cx+3*scale,cy-3*scale);
    c4.moveTo(cx-3*scale,cy-3*scale);c4.lineTo(cx+3*scale,cy+3*scale);c4.stroke();c4.setLineDash([]);
  }
  c4.fillStyle='#ae4c13';c4.beginPath();c4.arc(cx,cy,6,0,7);c4.fill();
  c4.fillStyle='#ae4c13';c4.fillText('(0,0)',cx+10,cy-8);
}
sel4.onchange=draw4;draw4();

}};
