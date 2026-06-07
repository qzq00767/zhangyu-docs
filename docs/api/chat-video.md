# <span class="api-method post">POST</span> Chat（分析视频）

发送视频帧给模型进行分析。

## 接口地址

```bash
POST https://{{BASE_URL}}/v1/chat/completions
```

## 请求示例

```bash
curl -X POST "https://{{BASE_URL}}/v1/chat/completions" \
  -H "Authorization: Bearer {{API_KEY}}" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "gpt-4o",
    "messages": [
      {
        "role": "user",
        "content": [
          {
            "type": "text",
            "text": "分析这个视频的内容。"
          },
          {
            "type": "video_url",
            "video_url": {
              "url": "https://example.com/video.mp4"
            }
          }
        ]
      }
    ],
    "max_tokens": 1000
  }'
```

## 支持的视频格式

- MP4
- MOV
- AVI
- WebM

## 视频限制

| 限制项 | 值 |
|--------|-----|
| 最大文件大小 | 200 MB |
| 最大时长 | 5 分钟 |
| 最大帧数 | 250 帧 |

::: warning 注意
视频分析功能需要模型支持多模态视频理解。请确认所选模型支持此功能。
:::
