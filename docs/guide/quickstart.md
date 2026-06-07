# 快速上手

本文档将引导您快速接入章鱼中枢 API 服务。

## 前置条件

- 已注册章鱼中枢账号（访问 [zhangyuapi.com](https://zhangyuapi.com) 注册）
- 已获取有效的 API Key

## 三步接入

### 第一步：获取 API Key 和 Base URL

1. 登录 [章鱼中枢控制台](https://zhangyuapi.com)
2. 进入 **API Keys** 管理页面
3. 创建新的 API Key，复制并妥善保存
4. 在控制台首页获取您的 **Base URL**

### 第二步：选择模型

访问控制台的 **模型广场**，浏览可用模型列表，找到您需要的模型名称（如 `gpt-4o`、`claude-sonnet-4-6` 等）。

### 第三步：发送请求

以下是最基础的聊天补全请求示例：

::: code-group

```bash [curl]
curl -X POST "https://{{BASE_URL}}/v1/chat/completions" \
  -H "Authorization: Bearer {{API_KEY}}" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "gpt-4o",
    "messages": [
      {"role": "system", "content": "你是一个有用的助手。"},
      {"role": "user", "content": "你好，请介绍一下自己。"}
    ]
  }'
```

```python [Python]
import requests

url = "https://{{BASE_URL}}/v1/chat/completions"
headers = {
    "Authorization": "Bearer {{API_KEY}}",
    "Content-Type": "application/json"
}
data = {
    "model": "gpt-4o",
    "messages": [
        {"role": "system", "content": "你是一个有用的助手。"},
        {"role": "user", "content": "你好，请介绍一下自己。"}
    ]
}

response = requests.post(url, headers=headers, json=data)
print(response.json())
```

```javascript [Node.js]
const response = await fetch("https://{{BASE_URL}}/v1/chat/completions", {
  method: "POST",
  headers: {
    "Authorization": "Bearer {{API_KEY}}",
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    model: "gpt-4o",
    messages: [
      { role: "system", content: "你是一个有用的助手。" },
      { role: "user", content: "你好，请介绍一下自己。" }
    ]
  })
});

const data = await response.json();
console.log(data);
```

:::

## 流式返回

如需流式返回（Server-Sent Events），添加 `"stream": true` 参数：

```bash
curl -X POST "https://{{BASE_URL}}/v1/chat/completions" \
  -H "Authorization: Bearer {{API_KEY}}" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "gpt-4o",
    "messages": [{"role": "user", "content": "写一首诗"}],
    "stream": true
  }'
```

## 支持的协议

章鱼中枢完全兼容以下接口协议：

| 协议 | 兼容模式 | 说明 |
|------|---------|------|
| OpenAI | `/v1/chat/completions` | 聊天补全 |
| OpenAI | `/v1/embeddings` | 文本嵌入 |
| OpenAI | `/v1/models` | 模型列表 |
| OpenAI | `/v1/audio/*` | 音频接口 |
| OpenAI | `/v1/images/*` | 图片生成 |
| Claude | `/v1/messages` | Anthropic Messages |
| Gemini | `/v1beta/models/*` | Google Gemini |

## 下一步

- 查看 [获取 Base URL 和 API Key](/guide/base-url) 了解鉴权详情
- 查看 [Chat 接口文档](/api/chat) 了解完整参数
- 查看 [列出模型](/api/models) 了解可用模型
