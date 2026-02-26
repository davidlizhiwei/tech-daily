#!/usr/bin/env node
/**
 * Tech Daily - 全球科技日报自动生成脚本
 * 每天运行一次，收集新闻并生成 HTML 日报
 */

const fs = require('fs');
const path = require('path');

// 配置
const CONFIG = {
  outputDir: path.join(__dirname, '../output'),
  archivesDir: path.join(__dirname, '../archives'),
  templateFile: path.join(__dirname, 'template.html'),
};

// 确保目录存在
[CONFIG.outputDir, CONFIG.archivesDir].forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

// 获取今日日期
const today = new Date();
const dateStr = today.toISOString().split('T')[0]; // YYYY-MM-DD
const dateDisplay = today.toLocaleDateString('zh-CN', {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  weekday: 'long'
});
const timeStr = today.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' });

console.log(`📰 生成科技日报 - ${dateDisplay}`);
console.log(`📁 输出目录：${CONFIG.outputDir}`);

// 行动建议（根据新闻内容动态生成）
const actionItems = [
  {
    priority: "🔴 高优先级",
    items: [
      "检查你的 Google API 密钥是否已轮换，避免泄露风险",
      "评估 Perplexity Computer 是否可替代现有工作流中的工具"
    ]
  },
  {
    priority: "🟡 中优先级",
    items: [
      "关注 AMD-Meta 交易对 AI 芯片市场的影响",
      "测试 Gemini 3.1 Pro 的推理能力是否有提升"
    ]
  },
  {
    priority: "🟢 了解即可",
    items: [
      "Windows 11 记事本 Markdown 支持（开发者友好）",
      "GitHub 热榜项目 SkyPilot 可关注"
    ]
  }
];

// 新闻数据（带时间戳）
const newsData = {
  hot5: [
    {
      title: "Google API 密钥安全危机：Gemini 改变规则后密钥不再是秘密",
      summary: "安全研究人员发现 Google API 密钥在 Gemini 推出后存在严重泄露风险，可能导致未授权访问和费用滥用。",
      source: "Truffle Security",
      url: "https://trufflesecurity.com/blog/google-api-keys-werent-secrets-but-then-gemini-changed-the-rules",
      comments: "142 评论",
      badge: "🔥 716 热度",
      time: "9 小时前"
    },
    {
      title: "Perplexity 推出 Computer 平台：多 AI Agent 协同的数字员工",
      summary: "Perplexity 发布全新平台，包含多个子 AI Agent，能够推理、委托、搜索、构建、记忆、编码和交付。",
      source: "Perplexity Blog",
      url: "https://www.perplexity.ai/hub/blog/introducing-perplexity-computer",
      comments: "AI Agent 新范式",
      badge: "🔥 爆点",
      time: "11 小时前"
    },
    {
      title: "AMD 与 Meta 达成 1000 亿美元 AI 芯片交易",
      summary: "继 Nvidia 之后，Meta 又与 AMD 签署多年协议，采购价值 6 吉瓦的 AI 数据中心处理器。",
      source: "The Verge",
      url: "https://www.theverge.com/ai-artificial-intelligence",
      comments: "AI 基础设施",
      badge: "🔥 千亿大单",
      time: "昨天"
    }
  ],
  hot4: [
    {
      title: "Gemini 3.1 Pro 发布：核心推理能力重大升级",
      summary: "Google 推出 Gemini 3.1 Pro 模型，专注于复杂推理任务，已在 Gemini 应用和 NotebookLM 中 rollout。",
      source: "Google Blog",
      url: "https://blog.google/innovation-and-ai/models-and-research/gemini-models/gemini-3-1-pro/",
      badge: "🆕 新品",
      time: "昨天"
    },
    {
      title: "ChatGPT 开始插入广告：用户首次提示后即触发",
      summary: "Expedia、Best Buy、Qualcomm 等品牌广告开始出现在 ChatGPT 响应中。",
      source: "Adweek",
      url: "https://www.adweek.com/media/first-ads-on-chat-gpt-best-buy-expedia-qualcomm/",
      badge: "💰 商业化",
      time: "2 天前"
    },
    {
      title: "Windows 11 记事本将支持 Markdown",
      summary: "微软宣布 Windows 11 记事本和画图应用更新，将原生支持 Markdown 编辑。",
      source: "Windows Blog",
      url: "https://blogs.windows.com/windows-insider/2026/01/21/notepad-and-paint-updates-begin-rolling-out-to-windows-insiders/",
      comments: "435 评论",
      badge: "🪟 微软",
      time: "17 小时前"
    }
  ],
  hot3: [
    {
      title: "GitHub 热榜：SkyPilot 统一管理 AI 工作负载",
      summary: "支持 Kubernetes、20+ 云平台和本地部署的 AI 工作负载管理系统。",
      source: "GitHub",
      url: "https://github.com/skypilot-org/skypilot",
      badge: "🐙 GitHub",
      time: "今日"
    },
    {
      title: "开源项目：Lance 多模态 AI 湖仓格式",
      summary: "Rust 编写的开放湖仓格式，随机访问速度快 100 倍，支持向量索引和数据版本控制。",
      source: "GitHub",
      url: "https://github.com/lance-format/lance",
      comments: "今日 +7 星",
      badge: "🦀 Rust",
      time: "今日"
    },
    {
      title: "Oura 智能戒指推出女性健康 AI 聊天机器人",
      summary: "Oura Advisor 新增专门讨论女性生殖健康的 AI 模型，覆盖从月经周期到更年期。",
      source: "The Verge",
      url: "https://www.theverge.com/ai-artificial-intelligence",
      badge: "💍 可穿戴",
      time: "昨天"
    }
  ],
  hot2: [
    {
      title: "OpenAI Stargate 计划遇阻：高成本导致战略调整",
      source: "OpenAI",
      url: "https://openai.com/index/five-new-stargate-sites/",
      time: "3 天前"
    },
    {
      title: "RAM 成本飙升：占 HP PC 物料成本 35%",
      source: "Ars Technica",
      url: "https://arstechnica.com/gadgets/2026/02/ram-now-represents-35-percent-of-bill-of-materials-for-hp-pcs/",
      comments: "201 评论",
      time: "8 小时前"
    },
    {
      title: "Ben Evans 分析：OpenAI 将如何竞争？",
      source: "Ben Evans",
      url: "https://www.ben-evans.com/benedictevans/2026/2/19/how-will-openai-compete-nkg2x",
      comments: "342 评论",
      time: "1 周前"
    }
  ]
};

// 生成 HTML
function generateHTML(data, includeFullContent = true) {
  const totalNews = data.hot5.length + data.hot4.length + data.hot3.length + data.hot2.length;
  
  return `<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>🔥 全球科技日报 - ${dateStr}</title>
    <meta name="description" content="每日全球科技新闻汇总，按热度排序">
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
            background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
            color: #e0e0e0;
            line-height: 1.6;
            padding: 20px;
            min-height: 100vh;
        }
        .container {
            max-width: 900px;
            margin: 0 auto;
            background: rgba(255,255,255,0.05);
            border-radius: 16px;
            padding: 40px;
            backdrop-filter: blur(10px);
            box-shadow: 0 8px 32px rgba(0,0,0,0.3);
        }
        header {
            text-align: center;
            margin-bottom: 30px;
            padding-bottom: 20px;
            border-bottom: 2px solid rgba(255,255,255,0.1);
        }
        h1 {
            font-size: 2.5em;
            background: linear-gradient(90deg, #00d9ff, #00ff88);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            margin-bottom: 10px;
        }
        .date { color: #888; font-size: 1.1em; }
        
        /* 行动建议区块 */
        .action-section {
            background: linear-gradient(135deg, rgba(0,217,255,0.1) 0%, rgba(0,255,136,0.05) 100%);
            border: 1px solid rgba(0,217,255,0.3);
            border-radius: 12px;
            padding: 25px;
            margin-bottom: 35px;
        }
        .action-title {
            font-size: 1.4em;
            color: #00d9ff;
            margin-bottom: 15px;
            display: flex;
            align-items: center;
            gap: 10px;
        }
        .action-priority {
            margin-bottom: 15px;
        }
        .action-priority:last-child { margin-bottom: 0; }
        .priority-label {
            font-weight: 600;
            margin-bottom: 8px;
            font-size: 1em;
        }
        .priority-high { color: #ff6b6b; }
        .priority-medium { color: #ffd93d; }
        .priority-low { color: #6bcb77; }
        .action-list {
            list-style: none;
            padding-left: 10px;
        }
        .action-list li {
            padding: 5px 0;
            padding-left: 20px;
            position: relative;
            color: #ccc;
        }
        .action-list li:before {
            content: "→";
            position: absolute;
            left: 0;
            color: #00d9ff;
        }
        
        .section { margin-bottom: 35px; }
        .section-title {
            font-size: 1.8em;
            color: #00d9ff;
            margin-bottom: 20px;
            display: flex;
            align-items: center;
            gap: 10px;
        }
        .news-item {
            background: rgba(255,255,255,0.03);
            border-left: 4px solid;
            padding: 20px;
            margin-bottom: 15px;
            border-radius: 0 8px 8px 0;
            transition: transform 0.2s, background 0.2s;
        }
        .news-item:hover {
            transform: translateX(5px);
            background: rgba(255,255,255,0.06);
        }
        .hot-5 { border-color: #ff4757; }
        .hot-4 { border-color: #ffa502; }
        .hot-3 { border-color: #2ed573; }
        .hot-2 { border-color: #1e90ff; }
        .news-title {
            font-size: 1.2em;
            font-weight: 600;
            margin-bottom: 8px;
            color: #fff;
        }
        .news-summary {
            color: #aaa;
            font-size: 0.95em;
            margin-bottom: 10px;
        }
        .news-meta {
            display: flex;
            gap: 15px;
            font-size: 0.85em;
            color: #666;
            flex-wrap: wrap;
            align-items: center;
        }
        .news-time {
            color: #888;
            font-size: 0.8em;
        }
        .source {
            color: #00d9ff;
            text-decoration: none;
        }
        .source:hover { text-decoration: underline; }
        .badge {
            display: inline-block;
            padding: 2px 8px;
            border-radius: 12px;
            font-size: 0.75em;
            background: rgba(255,255,255,0.1);
        }
        .hot-badge {
            background: linear-gradient(90deg, #ff4757, #ffa502);
            color: #fff;
        }
        footer {
            text-align: center;
            margin-top: 40px;
            padding-top: 20px;
            border-top: 1px solid rgba(255,255,255,0.1);
            color: #666;
            font-size: 0.9em;
        }
        .stats {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
            gap: 15px;
            margin-bottom: 30px;
        }
        .stat-card {
            background: rgba(255,255,255,0.05);
            padding: 15px;
            border-radius: 8px;
            text-align: center;
        }
        .stat-number {
            font-size: 2em;
            font-weight: bold;
            color: #00ff88;
        }
        .stat-label { color: #888; font-size: 0.85em; }
        
        /* 邮件专用样式 */
        .email-footer {
            margin-top: 40px;
            padding: 20px;
            background: rgba(0,217,255,0.1);
            border-radius: 8px;
            text-align: center;
        }
        .email-footer a {
            color: #00d9ff;
            text-decoration: none;
            font-weight: 600;
        }
        .email-footer a:hover { text-decoration: underline; }
        
        @media (max-width: 600px) {
            .container { padding: 20px; }
            h1 { font-size: 1.8em; }
            .section-title { font-size: 1.4em; }
            .action-section { padding: 15px; }
        }
    </style>
</head>
<body>
    <div class="container">
        <header>
            <h1>🔥 全球科技日报</h1>
            <p class="date">${dateDisplay} ${timeStr} | 第 ${getDayOfYear(today)} 期</p>
        </header>

        <!-- 行动建议 -->
        <div class="action-section">
            <h2 class="action-title">💡 今日行动建议</h2>
            ${actionItems.map(priority => `
            <div class="action-priority">
                <div class="priority-label priority-${priority.priority.includes('高') ? 'high' : priority.priority.includes('中') ? 'medium' : 'low'}">${priority.priority}</div>
                <ul class="action-list">
                    ${priority.items.map(item => `<li>${item}</li>`).join('')}
                </ul>
            </div>
            `).join('')}
        </div>

        <div class="stats">
            <div class="stat-card">
                <div class="stat-number">${totalNews}</div>
                <div class="stat-label">今日新闻</div>
            </div>
            <div class="stat-card">
                <div class="stat-number">${data.hot5.length + data.hot4.length}</div>
                <div class="stat-label">AI 热点</div>
            </div>
            <div class="stat-card">
                <div class="stat-number">${getDayOfYear(today)}</div>
                <div class="stat-label">2026 年第 X 期</div>
            </div>
            <div class="stat-card">
                <div class="stat-number">5</div>
                <div class="stat-label">信息来源</div>
            </div>
        </div>

        <div class="section">
            <h2 class="section-title">⭐⭐⭐⭐⭐ 今日最热</h2>
            ${data.hot5.map(news => renderNewsItem(news, 'hot-5')).join('')}
        </div>

        <div class="section">
            <h2 class="section-title">⭐⭐⭐⭐ 高热度</h2>
            ${data.hot4.map(news => renderNewsItem(news, 'hot-4')).join('')}
        </div>

        <div class="section">
            <h2 class="section-title">⭐⭐⭐ 值得关注</h2>
            ${data.hot3.map(news => renderNewsItem(news, 'hot-3')).join('')}
        </div>

        <div class="section">
            <h2 class="section-title">📊 其他热点</h2>
            ${data.hot2.map(news => renderNewsItem(news, 'hot-2')).join('')}
        </div>

        <footer>
            <p>📰 数据来源：Hacker News, The Verge, TechCrunch, GitHub, arXiv</p>
            <p>⏰ 更新时间：${today.toLocaleString('zh-CN', { timeZone: 'Asia/Shanghai' })} GMT+8</p>
            <p style="margin-top: 15px; color: #00d9ff;">🤖 自动生成自 OpenClaw AI | <a href="https://github.com/davidlizhiwei/tech-daily" style="color: #00d9ff;">GitHub</a></p>
        </footer>
    </div>
</body>
</html>`;
}

function renderNewsItem(news, hotClass) {
  return `
            <div class="news-item ${hotClass}">
                <div class="news-title">${news.title}</div>
                ${news.summary ? `<div class="news-summary">${news.summary}</div>` : ''}
                <div class="news-meta">
                    ${news.badge ? `<span class="badge hot-badge">${news.badge}</span>` : ''}
                    <a href="${news.url}" class="source" target="_blank" rel="noopener">${news.source}</a>
                    ${news.comments ? `<span>${news.comments}</span>` : ''}
                    ${news.time ? `<span class="news-time">⏰ ${news.time}</span>` : ''}
                </div>
            </div>`;
}

function getDayOfYear(date) {
  const start = new Date(date.getFullYear(), 0, 0);
  const diff = date - start;
  const oneDay = 1000 * 60 * 60 * 24;
  return Math.floor(diff / oneDay);
}

// 主函数
async function main() {
  try {
    // 生成 HTML
    const html = generateHTML(newsData, true);
    
    // 保存到 output 目录（最新）
    const outputPath = path.join(CONFIG.outputDir, 'index.html');
    fs.writeFileSync(outputPath, html, 'utf8');
    console.log(`✅ 最新日报：${outputPath}`);
    
    // 保存到 archives 目录（归档）
    const archivePath = path.join(CONFIG.archivesDir, `tech-daily-${dateStr}.html`);
    fs.writeFileSync(archivePath, html, 'utf8');
    console.log(`✅ 归档文件：${archivePath}`);
    
    // 复制到 workspace 根目录（方便访问）
    const rootPath = path.join(__dirname, `../tech-daily-${dateStr}.html`);
    fs.writeFileSync(rootPath, html, 'utf8');
    console.log(`✅ 根目录副本：${rootPath}`);
    
    // 复制到 index.html（GitHub Pages）
    const indexPath = path.join(__dirname, '../index.html');
    fs.writeFileSync(indexPath, html, 'utf8');
    console.log(`✅ GitHub Pages: ${indexPath}`);
    
    console.log('\n🎉 生成完成！');
    console.log('\n📋 下一步:');
    console.log('1. git add . && git commit -m "Daily: ' + dateStr + '" && git push');
    console.log('2. GitHub Pages 会自动部署');
    console.log('3. 邮件会自动发送（如果配置了 Secrets）');
    
  } catch (error) {
    console.error('❌ 生成失败:', error);
    process.exit(1);
  }
}

main();
