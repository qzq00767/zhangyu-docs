# <span class="api-method post">POST</span> 创建微调任务 (未实现)

此接口尚未实现

<div class="api-endpoint">
  <span class="api-method post">POST</span>
  <code>https://api.zhangyuapi.com/v1/fine-tunes</code>
</div>

## 鉴权

`Authorization: Bearer YOUR_API_KEY`

使用 Bearer Token 认证。

## 请求体

内容类型：`application/json`

## 请求示例

```bash
curl -X POST "https://api.zhangyuapi.com/v1/fine-tunes" \
  -H "Content-Type: application/json" \
  -d '{}'
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
