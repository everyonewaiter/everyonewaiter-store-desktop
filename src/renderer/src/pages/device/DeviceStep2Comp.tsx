import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input, Label } from "@renderer/components";
import { ColorName, DeviceSupport } from "@renderer/constants";
import { DeviceInfoSchema, deviceInfoSchema } from "@renderer/schemas/device";
import cn from "@renderer/utils/cn";
import dayjs from "dayjs";

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
    form.setValue("deviceName", `${form.watch("deviceType")}-${today}`);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form.watch("deviceType")]);

  const handleSubmit = (/*data: DeviceInfoSchema */) => {
    // TODO: 기기 등록 API 로직 추가
    navigate(`/${form.watch("deviceType").toLowerCase()}`);
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
