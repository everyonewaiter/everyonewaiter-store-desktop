import { useEffect, useRef, useState } from "react";

export default function useDeviceRemainingTime({ isSubmitted }: { isSubmitted: boolean }) {
  const INIT_NUMBER = 300;

  const [remainingTime, setRemainingTime] = useState(INIT_NUMBER);

  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const resetInterval = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const startInterval = () => {
    resetInterval();
    intervalRef.current = setInterval(() => {
      setRemainingTime((prev) => {
        if (prev <= 1) {
          resetInterval();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  useEffect(() => {
    if (!isSubmitted) {
      resetInterval();
      return;
    }

    if (remainingTime > 0) startInterval();

    return () => resetInterval();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSubmitted]);

  const setTime = (value: number) => {
    setRemainingTime(value);
    if (isSubmitted && value > 0) startInterval();
  };

  const setInitTime = () => {
    setRemainingTime(INIT_NUMBER);
    if (isSubmitted) startInterval();
  };

  return {
    time: { get: () => remainingTime, set: setTime },
    resetInterval,
    setInitTime,
  };
}
