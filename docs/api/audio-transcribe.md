# <span class="api-method post">POST</span> 音频转录

<div class="api-endpoint">
  <span class="api-method post">POST</span>
  <code>https://api.zhangyuapi.com/v1/audio/transcriptions</code>
</div>

## 鉴权

`Authorization: Bearer YOUR_API_KEY`

使用 Bearer Token 认证。

## 请求体

内容类型：`multipart/form-data`

| 参数 | 类型 | 必填 | 说明 |
|---|---|:---:|---|
| `file` | file | 是 | 音频文件&lt;br&gt;格式：`binary` |
| `model` | string | 是 | - |
| `language` | string | 否 | ISO-639-1 语言代码 |
| `prompt` | string | 否 | - |
| `response_format` | string | 否 | 默认值：`"json"`&lt;br&gt;可选值：`"json" \| "text" \| "srt" \| "verbose_json" \| "vtt"` |
| `temperature` | number | 否 | - |
| `timestamp_granularities` | array&lt;string&gt; | 否 | - |

## 请求示例

```bash
curl -X POST "https://api.zhangyuapi.com/v1/audio/transcriptions" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -F file="string" \
  -F model="whisper-1"
```
