# <span class="api-method post">POST</span> Kling 图生视频

使用 Kling（可灵）协议，根据参考图片创建视频生成任务。

支持通过 `image` 参数传入图片 URL 或 Base64 编码的图片数据。提交成功后，请使用返回的任务 ID 调用[Kling 图生视频任务查询接口](/api/video-kling-image-status)。

<div class="api-endpoint">
  <span class="api-method post">POST</span>
  <code>https://api.zhangyuapi.com/kling/v1/videos/image2video</code>
</div>

## 鉴权

`Authorization: Bearer YOUR_API_KEY`

使用 Bearer Token 认证。

## 请求体

内容类型：`application/json`

| 参数 | 类型 | 必填 | 说明 |
|---|---|:---:|---|
| `model` | string | 否 | 模型/风格 ID |
| `prompt` | string | 否 | 文本描述提示词 |
| `image` | string | 否 | 图片输入 (URL 或 Base64) |
| `duration` | number | 否 | 视频时长（秒） |
| `width` | integer | 否 | 视频宽度 |
| `height` | integer | 否 | 视频高度 |
| `fps` | integer | 否 | 视频帧率 |
| `seed` | integer | 否 | 随机种子 |
| `n` | integer | 否 | 生成视频数量 |
| `response_format` | string | 否 | 响应格式 |
| `user` | string | 否 | 用户标识 |
| `metadata` | - | 否 | 扩展参数 (如 negative_prompt, style, quality_level 等) |

## 请求示例

```bash
curl -X POST "https://api.zhangyuapi.com/kling/v1/videos/image2video" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "YOUR_KLING_MODEL",
    "image": "https://example.com/reference.png",
    "prompt": "保持主体一致，镜头缓慢向前移动"
  }'
```

示例图片地址须替换为可访问的实际图片 URL。
