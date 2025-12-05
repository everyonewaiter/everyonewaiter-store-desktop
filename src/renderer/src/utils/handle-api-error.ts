import { isAxiosError } from "axios";

export interface ApiErrorResponse {
  code: string;
  message: string;
  timestamp: string;
}

export function handleApiError(error: Error) {
  if (!isAxiosError<ApiErrorResponse>(error)) return;

  const status = error.response?.status;
  const code = error.response?.data?.code ?? "";

  if (status === 401 && code === "UNAUTHORIZED") {
    alert("등록된 기기가 아닙니다.");
    return;
  }

  const message = error.response?.data?.message;
  if (message) alert(message);
}
