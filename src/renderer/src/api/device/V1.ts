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

import {
  ApproveData,
  Call1Data,
  CallData,
  Cancel1Data,
  Cancel2Data,
  CancelData,
  CancelOrderData,
  CloseData,
  Complete1Data,
  CompleteActivityData,
  CompleteData,
  ConnectData,
  CountData,
  CreateData,
  DiscountData,
  GetActiveTableActivityData,
  GetDeviceData,
  GetOrderPaymentsByPosData,
  GetOrdersByHallData,
  GetOrdersByTableData,
  GetRevenueData,
  GetStaffCallsData,
  GetStoreMenusData,
  GetTableActivityData,
  GetTablesData,
  GetWaitingsData,
  MoveTableData,
  MyTurnData,
  OpenData,
  OrderCreateRequest,
  OrderPaymentApproveRequest,
  OrderPaymentCancelRequest,
  OrderUpdateRequests,
  PosTableDiscountRequest,
  PosTableUpdateOrderMemoRequest,
  RegisterData,
  ResendReceiptData,
  ServingOrderData,
  ServingOrderMenuData,
  StaffCallRequest,
  UpdateOrderMemoData,
  UpdateOrdersData,
  WaitingRegisterRequest,
} from "./data-contracts";
import { ContentType, HttpClient, RequestParams } from "./http-client";

export class V1<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * @description 주문 수정 API
   *
   * @tags POS
   * @name UpdateOrders
   * @summary [POS] 주문 수정
   * @request PUT:/v1/pos/tables/{tableNo}/orders
   * @secure
   */
  updateOrders = (tableNo: number, data: OrderUpdateRequests, params: RequestParams = {}) =>
    this.request<UpdateOrdersData, void>({
      path: `/v1/pos/tables/${tableNo}/orders`,
      method: "PUT",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description 주문 메모 수정 API
   *
   * @tags POS
   * @name UpdateOrderMemo
   * @summary [POS] 주문 메모 수정
   * @request PUT:/v1/pos/tables/{tableNo}/orders/{orderId}/memo
   * @secure
   */
  updateOrderMemo = (
    tableNo: number,
    orderId: number,
    data: PosTableUpdateOrderMemoRequest,
    params: RequestParams = {}
  ) =>
    this.request<UpdateOrderMemoData, void>({
      path: `/v1/pos/tables/${tableNo}/orders/${orderId}/memo`,
      method: "PUT",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description 웨이팅 목록 조회 API<br/><br/>마지막 손님 호출 시간의 경우 생성할 때 기본으로 UTC 1970-01-01으로 생성하고 있으니, 호출 횟수가 1 이상일 때만 호출 시간을 표시해야 합니다.
   *
   * @tags 웨이팅
   * @name GetWaitings
   * @summary [HALL] 웨이팅 목록 조회
   * @request GET:/v1/waitings
   * @secure
   */
  getWaitings = (params: RequestParams = {}) =>
    this.request<GetWaitingsData, void>({
      path: `/v1/waitings`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * @description 웨이팅 등록 API
   *
   * @tags 웨이팅
   * @name Register
   * @summary [WAITING] 웨이팅 등록
   * @request POST:/v1/waitings
   * @secure
   */
  register = (data: WaitingRegisterRequest, params: RequestParams = {}) =>
    this.request<RegisterData, void>({
      path: `/v1/waitings`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description 손님 입장 완료 API
   *
   * @tags 웨이팅
   * @name Complete
   * @summary [HALL] 손님 입장 완료
   * @request POST:/v1/waitings/{waitingId}/complete
   * @secure
   */
  complete = (waitingId: number, params: RequestParams = {}) =>
    this.request<CompleteData, void>({
      path: `/v1/waitings/${waitingId}/complete`,
      method: "POST",
      secure: true,
      ...params,
    });
  /**
   * @description 웨이팅 취소 API
   *
   * @tags 웨이팅
   * @name Cancel
   * @summary [HALL] 웨이팅 취소
   * @request POST:/v1/waitings/{waitingId}/cancel
   * @secure
   */
  cancel = (waitingId: number, params: RequestParams = {}) =>
    this.request<CancelData, void>({
      path: `/v1/waitings/${waitingId}/cancel`,
      method: "POST",
      secure: true,
      ...params,
    });
  /**
   * @description 손님 입장 안내 호출 API
   *
   * @tags 웨이팅
   * @name Call
   * @summary [HALL] 손님 입장 안내 호출
   * @request POST:/v1/waitings/{waitingId}/call
   * @secure
   */
  call = (waitingId: number, params: RequestParams = {}) =>
    this.request<CallData, void>({
      path: `/v1/waitings/${waitingId}/call`,
      method: "POST",
      secure: true,
      ...params,
    });
  /**
   * @description 웨이팅 취소 API
   *
   * @tags 웨이팅
   * @name Cancel1
   * @summary 웨이팅 취소
   * @request POST:/v1/stores/{storeId}/waitings/{accessKey}/cancel
   */
  cancel1 = (storeId: number, accessKey: string, params: RequestParams = {}) =>
    this.request<Cancel1Data, void>({
      path: `/v1/stores/${storeId}/waitings/${accessKey}/cancel`,
      method: "POST",
      ...params,
    });
  /**
   * @description 매장 오픈 API
   *
   * @tags 매장
   * @name Open
   * @summary [POS] 매장 오픈
   * @request POST:/v1/stores/open
   * @secure
   */
  open = (params: RequestParams = {}) =>
    this.request<OpenData, void>({
      path: `/v1/stores/open`,
      method: "POST",
      secure: true,
      ...params,
    });
  /**
   * @description 매장 마감 API
   *
   * @tags 매장
   * @name Close
   * @summary [POS] 매장 마감
   * @request POST:/v1/stores/close
   * @secure
   */
  close = (params: RequestParams = {}) =>
    this.request<CloseData, void>({
      path: `/v1/stores/close`,
      method: "POST",
      secure: true,
      ...params,
    });
  /**
   * @description 주방 재전송 API
   *
   * @tags POS
   * @name ResendReceipt
   * @summary [POS] 주방 재전송
   * @request POST:/v1/pos/tables/{tableNo}/resend-receipt
   * @secure
   */
  resendReceipt = (tableNo: number, params: RequestParams = {}) =>
    this.request<ResendReceiptData, void>({
      path: `/v1/pos/tables/${tableNo}/resend-receipt`,
      method: "POST",
      secure: true,
      ...params,
    });
  /**
   * @description 주문 취소 API
   *
   * @tags POS
   * @name CancelOrder
   * @summary [POS] 주문 취소
   * @request POST:/v1/pos/tables/{tableNo}/orders/{orderId}/cancel
   * @secure
   */
  cancelOrder = (tableNo: number, orderId: number, params: RequestParams = {}) =>
    this.request<CancelOrderData, void>({
      path: `/v1/pos/tables/${tableNo}/orders/${orderId}/cancel`,
      method: "POST",
      secure: true,
      ...params,
    });
  /**
   * @description 테이블 주문 할인 API
   *
   * @tags POS
   * @name Discount
   * @summary [POS] 테이블 주문 할인
   * @request POST:/v1/pos/tables/{tableNo}/discount
   * @secure
   */
  discount = (tableNo: number, data: PosTableDiscountRequest, params: RequestParams = {}) =>
    this.request<DiscountData, void>({
      path: `/v1/pos/tables/${tableNo}/discount`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description 테이블 완료 API<br/><br/>현재 활성화 되어 있는 테이블 액티비티를 완료 상태로 변경합니다.<br/>해당 API는 주로 선결제 테이블에서 사용됩니다.<br/>후결제 테이블 또한 테이블 할인을 통해 잔여 결제 금액이 0원인 경우 해당 API를 사용할 수 있습니다.
   *
   * @tags POS
   * @name CompleteActivity
   * @summary [POS] 테이블 완료
   * @request POST:/v1/pos/tables/{tableNo}/complete
   * @secure
   */
  completeActivity = (tableNo: number, params: RequestParams = {}) =>
    this.request<CompleteActivityData, void>({
      path: `/v1/pos/tables/${tableNo}/complete`,
      method: "POST",
      secure: true,
      ...params,
    });
  /**
   * @description 테이블 이동 API
   *
   * @tags POS
   * @name MoveTable
   * @summary [POS] 테이블 이동
   * @request POST:/v1/pos/tables/{sourceTableNo}/move/{targetTableNo}
   * @secure
   */
  moveTable = (sourceTableNo: number, targetTableNo: number, params: RequestParams = {}) =>
    this.request<MoveTableData, void>({
      path: `/v1/pos/tables/${sourceTableNo}/move/${targetTableNo}`,
      method: "POST",
      secure: true,
      ...params,
    });
  /**
   * @description 주문 생성 API
   *
   * @tags 주문
   * @name Create
   * @summary [TABLE, POS] 주문 생성
   * @request POST:/v1/orders
   * @secure
   */
  create = (data: OrderCreateRequest, params: RequestParams = {}) =>
    this.request<CreateData, void>({
      path: `/v1/orders`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description 주문 서빙 API
   *
   * @tags 주문
   * @name ServingOrder
   * @summary [HALL] 주문 서빙
   * @request POST:/v1/orders/{orderId}/serving
   * @secure
   */
  servingOrder = (orderId: number, params: RequestParams = {}) =>
    this.request<ServingOrderData, void>({
      path: `/v1/orders/${orderId}/serving`,
      method: "POST",
      secure: true,
      ...params,
    });
  /**
   * @description 주문 메뉴 서빙 API<br/><br/>- 서빙이 완료되지 않은 주문 메뉴 -> 서빙 완료 처리<br/>- 서빙이 완료된 주문 메뉴 -> 서빙 완료 취소 처리
   *
   * @tags 주문
   * @name ServingOrderMenu
   * @summary [HALL] 주문 메뉴 서빙
   * @request POST:/v1/orders/{orderId}/menus/{orderMenuId}/serving
   * @secure
   */
  servingOrderMenu = (orderId: number, orderMenuId: number, params: RequestParams = {}) =>
    this.request<ServingOrderMenuData, void>({
      path: `/v1/orders/${orderId}/menus/${orderMenuId}/serving`,
      method: "POST",
      secure: true,
      ...params,
    });
  /**
   * @description 직원 호출 목록 조회 API
   *
   * @tags 직원 호출
   * @name GetStaffCalls
   * @summary [HALL] 직원 호출 목록 조회
   * @request GET:/v1/orders/staff-calls
   * @secure
   */
  getStaffCalls = (params: RequestParams = {}) =>
    this.request<GetStaffCallsData, void>({
      path: `/v1/orders/staff-calls`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * @description 직원 호출 API
   *
   * @tags 직원 호출
   * @name Call1
   * @summary [TABLE] 직원 호출
   * @request POST:/v1/orders/staff-calls
   * @secure
   */
  call1 = (data: StaffCallRequest, params: RequestParams = {}) =>
    this.request<Call1Data, void>({
      path: `/v1/orders/staff-calls`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description 직원 호출 완료 API
   *
   * @tags 직원 호출
   * @name Complete1
   * @summary [HALL] 직원 호출 완료
   * @request POST:/v1/orders/staff-calls/{staffCallId}/complete
   * @secure
   */
  complete1 = (staffCallId: number, params: RequestParams = {}) =>
    this.request<Complete1Data, void>({
      path: `/v1/orders/staff-calls/${staffCallId}/complete`,
      method: "POST",
      secure: true,
      ...params,
    });
  /**
   * @description 주문 결제 승인 API
   *
   * @tags 주문 결제
   * @name Approve
   * @summary [TABLE, POS] 주문 결제 승인
   * @request POST:/v1/orders/payments/{tableNo}/approve
   * @secure
   */
  approve = (tableNo: number, data: OrderPaymentApproveRequest, params: RequestParams = {}) =>
    this.request<ApproveData, void>({
      path: `/v1/orders/payments/${tableNo}/approve`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description 주문 결제 취소 API
   *
   * @tags 주문 결제
   * @name Cancel2
   * @summary [POS] 주문 결제 취소
   * @request POST:/v1/orders/payments/{orderPaymentId}/cancel
   * @secure
   */
  cancel2 = (orderPaymentId: number, data: OrderPaymentCancelRequest, params: RequestParams = {}) =>
    this.request<Cancel2Data, void>({
      path: `/v1/orders/payments/${orderPaymentId}/cancel`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description 웨이팅 수 조회 API<br/><br/>현재 매장에 'REGISTRATION' 상태의 웨이팅 수를 조회합니다.
   *
   * @tags 웨이팅
   * @name Count
   * @summary [WAITING] 웨이팅 수 조회
   * @request GET:/v1/waitings/count
   * @secure
   */
  count = (params: RequestParams = {}) =>
    this.request<CountData, void>({
      path: `/v1/waitings/count`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * @description 내 앞 대기팀 수 조회 API<br/><br/>손님의 휴대폰으로 전송된 알림톡 내용 중 '내 순서 확인하기' 버튼을 통해 내 앞 대기팀 수 를 조회할 수 있습니다.<br/>상태가 취소 또는 완료인 경우 출력할 문구에 대한 분기처리가 필요합니다.
   *
   * @tags 웨이팅
   * @name MyTurn
   * @summary 내 앞 대기팀 수 조회
   * @request GET:/v1/stores/{storeId}/waitings/{accessKey}/my-turn
   */
  myTurn = (storeId: number, accessKey: string, params: RequestParams = {}) =>
    this.request<MyTurnData, void>({
      path: `/v1/stores/${storeId}/waitings/${accessKey}/my-turn`,
      method: "GET",
      format: "json",
      ...params,
    });
  /**
   * @description 매장 메뉴 카테고리 및 메뉴 목록 조회 API<br/><br/>숨김(HIDE) 상태의 메뉴는 조회되지 않습니다.
   *
   * @tags 메뉴
   * @name GetStoreMenus
   * @summary 매장 메뉴 카테고리 및 메뉴 목록 조회
   * @request GET:/v1/stores/{storeId}/menus
   */
  getStoreMenus = (storeId: number, params: RequestParams = {}) =>
    this.request<GetStoreMenusData, void>({
      path: `/v1/stores/${storeId}/menus`,
      method: "GET",
      format: "json",
      ...params,
    });
  /**
   * @description 매장 활동 알림 SSE 연결 API
   *
   * @tags SSE
   * @name Connect
   * @summary [ALL] 매장 활동 알림 SSE 연결
   * @request GET:/v1/stores/subscribe
   * @secure
   */
  connect = (params: RequestParams = {}) =>
    this.request<ConnectData, void>({
      path: `/v1/stores/subscribe`,
      method: "GET",
      secure: true,
      ...params,
    });
  /**
   * @description 테이블 목록 조회 API<br/><br/>응답의 `orderType`, `orderedAt`, `orderMenuName` 필드는 **nullable** 값 입니다.<br/>`hasOrder`가 **true**인 경우 해당 필드들은 값이 존재하며, **false**인 경우 null 입니다.<br/><br/>**메뉴명 예제**<br/>- `orderMenuCount`가 1인 경우: `orderMenuName`<br/>- `orderMenuCount`가 2 이상인 경우: `orderMenuName 외 (orderMenuCount-1)개`
   *
   * @tags POS
   * @name GetTables
   * @summary [POS] 테이블 목록 조회
   * @request GET:/v1/pos/tables
   * @secure
   */
  getTables = (params: RequestParams = {}) =>
    this.request<GetTablesData, void>({
      path: `/v1/pos/tables`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * @description 테이블 액티비티 상세 조회 API
   *
   * @tags POS
   * @name GetActiveTableActivity
   * @summary [POS] 테이블 액티비티 상세 조회
   * @request GET:/v1/pos/tables/{tableNo}
   * @secure
   */
  getActiveTableActivity = (tableNo: number, params: RequestParams = {}) =>
    this.request<GetActiveTableActivityData, void>({
      path: `/v1/pos/tables/${tableNo}`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * @description 테이블 액티비티 상세 조회 API
   *
   * @tags POS
   * @name GetTableActivity
   * @summary [POS] 테이블 액티비티 상세 조회
   * @request GET:/v1/pos/tables/activities/{posTableActivityId}
   * @secure
   */
  getTableActivity = (posTableActivityId: number, params: RequestParams = {}) =>
    this.request<GetTableActivityData, void>({
      path: `/v1/pos/tables/activities/${posTableActivityId}`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * @description 매출 확인 API<br/><br/>날짜 포맷은 KST `yyyyMMdd` 형식이어야 합니다. 예시: `20250101`
   *
   * @tags POS
   * @name GetRevenue
   * @summary [POS] 매출 확인
   * @request GET:/v1/pos/revenue
   * @secure
   */
  getRevenue = (
    query?: {
      date?: string;
    },
    params: RequestParams = {}
  ) =>
    this.request<GetRevenueData, void>({
      path: `/v1/pos/revenue`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * @description 활성 주문 목록 조회 API
   *
   * @tags 주문
   * @name GetOrdersByTable
   * @summary [TABLE] 활성 주문 목록 조회
   * @request GET:/v1/orders/tables
   * @secure
   */
  getOrdersByTable = (params: RequestParams = {}) =>
    this.request<GetOrdersByTableData, void>({
      path: `/v1/orders/tables`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * @description 결제 내역 조회 API<br/><br/>날짜 포맷은 KST `yyyyMMdd` 형식이어야 합니다. 예시: `20250101`
   *
   * @tags 주문 결제
   * @name GetOrderPaymentsByPos
   * @summary [POS] 결제 내역 조회
   * @request GET:/v1/orders/payments
   * @secure
   */
  getOrderPaymentsByPos = (
    query?: {
      date?: string;
    },
    params: RequestParams = {}
  ) =>
    this.request<GetOrderPaymentsByPosData, void>({
      path: `/v1/orders/payments`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * @description 주문 목록 조회 API
   *
   * @tags 주문
   * @name GetOrdersByHall
   * @summary [HALL] 주문 목록 조회
   * @request GET:/v1/orders/hall
   * @secure
   */
  getOrdersByHall = (params: RequestParams = {}) =>
    this.request<GetOrdersByHallData, void>({
      path: `/v1/orders/hall`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * @description 기기 상세 조회 API
   *
   * @tags 기기
   * @name GetDevice
   * @summary [ALL] 기기 상세 조회
   * @request GET:/v1/devices
   * @secure
   */
  getDevice = (params: RequestParams = {}) =>
    this.request<GetDeviceData, void>({
      path: `/v1/devices`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
}
