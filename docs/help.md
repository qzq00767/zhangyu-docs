# 帮助中心

## 常见问题

### Q: 如何获取 API Key？

登录 [章鱼中枢控制台](https://zhangyuapi.com)，进入 **API Keys** 页面创建新的 API Key。

### Q: 支持哪些模型？

我们支持 OpenAI、Claude、Gemini、DeepSeek、Qwen、Llama 等多种模型。完整的模型列表请查看控制台 **模型广场**，或通过 [列出模型 API](/api/models) 获取。

### Q: 如何使用流式返回？

在请求中添加 `"stream": true` 参数即可启用 SSE 流式返回。详见 [Chat（流式返回）](/api/chat)。

### Q: Base URL 在哪里找？

登录控制台后，在首页或 API Keys 页面可以看到您的专属 Base URL。详情请查看 [获取 Base URL 和 API Key](/guide/base-url)。

### Q: 如何计算费用？

我们采用按量计费模式，根据实际消耗的 token 数量计费。不同模型的价格不同，请参考控制台 **模型广场** 中的定价信息。

### Q: 支持批量请求吗？

支持。您可以通过 Batch API 提交批量请求，享受更低的成本。

### Q: API Key 泄露了怎么办？

请立即登录控制台，在 API Keys 管理页面删除泄露的 Key，并创建新的 Key。

### Q: 数据安全吗？

我们不会使用您的数据训练模型，也不会与第三方分享您的数据。所有传输均通过 HTTPS 加密。

### Q: 技术支持联系方式？

- **Discord 社区**：[https://discord.gg/wNJGVjBZaH](https://discord.gg/wNJGVjBZaH)
- **在线客服**：登录控制台后右下角客服图标

## 错误码参考

| HTTP 状态码 | 错误类型 | 说明 |
|:----------:|---------|------|
| 200 | - | 请求成功 |
| 400 | `invalid_request_error` | 请求参数错误 |
| 401 | `authentication_error` | API Key 无效或已过期 |
| 402 | `insufficient_quota` | 余额不足 |
| 403 | `permission_error` | 无权限访问该模型 |
| 404 | `not_found_error` | 资源不存在（模型、端点） |
| 429 | `rate_limit_error` | 请求频率超限 |
| 500 | `server_error` | 服务端错误 |
| 503 | `service_unavailable` | 服务暂时不可用 |

### 错误响应格式

```json
{
  "error": {
    "message": "Insufficient balance. Please recharge.",
    "type": "insufficient_quota",
    "code": "insufficient_quota"
  }
}
```

## 速率限制

为防止滥用，我们对 API 调用进行了速率限制：

| 用户类型 | 速率限制 |
|---------|---------|
| 免费用户 | 10 次/分钟 |
| 普通用户 | 60 次/分钟 |
| 高级用户 | 300 次/分钟 |
| 企业用户 | 自定义 |

超出限制时会返回 `429 Too Many Requests`。建议实现指数退避重试逻辑。

```python
import time

def api_call_with_retry(max_retries=3):
    for attempt in range(max_retries):
        response = make_api_call()
        if response.status_code == 429:
            wait_time = 2 ** attempt  # 指数退避
            time.sleep(wait_time)
            continue
        return response
```
