'use client';

import { useState, useEffect } from 'react';

export interface CountdownResult {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  tripDay: number | null; // 1-7 if trip is ongoing
  isOver: boolean;
  hasStarted: boolean;
}

const TRIP_START = new Date('2026-04-19T00:00:00');
const TRIP_END = new Date('2026-04-25T23:59:59');

export function useCountdown(): CountdownResult {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const interval = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const isOver = now > TRIP_END;
  const hasStarted = now >= TRIP_START;

  if (isOver) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, tripDay: null, isOver: true, hasStarted: true };
  }

  if (hasStarted) {
    const daysDiff = Math.floor((now.getTime() - TRIP_START.getTime()) / (1000 * 60 * 60 * 24));
    const tripDay = Math.min(daysDiff + 1, 7);
    return { days: 0, hours: 0, minutes: 0, seconds: 0, tripDay, isOver: false, hasStarted: true };
  }

  const diff = TRIP_START.getTime() - now.getTime();
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
    seconds: Math.floor((diff % (1000 * 60)) / 1000),
    tripDay: null,
    isOver: false,
    hasStarted: false,
  };
}
