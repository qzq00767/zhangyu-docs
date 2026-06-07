# <span class="api-method post">POST</span> Chat（指定 GPTs）

通过 API 调用指定的 GPTs 应用。

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
      {"role": "user", "content": "帮我分析这份数据。"}
    ],
    "gpt_id": "g-xxxxxxxxxxxx"
  }'
```

## 参数说明

| 参数 | 类型 | 必填 | 说明 |
|------|------|:----:|------|
| `model` | string | ✅ | 模型名称 |
| `messages` | array | ✅ | 对话消息 |
| `gpt_id` | string | ✅ | GPTs 应用的唯一标识 |
