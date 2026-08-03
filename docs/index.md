---
layout: home

hero:
  name: "章鱼公益平台"
  text: "API 开发文档"
  tagline: 使用统一入口接入多种模型协议，并在控制台管理密钥、用量与费用
  actions:
    - theme: brand
      text: 5 分钟接入
      link: /guide/quickstart
    - theme: alt
      text: 查看 API
      link: /api/
    - theme: alt
      text: 打开控制台
      link: https://zhangyuapi.com/dashboard
  image:
    light: /logo-hero.png
    dark: /logo-hero.png
    alt: 章鱼公益平台

features:
  - icon: 🔌
    title: 多协议接入
    details: 提供 OpenAI、Anthropic、Gemini 等兼容接口，按客户端选择正确的 Base URL
  - icon: 🔑
    title: 密钥管理
    details: 为不同应用创建独立 API Key，并可设置额度、分组和有效期
  - icon: 📊
    title: 用量可查
    details: 在控制台查看请求日志、Token 用量、费用与错误详情
  - icon: 🧭
    title: 模型动态更新
    details: 通过模型广场或 Models API 获取当前账号实际可用的模型 ID
  - icon: 🛡️
    title: 生产接入指南
    details: 包含密钥保护、超时、重试、并发控制和日志脱敏建议
  - icon: 🧩
    title: 常用工具配置
    details: 提供 SDK、命令行工具、IDE 和桌面客户端的配置说明
---

::: danger 服务范围
本平台不向中国大陆地区用户提供服务。使用前请确认您符合服务资格，并阅读 [用户协议](/legal/user-agreement) 与 [隐私政策](/legal/privacy-policy)。
:::

## 从这里开始

1. 前往 [API 密钥](https://zhangyuapi.com/keys) 创建并保存 Key。
2. 在 [模型广场](https://zhangyuapi.com/pricing) 查找模型，复制准确的模型 ID。
3. 使用推荐 API 地址发送首个请求，并在 [使用日志](https://zhangyuapi.com/usage-logs/common) 中确认结果。

需要完整步骤时，请直接阅读 [快速上手](/guide/quickstart)。

## 地址速查

| 用途 | 地址 |
|------|------|
| 网站与控制台 | `https://zhangyuapi.com` |
| OpenAI 兼容 Base URL | `https://api.zhangyuapi.com/v1` |
| Anthropic / Gemini 协议根地址 | `https://api.zhangyuapi.com` |
| 模型广场 | `https://zhangyuapi.com/pricing` |
| API 密钥 | `https://zhangyuapi.com/keys` |

::: tip 以控制台为准
如果控制台“API 信息”区域展示了专属线路或不同地址，请优先使用控制台提供的地址。网站地址和 API 地址用途不同，不要混用。
:::

## 第一个请求

先把 `YOUR_API_KEY` 和 `YOUR_MODEL_ID` 替换成控制台中的真实值：

```bash
curl "https://api.zhangyuapi.com/v1/chat/completions" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "YOUR_MODEL_ID",
    "messages": [
      {"role": "user", "content": "请用一句话介绍你自己。"}
    ]
  }'
```

收到 `choices` 数组表示请求成功。若返回错误，请先检查 API Key、模型 ID、账户余额和 Base URL，再查看 [帮助中心](/help)。

## 协议选择

| 接入方式 | 推荐文档 | 常用端点 |
|---------|---------|---------|
| OpenAI Chat Completions | [Chat API](/api/chat) | `/v1/chat/completions` |
| OpenAI Responses | [Responses API](/api/responses) | `/v1/responses` |
| Anthropic Messages | [Claude Messages](/api/claude-messages) | `/v1/messages` |
| Gemini 原生格式 | [Gemini API](/api/gemini) | `/v1beta/models/*` |
| 图片、音频、向量 | 查看左侧对应分类 | 按具体页面说明 |

不同模型支持的参数和能力可能不同。上线前请使用目标模型完成非流式、流式、工具调用及多模态等实际场景测试。
