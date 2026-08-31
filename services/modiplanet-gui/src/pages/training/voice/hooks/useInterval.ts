import { useEffect, useRef, useState } from 'react';

interface IUseInterval {
  (callback: () => void, interval: number): {
    stopInterval: () => void;
    startInterval: () => void;
  };
}

export const useInterval: IUseInterval = (callback, interval) => {
  const [isRunning, setIsRunning] = useState(false);
  const savedCallback = useRef<() => void>();

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    if (!isRunning) return;

    function tick() {
      if (savedCallback.current) {
        savedCallback.current();
      }
    }

    const id = setInterval(tick, interval);
    return () => clearInterval(id);
  }, [interval, isRunning]);

  const stopInterval = () => {
    setIsRunning(false);
  };

  const startInterval = () => {
    setIsRunning(true);
  };

  return { stopInterval, startInterval };
};
