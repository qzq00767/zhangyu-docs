# Cursor

部分 Cursor 版本允许为自定义模型设置 OpenAI Base URL。该配置是否影响 Chat、Agent 或补全功能，取决于 Cursor 当前版本和订阅方案。

## 配置

1. 打开 **Settings → Models**。
2. 找到自定义 OpenAI API Key / Base URL 设置。
3. 填写：

| 设置项 | 值 |
|--------|-----|
| OpenAI Base URL | `https://api.zhangyuapi.com/v1` |
| OpenAI API Key | 在平台创建的独立 Key |
| Model ID | 从模型广场复制的模型 ID |

如果设置页没有自定义 Base URL，说明当前版本或功能不支持这种接入方式。

::: warning 功能边界
自定义 Key 不一定替代 Cursor 内置模型，也不保证 Tab 补全、Agent、Composer 等所有功能都走自定义接口。请通过平台使用日志确认实际请求。
:::

建议先创建一个低额度 Key，用最小任务测试文本生成、流式输出和工具调用，再逐步用于真实项目。
