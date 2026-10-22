# <span class="api-method post">POST</span> 创建文本嵌入

将文本转换为向量嵌入，可用于语义检索和相似度计算。

<div class="api-endpoint">
  <span class="api-method post">POST</span>
  <code>https://api.zhangyuapi.com/v1/embeddings</code>
</div>

## 鉴权

`Authorization: Bearer YOUR_API_KEY`

使用 Bearer Token 认证。

## 请求体

内容类型：`application/json`

| 参数 | 类型 | 必填 | 说明 |
|---|---|:---:|---|
| `model` | string | 是 | - |
| `input` | string\|array&lt;string&gt; | 是 | 要嵌入的文本 |
| `encoding_format` | string | 否 | 默认值：`"float"`&lt;br&gt;可选值：`"float" \| "base64"` |
| `dimensions` | integer | 否 | 输出向量维度 |

## 请求示例

```bash
curl -X POST "https://api.zhangyuapi.com/v1/embeddings" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "YOUR_EMBEDDING_MODEL",
    "input": "用于语义检索的示例文本"
  }'
```

## 响应体

| 状态码 | 内容类型 |
|---:|---|
| `200` | `application/json` |

### 200 响应示例

```json
{
  "object": "list",
  "data": [
    {
      "object": "embedding",
      "index": 0,
      "embedding": [
        0
      ]
    }
  ],
  "model": "string",
  "usage": {
    "prompt_tokens": 0,
    "total_tokens": 0
  }
}
```
