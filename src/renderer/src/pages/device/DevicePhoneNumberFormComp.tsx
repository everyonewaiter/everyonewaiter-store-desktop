import { Controller, useFormContext } from "react-hook-form";
import { sendAuthCode } from "@renderer/api/device";
import Button from "@renderer/components/Button/Button";
import Input from "@renderer/components/Input";
import Label from "@renderer/components/Label";
import { ColorName } from "@renderer/constants/ui";
import useDeviceAuthStore from "@renderer/hooks/useDeviceAuthStore";
import { DeviceSchema, phoneNumberSchema } from "@renderer/utils/deviceSchema";
import { formatPhoneNumber } from "@renderer/utils/format";
import { AxiosError } from "axios";
import { useShallow } from "zustand/react/shallow";

interface DevicePhoneNumberFormCompProps {
  remainingTime: number;
  setInitTime: () => void;
}

function DevicePhoneNumberFormComp({ remainingTime, setInitTime }: DevicePhoneNumberFormCompProps) {
  const form = useFormContext<DeviceSchema>();

  const { isSubmitted, setIsSubmitted } = useDeviceAuthStore(
    useShallow((state) => ({
      isSubmitted: state.isSubmitted,
      setIsSubmitted: state.setIsSubmitted,
    }))
  );

  const handleRequestPhoneAuthentication = async () => {
    const validation = phoneNumberSchema.safeParse(form.watch("phoneNumber"));
    if (!validation.success) return;

    if (isSubmitted.phoneNumber) {
      setInitTime();
      setIsSubmitted({ code: false });
    }

    try {
      await sendAuthCode(form.watch("phoneNumber").replaceAll("-", ""));
      setIsSubmitted({ ...isSubmitted, phoneNumber: true });
      if (!isSubmitted.phoneNumber) {
        setInitTime();
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        const status = error.response?.status;
        if (status === 400) {
          form.setError("phoneNumber", {
            message: "휴대폰 번호 인증 요청 횟수를 초과했습니다.",
          });
        } else if (status === 404) {
          form.setError("phoneNumber", {
            message: "등록된 휴대폰 번호가 아닙니다.",
          });
        } else {
          form.setError("phoneNumber", {
            message: "알 수 없는 오류가 발생했습니다.",
          });
        }
      }
    }
  };

  return (
    <div className="flex flex-col gap-1">
      <Label>휴대폰 번호</Label>
      <div className="flex md:gap-2 lg:gap-3">
        <Controller
          name="phoneNumber"
          control={form.control}
          rules={{
            onChange: (e) =>
              form.setValue("phoneNumber", formatPhoneNumber(e), { shouldValidate: false }),
          }}
          render={({ field, fieldState }) => (
            <Input
              placeholder="사장님 계정에 등록된 전화번호를 입력하세요"
              {...field}
              maxLength={14}
              disabled={isSubmitted.phoneNumber}
              fieldState={fieldState}
            />
          )}
        />
        <Button
          responsive
          type="button"
          color={ColorName.BLACK}
          responsiveButtons={{
            md: { buttonSize: "sm", className: "!min-w-[77px] !px-0" },
            lg: { buttonSize: "lg", className: "!min-w-[90px] !px-0" },
          }}
          onClick={handleRequestPhoneAuthentication}
          disabled={
            isSubmitted.code ||
            (isSubmitted.phoneNumber && remainingTime >= 270) ||
            !phoneNumberSchema.safeParse(form.watch("phoneNumber")).success
          }
        >
          {isSubmitted.phoneNumber ? "재인증" : "인증요청"}
        </Button>
      </div>
    </div>
  );
}

export default DevicePhoneNumberFormComp;
