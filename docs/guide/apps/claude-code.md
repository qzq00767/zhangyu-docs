# Claude Code

Claude Code 可通过 Anthropic 兼容协议连接自定义网关。配置前请确认目标模型支持 `/v1/messages`。

## 安装

请优先参考 [Claude Code 官方文档](https://docs.anthropic.com/en/docs/claude-code/overview) 获取当前安装方式。使用 npm 时：

```bash
npm install -g @anthropic-ai/claude-code
```

## 配置

编辑用户目录下的 `~/.claude/settings.json`：

```json
{
  "env": {
    "ANTHROPIC_AUTH_TOKEN": "YOUR_API_KEY",
    "ANTHROPIC_BASE_URL": "https://api.zhangyuapi.com",
    "ANTHROPIC_MODEL": "YOUR_CLAUDE_MODEL_ID"
  }
}
```

`ANTHROPIC_BASE_URL` 不要添加 `/v1`，Claude Code 会自行请求 `/v1/messages`。

::: warning Key 安全
配置文件包含明文 Key。请限制文件访问权限，避免同步到公开网盘或提交到仓库，并为 Claude Code 创建独立的限额 Key。
:::

## 使用

```bash
# 在当前目录启动
claude

# 单次任务
claude "概括这个项目的目录结构"

# 临时指定模型
claude --model YOUR_CLAUDE_MODEL_ID
```

## 排查

| 现象 | 检查项 |
|------|--------|
| `401` | `ANTHROPIC_AUTH_TOKEN` 是否有效 |
| `404` | Base URL 是否错误地添加了 `/v1` |
| 模型不存在 | 从模型广场复制准确的 Claude 模型 ID |
| 工具调用异常 | 目标模型和渠道是否支持 Anthropic 工具调用 |

Claude Code 的配置字段可能随版本变化。如果环境变量未生效，请以官方文档和当前版本的 `claude --help` 为准。
