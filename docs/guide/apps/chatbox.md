# Chatbox

Chatbox 支持配置 OpenAI 兼容 API。不同版本的菜单名称可能略有差异。

## 安装

从 [Chatbox 官网](https://chatboxai.app/) 下载对应平台版本。

## 配置

1. 打开设置中的模型或模型提供商页面。
2. 选择 OpenAI API 或 OpenAI Compatible。
3. 填入以下信息：

| 设置项 | 值 |
|--------|-----|
| API 地址 / Base URL | `https://api.zhangyuapi.com/v1` |
| API Key | 在平台创建的独立 Key |
| 模型 | 从模型广场复制的模型 ID |

保存后发送一条简短消息，并在平台使用日志中确认请求。

::: warning 客户端存储
Chatbox 会在本机保存配置。请使用单独的低额度 Key，并保护本机账号和同步数据。移动端丢失后应立即禁用对应 Key。
:::

如果返回 `404`，检查 Chatbox 是否又自动添加了一次 `/v1`；如果是，请尝试把地址改为 `https://api.zhangyuapi.com`。
