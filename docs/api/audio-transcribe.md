# 音频接口

语音转文字和文字转语音。

## <span class="api-method post">POST</span> 音频转文字（Transcription）

### 接口地址

```bash
POST https://zhangyuapi.com/v1/audio/transcriptions
```

### 请求示例

```bash
curl -X POST "https://zhangyuapi.com/v1/audio/transcriptions" \
  -H "Authorization: Bearer {{API_KEY}}" \
  -F "file=@audio.mp3" \
  -F "model=whisper-1" \
  -F "language=zh" \
  -F "response_format=json"
```

### 参数说明

| 参数 | 类型 | 必填 | 说明 |
|------|------|:----:|------|
| `file` | file | ✅ | 音频文件 |
| `model` | string | ✅ | 模型名称，如 `whisper-1` |
| `language` | string | - | ISO-639-1 语言代码 |
| `prompt` | string | - | 引导词 |
| `response_format` | string | - | `json`、`text`、`srt`、`vtt` |
| `temperature` | number | - | 采样温度 |

### 支持的音频格式

- mp3, mp4, mpeg, mpga, m4a, wav, webm, flac, ogg

## <span class="api-method post">POST</span> 文字转语音（TTS）

### 接口地址

```bash
POST https://zhangyuapi.com/v1/audio/speech
```

### 请求示例

```bash
curl -X POST "https://zhangyuapi.com/v1/audio/speech" \
  -H "Authorization: Bearer {{API_KEY}}" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "tts-1",
    "input": "你好，欢迎使用章鱼中枢 AI 服务平台。",
    "voice": "alloy",
    "speed": 1.0,
    "response_format": "mp3"
  }' \
  --output speech.mp3
```

### 可用的语音

| Voice | 风格 |
|-------|------|
| `alloy` | 中性 |
| `echo` | 男声 |
| `fable` | 英式 |
| `onyx` | 深沉 |
| `nova` | 温柔 |
| `shimmer` | 清晰 |
