# AI 应用集成

将章鱼中枢 API 接入各类 AI 工具和应用。

::: tip 通用规则
几乎所有支持 OpenAI API 的应用，只需：
- 将 API 地址替换为 `https://zhangyuapi.com/v1`
- 将 API Key 替换为你的章鱼中枢 Key
:::

## 命令行工具

<div class="feature-grid">

<div class="feature-card">

### [Claude Code](/guide/apps/claude-code)
终端中的 Claude — 搜索百万行代码库，将流程化为命令

</div>

<div class="feature-card">

### [Codex CLI](/guide/apps/codex-cli)
OpenAI 开源终端编程助手，读写本地代码

</div>

<div class="feature-card">

### [Gemini CLI](/guide/apps/gemini-cli)
Google 开源 AI 代理，直接接入终端

</div>

</div>

## IDE 集成

<div class="feature-grid">

<div class="feature-card">

### [Cursor](/guide/apps/cursor)
AI 驱动的代码编辑器，替换 Base URL 即可接入

</div>

<div class="feature-card">

### [Cline / Aider](/guide/apps/cline)
VS Code 插件 + 终端 AI 结对编程

</div>

</div>

## 桌面客户端

<div class="feature-grid">

<div class="feature-card">

### [Cherry Studio](/guide/apps/cherry-studio)
全能 AI 桌面客户端，支持生图和多模型切换

</div>

<div class="feature-card">

### [Chatbox](/guide/apps/chatbox)
简洁易用的 AI 客户端，全平台支持

</div>

</div>

## Web 应用

<div class="feature-grid">

<div class="feature-card">

### [LobeChat](/guide/apps/lobechat)
现代化 AI 对话框架，支持插件和知识库

</div>

<div class="feature-card">

### [NextChat](/guide/apps/nextchat)
轻量 ChatGPT Web 客户端，一键部署

</div>

</div>

## 工作流与插件

<div class="feature-grid">

<div class="feature-card">

### [Dify](/guide/apps/dify)
LLM 应用开发平台，可视化编排 AI 工作流

</div>

<div class="feature-card">

### [沉浸式翻译 / Zotero](/guide/apps/plugins)
浏览器翻译 + 文献管理 AI 辅助插件

</div>

</div>

## 快速查阅

| 工具 | 类型 | 配置关键 |
|------|:----:|------|
| [Claude Code](/guide/apps/claude-code) | CLI | `ANTHROPIC_BASE_URL` |
| [Codex CLI](/guide/apps/codex-cli) | CLI | `base_url` in config.toml |
| [Gemini CLI](/guide/apps/gemini-cli) | CLI | `GEMINI_API_KEY` + `.env` |
| [Cursor](/guide/apps/cursor) | IDE | Settings → Models |
| [Cline / Aider](/guide/apps/cline) | 插件 | API Provider 设置 / 环境变量 |
| [Cherry Studio](/guide/apps/cherry-studio) | 桌面 | 模型服务设置 |
| [Chatbox](/guide/apps/chatbox) | 桌面 | 模型设置页 |
| [LobeChat](/guide/apps/lobechat) | Web | 语言模型设置 |
| [NextChat](/guide/apps/nextchat) | Web | 自定义接口 |
| [Dify](/guide/apps/dify) | 平台 | 模型供应商 |
| [沉浸式翻译 / Zotero](/guide/apps/plugins) | 插件 | 翻译服务 / GPT 首选项 |
