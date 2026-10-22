# WECAR AI 全域运营工作台

以私域数字员工与抖音数字员工协作为核心的 HTML 交互原型。

## 功能

- 私域数字员工：群发助手、数据查询。
- 抖音数字员工：视频生成、直播监控、数据监控。
- 全域协作：任务对话、成果查看、草案验收及操作记录。
- 视频生成流程：准备至少 3 个素材 → 选择主题、风格与用途 → 生成要求检查 → 编辑并确认方案 → 交付状态演示。

## 本地运行

无需安装前端依赖，使用 Python 3 启动静态服务：

```sh
python3 -m http.server 4173 --bind 127.0.0.1 --directory prototype
```

打开 `http://localhost:4173/`；视频工作空间入口为 `http://localhost:4173/?view=video`。

## 文件结构

- `prototype/index.html`：工作台页面与主交互。
- `prototype/video-ui.js`：视频工作流程交互。
- `prototype/video-ui.css`：视频工作空间样式。
- `prototype/assets/`：本地图标库。
- `prototype/preview.png`、`prototype/video-preview.png`：界面预览。
- `prototype/*review.md`、`prototype/design-qa.md`：原型验证记录。

## 当前边界

本项目是 UI 演示，未连接 WECARAI、抖音、真实会员数据、素材识别、安全审查或视频生成服务。页面不会真实发送群发消息、生成视频或执行监控。视频参考文件只在当前页面本地处理；刷新后流程状态重置。

## 第三方资源

图标使用 Lucide v0.468.0，ISC 许可；许可文本见 `prototype/assets/LUCIDE-LICENSE`。
