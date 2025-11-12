import { Receipt } from "@renderer/types/domain";
import { PrinterInterface, TextAlign, TextAttribute, TextSize } from "@shared/printer/options";

export const openUsbPrinter = () => {
  window.printer.open(PrinterInterface.USB);
};

export const closePrinter = () => {
  window.printer.close();
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

export const printReceipt = () => {
  window.printer.transactionStart();
  window.printer.initialize();
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
  const rightTextByteLength = getByteLength(rightText);

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
  const totalByteLength = getByteLength(text);

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

const getByteLength = (text: string) => {
  let byteLength = 0;

  for (let i = 0; i < text.length; i++) {
    const charCode = text.charCodeAt(i);
    byteLength += charCode > 127 ? 2 : 1;
  }

  return byteLength;
};
