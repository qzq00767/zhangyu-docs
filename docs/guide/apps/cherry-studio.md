# Cherry Studio

支持多模型的全能 AI 桌面客户端，内置生图、MCP 等高级功能。

## 安装

从 [Cherry Studio 官网](https://cherry-ai.com/) 下载对应平台版本。

## 配置步骤

### 1. 添加模型提供商

1. 打开 Cherry Studio → **设置** → **模型服务**
2. 点击 **添加**，选择 **OpenAI** 类型
3. 填入配置：

| 设置项 | 值 |
|--------|-----|
| **API 地址** | `https://zhangyuapi.com/v1` |
| **API 密钥** | 你的章鱼中枢 API Key |

### 2. 管理模型

在 **模型管理** 页面，勾选需要启用的模型：

- **对话模型**：`gpt-4o`、`claude-sonnet-4-6`、`deepseek-v3` 等
- **绘图模型**：`gpt-image-2`、`gpt-image-2-1k` 等

### 3. 开始使用

选择模型后即可在对话界面使用。

## Cherry Studio 生图

选择 `gpt-image-2` 或 `gpt-image-2-1k` 模型，直接在对话中描述图片需求：

> "生成一张秋天的银杏树风景图，暖色调"

## Cherry Studio MCP

Cherry Studio 支持调用 Claude MCP 工具：

1. 设置 → MCP 设置
2. 添加 MCP 服务器配置
3. 选择 Claude 模型时自动加载 MCP 工具

::: tip 提示
- 首次使用需要下载模型列表，稍等片刻
- 可以在设置中调整模型参数（temperature、max_tokens 等）
- 支持快捷键快速切换模型
:::
