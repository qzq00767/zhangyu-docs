# 沉浸式翻译

浏览器翻译插件，支持自定义 AI 翻译服务。

## 安装

在 Chrome/Edge/Firefox 扩展商店搜索 **沉浸式翻译** 安装。

## 配置

1. 打开沉浸式翻译 → **设置** → **翻译服务**
2. 选择 **OpenAI** 作为翻译引擎
3. 填入配置：

| 设置项 | 值 |
|--------|-----|
| **API 地址** | `https://zhangyuapi.com/v1/chat/completions` |
| **API Key** | 你的章鱼中枢 API Key |
| **模型** | `gpt-4o-mini`（推荐，翻译性价比高） |

## 翻译效果

```json
// 自定义翻译 Prompt（可选）
{
  "system": "你是一个专业的翻译引擎。请将以下内容翻译为中文，保持专业术语的准确性。"
}
```

## 推荐模型

| 场景 | 模型 | 说明 |
|------|------|------|
| 网页翻译 | `gpt-4o-mini` | 快速、便宜 |
| 论文翻译 | `gpt-4o` | 质量更高 |
| 双语对照 | `gpt-4o-mini` | 日常够用 |

---

# Zotero GPT

文献管理工具 Zotero 的 AI 辅助插件。

## 安装

1. 在 Zotero 中安装 [Zotero GPT](https://github.com/MuiseDestiny/zotero-gpt) 插件
2. 重启 Zotero

## 配置

1. Zotero → **编辑** → **首选项** → **GPT**
2. 填入：

| 设置项 | 值 |
|--------|-----|
| **API URL** | `https://zhangyuapi.com/v1/chat/completions` |
| **API Key** | 你的章鱼中枢 API Key |
| **模型** | `gpt-4o` |

## 功能

- 论文摘要生成
- 文献翻译
- 关键词提取
- 文献问答

---

# ChatGPT Sidebar

浏览器侧边栏 AI 助手插件。

## 配置

1. 安装插件后打开设置
2. API Provider 选择自定义
3. 填入 Base URL 和 API Key

::: tip 提示
浏览器插件的 API Key 安全性较低，建议创建独立的限制额度 Key。
:::
