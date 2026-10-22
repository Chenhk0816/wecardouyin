# WECAR AI 全域运营工作台

面向私域与抖音日常业务的数字员工 HTML 交互原型。

## 功能

- 私域数字员工：客户群发（1 对 1 私聊）、运营统计、群聊查询、运营问答。
- 抖音数字员工：视频生成、直播监控、数据监控。
- 今日工作台与成果库：直接进入业务能力、查看本地草案和操作记录。
- 视频生成流程：准备至少 3 个素材 → 选择主题、风格与用途 → 生成要求检查 → 编辑并确认方案 → 交付状态演示。

## 本地运行

无需安装前端依赖，使用 Python 3 启动静态服务：

```sh
python3 -m http.server 4173 --bind 127.0.0.1 --directory prototype
```

打开 `http://localhost:4173/`；视频工作空间入口为 `http://localhost:4173/?view=video`。

## 文件结构

- `prototype/index.html`：工作台页面。
- `prototype/workspace.js`、`prototype/workspace.css`：公共布局与主交互。
- `prototype/private-ui.js`、`prototype/private-ui.css`：私域四个工作空间。
- `prototype/video-ui.js`：视频工作流程交互。
- `prototype/video-ui.css`：视频工作空间样式。
- `prototype/assets/`：本地图标库。
- `prototype/preview.png`、`prototype/video-preview.png`：界面预览。
- `prototype/*review.md`、`prototype/design-qa.md`：原型验证记录。

## 当前边界

本项目是 UI 演示，未连接 WECARAI、抖音、真实会员数据、素材识别、安全审查或视频生成服务。页面不会真实发送群发消息、生成视频或执行监控。视频参考文件只在当前页面本地处理；刷新后流程状态重置。

## 第三方资源

图标使用 Lucide v0.468.0，ISC 许可；许可文本见 `prototype/assets/LUCIDE-LICENSE`。

## 私域流程与知识范围

客户群发支持选择企业和员工、按条件筛选客户或匹配会员号名单、排除客户、编辑文本与附加素材、预览范围并保存演示草案。修改范围或内容后需要重新预览，切换企业会清除员工与筛选条件。客户群聊群发仅提供历史统计查询。

运营统计包含客户总览、员工/油站/渠道排行、留存趋势入口、群聊统计，以及客户私聊和客户群聊两类群发的接收与员工发送明细。所有数字来自本地虚构示例；留存口径未明确时不生成留存率。

运营 QA 附件仅提供 15 章目录，未提供目录中的 245 条问答正文。已提供的客户群发、统计与群聊查询文档支持有限的有来源摘要；其他问题只定位章节并提示缺少正文。

线上预览：[全域运营工作台](https://chenhk0816.github.io/wecardouyin/)。

验证命令：`node tests/private-flow.test.cjs`。
