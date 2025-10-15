import printerChannel from "@shared/printer/channel";
import { PrinterApi } from "@shared/printer/interface";
import { ipcRenderer } from "electron";

const printer: PrinterApi = {
  open: (
    communicationInterface,
    portName = "",
    baudRate = 0,
    dataBits = 0,
    parity = 0,
    stopBits = 0,
    flowControl = 0
  ) =>
    ipcRenderer.invoke(
      printerChannel.OPEN,
      communicationInterface,
      portName,
      baudRate,
      dataBits,
      parity,
      stopBits,
      flowControl
    ),

  close: () => ipcRenderer.invoke(printerChannel.CLOSE),

  initialize: () => ipcRenderer.invoke(printerChannel.INITIALIZE),

  getCurrentStatus: () => ipcRenderer.invoke(printerChannel.GET_CURRENT_STATUS),

  setInternationalCharacterSet: (code) =>
    ipcRenderer.invoke(printerChannel.SET_INTERNATIONAL_CHARACTER_SET, code),

  transactionStart: () => ipcRenderer.invoke(printerChannel.TRANSACTION_START),

  transactionEnd: (sendCompleteCheck = true, timeout = 3000) =>
    ipcRenderer.invoke(printerChannel.TRANSACTION_END, sendCompleteCheck, timeout),

  printText: (text, alignment, attribute, size) =>
    ipcRenderer.invoke(printerChannel.PRINT_TEXT, text, alignment, attribute, size),

  lineFeed: (feed = 1) => ipcRenderer.invoke(printerChannel.LINE_FEED, feed),

  cutPaper: () => ipcRenderer.invoke(printerChannel.CUT_PAPER),
};

export default printer;
