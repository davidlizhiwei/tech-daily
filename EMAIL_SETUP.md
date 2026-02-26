# 📧 邮件发送功能配置指南

## 第一步：获取 163 邮箱授权码

1. 登录 [163 邮箱](https://mail.163.com/)
2. 点击顶部 **设置** → **POP3/SMTP/IMAP**
3. 确保 **IMAP/SMTP 服务** 已开启
4. 点击 **客户端授权密码** → **设置授权码**
5. 按提示发送短信验证
6. 复制生成的授权码（类似：`HZsN535babHHuqXA`）

⚠️ **注意**: 授权码不是你的邮箱登录密码！

---

## 第二步：配置 GitHub Secrets

1. 打开你的仓库：https://github.com/davidlizhiwei/tech-daily
2. 点击 **Settings** 标签
3. 左侧菜单：**Secrets and variables** → **Actions**
4. 点击 **New repository secret**
5. 添加以下 3 个 Secrets:

| Name | Value |
|------|-------|
| `EMAIL_USERNAME` | `davidlizhiwei@163.com` |
| `EMAIL_PASSWORD` | `HZsN535babHHuqXA` (你的授权码) |
| `EMAIL_RECIPIENT` | `david.li.zhiwei@gmail.com` |

---

## 第三步：测试邮件发送

### 本地测试
```bash
cd /Users/davidli/.openclaw/workspace/tech-daily

# 设置环境变量
export EMAIL_USERNAME="davidlizhiwei@163.com"
export EMAIL_PASSWORD="你的授权码"
export EMAIL_RECIPIENT="david.li.zhiwei@gmail.com"

# 运行生成 + 发送
npm run generate
python3 src/send_email.py output/index.html
```

### GitHub Actions 测试
1. 进入仓库 **Actions** 标签
2. 选择 **Daily Tech News** workflow
3. 点击 **Run workflow**
4. 等待运行完成
5. 检查邮箱是否收到日报

---

## 第四步：验证

检查收件箱（包括垃圾邮件箱）：
- 发件人：`Tech Daily <davidlizhiwei@163.com>`
- 主题：`🔥 全球科技日报 - 2026 年 02 月 26 日`
- 内容：HTML 格式的完整日报

---

## 🔧 故障排查

### 问题 1: SMTP 认证失败
```
❌ SMTP 认证失败，请检查邮箱账号和密码/授权码
```
**解决**: 
- 确认使用的是授权码，不是登录密码
- 重新生成授权码
- 检查 163 邮箱 SMTP 服务是否开启

### 问题 2: 连接超时
```
❌ 发送失败：[Errno 60] Operation timed out
```
**解决**:
- GitHub Actions 网络问题，重试 workflow
- 检查防火墙设置

### 问题 3: 邮件进入垃圾箱
**解决**:
- 标记为"非垃圾邮件"
- 将发件人添加到联系人

---

## 📊 发送频率

- **自动发送**: 每天北京时间 7:00
- **手动触发**: GitHub Actions → Run workflow
- **本地发送**: `python3 src/send_email.py output/index.html`

---

## 🎯 自定义收件人

修改 GitHub Secret `EMAIL_RECIPIENT` 即可更改收件人邮箱。

可以添加多个收件人（逗号分隔）：
```
EMAIL_RECIPIENT=david.li.zhiwei@gmail.com,someone@example.com
```

---

## 📝 邮件内容

邮件包含：
- HTML 格式的完整日报（与网站相同）
- 纯文本摘要（备用）
- 主题包含日期

---

有问题？提 Issue 或查看 [DEPLOY.md](DEPLOY.md)。
