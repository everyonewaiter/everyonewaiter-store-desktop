import Printer from "@preload/printer/types";
import { ipcRenderer } from "electron";

const printer: Printer = {
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
      "printer:open",
      communicationInterface,
      portName,
      baudRate,
      dataBits,
      parity,
      stopBits,
      flowControl
    ),
  close: () => ipcRenderer.invoke("printer:close"),
  initialize: () => ipcRenderer.invoke("printer:initialize"),
  getCurrentStatus: () => ipcRenderer.invoke("printer:getCurrentStatus"),
  setInternationalCharacterSet: (charSet) =>
    ipcRenderer.invoke("printer:setInternationalCharacterSet", charSet),
  transactionStart: () => ipcRenderer.invoke("printer:transactionStart"),
  transactionEnd: (sendCompleteCheck = true, timeout = 3000) =>
    ipcRenderer.invoke("printer:transactionEnd", sendCompleteCheck, timeout),
  printText: (text, alignment, attribute, size) =>
    ipcRenderer.invoke("printer:printText", text, alignment, attribute, size),
  lineFeed: (feed = 2) => ipcRenderer.invoke("printer:lineFeed", feed),
  cutPaper: () => ipcRenderer.invoke("printer:cutPaper"),
};

export default printer;
