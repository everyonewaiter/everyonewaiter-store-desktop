import { UseFormReturn } from "react-hook-form";
import { DeviceSchema } from "@renderer/schemas/device";

function useDeviceFormatPhoneNumber(form: UseFormReturn<DeviceSchema>) {
  const handleSetPhoneNumber = (value: string) =>
    form.setValue("phoneNumber", value, { shouldValidate: false });

  const handleChangePhoneNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
    const numbers = e.target.value.replace(/[^0-9]/g, "");
    const len = numbers.length;

    const [start, mid, end] = [0, 3, 7];

    if (len === 0) {
      handleSetPhoneNumber("");
    } else if (len <= mid) {
      handleSetPhoneNumber(numbers);
    } else if (len <= end) {
      handleSetPhoneNumber(`${numbers.slice(start, mid)}-${numbers.slice(mid)}`);
    } else if (len <= mid + end) {
      handleSetPhoneNumber(
        `${numbers.slice(start, mid)}-${numbers.slice(mid, end - 1)}-${numbers.slice(end - 1)}`
      );
    } else if (len === 11) {
      handleSetPhoneNumber(
        `${numbers.slice(start, mid)}-${numbers.slice(mid, end)}-${numbers.slice(end)}`
      );
    } else {
      const sliced = numbers.slice(0, 11);
      handleSetPhoneNumber(
        `${sliced.slice(start, mid)}-${sliced.slice(mid, end)}-${sliced.slice(end)}`
      );
    }
  };

  return { handleChangePhoneNumber };
}

export default useDeviceFormatPhoneNumber;
