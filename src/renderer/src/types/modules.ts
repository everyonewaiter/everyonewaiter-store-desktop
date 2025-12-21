import { paymentMethod, paymentType } from "@renderer/modules/kscat";
import { valueOf } from "@renderer/utils";

export interface KSCATApprovalTelegram {
  deviceNo: string;
  method: valueOf<typeof paymentMethod>;
  type: valueOf<typeof paymentType>;
  totalAmount: number;
  serviceAmount: number;
  vat: number;
  supplyAmount: number;
  installment: string;
  approvalNo: string;
  approvalDate: string;
}

export interface KSCATApprovalRequest {
  deviceNo: string;
  method: valueOf<typeof paymentMethod>;
  type: valueOf<typeof paymentType>;
  amount: number;
  installment: string;
  successCallback: (response: KSCATApprovalResponse) => Promise<void>;
  approvalNo?: string;
  approvalDate?: string;
}

export interface KSCATApprovalResponse {
  method: keyof typeof paymentMethod;
  amount: number;
  vat: number;
  supplyAmount: number;
  approvalNo: string;
  installment: string;
  cardNo: string;
  issuerName: string;
  purchaseName: string;
  merchantNo: string;
  tradeTime: string;
  tradeUniqueNo: string;
}
