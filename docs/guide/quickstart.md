# 快速上手

本页带您完成账号准备、模型选择和首个 API 请求。

::: danger 服务范围
本平台不向中国大陆地区用户提供服务。请先确认您符合 [用户协议](/legal/user-agreement) 规定的使用资格。
:::

## 准备工作

开始前，请确认您已经：

- 登录 [章鱼公益平台控制台](https://zhangyuapi.com/dashboard)；
- 在 [API 密钥](https://zhangyuapi.com/keys) 页面创建了 Key；
- 在 [模型广场](https://zhangyuapi.com/pricing) 找到了准备调用的模型 ID；
- 确认账号状态和余额可以正常调用。

## 第一步：创建 API Key

1. 打开 [API 密钥页面](https://zhangyuapi.com/keys)。
2. 点击“新建”，按用途填写名称，并根据需要设置额度、分组和有效期。
3. 复制生成的 Key，并保存到密码管理器或服务端环境变量中。

::: warning 请保护 API Key
不要把 Key 提交到 Git 仓库，也不要写入网页、浏览器扩展或移动应用的前端代码。Key 泄露后，请立即在控制台禁用并重新创建。
:::

## 第二步：确认模型 ID

模型会随平台配置更新，请勿仅依赖文档中的示例名称。推荐通过模型广场复制模型 ID，也可以调用 Models API：

```bash
curl "https://api.zhangyuapi.com/v1/models" \
  -H "Authorization: Bearer YOUR_API_KEY"
```

从返回结果的 `data[].id` 中选择模型，并在后续请求中原样填写。

## 第三步：发送请求

将示例中的 `YOUR_API_KEY` 和 `YOUR_MODEL_ID` 替换为真实值。

::: code-group

```bash [curl]
curl "https://api.zhangyuapi.com/v1/chat/completions" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "YOUR_MODEL_ID",
    "messages": [
      {"role": "system", "content": "你是一个简洁、可靠的助手。"},
      {"role": "user", "content": "请用一句话介绍你自己。"}
    ]
  }'
```

```python [Python]
import os
import requests

response = requests.post(
    "https://api.zhangyuapi.com/v1/chat/completions",
    headers={"Authorization": f"Bearer {os.environ['ZHANGYU_API_KEY']}"},
    json={
        "model": os.environ["ZHANGYU_MODEL_ID"],
        "messages": [{"role": "user", "content": "请用一句话介绍你自己。"}],
    },
    timeout=120,
)
response.raise_for_status()
print(response.json()["choices"][0]["message"]["content"])
```

```javascript [Node.js]
const response = await fetch('https://api.zhangyuapi.com/v1/chat/completions', {
  method: 'POST',
  headers: {
    Authorization: `Bearer ${process.env.ZHANGYU_API_KEY}`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    model: process.env.ZHANGYU_MODEL_ID,
    messages: [{ role: 'user', content: '请用一句话介绍你自己。' }]
  })
});

if (!response.ok) throw new Error(`${response.status}: ${await response.text()}`);
const data = await response.json();
console.log(data.choices[0].message.content);
```

:::

## 启用流式返回

请求中加入 `"stream": true` 即可使用 SSE 流式返回：

```json
{
  "model": "YOUR_MODEL_ID",
  "messages": [{"role": "user", "content": "写一段简短的欢迎语。"}],
  "stream": true
}
```

流以 `data: [DONE]` 结束。不同客户端对 SSE 的解析方式不同，详见 [Chat 流式接口](/api/chat)。

## 如何确认接入成功

- HTTP 状态码为 `200`；
- 非流式响应包含 `choices`，流式响应持续返回 `data:` 事件；
- [使用日志](https://zhangyuapi.com/usage-logs/common) 中能看到本次请求；
- 记录的模型、Token 用量和费用符合预期。

如果请求失败，请依次检查 Key、模型 ID、Base URL、余额和请求参数。常见状态码请查看 [帮助中心](/help)。

## 下一步

- [API 地址与密钥](/guide/base-url)
- [从 OpenAI 迁移](/guide/migration)
- [生产接入建议](/guide/best-practices)
- [Python SDK](/sdk/python) 或 [Node.js SDK](/sdk/nodejs)
