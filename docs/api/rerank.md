# RAG — 重排序（Reranker）

对搜索结果进行语义重排序，提升 RAG 检索质量。

## <span class="api-method post">POST</span> 重排序

### 接口地址

```bash
POST https://{{BASE_URL}}/v1/rerank
```

### 请求示例

```bash
curl -X POST "https://{{BASE_URL}}/v1/rerank" \
  -H "Authorization: Bearer {{API_KEY}}" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "bge-reranker-v2-m3",
    "query": "什么是量子计算？",
    "documents": [
      "量子计算是利用量子力学原理进行计算的技术。",
      "经典计算机使用二进制位进行计算。",
      "人工智能是计算机科学的一个分支。"
    ],
    "top_n": 2
  }'
```

### 参数说明

| 参数 | 类型 | 必填 | 说明 |
|------|------|:----:|------|
| `model` | string | ✅ | 重排序模型名称 |
| `query` | string | ✅ | 查询文本 |
| `documents` | array | ✅ | 待排序的文档列表 |
| `top_n` | integer | - | 返回前 N 个结果 |
| `return_documents` | boolean | - | 是否返回文档原文，默认 `true` |

### 响应示例

```json
{
  "object": "list",
  "model": "bge-reranker-v2-m3",
  "results": [
    {
      "index": 0,
      "relevance_score": 0.95,
      "document": "量子计算是利用量子力学原理进行计算的技术。"
    },
    {
      "index": 2,
      "relevance_score": 0.12,
      "document": "人工智能是计算机科学的一个分支。"
    }
  ]
}
```

### 使用场景

- **RAG 优化**：对向量检索的候选文档重排序，将最相关的结果优先送给 LLM
- **搜索引擎**：提升搜索结果的相关性排序
- **问答系统**：精确定位最匹配的文档片段
