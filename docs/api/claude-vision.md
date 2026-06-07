# <span class="api-method post">POST</span> Messages（识图）

使用 Claude 的视觉能力分析图片。

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
    "max_tokens": 500,
    "messages": [
      {
        "role": "user",
        "content": [
          {
            "type": "text",
            "text": "这张图片里有什么？请详细描述。"
          },
          {
            "type": "image",
            "source": {
              "type": "base64",
              "media_type": "image/jpeg",
              "data": "/9j/4AAQ..."
            }
          }
        ]
      }
    ]
  }'
```

## 支持的图片格式

| 格式 | media_type |
|------|-----------|
| JPEG | `image/jpeg` |
| PNG | `image/png` |
| GIF | `image/gif` |
| WebP | `image/webp` |

## 图片限制

| 限制项 | 值 |
|--------|-----|
| 最大图片大小 | 20 MB |
| 每请求最多图片数 | 100 张 |

::: tip 提示
Claude 视觉能力内置于 Claude 3.5 Sonnet、Claude Opus 4.x、Claude Sonnet 4.x 等模型，无需额外配置。
:::
