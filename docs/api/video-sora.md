# <span class="api-method post">POST</span> 创建视频

OpenAI 兼容的视频生成接口。

提交后通过[视频任务查询接口](/api/video-sora-status)获取状态，生成完成后使用[视频内容接口](/api/video-sora-content)下载文件。

如需通过 JSON 提交任务并获取临时视频访问地址，请使用[异步生成视频](/api/videos-async)，并将 `api_format` 设置为 `videos`。涉及二进制参考图上传时，仍应使用本页接口。

协议参考：[OpenAI 视频生成 API](https://platform.openai.com/docs/api-reference/videos/create)。

<div class="api-endpoint">
  <span class="api-method post">POST</span>
  <code>https://api.zhangyuapi.com/v1/videos</code>
</div>

## 鉴权

`Authorization: Bearer YOUR_API_KEY`

使用 Bearer Token 认证。

## 请求体

内容类型：`multipart/form-data`

| 参数 | 类型 | 必填 | 说明 |
|---|---|:---:|---|
| `model` | string | 否 | 当前 API Key 可用的视频模型 ID，建议显式指定 |
| `prompt` | string | 是 | 视频内容描述 |
| `seconds` | string | 否 | 视频时长，单位为秒，支持值取决于模型 |
| `size` | string | 否 | 视频分辨率，格式为 `宽x高`，支持值取决于模型 |
| `input_reference` | file | 否 | 参考图片文件，是否支持及图片要求取决于模型 |

本接口使用 `seconds` 和 `size` 表示时长与分辨率，参数配置应与 `/v1/video/generations` 协议分别处理。上传参考图片时，使用 multipart 文件字段 `input_reference`。

## 请求示例

```bash
curl -X POST "https://api.zhangyuapi.com/v1/videos" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -F "model=YOUR_VIDEO_MODEL" \
  -F "prompt=海浪缓慢拍打沙滩，镜头平稳移动"
```

如需使用参考图片，可在上述请求中增加 `-F "input_reference=@/path/to/image.png"`。请按所选模型的要求配置图片格式和视频分辨率。
