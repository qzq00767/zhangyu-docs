# <span class="api-method post">POST</span> 文本转语音

将文本转换为音频

<div class="api-endpoint">
  <span class="api-method post">POST</span>
  <code>https://api.zhangyuapi.com/v1/audio/speech</code>
</div>

## 鉴权

`Authorization: Bearer YOUR_API_KEY`

使用 Bearer Token 认证。

## 请求体

内容类型：`application/json`

| 参数 | 类型 | 必填 | 说明 |
|---|---|:---:|---|
| `model` | string | 是 | - |
| `input` | string | 是 | 要转换的文本&lt;br&gt;长度：`length &lt;= 4096` |
| `voice` | string | 是 | 可选值：`"alloy" \| "echo" \| "fable" \| "onyx" \| "nova" \| "shimmer"` |
| `response_format` | string | 否 | 默认值：`"mp3"`&lt;br&gt;可选值：`"mp3" \| "opus" \| "aac" \| "flac" \| "wav" \| "pcm"` |
| `speed` | number | 否 | 默认值：`1`&lt;br&gt;范围：`0.25 &lt;= value &lt;= 4` |

## 请求示例

```bash
curl -X POST "https://api.zhangyuapi.com/v1/audio/speech" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "tts-1",
    "input": "string",
    "voice": "alloy"
  }'
```

## 响应体

| 状态码 | 内容类型 |
|---:|---|
| `200` | `audio/mpeg` |

### 200 响应示例

```text
"string"
```
