# Gemini CLI

Gemini CLI 可在支持自定义 Gemini API 根地址的版本中接入平台。目标模型必须支持 Gemini 原生协议。

## 安装

```bash
npm install -g @google/gemini-cli
```

## 配置

在 `~/.gemini/.env` 中设置：

```bash
GEMINI_API_KEY=YOUR_API_KEY
GOOGLE_GEMINI_BASE_URL=https://api.zhangyuapi.com
GEMINI_MODEL=YOUR_GEMINI_MODEL_ID
```

Base URL 不要添加 `/v1`，客户端会自行拼接 `/v1beta/models/...`。

::: warning 版本差异
Gemini CLI 对自定义 Base URL 的支持可能随版本变化。如果变量未生效，请查看当前版本帮助和官方文档；无法自定义地址的版本不能直接接入。
:::

## 使用

```bash
gemini
gemini "解释这个项目的目录结构"
```

## 排查

| 现象 | 检查项 |
|------|--------|
| `401` | `GEMINI_API_KEY` 是否有效 |
| `404` | Base URL 是否误加 `/v1`，模型 ID 是否存在 |
| 参数错误 | 模型是否支持当前 Gemini 参数或多模态输入 |

模型列表会动态变化，请从模型广场获取准确 ID，不要长期依赖固定示例名称。
