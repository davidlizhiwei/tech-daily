#!/usr/bin/env node
/**
 * Tech Daily - 全球科技日报自动生成脚本
 * 每天运行两次，仅收集 24 小时内的新闻
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

// 获取当前时间
const now = new Date();
const nowStr = now.toISOString();
const dateStr = nowStr.split('T')[0]; // YYYY-MM-DD
const timeStr = now.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit', timeZone: 'Asia/Shanghai' });
const dateDisplay = now.toLocaleDateString('zh-CN', {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  weekday: 'long',
  timeZone: 'Asia/Shanghai'
});

// 获取 24 小时前的时间戳
const timeframeHours = parseInt(process.env.NEWS_TIMEFRAME_HOURS) || 24;
const cutoffTime = new Date(now.getTime() - (timeframeHours * 60 * 60 * 1000));

console.log(`📰 生成科技日报 - ${dateDisplay}`);
console.log(`⏰ 时间范围：过去 ${timeframeHours} 小时`);
console.log(`📁 输出目录：${CONFIG.outputDir}`);

// 模拟新闻数据（带时间戳）- 实际应该从 API 获取
// 每条新闻必须有 publishedAt 字段（ISO 8601 格式）
const allNews = [
  // ⭐⭐⭐⭐⭐ 热度最高
  {
    id: 1,
    title: "Google API 密钥安全危机：Gemini 改变规则后密钥不再是秘密",
    summary: "安全研究人员发现 Google API 密钥在 Gemini 推出后存在严重泄露风险，可能导致未授权访问和费用滥用。",
    source: "Truffle Security",
    url: "https://trufflesecurity.com/blog/google-api-keys-werent-secrets-but-then-gemini-changed-the-rules",
    comments: "142 评论",
    badge: "🔥 716 热度",
    publishedAt: new Date(now.getTime() - 9 * 60 * 60 * 1000).toISOString(), // 9 小时前
    priority: 5
  },
  {
    id: 2,
    title: "Perplexity 推出 Computer 平台：多 AI Agent 协同的数字员工",
    summary: "Perplexity 发布全新平台，包含多个子 AI Agent，能够推理、委托、搜索、构建、记忆、编码和交付。",
    source: "Perplexity Blog",
    url: "https://www.perplexity.ai/hub/blog/introducing-perplexity-computer",
    comments: "AI Agent 新范式",
    badge: "🔥 爆点",
    publishedAt: new Date(now.getTime() - 11 * 60 * 60 * 1000).toISOString(), // 11 小时前
    priority: 5
  },
  {
    id: 3,
    title: "AMD 与 Meta 达成 1000 亿美元 AI 芯片交易",
    summary: "继 Nvidia 之后，Meta 又与 AMD 签署多年协议，采购价值 6 吉瓦的 AI 数据中心处理器。",
    source: "The Verge",
    url: "https://www.theverge.com/ai-artificial-intelligence",
    comments: "AI 基础设施",
    badge: "🔥 千亿大单",
    publishedAt: new Date(now.getTime() - 18 * 60 * 60 * 1000).toISOString(), // 18 小时前
    priority: 5
  },
  
  // ⭐⭐⭐⭐ 高热度
  {
    id: 4,
    title: "Gemini 3.1 Pro 发布：核心推理能力重大升级",
    summary: "Google 推出 Gemini 3.1 Pro 模型，专注于复杂推理任务，已在 Gemini 应用和 NotebookLM 中 rollout。",
    source: "Google Blog",
    url: "https://blog.google/innovation-and-ai/models-and-research/gemini-models/gemini-3-1-pro/",
    badge: "🆕 新品",
    publishedAt: new Date(now.getTime() - 20 * 60 * 60 * 1000).toISOString(), // 20 小时前
    priority: 4
  },
  {
    id: 5,
    title: "ChatGPT 开始插入广告：用户首次提示后即触发",
    summary: "Expedia、Best Buy、Qualcomm 等品牌广告开始出现在 ChatGPT 响应中。",
    source: "Adweek",
    url: "https://www.adweek.com/media/first-ads-on-chat-gpt-best-buy-expedia-qualcomm/",
    badge: "💰 商业化",
    publishedAt: new Date(now.getTime() - 2 * 60 * 60 * 1000).toISOString(), // 2 小时前
    priority: 4
  },
  {
    id: 6,
    title: "Windows 11 记事本将支持 Markdown",
    summary: "微软宣布 Windows 11 记事本和画图应用更新，将原生支持 Markdown 编辑。",
    source: "Windows Blog",
    url: "https://blogs.windows.com/windows-insider/2026/01/21/notepad-and-paint-updates-begin-rolling-out-to-windows-insiders/",
    comments: "435 评论",
    badge: "🪟 微软",
    publishedAt: new Date(now.getTime() - 17 * 60 * 60 * 1000).toISOString(), // 17 小时前
    priority: 4
  },
  
  // ⭐⭐⭐ 值得关注
  {
    id: 7,
    title: "GitHub 热榜：SkyPilot 统一管理 AI 工作负载",
    summary: "支持 Kubernetes、20+ 云平台和本地部署的 AI 工作负载管理系统。",
    source: "GitHub",
    url: "https://github.com/skypilot-org/skypilot",
    badge: "🐙 GitHub",
    publishedAt: new Date(now.getTime() - 5 * 60 * 60 * 1000).toISOString(), // 5 小时前
    priority: 3
  },
  {
    id: 8,
    title: "开源项目：Lance 多模态 AI 湖仓格式",
    summary: "Rust 编写的开放湖仓格式，随机访问速度快 100 倍，支持向量索引和数据版本控制。",
    source: "GitHub",
    url: "https://github.com/lance-format/lance",
    comments: "今日 +7 星",
    badge: "🦀 Rust",
    publishedAt: new Date(now.getTime() - 3 * 60 * 60 * 1000).toISOString(), // 3 小时前
    priority: 3
  },
  {
    id: 9,
    title: "Oura 智能戒指推出女性健康 AI 聊天机器人",
    summary: "Oura Advisor 新增专门讨论女性生殖健康的 AI 模型，覆盖从月经周期到更年期。",
    source: "The Verge",
    url: "https://www.theverge.com/ai-artificial-intelligence",
    badge: "💍 可穿戴",
    publishedAt: new Date(now.getTime() - 26 * 60 * 60 * 1000).toISOString(), // 26 小时前（应该被过滤）
    priority: 3
  },
  
  // ⭐⭐ 其他热点
  {
    id: 10,
    title: "OpenAI Stargate 计划遇阻：高成本导致战略调整",
    source: "OpenAI",
    url: "https://openai.com/index/five-new-stargate-sites/",
    publishedAt: new Date(now.getTime() - 72 * 60 * 60 * 1000).toISOString(), // 72 小时前（应该被过滤）
    priority: 2
  },
  {
    id: 11,
    title: "RAM 成本飙升：占 HP PC 物料成本 35%",
    source: "Ars Technica",
    url: "https://arstechnica.com/gadgets/2026/02/ram-now-represents-35-percent-of-bill-of-materials-for-hp-pcs/",
    comments: "201 评论",
    publishedAt: new Date(now.getTime() - 8 * 60 * 60 * 1000).toISOString(), // 8 小时前
    priority: 2
  },
  {
    id: 12,
    title: "Ben Evans 分析：OpenAI 将如何竞争？",
    source: "Ben Evans",
    url: "https://www.ben-evans.com/benedictevans/2026/2/19/how-will-openai-compete-nkg2x",
    comments: "342 评论",
    publishedAt: new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 天前（应该被过滤）
    priority: 2
  }
];

// 过滤 24 小时内的新闻
function filterRecentNews(news, cutoffDate) {
  return news.filter(item => {
    const pubDate = new Date(item.publishedAt);
    return pubDate >= cutoffDate;
  });
}

// 格式化相对时间
function formatRelativeTime(isoString) {
  const pubDate = new Date(isoString);
  const diffMs = now - pubDate;
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffMinutes = Math.floor(diffMs / (1000 * 60));
  
  if (diffMinutes < 60) {
    return `${diffMinutes}分钟前`;
  } else if (diffHours < 24) {
    return `${diffHours}小时前`;
  } else {
    const diffDays = Math.floor(diffHours / 24);
    return `${diffDays}天前`;
  }
}

// 按优先级分类新闻
function categorizeNews(news) {
  return {
    hot5: news.filter(n => n.priority === 5),
    hot4: news.filter(n => n.priority === 4),
    hot3: news.filter(n => n.priority === 3),
    hot2: news.filter(n => n.priority === 2)
  };
}

// 生成行动建议（基于新闻内容）
function generateActionItems(news) {
  const highPriority = [];
  const mediumPriority = [];
  const lowPriority = [];
  
  news.forEach(item => {
    if (item.priority >= 5) {
      if (item.title.includes("安全") || item.title.includes("危机")) {
        highPriority.push("检查相关安全配置，避免潜在风险");
      } else if (item.title.includes("发布") || item.title.includes("推出")) {
        highPriority.push(`评估 ${item.source} 新品是否可整合到工作流`);
      }
    } else if (item.priority === 4) {
      mediumPriority.push(`关注：${item.title.split("：")[0]}`);
    } else {
      lowPriority.push(item.title.split("：")[0]);
    }
  });
  
  return [
    {
      priority: "🔴 高优先级",
      items: [...new Set(highPriority)].slice(0, 3)
    },
    {
      priority: "🟡 中优先级",
      items: [...new Set(mediumPriority)].slice(0, 3)
    },
    {
      priority: "🟢 了解即可",
      items: [...new Set(lowPriority)].slice(0, 3)
    }
  ];
}

// 过滤并分类新闻
const recentNews = filterRecentNews(allNews, cutoffTime);
const newsData = categorizeNews(recentNews);
const actionItems = generateActionItems(recentNews);

const totalNews = recentNews.length;

// 生成 HTML
function generateHTML(data) {
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
        .time-range { 
            color: #00d9ff; 
            font-size: 0.9em; 
            margin-top: 8px;
            display: inline-block;
            padding: 4px 12px;
            background: rgba(0,217,255,0.1);
            border-radius: 12px;
        }
        
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
            background: rgba(255,255,255,0.05);
            padding: 2px 8px;
            border-radius: 10px;
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
        
        /* 无新闻提示 */
        .no-news {
            text-align: center;
            padding: 40px;
            color: #888;
        }
        
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
            <p class="date">${dateDisplay} ${timeStr}</p>
            <p class="time-range">📰 仅显示 ${timeframeHours} 小时内新闻</p>
        </header>

        <!-- 行动建议 -->
        <div class="action-section">
            <h2 class="action-title">💡 今日行动建议</h2>
            ${actionItems.map(priority => `
            <div class="action-priority">
                <div class="priority-label priority-${priority.priority.includes('高') ? 'high' : priority.priority.includes('中') ? 'medium' : 'low'}">${priority.priority}</div>
                <ul class="action-list">
                    ${priority.items.length > 0 ? priority.items.map(item => `<li>${item}</li>`).join('') : '<li style="color:#666">暂无相关建议</li>'}
                </ul>
            </div>
            `).join('')}
        </div>

        <div class="stats">
            <div class="stat-card">
                <div class="stat-number">${totalNews}</div>
                <div class="stat-label">24h 新闻</div>
            </div>
            <div class="stat-card">
                <div class="stat-number">${data.hot5.length + data.hot4.length}</div>
                <div class="stat-label">AI 热点</div>
            </div>
            <div class="stat-card">
                <div class="stat-number">${data.hot3.length}</div>
                <div class="stat-label">开源项目</div>
            </div>
            <div class="stat-card">
                <div class="stat-number">${data.hot2.length}</div>
                <div class="stat-label">其他</div>
            </div>
        </div>

        ${totalNews === 0 ? `
        <div class="no-news">
            <p style="font-size: 1.2em; margin-bottom: 10px;">😴 暂无新闻</p>
            <p>过去 ${timeframeHours} 小时内没有新的科技新闻</p>
            <p style="margin-top: 20px; color: #666;">下次检查时间：${timeframeHours === 24 ? '明天 7:00 AM' : '今天 19:00 PM'}</p>
        </div>
        ` : `
        ${data.hot5.length > 0 ? `
        <div class="section">
            <h2 class="section-title">⭐⭐⭐⭐⭐ 今日最热</h2>
            ${data.hot5.map(news => renderNewsItem(news, 'hot-5')).join('')}
        </div>
        ` : ''}

        ${data.hot4.length > 0 ? `
        <div class="section">
            <h2 class="section-title">⭐⭐⭐⭐ 高热度</h2>
            ${data.hot4.map(news => renderNewsItem(news, 'hot-4')).join('')}
        </div>
        ` : ''}

        ${data.hot3.length > 0 ? `
        <div class="section">
            <h2 class="section-title">⭐⭐⭐ 值得关注</h2>
            ${data.hot3.map(news => renderNewsItem(news, 'hot-3')).join('')}
        </div>
        ` : ''}

        ${data.hot2.length > 0 ? `
        <div class="section">
            <h2 class="section-title">📊 其他热点</h2>
            ${data.hot2.map(news => renderNewsItem(news, 'hot-2')).join('')}
        </div>
        ` : ''}
        `}

        <footer>
            <p>📰 数据来源：Hacker News, The Verge, TechCrunch, GitHub, arXiv</p>
            <p>⏰ 更新时间：${now.toLocaleString('zh-CN', { timeZone: 'Asia/Shanghai' })} GMT+8</p>
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
                    <span class="news-time">⏰ ${formatRelativeTime(news.publishedAt)}</span>
                </div>
            </div>`;
}

// 主函数
async function main() {
  try {
    // 生成 HTML
    const html = generateHTML(newsData);
    
    // 保存到 output 目录（最新）
    const outputPath = path.join(CONFIG.outputDir, 'index.html');
    fs.writeFileSync(outputPath, html, 'utf8');
    console.log(`✅ 最新日报：${outputPath}`);
    
    // 保存到 archives 目录（归档）- 使用时间戳避免覆盖
    const timestamp = now.toISOString().replace(/[:.]/g, '-').split('T').join('_');
    const archivePath = path.join(CONFIG.archivesDir, `tech-daily-${dateStr}_${timestamp}.html`);
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
    console.log(`📊 24 小时内新闻：${totalNews} 条`);
    console.log(`🗑️  已过滤旧新闻：${allNews.length - totalNews} 条`);
    console.log('\n📋 下一步:');
    console.log('1. git add . && git commit -m "Daily: ' + dateStr + ' ' + timeStr + '" && git push');
    console.log('2. GitHub Pages 会自动部署');
    console.log('3. 邮件会自动发送（如果配置了 Secrets）');
    
  } catch (error) {
    console.error('❌ 生成失败:', error);
    process.exit(1);
  }
}

main();
