import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Dropdown, Input, Label } from "@renderer/components";
import { ColorName } from "@renderer/constants";
import DeviceAuthNumberFormComp from "@renderer/pages/device/DeviceAuthNumberFormComp";
import DevicePhoneNumberFormComp from "@renderer/pages/device/DevicePhoneNumberFormComp";
import { mockStores } from "@renderer/pages/device/mock";
import useDeviceAuthStore from "@renderer/pages/device/useDeviceAuthStore";
import useDeviceRemainingTime from "@renderer/pages/device/useDeviceRemainingTime";
import useDeviceStore from "@renderer/pages/device/useDeviceStore";
import { deviceFormSchema, DeviceSchema } from "@renderer/schemas/device";
import { useShallow } from "zustand/react/shallow";

function DeviceStep1Comp() {
  const form = useForm<DeviceSchema>({
    resolver: zodResolver(deviceFormSchema),
    defaultValues: {
      phoneNumber: "",
      code: "",
      storeId: mockStores.length > 0 ? mockStores[0].storeId : "",
    },
  });

  const { isSubmitted, setIsSubmitted, resetSubmitted } = useDeviceAuthStore(
    useShallow((state) => ({
      isSubmitted: state.isSubmitted,
      setIsSubmitted: state.setIsSubmitted,
      resetSubmitted: state.resetSubmitted,
    }))
  );

  const { setDeviceData, nextStep } = useDeviceStore(
    useShallow((state) => ({
      setDeviceData: state.setDeviceData,
      nextStep: state.nextStep,
    }))
  );

  const { remainingTime, resetInterval, setInitTime } = useDeviceRemainingTime({
    isSubmitted: isSubmitted.phoneNumber,
    resetForm: () => {
      const currentIsSubmitted = useDeviceAuthStore.getState().isSubmitted;
      if (!currentIsSubmitted.code) {
        form.reset();
        resetSubmitted();
      } else {
        form.resetField("phoneNumber");
        useDeviceAuthStore.getState().setIsSubmitted({ phoneNumber: false });
      }
    },
  });

  const handleSubmit = (data: DeviceSchema) => {
    setDeviceData(data);
    nextStep();
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="flex flex-col md:gap-5 lg:gap-8">
        <div className="flex flex-col md:gap-3 lg:gap-4">
          <DevicePhoneNumberFormComp remainingTime={remainingTime} setInitTime={setInitTime} />
          <DeviceAuthNumberFormComp remainingTime={remainingTime} resetInterval={resetInterval} />
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
                    setIsSubmitted({ storeId: !!item.id });
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
