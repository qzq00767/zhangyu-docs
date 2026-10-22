# <span class="api-method post">POST</span> 生成图像

<div class="api-endpoint">
  <span class="api-method post">POST</span>
  <code>https://api.zhangyuapi.com/v1/images/generations</code>
</div>

## 同步与异步

本页接口等待模型生成后返回结果。需要先取得任务 ID、再查询进度和图片链接时，请使用[异步生成图像](/api/images-async)。

| 方式 | 接口 | 返回结果 |
|---|---|---|
| 同步 | `POST /v1/images/generations` | 标准图片响应；上游返回 URL 时替换为本站图片链接，并在读取时流式中转、缓存；只返回 Base64 时保留 Base64 响应，目前不额外落盘 |
| 异步 | `POST /async-images/v1/tasks` | 先返回任务 ID；图片全部生成、保存成功后，查询结果统一返回本站图片 URL |

图片文件的流式传输不需要设置 `stream: true`。当前同步中转接口不支持生成阶段的 SSE，请省略 `stream` 或设置为 `false`。

## 鉴权

`Authorization: Bearer YOUR_API_KEY`

使用 Bearer Token 认证。

## 请求体

内容类型：`application/json`

| 参数 | 类型 | 必填 | 说明 |
|---|---|:---:|---|
| `model` | string | 是 | 使用当前 API Key 所属分组内、支持图片生成的实际模型 ID。请从控制台或模型列表核对，不要直接使用示例占位符。 |
| `prompt` | string | 是 | 所需图像的文本描述。`gpt-image-1` 的最大长度为 32000 个字符，`dall-e-2` 的最大长度为 1000 个字符，`dall-e-3` 的最大长度为 4000 个字符。 |
| `n` | integer | 否 | 要生成的图像数量。必须介于 1 到 10 之间。对于 `dall-e-3`，仅支持 `n=1`。 |
| `size` | string | 否 | 生成的图像的大小。`对于 gpt-image-1`，必须是 `1024x1024`、`1536x1024`（横向）、`1024x1536`（纵向）或`自动`（默认值）之一，`对于 dall-e-2`，必须是 `256x256、``512x512` 或 `1024x1024` 之一，对于 `dall-e-3`，必须是 `1024x1024`、`1792x1024` 或 `1024x1792` 之一。 |
| `background` | string | 否 | - |
| `moderation` | string | 否 | 控制 `gpt-image-1` 生成的图像的内容审核级别。必须为`低，` 以进行限制较少的筛选或`自动`（默认值）。 |
| `quality` | string | 否 | 将生成的图像的质量。 |
| `response_format` | string | 否 | `url` 或 `b64_json`，具体支持情况取决于模型。上游返回 Base64 时，同步接口保留 Base64 响应。 |
| `stream` | boolean | 否 | 省略或设为 `false`，当前同步中转不支持生成阶段的 SSE。 |
| `style` | string | 否 | - |
| `user` | string | 否 | - |

## 请求示例

```bash
curl -X POST "https://api.zhangyuapi.com/v1/images/generations" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
  "model": "YOUR_IMAGE_MODEL",
  "prompt": "晴天的海边风景",
  "n": 1
}'
```
