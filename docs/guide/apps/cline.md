# Cline 与 Aider

## Cline

1. 在 VS Code 安装 Cline。
2. 打开 Cline 设置，将 API Provider 设为 **OpenAI Compatible**。
3. 填写：

| 设置项 | 值 |
|--------|-----|
| Base URL | `https://api.zhangyuapi.com/v1` |
| API Key | 在平台创建的独立 Key |
| Model ID | 从模型广场复制的模型 ID |

完成后先执行一个只读任务，确认流式输出和工具调用可用，再允许修改文件或执行命令。

::: warning 权限风险
Cline 可以读取、修改文件并执行命令。请在受信任的项目中使用，并检查其审批、自动执行和网络访问设置。
:::

## Aider

安装：

```bash
pip install aider-chat
```

配置环境变量：

```bash
export OPENAI_API_BASE="https://api.zhangyuapi.com/v1"
export OPENAI_API_KEY="YOUR_API_KEY"
```

启动时指定从模型广场获取的模型 ID：

```bash
aider --model openai/YOUR_MODEL_ID
```

Aider 通过 LiteLLM 适配不同模型，模型前缀和参数可能随版本变化。若模型无法识别，请查看当前 Aider / LiteLLM 文档。
