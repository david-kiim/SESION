'use client';
import {useState} from 'react';
import {MapPin,ArrowUpRight,Navigation,ScanLine,ExternalLink,TrainFront,Clock,Gift} from 'lucide-react';
import {spots,directionsUrl,mapEmbedUrl} from '@/lib/spots';
import {localize,type Language} from '@/lib/i18n';
export function SpotExplorer({language,onDemo,initialSpot='coex'}:{language:Language;onDemo:()=>void;initialSpot?:string}){
 const [selected,setSelected]=useState<string>(initialSpot);
 const [region,setRegion]=useState('전체');

 const [mapError,setMapError]=useState(false);
 const spot=spots.find(s=>s.id===selected)||spots[0];
 function choose(id:string){setSelected(id);setMapError(false)}
 return localize(<section className="spot-explorer">
  <div className="map-regions" aria-label="지역 선택">{['전체','강남','광화문'].map(r=><button key={r} aria-pressed={region===r} onClick={()=>{setRegion(r);const first=spots.find(s=>r==='전체'||s.area===r);if(first)choose(first.id)}}>{r}</button>)}</div>
  <div className="map-viewport">
   <iframe key={spot.id} src={mapEmbedUrl(spot)} title={spot.name+' 위치 지도'} onError={()=>setMapError(true)} loading="eager" referrerPolicy="strict-origin-when-cross-origin"/>
  </div>
  <div className="map-caption"><span><MapPin size={13}/>매체 위치 기준</span><span>© OpenStreetMap contributors</span></div>
  {mapError&&<p role="status" className="map-fallback">지도를 불러오지 못했어요. 아래 길찾기로 위치를 확인해주세요.</p>}
  <div className="map-spots" aria-label="전광판 선택">{spots.filter(s=>region==='전체'||s.area===region).map(s=><button key={s.id} aria-pressed={selected===s.id} onClick={()=>choose(s.id)}><span>{s.number}</span><span>{s.name}</span><MapPin size={16}/></button>)}</div>
  <article className="map-spot-detail" aria-live="polite">
   <div className="map-card-top"><span>{spot.area}</span><span>샘플 · 이벤트 미정</span></div>
   <h2>{spot.name}</h2><p className="spot-address">{spot.address}</p>
   <div className="event-summary"><div><Clock size={17}/><span>다음 참여<strong>일정 준비 중</strong></span></div><div><Gift size={17}/><span>리워드<strong>공개 예정</strong></span></div></div>
   <div className="spot-metadata"><span><TrainFront size={15}/>{spot.transit}</span><span>{spot.size}</span></div>
   <a className="primary full" href={directionsUrl(spot)} target="_blank" rel="noopener noreferrer">위치 찾아가기<Navigation size={20}/></a>
   <details className="viewing-details" key={spot.id}><summary>전광판과 관람 위치</summary><p className="spot-placement">{spot.placement}</p><p>안전한 QR 관람 지점은 현장 확인 후 안내합니다.</p><a href={spot.source} target="_blank" rel="noopener noreferrer">전광판 사진 확인<ExternalLink size={14}/></a></details>
   <div className="map-link-row"><a href={`https://www.openstreetmap.org/?mlat=${spot.lat}&mlon=${spot.lng}#map=18/${spot.lat}/${spot.lng}`} target="_blank" rel="noopener noreferrer">큰 지도<ArrowUpRight size={15}/></a><a href={spot.source} target="_blank" rel="noopener noreferrer">매체 정보 출처<ExternalLink size={13}/></a></div>
   <p className="map-caution">장소 탐색 샘플 · 현재 진행 중인 이벤트가 아닙니다.</p>
  </article>
  <button className="map-demo-link" onClick={onDemo}><ScanLine size={22}/><span>마곡 드롭 체험<small>참여 흐름을 먼저 경험해보세요.</small></span><ArrowUpRight size={18}/></button>
 </section>,language)
}
