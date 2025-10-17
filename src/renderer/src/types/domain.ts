export type OrderCategory = "INITIAL" | "ADDITIONAL";
export type PaymentType = "PREPAID" | "POSTPAID";
export type OrderState = "ORDER" | "CANCEL";

export interface Table {
  posTableId: string;
  storeId: string;
  tableNo: number;
  hasOrder: boolean;
  orderType: "POSTPAID" | "PREPAID" | null;
  orderedAt: string | null;
  orderMenuName: string | null;
  orderMenuCount: number;
  totalOrderPrice: number;
  discount: number;
}

export interface Order {
  orderId: string;
  storeId: string;
  category: OrderCategory;
  type: PaymentType;
  state: OrderState;
  tableNo: number;
  price: number;
  memo: string;
  served: boolean;
  servedTime: string;
  orderMenus: OrderMenu[];
  createdAt: string;
  updatedAt: string;
}

export interface OrderMenu {
  orderMenuId: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  served: boolean;
  servedTime: string;
  printEnabled: boolean;
  orderOptionGroups: OrderOptionGroup[];
}

export interface OrderOptionGroup {
  orderOptionGroupId: string;
  name: string;
  printEnabled: boolean;
  orderOptions: OrderOption[];
}

export interface OrderOption {
  name: string;
  price: number;
}

export type StaffCallState = "INCOMPLETE" | "COMPLETE";

export interface StaffCall {
  staffCallId: string;
  tableNo: number;
  name: string;
  state: StaffCallState;
  completeTime: string;
  createdAt: string;
}

export interface Waiting {
  waitingId: string;
  phoneNumber: string;
  adult: number;
  infant: number;
  number: number;
  callCount: number;
  lastCallTime: string;
  state: string;
  createdAt: string;
}

type OrderPaymentState = "APPROVE" | "CANCEL";
type OrderPaymentMethod = "CASH" | "CARD";
type OrderReceiptType = "NONE" | "DEDUCTION" | "PROOF";

interface OrderPayment {
  method: OrderPaymentMethod;
  amount: number;
  approvalNo: string;
  installment: string;
  cardNo: string;
  issuerName: string;
  purchaseName: string;
  merchantNo: string;
  tradeTime: string;
  tradeUniqueNo: string;
  vat: number;
  supplyAmount: number;
  cashReceiptNo: string;
  cashReceiptType: OrderReceiptType;
}

export interface OrderPaymentsList extends OrderPayment {
  orderPaymentId: string;
  posTableActivityId: string;
  storeId: string;
  state: OrderPaymentState;
  cancellable: boolean;
  createdAt: string;
}
