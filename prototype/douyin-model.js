/* Pure demo workflow model. No OAuth secrets, network calls or real scheduler. */
(function(root){
'use strict';
// Public documentation review: 2026-10-24. Selectable means demo of a documented route,
// not that this app has received that permission. Unknown routes fail closed.
const policy={
 publish:{selectable:true,label:'视频发布（须应用获批）',scope:'video.create.bind'},
 goods:{selectable:true,label:'商品读取（须应用获批）',scope:'life.capacity.goods.query'},
 sales:{selectable:true,label:'订单查询汇总（须应用获批）',scope:'life.capacity.order.query'},
 verify:{selectable:true,label:'验券记录（须应用获批）',scope:'life.capacity.billing'},
 video:{selectable:false,label:'视频指标通道待核验',reason:'网站应用的视频指标接口及当前申请入口未确认，不能用小程序接口替代'},
 live:{selectable:false,label:'通用直播数据已下线',reason:'通用直播数据接口已于2025-03-30停止存量调用；小程序直播分析仅适用对应小程序'},
 reviews:{selectable:false,label:'油站评价能力待核验',reason:'已查到的评价查询为餐饮scope，不能直接用于油站'},
 nativeProduct:{selectable:false,label:'原生团购商品挂载未确认',reason:'不能由POI参数或来客商品读取权限推导出视频商品挂载能力'},
 liveCapture:{selectable:false,label:'自动抓流 / 定时回扫未确认',reason:'未找到适用该网站应用的公开直播拉流/录制接口'}
};
function selectableScopes(kind){return (kind==='douyin'?['publish','video','live']:['goods','sales','verify','reviews']).filter(x=>policy[x].selectable);}
const catalog={
 tenants:[{id:'a',name:'示例能源集团 A'},{id:'b',name:'示例能源集团 B'}],
 shops:[{id:'a-river',tenant:'a',merchant:'a-merchant',name:'滨江加油站',poi:'DEMO_POI_1001'},{id:'a-north',tenant:'a',merchant:'a-merchant',name:'城北加油站',poi:'DEMO_POI_1002'},{id:'b-hill',tenant:'b',merchant:'b-merchant',name:'湖畔加油站',poi:'DEMO_POI_2001'}],
 accounts:[{id:'a-hq',tenant:'a',name:'能源 A · 总部蓝 V'},{id:'a-north-v',tenant:'a',name:'能源 A · 城北蓝 V'},{id:'b-hq',tenant:'b',name:'能源 B · 总部蓝 V'}],
 merchants:[{id:'a-merchant',tenant:'a',name:'能源 A 来客商家'},{id:'b-merchant',tenant:'b',name:'能源 B 来客商家'}],
 products:[{id:'a-gift',tenant:'a',shops:['a-river'],name:'滨江站会员洗车券',price:'¥19.90',online:true,link:'DEMO_PRODUCT_1001'},{id:'a-north-gift',tenant:'a',shops:['a-north'],name:'城北站洗车权益券',price:'¥29.90',online:true,link:'DEMO_PRODUCT_1002'},{id:'a-old',tenant:'a',shops:['a-river'],name:'已下架活动券',online:false,link:'DEMO_OFFLINE'},{id:'b-gift',tenant:'b',shops:['b-hill'],name:'湖畔站洗车券',price:'¥19.90',online:true,link:'DEMO_PRODUCT_2001'}]
};
function createState(){return {tenant:'a',grants:[],brief:null,asset:null,target:{account:'',shop:'',product:'',title:''},preview:null,ack:false,jobs:[],logs:[],revision:0,reportConfig:null,liveTasks:[]};}
function shops(s){return catalog.shops.filter(x=>x.tenant===s.tenant);}
function log(s,text){s.logs.unshift({at:new Date().toISOString(),tenant:s.tenant,text});}
function invalidate(s){s.revision++;s.preview=null;s.ack=false;}
function grant(s,kind,id,scope,shop){if(!selectableScopes(kind).includes(scope))return undefined;return s.grants.find(g=>g.tenant===s.tenant&&g.kind===kind&&g.id===id&&g.active&&g.expires>Date.now()&&g.scopes.includes(scope)&&(!shop||g.shops.includes(shop)));}
function accounts(s,shop){return catalog.accounts.filter(a=>a.tenant===s.tenant&&grant(s,'douyin',a.id,'publish',shop));}
function demoAuthorize(s,kind,id,scopes,shopIds){const entries=kind==='douyin'?catalog.accounts:catalog.merchants;const item=entries.find(x=>x.id===id&&x.tenant===s.tenant);if(!item)throw Error('账号不属于当前企业');const validShops=shops(s).filter(x=>kind==='douyin'||x.merchant===id).map(x=>x.id);if(shopIds.some(x=>!validShops.includes(x)))throw Error('门店不在当前授权范围');const allowed=selectableScopes(kind);if(scopes.some(x=>!allowed.includes(x)))throw Error('所选能力未确认适用或已下线，不可授权');s.grants=s.grants.filter(g=>!(g.tenant===s.tenant&&g.kind===kind&&g.id===id));s.grants.push({tenant:s.tenant,kind,id,name:item.name,scopes:[...scopes],shops:[...shopIds],active:true,expires:Date.now()+30*86400000,mode:'demo'});invalidate(s);log(s,'保存示例'+(kind==='douyin'?'抖音':'来客')+'授权：'+item.name);}
function revoke(s,kind,id){const g=s.grants.find(g=>g.tenant===s.tenant&&g.kind===kind&&g.id===id);if(g)g.active=false;invalidate(s);log(s,'撤销示例授权，后续任务须重新检查');}
function changeTenant(s,id){if(!catalog.tenants.some(x=>x.id===id))return;s.tenant=id;s.brief=null;s.asset=null;s.target={account:'',shop:'',product:'',title:''};s.reportConfig=null;invalidate(s);}
function products(s,shop){const st=shops(s).find(x=>x.id===shop);if(!st||!grant(s,'laike',st.merchant,'goods',shop))return [];return catalog.products.filter(x=>x.tenant===s.tenant&&x.shops.includes(shop)&&x.online);}
function prefill(request){const duration=request.match(/(15|20|30|45|60)\s*秒/);const avoid=request.match(/(?:不要|避免|不出现)([^。\n]+)/g)||[];return {request,goal:/直播/.test(request)?'为门店直播引流':/会员/.test(request)?'介绍门店会员活动':'展示门店服务与活动',audience:'门店周边车主',theme:/洗车/.test(request)?'洗车服务':/会员/.test(request)?'会员活动':'门店展示',style:/专业/.test(request)?'专业可信':/电影/.test(request)?'电影质感':'自然真实',duration:duration?duration[1]:'15',ratio:/横屏|16:9/.test(request)?'16:9':'9:16',voice:'自然口播',subtitles:'简洁中文字幕',music:'轻快、不过度抢占人声',cta:/直播/.test(request)?'查看本店直播':'查看门店活动详情',must:'准确展示门店环境与服务；活动条件以确认后的商品资料为准',avoid:avoid.join('；')||'不虚构价格、权益和服务效果；不出现危险操作',notes:'价格、活动日期及适用条件需要确认；素材授权和人物出镜需核实'};}
function fingerprint(s){return JSON.stringify([s.tenant,s.brief,s.asset,s.target,s.revision]);}
function validatePublish(s,real=false){const t=s.target;const st=shops(s).find(x=>x.id===t.shop);if(!st)return '请选择当前企业的授权门店';if(!grant(s,'douyin',t.account,'publish',t.shop))return '目标抖音号未授权、已过期或不在门店授权范围';if(!grant(s,'laike',st.merchant,'goods',t.shop))return '请完成该门店的来客商品读取授权';if(t.mode==='nativeProduct')return '原生团购商品挂载能力未确认，暂不可选择';if(t.product&&!products(s,t.shop).some(p=>p.id===t.product))return '请选择该门店已授权且在售的商品';if(!s.brief)return '请先确认创作简报';if(!s.asset||!s.asset.confirmed)return '请先预览并确认当前成片';if(!t.title.trim()||t.title.length>1000)return '发布标题不能为空且不超过1000字';if(real)return '真实发布服务尚未接入；需平台确认并获批video.create.bind、用户授权及POI资质';return '';}
function previewPublish(s){const error=validatePublish(s);if(error)return error;s.preview={key:fingerprint(s),tenant:s.tenant,target:{...s.target},asset:{...s.asset}};s.ack=false;return '';}
function savePublish(s){const error=validatePublish(s);if(error)return {ok:false,error};if(!s.preview||s.preview.key!==fingerprint(s)||s.preview.tenant!==s.tenant||!s.ack)return {ok:false,error:'内容或授权已变化，请重新预览并确认'};const existing=s.jobs.find(j=>j.key===s.preview.key);if(existing)return {ok:true,duplicate:true,job:existing};const job={...s.preview,id:'DEMO_JOB_'+(s.jobs.length+1),status:'待接口接入',created:new Date().toISOString()};s.jobs.push(job);log(s,'保存发布演示任务 '+job.id+'；未上传、未发布');return {ok:true,job};}
function dailyReport(s,shop,date,sample){const st=shops(s).find(x=>x.id===shop);if(!st)return null;const permission=(kind,scope)=>kind==='laike'?!!grant(s,kind,st.merchant,scope,shop):s.grants.some(g=>g.tenant===s.tenant&&g.kind===kind&&g.active&&g.expires>Date.now()&&g.shops.includes(shop)&&g.scopes.includes(scope));const specs=[['支付金额','¥38,240','laike','sales','仅统计已获授权及已同步订单，按实际支付时间；不宣称等同来客全量GMV'],['退款金额','¥1,180','laike','sales','按退款成功时间'],['核销金额','¥27,860','laike','verify','按验券记录时间；排除撤销、去重，金额字段需与商家确认，不等同收入'],['直播成交金额','¥8,640','douyin','live','直播归因示例，归因接口待核验'],['视频播放次数','12,840','douyin','video','所选日播放增量示例，非历史累计']];return {date,shop:st,metrics:specs.map(([name,value,kind,scope,definition])=>({name,value:policy[scope].selectable&&sample&&permission(kind,scope)?value:null,source:kind==='laike'?'来客':'抖音号',definition,status:!policy[scope].selectable?policy[scope].label:sample&&permission(kind,scope)?'示例数据':'未授权或未接入'})),reviews:policy.reviews.selectable&&sample&&permission('laike','reviews')?[{text:'到店后活动适用条件解释不清楚。',rating:'低分评价示例',action:'核对适用条件，与门店确认后再回复。'}]:null};}
function validLiveUrl(value){if(/^\d{6,30}$/.test(value))return true;try{const u=new URL(value);return u.protocol==='https:'&&['live.douyin.com','v.douyin.com'].includes(u.hostname)&&u.pathname!=='/';}catch{return false;}}
function liveAssessment(sample){return {level:sample?'待提升（示例）':'需补充核验',dimensions:[{name:'画面质量',status:sample?'部分达标':'需核验',evidence:sample?'示例：贴片遮挡商品展示区域。':'未获取实时画面。'},{name:'商品吸引力',status:sample?'部分达标':'需核验',evidence:sample?'示例：适用门店与使用条件展示不完整。':'未取得商品讲解证据。'},{name:'主播专业度',status:'需核验',evidence:'需录屏和声音；单次抓帧不能判断互动、讲解和开播时长。'},{name:'投流运营能力',status:'需核验',evidence:'需授权后台或运营配置核验投流、短视频引流及福利动作。'}]};}
const api={policy,selectableScopes,catalog,createState,shops,grant,accounts,demoAuthorize,revoke,changeTenant,products,prefill,log,invalidate,fingerprint,validatePublish,previewPublish,savePublish,dailyReport,validLiveUrl,liveAssessment};
if(typeof module!=='undefined'&&module.exports)module.exports=api;else root.DouyinModel=api;
})(typeof window!=='undefined'?window:globalThis);
