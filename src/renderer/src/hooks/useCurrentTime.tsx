import { useEffect, useState } from "react";
import dayjs, { Dayjs } from "dayjs";

export function useCurrentTime(intervalMs: number = 1000): { date: Dayjs } {
  const [date, setDate] = useState(dayjs());

  useEffect(() => {
    const interval = setInterval(() => {
      setDate(dayjs());
    }, intervalMs);

    return () => clearInterval(interval);
  }, [intervalMs]);

  return { date };
}
