# Python SDK

推荐通过环境变量保存 API Key 和模型 ID。示例使用官方 OpenAI 与 Anthropic SDK。

## 环境变量

```bash
export ZHANGYU_API_KEY="YOUR_API_KEY"
export ZHANGYU_MODEL_ID="YOUR_MODEL_ID"
```

Windows PowerShell：

```powershell
$env:ZHANGYU_API_KEY="YOUR_API_KEY"
$env:ZHANGYU_MODEL_ID="YOUR_MODEL_ID"
```

## OpenAI SDK

```bash
pip install openai
```

```python
import os
from openai import OpenAI

client = OpenAI(
    base_url="https://api.zhangyuapi.com/v1",
    api_key=os.environ["ZHANGYU_API_KEY"],
)

response = client.chat.completions.create(
    model=os.environ["ZHANGYU_MODEL_ID"],
    messages=[{"role": "user", "content": "请用一句话介绍你自己。"}],
)
print(response.choices[0].message.content)
```

### 流式调用

```python
stream = client.chat.completions.create(
    model=os.environ["ZHANGYU_MODEL_ID"],
    messages=[{"role": "user", "content": "写一段简短的欢迎语。"}],
    stream=True,
)

for chunk in stream:
    if chunk.choices and chunk.choices[0].delta.content:
        print(chunk.choices[0].delta.content, end="", flush=True)
```

## Anthropic SDK

Anthropic SDK 的 Base URL 不带 `/v1`：

```bash
pip install anthropic
```

```python
import os
from anthropic import Anthropic

client = Anthropic(
    base_url="https://api.zhangyuapi.com",
    api_key=os.environ["ZHANGYU_API_KEY"],
)

message = client.messages.create(
    model=os.environ["ZHANGYU_MODEL_ID"],
    max_tokens=1024,
    messages=[{"role": "user", "content": "解释机器学习的基本概念。"}],
)
print(message.content[0].text)
```

## requests

```python
import os
import requests

response = requests.post(
    "https://api.zhangyuapi.com/v1/chat/completions",
    headers={"Authorization": f"Bearer {os.environ['ZHANGYU_API_KEY']}"},
    json={
        "model": os.environ["ZHANGYU_MODEL_ID"],
        "messages": [{"role": "user", "content": "Hello!"}],
    },
    timeout=120,
)
response.raise_for_status()
print(response.json())
```

::: tip 模型 ID
请从 [模型广场](https://zhangyuapi.com/pricing) 或 `/v1/models` 获取模型 ID，不要长期依赖示例中的固定名称。
:::
