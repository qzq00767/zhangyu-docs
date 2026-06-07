# LobeChat

现代化 AI 对话框架，支持插件市场、知识库和自定义 Agent。

## 配置

1. 打开 LobeChat → **设置** → **语言模型**
2. 选择 **OpenAI** 提供商
3. 填入配置：

| 设置项 | 值 |
|--------|-----|
| **API 代理地址** | `https://zhangyuapi.com/v1` |
| **API Key** | 你的章鱼中枢 API Key |

## 自定义模型

LobeChat 支持添加自定义模型列表：
1. 在语言模型设置中打开 **自定义模型**
2. 添加模型 ID，如 `gpt-4o`、`claude-sonnet-4-6`

## 功能亮点

- 插件市场：联网搜索、图片生成、代码执行
- 知识库：上传文档构建专属知识库
- Agent 角色：预设角色和自定义 Prompt

---

# NextChat

轻量级 ChatGPT Web 客户端，一键部署。

## 配置

1. 打开 NextChat → **设置**
2. 勾选 **自定义接口**
3. 填入：

| 设置项 | 值 |
|--------|-----|
| **接口地址** | `https://zhangyuapi.com` |
| **API Key** | 你的章鱼中枢 API Key |

## Docker 部署

```bash
docker run -d -p 3000:3000 \
  -e BASE_URL=https://zhangyuapi.com \
  -e OPENAI_API_KEY={{API_KEY}} \
  yidadaa/chatgpt-next-web
```

## Vercel 部署

Fork 项目后，在 Vercel 环境变量中设置：
- `BASE_URL` = `https://zhangyuapi.com`
- `OPENAI_API_KEY` = 你的 API Key

::: tip 提示
- LobeChat 功能丰富但配置较复杂，适合进阶用户
- NextChat 极简轻量，适合快速部署和日常使用
:::
