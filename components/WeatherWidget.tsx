'use client';

import { useWeather } from '@/lib/useWeather';

export default function WeatherWidget() {
  const { data, loading, error } = useWeather();

  if (error) return null;

  return (
    <div className="glass rounded-2xl px-4 py-3 min-w-[160px]">
      {loading ? (
        <div className="flex flex-col gap-2">
          <div className="h-3 w-20 rounded" style={{ background: 'var(--muted)', opacity: 0.3 }} />
          <div className="h-6 w-14 rounded" style={{ background: 'var(--muted)', opacity: 0.3 }} />
          <div className="h-3 w-24 rounded" style={{ background: 'var(--muted)', opacity: 0.3 }} />
        </div>
      ) : data ? (
        <div className="flex flex-col gap-0.5">
          <p className="font-space-mono text-[10px] tracking-widest uppercase" style={{ color: 'var(--muted)' }}>
            Lanzarote ahora
          </p>
          <div className="flex items-center gap-2 mt-0.5">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`https://openweathermap.org/img/wn/${data.icon}.png`}
              alt={data.condition}
              width={36}
              height={36}
              className="drop-shadow"
            />
            <span className="font-playfair text-2xl font-bold" style={{ color: 'var(--text)' }}>
              {data.temp}°C
            </span>
          </div>
          <p className="font-space-mono text-[10px] capitalize" style={{ color: 'var(--muted)' }}>
            {data.condition}
          </p>
          <div className="flex items-center gap-1 mt-1">
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ color: 'var(--secondary)' }}>
              <path d="M9.59 4.59A2 2 0 1 1 11 8H2m10.59 11.41A2 2 0 1 0 14 16H2m15.73-8.27A2.5 2.5 0 1 1 19.5 12H2"/>
            </svg>
            <span className="font-space-mono text-[10px]" style={{ color: 'var(--muted)' }}>
              {data.windSpeed} km/h
            </span>
            <span className="font-space-mono text-[10px] ml-1" style={{ color: 'var(--muted)' }}>
              · {data.humidity}% hum.
            </span>
          </div>
        </div>
      ) : null}
    </div>
  );
}
