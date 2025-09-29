import { Button, Dropdown, Input, Label } from "@renderer/components";

interface IProps {
  onNextStep: () => void;
}

function FlowPage1({ onNextStep }: IProps) {
  return (
    <form onSubmit={onNextStep} className="flex flex-col md:gap-3 lg:gap-4">
      <div className="flex flex-col gap-2">
        <Label>휴대폰 번호</Label>
        <div className="flex gap-3">
          <Input placeholder="사장님 계정에 등록된 전화번호를 입력하세요" />
          <Button
            responsive
            type="button"
            color="black"
            responsiveButtons={{
              sm: { buttonSize: "sm", className: "" },
              md: { buttonSize: "sm" },
              lg: { buttonSize: "lg", className: "!min-w-[90px] !px-0" },
            }}
          >
            인증요청
          </Button>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex gap-3">
          <Input placeholder="인증번호를 입력해주세요." maxLength={6} />
          <Button
            responsive
            type="button"
            color="black"
            responsiveButtons={{
              sm: { buttonSize: "sm", className: "" },
              md: { buttonSize: "sm", className: "" },
              lg: { buttonSize: "lg", className: "!min-w-[90px] !px-0" },
            }}
          >
            확인
          </Button>
        </div>
      </div>
      <div className="flex flex-col gap-1">
        <Label>매장 선택</Label>
        <Dropdown data={[]} defaultText="기기 종류를 선택해주세요." />
      </div>
      <Button
        type="submit"
        color="primary"
        responsive
        responsiveButtons={{
          sm: { buttonSize: "sm", className: "" },
          md: { buttonSize: "sm", className: "!mt-3" },
          lg: { buttonSize: "lg", className: "!mt-4" },
        }}
      >
        다음
      </Button>
    </form>
  );
}

export default FlowPage1;
