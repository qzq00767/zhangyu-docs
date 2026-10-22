# <span class="api-method post">POST</span> 内容审核

对输入文本进行内容安全审核。

<div class="api-endpoint">
  <span class="api-method post">POST</span>
  <code>https://api.zhangyuapi.com/v1/moderations</code>
</div>

## 鉴权

`Authorization: Bearer YOUR_API_KEY`

使用 Bearer Token 认证。

## 请求体

内容类型：`application/json`

| 参数 | 类型 | 必填 | 说明 |
|---|---|:---:|---|
| `input` | string\|array&lt;string&gt; | 是 | - |
| `model` | string | 否 | - |

## 请求示例

```bash
curl -X POST "https://api.zhangyuapi.com/v1/moderations" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
  "input": "string"
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
  "model": "string",
  "results": [
    {
      "flagged": true,
      "categories": {},
      "category_scores": {}
    }
  ]
}
```
