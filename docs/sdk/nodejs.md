# Node.js SDK

推荐通过环境变量保存 API Key 和模型 ID。以下示例适用于支持 ES Modules 的 Node.js 项目。

## 环境变量

```bash
ZHANGYU_API_KEY=YOUR_API_KEY
ZHANGYU_MODEL_ID=YOUR_MODEL_ID
```

## OpenAI SDK

```bash
npm install openai
```

```javascript
import OpenAI from 'openai';

const client = new OpenAI({
  baseURL: 'https://api.zhangyuapi.com/v1',
  apiKey: process.env.ZHANGYU_API_KEY
});

const response = await client.chat.completions.create({
  model: process.env.ZHANGYU_MODEL_ID,
  messages: [{ role: 'user', content: '请用一句话介绍你自己。' }]
});
console.log(response.choices[0].message.content);
```

### 流式调用

```javascript
const stream = await client.chat.completions.create({
  model: process.env.ZHANGYU_MODEL_ID,
  messages: [{ role: 'user', content: '写一段简短的欢迎语。' }],
  stream: true
});

for await (const chunk of stream) {
  const content = chunk.choices[0]?.delta?.content;
  if (content) process.stdout.write(content);
}
```

## Anthropic SDK

Anthropic SDK 的 Base URL 不带 `/v1`：

```bash
npm install @anthropic-ai/sdk
```

```javascript
import Anthropic from '@anthropic-ai/sdk';

const client = new Anthropic({
  baseURL: 'https://api.zhangyuapi.com',
  apiKey: process.env.ZHANGYU_API_KEY
});

const message = await client.messages.create({
  model: process.env.ZHANGYU_MODEL_ID,
  max_tokens: 1024,
  messages: [{ role: 'user', content: '解释机器学习的基本概念。' }]
});
console.log(message.content[0].text);
```

## 原生 fetch

```javascript
const response = await fetch('https://api.zhangyuapi.com/v1/chat/completions', {
  method: 'POST',
  headers: {
    Authorization: `Bearer ${process.env.ZHANGYU_API_KEY}`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    model: process.env.ZHANGYU_MODEL_ID,
    messages: [{ role: 'user', content: 'Hello!' }]
  })
});

if (!response.ok) throw new Error(`${response.status}: ${await response.text()}`);
console.log(await response.json());
```

::: tip 模型 ID
请从 [模型广场](https://zhangyuapi.com/pricing) 或 `/v1/models` 获取模型 ID，不要长期依赖示例中的固定名称。
:::
