# 从 OpenAI 迁移

只需 3 步，5 分钟即可从 OpenAI 官方 API 切换到章鱼中枢。

## 为什么迁移？

| 对比 | 章鱼中枢 | OpenAI 官方 |
|------|:------:|:------:|
| 价格 | 折扣价 | 原价 |
| 网络 | 国内直连 | 需科学上网 |
| 封号风险 | 0 封号 | 随时无故封号 |
| 额度有效期 | 永不过期 | 按充值周期 |
| 多模型支持 | 一站式多厂商 | 仅 OpenAI |

## 三步迁移

### 第 1 步：获取 API Key

注册 [章鱼中枢](https://zhangyuapi.com)，在控制台创建 API Key。

### 第 2 步：修改 Base URL

只需要修改一个配置项 — 将 `api.openai.com` 替换为章鱼中枢的 Base URL。

### 第 3 步：验证

运行现有代码，接口响应格式完全兼容，无需任何业务逻辑改动。

## 各语言迁移示例

### Python (openai SDK)

```python
# 原 OpenAI 配置
# client = OpenAI(api_key="sk-xxx")

# 迁移到章鱼中枢 — 仅需加一行 base_url
from openai import OpenAI

client = OpenAI(
    base_url="https://zhangyuapi.com/v1",  # ← 新增
    api_key="{{API_KEY}}"
)

# 其余代码完全不变
response = client.chat.completions.create(
    model="gpt-4o",
    messages=[{"role": "user", "content": "Hello!"}]
)
```

### Node.js (openai SDK)

```javascript
// 原 OpenAI 配置
// const client = new OpenAI({ apiKey: 'sk-xxx' });

// 迁移到章鱼中枢 — 仅需加一行 baseURL
import OpenAI from 'openai';

const client = new OpenAI({
  baseURL: 'https://zhangyuapi.com/v1',  // ← 新增
  apiKey: '{{API_KEY}}'
});

// 其余代码完全不变
const response = await client.chat.completions.create({
  model: 'gpt-4o',
  messages: [{ role: 'user', content: 'Hello!' }]
});
```

### Claude Code

```json
// ~/.claude/settings.json
{
  "env": {
    "ANTHROPIC_AUTH_TOKEN": "{{API_KEY}}",
    "ANTHROPIC_BASE_URL": "https://zhangyuapi.com"
  }
}
```

### Codex CLI

```toml
// ~/.codex/config.toml
[model_providers.zhangyu]
name = "OpenAI"
base_url = "https://zhangyuapi.com/v1"
wire_api = "responses"
requires_openai_auth = true
```

```json
// ~/.codex/auth.json
{
  "OPENAI_API_KEY": "{{API_KEY}}"
}
```

### Gemini CLI

```bash
// ~/.gemini/.env
GOOGLE_GEMINI_BASE_URL=https://zhangyuapi.com
GEMINI_API_KEY={{API_KEY}}
GEMINI_MODEL=gemini-2.5-flash
```

### Cursor

在 Cursor 设置中：
1. 打开 Settings → Models
2. 取消勾选 OpenAI API Key
3. 在 "OpenAI Base URL" 填入 `https://zhangyuapi.com/v1`
4. 在 "OpenAI API Key" 填入你的 API Key

### 通用 curl

```bash
# 原 OpenAI
curl https://api.openai.com/v1/chat/completions \
  -H "Authorization: Bearer sk-xxx" \
  -d '{ "model": "gpt-4o", "messages": [...] }'

# 章鱼中枢 — 仅改 URL
curl https://zhangyuapi.com/v1/chat/completions \
  -H "Authorization: Bearer {{API_KEY}}" \
  -d '{ "model": "gpt-4o", "messages": [...] }'
```

## 兼容性说明

章鱼中枢完全兼容以下接口协议，迁移后所有功能照常使用：

| 协议 | 端点 | 兼容状态 |
|------|------|:------:|
| OpenAI Chat | `/v1/chat/completions` | ✅ 完全兼容 |
| OpenAI Embeddings | `/v1/embeddings` | ✅ 完全兼容 |
| OpenAI Models | `/v1/models` | ✅ 完全兼容 |
| OpenAI Images | `/v1/images/*` | ✅ 完全兼容 |
| OpenAI Audio | `/v1/audio/*` | ✅ 完全兼容 |
| Claude Messages | `/v1/messages` | ✅ 完全兼容 |
| Gemini | `/v1beta/models/*` | ✅ 完全兼容 |

## URL 替换规则速查

| 官方地址 | 替换为 |
|---------|-------|
| `https://api.openai.com` | `https://zhangyuapi.com` |
| `https://api.openai.com/v1` | `https://zhangyuapi.com/v1` |
| `https://api.anthropic.com` | `https://zhangyuapi.com` |
| `https://generativelanguage.googleapis.com` | `https://zhangyuapi.com` |
