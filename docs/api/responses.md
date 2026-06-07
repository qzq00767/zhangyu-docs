# <span class="api-method post">POST</span> 创建模型响应

使用 Responses API 创建模型响应，是新一代的交互方式。

## 接口地址

```bash
POST https://zhangyuapi.com/v1/responses
```

## Responses API vs Chat API

| 特性 | Responses API | Chat API |
|------|:------------:|:--------:|
| 内置工具（联网搜索、文件搜索） | ✅ | ❌ |
| 多轮对话 | ✅ | ✅ |
| 流式返回 | ✅ | ✅ |
| 结构化输出 | ✅ | ✅ |
| 多模态输入 | ✅ | ✅ |

## 请求示例

```bash
curl -X POST "https://zhangyuapi.com/v1/responses" \
  -H "Authorization: Bearer {{API_KEY}}" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "gpt-4o",
    "input": "解释什么是机器学习。",
    "instructions": "你是一个 AI 教育专家。",
    "temperature": 0.7,
    "max_output_tokens": 1024
  }'
```

## 参数说明

| 参数 | 类型 | 必填 | 说明 |
|------|------|:----:|------|
| `model` | string | ✅ | 模型名称 |
| `input` | string/array | ✅ | 用户输入 |
| `instructions` | string | - | 系统指令 |
| `temperature` | number | - | 采样温度 |
| `max_output_tokens` | integer | - | 最大输出 token |
| `tools` | array | - | 工具列表 |
| `tool_choice` | string | - | 工具选择策略 |

## 响应示例

```json
{
  "id": "resp_xxx",
  "object": "response",
  "model": "gpt-4o",
  "output": [
    {
      "type": "message",
      "role": "assistant",
      "content": [
        {
          "type": "output_text",
          "text": "机器学习是人工智能的一个子领域..."
        }
      ]
    }
  ],
  "usage": {
    "input_tokens": 20,
    "output_tokens": 256,
    "total_tokens": 276
  }
}
```
