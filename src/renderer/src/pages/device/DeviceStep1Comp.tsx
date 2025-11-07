import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Dropdown, Input, Label } from "@renderer/components";
import { ColorName } from "@renderer/constants";
import DeviceAuthNumberFormComp from "@renderer/pages/device/DeviceAuthNumberFormComp";
import DevicePhoneNumberFormComp from "@renderer/pages/device/DevicePhoneNumberFormComp";
import { mockStores } from "@renderer/pages/device/mock";
import useDeviceRemainingTime from "@renderer/pages/device/useDeviceRemainingTime";
import { deviceFormSchema, DeviceSchema } from "@renderer/schemas/device";

export type DeviceSubmitted = {
  phoneNumber: boolean;
  code: boolean;
  storeId: boolean;
};

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

  const [isSubmitted, setIsSubmitted] = useState<DeviceSubmitted>({
    phoneNumber: false,
    code: false,
    storeId: false,
  });

  const { remainingTime, resetInterval, setInitTime } = useDeviceRemainingTime({
    isSubmitted: isSubmitted.phoneNumber,
    resetForm: () => form.resetField("phoneNumber"),
  });

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onNextStep)} className="flex flex-col md:gap-5 lg:gap-8">
        <div className="flex flex-col md:gap-3 lg:gap-4">
          <DevicePhoneNumberFormComp
            isSubmitted={isSubmitted}
            setIsSubmitted={setIsSubmitted}
            remainingTime={remainingTime}
            setInitTime={setInitTime}
          />
          <DeviceAuthNumberFormComp
            isSubmitted={isSubmitted}
            setIsSubmitted={setIsSubmitted}
            remainingTime={remainingTime}
            resetInterval={resetInterval}
          />
          {isSubmitted.code && mockStores.length > 0 && (
            <div className="flex flex-col gap-1">
              <Label>매장 선택</Label>
              {mockStores.length > 1 ? (
                <Dropdown
                  dropdownItems={mockStores.map((store) => ({
                    id: store.storeId,
                    name: store.name,
                  }))}
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
    </FormProvider>
  );
}

export default DeviceStep1Comp;
