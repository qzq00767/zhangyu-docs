# Dify

开源 LLM 应用开发平台，可视化编排 AI 工作流。

## 安装

Dify 支持 Docker 部署和云服务。详见 [Dify 官方文档](https://docs.dify.ai/)。

## 配置模型供应商

1. 打开 Dify → **设置** → **模型供应商**
2. 添加 **OpenAI 兼容** 供应商
3. 填入：

| 设置项 | 值 |
|--------|-----|
| **API Base URL** | `https://{{BASE_URL}}/v1` |
| **API Key** | 你的章鱼中枢 API Key |

## 添加模型

在模型供应商页面添加需要的模型：

**对话模型**：
- `gpt-4o` — 复杂推理
- `gpt-4o-mini` — 轻量任务
- `claude-sonnet-4-6` — 代码生成

**嵌入模型**：
- `text-embedding-3-small` — 知识库向量化

## 使用场景

- **聊天助手**：拖拽搭建 AI 客服、问答机器人
- **知识库**：上传文档构建 RAG 应用
- **工作流**：可视化编排多步骤 AI 流水线
- **Agent**：为 LLM 配备工具（搜索、代码执行等）

## 环境变量配置

如果自部署 Dify，可在 `.env` 中预设：

```bash
OPENAI_API_BASE=https://{{BASE_URL}}/v1
OPENAI_API_KEY={{API_KEY}}
```

---

# N8N

开源工作流自动化平台。

## 配置

在 N8N 中添加 OpenAI 节点时，填入自定义 Base URL 和 API Key 即可使用章鱼中枢模型。

---

# Coze（扣子）

字节跳动 AI Bot 开发平台。

## 配置

在 Coze 工作流中使用 **HTTP 请求** 节点，调用章鱼中枢 API：

```bash
POST https://{{BASE_URL}}/v1/chat/completions
Authorization: Bearer {{API_KEY}}
```
