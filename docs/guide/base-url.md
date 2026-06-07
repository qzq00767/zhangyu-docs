# 获取 Base URL 和 API Key

## Base URL

Base URL 是章鱼中枢 API 的访问入口地址。登录控制台后，在首页或 API Keys 页面可以看到您的专属 Base URL。

### 替换规则

| 官方地址 | 章鱼中枢地址 |
|---------|------------|
| `https://api.openai.com` | `https://{{BASE_URL}}` |
| `https://api.openai.com/v1` | `https://{{BASE_URL}}/v1` |
| `https://api.openai.com/v1/chat/completions` | `https://{{BASE_URL}}/v1/chat/completions` |

### 在应用中使用

::: tip 提示
大部分支持自定义 API 地址的应用，只需将原来的 OpenAI 地址替换为您的 Base URL 即可。
:::

常见应用配置示例：

| 应用 | 配置位置 | 填写内容 |
|------|---------|---------|
| Cherry Studio | 设置 → 模型服务 | Base URL + API Key |
| Chatbox | 设置 → 模型 | Base URL + API Key |
| LobeChat | 设置 → 语言模型 | Base URL + API Key |
| NextChat | 设置 → 模型 | Base URL + API Key |
| Cursor | 设置 → Models | Base URL + API Key |
| Claude Code | 配置文件 | Base URL + API Key |

## API Key

### 生成 API Key

1. 登录 [章鱼中枢控制台](https://zhangyuapi.com)
2. 进入 **API Keys** 管理页面
3. 点击 **创建 API Key**
4. 设置 Key 名称、使用额度上限、有效期
5. 复制生成的 Key（只显示一次，请妥善保存）

### 使用 API Key

在请求 Header 中通过 `Authorization` 字段传递：

```bash
Authorization: Bearer sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

### 安全建议

::: warning 注意
- API Key 相当于您的账户密码，请勿泄露
- 不要在客户端代码（浏览器、移动 App）中直接暴露 API Key
- 建议通过后端服务中转 API 请求
- 定期轮换 API Key
- 为不同应用创建独立的 API Key
:::

## WebHook 通知

您可以配置 WebHook URL，在以下事件发生时接收通知：

- 余额不足告警
- API Key 即将过期
- 额度即将用尽

详情请参考 [通知设置-WebHook](/guide/webhook)。
