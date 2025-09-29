import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Form, FormField, FormInput, FormLabel, FormMessage } from "@renderer/components";
import { step2Schema, TypeStep2Schema } from "@renderer/libs/schema/deviceSchema";
import cn from "@renderer/utils/cn";

export default function FlowPage2() {
  const form = useForm<TypeStep2Schema>({
    mode: "onSubmit",
    resolver: zodResolver(step2Schema),
    defaultValues: {
      selectedPurpose: "hall",
      deviceName: "",
    },
  });

  useEffect(() => {
    const date = new Date()
      .toISOString()
      .slice(0, 19)
      .replace(/[^0-9]/g, "")
      .slice(2);
    form.setValue(
      "deviceName",
      form.watch("selectedPurpose") === "hall" ? `HALL-${date}` : `POS-${date}`
    );
    // eslint-disable-next-line
  }, [form.watch("selectedPurpose")]);

  const handleSubmit = () => {};

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="flex flex-col gap-6">
        <div className="flex flex-row md:gap-2 lg:gap-3">
          <Button
            variant="outline"
            responsive
            responsiveButtons={{
              sm: { buttonSize: "sm", className: "" },
              md: {
                buttonSize: "custom",
                className: cn(
                  "w-full h-10 rounded-xl text-s font-medium focus:!text-s",
                  form.watch("selectedPurpose") === "hall"
                    ? "border-primary bg-primary/4 text-primary !text-s"
                    : "border-gray-600"
                ),
              },
              lg: { buttonSize: "custom", className: "w-full h-20" },
            }}
            onClick={() => form.setValue("selectedPurpose", "hall")}
          >
            홀 관리
          </Button>
          <Button
            variant="outline"
            responsive
            responsiveButtons={{
              sm: { buttonSize: "sm", className: "" },
              md: {
                buttonSize: "custom",
                className: cn(
                  "w-full h-10 rounded-xl text-s font-medium focus:!text-s",
                  form.watch("selectedPurpose") === "pos"
                    ? "border-primary bg-primary/4 text-primary !text-s"
                    : "border-gray-600"
                ),
              },
              lg: { buttonSize: "custom", className: "w-full h-20" },
            }}
            onClick={() => form.setValue("selectedPurpose", "pos")}
          >
            POS
          </Button>
        </div>
        <div className="flex flex-col gap-3">
          <FormField
            control={form.control}
            name="deviceName"
            render={({ field }) => (
              <div className="flex flex-col gap-1">
                <FormLabel>기기 이름</FormLabel>
                <FormInput {...field} placeholder="기기 이름을 입력하세요." />
                <FormMessage />
              </div>
            )}
          />
        </div>
        <Button
          type="submit"
          color="primary"
          responsive
          responsiveButtons={{
            sm: { buttonSize: "sm", className: "" },
            md: { buttonSize: "sm", className: "" },
            lg: { buttonSize: "lg", className: "mt-2" },
          }}
        >
          등록하기
        </Button>
      </form>
    </Form>
  );
}
