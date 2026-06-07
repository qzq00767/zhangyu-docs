# <span class="api-method post">POST</span> 创建模型响应（联网搜索）

使用 Responses API 的内置联网搜索工具。

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
    "input": "2024 年诺贝尔物理学奖得主是谁？",
    "tools": [
      {
        "type": "web_search_preview"
      }
    ]
  }'
```

## 搜索结果引用

开启联网搜索后，模型会在响应中包含引用来源：

```json
{
  "output": [
    {
      "type": "message",
      "content": [
        {
          "type": "output_text",
          "text": "2024 年诺贝尔物理学奖授予...",
          "annotations": [
            {
              "type": "url_citation",
              "url": "https://www.nobelprize.org/...",
              "title": "The Nobel Prize in Physics 2024"
            }
          ]
        }
      ]
    }
  ]
}
```

::: tip 提示
联网搜索会自动检索相关信息并标注来源，适合需要实时信息的场景。
:::
