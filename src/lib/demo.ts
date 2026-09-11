export type Tier='guest'|'member';
export type Entry={campaignId:string;reward:string;claimed:boolean};
// Draw-type reward state machine per 04_추첨_개인정보_알림_광고.md §3.
// DRAW_PENDING is reserved for a future real "entries close, draw runs" server job;
// this demo treats ENTERED as the single waiting state and simulates the announcement directly.
export type DrawStatus='ENTERED'|'DRAW_PENDING'|'WON'|'NOT_SELECTED'|'WINNER_ACTION_REQUIRED'|'VERIFIED'|'FULFILLING'|'DELIVERED'|'FORFEITED'|'CANCELLED';
export type Shipping={recipient:string;phone:string;zip:string;address:string};
export type DrawEntry={campaignId:string;status:DrawStatus;shipping?:Shipping};
export type DemoState={tier:Tier;entries:Entry[];drawEntries:DrawEntry[];marketing:boolean};
export const initial:DemoState={tier:'guest',entries:[],drawEntries:[],marketing:false};
export type RewardMode='guaranteed'|'draw';
export type Category='coffee'|'watch'|'bag'|'crypto';
export const campaigns=[
{id:'magok',n:'01',type:'CITY DROP',category:'coffee' as Category,title:'마곡 나이트 드롭',subtitle:'도시의 밤, 커피 한 잔의 여유',location:'마곡 르웨스트',area:'마곡',time:'데모 상시 체험',status:'체험 가능',reward:'카페 쿠폰 3,000원',premium:'카페 쿠폰 5,000원',qty:'무제한 · 선착순 없음',kind:'확정 리워드',rewardMode:'guaranteed' as RewardMode,code:'SEESON-MAGOK',partner:'라이프스타일 브랜드 제휴 제안',description:'미디어아트가 켜지는 순간, 도시의 스크린이 새로운 만남의 장소가 됩니다. 현장 QR 참여 후 카페 쿠폰을 받아보세요.',note:'실제 지급 없는 무료 베타 체험입니다. 가입 후 카페 쿠폰 3,000원 수령 흐름을 체험합니다.'},
{id:'rolex',n:'02',type:'HYPE DROP',category:'watch' as Category,title:'롤렉스 즉석 드롭',subtitle:'스캔 즉시 당첨 여부를 그 자리에서 확인',location:'현장 스크린 (장소 협의 중)',area:'미정',time:'일정 협의 중',status:'제휴 제안',reward:'롤렉스 서브마리너 즉석 당첨',premium:'롤렉스 서브마리너 즉석 당첨',qty:'1개 한정 · 선착순 즉석당첨',kind:'즉석 당첨',rewardMode:'guaranteed' as RewardMode,code:'',partner:'시계 공식 판매점 · 리셀 플랫폼 협업 후보 / 미확정',description:'한정 수량의 롤렉스 서브마리너를 걸고, 스캔 즉시 당첨 여부까지 현장에서 바로 확인하는 초고가 리워드 시나리오입니다. 준비된 수량이 소진되면 응모 자체가 종료되는 방식으로, 현장의 긴장감과 화제성을 동시에 노립니다.',note:'브랜드 협업 · 실물 재고 · 법적 검토가 끝나야 실제 QR 참여가 열리는 제안 단계입니다. 확정된 수량과 발표 방식은 아직 없습니다.'},
{id:'birkin',n:'03',type:'HYPE DROP',category:'bag' as Category,title:'에르메스 버킨백 추첨 드롭',subtitle:'응모하고 발표를 기다리는 하이엔드 리워드',location:'장소 협의 중',area:'미정',time:'일정 협의 중',status:'제휴 제안',reward:'에르메스 버킨백 무료 응모권',premium:'에르메스 버킨백 무료 응모권',qty:'1개 한정 · 응모 추첨',kind:'무료 추첨',rewardMode:'draw' as RewardMode,code:'',partner:'명품 편집숍 · 리셀 플랫폼 협업 후보 / 미확정',description:'에르메스 버킨백을 상품으로 건 추첨형 캠페인 제안입니다. 응모는 QR로 접수하고, 마감 후 운영팀이 추첨을 진행해 당첨자를 발표하는 방식입니다. 브랜드 · 수량 · 발표 일정은 파트너 협의 후 확정합니다.',note:'실제 응모가 아닌 시나리오 제안입니다. 브랜드 협업 · 재고 · 발표 일정은 아직 확정되지 않았습니다.'},
{id:'btc',n:'04',type:'HYPE DROP',category:'crypto' as Category,title:'1 BTC 추첨 드롭',subtitle:'도시의 스크린이 거는 가장 뜨거운 응모',location:'장소 협의 중',area:'미정',time:'일정 협의 중',status:'제휴 제안',reward:'1 BTC 무료 응모권',premium:'1 BTC 무료 응모권',qty:'1 BTC · 응모 추첨',kind:'에어드랍 추첨',rewardMode:'draw' as RewardMode,code:'',partner:'거래소 · Web3 프로젝트 후원 후보 / 미확정',description:'1 BTC를 상품으로 건 추첨형 캠페인 제안입니다. 응모는 QR로 접수하고, 마감 후 운영팀이 추첨을 진행해 당첨자를 발표합니다. 지갑 연결이나 실제 코인 지급은 제공하지 않으며, 지급 방식은 파트너 · 거래소 협의 후 확정합니다.',note:'현재 지갑 연결 · 지급은 제공하지 않습니다. 상장이나 가격 상승을 보장하지 않으며 거래소 · 프로젝트와의 계약은 미확정입니다.'}
];
type EntryError={error?:string;errorCode?:'invalid'|'expired'|'duplicate'|'sold-out'};
function specialCode(code:string):EntryError|null{
 const upper=code.trim().toUpperCase();
 if(upper==='SEESON-SOLDOUT')return {error:'준비된 리워드가 모두 소진됐어요. 기존에 확보한 리워드는 보관함에서 확인하세요.',errorCode:'sold-out'};
 if(upper==='SEESON-EXPIRED')return {error:'이 QR의 참여 시간이 지났어요. 새로운 QR로 다시 참여해주세요.',errorCode:'expired'};
 return null;
}
export function participate(state:DemoState,code:string):{state:DemoState}&EntryError{
 const special=specialCode(code);if(special)return {state,...special};
 const c=campaigns.find(c=>c.rewardMode==='guaranteed'&&c.code&&c.code===code.trim().toUpperCase());
 if(!c)return {state,error:'참여 코드를 확인해주세요. 데모 코드는 SEESON-MAGOK입니다.',errorCode:'invalid'};
 if(state.entries.some(e=>e.campaignId===c.id))return {state,error:'이미 참여한 드롭입니다. 내 리워드에서 확인하세요.',errorCode:'duplicate'};
 return {state:{...state,entries:[...state.entries,{campaignId:c.id,reward:c.reward,claimed:false}]}};
}
export function claim(state:DemoState,id:string):{state:DemoState;error?:string}{
 if(state.tier==='guest')return {state,error:'가입 체험 후 받을 수 있어요.'};
 const e=state.entries.find(e=>e.campaignId===id);
 if(!e)return {state,error:'참여 내역이 없습니다.'};
 if(e.claimed)return {state,error:'이미 받은 리워드입니다.'};
 return {state:{...state,entries:state.entries.map(e=>e.campaignId===id?{...e,claimed:true}:e)}};
}
// --- 추첨형(Draw) 흐름 ---
// enterDraw는 응모 접수만 담당한다. 당첨 여부는 실제 서비스에서는 마감 후 서버 추첨 작업이 결정하며,
// 이 데모에는 그런 작업이 없으므로 revealDraw로 결과를 사람이 직접 시뮬레이션한다.
export function enterDraw(state:DemoState,code:string):{state:DemoState}&EntryError{
 const special=specialCode(code);if(special)return {state,...special};
 const c=campaigns.find(c=>c.rewardMode==='draw'&&c.code&&c.code===code.trim().toUpperCase());
 if(!c)return {state,error:'응모 코드를 확인해주세요.',errorCode:'invalid'};
 if(state.drawEntries.some(e=>e.campaignId===c.id))return {state,error:'이미 응모한 캠페인입니다. 내 리워드에서 확인하세요.',errorCode:'duplicate'};
 return {state:{...state,drawEntries:[...state.drawEntries,{campaignId:c.id,status:'ENTERED'}]}};
}
function updateDraw(state:DemoState,campaignId:string,from:DrawStatus[],to:DrawStatus,extra?:Partial<DrawEntry>):{state:DemoState;error?:string}{
 const entry=state.drawEntries.find(e=>e.campaignId===campaignId);
 if(!entry)return {state,error:'응모 내역이 없습니다.'};
 if(!from.includes(entry.status))return {state,error:'지금은 진행할 수 없는 상태예요. 보관함에서 최신 상태를 확인해주세요.'};
 return {state:{...state,drawEntries:state.drawEntries.map(e=>e.campaignId===campaignId?{...e,status:to,...extra}:e)}};
}
// 데모 전용: 실제 서버 추첨 대신 사람이 결과를 눌러서 확인하는 시뮬레이션.
export function revealDraw(state:DemoState,campaignId:string,outcome:'won'|'lost'):{state:DemoState;error?:string}{
 return updateDraw(state,campaignId,['ENTERED','DRAW_PENDING'],outcome==='won'?'WON':'NOT_SELECTED');
}
export function acknowledgeWin(state:DemoState,campaignId:string):{state:DemoState;error?:string}{
 if(state.tier==='guest')return {state,error:'가입 체험 후 당첨을 확인할 수 있어요.'};
 return updateDraw(state,campaignId,['WON'],'WINNER_ACTION_REQUIRED');
}
export function verifyWinner(state:DemoState,campaignId:string):{state:DemoState;error?:string}{
 return updateDraw(state,campaignId,['WINNER_ACTION_REQUIRED'],'VERIFIED');
}
export function submitShipping(state:DemoState,campaignId:string,shipping:Shipping):{state:DemoState;error?:string}{
 if(!shipping.recipient.trim()||!shipping.phone.trim()||!shipping.zip.trim()||!shipping.address.trim())return {state,error:'수령인·연락처·우편번호·주소를 모두 입력해주세요.'};
 return updateDraw(state,campaignId,['VERIFIED'],'FULFILLING',{shipping});
}
// 데모 전용: 실제 배송 연동 없이 완료 상태만 체험.
export function markDelivered(state:DemoState,campaignId:string):{state:DemoState;error?:string}{
 return updateDraw(state,campaignId,['FULFILLING'],'DELIVERED');
}
export function drawStatusLabel(s:DrawStatus):string{
 switch(s){
  case 'ENTERED':case 'DRAW_PENDING':return '발표 대기';
  case 'WON':case 'WINNER_ACTION_REQUIRED':return '당첨';
  case 'NOT_SELECTED':return '미당첨';
  case 'VERIFIED':return '인증 완료';
  case 'FULFILLING':return '배송 준비';
  case 'DELIVERED':return '배송 완료';
  case 'FORFEITED':return '수령 기한 만료';
  case 'CANCELLED':return '취소됨';
 }
}
export function drawCta(s:DrawStatus):string{
 switch(s){
  case 'ENTERED':case 'DRAW_PENDING':return '발표 확인하기';
  case 'WON':case 'WINNER_ACTION_REQUIRED':return '당첨 확인하고 진행하기';
  case 'NOT_SELECTED':return '결과 보기';
  case 'VERIFIED':return '배송 정보 입력하기';
  case 'FULFILLING':return '진행 상태 보기';
  case 'DELIVERED':return '수령 내역 보기';
  default:return '자세히 보기';
 }
}
export function parseSaved(raw:string|null):DemoState{
 try{
  const s=JSON.parse(raw||'null');
  if(!s||!['guest','member','premium'].includes(s.tier)||!Array.isArray(s.entries))return initial;
  const validDrawStatus:DrawStatus[]=['ENTERED','DRAW_PENDING','WON','NOT_SELECTED','WINNER_ACTION_REQUIRED','VERIFIED','FULFILLING','DELIVERED','FORFEITED','CANCELLED'];
  const drawEntries:DrawEntry[]=Array.isArray(s.drawEntries)?s.drawEntries.filter((e:any)=>e&&typeof e.campaignId==='string'&&campaigns.some(c=>c.id===e.campaignId&&c.rewardMode==='draw')&&validDrawStatus.includes(e.status)).map((e:any)=>({campaignId:e.campaignId,status:e.status,...(e.shipping&&typeof e.shipping.recipient==='string'&&typeof e.shipping.phone==='string'&&typeof e.shipping.zip==='string'&&typeof e.shipping.address==='string'?{shipping:e.shipping}:{})})):[];
  return {
   tier:s.tier==='guest'?'guest':'member',
   marketing:s.marketing===true,
   entries:s.entries.filter((e:any)=>e&&e.campaignId==='magok'&&typeof e.claimed==='boolean'&&[campaigns[0].reward,campaigns[0].premium].includes(e.reward)).slice(0,1).map((e:Entry)=>({...e,reward:campaigns[0].reward})),
   drawEntries
  };
 }catch{return initial;}
}
