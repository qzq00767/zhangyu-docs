# <span class="api-method post">POST</span> 内容审查（Moderations）

对文本内容进行安全审核，检测违规内容。

## 接口地址

```bash
POST https://{{BASE_URL}}/v1/moderations
```

## 请求示例

```bash
curl -X POST "https://{{BASE_URL}}/v1/moderations" \
  -H "Authorization: Bearer {{API_KEY}}" \
  -H "Content-Type: application/json" \
  -d '{
    "input": "需要审核的文本内容。"
  }'
```

## 响应示例

```json
{
  "id": "modr-xxx",
  "model": "text-moderation-stable",
  "results": [
    {
      "flagged": false,
      "categories": {
        "sexual": false,
        "hate": false,
        "harassment": false,
        "self-harm": false,
        "sexual/minors": false,
        "hate/threatening": false,
        "violence/graphic": false,
        "self-harm/intent": false,
        "self-harm/instructions": false,
        "harassment/threatening": false,
        "violence": false
      },
      "category_scores": {
        "sexual": 0.0001,
        "hate": 0.0002,
        "harassment": 0.0003,
        "self-harm": 0.0001,
        "sexual/minors": 0.0,
        "hate/threatening": 0.0001,
        "violence/graphic": 0.0001,
        "self-harm/intent": 0.0,
        "self-harm/instructions": 0.0,
        "harassment/threatening": 0.0001,
        "violence": 0.0002
      }
    }
  ]
}
```

## 响应字段

| 字段 | 类型 | 说明 |
|------|------|------|
| `id` | string | 审核请求 ID |
| `model` | string | 使用的审核模型 |
| `results[].flagged` | boolean | 是否命中审核 |
| `results[].categories` | object | 各类别是否命中 |
| `results[].category_scores` | object | 各类别的置信度分数（0-1） |

## 审核类别

| 类别 | 说明 |
|------|------|
| `sexual` | 性相关内容 |
| `hate` | 仇恨言论 |
| `harassment` | 骚扰内容 |
| `self-harm` | 自残相关内容 |
| `violence` | 暴力内容 |
| `sexual/minors` | 涉及未成年人的性内容 |
| `hate/threatening` | 威胁性仇恨言论 |
| `violence/graphic` | 图片暴力内容 |

::: warning 合规提示
内容审核接口是合规工具之一，不替代部署方自身安全治理义务和上游内容政策要求。面向公众服务应建立滥用举报、日志审计和处置机制。
:::
