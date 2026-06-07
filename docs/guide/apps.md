# AI 应用配置指南

本文介绍如何将常见 AI 工具和应用接入章鱼中枢。

## Claude Code

直接在终端中释放 Claude 的力量，接入章鱼中枢 API。

### 安装

```bash
# Mac / Linux
curl -fsSL https://claude.ai/install.sh | bash

# Windows (npm)
npm install -g @anthropic-ai/claude-code
```

### 配置

编辑 `~/.claude/settings.json`：

```json
{
  "env": {
    "ANTHROPIC_AUTH_TOKEN": "{{API_KEY}}",
    "ANTHROPIC_BASE_URL": "https://{{BASE_URL}}"
  }
}
```

### 指定模型

```bash
claude --model claude-sonnet-4-6
```

---

## OpenAI Codex CLI

Codex CLI 是一款可在终端运行的编程助手。

### 安装

```bash
npm install -g @openai/codex
```

### 配置

`~/.codex/config.toml`：

```toml
model_provider = "zhangyu"
model = "gpt-4o"
model_reasoning_effort = "high"
network_access = "enabled"
disable_response_storage = true

[model_providers.zhangyu]
name = "OpenAI"
base_url = "https://{{BASE_URL}}/v1"
wire_api = "responses"
requires_openai_auth = true
```

`~/.codex/auth.json`：

```json
{
  "OPENAI_API_KEY": "{{API_KEY}}"
}
```

---

## Gemini CLI

Google Gemini 开源 CLI 工具。

### 安装

```bash
npm install -g @google/gemini-cli
```

### 配置

`~/.gemini/.env`：

```bash
GOOGLE_GEMINI_BASE_URL=https://{{BASE_URL}}
GEMINI_API_KEY={{API_KEY}}
GEMINI_MODEL=gemini-2.5-flash
```

`~/.gemini/settings.json`：

```json
{
  "ide": {
    "enabled": true
  },
  "security": {
    "auth": {
      "selectedType": "gemini-api-key"
    }
  }
}
```

---

## Cursor

1. 打开 Cursor → **Settings** → **Models**
2. 取消勾选 OpenAI API Key
3. **OpenAI Base URL** 填入 `https://{{BASE_URL}}/v1`
4. **OpenAI API Key** 填入你的章鱼中枢 API Key
5. 可选：勾选 Anthropic，填入相同 Base URL 和 Key

---

## Cherry Studio

1. 打开 Cherry Studio → **设置** → **模型服务**
2. 添加新提供商，选择 **OpenAI**
3. **API 地址**：`https://{{BASE_URL}}/v1`
4. **API 密钥**：你的章鱼中枢 API Key
5. 在模型列表中勾选需要的模型

### Cherry Studio 生图

在 Cherry Studio 中使用绘图模型：
- 选择 `gpt-image-2` 等绘图模型
- 在对话中直接描述想要的图片

---

## Chatbox

1. 打开 Chatbox → **设置** → **模型**
2. 选择 **OpenAI API**
3. **API 地址**：`https://{{BASE_URL}}/v1`
4. **API 密钥**：你的章鱼中枢 API Key
5. 选择模型（如 `gpt-4o`）

### Chatbox 移动端

移动端配置相同，在设置页面填入 Base URL 和 API Key。

---

## LobeChat

1. 打开 LobeChat → **设置** → **语言模型**
2. 选择 **OpenAI**
3. **API 代理地址**：`https://{{BASE_URL}}/v1`
4. **API Key**：你的章鱼中枢 API Key

---

## NextChat (ChatGPT Next Web)

1. 打开 NextChat → **设置**
2. 勾选 **自定义接口**
3. **接口地址**：`https://{{BASE_URL}}`
4. **API Key**：你的章鱼中枢 API Key

---

## 沉浸式翻译

1. 打开沉浸式翻译 → **设置** → **翻译服务**
2. 选择 **OpenAI**
3. **API 地址**：`https://{{BASE_URL}}/v1/chat/completions`
4. **API Key**：你的章鱼中枢 API Key
5. 模型选择 `gpt-4o-mini`（翻译性价比最高）

---

## Zotero GPT

1. 打开 Zotero → **编辑** → **首选项** → **GPT**
2. **API URL**：`https://{{BASE_URL}}/v1/chat/completions`
3. **API Key**：你的章鱼中枢 API Key
4. **模型**：`gpt-4o`

---

## Dify

1. 打开 Dify → **设置** → **模型供应商**
2. 添加 **OpenAI 兼容** 供应商
3. **API Base URL**：`https://{{BASE_URL}}/v1`
4. **API Key**：你的章鱼中枢 API Key

---

## Aider

```bash
export OPENAI_API_BASE="https://{{BASE_URL}}/v1"
export OPENAI_API_KEY="{{API_KEY}}"
aider --model gpt-4o
```

---

## Cline (VS Code 插件)

1. 打开 VS Code → Cline 扩展设置
2. **API Provider**：选择 OpenAI 兼容
3. **Base URL**：`https://{{BASE_URL}}/v1`
4. **API Key**：你的章鱼中枢 API Key

---

::: tip 通用规则
几乎所有支持 OpenAI API 的应用，只需：
- 将 API 地址替换为 `https://{{BASE_URL}}/v1`
- 将 API Key 替换为你的章鱼中枢 Key
  :::
