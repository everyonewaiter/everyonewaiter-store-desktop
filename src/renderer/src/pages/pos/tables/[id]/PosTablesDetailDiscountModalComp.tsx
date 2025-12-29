import { useEffect, useRef } from "react";
import { useForm, useWatch } from "react-hook-form";
import { Label } from "@radix-ui/react-label";
import { MinusIcon } from "@renderer/assets/icons";
import { Dialog } from "@renderer/components/Dialog";
import Input from "@renderer/components/Input";
import { RadioGroup, RadioGroupFlex, RadioGroupItem } from "@renderer/components/Radio";
import { useDiscountOrder } from "@renderer/hooks/usePosTablesDetailApi";
import { ModalProps } from "@renderer/types/overlay";
import { getFormattedTableNo } from "@renderer/utils/format";
import { handleApiError } from "@renderer/utils/handle-api-error";

interface PosTablesDetailDiscountModalCompProps extends ModalProps {
  tableNo: number;
  totalOrderPrice: number;
  initialDiscount: number;
}

function PosTablesDetailDiscountModalComp({
  tableNo,
  totalOrderPrice,
  initialDiscount,
  ...props
}: PosTablesDetailDiscountModalCompProps) {
  const form = useForm({
    defaultValues: {
      discountType: "fixed",
      discountValue: initialDiscount ? String(initialDiscount) : "",
    },
  });

  const discountType = useWatch({
    control: form.control,
    name: "discountType",
  });

  const discountValue = useWatch({
    control: form.control,
    name: "discountValue",
  });

  const prevDiscountTypeRef = useRef(discountType);

  const { mutate: discountOrder } = useDiscountOrder();

  useEffect(() => {
    if (prevDiscountTypeRef.current === discountType) return;

    if (discountType === "fixed") {
      form.setValue("discountValue", initialDiscount ? String(initialDiscount) : "");
    } else {
      form.setValue("discountValue", "");
    }

    prevDiscountTypeRef.current = discountType;
  }, [discountType, initialDiscount, form]);

  const handleDiscount = () => {
    const discountPrice =
      discountType === "fixed" ? discountValue : (totalOrderPrice * Number(discountValue)) / 100;

    discountOrder(
      { tableNo, discountPrice: Number(discountPrice) },
      {
        onSuccess: () => props.close(),
        onError: (error) => handleApiError(error),
      }
    );
  };

  return (
    <Dialog open={props.isOpen} onOpenChange={props.close}>
      <Dialog.Wrapper>
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-10">
            <div className="flex items-center justify-between">
              <h2 className="text-gray-0 text-2xl font-semibold">
                {getFormattedTableNo(tableNo)}의 총 주문 금액
              </h2>
              <span className="text-primary text-2xl font-semibold">
                {totalOrderPrice.toLocaleString()}원
              </span>
            </div>

            <div className="flex flex-col gap-6">
              <RadioGroup value={discountType} className="flex items-center gap-6">
                <RadioGroupFlex onClick={() => form.setValue("discountType", "fixed")}>
                  <RadioGroupItem value="fixed" />
                  <span className="text-gray-0 text-lg font-medium">지정 가격 할인</span>
                </RadioGroupFlex>

                <RadioGroupFlex onClick={() => form.setValue("discountType", "percent")}>
                  <RadioGroupItem value="percent" />
                  <span className="text-gray-0 text-lg font-medium">퍼센트 할인</span>
                </RadioGroupFlex>
              </RadioGroup>

              <div className="flex flex-col gap-1">
                <Label>할인할 금액 입력</Label>
                <div className="flex w-full items-center gap-3">
                  <Input
                    placeholder="0"
                    prefix={<MinusIcon width={20} height={20} />}
                    value={discountValue ? Number(discountValue).toLocaleString() : ""}
                    onChange={(e) => {
                      const numericValue = Number(e.target.value.replace(/,/g, "")) || 0;

                      const max = discountType === "fixed" ? totalOrderPrice : 100;

                      if (numericValue > max) return;

                      form.setValue("discountValue", numericValue ? String(numericValue) : "");
                    }}
                    autoFocus
                  />
                  <span className="text-gray-0 text-xl font-semibold">
                    {discountType === "fixed" ? "원" : "%"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center justify-center gap-1">
            <span className="text-gray-0 text-lg font-normal">
              할인된 금액은{" "}
              <strong className="text-primary text-2xl font-semibold">
                {(
                  totalOrderPrice -
                  (discountType === "fixed"
                    ? Number(discountValue)
                    : (totalOrderPrice * Number(discountValue)) / 100)
                ).toLocaleString()}
                원
              </strong>{" "}
              입니다.
            </span>
            <span>적용하시겠습니까?</span>
          </div>
        </div>

        <Dialog.Footer
          buttonSize="xl"
          primaryButton={{ text: "할인하기", onClick: handleDiscount }}
        />
      </Dialog.Wrapper>
    </Dialog>
  );
}

export default PosTablesDetailDiscountModalComp;
