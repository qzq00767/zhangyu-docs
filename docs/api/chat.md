# <span class="api-method post">POST</span> ChatCompletions格式

根据对话历史创建模型响应。支持流式和非流式响应。

兼容 OpenAI Chat Completions API。

<div class="api-endpoint">
  <span class="api-method post">POST</span>
  <code>https://api.zhangyuapi.com/v1/chat/completions</code>
</div>

## 鉴权

`Authorization: Bearer YOUR_API_KEY`

使用 Bearer Token 认证。

## 请求体

内容类型：`application/json`

| 参数 | 类型 | 必填 | 说明 |
|---|---|:---:|---|
| `model` | string | 是 | 模型 ID |
| `messages` | array&lt;object&gt; | 是 | 对话消息列表 |
| `temperature` | number | 否 | 采样温度&lt;br&gt;默认值：`1`&lt;br&gt;范围：`0 &lt;= value &lt;= 2` |
| `top_p` | number | 否 | 核采样参数&lt;br&gt;默认值：`1`&lt;br&gt;范围：`0 &lt;= value &lt;= 1` |
| `n` | integer | 否 | 生成数量&lt;br&gt;默认值：`1`&lt;br&gt;范围：`1 &lt;= value` |
| `stream` | boolean | 否 | 是否流式响应&lt;br&gt;默认值：`false` |
| `stream_options` | object | 否 | - |
| `stop` | string\|array&lt;string&gt; | 否 | 停止序列 |
| `max_tokens` | integer | 否 | 最大生成 Token 数 |
| `max_completion_tokens` | integer | 否 | 最大补全 Token 数 |
| `presence_penalty` | number | 否 | 默认值：`0`&lt;br&gt;范围：`-2 &lt;= value &lt;= 2` |
| `frequency_penalty` | number | 否 | 默认值：`0`&lt;br&gt;范围：`-2 &lt;= value &lt;= 2` |
| `logit_bias` | object | 否 | - |
| `user` | string | 否 | - |
| `tools` | array&lt;object&gt; | 否 | - |
| `tool_choice` | string\|object | 否 | - |
| `response_format` | object | 否 | - |
| `seed` | integer | 否 | - |
| `reasoning_effort` | string | 否 | 推理强度 (用于支持推理的模型)&lt;br&gt;可选值：`"low" \| "medium" \| "high"` |
| `modalities` | array&lt;string&gt; | 否 | - |
| `audio` | object | 否 | - |

## 请求示例

```bash
curl -X POST "https://api.zhangyuapi.com/v1/chat/completions" \
  -H "Content-Type: application/json" \
  -d '{
  "model": "gpt-4",
  "messages": [
    {
      "role": "system",
      "content": "string"
    }
  ]
}'
```

## 响应体

| 状态码 | 内容类型 |
|---:|---|
| `200` | `application/json` |
| `400` | `application/json` |
| `429` | `application/json` |

### 200 响应示例

```json
{
  "id": "string",
  "object": "chat.completion",
  "created": 0,
  "model": "string",
  "choices": [
    {
      "index": 0,
      "message": {
        "role": "system",
        "content": "string",
        "name": "string",
        "tool_calls": [
          {
            "id": "string",
            "type": "function",
            "function": {
              "name": "string",
              "arguments": "string"
            }
          }
        ],
        "tool_call_id": "string",
        "reasoning_content": "string"
      },
      "finish_reason": "stop"
    }
  ],
  "usage": {
    "prompt_tokens": 0,
    "completion_tokens": 0,
    "total_tokens": 0,
    "prompt_tokens_details": {
      "cached_tokens": 0,
      "text_tokens": 0,
      "audio_tokens": 0,
      "image_tokens": 0
    },
    "completion_tokens_details": {
      "text_tokens": 0,
      "audio_tokens": 0,
      "reasoning_tokens": 0
    }
  },
  "system_fingerprint": "string"
}
```

### 400 响应示例

```json
{
  "error": {
    "message": "string",
    "type": "string",
    "param": "string",
    "code": "string"
  }
}
```

### 429 响应示例

```json
{
  "error": {
    "message": "string",
    "type": "string",
    "param": "string",
    "code": "string"
  }
}
```
