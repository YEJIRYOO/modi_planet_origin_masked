import { useState, useEffect } from 'react';

export default function Timer({
  onFinishTimer,
}: {
  onFinishTimer?: () => void;
}) {
  const MINUTES_IN_MS = 5 * 60 * 1000;
  const INTERVAL = 1000;
  const [timeLeft, setTimeLeft] = useState<number>(MINUTES_IN_MS);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => Math.max(0, prevTime - INTERVAL));
    }, INTERVAL);

    if (timeLeft <= 0) {
      onFinishTimer && onFinishTimer();
      clearInterval(timer);
    }

    return () => {
      clearInterval(timer);
    };
  }, [timeLeft]);

  const minutes = String(Math.floor((timeLeft / (1000 * 60)) % 60)).padStart(
    2,
    '0',
  );
  const seconds = String(Math.floor((timeLeft / 1000) % 60)).padStart(2, '0');

  return timeLeft > 0 ? (
    <div className="text-sm text-[#FF4547] text-end whitespace-nowrap">
      {minutes} : {seconds}
    </div>
  ) : null;
}
