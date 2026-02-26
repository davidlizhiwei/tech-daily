#!/usr/bin/env python3
"""
Tech Daily - 邮件发送脚本
发送每日科技日报到指定邮箱
"""

import smtplib
import os
import sys
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from email.mime.base import MIMEBase
from email import encoders
from datetime import datetime

# 配置
SMTP_SERVER = "smtp.163.com"
SMTP_PORT = 465
SMTP_USERNAME = os.getenv("EMAIL_USERNAME", "davidlizhiwei@163.com")
SMTP_PASSWORD = os.getenv("EMAIL_PASSWORD")  # 从环境变量获取
RECIPIENT = os.getenv("EMAIL_RECIPIENT", "david.li.zhiwei@gmail.com")

def send_email(html_file_path):
    """发送科技日报邮件"""
    
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
    msg = MIMEMultipart("alternative")
    msg["Subject"] = f"🔥 全球科技日报 - {date_str}"
    msg["From"] = f"Tech Daily <{SMTP_USERNAME}>"
    msg["To"] = RECIPIENT
    
    # 纯文本版本
    text_content = f"""
全球科技日报 - {date_str}

今日热点摘要:
- Google API 密钥安全危机
- Perplexity 推出 Computer 平台
- AMD 与 Meta 达成千亿美元芯片交易
- Gemini 3.1 Pro 发布
- ChatGPT 开始插入广告

查看完整日报: https://davidlizhiwei.github.io/tech-daily/

---
此邮件由 Tech Daily 自动生成
"""
    
    # HTML 版本
    html_part = MIMEText(html_content, "html", "utf-8")
    msg.attach(html_part)
    
    # 添加纯文本版本
    text_part = MIMEText(text_content, "plain", "utf-8")
    msg.attach(text_part)
    
    try:
        # 连接 SMTP 服务器并发送
        print(f"📧 正在发送邮件到 {RECIPIENT}...")
        server = smtplib.SMTP_SSL(SMTP_SERVER, SMTP_PORT, timeout=10)
        server.set_debuglevel(0)
        server.login(SMTP_USERNAME, SMTP_PASSWORD)
        server.sendmail(SMTP_USERNAME, [RECIPIENT], msg.as_string())
        server.quit()
        print(f"✅ 邮件发送成功！")
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
