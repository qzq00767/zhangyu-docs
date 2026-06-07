# <span class="api-method post">POST</span> Chat（修改图片）

编辑/修改已有图片。

## 接口地址

```bash
POST https://zhangyuapi.com/v1/chat/completions
```

## 请求示例

```bash
curl -X POST "https://zhangyuapi.com/v1/chat/completions" \
  -H "Authorization: Bearer {{API_KEY}}" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "dall-e-2",
    "messages": [
      {
        "role": "user",
        "content": [
          {
            "type": "text",
            "text": "在图片中加入一只飞翔的海鸥。"
          },
          {
            "type": "image_url",
            "image_url": {
              "url": "https://example.com/beach.png"
            }
          }
        ]
      }
    ],
    "image_config": {
      "size": "1024x1024",
      "n": 1
    }
  }'
```

::: warning 注意
图片编辑功能要求提供原始图片和编辑指令。不同模型对图片编辑的支持程度不同。
:::
