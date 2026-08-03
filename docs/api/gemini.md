# <span class="api-method post">POST</span> Gemini文本聊天

代理 Gemini API 请求。 路径格式: `/v1beta/models/{model_name}:{action}`

例如:

*   `/v1beta/models/gemini-2.5-pro:generateContent`
*   `/v1beta/models/gemini-2.5-pro:streamGenerateContent?alt=sse`

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
