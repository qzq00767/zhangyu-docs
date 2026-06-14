import { defineConfig } from 'vitepress'

// 侧边栏配置 — 仿 Apifox 导航树结构
const sidebar = {
  '/': [
    {
      text: '指南',
      collapsed: false,
      items: [
        { text: '产品简介', link: '/' },
        { text: '快速上手', link: '/guide/quickstart' },
        { text: '获取 Base URL 和 API Key', link: '/guide/base-url' },
        { text: '从 OpenAI 迁移', link: '/guide/migration' },
        { text: '通知设置-WebHook', link: '/guide/webhook' },
        { text: '生产接入建议', link: '/guide/best-practices' },
      ]
    },
    {
      text: 'AI 应用集成',
      collapsed: true,
      items: [
        { text: '配置总览', link: '/guide/apps/' },
        {
          text: '命令行工具',
          items: [
            { text: 'Claude Code', link: '/guide/apps/claude-code' },
            { text: 'Codex CLI', link: '/guide/apps/codex-cli' },
            { text: 'Gemini CLI', link: '/guide/apps/gemini-cli' },
          ]
        },
        {
          text: 'IDE 集成',
          items: [
            { text: 'Cursor', link: '/guide/apps/cursor' },
            { text: 'Cline / Aider', link: '/guide/apps/cline' },
          ]
        },
        {
          text: '桌面客户端',
          items: [
            { text: 'Cherry Studio', link: '/guide/apps/cherry-studio' },
            { text: 'Chatbox', link: '/guide/apps/chatbox' },
          ]
        },
        {
          text: 'Web 应用',
          items: [
            { text: 'LobeChat', link: '/guide/apps/lobechat' },
            { text: 'NextChat', link: '/guide/apps/nextchat' },
          ]
        },
        {
          text: '工作流与插件',
          items: [
            { text: 'ComfyUI 插件', link: '/guide/apps/comfyui' },
            { text: 'Dify / N8N / Coze', link: '/guide/apps/dify' },
            { text: '沉浸式翻译 / Zotero', link: '/guide/apps/plugins' },
          ]
        },
      ]
    },
    {
      text: '聊天(Chat)',
      collapsed: true,
      items: [
        {
          text: 'Chat（聊天）',
          items: [
            { text: 'Chat（流式返回）', link: '/api/chat' },
            { text: 'Chat（非流式返回）', link: '/api/chat-sync' },
            { text: 'Chat（分析图片）', link: '/api/chat-vision' },
            { text: 'Chat（分析视频）', link: '/api/chat-video' },
            { text: 'Chat（结构化输出）', link: '/api/chat-structured' },
            { text: 'Chat（工具tools调用）', link: '/api/chat-tools' },
            { text: 'Chat（生成图片）', link: '/api/chat-image-gen' },
            { text: 'Chat（修改图片）', link: '/api/chat-image-edit' },
          ]
        },
        {
          text: '聊天(Responses)',
          items: [
            { text: '创建模型响应', link: '/api/responses' },
            { text: '创建模型响应（流式返回）', link: '/api/responses-stream' },
            { text: '创建模型响应（联网搜索）', link: '/api/responses-web' },
          ]
        }
      ]
    },
    {
      text: '模型',
      collapsed: true,
      items: [
        { text: '列出模型', link: '/api/models' },
      ]
    },
    {
      text: 'Claude 官方格式',
      collapsed: true,
      items: [
        { text: 'Messages（官方Anthropic格式）', link: '/api/claude-messages' },
        { text: 'Messages（识图）', link: '/api/claude-vision' },
        { text: 'Messages（思考）', link: '/api/claude-thinking' },
        { text: 'Messages（函数调用）', link: '/api/claude-tools' },
      ]
    },
    {
      text: 'GPTs',
      collapsed: true,
      items: [
        { text: 'Chat（指定GPTs）', link: '/api/gpts-chat' },
        { text: '搜索 GPTs', link: '/api/gpts-search' },
      ]
    },
    {
      text: 'Gemini 官方格式',
      collapsed: true,
      items: [
        { text: 'Gemini 格式接口', link: '/api/gemini' },
      ]
    },
    {
      text: '绘图模型',
      collapsed: true,
      items: [
        { text: '绘图模型接口', link: '/api/images' },
        { text: '图片尺寸参考', link: '/api/image-sizes' },
      ]
    },
    {
      text: '视频模型',
      collapsed: true,
      items: [
        { text: '视频生成接口', link: '/api/video' },
      ]
    },
    {
      text: '音频接口',
      collapsed: true,
      items: [
        { text: '音频转文字', link: '/api/audio-transcribe' },
        { text: '文字转音频', link: '/api/audio-tts' },
      ]
    },
    {
      text: 'RAG（嵌入、重排序）',
      collapsed: true,
      items: [
        { text: '嵌入（Embeddings）', link: '/api/embeddings' },
        { text: '重排序（Reranker）', link: '/api/rerank' },
      ]
    },
    {
      text: '内容审查与文件',
      collapsed: true,
      items: [
        { text: '内容审查（Moderations）', link: '/api/moderations' },
        { text: '文件上传（Files）', link: '/api/files' },
      ]
    },
    {
      text: '账户管理',
      collapsed: true,
      items: [
        { text: '余额查询', link: '/api/account' },
      ]
    },
    {
      text: 'SDK 配置',
      collapsed: true,
      items: [
        { text: 'Python 配置方式', link: '/sdk/python' },
        { text: 'Node.js 配置方式', link: '/sdk/nodejs' },
      ]
    },
    {
      text: '帮助中心',
      collapsed: true,
      items: [
        { text: '常见问题', link: '/help' },
      ]
    },
  ]
}

export default defineConfig({
  title: '章鱼中枢 API 文档',
  description: '章鱼中枢 AI 服务平台 — 统一 API 网关，服务于海量 AI 模型',
  lang: 'zh-CN',
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }],
  ],

  themeConfig: {
    logo: {
      light: 'https://img.cdn1.vip/i/6a2e44ce5bef4_1781417166.png',
      dark: 'https://img.cdn1.vip/i/6a2e43bc75ba5_1781416892.png',
    },
    // 顶部导航
    nav: [
      { text: '首页', link: '/' },
      { text: '指南', link: '/guide/quickstart' },
      { text: 'API 接口', link: '/api/chat' },
      { text: 'AI 应用', link: '/guide/apps/' },
      { text: '帮助', link: '/help' },
    ],

    sidebar,

    // 搜索
    search: {
      provider: 'local',
      options: {
        translations: {
          button: {
            buttonText: '搜索文档',
            buttonAriaLabel: '搜索文档'
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
            }
          }
        }
      }
    },

    // 页脚
    footer: {
      message: '章鱼中枢 AI 服务平台',
      copyright: '© 2026 章鱼中枢. 版权所有。'
    },

    // 编辑链接

    // 最后更新时间
    lastUpdated: {
      text: '最后更新于',
      formatOptions: {
        dateStyle: 'short',
        timeStyle: 'short'
      }
    },

    // 大纲
    outline: {
      level: [2, 3],
      label: '本篇目录'
    },

    // 文档页脚（上一页/下一页）
    docFooter: {
      prev: '上一页',
      next: '下一页'
    },

    // 深色模式
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

  // 最后更新时间基于 Git
  lastUpdated: true,
})
