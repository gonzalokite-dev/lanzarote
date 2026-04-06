'use client';

import { useState, useEffect } from 'react';

export interface WeatherData {
  temp: number;
  feelsLike: number;
  condition: string;
  icon: string;
  windSpeed: number;
  humidity: number;
}

export function useWeather() {
  const [data, setData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const key = process.env.NEXT_PUBLIC_WEATHER_KEY;
    if (!key) {
      setLoading(false);
      setError(true);
      return;
    }
    // Lanzarote (Arrecife) lat/lon
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=28.9636&lon=-13.5476&units=metric&lang=es&appid=${key}`)
      .then((r) => {
        if (!r.ok) throw new Error('weather fetch failed');
        return r.json();
      })
      .then((d) => {
        setData({
          temp: Math.round(d.main.temp),
          feelsLike: Math.round(d.main.feels_like),
          condition: d.weather[0].description,
          icon: d.weather[0].icon,
          windSpeed: Math.round(d.wind.speed * 3.6), // m/s → km/h
          humidity: d.main.humidity,
        });
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, []);

  return { data, loading, error };
}
