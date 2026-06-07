# Gemini CLI

Google 开源 AI 代理，将 Gemini 能力直接带入终端。

## 安装

```bash
npm install -g @google/gemini-cli
```

## 配置

### 环境变量

创建 `~/.gemini/.env`：

```bash
GOOGLE_GEMINI_BASE_URL=https://zhangyuapi.com
GEMINI_API_KEY={{API_KEY}}
GEMINI_MODEL=gemini-2.5-flash
```

### settings.json

创建 `~/.gemini/settings.json`：

```json
{
  "ide": {
    "enabled": true
  },
  "security": {
    "auth": {
      "selectedType": "gemini-api-key"
    }
  }
}
```

## 使用

```bash
# 启动交互模式
gemini

# 指定工作目录
gemini /path/to/project

# 单次问答
gemini "解释这个项目结构"

# 查看可用模型
gemini models
```

## 代码审查

```bash
# 审查指定文件
gemini "review src/app.ts for bugs and suggest improvements"
```

## 可用模型

```bash
# 章鱼中枢支持的 Gemini 系列
gemini-2.5-flash     # 快速推理
gemini-2.5-pro       # 高级推理
gemini-2.0-flash     # 多模态任务
```

::: tip 提示
- `GEMINI_API_KEY` 即你的章鱼中枢 API Key
- `GOOGLE_GEMINI_BASE_URL` 为章鱼中枢 Base URL（不需要 `/v1` 后缀）
- IDE 集成模式支持在 VS Code 等编辑器中内嵌使用
:::
