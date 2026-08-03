# <span class="api-method post">POST</span> 音频翻译

将音频翻译为英文文本

<div class="api-endpoint">
  <span class="api-method post">POST</span>
  <code>https://api.zhangyuapi.com/v1/audio/translations</code>
</div>

## 鉴权

`Authorization: Bearer YOUR_API_KEY`

使用 Bearer Token 认证。

## 请求体

内容类型：`multipart/form-data`

| 参数 | 类型 | 必填 | 说明 |
|---|---|:---:|---|
| `file` | file | 是 | - |
| `model` | string | 是 | - |
| `prompt` | string | 否 | - |
| `response_format` | string | 否 | - |
| `temperature` | number | 否 | - |

## 请求示例

```bash
curl -X POST "https://api.zhangyuapi.com/v1/audio/translations" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -F file="string" \
  -F model="string"
```
