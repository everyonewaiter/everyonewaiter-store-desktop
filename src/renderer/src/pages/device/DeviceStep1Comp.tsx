import { Button, Dropdown, Input, Label } from "@renderer/components";
import { ColorName } from "@renderer/constants";

interface DeviceStep1CompProps {
  onNextStep: () => void;
}

function DeviceStep1Comp({ onNextStep }: DeviceStep1CompProps) {
  return (
    <form onSubmit={onNextStep} className="flex flex-col md:gap-5 lg:gap-8">
      <div className="flex flex-col md:gap-3 lg:gap-4">
        <div className="flex flex-col gap-1">
          <Label>휴대폰 번호</Label>
          <div className="flex md:gap-2 lg:gap-3">
            <Input placeholder="사장님 계정에 등록된 전화번호를 입력하세요" />
            <Button
              responsive
              type="button"
              color={ColorName.BLACK}
              responsiveButtons={{
                md: { buttonSize: "sm", className: "!min-w-[77px] !px-0" },
                lg: { buttonSize: "lg", className: "!min-w-[90px] !px-0" },
              }}
            >
              인증요청
            </Button>
          </div>
        </div>
        <div className="flex md:gap-2 lg:gap-3">
          <div className="group relative w-full md:h-9 lg:h-12">
            <Input placeholder="인증번호를 입력해주세요." className="!pr-14" />
            <span className="md:text-s absolute top-1/2 right-3 -translate-y-1/2 font-normal text-gray-200 disabled:hidden lg:text-[15px]">
              01:00
            </span>
          </div>
          <Button
            responsive
            type="button"
            color={ColorName.BLACK}
            responsiveButtons={{
              md: { buttonSize: "sm", className: "!min-w-[77px] !px-0" },
              lg: { buttonSize: "lg", className: "!min-w-[90px] !px-0" },
            }}
          >
            확인
          </Button>
        </div>
        <div className="flex flex-col gap-1">
          <Label>매장 선택</Label>
          <Dropdown
            dropdownItems={[
              { id: "1", name: "매장 1" },
              { id: "2", name: "매장 2" },
            ]}
            defaultText="매장을 선택해주세요."
          />
        </div>
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
      >
        다음
      </Button>
    </form>
  );
}

export default DeviceStep1Comp;
