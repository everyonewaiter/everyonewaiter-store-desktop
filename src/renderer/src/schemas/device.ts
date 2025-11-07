import { DeviceSupport } from "@renderer/constants";
import { z } from "zod";

const deviceSchema = z.object({
  phoneNumber: z
    .string()
    .min(1, "휴대폰 번호를 입력해주세요.")
    .max(14)
    .regex(/^01\d{1}-\d{3,4}-\d{4}$/, "휴대폰 번호 형식이 맞지 않습니다."),
  code: z.string().min(1, "인증번호를 입력해주세요.").max(6, "인증번호는 6자리입니다."),
  storeId: z.string().min(1),
  deviceType: z.enum(Object.keys(DeviceSupport)),
  deviceName: z.string(),
});

export const deviceFormSchema = deviceSchema.pick({ phoneNumber: true, code: true, storeId: true });
export const deviceInfoSchema = deviceSchema.pick({ deviceType: true, deviceName: true });

export const phoneNumberSchema = deviceSchema.shape.phoneNumber;
export const codeSchema = deviceSchema.shape.code;

export type DeviceSchema = z.infer<typeof deviceFormSchema>;
export type DeviceInfoSchema = z.infer<typeof deviceInfoSchema>;
