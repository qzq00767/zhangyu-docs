# Base URL 与 API Key

## Base URL

章鱼中枢的 API 入口地址为：

```
https://zhangyuapi.com
```

### URL 使用规则（重要）

不同场景需要不同的 URL 格式，务必区分：

| 使用场景 | 正确 URL | 说明 |
|---------|---------|------|
| **OpenAI SDK** | `https://zhangyuapi.com/v1` | 带 `/v1`，SDK 自动拼接端点路径 |
| **Anthropic SDK / Claude Code** | `https://zhangyuapi.com` | **不带** `/v1`，SDK 自动添加 `/v1/messages` |
| **Gemini CLI / SDK** | `https://zhangyuapi.com` | **不带** `/v1`，SDK 自动拼接 |
| **curl / 直接 HTTP 调用** | `https://zhangyuapi.com/v1/chat/completions` | 带完整路径 |
| **Cursor（OpenAI 模式）** | `https://zhangyuapi.com/v1` | 带 `/v1` |
| **Cursor（Anthropic 模式）** | `https://zhangyuapi.com` | **不带** `/v1` |
| **NextChat** | `https://zhangyuapi.com` | **不带** `/v1`，应用自动拼接 |
| **LobeChat** | `https://zhangyuapi.com/v1` | API 代理地址 |
| **Cherry Studio** | `https://zhangyuapi.com/v1` | API 地址 |
| **沉浸式翻译** | `https://zhangyuapi.com/v1/chat/completions` | 需要完整端点 URL |

::: danger 常见错误
```
❌ 错误：Anthropic SDK 使用 https://zhangyuapi.com/v1
   → 会导致请求变成 https://zhangyuapi.com/v1/v1/messages（404）

✅ 正确：Anthropic SDK 使用 https://zhangyuapi.com
   → SDK 自动拼接为 https://zhangyuapi.com/v1/messages
```
:::

### 为什么有的要 /v1 有的不要？

| 工具/SDK | 行为 | 规则 |
|---------|------|------|
| **OpenAI Python/Node SDK** | `base_url` + `/chat/completions` | 你填的 URL 后直接拼接端点 → 需要 `/v1` |
| **Anthropic SDK** | `base_url` + `/v1/messages` | SDK 内部自动加 `/v1/` → 不要重复加 |
| **Gemini CLI** | `base_url` + `/v1beta/models/...` | CLI 自动加路径 → 不要加 `/v1` |
| **NextChat** | `base_url` + `/v1/chat/completions` | 应用自动加 `/v1/` → 不要重复加 |
| **curl** | 你写什么就是什么 | 需要写完整路径 |

**简单记忆**：OpenAI 官方 SDK 填带 `/v1` 的；其他 SDK/工具看文档说明，不确定时先用不带 `/v1` 的试。

### 特殊路线

高用量用户（日刷百刀以上）可联系客服获取专属加速路线。

---

## API Key

### 获取方式

1. 登录 [章鱼中枢控制台](https://zhangyuapi.com/dashboard)
2. 进入 **API 密钥** 页面
3. 点击 **新建**，设置名称、分组、额度限制
4. 复制生成的 Key（格式：`sk-xxxxxxxxxxxxxxxx`）

### 使用方式

在所有 API 请求的 Header 中携带：

```bash
Authorization: Bearer sk-你的API密钥
```

### 安全建议

::: warning 注意
- API Key 相当于账户密码，请勿泄露
- 不要在客户端代码（浏览器、移动 App）中直接暴露
- 建议通过后端服务中转 API 请求
- 为不同应用创建独立的 API Key
- 定期轮换 API Key
:::

---

## 快速测试

配置完成后，用以下命令测试连通性：

```bash
curl https://zhangyuapi.com/v1/models \
  -H "Authorization: Bearer sk-你的API密钥"
```

成功会返回可用模型列表。
