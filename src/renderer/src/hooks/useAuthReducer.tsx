import { useReducer } from "react";

type State = {
  phoneInputDisabled: boolean;
  phoneBtnLoading: boolean;
  phoneBtnDisabled: boolean;
  phoneRerequest: boolean;

  authInputDisabled: boolean;
  authBtnLoading: boolean;
  authBtnDisabled: boolean;

  authSucceeded: boolean;
};

const initialState: State = {
  phoneInputDisabled: false,
  phoneBtnLoading: false,
  phoneBtnDisabled: false,
  phoneRerequest: false,

  authInputDisabled: true,
  authBtnLoading: false,
  authBtnDisabled: true,

  authSucceeded: false,
};

// REQUEST_PHONE: 인증 요청 클릭 -> 폰 인증 요청 및 인증 번호 메세지 전송 -> 버튼 loading
// FAILED_PHONE: 폰 인증 요청 실패 -> 실패 메세지 표시 & loading 종료
// SUCCESS_PHONE: 폰 인증 요청 성공 -> 폰 인풋 비활성화 & 버튼 재요청으로 변경 -> 인증 인풋 활성화 & 버튼 활성화 -> 시간 시작
// REQUEST_AUTH_NUMBER: 인증 번호 요청 -> 버튼 Loading
// FAILED_AUTH_NUMBER: 인증 번호 요청 실패 -> loading 종료 (시간 흐름)
// SUCCESS_AUTH_NUMBER: 인증 번호 요청 성공 -> 인증 인풋 비활성화 & 버튼 비활성화 & 폰 버튼 비활성화

const authReducer = (state: typeof initialState, action: { type: string }) => {
  switch (action.type) {
    case "REQUEST_PHONE":
      return { ...state, phoneInputDisabled: true, phoneBtnLoading: true };
    case "FAILED_PHONE":
      return {
        ...state,
        phoneInputDisabled: false,
        phoneBtnLoading: false,
        phoneRerequest: false,
      };
    case "SUCCESS_PHONE":
      return {
        ...state,
        phoneBtnLoading: false,
        authInputDisabled: false,
        authBtnDisabled: false,
        phoneRerequest: true,
      };
    case "REQUEST_AUTH_NUMBER":
      return { ...state, authBtnDisabled: true, authBtnLoading: true };
    case "FAILED_AUTH_NUMBER":
      return { ...state, authBtnDisabled: false, authBtnLoading: false };
    case "SUCCESS_AUTH_NUMBER":
      return {
        ...state,
        phoneBtnDisabled: true,
        authInputDisabled: true,
        authBtnDisabled: true,
        authBtnLoading: false,
        authSucceeded: true,
      };
    default:
      return state;
  }
};

export default function useAuthReducer() {
  const [state, dispatch] = useReducer(authReducer, initialState);

  return { state, dispatch };
}
