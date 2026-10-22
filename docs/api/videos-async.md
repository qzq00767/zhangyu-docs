# 异步生成视频

提交视频生成任务后，接口返回任务 ID。客户端通过查询接口获取进度，任务状态为 `succeeded` 时取得视频访问地址。视频有效期为保存完成后 12 小时。

本接口支持 `generations` 和 `videos` 两种视频生成协议，统一使用 JSON 提交任务。Kling、即梦专用接口及需要上传二进制参考图的请求，请使用对应的[视频接口](/api/#视频-videos)。

## 接口地址

| 操作 | 方法 | 路径 |
|---|---|---|
| 提交任务 | `POST` | `/async-videos/v1/tasks` |
| 查询任务 | `GET` | `/async-videos/v1/tasks/{task_id}` |
| 仅重试视频保存 | `POST` | `/async-videos/v1/tasks/{task_id}/retry-save` |
| 读取视频 | `GET` / `HEAD` | `/video-media/{task_id}`，使用成功结果返回的完整 URL |

推荐使用 `https://api.zhangyuapi.com`。`https://zhangyuapi.com` 同样支持本接口，两个入口共用任务，查询时须使用提交任务的同一枚 API Key。

::: tip 接口路径
完整提交地址为 `https://api.zhangyuapi.com/async-videos/v1/tasks`，路径前无需额外添加 `/v1`。
:::

## 鉴权与幂等

提交、查询和重试保存均使用平台 API Key：

```http
Authorization: Bearer YOUR_API_KEY
```

提交任务还须携带以下请求头：

```http
Content-Type: application/json
Idempotency-Key: video-order-20261022-001
```

`Idempotency-Key` 为客户端分配的请求标识，长度为 8～128 个字符，允许英文字母、数字及 `_.:-`。建议使用 UUID 或业务订单号。

- 同一枚 API Key、相同幂等键和相同参数返回原任务，避免重复生成。
- 相同幂等键提交不同参数返回 HTTP `409`。
- 提交超时或连接中断时，应保留原始请求体和幂等键，重试同一次提交。
- 修改参数或发起新的生成请求时，应使用新的幂等键。新任务可能产生新的费用。

## 提交任务

<div class="api-endpoint">
  <span class="api-method post">POST</span>
  <code>https://api.zhangyuapi.com/async-videos/v1/tasks</code>
</div>

### 请求参数

请求体为 JSON，最大 1 MiB。不支持 `stream: true`，生成进度通过查询接口获取。

| 参数 | 必填 | 说明 |
|---|:---:|---|
| `api_format` | 否 | 视频生成协议，默认 `generations`；可选值为 `generations`、`videos` |
| `model` | 是 | 当前 API Key 可用的视频模型 ID，1～256 个字符 |
| `prompt` | 是 | 视频内容描述，1～32000 个字符；模型可能有更低的长度限制 |
| `n` | 否 | 仅支持 `1`，每个任务生成并保存一个视频 |
| 其他参数 | 否 | 按模型和所选协议传入，例如 `duration`、`seconds`、`size`、`metadata` |

| `api_format` | 参数协议 | 说明 |
|---|---|---|
| `generations` | [`/v1/video/generations`](/api/video) | 使用该协议的 JSON 参数，如 `duration` |
| `videos` | [`/v1/videos`](/api/video-sora) | 使用该协议的参数，如 `seconds`、`size`；本接口仍以 JSON 接收请求，再转换为 multipart 文本字段，对象和数组编码为 JSON 文本 |

可选参数的支持范围取决于模型和所选协议，不同协议的字段应分别配置。本接口不接收二进制文件，也不将图片 URL 自动转换为上传文件；需要上传参考图时，请使用对应的视频生成接口。

### 请求示例

将 `YOUR_API_KEY` 和 `YOUR_VIDEO_MODEL` 替换为实际密钥及模型 ID。以下示例使用默认的 `generations` 协议。

::: code-group

```bash [curl / Bash]
curl -i -X POST "https://api.zhangyuapi.com/async-videos/v1/tasks" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -H "Idempotency-Key: video-order-20261022-001" \
  -d '{"api_format":"generations","model":"YOUR_VIDEO_MODEL","prompt":"海浪缓慢拍打沙滩，镜头平稳移动","n":1}'
```

```bat [Windows CMD]
curl -i -X POST "https://api.zhangyuapi.com/async-videos/v1/tasks" ^
  -H "Authorization: Bearer YOUR_API_KEY" ^
  -H "Content-Type: application/json" ^
  -H "Idempotency-Key: video-order-20261022-001" ^
  -d "{\"api_format\":\"generations\",\"model\":\"YOUR_VIDEO_MODEL\",\"prompt\":\"海浪缓慢拍打沙滩，镜头平稳移动\",\"n\":1}"
```

:::

### 接收响应

接收成功返回 HTTP `202`，表示任务已接收，生成结果需通过查询接口确认。

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

保存 `id` 和 `status_url`。任务 ID 仅用于本页异步接口，查询时可直接使用返回的相对 `status_url`，与 API 根地址拼接为完整请求地址。

`created_at` 和 `expires_at` 均为 Unix 秒级时间戳。视频保存完成后，`expires_at` 返回具体到期时间。

## 查询任务

<div class="api-endpoint">
  <span class="api-method get">GET</span>
  <code>https://api.zhangyuapi.com/async-videos/v1/tasks/{task_id}</code>
</div>

使用提交任务的同一枚 API Key，无需 `Idempotency-Key`。

```bash
curl "https://api.zhangyuapi.com/async-videos/v1/tasks/vid_0123456789abcdef0123456789abcdef" \
  -H "Authorization: Bearer YOUR_API_KEY"
```

建议按响应的 `Retry-After` 查询，默认每 5 秒一次。HTTP `200` 表示已取得任务状态，生成是否完成应以 JSON 中的 `status` 为准。

### 任务状态

| `status` | 含义 | 客户端处理 |
|---|---|---|
| `queued` | 等待处理 | 继续查询 |
| `submitting` | 正在提交生成请求 | 继续查询 |
| `generating` | 等待模型处理或生成中 | 继续查询 |
| `saving` | 生成完成，正在保存视频 | 继续查询 |
| `succeeded` | 视频已保存成功 | 读取 `data[0].url`，停止查询 |
| `save_failed` | 视频保存失败 | 停止查询，可调用“仅重试视频保存”接口 |
| `failed` | 请求被拒绝、生成失败或超过等待期限 | 停止查询，检查 `error.code` |
| `indeterminate` | 无法确认生成请求的提交结果 | 停止查询，先核对使用日志，避免重复生成和计费 |
| `expired` | 任务或视频已过期 | 停止查询，原视频链接不可继续使用 |

`progress` 根据模型返回的信息更新，可能在一段时间内保持不变。保存完成前最大为 `99`，成功后为 `100`。仅 `succeeded` 状态返回视频结果。

### 成功结果

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

| 字段 | 说明 |
|---|---|
| `data[0].url` | 视频完整访问地址 |
| `data[0].size` | 视频文件大小，单位为字节 |
| `data[0].content_type` | 视频媒体类型，如 `video/mp4` |

## 读取与保存视频

任务成功后，可通过 `data[0].url` 播放或下载视频。视频访问无需 `Authorization` 请求头，任何持有有效链接的用户均可访问，请妥善保管链接。

视频有效期为**保存完成后 12 小时**，具体到期时间以 `expires_at` 为准。链接过期后，访问返回 HTTP `410`。如需长期保存，请在有效期内下载视频。

视频地址支持 `GET`、`HEAD` 和字节 `Range` 请求，可用于播放、进度拖动及下载。文件类型以 `content_type` 为准，保存时应使用对应的 `.mp4` 或 `.webm` 扩展名。请直接使用返回的完整 URL，无需追加文件扩展名。

## 仅重试视频保存

<div class="api-endpoint">
  <span class="api-method post">POST</span>
  <code>https://api.zhangyuapi.com/async-videos/v1/tasks/{task_id}/retry-save</code>
</div>

仅 `save_failed` 状态可调用。使用提交任务的同一枚 API Key：

```bash
curl -X POST "https://api.zhangyuapi.com/async-videos/v1/tasks/vid_0123456789abcdef0123456789abcdef/retry-save" \
  -H "Authorization: Bearer YOUR_API_KEY"
```

接收成功返回 HTTP `202`，随后继续查询同一任务。此操作仅重试获取和保存已有视频，不重新发起生成请求。源视频已过期、格式不支持或文件超过 512 MiB 时，重试仍可能失败。

`failed` 和 `indeterminate` 状态不支持通过此接口重新生成。提交期间发生连接中断等异常且结果无法确认时，任务会标记为 `indeterminate`，系统不自动重新提交生成请求。

## 限制与错误处理

| 项目 | 当前限制或行为 |
|---|---|
| 请求体 | 最大 1 MiB |
| 单任务视频数 | 1 个 |
| 单个视频文件 | 最大 512 MiB（536870912 字节） |
| 支持格式 | MP4、WebM |
| 生成等待 | 从任务创建起最多 2 小时 |
| 单次视频下载 | 最长 30 分钟，且不得超过任务当前有效期 |
| 保存失败自动重试 | 最多尝试 3 次；文件超限或格式不支持时直接标记为保存失败 |
| 视频有效期 | 保存完成后 12 小时，到期访问返回 HTTP `410` |

任务接收数量受处理能力和可用存储容量限制。视频与图片分别适用各自的文件大小限制，图片限制请参阅[异步生成图像](/api/images-async#限制与错误处理)。

提交、查询或重试保存的 HTTP 错误通过 `detail` 返回错误码，例如：

```json
{
  "detail": "video_storage_capacity_reached"
}
```

存储容量不足时，接口返回 HTTP `503` 和 `video_storage_capacity_reached`。请稍后复用原幂等键和请求体重试。已接收任务的失败原因通过查询响应中的 `error.code` 返回，应结合任务状态处理。
