# <span class="api-method get">GET</span> 获取视频内容

获取已完成视频任务的视频文件内容。

此接口会代理返回视频文件流。

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
curl -X GET "https://api.zhangyuapi.com/v1/videos/string/content" \
  -H "Authorization: Bearer YOUR_API_KEY"
```

## 响应体

| 状态码 | 内容类型 |
|---:|---|
| `200` | `video/mp4` |
| `404` | `application/json` |

### 200 响应示例

```text
"string"
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
