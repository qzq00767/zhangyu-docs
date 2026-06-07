# <span class="api-method post">POST</span> Chat（分析图片）

发送图片给模型进行分析和理解，支持多模态视觉模型。

## 接口地址

```bash
POST https://{{BASE_URL}}/v1/chat/completions
```

## 图片输入方式

支持两种图片输入方式：

### 方式一：Base64 编码

```bash
curl -X POST "https://{{BASE_URL}}/v1/chat/completions" \
  -H "Authorization: Bearer {{API_KEY}}" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "gpt-4o",
    "messages": [
      {
        "role": "user",
        "content": [
          {
            "type": "text",
            "text": "这张图片里有什么？"
          },
          {
            "type": "image_url",
            "image_url": {
              "url": "data:image/jpeg;base64,/9j/4AAQ..."
            }
          }
        ]
      }
    ],
    "max_tokens": 500
  }'
```

### 方式二：图片 URL

```bash
curl -X POST "https://{{BASE_URL}}/v1/chat/completions" \
  -H "Authorization: Bearer {{API_KEY}}" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "gpt-4o",
    "messages": [
      {
        "role": "user",
        "content": [
          {
            "type": "text",
            "text": "描述这张图片的内容。"
          },
          {
            "type": "image_url",
            "image_url": {
              "url": "https://example.com/image.jpg",
              "detail": "auto"
            }
          }
        ]
      }
    ],
    "max_tokens": 500
  }'
```

## 图片参数

| 参数 | 类型 | 说明 |
|------|------|------|
| `image_url.url` | string | 图片 URL 或 Base64 编码数据 |
| `image_url.detail` | string | 图片分析精度：`auto`（默认）、`low`、`high` |

## 支持的视觉模型

| 模型 | 说明 |
|------|------|
| `gpt-4o` | 支持图片、文字多模态 |
| `gpt-4o-mini` | 轻量视觉模型 |
| `claude-sonnet-4-6` | Claude 视觉模型 |
| `gemini-2.5-flash` | Gemini 视觉模型 |

## 计费说明

图片分析的 token 消耗取决于 `detail` 参数：

- `low`：固定消耗 85 tokens/张
- `high`：按图片尺寸计算，大图消耗更多 tokens
- `auto`：模型自动选择精度
