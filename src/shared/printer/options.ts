export const PrinterInterface = {
  SERIAL: 0,
  PARALLEL: 1,
  USB: 2,
  LAN: 3,
  WLAN: 4,
  BLUETOOTH: 5,
} as const;

export const InternationalCharacterSetCode = {
  USA: 0,
  FRANCE: 1,
  GERMANY: 2,
  UK: 3,
  DENMARK1: 4,
  SWEDEN: 5,
  ITALY: 6,
  SPAIN1: 7,
  JAPAN: 8,
  NORWAY: 9,
  DENMARK2: 10,
  SPAIN2: 11,
  LATIN: 12,
  KOREA: 13,
  SLOVENIA: 14,
  CHINA: 15,
} as const;

export const TextAlign = {
  LEFT: 0,
  CENTER: 1,
  RIGHT: 2,
} as const;

export const TextAttribute = {
  DEFAULT: 0, // 글꼴 A
  FONTB: 1, // 글꼴 B
  BOLD: 2, // 굵게 인쇄
  UNDERLINE: 4, // 밑줄 추가 (1 dot)
  UNDERTHICK: 6, // 밑줄 추가 (12 dot)
  REVERSE: 8, // 반전 인쇄
  FONTC: 16, // 글꼴 C
  RED_COLOR: 64, // 붉은색으로 인쇄
} as const;

export const TextSize = {
  WIDTH0: 0, // 문자 너비 x1
  WIDTH1: 16, // 문자 너비 x2
  WIDTH2: 32, // 문자 너비 x3
  WIDTH3: 48, // 문자 너비 x4
  WIDTH4: 64, // 문자 너비 x5
  WIDTH5: 80, // 문자 너비 x6
  WIDTH6: 96, // 문자 너비 x7
  WIDTH7: 112, // 문자 너비 x8
  HEIGHT0: 0, // 문자 높이 x1
  HEIGHT1: 1, // 문자 높이 x2
  HEIGHT2: 2, // 문자 높이 x3
  HEIGHT3: 3, // 문자 높이 x4
  HEIGHT4: 4, // 문자 높이 x5
  HEIGHT5: 5, // 문자 높이 x6
  HEIGHT6: 6, // 문자 높이 x7
  HEIGHT7: 7, // 문자 높이 x8
} as const;
