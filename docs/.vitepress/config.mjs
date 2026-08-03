import { defineConfig } from 'vitepress'

const sidebar = {
  '/': [
    {
      text: '快速开始',
      collapsed: false,
      items: [
        { text: '产品简介', link: '/' },
        { text: '快速上手', link: '/guide/quickstart' },
        { text: 'API 地址与密钥', link: '/guide/base-url' },
        { text: '从 OpenAI 迁移', link: '/guide/migration' },
        { text: '生产接入建议', link: '/guide/best-practices' },
      ],
    },
    {
      text: 'AI 模型接口',
      collapsed: false,
      items: [
        { text: 'API 参考', link: '/api/' },
        {
          text: '音频（Audio）',
          collapsed: true,
          items: [
            { text: '原生Gemini格式 POST', link: '/api/audio-gemini' },
            { text: '文本转语音 POST', link: '/api/audio-tts' },
            { text: '音频转录 POST', link: '/api/audio-transcribe' },
            { text: '音频翻译 POST', link: '/api/audio-translation' },
          ],
        },
        {
          text: '聊天（Chat）',
          collapsed: true,
          items: [
            { text: '原生Claude格式 POST', link: '/api/claude-messages' },
            { text: 'Gemini媒体识别 POST', link: '/api/gemini-media' },
            { text: 'Gemini文本聊天 POST', link: '/api/gemini' },
            { text: 'ChatCompletions格式 POST', link: '/api/chat' },
            { text: 'Responses格式 POST', link: '/api/responses' },
          ],
        },
        {
          text: '补全（Completions）',
          collapsed: true,
          items: [{ text: '原生OpenAI格式 POST', link: '/api/completions' }],
        },
        {
          text: '嵌入（Embeddings）',
          collapsed: true,
          items: [
            { text: '原生OpenAI格式 POST', link: '/api/embeddings' },
            { text: '原生Gemini格式 POST', link: '/api/embeddings-gemini' },
          ],
        },
        {
          text: '图像（Images）',
          collapsed: true,
          items: [
            { text: '生成图像 POST', link: '/api/images' },
            { text: '编辑图像 POST', link: '/api/images-edit' },
            { text: 'Gemini原生格式 POST', link: '/api/images-gemini' },
            { text: 'OpenAI聊天格式 POST', link: '/api/images-gemini-chat' },
            { text: '生成图像 POST', link: '/api/images-qwen' },
            { text: '编辑图像 POST', link: '/api/images-qwen-edit' },
          ],
        },
        {
          text: '模型（Models）',
          collapsed: true,
          items: [
            { text: '原生OpenAI格式 GET', link: '/api/models' },
            { text: '原生Gemini格式 GET', link: '/api/models-gemini' },
          ],
        },
        {
          text: '审查（Moderations）',
          collapsed: true,
          items: [{ text: '原生OpenAI格式 POST', link: '/api/moderations' }],
        },
        {
          text: '实时语音（Realtime）',
          collapsed: true,
          items: [{ text: '原生OpenAI格式 GET', link: '/api/realtime' }],
        },
        {
          text: '重排序（Rerank）',
          collapsed: true,
          items: [{ text: '文档重排序 POST', link: '/api/rerank' }],
        },
        {
          text: '未实现（Unimplemented）',
          collapsed: true,
          items: [
            {
              text: 'Files',
              collapsed: true,
              items: [
                { text: '列出文件 GET', link: '/api/files' },
                { text: '上传文件 POST', link: '/api/files-create' },
                { text: '获取文件信息 GET', link: '/api/files-retrieve' },
                { text: '获取文件内容 GET', link: '/api/files-download' },
                { text: '删除文件 DELETE', link: '/api/files-delete' },
              ],
            },
            {
              text: 'Fine-tuning',
              collapsed: true,
              items: [
                { text: '列出微调任务 GET', link: '/api/fine-tuning' },
                { text: '创建微调任务 POST', link: '/api/fine-tuning-create' },
                { text: '获取任务详情 GET', link: '/api/fine-tuning-retrieve' },
                { text: '获取任务事件 GET', link: '/api/fine-tuning-events' },
                { text: '取消微调任务 POST', link: '/api/fine-tuning-cancel' },
              ],
            },
          ],
        },
        {
          text: '视频（Videos）',
          collapsed: true,
          items: [
            { text: '创建视频生成任务 POST', link: '/api/video' },
            { text: '获取任务状态 GET', link: '/api/video-status' },
            { text: '即梦视频生成 POST', link: '/api/video-jimeng' },
            { text: 'Kling 文生视频 POST', link: '/api/video-kling-text' },
            { text: 'Kling 文生视频状态 GET', link: '/api/video-kling-text-status' },
            { text: 'Kling 图生视频 POST', link: '/api/video-kling-image' },
            { text: 'Kling 图生视频状态 GET', link: '/api/video-kling-image-status' },
            { text: '创建视频 POST', link: '/api/video-sora' },
            { text: '获取视频任务状态 GET', link: '/api/video-sora-status' },
            { text: '获取视频内容 GET', link: '/api/video-sora-content' },
          ],
        },
      ],
    },
    {
      text: 'SDK 配置',
      collapsed: true,
      items: [
        { text: 'Python', link: '/sdk/python' },
        { text: 'Node.js', link: '/sdk/nodejs' },
      ],
    },
    {
      text: '应用接入',
      collapsed: true,
      items: [
        { text: '配置总览', link: '/guide/apps/' },
        {
          text: '命令行工具',
          items: [
            { text: 'Claude Code', link: '/guide/apps/claude-code' },
            { text: 'Codex CLI', link: '/guide/apps/codex-cli' },
            { text: 'Gemini CLI', link: '/guide/apps/gemini-cli' },
          ],
        },
        {
          text: 'IDE 与编辑器',
          items: [
            { text: 'Cursor', link: '/guide/apps/cursor' },
            { text: 'Cline / Aider', link: '/guide/apps/cline' },
          ],
        },
        {
          text: '桌面与 Web 客户端',
          items: [
            { text: 'Cherry Studio', link: '/guide/apps/cherry-studio' },
            { text: 'Chatbox', link: '/guide/apps/chatbox' },
            { text: 'LobeChat', link: '/guide/apps/lobechat' },
            { text: 'NextChat', link: '/guide/apps/nextchat' },
          ],
        },
        {
          text: '工作流与插件',
          items: [
            { text: 'ComfyUI 插件', link: '/guide/apps/comfyui' },
            { text: 'Dify / n8n / Coze', link: '/guide/apps/dify' },
            { text: '翻译与 Zotero 插件', link: '/guide/apps/plugins' },
          ],
        },
      ],
    },
    {
      text: '账户与合规',
      collapsed: true,
      items: [
        { text: '费用、余额与使用量', link: '/api/account' },
        { text: 'Webhook 兼容性说明', link: '/guide/webhook' },
        { text: '常见问题', link: '/help' },
        { text: '用户协议', link: '/legal/user-agreement' },
        { text: '隐私政策', link: '/legal/privacy-policy' },
      ],
    },
  ],
}

export default defineConfig({
  title: '章鱼公益平台开发文档',
  description: '章鱼公益平台 API 接入、SDK 配置、应用集成与故障排查文档',
  lang: 'zh-CN',
  head: [
    ['link', { rel: 'icon', type: 'image/png', sizes: '48x48', href: '/favicon.png' }],
    ['meta', { name: 'theme-color', content: '#ffffff' }],
  ],

  themeConfig: {
    logo: {
      src: '/logo-nav.png',
      alt: '章鱼公益平台',
    },
    logoLink: 'https://zhangyuapi.com',
    nav: [
      { text: '文档首页', link: '/' },
      { text: '快速上手', link: '/guide/quickstart' },
      { text: 'API 参考', link: '/api/' },
      { text: '应用配置', link: '/guide/apps/' },
      { text: '帮助', link: '/help' },
      {
        text: '平台',
        items: [
          { text: '控制台', link: 'https://zhangyuapi.com/dashboard' },
          { text: 'API 密钥', link: 'https://zhangyuapi.com/keys' },
          { text: '模型广场', link: 'https://zhangyuapi.com/pricing' },
          { text: '使用日志', link: 'https://zhangyuapi.com/usage-logs/common' },
        ],
      },
    ],

    sidebar,
    externalLinkIcon: true,

    search: {
      provider: 'local',
      options: {
        translations: {
          button: {
            buttonText: '搜索文档',
            buttonAriaLabel: '搜索文档',
          },
          modal: {
            displayDetails: '显示详情',
            resetButtonTitle: '重置搜索',
            backButtonTitle: '关闭',
            noResultsText: '未找到结果',
            footer: {
              selectText: '选择',
              navigateText: '切换',
              closeText: '关闭',
            },
          },
        },
      },
    },

    footer: {
      message: '本平台不向中国大陆地区用户提供服务 · <a href="/legal/user-agreement">用户协议</a> · <a href="/legal/privacy-policy">隐私政策</a>',
      copyright: '© 2026 章鱼公益平台',
    },

    lastUpdated: {
      text: '最后更新',
      formatOptions: {
        dateStyle: 'medium',
      },
    },
    outline: {
      level: [2, 3],
      label: '本页目录',
    },
    docFooter: {
      prev: '上一页',
      next: '下一页',
    },
    darkModeSwitchLabel: '切换主题',
    lightModeSwitchTitle: '切换到浅色模式',
    darkModeSwitchTitle: '切换到深色模式',
    sidebarMenuLabel: '菜单',
    returnToTopLabel: '回到顶部',
  },

  markdown: {
    theme: {
      light: 'github-light',
      dark: 'github-dark',
    },
    lineNumbers: true,
  },

  lastUpdated: true,
})
