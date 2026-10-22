# <span class="api-method get">GET</span> 获取视频内容

获取已完成视频任务的视频文件内容。

响应体为视频文件二进制内容。请先通过[视频任务查询接口](/api/video-sora-status)确认生成完成。

<div class="api-endpoint">
  <span class="api-method get">GET</span>
  <code>https://api.zhangyuapi.com/v1/videos/{task_id}/content</code>
</div>

## 鉴权

`Authorization: Bearer YOUR_API_KEY`

使用 Bearer Token 认证。

## 路径参数

| 参数 | 类型 | 必填 | 说明 |
|---|---|:---:|---|
| `task_id` | string | 是 | 视频任务 ID |

## 请求示例

```bash
curl -X GET "https://api.zhangyuapi.com/v1/videos/YOUR_TASK_ID/content" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  --output video.mp4
```

## 响应体

| 状态码 | 内容类型 |
|---:|---|
| `200` | `video/mp4` |
| `404` | `application/json` |

### 成功响应

HTTP `200` 返回视频文件内容，可直接写入本地文件。

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
