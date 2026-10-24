# 抖音员工能力边界复核

核查日期：2026-10-24（Asia/Shanghai）。范围：网站应用 + 生活服务商家应用，面向油站企业及签约账号。结果仅说明公开文档支持的路径，不证明本公司/应用获批，也不是平台合规认证。

## 准入原则

应用能力获批、用户/商家授权、资源归属、行业适用范围、接口仍有效、字段实际返回及获准用途必须全部满足。无法确认时关闭，不通过抓包、非官方接口、爬取后台或把小程序接口套入网站应用来补齐。当前仓库无真实调用，仍为前端示例。

## 功能判定

| 功能 | 文档证据与限制 | 当前产品处理 |
| --- | --- | --- |
| 统一授权入口 | 网站OAuth与来客业务授权为独立链路。来客SDK仅生活服务应用，官方页面不支持iframe内嵌。 | 本后台发起并承接回调，持有人在官方页面登录同意；不收密码；两套凭证分管。 |
| AI预填、生成、审核 | 属于本平台接入模型/剪辑的功能，不是取得抖音权限后自动获得的能力。 | 保留简报和负向要求；仅原型规则预填，真实生成审查未接。 |
| 视频直接发布 | 当前创建视频文档仍列出 video.create.bind、需申请及用户授权。正式网站应用企业内容管理等场景须平台评估。旧服务商控制台代发视频能力已下线，是不同路径，不能混用。 | 只保留获批条件下的发布演示；真实发布关闭；不保证能获批。 |
| H5/SDK分享作备用发布 | 能力详情含应用与场景准入限制，企业宣传/商品介绍等营销场景不能简单视为通用准入。 | 不把H5分享作为企业代发能力的保底替代；必要时用户自行到官方客户端发布。 |
| 发布携带POI | 创建接口有 poi_id，挂POI要求具有企业资质或与企业资质关联的账号。 | 发布方案标为POI方案，仍需应用/账号/POI资质联调；不是绑定门店即具发布权。 |
| 原生团购商品锚点 | 当前创建文档不能证明任意原生团购商品ID/URL可挂载或与POI同时挂载。 | 禁用挂载；商品仅选品参考，不组成挂载指令，不将URL塞入标题作为替代。 |
| 门店商品读取 | life.capacity.goods.query，商服授权及对应范围；列表与详情接口说明不同，不能由列表可见推导所有字段/链接可得。 | 按分页列表取得实际可见商品，详情遵循其字段/来源限制；不假定返回可挂载链接。 |
| 销售/退款日报 | 订单查询 life.capacity.order.query 支持商户范围与创单/修改时间查询。支付/退款日期须按实际返回记录汇总，需增量同步和补偿，不保证与来客全量GMV相等。 | 仅授权且已同步订单。金额字段、币种、退款和补贴口径明确；缺数不当0。 |
| 核销日报 | 验券历史查询 life.capacity.billing，支持门店时间范围、分页。核销/撤销、次卡次数和金额字段均需正确处理。 | 统计授权可见验券记录，去重并处理撤销；核销不等于支付或收入，不按两者相减推未核销余额。 |
| 网站视频指标 | 能力介绍页仍含网站应用视频数据，但指向的当前具体接口页缺正文；不能以旧接口页面或用户论坛回复证明现行可申请。posting.behavior基础信息只证明授权用户指定作品的元信息，不能推导播放/完播/GMV。 | 网站播放及互动指标通道待核验，不可勾选为已授权，不展示数值。小程序近30天经营授权接口不移植到网站应用。 |
| 通用直播指标 | 官方公告关闭 live.room.base / live.room.interactive / live.room.audience，2025-03-30起存量调用失效。 | 关闭通用直播数据授权和指标数值；不称授权蓝V就能取场次、观看或成交。 |
| 小程序直播分析 | 获取小程序关联直播间近14天；直播详细分析限自挂载/达人挂载、近90天，历史数据每日14:00前更新。 | 当前应用组合不具备对应小程序路径，不能借用；若未来另行接小程序，独立申请授权及验证范围。 |
| 油站差评 | 本次找到 life.capacity.catering.comment，属于餐饮评价查询，最多近90天等限制。未找到适用当前油站方案的通用评价文本接口。 | 禁用油站评价授权，不显示为“无差评”。商家可提供其有权使用的导出材料，不能自动爬来客补齐。 |
| 日报定时与外部发送 | 调度、飞书和企微发送属于本平台及对应渠道能力，不是抖音API自动提供；须符合数据用途、隔离及接收权限。 | 保留配置草案；不启动外部自动化，不发送个人明细、原始评价或跨客户数据。 |
| 直播自动回扫/抓帧 | 未确认适用网站应用的官方直播拉流、录制、按URL采样能力。直播互动插件/小玩法是独立载体和场景，不能作为普通网站拉流权。 | 自动回扫按钮、频率禁用；登记链接不抓流。仅可对商家另行提供且有权使用的截图/录屏做辅助诊断。 |
| 最新规则判定 | 未取得能确认现行完整版本的油站直播规则。四维24项为本地技能整理的内部质量清单，不是官方处罚阈值。 | 显示来源、核查日和版本待核验；未知项需核验，建议不等于违规裁定。 |

## 本次实现的收紧

1. 新增统一能力策略表：发布、商品、订单、验券仅演示有文档的条件路径；直播数据、网站视频指标、油站评价、商品挂载与拉流不可选择。
2. 业务模型拒绝不支持的授权，即使手动构造旧授权，查询也不能返回直播/视频/评价示例数值；浏览器保存的旧示例范围会过滤。
3. 发布不强制附带商品；选品参考与真正商品锚点明确分离。POI方案仍需要已获批账号及条件验证。
4. 直播入口改为“直播素材诊断”；禁用自动回扫，不将“只差接入服务”作为承诺。
5. 日报缺失项展示具体原因；不使用小程序专用接口冒充网站应用的能力。

## 官方来源

以下为本次实际查阅的文档/公告。论坛普通用户评论不作为能力支持证据；旧文档与当前正文/公告冲突时不默认旧接口有效。

- [来客能力授权与门店绑定](https://partner.open-douyin.com/docs/resource/zh-CN/local-life/develop/OpenAPI/general-capabilities/life.capacity.shop/auth_with_bind)
- [创建视频：video.create.bind、POI与用户授权](https://developer.open-douyin.com/docs/resource/zh-CN/dop/develop/openapi/video-management/douyin/create-video/video-create)
- [移动/网站应用能力使用规范：企业内部或签约账号、用户操作发布](https://developer.open-douyin.com/docs/resource/zh-CN/dop/operation-standard/platform-capabilities/usage-spec)
- [生活服务营销玩法：正式网站应用申请代发条件](https://developer.open-douyin.com/docs/resource/zh-CN/mini-app/open-capacity/solutions/Life-Service-Solutions/marketing)
- [旧服务商代发能力下线通知，2024-10-11](https://developer.open-douyin.com/forum/bulletin/post/670893beaaa57530c6705e9d)
- [H5/SDK发布能力详情及准入场景限制](https://developer.open-douyin.com/capacity-center-page/capacity-detail/7180322911280955447)
- [查询商品线上列表：含2025-05-28范围调整](https://developer.open-douyin.com/docs/resource/zh-CN/local-life/develop/OpenAPI/general-capabilities/product-query/online.query)
- [查询商品线上详情：来源及脱敏字段限制](https://developer.open-douyin.com/docs/resource/zh-CN/local-life/develop/OpenAPI/general-capabilities/product-query/online.get)
- [订单查询及条件返回字段](https://developer.open-douyin.com/docs/resource/zh-CN/local-life/develop/OpenAPI/general-capabilities/order.query/query)
- [验券历史查询](https://developer.open-douyin.com/docs/resource/zh-CN/local-life/develop/OpenAPI/general-capabilities/life.capacity.billing/certificate.verifyrecord.query)
- [视频数据能力介绍](https://developer.open-douyin.com/capacity-center-page/capacity-detail/7180522194714230845)
- [当前指定视频数据页面：未取得有效正文](https://developer.open-douyin.com/docs/resource/zh-CN/dop/develop/openapi/video-management/douyin/search-video/video-data)
- [投稿任务视频基础信息：授权用户自己的指定作品](https://developer.open-douyin.com/docs/resource/zh-CN/dop/develop/openapi/video-management/posting-task/video-basic-info)
- [小程序经营授权近30天视频数据](https://developer.open-douyin.com/docs/resource/zh-CN/mini-app/develop/server/basic-abilities/video-id-convert/user-recent-video-data/get-base-bc)
- [通用直播数据下线公告，2024-08-27](https://developer.open-douyin.com/forum/bulletin/post/66cd430b73a9173bf14f8c66)
- [小程序直播房间数据：近14天](https://developer.open-douyin.com/docs/resource/zh-CN/mini-app/develop/server/operation/data-analysis/transaction-analysis/query-live-room-datav3)
- [小程序直播详细数据：挂载类型、近90天、更新时点](https://developer.open-douyin.com/docs/resource/zh-CN/mini-app/develop/server/data-analysis/live-analysis/room-detail-analysis-data)
- [餐饮评价查询：life.capacity.catering.comment](https://developer.open-douyin.com/docs/resource/zh-CN/local-life/develop/OpenAPI/catering/dining-group-solution/food-review/query_comment)

## 仍需平台或真实控制台确认

- 本公司正式网站应用是否能获准企业内容管理代发；不能仅凭蓝V认证或服务商身份推断。
- 网站应用当前视频播放/互动权限的可申请入口、有效接口和字段范围。
- 油站品类可用的评价文本接口与商品视频挂载方案。
- 是否存在对该应用及业务单独开放的直播采集能力；没有正式依据前保持禁用。

## 验证

`node tests/douyin-capability-boundary.test.cjs` 验证不支持scope被拒、旧授权不绕过、未知指标无数值、POI不强制商品和商品挂载被拒。其余业务与私域回归测试仍需全部通过。真实API未调用，不能用本地测试替代平台审批和真实联调。
