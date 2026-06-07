# Python 配置方式

本文介绍如何在 Python 项目中使用章鱼中枢 API。

## 使用官方 OpenAI SDK

章鱼中枢完全兼容 OpenAI SDK，只需修改 `base_url` 和 `api_key`：

```python
from openai import OpenAI

client = OpenAI(
    base_url="https://zhangyuapi.com/v1",
    api_key="{{API_KEY}}"
)

# 聊天补全
response = client.chat.completions.create(
    model="gpt-4o",
    messages=[
        {"role": "system", "content": "你是一个有用的助手。"},
        {"role": "user", "content": "你好！"}
    ]
)

print(response.choices[0].message.content)
```

## 流式调用

```python
stream = client.chat.completions.create(
    model="gpt-4o",
    messages=[{"role": "user", "content": "写一首关于春天的诗"}],
    stream=True
)

for chunk in stream:
    if chunk.choices[0].delta.content:
        print(chunk.choices[0].delta.content, end="")
```

## 使用 Anthropic SDK

```python
from anthropic import Anthropic

client = Anthropic(
    base_url="https://zhangyuapi.com/v1",
    api_key="{{API_KEY}}"
)

message = client.messages.create(
    model="claude-sonnet-4-6",
    max_tokens=1024,
    messages=[
        {"role": "user", "content": "解释机器学习的基本概念。"}
    ]
)

print(message.content[0].text)
```

## 使用 requests 库

```python
import requests

url = "https://zhangyuapi.com/v1/chat/completions"
headers = {
    "Authorization": "Bearer {{API_KEY}}",
    "Content-Type": "application/json"
}
data = {
    "model": "gpt-4o",
    "messages": [{"role": "user", "content": "Hello!"}]
}

response = requests.post(url, headers=headers, json=data)
print(response.json())
```

## 环境变量配置

推荐使用环境变量管理 API Key：

```bash
export ZHANGYU_API_KEY="sk-xxxxxxxxxxxxxxxx"
export ZHANGYU_BASE_URL="https://your-base-url.com"
```

```python
import os
from openai import OpenAI

client = OpenAI(
    base_url=os.getenv("ZHANGYU_BASE_URL"),
    api_key=os.getenv("ZHANGYU_API_KEY")
)
```

::: tip 提示
更多 SDK 支持请查看各模型的 SDK 文档。章鱼中枢兼容所有支持自定义 `base_url` 的客户端。
:::
