# <span class="api-method post">POST</span> 编辑图像

<div class="api-endpoint">
  <span class="api-method post">POST</span>
  <code>https://api.zhangyuapi.com/v1/images/edits/</code>
</div>

支持 `api.zhangyuapi.com` 和 `zhangyuapi.com` 两个入口，路径末尾有无 `/` 均可。继续使用原来的 Key、模型和调用参数。

## 图片链接与保存

此接口同步等待模型生成，标准响应中的 `data[].url` 统一改为 `https://api.zhangyuapi.com/media/随机图片ID`，后台立即缓存图片。打开链接时可边下载边转发，不必等待整张图片保存完毕。上游返回 `b64_json` 时保持原样，不额外保存 Base64 图片。

图片链接从生成结果就绪起有效 **12 小时**，到期返回 `410`，磁盘文件每小时清理。需要长期使用的图片请在有效期内保存到自己的存储。

需要提交后轮询结果时，使用下方的 [异步图片编辑](#异步图片编辑)。同步路径不会通过 `async:true` 自动切换。

## 异步图片编辑

```text
POST https://api.zhangyuapi.com/async-images/v1/edits
POST https://zhangyuapi.com/async-images/v1/edits
```

接收完整参考图、蒙版和表单后返回 HTTP `202` 与任务 ID，后台调用 `/v1/images/edits` 生成、保存图片。查询及重试保存与 [异步文生图](/api/images-async) 共用接口。

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

`mask` 可省略；多图模型可改为重复提交 `image[]`。上传限制与下方同步编辑一致。请求头中的 `Idempotency-Key` 必填，为 8～128 位英文字母、数字或 `_.:-`。同一次提交重试时沿用原值，保持文件内容、文件名、字段顺序和参数不变；multipart 边界可以改变。同一枚 Key 下文生图和编辑任务也共用幂等键空间，更换操作或参数应使用新值。

成功接收示例：

```json
{
  "id": "img_任务ID",
  "status": "queued",
  "created_at": "UTC时间",
  "expires_at": null,
  "status_url": "/async-images/v1/tasks/img_任务ID"
}
```

建议每 3 秒查询一次：

```bash
curl "https://api.zhangyuapi.com/async-images/v1/tasks/img_任务ID" \
  -H "Authorization: Bearer YOUR_API_KEY"
```

`status` 为 `succeeded` 后，从 `data[].url` 获取自己域名的图片链接。异步编辑中，上游返回 URL 或 Base64 都会先保存，再统一返回图片链接；保存完成后有效 12 小时，每小时清理。生成失败或结果不确定时不会自动重新生成；`save_failed` 只能通过 `/async-images/v1/tasks/{task_id}/retry-save` 重试保存。

参考图和蒙版在排队期间加密保存在服务器，生成处理结束后释放。同步上传和异步排队输入共用 768 MiB 上传预算；因此 200 是任务与工作线程配置上限，不代表可同时接收 200 个最大上传。上传预算不足时返回 `429`，磁盘余量不足时返回 `503`。

上游支持 JSON 编辑格式时，也可向这个新地址提交 `application/json`，上限 256 KiB，其余参数保持该模型原格式。暂不提供回调、生成阶段 SSE 或任务取消功能。

## 鉴权

`Authorization: Bearer YOUR_API_KEY`

使用 Bearer Token 认证。

## 请求体

内容类型：`multipart/form-data`

| 参数 | 类型 | 必填 | 说明 |
|---|---|:---:|---|
| `image` | file | 是 | - |
| `mask` | file | 否 | - |
| `prompt` | string | 是 | 所需图像的文本描述。最大长度为 1000 个字符。 |
| `n` | string | 否 | 要生成的图像数。必须介于 1 和 10 之间。 |
| `size` | string | 否 | 生成图像的大小。必须是`256x256`、`512x512`或 `1024x1024`之一。 |
| `response_format` | string | 否 | 生成的图像返回的格式。必须是`url`或`b64_json`。 |
| `user` | string | 否 | 最终用户的唯一标识符，用于区分调用来源。 |
| `model` | string | 否 | - |

参考图字段支持 `image`、重复的 `image[]`、`images` 或 `images[]`；具体字段名和多图能力以所用模型为准。参考图、蒙版及其他表单字段会保留后转发给 New API。

## 中转限制

| 项目 | 限制 |
|---|---|
| multipart 请求总大小 | 128 MiB，包含表单开销 |
| 单个上传文件 | 50 MiB |
| 参考图数量 | 最多 16 张，模型可能有更低限制 |
| 同时接收上传 | 4 路；繁忙时返回 `429` |
| 生成并发 | 与同步文生图共享 200 上限，并受存储预留限制 |
| 上传接收总时限 | 300 秒 |
| 返回 URL 图片大小 | 单张最多 20 MiB |
| JSON 编辑请求 | 最多 256 KiB，需上游模型支持相应 JSON 格式 |

`stream` 请省略或设为 `false`。图片文件的流式转发不需要设置 `stream:true`。返回 `429` 或 `503` 时遵循 `Retry-After`；已提交生成后超时，不要自动重提以免重复计费。

## 请求示例

```bash
curl -X POST "https://api.zhangyuapi.com/v1/images/edits/" \
  -H "Authorization: Bearer YOUR_API_KEY" \
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
      "url": "https://api.zhangyuapi.com/media/随机图片ID"
    }
  ]
}
```
