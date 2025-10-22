export type OrderCategory = "INITIAL" | "ADDITIONAL";
export type PaymentType = "PREPAID" | "POSTPAID";
export type OrderState = "ORDER" | "CANCEL";

export type StaffCallState = "INCOMPLETE" | "COMPLETE";

type OrderPaymentState = "APPROVE" | "CANCEL";
type OrderPaymentMethod = "CASH" | "CARD";
type OrderReceiptType = "NONE" | "DEDUCTION" | "PROOF";

export interface Table {
  posTableId: string;
  storeId: string;
  tableNo: number;
  hasOrder: boolean;
  orderType: PaymentType | null;
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

export interface OrderMenuOption {
  name: string;
  price: number;
}

export interface OrderOptionGroup {
  orderOptionGroupId: string;
  name: string;
  printEnabled: boolean;
  orderOptions: OrderMenuOption[];
}

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

type MenuState = "DEFAULT" | "HIDE" | "SOLD_OUT";
type MenuLabel = "BEST" | "NEW" | "DEFAULT" | "RECOMMEND" | null;
type MenuOptionType = "MANDATORY" | "OPTIONAL";

export interface MenuOptionGroups {
  menuOptionGroupId: string;
  name: string;
  type: MenuOptionType;
  printEnabled: boolean;
  menuOptions: OrderMenuOption[];
}

export interface Menu {
  menuId: string;
  categoryId: string;
  name: string;
  description: string;
  price: number;
  spicy: number;
  state: MenuState;
  label: MenuLabel;
  image: string;
  printEnabled: boolean;
  menuOptionGroups: MenuOptionGroups[];
}

export interface MenuList {
  categoryId: string;
  name: string;
  menus: Menu[];
}

export interface TableActivity {
  posTableActivityId: string;
  storeId: string;
  posTableId: string;
  tableNo: number;
  orderType: PaymentType;
  totalOrderPrice: number;
  totalPaymentPrice: number;
  discount: number;
  remainingPaymentPrice: number;
  active: boolean;
  orders: Order[];
  orderPayments: OrderPayment[];
}

export interface Revenue {
  totalOrderPrice: number;
  totalDiscountPrice: number;
  totalPaymentPrice: number;
  cashPaymentApprovePrice: number;
  cardPaymentApprovePrice: number;
  cashPaymentCancelPrice: number;
  cardPaymentCancelPrice: number;
}
