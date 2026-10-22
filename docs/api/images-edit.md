# <span class="api-method post">POST</span> 编辑图像

<div class="api-endpoint">
  <span class="api-method post">POST</span>
  <code>https://api.zhangyuapi.com/v1/images/edits/</code>
</div>

## 鉴权

`Authorization: Bearer YOUR_API_KEY`

使用 Bearer Token 认证。

## 请求体

内容类型：`multipart/form-data`

| 参数 | 类型 | 必填 | 说明 |
|---|---|:---:|---|
| `image` | file | 是 | - |
| `mask` | file | 否 | - |
| `prompt` | string | 是 | 所需图像的文本描述。最大长度为 1000 个字符。 |
| `n` | string | 否 | 要生成的图像数。必须介于 1 和 10 之间。 |
| `size` | string | 否 | 生成图像的大小。必须是`256x256`、`512x512`或 `1024x1024`之一。 |
| `response_format` | string | 否 | 生成的图像返回的格式。必须是`url`或`b64_json`。 |
| `user` | string | 否 | 最终用户的唯一标识符，用于区分调用来源。 |
| `model` | string | 否 | - |

## 请求示例

```bash
curl -X POST "https://api.zhangyuapi.com/v1/images/edits/" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -F "image=@/path/to/image.png" \
  -F "prompt=将背景替换为海边风景"
```
