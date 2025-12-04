import { useEffect, useRef } from "react";

const useInterval = (callback: () => void, delay: number | null) => {
  const savedCallback = useRef(callback);

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    if (typeof delay !== "number" || delay < 0) {
      return;
    }

    const intervalId = setInterval(() => {
      savedCallback.current();
    }, delay);

    return () => clearInterval(intervalId);
  }, [delay]);
};

export default useInterval;
