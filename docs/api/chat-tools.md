# <span class="api-method post">POST</span> Chat（工具调用）

使用 Function Calling / Tool Use 让模型调用外部工具。

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
      {"role": "user", "content": "北京今天天气怎么样？"}
    ],
    "tools": [
      {
        "type": "function",
        "function": {
          "name": "get_weather",
          "description": "获取指定城市的天气信息",
          "parameters": {
            "type": "object",
            "properties": {
              "city": {
                "type": "string",
                "description": "城市名称"
              },
              "unit": {
                "type": "string",
                "enum": ["celsius", "fahrenheit"],
                "description": "温度单位"
              }
            },
            "required": ["city"]
          }
        }
      }
    ],
    "tool_choice": "auto"
  }'
```

## 工具参数说明

| 参数 | 类型 | 说明 |
|------|------|------|
| `tools[].type` | string | 固定为 `function` |
| `tools[].function.name` | string | 函数名称 |
| `tools[].function.description` | string | 函数功能描述 |
| `tools[].function.parameters` | object | JSON Schema 格式的参数字段 |
| `tool_choice` | string/object | `auto`、`none`、`required` 或指定函数 |

## 模型返回工具调用

```json
{
  "choices": [
    {
      "index": 0,
      "message": {
        "role": "assistant",
        "content": null,
        "tool_calls": [
          {
            "id": "call_abc123",
            "type": "function",
            "function": {
              "name": "get_weather",
              "arguments": "{\"city\": \"北京\", \"unit\": \"celsius\"}"
            }
          }
        ]
      },
      "finish_reason": "tool_calls"
    }
  ]
}
```

## 提交工具执行结果

```bash
curl -X POST "https://zhangyuapi.com/v1/chat/completions" \
  -H "Authorization: Bearer {{API_KEY}}" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "gpt-4o",
    "messages": [
      {"role": "user", "content": "北京今天天气怎么样？"},
      {
        "role": "assistant",
        "content": null,
        "tool_calls": [
          {
            "id": "call_abc123",
            "type": "function",
            "function": {
              "name": "get_weather",
              "arguments": "{\"city\": \"北京\"}"
            }
          }
        ]
      },
      {
        "role": "tool",
        "tool_call_id": "call_abc123",
        "content": "{\"city\": \"北京\", \"temperature\": 25, \"condition\": \"晴天\"}"
      }
    ]
  }'
```
