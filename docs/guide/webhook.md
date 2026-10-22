# 余额通知与 Webhook

Webhook 用于接收余额或订阅额度不足通知，配置入口位于控制台的“个人资料”页面。

::: warning 功能可用范围
通知方式、余额预警阈值和 Webhook 配置项以账号页面为准。页面未提供相应配置项时，该账号暂不可使用此功能。
:::

## 配置方式

功能开放时：

1. 打开 [个人资料](https://zhangyuapi.com/profile)。
2. 在设置区域选择通知方式为 `Webhook`。
3. 填写公网可访问的 HTTPS URL。
4. 设置余额预警阈值和 Webhook Secret。
5. 保存后使用较低阈值进行实际验证。

## 通知范围

普通用户的 Webhook 主要用于余额或订阅额度不足通知。事件类型以实际收到的 `type` 字段为准，常见值为：

| `type` | 说明 |
|--------|------|
| `quota_exceed` | 余额或可用额度低于预警阈值 |

本页仅说明额度预警通知。

## 请求格式

平台会向配置的 URL 发送 `POST` 请求：

```json
{
  "type": "quota_exceed",
  "title": "您的额度即将用尽",
  "content": "当前剩余额度低于预警阈值，请及时处理。",
  "values": [],
  "timestamp": 1785700000
}
```

| 字段 | 类型 | 说明 |
|------|------|------|
| `type` | string | 通知类型 |
| `title` | string | 通知标题 |
| `content` | string | 通知正文，可能包含 HTML |
| `values` | array | 模板使用的附加值，可能为空 |
| `timestamp` | integer | Unix 秒级时间戳 |

接收端应快速返回 `2xx`。建议先验证签名并将通知加入队列，再异步处理耗时任务。

## 验证签名

配置 Secret 后，请求头会包含：

```http
X-Webhook-Signature: HEX_ENCODED_HMAC_SHA256
```

签名是以 Webhook Secret 为密钥，对原始请求体计算的 HMAC-SHA256 十六进制字符串。验签时必须使用未经解析和重新序列化的原始字节。

```python
import hashlib
import hmac

def verify_signature(raw_body: bytes, signature: str, secret: str) -> bool:
    expected = hmac.new(
        secret.encode("utf-8"),
        raw_body,
        hashlib.sha256,
    ).hexdigest()
    return hmac.compare_digest(expected, signature)
```

## 可靠性与安全建议

- 使用 HTTPS，并拒绝非 POST 请求；
- 验证 `X-Webhook-Signature`，不要仅依赖来源 IP；
- 对 `timestamp` 设置合理时间窗口，避免重复处理旧消息；
- 根据 `type`、`timestamp` 和正文摘要实现幂等去重；
- 请监控通知接收情况，并为通知遗漏准备补偿措施；
- Secret 泄露后应立即在控制台更换。
