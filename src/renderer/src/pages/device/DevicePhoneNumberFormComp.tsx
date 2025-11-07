import { useFormContext } from "react-hook-form";
import { Button, Input, Label } from "@renderer/components";
import { ColorName } from "@renderer/constants";
import { DeviceSubmitted } from "@renderer/pages/device/DeviceStep1Comp";
import useDeviceFormatPhoneNumber from "@renderer/pages/device/useDeviceFormatPhoneNumber";
import { DeviceSchema, phoneNumberSchema } from "@renderer/schemas/device";

interface DevicePhoneNumberFormCompProps {
  isSubmitted: DeviceSubmitted;
  setIsSubmitted: (isSubmitted: DeviceSubmitted) => void;
  remainingTime: number;
  setInitTime: () => void;
}

function DevicePhoneNumberFormComp({
  isSubmitted,
  setIsSubmitted,
  remainingTime,
  setInitTime,
}: DevicePhoneNumberFormCompProps) {
  const form = useFormContext<DeviceSchema>();
  const { handleChangePhoneNumber } = useDeviceFormatPhoneNumber(form);

  const handleRequestPhoneAuthentication = () => {
    const validation = phoneNumberSchema.safeParse(form.watch("phoneNumber"));
    if (!validation.success) return;

    if (isSubmitted.phoneNumber) {
      setInitTime();
      setIsSubmitted({ ...isSubmitted, code: false });
      return;
    }

    // TODO: 폰번호 인증 요청 API 로직 추가

    setIsSubmitted({ ...isSubmitted, phoneNumber: true });
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
