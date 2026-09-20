# 网站发布

源码仓库为 `none-pace/model`，保持 Private。网站为纯静态 HTML、CSS 和 JavaScript。

## 当前状态

2026-09-20 已尝试为此私有仓库创建 GitHub Pages。GitHub API 返回 HTTP 422：`Your current plan does not support GitHub Pages for this repository.` 因此目前没有已上线的 Pages 地址。不能通过更改工作流绕过账号套餐限制。

工作流 `.github/workflows/pages.yml` 已配置：每次推送 main 检查数学模型、链接和原章节结构，生成仅含网页和 assets 的部署产物。`PAGES_ENABLED` 未开启时不会执行发布；校验和产物生成照常进行。

## 账号支持私有仓库 Pages 后

1. 在仓库 Settings → Pages 中启用 Pages，Source 选择 GitHub Actions。
2. 在 Settings → Secrets and variables → Actions → Variables 添加 `PAGES_ENABLED`，值为 `true`。
3. 在 Actions 手动运行 `Check and publish math notes`，勾选 deploy；之后推送 main 会自动发布。
4. 实际网站地址以成功的部署任务输出为准，通常为 `https://none-pace.github.io/model/`。

私有仓库不等于私密网页：常规 GitHub Pages 网站可被公开访问。如果需要网站也有登录保护，应另外选择支持访问控制的托管方式。网站构建不会包含 `.git`、本地浏览器记录、检查脚本或工作文档；浏览器执行所需的 HTML、JavaScript 和资源会随网页提供。

## 本地检查部署产物

```powershell
node scripts/build-site.cjs
python -m http.server 8001 --bind 127.0.0.1 --directory _site
```

打开 `http://127.0.0.1:8001/`，根地址会进入笔记目录。
