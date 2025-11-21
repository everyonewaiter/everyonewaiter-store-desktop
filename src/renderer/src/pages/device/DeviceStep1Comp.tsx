import { useEffect, useState } from "react";
import { FormProvider, useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Dropdown, Input, Label } from "@renderer/components";
import { ColorName } from "@renderer/constants";
import DeviceAuthNumberFormComp from "@renderer/pages/device/DeviceAuthNumberFormComp";
import DevicePhoneNumberFormComp from "@renderer/pages/device/DevicePhoneNumberFormComp";
import useDeviceAuthStore from "@renderer/pages/device/useDeviceAuthStore";
import useDeviceRemainingTime from "@renderer/pages/device/useDeviceRemainingTime";
import useDeviceStore from "@renderer/pages/device/useDeviceStore";
import { deviceFormSchema, DeviceSchema } from "@renderer/schemas/device";
import { SimpleStore } from "@renderer/types/domain";
import { useShallow } from "zustand/react/shallow";

function DeviceStep1Comp() {
  const form = useForm<DeviceSchema>({
    resolver: zodResolver(deviceFormSchema),
    defaultValues: {
      phoneNumber: "",
      code: "",
      storeId: "",
    },
  });

  const { isSubmitted, resetSubmitted, setIsSubmitted } = useDeviceAuthStore(
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

  const storeId = useWatch({ control: form.control, name: "storeId" });

  useEffect(() => {
    setIsSubmitted({ storeId: !!storeId });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [storeId]);

  const { remainingTime, resetInterval, setInitTime } = useDeviceRemainingTime({
    isSubmitted: isSubmitted.phoneNumber,
    resetForm: () => {
      const currentIsSubmitted = useDeviceAuthStore.getState().isSubmitted;
      if (currentIsSubmitted.code) {
        form.resetField("phoneNumber");
        useDeviceAuthStore.getState().setIsSubmitted({ phoneNumber: false });
      } else {
        form.reset();
        resetSubmitted();
      }
    },
  });

  const handleSubmit = (data: DeviceSchema) => {
    setDeviceData(data);
    nextStep();
  };

  const [stores, setStores] = useState<SimpleStore[]>([]);

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="flex flex-col md:gap-5 lg:gap-8">
        <div className="flex flex-col md:gap-3 lg:gap-4">
          <DevicePhoneNumberFormComp
            remainingTime={remainingTime}
            setInitTime={setInitTime}
            resetInterval={resetInterval}
          />
          <DeviceAuthNumberFormComp
            remainingTime={remainingTime}
            resetInterval={resetInterval}
            setStores={setStores}
          />
          {isSubmitted.code && stores.length > 0 && (
            <div className="flex flex-col gap-1">
              <Label>매장 선택</Label>
              {stores.length > 1 ? (
                <Dropdown
                  dropdownItems={stores.map((store) => ({
                    id: store.storeId,
                    name: store.name,
                  }))}
                  defaultText="매장을 선택해주세요."
                  onChange={(item) => form.setValue("storeId", item.id, { shouldValidate: false })}
                />
              ) : (
                <Input defaultValue={stores[0].name} disabled />
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
