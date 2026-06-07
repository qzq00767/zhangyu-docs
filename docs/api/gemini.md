# Gemini 官方格式

使用 Google Gemini 官方 API 格式进行请求。

## 接口地址

```bash
POST https://{{BASE_URL}}/v1beta/models/{model}:generateContent
```

## 请求示例

```bash
curl -X POST "https://{{BASE_URL}}/v1beta/models/gemini-2.5-flash:generateContent" \
  -H "x-goog-api-key: {{API_KEY}}" \
  -H "Content-Type: application/json" \
  -d '{
    "contents": [
      {
        "parts": [
          {
            "text": "解释人工智能的发展历史。"
          }
        ]
      }
    ],
    "generationConfig": {
      "temperature": 0.7,
      "maxOutputTokens": 1024
    }
  }'
```

## 参数说明

| 参数 | 类型 | 必填 | 说明 |
|------|------|:----:|------|
| `contents` | array | ✅ | 对话内容 |
| `contents[].parts[].text` | string | ✅ | 文本内容 |
| `generationConfig.temperature` | number | - | 采样温度 |
| `generationConfig.maxOutputTokens` | integer | - | 最大输出 token |
| `generationConfig.topP` | number | - | 核采样参数 |
| `generationConfig.topK` | integer | - | Top-K 采样 |

## 流式返回

添加 `alt=sse` 查询参数启用流式返回：

```bash
POST https://{{BASE_URL}}/v1beta/models/gemini-2.5-flash:streamGenerateContent?alt=sse
```

## 鉴权

支持两种鉴权方式：

- `x-goog-api-key: {{API_KEY}}`
- `Authorization: Bearer {{API_KEY}}`
