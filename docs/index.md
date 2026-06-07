---
layout: home

hero:
  name: "章鱼中枢"
  text: "AI 服务平台 API 文档"
  tagline: 统一 API 网关，服务于海量 AI 模型
  actions:
    - theme: brand
      text: 快速上手
      link: /guide/quickstart
    - theme: alt
      text: API 接口
      link: /api/chat
  image:
    light: https://cloudflarecnimg.scdn.io/i/6a23d1fc3bbe4_1780732412.png
    dark: https://cloudflarecnimg.scdn.io/i/6a24360b0d4c7_1780758027.png
    alt: 章鱼中枢

features:
  - icon: 🚀
    title: 极速响应
    details: 优化的网络架构，确保毫秒级响应时间，连接速度远超官方
  - icon: 🌍
    title: 全球覆盖
    details: 覆盖全球七大地区，无需科学上网，全球直连
  - icon: 🔒
    title: 安全可靠
    details: 企业级安全性，完善的权限管理和速率限制
  - icon: 🎯
    title: 完全兼容
    details: 完全对齐 OpenAI 官方接口协议，替换 Base URL 即可使用
  - icon: 💰
    title: 高性价比
    details: 价格低于官方，新用户注册送体验额度
  - icon: 🛠️
    title: 开发者友好
    details: 0 开发基础可直接对接，支持各种常见 AI 应用
---

## 产品简介

章鱼中枢是基于优秀基础模型的高性价比 GenAI 服务平台。作为集合顶尖大模型的一站式云服务平台，我们致力于为开发者提供更快、更便宜、更全面、体验更丝滑的模型 API。

### 已支持模型

已上架多种大语言模型、图片生成模型、代码生成模型、向量与重排序模型以及多模态大模型，包括：

- **OpenAI** — GPT 系列、o 系列推理模型
- **Claude** — Anthropic 全系列模型
- **Gemini** — Google 全系列模型
- **DeepSeek** — 高性价比推理模型
- **Qwen** — 通义千问系列
- **Llama** — Meta 开源系列
- 以及更多…

## 快速上手

### 1. 登录平台

访问 [章鱼中枢控制台](https://zhangyuapi.com) 注册并登录。

### 2. 获取 API Key 和 Base URL

在管理后台的 **API Keys** 页面生成您的 API Key。

### 3. 调用 API

我们完全对齐 OpenAI 官方接口格式，使用方法完全一致。只需将 `api.openai.com` 替换为平台提供的 Base URL 即可：

```bash
# 官方地址
https://api.openai.com/v1/chat/completions

# 章鱼中枢地址
https://zhangyuapi.com/v1/chat/completions
```

### 鉴权方式

在请求 Header 的 `Authorization` 参数中，填入 Bearer Token：

```bash
curl -X POST "https://zhangyuapi.com/v1/chat/completions" \
  -H "Authorization: Bearer sk-你的API密钥" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "gpt-4o",
    "messages": [{"role": "user", "content": "Hello!"}]
  }'
```

::: tip 提示
部分应用或网站的 `API_Base` 为 `https://api.openai.com` 或 `https://api.openai.com/v1`，此时应替换为 `https://zhangyuapi.com` 或 `https://zhangyuapi.com/v1`。

**注意分清**：OpenAI SDK 类工具填 `https://zhangyuapi.com/v1`（带 /v1），Anthropic/Gemini 类填 `https://zhangyuapi.com`（不带 /v1）。详见 [Base URL 规则](/guide/base-url)。
:::

## 功能对比

| 功能 | 章鱼中枢 | 官方 API |
|------|:------:|:------:|
| 支持各类型模型 | ✅ | ❌ 需账号有对应权限 |
| 最高调用速度 | ✅ | ❌ 需绑卡付费 48 小时后 |
| 多账号高并发 | ✅ 数百个账号 | ❌ 单账号 API 有限制 |
| OpenAI 账号要求 | ✅ 无需注册 | ❌ 需科学上网和绑定国外手机 |
| 额度有效期 | ✅ 永不过期 | ❌ 三个月到期 |
| 风控问题 | ✅ 0 封号 | ❌ 随时无故封号 |
| 使用记录查看 | ✅ 实时查看 | ❌ 只能看到延迟总消耗 |
| 代理访问要求 | ✅ 无需代理 | ❌ 需在支持的地区使用 |
| 计费规则 | 折扣价 | 原价 |
| 接口地址 | zhangyuapi.com | api.openai.com |
