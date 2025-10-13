export interface PosTableMockType {
  id: string;
  storeId: string;
  tableNo: number;
  hasOrder: boolean;
  orderType: "POSTPAID" | "PREPAID";
  orderedAt: string | null;
  orderMenuName: string | null;
  orderMenuCount: number | null;
  totalOrderPrice: number | null;
  discount: number | null;
}

export const MOCK: PosTableMockType[] = [
  {
    id: "1",
    storeId: "A001",
    tableNo: 1,
    hasOrder: false,
    orderType: "POSTPAID",
    orderedAt: null,
    orderMenuName: null,
    orderMenuCount: null,
    totalOrderPrice: null,
    discount: null,
  },
  {
    id: "2",
    storeId: "A001",
    tableNo: 2,
    hasOrder: true,
    orderType: "PREPAID",
    orderedAt: "18:45",
    orderMenuName: "감바스 알 아히요 외 1개",
    orderMenuCount: 2,
    totalOrderPrice: 54000,
    discount: 0,
  },
  {
    id: "3",
    storeId: "A001",
    tableNo: 3,
    hasOrder: true,
    orderType: "POSTPAID",
    orderedAt: "19:00",
    orderMenuName: "리코타 샐러드 외 3개",
    orderMenuCount: 4,
    totalOrderPrice: 96000,
    discount: 10000,
  },
  {
    id: "4",
    storeId: "A001",
    tableNo: 4,
    hasOrder: true,
    orderType: "PREPAID",
    orderedAt: "18:45",
    orderMenuName: "감바스 알 아히요 외 1개",
    orderMenuCount: 2,
    totalOrderPrice: 54000,
    discount: 0,
  },
  {
    id: "5",
    storeId: "A001",
    tableNo: 5,
    hasOrder: true,
    orderType: "POSTPAID",
    orderedAt: "19:00",
    orderMenuName: "리코타 샐러드 외 3개",
    orderMenuCount: 4,
    totalOrderPrice: 96000,
    discount: 10000,
  },
  {
    id: "6",
    storeId: "A001",
    tableNo: 6,
    hasOrder: false,
    orderType: "POSTPAID",
    orderedAt: null,
    orderMenuName: null,
    orderMenuCount: null,
    totalOrderPrice: null,
    discount: null,
  },
  {
    id: "7",
    storeId: "A001",
    tableNo: 7,
    hasOrder: false,
    orderType: "POSTPAID",
    orderedAt: null,
    orderMenuName: null,
    orderMenuCount: null,
    totalOrderPrice: null,
    discount: null,
  },
  {
    id: "8",
    storeId: "A001",
    tableNo: 8,
    hasOrder: true,
    orderType: "PREPAID",
    orderedAt: "18:45",
    orderMenuName: "감바스 알 아히요 외 1개",
    orderMenuCount: 2,
    totalOrderPrice: 54000,
    discount: 0,
  },
  {
    id: "9",
    storeId: "A001",
    tableNo: 9,
    hasOrder: true,
    orderType: "POSTPAID",
    orderedAt: "19:00",
    orderMenuName: "리코타 샐러드 외 3개",
    orderMenuCount: 4,
    totalOrderPrice: 96000,
    discount: 10000,
  },
  {
    id: "10",
    storeId: "A001",
    tableNo: 10,
    hasOrder: true,
    orderType: "POSTPAID",
    orderedAt: "19:00",
    orderMenuName: "리코타 샐러드 외 3개",
    orderMenuCount: 4,
    totalOrderPrice: 96000,
    discount: 10000,
  },
  {
    id: "11",
    storeId: "A001",
    tableNo: 11,
    hasOrder: false,
    orderType: "POSTPAID",
    orderedAt: null,
    orderMenuName: null,
    orderMenuCount: null,
    totalOrderPrice: null,
    discount: null,
  },
  {
    id: "12",
    storeId: "A001",
    tableNo: 12,
    hasOrder: true,
    orderType: "PREPAID",
    orderedAt: "18:45",
    orderMenuName: "감바스 알 아히요 외 1개",
    orderMenuCount: 2,
    totalOrderPrice: 54000,
    discount: 0,
  },
];

interface OrderPaymentMockType {
  posTableActivityId: string;
  storeId: string;
  status: "APPROVE" | "CANCEL";
  createdAt: string;
  number: number;
  cash: number;
  card: number;
  total: number;
}

export const PAYMENTS_MOCK: OrderPaymentMockType[] = [
  {
    posTableActivityId: "PTA-4886",
    storeId: "A001",
    number: 4886,
    cash: 10000,
    card: 141000,
    total: 151000,
    status: "APPROVE",
    createdAt: "12:14:54",
  },
  {
    posTableActivityId: "PTA-4887",
    storeId: "A001",
    number: 4887,
    cash: 0,
    card: 87000,
    total: 87000,
    status: "APPROVE",
    createdAt: "12:32:10",
  },
  {
    posTableActivityId: "PTA-4888",
    storeId: "A001",
    number: 4888,
    cash: 20000,
    card: 64000,
    total: 84000,
    status: "CANCEL",
    createdAt: "12:50:31",
  },
  {
    posTableActivityId: "PTA-4889",
    storeId: "A001",
    number: 4889,
    cash: 15000,
    card: 112000,
    total: 127000,
    status: "APPROVE",
    createdAt: "13:02:45",
  },
  {
    posTableActivityId: "PTA-4890",
    storeId: "A001",
    number: 4890,
    cash: 0,
    card: 92000,
    total: 92000,
    status: "APPROVE",
    createdAt: "13:20:11",
  },

  {
    posTableActivityId: "PTA-4891",
    storeId: "A001",
    number: 4891,
    cash: 50000,
    card: 38000,
    total: 88000,
    status: "APPROVE",
    createdAt: "14:05:22",
  },
  {
    posTableActivityId: "PTA-4892",
    storeId: "A001",
    number: 4892,
    cash: 0,
    card: 45000,
    total: 45000,
    status: "CANCEL",
    createdAt: "14:30:40",
  },
  {
    posTableActivityId: "PTA-4893",
    storeId: "A001",
    number: 4893,
    cash: 12000,
    card: 0,
    total: 12000,
    status: "APPROVE",
    createdAt: "15:12:09",
  },
  {
    posTableActivityId: "PTA-4894",
    storeId: "A001",
    number: 4894,
    cash: 30000,
    card: 27000,
    total: 57000,
    status: "APPROVE",
    createdAt: "15:45:33",
  },
  {
    posTableActivityId: "PTA-4895",
    storeId: "A001",
    number: 4895,
    cash: 0,
    card: 65000,
    total: 65000,
    status: "CANCEL",
    createdAt: "16:10:51",
  },
];

interface OrderOptionGroups {
  orderOptionGroupId: string;
  name: string;
  printEnabled: boolean;
  orderOptions: { name: string; price: number }[];
}

export interface PosOrderMockType {
  orderMenuId: string;
  name: string;
  price: number;
  quantity: number;
  served: boolean;
  servedTime: string;
  printEnabled: boolean;
  orderOptionGroups: OrderOptionGroups[];
}

export interface PosOrderType {
  orderId: string;
  orderMenus: PosOrderMockType[];
}

export const POS_ORDER_MOCK: PosOrderType = {
  orderId: "OM-4886",
  orderMenus: [
    {
      orderMenuId: "OM-4886-1",
      name: "스노우치즈폭탄",
      price: 151000,
      quantity: 1,
      served: false,
      servedTime: "",
      printEnabled: true,
      orderOptionGroups: [],
    },
    {
      orderMenuId: "OM-4886-2",
      name: "아메리카노",
      price: 4500,
      quantity: 2,
      served: true,
      servedTime: "2025-10-12T13:15:30Z",
      printEnabled: true,
      orderOptionGroups: [
        {
          orderOptionGroupId: "OOG-2001",
          name: "온도 선택",
          printEnabled: true,
          orderOptions: [{ name: "ICE", price: 500 }],
        },
        {
          orderOptionGroupId: "OOG-2002",
          name: "샷 추가",
          printEnabled: true,
          orderOptions: [{ name: "샷 1개 추가", price: 500 }],
        },
      ],
    },
    {
      orderMenuId: "OM-4886-3",
      name: "카페라떼",
      price: 5000,
      quantity: 1,
      served: false,
      servedTime: "",
      printEnabled: true,
      orderOptionGroups: [
        {
          orderOptionGroupId: "OOG-2003",
          name: "우유 선택",
          printEnabled: true,
          orderOptions: [{ name: "일반 우유", price: 0 }],
        },
      ],
    },
  ],
};
