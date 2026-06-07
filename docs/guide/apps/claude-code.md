# Claude Code

在终端中释放 Claude 的力量，瞬间搜索百万行代码库。

## 安装

```bash
# Mac / Linux
curl -fsSL https://claude.ai/install.sh | bash

# Windows (npm)
npm install -g @anthropic-ai/claude-code
```

## 配置

编辑 `~/.claude/settings.json`：

```json
{
  "env": {
    "ANTHROPIC_AUTH_TOKEN": "{{API_KEY}}",
    "ANTHROPIC_BASE_URL": "https://zhangyuapi.com"
  }
}
```

## 使用

```bash
# 默认模型
claude

# 指定模型
claude --model claude-sonnet-4-6

# 在特定目录启动
claude /path/to/your/project
```

## 常用命令

| 命令 | 说明 |
|------|------|
| `claude` | 启动交互模式 |
| `claude "提示词"` | 单次问答 |
| `claude --model <name>` | 指定模型 |
| `claude --resume` | 恢复上次会话 |
| `claude config` | 配置管理 |

## 设置记忆文件

创建 `~/.claude/CLAUDE.md` 可以在每次对话时自动注入项目背景和偏好：

```markdown
# 项目说明
这是一个 React + TypeScript 项目，使用 Tailwind CSS。
请遵循项目已有的代码风格。
```

## 多项目配置

在不同项目目录下可以有不同的 `CLAUDE.md`，Claude Code 会自动读取当前工作目录的配置。

::: tip 提示
- `ANTHROPIC_AUTH_TOKEN` 即你的章鱼中枢 API Key
- `ANTHROPIC_BASE_URL` 为章鱼中枢 Base URL（不需要 `/v1` 后缀）
- 首次使用可能需要接受 Anthropic 的使用条款
:::
