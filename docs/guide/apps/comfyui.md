# ComfyUI 章鱼中枢插件

将章鱼中枢的生图能力集成到 ComfyUI 工作流中。

## 仓库地址

[github.com/qzq00767/Comfyui-ZhangyuAPI](https://github.com/qzq00767/Comfyui-ZhangyuAPI)

## 安装

```bash
# 进入 ComfyUI 的 custom_nodes 目录
cd ComfyUI/custom_nodes/

# 克隆插件
git clone https://github.com/qzq00767/Comfyui-ZhangyuAPI.git

# 安装依赖
cd Comfyui-ZhangyuAPI
pip install -r requirements.txt
```

## 配置

在插件目录中创建配置文件，填入章鱼中枢 API Key：

```json
{
  "api_key": "sk-你的API密钥",
  "base_url": "https://zhangyuapi.com"
}
```

## 使用

重启 ComfyUI 后，在节点列表中可以找到章鱼中枢相关节点：

- **Zhangyu Image Gen** — 文生图节点
- **Zhangyu Image Edit** — 图生图/编辑节点
- 拖入工作流，连接提示词输入和图片输出即可

## 支持的模型

| 模型 | 说明 |
|------|------|
| `gpt-image-2` | 通用生图 |
| `gpt-image-2-1k` | 1K 分辨率，快速生成 |
| `gpt-image-2-2k` | 2K 分辨率，高清海报 |
| `gpt-image-2-4k` | 4K 分辨率，超清素材 |

## 工作流示例

典型的文生图工作流：

1. **文本输入** → 填写提示词
2. **Zhangyu Image Gen** → 选择模型和尺寸
3. **Preview Image** → 预览结果
4. **Save Image** → 保存到本地

::: tip 提示
- 确保 ComfyUI 已正常启动并能访问网络
- 生图耗时取决于分辨率和模型，建议设置合理超时
- 4K 图片可能需要 60 秒以上
:::
