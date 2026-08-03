# <span class="api-method post">POST</span> 即梦视频生成

即梦官方 API 格式的视频生成接口。

支持通过 Action 参数指定操作类型：

*   `CVSync2AsyncSubmitTask`: 提交视频生成任务
*   `CVSync2AsyncGetResult`: 获取任务结果

需要在查询参数中指定 Action 和 Version。

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
| `Action` | string | 是 | - |
| `Version` | string | 是 | API 版本 |

## 请求体

内容类型：`application/json`

| 参数 | 类型 | 必填 | 说明 |
|---|---|:---:|---|
| `req_key` | string | 否 | 请求类型标识 |
| `prompt` | string | 否 | 文本描述 |
| `binary_data_base64` | array&lt;string&gt; | 否 | Base64 编码的图片数据 |

## 请求示例

```bash
curl -X POST "https://api.zhangyuapi.com/jimeng/?Action=CVSync2AsyncSubmitTask&Version=string" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{}'
```
