import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { addDevice } from "@renderer/api/device";
import { Button, Input, Label } from "@renderer/components";
import { ColorName, DeviceSupport } from "@renderer/constants";
import useDeviceStore from "@renderer/pages/device/useDeviceStore";
import { DeviceInfoSchema, deviceInfoSchema } from "@renderer/schemas/device";
import { DevicePurpose, OrderPayment } from "@renderer/types/domain";
import cn from "@renderer/utils/cn";
import { storageKey } from "@shared/storage/key";
import { AxiosError } from "axios";
import dayjs from "dayjs";

const ERROR_MESSAGES = {
  ALREADY_USE_DEVICE_NAME: "이미 사용 중인 기기 이름입니다. 다른 이름을 입력해 주세요.",
  EXPIRED_VERIFICATION_PHONE_NUMBER:
    "휴대폰 번호 인증 시간이 만료되었습니다. 다시 인증을 진행해 주세요.",
  DEFAULT: "알 수 없는 오류가 발생했습니다. 다시 시도해 주세요.",
} as const;

function DeviceStep2Comp() {
  const navigate = useNavigate();

  const form = useForm<DeviceInfoSchema>({
    resolver: zodResolver(deviceInfoSchema),
    defaultValues: {
      deviceType: "HALL",
      deviceName: "",
    },
  });

  useEffect(() => {
    const today = dayjs().format("YYMMDDhhmmss");
    form.setValue("deviceName", `${form.watch("deviceType") === "HALL" ? "홀" : "POS"}-${today}`);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form.watch("deviceType")]);

  const handleSubmit = async (data: DeviceInfoSchema) => {
    try {
      const deviceData = useDeviceStore.getState().deviceData;

      const body = {
        phoneNumber: deviceData?.phoneNumber.replaceAll("-", "") as string,
        name: data.deviceName,
        purpose: data.deviceType as DevicePurpose,
        tableNo: 1,
        paymentType: "POSTPAID" as unknown as OrderPayment,
      };

      const response = await addDevice(deviceData?.storeId as string, body);

      if (response.status === 201) {
        const { deviceId, secretKey } = response.data;

        try {
          await Promise.all([
            window.storageAPI.store(storageKey.DEVICE_ID, deviceId),
            window.storageAPI.store(storageKey.STORE_ID, deviceData?.storeId as string),
            window.storageAPI.store(storageKey.DEVICE_SECRET_KEY, secretKey),
            window.storageAPI.store(storageKey.DEVICE_TYPE, data.deviceType),
          ]);

          navigate(`/${data.deviceType.toLowerCase()}`);
        } catch (storageError) {
          const errorMessage =
            storageError instanceof Error && storageError.message.includes("storageAPI")
              ? "앱을 다시 시작한 후 시도해 주세요."
              : "기기 정보 저장 중 오류가 발생했습니다. 다시 시도해 주세요.";

          form.setError("deviceName", { message: errorMessage });
        }
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        const code = error.response?.data?.code;
        const errorMessage =
          ERROR_MESSAGES[code as keyof typeof ERROR_MESSAGES] || ERROR_MESSAGES.DEFAULT;
        form.setError("deviceName", { message: errorMessage });
      }
    }
  };

  return (
    <form onSubmit={form.handleSubmit(handleSubmit)} className="flex flex-col gap-6">
      <div className="flex flex-row md:gap-2 lg:gap-3">
        {Object.entries(DeviceSupport).map(([key, item]) => (
          <Button
            key={key}
            variant="outline"
            color={ColorName.GREY}
            responsive
            responsiveButtons={{
              md: {
                buttonSize: "custom",
                className: cn(
                  "w-full h-10 rounded-xl border-gray-600 text-s font-medium",
                  form.watch("deviceType") === key && "bg-primary/4 border-primary text-primary"
                ),
              },
              lg: {
                buttonSize: "custom",
                className: cn(
                  "w-full h-20 rounded-2xl border-gray-600 text-base font-medium",
                  form.watch("deviceType") === key && "bg-primary/4 border-primary text-primary"
                ),
              },
            }}
            onClick={() => form.setValue("deviceType", key)}
          >
            {item}
          </Button>
        ))}
      </div>
      <div className="flex flex-col md:gap-6 lg:gap-8">
        <div className="flex flex-col gap-1">
          <Label>기기 이름</Label>
          <Input placeholder="기기 이름을 입력하세요." {...form.register("deviceName")} />
        </div>
        <Button
          type="submit"
          color={ColorName.PRIMARY}
          responsive
          responsiveButtons={{
            md: { buttonSize: "sm" },
            lg: { buttonSize: "lg" },
          }}
        >
          등록하기
        </Button>
      </div>
    </form>
  );
}

export default DeviceStep2Comp;
