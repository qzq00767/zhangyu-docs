# NextChat

NextChat（ChatGPT Next Web）可以通过自定义接口连接 OpenAI 兼容 API。

## 应用内配置

1. 打开设置并启用自定义接口。
2. 填写 API Key 和接口地址。
3. 接口地址通常填写协议根地址：

```text
https://api.zhangyuapi.com
```

NextChat 通常会自行拼接 `/v1/chat/completions`。如果您使用的版本明确要求 OpenAI Base URL，则按其说明填写 `https://api.zhangyuapi.com/v1`。

## Docker 部署

不同版本使用的环境变量可能不同。常见配置如下：

```bash
docker run -d -p 3000:3000 \
  -e BASE_URL=https://api.zhangyuapi.com \
  -e OPENAI_API_KEY=YOUR_API_KEY \
  yidadaa/chatgpt-next-web
```

部署前请对照 [NextChat 项目文档](https://github.com/ChatGPTNextWeb/ChatGPT-Next-Web) 确认当前变量名称。

::: warning 不要公开部署高额度 Key
服务端环境变量中的 Key 会被所有站点用户共同消耗。公开部署时应增加访问控制、额度限制和滥用防护。
:::
