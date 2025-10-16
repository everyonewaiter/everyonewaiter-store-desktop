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

export const CodePage = {
  PC437: 0, // 영어 (PC437)
  PC850: 2, // 서유럽 (PC850)
  PC860: 3, // 포르투갈어 (PC860)
  PC863: 4, // 캐나다 프랑스어 (PC863)
  PC865: 5, // 노르웨이어 (PC865)
  WPC1252: 16, // 라틴어1 (1252)
  PC866: 17, // 키릴어 (PC866)
  PC852: 18, // 라틴어2 (PC852)
  PC858: 19, // 서유럽 (PC858)
  PC862: 21, // 히브리어 (PC862)
  THAI42: 23, // 태국어 (THAI42)
  WPC1253: 24, // 그리스어 (WPC1253)
  WPC1254: 25, // 터키어 (WPC1254)
  WPC1257: 26, // 발틱어 (WPC1257)
  WPC1251: 28, // 키릴어 (WPC1251)
  PC737: 29, // 그리스어 (PC737)
  PC775: 30, // 발틱어 (PC775)
  THAI14: 31, // 태국어 (THAI14)
  WPC1255: 33, // 히브리어 (WPC1255)
  THAI11: 34, // 태국어 (THAI11)
  THAI18: 35, // 태국어 (THAI18)
  PC855: 36, // 키릴어 (PC855)
  PC857: 37, // 터키어 (PC857)
  PC928: 38, // 그리스어 (PC928)
  THAI16: 39, // 태국어 (THAI16)
  PC1258: 41, // 베트남어 (PC1258)
  PC1250: 47, // 체코어 (PC1250)
  LATIN9: 48, // 라틴어9 (Latin 9)
  TCVN: 49, // 베트남어 (TCVN-3)
  TCVN_CAPITAL: 50, // 베트남어 (TCVN-3 CAPITAL)
  VISCII: 51, // 베트남어 (VISCII)
  KS5601: 949, // 한국어 (KS5601)
  BIG5: 950, // 중국어 (BIG5)
  GB2312: 936, // 중국어 (GB2312)
  SHIFT_JIS: 932, // 일본어 (Shift JIS)
} as const;
