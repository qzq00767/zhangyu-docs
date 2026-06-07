# <span class="api-method post">POST</span> Messages（思考）

使用 Claude 的 Extended Thinking 能力进行深度推理。

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
    "max_tokens": 4096,
    "thinking": {
      "type": "enabled",
      "budget_tokens": 2000
    },
    "messages": [
      {
        "role": "user",
        "content": "求解这个数学问题：找出以下方程的所有实数解..."
      }
    ]
  }'
```

## Thinking 参数

| 参数 | 类型 | 必填 | 说明 |
|------|------|:----:|------|
| `thinking.type` | string | ✅ | `enabled` 启用思考 |
| `thinking.budget_tokens` | integer | ✅ | 思考预算 token 数（≥1024，且 ≤ max_tokens） |

::: warning 注意
- `budget_tokens` 计入 `max_tokens` 限制
- 思考过程会消耗 token 并计费
- 思考对复杂推理、数学、编程等任务有显著提升
:::
