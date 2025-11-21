import { AxiosRequestConfig } from "axios";
import CryptoJS from "crypto-js";

// 요청 헤더 및 시그니처 생성에 사용
// 요청 헤더와 시그니처 생성 시 동일한 timestamp 사용
// 5분 경과 시 사용 불가 (요청할 때마다 생성 권장)
const makeSignature = ({
  method,
  uri,
  deviceId,
  secretKey,
  timestamp,
}: {
  deviceId: string;
  secretKey: string;
  timestamp: string;
  method: AxiosRequestConfig["method"];
  uri: string;
}) => {
  const hmac = CryptoJS.algo.HMAC.create(CryptoJS.algo.SHA256, secretKey);
  hmac.update(`${method} ${uri}`);
  hmac.update("\n");
  hmac.update(`${deviceId}`);
  hmac.update("\n");
  hmac.update(timestamp);
  const hash = hmac.finalize();
  return hash.toString(CryptoJS.enc.Base64);
};

export default makeSignature;
