# <span class="api-method post">POST</span> OpenAI聊天格式

Gemini 图片生成

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
| `model` | string | 是 | - |
| `stream` | boolean | 是 | - |
| `messages` | array&lt;object&gt; | 是 | - |
| `extra_body` | object | 否 | - |
| `contents` | array&lt;object&gt; | 是 | - |

## 请求示例

```bash
curl -X POST "https://api.zhangyuapi.com/v1/chat/completions" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "string",
    "stream": true,
    "messages": [
      {}
    ],
    "contents": [
      {}
    ]
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
  "model": "string",
  "object": "string",
  "created": 0,
  "choices": [
    {
      "index": 0,
      "message": {
        "role": "string",
        "content": "string"
      },
      "finish_reason": "string"
    }
  ],
  "usage": {
    "prompt_tokens": 0,
    "completion_tokens": 0,
    "total_tokens": 0
  }
}
```
