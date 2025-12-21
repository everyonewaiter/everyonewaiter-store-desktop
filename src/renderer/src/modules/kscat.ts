import { KSCATApprovalRequest, KSCATApprovalTelegram } from "@renderer/types/modules";
import { handleError } from "@renderer/utils/handle-api-error";
import { FindJSONtoString } from "@shared/utils/string";
import $ from "jquery";

export const paymentMethod = {
  CASH: "HK",
  CARD: "IC",
} as const;

export const paymentType = {
  APPROVE: "0200",
  CANCEL: "0420",
} as const;

export const calculateTax = (
  totalAmount: number,
  vatRate: number = 10,
  serviceRate: number = 0
) => {
  const serviceAmount = calculateServiceAmount(totalAmount, serviceRate);
  const vat = calculateVat(totalAmount, serviceAmount, vatRate);
  const supplyAmount = calculateSupplyAmount(totalAmount, serviceAmount, vat);
  return { totalAmount, serviceAmount, vat, supplyAmount };
};

const calculateServiceAmount = (totalAmount: number, serviceRate: number) => {
  let result = 0;

  if (serviceRate > 0) {
    const p = 1 + serviceRate / 100.0;
    const r = totalAmount / p;
    result = totalAmount - Math.round(r);
  }

  return result;
};

const calculateVat = (totalAmount: number, serviceAmount: number, vatRate: number) => {
  let result = 0;

  if (vatRate > 0) {
    const p = 1 + vatRate / 100.0;
    const r = (totalAmount - serviceAmount) / p;
    result = totalAmount - serviceAmount - Math.round(r);
  }

  return result;
};

const calculateSupplyAmount = (totalAmount: number, serviceAmount: number, vat: number) => {
  return totalAmount - serviceAmount - vat;
};

export const kscatApproval = async ({
  deviceNo,
  method,
  type,
  amount,
  installment,
  successCallback,
  approvalNo = "            ",
  approvalDate = "      ",
}: KSCATApprovalRequest) => {
  const { totalAmount, serviceAmount, vat, supplyAmount } = calculateTax(amount);

  const requestTelegram = createRequestTelegram({
    deviceNo,
    method,
    type,
    totalAmount,
    serviceAmount,
    vat,
    supplyAmount,
    installment,
    approvalNo,
    approvalDate,
  });

  await $.ajax({
    url: "http://127.0.0.1:27098",
    type: "POST",
    dataType: "jsonp",
    jsonp: "callback",
    data: { REQ: requestTelegram },
    success: async (data) => {
      if (FindJSONtoString("RES", data) != "0000") {
        handleError(FindJSONtoString("MSG", data));
      } else {
        // 정상 승인인 경우
        if (FindJSONtoString("STATUS", data) == "O") {
          await successCallback({
            method: method === "HK" ? "CASH" : "CARD",
            amount: totalAmount,
            vat,
            supplyAmount,
            approvalNo: FindJSONtoString("APPROVALNO", data),
            installment,
            cardNo: FindJSONtoString("FILLER", data), // 카드 번호 또는 현금영수증 데이터
            issuerName: FindJSONtoString("CARDNAME", data),
            purchaseName: FindJSONtoString("PURCHASENAME", data),
            merchantNo: FindJSONtoString("MERCHANTNUMBER", data),
            tradeTime: FindJSONtoString("TRADETIME", data).substrKor(0, 6),
            tradeUniqueNo: FindJSONtoString("TRADEUNIQUENO", data),
          });
        }
      }
    },
  });
};

/**
 * 현금결제인 경우 할부개월이 현금영수증 요청임.
 * 앞자리 0: 승인, 1: 취소
 * 뒷자리 0: 개인 소득 공제, 1: 사업자 지출 증빙
 */
export const createRequestTelegram = ({
  deviceNo,
  method,
  type,
  totalAmount,
  serviceAmount,
  vat,
  supplyAmount,
  installment,
  approvalNo,
  approvalDate,
}: KSCATApprovalTelegram) => {
  let request_msg = "";
  request_msg += String.fromCharCode(2); // STX
  request_msg += method; // 거래구분
  request_msg += "01"; // 업무구분
  request_msg += type; // 전문구분
  request_msg += "N"; // 거래형태
  request_msg += deviceNo; // 단말기번호 (TEST용 : DPT0TEST03)
  request_msg += "    "; // 업체정보
  request_msg += "000000000000"; // 전문일련번호
  request_msg += " "; // Pos Entry Mode
  request_msg += "                    "; // 거래고유번호
  request_msg += "                    "; // 암호화하지않은 카드번호
  request_msg += " "; // 암호화여부
  request_msg += "                "; // SW모델번호
  request_msg += "                "; // CAT or Reader 모델번호
  request_msg += "                                        "; // 암호화정보
  request_msg += "                                     "; // 카드번호
  request_msg += String.fromCharCode(28); // FS
  request_msg += installment; // 할부개월수
  request_msg += totalAmount.toString().fillZero(12); // 총금액
  request_msg += serviceAmount.toString().fillZero(12); // 봉사료
  request_msg += vat.toString().fillZero(12); // 세금
  request_msg += supplyAmount.toString().fillZero(12); // 공급금액
  request_msg += "000000000000"; // 면세금액
  request_msg += "  "; // WorkingKey Index
  request_msg += "                "; // 비밀번호
  request_msg += approvalNo; // 원거래승인번호
  for (let i = 0; i < 12 - approvalNo.length; i++) {
    request_msg += " ";
  } // 필드 데이터가 작을 시 보완
  request_msg += approvalDate; // 원거래승인일자
  for (let i = 0; i < 6 - approvalDate.length; i++) {
    request_msg += " ";
  } // 필드 데이터가 작을 시 보완

  for (let i = 0; i < 163; i++) {
    request_msg += " ";
  } // 사용자정보~DCC
  request_msg += totalAmount > 50000 ? "F" : "X"; // 전자서명유무 (5만원 이하는 X = 무서명, 그 외엔 KSCAT 이미지 저장을 위해 "F")
  request_msg += String.fromCharCode(3); // ETX
  request_msg += String.fromCharCode(13); // CR

  const telegramLength = ("" + request_msg.length).fillZero(4); // 길이
  request_msg = telegramLength + request_msg;
  return "AP" + request_msg;
};
