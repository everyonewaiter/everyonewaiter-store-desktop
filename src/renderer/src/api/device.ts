import { publicApi } from "@renderer/api";
import { DevicePurpose, OrderPayment, SimpleStore } from "@renderer/types/domain";
import { AxiosResponse } from "axios";

/**
 * 인증 코드 요청 API
 * @param phoneNumber - 휴대폰 번호
 */
export const sendAuthCode = async (phoneNumber: string): Promise<AxiosResponse<void>> => {
  return await publicApi.post(`/devices/send-auth-code`, { phoneNumber });
};

/**
 * 인증 코드 검증 API
 * @param phoneNumber - 휴대폰 번호
 * @param code - 인증 코드
 * @returns 매장 목록 SimpleStore[]
 */
export const verifyAuthCode = async (
  phoneNumber: string,
  code: string
): Promise<AxiosResponse<{ stores: SimpleStore[] }>> => {
  return await publicApi.post(`/devices/verify-auth-code`, {
    phoneNumber,
    code,
  });
};

/**
 * 기기 등록 API
 * @param storeId - 매장 ID
 * @param body - 기기 정보 { phoneNumber, name, purpose, tableNo, paymentType }
 * @returns 기기 ID, 시크릿 키
 */
export const addDevice = async (
  storeId: string,
  body: {
    phoneNumber: string;
    name: string;
    purpose: DevicePurpose;
    tableNo: number;
    paymentType: OrderPayment;
  }
): Promise<AxiosResponse<{ deviceId: string; secretKey: string }>> => {
  return await publicApi.post(`/stores/${storeId}/devices`, { ...body });
};
