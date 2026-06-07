# <span class="api-method post">POST</span> Chat（生成图片）

通过聊天接口生成图片。

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
    "model": "dall-e-3",
    "messages": [
      {
        "role": "user",
        "content": "生成一张日落时的海滩风景图"
      }
    ],
    "image_config": {
      "size": "1024x1024",
      "quality": "standard",
      "style": "vivid"
    }
  }'
```

## 支持的模型

| 模型 | 说明 |
|------|------|
| `dall-e-3` | OpenAI 最新绘图模型 |
| `dall-e-2` | OpenAI 经典绘图模型 |
| `midjourney` | Midjourney 风格模型（如支持） |
| `flux` | Flux 绘图模型（如支持） |

## 图片参数说明

| 参数 | 类型 | 说明 |
|------|------|------|
| `image_config.size` | string | 图片尺寸：`1024x1024`、`1792x1024`、`1024x1792` |
| `image_config.quality` | string | 图片质量：`standard`、`hd` |
| `image_config.style` | string | 图片风格：`vivid`（生动）、`natural`（自然） |
| `image_config.n` | integer | 生成数量，默认 1 |
