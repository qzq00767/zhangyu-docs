# NextChat (ChatGPT Next Web)

轻量级 ChatGPT Web 客户端，一键部署，开箱即用。

## 配置

1. 打开 NextChat → 左下角 **设置**
2. 勾选 **自定义接口**
3. 填入：

| 设置项 | 值 |
|--------|-----|
| **接口地址** | `https://{{BASE_URL}}` |
| **API Key** | 你的章鱼中枢 API Key |

## Docker 一键部署

```bash
docker run -d -p 3000:3000 \
  -e BASE_URL=https://{{BASE_URL}} \
  -e OPENAI_API_KEY={{API_KEY}} \
  yidadaa/chatgpt-next-web
```

## Vercel 部署

1. Fork [ChatGPT-Next-Web](https://github.com/ChatGPTNextWeb/ChatGPT-Next-Web)
2. 在 Vercel 导入项目
3. 设置环境变量：
   - `BASE_URL` = `https://{{BASE_URL}}`
   - `OPENAI_API_KEY` = 你的 API Key

## 功能

- 多会话管理
- Markdown 渲染
- 提示词面具（Prompt Mask）
- PWA 支持（可安装为桌面应用）
- 支持流式输出
