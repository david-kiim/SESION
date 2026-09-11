'use client';
import {useState,useEffect,useRef} from 'react';
import {MapPin,ArrowUpRight,Navigation,ScanLine,ExternalLink,TrainFront,Clock,Gift} from 'lucide-react';
import {spots,directionsUrl} from '@/lib/spots';
import {localize,type Language} from '@/lib/i18n';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

function pinIcon(active:boolean){
 return L.divIcon({
  className:'seeson-pin'+(active?' seeson-pin-active':''),
  html:'<span></span>',
  iconSize:active?[30,30]:[20,20],
  iconAnchor:active?[15,29]:[10,19]
 });
}

export function SpotExplorer({language,onDemo,initialSpot='coex'}:{language:Language;onDemo:()=>void;initialSpot?:string}){
 const [selected,setSelected]=useState<string>(initialSpot);
 const [region,setRegion]=useState('전체');
 const mapHost=useRef<HTMLDivElement|null>(null);
 const mapRef=useRef<L.Map|null>(null);
 const markersRef=useRef<Record<string,L.Marker>>({});
 const spot=spots.find(s=>s.id===selected)||spots[0];
 function choose(id:string){setSelected(id)}

 useEffect(()=>{
  if(!mapHost.current||mapRef.current)return;
  const map=L.map(mapHost.current,{zoomControl:false,scrollWheelZoom:false,attributionControl:true}).setView([spot.lat,spot.lng],15);
  L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',{
   attribution:'&copy; OpenStreetMap &copy; CARTO',
   subdomains:'abcd',maxZoom:20
  }).addTo(map);
  L.control.zoom({position:'topright'}).addTo(map);
  spots.forEach(s=>{
   const marker=L.marker([s.lat,s.lng],{icon:pinIcon(s.id===selected)}).addTo(map);
   marker.on('click',()=>choose(s.id));
   markersRef.current[s.id]=marker;
  });
  mapRef.current=map;
  const resize=setTimeout(()=>map.invalidateSize(),120);
  return ()=>{clearTimeout(resize);map.remove();mapRef.current=null;markersRef.current={}};
  // eslint-disable-next-line react-hooks/exhaustive-deps
 },[]);

 useEffect(()=>{
  const map=mapRef.current;if(!map)return;
  map.flyTo([spot.lat,spot.lng],16,{duration:.6});
  Object.entries(markersRef.current).forEach(([id,marker])=>marker.setIcon(pinIcon(id===selected)));
  // eslint-disable-next-line react-hooks/exhaustive-deps
 },[selected]);

 return localize(<section className="spot-explorer">
  <div className="map-regions" aria-label="지역 선택">{['전체','강남','광화문'].map(r=><button key={r} aria-pressed={region===r} onClick={()=>{setRegion(r);const first=spots.find(s=>r==='전체'||s.area===r);if(first)choose(first.id)}}>{r}</button>)}</div>
  <div className="map-viewport"><div ref={mapHost} className="leaflet-host"/></div>
  <div className="map-caption"><span><MapPin size={13}/>매체 위치 기준</span><span>© OpenStreetMap · CARTO</span></div>
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
