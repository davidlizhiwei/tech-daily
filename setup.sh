#!/bin/bash
# Tech Daily - 快速设置脚本

echo "🚀 Tech Daily 快速设置"
echo "====================="
echo ""

# 检查是否已安装 Node.js
if ! command -v node &> /dev/null; then
    echo "❌ 需要安装 Node.js"
    echo "请访问：https://nodejs.org/"
    exit 1
fi

echo "✅ Node.js 版本：$(node -v)"
echo ""

# 安装依赖
echo "📦 安装依赖..."
npm install

echo ""
echo "✅ 设置完成！"
echo ""
echo "📋 下一步:"
echo ""
echo "1️⃣  在 GitHub 创建新仓库 (名称：tech-daily)"
echo ""
echo "2️⃣  运行以下命令推送代码:"
echo "   git remote add origin https://github.com/YOUR_USERNAME/tech-daily.git"
echo "   git branch -M main"
echo "   git push -u origin main"
echo ""
echo "3️⃣  配置 Cloudflare Pages:"
echo "   - 访问 https://dash.cloudflare.com/"
echo "   - Workers & Pages → Create application → Connect to Git"
echo "   - 选择 tech-daily 仓库"
echo "   - Build output directory: output"
echo ""
echo "4️⃣  测试生成:"
echo "   npm run generate"
echo ""
echo "5️⃣  查看结果:"
echo "   open output/index.html"
echo ""
