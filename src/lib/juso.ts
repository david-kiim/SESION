// 도로명주소 검색 API (행정안전부 · business.juso.go.kr) 연동.
//
// 사용 방법:
// 1) https://business.juso.go.kr 에서 오픈API 신청 → 승인키(confmKey) 발급 (본인 인증 필요, 무료).
// 2) 발급받은 키를 아래 JUSO_CONFM_KEY 에 넣으면 주소 검색이 바로 동작한다.
//
// 키가 비어있는 동안은 검색 UI에서 "준비 중" 안내만 보여주고, 사용자는 계속 직접 입력할 수 있다
// (기존 동작과 동일하게 안전하게 폴백된다).
export const JUSO_CONFM_KEY = '';

export type JusoResult = { roadAddr: string; zipNo: string; jibunAddr: string };

export async function searchJusoAddress(keyword: string): Promise<JusoResult[]> {
  if (!JUSO_CONFM_KEY) throw new Error('NO_KEY');
  const trimmed = keyword.trim();
  if (!trimmed) return [];
  const url = `https://business.juso.go.kr/addrlink/addrLinkApi.do?confmKey=${encodeURIComponent(JUSO_CONFM_KEY)}&currentPage=1&countPerPage=15&keyword=${encodeURIComponent(trimmed)}&resultType=json`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('NETWORK');
  const data = await res.json();
  const common = data?.results?.common;
  if (common?.errorCode && common.errorCode !== '0') throw new Error(common.errorMessage || 'API_ERROR');
  const juso = data?.results?.juso || [];
  return juso.map((j: Record<string, string>) => ({
    roadAddr: j.roadAddr || '',
    zipNo: j.zipNo || '',
    jibunAddr: j.jibunAddr || '',
  }));
}
