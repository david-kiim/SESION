// Manually curated public references, checked 2026-09-08; not a live inventory API.
// Coordinates are publisher-supplied media locations, NOT verified safe scanning positions.
export const spots = [
 {id:'coex',number:'01',area:'강남',name:'코엑스 케이팝스퀘어',address:'서울 강남구 영동대로 513',lat:37.50982184,lng:127.06167063,placement:'코엑스 남측 외벽의 대형 커브드 전광판',transit:'삼성역 · 2호선',size:'81 × 20 m',source:'https://hello-ooh.com/media/코엑스-케이팝스퀘어-전광판/KR-DB-00299',sourceId:'KR-DB-00299'},
 {id:'parnas',number:'02',area:'강남',name:'파르나스 미디어타워',address:'서울 강남구 테헤란로 521',lat:37.50892349,lng:127.06161243,placement:'삼성역 인근 파르나스의 세로형 전광판',transit:'삼성역 · 2호선',size:'12.3 × 26 m',source:'https://hello-ooh.com/media/파르나스-미디어타워-전광판/KR-DB-00106',sourceId:'KR-DB-00106'},
 {id:'koreana',number:'03',area:'광화문',name:'코리아나호텔 K-VISION',address:'서울 중구 세종대로 135',lat:37.56847899,lng:126.97671172,placement:'세종대로 코리아나호텔의 세로형 전광판',transit:'시청역 · 광화문역',size:'20 × 60 m',source:'https://hello-ooh.com/media/광화문-코리아나호텔-K-VISION-전광판/KR-DB-00102',sourceId:'KR-DB-00102'}
] as const;
export type Spot = typeof spots[number];
export function directionsUrl(spot:Spot){return `https://map.naver.com/index.nhn?elng=${spot.lng}&elat=${spot.lat}&etext=${encodeURIComponent(spot.name)}&menu=route`}
export function mapEmbedUrl(spot:Spot){const dx=.0025,dy=.0018;return `https://www.openstreetmap.org/export/embed.html?bbox=${spot.lng-dx}%2C${spot.lat-dy}%2C${spot.lng+dx}%2C${spot.lat+dy}&layer=mapnik&marker=${spot.lat}%2C${spot.lng}`}
