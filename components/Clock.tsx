'use client';

import { useEffect, useState } from 'react';

export default function Clock() {
  const [time, setTime] = useState<string>('');

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString('bn-BD'));
    };

    tick(); // প্রথম render ঠিক থাকবে
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, []);

  return <p className="text-2xl font-bold">{time}</p>;
}
