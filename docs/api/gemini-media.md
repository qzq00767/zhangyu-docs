# <span class="api-method post">POST</span> Gemini媒体识别

Gemini图像、PDF、音频、视频识别请求

⚠️注意：仅支持通过 inlineData 以 base64 方式上传图像、PDF、音频、视频，不支持 fileData.fileUri 或 File API。

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
| `contents` | - | 否 | - |
| `generationConfig` | - | 否 | - |
| `safetySettings` | - | 否 | - |
| `tools` | - | 否 | - |
| `systemInstruction` | - | 否 | - |

## 请求示例

```bash
curl -X POST "https://api.zhangyuapi.com/v1beta/models/string:generateContent" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{}'
```
