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
  AddOrdersData,
  AddOrdersMenusServingData,
  AddOrdersServingData,
  AddOrdersStaffCallsData,
  AddPosTablesDiscountData,
  AddStoresCloseData,
  AddStoresOpenData,
  AddWaitingsCallData,
  AddWaitingsData,
  ApproveOrdersPaymentsData,
  CancelOrdersPaymentsData,
  CancelPosTablesOrdersData,
  CancelStoresWaitingsData,
  CancelWaitingsData,
  CompleteOrdersStaffCallsData,
  CompletePosTablesData,
  CompleteWaitingsData,
  GetDevicesData,
  GetOrdersHallData,
  GetOrdersPaymentsData,
  GetOrdersStaffCallsData,
  GetOrdersTablesData,
  GetPosRevenueData,
  GetPosTablesActivitiesByIdData,
  GetPosTablesByIdData,
  GetPosTablesData,
  GetStoresMenusData,
  GetStoresSubscribeData,
  GetStoresWaitingsMyTurnData,
  GetWaitingsCountData,
  GetWaitingsData,
  MovePosTablesData,
  OrderCreateRequest,
  OrderPaymentApproveRequest,
  OrderPaymentCancelRequest,
  OrderUpdateRequests,
  PosTableDiscountRequest,
  PosTableUpdateOrderMemoRequest,
  ResendPosTablesReceiptData,
  StaffCallRequest,
  UpdatePosTablesOrdersData,
  UpdatePosTablesOrdersMemoData,
  WaitingRegisterRequest,
} from "./data-contracts";
import { ContentType, HttpClient, RequestParams } from "./http-client";

export class V1<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * @description 주문 수정 API
   *
   * @tags POS
   * @name UpdatePosTablesOrders
   * @summary [POS] 주문 수정
   * @request PUT:/v1/pos/tables/{tableNo}/orders
   * @secure
   */
  updatePosTablesOrders = (
    tableNo: number,
    data: OrderUpdateRequests,
    params: RequestParams = {}
  ) =>
    this.request<UpdatePosTablesOrdersData, void>({
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
   * @name UpdatePosTablesOrdersMemo
   * @summary [POS] 주문 메모 수정
   * @request PUT:/v1/pos/tables/{tableNo}/orders/{orderId}/memo
   * @secure
   */
  updatePosTablesOrdersMemo = (
    tableNo: number,
    orderId: number,
    data: PosTableUpdateOrderMemoRequest,
    params: RequestParams = {}
  ) =>
    this.request<UpdatePosTablesOrdersMemoData, void>({
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
   * @name AddWaitings
   * @summary [WAITING] 웨이팅 등록
   * @request POST:/v1/waitings
   * @secure
   */
  addWaitings = (data: WaitingRegisterRequest, params: RequestParams = {}) =>
    this.request<AddWaitingsData, void>({
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
   * @name CompleteWaitings
   * @summary [HALL] 손님 입장 완료
   * @request POST:/v1/waitings/{waitingId}/complete
   * @secure
   */
  completeWaitings = (waitingId: number, params: RequestParams = {}) =>
    this.request<CompleteWaitingsData, void>({
      path: `/v1/waitings/${waitingId}/complete`,
      method: "POST",
      secure: true,
      ...params,
    });
  /**
   * @description 웨이팅 취소 API
   *
   * @tags 웨이팅
   * @name CancelWaitings
   * @summary [HALL] 웨이팅 취소
   * @request POST:/v1/waitings/{waitingId}/cancel
   * @secure
   */
  cancelWaitings = (waitingId: number, params: RequestParams = {}) =>
    this.request<CancelWaitingsData, void>({
      path: `/v1/waitings/${waitingId}/cancel`,
      method: "POST",
      secure: true,
      ...params,
    });
  /**
   * @description 손님 입장 안내 호출 API
   *
   * @tags 웨이팅
   * @name AddWaitingsCall
   * @summary [HALL] 손님 입장 안내 호출
   * @request POST:/v1/waitings/{waitingId}/call
   * @secure
   */
  addWaitingsCall = (waitingId: number, params: RequestParams = {}) =>
    this.request<AddWaitingsCallData, void>({
      path: `/v1/waitings/${waitingId}/call`,
      method: "POST",
      secure: true,
      ...params,
    });
  /**
   * @description 웨이팅 취소 API
   *
   * @tags 웨이팅
   * @name CancelStoresWaitings
   * @summary 웨이팅 취소
   * @request POST:/v1/stores/{storeId}/waitings/{accessKey}/cancel
   */
  cancelStoresWaitings = (storeId: number, accessKey: string, params: RequestParams = {}) =>
    this.request<CancelStoresWaitingsData, void>({
      path: `/v1/stores/${storeId}/waitings/${accessKey}/cancel`,
      method: "POST",
      ...params,
    });
  /**
   * @description 매장 오픈 API
   *
   * @tags 매장
   * @name AddStoresOpen
   * @summary [POS] 매장 오픈
   * @request POST:/v1/stores/open
   * @secure
   */
  addStoresOpen = (params: RequestParams = {}) =>
    this.request<AddStoresOpenData, void>({
      path: `/v1/stores/open`,
      method: "POST",
      secure: true,
      ...params,
    });
  /**
   * @description 매장 마감 API
   *
   * @tags 매장
   * @name AddStoresClose
   * @summary [POS] 매장 마감
   * @request POST:/v1/stores/close
   * @secure
   */
  addStoresClose = (params: RequestParams = {}) =>
    this.request<AddStoresCloseData, void>({
      path: `/v1/stores/close`,
      method: "POST",
      secure: true,
      ...params,
    });
  /**
   * @description 주방 재전송 API
   *
   * @tags POS
   * @name ResendPosTablesReceipt
   * @summary [POS] 주방 재전송
   * @request POST:/v1/pos/tables/{tableNo}/resend-receipt
   * @secure
   */
  resendPosTablesReceipt = (tableNo: number, params: RequestParams = {}) =>
    this.request<ResendPosTablesReceiptData, void>({
      path: `/v1/pos/tables/${tableNo}/resend-receipt`,
      method: "POST",
      secure: true,
      ...params,
    });
  /**
   * @description 주문 취소 API
   *
   * @tags POS
   * @name CancelPosTablesOrders
   * @summary [POS] 주문 취소
   * @request POST:/v1/pos/tables/{tableNo}/orders/{orderId}/cancel
   * @secure
   */
  cancelPosTablesOrders = (tableNo: number, orderId: number, params: RequestParams = {}) =>
    this.request<CancelPosTablesOrdersData, void>({
      path: `/v1/pos/tables/${tableNo}/orders/${orderId}/cancel`,
      method: "POST",
      secure: true,
      ...params,
    });
  /**
   * @description 테이블 주문 할인 API
   *
   * @tags POS
   * @name AddPosTablesDiscount
   * @summary [POS] 테이블 주문 할인
   * @request POST:/v1/pos/tables/{tableNo}/discount
   * @secure
   */
  addPosTablesDiscount = (
    tableNo: number,
    data: PosTableDiscountRequest,
    params: RequestParams = {}
  ) =>
    this.request<AddPosTablesDiscountData, void>({
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
   * @name CompletePosTables
   * @summary [POS] 테이블 완료
   * @request POST:/v1/pos/tables/{tableNo}/complete
   * @secure
   */
  completePosTables = (tableNo: number, params: RequestParams = {}) =>
    this.request<CompletePosTablesData, void>({
      path: `/v1/pos/tables/${tableNo}/complete`,
      method: "POST",
      secure: true,
      ...params,
    });
  /**
   * @description 테이블 이동 API
   *
   * @tags POS
   * @name MovePosTables
   * @summary [POS] 테이블 이동
   * @request POST:/v1/pos/tables/{sourceTableNo}/move/{targetTableNo}
   * @secure
   */
  movePosTables = (sourceTableNo: number, targetTableNo: number, params: RequestParams = {}) =>
    this.request<MovePosTablesData, void>({
      path: `/v1/pos/tables/${sourceTableNo}/move/${targetTableNo}`,
      method: "POST",
      secure: true,
      ...params,
    });
  /**
   * @description 주문 생성 API
   *
   * @tags 주문
   * @name AddOrders
   * @summary [TABLE, POS] 주문 생성
   * @request POST:/v1/orders
   * @secure
   */
  addOrders = (data: OrderCreateRequest, params: RequestParams = {}) =>
    this.request<AddOrdersData, void>({
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
   * @name AddOrdersServing
   * @summary [HALL] 주문 서빙
   * @request POST:/v1/orders/{orderId}/serving
   * @secure
   */
  addOrdersServing = (orderId: number, params: RequestParams = {}) =>
    this.request<AddOrdersServingData, void>({
      path: `/v1/orders/${orderId}/serving`,
      method: "POST",
      secure: true,
      ...params,
    });
  /**
   * @description 주문 메뉴 서빙 API<br/><br/>- 서빙이 완료되지 않은 주문 메뉴 -> 서빙 완료 처리<br/>- 서빙이 완료된 주문 메뉴 -> 서빙 완료 취소 처리
   *
   * @tags 주문
   * @name AddOrdersMenusServing
   * @summary [HALL] 주문 메뉴 서빙
   * @request POST:/v1/orders/{orderId}/menus/{orderMenuId}/serving
   * @secure
   */
  addOrdersMenusServing = (orderId: number, orderMenuId: number, params: RequestParams = {}) =>
    this.request<AddOrdersMenusServingData, void>({
      path: `/v1/orders/${orderId}/menus/${orderMenuId}/serving`,
      method: "POST",
      secure: true,
      ...params,
    });
  /**
   * @description 직원 호출 목록 조회 API
   *
   * @tags 직원 호출
   * @name GetOrdersStaffCalls
   * @summary [HALL] 직원 호출 목록 조회
   * @request GET:/v1/orders/staff-calls
   * @secure
   */
  getOrdersStaffCalls = (params: RequestParams = {}) =>
    this.request<GetOrdersStaffCallsData, void>({
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
   * @name AddOrdersStaffCalls
   * @summary [TABLE] 직원 호출
   * @request POST:/v1/orders/staff-calls
   * @secure
   */
  addOrdersStaffCalls = (data: StaffCallRequest, params: RequestParams = {}) =>
    this.request<AddOrdersStaffCallsData, void>({
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
   * @name CompleteOrdersStaffCalls
   * @summary [HALL] 직원 호출 완료
   * @request POST:/v1/orders/staff-calls/{staffCallId}/complete
   * @secure
   */
  completeOrdersStaffCalls = (staffCallId: number, params: RequestParams = {}) =>
    this.request<CompleteOrdersStaffCallsData, void>({
      path: `/v1/orders/staff-calls/${staffCallId}/complete`,
      method: "POST",
      secure: true,
      ...params,
    });
  /**
   * @description 주문 결제 승인 API
   *
   * @tags 주문 결제
   * @name ApproveOrdersPayments
   * @summary [TABLE, POS] 주문 결제 승인
   * @request POST:/v1/orders/payments/{tableNo}/approve
   * @secure
   */
  approveOrdersPayments = (
    tableNo: number,
    data: OrderPaymentApproveRequest,
    params: RequestParams = {}
  ) =>
    this.request<ApproveOrdersPaymentsData, void>({
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
   * @name CancelOrdersPayments
   * @summary [POS] 주문 결제 취소
   * @request POST:/v1/orders/payments/{orderPaymentId}/cancel
   * @secure
   */
  cancelOrdersPayments = (
    orderPaymentId: number,
    data: OrderPaymentCancelRequest,
    params: RequestParams = {}
  ) =>
    this.request<CancelOrdersPaymentsData, void>({
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
   * @name GetWaitingsCount
   * @summary [WAITING] 웨이팅 수 조회
   * @request GET:/v1/waitings/count
   * @secure
   */
  getWaitingsCount = (params: RequestParams = {}) =>
    this.request<GetWaitingsCountData, void>({
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
   * @name GetStoresWaitingsMyTurn
   * @summary 내 앞 대기팀 수 조회
   * @request GET:/v1/stores/{storeId}/waitings/{accessKey}/my-turn
   */
  getStoresWaitingsMyTurn = (storeId: number, accessKey: string, params: RequestParams = {}) =>
    this.request<GetStoresWaitingsMyTurnData, void>({
      path: `/v1/stores/${storeId}/waitings/${accessKey}/my-turn`,
      method: "GET",
      format: "json",
      ...params,
    });
  /**
   * @description 매장 메뉴 카테고리 및 메뉴 목록 조회 API<br/><br/>숨김(HIDE) 상태의 메뉴는 조회되지 않습니다.
   *
   * @tags 메뉴
   * @name GetStoresMenus
   * @summary 매장 메뉴 카테고리 및 메뉴 목록 조회
   * @request GET:/v1/stores/{storeId}/menus
   */
  getStoresMenus = (storeId: number, params: RequestParams = {}) =>
    this.request<GetStoresMenusData, void>({
      path: `/v1/stores/${storeId}/menus`,
      method: "GET",
      format: "json",
      ...params,
    });
  /**
   * @description 매장 활동 알림 SSE 연결 API
   *
   * @tags SSE
   * @name GetStoresSubscribe
   * @summary [ALL] 매장 활동 알림 SSE 연결
   * @request GET:/v1/stores/subscribe
   * @secure
   */
  getStoresSubscribe = (params: RequestParams = {}) =>
    this.request<GetStoresSubscribeData, void>({
      path: `/v1/stores/subscribe`,
      method: "GET",
      secure: true,
      ...params,
    });
  /**
   * @description 테이블 목록 조회 API<br/><br/>응답의 `orderType`, `orderedAt`, `orderMenuName` 필드는 **nullable** 값 입니다.<br/>`hasOrder`가 **true**인 경우 해당 필드들은 값이 존재하며, **false**인 경우 null 입니다.<br/><br/>**메뉴명 예제**<br/>- `orderMenuCount`가 1인 경우: `orderMenuName`<br/>- `orderMenuCount`가 2 이상인 경우: `orderMenuName 외 (orderMenuCount-1)개`
   *
   * @tags POS
   * @name GetPosTables
   * @summary [POS] 테이블 목록 조회
   * @request GET:/v1/pos/tables
   * @secure
   */
  getPosTables = (params: RequestParams = {}) =>
    this.request<GetPosTablesData, void>({
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
   * @name GetPosTablesById
   * @summary [POS] 테이블 액티비티 상세 조회
   * @request GET:/v1/pos/tables/{tableNo}
   * @secure
   */
  getPosTablesById = (tableNo: number, params: RequestParams = {}) =>
    this.request<GetPosTablesByIdData, void>({
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
   * @name GetPosTablesActivitiesById
   * @summary [POS] 테이블 액티비티 상세 조회
   * @request GET:/v1/pos/tables/activities/{posTableActivityId}
   * @secure
   */
  getPosTablesActivitiesById = (posTableActivityId: number, params: RequestParams = {}) =>
    this.request<GetPosTablesActivitiesByIdData, void>({
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
   * @name GetPosRevenue
   * @summary [POS] 매출 확인
   * @request GET:/v1/pos/revenue
   * @secure
   */
  getPosRevenue = (
    query?: {
      date?: string;
    },
    params: RequestParams = {}
  ) =>
    this.request<GetPosRevenueData, void>({
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
   * @name GetOrdersTables
   * @summary [TABLE] 활성 주문 목록 조회
   * @request GET:/v1/orders/tables
   * @secure
   */
  getOrdersTables = (params: RequestParams = {}) =>
    this.request<GetOrdersTablesData, void>({
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
   * @name GetOrdersPayments
   * @summary [POS] 결제 내역 조회
   * @request GET:/v1/orders/payments
   * @secure
   */
  getOrdersPayments = (
    query?: {
      date?: string;
    },
    params: RequestParams = {}
  ) =>
    this.request<GetOrdersPaymentsData, void>({
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
   * @name GetOrdersHall
   * @summary [HALL] 주문 목록 조회
   * @request GET:/v1/orders/hall
   * @secure
   */
  getOrdersHall = (params: RequestParams = {}) =>
    this.request<GetOrdersHallData, void>({
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
   * @name GetDevices
   * @summary [ALL] 기기 상세 조회
   * @request GET:/v1/devices
   * @secure
   */
  getDevices = (params: RequestParams = {}) =>
    this.request<GetDevicesData, void>({
      path: `/v1/devices`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
}
