import { OrderViewOrderDetail, StaffCallDetailResponse } from "@renderer/api/device/data-contracts";

interface MockHallManagement {
  unserved: OrderViewOrderDetail[];
  served: OrderViewOrderDetail[];
  staffCalls: StaffCallDetailResponse[];
}

const MOCK: MockHallManagement = {
  unserved: [
    {
      orderId: "1",
      storeId: "1",
      category: "INITIAL",
      type: "POSTPAID",
      state: "ORDER",
      tableNo: 1,
      price: 34900,
      memo: "13시 포장",
      served: false,
      servedTime: "2025-01-01 12:00:00",
      orderMenus: [
        {
          orderMenuId: "1",
          name: "안심 스테이크",
          price: 34900,
          quantity: 1,
          image:
            "https://img.danawa.com/prod_img/500000/081/850/img/13850081_1.jpg?shrink=330:*&_v=20220315174531",
          served: false,
          servedTime: "2025-01-01 12:00:00",
          printEnabled: true,
          orderOptionGroups: [
            {
              orderOptionGroupId: "1",
              name: "굽기 정도",
              printEnabled: true,
              orderOptions: [
                {
                  name: "미디움",
                  price: 0,
                },
              ],
            },
            {
              orderOptionGroupId: "12",
              name: "소스",
              printEnabled: true,
              orderOptions: [
                {
                  name: "데리야끼",
                  price: 0,
                },
              ],
            },
            {
              orderOptionGroupId: "13",
              name: "가니쉬",
              printEnabled: true,
              orderOptions: [
                {
                  name: "아스파라거스",
                  price: 0,
                },
              ],
            },
            {
              orderOptionGroupId: "14",
              name: "가니쉬",
              printEnabled: true,
              orderOptions: [
                {
                  name: "감자튀김",
                  price: 0,
                },
              ],
            },
            {
              orderOptionGroupId: "15",
              name: "주류",
              printEnabled: true,
              orderOptions: [
                {
                  name: "레드 와인",
                  price: 0,
                },
              ],
            },
          ],
        },
        {
          orderMenuId: "2",
          name: "안심 스테이크",
          price: 34900,
          quantity: 1,
          image:
            "https://img.danawa.com/prod_img/500000/081/850/img/13850081_1.jpg?shrink=330:*&_v=20220315174531",
          served: false,
          servedTime: "2025-01-01 12:00:00",
          printEnabled: true,
          orderOptionGroups: [
            {
              orderOptionGroupId: "2",
              name: "굽기 정도",
              printEnabled: true,
              orderOptions: [
                {
                  name: "미디움",
                  price: 0,
                },
              ],
            },
          ],
        },
        {
          orderMenuId: "3",
          name: "안심 스테이크",
          price: 34900,
          quantity: 1,
          image:
            "https://img.danawa.com/prod_img/500000/081/850/img/13850081_1.jpg?shrink=330:*&_v=20220315174531",
          served: false,
          servedTime: "2025-01-01 12:00:00",
          printEnabled: true,
          orderOptionGroups: [
            {
              orderOptionGroupId: "3",
              name: "굽기 정도",
              printEnabled: true,
              orderOptions: [
                {
                  name: "미디움",
                  price: 0,
                },
              ],
            },
          ],
        },
        {
          orderMenuId: "4",
          name: "안심 스테이크",
          price: 34900,
          quantity: 1,
          image:
            "https://img.danawa.com/prod_img/500000/081/850/img/13850081_1.jpg?shrink=330:*&_v=20220315174531",
          served: false,
          servedTime: "2025-01-01 12:00:00",
          printEnabled: true,
          orderOptionGroups: [
            {
              orderOptionGroupId: "4",
              name: "굽기 정도",
              printEnabled: true,
              orderOptions: [
                {
                  name: "미디움",
                  price: 0,
                },
              ],
            },
          ],
        },
        {
          orderMenuId: "5",
          name: "안심 스테이크",
          price: 34900,
          quantity: 1,
          image:
            "https://img.danawa.com/prod_img/500000/081/850/img/13850081_1.jpg?shrink=330:*&_v=20220315174531",
          served: false,
          servedTime: "2025-01-01 12:00:00",
          printEnabled: true,
          orderOptionGroups: [
            {
              orderOptionGroupId: "5",
              name: "굽기 정도",
              printEnabled: true,
              orderOptions: [
                {
                  name: "미디움",
                  price: 0,
                },
              ],
            },
          ],
        },
        {
          orderMenuId: "6",
          name: "안심 스테이크",
          price: 34900,
          quantity: 1,
          image:
            "https://img.danawa.com/prod_img/500000/081/850/img/13850081_1.jpg?shrink=330:*&_v=20220315174531",
          served: true,
          servedTime: "2025-01-01 12:00:00",
          printEnabled: true,
          orderOptionGroups: [
            {
              orderOptionGroupId: "6",
              name: "굽기 정도",
              printEnabled: true,
              orderOptions: [
                {
                  name: "미디움",
                  price: 0,
                },
              ],
            },
            {
              orderOptionGroupId: "7",
              name: "소스",
              printEnabled: true,
              orderOptions: [
                {
                  name: "데리야끼",
                  price: 0,
                },
              ],
            },
            {
              orderOptionGroupId: "8",
              name: "가니쉬",
              printEnabled: true,
              orderOptions: [
                {
                  name: "아스파라거스",
                  price: 0,
                },
              ],
            },
          ],
        },
        {
          orderMenuId: "7",
          name: "안심 스테이크",
          price: 34900,
          quantity: 1,
          image:
            "https://img.danawa.com/prod_img/500000/081/850/img/13850081_1.jpg?shrink=330:*&_v=20220315174531",
          served: false,
          servedTime: "2025-01-01 12:00:00",
          printEnabled: true,
          orderOptionGroups: [
            {
              orderOptionGroupId: "9",
              name: "굽기 정도",
              printEnabled: true,
              orderOptions: [
                {
                  name: "미디움",
                  price: 0,
                },
              ],
            },
          ],
        },
        {
          orderMenuId: "8",
          name: "안심 스테이크",
          price: 34900,
          quantity: 1,
          image:
            "https://img.danawa.com/prod_img/500000/081/850/img/13850081_1.jpg?shrink=330:*&_v=20220315174531",
          served: false,
          servedTime: "2025-01-01 12:00:00",
          printEnabled: true,
          orderOptionGroups: [
            {
              orderOptionGroupId: "10",
              name: "굽기 정도",
              printEnabled: true,
              orderOptions: [
                {
                  name: "미디움",
                  price: 0,
                },
              ],
            },
          ],
        },
        {
          orderMenuId: "9",
          name: "안심 스테이크",
          price: 34900,
          quantity: 1,
          image:
            "https://img.danawa.com/prod_img/500000/081/850/img/13850081_1.jpg?shrink=330:*&_v=20220315174531",
          served: true,
          servedTime: "2025-01-01 12:00:00",
          printEnabled: true,
          orderOptionGroups: [],
        },
        {
          orderMenuId: "10",
          name: "안심 스테이크",
          price: 34900,
          quantity: 1,
          image:
            "https://img.danawa.com/prod_img/500000/081/850/img/13850081_1.jpg?shrink=330:*&_v=20220315174531",
          served: true,
          servedTime: "2025-01-01 12:00:00",
          printEnabled: true,
          orderOptionGroups: [
            {
              orderOptionGroupId: "11",
              name: "굽기 정도",
              printEnabled: true,
              orderOptions: [
                {
                  name: "미디움",
                  price: 0,
                },
              ],
            },
          ],
        },
      ],
      createdAt: "2025-01-01 12:00:00",
      updatedAt: "2025-01-01 12:00:00",
    },
    {
      orderId: "2",
      storeId: "1",
      category: "ADDITIONAL",
      type: "POSTPAID",
      state: "ORDER",
      tableNo: 1,
      price: 34900,
      memo: "",
      served: false,
      servedTime: "2025-01-01 12:00:00",
      orderMenus: [
        {
          orderMenuId: "100",
          name: "안심 스테이크",
          price: 34900,
          quantity: 1,
          image:
            "https://img.danawa.com/prod_img/500000/081/850/img/13850081_1.jpg?shrink=330:*&_v=20220315174531",
          served: true,
          servedTime: "2025-01-01 12:00:00",
          printEnabled: true,
          orderOptionGroups: [
            {
              orderOptionGroupId: "100",
              name: "굽기 정도",
              printEnabled: true,
              orderOptions: [
                {
                  name: "미디움",
                  price: 0,
                },
              ],
            },
            {
              orderOptionGroupId: "101",
              name: "소스",
              printEnabled: true,
              orderOptions: [
                {
                  name: "데리야끼",
                  price: 0,
                },
              ],
            },
            {
              orderOptionGroupId: "102",
              name: "가니쉬",
              printEnabled: true,
              orderOptions: [
                {
                  name: "아스파라거스",
                  price: 0,
                },
              ],
            },
            {
              orderOptionGroupId: "103",
              name: "가니쉬",
              printEnabled: true,
              orderOptions: [
                {
                  name: "감자튀김",
                  price: 0,
                },
              ],
            },
            {
              orderOptionGroupId: "104",
              name: "주류",
              printEnabled: true,
              orderOptions: [
                {
                  name: "레드 와인",
                  price: 0,
                },
              ],
            },
          ],
        },
        {
          orderMenuId: "101",
          name: "안심 스테이크",
          price: 34900,
          quantity: 1,
          image:
            "https://img.danawa.com/prod_img/500000/081/850/img/13850081_1.jpg?shrink=330:*&_v=20220315174531",
          served: true,
          servedTime: "2025-01-01 12:00:00",
          printEnabled: true,
          orderOptionGroups: [
            {
              orderOptionGroupId: "105",
              name: "굽기 정도",
              printEnabled: true,
              orderOptions: [
                {
                  name: "미디움",
                  price: 0,
                },
              ],
            },
          ],
        },
        {
          orderMenuId: "102",
          name: "안심 스테이크",
          price: 34900,
          quantity: 1,
          image:
            "https://img.danawa.com/prod_img/500000/081/850/img/13850081_1.jpg?shrink=330:*&_v=20220315174531",
          served: true,
          servedTime: "2025-01-01 12:00:00",
          printEnabled: true,
          orderOptionGroups: [
            {
              orderOptionGroupId: "106",
              name: "굽기 정도",
              printEnabled: true,
              orderOptions: [
                {
                  name: "미디움",
                  price: 0,
                },
              ],
            },
          ],
        },
        {
          orderMenuId: "103",
          name: "안심 스테이크",
          price: 34900,
          quantity: 1,
          image:
            "https://img.danawa.com/prod_img/500000/081/850/img/13850081_1.jpg?shrink=330:*&_v=20220315174531",
          served: true,
          servedTime: "2025-01-01 12:00:00",
          printEnabled: true,
          orderOptionGroups: [
            {
              orderOptionGroupId: "107",
              name: "굽기 정도",
              printEnabled: true,
              orderOptions: [
                {
                  name: "미디움",
                  price: 0,
                },
              ],
            },
          ],
        },
      ],
      createdAt: "2025-01-01 12:00:00",
      updatedAt: "2025-01-01 12:00:00",
    },
    {
      orderId: "4",
      storeId: "1",
      category: "ADDITIONAL",
      type: "POSTPAID",
      state: "ORDER",
      tableNo: 1,
      price: 34900,
      memo: "",
      served: false,
      servedTime: "2025-01-01 12:00:00",
      orderMenus: [
        {
          orderMenuId: "200",
          name: "안심 스테이크",
          price: 34900,
          quantity: 1,
          image:
            "https://img.danawa.com/prod_img/500000/081/850/img/13850081_1.jpg?shrink=330:*&_v=20220315174531",
          served: true,
          servedTime: "2025-01-01 12:00:00",
          printEnabled: true,
          orderOptionGroups: [],
        },
        {
          orderMenuId: "201",
          name: "안심 스테이크",
          price: 34900,
          quantity: 1,
          image:
            "https://img.danawa.com/prod_img/500000/081/850/img/13850081_1.jpg?shrink=330:*&_v=20220315174531",
          served: false,
          servedTime: "2025-01-01 12:00:00",
          printEnabled: true,
          orderOptionGroups: [],
        },
      ],
      createdAt: "2025-01-01 12:00:00",
      updatedAt: "2025-01-01 12:00:00",
    },
  ],
  served: [
    {
      orderId: "1",
      storeId: "1",
      category: "INITIAL",
      type: "POSTPAID",
      state: "ORDER",
      tableNo: 1,
      price: 34900,
      memo: "13시 포장",
      served: true,
      servedTime: "2025-01-01 12:00:00",
      orderMenus: [
        {
          orderMenuId: "1",
          name: "안심 스테이크",
          price: 34900,
          quantity: 1,
          image:
            "https://img.danawa.com/prod_img/500000/081/850/img/13850081_1.jpg?shrink=330:*&_v=20220315174531",
          served: true,
          servedTime: "2025-01-01 12:00:00",
          printEnabled: true,
          orderOptionGroups: [
            {
              orderOptionGroupId: "1",
              name: "굽기 정도",
              printEnabled: true,
              orderOptions: [
                {
                  name: "미디움",
                  price: 0,
                },
              ],
            },
            {
              orderOptionGroupId: "12",
              name: "소스",
              printEnabled: true,
              orderOptions: [
                {
                  name: "데리야끼",
                  price: 0,
                },
              ],
            },
            {
              orderOptionGroupId: "13",
              name: "가니쉬",
              printEnabled: true,
              orderOptions: [
                {
                  name: "아스파라거스",
                  price: 0,
                },
              ],
            },
            {
              orderOptionGroupId: "14",
              name: "가니쉬",
              printEnabled: true,
              orderOptions: [
                {
                  name: "감자튀김",
                  price: 0,
                },
              ],
            },
            {
              orderOptionGroupId: "15",
              name: "주류",
              printEnabled: true,
              orderOptions: [
                {
                  name: "레드 와인",
                  price: 0,
                },
              ],
            },
          ],
        },
        {
          orderMenuId: "2",
          name: "안심 스테이크",
          price: 34900,
          quantity: 1,
          image:
            "https://img.danawa.com/prod_img/500000/081/850/img/13850081_1.jpg?shrink=330:*&_v=20220315174531",
          served: true,
          servedTime: "2025-01-01 12:00:00",
          printEnabled: true,
          orderOptionGroups: [
            {
              orderOptionGroupId: "2",
              name: "굽기 정도",
              printEnabled: true,
              orderOptions: [
                {
                  name: "미디움",
                  price: 0,
                },
              ],
            },
          ],
        },
        {
          orderMenuId: "3",
          name: "안심 스테이크",
          price: 34900,
          quantity: 1,
          image:
            "https://img.danawa.com/prod_img/500000/081/850/img/13850081_1.jpg?shrink=330:*&_v=20220315174531",
          served: true,
          servedTime: "2025-01-01 12:00:00",
          printEnabled: true,
          orderOptionGroups: [
            {
              orderOptionGroupId: "3",
              name: "굽기 정도",
              printEnabled: true,
              orderOptions: [
                {
                  name: "미디움",
                  price: 0,
                },
              ],
            },
          ],
        },
        {
          orderMenuId: "4",
          name: "안심 스테이크",
          price: 34900,
          quantity: 1,
          image:
            "https://img.danawa.com/prod_img/500000/081/850/img/13850081_1.jpg?shrink=330:*&_v=20220315174531",
          served: true,
          servedTime: "2025-01-01 12:00:00",
          printEnabled: true,
          orderOptionGroups: [
            {
              orderOptionGroupId: "4",
              name: "굽기 정도",
              printEnabled: true,
              orderOptions: [
                {
                  name: "미디움",
                  price: 0,
                },
              ],
            },
          ],
        },
        {
          orderMenuId: "5",
          name: "안심 스테이크",
          price: 34900,
          quantity: 1,
          image:
            "https://img.danawa.com/prod_img/500000/081/850/img/13850081_1.jpg?shrink=330:*&_v=20220315174531",
          served: true,
          servedTime: "2025-01-01 12:00:00",
          printEnabled: true,
          orderOptionGroups: [
            {
              orderOptionGroupId: "5",
              name: "굽기 정도",
              printEnabled: true,
              orderOptions: [
                {
                  name: "미디움",
                  price: 0,
                },
              ],
            },
          ],
        },
        {
          orderMenuId: "6",
          name: "안심 스테이크",
          price: 34900,
          quantity: 1,
          image:
            "https://img.danawa.com/prod_img/500000/081/850/img/13850081_1.jpg?shrink=330:*&_v=20220315174531",
          served: true,
          servedTime: "2025-01-01 12:00:00",
          printEnabled: true,
          orderOptionGroups: [
            {
              orderOptionGroupId: "6",
              name: "굽기 정도",
              printEnabled: true,
              orderOptions: [
                {
                  name: "미디움",
                  price: 0,
                },
              ],
            },
            {
              orderOptionGroupId: "7",
              name: "소스",
              printEnabled: true,
              orderOptions: [
                {
                  name: "데리야끼",
                  price: 0,
                },
              ],
            },
            {
              orderOptionGroupId: "8",
              name: "가니쉬",
              printEnabled: true,
              orderOptions: [
                {
                  name: "아스파라거스",
                  price: 0,
                },
              ],
            },
          ],
        },
        {
          orderMenuId: "7",
          name: "안심 스테이크",
          price: 34900,
          quantity: 1,
          image:
            "https://img.danawa.com/prod_img/500000/081/850/img/13850081_1.jpg?shrink=330:*&_v=20220315174531",
          served: true,
          servedTime: "2025-01-01 12:00:00",
          printEnabled: true,
          orderOptionGroups: [
            {
              orderOptionGroupId: "9",
              name: "굽기 정도",
              printEnabled: true,
              orderOptions: [
                {
                  name: "미디움",
                  price: 0,
                },
              ],
            },
          ],
        },
        {
          orderMenuId: "8",
          name: "안심 스테이크",
          price: 34900,
          quantity: 1,
          image:
            "https://img.danawa.com/prod_img/500000/081/850/img/13850081_1.jpg?shrink=330:*&_v=20220315174531",
          served: true,
          servedTime: "2025-01-01 12:00:00",
          printEnabled: true,
          orderOptionGroups: [
            {
              orderOptionGroupId: "10",
              name: "굽기 정도",
              printEnabled: true,
              orderOptions: [
                {
                  name: "미디움",
                  price: 0,
                },
              ],
            },
          ],
        },
        {
          orderMenuId: "9",
          name: "안심 스테이크",
          price: 34900,
          quantity: 1,
          image:
            "https://img.danawa.com/prod_img/500000/081/850/img/13850081_1.jpg?shrink=330:*&_v=20220315174531",
          served: true,
          servedTime: "2025-01-01 12:00:00",
          printEnabled: true,
          orderOptionGroups: [],
        },
        {
          orderMenuId: "10",
          name: "안심 스테이크",
          price: 34900,
          quantity: 1,
          image:
            "https://img.danawa.com/prod_img/500000/081/850/img/13850081_1.jpg?shrink=330:*&_v=20220315174531",
          served: true,
          servedTime: "2025-01-01 12:00:00",
          printEnabled: true,
          orderOptionGroups: [
            {
              orderOptionGroupId: "11",
              name: "굽기 정도",
              printEnabled: true,
              orderOptions: [
                {
                  name: "미디움",
                  price: 0,
                },
              ],
            },
          ],
        },
      ],
      createdAt: "2025-01-01 12:00:00",
      updatedAt: "2025-01-01 12:00:00",
    },
    {
      orderId: "2",
      storeId: "1",
      category: "ADDITIONAL",
      type: "POSTPAID",
      state: "ORDER",
      tableNo: 1,
      price: 34900,
      memo: "",
      served: true,
      servedTime: "2025-01-01 12:00:00",
      orderMenus: [
        {
          orderMenuId: "100",
          name: "안심 스테이크",
          price: 34900,
          quantity: 1,
          image:
            "https://img.danawa.com/prod_img/500000/081/850/img/13850081_1.jpg?shrink=330:*&_v=20220315174531",
          served: true,
          servedTime: "2025-01-01 12:00:00",
          printEnabled: true,
          orderOptionGroups: [
            {
              orderOptionGroupId: "100",
              name: "굽기 정도",
              printEnabled: true,
              orderOptions: [
                {
                  name: "미디움",
                  price: 0,
                },
              ],
            },
            {
              orderOptionGroupId: "101",
              name: "소스",
              printEnabled: true,
              orderOptions: [
                {
                  name: "데리야끼",
                  price: 0,
                },
              ],
            },
            {
              orderOptionGroupId: "102",
              name: "가니쉬",
              printEnabled: true,
              orderOptions: [
                {
                  name: "아스파라거스",
                  price: 0,
                },
              ],
            },
            {
              orderOptionGroupId: "103",
              name: "가니쉬",
              printEnabled: true,
              orderOptions: [
                {
                  name: "감자튀김",
                  price: 0,
                },
              ],
            },
            {
              orderOptionGroupId: "104",
              name: "주류",
              printEnabled: true,
              orderOptions: [
                {
                  name: "레드 와인",
                  price: 0,
                },
              ],
            },
          ],
        },
        {
          orderMenuId: "101",
          name: "안심 스테이크",
          price: 34900,
          quantity: 1,
          image:
            "https://img.danawa.com/prod_img/500000/081/850/img/13850081_1.jpg?shrink=330:*&_v=20220315174531",
          served: true,
          servedTime: "2025-01-01 12:00:00",
          printEnabled: true,
          orderOptionGroups: [
            {
              orderOptionGroupId: "105",
              name: "굽기 정도",
              printEnabled: true,
              orderOptions: [
                {
                  name: "미디움",
                  price: 0,
                },
              ],
            },
          ],
        },
        {
          orderMenuId: "102",
          name: "안심 스테이크",
          price: 34900,
          quantity: 1,
          image:
            "https://img.danawa.com/prod_img/500000/081/850/img/13850081_1.jpg?shrink=330:*&_v=20220315174531",
          served: true,
          servedTime: "2025-01-01 12:00:00",
          printEnabled: true,
          orderOptionGroups: [
            {
              orderOptionGroupId: "106",
              name: "굽기 정도",
              printEnabled: true,
              orderOptions: [
                {
                  name: "미디움",
                  price: 0,
                },
              ],
            },
          ],
        },
        {
          orderMenuId: "103",
          name: "안심 스테이크",
          price: 34900,
          quantity: 1,
          image:
            "https://img.danawa.com/prod_img/500000/081/850/img/13850081_1.jpg?shrink=330:*&_v=20220315174531",
          served: true,
          servedTime: "2025-01-01 12:00:00",
          printEnabled: true,
          orderOptionGroups: [
            {
              orderOptionGroupId: "107",
              name: "굽기 정도",
              printEnabled: true,
              orderOptions: [
                {
                  name: "미디움",
                  price: 0,
                },
              ],
            },
          ],
        },
      ],
      createdAt: "2025-01-01 12:00:00",
      updatedAt: "2025-01-01 12:00:00",
    },
  ],
  staffCalls: [
    {
      staffCallId: "1",
      tableNo: 1,
      name: "직원 호출",
      state: "INCOMPLETE",
      completeTime: "1970-01-01 00:00:00",
      createdAt: "2025-01-01 12:00:00",
    },
    {
      staffCallId: "2",
      tableNo: 2,
      name: "차가운 물",
      state: "INCOMPLETE",
      completeTime: "1970-01-01 00:00:00",
      createdAt: "2025-01-01 12:00:00",
    },
    {
      staffCallId: "3",
      tableNo: 2,
      name: "뜨거운 물",
      state: "INCOMPLETE",
      completeTime: "1970-01-01 00:00:00",
      createdAt: "2025-01-01 12:00:00",
    },
    {
      staffCallId: "4",
      tableNo: 3,
      name: "수저",
      state: "INCOMPLETE",
      completeTime: "1970-01-01 00:00:00",
      createdAt: "2025-01-01 12:00:00",
    },
    {
      staffCallId: "5",
      tableNo: 100,
      name: "수저",
      state: "INCOMPLETE",
      completeTime: "1970-01-01 00:00:00",
      createdAt: "2025-01-01 12:00:00",
    },
    {
      staffCallId: "6",
      tableNo: 10,
      name: "앞치마",
      state: "INCOMPLETE",
      completeTime: "1970-01-01 00:00:00",
      createdAt: "2025-01-01 12:00:00",
    },
    {
      staffCallId: "7",
      tableNo: 2,
      name: "앞치마",
      state: "INCOMPLETE",
      completeTime: "1970-01-01 00:00:00",
      createdAt: "2025-01-01 12:00:00",
    },
    {
      staffCallId: "8",
      tableNo: 15,
      name: "차가운 물",
      state: "INCOMPLETE",
      completeTime: "1970-01-01 00:00:00",
      createdAt: "2025-01-01 12:00:00",
    },
    {
      staffCallId: "9",
      tableNo: 17,
      name: "수저",
      state: "INCOMPLETE",
      completeTime: "1970-01-01 00:00:00",
      createdAt: "2025-01-01 12:00:00",
    },
    {
      staffCallId: "10",
      tableNo: 1,
      name: "앞치마",
      state: "INCOMPLETE",
      completeTime: "1970-01-01 00:00:00",
      createdAt: "2025-01-01 12:00:00",
    },
  ],
};

export default MOCK;
