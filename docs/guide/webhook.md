# 通知设置 — WebHook 参数介绍

通过配置 WebHook，您可以实时接收章鱼中枢的重要通知。

## 配置 WebHook

1. 登录 [章鱼中枢控制台](https://zhangyuapi.com)
2. 进入 **设置 → 通知设置**
3. 填入您的 WebHook URL
4. 选择需要订阅的事件类型
5. 点击保存

## 事件类型

| 事件 | 触发条件 | 说明 |
|------|---------|------|
| `balance.low` | 余额低于设定阈值 | 余额不足告警 |
| `key.expiring` | API Key 即将到期 | 到期前 7 天/3 天/1 天通知 |
| `quota.exceeded` | 额度已用尽 | 额度用尽通知 |
| `payment.success` | 充值成功 | 充值到账确认 |

## WebHook 请求格式

章鱼中枢使用 HTTP POST 发送 JSON 格式的通知：

```json
{
  "event": "balance.low",
  "timestamp": "2026-01-01T00:00:00Z",
  "data": {
    "current_balance": 0.50,
    "threshold": 1.00,
    "currency": "USD"
  }
}
```

## 验证签名

每个 WebHook 请求头中携带签名，用于验证请求来源：

```bash
X-Zhangyu-Signature: sha256=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

验证方式：

```python
import hmac
import hashlib

def verify_signature(payload: bytes, signature: str, secret: str) -> bool:
    expected = hmac.new(
        secret.encode(),
        payload,
        hashlib.sha256
    ).hexdigest()
    return hmac.compare_digest(f"sha256={expected}", signature)
```

::: tip 提示
WebHook Secret 在通知设置页面可以获取/重置。
:::

## 重试机制

如果您的 WebHook 端点返回非 200 状态码，系统将按以下策略重试：

- 第 1 次重试：1 分钟后
- 第 2 次重试：5 分钟后
- 第 3 次重试：15 分钟后
- 第 4 次重试：1 小时后

连续 4 次失败后，该 WebHook 将被暂停，您需要在控制台手动重新激活。
