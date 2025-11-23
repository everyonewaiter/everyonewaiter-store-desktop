import { OrderPayment, Receipt, Store, TableActivity } from "@renderer/types/domain";
import { PrinterInterface, TextAlign, TextAttribute, TextSize } from "@shared/printer/options";

export const openUsbPrinter = () => {
  window.printer.open(PrinterInterface.USB);
};

export const closePrinter = () => {
  window.printer.close();
};

export const printReceiptWithPayment = (store: Store, orderPayment: OrderPayment) => {
  window.printer.transactionStart();
  window.printer.initialize();

  window.printer.printText(
    "영 수 증",
    TextAlign.CENTER,
    TextAttribute.BOLD,
    TextSize.WIDTH1 | TextSize.HEIGHT1
  );
  window.printer.lineFeed(2);

  divider();

  window.printer.printText(
    `상  호  명: ${store.name}`,
    TextAlign.LEFT,
    TextAttribute.DEFAULT,
    TextSize.WIDTH0 | TextSize.HEIGHT0
  );
  window.printer.lineFeed();

  window.printer.printText(
    `대  표  자: ${store.ceoName}`,
    TextAlign.LEFT,
    TextAttribute.DEFAULT,
    TextSize.WIDTH0 | TextSize.HEIGHT0
  );
  window.printer.lineFeed();

  window.printer.printText(
    `사업자번호: ${store.license}`,
    TextAlign.LEFT,
    TextAttribute.DEFAULT,
    TextSize.WIDTH0 | TextSize.HEIGHT0
  );
  window.printer.lineFeed();

  window.printer.printText(
    `주      소: ${store.address}`,
    TextAlign.LEFT,
    TextAttribute.DEFAULT,
    TextSize.WIDTH0 | TextSize.HEIGHT0
  );
  window.printer.lineFeed();

  window.printer.printText(
    `전화  번호: ${store.landline}`,
    TextAlign.LEFT,
    TextAttribute.DEFAULT,
    TextSize.WIDTH0 | TextSize.HEIGHT0
  );
  window.printer.lineFeed();

  window.printer.printText(
    `주문  번호: #${orderPayment.posTableActivityId}`,
    TextAlign.LEFT,
    TextAttribute.DEFAULT,
    TextSize.WIDTH0 | TextSize.HEIGHT0
  );
  window.printer.lineFeed();

  divider();

  printLeftRightText(
    "결제 수단",
    orderPayment.method === "CASH" ? "현금" : "카드",
    TextAttribute.DEFAULT,
    TextSize.WIDTH0,
    TextSize.HEIGHT0
  );
  window.printer.lineFeed();

  printLeftRightText(
    "결제 타입",
    orderPayment.state === "APPROVE" ? "승인" : "취소",
    TextAttribute.DEFAULT,
    TextSize.WIDTH0,
    TextSize.HEIGHT0
  );
  window.printer.lineFeed();

  if (orderPayment.method === "CARD") {
    window.printer.lineFeed();
    window.printer.printText(
      orderPayment.purchaseName,
      TextAlign.LEFT,
      TextAttribute.DEFAULT,
      TextSize.WIDTH0 | TextSize.HEIGHT0
    );
    window.printer.lineFeed();

    printLeftRightText(
      "카드 번호",
      orderPayment.cardNo,
      TextAttribute.DEFAULT,
      TextSize.WIDTH0,
      TextSize.HEIGHT0
    );
    window.printer.lineFeed();

    printLeftRightText(
      "할부 개월",
      orderPayment.installment,
      TextAttribute.DEFAULT,
      TextSize.WIDTH0,
      TextSize.HEIGHT0
    );
    window.printer.lineFeed();

    printLeftRightText(
      "승인 번호",
      orderPayment.approvalNo,
      TextAttribute.DEFAULT,
      TextSize.WIDTH0,
      TextSize.HEIGHT0
    );
    window.printer.lineFeed();
  }

  printLeftRightText(
    "승인 일시",
    orderPayment.tradeTime,
    TextAttribute.DEFAULT,
    TextSize.WIDTH0,
    TextSize.HEIGHT0
  );
  window.printer.lineFeed();

  printLeftRightText(
    "승인 금액",
    `${orderPayment.amount.toLocaleString()}원`,
    TextAttribute.DEFAULT,
    TextSize.WIDTH0,
    TextSize.HEIGHT0
  );
  window.printer.lineFeed();

  divider();

  window.printer.cutPaper();
  window.printer.transactionEnd();
};

export const printReceiptWithActivity = (
  store: Store,
  tableActivity: TableActivity,
  includeProducts: boolean
) => {
  window.printer.transactionStart();
  window.printer.initialize();

  window.printer.printText(
    "영 수 증",
    TextAlign.CENTER,
    TextAttribute.BOLD,
    TextSize.WIDTH1 | TextSize.HEIGHT1
  );
  window.printer.lineFeed(2);

  divider();

  window.printer.printText(
    `상  호  명: ${store.name}`,
    TextAlign.LEFT,
    TextAttribute.DEFAULT,
    TextSize.WIDTH0 | TextSize.HEIGHT0
  );
  window.printer.lineFeed();

  window.printer.printText(
    `대  표  자: ${store.ceoName}`,
    TextAlign.LEFT,
    TextAttribute.DEFAULT,
    TextSize.WIDTH0 | TextSize.HEIGHT0
  );
  window.printer.lineFeed();

  window.printer.printText(
    `사업자번호: ${store.license}`,
    TextAlign.LEFT,
    TextAttribute.DEFAULT,
    TextSize.WIDTH0 | TextSize.HEIGHT0
  );
  window.printer.lineFeed();

  window.printer.printText(
    `주      소: ${store.address}`,
    TextAlign.LEFT,
    TextAttribute.DEFAULT,
    TextSize.WIDTH0 | TextSize.HEIGHT0
  );
  window.printer.lineFeed();

  window.printer.printText(
    `전화  번호: ${store.landline}`,
    TextAlign.LEFT,
    TextAttribute.DEFAULT,
    TextSize.WIDTH0 | TextSize.HEIGHT0
  );
  window.printer.lineFeed();

  window.printer.printText(
    `주문  번호: #${tableActivity.posTableActivityId}`,
    TextAlign.LEFT,
    TextAttribute.DEFAULT,
    TextSize.WIDTH0 | TextSize.HEIGHT0
  );
  window.printer.lineFeed();

  divider();

  if (includeProducts) {
    printLeftRightText(
      "품명",
      "수량/금액",
      TextAttribute.DEFAULT,
      TextSize.WIDTH0,
      TextSize.HEIGHT0
    );
    window.printer.lineFeed();

    divider();

    const orderMenus = tableActivity.orders.flatMap((order) => order.orderMenus);
    for (const orderMenu of orderMenus) {
      let orderMenuWithOptionPrice = orderMenu.price;

      printLeftRightText(
        orderMenu.name.replace(/ /g, ""),
        orderMenu.quantity.toString(),
        TextAttribute.DEFAULT,
        TextSize.WIDTH0,
        TextSize.HEIGHT0
      );
      window.printer.lineFeed();

      const orderOptions = orderMenu.orderOptionGroups.flatMap(
        (orderOptionGroup) => orderOptionGroup.orderOptions
      );
      for (const orderOption of orderOptions) {
        orderMenuWithOptionPrice += orderOption.price;

        window.printer.printText(
          ` └${orderOption.name.replace(/ /g, "")}`,
          TextAlign.LEFT,
          TextAttribute.DEFAULT,
          TextSize.WIDTH0 | TextSize.HEIGHT0
        );
        window.printer.lineFeed();
      }

      const orderMenuTotalPrice = orderMenuWithOptionPrice * orderMenu.quantity;
      window.printer.printText(
        `${orderMenuTotalPrice.toLocaleString()}원`,
        TextAlign.RIGHT,
        TextAttribute.DEFAULT,
        TextSize.WIDTH0 | TextSize.HEIGHT0
      );
      window.printer.lineFeed();

      divider();
    }

    printLeftRightText(
      "주문 합계",
      `${tableActivity.totalOrderPrice.toLocaleString()}원`,
      TextAttribute.BOLD,
      TextSize.WIDTH0,
      TextSize.HEIGHT1
    );
    window.printer.lineFeed();

    printLeftRightText(
      "할인 금액",
      `${tableActivity.discount.toLocaleString()}원`,
      TextAttribute.BOLD,
      TextSize.WIDTH0,
      TextSize.HEIGHT1
    );
    window.printer.lineFeed();

    printLeftRightText(
      "받을 금액",
      `${tableActivity.totalPaymentPrice.toLocaleString()}원`,
      TextAttribute.BOLD,
      TextSize.WIDTH0,
      TextSize.HEIGHT1
    );
    window.printer.lineFeed();

    divider();
  }

  for (const orderPayment of tableActivity.orderPayments) {
    printLeftRightText(
      "결제 수단",
      orderPayment.method === "CASH" ? "현금" : "카드",
      TextAttribute.DEFAULT,
      TextSize.WIDTH0,
      TextSize.HEIGHT0
    );
    window.printer.lineFeed();

    printLeftRightText(
      "결제 타입",
      orderPayment.state === "APPROVE" ? "승인" : "취소",
      TextAttribute.DEFAULT,
      TextSize.WIDTH0,
      TextSize.HEIGHT0
    );
    window.printer.lineFeed();

    if (orderPayment.method === "CARD") {
      window.printer.lineFeed();
      window.printer.printText(
        orderPayment.purchaseName,
        TextAlign.LEFT,
        TextAttribute.DEFAULT,
        TextSize.WIDTH0 | TextSize.HEIGHT0
      );
      window.printer.lineFeed();

      printLeftRightText(
        "카드 번호",
        orderPayment.cardNo,
        TextAttribute.DEFAULT,
        TextSize.WIDTH0,
        TextSize.HEIGHT0
      );
      window.printer.lineFeed();

      printLeftRightText(
        "할부 개월",
        orderPayment.installment,
        TextAttribute.DEFAULT,
        TextSize.WIDTH0,
        TextSize.HEIGHT0
      );
      window.printer.lineFeed();

      printLeftRightText(
        "승인 번호",
        orderPayment.approvalNo,
        TextAttribute.DEFAULT,
        TextSize.WIDTH0,
        TextSize.HEIGHT0
      );
      window.printer.lineFeed();
    }

    printLeftRightText(
      "승인 일시",
      orderPayment.tradeTime,
      TextAttribute.DEFAULT,
      TextSize.WIDTH0,
      TextSize.HEIGHT0
    );
    window.printer.lineFeed();

    printLeftRightText(
      "승인 금액",
      `${orderPayment.amount.toLocaleString()}원`,
      TextAttribute.DEFAULT,
      TextSize.WIDTH0,
      TextSize.HEIGHT0
    );
    window.printer.lineFeed();

    divider();
  }

  window.printer.cutPaper();
  window.printer.transactionEnd();
};

export const printOrder = (receipt: Receipt) => {
  if (receipt.receiptMenu.length === 0) {
    return;
  }

  window.printer.transactionStart();
  window.printer.initialize();

  window.printer.printText(
    "주 문 서",
    TextAlign.CENTER,
    TextAttribute.BOLD,
    TextSize.WIDTH1 | TextSize.HEIGHT1
  );
  window.printer.lineFeed(2);

  divider();

  window.printer.printText(
    "테이블 번호: " +
      (receipt.tableNo > 10000 ? `추가-${receipt.tableNo - 10000}` : receipt.tableNo),
    TextAlign.LEFT,
    TextAttribute.BOLD,
    TextSize.WIDTH0 | TextSize.HEIGHT1
  );
  window.printer.lineFeed();

  window.printer.printText(
    "출력 번호: " + receipt.printNo,
    TextAlign.LEFT,
    TextAttribute.BOLD,
    TextSize.WIDTH0 | TextSize.HEIGHT1
  );
  window.printer.lineFeed(2);

  if (receipt.memo.length > 0) {
    window.printer.printText(
      receipt.memo,
      TextAlign.CENTER,
      TextAttribute.BOLD,
      TextSize.WIDTH1 | TextSize.HEIGHT1
    );
    window.printer.lineFeed(2);
  }

  printLeftRightText("품명", "수량", TextAttribute.DEFAULT, TextSize.WIDTH0, TextSize.HEIGHT0);
  window.printer.lineFeed();

  divider();

  for (const [loopIndex, receiptMenu] of receipt.receiptMenu.entries()) {
    const printIndex = loopIndex + 1;
    const printMenuName = receiptMenu.name.replace(/ /g, "");

    printLeftRightText(
      `${printIndex}.${printMenuName}`,
      receiptMenu.quantity.toString(),
      TextAttribute.BOLD,
      TextSize.WIDTH1,
      TextSize.HEIGHT1
    );
    window.printer.lineFeed();

    for (const receiptMenuOption of receiptMenu.options) {
      window.printer.printText(
        receiptMenuOption,
        TextAlign.LEFT,
        TextAttribute.BOLD,
        TextSize.WIDTH1 | TextSize.HEIGHT1
      );
      window.printer.lineFeed();
    }
  }

  window.printer.cutPaper();
  window.printer.transactionEnd();
};

const divider = () => {
  window.printer.printText(
    "-".repeat(maxLineByteLength[TextSize.WIDTH0]),
    TextAlign.LEFT,
    TextAttribute.DEFAULT,
    TextSize.WIDTH0 | TextSize.HEIGHT0
  );
  window.printer.lineFeed();
};

/**
 * 한글 2byte 그 외 1byte
 */
const maxLineByteLength = {
  [TextSize.WIDTH0]: 42,
  [TextSize.WIDTH1]: 21,
  [TextSize.WIDTH2]: 14,
  [TextSize.WIDTH3]: 10,
  [TextSize.WIDTH4]: 8,
};

const printLeftRightText = (
  leftText: string,
  rightText: string,
  attribute: number,
  width: number,
  height: number
) => {
  const lastLineLeftTextByteLength = getLastLineTextByteLength(leftText, width);
  const rightTextByteLength = rightText.byteLength();

  if (lastLineLeftTextByteLength + rightTextByteLength >= maxLineByteLength[width]) {
    window.printer.printText(leftText, TextAlign.LEFT, attribute, width | height);
    window.printer.lineFeed();
    window.printer.printText(rightText, TextAlign.RIGHT, attribute, width | height);
  } else {
    const spaceSize = maxLineByteLength[width] - lastLineLeftTextByteLength - rightTextByteLength;
    window.printer.printText(
      `${leftText}${" ".repeat(spaceSize)}${rightText}`,
      TextAlign.LEFT,
      attribute,
      width | height
    );
  }
};

const getLastLineTextByteLength = (text: string, width: number) => {
  const totalByteLength = text.byteLength();

  if (totalByteLength <= maxLineByteLength[width]) {
    return totalByteLength;
  }

  let lastLineByteLength = 0;
  for (let i = 0; i < text.length; i++) {
    const charCode = text.charCodeAt(i);
    const byteLength = charCode > 127 ? 2 : 1;

    if (lastLineByteLength + byteLength > maxLineByteLength[width]) {
      lastLineByteLength = byteLength;
    } else {
      lastLineByteLength += byteLength;
    }
  }

  return lastLineByteLength;
};
