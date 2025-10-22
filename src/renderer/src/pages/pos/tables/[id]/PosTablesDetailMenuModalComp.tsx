import { MinusIcon, PlusIcon } from "@renderer/assets/icons";
import { Button } from "@renderer/components";
import { Dialog } from "@renderer/components/Dialog";
import { RadioGroup, RadioGroupFlex, RadioGroupItem } from "@renderer/components/Radio";
import { Menu } from "@renderer/types/domain";
import { ModalProps } from "@renderer/types/overlay";

interface PosTablesDetailMenuModalCompProps extends ModalProps {
  menu: Menu;
}

export default function PosTablesDetailMenuModalComp({
  menu,
  ...props
}: PosTablesDetailMenuModalCompProps) {
  return (
    <Dialog open={props.isOpen} onOpenChange={props.close}>
      <Dialog.Wrapper width={1002} flexDirection="row" height={650} className="p-6">
        <div className="h-full flex-1 overflow-hidden rounded-[28px]">
          <img
            src={menu.image || "./src/assets/images/pos-bg.jpg"}
            className="h-full w-full object-cover"
          />
        </div>
        <div className="scrollbar-hide relative flex h-full w-full flex-1 flex-col overflow-y-auto">
          <div className="flex flex-1 flex-col gap-8">
            <div className="flex flex-col gap-5">
              {menu.label && (
                <div className="flex items-center gap-2">
                  <Button variant="outline" className="h-10 rounded-[40px] px-5">
                    {menu.label}
                  </Button>
                </div>
              )}
              <div className="flex flex-col gap-4">
                <h1 className="text-gray-0 text-3xl font-bold">{menu.name}</h1>
                <span className="text-gray-0 text-lg font-normal">{menu.description}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    className="flex h-11 w-12 cursor-pointer items-center justify-center rounded-xl border border-gray-600"
                  >
                    <MinusIcon className="h-9 w-9 text-gray-300" />
                  </button>
                  <span className="px-2 py-1 text-2xl font-normal">1</span>
                  <button
                    type="button"
                    className="flex h-11 w-12 cursor-pointer items-center justify-center rounded-xl border border-gray-600"
                  >
                    <PlusIcon className="h-9 w-9 text-gray-300" />
                  </button>
                </div>
                <strong className="text-gray-0 text-3xl font-bold">
                  {menu.price.toLocaleString()}원
                </strong>
              </div>
            </div>
            <div className="my-5 h-[8px] w-full bg-gray-700" />

            {menu.menuOptionGroups.length > 0 && (
              <>
                <div className="flex flex-col gap-3">
                  <h4 className="text-gray-0 text-[15px] font-semibold">
                    선택 추가 옵션 <span className="text-primary">*</span>
                  </h4>
                  <div className="flex flex-col gap-3">
                    {menu.menuOptionGroups
                      .filter((group) => group.type === "MANDATORY")
                      .map((optionGroup) => (
                        <div
                          key={optionGroup.menuOptionGroupId}
                          className="flex flex-col gap-3 rounded-xl bg-gray-700 p-3"
                        >
                          <span className="text-gray-0 text-sm font-medium">
                            {optionGroup.name}
                          </span>
                          <RadioGroup defaultValue={optionGroup.menuOptions[0].name}>
                            {optionGroup.menuOptions.map((option) => (
                              <RadioGroupFlex key={option.name} className="justify-between">
                                <div className="flex items-center gap-2">
                                  <RadioGroupItem value={option.name} />
                                  <span className="text-s font-normal text-gray-100">
                                    {option.name}
                                  </span>
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
                <div className="flex flex-col gap-3">
                  <h4 className="text-gray-0 text-[15px] font-semibold">
                    필수 추가 옵션 <span className="text-primary">*</span>
                  </h4>
                  <div className="flex flex-col gap-3">
                    {menu.menuOptionGroups
                      .filter((group) => group.type === "OPTIONAL")
                      .map((optionGroup) => (
                        <div
                          key={optionGroup.menuOptionGroupId}
                          className="flex flex-col gap-3 rounded-xl bg-gray-700 p-3"
                        >
                          <span className="text-gray-0 text-sm font-medium">
                            {optionGroup.name}
                          </span>
                          <RadioGroup defaultValue={optionGroup.menuOptions[0].name}>
                            {optionGroup.menuOptions.map((option) => (
                              <RadioGroupFlex key={option.name} className="justify-between">
                                <div className="flex items-center gap-2">
                                  <RadioGroupItem value={option.name} />
                                  <span className="text-s font-normal text-gray-100">
                                    {option.name}
                                  </span>
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
              </>
            )}
          </div>
          <div className="sticky bottom-0 left-0 w-full bg-white pt-6">
            <Button className="button-xl w-full">
              총 {menu.price.toLocaleString()}원
              <div className="h-1 w-1 rounded-full bg-white/60" />
              메뉴 추가
            </Button>
          </div>
        </div>
      </Dialog.Wrapper>
    </Dialog>
  );
}
