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

export interface OrderMenuQuantityUpdateRequest {
  /**
   * 주문 메뉴 ID
   * @format int64
   * @example 694865267482835600
   */
  orderMenuId: number;
  /**
   * 주문 메뉴 수량
   * @format int32
   * @min 0
   * @example 1
   */
  quantity: number;
}

export interface OrderUpdateRequest {
  /**
   * 주문 ID
   * @format int64
   * @example 694865267482835600
   */
  orderId: number;
  /**
   * 주문 메뉴 목록
   * @maxItems 2147483647
   * @minItems 1
   */
  orderMenus: OrderMenuQuantityUpdateRequest[];
}

export interface OrderUpdateRequests {
  /**
   * 주문 목록
   * @maxItems 2147483647
   * @minItems 1
   */
  orders: OrderUpdateRequest[];
}

export interface PosTableUpdateOrderMemoRequest {
  /**
   * 주문 메모
   * @minLength 0
   * @maxLength 30
   * @example "13시 포장"
   */
  memo: string;
}

export interface WaitingRegisterRequest {
  /**
   * 휴대폰 번호
   * @minLength 1
   * @pattern ^01[016789]\d{8}$
   * @example "01044591812"
   */
  phoneNumber: string;
  /**
   * 성인 인원 수
   * @format int32
   * @min 1
   * @max 100
   * @example 2
   */
  adult: number;
  /**
   * 유아 인원 수
   * @format int32
   * @min 0
   * @max 30
   * @example 0
   */
  infant: number;
}

export interface PosTableDiscountRequest {
  /**
   * 할인 금액
   * @format int64
   * @min 0
   * @example 10000
   */
  discountPrice: number;
}

export interface OrderCreateRequest {
  /**
   * 테이블 번호
   * @format int32
   * @min 1
   * @max 10100
   * @example 1
   */
  tableNo: number;
  /**
   * 주문 메모
   * @minLength 0
   * @maxLength 30
   * @example "13시 포장"
   */
  memo: string;
  /**
   * 주문 메뉴
   * @maxItems 2147483647
   * @minItems 1
   */
  orderMenus: OrderMenuModifyRequest[];
}

export interface OrderMenuModifyRequest {
  /**
   * 메뉴 ID
   * @format int64
   * @example "694865267482835533"
   */
  menuId: number;
  /**
   * 주문 수량
   * @format int32
   * @min 1
   * @example 1
   */
  quantity: number;
  /**
   * 주문 메뉴 옵션 그룹
   * @maxItems 20
   * @minItems 0
   */
  menuOptionGroups: OrderOptionGroupModifyRequest[];
}

export interface OrderOptionGroupModifyRequest {
  /**
   * 메뉴 옵션 그룹 ID
   * @format int64
   * @example "694865267482835533"
   */
  menuOptionGroupId: number;
  /**
   * 주문 메뉴 옵션
   * @maxItems 20
   * @minItems 0
   */
  orderOptions: OrderOptionModifyRequest[];
}

export interface OrderOptionModifyRequest {
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

export interface StaffCallRequest {
  /**
   * 직원 호출 옵션명
   * @minLength 1
   * @maxLength 10
   * @example "직원 호출"
   */
  optionName: string;
}

export interface OrderPaymentApproveRequest {
  /**
   * 결제 수단
   * @example "CARD"
   */
  method: "CASH" | "CARD";
  /**
   * 결제 금액
   * @format int64
   * @min 0
   * @example 10000
   */
  amount: number;
  /**
   * 카드 결제 승인 번호
   * @example 1234567890
   */
  approvalNo: string;
  /**
   * 카드 할부 개월
   * @minLength 2
   * @maxLength 2
   * @example "00"
   */
  installment: string;
  /**
   * 카드 번호
   * @example "950002******"
   */
  cardNo: string;
  /**
   * 카드 발급사명
   * @example "국민카드"
   */
  issuerName: string;
  /**
   * 카드 매입사명
   * @example "BC카드"
   */
  purchaseName: string;
  /**
   * 카드사/포인트사 가맹점 번호
   * @example 1234567890
   */
  merchantNo: string;
  /**
   * 카드 거래일시 YYMMDDHHmmss
   * @example 250101120000
   */
  tradeTime: string;
  /**
   * 카드 거래 고유 번호
   * @example 1234567890
   */
  tradeUniqueNo: string;
  /**
   * 부가세
   * @format int64
   * @min 0
   * @example 1000
   */
  vat: number;
  /**
   * 공급가액
   * @format int64
   * @min 0
   * @example 9000
   */
  supplyAmount: number;
  /**
   * 현금 영수증 번호
   * @example "01044591812"
   */
  cashReceiptNo: string;
  /**
   * 현금 영수증 타입
   * @example "DEDUCTION"
   */
  cashReceiptType: "NONE" | "DEDUCTION" | "PROOF";
  cash: boolean;
  card: boolean;
  pureCash: boolean;
}

export interface OrderPaymentCancelRequest {
  /**
   * 카드 결제 승인 번호
   * @example 1234567890
   */
  approvalNo: string;
  /**
   * 카드 거래일시 YYMMDDHHmmss
   * @example 250101120000
   */
  tradeTime: string;
  /**
   * 카드 거래 고유 번호
   * @example 1234567890
   */
  tradeUniqueNo: string;
}

export interface WaitingDetailResponse {
  /**
   * 웨이팅 ID
   * @example "694865267482835533"
   */
  waitingId: string;
  /**
   * 휴대폰 번호
   * @example "01044591812"
   */
  phoneNumber: string;
  /**
   * 성인 인원 수
   * @format int32
   * @example 2
   */
  adult: number;
  /**
   * 유아 인원 수
   * @format int32
   * @example 0
   */
  infant: number;
  /**
   * 대기 번호
   * @format int32
   * @example 1
   */
  number: number;
  /**
   * 총 호출 횟수
   * @format int32
   * @example 0
   */
  callCount: number;
  /**
   * 마지막 호출 시간
   * @format date-time
   * @example "1970-01-01 00:00:00"
   */
  lastCallTime: string;
  /**
   * 상태
   * @example "REGISTRATION"
   */
  state: "REGISTRATION" | "CANCEL" | "COMPLETE";
  /**
   * 웨이팅 등록일
   * @format date-time
   * @example "2025-01-01 12:00:00"
   */
  createdAt: string;
}

export interface WaitingDetailResponses {
  waitings?: WaitingDetailResponse[];
}

export interface WaitingCountResponse {
  /**
   * 현재 매장에 대기중인 팀 수
   * @format int32
   * @example 5
   */
  count: number;
}

export interface WaitingMyTurnView {
  /**
   * 대기 번호
   * @format int32
   * @example 1
   */
  number: number;
  /**
   * 웨이팅 등록 당시 내 앞 대기팀 수
   * @format int32
   * @example 0
   */
  initWaitingTeamCount: number;
  /**
   * 현재 내 앞 대기팀 수
   * @format int32
   * @example 0
   */
  currentWaitingTeamCount: number;
  /**
   * 상태
   * @example "REGISTRATION"
   */
  state: "REGISTRATION" | "CANCEL" | "COMPLETE";
  /**
   * 웨이팅 등록일
   * @format date-time
   * @example "2025-01-01 12:00:00"
   */
  createdAt: string;
}

export interface CategoryDetails {
  categories?: CategoryViewCategoryDetail[];
}

export interface CategoryViewCategoryDetail {
  /**
   * 카테고리 ID
   * @example "694865267482835533"
   */
  categoryId: string;
  /**
   * 카테고리 이름
   * @example "스테이크"
   */
  name: string;
  /** 메뉴 목록 */
  menus: MenuViewMenuDetail[];
}

export interface MenuViewMenuDetail {
  /**
   * 메뉴 ID
   * @example "694865267482835533"
   */
  menuId: string;
  /**
   * 카테고리 ID
   * @example "694865267482835533"
   */
  categoryId: string;
  /**
   * 메뉴 이름
   * @example "안심 스테이크"
   */
  name: string;
  /**
   * 메뉴 설명
   * @example "1++ 한우 안심을 사용합니다."
   */
  description: string;
  /**
   * 메뉴 가격
   * @format int64
   * @example 34900
   */
  price: number;
  /**
   * 메뉴 맵기 단계
   * @format int32
   * @example 0
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
   * 메뉴 이미지명
   * @example "menu/202504/0KA652ZFZ26DG.webp"
   */
  image: string;
  /**
   * 메뉴 주방 프린트 출력 여부
   * @example true
   */
  printEnabled: boolean;
  /** 메뉴 옵션 그룹 목록 */
  menuOptionGroups: MenuViewMenuOptionGroupDetail[];
}

export interface MenuViewMenuOptionDetail {
  /**
   * 메뉴 옵션명
   * @example "미디움"
   */
  name: string;
  /**
   * 메뉴 옵션 가격
   * @format int64
   * @example 0
   */
  price: number;
}

export interface MenuViewMenuOptionGroupDetail {
  /**
   * 메뉴 옵션 그룹 ID
   * @example "694865267482835533"
   */
  menuOptionGroupId: string;
  /**
   * 메뉴 옵션 그룹명
   * @example "굽기 정도"
   */
  name: string;
  /**
   * 메뉴 옵션 그룹 타입 (필수, 옵셔널)
   * @example "MANDATORY"
   */
  type: "MANDATORY" | "OPTIONAL";
  /**
   * 메뉴 옵션 주방 프린트 출력 여부
   * @example true
   */
  printEnabled: boolean;
  /** 메뉴 옵션 목록 */
  menuOptions: MenuViewMenuOptionDetail[];
}

export interface SseEmitter {
  /** @format int64 */
  timeout?: number;
}

export interface PosTableDetailResponses {
  tables?: PosViewPosTableDetail[];
}

export interface PosViewPosTableDetail {
  /**
   * POS 테이블 ID
   * @example "694865267482835533"
   */
  posTableId: string;
  /**
   * 매장 ID
   * @example "694865267482835533"
   */
  storeId: string;
  /**
   * 테이블 번호
   * @format int32
   * @example 1
   */
  tableNo: number;
  /**
   * 주문 존재 여부
   * @example true
   */
  hasOrder: boolean;
  /**
   * 주문 타입
   * @example "POSTPAID"
   */
  orderType: "PREPAID" | "POSTPAID";
  /**
   * 주문 시간
   * @format date-time
   * @example "2025-01-01 12:00:00"
   */
  orderedAt: string | null;
  /**
   * 주문한 메뉴명
   * @example "오일 파스타"
   */
  orderMenuName: string | null;
  /**
   * 주문한 메뉴 건수
   * @format int32
   * @example 3
   */
  orderMenuCount: number;
  /**
   * 총 주문 금액
   * @format int64
   * @example 29900
   */
  totalOrderPrice: number;
  /**
   * 할인 금액
   * @format int64
   * @example 0
   */
  discount: number;
}

export interface OrderPaymentViewOrderPaymentDetail {
  /**
   * 주문 결제 ID
   * @example "694865267482835533"
   */
  orderPaymentId: string;
  /**
   * POS 테이블 액티비티 ID
   * @example "694865267482835533"
   */
  posTableActivityId: string;
  /**
   * 매장 ID
   * @example "694865267482835533"
   */
  storeId: string;
  /**
   * 결제 상태
   * @example "APPROVE"
   */
  state: "APPROVE" | "CANCEL";
  /**
   * 결제 수단
   * @example "CARD"
   */
  method: "CASH" | "CARD";
  /**
   * 결제 금액
   * @format int64
   * @example 10000
   */
  amount: number;
  /**
   * 결제 취소 가능 여부
   * @example true
   */
  cancellable: boolean;
  /**
   * 카드 결제 승인 번호
   * @example 1234567890
   */
  approvalNo: string;
  /**
   * 카드 할부 개월
   * @example "00"
   */
  installment: string;
  /**
   * 카드 번호
   * @example "950002******"
   */
  cardNo: string;
  /**
   * 카드 발급사명
   * @example "국민카드"
   */
  issuerName: string;
  /**
   * 카드 매입사명
   * @example "BC카드"
   */
  purchaseName: string;
  /**
   * 카드사/포인트사 가맹점 번호
   * @example 1234567890
   */
  merchantNo: string;
  /**
   * 카드 거래일시 YYMMDDHHmmss
   * @example 250101120000
   */
  tradeTime: string;
  /**
   * 카드 거래 고유 번호
   * @example 1234567890
   */
  tradeUniqueNo: string;
  /**
   * 부가세
   * @format int64
   * @example 1000
   */
  vat: number;
  /**
   * 공급가액
   * @format int64
   * @example 9000
   */
  supplyAmount: number;
  /**
   * 현금 영수증 번호
   * @example "01044591812"
   */
  cashReceiptNo: string;
  /**
   * 현금 영수증 타입
   * @example "DEDUCTION"
   */
  cashReceiptType: "NONE" | "DEDUCTION" | "PROOF";
  /**
   * 주문 결제 생성일
   * @format date-time
   * @example "2025-01-01 12:00:00"
   */
  createdAt: string;
}

export interface OrderViewOrderDetail {
  /**
   * 주문 ID
   * @example "694865267482835533"
   */
  orderId: string;
  /**
   * 매장 ID
   * @example "694865267482835533"
   */
  storeId: string;
  /**
   * 주문 카테고리 (첫 주문, 추가 주문)
   * @example "INITIAL"
   */
  category: "INITIAL" | "ADDITIONAL";
  /**
   * 주문 타입
   * @example "POSTPAID"
   */
  type: "PREPAID" | "POSTPAID";
  /**
   * 주문 상태
   * @example "ORDER"
   */
  state: "ORDER" | "CANCEL";
  /**
   * 테이블 번호
   * @format int32
   * @example 1
   */
  tableNo: number;
  /**
   * 주문 금액
   * @format int64
   * @example 34900
   */
  price: number;
  /**
   * 주문 메모
   * @example "13시 포장"
   */
  memo: string;
  /**
   * 주문 서빙 여부
   * @example false
   */
  served: boolean;
  /**
   * 주문 서빙 시간
   * @format date-time
   * @example "2025-01-01 12:00:00"
   */
  servedTime: string;
  /** 주문 메뉴 목록 */
  orderMenus: OrderViewOrderMenuDetail[];
  /**
   * 주문 생성일
   * @format date-time
   * @example "2025-01-01 12:00:00"
   */
  createdAt: string;
  /**
   * 주문 수정일
   * @format date-time
   * @example "2025-01-01 12:00:00"
   */
  updatedAt: string;
}

export interface OrderViewOrderMenuDetail {
  /**
   * 주문 메뉴 ID
   * @example "694865267482835533"
   */
  orderMenuId: string;
  /**
   * 주문 메뉴 이름
   * @example "안심 스테이크"
   */
  name: string;
  /**
   * 주문 메뉴 가격
   * @format int64
   * @example 34900
   */
  price: number;
  /**
   * 주문 메뉴 수량
   * @format int32
   * @example 1
   */
  quantity: number;
  /**
   * 주문 메뉴 이미지명
   * @example "menu/202504/0KA652ZFZ26DG.webp"
   */
  image: string;
  /**
   * 주문 메뉴 서빙 여부
   * @example false
   */
  served: boolean;
  /**
   * 주문 메뉴 서빙 시간
   * @format date-time
   * @example "2025-01-01 12:00:00"
   */
  servedTime: string;
  /**
   * 주문 메뉴 주방 프린트 출력 여부
   * @example true
   */
  printEnabled: boolean;
  /** 주문 메뉴 옵션 그룹 목록 */
  orderOptionGroups: OrderViewOrderOptionGroupDetail[];
}

export interface OrderViewOrderOptionDetail {
  /**
   * 주문 메뉴 옵션명
   * @example "미디움"
   */
  name: string;
  /**
   * 주문 메뉴 옵션 가격
   * @format int64
   * @example 0
   */
  price: number;
}

export interface OrderViewOrderOptionGroupDetail {
  /**
   * 주문 메뉴 옵션 그룹 ID
   * @example "694865267482835533"
   */
  orderOptionGroupId: string;
  /**
   * 주문 메뉴 옵션 그룹명
   * @example "굽기 정도"
   */
  name: string;
  /**
   * 주문 메뉴 옵션 주방 프린트 출력 여부
   * @example true
   */
  printEnabled: boolean;
  /** 주문 메뉴 옵션 목록 */
  orderOptions: OrderViewOrderOptionDetail[];
}

export interface PosViewPosTableActivityDetail {
  /**
   * POS 테이블 액티비티 ID
   * @example "694865267482835533"
   */
  posTableActivityId: string;
  /**
   * 매장 ID
   * @example "694865267482835533"
   */
  storeId: string;
  /**
   * POS 테이블 ID
   * @example "694865267482835533"
   */
  posTableId: string;
  /**
   * 테이블 번호
   * @format int32
   * @example 1
   */
  tableNo: number;
  /**
   * 테이블 결제 타입
   * @example "POSTPAID"
   */
  orderType: "PREPAID" | "POSTPAID";
  /**
   * 총 주문 금액
   * @format int64
   * @example 10000
   */
  totalOrderPrice: number;
  /**
   * 총 결제 금액
   * @format int64
   * @example 0
   */
  totalPaymentPrice: number;
  /**
   * 할인 금액
   * @format int64
   * @example 0
   */
  discount: number;
  /**
   * 잔여 결제 금액
   * @format int64
   * @example 0
   */
  remainingPaymentPrice: number;
  /**
   * POS 테이블 액티비티 활성화 여부
   * @example true
   */
  active: boolean;
  /** 주문 목록 */
  orders: OrderViewOrderDetail[];
  /** 주문 결제 목록 */
  orderPayments: OrderPaymentViewOrderPaymentDetail[];
}

export interface PosViewRevenue {
  /**
   * 총 주문 금액
   * @format int64
   * @example 29900
   */
  totalOrderPrice: number;
  /**
   * 총 할인 금액
   * @format int64
   * @example 0
   */
  totalDiscountPrice: number;
  /**
   * 총 결제 금액
   * @format int64
   * @example 29900
   */
  totalPaymentPrice: number;
  /**
   * 현금 결제 승인 금액
   * @format int64
   * @example 0
   */
  cashPaymentApprovePrice: number;
  /**
   * 카드 결제 승인 금액
   * @format int64
   * @example 29900
   */
  cardPaymentApprovePrice: number;
  /**
   * 현금 결제 취소 금액
   * @format int64
   * @example 0
   */
  cashPaymentCancelPrice: number;
  /**
   * 카드 결제 취소 금액
   * @format int64
   * @example 0
   */
  cardPaymentCancelPrice: number;
}

export interface OrderDetailResponses {
  orders?: OrderViewOrderDetail[];
}

export interface StaffCallDetailResponse {
  /**
   * 직원 호출 ID
   * @example "694865267482835533"
   */
  staffCallId: string;
  /**
   * 테이블 번호
   * @format int32
   * @example 1
   */
  tableNo: number;
  /**
   * 직원 호출 옵션명
   * @example "직원 호출"
   */
  name: string;
  /**
   * 직원 호출 상태
   * @example "INCOMPLETE"
   */
  state: "INCOMPLETE" | "COMPLETE";
  /**
   * 직원 호출 완료 시간
   * @format date-time
   * @example "1970-01-01 00:00:00"
   */
  completeTime: string;
  /**
   * 직원 호출 시간
   * @format date-time
   * @example "2025-01-01 12:00:00"
   */
  createdAt: string;
}

export interface StaffCallDetailResponses {
  staffCalls?: StaffCallDetailResponse[];
}

export interface OrderPaymentDetailResponses {
  orderPayments?: OrderPaymentViewOrderPaymentDetail[];
}

export interface OrderHallResponses {
  served?: OrderViewOrderDetail[];
  unserved?: OrderViewOrderDetail[];
}

export interface DeviceDetailResponse {
  /**
   * 기기 ID
   * @example "694865267482835533"
   */
  deviceId: string;
  /**
   * 매장 ID
   * @example "694865267482835533"
   */
  storeId: string;
  /**
   * 매장명
   * @example "나루"
   */
  storeName: string;
  /**
   * 기기 사용 용도
   * @example "TABLE"
   */
  purpose: "POS" | "HALL" | "TABLE" | "WAITING";
  /**
   * 테이블 번호
   * @format int32
   * @example 1
   */
  tableNo: number;
  /**
   * 기기 상태
   * @example "ACTIVE"
   */
  state: "INACTIVE" | "ACTIVE";
  /**
   * 결제 타입 (선결제, 후결제)
   * @example "POSTPAID"
   */
  paymentType: "PREPAID" | "POSTPAID";
  /**
   * 기기 생성일
   * @format date-time
   * @example "2025-01-01 12:00:00"
   */
  createdAt: string;
  /**
   * 기기 수정일
   * @format date-time
   * @example "2025-01-01 12:00:00"
   */
  updatedAt: string;
}

export type UpdatePosTablesOrdersData = any;

export type UpdatePosTablesOrdersMemoData = any;

export type GetWaitingsData = WaitingDetailResponses;

export type AddWaitingsData = any;

export type CompleteWaitingsData = any;

export type CancelWaitingsData = any;

export type AddWaitingsCallData = any;

export type CancelStoresWaitingsData = any;

export type AddStoresOpenData = any;

export type AddStoresCloseData = any;

export type ResendPosTablesReceiptData = any;

export type CancelPosTablesOrdersData = any;

export type AddPosTablesDiscountData = any;

export type CompletePosTablesData = any;

export type MovePosTablesData = any;

export type AddOrdersData = any;

export type AddOrdersServingData = any;

export type AddOrdersMenusServingData = any;

export type GetOrdersStaffCallsData = StaffCallDetailResponses;

export type AddOrdersStaffCallsData = any;

export type CompleteOrdersStaffCallsData = any;

export type ApproveOrdersPaymentsData = any;

export type CancelOrdersPaymentsData = any;

export type GetWaitingsCountData = WaitingCountResponse;

export type GetStoresWaitingsMyTurnData = WaitingMyTurnView;

export type GetStoresMenusData = CategoryDetails;

export type GetStoresSubscribeData = SseEmitter;

export type GetPosTablesData = PosTableDetailResponses;

export type GetPosTablesByIdData = PosViewPosTableActivityDetail;

export type GetPosTablesActivitiesByIdData = PosViewPosTableActivityDetail;

export type GetPosRevenueData = PosViewRevenue;

export type GetOrdersTablesData = OrderDetailResponses;

export type GetOrdersPaymentsData = OrderPaymentDetailResponses;

export type GetOrdersHallData = OrderHallResponses;

export type GetDevicesData = DeviceDetailResponse;
