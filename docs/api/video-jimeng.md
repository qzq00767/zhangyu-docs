# <span class="api-method post">POST</span> 即梦视频生成

即梦官方 API 格式的视频生成接口。

通过 `Action` 查询参数选择操作：

*   `CVSync2AsyncSubmitTask`: 提交视频生成任务
*   `CVSync2AsyncGetResult`: 获取任务结果

请求须包含 `Action` 和 `Version` 查询参数。提交任务和查询结果使用不同的 `Action`，请求体字段应按对应操作配置。

<div class="api-endpoint">
  <span class="api-method post">POST</span>
  <code>https://api.zhangyuapi.com/jimeng/</code>
</div>

## 鉴权

`Authorization: Bearer YOUR_API_KEY`

使用 Bearer Token 认证。

## 查询参数

| 参数 | 类型 | 必填 | 说明 |
|---|---|:---:|---|
| `Action` | string | 是 | `CVSync2AsyncSubmitTask`（提交任务）或 `CVSync2AsyncGetResult`（查询结果） |
| `Version` | string | 是 | API 版本 |

## 请求体

内容类型：`application/json`

| 参数 | 类型 | 必填 | 说明 |
|---|---|:---:|---|
| `req_key` | string | 否 | 请求类型标识 |
| `prompt` | string | 否 | 文本描述 |
| `binary_data_base64` | array&lt;string&gt; | 否 | Base64 编码的图片数据 |

## 请求示例

以下为提交任务的请求示例。`YOUR_API_VERSION` 和 `YOUR_REQ_KEY` 须替换为所选模型对应的协议版本和请求标识。

```bash
curl -X POST "https://api.zhangyuapi.com/jimeng/?Action=CVSync2AsyncSubmitTask&Version=YOUR_API_VERSION" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "req_key": "YOUR_REQ_KEY",
    "prompt": "海浪缓慢拍打沙滩，镜头平稳移动"
  }'
```
