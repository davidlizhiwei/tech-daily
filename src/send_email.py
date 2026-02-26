#!/usr/bin/env python3
"""
Tech Daily - 邮件发送脚本
发送每日科技日报到指定邮箱（完整 HTML 内容）
"""

import smtplib
import os
import sys
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from datetime import datetime

# 配置
SMTP_SERVER = "smtp.163.com"
SMTP_PORT = 465
SMTP_USERNAME = os.getenv("EMAIL_USERNAME", "davidlizhiwei@163.com")
SMTP_PASSWORD = os.getenv("EMAIL_PASSWORD")  # 从环境变量获取
RECIPIENT = os.getenv("EMAIL_RECIPIENT", "david.li.zhiwei@gmail.com")

def send_email(html_file_path):
    """发送科技日报邮件（完整 HTML 内容）"""
    
    if not SMTP_PASSWORD:
        print("❌ 错误：EMAIL_PASSWORD 环境变量未设置")
        sys.exit(1)
    
    # 读取 HTML 内容
    try:
        with open(html_file_path, 'r', encoding='utf-8') as f:
            html_content = f.read()
    except FileNotFoundError:
        print(f"❌ 错误：文件未找到 {html_file_path}")
        sys.exit(1)
    
    # 获取今日日期
    today = datetime.now()
    date_str = today.strftime("%Y年%m月%d日")
    
    # 创建邮件
    msg = MIMEMultipart("related")  # 使用 related 以便 HTML 内嵌资源
    msg["Subject"] = f"🔥 全球科技日报 - {date_str}"
    msg["From"] = f"Tech Daily <{SMTP_USERNAME}>"
    msg["To"] = RECIPIENT
    
    # 在 HTML 底部添加网站链接
    footer_html = """
    <div style="margin-top: 40px; padding: 20px; background: linear-gradient(135deg, rgba(0,217,255,0.15) 0%, rgba(0,255,136,0.08) 100%); border-radius: 12px; text-align: center; border: 1px solid rgba(0,217,255,0.3);">
        <p style="color: #e0e0e0; font-size: 14px; margin-bottom: 10px;">📬 这是自动发送的每日科技日报</p>
        <p style="margin: 15px 0;">
            <a href="https://davidlizhiwei.github.io/tech-daily/" style="display: inline-block; padding: 12px 30px; background: linear-gradient(90deg, #00d9ff, #00ff88); color: #1a1a2e; text-decoration: none; border-radius: 25px; font-weight: 600; font-size: 14px;">
                🌐 访问在线网站
            </a>
        </p>
        <p style="color: #888; font-size: 12px; margin-top: 15px;">
            网站永久保存所有历史日报 | 手机/电脑均可访问
        </p>
    </div>
    """
    
    # 在 HTML 的 </body> 前插入 footer
    if "</body>" in html_content:
        html_content = html_content.replace("</body>", footer_html + "\n</body>")
    
    # HTML 版本
    html_part = MIMEText(html_content, "html", "utf-8")
    msg.attach(html_part)
    
    try:
        # 连接 SMTP 服务器并发送
        print(f"📧 正在发送邮件到 {RECIPIENT}...")
        print(f"📄 邮件内容：完整 HTML 日报")
        server = smtplib.SMTP_SSL(SMTP_SERVER, SMTP_PORT, timeout=10)
        server.set_debuglevel(0)
        server.login(SMTP_USERNAME, SMTP_PASSWORD)
        server.sendmail(SMTP_USERNAME, [RECIPIENT], msg.as_string())
        server.quit()
        print(f"✅ 邮件发送成功！")
        print(f"📬 请检查收件箱：{RECIPIENT}")
        return True
    except smtplib.SMTPAuthenticationError:
        print("❌ SMTP 认证失败，请检查邮箱账号和密码/授权码")
        return False
    except smtplib.SMTPException as e:
        print(f"❌ 发送失败：{e}")
        return False
    except Exception as e:
        print(f"❌ 未知错误：{e}")
        return False

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("用法：python send_email.py <html 文件路径>")
        print("示例：python send_email.py output/index.html")
        sys.exit(1)
    
    html_file = sys.argv[1]
    success = send_email(html_file)
    sys.exit(0 if success else 1)
