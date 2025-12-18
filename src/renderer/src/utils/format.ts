import dayjs from "dayjs";

export const getFormattedTime = (time: string) => {
  const today = new Date(time);
  const ampm = today.getHours() >= 12 ? "PM" : "AM";
  const hours = today.getHours() % 12 || 12;
  const minutes = String(today.getMinutes()).padStart(2, "0");

  return `${ampm} ${hours}:${minutes}`;
};

export const getMinutesAgo = (time: string) => {
  const now = dayjs();
  const targetTime = dayjs(time);
  return now.diff(targetTime, "minute");
};

export const getFormattedTableNo = (tableNo: number) => {
  return tableNo > 10000 ? `추가-${tableNo - 10000}` : `T-${tableNo}`;
};

export const getFormattedMenuName: <T extends { name: string }>(menus: T[]) => string = (menus) => {
  if (!menus.length) return "-";
  if (menus.length === 1) return `${menus[0].name}`;
  return `${menus[0].name} 외 ${menus.length - 1}개`;
};

export const formatPrice = (value: string, standardValue: number) => {
  const numericValue = Number(value.replace(/,/g, "")) || 0;
  if (numericValue > standardValue) return null;
  return numericValue ? String(numericValue) : "";
};

export const formatPhoneNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
  const numbers = e.target.value.replace(/[^0-9]/g, "");
  const len = numbers.length;

  const [start, mid, end] = [0, 3, 7];

  if (len === 0) {
    return "";
  } else if (len <= mid) {
    return numbers;
  } else if (len <= end) {
    return `${numbers.slice(start, mid)}-${numbers.slice(mid)}`;
  } else if (len <= mid + end) {
    return `${numbers.slice(start, mid)}-${numbers.slice(mid, end - 1)}-${numbers.slice(end - 1)}`;
  } else if (len === 11) {
    return `${numbers.slice(start, mid)}-${numbers.slice(mid, end)}-${numbers.slice(end)}`;
  } else {
    const sliced = numbers.slice(0, 11);
    return `${sliced.slice(start, mid)}-${sliced.slice(mid, end)}-${sliced.slice(end)}`;
  }
};

export const formatBusinessNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
  const numbers = e.target.value.replace(/[^0-9]/g, "");
  const len = numbers.length;

  if (len === 0) {
    return "";
  } else if (len <= 3) {
    return numbers;
  } else if (len <= 5) {
    return `${numbers.slice(0, 3)}-${numbers.slice(3)}`;
  } else {
    const sliced = numbers.slice(0, 10);
    return `${sliced.slice(0, 3)}-${sliced.slice(3, 5)}-${sliced.slice(5)}`;
  }
};
