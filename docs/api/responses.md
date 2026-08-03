# <span class="api-method post">POST</span> Responses格式

OpenAI Responses API，用于创建模型响应。 支持多轮对话、工具调用、推理等功能。

<div class="api-endpoint">
  <span class="api-method post">POST</span>
  <code>https://api.zhangyuapi.com/v1/responses</code>
</div>

## 鉴权

`Authorization: Bearer YOUR_API_KEY`

使用 Bearer Token 认证。

## 请求体

内容类型：`application/json`

| 参数 | 类型 | 必填 | 说明 |
|---|---|:---:|---|
| `model` | string | 是 | - |
| `input` | string\|array&lt;object&gt; | 否 | 输入内容，可以是字符串或消息数组 |
| `instructions` | string | 否 | - |
| `max_output_tokens` | integer | 否 | - |
| `temperature` | number | 否 | - |
| `top_p` | number | 否 | - |
| `stream` | boolean | 否 | - |
| `tools` | array&lt;object&gt; | 否 | - |
| `tool_choice` | string\|object | 否 | - |
| `reasoning` | object | 否 | - |
| `previous_response_id` | string | 否 | - |
| `truncation` | string | 否 | 可选值：`"auto" \| "disabled"` |

## 请求示例

```bash
curl -X POST "https://api.zhangyuapi.com/v1/responses" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "string"
  }'
```

## 响应体

| 状态码 | 内容类型 |
|---:|---|
| `200` | `application/json` |

### 200 响应示例

```json
{
  "id": "string",
  "object": "response",
  "created_at": 0,
  "status": "completed",
  "model": "string",
  "output": [
    {
      "type": "string",
      "id": "string",
      "status": "string",
      "role": "string",
      "content": [
        {
          "type": "string",
          "text": "string"
        }
      ]
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
  }
}
```
