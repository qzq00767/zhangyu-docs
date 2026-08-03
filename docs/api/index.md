# API 参考

AI 模型接口提供各种 AI 能力的调用，兼容 OpenAI API 格式。

## 音频（Audio）

语音识别和语音合成接口。

- <span class="api-method post">POST</span> [原生Gemini格式](/api/audio-gemini) `/v1beta/models/{model}:generateContent`
- <span class="api-method post">POST</span> [文本转语音](/api/audio-tts) `/v1/audio/speech`
- <span class="api-method post">POST</span> [音频转录](/api/audio-transcribe) `/v1/audio/transcriptions`
- <span class="api-method post">POST</span> [音频翻译](/api/audio-translation) `/v1/audio/translations`

## 聊天（Chat）

对话补全接口。

- <span class="api-method post">POST</span> [原生Claude格式](/api/claude-messages) `/v1/messages`
- <span class="api-method post">POST</span> [Gemini媒体识别](/api/gemini-media) `/v1beta/models/{model}:generateContent`
- <span class="api-method post">POST</span> [Gemini文本聊天](/api/gemini) `/v1beta/models/{model}:generateContent`
- <span class="api-method post">POST</span> [ChatCompletions格式](/api/chat) `/v1/chat/completions`
- <span class="api-method post">POST</span> [Responses格式](/api/responses) `/v1/responses`

## 补全（Completions）

传统文本补全接口。

- <span class="api-method post">POST</span> [原生OpenAI格式](/api/completions) `/v1/completions`

## 嵌入（Embeddings）

文本嵌入向量生成接口。

- <span class="api-method post">POST</span> [原生OpenAI格式](/api/embeddings) `/v1/embeddings`
- <span class="api-method post">POST</span> [原生Gemini格式](/api/embeddings-gemini) `/v1/engines/{model}/embeddings`

## 图像（Images）

AI 图像生成接口。

- <span class="api-method post">POST</span> [生成图像](/api/images) `/v1/images/generations/`
- <span class="api-method post">POST</span> [编辑图像](/api/images-edit) `/v1/images/edits/`
- <span class="api-method post">POST</span> [Gemini原生格式](/api/images-gemini) `/v1beta/models/{model}:generateContent/`
- <span class="api-method post">POST</span> [OpenAI聊天格式](/api/images-gemini-chat) `/v1/chat/completions`
- <span class="api-method post">POST</span> [生成图像](/api/images-qwen) `/v1/images/generations`
- <span class="api-method post">POST</span> [编辑图像](/api/images-qwen-edit) `/v1/images/edits`

## 模型（Models）

获取可用的模型列表。

- <span class="api-method get">GET</span> [原生OpenAI格式](/api/models) `/v1/models`
- <span class="api-method get">GET</span> [原生Gemini格式](/api/models-gemini) `/v1beta/models`

## 审查（Moderations）

内容安全审核接口。

- <span class="api-method post">POST</span> [原生OpenAI格式](/api/moderations) `/v1/moderations`

## 实时语音（Realtime）

实时音频流接口。

- <span class="api-method get">GET</span> [原生OpenAI格式](/api/realtime) `/v1/realtime`

## 重排序（Rerank）

文档重排序接口。

- <span class="api-method post">POST</span> [文档重排序](/api/rerank) `/v1/rerank`

## 未实现（Unimplemented）

占位接口，暂未实现。

- <span class="api-method get">GET</span> [列出文件 (未实现)](/api/files) `/v1/files`
- <span class="api-method post">POST</span> [上传文件 (未实现)](/api/files-create) `/v1/files`
- <span class="api-method get">GET</span> [获取文件信息 (未实现)](/api/files-retrieve) `/v1/files/{file_id}`
- <span class="api-method get">GET</span> [获取文件内容 (未实现)](/api/files-download) `/v1/files/{file_id}/content`
- <span class="api-method delete">DELETE</span> [删除文件 (未实现)](/api/files-delete) `/v1/files/{file_id}`
- <span class="api-method get">GET</span> [列出微调任务 (未实现)](/api/fine-tuning) `/v1/fine-tunes`
- <span class="api-method post">POST</span> [创建微调任务 (未实现)](/api/fine-tuning-create) `/v1/fine-tunes`
- <span class="api-method get">GET</span> [获取微调任务详情 (未实现)](/api/fine-tuning-retrieve) `/v1/fine-tunes/{fine_tune_id}`
- <span class="api-method get">GET</span> [获取微调任务事件 (未实现)](/api/fine-tuning-events) `/v1/fine-tunes/{fine_tune_id}/events`
- <span class="api-method post">POST</span> [取消微调任务 (未实现)](/api/fine-tuning-cancel) `/v1/fine-tunes/{fine_tune_id}/cancel`

## 视频（Videos）

AI 视频生成接口。

- <span class="api-method post">POST</span> [创建视频生成任务](/api/video) `/v1/video/generations`
- <span class="api-method get">GET</span> [获取视频生成任务状态](/api/video-status) `/v1/video/generations/{task_id}`
- <span class="api-method post">POST</span> [即梦视频生成](/api/video-jimeng) `/jimeng/`
- <span class="api-method post">POST</span> [Kling 文生视频](/api/video-kling-text) `/kling/v1/videos/text2video`
- <span class="api-method get">GET</span> [获取 Kling 文生视频任务状态](/api/video-kling-text-status) `/kling/v1/videos/text2video/{task_id}`
- <span class="api-method post">POST</span> [Kling 图生视频](/api/video-kling-image) `/kling/v1/videos/image2video`
- <span class="api-method get">GET</span> [获取 Kling 图生视频任务状态](/api/video-kling-image-status) `/kling/v1/videos/image2video/{task_id}`
- <span class="api-method post">POST</span> [创建视频](/api/video-sora) `/v1/videos`
- <span class="api-method get">GET</span> [获取视频任务状态](/api/video-sora-status) `/v1/videos/{task_id}`
- <span class="api-method get">GET</span> [获取视频内容](/api/video-sora-content) `/v1/videos/{task_id}/content`
