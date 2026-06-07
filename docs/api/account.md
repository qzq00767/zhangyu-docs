# 账户与余额查询

查询 API Key 或账户的余额和额度信息。

## <span class="api-method get">GET</span> 查询令牌余额

查询指定 API Key 的剩余额度。

```bash
curl "https://{{BASE_URL}}/v1/account/token-balance" \
  -H "Authorization: Bearer {{API_KEY}}"
```

### 响应示例

```json
{
  "object": "token_balance",
  "token": "sk-xxxx...",
  "balance": 12.50,
  "currency": "USD",
  "status": "active",
  "expires_at": "2026-12-31T23:59:59Z"
}
```

### 响应字段

| 字段 | 类型 | 说明 |
|------|------|------|
| `balance` | number | 当前余额 |
| `currency` | string | 货币单位 |
| `status` | string | 状态：`active`、`disabled`、`expired` |
| `expires_at` | string | 过期时间 |

## <span class="api-method get">GET</span> 查询用户余额

查询账户总余额。

```bash
curl "https://{{BASE_URL}}/v1/account/user-balance" \
  -H "Authorization: Bearer {{API_KEY}}"
```

### 响应示例

```json
{
  "object": "user_balance",
  "balance": 50.00,
  "currency": "USD",
  "total_used": 3.25,
  "total_topup": 53.25
}
```

## 使用量查询

在控制台中可查看更详细的使用统计，包括：
- 每日/每月用量趋势
- 按模型分组的消耗
- 按 API Key 分组的消耗
- 实时调用日志
