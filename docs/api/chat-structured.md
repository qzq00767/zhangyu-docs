# <span class="api-method post">POST</span> Chat（结构化输出）

让模型返回符合 JSON Schema 定义的结构化数据。

## 接口地址

```bash
POST https://zhangyuapi.com/v1/chat/completions
```

## 请求示例

```bash
curl -X POST "https://zhangyuapi.com/v1/chat/completions" \
  -H "Authorization: Bearer {{API_KEY}}" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "gpt-4o",
    "messages": [
      {
        "role": "user",
        "content": "请介绍三款热门智能手机。"
      }
    ],
    "response_format": {
      "type": "json_schema",
      "json_schema": {
        "name": "phone_review",
        "strict": true,
        "schema": {
          "type": "object",
          "properties": {
            "phones": {
              "type": "array",
              "items": {
                "type": "object",
                "properties": {
                  "name": { "type": "string" },
                  "brand": { "type": "string" },
                  "price": { "type": "number" },
                  "features": {
                    "type": "array",
                    "items": { "type": "string" }
                  }
                },
                "required": ["name", "brand", "price", "features"]
              }
            }
          },
          "required": ["phones"]
        }
      }
    }
  }'
```

## 响应示例

```json
{
  "id": "chatcmpl-xxx",
  "object": "chat.completion",
  "choices": [
    {
      "index": 0,
      "message": {
        "role": "assistant",
        "content": "{\n  \"phones\": [\n    {\n      \"name\": \"iPhone 16 Pro\",\n      \"brand\": \"Apple\",\n      \"price\": 8999,\n      \"features\": [\"A18 Pro 芯片\", \"钛金属边框\", \"48MP 相机\"]\n    },\n    ...\n  ]\n}"
      },
      "finish_reason": "stop"
    }
  ],
  "usage": { ... }
}
```

## 参数说明

| 参数 | 类型 | 说明 |
|------|------|------|
| `response_format.type` | string | 固定为 `json_schema` |
| `response_format.json_schema.name` | string | Schema 名称 |
| `response_format.json_schema.strict` | boolean | 是否启用严格模式 |
| `response_format.json_schema.schema` | object | JSON Schema 定义 |

::: tip 提示
结构化输出确保模型返回严格符合 Schema 的 JSON，适合需要程序化处理回复的场景。
:::
