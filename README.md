# WECAR AI 全域运营工作台

面向私域与抖音日常业务的数字员工 HTML 交互原型。

## 功能

- 私域数字员工：客户群发（1 对 1 私聊）、运营统计、群聊查询、运营问答。
- 抖音数字员工：账号授权、视频创作、经营日报、直播素材诊断。
- 今日工作台与成果库：直接进入业务能力、查看本地草案和操作记录。
- 视频创作流程：客户先说需求 → 本地规则预填创作简报（含负向要求）→ 修改并确认、补充素材 → 交付示意或本地成片预览 → 选择授权账号和门店 POI、商品仅作选品参考 → 二次确认并保存发布演示任务。
- 统一授权：抖音号与来客分开设置示例权限和门店范围，支持重新授权及撤销；示例授权与日报配置可在本浏览器保留，不存储真实 token。
- 经营日报：仅对有文档路径的订单、退款、验券汇总提供示例；通用直播数据已下线，网站视频指标和油站评价待核验，不提供可授权或取数承诺。推送是本平台功能，当前仅配置草案。
- 直播素材诊断：登记链接、检查证据状态、四维内部诊断示例；未找到适用本网站应用的官方直播拉流/录制能力，自动回扫禁用。

## 本地运行

无需安装前端依赖，使用 Python 3 启动静态服务：

```sh
python3 -m http.server 4173 --bind 127.0.0.1 --directory prototype
```

打开 `http://localhost:4173/`；视频工作空间入口为 `http://localhost:4173/?view=video`。

## 文件结构

- `prototype/index.html`：工作台页面。
- `prototype/workspace.js`、`prototype/workspace.css`：公共布局与主交互。
- `prototype/private-ui.js`、`prototype/private-ui.css`：私域基础查询与示例模型。
- `prototype/private-agent.js`、`prototype/private-agent.css`：私域一句话需求入口与整套预览。
- `prototype/video-ui.js`：需求优先的创作、成片预览与确认发布流程。
- `prototype/douyin-model.js`：独立业务模型，校验授权范围、门店商品、发布确认与日报/直播状态。
- `prototype/douyin-ui.js`、`prototype/douyin-ui.css`：抖音授权中心、经营日报、直播巡检和公共布局。
- `prototype/video-ui.css`：视频工作空间样式。
- `prototype/assets/`：本地图标库。
- `prototype/preview.png`、`prototype/video-preview.png`：界面预览。
- `prototype/*review.md`、`prototype/design-qa.md`：原型验证记录。

## 当前边界

本项目是 UI 演示，未连接 WECARAI、抖音/来客官方 OAuth、真实经营数据、素材识别、内容审查、视频生成、发布或定时服务。页面不会真实发消息、生成或发布视频、自动推送日报或抓取直播。

创作文件和发布任务仅在当前页面内保留，刷新会重置。示例授权（带有效期）和日报配置保存在 localStorage；不代表真实授权，也不构成安全边界。生产环境必须在服务端逐次校验租户、账号、门店、商品、能力及有效期。

POI与原生团购商品同时挂载仍待官方能力确认；当前仅保存商品标识，不伪造商品链接。直播四维24项属于内部诊断参考，不是已核实的最新官方判罚标准；规则来源及核查日期在页面展示。

## 第三方资源

图标使用 Lucide v0.468.0，ISC 许可；许可文本见 `prototype/assets/LUCIDE-LICENSE`。

## 私域流程与知识范围

私域默认从一句话需求开始。客户群发自动整理已绑定客户范围、按归属关联员工、文案、海报预览和发送时间，客户查看整套预览后一次确认；不要求逐步选择员工与填写表单。支持继续用一句话调整需求，修改后旧确认失效。当前语义识别使用本地规则，海报为预置示例，均非实时模型或业务服务输出。未知门店、未配置画像或不支持的渠道不会自动扩大范围。统计与群聊查询也使用一句话入口，可选条件收纳在折叠区中。

运营统计包含客户总览、员工/油站/渠道排行、留存趋势入口、群聊统计，以及客户私聊和客户群聊两类群发的接收与员工发送明细。所有数字来自本地虚构示例；留存口径未明确时不生成留存率。

运营 QA 附件仅提供 15 章目录，未提供目录中的 245 条问答正文。已提供的客户群发、统计与群聊查询文档支持有限的有来源摘要；其他问题只定位章节并提示缺少正文。

线上预览：[全域运营工作台](https://chenhk0816.github.io/wecardouyin/)。

验证命令：`node tests/private-flow.test.cjs`、`node tests/douyin-flow.test.cjs`、`node tests/douyin-ui-state.test.cjs`、`node tests/douyin-capability-boundary.test.cjs`、`node tests/douyin-poi.test.cjs`。

2026-10-24官方文档复核结果见 [能力边界复核](docs/douyin-capability-audit-2026-10-24.md)。未确认或下线能力已在业务模型禁用，并清理旧浏览器示例授权。

本次原型说明与后续接口边界见 [抖音员工接入说明](docs/douyin-integration.md)。线上通过 `main` 分支的 GitHub Pages 工作流发布；发布前自动运行五组测试，本地修改不会直接改变线上页面。

来客连接弹窗支持仅输入 POI ID 新增门店关联，按企业保存到当前浏览器、重复ID去重。新增记录不会取得账号/商品权限，归属待官方核验；不能勾选为已授权资源。
