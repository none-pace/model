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

## 本地检查部署产物

```powershell
node scripts/build-site.cjs
python -m http.server 8001 --bind 127.0.0.1 --directory _site
```

打开 `http://127.0.0.1:8001/`，根地址会进入笔记目录。
