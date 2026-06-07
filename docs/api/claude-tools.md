# <span class="api-method post">POST</span> Messages（函数调用）

Claude 的 Tool Use / Function Calling 能力。

## 接口地址

```bash
POST https://zhangyuapi.com/v1/messages
```

## 请求示例

```bash
curl -X POST "https://zhangyuapi.com/v1/messages" \
  -H "x-api-key: {{API_KEY}}" \
  -H "anthropic-version: 2023-06-01" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "claude-sonnet-4-6",
    "max_tokens": 1024,
    "tools": [
      {
        "name": "get_stock_price",
        "description": "获取股票实时价格",
        "input_schema": {
          "type": "object",
          "properties": {
            "symbol": {
              "type": "string",
              "description": "股票代码，如 AAPL"
            }
          },
          "required": ["symbol"]
        }
      }
    ],
    "messages": [
      {
        "role": "user",
        "content": "Apple 的股票现在多少钱？"
      }
    ]
  }'
```

## 工具参数说明

| 参数 | 类型 | 说明 |
|------|------|------|
| `tools[].name` | string | 函数名称 |
| `tools[].description` | string | 功能描述 |
| `tools[].input_schema` | object | JSON Schema 格式的输入参数 |

## 工具调用流程

1. 用户发送带 tools 的请求
2. Claude 判断是否需要调用工具，返回 `stop_reason: "tool_use"`
3. 用户在客户端执行工具，将结果以 `tool_result` 形式回传
4. Claude 基于工具结果生成最终回复
