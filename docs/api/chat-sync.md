# <span class="api-method post">POST</span> Chat（非流式返回）

创建聊天补全（非流式返回），一次性返回完整结果。

## 接口地址

```bash
POST https://{{BASE_URL}}/v1/chat/completions
```

## 请求示例

```bash
curl -X POST "https://{{BASE_URL}}/v1/chat/completions" \
  -H "Authorization: Bearer {{API_KEY}}" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "gpt-4o",
    "messages": [
      {"role": "system", "content": "你是一个有用的助手。"},
      {"role": "user", "content": "解释量子计算的基本原理。"}
    ],
    "temperature": 0.7,
    "max_tokens": 2048
  }'
```

## 响应示例

```json
{
  "id": "chatcmpl-xxx",
  "object": "chat.completion",
  "created": 1700000000,
  "model": "gpt-4o",
  "choices": [
    {
      "index": 0,
      "message": {
        "role": "assistant",
        "content": "量子计算是利用量子力学原理..."
      },
      "finish_reason": "stop"
    }
  ],
  "usage": {
    "prompt_tokens": 28,
    "completion_tokens": 512,
    "total_tokens": 540
  }
}
```

## 响应字段说明

| 字段 | 类型 | 说明 |
|------|------|------|
| `id` | string | 唯一请求 ID |
| `object` | string | 对象类型：`chat.completion` |
| `created` | integer | 创建时间戳 |
| `model` | string | 实际使用的模型 |
| `choices[].message.role` | string | 角色：`assistant` |
| `choices[].message.content` | string | 完整的回复内容 |
| `choices[].finish_reason` | string | 结束原因 |
| `usage.prompt_tokens` | integer | 输入消耗 token 数 |
| `usage.completion_tokens` | integer | 输出消耗 token 数 |
| `usage.total_tokens` | integer | 总消耗 token 数 |

::: tip 提示
参数说明与 [Chat（流式返回）](/api/chat) 一致。非流式请求无需设置 `stream` 参数或设置为 `false`。
:::
