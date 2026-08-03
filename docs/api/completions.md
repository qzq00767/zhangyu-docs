# <span class="api-method post">POST</span> 原生OpenAI格式

基于给定提示创建文本补全

<div class="api-endpoint">
  <span class="api-method post">POST</span>
  <code>https://api.zhangyuapi.com/v1/completions</code>
</div>

## 鉴权

`Authorization: Bearer YOUR_API_KEY`

使用 Bearer Token 认证。

## 请求体

内容类型：`application/json`

| 参数 | 类型 | 必填 | 说明 |
|---|---|:---:|---|
| `model` | string | 是 | - |
| `prompt` | string\|array&lt;string&gt; | 是 | - |
| `max_tokens` | integer | 否 | - |
| `temperature` | number | 否 | - |
| `top_p` | number | 否 | - |
| `n` | integer | 否 | - |
| `stream` | boolean | 否 | - |
| `stop` | string\|array&lt;string&gt; | 否 | - |
| `suffix` | string | 否 | - |
| `echo` | boolean | 否 | - |

## 请求示例

```bash
curl -X POST "https://api.zhangyuapi.com/v1/completions" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "string",
    "prompt": "string"
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
  "object": "text_completion",
  "created": 0,
  "model": "string",
  "choices": [
    {
      "text": "string",
      "index": 0,
      "finish_reason": "string"
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
