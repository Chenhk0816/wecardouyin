const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const nodes={'#dyLiveResult':{innerHTML:'旧链接的结果'}};
const ctx={console,Date,Intl,Set,URL,URLSearchParams,Blob,localStorage:{getItem:()=>null,setItem(){}},document:{querySelector:s=>nodes[s]||null},URL:class extends URL{static revokeObjectURL(){} static createObjectURL(){return 'blob:new';}}};
vm.createContext(ctx);vm.runInContext(fs.readFileSync('prototype/douyin-model.js','utf8')+fs.readFileSync('prototype/douyin-ui.js','utf8')+fs.readFileSync('prototype/video-ui.js','utf8'),ctx);
vm.runInContext('render=()=>{}; toast=()=>{}; $=s=>document.querySelector(s);',ctx);
function run(s){return vm.runInContext(s,ctx)}
run(`videoFlow.previewUrl='blob:old';videoFlow.metadata='旧视频';videoFlow.pendingOutput={id:'old',kind:'local'};vChange();`);
assert.equal(run('videoFlow.previewUrl'),'','brief edit clears old player');
assert.equal(run('videoFlow.pendingOutput'),null,'brief edit clears pending file');
run(`videoFlow.previewUrl='blob:new';videoFlow.mediaContext={tenant:'a',revision:dyState.revision,url:'blob:new'};videoFlow.pendingOutput={id:'new',kind:'local'};`);
run(`vVideoMetadata({currentSrc:'blob:old',src:'blob:old',duration:10,videoWidth:100,videoHeight:100});`);
assert.equal(run('dyState.asset'),null,'stale media event cannot confirm a different file');
run(`dyState.tenant='b';vVideoMetadata({currentSrc:'blob:new',src:'blob:new',duration:10,videoWidth:100,videoHeight:100});`);
assert.equal(run('dyState.asset'),null,'stale event cannot cross tenants');
run(`dyUI.liveResult={level:'旧结果'};dyLiveInput('https://live.douyin.com/987654321');`);
assert.equal(run('dyUI.liveResult'),null);assert.equal(nodes['#dyLiveResult'].innerHTML,'','changing URL removes rendered old assessment');
console.log('PASS: media cleanup, stale file/tenant callbacks, live URL result invalidation');
