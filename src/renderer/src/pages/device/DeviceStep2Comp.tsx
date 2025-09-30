import { Button, Input, Label } from "@renderer/components";

function DeviceStep2Comp() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-row md:gap-2 lg:gap-3">
        {["홀 관리", "POS"].map((item) => (
          <Button
            key={item}
            variant="outline"
            color="grey"
            responsive
            responsiveButtons={{
              md: {
                buttonSize: "custom",
                className:
                  "w-full h-10 rounded-xl border-gray-600 text-s font-medium focus:bg-primary/4 focus:border-primary focus:text-primary",
              },
              lg: {
                buttonSize: "custom",
                className:
                  "w-full h-20 rounded-2xl border-gray-600 text-base font-medium focus:bg-primary/4 focus:border-primary focus:text-primary",
              },
            }}
          >
            {item}
          </Button>
        ))}
      </div>
      <div className="flex flex-col md:gap-6 lg:gap-8">
        <div className="flex flex-col gap-1">
          <Label>기기 이름</Label>
          <Input placeholder="기기 이름을 입력하세요." />
        </div>
        <Button
          type="button"
          color="primary"
          responsive
          responsiveButtons={{
            md: { buttonSize: "sm", className: "" },
            lg: { buttonSize: "lg", className: "" },
          }}
        >
          등록하기
        </Button>
      </div>
    </div>
  );
}

export default DeviceStep2Comp;
