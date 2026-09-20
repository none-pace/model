/* 行列式：统一教材专题正文与实验。仅在本章容器内挂载控件。 */
window.COURSE_CHAPTERS=window.COURSE_CHAPTERS||{};
window.COURSE_CHAPTERS["chapter-11"]={html:"\n<div class=\"cover\">\n  <div class=\"eyebrow\">线性代数 · 第一章</div>\n  <h1>行列式</h1>\n  <p class=\"lead\">线性代数的起点。从解二元方程组自然引出二阶行列式,再推到三阶、n 阶;掌握性质与化简技巧,最后用克拉默法则解方程组。配 10 道分级例题与 8 道练习。</p>\n  <div class=\"meta\">\n    <div class=\"m\"><b>约 55 分钟</b></div>\n    <div class=\"m\"><b>10 例题 · 8 练习</b></div>\n    <div class=\"m\"><b>2 个交互演示</b></div>\n  </div>\n</div>\n\n<h2 id=\"intro\"><span class=\"n\">01</span>从解方程组自然引出行列式</h2>\n<p>先看一个二元一次方程组:</p>\n<p class=\"ka\">$$\\begin{cases} a_{11}x_1 + a_{12}x_2 = b_1 \\\\ a_{21}x_1 + a_{22}x_2 = b_2 \\end{cases}$$</p>\n<p>用消元法。第 1 式乘 $a_{22}$、第 2 式乘 $a_{12}$,相减消 $x_2$:</p>\n<div class=\"step\"><span class=\"sn\">01</span>$(a_{11}a_{22}-a_{12}a_{21})x_1 = b_1 a_{22}-b_2 a_{12}$</div>\n<div class=\"step\"><span class=\"sn\">02</span>同理消 $x_1$:$(a_{11}a_{22}-a_{12}a_{21})x_2 = a_{11}b_2-a_{21}b_1$</div>\n<p>注意:两个未知数的分母<b>完全一样</b>,都是 $a_{11}a_{22}-a_{12}a_{21}$。这个\"主对角乘积减副对角乘积\"的式子反复出现,我们给它一个记号:</p>\n<div class=\"card def\"><span class=\"tag\">定义 · 二阶行列式</span>\n<p>对四个数排成的方阵 $\\begin{pmatrix}a_{11}&a_{12}\\\\a_{21}&a_{22}\\end{pmatrix}$,定义二阶行列式</p>\n<p class=\"ka\">$$\\begin{vmatrix} a_{11}&a_{12}\\\\a_{21}&a_{22}\\end{vmatrix}=a_{11}a_{22}-a_{12}a_{21}$$</p>\n<p>即<b>主对角线乘积减副对角线乘积</b>。</p></div>\n<p>于是方程组的解可写成($D\\neq0$ 时):</p>\n<p class=\"ka\">$$x_1=\\dfrac{\\begin{vmatrix}b_1&a_{12}\\\\b_2&a_{22}\\end{vmatrix}}{D}=\\dfrac{D_1}{D},\\qquad x_2=\\dfrac{\\begin{vmatrix}a_{11}&b_1\\\\a_{21}&b_2\\end{vmatrix}}{D}=\\dfrac{D_2}{D}$$</p>\n<div class=\"note\"><b>直觉</b>:把方程组的系数按原位置排成 $D$;求 $x_i$ 就把 $D$ 的第 $i$ 列换成常数列得到 $D_i$,然后 $x_i=D_i/D$。这就是后面<b>克拉默法则</b>的雏形。</p>\n\n<h2 id=\"two\"><span class=\"n\">02</span>二阶行列式的几何意义</h2>\n<p>二阶行列式 $D=\\begin{vmatrix}a&b\\\\c&d\\end{vmatrix}=ad-bc$ 等于<b>两个向量 $(a,c)$、$(b,d)$ 张成的平行四边形的有向面积</b>(可正可负)。下面拖动向量,看面积如何随向量变化。</p>\n<div class=\"viz\">\n<div class=\"vt\">交互演示</div>\n<h4>二阶行列式 = 平行四边形面积</h4>\n<p>橙向量 $\\vec{u}=(a,c)$,青向量 $\\vec{v}=(b,d)$。它们张成的平行四边形面积 $=|ad-bc|=|D|$。$D$ 的正负表示 $\\vec{v}$ 在 $\\vec{u}$ 的哪一侧。</p>\n<canvas id=\"cv1\" width=\"780\" height=\"280\"></canvas>\n<div class=\"ctrl\">\n  <label>向量 u 角度 <span class=\"val\" id=\"u1\">20°</span></label>\n  <input type=\"range\" id=\"s1\" min=\"0\" max=\"360\" value=\"20\" style=\"width:200px\">\n  <label>向量 v 角度 <span class=\"val\" id=\"v1\">110°</span></label>\n  <input type=\"range\" id=\"s2\" min=\"0\" max=\"360\" value=\"110\" style=\"width:200px\">\n  <span class=\"val\" id=\"d1\">D = 0.000</span>\n</div>\n<div class=\"note\">当两向量<b>共线</b>(同向或反向)$D=0$,面积 0--这对应方程组无唯一解。</div>\n</div>\n\n<h2 id=\"three\"><span class=\"n\">03</span>三阶行列式 · 对角线法则</h2>\n<p>九个数排成 $3\\times3$,定义三阶行列式:</p>\n<div class=\"card def\"><span class=\"tag\">定义 · 三阶行列式</span>\n<p class=\"ka\">$$\\begin{vmatrix} a_{11}&a_{12}&a_{13}\\\\a_{21}&a_{22}&a_{23}\\\\a_{31}&a_{32}&a_{33}\\end{vmatrix}$$</p>\n<p>$=a_{11}a_{22}a_{33}+a_{12}a_{23}a_{31}+a_{13}a_{21}a_{32}$</p>\n<p>$-a_{13}a_{22}a_{31}-a_{12}a_{21}a_{33}-a_{11}a_{23}a_{32}$</p></div>\n<p><b>对角线法则</b>(仅适用于三阶):主对角线方向(↘)3 条相加,副对角线方向(↙)3 条相减。</p>\n<div class=\"viz\">\n<div class=\"vt\">交互演示</div>\n<h4>对角线法则可视化</h4>\n<p>把前两列复制到右边，绿线(↘)的三项相加，再减去粉线(↙)的三项之和。这里只改变三个主对角元素，其余元素都为 1；右侧重复列不属于原矩阵。</p>\n<canvas id=\"cv2\" width=\"780\" height=\"320\"></canvas>\n<div class=\"ctrl\">\n  <label>a<sub>11</sub>=<span class=\"val\" id=\"a\">1</span></label>\n  <input type=\"range\" id=\"ra\" min=\"-5\" max=\"5\" value=\"1\" style=\"width:120px\">\n  <label>a<sub>22</sub>=<span class=\"val\" id=\"b\">1</span></label>\n  <input type=\"range\" id=\"rb\" min=\"-5\" max=\"5\" value=\"1\" style=\"width:120px\">\n  <label>a<sub>33</sub>=<span class=\"val\" id=\"c\">1</span></label>\n  <input type=\"range\" id=\"rc\" min=\"-5\" max=\"5\" value=\"1\" style=\"width:120px\">\n  <span class=\"val\" id=\"d2\">D = 0</span>\n</div>\n</div>\n<div class=\"note\"><b>注意</b>:对角线法则<b>只对二阶、三阶有效</b>。四阶及以上不能用(项数不对),必须用后面的展开定理。</div>\n\n<h2 id=\"perm\"><span class=\"n\">04</span>排列与逆序</h2>\n<p>要定义 n 阶行列式,先引入排列。</p>\n<div class=\"card def\"><span class=\"tag\">排列 · 逆序数</span>\n<p>把 $1,2,\\ldots,n$ 任意排列成一串 $p_1p_2\\cdots p_n$,叫一个<b>n 阶排列</b>。</p>\n<p>若 $i<j$ 但 $p_i>p_j$(大的排在了小的前面),称为一个<b>逆序</b>。逆序的总数叫<b>逆序数</b>,记 $\\tau(p_1p_2\\cdots p_n)$。</p>\n<p>逆序数为奇数的排列叫<b>奇排列</b>,偶数叫<b>偶排列</b>。</p></div>\n<div class=\"card eg\"><span class=\"tag\">例 · 求逆序数</span>\n<p>求 $\\tau(3142)$。</p>\n<div class=\"step\"><span class=\"sn\">01</span>3 后面比 3 小的有:1、2(共 2 个)。</div>\n<div class=\"step\"><span class=\"sn\">02</span>1 后面比 1 小的:无(0 个)。</div>\n<div class=\"step\"><span class=\"sn\">03</span>4 后面比 4 小的:2(1 个)。</div>\n<div class=\"step\"><span class=\"sn\">04</span>合计 $\\tau=2+0+1=3$,奇排列。$\\blacksquare$</div></div>\n<div class=\"card thm\"><span class=\"tag\">定理</span>\n<p><b>对换</b>(交换排列中两元素)改变排列的奇偶性:奇变偶,偶变奇。</p></div>\n\n<h2 id=\"ndef\"><span class=\"n\">05</span>n 阶行列式的定义</h2>\n<div class=\"card def\"><span class=\"tag\">定义 · n 阶行列式</span>\n<p>n 阶行列式 $D=|a_{ij}|_{n\\times n}$ 是 $n!$ 项的代数和,每项是取自不同行不同列的 $n$ 个元素乘积,符号由列标排列的奇偶决定:</p>\n<p class=\"ka\">$$D=\\sum_{p_1p_2\\cdots p_n}(-1)^{\\tau(p_1p_2\\cdots p_n)}a_{1p_1}a_{2p_2}\\cdots a_{np_n}$$</p>\n<p>求和对所有 n 阶排列进行($n!$ 项)。</p></div>\n<div class=\"note\"><b>直觉</b>:每行选一个、且不重复列,共 $n!$ 种选法;每种乘积前加 $+/-$,取决于列顺序的\"乱度\"(逆序数奇偶)。</p>\n<p>展开计算 n 阶太繁琐,实际用<b>性质化简</b>或<b>按行展开降阶</b>。</p>\n\n<h2 id=\"prop\"><span class=\"n\">06</span>性质六条(化简核心)</h2>\n<div class=\"card thm\"><span class=\"tag\">性质</span>\n<p><b>① 转置</b>:$D=D^T$(行列互换,值不变)。说明<b>行与列地位对称</b>,行成立的性质列也成立。</p>\n<p><b>② 换行</b>:交换两行(列),$D$ 变号($D\\to-D$)。</p>\n<p><b>③ 两行相同</b>:若两行(列)完全相同,$D=0$。(由②:换这两行 $D=-D\\Rightarrow D=0$)</p>\n<p><b>④ 倍乘</b>:某行(列)乘 $k$,$D$ 也乘 $k$。这里只缩放一行；若 n 阶矩阵的每个元素都乘 k，则 $\\det(kA)=k^n\\det A$，不能混淆。</p>\n<p><b>⑤ 倍加</b>:某行(列)加上另一行(列)的 $k$ 倍,$D$ <b>不变</b>。<b>(化三角形的核心操作)</b></p>\n<p><b>⑥ 拆行</b>:若某行(列)是两组数之和,可拆成两个行列式之和。</p></div>\n<div class=\"note\"><b>最常用</b>:⑤倍加--把行列式化成上三角,然后值=主对角线乘积。</div>\n\n<h2 id=\"expand\"><span class=\"n\">07</span>按行(列)展开定理</h2>\n<div class=\"card def\"><span class=\"tag\">代数余子式</span>\n<p>在 $D$ 中划去 $a_{ij}$ 所在的第 $i$ 行第 $j$ 列,剩下的 $(n-1)$ 阶行列式记 $M_{ij}$,叫 $a_{ij}$ 的<b>余子式</b>。称 $A_{ij}=(-1)^{i+j}M_{ij}$ 为<b>代数余子式</b>。</p></div>\n<div class=\"card thm\"><span class=\"tag\">展开定理</span>\n<p>行列式等于它任一行(列)各元素与其代数余子式乘积之和:</p>\n<p class=\"ka\">$$D=a_{i1}A_{i1}+a_{i2}A_{i2}+\\cdots+a_{in}A_{in}$$</p>\n<p>而另一行元素与本行代数余子式之积的和为 0:$\\sum_{k}a_{ik}A_{jk}=0\\ (i\\neq j)$。</p></div>\n<div class=\"note\"><b>用法</b>:选 0 多的那一行展开,降阶最快。</p>\n\n<h2 id=\"calc\"><span class=\"n\">08</span>计算技巧:化三角形 + 降阶</h2>\n<div class=\"card\"><span class=\"tag\" style=\"color:var(--acc)\">化三角形法</span>\n<p>用性质⑤(倍加)把行列式化成上三角,则值=主对角线乘积。</p>\n<p class=\"ka\">$$\\begin{vmatrix}*&*&*\\\\0&*&*\\\\0&0&*\\end{vmatrix}=\\text{主对角线乘积}$$</p></div>\n<div class=\"card\"><span class=\"tag\" style=\"color:var(--acc)\">降阶展开法</span>\n<p>用性质⑤把某行(列)化出尽量多的 0,再按该行展开,降到 $(n-1)$ 阶。递归至三阶/二阶。</p></div>\n\n<h2 id=\"cramer\"><span class=\"n\">09</span>克拉默法则</h2>\n<div class=\"card thm\"><span class=\"tag\">克拉默法则</span>\n<p>n 个方程、n 个未知数的线性方程组 $\\sum_{j=1}^n a_{ij}x_j=b_i\\ (i=1,\\ldots,n)$,若系数行列式 $D\\neq0$,则<b>有唯一解</b>:</p>\n<p class=\"ka\">$$x_j=\\dfrac{D_j}{D}\\quad(j=1,2,\\ldots,n)$$</p>\n<p>其中 $D_j$ 是把 $D$ 的第 $j$ 列换成常数列 $(b_1,\\ldots,b_n)$ 所得。</p></div>\n<div class=\"note\"><b>推论</b>:齐次方程组($b_i=0$),$D\\neq0\\Rightarrow$ 只有零解;$D=0\\Rightarrow$ 有非零解。<b>这是判齐次有无非零解的关键。</b></div>\n\n<h2 id=\"eg\"><span class=\"n\">10</span>例题精讲</h2>\n\n<div class=\"card eg\"><span class=\"tag\">例 1 · 二阶</span>\n<p>求 $\\begin{vmatrix}3&1\\\\2&4\\end{vmatrix}$。</p>\n<div class=\"step\"><span class=\"sn\">01</span>$=3\\times4-1\\times2=12-2=10$。$\\blacksquare$</div></div>\n\n<div class=\"card eg\"><span class=\"tag\">例 2 · 三阶对角线</span>\n<p>求 $\\begin{vmatrix}1&2&3\\\\4&5&6\\\\7&8&9\\end{vmatrix}$。</p>\n<div class=\"step\"><span class=\"sn\">01</span>主对角项:$1\\cdot5\\cdot9+2\\cdot6\\cdot7+3\\cdot4\\cdot8=45+84+96=225$。</div>\n<div class=\"step\"><span class=\"sn\">02</span>副对角项:$3\\cdot5\\cdot7+2\\cdot4\\cdot9+1\\cdot6\\cdot8=105+72+48=225$。</div>\n<div class=\"step\"><span class=\"sn\">03</span>$D=225-225=0$。$\\blacksquare$</div>\n<div class=\"note\"><b>规律</b>:三行成等差(行差相等)$\\Rightarrow D=0$。因第2行是第1、3行平均。</div></div>\n\n<div class=\"card eg\"><span class=\"tag\">例 3 · 化三角形</span>\n<p>求 $\\begin{vmatrix}1&1&1\\\\2&3&4\\\\1&4&9\\end{vmatrix}$。</p>\n<div class=\"step\"><span class=\"sn\">01</span>r2-2r1,r3-r1:$\\begin{vmatrix}1&1&1\\\\0&1&2\\\\0&3&8\\end{vmatrix}$。</div>\n<div class=\"step\"><span class=\"sn\">02</span>r3-3r2:$\\begin{vmatrix}1&1&1\\\\0&1&2\\\\0&0&2\\end{vmatrix}$。</div>\n<div class=\"step\"><span class=\"sn\">03</span>上三角,$D=1\\cdot1\\cdot2=2$。$\\blacksquare$</div></div>\n\n<div class=\"card eg\"><span class=\"tag\">例 4 · 按行展开</span>\n<p>求 $\\begin{vmatrix}2&1&0\\\\1&3&2\\\\0&1&4\\end{vmatrix}$。</p>\n<div class=\"step\"><span class=\"sn\">01</span>按第 1 行展开(有 0):$D=2A_{11}+1A_{12}+0$。</div>\n<div class=\"step\"><span class=\"sn\">02</span>$A_{11}=(-1)^{1+1}\\begin{vmatrix}3&2\\\\1&4\\end{vmatrix}=12-2=10$。</div>\n<div class=\"step\"><span class=\"sn\">03</span>$A_{12}=(-1)^{1+2}\\begin{vmatrix}1&2\\\\0&4\\end{vmatrix}=-(4-0)=-4$。</div>\n<div class=\"step\"><span class=\"sn\">04</span>$D=2\\times10+1\\times(-4)=20-4=16$。$\\blacksquare$</div></div>\n\n<div class=\"card eg\"><span class=\"tag\">例 5 · 性质化简(拆行)</span>\n<p>求 $\\begin{vmatrix}a+b&a\\\\a&a+b\\end{vmatrix}$,用拆行性质。</p>\n<div class=\"step\"><span class=\"sn\">01</span>左式 $=(a+b)^2-a^2=2ab+b^2$(直接算,作对照)。</div>\n<div class=\"step\"><span class=\"sn\">02</span>拆第 1 行为 $(a,a)+(b,0)$:$D=\\begin{vmatrix}a&a\\\\a&a+b\\end{vmatrix}+\\begin{vmatrix}b&0\\\\a&a+b\\end{vmatrix}$。</div>\n<div class=\"step\"><span class=\"sn\">03</span>第 1 个 $=a(a+b)-a\\cdot a=ab$;第 2 个 $=b(a+b)-0=ab+b^2$。</div>\n<div class=\"step\"><span class=\"sn\">04</span>和 $=ab+ab+b^2=2ab+b^2$,与左式相等。$\\blacksquare$</div>\n<div class=\"note\"><b>拆行</b>:某行是两组数之和,可拆成两行列式之和,各自计算再相加。</div></div>\n\n<div class=\"card eg\"><span class=\"tag\">例 6 · 含字母(范德蒙)</span>\n<p>证明范德蒙行列式 $V_n=\\begin{vmatrix}1&1&\\cdots&1\\\\x_1&x_2&\\cdots&x_n\\\\\\vdots&&&\\vdots\\\\x_1^{n-1}&x_2^{n-1}&\\cdots&x_n^{n-1}\\end{vmatrix}=\\prod_{1\\le i<j\\le n}(x_j-x_i)$。</p>\n<div class=\"step\"><span class=\"sn\">01</span>从最后一行起,每行减去上一行的 $x_1$ 倍,使第 1 列除顶外全 0。</div>\n<div class=\"step\"><span class=\"sn\">02</span>按第 1 列展开,得 $(n-1)$ 阶范德蒙,提取公因子 $(x_j-x_1)$。</div>\n<div class=\"step\"><span class=\"sn\">03</span>递推得 $V_n=\\prod_{j>1}(x_j-x_1)\\cdot V_{n-1}$,归纳即证。$\\blacksquare$</div></div>\n\n<div class=\"card eg\"><span class=\"tag\">例 7 · 求参数</span>\n<p>已知 $\\begin{vmatrix}1&2&4\\\\2&\\lambda&8\\\\3&6&\\lambda\\end{vmatrix}=0$,求 $\\lambda$。</p>\n<div class=\"step\"><span class=\"sn\">01</span>r2-2r1:$\\begin{vmatrix}1&2&4\\\\0&\\lambda-4&0\\\\3&6&\\lambda\\end{vmatrix}$。</div>\n<div class=\"step\"><span class=\"sn\">02</span>按第 2 行展开，该行只有中间元素非零：$D=(\\lambda-4)\\cdot(-1)^{2+2}\\begin{vmatrix}1&4\\\\3&\\lambda\\end{vmatrix}=(\\lambda-4)(\\lambda-12)$。</div>\n<div class=\"step\"><span class=\"sn\">03</span>$D=0\\Rightarrow\\lambda=4$ 或 $\\lambda=12$。$\\blacksquare$</div></div>\n\n<div class=\"card eg\"><span class=\"tag\">例 8 · 克拉默解方程组</span>\n<p>$\\begin{cases}x_1+x_2=3\\\\x_1+2x_2=5\\end{cases}$。</p>\n<div class=\"step\"><span class=\"sn\">01</span>$D=\\begin{vmatrix}1&1\\\\1&2\\end{vmatrix}=2-1=1$。</div>\n<div class=\"step\"><span class=\"sn\">02</span>$D_1=\\begin{vmatrix}3&1\\\\5&2\\end{vmatrix}=6-5=1$,$D_2=\\begin{vmatrix}1&3\\\\1&5\\end{vmatrix}=5-3=2$。</div>\n<div class=\"step\"><span class=\"sn\">03</span>$x_1=D_1/D=1$,$x_2=D_2/D=2$。$\\blacksquare$</div></div>\n\n<div class=\"card eg\"><span class=\"tag\">例 9 · 证性质</span>\n<p>证:若 $D$ 的某行全 0,则 $D=0$。</p>\n<div class=\"step\"><span class=\"sn\">01</span>按该行展开:$D=\\sum a_{ij}A_{ij}$,但该行 $a_{ij}=0$,故 $D=0$。$\\blacksquare$</div></div>\n\n<div class=\"card eg\"><span class=\"tag\">例 10 · 齐次判别</span>\n<p>齐次方程组 $\\begin{cases}x_1+x_2+\\lambda x_3=0\\\\x_1+\\lambda x_2+x_3=0\\\\\\lambda x_1+x_2+x_3=0\\end{cases}$ 有非零解,求 $\\lambda$。</p>\n<div class=\"step\"><span class=\"sn\">01</span>齐次有非零解 $\\Leftrightarrow D=0$。</div>\n<div class=\"step\"><span class=\"sn\">02</span>$D=\\begin{vmatrix}1&1&\\lambda\\\\1&\\lambda&1\\\\\\lambda&1&1\\end{vmatrix}$。r2-r1,r3-λr1 化简得 $D=-(\\lambda-1)^2(\\lambda+2)$。</div>\n<div class=\"step\"><span class=\"sn\">03</span>$D=0\\Rightarrow\\lambda=1$(二重)或 $\\lambda=-2$。$\\blacksquare$</div></div>\n\n<h2 id=\"quiz\"><span class=\"n\">11</span>练习(8 题)</h2>\n<div class=\"quiz\"><q>1. 求 $\\begin{vmatrix}2&3\\\\4&5\\end{vmatrix}$。</q>\n<details><summary>看详解</summary><div class=\"ans\">$10-12=-2$。</div></details></div>\n<div class=\"quiz\"><q>2. 求 $\\begin{vmatrix}1&0&2\\\\2&1&3\\\\3&0&4\\end{vmatrix}$(按含 0 的列展开)。</q>\n<details><summary>看详解</summary><div class=\"ans\">按第 2 列展开:$=1\\cdot(-1)^{2+2}\\begin{vmatrix}1&2\\\\3&4\\end{vmatrix}=(4-6)=-2$。</div></details></div>\n<div class=\"quiz\"><q>3. 化三角形求 $\\begin{vmatrix}1&1&1\\\\1&2&3\\\\1&3&6\\end{vmatrix}$。</q>\n<details><summary>看详解</summary><div class=\"ans\">r2-r1,r3-r1→$\\begin{vmatrix}1&1&1\\\\0&1&2\\\\0&2&5\\end{vmatrix}$,r3-2r2→上三角 $\\begin{vmatrix}1&1&1\\\\0&1&2\\\\0&0&1\\end{vmatrix}$,$D=1$。</div></details></div>\n<div class=\"quiz\"><q>4. 求 $\\tau(42153)$。</q>\n<details><summary>看详解</summary><div class=\"ans\">4 后小:2,1,3(3);2 后小:1(1);1 后无;5 后小:3(1)。$\\tau=3+1+0+1=5$,奇排列。</div></details></div>\n<div class=\"quiz\"><q>5. 证 $\\begin{vmatrix}a&b&c\\\\b&c&a\\\\c&a&b\\end{vmatrix}=(a+b+c)(ab+bc+ca-a^2-b^2-c^2)$。</q>\n<details><summary>看详解</summary><div class=\"ans\">三行相加,第 1 列提出 $(a+b+c)$,再展开化简。</div></details></div>\n<div class=\"quiz\"><q>6. $\\lambda$ 为何值时 $\\begin{vmatrix}2&\\lambda&0\\\\\\lambda&2&0\\\\0&0&1\\end{vmatrix}=0$?</q>\n<details><summary>看详解</summary><div class=\"ans\">按第 3 行展开:$=\\begin{vmatrix}2&\\lambda\\\\\\lambda&2\\end{vmatrix}=4-\\lambda^2=0\\Rightarrow\\lambda=\\pm2$。</div></details></div>\n<div class=\"quiz\"><q>7. 用克拉默解 $\\begin{cases}2x+y=5\\\\x+3y=10\\end{cases}$。</q>\n<details><summary>看详解</summary><div class=\"ans\">$D=5$,$D_1=5$,$D_2=15$。$x=1,y=3$。</div></details></div>\n<div class=\"quiz\"><q>8. 齐次 $\\begin{cases}x_1+x_2+x_3=0\\\\2x_1+3x_2+ax_3=0\\\\x_1+ax_2+3x_3=0\\end{cases}$ 有非零解,求 $a$。</q>\n<details><summary>看详解</summary><div class=\"ans\">$D=\\begin{vmatrix}1&1&1\\\\2&3&a\\\\1&a&3\\end{vmatrix}$,按第 1 行展开:<br>$=1(9-a^2)-1(6-a)+1(2a-3)=-a^2+3a=-a(a-3)$。<br>$D=0\\Rightarrow a=0$ 或 $a=3$。</div></details></div>\n\n<div class=\"summary\">\n<div class=\"st\">本节小结</div>\n<p><span class=\"pill\">来源</span>从解方程组分母抽象出\"主减副\"二阶行列式。</p>\n<p><span class=\"pill\">定义</span>n 阶 = $n!$ 项代数和,取自不同行不同列,符号由列标逆序奇偶定。</p>\n<p><span class=\"pill\">性质</span>转置·换行变号·两行同则 0·倍乘·倍加不变·拆行。核心是倍加化三角。</p>\n<p><span class=\"pill\">展开</span>按某行(列)$D=\\sum a_{ij}A_{ij}$,$A_{ij}=(-1)^{i+j}M_{ij}$。</p>\n<p><span class=\"pill\">计算</span>化三角形(值=主对角积)或降阶展开(选 0 多的行)。</p>\n<p><span class=\"pill\">克拉默</span>$D\\neq0$ 唯一解 $x_j=D_j/D$;齐次 $D=0$ 有非零解。</p>\n<p style=\"margin-top:16px;color:var(--txt3)\"><b>下一章</b>:矩阵--比行列式更一般的对象,引入运算、逆、秩。</p>\n</div>\n",mount(root){
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

// ===== cv1: 二阶行列式几何(平行四边形面积) =====
const cv1=document.getElementById('cv1'),c1=cv1.getContext('2d');
const su1=document.getElementById('s1'),sv1=document.getElementById('s2'),vu1=document.getElementById('u1'),vv1=document.getElementById('v1'),vd1=document.getElementById('d1');
function draw1(){
  const au=+su1.value, av=+sv1.value; vu1.textContent=au+'°'; vv1.textContent=av+'°';
  const ru=au*Math.PI/180, rv=av*Math.PI/180;
  const L=1.2;
  const ux=Math.cos(ru)*L, uy=-Math.sin(ru)*L, vx=Math.cos(rv)*L, vy=-Math.sin(rv)*L;
  // 屏幕的 y 轴向下；数学向量分量是 (ux,-uy)、(vx,-vy)。
  // 两个向量长度均为 L，因此有向面积应为 L² sin(v-u)。
  const D=-ux*vy+vx*uy;
  vd1.textContent='D = '+D.toFixed(3)+'（|D| = 平行四边形面积）';
  const w=cv1.width,h=cv1.height;c1.clearRect(0,0,w,h);
  const cx=w/2,cy=h/2,sc=110;
  // 坐标轴
  c1.strokeStyle='#d5deeb';c1.lineWidth=1;
  c1.beginPath();c1.moveTo(20,cy);c1.lineTo(w-20,cy);c1.moveTo(cx,20);c1.lineTo(cx,h-20);c1.stroke();
  c1.fillStyle='#526579';c1.font='11px Inter,monospace';c1.fillText('x',w-16,cy-6);c1.fillText('y',cx+6,16);
  // 平行四边形
  c1.fillStyle='rgba(126,200,156,.15)';
  c1.beginPath();
  c1.moveTo(cx,cy);
  c1.lineTo(cx+ux*sc,cy+uy*sc);
  c1.lineTo(cx+(ux+vx)*sc,cy+(uy+vy)*sc);
  c1.lineTo(cx+vx*sc,cy+vy*sc);
  c1.closePath();c1.fill();
  c1.strokeStyle='#147557';c1.lineWidth=1;c1.stroke();
  // 向量 u (橙)
  c1.strokeStyle='#ae4c13';c1.lineWidth=2.5;
  c1.beginPath();c1.moveTo(cx,cy);c1.lineTo(cx+ux*sc,cy+uy*sc);c1.stroke();
  c1.fillStyle='#ae4c13';c1.fillText('u',cx+ux*sc+6,cy+uy*sc);
  // 向量 v (青)
  c1.strokeStyle='#0e7288';c1.lineWidth=2.5;
  c1.beginPath();c1.moveTo(cx,cy);c1.lineTo(cx+vx*sc,cy+vy*sc);c1.stroke();
  c1.fillStyle='#0e7288';c1.fillText('v',cx+vx*sc+6,cy+vy*sc);
  // 面积标注
  c1.fillStyle='#147557';c1.font='12px Inter,monospace';
  c1.fillText('|D|='+Math.abs(D).toFixed(3)+'；两向量长度均为 '+L,cx+10,cy-10);
}
su1.oninput=draw1;sv1.oninput=draw1;draw1();

// ===== cv2: 三阶对角线法则 =====
const cv2=document.getElementById('cv2'),c2=cv2.getContext('2d');
const ra=document.getElementById('ra'),rb=document.getElementById('rb'),rc=document.getElementById('rc');
const va=document.getElementById('a'),vb=document.getElementById('b'),vc=document.getElementById('c'),vd2=document.getElementById('d2');
function draw2(){
  const a=+ra.value,b=+rb.value,c=+rc.value;va.textContent=a;vb.textContent=b;vc.textContent=c;
  const M=[[a,1,1],[1,b,1],[1,1,c]];
  // Sarrus 法则的六项全部取自同一个矩阵；右侧两列仅为重复列。
  const positive=[M[0][0]*M[1][1]*M[2][2],M[0][1]*M[1][2]*M[2][0],M[0][2]*M[1][0]*M[2][1]];
  const negative=[M[0][2]*M[1][1]*M[2][0],M[0][0]*M[1][2]*M[2][1],M[0][1]*M[1][0]*M[2][2]];
  const plus=positive.reduce((sum,value)=>sum+value,0),minus=negative.reduce((sum,value)=>sum+value,0),D=plus-minus;
  vd2.textContent='D = '+D;
  const w=cv2.width,h=cv2.height;c2.clearRect(0,0,w,h);
  const cx=30,cy=55,cw=61,ch=52;
  c2.font='13px Inter,monospace';c2.fillStyle='#405773';
  c2.fillText('原矩阵的三列',cx,27);
  c2.fillText('重复前两列',cx+3*cw,27);
  // 每种颜色三条连续斜线，表示三项；画完线后再显示数值。
  c2.lineWidth=2;c2.globalAlpha=.38;
  for(let j=0;j<3;j++){
    c2.strokeStyle='#147557';c2.beginPath();
    c2.moveTo(cx+(j+.5)*cw,cy+.5*ch);c2.lineTo(cx+(j+2.5)*cw,cy+2.5*ch);c2.stroke();
    c2.strokeStyle='#99436e';c2.beginPath();
    c2.moveTo(cx+(j+2.5)*cw,cy+.5*ch);c2.lineTo(cx+(j+.5)*cw,cy+2.5*ch);c2.stroke();
  }
  c2.globalAlpha=1;
  c2.strokeStyle='#9aaabd';c2.beginPath();c2.moveTo(cx+3*cw,cy-15);c2.lineTo(cx+3*cw,cy+3*ch-8);c2.stroke();
  c2.font='21px Inter,monospace';c2.textAlign='center';c2.textBaseline='middle';
  for(let i=0;i<3;i++)for(let j=0;j<5;j++){
    c2.fillStyle=j<3?'#263e5b':'#526579';
    c2.fillText(M[i][j%3],cx+(j+.5)*cw,cy+(i+.5)*ch);
  }
  c2.textAlign='start';c2.textBaseline='alphabetic';c2.font='14px Inter,monospace';
  c2.fillStyle='#147557';c2.fillText('↘ 三项相加：abc + 1 + 1',375,78);
  c2.fillText(positive.join(' + ')+' = '+plus,375,108);
  c2.fillStyle='#99436e';c2.fillText('↙ 三项相加：b + a + c',375,151);
  c2.fillText(negative.join(' + ')+' = '+minus,375,181);
  c2.fillStyle='#263e5b';c2.font='16px Inter,monospace';
  c2.fillText('D = ('+plus+') − ('+minus+') = '+D,30,248);
  c2.font='13px Inter,monospace';
  c2.fillText('D = abc − a − b − c + 2；重复列只辅助画线，原矩阵仍为 3×3。',30,282);
}
ra.oninput=draw2;rb.oninput=draw2;rc.oninput=draw2;draw2();

}};
