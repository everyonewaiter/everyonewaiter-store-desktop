import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Dropdown, Input, Label } from "@renderer/components";
import { ColorName } from "@renderer/constants";
import DeviceNoStoreModalComp from "@renderer/pages/device/DeviceNoStoreModalComp";
import { mockStores } from "@renderer/pages/device/mock";
import useDeviceFormatPhoneNumber from "@renderer/pages/device/useDeviceFormatPhoneNumber";
import useDeviceRemainingTime from "@renderer/pages/device/useDeviceRemainingTime";
import { deviceFormSchema, DeviceSchema } from "@renderer/schemas/device";
import { SimpleStore } from "@renderer/types/domain";
import { overlay } from "overlay-kit";

interface DeviceStep1CompProps {
  onNextStep: (data: DeviceSchema) => void;
}

function DeviceStep1Comp({ onNextStep }: DeviceStep1CompProps) {
  const form = useForm<DeviceSchema>({
    resolver: zodResolver(deviceFormSchema),
    defaultValues: {
      phoneNumber: "",
      code: "",
      storeId: mockStores.length > 0 ? mockStores[0].storeId : "",
    },
  });

  const [isSubmitted, setIsSubmitted] = useState({
    phoneNumber: false,
    code: false,
    storeId: false,
  });

  const { handleChangePhoneNumber } = useDeviceFormatPhoneNumber(form);
  const { remainingTime, resetInterval, setInitTime } = useDeviceRemainingTime({
    isSubmitted: isSubmitted.phoneNumber,
  });

  const handleRequestPhoneAuthentication = () => {
    if (!form.watch("phoneNumber").length) return;

    if (isSubmitted.phoneNumber) {
      setInitTime();
      setIsSubmitted({ ...isSubmitted, code: false });
      return;
    }

    // TODO: 폰번호 인증 요청 API 로직 추가

    // TODO: 폰번호 인증 요청 후 존재하는 매장이 없다면 DeviceNoStoreModalComp 모달 노출
    const resultStores: SimpleStore[] = [];
    if (resultStores.length === 0) {
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
    }

    setIsSubmitted({ ...isSubmitted, phoneNumber: true });
  };

  const handleRequestCodeVerification = () => {
    if (!form.watch("code").length) return;

    // TODO: 인증 코드 요청 API 로직 추가

    setIsSubmitted({ ...isSubmitted, code: true });
    resetInterval();
  };

  const handleSubmit = (data: DeviceSchema) => {
    onNextStep(data);
  };

  return (
    <form onSubmit={form.handleSubmit(handleSubmit)} className="flex flex-col md:gap-5 lg:gap-8">
      <div className="flex flex-col md:gap-3 lg:gap-4">
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
              disabled={isSubmitted.code || (isSubmitted.phoneNumber && remainingTime > 271)}
            >
              {isSubmitted.phoneNumber ? "재인증" : "인증요청"}
            </Button>
          </div>
        </div>
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
        {isSubmitted.code && mockStores.length > 0 && (
          <div className="flex flex-col gap-1">
            <Label>매장 선택</Label>
            {mockStores.length > 1 ? (
              <Dropdown
                dropdownItems={mockStores.map((store) => ({ id: store.storeId, name: store.name }))}
                defaultText="매장을 선택해주세요."
                onChange={(item) => {
                  setIsSubmitted({ ...isSubmitted, storeId: !!item.id });
                  form.setValue("storeId", item.id);
                }}
              />
            ) : (
              <Input defaultValue={mockStores[0].name} disabled />
            )}
          </div>
        )}
      </div>
      <Button
        type="submit"
        color={ColorName.PRIMARY}
        responsive
        responsiveButtons={{
          sm: { buttonSize: "sm" },
          md: { buttonSize: "sm" },
          lg: { buttonSize: "lg" },
        }}
        disabled={!isSubmitted.storeId}
      >
        다음
      </Button>
    </form>
  );
}

export default DeviceStep1Comp;
