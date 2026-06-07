# <span class="api-method post">POST</span> Messages（官方 Anthropic 格式）

使用 Anthropic 官方 Messages API 格式与 Claude 模型交互。

## 接口地址

```bash
POST https://{{BASE_URL}}/v1/messages
```

## 请求示例

```bash
curl -X POST "https://{{BASE_URL}}/v1/messages" \
  -H "x-api-key: {{API_KEY}}" \
  -H "anthropic-version: 2023-06-01" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "claude-sonnet-4-6",
    "max_tokens": 1024,
    "system": "你是一个有用的助手。",
    "messages": [
      {
        "role": "user",
        "content": "解释量子计算的基本原理。"
      }
    ]
  }'
```

## 参数说明

| 参数 | 类型 | 必填 | 说明 |
|------|------|:----:|------|
| `model` | string | ✅ | 模型名称 |
| `messages` | array | ✅ | 消息列表 |
| `max_tokens` | integer | ✅ | 最大输出 token 数 |
| `system` | string/array | - | 系统提示词 |
| `temperature` | number | - | 采样温度，0-1 |
| `top_p` | number | - | 核采样参数 |
| `top_k` | integer | - | Top-K 采样参数 |
| `stop_sequences` | array | - | 停止序列 |
| `stream` | boolean | - | 是否流式返回 |

## 响应示例

```json
{
  "id": "msg_xxx",
  "type": "message",
  "role": "assistant",
  "model": "claude-sonnet-4-6",
  "content": [
    {
      "type": "text",
      "text": "量子计算是利用量子力学原理来进行计算的技术..."
    }
  ],
  "stop_reason": "end_turn",
  "usage": {
    "input_tokens": 25,
    "output_tokens": 200
  }
}
```

## 鉴权说明

Claude Messages API 使用两种鉴权方式均可：

| 方式 | Header |
|------|--------|
| API Key | `x-api-key: {{API_KEY}}` |
| Bearer Token | `Authorization: Bearer {{API_KEY}}` |
