# 网站发布

源码仓库为 [none-pace/model](https://github.com/none-pace/model)，设为 Public。网站为纯静态 HTML、CSS 和 JavaScript，地址为 https://none-pace.github.io/model/ 。

## 自动部署

仓库 Settings → Pages 的 Source 使用 GitHub Actions，并启用 HTTPS。

工作流 `.github/workflows/pages.yml` 在每次推送 main 时运行：

1. 检查数学模型、阅读链接、内容覆盖账和原章节结构。
2. 运行 `node scripts/build-site.cjs`，生成仅含根目录网页与 `assets/` 的 `_site/` 产物。
3. 检查与构建成功后，通过 GitHub Pages 发布网站。

也可以在 Actions 中手动运行 `Check and publish math notes`。无需额外部署变量或访问令牌。构建检查失败时不发布新版本；部署结果及网站地址可在工作流的 `deploy` 任务中查看。

仓库内容、提交历史和网站均可公开访问。网站构建不会包含 `.git`、本地浏览器记录、检查脚本或工作文档；网页所需的 HTML、JavaScript 和资源随网站提供。阅读进度保存在各浏览器本地，不会上传或跨设备同步；线上域名与本地预览的进度各自独立。

## 搜索引擎收录

构建脚本为所有发布的 HTML 页面统一加入 `<meta name="robots" content="noindex, nofollow">`，包括首页、阅读器、内容核对页和旧地址跳转页。以后新增的根目录 HTML 页面也会自动带上这条指令。该设置要求遵守指令的搜索引擎不收录页面、不跟踪页面内链接；如果此前已被收录，需要等待搜索引擎重新抓取后处理，不会立即消失。

页面仍允许抓取，以便搜索引擎读取 `noindex`；没有用 `robots.txt` 禁止抓取。项目路径 `/model/robots.txt` 也不能替代域名根路径 `/robots.txt` 的规则。

这不是访问保护，也不能保证所有搜索服务都遵守。任何知道网址的人仍可访问，公开 GitHub 仓库及提交历史仍可被搜索或复制。若需要真正限制他人访问，须改用私有仓库和带登录验证的托管方案。

## 本地检查部署产物

```powershell
node scripts/build-site.cjs
python -m http.server 8001 --bind 127.0.0.1 --directory _site
```

打开 `http://127.0.0.1:8001/`，根地址会进入笔记目录。
