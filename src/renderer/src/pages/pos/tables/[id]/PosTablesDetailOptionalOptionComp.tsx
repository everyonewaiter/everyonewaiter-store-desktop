import { PlusIcon } from "@renderer/assets/icons";
import { Checkbox } from "@renderer/components";
import { SelectedOption } from "@renderer/pages/pos/tables/[id]/PosTablesDetailMenuModalComp";
import { MenuOptionGroup } from "@renderer/types/domain";

interface PosTablesDetailOptionalOptionCompProps {
  options: MenuOptionGroup[];
  selectedOptions: SelectedOption[];
  setSelectedOptions: (options: SelectedOption[]) => void;
}

function PosTablesDetailOptionalOptionComp({
  options,
  selectedOptions,
  setSelectedOptions,
}: PosTablesDetailOptionalOptionCompProps) {
  const isCheckboxSelected = (option: SelectedOption) =>
    selectedOptions.some(
      (selected) =>
        selected.name === option.name && selected.menuOptionGroupId === option.menuOptionGroupId
    );

  const handleSelectOption = (option: SelectedOption) => {
    if (isCheckboxSelected(option)) {
      setSelectedOptions(
        selectedOptions.filter(
          (prevOption) =>
            prevOption.name !== option.name ||
            prevOption.menuOptionGroupId !== option.menuOptionGroupId
        )
      );
    } else {
      setSelectedOptions([...selectedOptions, option]);
    }
  };

  return (
    <div className="flex flex-col gap-3">
      <h4 className="text-gray-0 text-[15px] font-semibold">선택 옵션</h4>
      <div className="flex flex-col gap-3">
        {options.map((optionGroup) => (
          <div
            key={optionGroup.menuOptionGroupId}
            className="flex flex-col gap-3 rounded-xl bg-gray-700 p-3"
          >
            <span className="text-gray-0 text-sm font-medium">{optionGroup.name}</span>
            <div className="flex flex-col gap-2">
              {optionGroup.menuOptions.map((option) => (
                <div key={option.name} className="flex w-full items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Checkbox
                      size={16}
                      checked={isCheckboxSelected({
                        ...option,
                        menuOptionGroupId: optionGroup.menuOptionGroupId,
                      })}
                      onCheckedChange={() =>
                        handleSelectOption({
                          ...option,
                          menuOptionGroupId: optionGroup.menuOptionGroupId,
                        })
                      }
                    />
                    <span className="text-s font-normal text-gray-100">{option.name}</span>
                  </div>
                  <div className="flex items-center gap-0.5">
                    <PlusIcon className="text-gray-0 h-5 w-5" />
                    <span className="text-s font-normal text-gray-100">
                      {option.price.toLocaleString()}원
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PosTablesDetailOptionalOptionComp;
