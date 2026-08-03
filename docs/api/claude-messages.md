# <span class="api-method post">POST</span> 原生Claude格式

Anthropic Claude Messages API 格式的请求。 需要在请求头中包含 `anthropic-version`。

<div class="api-endpoint">
  <span class="api-method post">POST</span>
  <code>https://api.zhangyuapi.com/v1/messages</code>
</div>

## 鉴权

`Authorization: Bearer YOUR_API_KEY`

使用 Bearer Token 认证。

## 请求头参数

| 参数 | 类型 | 必填 | 说明 |
|---|---|:---:|---|
| `anthropic-version` | string | 是 | Anthropic API 版本 |
| `x-api-key` | string | 否 | Anthropic API Key (可选，也可使用 Bearer Token) |

## 请求体

内容类型：`application/json`

| 参数 | 类型 | 必填 | 说明 |
|---|---|:---:|---|
| `model` | string | 是 | - |
| `messages` | - | 是 | - |
| `system` | string\| | 否 | - |
| `max_tokens` | integer | 是 | - |
| `temperature` | number | 否 | - |
| `top_p` | number | 否 | - |
| `top_k` | integer | 否 | - |
| `stream` | boolean | 否 | - |
| `stop_sequences` | array&lt;string&gt; | 否 | - |
| `tools` | - | 否 | - |
| `tool_choice` | - | 否 | - |
| `thinking` | - | 否 | - |
| `metadata` | - | 否 | - |

## 请求示例

```bash
curl -X POST "https://api.zhangyuapi.com/v1/messages" \
  -H "anthropic-version: 2023-06-01" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "claude-3-opus-20240229",
    "messages": [
      {
        "role": "user",
        "content": "string"
      }
    ],
    "max_tokens": 1
  }'
```
