# Codex CLI

OpenAI 开源终端编程助手，可读取、修改并执行代码。

## 安装

```bash
npm install -g @openai/codex
```

## 配置

### config.toml

创建 `~/.codex/config.toml`：

```toml
model_provider = "zhangyu"
model = "gpt-4o"
model_reasoning_effort = "high"
network_access = "enabled"
disable_response_storage = true

[model_providers.zhangyu]
name = "OpenAI"
base_url = "https://zhangyuapi.com/v1"
wire_api = "responses"
requires_openai_auth = true
```

### auth.json

创建 `~/.codex/auth.json`：

```json
{
  "OPENAI_API_KEY": "{{API_KEY}}"
}
```

## 使用

```bash
# 在当前目录启动
codex

# 指定工作目录
codex /path/to/project

# 单次命令
codex exec "修复所有 TypeScript 类型错误"
```

## 模型选择

```toml
# 推荐配置
model = "gpt-4o"              # 日常编程
# model = "claude-sonnet-4-6" # 复杂重构（需切换 wire_api）
# model = "o4-mini"           # 高推理强度
model_reasoning_effort = "high"
```

::: tip 提示
- Codex CLI 支持 OpenAI Responses API 和 Chat API 两种模式
- `wire_api = "responses"` 使用新版 Responses API（推荐）
- `wire_api = "chat"` 使用传统 Chat API
:::
