# 🚀 部署指南

## 第一步：创建 GitHub 仓库

```bash
cd /Users/davidli/.openclaw/workspace/tech-daily

# 初始化 Git
git init

# 创建占位文件
mkdir -p output archives
touch output/.gitkeep archives/.gitkeep

# 首次提交
git add .
git commit -m "Initial commit: Tech Daily automation"

# 在 GitHub 上创建仓库后，关联远程
git remote add origin https://github.com/YOUR_USERNAME/tech-daily.git
git branch -M main
git push -u origin main
```

## 第二步：配置 Cloudflare Pages

1. 访问 [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. 左侧菜单 → **Workers & Pages** → **Create application**
3. 选择 **Connect to Git**
4. 选择你的 `tech-daily` 仓库
5. **Build settings**:
   - **Framework preset**: `None`
   - **Build command**: (留空)
   - **Build output directory**: `output`
   - **Root directory**: (留空)
6. 点击 **Save and Deploy**

部署完成后，你会得到一个 URL：
```
https://tech-daily-xxxx.pages.dev
```

## 第三步：设置自定义域名（可选）

1. 在 Cloudflare Pages 项目设置中
2. 进入 **Custom domains**
3. 点击 **Add custom domain**
4. 输入你的域名，如 `tech-daily.davidli.dev`
5. 按照提示配置 DNS

## 第四步：设置定时任务（自动化）

### 方案 A：本地 Cron（简单）

```bash
# 编辑 crontab
crontab -e

# 添加以下行（每天北京时间 7AM 运行）
0 7 * * * cd /Users/davidli/.openclaw/workspace/tech-daily && node src/generate.js && git add . && git commit -m "Daily: $(date +\%Y-\%m-\%d)" && git push
```

### 方案 B：GitHub Actions（推荐，更可靠）

创建 `.github/workflows/daily.yml`:

```yaml
name: Daily Tech News

on:
  schedule:
    - cron: '0 7 * * *'  # 每天 7AM UTC (北京时间 15:00)
  workflow_dispatch:  # 允许手动触发

jobs:
  generate:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
      
      - name: Install dependencies
        run: npm install
      
      - name: Generate daily report
        run: node src/generate.js
        env:
          TZ: Asia/Shanghai
      
      - name: Commit and push
        run: |
          git config --local user.email "action@github.com"
          git config --local user.name "GitHub Action"
          git add .
          git commit -m "Daily: $(date +\%Y-\%m-\%d)" || echo "No changes to commit"
          git push
```

## 第五步：测试

### 本地测试
```bash
cd /Users/davidli/.openclaw/workspace/tech-daily
npm install
npm run generate
```

然后打开 `output/index.html` 查看效果。

### 触发 GitHub Actions 测试
1. 进入 GitHub 仓库
2. 点击 **Actions** 标签
3. 选择 **Daily Tech News** workflow
4. 点击 **Run workflow**
5. 等待完成，检查 Cloudflare Pages 是否自动部署

## 📊 监控与维护

### 查看部署状态
- Cloudflare Pages Dashboard → 查看部署历史
- GitHub Actions → 查看 workflow 运行日志

### 问题排查
1. **生成失败**：检查 `src/generate.js` 日志
2. **部署失败**：检查 GitHub Actions 日志
3. **页面不更新**：清除 Cloudflare 缓存

## 🔧 进阶配置

### 添加更多新闻源
编辑 `src/generate.js`，在 `newsData` 中添加新的新闻项。

### 自动化新闻收集
集成真实的 API：
- Hacker News API
- NewsAPI.org
- RSS feeds

### 添加分析
在 HTML 中添加 Google Analytics 或 Plausible 统计代码。

---

## ✅ 检查清单

- [ ] GitHub 仓库创建并推送
- [ ] Cloudflare Pages 连接成功
- [ ] 自定义域名配置（可选）
- [ ] 定时任务设置完成
- [ ] 首次生成测试通过
- [ ] 部署后网站可访问

---

有问题？查看 [README.md](README.md) 或提 Issue。
