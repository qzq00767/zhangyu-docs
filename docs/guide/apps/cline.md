# Cline

VS Code 扩展，在编辑器中直接使用 AI 编程助手。

## 安装

在 VS Code 扩展商店搜索 **Cline** 安装。

## 配置

1. 打开 Cline 扩展 → 点击设置图标
2. **API Provider** 选择 **OpenAI Compatible**
3. 填入配置：

| 设置项 | 值 |
|--------|-----|
| **Base URL** | `https://zhangyuapi.com/v1` |
| **API Key** | 你的章鱼中枢 API Key |
| **Model ID** | `gpt-4o` 或 `claude-sonnet-4-6` |

## 使用

在 VS Code 中打开 Cline 面板，直接用自然语言描述需求：
- "帮我写一个登录页面"
- "修复这个文件的 TypeScript 报错"
- "解释这段代码做了什么"

## 推荐模型

| 场景 | 推荐 |
|------|------|
| 写代码 | `claude-sonnet-4-6` / `gpt-4o` |
| 快速修改 | `gpt-4o-mini` |
| 复杂分析 | `claude-opus-4-8` |

---

# Aider

终端 AI 结对编程，通过 Git 自动追踪代码变更。

## 安装

```bash
pip install aider-chat
```

## 配置

```bash
export OPENAI_API_BASE="https://zhangyuapi.com/v1"
export OPENAI_API_KEY="{{API_KEY}}"
```

## 使用

```bash
# 基础用法
aider --model gpt-4o

# 指定模型和文件
aider --model claude-sonnet-4-6 src/app.ts

# 使用 o 系列推理模型
aider --model o4-mini --reasoning-effort high
```

## 常用命令（在 Aider 对话中）

| 命令 | 说明 |
|------|------|
| `/add <file>` | 添加文件到上下文 |
| `/drop <file>` | 移除文件 |
| `/commit` | 自动提交变更 |
| `/diff` | 查看变更 |
| `/undo` | 撤销上次变更 |
| `/clear` | 清除对话历史 |
