# <span class="api-method post">POST</span> 生成图像

<div class="api-endpoint">
  <span class="api-method post">POST</span>
  <code>https://api.zhangyuapi.com/v1/images/generations</code>
</div>

## 同步与异步

本页接口等待模型生成后返回结果。需要先取得任务 ID、再查询进度和图片链接时，请使用[异步生成图像](/api/images-async)。

| 方式 | 接口 | 返回结果 |
|---|---|---|
| 同步 | `POST /v1/images/generations` | 生成完成后返回标准图片响应，结果为图片 URL 或 Base64 数据，具体格式取决于模型和请求参数 |
| 异步 | `POST /async-images/v1/tasks` | 提交后返回任务 ID；图片全部生成并保存成功后，通过查询接口获取图片下载地址 |

图片文件的流式传输不需要设置 `stream: true`。当前同步图像生成接口不支持生成阶段的 SSE，请省略 `stream` 或设置为 `false`。

## 鉴权

`Authorization: Bearer YOUR_API_KEY`

使用 Bearer Token 认证。

## 请求体

内容类型：`application/json`

| 参数 | 类型 | 必填 | 说明 |
|---|---|:---:|---|
| `model` | string | 是 | 当前 API Key 所属分组内支持图片生成的模型 ID，请从控制台或模型列表获取。 |
| `prompt` | string | 是 | 所需图像的文本描述。`gpt-image-1` 的最大长度为 32000 个字符，`dall-e-2` 的最大长度为 1000 个字符，`dall-e-3` 的最大长度为 4000 个字符。 |
| `n` | integer | 否 | 要生成的图像数量。必须介于 1 到 10 之间。对于 `dall-e-3`，仅支持 `n=1`。 |
| `size` | string | 否 | 图像尺寸，例如 `1024x1024`；支持的尺寸和默认值取决于模型。 |
| `background` | string | 否 | 图像背景类型，支持范围取决于模型。 |
| `moderation` | string | 否 | 图像内容审核级别，支持范围取决于模型。 |
| `quality` | string | 否 | 生成图像的质量，取值取决于模型。 |
| `response_format` | string | 否 | `url` 或 `b64_json`，具体支持情况取决于模型。生成结果为 Base64 数据时，响应中保留该格式。 |
| `stream` | boolean | 否 | 省略或设为 `false`，当前同步图像生成接口不支持生成阶段的 SSE。 |
| `style` | string | 否 | 图像风格，支持范围取决于模型。 |
| `user` | string | 否 | 最终用户的唯一标识符。 |

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
