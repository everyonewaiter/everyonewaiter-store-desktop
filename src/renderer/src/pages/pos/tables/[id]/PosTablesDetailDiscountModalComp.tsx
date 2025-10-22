import { Label } from "@radix-ui/react-label";
import { MinusIcon } from "@renderer/assets/icons";
import { Input } from "@renderer/components";
import { Dialog } from "@renderer/components/Dialog";
import { RadioGroup, RadioGroupFlex, RadioGroupItem } from "@renderer/components/Radio";
import { ModalProps } from "@renderer/types/overlay";

interface PosTablesDetailDiscountModalCompProps extends ModalProps {}

export default function PosTablesDetailDiscountModalComp({
  ...props
}: PosTablesDetailDiscountModalCompProps) {
  return (
    <Dialog open={props.isOpen} onOpenChange={props.close}>
      <Dialog.Wrapper>
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-10">
            <div className="flex items-center justify-between">
              <h2 className="text-gray-0 text-2xl font-semibold">6번 테이블의 총 주문 금액</h2>
              <span className="text-primary text-2xl font-semibold">
                {(152000).toLocaleString()}원
              </span>
            </div>
            <div className="flex flex-col gap-6">
              <RadioGroup defaultValue="fixed" className="flex items-center gap-6">
                <RadioGroupFlex>
                  <RadioGroupItem value="fixed"></RadioGroupItem>
                  <span className="text-gray-0 text-lg font-medium">지정 가격 할인</span>
                </RadioGroupFlex>
                <RadioGroupFlex>
                  <RadioGroupItem value="percent"></RadioGroupItem>
                  <span className="text-gray-0 text-lg font-medium">퍼센트 할인</span>
                </RadioGroupFlex>
              </RadioGroup>
              <div className="flex flex-col gap-1">
                <Label>할인할 금액 입력</Label>
                <div className="flex w-full items-center gap-3">
                  <Input
                    placeholder="12,000"
                    className="flex-1"
                    prefix={<MinusIcon width={20} height={20} />}
                  />
                  <span className="text-gray-0 text-xl font-semibold">원</span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center gap-1">
            <span className="text-gray-0 text-lg font-normal">
              할인된 금액은{" "}
              <strong className="text-primary text-2xl font-semibold">
                {(124000).toLocaleString()}원
              </strong>{" "}
              입니다.
            </span>
            <span>적용하시겠습니까?</span>
          </div>
        </div>
        <Dialog.Footer buttonSize="xl" primaryButton={{ text: "할인하기" }} />
      </Dialog.Wrapper>
    </Dialog>
  );
}
