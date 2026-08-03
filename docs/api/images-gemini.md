# <span class="api-method post">POST</span> Gemini原生格式

Gemini 图片生成

<div class="api-endpoint">
  <span class="api-method post">POST</span>
  <code>https://api.zhangyuapi.com/v1beta/models/{model}:generateContent/</code>
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
| `contents` | array&lt;object&gt; | 是 | - |
| `generationConfig` | object | 是 | - |

## 请求示例

```bash
curl -X POST "https://api.zhangyuapi.com/v1beta/models/string:generateContent/" \
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
      "imageConfig": {
        "aspectRatio": "string",
        "imageSize": "string"
      }
    }
  }'
```

## 响应体

| 状态码 | 内容类型 |
|---:|---|
| `200` | `application/json` |

### 200 响应示例

```json
{
  "candidates": [
    {
      "content": {
        "role": "string",
        "parts": [
          {}
        ]
      },
      "finishReason": "string",
      "safetyRatings": [
        {}
      ]
    }
  ],
  "usageMetadata": {
    "promptTokenCount": 0,
    "candidatesTokenCount": 0,
    "totalTokenCount": 0
  }
}
```
