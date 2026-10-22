# <span class="api-method get">GET</span> 实时语音（Realtime）

建立 WebSocket 连接用于实时对话。

此端点使用 WebSocket 协议，请使用支持该协议和鉴权请求头的客户端建立连接。

连接地址：`wss://api.zhangyuapi.com/v1/realtime?model=YOUR_REALTIME_MODEL`。请将占位符替换为当前 API Key 可用的实时语音模型 ID。

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

## 建立连接

使用上述 `wss://` 地址发起 WebSocket 握手，并携带 `Authorization: Bearer YOUR_API_KEY`。握手成功返回 HTTP `101`，随后通过 WebSocket 连接发送和接收实时事件。

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
