# 文件上传（Files）

上传文件到章鱼中枢，用于微调、RAG 等场景。

## <span class="api-method post">POST</span> 上传文件

### 接口地址

```bash
POST https://zhangyuapi.com/v1/files
```

### 请求示例

```bash
curl -X POST "https://zhangyuapi.com/v1/files" \
  -H "Authorization: Bearer {{API_KEY}}" \
  -F "file=@training_data.jsonl" \
  -F "purpose=fine-tune"
```

### 参数说明

| 参数 | 类型 | 必填 | 说明 |
|------|------|:----:|------|
| `file` | file | ✅ | 要上传的文件 |
| `purpose` | string | ✅ | 文件用途 |

### Purpose 可选值

| 值 | 说明 |
|------|------|
| `fine-tune` | 模型微调训练数据 |
| `assistants` | Assistant API 文件 |
| `batch` | 批处理输入文件 |
| `vision` | 视觉模型的参考图片 |

## <span class="api-method get">GET</span> 列出文件

```bash
curl "https://zhangyuapi.com/v1/files" \
  -H "Authorization: Bearer {{API_KEY}}"
```

## <span class="api-method get">GET</span> 获取文件信息

```bash
curl "https://zhangyuapi.com/v1/files/{file_id}" \
  -H "Authorization: Bearer {{API_KEY}}"
```

## <span class="api-method delete">DELETE</span> 删除文件

```bash
curl -X DELETE "https://zhangyuapi.com/v1/files/{file_id}" \
  -H "Authorization: Bearer {{API_KEY}}"
```

## 文件大小限制

| 用途 | 最大文件大小 |
|------|:----------:|
| `fine-tune` | 512 MB |
| `assistants` | 512 MB |
| `batch` | 200 MB |
| `vision` | 20 MB |
