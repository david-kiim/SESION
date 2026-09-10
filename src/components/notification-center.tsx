'use client';
import {Bell,Check,ChevronRight,Gift,MapPin} from 'lucide-react';
import {Checkbox} from '@/components/ui/checkbox';
import {localize,type Language} from '@/lib/i18n';
export type InboxItem={id:string;title:string;body:string;target:'spots'|'wallet';sample:boolean};
export const sampleNotifications:InboxItem[]=[
 {id:'preview-spots-v1',title:'다음 에피소드의 장소를 만나보세요.',body:'강남·광화문 전광판을 미리 둘러보세요. 실제 이벤트 일정은 미정입니다.',target:'spots',sample:true},
 {id:'preview-reward-v1',title:'리워드 알림은 이곳에 모여요.',body:'보상 확보와 수령 상태를 알림함에서 확인하는 화면 예시입니다.',target:'wallet',sample:true}
];
export function NotificationCenter({language,items,readIds,onRead,onReadAll,onOpen,events,rewards,onEvents,onRewards}:{language:Language;items:InboxItem[];readIds:string[];onRead:(id:string)=>void;onReadAll:()=>void;onOpen:(target:'spots'|'wallet')=>void;events:boolean;rewards:boolean;onEvents:(v:boolean)=>void;onRewards:(v:boolean)=>void}){
 return localize(<div className="notification-center"><div className="inbox-toolbar"><span>이벤트와 리워드 소식</span><button className="text-button" disabled={items.every(i=>readIds.includes(i.id))} onClick={onReadAll}><Check size={15}/>모두 읽음</button></div><div className="inbox-items">{items.map(item=><button key={item.id} className={'inbox-item '+(!readIds.includes(item.id)?'is-unread':'')} onClick={()=>{onRead(item.id);onOpen(item.target)}}><span className="inbox-icon">{item.target==='spots'?<MapPin size={21}/>:<Gift size={21}/>}</span><span className="inbox-copy"><small>{item.sample?'샘플 알림':'내 체험 알림'}{!readIds.includes(item.id)&&<i aria-label="읽지 않음"/>}</small><strong>{item.title}</strong><span>{item.body}</span></span><ChevronRight size={16}/></button>)}</div><details className="inbox-preferences"><summary><Bell size={17}/>알림 수신 설정</summary><label className="check-label"><Checkbox checked={events} onCheckedChange={v=>onEvents(!!v)}/>이벤트 소식 <small>선택 · 체험</small></label><label className="check-label"><Checkbox checked={rewards} onCheckedChange={v=>onRewards(!!v)}/>리워드 상태 <small>체험</small></label><p>설정은 이 기기에만 저장됩니다. 실제 푸시는 발송되지 않으며, 브라우저 알림 권한을 요청하지 않습니다.</p><p>정식 이벤트 홍보 알림은 별도 마케팅 동의와 기기 알림 허용 후 제공됩니다.</p></details></div>,language)
}
