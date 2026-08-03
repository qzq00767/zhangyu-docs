# <span class="api-method post">POST</span> 原生Gemini格式

Gemini 音频生成接口。 可使用gemini-2.5-flash-preview-tts等模型

<div class="api-endpoint">
  <span class="api-method post">POST</span>
  <code>https://api.zhangyuapi.com/v1beta/models/{model}:generateContent</code>
</div>

## 鉴权

`Authorization: Bearer YOUR_API_KEY`

使用 Bearer Token 认证。

## 路径参数

| 参数 | 类型 | 必填 | 说明 |
|---|---|:---:|---|
| `model` | string | 是 | 模型名称 |

## 请求体

内容类型：`application/json`

| 参数 | 类型 | 必填 | 说明 |
|---|---|:---:|---|
| `contents` | - | 是 | - |
| `generationConfig` | - | 是 | - |

## 请求示例

```bash
curl -X POST "https://api.zhangyuapi.com/v1beta/models/string:generateContent" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "contents": [
      {}
    ],
    "generationConfig": {
      "responseModalities": [
        "string"
      ],
      "speechConfig": {
        "voiceConfig": {
          "prebuiltVoiceConfig": {
            "voiceName": "string"
          }
        }
      }
    }
  }'
```
