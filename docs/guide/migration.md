# 从 OpenAI 迁移

如果现有项目允许自定义 `base_url`，通常只需替换地址、API Key 和模型 ID。协议兼容不代表所有模型都支持完全相同的参数，上线前仍需完成实际调用验证。

::: danger 服务范围
本平台不向中国大陆地区用户提供服务。迁移前请确认账号和使用场景符合 [用户协议](/legal/user-agreement)。
:::

## 迁移前准备

1. 在 [API 密钥](https://zhangyuapi.com/keys) 页面创建独立的迁移测试 Key。
2. 在 [模型广场](https://zhangyuapi.com/pricing) 或 `/v1/models` 中确认目标模型 ID。
3. 记录现有项目使用的流式输出、工具调用、结构化输出、图片输入等能力。
4. 在测试环境完成迁移，不要直接替换生产配置。

## 三步迁移

### 第一步：配置环境变量

```bash
ZHANGYU_API_KEY=YOUR_API_KEY
ZHANGYU_BASE_URL=https://api.zhangyuapi.com/v1
ZHANGYU_MODEL_ID=YOUR_MODEL_ID
```

不要把真实 Key 写进源码或提交到 Git。

### 第二步：替换 Base URL

::: code-group

```python [Python]
import os
from openai import OpenAI

client = OpenAI(
    api_key=os.environ["ZHANGYU_API_KEY"],
    base_url=os.getenv("ZHANGYU_BASE_URL", "https://api.zhangyuapi.com/v1"),
)

response = client.chat.completions.create(
    model=os.environ["ZHANGYU_MODEL_ID"],
    messages=[{"role": "user", "content": "返回 OK"}],
)
print(response.choices[0].message.content)
```

```javascript [Node.js]
import OpenAI from 'openai';

const client = new OpenAI({
  apiKey: process.env.ZHANGYU_API_KEY,
  baseURL: process.env.ZHANGYU_BASE_URL ?? 'https://api.zhangyuapi.com/v1'
});

const response = await client.chat.completions.create({
  model: process.env.ZHANGYU_MODEL_ID,
  messages: [{ role: 'user', content: '返回 OK' }]
});
console.log(response.choices[0].message.content);
```

:::

### 第三步：按场景验证

至少验证以下内容：

- 非流式请求能否正常返回；
- 流式请求能否正确解析并收到 `[DONE]`；
- 模型 ID、参数名和响应字段是否符合现有代码预期；
- 工具调用、结构化输出或多模态输入是否受目标模型支持；
- 超时、重试、错误处理和费用记录是否符合预期。

## 其他协议

### Anthropic SDK

Anthropic SDK 会自行拼接 `/v1/messages`，Base URL 不要带 `/v1`：

```bash
ANTHROPIC_AUTH_TOKEN=YOUR_API_KEY
ANTHROPIC_BASE_URL=https://api.zhangyuapi.com
```

### Gemini CLI / SDK

Gemini 客户端通常会自行拼接 `/v1beta/models/...`：

```bash
GEMINI_API_KEY=YOUR_API_KEY
GOOGLE_GEMINI_BASE_URL=https://api.zhangyuapi.com
GEMINI_MODEL=YOUR_GEMINI_MODEL_ID
```

### 通用 HTTP 请求

```bash
curl "https://api.zhangyuapi.com/v1/chat/completions" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "YOUR_MODEL_ID",
    "messages": [{"role": "user", "content": "返回 OK"}]
  }'
```

## 兼容性边界

| 能力 | 说明 |
|------|------|
| Chat Completions | 常用文本、流式和工具调用字段通常可直接迁移 |
| Responses API | 仅在目标模型和渠道支持时可用 |
| 图片、音频、视频 | 参数、尺寸和返回格式可能因模型而不同 |
| Anthropic / Gemini 原生协议 | 需要使用对应协议根地址和鉴权方式 |
| 文件、Batch、GPTs 等扩展接口 | 不应默认可用，请以当前文档和实测结果为准 |

如果出现 `404`，优先检查 URL 是否重复或缺少 `/v1`；如果出现 `400`，检查目标模型是否支持当前参数。

## URL 替换速查

| 原地址 | 迁移地址 |
|--------|----------|
| `https://api.openai.com/v1` | `https://api.zhangyuapi.com/v1` |
| `https://api.anthropic.com` | `https://api.zhangyuapi.com` |
| `https://generativelanguage.googleapis.com` | `https://api.zhangyuapi.com` |

完成验证后，再逐步放量并通过 [使用日志](https://zhangyuapi.com/usage-logs/common) 观察错误率、延迟和费用。
