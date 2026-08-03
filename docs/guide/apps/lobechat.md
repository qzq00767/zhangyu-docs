# LobeChat

LobeChat 支持配置自定义 OpenAI 兼容服务。不同部署版本的字段名称可能不同。

## 配置

1. 打开语言模型或模型服务设置。
2. 选择 OpenAI 提供商或自定义 OpenAI Compatible 提供商。
3. 填写：

| 设置项 | 值 |
|--------|-----|
| API 代理地址 / Base URL | `https://api.zhangyuapi.com/v1` |
| API Key | 在平台创建的独立 Key |
| 自定义模型 | 从模型广场复制的模型 ID |

如果请求地址出现 `/v1/v1/`，说明当前版本会自动添加 `/v1`，请把 Base URL 改为 `https://api.zhangyuapi.com`。

## 功能验证

- 普通对话和流式输出；
- 图片输入或图片生成；
- 工具调用和插件；
- 知识库所需的嵌入模型；
- 使用日志中的模型、费用和错误。

LobeChat 的知识库、插件和 Agent 功能还会依赖其自身存储与部署配置，并非只填写 API Key 即可全部启用。

NextChat 请查看 [独立配置页面](/guide/apps/nextchat)。
