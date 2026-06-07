# 搜索 GPTs

搜索可用的 GPTs 应用。

## <span class="api-method get">GET</span> 通过关键词搜索

```bash
GET https://zhangyuapi.com/v1/gpts/search?q=编程&limit=10
```

## <span class="api-method get">GET</span> 通过 ID 搜索

```bash
GET https://zhangyuapi.com/v1/gpts/g-xxxxxxxxxxxx
```

## 响应示例

```json
{
  "object": "list",
  "data": [
    {
      "id": "g-xxxxxxxxxxxx",
      "name": "编程助手",
      "description": "帮助解决编程问题的 GPTs",
      "category": "编程",
      "author": "社区",
      "created_at": "2024-01-01T00:00:00Z"
    }
  ]
}
```
