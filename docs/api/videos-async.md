# 异步生成视频与本地保存

提交任务后立即返回本地任务 ID，服务在后台调用 New API 的视频生成接口、查询进度并保存视频。只有本地保存成功后，任务才返回自己的视频链接。

这是新增的独立接口。原有 `/v1/video/generations`、`/v1/videos`、Kling、即梦等接口保持原样；调用原接口不会自动启用本页的本地保存功能。当前包装接口支持 New API 的两种标准视频协议，不直接包装 Kling、即梦的专有路径。

## 入口与鉴权

两个入口共用任务库，提交和查询可以使用不同入口：

```text
https://api.zhangyuapi.com
https://zhangyuapi.com
```

提交、查询和重试保存均使用原来的 New API Key：

```http
Authorization: Bearer YOUR_NEW_API_KEY
```

查询和重试保存需要使用提交任务时的同一枚 Key。成功后的 `/video-media/` 链接无需鉴权，持有链接的人可以访问，请按临时分享链接保管。

## 提交任务

```http
POST /async-videos/v1/tasks
Content-Type: application/json
Authorization: Bearer YOUR_NEW_API_KEY
Idempotency-Key: video-order-20261022-001
```

| 字段 | 要求 |
|---|---|
| `api_format` | 可选，默认 `generations`；另一取值为 `videos` |
| `model` | 必填，使用你的渠道实际支持的视频模型名称，1～256 字符 |
| `prompt` | 必填，1～32000 字符，模型可能有更低限制 |
| `n` | 可选，只支持 `1`，每个任务保存一个视频 |
| 其他字段 | 按模型和所选协议的要求传入，例如 `duration`、`seconds`、`size`、`metadata` |

`api_format: "generations"` 将其余字段以 JSON 提交到 New API 的 `/v1/video/generations`。`api_format: "videos"` 则将其余字段转换为 multipart 文本字段，提交到 `/v1/videos`；对象和数组编码为 JSON 文本。当前包装接口不接收二进制参考图上传，也不会把图片 URL 自动转换为上传文件。需要文件上传的原生调用请继续使用原接口。

请求体最大 1 MiB；不支持 `stream: true`。可选参数是否有效取决于实际模型、渠道及 New API 的适配，不同协议的参数不能直接混用。

```bash
curl https://api.zhangyuapi.com/async-videos/v1/tasks \
  -H "Authorization: Bearer YOUR_NEW_API_KEY" \
  -H "Content-Type: application/json" \
  -H "Idempotency-Key: video-order-20261022-001" \
  -d '{"api_format":"generations","model":"YOUR_VIDEO_MODEL","prompt":"海浪缓慢拍打沙滩，镜头平稳移动","n":1}'
```

返回 HTTP `202`，表示任务已持久化接收，尚未保证上游接收或生成成功：

```json
{
  "id": "vid_0123456789abcdef0123456789abcdef",
  "status": "queued",
  "progress": 0,
  "created_at": 1792641600,
  "expires_at": null,
  "status_url": "/async-videos/v1/tasks/vid_0123456789abcdef0123456789abcdef"
}
```

`created_at` 和成功后的 `expires_at` 是 Unix 秒时间戳。任务 ID 是本地 ID，不应拿它调用原生视频查询接口。保存 `id` 和 `status_url`，按响应的 `Retry-After` 查询，默认每 5 秒一次。

幂等键必须为 8～128 个字母、数字、`_`、`.`、`:` 或 `-`。同一 Key、同一幂等键和相同参数返回原任务；参数变化返回 `409`。提交超时请使用同一个幂等键和相同参数重试。更换幂等键代表新的生成请求，可能再次计费。

## 查询任务

```bash
curl https://api.zhangyuapi.com/async-videos/v1/tasks/vid_0123456789abcdef0123456789abcdef \
  -H "Authorization: Bearer YOUR_NEW_API_KEY"
```

HTTP `200` 只表示取得任务状态，必须继续检查 JSON 中的 `status`：

| 状态 | 含义与处理 |
|---|---|
| `queued` | 等待后台提交 |
| `submitting` | 正在向上游提交，请继续查询 |
| `generating` | 上游排队或生成中，请继续查询 |
| `saving` | 生成完成，正在下载到本地，请继续查询 |
| `succeeded` | 本地保存完成，可读取 `data[0].url` |
| `save_failed` | 保存失败，可仅重试保存 |
| `failed` | 上游明确拒绝、生成失败或超过等待期限，请检查错误码 |
| `indeterminate` | 提交结果不确定；不要自动重新生成，先核实上游记录 |
| `expired` | 已过期，不能再读取本地结果 |

`progress` 依赖上游提供的信息，不保证持续变化；保存完成前最多为 99，成功后为 100。只有 `succeeded` 返回结果：

```json
{
  "id": "vid_0123456789abcdef0123456789abcdef",
  "status": "succeeded",
  "progress": 100,
  "created_at": 1792641600,
  "expires_at": 1792685100,
  "status_url": "/async-videos/v1/tasks/vid_0123456789abcdef0123456789abcdef",
  "data": [
    {
      "url": "https://api.zhangyuapi.com/video-media/vid_0123456789abcdef0123456789abcdef",
      "size": 52428800,
      "content_type": "video/mp4"
    }
  ]
}
```

视频链接支持 GET、HEAD 和字节 Range 请求，供客户端播放、拖动和下载。文件链接没有扩展名，客户端应使用 `content_type` 识别类型。需要长期保存时，请在到期前下载到自己的存储。

## 仅重试保存

```bash
curl -X POST \
  https://api.zhangyuapi.com/async-videos/v1/tasks/vid_0123456789abcdef0123456789abcdef/retry-save \
  -H "Authorization: Bearer YOUR_NEW_API_KEY"
```

仅 `save_failed` 状态可调用，成功接收返回 HTTP `202`。它只重新获取已有任务的视频内容，不重新调用生成接口。上游视频已过期、格式不支持或文件超过 512 MiB 时，重试仍可能失败。

`failed` 和 `indeterminate` 不支持自动重新生成。服务在提交前记录一次性提交边界；如果提交时连接中断或服务重启，无法确认结果时标记 `indeterminate`，避免自动重复付费。

## 当前限制

| 项目 | 配置 |
|---|---|
| 单视频文件 | 最大 512 MiB，即 536870912 字节 |
| 格式 | MP4、WebM 文件头校验 |
| 单任务数量 | 一个视频 |
| 后台工作线程 | 4 路，生成提交、查询和下载共用 |
| 视频缓存预算 | 3 GiB，包含已有视频和任务预留 |
| 单任务空间预留 | 最大视频大小加 1 MiB，约 513 MiB |
| 容量保护 | 空缓存时约可同时接纳 5 个最大预留任务；已有视频会继续占用额度 |
| 系统盘保护 | 任务预留后至少保留 6 GiB 可用空间；下载期间继续检查 |
| 上游生成等待 | 从本地任务创建起最多 2 小时 |
| 单次视频下载 | 最多 30 分钟，且不得超过任务当前有效期 |
| 保存失败自动重试 | 最多尝试 3 次；超大或不支持的格式直接标记保存失败 |
| 视频有效期 | 本地保存完成后 12 小时，到期访问立即返回 HTTP `410` |
| 物理清理 | 每小时一次，过期文件通常在随后一小时内删除 |

视频使用独立服务和目录 `/opt/video-async/data/videos/`，图片仍使用原来的服务、20 MiB 单图片限制和配置上限 200。提高视频文件上限不会提高图片文件上限，也不代表当前服务器能同时下载 200 个大视频。

提交、查询或重试保存的 HTTP 错误使用 `{"detail":"错误码"}`；已接收任务的失败原因则在查询响应的 `error.code` 中。存储预算不足返回 `503` 与 `video_storage_capacity_reached`，无需立即更换幂等键反复重试。
