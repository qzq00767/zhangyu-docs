# <span class="api-method post">POST</span> 创建模型响应（流式返回）

使用 Responses API 流式返回结果。

## 接口地址

```bash
POST https://zhangyuapi.com/v1/responses
```

## 请求示例

```bash
curl -X POST "https://zhangyuapi.com/v1/responses" \
  -H "Authorization: Bearer {{API_KEY}}" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "gpt-4o",
    "input": "写一篇关于人工智能的短文。",
    "stream": true
  }'
```

参数与 [创建模型响应](/api/responses) 一致，只需设置 `"stream": true`。
