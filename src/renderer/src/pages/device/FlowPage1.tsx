import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  Dropdown,
  Form,
  FormField,
  FormInput,
  FormLabel,
  FormMessage,
} from "@renderer/components/index";
import useAuthReducer from "@renderer/hooks/useAuthReducer";
import { step1Schema, TypeStep1Schema } from "@renderer/libs/schema/deviceSchema";

interface IProps {
  onNextStep: () => void;
}

export default function FlowPage1({ onNextStep }: IProps) {
  const form = useForm<TypeStep1Schema>({
    mode: "onSubmit",
    resolver: zodResolver(step1Schema),
    defaultValues: {
      phone: "",
      authNumber: "",
      selectedStore: null,
    },
  });
  const { state, dispatch } = useAuthReducer();

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onNextStep)} className="flex flex-col md:gap-3 lg:gap-4">
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <div className="flex flex-col gap-2">
              <FormLabel>휴대폰 번호</FormLabel>
              <div className="flex gap-3">
                <FormInput
                  {...field}
                  placeholder="사장님 계정에 등록된 전화번호를 입력하세요"
                  disabled={state.phoneInputDisabled}
                  onChange={(e) => {
                    const numbers = e.target.value.replace(/[^\d]/g, "");

                    if (numbers.length <= 3) {
                      field.onChange(numbers);
                    } else if (numbers.length <= 7) {
                      field.onChange(numbers.replace(/(\d{3})(\d{1,4})/, "$1-$2"));
                    } else if (numbers.length <= 11) {
                      field.onChange(numbers.replace(/(\d{3})(\d{4})(\d{1,4})/, "$1-$2-$3"));
                    }
                  }}
                />
                <Button
                  responsive
                  type="button"
                  color="black"
                  responsiveButtons={{
                    sm: { buttonSize: "sm", className: "" },
                    md: {
                      buttonSize: "sm",
                      className: state.phoneRerequest ? "!px-[21px]" : "",
                    },
                    lg: { buttonSize: "lg", className: "" },
                  }}
                  disabled={state.phoneBtnLoading || state.phoneBtnDisabled}
                  onClick={() => {
                    dispatch({ type: "REQUEST_PHONE" });
                    if (form.watch("phone").length === 0) {
                      form.setError("phone", { message: "휴대폰 번호를 입력해주세요." });
                      dispatch({ type: "FAILED_PHONE" });
                    } else {
                      form.clearErrors("phone");
                      // TODO: 휴대폰 인증 요청
                    }
                  }}
                >
                  {state.phoneRerequest ? "재요청" : "인증요청"}
                </Button>
              </div>
              <FormMessage />
            </div>
          )}
        />
        <FormField
          control={form.control}
          name="authNumber"
          render={({ field }) => (
            <div className="flex flex-col gap-2">
              <div className="flex gap-3">
                <FormInput
                  {...field}
                  placeholder="인증번호를 입력해주세요."
                  readOnly={state.authInputDisabled}
                  disabled={state.authInputDisabled}
                  maxLength={6}
                />
                <Button
                  responsive
                  type="button"
                  color="black"
                  responsiveButtons={{
                    sm: { buttonSize: "sm", className: "" },
                    md: { buttonSize: "sm", className: "!px-[27px]" },
                    lg: { buttonSize: "lg", className: "" },
                  }}
                  disabled={state.authBtnDisabled || state.authBtnLoading}
                  onClick={() => {
                    dispatch({ type: "REQUEST_AUTH_NUMBER" });
                    if (form.watch("authNumber").length === 0) {
                      form.setError("authNumber", { message: "인증번호를 입력해주세요." });
                      dispatch({ type: "FAILED_AUTH_NUMBER" });
                    } else {
                      form.clearErrors("authNumber");
                      // TODO: 인증 번호 일치 확인
                    }
                  }}
                >
                  확인
                </Button>
              </div>
              <FormMessage />
            </div>
          )}
        />
        {state.authSucceeded && (
          <FormField
            control={form.control}
            name="selectedStore"
            render={({ field }) => (
              <div className="flex flex-col gap-1">
                <FormLabel>매장 선택</FormLabel>
                <Dropdown
                  data={[{ id: "1", name: "기기 종류 1" }]}
                  defaultText="기기 종류를 선택해주세요."
                  {...field}
                />
                <FormMessage />
              </div>
            )}
          />
        )}
        <Button
          type="submit"
          color="primary"
          responsive
          responsiveButtons={{
            sm: { buttonSize: "sm", className: "" },
            md: { buttonSize: "sm", className: "!mt-3" },
            lg: { buttonSize: "lg", className: "" },
          }}
          disabled={!state.authSucceeded}
        >
          다음
        </Button>
      </form>
    </Form>
  );
}
