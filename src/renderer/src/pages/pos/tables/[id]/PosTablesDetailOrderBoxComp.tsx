import { MenuViewMenuOptionGroupDetail } from "@renderer/api/device/data-contracts";
import { PlusIcon } from "@renderer/assets/icons";
import { Checkbox } from "@renderer/components";
import { RadioGroup, RadioGroupFlex, RadioGroupItem } from "@renderer/components/Radio";

interface PosTablesDetailOrderBoxCompProps {
  options: MenuViewMenuOptionGroupDetail[];
  type: "required" | "optional";
}

export default function PosTablesDetailOrderBoxComp({
  options,
  type,
}: PosTablesDetailOrderBoxCompProps) {
  return (
    <div className="flex flex-col gap-3">
      <h4 className="text-gray-0 text-[15px] font-semibold">
        {type === "required" ? "필수" : "선택"} 옵션{" "}
        {type === "required" && <span className="text-primary">*</span>}
      </h4>
      <div className="flex flex-col gap-3">
        {options.map((optionGroup) => (
          <div
            key={optionGroup.menuOptionGroupId}
            className="flex flex-col gap-3 rounded-xl bg-gray-700 p-3"
          >
            <span className="text-gray-0 text-sm font-medium">{optionGroup.name}</span>
            {type === "required" ? (
              <RadioGroup
                defaultValue={type === "required" ? optionGroup.menuOptions?.[0]?.name : undefined}
              >
                {optionGroup.menuOptions?.map((option) => (
                  <RadioGroupFlex key={option.name} className="justify-between">
                    <div className="flex items-center gap-2">
                      <RadioGroupItem value={option.name ?? ""} />
                      <span className="text-s font-normal text-gray-100">{option.name}</span>
                    </div>
                    <div className="flex items-center gap-0.5">
                      <PlusIcon className="text-gray-0 h-5 w-5" />
                      <span className="text-s font-normal text-gray-100">
                        {option.price?.toLocaleString()}원
                      </span>
                    </div>
                  </RadioGroupFlex>
                ))}
              </RadioGroup>
            ) : (
              <div className="flex items-center gap-2">
                {optionGroup.menuOptions?.map((option) => (
                  <div key={option.name} className="flex w-full items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Checkbox />
                      <span className="text-s font-normal text-gray-100">{option.name}</span>
                    </div>
                    <div className="flex items-center gap-0.5">
                      <PlusIcon className="text-gray-0 h-5 w-5" />
                      <span className="text-s font-normal text-gray-100">
                        {option.price?.toLocaleString()}원
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
