# ComfyUI 插件

[Comfyui-ZhangyuAPI](https://github.com/qzq00767/Comfyui-ZhangyuAPI) 提供图片、视频、Gemini 和通用 LLM 等自定义节点。

## 安装

```bash
cd ComfyUI/custom_nodes
git clone https://github.com/qzq00767/Comfyui-ZhangyuAPI.git
cd Comfyui-ZhangyuAPI
pip install -r requirements.txt
```

重启 ComfyUI 后搜索 `zhangyuapi` 查看已安装节点。

## 配置节点

不同节点的字段略有差异，通常需要填写：

| 字段 | 建议值 |
|------|--------|
| `api_key` | 在平台创建的独立 API Key |
| `api_base` | `https://api.zhangyuapi.com` |
| `model` | 从模型广场复制的模型 ID |
| `timeout` | 根据图片或视频任务设置合理超时 |

插件会按节点类型自行拼接 `/v1/images/generations`、`/v1/chat/completions` 或其他路径，因此建议填写不带 `/v1` 的协议根地址。

## 使用前检查

1. 先用通用 LLM 节点测试 Key 和模型列表。
2. 再测试对应图片或视频节点，确认模型与节点协议匹配。
3. 为耗时任务设置合理超时和有限重试。
4. 在平台使用日志中核对费用和错误。

::: warning 插件版本
插件仓库中的节点、字段和默认地址可能随版本更新。本文以公开仓库当前结构为参考，实际使用时请同时查看仓库 README 和节点提示。
:::
