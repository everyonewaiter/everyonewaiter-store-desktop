import { useFormContext } from "react-hook-form";
import { Button, Input } from "@renderer/components";
import { ColorName } from "@renderer/constants";
import DeviceNoStoreModalComp from "@renderer/pages/device/DeviceNoStoreModalComp";
import { DeviceSubmitted } from "@renderer/pages/device/DeviceStep1Comp";
import { codeSchema, DeviceSchema } from "@renderer/schemas/device";
import { SimpleStore } from "@renderer/types/domain";
import { overlay } from "overlay-kit";

interface DeviceAuthNumberFormCompProps {
  isSubmitted: DeviceSubmitted;
  setIsSubmitted: (isSubmitted: DeviceSubmitted) => void;
  remainingTime: number;
  resetInterval: () => void;
}

function DeviceAuthNumberFormComp({
  isSubmitted,
  setIsSubmitted,
  remainingTime,
  resetInterval,
}: DeviceAuthNumberFormCompProps) {
  const form = useFormContext<DeviceSchema>();

  const handleRequestCodeVerification = () => {
    const validation = codeSchema.safeParse(form.watch("code"));
    if (!validation.success) return;

    // TODO: 인증 코드 요청 API 로직 추가

    // TODO: 폰번호 인증 요청 후 존재하는 매장이 없다면 DeviceNoStoreModalComp 모달 노출
    const resultStores: SimpleStore[] = [];
    if (resultStores.length === 0) {
      resetInterval();
      overlay.open((overlayProps) => (
        <DeviceNoStoreModalComp
          {...overlayProps}
          resetForm={() => {
            form.reset();
            setIsSubmitted({
              phoneNumber: false,
              code: false,
              storeId: false,
            });
          }}
        />
      ));
      return;
    }

    setIsSubmitted({ ...isSubmitted, code: true });
    resetInterval();
  };

  return (
    <div className="flex md:gap-2 lg:gap-3">
      <div className="group relative w-full md:h-9 lg:h-12">
        <Input
          placeholder="인증번호를 입력해주세요."
          className="!pr-14"
          {...form.register("code", {
            onChange: (e) =>
              form.setValue("code", e.target.value.replace(/[^0-9]/g, ""), {
                shouldValidate: false,
              }),
          })}
          maxLength={6}
          disabled={!isSubmitted.phoneNumber || isSubmitted.code}
        />
        {isSubmitted.phoneNumber && !isSubmitted.code && remainingTime > 0 && (
          <span className="md:text-s absolute top-1/2 right-3 -translate-y-1/2 font-normal text-gray-200 disabled:hidden lg:text-[15px]">
            {`${String(Math.floor(remainingTime / 60)).padStart(2, "0")}:${String(remainingTime % 60).padStart(2, "0")}`}
          </span>
        )}
      </div>
      <Button
        responsive
        type="button"
        color={ColorName.BLACK}
        responsiveButtons={{
          md: { buttonSize: "sm", className: "!min-w-[77px] !px-0" },
          lg: { buttonSize: "lg", className: "!min-w-[90px] !px-0" },
        }}
        disabled={
          !isSubmitted.phoneNumber ||
          isSubmitted.code ||
          (isSubmitted.phoneNumber && remainingTime === 0)
        }
        onClick={handleRequestCodeVerification}
      >
        확인
      </Button>
    </div>
  );
}

export default DeviceAuthNumberFormComp;
