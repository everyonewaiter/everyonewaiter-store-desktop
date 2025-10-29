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
  AccountSignInRequest,
  ApplyData,
  CategoryCreateRequest,
  CategoryMovePositionRequest,
  CategoryUpdateRequest,
  Create1Data,
  Create2Data,
  Create2Payload,
  CreateData,
  Delete1Data,
  Delete2Data,
  DeleteAllData,
  DeleteData,
  DeviceCreateRequest,
  DeviceUpdateRequest,
  GetCategoriesData,
  GetDeviceData,
  GetDevicesData,
  GetMenuData,
  GetMenusData,
  GetProfile1Data,
  GetProfileData,
  GetRegistrationData,
  GetRegistrationsData,
  GetStoreData,
  GetStores1Data,
  GetStoresData,
  MenuDeleteRequest,
  MenuMovePositionRequest,
  MenuUpdateRequest,
  MovePosition1Data,
  MovePositionData,
  Reapply1Data,
  ReapplyData,
  RegistrationApplyRequest,
  RegistrationReapplyRequest,
  RenewTokenData,
  SendAuthCode1Data,
  SendAuthCodeData,
  SendAuthCodeRequest,
  SendAuthMailData,
  SendAuthMailRequest,
  SignInData,
  SignInTokenRenewRequest,
  SignUpData,
  StoreUpdateRequest,
  Update1Data,
  Update2Data,
  Update3Data,
  UpdateData,
  UpdateWithImageData,
  UpdateWithImagePayload,
  VerifyAuthCode1Data,
  VerifyAuthCodeData,
  VerifyAuthCodeRequest,
  VerifyEmailData,
} from "./data-contracts";
import { ContentType, HttpClient, RequestParams } from "./http-client";

export class V1<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * @description 매장 상세 조회 API
   *
   * @tags 매장
   * @name GetStore
   * @summary 매장 상세 조회
   * @request GET:/v1/stores/{storeId}
   */
  getStore = (storeId: number, params: RequestParams = {}) =>
    this.request<GetStoreData, void>({
      path: `/v1/stores/${storeId}`,
      method: "GET",
      format: "json",
      ...params,
    });
  /**
   * @description 매장 정보 수정 API
   *
   * @tags 매장
   * @name Update
   * @summary 매장 정보 수정
   * @request PUT:/v1/stores/{storeId}
   * @secure
   */
  update = (storeId: number, data: StoreUpdateRequest, params: RequestParams = {}) =>
    this.request<UpdateData, void>({
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
   * @name Update1
   * @summary 메뉴 수정
   * @request PUT:/v1/stores/{storeId}/menus/{menuId}
   * @secure
   */
  update1 = (
    storeId: number,
    menuId: number,
    data: MenuUpdateRequest,
    params: RequestParams = {}
  ) =>
    this.request<Update1Data, void>({
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
   * @name UpdateWithImage
   * @summary 메뉴 수정 (이미지 포함)
   * @request PUT:/v1/stores/{storeId}/menus/{menuId}/with-image
   * @secure
   */
  updateWithImage = (
    storeId: number,
    menuId: number,
    data: UpdateWithImagePayload,
    params: RequestParams = {}
  ) =>
    this.request<UpdateWithImageData, void>({
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
   * @name GetDevice
   * @summary 기기 상세 조회
   * @request GET:/v1/stores/{storeId}/devices/{deviceId}
   * @secure
   */
  getDevice = (storeId: number, deviceId: number, params: RequestParams = {}) =>
    this.request<GetDeviceData, void>({
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
   * @name Update2
   * @summary 기기 정보 수정
   * @request PUT:/v1/stores/{storeId}/devices/{deviceId}
   * @secure
   */
  update2 = (
    storeId: number,
    deviceId: number,
    data: DeviceUpdateRequest,
    params: RequestParams = {}
  ) =>
    this.request<Update2Data, void>({
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
   * @name Delete
   * @summary 기기 삭제
   * @request DELETE:/v1/stores/{storeId}/devices/{deviceId}
   * @secure
   */
  delete = (storeId: number, deviceId: number, params: RequestParams = {}) =>
    this.request<DeleteData, void>({
      path: `/v1/stores/${storeId}/devices/${deviceId}`,
      method: "DELETE",
      secure: true,
      ...params,
    });
  /**
   * @description 카테고리 수정 API
   *
   * @tags 메뉴 카테고리
   * @name Update3
   * @summary 카테고리 수정
   * @request PUT:/v1/stores/{storeId}/categories/{categoryId}
   * @secure
   */
  update3 = (
    storeId: number,
    categoryId: number,
    data: CategoryUpdateRequest,
    params: RequestParams = {}
  ) =>
    this.request<Update3Data, void>({
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
   * @name Delete1
   * @summary 카테고리 삭제
   * @request DELETE:/v1/stores/{storeId}/categories/{categoryId}
   * @secure
   */
  delete1 = (storeId: number, categoryId: number, params: RequestParams = {}) =>
    this.request<Delete1Data, void>({
      path: `/v1/stores/${storeId}/categories/${categoryId}`,
      method: "DELETE",
      secure: true,
      ...params,
    });
  /**
   * @description 매장 등록 신청 상세 조회 API
   *
   * @tags 매장 등록
   * @name GetRegistration
   * @summary 등록 신청 상세 조회
   * @request GET:/v1/stores/registrations/{registrationId}
   * @secure
   */
  getRegistration = (registrationId: number, params: RequestParams = {}) =>
    this.request<GetRegistrationData, void>({
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
   * @name Reapply
   * @summary 등록 재신청
   * @request PUT:/v1/stores/registrations/{registrationId}
   * @secure
   */
  reapply = (
    registrationId: number,
    data: RegistrationReapplyRequest,
    params: RequestParams = {}
  ) =>
    this.request<ReapplyData, void>({
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
   * @name Reapply1
   * @summary 등록 재신청 (이미지 포함)
   * @request PUT:/v1/stores/registrations/{registrationId}/with-image
   * @secure
   */
  reapply1 = (registrationId: number, data: RegistrationApplyRequest, params: RequestParams = {}) =>
    this.request<Reapply1Data, void>({
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
   * @name MovePosition
   * @summary 메뉴 순서 이동
   * @request POST:/v1/stores/{storeId}/menus/{sourceId}/move/{targetId}
   * @secure
   */
  movePosition = (
    storeId: number,
    sourceId: number,
    targetId: number,
    data: MenuMovePositionRequest,
    params: RequestParams = {}
  ) =>
    this.request<MovePositionData, void>({
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
   * @name DeleteAll
   * @summary 메뉴 다중 삭제
   * @request POST:/v1/stores/{storeId}/menus/delete
   * @secure
   */
  deleteAll = (storeId: number, data: MenuDeleteRequest, params: RequestParams = {}) =>
    this.request<DeleteAllData, void>({
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
   * @name GetDevices
   * @summary 기기 목록 조회
   * @request GET:/v1/stores/{storeId}/devices
   * @secure
   */
  getDevices = (
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
    this.request<GetDevicesData, void>({
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
   * @name Create
   * @summary 기기 생성
   * @request POST:/v1/stores/{storeId}/devices
   */
  create = (storeId: number, data: DeviceCreateRequest, params: RequestParams = {}) =>
    this.request<CreateData, void>({
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
   * @name GetCategories
   * @summary 카테고리 목록 조회
   * @request GET:/v1/stores/{storeId}/categories
   * @secure
   */
  getCategories = (storeId: number, params: RequestParams = {}) =>
    this.request<GetCategoriesData, void>({
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
   * @name Create1
   * @summary 카테고리 생성
   * @request POST:/v1/stores/{storeId}/categories
   * @secure
   */
  create1 = (storeId: number, data: CategoryCreateRequest, params: RequestParams = {}) =>
    this.request<Create1Data, void>({
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
   * @name MovePosition1
   * @summary 카테고리 순서 이동
   * @request POST:/v1/stores/{storeId}/categories/{sourceId}/move/{targetId}
   * @secure
   */
  movePosition1 = (
    storeId: number,
    sourceId: number,
    targetId: number,
    data: CategoryMovePositionRequest,
    params: RequestParams = {}
  ) =>
    this.request<MovePosition1Data, void>({
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
   * @name GetMenus
   * @summary 메뉴 목록 조회
   * @request GET:/v1/stores/{storeId}/categories/{categoryId}/menus
   * @secure
   */
  getMenus = (storeId: number, categoryId: number, params: RequestParams = {}) =>
    this.request<GetMenusData, void>({
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
   * @name Create2
   * @summary 메뉴 생성
   * @request POST:/v1/stores/{storeId}/categories/{categoryId}/menus
   * @secure
   */
  create2 = (
    storeId: number,
    categoryId: number,
    data: Create2Payload,
    params: RequestParams = {}
  ) =>
    this.request<Create2Data, void>({
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
   * @name GetRegistrations
   * @summary 등록 신청 목록 조회
   * @request GET:/v1/stores/registrations
   * @secure
   */
  getRegistrations = (
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
    this.request<GetRegistrationsData, void>({
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
   * @name Apply
   * @summary 등록 신청
   * @request POST:/v1/stores/registrations
   * @secure
   */
  apply = (data: RegistrationApplyRequest, params: RequestParams = {}) =>
    this.request<ApplyData, void>({
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
   * @name VerifyAuthCode
   * @summary 휴대폰 인증
   * @request POST:/v1/devices/verify-auth-code
   */
  verifyAuthCode = (data: VerifyAuthCodeRequest, params: RequestParams = {}) =>
    this.request<VerifyAuthCodeData, void>({
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
   * @name SendAuthCode
   * @summary 휴대폰 인증 번호 알림톡 발송
   * @request POST:/v1/devices/send-auth-code
   */
  sendAuthCode = (data: SendAuthCodeRequest, params: RequestParams = {}) =>
    this.request<SendAuthCodeData, void>({
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
   * @name SignUp
   * @summary 계정 생성
   * @request POST:/v1/accounts
   */
  signUp = (data: AccountCreateRequest, params: RequestParams = {}) =>
    this.request<SignUpData, void>({
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
   * @name VerifyEmail
   * @summary 이메일 인증
   * @request POST:/v1/accounts/verify-auth-mail
   */
  verifyEmail = (
    query: {
      token: string;
    },
    params: RequestParams = {}
  ) =>
    this.request<VerifyEmailData, void>({
      path: `/v1/accounts/verify-auth-mail`,
      method: "POST",
      query: query,
      ...params,
    });
  /**
   * @description 휴대폰 번호 인증 API<br/><br/>휴대폰 번호 인증이 완료된 후 15분 이내 계정 생성을 완료해야 합니다.
   *
   * @tags 계정
   * @name VerifyAuthCode1
   * @summary 휴대폰 인증
   * @request POST:/v1/accounts/verify-auth-code
   */
  verifyAuthCode1 = (data: VerifyAuthCodeRequest, params: RequestParams = {}) =>
    this.request<VerifyAuthCode1Data, void>({
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
   * @name SignIn
   * @summary 로그인
   * @request POST:/v1/accounts/sign-in
   */
  signIn = (data: AccountSignInRequest, params: RequestParams = {}) =>
    this.request<SignInData, void>({
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
   * @name SendAuthMail
   * @summary 이메일 인증 확인 메일 발송
   * @request POST:/v1/accounts/send-auth-mail
   */
  sendAuthMail = (data: SendAuthMailRequest, params: RequestParams = {}) =>
    this.request<SendAuthMailData, void>({
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
   * @name SendAuthCode1
   * @summary 휴대폰 인증 번호 알림톡 발송
   * @request POST:/v1/accounts/send-auth-code
   */
  sendAuthCode1 = (data: SendAuthCodeRequest, params: RequestParams = {}) =>
    this.request<SendAuthCode1Data, void>({
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
   * @name RenewToken
   * @summary 토큰 갱신
   * @request POST:/v1/accounts/renew-token
   */
  renewToken = (data: SignInTokenRenewRequest, params: RequestParams = {}) =>
    this.request<RenewTokenData, void>({
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
   * @name GetMenu
   * @summary 메뉴 상세 조회
   * @request GET:/v1/stores/{storeId}/categories/{categoryId}/menus/{menuId}
   * @secure
   */
  getMenu = (storeId: number, categoryId: number, menuId: number, params: RequestParams = {}) =>
    this.request<GetMenuData, void>({
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
   * @name Delete2
   * @summary 메뉴 삭제
   * @request DELETE:/v1/stores/{storeId}/categories/{categoryId}/menus/{menuId}
   * @secure
   */
  delete2 = (storeId: number, categoryId: number, menuId: number, params: RequestParams = {}) =>
    this.request<Delete2Data, void>({
      path: `/v1/stores/${storeId}/categories/${categoryId}/menus/${menuId}`,
      method: "DELETE",
      secure: true,
      ...params,
    });
  /**
   * @description 매장 목록 (계정 ID) 조회 API
   *
   * @tags 매장
   * @name GetStores1
   * @summary 매장 목록 (계정 ID) 조회
   * @request GET:/v1/stores/accounts/{accountId}
   */
  getStores1 = (accountId: number, params: RequestParams = {}) =>
    this.request<GetStores1Data, any>({
      path: `/v1/stores/accounts/${accountId}`,
      method: "GET",
      format: "json",
      ...params,
    });
  /**
   * @description 프로필 조회 (휴대폰 번호) API
   *
   * @tags 계정
   * @name GetProfile
   * @summary 프로필 조회 (휴대폰 번호)
   * @request GET:/v1/accounts/phone-number/{phoneNumber}/me
   */
  getProfile = (phoneNumber: string, params: RequestParams = {}) =>
    this.request<GetProfileData, void>({
      path: `/v1/accounts/phone-number/${phoneNumber}/me`,
      method: "GET",
      format: "json",
      ...params,
    });
  /**
   * @description 프로필 조회 API
   *
   * @tags 계정
   * @name GetProfile1
   * @summary 프로필 조회
   * @request GET:/v1/accounts/me
   * @secure
   */
  getProfile1 = (params: RequestParams = {}) =>
    this.request<GetProfile1Data, void>({
      path: `/v1/accounts/me`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
}
