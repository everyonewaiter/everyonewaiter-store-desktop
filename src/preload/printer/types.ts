import { Interface, InternationalCharacterSetCode, TextAlign } from "@preload/printer/constants";

type ValueOf<T> = T[keyof T];

type CommunicationInterface = ValueOf<typeof Interface>;

type InternationalCharacterSet = ValueOf<typeof InternationalCharacterSetCode>;

type Alignment = ValueOf<typeof TextAlign>;

interface Printer {
  open: (
    communicationInterface: CommunicationInterface,
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
  setInternationalCharacterSet: (charSet: InternationalCharacterSet) => Promise<number>;
  transactionStart: () => Promise<number>;
  transactionEnd: (sendCompleteCheck?: boolean, timeout?: number) => Promise<number>;
  printText: (
    text: string,
    alignment: Alignment,
    attribute: number,
    size: number
  ) => Promise<number>;
  lineFeed: (feed?: number) => Promise<number>;
  cutPaper: () => Promise<number>;
}

export default Printer;
