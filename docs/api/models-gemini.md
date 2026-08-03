# <span class="api-method get">GET</span> 原生Gemini格式

以 Gemini API 格式返回可用模型列表

<div class="api-endpoint">
  <span class="api-method get">GET</span>
  <code>https://api.zhangyuapi.com/v1beta/models</code>
</div>

## 鉴权

`Authorization: Bearer YOUR_API_KEY`

使用 Bearer Token 认证。

## 请求示例

```bash
curl -X GET "https://api.zhangyuapi.com/v1beta/models" \
  -H "Authorization: Bearer YOUR_API_KEY"
```

## 响应体

| 状态码 | 内容类型 |
|---:|---|
| `200` | `application/json` |

### 200 响应示例

```json
{
  "models": [
    {
      "name": "models/gemini-pro",
      "version": "string",
      "displayName": "string",
      "description": "string",
      "inputTokenLimit": 0,
      "outputTokenLimit": 0,
      "supportedGenerationMethods": [
        "string"
      ]
    }
  ]
}
```
