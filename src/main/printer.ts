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

export const printerOpen = lib?.func("PrinterOpen", "int64", [
  "int32",
  "string",
  "int32",
  "int32",
  "int32",
  "int32",
  "int32",
]);

export const printerClose = lib?.func("PrinterClose", "int64", []);

export const initializePrinter = lib?.func("InitializePrinter", "int64", []);

export const getPrinterCurrentStatus = lib?.func("GetPrinterCurrentStatus", "int64", []);

export const setInternationalCharacterSet = lib?.func("SetInterChrSet", "int64", ["int64"]);

export const transactionStart = lib?.func("TransactionStart", "int64", []);

export const transactionEnd = lib?.func("TransactionEnd", "int64", ["bool", "int64"]);

export const printText = lib?.func("PrintText", "int64", ["string", "int64", "int64", "int64"]);

export const lineFeed = lib?.func("LineFeed", "int64", ["int32"]);

export const cutPaper = lib?.func("CutPaper", "int64", []);
