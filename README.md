# 数学笔记

供个人学习、复习和积累的数学笔记，重在公式推导、几何理解与完整应用。沿高中预备知识、高等数学和线性代数依次阅读。

从 `index.html` 或 `math_index.html` 打开目录，或直接打开 `calculus.html`。这是不需要框架构建的静态网页。

也可以在项目目录启动本地服务：

```powershell
python -m http.server 8000 --bind 127.0.0.1
```

访问 http://127.0.0.1:8000/math_index.html 。

源码保存在私有仓库 [none-pace/model](https://github.com/none-pace/model)。当前账号套餐不支持该私有仓库的 GitHub Pages，网页尚未上线；检查与部署工作流已准备，具体状态及启用步骤见 [发布说明](DEPLOYMENT.md)。

## 学习范围

全书结构与后续编写规则以 [统一教材总纲](CURRICULUM.md) 为准，以理解数学、积累笔记为目标。具体内容账与未完成的深度要求见 [逐章编写表](MATH2_PLAN.md)。每节以公式的推导、适用条件、用途、直观图解和多个完整应用例子为主，练习只作辅助。预备篇按 [11 课教案](PREPARATORY_PLAN.md) 组织为代数与函数、三角函数、复合与反函数三个单元。当前仍是教材编写稿，尚不能承诺作为完整高数、线代教材独立覆盖全部学习需求。

全书共用一个目录、阅读界面与进度系统。首页只提供开始 / 继续阅读与顺序目录；阅读器固定按知识依赖顺序衔接，当前章展开，节末进入下一节。滚动到连续正文或专题小节时会记录阅读位置，明示链接优先于上次位置。搜索、公式索引放在折叠的查阅工具中，不要求先选择范围或筛选。导数概念和线性方程组已扩为连续正文，图解插在相应推导旁，多个图的参数各自保存。阅读 [导数](http://127.0.0.1:8000/calculus.html#derivative)，可从差商推到局部线性关系，并看速度、成本和圆面积的用法；阅读 [方程组](http://127.0.0.1:8000/calculus.html#linear-systems)，可从平面交集、可逆消元推到秩判据、基础解系，再看配液守恒与网络流量。相关旧小节链接跳到同一主讲位置，未建立平行版本。

[线代基础正文](http://127.0.0.1:8000/calculus.html#linear-span) 接着按向量、张成、相关性、子空间、基与维数、坐标连续展开。三维图展示“向量有三个坐标，但可能只张成一条线或一个平面”；坐标图把固定向量与它在不同基下的系数分开，并解释基退化后表示不存在或不唯一。六章专题继续保留详细推导与例子，基础概念不替代后续章节。完整线代审查与后续几何主线见 [线代编写计划](LINEAR_ALGEBRA_PLAN.md)。

已实际查阅同济高数上下册、同济线代的出版社目录，《张宇高等数学18讲2018》的目次，以及 Active Calculus、APEX、Interactive Linear Algebra 的相关源文档。来源、组织比较、准确缺口见 [教材对照审查](TEXTBOOK_REVIEW.md)。这些参考用于查漏与确定讲解深度，不作为内容已完整的证明；[内容核对页](coverage.html) 已拆出对数求导、相关变化率、引力模型等尚未成节项，不占据学习首页。

线代新增四节衔接精读：向量张成、矩阵变换、正交投影、解集与列空间。借鉴 [Interactive Linear Algebra](https://textbooks.math.gatech.edu/ila/) 将几何、定义与算法对应的教学方式，以及 [3Blue1Brown](https://github.com/3b1b/videos/tree/master/_2016/eola) 追踪基向量与网格的讲解思路；正文和 SVG 实验独立编写，未复制外部教材或动画代码。输入/输出空间分图，正交实验采用等比例坐标。二次型图修复为只绘制正值方向上的 f=1 等值集，不再用绝对值制造不存在的分支。

已有章内专题、例题、习题与 Canvas 演示编入 `assets/chapters/`，连续主讲正文位于 `assets/books/`，均在同一阅读界面按章衔接。`math_ch*.html` 和 `math_seq.html` 仅作为兼容入口，连同小节锚点转到统一教材。基础路线保留理解基础解系所需的基与维数解释；一般空间与坐标变换仍按后续专题区分。概率统计尚未包含，部分专题公式仍未配套交互图解，不宣称全部知识覆盖或所有公式均已图解。

## 文件与维护

- `assets/lessons.js`：原创内容，`scope: 'one'` 表示后续专题。每条核心公式必须对应一个实验。
- `assets/foundations.js`：归入现有章节的基础衔接内容；不是独立学习主线。
- `assets/preparatory.js`、`assets/preparatory-labs.js`：高中衔接课序、正文、综合检测与实验；后者也实现中值定理条件对照图。
- `assets/calculus-theorems.js`：在既有小节内展开高数定理的条件、证明与应用，不新增平行版本。
- `assets/books/`：连续主讲正文的数据；定义、证明、展开例子及随文插图按依赖交织。
- `assets/book-reader.js`、`assets/book.css`：连续正文排版、节内目录、每幅图的独立控制和状态。
- `assets/book-labs.js`：三维向量张成、基坐标、真实平面交集、逐步消元、左右差商、导函数、局部放大和圆环面积误差模型。
- `assets/linear.js`、`assets/linear-labs.js`：线代几何精读、数值模型及实验；先修链接指回同一本教材。
- `assets/coverage.js`、`assets/coverage-page.js`：主题阅读入口及待补清单，在独立的 `coverage.html` 编写说明页逐章核对；不代表全部内容已经完成。
- `assets/catalog.js`：统一章节顺序、专题入口、后续专题小节。
- `assets/chapters/`：各章专题正文和独立作用域的实验，按需加载；修改时先确认主讲位置在本目录还是 `assets/books/`，不编辑兼容入口。
- `assets/elementary.js`：常用函数、导数、原函数及适用区间，供公式表与数值图解共同使用。
- `assets/labs.js`：SVG 实验及同源数值。不要用屏幕像素计算数学量，三维剖面须明确说明。
- `assets/reader.js`：顺序阅读、章节目录、按需查阅、练习与本地学习进度；后续参考材料保留直接链接，不改变主线路线。
- `assets/home.js`、`assets/home.css`、`assets/reading.css`：单一阅读入口、继续阅读与正文优先的单栏布局。
- `assets/textbook.css`：排版、响应式、键盘焦点与打印样式。

本地进度使用 `calculus-study-v1` 键，存储不可用时退化为本次会话状态。公式排版使用 CDN 上的 KaTeX；网络不可用时显示原始数学记法，实验与正文仍可运行。没有账号、数据上传或分析服务。

## 检查

```powershell
node checks/math.cjs
node checks/linear.cjs
node checks/book.cjs
node checks/preparatory.cjs
node checks/coverage.cjs
node checks/preservation.cjs
node checks/linear-corrections.cjs
npx --yes --package @playwright/cli playwright-cli -s=calculus open http://127.0.0.1:8000/calculus.html
npx --yes --package @playwright/cli playwright-cli -s=calculus run-code --filename checks/browser.js
npx --yes --package @playwright/cli playwright-cli -s=calculus run-code --filename checks/book-browser.js
npx --yes --package @playwright/cli playwright-cli -s=calculus run-code --filename checks/unified.js
npx --yes --package @playwright/cli playwright-cli -s=calculus run-code --filename checks/linear-browser.js
npx --yes --package @playwright/cli playwright-cli -s=calculus run-code --filename checks/preparatory-browser.js
npx --yes --package @playwright/cli playwright-cli -s=calculus run-code --filename checks/coverage-browser.js
npx --yes --package @playwright/cli playwright-cli -s=calculus run-code --filename checks/reading-browser.js
npx --yes --package @playwright/cli playwright-cli -s=calculus run-code --filename checks/figure-layout-browser.js
npx --yes --package @playwright/cli playwright-cli -s=calculus run-code --filename checks/resilience.js
```

数学检查覆盖实验默认值与边界、平面交集及消元不变量、关键数值恒等式、导数与原函数的独立差分核验、坐标等比例和非零误差显示。浏览器检查遍历全部学习单元，检查公式解析、桌面与手机布局、Canvas 内容、独立图参、参数恢复、顺序衔接、继续阅读和旧地址跳转。截图输出到 `output/playwright/`。这些检查验证指定模型和页面行为，不能替代全书数学与教学内容的逐章审校。
