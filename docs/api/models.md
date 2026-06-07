# <span class="api-method get">GET</span> 列出模型

列出当前 API Key 可用的所有模型及其信息。

## 接口地址

```bash
GET https://{{BASE_URL}}/v1/models
```

## 请求示例

```bash
curl "https://{{BASE_URL}}/v1/models" \
  -H "Authorization: Bearer {{API_KEY}}"
```

## 响应示例

```json
{
  "object": "list",
  "data": [
    {
      "id": "gpt-4o",
      "object": "model",
      "created": 1700000000,
      "owned_by": "openai"
    },
    {
      "id": "claude-sonnet-4-6",
      "object": "model",
      "created": 1700000000,
      "owned_by": "anthropic"
    },
    {
      "id": "gemini-2.5-flash",
      "object": "model",
      "created": 1700000000,
      "owned_by": "google"
    }
  ]
}
```

## 响应字段

| 字段 | 类型 | 说明 |
|------|------|------|
| `object` | string | 固定为 `list` |
| `data[].id` | string | 模型唯一标识符 |
| `data[].object` | string | 固定为 `model` |
| `data[].created` | integer | 模型创建时间戳 |
| `data[].owned_by` | string | 模型所属组织 |

## 获取单个模型

```bash
GET https://{{BASE_URL}}/v1/models/gpt-4o
```
