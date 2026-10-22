# API 参考

提供对话、图像、视频、音频和向量等模型能力，支持 OpenAI、Anthropic、Gemini 等接口协议。请根据所选模型和客户端选择对应接口。

## 音频（Audio）

语音识别和语音合成接口。

- <span class="api-method post">POST</span> [Gemini 音频接口](/api/audio-gemini) `/v1beta/models/{model}:generateContent`
- <span class="api-method post">POST</span> [文本转语音](/api/audio-tts) `/v1/audio/speech`
- <span class="api-method post">POST</span> [音频转录](/api/audio-transcribe) `/v1/audio/transcriptions`
- <span class="api-method post">POST</span> [音频翻译](/api/audio-translation) `/v1/audio/translations`

## 聊天（Chat）

对话补全接口。

- <span class="api-method post">POST</span> [Claude 对话（Messages）](/api/claude-messages) `/v1/messages`
- <span class="api-method post">POST</span> [Gemini 多模态识别](/api/gemini-media) `/v1beta/models/{model}:generateContent`
- <span class="api-method post">POST</span> [Gemini 文本生成](/api/gemini) `/v1beta/models/{model}:generateContent`
- <span class="api-method post">POST</span> [对话补全（Chat Completions）](/api/chat) `/v1/chat/completions`
- <span class="api-method post">POST</span> [模型响应（Responses）](/api/responses) `/v1/responses`

## 补全（Completions）

传统文本补全接口。

- <span class="api-method post">POST</span> [文本补全](/api/completions) `/v1/completions`

## 嵌入（Embeddings）

文本嵌入向量生成接口。

- <span class="api-method post">POST</span> [创建文本嵌入](/api/embeddings) `/v1/embeddings`
- <span class="api-method post">POST</span> [按模型路径创建嵌入](/api/embeddings-gemini) `/v1/engines/{model}/embeddings`

## 图像（Images）

AI 图像生成接口。

- <span class="api-method post">POST</span> [生成图像](/api/images) `/v1/images/generations`
- <span class="api-method post">POST</span> [提交异步图像任务](/api/images-async#提交任务) `/async-images/v1/tasks`
- <span class="api-method get">GET</span> [查询异步图像任务](/api/images-async#查询任务) `/async-images/v1/tasks/{task_id}`
- <span class="api-method post">POST</span> [重试异步图片保存](/api/images-async#仅重试图片保存) `/async-images/v1/tasks/{task_id}/retry-save`
- <span class="api-method post">POST</span> [编辑图像](/api/images-edit) `/v1/images/edits/`
- <span class="api-method post">POST</span> [图像生成（Gemini）](/api/images-gemini) `/v1beta/models/{model}:generateContent/`
- <span class="api-method post">POST</span> [图像生成（Chat Completions）](/api/images-gemini-chat) `/v1/chat/completions`
- <span class="api-method post">POST</span> [生成图像](/api/images-qwen) `/v1/images/generations`
- <span class="api-method post">POST</span> [编辑图像](/api/images-qwen-edit) `/v1/images/edits`

## 模型（Models）

获取可用的模型列表。

- <span class="api-method get">GET</span> [模型列表（OpenAI 格式）](/api/models) `/v1/models`
- <span class="api-method get">GET</span> [模型列表（Gemini 格式）](/api/models-gemini) `/v1beta/models`

## 审查（Moderations）

内容安全审核接口。

- <span class="api-method post">POST</span> [内容审核](/api/moderations) `/v1/moderations`

## 实时语音（Realtime）

实时音频流接口。

- <span class="api-method get">GET</span> [实时语音（Realtime）](/api/realtime) `/v1/realtime`

## 重排序（Rerank）

文档重排序接口。

- <span class="api-method post">POST</span> [文档重排序](/api/rerank) `/v1/rerank`

## 暂未开放

文件与微调接口暂未开放，调用返回 HTTP `501`。

- <span class="api-method get">GET</span> [列出文件](/api/files) `/v1/files`
- <span class="api-method post">POST</span> [上传文件](/api/files-create) `/v1/files`
- <span class="api-method get">GET</span> [获取文件信息](/api/files-retrieve) `/v1/files/{file_id}`
- <span class="api-method get">GET</span> [获取文件内容](/api/files-download) `/v1/files/{file_id}/content`
- <span class="api-method delete">DELETE</span> [删除文件](/api/files-delete) `/v1/files/{file_id}`
- <span class="api-method get">GET</span> [列出微调任务](/api/fine-tuning) `/v1/fine-tunes`
- <span class="api-method post">POST</span> [创建微调任务](/api/fine-tuning-create) `/v1/fine-tunes`
- <span class="api-method get">GET</span> [获取微调任务详情](/api/fine-tuning-retrieve) `/v1/fine-tunes/{fine_tune_id}`
- <span class="api-method get">GET</span> [获取微调任务事件](/api/fine-tuning-events) `/v1/fine-tunes/{fine_tune_id}/events`
- <span class="api-method post">POST</span> [取消微调任务](/api/fine-tuning-cancel) `/v1/fine-tunes/{fine_tune_id}/cancel`

## 视频（Videos）

视频生成采用任务式调用：提交后获取任务 ID，再通过对应接口查询结果。不同接口的任务 ID、参数和状态值应分别使用。

### 异步视频任务

使用统一的任务查询和结果保存流程，成功后返回有效期为 12 小时的视频访问地址。

- <span class="api-method post">POST</span> [提交异步视频任务](/api/videos-async#提交任务) `/async-videos/v1/tasks`
- <span class="api-method get">GET</span> [查询异步视频任务](/api/videos-async#查询任务) `/async-videos/v1/tasks/{task_id}`
- <span class="api-method post">POST</span> [重试视频保存](/api/videos-async#仅重试视频保存) `/async-videos/v1/tasks/{task_id}/retry-save`

### 其他视频接口

按对应协议提交和查询，不适用上述异步视频任务的保存与有效期规则。

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
