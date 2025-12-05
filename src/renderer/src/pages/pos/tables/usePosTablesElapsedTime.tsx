import { useEffect, useState } from "react";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";

dayjs.extend(duration);

export const usePosTablesElapsedTime = (orderedAt: string | null) => {
  const [elapsedTime, setElapsedTime] = useState("");

  useEffect(() => {
    if (!orderedAt) return;
    const ordered = dayjs(orderedAt);

    const interval = setInterval(() => {
      const now = dayjs();
      setElapsedTime(dayjs.duration(now.diff(ordered)).format("HH:mm:ss"));
    }, 1000);

    return () => clearInterval(interval);
  }, [orderedAt]);

  return { elapsedTime };
};
