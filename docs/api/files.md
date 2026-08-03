# <span class="api-method get">GET</span> 列出文件 (未实现)

此接口尚未实现

<div class="api-endpoint">
  <span class="api-method get">GET</span>
  <code>https://api.zhangyuapi.com/v1/files</code>
</div>

## 鉴权

`Authorization: Bearer YOUR_API_KEY`

使用 Bearer Token 认证。

## 请求示例

```bash
curl -X GET "https://api.zhangyuapi.com/v1/files" \
  -H "Authorization: Bearer YOUR_API_KEY"
```

## 响应体

| 状态码 | 内容类型 |
|---:|---|
| `501` | `application/json` |

### 501 响应示例

```json
{
  "error": {
    "message": "string",
    "type": "string",
    "param": "string",
    "code": "string"
  }
}
```
