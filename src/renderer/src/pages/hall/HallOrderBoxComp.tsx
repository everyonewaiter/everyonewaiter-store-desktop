import { PlusIcon } from "@renderer/assets/icons";
import { Button } from "@renderer/components";
import cn from "@renderer/utils/cn";

interface HallOrderBoxCompProps {
  isServed?: boolean;
  isCompleted?: boolean;
}

function HallOrderBoxComp({ isServed = false, isCompleted = false }: HallOrderBoxCompProps) {
  return (
    <div
      className={cn(
        "flex flex-col justify-center gap-6 rounded-xl border border-gray-600 p-6",
        isServed ? "bg-[#F1F1F1]" : ""
      )}
    >
      <div className="flex flex-col gap-6">
        {!isCompleted && (
          <div className="relative h-[130px] w-[130px] overflow-hidden rounded-xl">
            <div className="absolute inset-0 bg-[#F1F1F1] opacity-50" />
            {/* TODO: 테스트용 이미지 교체 필요 */}
            <img
              src="https://img.danawa.com/prod_img/500000/081/850/img/13850081_1.jpg?shrink=330:*&_v=20220315174531"
              alt="메뉴 이미지"
            />
          </div>
        )}
        <div className="flex w-full flex-col gap-2">
          <div className="flex w-full items-center justify-between">
            <span
              className={cn(
                "text-2xl font-semibold",
                isServed ? "text-gray-300 line-through" : "text-gray-100"
              )}
            >
              스노우치즈폭립
            </span>
            <span
              className={cn("text-xl font-semibold", isServed ? "text-gray-300" : "text-gray-100")}
            >
              1개
            </span>
          </div>
          <div className="flex flex-col gap-1">
            <div
              className={cn(
                "flex items-center justify-between",
                isServed ? "text-gray-300" : "text-[#2E7BB3]"
              )}
            >
              <div className="flex items-center">
                <PlusIcon className="size-6" />
                매운맛
              </div>
              1개
            </div>
          </div>
        </div>
      </div>
      {!isCompleted && (
        <Button
          color="black"
          variant="outline"
          className={cn(
            "button-lg w-full !text-lg !font-medium",
            isServed
              ? "border-gray-300 text-gray-300 hover:!bg-transparent hover:!text-gray-300"
              : ""
          )}
        >
          {isServed ? "되돌리기" : "완료"}
        </Button>
      )}
    </div>
  );
}

export default HallOrderBoxComp;
