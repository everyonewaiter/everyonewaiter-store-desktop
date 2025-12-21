import { PlusIcon } from "@renderer/assets/icons";
import { RadioGroup, RadioGroupFlex, RadioGroupItem } from "@renderer/components/Radio";
import { SelectedRequiredOption } from "@renderer/pages/pos/tables/[id]/PosTablesDetailMenuModalComp";
import { MenuOptionGroup } from "@renderer/types/domain";

interface PosTablesDetailRequiredOptionCompProps {
  options: MenuOptionGroup[];
  selectedOptions: SelectedRequiredOption;
  setSelectedOptions: (options: SelectedRequiredOption) => void;
}

export default function PosTablesDetailRequiredOptionComp({
  options,
  selectedOptions,
  setSelectedOptions,
}: PosTablesDetailRequiredOptionCompProps) {
  const handleSelectedRadio = (value: string, optionGroup: MenuOptionGroup) => {
    const selectedOption = optionGroup.menuOptions.find((opt) => opt.name === value);
    if (selectedOption) {
      setSelectedOptions({ ...selectedOptions, [optionGroup.menuOptionGroupId]: selectedOption });
    }
  };

  return (
    <div className="flex flex-col gap-3">
      <h4 className="text-gray-0 text-[15px] font-semibold">
        필수 옵션 <span className="text-primary">*</span>
      </h4>
      <div className="flex flex-col gap-3">
        {options.map((optionGroup) => (
          <div
            key={optionGroup.menuOptionGroupId}
            className="flex flex-col gap-3 rounded-xl bg-gray-700 p-3"
          >
            <span className="text-gray-0 text-sm font-medium">{optionGroup.name}</span>
            <RadioGroup
              value={selectedOptions[optionGroup.menuOptionGroupId]?.name}
              onValueChange={(value) => handleSelectedRadio(value, optionGroup)}
            >
              {optionGroup.menuOptions.map((option) => (
                <RadioGroupFlex key={option.name} className="justify-between">
                  <div className="flex items-center gap-2">
                    <RadioGroupItem value={option.name} />
                    <span className="text-s font-normal text-gray-100">{option.name}</span>
                  </div>
                  <div className="flex items-center gap-0.5">
                    <PlusIcon className="text-gray-0 h-5 w-5" />
                    <span className="text-s font-normal text-gray-100">
                      {option.price.toLocaleString()}원
                    </span>
                  </div>
                </RadioGroupFlex>
              ))}
            </RadioGroup>
          </div>
        ))}
      </div>
    </div>
  );
}
