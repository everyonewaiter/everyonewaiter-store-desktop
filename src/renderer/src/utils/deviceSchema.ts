import { DeviceSupport } from "@renderer/constants/device";
import { z } from "zod";

export const deviceSchema = z.object({
  phoneNumber: z
    .string()
    .trim()
    .min(1, "휴대폰 번호를 입력해주세요.")
    .max(13)
    .regex(/^01[016789]-\d{3,4}-\d{4}$/, "휴대폰 번호 형식이 맞지 않습니다."),
  code: z
    .string()
    .trim()
    .regex(/^\d{6}$/, "인증번호는 6자리만 입력 가능합니다."),
  storeId: z.string().trim().min(1, "매장을 선택해주세요.").or(z.literal("")),
  deviceType: z.enum(Object.keys(DeviceSupport)),
  deviceName: z
    .string()
    .trim()
    .min(1, "기기 이름을 입력해주세요.")
    .max(20, "기기 이름은 20자 이하로 입력해주세요."),
});

export const deviceFormSchema = deviceSchema.pick({ phoneNumber: true, code: true, storeId: true });
export const deviceInfoSchema = deviceSchema.pick({ deviceType: true, deviceName: true });

export const phoneNumberSchema = deviceSchema.shape.phoneNumber;
export const codeSchema = deviceSchema.shape.code;

export type DeviceSchema = z.infer<typeof deviceFormSchema>;
export type DeviceInfoSchema = z.infer<typeof deviceInfoSchema>;
