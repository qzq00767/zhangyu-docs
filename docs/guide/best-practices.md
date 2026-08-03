# 生产接入建议

本页提供一套稳妥的生产接入基线。具体超时、并发和重试次数应根据模型、请求大小与业务容忍度调整。

## 保护 API Key

::: danger 禁止在客户端暴露 Key
不要把 API Key 写入网页、浏览器扩展、移动 App、桌面安装包或公开仓库。前端应用应调用您自己的后端，由后端访问模型 API。
:::

- 为开发、测试和生产环境创建不同 Key；
- 为不同应用设置独立额度和有效期；
- 使用环境变量或密钥管理服务保存 Key；
- 日志中只保留 Key 的少量掩码字符；
- 发现泄露时立即在控制台禁用并更换。

```bash
ZHANGYU_API_KEY=YOUR_API_KEY
ZHANGYU_BASE_URL=https://api.zhangyuapi.com/v1
ZHANGYU_MODEL_ID=YOUR_MODEL_ID
```

## 设置超时

以下数值仅作为初始参考：

| 场景 | 建议起点 | 说明 |
|------|:--------:|------|
| 建立连接 | 10-20 秒 | 网络或 DNS 异常时快速失败 |
| 普通非流式对话 | 120 秒 | 推理模型可能需要更长时间 |
| 流式对话 | 300 秒 | 同时设置首包超时和总超时 |
| 图片生成 | 180-600 秒 | 分辨率越高通常越慢 |
| 音频转录 | 120-600 秒 | 与文件长度和大小有关 |
| 视频生成 | 使用异步任务 | 提交后轮询状态，不要保持长连接 |

```python
import httpx
from openai import OpenAI

client = OpenAI(
    base_url="https://api.zhangyuapi.com/v1",
    api_key="YOUR_API_KEY",
    timeout=httpx.Timeout(300, connect=15),
)
```

## 谨慎重试

重试会创建新的上游请求，可能导致重复生成、重复扣费或业务副作用。只对确定可重试的错误执行有限重试。

| 情况 | 建议 |
|------|------|
| `429` | 读取 `Retry-After`，使用指数退避和随机抖动 |
| `500`、`502`、`503` | 可有限重试，建议最多 2-3 次 |
| 连接失败且尚未收到响应 | 可有限重试 |
| `400`、`401`、`403`、`404` | 不重试，先修正参数、权限或地址 |
| `504`、`524` | 默认不要自动重试；上游可能已经开始处理并产生费用 |

```python
import random
import time
import requests

def post_with_retry(url, headers, payload, max_attempts=3):
    for attempt in range(max_attempts):
        response = requests.post(url, headers=headers, json=payload, timeout=120)
        if response.status_code not in {429, 500, 502, 503}:
            response.raise_for_status()
            return response
        if attempt == max_attempts - 1:
            response.raise_for_status()
        retry_after = response.headers.get("Retry-After")
        delay = float(retry_after) if retry_after else 2 ** attempt + random.random()
        time.sleep(delay)
```

## 控制并发

- 从较小并发开始，根据实际延迟、错误率和 `429` 调整；
- 使用队列、信号量或令牌桶限制并发；
- 为长任务和实时对话设置不同的并发池；
- 避免所有实例在同一时刻重试，可加入随机抖动；
- 不要把某个固定并发值视为所有模型的通用上限。

## 记录可排查日志

建议记录：

- 请求时间、模型 ID、端点和 HTTP 状态码；
- 平台或上游返回的请求 ID；
- 首 Token 延迟、总耗时和重试次数；
- 输入与输出 Token、费用和调用方标识；
- 脱敏后的错误信息。

不要记录完整 API Key。请求正文可能包含个人信息、商业数据或其他敏感内容，应默认不记录，确需记录时应脱敏并设置较短保存期限。

## 控制成本

- 在模型广场确认模型单价和计费单位；
- 为不同应用设置独立 Key 和额度；
- 限制最大输出 Token，避免无边界生成；
- 对重复、可缓存的结果使用业务缓存；
- 定期核对 [使用日志](https://zhangyuapi.com/usage-logs/common) 和 [钱包](https://zhangyuapi.com/wallet)。

## 上线前检查

- Key 未出现在源码、构建产物和日志中；
- 超时、重试和并发限制已经配置；
- 关键请求具有监控、告警和费用上限；
- 已验证目标模型的流式、工具调用及多模态能力；
- 已准备降级模型或暂停调用方案；
- 数据处理方式符合 [隐私政策](/legal/privacy-policy) 和用户所在地法律。
