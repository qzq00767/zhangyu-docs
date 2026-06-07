# 视频模型

通过 API 生成视频。

## <span class="api-method post">POST</span> 生成视频

### 接口地址

```bash
POST https://zhangyuapi.com/v1/video/generations
```

### 请求示例

```bash
curl -X POST "https://zhangyuapi.com/v1/video/generations" \
  -H "Authorization: Bearer {{API_KEY}}" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "kling-v1",
    "prompt": "一只猫在屋顶上行走",
    "duration": 5,
    "resolution": "1080p"
  }'
```

### 参数说明

| 参数 | 类型 | 必填 | 说明 |
|------|------|:----:|------|
| `model` | string | ✅ | 模型名称 |
| `prompt` | string | ✅ | 视频描述 |
| `duration` | integer | - | 视频时长（秒） |
| `resolution` | string | - | 分辨率：`720p`、`1080p` |
| `fps` | integer | - | 帧率 |

### 支持的模型

| 模型 | 来源 | 说明 |
|------|------|------|
| `kling-v1` | 快手可灵 | 高质量文生视频 |
| `kling-v1-5` | 快手可灵 | 可灵 1.5 版本 |
| `veo-3` | Google | Google Veo 视频模型 |
| `sora` | OpenAI | OpenAI 视频模型 |

### 查询视频生成状态

```bash
GET https://zhangyuapi.com/v1/video/generations/{task_id}
```

::: tip 提示
视频生成通常需要较长时间（数分钟到数十分钟），建议使用异步轮询方式获取结果。
:::
