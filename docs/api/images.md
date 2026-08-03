# <span class="api-method post">POST</span> 生成图像

<div class="api-endpoint">
  <span class="api-method post">POST</span>
  <code>https://api.zhangyuapi.com/v1/images/generations/</code>
</div>

## 鉴权

`Authorization: Bearer YOUR_API_KEY`

使用 Bearer Token 认证。

## 请求体

内容类型：`application/json`

| 参数 | 类型 | 必填 | 说明 |
|---|---|:---:|---|
| `model` | string | 否 | 用于图像生成的模型。`dall-e-2`、`dall-e-3` 或 `gpt-image-1` 之一。默认为 `dall-e-2`，除非使用特定于 `gpt-image-1` 的参数。 |
| `prompt` | string | 是 | 所需图像的文本描述。`gpt-image-1` 的最大长度为 32000 个字符，`dall-e-2` 的最大长度为 1000 个字符，`dall-e-3` 的最大长度为 4000 个字符。 |
| `n` | integer | 否 | 要生成的图像数量。必须介于 1 到 10 之间。对于 `dall-e-3`，仅支持 `n=1`。 |
| `size` | string | 否 | 生成的图像的大小。`对于 gpt-image-1`，必须是 `1024x1024`、`1536x1024`（横向）、`1024x1536`（纵向）或`自动`（默认值）之一，`对于 dall-e-2`，必须是 `256x256、``512x512` 或 `1024x1024` 之一，对于 `dall-e-3`，必须是 `1024x1024`、`1792x1024` 或 `1024x1792` 之一。 |
| `background` | string | 否 | - |
| `moderation` | string | 否 | 控制 `gpt-image-1` 生成的图像的内容审核级别。必须为`低，` 以进行限制较少的筛选或`自动`（默认值）。 |
| `quality` | string | 否 | 将生成的图像的质量。 |
| `stream` | string | 否 | - |
| `style` | string | 否 | - |
| `user` | string | 否 | - |

## 请求示例

```bash
curl -X POST "https://api.zhangyuapi.com/v1/images/generations/" \
  -H "Content-Type: application/json" \
  -d '{
  "prompt": "string"
}'
```
