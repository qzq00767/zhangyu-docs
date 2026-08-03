# 浏览器与文献插件

## 沉浸式翻译

在翻译服务中选择 OpenAI 或自定义 OpenAI，并填写：

| 设置项 | 值 |
|--------|-----|
| 完整 API 地址 | `https://api.zhangyuapi.com/v1/chat/completions` |
| API Key | 独立的低额度 Key |
| 模型 | 从模型广场选择适合翻译的模型 ID |

不同版本可能要求填写 Base URL 而非完整端点。如果配置项名为 Base URL，请填写 `https://api.zhangyuapi.com/v1`。

## Zotero GPT

安装插件后，在 GPT 设置中填写完整 Chat Completions 地址、独立 Key 和模型 ID：

```text
API URL: https://api.zhangyuapi.com/v1/chat/completions
API Key: YOUR_API_KEY
Model: YOUR_MODEL_ID
```

插件版本和配置字段可能变化，请同时参考对应插件的项目说明。

## 安全提示

::: danger 浏览器扩展风险较高
浏览器扩展可以读取其权限范围内的页面和本地配置。请只安装可信来源的扩展，并为每个插件创建独立、低额度、短有效期的 Key。
:::

- 不要在多个插件间共用主 Key；
- 不要向翻译服务提交密码、身份材料或商业秘密；
- 定期检查使用日志，发现异常立即禁用 Key；
- 卸载插件时同时删除或禁用对应 Key。
