# API 地址与密钥

## 先区分网站地址和 API 地址

| 用途 | 地址 |
|------|------|
| 网站、登录与控制台 | `https://zhangyuapi.com` |
| OpenAI 兼容 Base URL | `https://api.zhangyuapi.com/v1` |
| Anthropic / Gemini 协议根地址 | `https://api.zhangyuapi.com` |

::: warning 不要混用
`zhangyuapi.com` 主要用于网页和控制台，`api.zhangyuapi.com` 用于程序调用。本文示例使用控制台当前推荐的 API 地址；如果您的控制台展示了专属线路，请以控制台为准。
:::

## Base URL 怎么填

客户端对 Base URL 的拼接方式不同。先判断它会自动补哪一段路径：

| 使用场景 | 填写内容 | 最终请求示例 |
|---------|---------|-------------|
| OpenAI Python / Node.js SDK | `https://api.zhangyuapi.com/v1` | `/v1/chat/completions` |
| Anthropic SDK / Claude Code | `https://api.zhangyuapi.com` | `/v1/messages` |
| Gemini CLI / Gemini SDK | `https://api.zhangyuapi.com` | `/v1beta/models/...` |
| curl / 直接 HTTP 请求 | 填完整端点 | `https://api.zhangyuapi.com/v1/chat/completions` |
| OpenAI 兼容应用 | 通常填 `https://api.zhangyuapi.com/v1` | 由应用补 `/chat/completions` |

### 简单判断方法

- 客户端自动补 `/chat/completions`：填写带 `/v1` 的地址。
- 客户端自动补 `/v1/messages` 或 `/v1beta/models`：填写不带 `/v1` 的根地址。
- 配置项要求“完整接口地址”：填写包含端点路径的完整 URL。

::: danger 常见的重复路径错误
Anthropic SDK 如果填写 `https://api.zhangyuapi.com/v1`，可能拼成 `/v1/v1/messages` 并返回 `404`。Anthropic 和 Gemini 客户端通常填写 `https://api.zhangyuapi.com`。
:::

## 常用配置速查

| 工具 | 推荐地址 |
|------|---------|
| OpenAI SDK | `https://api.zhangyuapi.com/v1` |
| Cursor、Cline、Cherry Studio 的 OpenAI 模式 | `https://api.zhangyuapi.com/v1` |
| Claude Code | `https://api.zhangyuapi.com` |
| Gemini CLI | `https://api.zhangyuapi.com` |
| 沉浸式翻译等要求完整端点的工具 | `https://api.zhangyuapi.com/v1/chat/completions` |

第三方应用可能在升级后改变配置字段或路径拼接方式。如果出现 `404`，请查看实际请求 URL 是否重复或缺少 `/v1`。

## 获取 API Key

1. 登录 [控制台](https://zhangyuapi.com/dashboard)。
2. 打开 [API 密钥](https://zhangyuapi.com/keys)。
3. 点击“新建”，按用途设置名称、分组、额度和有效期。
4. 复制并妥善保存生成的 Key。

请求时通过 `Authorization` Header 传入：

```http
Authorization: Bearer YOUR_API_KEY
```

### 安全要求

- 不要把 Key 写入浏览器端、移动 App 或公开仓库；
- 为不同应用、环境和团队成员创建独立 Key；
- 使用服务端环境变量或密钥管理服务保存 Key；
- 设置合理额度，并定期检查使用日志；
- 发现泄露时立即禁用旧 Key，不要只修改代码。

## 连通性测试

Models API 的请求体最简单，适合验证地址和鉴权：

```bash
curl "https://api.zhangyuapi.com/v1/models" \
  -H "Authorization: Bearer YOUR_API_KEY"
```

常见结果：

| 状态码 | 含义 |
|:------:|------|
| `200` | 地址和 Key 可用 |
| `401` | Key 缺失、无效或已禁用 |
| `402` | 余额或额度不足 |
| `404` | Base URL 或端点路径错误 |
| `429` | 达到当前速率或并发限制 |
