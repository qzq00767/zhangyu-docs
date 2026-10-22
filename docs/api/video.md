# <span class="api-method post">POST</span> 创建视频生成任务

提交视频生成任务，支持文生视频和图生视频。

提交成功后返回任务 ID，请通过[任务查询接口](/api/video-status)获取状态和结果。

如需统一的结果保存和视频下载地址，请使用[异步生成视频](/api/videos-async)。本页任务须通过对应协议的查询接口获取结果。

<div class="api-endpoint">
  <span class="api-method post">POST</span>
  <code>https://api.zhangyuapi.com/v1/video/generations</code>
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
curl -X POST "https://api.zhangyuapi.com/v1/video/generations" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "YOUR_VIDEO_MODEL",
    "prompt": "海浪缓慢拍打沙滩，镜头平稳移动"
  }'
```
