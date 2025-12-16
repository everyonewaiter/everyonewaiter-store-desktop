import { useEffect, useState } from "react";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";

dayjs.extend(duration);

const calcElapsedTime = (orderedAt: string | null) => {
  if (!orderedAt) return "";
  return dayjs.duration(dayjs().diff(dayjs(orderedAt))).format("HH:mm:ss");
};

export const usePosTablesElapsedTime = (orderedAt: string | null) => {
  const [elapsedTime, setElapsedTime] = useState(() => calcElapsedTime(orderedAt));

  useEffect(() => {
    if (!orderedAt) return;

    const interval = setInterval(() => {
      setElapsedTime(calcElapsedTime(orderedAt));
    }, 1000);

    return () => clearInterval(interval);
  }, [orderedAt]);

  return { elapsedTime };
};
