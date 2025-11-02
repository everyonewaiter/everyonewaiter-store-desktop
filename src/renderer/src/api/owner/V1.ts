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
  AccountCreateRequest,
  AccountsData,
  AccountSignInRequest,
  AccountsResult,
  AddAccountsData,
  AddStoresCategoriesData,
  AddStoresCategoriesMenusData,
  AddStoresCategoriesMenusPayload,
  AddStoresDevicesData,
  AddStoresRegistrationsData,
  CategoryCreateRequest,
  CategoryMovePositionRequest,
  CategoryUpdateRequest,
  DeleteStoresCategoriesData,
  DeleteStoresCategoriesMenusData,
  DeleteStoresDevicesData,
  DeleteStoresMenusData,
  DeviceCreateRequest,
  DevicesData,
  DeviceUpdateRequest,
  GetAccountsMeData,
  GetAccountsPhoneNumberMeData,
  GetStoresAccountsByIdData,
  GetStoresByIdData,
  GetStoresCategoriesData,
  GetStoresCategoriesMenusByIdData,
  GetStoresCategoriesMenusData,
  GetStoresData,
  GetStoresDevicesByIdData,
  GetStoresDevicesData,
  GetStoresRegistrationsByIdData,
  GetStoresRegistrationsData,
  MenuDeleteRequest,
  MenuMovePositionRequest,
  MenuUpdateRequest,
  MoveStoresCategoriesData,
  MoveStoresMenusData,
  RegistrationApplyRequest,
  RegistrationReapplyRequest,
  RenewAccountsTokenData,
  SendAccountsAuthCodeData,
  SendAccountsAuthMailData,
  SendAuthCodeRequest,
  SendAuthMailRequest,
  SendDevicesAuthCodeData,
  SignAccountsInData,
  SignInTokenRenewRequest,
  StoreUpdateRequest,
  UpdateStoresCategoriesData,
  UpdateStoresData,
  UpdateStoresDevicesData,
  UpdateStoresMenusData,
  UpdateStoresMenusWithImageData,
  UpdateStoresMenusWithImagePayload,
  UpdateStoresRegistrationsData,
  UpdateStoresRegistrationsWithImageData,
  VerifyAuthCodeRequest,
} from "./data-contracts";
import { ContentType, HttpClient, RequestParams } from "./http-client";

export class V1<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * @description 매장 상세 조회 API
   *
   * @tags 매장
   * @name GetStoresById
   * @summary 매장 상세 조회
   * @request GET:/v1/stores/{storeId}
   */
  getStoresById = (storeId: number, params: RequestParams = {}) =>
    this.request<GetStoresByIdData, void>({
      path: `/v1/stores/${storeId}`,
      method: "GET",
      format: "json",
      ...params,
    });
  /**
   * @description 매장 정보 수정 API
   *
   * @tags 매장
   * @name UpdateStores
   * @summary 매장 정보 수정
   * @request PUT:/v1/stores/{storeId}
   * @secure
   */
  updateStores = (storeId: number, data: StoreUpdateRequest, params: RequestParams = {}) =>
    this.request<UpdateStoresData, void>({
      path: `/v1/stores/${storeId}`,
      method: "PUT",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description 메뉴 수정 API
   *
   * @tags 메뉴
   * @name UpdateStoresMenus
   * @summary 메뉴 수정
   * @request PUT:/v1/stores/{storeId}/menus/{menuId}
   * @secure
   */
  updateStoresMenus = (
    storeId: number,
    menuId: number,
    data: MenuUpdateRequest,
    params: RequestParams = {}
  ) =>
    this.request<UpdateStoresMenusData, void>({
      path: `/v1/stores/${storeId}/menus/${menuId}`,
      method: "PUT",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description 메뉴 수정 (이미지 포함) API
   *
   * @tags 메뉴
   * @name UpdateStoresMenusWithImage
   * @summary 메뉴 수정 (이미지 포함)
   * @request PUT:/v1/stores/{storeId}/menus/{menuId}/with-image
   * @secure
   */
  updateStoresMenusWithImage = (
    storeId: number,
    menuId: number,
    data: UpdateStoresMenusWithImagePayload,
    params: RequestParams = {}
  ) =>
    this.request<UpdateStoresMenusWithImageData, void>({
      path: `/v1/stores/${storeId}/menus/${menuId}/with-image`,
      method: "PUT",
      body: data,
      secure: true,
      type: ContentType.FormData,
      ...params,
    });
  /**
   * @description 기기 상세 조회 API
   *
   * @tags 기기
   * @name GetStoresDevicesById
   * @summary 기기 상세 조회
   * @request GET:/v1/stores/{storeId}/devices/{deviceId}
   * @secure
   */
  getStoresDevicesById = (storeId: number, deviceId: number, params: RequestParams = {}) =>
    this.request<GetStoresDevicesByIdData, void>({
      path: `/v1/stores/${storeId}/devices/${deviceId}`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * @description 기기 정보 수정 API
   *
   * @tags 기기
   * @name UpdateStoresDevices
   * @summary 기기 정보 수정
   * @request PUT:/v1/stores/{storeId}/devices/{deviceId}
   * @secure
   */
  updateStoresDevices = (
    storeId: number,
    deviceId: number,
    data: DeviceUpdateRequest,
    params: RequestParams = {}
  ) =>
    this.request<UpdateStoresDevicesData, void>({
      path: `/v1/stores/${storeId}/devices/${deviceId}`,
      method: "PUT",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description 기기 삭제 API
   *
   * @tags 기기
   * @name DeleteStoresDevices
   * @summary 기기 삭제
   * @request DELETE:/v1/stores/{storeId}/devices/{deviceId}
   * @secure
   */
  deleteStoresDevices = (storeId: number, deviceId: number, params: RequestParams = {}) =>
    this.request<DeleteStoresDevicesData, void>({
      path: `/v1/stores/${storeId}/devices/${deviceId}`,
      method: "DELETE",
      secure: true,
      ...params,
    });
  /**
   * @description 카테고리 수정 API
   *
   * @tags 메뉴 카테고리
   * @name UpdateStoresCategories
   * @summary 카테고리 수정
   * @request PUT:/v1/stores/{storeId}/categories/{categoryId}
   * @secure
   */
  updateStoresCategories = (
    storeId: number,
    categoryId: number,
    data: CategoryUpdateRequest,
    params: RequestParams = {}
  ) =>
    this.request<UpdateStoresCategoriesData, void>({
      path: `/v1/stores/${storeId}/categories/${categoryId}`,
      method: "PUT",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description 카테고리 삭제 API
   *
   * @tags 메뉴 카테고리
   * @name DeleteStoresCategories
   * @summary 카테고리 삭제
   * @request DELETE:/v1/stores/{storeId}/categories/{categoryId}
   * @secure
   */
  deleteStoresCategories = (storeId: number, categoryId: number, params: RequestParams = {}) =>
    this.request<DeleteStoresCategoriesData, void>({
      path: `/v1/stores/${storeId}/categories/${categoryId}`,
      method: "DELETE",
      secure: true,
      ...params,
    });
  /**
   * @description 매장 등록 신청 상세 조회 API
   *
   * @tags 매장 등록
   * @name GetStoresRegistrationsById
   * @summary 등록 신청 상세 조회
   * @request GET:/v1/stores/registrations/{registrationId}
   * @secure
   */
  getStoresRegistrationsById = (registrationId: number, params: RequestParams = {}) =>
    this.request<GetStoresRegistrationsByIdData, void>({
      path: `/v1/stores/registrations/${registrationId}`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * @description 매장 등록 재신청 API
   *
   * @tags 매장 등록
   * @name UpdateStoresRegistrations
   * @summary 등록 재신청
   * @request PUT:/v1/stores/registrations/{registrationId}
   * @secure
   */
  updateStoresRegistrations = (
    registrationId: number,
    data: RegistrationReapplyRequest,
    params: RequestParams = {}
  ) =>
    this.request<UpdateStoresRegistrationsData, void>({
      path: `/v1/stores/registrations/${registrationId}`,
      method: "PUT",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description 매장 등록 재신청 (이미지 포함) API<br/><br/>사업자 등록증 파일은 이미지 또는 PDF 형식만 지원합니다.<br/>PDF 형식의 파일의 경우 첫번째 페이지만 이미지로 변환 후 업로드됩니다.
   *
   * @tags 매장 등록
   * @name UpdateStoresRegistrationsWithImage
   * @summary 등록 재신청 (이미지 포함)
   * @request PUT:/v1/stores/registrations/{registrationId}/with-image
   * @secure
   */
  updateStoresRegistrationsWithImage = (
    registrationId: number,
    data: RegistrationApplyRequest,
    params: RequestParams = {}
  ) =>
    this.request<UpdateStoresRegistrationsWithImageData, void>({
      path: `/v1/stores/registrations/${registrationId}/with-image`,
      method: "PUT",
      body: data,
      secure: true,
      type: ContentType.FormData,
      ...params,
    });
  /**
   * @description 메뉴 순서 이동 API<br/><br/>- sourceId와 targetId로 메뉴를 찾습니다.<br/>- sourceId 메뉴의 위치를 targetId 메뉴의 위치 전,후로 이동합니다.<br/>
   *
   * @tags 메뉴
   * @name MoveStoresMenus
   * @summary 메뉴 순서 이동
   * @request POST:/v1/stores/{storeId}/menus/{sourceId}/move/{targetId}
   * @secure
   */
  moveStoresMenus = (
    storeId: number,
    sourceId: number,
    targetId: number,
    data: MenuMovePositionRequest,
    params: RequestParams = {}
  ) =>
    this.request<MoveStoresMenusData, void>({
      path: `/v1/stores/${storeId}/menus/${sourceId}/move/${targetId}`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description 메뉴 다중 삭제 API
   *
   * @tags 메뉴
   * @name DeleteStoresMenus
   * @summary 메뉴 다중 삭제
   * @request POST:/v1/stores/{storeId}/menus/delete
   * @secure
   */
  deleteStoresMenus = (storeId: number, data: MenuDeleteRequest, params: RequestParams = {}) =>
    this.request<DeleteStoresMenusData, void>({
      path: `/v1/stores/${storeId}/menus/delete`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description 기기 목록 조회 API
   *
   * @tags 기기
   * @name GetStoresDevices
   * @summary 기기 목록 조회
   * @request GET:/v1/stores/{storeId}/devices
   * @secure
   */
  getStoresDevices = (
    storeId: number,
    query: {
      /**
       * 조회 페이지 번호
       * @format int64
       * @min 1
       * @max 1000
       * @default 1
       */
      page: number;
      /**
       * 페이지 조회 데이터 수
       * @format int64
       * @min 1
       * @max 100
       * @default 20
       */
      size: number;
    },
    params: RequestParams = {}
  ) =>
    this.request<GetStoresDevicesData, void>({
      path: `/v1/stores/${storeId}/devices`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * @description 기기 생성 API<br/><br/>기기의 사용 용도에 따라 추가적으로 유효성 검사를 진행합니다.<br/>- **TABLE**: 테이블 번호 1 이상<br/><br/>기기 생성 시 사용 용도에 따라 요청 본문과 상관없이 기본값을 사용합니다.<br/>- **POS**: 테이블 번호 0, 결제 타입 POSTPAID<br/>- **HALL**, **WAITING**: 테이블 번호 0, 결제 타입 POSTPAID
   *
   * @tags 기기
   * @name AddStoresDevices
   * @summary 기기 생성
   * @request POST:/v1/stores/{storeId}/devices
   */
  addStoresDevices = (storeId: number, data: DeviceCreateRequest, params: RequestParams = {}) =>
    this.request<AddStoresDevicesData, void>({
      path: `/v1/stores/${storeId}/devices`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * @description 카테고리 목록 조회 API
   *
   * @tags 메뉴 카테고리
   * @name GetStoresCategories
   * @summary 카테고리 목록 조회
   * @request GET:/v1/stores/{storeId}/categories
   * @secure
   */
  getStoresCategories = (storeId: number, params: RequestParams = {}) =>
    this.request<GetStoresCategoriesData, void>({
      path: `/v1/stores/${storeId}/categories`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * @description 카테고리 생성 API
   *
   * @tags 메뉴 카테고리
   * @name AddStoresCategories
   * @summary 카테고리 생성
   * @request POST:/v1/stores/{storeId}/categories
   * @secure
   */
  addStoresCategories = (
    storeId: number,
    data: CategoryCreateRequest,
    params: RequestParams = {}
  ) =>
    this.request<AddStoresCategoriesData, void>({
      path: `/v1/stores/${storeId}/categories`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description 카테고리 순서 이동 API<br/><br/>- sourceId와 targetId로 카테고리를 찾습니다.<br/>- sourceId 카테고리의 위치를 targetId 카테고리의 위치 전,후로 이동합니다.<br/>
   *
   * @tags 메뉴 카테고리
   * @name MoveStoresCategories
   * @summary 카테고리 순서 이동
   * @request POST:/v1/stores/{storeId}/categories/{sourceId}/move/{targetId}
   * @secure
   */
  moveStoresCategories = (
    storeId: number,
    sourceId: number,
    targetId: number,
    data: CategoryMovePositionRequest,
    params: RequestParams = {}
  ) =>
    this.request<MoveStoresCategoriesData, void>({
      path: `/v1/stores/${storeId}/categories/${sourceId}/move/${targetId}`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description 메뉴 목록 조회 API
   *
   * @tags 메뉴
   * @name GetStoresCategoriesMenus
   * @summary 메뉴 목록 조회
   * @request GET:/v1/stores/{storeId}/categories/{categoryId}/menus
   * @secure
   */
  getStoresCategoriesMenus = (storeId: number, categoryId: number, params: RequestParams = {}) =>
    this.request<GetStoresCategoriesMenusData, void>({
      path: `/v1/stores/${storeId}/categories/${categoryId}/menus`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * @description 메뉴 생성 API
   *
   * @tags 메뉴
   * @name AddStoresCategoriesMenus
   * @summary 메뉴 생성
   * @request POST:/v1/stores/{storeId}/categories/{categoryId}/menus
   * @secure
   */
  addStoresCategoriesMenus = (
    storeId: number,
    categoryId: number,
    data: AddStoresCategoriesMenusPayload,
    params: RequestParams = {}
  ) =>
    this.request<AddStoresCategoriesMenusData, void>({
      path: `/v1/stores/${storeId}/categories/${categoryId}/menus`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.FormData,
      ...params,
    });
  /**
   * @description 매장 등록 신청 목록 조회 API
   *
   * @tags 매장 등록
   * @name GetStoresRegistrations
   * @summary 등록 신청 목록 조회
   * @request GET:/v1/stores/registrations
   * @secure
   */
  getStoresRegistrations = (
    query: {
      /**
       * 조회 페이지 번호
       * @format int64
       * @min 1
       * @max 1000
       * @default 1
       */
      page: number;
      /**
       * 페이지 조회 데이터 수
       * @format int64
       * @min 1
       * @max 100
       * @default 20
       */
      size: number;
    },
    params: RequestParams = {}
  ) =>
    this.request<GetStoresRegistrationsData, void>({
      path: `/v1/stores/registrations`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * @description 매장 등록 신청 API<br/><br/>사업자 등록증 파일은 이미지 또는 PDF 형식만 지원합니다.<br/>PDF 형식의 파일의 경우 첫번째 페이지만 이미지로 변환 후 업로드됩니다.
   *
   * @tags 매장 등록
   * @name AddStoresRegistrations
   * @summary 등록 신청
   * @request POST:/v1/stores/registrations
   * @secure
   */
  addStoresRegistrations = (data: RegistrationApplyRequest, params: RequestParams = {}) =>
    this.request<AddStoresRegistrationsData, void>({
      path: `/v1/stores/registrations`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.FormData,
      ...params,
    });
  /**
   * @description 휴대폰 번호 인증 API<br/><br/>휴대폰 번호 인증이 완료된 후 30분 이내 기기 생성을 완료해야 합니다.
   *
   * @tags 기기
   * @name Devices
   * @summary 휴대폰 인증
   * @request POST:/v1/devices/verify-auth-code
   */
  Devices = (data: VerifyAuthCodeRequest, params: RequestParams = {}) =>
    this.request<DevicesData, void>({
      path: `/v1/devices/verify-auth-code`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * @description 휴대폰 인증 번호 알림톡 발송 요청 API<br/><br/>24시간동안 최대 50번까지 요청할 수 있습니다.<br/>**5분**의 유효기간을 가진 6자리의 랜덤 번호를 생성 후, 요청 본문의 휴대폰 번호로 알림톡을 발송합니다.
   *
   * @tags 기기
   * @name SendDevicesAuthCode
   * @summary 휴대폰 인증 번호 알림톡 발송
   * @request POST:/v1/devices/send-auth-code
   */
  sendDevicesAuthCode = (data: SendAuthCodeRequest, params: RequestParams = {}) =>
    this.request<SendDevicesAuthCodeData, void>({
      path: `/v1/devices/send-auth-code`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description 계정 생성 API<br/><br/>휴대폰 번호 인증이 완료된 후 15분 이내 계정 생성을 완료해야 합니다.<br/>계정 생성 완료 시 계정의 상태는 **비활성**이며, 이메일 인증을 완료하면 **활성** 상태로 변경됩니다.<br/>이메일 인증 확인 메일은 가입 완료 후 자동으로 발송되며, 이메일 인증에 필요한 액세스 토큰은 발송된 메일에 첨부되어 있는 링크에 포함되어 있습니다.
   *
   * @tags 계정
   * @name AddAccounts
   * @summary 계정 생성
   * @request POST:/v1/accounts
   */
  addAccounts = (data: AccountCreateRequest, params: RequestParams = {}) =>
    this.request<AddAccountsData, void>({
      path: `/v1/accounts`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description 이메일 인증 API
   *
   * @tags 계정
   * @name Accounts
   * @summary 이메일 인증
   * @request POST:/v1/accounts/verify-auth-mail
   */
  Accounts = (
    query: {
      token: string;
    },
    params: RequestParams = {}
  ) =>
    this.request<AccountsData, void>({
      path: `/v1/accounts/verify-auth-mail`,
      method: "POST",
      query: query,
      ...params,
    });
  /**
   * @description 휴대폰 번호 인증 API<br/><br/>휴대폰 번호 인증이 완료된 후 15분 이내 계정 생성을 완료해야 합니다.
   *
   * @tags 계정
   * @name Accounts
   * @summary 휴대폰 인증
   * @request POST:/v1/accounts/verify-auth-code
   */
  Accounts = (data: VerifyAuthCodeRequest, params: RequestParams = {}) =>
    this.request<AccountsResult, void>({
      path: `/v1/accounts/verify-auth-code`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description 로그인 API
   *
   * @tags 계정
   * @name SignAccountsIn
   * @summary 로그인
   * @request POST:/v1/accounts/sign-in
   */
  signAccountsIn = (data: AccountSignInRequest, params: RequestParams = {}) =>
    this.request<SignAccountsInData, void>({
      path: `/v1/accounts/sign-in`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * @description 이메일 인증 확인 메일 발송 요청 API<br/><br/>계정 생성 시 자동으로 발송됨으로 계정 생성 요청 후 직접 해당 API를 호출할 필요가 없습니다.<br/>이메일 인증 확인 메일 내 첨부된 토큰이 만료된 경우 해당 API를 이용하여 확인 메일을 재발송할 수 있습니다.
   *
   * @tags 계정
   * @name SendAccountsAuthMail
   * @summary 이메일 인증 확인 메일 발송
   * @request POST:/v1/accounts/send-auth-mail
   */
  sendAccountsAuthMail = (data: SendAuthMailRequest, params: RequestParams = {}) =>
    this.request<SendAccountsAuthMailData, void>({
      path: `/v1/accounts/send-auth-mail`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description 휴대폰 인증 번호 알림톡 발송 요청 API<br/><br/>24시간동안 최대 5번까지 요청할 수 있습니다.<br/>**5분**의 유효기간을 가진 6자리의 랜덤 번호를 생성 후, 요청 본문의 휴대폰 번호로 알림톡을 발송합니다.
   *
   * @tags 계정
   * @name SendAccountsAuthCode
   * @summary 휴대폰 인증 번호 알림톡 발송
   * @request POST:/v1/accounts/send-auth-code
   */
  sendAccountsAuthCode = (data: SendAuthCodeRequest, params: RequestParams = {}) =>
    this.request<SendAccountsAuthCodeData, void>({
      path: `/v1/accounts/send-auth-code`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description 토큰 갱신 API
   *
   * @tags 계정
   * @name RenewAccountsToken
   * @summary 토큰 갱신
   * @request POST:/v1/accounts/renew-token
   */
  renewAccountsToken = (data: SignInTokenRenewRequest, params: RequestParams = {}) =>
    this.request<RenewAccountsTokenData, void>({
      path: `/v1/accounts/renew-token`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * @description 매장 목록 조회 API
   *
   * @tags 매장
   * @name GetStores
   * @summary 매장 목록 조회
   * @request GET:/v1/stores
   * @secure
   */
  getStores = (params: RequestParams = {}) =>
    this.request<GetStoresData, void>({
      path: `/v1/stores`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * @description 메뉴 상세 조회 API
   *
   * @tags 메뉴
   * @name GetStoresCategoriesMenusById
   * @summary 메뉴 상세 조회
   * @request GET:/v1/stores/{storeId}/categories/{categoryId}/menus/{menuId}
   * @secure
   */
  getStoresCategoriesMenusById = (
    storeId: number,
    categoryId: number,
    menuId: number,
    params: RequestParams = {}
  ) =>
    this.request<GetStoresCategoriesMenusByIdData, void>({
      path: `/v1/stores/${storeId}/categories/${categoryId}/menus/${menuId}`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * @description 메뉴 삭제 API
   *
   * @tags 메뉴
   * @name DeleteStoresCategoriesMenus
   * @summary 메뉴 삭제
   * @request DELETE:/v1/stores/{storeId}/categories/{categoryId}/menus/{menuId}
   * @secure
   */
  deleteStoresCategoriesMenus = (
    storeId: number,
    categoryId: number,
    menuId: number,
    params: RequestParams = {}
  ) =>
    this.request<DeleteStoresCategoriesMenusData, void>({
      path: `/v1/stores/${storeId}/categories/${categoryId}/menus/${menuId}`,
      method: "DELETE",
      secure: true,
      ...params,
    });
  /**
   * @description 매장 목록 (계정 ID) 조회 API
   *
   * @tags 매장
   * @name GetStoresAccountsById
   * @summary 매장 목록 (계정 ID) 조회
   * @request GET:/v1/stores/accounts/{accountId}
   */
  getStoresAccountsById = (accountId: number, params: RequestParams = {}) =>
    this.request<GetStoresAccountsByIdData, any>({
      path: `/v1/stores/accounts/${accountId}`,
      method: "GET",
      format: "json",
      ...params,
    });
  /**
   * @description 프로필 조회 (휴대폰 번호) API
   *
   * @tags 계정
   * @name GetAccountsPhoneNumberMe
   * @summary 프로필 조회 (휴대폰 번호)
   * @request GET:/v1/accounts/phone-number/{phoneNumber}/me
   */
  getAccountsPhoneNumberMe = (phoneNumber: string, params: RequestParams = {}) =>
    this.request<GetAccountsPhoneNumberMeData, void>({
      path: `/v1/accounts/phone-number/${phoneNumber}/me`,
      method: "GET",
      format: "json",
      ...params,
    });
  /**
   * @description 프로필 조회 API
   *
   * @tags 계정
   * @name GetAccountsMe
   * @summary 프로필 조회
   * @request GET:/v1/accounts/me
   * @secure
   */
  getAccountsMe = (params: RequestParams = {}) =>
    this.request<GetAccountsMeData, void>({
      path: `/v1/accounts/me`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
}
