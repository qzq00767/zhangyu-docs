# <span class="api-method post">POST</span> 文字转语音（TTS）

将文字转换为语音。

## 接口地址

```bash
POST https://{{BASE_URL}}/v1/audio/speech
```

## 请求示例

```bash
curl -X POST "https://{{BASE_URL}}/v1/audio/speech" \
  -H "Authorization: Bearer {{API_KEY}}" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "tts-1",
    "input": "你好，欢迎使用章鱼中枢。",
    "voice": "alloy",
    "speed": 1.0
  }' \
  --output speech.mp3
```

## 参数说明

| 参数 | 类型 | 必填 | 说明 |
|------|------|:----:|------|
| `model` | string | ✅ | `tts-1`（更快）或 `tts-1-hd`（更高质量） |
| `input` | string | ✅ | 要转换的文字（最大 4096 字符） |
| `voice` | string | ✅ | 语音名称 |
| `speed` | number | - | 语速，0.25-4.0，默认 1.0 |
| `response_format` | string | - | 输出格式：`mp3`、`opus`、`aac`、`flac`、`wav`、`pcm` |
