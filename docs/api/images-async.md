# 异步生成图像

异步接口先接收生成任务并返回任务 ID，后台调用模型、保存图片。客户端轮询任务，状态为 `succeeded` 后取得图片链接。

客户端需分别调用提交任务和查询任务接口，完成异步生成流程。同步接口的 `async: true`、`stream: true` 参数及 SDK 标准图片生成方法均不支持自动切换至该流程。

## 接口地址

| 操作 | 方法 | 路径 |
|---|---|---|
| 提交任务 | `POST` | `/async-images/v1/tasks` |
| 查询任务 | `GET` | `/async-images/v1/tasks/{task_id}` |
| 仅重试图片保存 | `POST` | `/async-images/v1/tasks/{task_id}/retry-save` |
| 读取图片 | `GET` / `HEAD` | `/media/{image_id}`，使用成功结果返回的完整 URL |

推荐使用 `https://api.zhangyuapi.com`。`https://zhangyuapi.com` 同样支持异步图像接口，两个入口共用任务，查询时须使用提交任务的同一枚 API Key。

::: warning 接口路径
完整提交地址是 `https://api.zhangyuapi.com/async-images/v1/tasks`。

路径前无需额外添加 `/v1`。请保持示例中的完整路径，末尾无需添加 `/`，以避免重定向影响鉴权。
:::

## 鉴权与幂等

提交、查询和重试保存都使用现有的平台 API Key：

```http
Authorization: Bearer YOUR_API_KEY
```

提交任务还必须携带：

```http
Content-Type: application/json
Idempotency-Key: image-order-20261022-001
```

`Idempotency-Key` 是客户端为本次生成分配的请求标识，长度为 8～128 个字符，只允许英文字母、数字和 `_.:-`。建议使用 UUID 或业务订单号。

- 同一枚 API Key、相同幂等键、相同参数：返回同一个任务，不重复生成。即使任务已经成功或失败，重复提交仍返回原任务。
- 提交超时、网络断开或收到网关错误时：保留原始请求体和幂等键，重试同一次提交，避免产生新的生成任务。
- 更改模型、提示词或其他参数，或需要生成下一张图片时：使用新的幂等键；相同幂等键提交不同参数会返回 `409`。
- 幂等记录通常保留至任务创建约 7 天后的清理周期，不应作为永久去重凭据。业务系统应自行保存请求标识和任务 ID。

## 提交任务

<div class="api-endpoint">
  <span class="api-method post">POST</span>
  <code>https://api.zhangyuapi.com/async-images/v1/tasks</code>
</div>

### 请求参数

请求体为 JSON，最大 256 KiB。只接受下表字段，未知字段和不符合类型的值会返回 `422`。

| 参数 | 类型 | 必填 | 说明 |
|---|---|:---:|---|
| `model` | string | 是 | 1～256 个字符。使用当前 API Key 所属分组内支持图片生成的实际模型 ID |
| `prompt` | string | 是 | 1～32000 个字符；模型自身可能有更低的长度限制 |
| `n` | integer | 否 | 默认 `1`，范围 `1`～`4`，实际数量须符合模型限制；须使用整数类型 |
| `size` | string | 否 | 最多 64 个字符，例如 `1024x1024`，取值须符合模型限制 |
| `quality` | string | 否 | 最多 64 个字符，取值取决于模型 |
| `style` | string | 否 | 最多 64 个字符，取值取决于模型 |
| `response_format` | string | 否 | `url` 或 `b64_json`，指定模型生成结果的格式；任务成功后均通过 `data[].url` 返回图片下载地址 |
| `background` | string | 否 | `transparent`、`opaque` 或 `auto` |
| `output_format` | string | 否 | `png`、`jpeg` 或 `webp` |
| `output_compression` | integer | 否 | `0`～`100` |
| `moderation` | string | 否 | 最多 64 个字符，取值取决于模型 |
| `user` | string | 否 | 最多 256 个字符 |
| `seed` | integer | 否 | 是否支持取决于模型 |

可选参数通过接口校验不代表模型一定支持。首次接入建议只发送 `model`、`prompt` 和 `n`，成功后再按模型能力添加参数。

当前异步接口仅支持标准 JSON 图片生成请求，不支持 multipart 图片编辑、聊天接口图像生成或厂商自定义任务协议，暂不提供回调、SSE 和任务取消功能。

### 请求示例

将 `YOUR_API_KEY` 和 `YOUR_IMAGE_MODEL` 替换为实际密钥及模型 ID。示例幂等键用于一次生成；新任务需要换一个值。

::: code-group

```bash [curl / Bash]
curl -i -X POST "https://api.zhangyuapi.com/async-images/v1/tasks" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -H "Idempotency-Key: image-order-20261022-001" \
  -d '{"model":"YOUR_IMAGE_MODEL","prompt":"晴天的海边风景","n":1}'
```

```bat [Windows CMD]
curl -i -X POST "https://api.zhangyuapi.com/async-images/v1/tasks" ^
  -H "Authorization: Bearer YOUR_API_KEY" ^
  -H "Content-Type: application/json" ^
  -H "Idempotency-Key: image-order-20261022-001" ^
  -d "{\"model\":\"YOUR_IMAGE_MODEL\",\"prompt\":\"晴天的海边风景\",\"n\":1}"
```

:::

Windows CMD 使用 `^` 续行，续行符须位于行末且后面无空格。PowerShell 的参数引用与转义规则不同，可使用后文的 Python 示例。

### 接收响应

新任务接收成功返回 **HTTP 202**，这只表示任务已接收，不表示图片已生成。

```http
HTTP/1.1 202 Accepted
Location: /async-images/v1/tasks/img_0123456789abcdef0123456789abcdef
Retry-After: 3
Cache-Control: no-store
```

```json
{
  "id": "img_0123456789abcdef0123456789abcdef",
  "status": "queued",
  "created_at": "2026-10-22T04:00:00Z",
  "expires_at": null,
  "status_url": "/async-images/v1/tasks/img_0123456789abcdef0123456789abcdef"
}
```

保存 `id` 和 `status_url`。时间使用 UTC，`Z` 结尾表示 UTC 时间。图片未全部保存成功时，`expires_at` 通常为 `null`；成功后才给出图片的到期时间。幂等重放可能直接返回原任务的成功或失败状态，但提交响应仍为 `202`。

## 查询任务

<div class="api-endpoint">
  <span class="api-method get">GET</span>
  <code>https://api.zhangyuapi.com/async-images/v1/tasks/{task_id}</code>
</div>

把提交结果中的任务 ID 原样代入，或直接拼接服务返回的相对 `status_url`。使用提交任务的同一枚 API Key，不需要 `Idempotency-Key`。

::: code-group

```bash [curl / Bash]
curl "https://api.zhangyuapi.com/async-images/v1/tasks/img_0123456789abcdef0123456789abcdef" \
  -H "Authorization: Bearer YOUR_API_KEY"
```

```bat [Windows CMD]
curl "https://api.zhangyuapi.com/async-images/v1/tasks/img_0123456789abcdef0123456789abcdef" ^
  -H "Authorization: Bearer YOUR_API_KEY"
```

:::

建议按响应的 `Retry-After` 查询，默认每 3 秒一次。查询 HTTP `200` 仅表示成功取得任务状态，必须继续检查 JSON 中的 `status`。

### 任务状态

| `status` | 含义 | 客户端处理 |
|---|---|---|
| `queued` | 等待调用模型 | 继续查询 |
| `generating` | 模型生成中 | 继续查询，不重复提交 |
| `preparing` | 处理生成结果，准备图片 | 继续查询 |
| `saving` | 下载或保存图片中 | 继续查询；此时尚不提供结果 URL |
| `succeeded` | 所有图片已保存成功 | 读取 `data[].url`，停止查询 |
| `save_failed` | 图片保存失败 | 停止轮询，可调用“仅重试图片保存”接口 |
| `failed` | 请求被拒绝、响应不支持或排队超时等 | 停止查询，检查 `error` |
| `indeterminate` | 无法确认模型是否已完成生成 | 停止查询，不自动重新生成；先核对使用日志 |
| `expired` | 任务或图片已过期 | 停止查询，原图片链接不可继续使用 |

### 成功结果

```json
{
  "id": "img_0123456789abcdef0123456789abcdef",
  "status": "succeeded",
  "created_at": "2026-10-22T04:00:00Z",
  "expires_at": "2026-10-22T16:00:30Z",
  "status_url": "/async-images/v1/tasks/img_0123456789abcdef0123456789abcdef",
  "data": [
    {
      "url": "https://api.zhangyuapi.com/media/0123456789abcdef0123456789abcdef01234567"
    }
  ]
}
```

无论模型生成结果采用 URL 还是 Base64，任务成功后均通过 `data[].url` 返回图片访问地址。请直接使用完整 URL，保留原域名、路径和文件标识。

### 失败结果

以下是查询 HTTP `200`、任务状态为 `failed` 的例子：

```json
{
  "id": "img_0123456789abcdef0123456789abcdef",
  "status": "failed",
  "created_at": "2026-10-22T04:00:00Z",
  "expires_at": null,
  "status_url": "/async-images/v1/tasks/img_0123456789abcdef0123456789abcdef",
  "error": {
    "code": "upstream_request_rejected",
    "upstream_status": 503
  }
}
```

`upstream_status: 503` 表示模型生成请求返回 `503`。该字段用于说明任务失败原因，与提交或查询接口的 HTTP 状态码分别处理。常见原因包括模型 ID 错误、当前 API Key 无可用的模型资源或模型服务暂时不可用。请结合控制台使用日志确认原因，再决定是否创建新任务。修改参数后必须使用新的幂等键。

## 读取与保存图片

任务成功后，可通过 `data[].url` 访问或下载图片。图片访问无需 `Authorization` 请求头，任何持有有效链接的用户均可访问，请妥善保管链接。

图片有效期为**全部保存成功后 12 小时**，具体到期时间以 `expires_at` 为准。链接过期后，访问返回 HTTP `410`。

如需长期保存，请在有效期内下载图片。图片格式以响应头 `Content-Type` 为准，保存文件时应使用对应的扩展名（`.png`、`.jpg`、`.webp` 或 `.gif`）。请直接使用接口返回的完整 URL，无需追加文件扩展名。

## 仅重试图片保存

<div class="api-endpoint">
  <span class="api-method post">POST</span>
  <code>https://api.zhangyuapi.com/async-images/v1/tasks/{task_id}/retry-save</code>
</div>

只有状态为 `save_failed` 且任务尚未过期时可以调用。携带提交时的同一枚 API Key，不需要请求体或新的幂等键。

::: code-group

```bash [curl / Bash]
curl -X POST "https://api.zhangyuapi.com/async-images/v1/tasks/img_0123456789abcdef0123456789abcdef/retry-save" \
  -H "Authorization: Bearer YOUR_API_KEY"
```

```bat [Windows CMD]
curl -X POST "https://api.zhangyuapi.com/async-images/v1/tasks/img_0123456789abcdef0123456789abcdef/retry-save" ^
  -H "Authorization: Bearer YOUR_API_KEY"
```

:::

接收成功返回 HTTP `202` 和任务状态，随后继续查询同一个任务。这只重试图片保存，不重新调用生成模型。来源链接已经失效时仍可能保存失败。

任务不处于 `save_failed` 时返回 `409`，任务已过期时返回 `410`。`failed` 和 `indeterminate` 不能使用此接口重新生成。

## Python 完整示例

安装 HTTP 客户端：

```bash
python -m pip install httpx
```

设置环境变量 `ZHANGYU_API_KEY` 和 `ZHANGYU_IMAGE_MODEL`，分别填写实际 API Key 和支持图片生成的模型 ID。脚本会提交任务、每 3 秒查询状态，并按响应的实际图片格式保存文件。

::: code-group

```bash [Bash 环境变量]
export ZHANGYU_API_KEY="YOUR_API_KEY"
export ZHANGYU_IMAGE_MODEL="YOUR_IMAGE_MODEL"
```

```bat [Windows CMD 环境变量]
set "ZHANGYU_API_KEY=YOUR_API_KEY"
set "ZHANGYU_IMAGE_MODEL=YOUR_IMAGE_MODEL"
```

```powershell [PowerShell 环境变量]
$env:ZHANGYU_API_KEY = "YOUR_API_KEY"
$env:ZHANGYU_IMAGE_MODEL = "YOUR_IMAGE_MODEL"
```

:::

```python
import os
import time
import uuid
from pathlib import Path

import httpx

BASE_URL = "https://api.zhangyuapi.com"
headers = {"Authorization": f"Bearer {os.environ['ZHANGYU_API_KEY']}"}
request_id = os.getenv("ZHANGYU_IMAGE_REQUEST_ID") or str(uuid.uuid4())
payload = {
    "model": os.environ["ZHANGYU_IMAGE_MODEL"],
    "prompt": "晴天的海边风景",
    "n": 1,
}
terminal_errors = {"failed", "save_failed", "indeterminate", "expired"}
pending_states = {"queued", "generating", "preparing", "saving"}
extensions = {
    "image/png": ".png",
    "image/jpeg": ".jpg",
    "image/webp": ".webp",
    "image/gif": ".gif",
}

print("本次幂等键:", request_id, flush=True)
with httpx.Client(timeout=30.0, follow_redirects=False) as client:
    # 提交失败时不自动创建新任务；重试同一次提交应复用本次幂等键和参数。
    response = client.post(
        f"{BASE_URL}/async-images/v1/tasks",
        headers={**headers, "Idempotency-Key": request_id},
        json=payload,
    )
    response.raise_for_status()
    task = response.json()
    print("任务 ID:", task["id"], flush=True)
    status_url = f"{BASE_URL}{task['status_url']}"
    deadline = time.monotonic() + 1800

    while task["status"] != "succeeded":
        if task["status"] in terminal_errors:
            raise RuntimeError(f"任务已停止: {task['status']}, {task.get('error')}")
        if task["status"] not in pending_states:
            raise RuntimeError(f"未知任务状态: {task['status']}")
        if time.monotonic() >= deadline:
            raise TimeoutError(f"本地等待超时，任务可能仍在运行，请继续查询: {status_url}")
        # 查询连接失败可稍后继续查询；不重新提交生成请求。
        time.sleep(3)
        try:
            response = client.get(status_url, headers=headers)
        except httpx.TransportError:
            continue
        if response.status_code == 429 or response.status_code >= 500:
            continue
        response.raise_for_status()
        task = response.json()
        print("任务状态:", task["status"], flush=True)

    print("图片到期时间:", task["expires_at"])
    for index, image in enumerate(task["data"], start=1):
        # 读取分享链接不传 API Key；扩展名由响应的实际图片类型决定。
        with client.stream("GET", image["url"], timeout=60.0) as response:
            response.raise_for_status()
            media_type = response.headers.get("content-type", "").split(";")[0].strip().lower()
            extension = extensions.get(media_type)
            if extension is None:
                raise RuntimeError(f"不支持的图片类型: {media_type}")
            destination = Path(f"{task['id']}-{index}{extension}")
            partial = destination.with_suffix(extension + ".part")
            try:
                with partial.open("wb") as output:
                    for chunk in response.iter_bytes():
                        output.write(chunk)
                partial.replace(destination)
            except Exception:
                partial.unlink(missing_ok=True)
                raise
        print("已保存:", destination)
```

脚本每次启动默认创建新的幂等键，对应一次新的生成请求。若提交超时后需要重试同一次请求，请将原幂等键设置到环境变量 `ZHANGYU_IMAGE_REQUEST_ID`，并保持 `payload` 不变。已取得任务 ID 后，应优先继续查询原任务。脚本等待超时或退出不会取消任务。

## 限制与错误处理

| 项目 | 当前限制或行为 |
|---|---|
| 单任务图片数 | 默认 1，最多 4；受模型支持范围限制 |
| 单张图片 | 最大 20 MiB，支持 PNG、JPEG、WebP、GIF |
| 图片下载并发 | 同步、异步任务共用，最多 200 路，超出后排队 |
| 活跃任务 | 全局最多 200 个，每枚 API Key 最多 200 个；达到任务数上限返回 `429`，实际可接收数量同时受可用存储容量限制 |
| 排队等待 | 最长约 1 小时 |
| 保存失败 | 图片下载自动尝试最多 3 次；仅 `save_failed` 可手动重试保存 |
| 生成结果不确定 | 不自动重发生成，避免重复计费 |
| 图片有效期 | 全部保存成功后 12 小时，到期读取返回 `410` |

存储容量不足时，接口可能返回 HTTP `503`，请稍后重试。视频任务的文件大小和处理限制请参阅[异步生成视频](/api/videos-async#限制与错误处理)。

提交、查询和重试保存的 HTTP 错误通常返回：

```json
{
  "detail": "idempotency_key_required_8_to_128_characters"
}
```

| HTTP 状态 | 常见含义 | 处理方式 |
|---|---|---|
| `400` | 缺少幂等键，或幂等键格式不正确 | 补充 8～128 字符的 `Idempotency-Key` |
| `401` / `403` | API Key 无效、失效或受限 | 检查密钥、分组和访问限制 |
| `404` | 路径错误、任务不存在，或查询时使用了另一枚 Key | 核对完整路径、任务 ID 和提交时的 Key |
| `409` | 幂等键对应参数发生变化，或任务不允许重试保存 | 同次提交保持原参数；新任务换幂等键；先检查任务状态 |
| `410` | 图片或可重试保存的任务已过期 | 原图片链接不可继续使用 |
| `413` | 请求体超过 256 KiB | 缩小请求体 |
| `422` | 参数类型、范围或字段不支持 | 按请求参数表调整，不传 `async`、`stream` 等额外字段 |
| `429` | 活跃任务达到限制 | 降低提交并发，稍后复用原幂等键重试同次提交 |
| `503` | Key 校验暂不可用或图片存储容量不足等 | 稍后复用原幂等键重试；与任务结果中的 `upstream_status: 503` 区分 |

提交时收到 `502`、HTML 错误页或发生连接中断时，任务仍可能已被接收。恢复后请复用原幂等键和请求体重试，避免重复创建任务。
