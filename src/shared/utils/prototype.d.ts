declare global {
  interface String {
    fillZero(n: number): string;
    fillSpace(n: number): string;
    byteLength(): number;
    substrKor(idx: number, len: number): string;
  }
}

export {};
