# <span class="api-method post">POST</span> 编辑图像

百炼qwen-image系列图片编辑

<div class="api-endpoint">
  <span class="api-method post">POST</span>
  <code>https://api.zhangyuapi.com/v1/images/edits</code>
</div>

## 鉴权

`Authorization: Bearer YOUR_API_KEY`

使用 Bearer Token 认证。

## 请求体

内容类型：`application/json`

| 参数 | 类型 | 必填 | 说明 |
|---|---|:---:|---|
| `model` | string | 是 | - |
| `input` | object | 是 | - |
| `parameters` | object | 否 | - |

## 请求示例

```bash
curl -X POST "https://api.zhangyuapi.com/v1/images/edits" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "string",
    "input": {
      "messages": [
        {}
      ]
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
  "created": 0,
  "data": [
    {
      "url": "string",
      "b64_json": "string",
      "revised_prompt": "string"
    }
  ]
}
```
