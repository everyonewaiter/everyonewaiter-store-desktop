type OrderPaymentType = "PREPAID" | "POSTPAID";
type OrderPaymentState = "APPROVE" | "CANCEL";
type OrderPaymentMethod = "CASH" | "CARD";

type OrderCategory = "INITIAL" | "ADDITIONAL";
type OrderState = "ORDER" | "CANCEL";

type StaffCallState = "INCOMPLETE" | "COMPLETE";

export type OrderReceiptType = "NONE" | "DEDUCTION" | "PROOF";

type MenuState = "DEFAULT" | "HIDE" | "SOLD_OUT";
type MenuLabel = "BEST" | "NEW" | "DEFAULT" | "RECOMMEND";
type MenuOptionType = "MANDATORY" | "OPTIONAL";

type WaitingState = "REGISTRATION" | "CANCEL" | "COMPLETE";

export type DevicePurpose = "POS" | "HALL";

export type StoreStatus = "OPEN" | "CLOSE";

export interface Device {
  deviceId: string;
  storeId: string;
  storeName: string;
  name: string;
  purpose: DevicePurpose;
  tableNo: number;
  state: "ACTIVE" | "INACTIVE";
  paymentType: OrderPaymentType;
  createdAt: string;
  updatedAt: string;
}

export interface Table {
  posTableId: string;
  storeId: string;
  tableNo: number;
  hasOrder: boolean;
  orderType: OrderPaymentType;
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
  type: OrderPaymentType;
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
  state: WaitingState;
  createdAt: string;
}

export interface OrderPayment {
  orderPaymentId: string;
  posTableActivityId: string;
  storeId: string;
  state: OrderPaymentState;
  method: OrderPaymentMethod;
  amount: number;
  cancellable: boolean;
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
  createdAt: string;
}

export interface MenuOptionGroup {
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
  menuOptionGroups: MenuOptionGroup[];
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
  orderType: OrderPaymentType;
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

export interface Receipt {
  tableNo: number;
  memo: string;
  printNo: number;
  receiptMenu: ReceiptMenu[];
}

export interface ReceiptMenu {
  name: string;
  quantity: number;
  options: string[];
}

export interface Store {
  storeId: string;
  accountId: string;
  name: string;
  ceoName: string;
  address: string;
  landline: string;
  license: string;
  image: string;
  status: StoreStatus;
  lastOpenedAt: string;
  lastClosedAt: string;
  setting: Setting;
  createdAt: string;
  updatedAt: string;
}

export interface Setting {
  ksnetDeviceNo: string;
  extraTableCount: number;
  printerLocation: DevicePurpose;
  showMenuPopup: boolean;
  showOrderTotalPrice: boolean;
  showOrderMenuImage: boolean;
  countryOfOrigins: CountryOfOrigin[];
  staffCallOptions: string[];
}

export interface CountryOfOrigin {
  item: string;
  origin: string;
}

export interface SimpleStore {
  storeId: string;
  name: string;
}

export interface MenuCategory {
  categoryId: string;
  name: string;
  menus: Menu[];
}

export interface CreateOrder {
  tableNo: number;
  memo: string;
  orderMenus: {
    menuId: string;
    quantity: number;
    menuOptionGroups: {
      menuOptionGroupId: string;
      name: string;
      orderOptions: OrderMenuOption[];
    }[];
    totalPrice: number;
  }[];
}

export type CreateOrderMenu = CreateOrder["orderMenus"][number];
