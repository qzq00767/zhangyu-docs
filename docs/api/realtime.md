# <span class="api-method get">GET</span> 原生OpenAI格式

建立 WebSocket 连接用于实时对话。

**注意**: 这是一个 WebSocket 端点，需要使用 WebSocket 协议连接。

连接 URL 示例: `wss://api.zhangyuapi.com/v1/realtime?model=gpt-4o-realtime`

<div class="api-endpoint">
  <span class="api-method get">GET</span>
  <code>https://api.zhangyuapi.com/v1/realtime</code>
</div>

## 鉴权

`Authorization: Bearer YOUR_API_KEY`

使用 Bearer Token 认证。

## 查询参数

| 参数 | 类型 | 必填 | 说明 |
|---|---|:---:|---|
| `model` | string | 否 | 要使用的模型 |

## 请求示例

```bash
curl -X GET "https://api.zhangyuapi.com/v1/realtime"
```

## 响应体

| 状态码 | 内容类型 |
|---:|---|
| `101` | - |
| `400` | `application/json` |

### 101 响应示例

无响应体。

### 400 响应示例

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
