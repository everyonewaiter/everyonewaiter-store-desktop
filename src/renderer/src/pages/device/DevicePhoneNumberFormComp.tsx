import { useFormContext } from "react-hook-form";
import { Button, Input, Label } from "@renderer/components";
import { ColorName } from "@renderer/constants";
import useDeviceAuthStore from "@renderer/pages/device/useDeviceAuthStore";
import useDeviceFormatPhoneNumber from "@renderer/pages/device/useDeviceFormatPhoneNumber";
import { DeviceSchema, phoneNumberSchema } from "@renderer/schemas/device";
import { useShallow } from "zustand/react/shallow";

interface DevicePhoneNumberFormCompProps {
  remainingTime: number;
  setInitTime: () => void;
}

function DevicePhoneNumberFormComp({ remainingTime, setInitTime }: DevicePhoneNumberFormCompProps) {
  const form = useFormContext<DeviceSchema>();
  const { handleChangePhoneNumber } = useDeviceFormatPhoneNumber(form);

  const { isSubmitted, setIsSubmitted } = useDeviceAuthStore(
    useShallow((state) => ({
      isSubmitted: state.isSubmitted,
      setIsSubmitted: state.setIsSubmitted,
    }))
  );

  const handleRequestPhoneAuthentication = () => {
    const validation = phoneNumberSchema.safeParse(form.watch("phoneNumber"));
    if (!validation.success) return;

    if (isSubmitted.phoneNumber) {
      setInitTime();
      setIsSubmitted({ code: false });
      return;
    }

    // TODO: 폰번호 인증 요청 API 로직 추가

    setIsSubmitted({ phoneNumber: true });
  };

  return (
    <div className="flex flex-col gap-1">
      <Label>휴대폰 번호</Label>
      <div className="flex md:gap-2 lg:gap-3">
        <Input
          placeholder="사장님 계정에 등록된 전화번호를 입력하세요"
          {...form.register("phoneNumber", {
            onChange: handleChangePhoneNumber,
          })}
          maxLength={14}
          disabled={isSubmitted.phoneNumber}
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
