/* 矩阵：统一教材专题正文与实验。仅在本章容器内挂载控件。 */
window.COURSE_CHAPTERS=window.COURSE_CHAPTERS||{};
window.COURSE_CHAPTERS["chapter-12"]={html:"\n<div class=\"cover\">\n  <div class=\"eyebrow\">线性代数 · 第二章</div>\n  <h1>矩阵</h1>\n  <p class=\"lead\">矩阵是线性代数的核心对象--一个数表,却能表示变换、方程组、关系。本章讲运算(尤其乘法)、逆矩阵、秩,配 10 道分级例题与 8 道练习。</p>\n  <div class=\"meta\">\n    <div class=\"m\"><b>约 60 分钟</b></div>\n    <div class=\"m\"><b>10 例题 · 8 练习</b></div>\n    <div class=\"m\"><b>3 个交互演示</b></div>\n  </div>\n</div>\n\n<h2 id=\"intro\"><span class=\"n\">01</span>矩阵是什么</h2>\n<div class=\"card def\"><span class=\"tag\">定义 · 矩阵</span>\n<p>由 $m\\times n$ 个数 $a_{ij}$ 排成的 $m$ 行 $n$ 列的数表,称为 $m\\times n$ 矩阵,记</p>\n<p class=\"ka\">$$A=(a_{ij})_{m\\times n}=\\begin{pmatrix}a_{11}&\\cdots&a_{1n}\\\\\\vdots&&\\vdots\\\\a_{m1}&\\cdots&a_{mn}\\end{pmatrix}$$</p></div>\n<div class=\"card tip\"><span class=\"tag\">矩阵 vs 行列式</span>\n<p><b>行列式</b>是<b>一个数</b>(方阵算出来的值);<b>矩阵</b>是<b>一张数表</b>(对象本身)。行列式一定是方的,矩阵可以是长方形。矩阵没有\"大小比较\",但能做运算。</p></div>\n<div class=\"note\"><b>直觉</b>:矩阵可看作\"把向量变到另一个向量\"的机器(线性变换),也是方程组系数的紧凑写法。</div>\n\n<h2 id=\"special\"><span class=\"n\">02</span>特殊矩阵</h2>\n<div class=\"card\"><span class=\"tag\" style=\"color:var(--acc)\">几类常用矩阵</span>\n<p><b>单位矩阵</b> $E$(或 $I$):主对角线为 1,其余 0。$EA=A$。</p>\n<p><b>对角矩阵</b>:非主对角线全 0。</p>\n<p><b>对称矩阵</b>:$A^T=A$($a_{ij}=a_{ji}$)。</p>\n<p><b>反对称矩阵</b>:$A^T=-A$($a_{ij}=-a_{ji}$,主对角必 0)。</p>\n<p><b>三角矩阵</b>:上三角(主对角下全 0)/下三角。</p>\n<p><b>零矩阵</b> $O$:全 0。</p></div>\n\n<h2 id=\"op\"><span class=\"n\">03</span>加减与数乘</h2>\n<p>同型矩阵才能加减(对应元素相加减);数乘是每个元素都乘该数。</p>\n<p class=\"ka\">$$A+B=(a_{ij}+b_{ij}),\\quad kA=(ka_{ij})$$</p>\n<div class=\"note\"><b>注意</b>:数乘是每个元素乘 $k$(与行列式某行乘 $k$ 不同!)。$|kA|=k^n|A|$(n 是阶数)。</div>\n\n<h2 id=\"mul\"><span class=\"n\">04</span>乘法(重点)</h2>\n<div class=\"card def\"><span class=\"tag\">定义 · 矩阵乘法</span>\n<p>$A=(a_{ij})_{m\\times s}$,$B=(b_{ij})_{s\\times n}$,乘积 $C=AB$ 是 $m\\times n$ 矩阵,其中</p>\n<p class=\"ka\">$$c_{ij}=a_{i1}b_{1j}+a_{i2}b_{2j}+\\cdots+a_{is}b_{sj}=\\sum_{k=1}^{s}a_{ik}b_{kj}$$</p>\n<p>即 $c_{ij}$ 是 $A$ 的第 $i$ <b>行</b>与 $B$ 的第 $j$ <b>列</b>的<b>内积</b>。</p></div>\n<p><b>前提</b>:A 的列数 = B 的行数(否则不能乘)。</p>\n<div class=\"viz\">\n<div class=\"vt\">交互演示</div>\n<h4>矩阵乘法:行 × 列内积</h4>\n<p>绿行(取 A 第 i 行)× 青列(取 B 第 j 列),逐元素相乘再相加,得 $c_{ij}$。点\"下一步\"依次算各元素。</p>\n<canvas id=\"cv1\" width=\"780\" height=\"300\"></canvas>\n<div class=\"ctrl\">\n  <button id=\"btn1\">下一步 →</button>\n  <span class=\"val\" id=\"cur1\">c₁₁ = 1·1+2·3 = 7</span>\n</div>\n<div class=\"note\">口诀:<b>行乘列,对应相乘再相加</b>。$c_{ij}$ 只用 A 的第 i 行和 B 的第 j 列。</div>\n</div>\n\n<h2 id=\"trap\"><span class=\"n\">05</span>乘法的陷阱(必背)</h2>\n<div class=\"card tip\"><span class=\"tag\">矩阵乘法与数的乘法的不同</span>\n<p><b>① 不满足交换律</b>:一般 $AB\\neq BA$(甚至 BA 不存在或不同型)。</p>\n<p><b>② 消去律不成立</b>:$AB=AC$ 且 $A\\neq O$,<b>不能</b>推出 $B=C$(除非 $A$ 可逆)。</p>\n<p><b>③ 有零因子</b>:$AB=O$ <b>不能</b>推出 $A=O$ 或 $B=O$。</p>\n<p><b>满足的</b>:结合律 $(AB)C=A(BC)$、分配律 $A(B+C)=AB+AC$、$(AB)^T=B^TA^T$。</p></div>\n<div class=\"card eg\"><span class=\"tag\">例 · AB≠BA</span>\n<p>$A=\\begin{pmatrix}1&2\\\\3&4\\end{pmatrix}$,$B=\\begin{pmatrix}0&1\\\\1&0\\end{pmatrix}$。</p>\n<div class=\"step\"><span class=\"sn\">01</span>$AB=\\begin{pmatrix}1\\cdot0+2\\cdot1&1\\cdot1+2\\cdot0\\\\3\\cdot0+4\\cdot1&3\\cdot1+4\\cdot0\\end{pmatrix}=\\begin{pmatrix}2&1\\\\4&3\\end{pmatrix}$</div>\n<div class=\"step\"><span class=\"sn\">02</span>$BA=\\begin{pmatrix}3&4\\\\1&2\\end{pmatrix}$</div>\n<div class=\"step\"><span class=\"sn\">03</span>$AB\\neq BA$。$\\blacksquare$</div></div>\n\n<h2 id=\"inv\"><span class=\"n\">06</span>逆矩阵</h2>\n<div class=\"card def\"><span class=\"tag\">定义 · 逆矩阵</span>\n<p>对 n 阶方阵 $A$,若存在 $B$ 使 $AB=BA=E$,则称 $A$ <b>可逆</b>,$B$ 称 $A$ 的逆,记 $A^{-1}$。逆若存在则<b>唯一</b>。</p></div>\n<div class=\"card thm\"><span class=\"tag\">性质</span>\n<p>① $(A^{-1})^{-1}=A$</p>\n<p>② $(AB)^{-1}=B^{-1}A^{-1}$(<b>顺序反过来</b>)</p>\n<p>③ $(A^T)^{-1}=(A^{-1})^T$</p>\n<p>④ $(kA)^{-1}=\\frac1k A^{-1}$($k\\neq0$)</p>\n<p>⑤ $A$ 可逆 $\\iff |A|\\neq0$ $\\iff r(A)=n$ $\\iff$ 行列向量线性无关</p></div>\n\n<h2 id=\"adj\"><span class=\"n\">07</span>伴随矩阵求逆</h2>\n<div class=\"card def\"><span class=\"tag\">伴随矩阵</span>\n<p>$A$ 的代数余子式 $A_{ij}=(-1)^{i+j}M_{ij}$。把它们排成矩阵再<b>转置</b>,得伴随矩阵 $A^*$:</p>\n<p class=\"ka\">$$A^*=(A_{ij})^T=\\begin{pmatrix}A_{11}&A_{21}&\\cdots&A_{n1}\\\\A_{12}&A_{22}&\\cdots&A_{n2}\\\\\\vdots&&&\\vdots\\\\A_{1n}&A_{2n}&\\cdots&A_{nn}\\end{pmatrix}$$</p></div>\n<div class=\"card thm\"><span class=\"tag\">求逆公式</span>\n<p class=\"ka\">$$AA^*=A^*A=|A|E,\\qquad A^{-1}=\\dfrac{1}{|A|}A^*\\quad(|A|\\neq0)$$</p></div>\n<div class=\"card eg\"><span class=\"tag\">例 · 二阶求逆</span>\n<p>求 $A=\\begin{pmatrix}a&b\\\\c&d\\end{pmatrix}$ 的逆。</p>\n<div class=\"step\"><span class=\"sn\">01</span>二阶伴随:$A^*=\\begin{pmatrix}d&-b\\\\-c&a\\end{pmatrix}$(<b>主对角互换,副对角变负</b>)。</div>\n<div class=\"step\"><span class=\"sn\">02</span>$|A|=ad-bc$。</div>\n<div class=\"step\"><span class=\"sn\">03</span>$A^{-1}=\\dfrac1{ad-bc}\\begin{pmatrix}d&-b\\\\-c&a\\end{pmatrix}$。$\\blacksquare$</div></div>\n\n<h2 id=\"ele\"><span class=\"n\">08</span>初等变换求逆(三阶以上更实用)</h2>\n<div class=\"card\"><span class=\"tag\" style=\"color:var(--acc)\">初等行变换法</span>\n<p>把 $A$ 和 $E$ 并排成增广矩阵 $[A\\,|\\,E]$,用<b>初等行变换</b>把左边化成 $E$,右边就是 $A^{-1}$:</p>\n<p class=\"ka\">$$[A\\,|\\,E]\\xrightarrow{\\text{初等行变换}}[E\\,|\\,A^{-1}]$$</p></div>\n<div class=\"viz\">\n<div class=\"vt\">交互演示</div>\n<h4>初等变换可视化</h4>\n<p>三种初等行变换:① 换两行 ② 某行乘 k ③ 某行加另一行 k 倍。点按钮看效果。</p>\n<canvas id=\"cv2\" width=\"780\" height=\"260\"></canvas>\n<div class=\"ctrl\">\n  <button id=\"b2a\">换 r1↔r2</button>\n  <button id=\"b2b\">r2 × 2</button>\n  <button id=\"b2c\">r2 = r2 + r1</button>\n  <button id=\"b2d\">重置</button>\n</div>\n</div>\n\n<h2 id=\"rank\"><span class=\"n\">09</span>矩阵的秩</h2>\n<div class=\"card def\"><span class=\"tag\">定义 · 秩</span>\n<p>矩阵 $A$ 中<b>最高阶非零子式</b>的阶数,称为 $A$ 的秩,记 $r(A)$。</p>\n<p>等价:$r(A)=r$ $\\iff$ 存在 $r$ 阶非零子式,且所有 $r+1$ 阶子式为 0 $\\iff$ 行(列)向量组的极大无关组含 $r$ 个向量。</p></div>\n<div class=\"card thm\"><span class=\"tag\">秩的性质</span>\n<p>① $r(A)=r(A^T)$</p>\n<p>② 初等变换<b>不改变</b>秩(所以用行变换化阶梯形,非零行数即秩)</p>\n<p>③ $r(AB)\\le\\min(r(A),r(B))$</p>\n<p>④ $r(A+B)\\le r(A)+r(B)$</p>\n<p>⑤ 若 $AB=O$,则 $r(A)+r(B)\\le n$($A$ 是 $m\\times n$)</p></div>\n<div class=\"note\"><b>求秩</b>:用初等行变换化为<b>阶梯形</b>,非零行数 = 秩。</div>\n\n<h2 id=\"eg\"><span class=\"n\">10</span>例题精讲</h2>\n\n<div class=\"card eg\"><span class=\"tag\">例 1 · 乘法</span>\n<p>$A=\\begin{pmatrix}1&2\\\\3&4\\end{pmatrix}$,$B=\\begin{pmatrix}5&6\\\\7&8\\end{pmatrix}$,求 $AB$。</p>\n<div class=\"step\"><span class=\"sn\">01</span>$c_{11}=1\\cdot5+2\\cdot7=19$,$c_{12}=1\\cdot6+2\\cdot8=22$。</div>\n<div class=\"step\"><span class=\"sn\">02</span>$c_{21}=3\\cdot5+4\\cdot7=43$,$c_{22}=3\\cdot6+4\\cdot8=50$。</div>\n<div class=\"step\"><span class=\"sn\">03</span>$AB=\\begin{pmatrix}19&22\\\\43&50\\end{pmatrix}$。$\\blacksquare$</div></div>\n\n<div class=\"card eg\"><span class=\"tag\">例 2 · 求幂</span>\n<p>$A=\\begin{pmatrix}1&1\\\\0&1\\end{pmatrix}$,求 $A^n$。</p>\n<div class=\"step\"><span class=\"sn\">01</span>$A^2=\\begin{pmatrix}1&2\\\\0&1\\end{pmatrix}$,$A^3=\\begin{pmatrix}1&3\\\\0&1\\end{pmatrix}$。</div>\n<div class=\"step\"><span class=\"sn\">02</span>归纳:$A^n=\\begin{pmatrix}1&n\\\\0&1\\end{pmatrix}$。$\\blacksquare$</div></div>\n\n<div class=\"card eg\"><span class=\"tag\">例 3 · 二阶求逆</span>\n<p>求 $A=\\begin{pmatrix}1&2\\\\3&4\\end{pmatrix}$ 的逆。</p>\n<div class=\"step\"><span class=\"sn\">01</span>$|A|=4-6=-2$。</div>\n<div class=\"step\"><span class=\"sn\">02</span>$A^*=\\begin{pmatrix}4&-2\\\\-3&1\\end{pmatrix}$。</div>\n<div class=\"step\"><span class=\"sn\">03</span>$A^{-1}=\\dfrac1{-2}\\begin{pmatrix}4&-2\\\\-3&1\\end{pmatrix}=\\begin{pmatrix}-2&1\\\\1.5&-0.5\\end{pmatrix}$。$\\blacksquare$</div></div>\n\n<div class=\"card eg\"><span class=\"tag\">例 4 · 初等变换求逆(三阶)</span>\n<p>求 $A=\\begin{pmatrix}1&0&0\\\\2&1&0\\\\3&2&1\\end{pmatrix}$ 的逆。</p>\n<div class=\"step\"><span class=\"sn\">01</span>$[A|E]=\\left[\\begin{array}{ccc|ccc}1&0&0&1&0&0\\\\2&1&0&0&1&0\\\\3&2&1&0&0&1\\end{array}\\right]$</div>\n<div class=\"step\"><span class=\"sn\">02</span>$r_2-2r_1$,$r_3-3r_1$:$\\left[\\begin{array}{ccc|ccc}1&0&0&1&0&0\\\\0&1&0&-2&1&0\\\\0&2&1&-3&0&1\\end{array}\\right]$</div>\n<div class=\"step\"><span class=\"sn\">03</span>$r_3-2r_2$:$\\left[\\begin{array}{ccc|ccc}1&0&0&1&0&0\\\\0&1&0&-2&1&0\\\\0&0&1&1&-2&1\\end{array}\\right]$</div>\n<div class=\"step\"><span class=\"sn\">04</span>$A^{-1}=\\begin{pmatrix}1&0&0\\\\-2&1&0\\\\1&-2&1\\end{pmatrix}$。$\\blacksquare$</div></div>\n\n<div class=\"card eg\"><span class=\"tag\">例 5 · 求秩</span>\n<p>求 $A=\\begin{pmatrix}1&2&3\\\\2&4&6\\\\1&1&1\\end{pmatrix}$ 的秩。</p>\n<div class=\"step\"><span class=\"sn\">01</span>$r_2-2r_1$:$\\begin{pmatrix}1&2&3\\\\0&0&0\\\\1&1&1\\end{pmatrix}$。</div>\n<div class=\"step\"><span class=\"sn\">02</span>$r_3-r_1$:$\\begin{pmatrix}1&2&3\\\\0&0&0\\\\0&-1&-2\\end{pmatrix}$。换行:$\\begin{pmatrix}1&2&3\\\\0&-1&-2\\\\0&0&0\\end{pmatrix}$。</div>\n<div class=\"step\"><span class=\"sn\">03</span>阶梯形 2 个非零行,$r(A)=2$。$\\blacksquare$</div></div>\n\n<div class=\"card eg\"><span class=\"tag\">例 6 · 解矩阵方程</span>\n<p>解 $AX=B$,其中 $A=\\begin{pmatrix}1&2\\\\3&4\\end{pmatrix}$,$B=\\begin{pmatrix}5\\\\11\\end{pmatrix}$。</p>\n<div class=\"step\"><span class=\"sn\">01</span>$A$ 可逆(例3),$X=A^{-1}B$。</div>\n<div class=\"step\"><span class=\"sn\">02</span>$A^{-1}=\\begin{pmatrix}-2&1\\\\1.5&-0.5\\end{pmatrix}$。</div>\n<div class=\"step\"><span class=\"sn\">03</span>$X=\\begin{pmatrix}-2&1\\\\1.5&-0.5\\end{pmatrix}\\begin{pmatrix}5\\\\11\\end{pmatrix}=\\begin{pmatrix}-10+11\\\\7.5-5.5\\end{pmatrix}=\\begin{pmatrix}1\\\\2\\end{pmatrix}$。$\\blacksquare$</div></div>\n\n<div class=\"card eg\"><span class=\"tag\">例 7 · 证明(AB=0)</span>\n<p>证:若 $A$ 可逆,且 $AB=O$,则 $B=O$。</p>\n<div class=\"step\"><span class=\"sn\">01</span>$AB=O$,两边左乘 $A^{-1}$:$A^{-1}AB=A^{-1}O$。</div>\n<div class=\"step\"><span class=\"sn\">02</span>$EB=O$,即 $B=O$。$\\blacksquare$</div>\n<div class=\"note\">对比:若 $A$ 不可逆,$AB=O$ 推不出 $B=O$(有零因子)。</div></div>\n\n<div class=\"card eg\"><span class=\"tag\">例 8 · 秩的证明</span>\n<p>证 $r(AB)\\le\\min(r(A),r(B))$。</p>\n<div class=\"step\"><span class=\"sn\">01</span>$AB$ 的列是 $A$ 的列的线性组合(每列 $Ab_j$),故 $AB$ 的列空间 $\\subseteq$ $A$ 的列空间。</div>\n<div class=\"step\"><span class=\"sn\">02</span>所以 $r(AB)\\le r(A)$。同理($AB$ 的行是 $B$ 的行的组合)$r(AB)\\le r(B)$。$\\blacksquare$</div></div>\n\n<div class=\"card eg\"><span class=\"tag\">例 9 · 对称反对称</span>\n<p>证:任一方阵 $A$ 可写成对称矩阵与反对称矩阵之和。</p>\n<div class=\"step\"><span class=\"sn\">01</span>令 $B=\\frac12(A+A^T)$(对称,$B^T=B$),$C=\\frac12(A-A^T)$(反对称,$C^T=-C$)。</div>\n<div class=\"step\"><span class=\"sn\">02</span>$A=B+C$。$\\blacksquare$</div></div>\n\n<div class=\"card eg\"><span class=\"tag\">例 10 · 含参数</span>\n<p>设 $A=\\begin{pmatrix}1&2\\\\2&a\\end{pmatrix}$,问 $a$ 为何值时 $A$ 不可逆?</p>\n<div class=\"step\"><span class=\"sn\">01</span>$A$ 不可逆 $\\iff |A|=0$。</div>\n<div class=\"step\"><span class=\"sn\">02</span>$|A|=a-4=0\\Rightarrow a=4$。$\\blacksquare$</div></div>\n\n<h2 id=\"quiz\"><span class=\"n\">11</span>练习(8 题)</h2>\n<div class=\"quiz\"><q>1. $A=\\begin{pmatrix}1&2\\end{pmatrix}$,$B=\\begin{pmatrix}3\\\\4\\end{pmatrix}$,求 $AB$ 和 $BA$。</q>\n<details><summary>看详解</summary><div class=\"ans\">$AB=1\\cdot3+2\\cdot4=11$(1×1);$BA=\\begin{pmatrix}3&6\\\\4&8\\end{pmatrix}$(2×2)。型不同,都成立但形状不同。</div></details></div>\n<div class=\"quiz\"><q>2. 求 $\\begin{pmatrix}2&0\\\\0&3\\end{pmatrix}^5$。</q>\n<details><summary>看详解</summary><div class=\"ans\">对角阵幂=对角元素各自幂:$\\begin{pmatrix}32&0\\\\0&243\\end{pmatrix}$。</div></details></div>\n<div class=\"quiz\"><q>3. 求 $\\begin{pmatrix}2&1\\\\5&3\\end{pmatrix}^{-1}$。</q>\n<details><summary>看详解</summary><div class=\"ans\">$|A|=6-5=1$,$A^*=\\begin{pmatrix}3&-1\\\\-5&2\\end{pmatrix}$,$A^{-1}=A^*$。</div></details></div>\n<div class=\"quiz\"><q>4. 用初等变换求 $\\begin{pmatrix}1&1\\\\1&2\\end{pmatrix}^{-1}$。</q>\n<details><summary>看详解</summary><div class=\"ans\">$[A|E]\\to[A|E]$ 化:$\\begin{pmatrix}1&1&1&0\\\\0&1&-1&1\\end{pmatrix}\\to\\begin{pmatrix}1&0&2&-1\\\\0&1&-1&1\\end{pmatrix}$,$A^{-1}=\\begin{pmatrix}2&-1\\\\-1&1\\end{pmatrix}$。</div></details></div>\n<div class=\"quiz\"><q>5. 求 $\\begin{pmatrix}1&2&3\\\\4&5&6\\\\7&8&9\\end{pmatrix}$ 的秩。</q>\n<details><summary>看详解</summary><div class=\"ans\">化阶梯形得 2 个非零行,$r=2$。</div></details></div>\n<div class=\"quiz\"><q>6. 证 $(AB)^{-1}=B^{-1}A^{-1}$。</q>\n<details><summary>看详解</summary><div class=\"ans\">$(B^{-1}A^{-1})(AB)=B^{-1}(A^{-1}A)B=B^{-1}EB=B^{-1}B=E$,故 $B^{-1}A^{-1}$ 是 $AB$ 的逆。</div></details></div>\n<div class=\"quiz\"><q>7. 若 $A^2=A$,且 $A$ 可逆,证 $A=E$。</q>\n<details><summary>看详解</summary><div class=\"ans\">$A^2=A\\Rightarrow A^2-A=O\\Rightarrow A(A-E)=O$。$A$ 可逆左乘 $A^{-1}$:$A-E=O\\Rightarrow A=E$。</div></details></div>\n<div class=\"quiz\"><q>8. $A=\\begin{pmatrix}1&2\\\\2&4\\end{pmatrix}$,$B=\\begin{pmatrix}2&-4\\\\-1&2\\end{pmatrix}$,验证 $AB=O$,但 $A,B$ 均非零。</q>\n<details><summary>看详解</summary><div class=\"ans\">$AB=\\begin{pmatrix}2-2&-4+4\\\\4-4&-8+8\\end{pmatrix}=O$。但 $A,B$ 都不是零矩阵--说明矩阵乘法有零因子。</div></details></div>\n\n<div class=\"summary\">\n<div class=\"st\">本节小结</div>\n<p><span class=\"pill\">对象</span>矩阵是数表;行列式是方阵算出的数。</p>\n<p><span class=\"pill\">乘法</span>行×列内积;不交换、不消去、有零因子。</p>\n<p><span class=\"pill\">转置</span>$(AB)^T=B^TA^T$。</p>\n<p><span class=\"pill\">逆</span>$AB=BA=E$;$A^{-1}=A^*/|A|$;$(AB)^{-1}=B^{-1}A^{-1}$;可逆 $\\iff|A|\\neq0$。</p>\n<p><span class=\"pill\">求逆</span>二阶用伴随(主换副负);三阶以上用初等行变换 $[A|E]\\to[E|A^{-1}]$。</p>\n<p><span class=\"pill\">秩</span>最高阶非零子式阶数;初等变换不变秩;化阶梯形求秩;$r(AB)\\le\\min(r(A),r(B))$。</p>\n<p style=\"margin-top:16px;color:var(--txt3)\"><b>下一章</b>:向量--用矩阵工具研究向量组的线性关系。</p>\n</div>\n",mount(root){
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

// ===== cv1: 矩阵乘法 行×列内积 =====
const cv1=document.getElementById('cv1'),c1=cv1.getContext('2d');
const btn1=document.getElementById('btn1'),cur1=document.getElementById('cur1');
const A=[[1,2],[3,4]], B=[[5,6],[7,8]];
let step1=0;
const steps=[
  ['c₁₁',0,0,'1·5+2·7',1*5+2*7],
  ['c₁₂',0,1,'1·6+2·8',1*6+2*8],
  ['c₂₁',1,0,'3·5+4·7',3*5+4*7],
  ['c₂₂',1,1,'3·6+4·8',3*6+4*8],
  ['完成',-1,-1,'AB = [[19,22],[43,50]]',0]
];
function draw1(){
  const w=cv1.width,h=cv1.height;c1.clearRect(0,0,w,h);
  const s=[[0,0,0],[0,1,0],[1,0,0],[1,1,0]]; // 简化
  // 画 A (2x2)
  const ax=80,ay=60,cw=50,ch=40;
  c1.font='20px Inter,monospace';c1.textAlign='center';c1.textBaseline='middle';
  c1.fillStyle='#405773';c1.fillText('A =',ax-30,ay+ch);
  for(let i=0;i<2;i++)for(let j=0;j<2;j++){
    const hi=(step1<4 && i===steps[step1][1] && j>=0); // 高亮A第i行
    c1.fillStyle = (step1<4 && i===steps[step1][1]) ? '#147557' : '#405773';
    c1.fillText(A[i][j],ax+j*cw+cw/2,ay+i*ch+ch/2);
  }
  // 画 B (2x2)
  const bx=ax+2*cw+80,by=ay;
  c1.fillStyle='#405773';c1.fillText('B =',bx-30,by+ch);
  for(let i=0;i<2;i++)for(let j=0;j<2;j++){
    c1.fillStyle = (step1<4 && j===steps[step1][2]) ? '#0e7288' : '#405773';
    c1.fillText(B[i][j],bx+j*cw+cw/2,by+i*ch+ch/2);
  }
  // 画 C=AB
  const cx=bx+2*cw+80,cy=ay;
  c1.fillStyle='#405773';c1.fillText('C =',cx-30,cy+ch);
  const C=[[19,22],[43,50]];
  for(let i=0;i<2;i++)for(let j=0;j<2;j++){
    const filled = step1>0 && (step1-1> (i*2+j));
    const cur = step1<4 && step1>0 && (step1-1===(i*2+j));
    c1.fillStyle = cur ? '#ae4c13' : (filled ? '#147557' : '#526579');
    c1.fillText(filled||cur ? C[i][j] : '?',cx+j*cw+cw/2,cy+i*ch+ch/2);
  }
  c1.textAlign='start';c1.textBaseline='alphabetic';
  c1.textBaseline='alphabetic';
  cur1.textContent = steps[step1][0] + ' = ' + steps[step1][3] + (step1<4 ? ' = ' + steps[step1][4] : '');
}
btn1.onclick=()=>{ step1=(step1+1)%5; draw1(); };
draw1();

// ===== cv2: 初等行变换可视化 =====
const cv2=document.getElementById('cv2'),c2=cv2.getContext('2d');
let M=[[1,2,3],[4,5,6],[7,8,9]];
function draw2(){
  const w=cv2.width,h=cv2.height;c2.clearRect(0,0,w,h);
  c2.font='22px Inter,monospace';c2.textAlign='center';c2.textBaseline='middle';
  const x0=120,y0=50,cw=60,ch=50;
  c1.fillStyle='#405773';
  for(let i=0;i<3;i++){
    c2.fillStyle='#526579';c2.font='14px Inter,monospace';c2.fillText('r'+(i+1),x0-40,y0+i*ch+ch/2);
    c2.font='22px Inter,monospace';
    for(let j=0;j<3;j++){
      c2.fillStyle='#405773';c2.fillText(M[i][j],x0+j*cw+cw/2,y0+i*ch+ch/2);
    }
  }
  c2.textAlign='start';c2.textBaseline='alphabetic';
}
document.getElementById('b2a').onclick=()=>{ [M[0],M[1]]=[M[1],M[0]]; draw2(); };
document.getElementById('b2b').onclick=()=>{ M[1]=M[1].map(x=>x*2); draw2(); };
document.getElementById('b2c').onclick=()=>{ M[1]=M[1].map((x,j)=>x+M[0][j]); draw2(); };
document.getElementById('b2d').onclick=()=>{ M=[[1,2,3],[4,5,6],[7,8,9]]; draw2(); };
draw2();

}};
