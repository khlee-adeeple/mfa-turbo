// 광고주 목록 데이터 칼럼 형식
export interface AdvertiserListTableRow {
  adminName: string
  advertiserId: number
  advertiserLevel: string
  advertiserUserId: string
  companyName: string
  createdAt: string // 날짜
  email: string // 이메일
  memberInfoId: number
  settleManagerName: string
  settleManagerPhoneNo: string // -없는 폰번호
  ssnCrn: string
  status: string
  totalCountList: number
}

// 광고주 목록 응답 형식
export interface AdvertiserListRes {
  contentList: AdvertiserListTableRow[]
  direction: null
  lastIds: null
  pageNumber: number
  pageSize: number
  sortColumnName: null
  totalElements: number
  totalPages: number
}

// 광고주 목록 요청 형식
export interface FetchAdvertiserListParams {
    page?: number;
    pageSize: number;
    searchStr: string;
  }
  
  export async function fetchAdvertiserList({
    page = 0,
    pageSize,
    searchStr,
  }: FetchAdvertiserListParams) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/member/advertiser/admin/search-list`, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        page,
        pageSize,
        searchStr,
      }),
      cache: 'no-store', // 항상 최신 데이터 원할 경우
    });
  
    if (!response.ok) {
      const errText = await response.text();
      throw new Error(`API 요청 실패: ${response.status} - ${errText}`);
    }
  
    const data = await response.json();
  
    return data; // data.contentList, data.pageNumber 등 포함
  }