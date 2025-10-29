/* eslint-disable */
/* tslint:disable */
// @ts-nocheck
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface CountryOfOrigin {
  /**
   * 품목
   * @minLength 1
   * @maxLength 10
   * @example "돼지고기"
   */
  item: string;
  /**
   * 원산지
   * @minLength 1
   * @maxLength 10
   * @example "국내산"
   */
  origin: string;
}

export interface StoreSettingUpdateRequest {
  /**
   * KSNET 단말기 번호
   * @minLength 8
   * @maxLength 30
   * @example "DPTOTEST03"
   */
  ksnetDeviceNo: string;
  /**
   * POS 여분 테이블 표시 수
   * @format int32
   * @min 0
   * @max 10
   * @example 5
   */
  extraTableCount: number;
  /**
   * 주방 프린터와 연결된 기기 위치
   * @example "POS"
   */
  printerLocation: "POS" | "HALL";
  /**
   * 손님 테이블 메뉴 팝업 보이기 여부
   * @example true
   */
  showMenuPopup: boolean;
  /**
   * 손님 테이블 총 주문 금액 표시 여부
   * @example true
   */
  showOrderTotalPrice: boolean;
  /**
   * 홀 관리 주문 메뉴 이미지 표시 여부
   * @example true
   */
  showOrderMenuImage: boolean;
  /**
   * 원산지 정보
   * @maxItems 20
   * @minItems 0
   */
  countryOfOrigins: CountryOfOrigin[];
  /**
   * 직원 호출 옵션
   * @maxItems 12
   * @minItems 0
   * @example ["직원 호출","포장"]
   */
  staffCallOptions: string[];
}

export interface StoreUpdateRequest {
  /**
   * 매장 전화번호
   * @minLength 1
   * @pattern ^\d{2,3}-\d{3,4}-\d{4}$
   * @example "02-123-4567"
   */
  landline: string;
  setting: StoreSettingUpdateRequest;
}

export interface MenuOptionGroupModifyRequest {
  /**
   * 메뉴 옵션 그룹명
   * @minLength 1
   * @maxLength 30
   * @example "필수 옵션"
   */
  name: string;
  /**
   * 메뉴 옵션 그룹 타입 (필수, 옵셔널)
   * @example "MANDATORY"
   */
  type: "MANDATORY" | "OPTIONAL";
  /**
   * 주방 프린트 출력 여부
   * @example true
   */
  printEnabled: boolean;
  /**
   * 메뉴 옵션
   * @maxItems 20
   * @minItems 1
   */
  menuOptions: MenuOptionModifyRequest[];
}

export interface MenuOptionModifyRequest {
  /**
   * 메뉴 옵션명
   * @minLength 1
   * @maxLength 30
   * @example "밑반찬 주세요 O"
   */
  name: string;
  /**
   * 메뉴 옵션 가격
   * @format int64
   * @min -10000000
   * @max 10000000
   * @example 1000
   */
  price: number;
}

export interface MenuUpdateRequest {
  /**
   * 메뉴 이름
   * @minLength 1
   * @maxLength 30
   * @example "알리오올리오"
   */
  name: string;
  /**
   * 메뉴 설명
   * @minLength 0
   * @maxLength 100
   * @example "오일 파스타 대표 메뉴"
   */
  description: string;
  /**
   * 메뉴 가격
   * @format int64
   * @min 0
   * @max 10000000
   * @example 19900
   */
  price: number;
  /**
   * 맵기 단계
   * @format int32
   * @min 0
   * @max 10
   * @example 1
   */
  spicy: number;
  /**
   * 메뉴 상태
   * @example "DEFAULT"
   */
  state: "DEFAULT" | "HIDE" | "SOLD_OUT";
  /**
   * 메뉴 라벨
   * @example "BEST"
   */
  label: "DEFAULT" | "NEW" | "BEST" | "RECOMMEND";
  /**
   * 주방 프린트 출력 여부
   * @example true
   */
  printEnabled: boolean;
  /**
   * 메뉴 옵션 그룹
   * @maxItems 20
   * @minItems 0
   */
  menuOptionGroups: MenuOptionGroupModifyRequest[];
}

export interface DeviceUpdateRequest {
  /**
   * 기기 이름
   * @minLength 1
   * @maxLength 20
   * @example "1번 테이블"
   */
  name: string;
  /**
   * 기기 사용 용도
   * @example "TABLE"
   */
  purpose: "POS" | "HALL" | "TABLE" | "WAITING";
  /**
   * 테이블 번호
   * @format int32
   * @min 0
   * @max 100
   * @example 1
   */
  tableNo: number;
  /**
   * 결제 타입 (선결제, 후결제)
   * @example "POSTPAID"
   */
  paymentType: "PREPAID" | "POSTPAID";
}

export interface CategoryUpdateRequest {
  /**
   * 카테고리 이름
   * @minLength 1
   * @maxLength 20
   * @example "스테이크"
   */
  name: string;
}

export interface RegistrationReapplyRequest {
  /**
   * 매장 이름
   * @minLength 1
   * @maxLength 30
   * @example "홍길동식당"
   */
  name: string;
  /**
   * 대표자명
   * @minLength 1
   * @maxLength 20
   * @example "홍길동"
   */
  ceoName: string;
  /**
   * 매장 주소
   * @minLength 1
   * @maxLength 50
   * @example "경상남도 창원시 의창구 123"
   */
  address: string;
  /**
   * 매장 전화번호
   * @minLength 1
   * @pattern ^\d{2,3}-\d{3,4}-\d{4}$
   * @example "055-123-4567"
   */
  landline: string;
  /**
   * 사업자 등록번호
   * @minLength 1
   * @pattern ^\d{3}-\d{2}-\d{5}$
   * @example "443-60-00875"
   */
  license: string;
}

export interface RegistrationApplyRequest {
  /**
   * 매장 이름
   * @minLength 1
   * @maxLength 30
   * @example "홍길동식당"
   */
  name: string;
  /**
   * 대표자명
   * @minLength 1
   * @maxLength 20
   * @example "홍길동"
   */
  ceoName: string;
  /**
   * 매장 주소
   * @minLength 1
   * @maxLength 50
   * @example "경상남도 창원시 의창구 123"
   */
  address: string;
  /**
   * 매장 전화번호
   * @minLength 1
   * @pattern ^\d{2,3}-\d{3,4}-\d{4}$
   * @example "055-123-4567"
   */
  landline: string;
  /**
   * 사업자 등록번호
   * @minLength 1
   * @pattern ^\d{3}-\d{2}-\d{5}$
   * @example "443-60-00875"
   */
  license: string;
  /**
   * 사업자 등록증 파일
   * @format binary
   * @example "business_license.pdf"
   */
  file: File;
}

export interface MenuMovePositionRequest {
  /**
   * 대상 메뉴로 이동할 위치(전,후)
   * @example "NEXT"
   */
  where: "PREV" | "NEXT";
}

export interface MenuDeleteRequest {
  /**
   * 삭제할 메뉴 ID 목록
   * @maxItems 2147483647
   * @minItems 1
   */
  menuIds: number[];
  stringMenuIds?: string[];
}

export interface DeviceCreateRequest {
  /**
   * 휴대폰 번호
   * @minLength 1
   * @pattern ^01[016789]\d{8}$
   * @example "01044591812"
   */
  phoneNumber: string;
  /**
   * 기기 이름
   * @minLength 1
   * @maxLength 20
   * @example "1번 테이블"
   */
  name: string;
  /**
   * 기기 사용 용도
   * @example "TABLE"
   */
  purpose: "POS" | "HALL" | "TABLE" | "WAITING";
  /**
   * 테이블 번호
   * @format int32
   * @min 0
   * @max 100
   * @example 1
   */
  tableNo: number;
  /**
   * 결제 타입 (선결제, 후결제)
   * @example "POSTPAID"
   */
  paymentType: "PREPAID" | "POSTPAID";
}

export interface DeviceCreateResponse {
  /**
   * 기기 ID
   * @example "694865267482835533"
   */
  deviceId?: string;
  /**
   * 비밀키(이후 조회 불가)
   * @example "0KJEC3J6QF7TW"
   */
  secretKey?: string;
}

export interface CategoryCreateRequest {
  /**
   * 카테고리 이름
   * @minLength 1
   * @maxLength 20
   * @example "스테이크"
   */
  name: string;
}

export interface CategoryMovePositionRequest {
  /**
   * 대상 카테고리로 이동할 위치(전,후)
   * @example "NEXT"
   */
  where: "PREV" | "NEXT";
}

export interface MenuCreateRequest {
  /**
   * 메뉴 이름
   * @minLength 1
   * @maxLength 30
   * @example "알리오올리오"
   */
  name: string;
  /**
   * 메뉴 설명
   * @minLength 0
   * @maxLength 100
   * @example "오일 파스타 대표 메뉴"
   */
  description: string;
  /**
   * 메뉴 가격
   * @format int64
   * @min 0
   * @max 10000000
   * @example 19900
   */
  price: number;
  /**
   * 맵기 단계
   * @format int32
   * @min 0
   * @max 10
   * @example 1
   */
  spicy: number;
  /**
   * 메뉴 상태
   * @example "DEFAULT"
   */
  state: "DEFAULT" | "HIDE" | "SOLD_OUT";
  /**
   * 메뉴 라벨
   * @example "BEST"
   */
  label: "DEFAULT" | "NEW" | "BEST" | "RECOMMEND";
  /**
   * 주방 프린트 출력 여부
   * @example true
   */
  printEnabled: boolean;
  /**
   * 메뉴 옵션 그룹
   * @maxItems 20
   * @minItems 0
   */
  menuOptionGroups: MenuOptionGroupModifyRequest[];
}

export interface VerifyAuthCodeRequest {
  /**
   * 휴대폰 번호
   * @minLength 1
   * @pattern ^01[016789]\d{8}$
   * @example "01044591812"
   */
  phoneNumber: string;
  /**
   * 인증 번호
   * @format int32
   * @min 100000
   * @max 999999
   * @example 123456
   */
  code: number;
}

export interface StoreSimpleResponse {
  /**
   * 매장 ID
   * @example "694865267482835533"
   */
  storeId?: string;
  /**
   * 매장 이름
   * @example "홍길동식당"
   */
  name?: string;
}

export interface StoreSimpleResponses {
  stores?: StoreSimpleResponse[];
}

export interface SendAuthCodeRequest {
  /**
   * 휴대폰 번호
   * @minLength 1
   * @pattern ^01[016789]\d{8}$
   * @example "01044591812"
   */
  phoneNumber: string;
}

export interface AccountCreateRequest {
  /**
   * 이메일
   * @minLength 1
   * @pattern ^[\w+-.*]+@[\w-]+\.[\w-.]+$
   * @example "admin@everyonewaiter.com"
   */
  email: string;
  /**
   * 비밀번호: 영문, 숫자, 특수문자 조합 8자리 이상
   * @minLength 1
   * @pattern ^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()\-+=`~])[\w!@#$%^&*()\-+=`~]{8,}$
   * @example "@password1"
   */
  password: string;
  /**
   * 휴대폰 번호
   * @minLength 1
   * @pattern ^01[016789]\d{8}$
   * @example "01044591812"
   */
  phoneNumber: string;
}

export interface AccountSignInRequest {
  /**
   * 이메일
   * @minLength 1
   * @pattern ^[\w+-.*]+@[\w-]+\.[\w-.]+$
   * @example "admin@everyonewaiter.com"
   */
  email: string;
  /**
   * 비밀번호: 영문, 숫자, 특수문자 조합 8자리 이상
   * @minLength 1
   * @pattern ^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()\-+=`~])[\w!@#$%^&*()\-+=`~]{8,}$
   * @example "@password1"
   */
  password: string;
}

export interface SignInToken {
  /**
   * 액세스 토큰 (12시간)
   * @example "abcdefghijklmnopqrstuvwxyz"
   */
  accessToken?: string;
  /**
   * 리프레시 토큰 (2주)
   * @example "abcdefghijklmnopqrstuvwxyz"
   */
  refreshToken?: string;
}

export interface SendAuthMailRequest {
  /**
   * 이메일
   * @minLength 1
   * @pattern ^[\w+-.*]+@[\w-]+\.[\w-.]+$
   * @example "admin@everyonewaiter.com"
   */
  email: string;
}

export interface SignInTokenRenewRequest {
  /**
   * 리프레시 토큰
   * @minLength 1
   * @example "abcdefghijklmnopqrstuvwxyz"
   */
  refreshToken: string;
}

export interface StoreDetailResponse {
  /**
   * 매장 ID
   * @example "694865267482835533"
   */
  storeId?: string;
  /**
   * 계정 ID
   * @example "694865267482835533"
   */
  accountId?: string;
  /**
   * 매장 이름
   * @example "홍길동식당"
   */
  name?: string;
  /**
   * 대표자명
   * @example "홍길동"
   */
  ceoName?: string;
  /**
   * 매장 주소
   * @example "경상남도 창원시 의창구 123"
   */
  address?: string;
  /**
   * 매장 전화번호
   * @example "02-123-4567"
   */
  landline?: string;
  /**
   * 사업자 등록번호
   * @example "443-60-00875"
   */
  license?: string;
  /**
   * 사업자 등록증 이미지명
   * @example "license/202504/0KA652ZFZ26DG.webp"
   */
  image?: string;
  /**
   * 매장 영업 상태
   * @example "OPEN"
   */
  status?: "OPEN" | "CLOSE";
  /**
   * 마지막 매장 영업일
   * @format date-time
   * @example "2025-01-01 12:00:00"
   */
  lastOpenedAt?: string;
  /**
   * 마지막 매장 마감일
   * @format date-time
   * @example "2025-01-01 12:00:00"
   */
  lastClosedAt?: string;
  /** 매장 설정 */
  setting?: StoreSettingDetailResponse;
  /**
   * 매장 생성일
   * @format date-time
   * @example "2025-01-01 12:00:00"
   */
  createdAt?: string;
  /**
   * 매장 수정일
   * @format date-time
   * @example "2025-01-01 12:00:00"
   */
  updatedAt?: string;
}

export interface StoreSettingDetailResponse {
  /**
   * KSNET 단말기 번호
   * @example "DPTOTEST01"
   */
  ksnetDeviceNo?: string;
  /**
   * POS 여분 테이블 표시 수
   * @format int32
   * @example 5
   */
  extraTableCount?: number;
  /**
   * 주방 프린터와 연결된 기기 위치
   * @example "POS"
   */
  printerLocation?: "POS" | "HALL";
  /**
   * 손님 테이블 메뉴 팝업 보이기 여부
   * @example true
   */
  showMenuPopup?: boolean;
  /**
   * 손님 테이블 총 주문 금액 표시 여부
   * @example true
   */
  showOrderTotalPrice?: boolean;
  /**
   * 홀 관리 주문 메뉴 이미지 표시 여부
   * @example true
   */
  showOrderMenuImage?: boolean;
  /** 원산지 정보 */
  countryOfOrigins?: CountryOfOrigin[];
  /**
   * 직원 호출 옵션
   * @example ["직원 호출","포장"]
   */
  staffCallOptions?: string[];
}

export interface DevicePageResponse {
  /**
   * 기기 ID
   * @example "694865267482835533"
   */
  deviceId?: string;
  /**
   * 매장 ID
   * @example "694865267482835533"
   */
  storeId?: string;
  /**
   * 기기명
   * @example "1번 테이블"
   */
  name?: string;
  /**
   * 기기 사용 용도
   * @example "TABLE"
   */
  purpose?: "POS" | "HALL" | "TABLE" | "WAITING";
  /**
   * 기기 상태
   * @example "ACTIVE"
   */
  state?: "INACTIVE" | "ACTIVE";
  /**
   * 결제 타입 (선결제, 후결제)
   * @example "POSTPAID"
   */
  paymentType?: "PREPAID" | "POSTPAID";
  /**
   * 기기 생성일
   * @format date-time
   * @example "2025-01-01 12:00:00"
   */
  createdAt?: string;
  /**
   * 기기 수정일
   * @format date-time
   * @example "2025-01-01 12:00:00"
   */
  updatedAt?: string;
}

export interface PagingDevicePageResponse {
  content?: DevicePageResponse[];
  /**
   * 현재 페이지 번호
   * @format int64
   * @example 1
   */
  page?: number;
  /**
   * 조회 데이터 수
   * @format int64
   * @example 20
   */
  size?: number;
  /**
   * FastForward 페이지 사이즈
   * @format int32
   * @example 5
   */
  pageSkipSize?: number;
  /**
   * FastForward 계산을 위해 조회된 데이터 수
   * @format int64
   * @example 101
   */
  count?: number;
  /**
   * FastForward 페이지 번호
   * @format int64
   * @example 6
   */
  fastForwardPage?: number;
  /**
   * FastBackward 페이지 번호
   * @format int64
   * @example 1
   */
  fastBackwardPage?: number;
  /**
   * 첫번째 페이지인지 여부
   * @example true
   */
  isFirst?: boolean;
  /**
   * 마지막 페이지인지 여부
   * @example false
   */
  isLast?: boolean;
}

export interface DeviceDetailResponse {
  /**
   * 기기 ID
   * @example "694865267482835533"
   */
  deviceId?: string;
  /**
   * 매장 ID
   * @example "694865267482835533"
   */
  storeId?: string;
  /**
   * 매장명
   * @example "나루"
   */
  storeName?: string;
  /**
   * 기기명
   * @example "1번 테이블"
   */
  name?: string;
  /**
   * 기기 사용 용도
   * @example "TABLE"
   */
  purpose?: "POS" | "HALL" | "TABLE" | "WAITING";
  /**
   * 테이블 번호
   * @format int32
   * @example 1
   */
  tableNo?: number;
  /**
   * 기기 상태
   * @example "ACTIVE"
   */
  state?: "INACTIVE" | "ACTIVE";
  /**
   * 결제 타입 (선결제, 후결제)
   * @example "POSTPAID"
   */
  paymentType?: "PREPAID" | "POSTPAID";
  /**
   * 기기 생성일
   * @format date-time
   * @example "2025-01-01 12:00:00"
   */
  createdAt?: string;
  /**
   * 기기 수정일
   * @format date-time
   * @example "2025-01-01 12:00:00"
   */
  updatedAt?: string;
}

export interface CategorySimpleResponse {
  /**
   * 카테고리 ID
   * @example "694865267482835533"
   */
  categoryId?: string;
  /**
   * 카테고리 이름
   * @example "스테이크"
   */
  name?: string;
}

export interface CategorySimpleResponses {
  categories?: CategorySimpleResponse[];
}

export interface MenuSimpleResponse {
  /**
   * 메뉴 ID
   * @example "694865267482835533"
   */
  menuId?: string;
  /**
   * 카테고리 ID
   * @example "694865267482835533"
   */
  categoryId?: string;
  /**
   * 메뉴 이름
   * @example "안심 스테이크"
   */
  name?: string;
  /**
   * 메뉴 설명
   * @example "1++ 한우 안심을 사용합니다."
   */
  description?: string;
  /**
   * 메뉴 가격
   * @format int64
   * @example 34900
   */
  price?: number;
  /**
   * 메뉴 맵기 단계
   * @format int32
   * @example 0
   */
  spicy?: number;
  /**
   * 메뉴 상태
   * @example "DEFAULT"
   */
  state?: "DEFAULT" | "HIDE" | "SOLD_OUT";
  /**
   * 메뉴 라벨
   * @example "BEST"
   */
  label?: "DEFAULT" | "NEW" | "BEST" | "RECOMMEND";
  /**
   * 메뉴 이미지명
   * @example "menu/202504/0KA652ZFZ26DG.webp"
   */
  image?: string;
}

export interface MenuSimpleResponses {
  menus?: MenuSimpleResponse[];
}

export interface MenuViewMenuDetail {
  /**
   * 메뉴 ID
   * @example "694865267482835533"
   */
  menuId?: string;
  /**
   * 카테고리 ID
   * @example "694865267482835533"
   */
  categoryId?: string;
  /**
   * 메뉴 이름
   * @example "안심 스테이크"
   */
  name?: string;
  /**
   * 메뉴 설명
   * @example "1++ 한우 안심을 사용합니다."
   */
  description?: string;
  /**
   * 메뉴 가격
   * @format int64
   * @example 34900
   */
  price?: number;
  /**
   * 메뉴 맵기 단계
   * @format int32
   * @example 0
   */
  spicy?: number;
  /**
   * 메뉴 상태
   * @example "DEFAULT"
   */
  state?: "DEFAULT" | "HIDE" | "SOLD_OUT";
  /**
   * 메뉴 라벨
   * @example "BEST"
   */
  label?: "DEFAULT" | "NEW" | "BEST" | "RECOMMEND";
  /**
   * 메뉴 이미지명
   * @example "menu/202504/0KA652ZFZ26DG.webp"
   */
  image?: string;
  /**
   * 메뉴 주방 프린트 출력 여부
   * @example true
   */
  printEnabled?: boolean;
  /** 메뉴 옵션 그룹 목록 */
  menuOptionGroups?: MenuViewMenuOptionGroupDetail[];
}

export interface MenuViewMenuOptionDetail {
  /**
   * 메뉴 옵션명
   * @example "미디움"
   */
  name?: string;
  /**
   * 메뉴 옵션 가격
   * @format int64
   * @example 0
   */
  price?: number;
}

export interface MenuViewMenuOptionGroupDetail {
  /**
   * 메뉴 옵션 그룹 ID
   * @example "694865267482835533"
   */
  menuOptionGroupId?: string;
  /**
   * 메뉴 옵션 그룹명
   * @example "굽기 정도"
   */
  name?: string;
  /**
   * 메뉴 옵션 그룹 타입 (필수, 옵셔널)
   * @example "MANDATORY"
   */
  type?: "MANDATORY" | "OPTIONAL";
  /**
   * 메뉴 옵션 주방 프린트 출력 여부
   * @example true
   */
  printEnabled?: boolean;
  /** 메뉴 옵션 목록 */
  menuOptions?: MenuViewMenuOptionDetail[];
}

export interface PagingRegistrationDetailResponse {
  content?: RegistrationDetailResponse[];
  /**
   * 현재 페이지 번호
   * @format int64
   * @example 1
   */
  page?: number;
  /**
   * 조회 데이터 수
   * @format int64
   * @example 20
   */
  size?: number;
  /**
   * FastForward 페이지 사이즈
   * @format int32
   * @example 5
   */
  pageSkipSize?: number;
  /**
   * FastForward 계산을 위해 조회된 데이터 수
   * @format int64
   * @example 101
   */
  count?: number;
  /**
   * FastForward 페이지 번호
   * @format int64
   * @example 6
   */
  fastForwardPage?: number;
  /**
   * FastBackward 페이지 번호
   * @format int64
   * @example 1
   */
  fastBackwardPage?: number;
  /**
   * 첫번째 페이지인지 여부
   * @example true
   */
  isFirst?: boolean;
  /**
   * 마지막 페이지인지 여부
   * @example false
   */
  isLast?: boolean;
}

export interface RegistrationDetailResponse {
  /**
   * 매장 등록 ID
   * @example "694865267482835533"
   */
  registrationId?: string;
  /**
   * 계정 ID
   * @example "694865267482835533"
   */
  accountId?: string;
  /**
   * 매장 이름
   * @example "홍길동식당"
   */
  name?: string;
  /**
   * 대표자명
   * @example "홍길동"
   */
  ceoName?: string;
  /**
   * 매장 주소
   * @example "경상남도 창원시 의창구 123"
   */
  address?: string;
  /**
   * 매장 전화번호
   * @example "02-123-4567"
   */
  landline?: string;
  /**
   * 사업자 등록번호
   * @example "443-60-00875"
   */
  license?: string;
  /**
   * 사업자 등록증 이미지명
   * @example "license/202504/0KA652ZFZ26DG.webp"
   */
  image?: string;
  /**
   * 매장 등록 신청 상태
   * @example "APPLY"
   */
  status?: "APPLY" | "REAPPLY" | "APPROVE" | "REJECT";
  /**
   * 매장 등록 거부 사유
   * @example "사업자 정보를 조회할 수 없습니다."
   */
  reason?: string;
  /**
   * 매장 등록 신청일
   * @format date-time
   * @example "2025-01-01 12:00:00"
   */
  createdAt?: string;
  /**
   * 매장 등록 신청 수정일
   * @format date-time
   * @example "2025-01-01 12:00:00"
   */
  updatedAt?: string;
}

export interface AccountProfileResponse {
  /**
   * 계정 ID
   * @example "694865267482835533"
   */
  accountId?: string;
  /**
   * 이메일
   * @example "admin@everyonewaiter.com"
   */
  email?: string;
  /**
   * 권한
   * @example "ADMIN"
   */
  permission?: "USER" | "OWNER" | "ADMIN";
}

export type GetStoreData = StoreDetailResponse;

export type UpdateData = any;

export type Update1Data = any;

export interface UpdateWithImagePayload {
  /** @format binary */
  file: File;
  request: MenuUpdateRequest;
}

export type UpdateWithImageData = any;

export type GetDeviceData = DeviceDetailResponse;

export type Update2Data = any;

export type DeleteData = any;

export type Update3Data = any;

export type Delete1Data = any;

export type GetRegistrationData = RegistrationDetailResponse;

export type ReapplyData = any;

export type Reapply1Data = any;

export type MovePositionData = any;

export type DeleteAllData = any;

export type GetDevicesData = PagingDevicePageResponse;

export type CreateData = DeviceCreateResponse;

export type GetCategoriesData = CategorySimpleResponses;

export type Create1Data = any;

export type MovePosition1Data = any;

export type GetMenusData = MenuSimpleResponses;

export interface Create2Payload {
  /** @format binary */
  file: File;
  request: MenuCreateRequest;
}

export type Create2Data = any;

export type GetRegistrationsData = PagingRegistrationDetailResponse;

export type ApplyData = any;

export type VerifyAuthCodeData = StoreSimpleResponses;

export type SendAuthCodeData = any;

export type SignUpData = any;

export type VerifyEmailData = any;

export type VerifyAuthCode1Data = any;

export type SignInData = SignInToken;

export type SendAuthMailData = any;

export type SendAuthCode1Data = any;

export type RenewTokenData = SignInToken;

export type GetStoresData = StoreSimpleResponses;

export type GetMenuData = MenuViewMenuDetail;

export type Delete2Data = any;

export type GetStores1Data = StoreSimpleResponses;

export type GetProfileData = AccountProfileResponse;

export type GetProfile1Data = AccountProfileResponse;
