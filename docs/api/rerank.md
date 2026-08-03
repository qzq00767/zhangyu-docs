# <span class="api-method post">POST</span> 文档重排序

根据查询对文档列表进行相关性重排序

<div class="api-endpoint">
  <span class="api-method post">POST</span>
  <code>https://api.zhangyuapi.com/v1/rerank</code>
</div>

## 鉴权

`Authorization: Bearer YOUR_API_KEY`

使用 Bearer Token 认证。

## 请求体

内容类型：`application/json`

| 参数 | 类型 | 必填 | 说明 |
|---|---|:---:|---|
| `model` | string | 是 | - |
| `query` | string | 是 | 查询文本 |
| `documents` | array&lt;string \| object&gt; | 是 | 要重排序的文档列表 |
| `top_n` | integer | 否 | 返回前 N 个结果 |
| `return_documents` | boolean | 否 | 默认值：`false` |

## 请求示例

```bash
curl -X POST "https://api.zhangyuapi.com/v1/rerank" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "rerank-english-v2.0",
    "query": "string",
    "documents": [
      "string"
    ]
  }'
```

## 响应体

| 状态码 | 内容类型 |
|---:|---|
| `200` | `application/json` |

### 200 响应示例

```json
{
  "id": "string",
  "results": [
    {
      "index": 0,
      "relevance_score": 0,
      "document": {}
    }
  ],
  "meta": {}
}
```
