# RAG — 嵌入（Embeddings）

将文本转换为向量表示，用于语义搜索、聚类等任务。

## <span class="api-method post">POST</span> 创建嵌入

### 接口地址

```bash
POST https://zhangyuapi.com/v1/embeddings
```

### 请求示例

```bash
curl -X POST "https://zhangyuapi.com/v1/embeddings" \
  -H "Authorization: Bearer {{API_KEY}}" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "text-embedding-3-small",
    "input": "章鱼中枢是一个 AI 模型 API 聚合平台。",
    "encoding_format": "float"
  }'
```

### 参数说明

| 参数 | 类型 | 必填 | 说明 |
|------|------|:----:|------|
| `model` | string | ✅ | 嵌入模型名称 |
| `input` | string/array | ✅ | 输入文本（支持批量） |
| `encoding_format` | string | - | `float`（默认）或 `base64` |
| `dimensions` | integer | - | 输出向量维度（部分模型支持） |

### 响应示例

```json
{
  "object": "list",
  "data": [
    {
      "object": "embedding",
      "index": 0,
      "embedding": [0.01, -0.02, 0.03, ...]
    }
  ],
  "model": "text-embedding-3-small",
  "usage": {
    "prompt_tokens": 12,
    "total_tokens": 12
  }
}
```

### 支持的嵌入模型

| 模型 | 维度 | 说明 |
|------|:----:|------|
| `text-embedding-3-small` | 1536 | 高性价比、快速 |
| `text-embedding-3-large` | 3072 | 更高质量 |
| `text-embedding-ada-002` | 1536 | 经典模型 |

## 嵌入对象

### 对象结构

| 字段 | 类型 | 说明 |
|------|------|------|
| `object` | string | 固定为 `embedding` |
| `index` | integer | 输入中的索引位置 |
| `embedding` | array | 向量浮点数数组 |
