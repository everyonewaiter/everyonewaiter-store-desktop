import { isAxiosError } from "axios";

export interface ApiErrorResponse {
  code: string;
  message: string;
  timestamp: string;
}

/**
 * @param error
 * @param handlers - 오류 코드에 따른 핸들러 함수 { NOT_FOUND: () => {...}, FORBIDDEN: () => {...} }
 * @returns
 */
export function handleApiError(error: Error, handlers?: Record<string, () => void>) {
  if (!isAxiosError<ApiErrorResponse>(error)) return;

  const status = error.response?.status;
  const code = error.response?.data?.code ?? "";
  const message = error.response?.data?.message;
  const fn = handlers?.[code];

  if (status === 401 && code === "UNAUTHORIZED") {
    alert("등록된 기기가 아닙니다.");
    return;
  }

  if (fn) {
    fn();
  } else if (message) {
    alert(message);
  }
}
