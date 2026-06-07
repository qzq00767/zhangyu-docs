# <span class="api-method post">POST</span> Chat（流式返回）

创建聊天补全（流式返回），支持 Server-Sent Events (SSE)。

## 接口地址

```bash
POST https://{{BASE_URL}}/v1/chat/completions
```

## 请求参数

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|:----:|------|
| `model` | string | ✅ | 模型名称，如 `gpt-4o`、`claude-sonnet-4-6` |
| `messages` | array | ✅ | 消息列表，按对话顺序排列 |
| `stream` | boolean | - | 是否流式返回，流式请求设置为 `true` |
| `temperature` | number | - | 采样温度，范围 0-2 |
| `max_tokens` | integer | - | 最大输出 token 数 |
| `top_p` | number | - | 核采样参数，范围 0-1 |
| `frequency_penalty` | number | - | 频率惩罚，范围 -2.0 到 2.0 |
| `presence_penalty` | number | - | 存在惩罚，范围 -2.0 到 2.0 |
| `stop` | string/array | - | 停止词 |
| `user` | string | - | 终端用户标识 |

### 消息对象 (Message)

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|:----:|------|
| `role` | string | ✅ | 角色：`system`、`user`、`assistant`、`tool` |
| `content` | string/array | ✅ | 消息内容，支持文本或多模态内容 |
| `name` | string | - | 发送者名称 |
| `tool_calls` | array | - | 工具调用（assistant 角色） |
| `tool_call_id` | string | - | 工具调用 ID（tool 角色） |

## 请求示例

```bash
curl -X POST "https://{{BASE_URL}}/v1/chat/completions" \
  -H "Authorization: Bearer {{API_KEY}}" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "gpt-4o",
    "messages": [
      {"role": "system", "content": "你是一个有用的编程助手。"},
      {"role": "user", "content": "用 Python 写一个快速排序算法。"}
    ],
    "stream": true,
    "temperature": 0.7,
    "max_tokens": 4096
  }'
```

## 流式响应格式

每个 SSE 事件包含一个 JSON 块：

```json
data: {
  "id": "chatcmpl-xxx",
  "object": "chat.completion.chunk",
  "created": 1700000000,
  "model": "gpt-4o",
  "choices": [
    {
      "index": 0,
      "delta": {
        "role": "assistant",
        "content": "快速"
      },
      "finish_reason": null
    }
  ],
  "usage": null
}
```

最后一个块包含完整的使用量信息：

```json
data: {
  "id": "chatcmpl-xxx",
  "object": "chat.completion.chunk",
  "created": 1700000000,
  "model": "gpt-4o",
  "choices": [
    {
      "index": 0,
      "delta": {},
      "finish_reason": "stop"
    }
  ],
  "usage": {
    "prompt_tokens": 35,
    "completion_tokens": 256,
    "total_tokens": 291
  }
}
```

## 响应字段说明

| 字段 | 类型 | 说明 |
|------|------|------|
| `id` | string | 唯一请求 ID |
| `object` | string | 对象类型：`chat.completion.chunk` |
| `created` | integer | 创建时间戳（Unix 秒） |
| `model` | string | 实际使用的模型 |
| `choices[].index` | integer | 选择索引 |
| `choices[].delta.role` | string | 角色（仅首个块包含） |
| `choices[].delta.content` | string | 增量内容 |
| `choices[].finish_reason` | string | 结束原因：`stop`、`length`、`tool_calls` 等 |
| `usage` | object | Token 使用量（仅最后一块包含） |

## 流式结束标记

流式传输以 `data: [DONE]` 标记结束。
