# Dify、n8n 与工作流工具

## Dify

1. 打开 **设置 → 模型供应商**。
2. 添加 OpenAI Compatible 类型的供应商。
3. 填写：

| 设置项 | 值 |
|--------|-----|
| API Base URL | `https://api.zhangyuapi.com/v1` |
| API Key | 在平台创建的独立 Key |
| Model ID | 从模型广场复制的模型 ID |

对话模型和嵌入模型需要分别添加，并确认对应模型支持所需端点。Dify 知识库文件由 Dify 自己存储，与平台的 Files API 支持情况无关。

## n8n

使用 OpenAI 节点时，可在凭证或节点设置中配置自定义 Base URL。若当前节点不支持自定义地址，请改用 HTTP Request 节点：

```http
POST https://api.zhangyuapi.com/v1/chat/completions
Authorization: Bearer YOUR_API_KEY
Content-Type: application/json
```

## 其他工作流平台

任何支持自定义 HTTP 请求的平台都可以按对应 API 文档调用。请把 Key 存放在平台的凭证管理或 Secret 中，不要直接写进可公开查看的工作流定义。

::: tip 上线前验证
分别验证超时、重试、并发、错误分支和费用上限。工作流平台的自动重试可能产生重复请求和重复扣费。
:::
