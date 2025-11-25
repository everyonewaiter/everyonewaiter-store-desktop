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
import printerChannel from "@shared/printer/channel";
import { ipcMain } from "electron";
import keytar from "keytar";
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
  const SERVICE = process.env.KEYTAR_SERVICE || "everyonewaiter-store-desktop";
  const DEVICE_ACCOUNT = "device-id";
  const SECRET_ACCOUNT = "secret-key";
  const DEVICE_TYPE_ACCOUNT = "device-type";

  // 저장
  ipcMain.handle("store-device-info", async (_, { deviceId, secretKey, deviceType }) => {
    await keytar.setPassword(SERVICE, DEVICE_ACCOUNT, deviceId);
    await keytar.setPassword(SERVICE, SECRET_ACCOUNT, secretKey);
    await keytar.setPassword(SERVICE, DEVICE_TYPE_ACCOUNT, deviceType);
    return true;
  });

  // 조회
  ipcMain.handle("get-device-info", async () => {
    const deviceId = await keytar.getPassword(SERVICE, DEVICE_ACCOUNT);
    const secretKey = await keytar.getPassword(SERVICE, SECRET_ACCOUNT);
    const deviceType = await keytar.getPassword(SERVICE, DEVICE_TYPE_ACCOUNT);
    return { deviceId, secretKey, deviceType };
  });

  // 삭제
  ipcMain.handle("delete-device-info", async () => {
    await keytar.deletePassword(SERVICE, DEVICE_ACCOUNT);
    await keytar.deletePassword(SERVICE, SECRET_ACCOUNT);
    await keytar.deletePassword(SERVICE, DEVICE_TYPE_ACCOUNT);
    return true;
  });
}

function registerIpcHandlers() {
  registerPrinterHandlers();
  registerDeviceHandlers();
}

export default registerIpcHandlers;
