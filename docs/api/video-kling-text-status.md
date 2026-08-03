# <span class="api-method get">GET</span> 获取 Kling 文生视频任务状态

查询 Kling 文生视频任务的状态和结果。

<div class="api-endpoint">
  <span class="api-method get">GET</span>
  <code>https://api.zhangyuapi.com/kling/v1/videos/text2video/{task_id}</code>
</div>

## 鉴权

`Authorization: Bearer YOUR_API_KEY`

使用 Bearer Token 认证。

## 路径参数

| 参数 | 类型 | 必填 | 说明 |
|---|---|:---:|---|
| `task_id` | string | 是 | 任务 ID |

## 请求示例

```bash
curl -X GET "https://api.zhangyuapi.com/kling/v1/videos/text2video/string" \
  -H "Authorization: Bearer YOUR_API_KEY"
```

## 响应体

| 状态码 | 内容类型 |
|---:|---|
| `200` | `application/json` |
| `404` | `application/json` |

### 200 响应示例

```json
{
  "task_id": "abcd1234efgh",
  "status": "completed",
  "url": "https://example.com/video.mp4",
  "format": "mp4",
  "metadata": {
    "duration": 5,
    "fps": 30,
    "width": 1280,
    "height": 720,
    "seed": 20231234
  },
  "error": {
    "code": 0,
    "message": "string"
  }
}
```

### 404 响应示例

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
