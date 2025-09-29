import z from "zod";

export const step1Schema = z.object({
  phone: z
    .string()
    .min(1, "휴대폰 번호를 입력해주세요.")
    .regex(/^\d{3}-\d{4}-\d{4}$/, "잘못된 형식입니다."),
  authNumber: z
    .string()
    .min(1, "인증번호를 입력해주세요.")
    .regex(/^\d{6}$/, "6자리 숫자를 입력해주세요"),
  selectedStore: z
    .object({
      id: z.string(),
      name: z.string(),
    })
    .nullable(),
});

export const step2Schema = z.object({
  selectedPurpose: z.union([z.literal("hall"), z.literal("pos")]),
  deviceName: z.string().min(1, "기기 이름을 입력해주세요"),
});

export type TypeStep1Schema = z.infer<typeof step1Schema>;
export type TypeStep2Schema = z.infer<typeof step2Schema>;
