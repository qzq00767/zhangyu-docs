# <span class="api-method post">POST</span> 编辑图像

<div class="api-endpoint">
  <span class="api-method post">POST</span>
  <code>https://api.zhangyuapi.com/v1/images/edits/</code>
</div>

根据参考图片和提示词生成编辑结果，可选用蒙版指定编辑区域。支持 `api.zhangyuapi.com` 和 `zhangyuapi.com` 两个入口，路径末尾有无 `/` 均可。

## 图片链接与保存

同步接口等待模型处理完成后返回结果。响应采用 URL 格式时，通过 `data[].url` 获取图片访问地址；采用 Base64 格式时，直接读取 `b64_json`。

请使用返回的完整图片 URL。如需长期保存，请及时下载图片。

如需提交后轮询结果，请使用[异步图片编辑](#异步图片编辑)。在同步请求中添加 `async: true` 不会切换为异步任务。

## 异步图片编辑

<div class="api-endpoint">
  <span class="api-method post">POST</span>
  <code>https://api.zhangyuapi.com/async-images/v1/edits</code>
</div>

完整上传参考图片、可选蒙版和表单参数后，接口返回 HTTP `202` 及任务 ID。随后使用[异步任务查询接口](/api/images-async#查询任务)获取状态和结果。

### 提交示例

将 `YOUR_API_KEY`、`YOUR_IMAGE_MODEL` 和文件路径替换为实际值。使用 `-F` 提交表单时，无需手动设置 `Content-Type`。

```bash
curl "https://api.zhangyuapi.com/async-images/v1/edits" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Idempotency-Key: edit-order-20261022-001" \
  -F "model=YOUR_IMAGE_MODEL" \
  -F "image=@/path/to/image.png" \
  -F "mask=@/path/to/mask.png" \
  -F "prompt=将背景替换为海边风景" \
  -F "n=1"
```

`mask` 为可选字段。支持多图的模型可重复提交 `image[]`，上传要求见[下表](#上传要求)。

### 幂等要求

请求头须包含 `Idempotency-Key`，长度为 8～128 个字符，允许英文字母、数字及 `_.:-`。

- 重试同一次提交时，复用原幂等键，并保持文件内容、文件名、字段顺序和参数不变；multipart boundary 可由客户端重新生成。
- 同一枚 API Key 下，文生图和图片编辑共用幂等键空间。更换操作、文件或参数时，须使用新的幂等键。
- 提交超时或连接中断时，任务仍可能已被接收。请复用原请求重试，避免重复创建任务。

### 接收与查询

成功接收示例：

```json
{
  "id": "img_0123456789abcdef0123456789abcdef",
  "status": "queued",
  "created_at": "2026-10-22T04:00:00Z",
  "expires_at": null,
  "status_url": "/async-images/v1/tasks/img_0123456789abcdef0123456789abcdef"
}
```

保存 `id` 和 `status_url`，使用提交任务的同一枚 API Key 查询。建议按响应的 `Retry-After` 查询，默认每 3 秒一次：

```bash
curl "https://api.zhangyuapi.com/async-images/v1/tasks/img_0123456789abcdef0123456789abcdef" \
  -H "Authorization: Bearer YOUR_API_KEY"
```

HTTP `200` 表示已取得任务状态。`status` 为 `succeeded` 时，通过 `data[].url` 获取图片访问地址，图片有效期以 `expires_at` 为准。异步编辑成功结果统一返回 URL，不受模型原始响应格式影响。

`save_failed` 状态可调用[保存重试接口](/api/images-async#仅重试图片保存)，无需重新生成。任务状态为 `failed` 或 `indeterminate` 时，应先检查错误和使用日志，避免重复提交。完整状态说明参阅[任务状态](/api/images-async#任务状态)。

### JSON 请求

所选模型支持 JSON 编辑请求时，也可向 `/async-images/v1/edits` 提交 `application/json`，请求体最大 256 KiB，字段按模型要求填写。

异步编辑暂不提供回调、生成阶段 SSE 或任务取消功能。

## 鉴权

`Authorization: Bearer YOUR_API_KEY`

使用 Bearer Token 认证。

## 请求体

内容类型：`multipart/form-data`

| 参数 | 类型 | 必填 | 说明 |
|---|---|:---:|---|
| `image` | file | 是 | 参考图片文件，支持的格式取决于模型。 |
| `mask` | file | 否 | 编辑区域蒙版，具体要求取决于模型。 |
| `prompt` | string | 是 | 所需图像的文本描述。最大长度为 1000 个字符。 |
| `n` | string | 否 | 要生成的图像数。必须介于 1 和 10 之间。 |
| `size` | string | 否 | 生成图像的大小。必须是`256x256`、`512x512`或 `1024x1024`之一。 |
| `response_format` | string | 否 | 生成的图像返回的格式。必须是`url`或`b64_json`。 |
| `user` | string | 否 | 最终用户的唯一标识符，用于区分调用来源。 |
| `model` | string | 否 | 当前 API Key 可用且支持图片编辑的模型 ID，建议显式指定。 |

参考图字段支持 `image`、重复的 `image[]`、`images` 或 `images[]`；具体字段名和多图能力以所选模型为准。异步编辑使用相同的表单提交方式，参数支持范围以模型为准。

## 上传要求

| 项目 | 限制 |
|---|---|
| multipart 请求总大小 | 128 MiB，包含表单开销 |
| 单个上传文件 | 50 MiB |
| 参考图数量 | 最多 16 张，模型可能有更低限制 |
| 返回 URL 图片大小 | 单张最多 20 MiB |
| JSON 编辑请求 | 最多 256 KiB，需模型支持相应 JSON 格式 |

`stream` 请省略或设为 `false`。返回 `429` 或 `503` 时，请按 `Retry-After` 等待后重试。同步请求提交后超时，应先核对使用日志；异步请求应复用原幂等键和请求内容重试。

## 请求示例

```bash
curl -X POST "https://api.zhangyuapi.com/v1/images/edits/" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -F "model=YOUR_IMAGE_MODEL" \
  -F "image=@/path/to/image.png" \
  -F "prompt=将背景替换为海边风景"
```

支持多图的模型可使用以下形式：

```bash
curl "https://api.zhangyuapi.com/v1/images/edits" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -F "model=YOUR_IMAGE_MODEL" \
  -F "image[]=@/path/to/a.png" \
  -F "image[]=@/path/to/b.png" \
  -F "prompt=融合两张参考图" \
  -F "response_format=url"
```

标准 URL 响应示例：

```json
{
  "data": [
    {
      "url": "https://api.zhangyuapi.com/media/0123456789abcdef0123456789abcdef01234567"
    }
  ]
}
```
