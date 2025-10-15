import x32_dll from "@resources/BXLPAPI.dll?asset&asarUnpack";
import x64_dll from "@resources/BXLPAPI_x64.dll?asset&asarUnpack";
import koffi from "koffi";

function loadLibrary() {
  if (process.platform !== "win32") {
    return null;
  }

  if (process.arch === "x64") {
    return koffi.load(x64_dll);
  } else {
    return koffi.load(x32_dll);
  }
}

const lib = loadLibrary();

const PrinterOpen = lib?.func("PrinterOpen", "int64", [
  "int32",
  "string",
  "int32",
  "int32",
  "int32",
  "int32",
  "int32",
]);

const PrinterClose = lib?.func("PrinterClose", "int64", []);

const InitializePrinter = lib?.func("InitializePrinter", "int64", []);

const GetPrinterCurrentStatus = lib?.func("GetPrinterCurrentStatus", "int64", []);

const SetInternationalCharacterSet = lib?.func("SetInterChrSet", "int64", ["int64"]);

const TransactionStart = lib?.func("TransactionStart", "int64", []);

const TransactionEnd = lib?.func("TransactionEnd", "int64", ["bool", "int64"]);

const PrintTextW = lib?.func("PrintTextW", "int64", ["str16", "int64", "int64", "int64", "int64"]);

const LineFeed = lib?.func("LineFeed", "int64", ["int32"]);

const CutPaper = lib?.func("CutPaper", "int64", []);

const NOT_SUPPORTED_OS = -9999;

function openPrinter(
  communicationInterface: number,
  portName: string,
  baudRate: number,
  dataBits: number,
  parity: number,
  stopBits: number,
  flowControl: number
): number {
  return PrinterOpen
    ? PrinterOpen(
        communicationInterface,
        portName,
        baudRate,
        dataBits,
        parity,
        stopBits,
        flowControl
      )
    : NOT_SUPPORTED_OS;
}

function closePrinter(): number {
  return PrinterClose ? PrinterClose() : NOT_SUPPORTED_OS;
}

function initializePrinter(): number {
  return InitializePrinter ? InitializePrinter() : NOT_SUPPORTED_OS;
}

function getCurrentStatus(): number {
  return GetPrinterCurrentStatus ? GetPrinterCurrentStatus() : NOT_SUPPORTED_OS;
}

function setInternationalCharacterSet(code: number): number {
  return SetInternationalCharacterSet ? SetInternationalCharacterSet(code) : NOT_SUPPORTED_OS;
}

function transactionStart(): number {
  return TransactionStart ? TransactionStart() : NOT_SUPPORTED_OS;
}

function transactionEnd(sendCompleteCheck: boolean, timeout: number): number {
  return TransactionEnd ? TransactionEnd(sendCompleteCheck, timeout) : NOT_SUPPORTED_OS;
}

function printText(
  text: string,
  alignment: number,
  attribute: number,
  size: number,
  codePage: number
): number {
  return PrintTextW ? PrintTextW(text, alignment, attribute, size, codePage) : NOT_SUPPORTED_OS;
}

function lineFeed(feed: number): number {
  return LineFeed ? LineFeed(feed) : NOT_SUPPORTED_OS;
}

function cutPaper(): number {
  return CutPaper ? CutPaper() : NOT_SUPPORTED_OS;
}

export {
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
};
