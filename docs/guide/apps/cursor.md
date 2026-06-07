# Cursor

AI 驱动的代码编辑器，通过章鱼中枢 API 获得增强能力。

## 配置

1. 打开 Cursor → **Settings** → **Models**
2. 取消勾选 **OpenAI API Key** 默认选项
3. 填入以下信息：

| 设置项 | 值 |
|--------|-----|
| **OpenAI Base URL** | `https://zhangyuapi.com/v1` |
| **OpenAI API Key** | 你的章鱼中枢 API Key |
| **Anthropic Base URL** | `https://zhangyuapi.com` |
| **Anthropic API Key** | 同上（你的章鱼中枢 API Key） |

## 启用模型

在 Model 列表中找到并启用需要的模型：

- `gpt-4o`、`gpt-4o-mini`
- `claude-sonnet-4-6`、`claude-opus-4-8`
- `gemini-2.5-flash`
- `deepseek-v3`、`deepseek-r1`

## 使用

配置完成后，可以使用 Cursor 的全部 AI 功能：
- **Tab** 代码补全
- **Ctrl+K** 编辑选区
- **Ctrl+L** 对话面板
- **Ctrl+I** Composer 全项目编辑

## 模型推荐

| 场景 | 推荐模型 |
|------|---------|
| 日常编码 | `gpt-4o` |
| 复杂重构 | `claude-sonnet-4-6` |
| 快速修复 | `gpt-4o-mini` |
| 深度推理 | `claude-opus-4-8` |

::: tip 提示
Cursor 需要付费订阅才能使用 AI 功能。API Key 的消耗会独立计入章鱼中枢账户。
:::
