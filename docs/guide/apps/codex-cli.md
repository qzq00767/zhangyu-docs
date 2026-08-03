# Codex CLI

Codex CLI 支持在用户级 `config.toml` 中定义自定义模型 Provider。章鱼公益平台接入需要使用支持 Responses API 的模型。

## 安装

```bash
npm install -g @openai/codex
```

## 配置 API Key

将 Key 放入环境变量，不要直接写进 `config.toml`：

```bash
export ZHANGYU_API_KEY="YOUR_API_KEY"
```

Windows PowerShell：

```powershell
$env:ZHANGYU_API_KEY="YOUR_API_KEY"
```

## 配置 Provider

编辑用户级 `~/.codex/config.toml`：

```toml
model_provider = "zhangyu"
model = "YOUR_RESPONSES_MODEL_ID"
model_reasoning_effort = "high"

[model_providers.zhangyu]
name = "章鱼公益平台"
base_url = "https://api.zhangyuapi.com/v1"
env_key = "ZHANGYU_API_KEY"
wire_api = "responses"
```

::: warning 协议要求
Codex CLI 自定义 Provider 当前使用 Responses API，`wire_api` 仅支持 `responses`。不要在这里填写只支持 Chat Completions 或 Anthropic Messages 的模型。
:::

## 使用

```bash
# 在当前目录启动
codex

# 指定工作目录
codex -C /path/to/project

# 非交互执行
codex exec "检查项目并修复 TypeScript 类型错误"
```

如果出现 `404` 或响应解析失败，请先用同一个模型测试 `/v1/responses`，并确认模型支持 Responses API。配置项以 [Codex 官方配置参考](https://developers.openai.com/codex/config-reference/) 为准。
