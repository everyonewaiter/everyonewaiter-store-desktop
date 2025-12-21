import { phoneNumberSchema } from "@renderer/schemas/device";
import { OrderReceiptType } from "@renderer/types/domain";
import { z } from "zod";

const receiptTypes: OrderReceiptType[] = ["NONE", "DEDUCTION", "PROOF"];

export const posSchema = z.object({
  phoneNumber: phoneNumberSchema,
  paymentAmount: z.string(),
  cashReceiptType: z.enum(receiptTypes),
  installment: z.string().refine((val) => {
    const num = parseInt(val, 10);
    return num >= 0 && num <= 12;
  }, "할부 개월은 0~12 사이로 입력해주세요."),
});

export const paymentSchema = posSchema.pick({
  paymentAmount: true,
  cashReceiptType: true,
  installment: true,
});

export type PaymentSchema = z.infer<typeof paymentSchema>;
