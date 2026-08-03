# <span class="api-method get">GET</span> 原生OpenAI格式

获取当前可用的模型列表。

根据请求头自动识别返回格式：

*   包含 `x-api-key` 和 `anthropic-version` 头时返回 Anthropic 格式
*   包含 `x-goog-api-key` 头或 `key` 查询参数时返回 Gemini 格式
*   其他情况返回 OpenAI 格式

<div class="api-endpoint">
  <span class="api-method get">GET</span>
  <code>https://api.zhangyuapi.com/v1/models</code>
</div>

## 鉴权

`Authorization: Bearer YOUR_API_KEY`

使用 Bearer Token 认证。

## 查询参数

| 参数 | 类型 | 必填 | 说明 |
|---|---|:---:|---|
| `key` | string | 否 | Google API Key (用于 Gemini 格式) |

## 请求头参数

| 参数 | 类型 | 必填 | 说明 |
|---|---|:---:|---|
| `x-api-key` | string | 否 | Anthropic API Key (用于 Claude 格式) |
| `anthropic-version` | string | 否 | Anthropic API 版本 |
| `x-goog-api-key` | string | 否 | Google API Key (用于 Gemini 格式) |

## 请求示例

```bash
curl -X GET "https://api.zhangyuapi.com/v1/models" \
  -H "Authorization: Bearer YOUR_API_KEY"
```

## 响应体

| 状态码 | 内容类型 |
|---:|---|
| `200` | `application/json` |
| `401` | `application/json` |

### 200 响应示例

```json
{
  "object": "list",
  "data": [
    {
      "id": "gpt-4",
      "object": "model",
      "created": 0,
      "owned_by": "openai"
    }
  ]
}
```

### 401 响应示例

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
