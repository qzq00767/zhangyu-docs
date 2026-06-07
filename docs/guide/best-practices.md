# 生产接入建议

在正式项目中使用章鱼中枢 API 的最佳实践。

## 安全

### 不要把 API Key 放在客户端

::: danger 警告
绝对不要将 API Key 硬编码在前端网页、移动 App 或客户端安装包中。API Key 相当于账户密码，泄露后任何人可以冒用你的额度。
:::

正确做法：
- **Web 应用**：在服务端调用 API，前端通过你自己的后端中转
- **移动 App**：通过你的后端服务中转
- **桌面应用**：使用环境变量或加密存储

### 环境变量管理

```bash
# .env（不提交到 git）
ZHANGYU_API_KEY=sk-xxxxxxxxxxxxxxxx
ZHANGYU_BASE_URL=https://your-base-url.com
```

```python
import os
from openai import OpenAI

client = OpenAI(
    base_url=os.getenv("ZHANGYU_BASE_URL"),
    api_key=os.getenv("ZHANGYU_API_KEY")
)
```

### API Key 轮换

- 为不同应用创建独立的 API Key
- 定期（建议每季度）轮换 Key
- 在控制台设置 Key 的额度和有效期限制

---

## 超时设置

不同接口的推荐超时时间：

| 接口 | 推荐超时 | 说明 |
|------|:------:|------|
| Chat（非流式） | 120s | 正常对话响应快 |
| Chat（流式） | 300s | 首 token 超时设置 |
| 图片 1K | 180s | Imagine2 1K 分辨率 |
| 图片 2K | 300s | 中等分辨率 |
| 图片 4K | 600s | 高分辨率，耗时长 |
| 视频生成 | 600s+ | 异步任务，建议轮询 |
| 嵌入 | 60s | 通常很快 |
| 音频转录 | 120s | 取决于音频长度 |

```python
from openai import OpenAI
import httpx

client = OpenAI(
    base_url="https://{{BASE_URL}}/v1",
    api_key="sk-xxx",
    timeout=httpx.Timeout(300.0, connect=10.0)  # 300s 总超时
)
```

---

## 重试与错误处理

### 指数退避

```python
import time
from openai import OpenAI

def call_with_retry(messages, max_retries=3):
    for attempt in range(max_retries):
        try:
            response = client.chat.completions.create(
                model="gpt-4o",
                messages=messages
            )
            return response
        except Exception as e:
            if attempt == max_retries - 1:
                raise
            wait = 2 ** attempt  # 1s, 2s, 4s...
            time.sleep(wait)
```

### 可重试错误

| 错误类型 | 建议 |
|---------|------|
| 429 Rate Limit | 等待后重试，使用指数退避 |
| 5xx Server Error | 重试，间隔递增 |
| Connection Error | 重试，最多 3 次 |
| 401 Unauthorized | 不重试，检查 API Key |
| 400 Bad Request | 不重试，检查参数 |

---

## 图片接口建议

1. **默认使用 `response_format=url`**：不要默认使用 `b64_json`，会显著增加响应体积
2. **及时下载保存**：拿到 URL 后尽快下载保存，URL 不保证永久有效
3. **模型和尺寸匹配**：4K 图使用 `gpt-image-2-4k` 并传入 4K 尺寸

```bash
# ✅ 推荐
curl ... -d '{"model":"gpt-image-2-1k","response_format":"url"}'

# ❌ 不推荐（响应体积大、解析慢）
curl ... -d '{"model":"gpt-image-2-1k","response_format":"b64_json"}'
```

---

## 视频接口建议

1. **使用任务轮询**：不要依赖长连接等待到底
2. **提交 → 查询 → 下载** 标准三步骤
3. **记录 task_id**：方便后续查询和排查

```python
# 1. 提交任务
task = submit_video_generation(prompt, model="grok-imagine-video")

# 2. 轮询状态
while True:
    status = check_task_status(task.id)
    if status == "completed":
        break
    time.sleep(5)

# 3. 下载结果
download_video(task.id, output_path="result.mp4")
```

---

## 并发控制

- 控制并发请求数，避免触发速率限制
- 建议单个 API Key 并发不超过 10
- 大批量任务使用队列 + 限速器

```python
import asyncio
from asyncio import Semaphore

sem = Semaphore(5)  # 最多 5 个并发

async def limited_call(messages):
    async with sem:
        return await async_client.chat.completions.create(
            model="gpt-4o",
            messages=messages
        )
```

---

## 日志记录

建议记录以下信息方便排查：

- 模型名称
- 请求参数（input 内容可按需脱敏）
- 响应 ID
- 耗时
- Token 消耗
- 错误信息（如有）
