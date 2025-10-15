import {
  InternationalCharacterSetCode,
  PrinterInterface,
  TextAlign,
} from "@shared/printer/options";
import { ValueOf } from "@shared/utils/types";

interface PrinterApi {
  open: (
    communicationInterface: ValueOf<typeof PrinterInterface>,
    portName?: string,
    baudRate?: number,
    dataBits?: number,
    parity?: number,
    stopBits?: number,
    flowControl?: number
  ) => Promise<number>;

  close: () => Promise<number>;

  initialize: () => Promise<number>;

  getCurrentStatus: () => Promise<number>;

  setInternationalCharacterSet: (
    code: ValueOf<typeof InternationalCharacterSetCode>
  ) => Promise<number>;

  transactionStart: () => Promise<number>;

  transactionEnd: (sendCompleteCheck?: boolean, timeout?: number) => Promise<number>;

  printText: (
    text: string,
    alignment: ValueOf<typeof TextAlign>,
    attribute: number,
    size: number
  ) => Promise<number>;

  lineFeed: (feed?: number) => Promise<number>;

  cutPaper: () => Promise<number>;
}

export type { PrinterApi };
