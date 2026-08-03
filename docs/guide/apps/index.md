# AI 应用集成

本节说明如何把章鱼公益平台接入常见 SDK、命令行工具、IDE 和桌面客户端。

::: warning 先确认三个配置项
- OpenAI 兼容 Base URL：`https://api.zhangyuapi.com/v1`
- Anthropic / Gemini 协议根地址：`https://api.zhangyuapi.com`
- 模型 ID：从 [模型广场](https://zhangyuapi.com/pricing) 或 `/v1/models` 获取
:::

第三方应用的字段名称和路径拼接方式可能随版本变化。如果出现 `404`，请检查应用是否重复添加了 `/v1`。如果应用无法自定义 Base URL，则不能直接接入。

## 命令行工具

| 工具 | 接入方式 | 文档 |
|------|---------|------|
| Claude Code | Anthropic 兼容协议 | [配置 Claude Code](/guide/apps/claude-code) |
| Codex CLI | Responses API 自定义 Provider | [配置 Codex CLI](/guide/apps/codex-cli) |
| Gemini CLI | Gemini 原生兼容协议 | [配置 Gemini CLI](/guide/apps/gemini-cli) |

## IDE 与编程助手

| 工具 | 接入方式 | 文档 |
|------|---------|------|
| Cursor | 自定义 OpenAI Base URL，支持情况取决于版本 | [配置 Cursor](/guide/apps/cursor) |
| Cline | OpenAI Compatible Provider | [配置 Cline / Aider](/guide/apps/cline) |

## 桌面与 Web 客户端

| 工具 | 接入方式 | 文档 |
|------|---------|------|
| Cherry Studio | 自定义 OpenAI 服务商 | [配置 Cherry Studio](/guide/apps/cherry-studio) |
| Chatbox | 自定义 OpenAI API | [配置 Chatbox](/guide/apps/chatbox) |
| LobeChat | 自定义模型服务 | [配置 LobeChat](/guide/apps/lobechat) |
| NextChat | 自定义接口或部署环境变量 | [配置 NextChat](/guide/apps/nextchat) |

## 工作流与插件

| 工具 | 接入方式 | 文档 |
|------|---------|------|
| ComfyUI | 章鱼公益平台自定义节点 | [配置 ComfyUI 插件](/guide/apps/comfyui) |
| Dify / n8n | OpenAI Compatible 或 HTTP 节点 | [配置工作流工具](/guide/apps/dify) |
| 翻译与文献插件 | 自定义完整端点 | [配置浏览器和 Zotero 插件](/guide/apps/plugins) |

## 客户端 Key 安全

桌面应用和浏览器插件通常会把 API Key 保存在本机。请为每个客户端创建单独 Key，设置较低额度和有效期，并定期检查使用日志。不要把管理员或高额度 Key 配置到浏览器扩展中。
