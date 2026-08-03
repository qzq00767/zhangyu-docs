# Cherry Studio

Cherry Studio 支持添加自定义 OpenAI 兼容服务商，并手动管理模型列表。

## 安装

从 [Cherry Studio 官网](https://cherry-ai.com/) 下载对应版本。

## 配置步骤

1. 打开 **设置 → 模型服务**。
2. 添加 OpenAI 类型的自定义服务商。
3. 填写：

| 设置项 | 值 |
|--------|-----|
| API 地址 | `https://api.zhangyuapi.com/v1` |
| API Key | 在平台创建的独立 Key |

4. 使用“获取模型”功能，或根据 [模型广场](https://zhangyuapi.com/pricing) 手动添加模型 ID。
5. 先测试文本对话，再按需要测试图片、工具调用和多模态能力。

::: tip 能力取决于模型
客户端显示某个开关，不代表所有模型都支持该功能。图片生成、视觉、工具调用和结构化输出应分别实测。
:::

如果模型列表获取失败，可先用 `/v1/models` 验证 Key 和 Base URL。桌面客户端会在本机保存 Key，建议设置独立额度和有效期。
