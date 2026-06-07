# Node.js 配置方式

本文介绍如何在 Node.js 项目中使用章鱼中枢 API。

## 使用官方 OpenAI SDK

安装依赖：

```bash
npm install openai
```

```javascript
import OpenAI from 'openai';

const client = new OpenAI({
  baseURL: 'https://{{BASE_URL}}/v1',
  apiKey: '{{API_KEY}}'
});

// 聊天补全
const response = await client.chat.completions.create({
  model: 'gpt-4o',
  messages: [
    { role: 'system', content: '你是一个有用的助手。' },
    { role: 'user', content: '你好！' }
  ]
});

console.log(response.choices[0].message.content);
```

## 流式调用

```javascript
const stream = await client.chat.completions.create({
  model: 'gpt-4o',
  messages: [{ role: 'user', content: '写一首诗' }],
  stream: true
});

for await (const chunk of stream) {
  const content = chunk.choices[0]?.delta?.content;
  if (content) process.stdout.write(content);
}
```

## 使用 Anthropic SDK

```bash
npm install @anthropic-ai/sdk
```

```javascript
import Anthropic from '@anthropic-ai/sdk';

const client = new Anthropic({
  baseURL: 'https://{{BASE_URL}}/v1',
  apiKey: '{{API_KEY}}'
});

const message = await client.messages.create({
  model: 'claude-sonnet-4-6',
  max_tokens: 1024,
  messages: [
    { role: 'user', content: '解释机器学习。' }
  ]
});

console.log(message.content[0].text);
```

## 使用原生 fetch

```javascript
const response = await fetch('https://{{BASE_URL}}/v1/chat/completions', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer {{API_KEY}}',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    model: 'gpt-4o',
    messages: [{ role: 'user', content: 'Hello!' }]
  })
});

const data = await response.json();
console.log(data);
```

## 环境变量配置

推荐使用 `.env` 文件：

```bash
ZHANGYU_API_KEY=sk-xxxxxxxxxxxxxxxx
ZHANGYU_BASE_URL=https://your-base-url.com
```

```javascript
import OpenAI from 'openai';
import 'dotenv/config';

const client = new OpenAI({
  baseURL: process.env.ZHANGYU_BASE_URL,
  apiKey: process.env.ZHANGYU_API_KEY
});
```

::: tip 提示
章鱼中枢兼容所有支持自定义 `baseURL` 的 SDK。如遇问题请查看 [帮助中心](/help)。
:::
