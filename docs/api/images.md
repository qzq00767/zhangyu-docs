# 绘图模型

通过 API 生成和编辑图片。

## <span class="api-method post">POST</span> 生成图片

### 接口地址

```bash
POST https://zhangyuapi.com/v1/images/generations
```

### 请求示例

```bash
curl -X POST "https://zhangyuapi.com/v1/images/generations" \
  -H "Authorization: Bearer {{API_KEY}}" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "dall-e-3",
    "prompt": "一只柴犬在阳光下的草地上奔跑",
    "n": 1,
    "size": "1024x1024",
    "quality": "standard",
    "style": "vivid"
  }'
```

### 参数说明

| 参数 | 类型 | 必填 | 说明 |
|------|------|:----:|------|
| `model` | string | ✅ | 模型名称 |
| `prompt` | string | ✅ | 图片描述文本 |
| `n` | integer | - | 生成数量（1-10） |
| `size` | string | - | 图片尺寸 |
| `quality` | string | - | `standard` 或 `hd` |
| `style` | string | - | `vivid`（生动）或 `natural`（自然） |
| `response_format` | string | - | `url` 或 `b64_json` |

### 响应示例

```json
{
  "created": 1700000000,
  "data": [
    {
      "url": "https://...png",
      "revised_prompt": "一只柴犬在阳光明媚的草地上奔跑..."
    }
  ]
}
```

## <span class="api-method post">POST</span> 编辑图片

```bash
POST https://zhangyuapi.com/v1/images/edits
```

## 支持的模型

| 模型 | 功能 |
|------|------|
| `dall-e-3` | 图片生成 |
| `dall-e-2` | 图片生成 + 编辑 |
| `flux` | 图片生成 |
| `midjourney` | 图片生成 |
