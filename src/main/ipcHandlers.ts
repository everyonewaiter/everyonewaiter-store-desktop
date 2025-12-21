import {
  closePrinter,
  cutPaper,
  getCurrentStatus,
  initializePrinter,
  lineFeed,
  openPrinter,
  printText,
  setInternationalCharacterSet,
  transactionEnd,
  transactionStart,
} from "@main/printer";
import { deleteDeviceInfo, getDeviceInfo, storeStorage } from "@main/storage";
import printerChannel from "@shared/printer/channel";
import storageChannel from "@shared/storage/channel";
import { ipcMain } from "electron";
import "dotenv/config";

function registerPrinterHandlers() {
  ipcMain.handle(printerChannel.OPEN, (_, ...args: Parameters<typeof openPrinter>) =>
    openPrinter(...args)
  );
  ipcMain.handle(printerChannel.CLOSE, () => closePrinter());
  ipcMain.handle(printerChannel.INITIALIZE, () => initializePrinter());
  ipcMain.handle(printerChannel.GET_CURRENT_STATUS, () => getCurrentStatus());
  ipcMain.handle(printerChannel.SET_INTERNATIONAL_CHARACTER_SET, (_, code: number) =>
    setInternationalCharacterSet(code)
  );
  ipcMain.handle(printerChannel.TRANSACTION_START, () => transactionStart());
  ipcMain.handle(printerChannel.TRANSACTION_END, (_, sendCompleteCheck: boolean, timeout: number) =>
    transactionEnd(sendCompleteCheck, timeout)
  );
  ipcMain.handle(printerChannel.PRINT_TEXT, (_, ...args: Parameters<typeof printText>) =>
    printText(...args)
  );
  ipcMain.handle(printerChannel.LINE_FEED, (_, feed: number) => lineFeed(feed));
  ipcMain.handle(printerChannel.CUT_PAPER, () => cutPaper());
}

function registerDeviceHandlers() {
  ipcMain.handle(storageChannel.STORE, (_, key: string, value: string) => storeStorage(key, value));
  ipcMain.handle(storageChannel.GET_DEVICE_INFO, () => getDeviceInfo());
  ipcMain.handle(storageChannel.DELETE_DEVICE_INFO, () => deleteDeviceInfo());
}

function registerIpcHandlers() {
  registerPrinterHandlers();
  registerDeviceHandlers();
}

export default registerIpcHandlers;
