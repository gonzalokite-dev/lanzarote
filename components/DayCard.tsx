'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ActivityItem from './ActivityItem';
import { useLocalStorage } from '@/lib/useLocalStorage';
import type { TripDay } from '@/lib/tripData';

const categoryColors: Record<string, string> = {
  restaurant: '#f97316',
  beach: '#2dd4bf',
  culture: '#fbbf24',
  activity: '#34d399',
  hotel: '#a78bfa',
};

// Each day gets a unique volcanic gradient
const dayGradients = [
  'linear-gradient(135deg, #1a0800 0%, #3d1500 40%, #0d1a18 100%)', // D1 — deep lava dusk
  'linear-gradient(135deg, #0a0a0a 0%, #1a1200 50%, #001a14 100%)', // D2 — cave night
  'linear-gradient(135deg, #200800 0%, #5c1a00 45%, #1a0a00 100%)', // D3 — Timanfaya red
  'linear-gradient(135deg, #080d0d 0%, #0d2020 50%, #1a1000 100%)', // D4 — Manrique teal
  'linear-gradient(135deg, #001a1a 0%, #003333 45%, #001420 100%)', // D5 — Papagayo turquoise
  'linear-gradient(135deg, #100800 0%, #2d1800 40%, #001418 100%)', // D6 — Puerto del Carmen
  'linear-gradient(135deg, #0a0800 0%, #1f1000 40%, #0d1a1a 100%)', // D7 — farewell sunset
];

const dayEmojis = ['🛬', '🌋', '🔥', '🎨', '🏖️', '🌊', '✈️'];

interface Props {
  day: TripDay;
  side: 'left' | 'right';
  activeFilter: string;
  isHighlighted: boolean;
}

export default function DayCard({ day, side, activeFilter, isHighlighted }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [notes, setNotes] = useLocalStorage<string>(`notes_day_${day.day}`, '');
  const [saved, setSaved] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  const categories = Array.from(new Set(day.activities.map((a) => a.category)));
  const gradient = dayGradients[(day.day - 1) % dayGradients.length];
  const emoji = dayEmojis[(day.day - 1) % dayEmojis.length];

  const handleNotesChange = (val: string) => {
    setNotes(val);
    setSaved(false);
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
    }
  };

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
    }
  }, [isOpen]);

  useEffect(() => {
    if (saved) {
      const t = setTimeout(() => setSaved(false), 2000);
      return () => clearTimeout(t);
    }
  }, [saved]);

  const hasFilterMatch = activeFilter === 'all' || day.activities.some((a) => a.category === activeFilter);

  const pad = 0.04;
  const { lat, lng } = day.coordinates;
  const mapsUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${lng - pad},${lat - pad},${lng + pad},${lat + pad}&layer=mapnik&marker=${lat},${lng}`;

  return (
    <motion.div
      ref={cardRef}
      layout
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={`relative w-full md:w-[calc(50%-2rem)] ${
        side === 'left' ? 'md:mr-auto md:pr-8' : 'md:ml-auto md:pl-8'
      } ${!hasFilterMatch ? 'opacity-30' : ''}`}
      style={{ transition: 'opacity 0.3s ease' }}
      id={`day-${day.day}`}
    >
      <div
        className="grad-border rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 hover:translate-y-[-2px]"
        style={{
          background: 'var(--card)',
          boxShadow: isHighlighted
            ? '0 0 30px rgba(232,98,42,0.3), 0 20px 40px rgba(0,0,0,0.4), 0 0 0 2px var(--primary)'
            : '0 8px 32px rgba(0,0,0,0.3)',
        }}
        onClick={() => setIsOpen(!isOpen)}
      >
        {/* ── Hero: gradient + typography ── */}
        <div
          className="relative h-44 sm:h-52 overflow-hidden flex flex-col justify-between p-5 sm:p-6"
          style={{ background: gradient }}
        >
          {/* Noise texture */}
          <div
            className="absolute inset-0 opacity-[0.06] pointer-events-none"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
              backgroundSize: '200px',
            }}
          />

          {/* Top row */}
          <div className="relative flex items-center justify-between">
            <span
              className="font-space-mono text-xs font-bold px-3 py-1.5 rounded-full"
              style={{ background: 'var(--primary)', color: '#fff' }}
            >
              D{day.day}
            </span>
            <div className="flex gap-1.5 flex-wrap justify-end">
              {categories.map((cat) => (
                <span
                  key={cat}
                  className="font-space-mono text-[10px] font-bold px-2 py-1 rounded-full"
                  style={{
                    background: `${categoryColors[cat]}22`,
                    color: categoryColors[cat],
                    border: `1px solid ${categoryColors[cat]}44`,
                  }}
                >
                  {cat === 'restaurant' ? '🍽' : cat === 'beach' ? '🏖' : cat === 'culture' ? '🏛' : cat === 'activity' ? '⭐' : '🏨'}
                </span>
              ))}
            </div>
          </div>

          {/* Center: big emoji + day number */}
          <div className="relative flex-1 flex items-center justify-center">
            <span
              className="font-playfair font-black select-none pointer-events-none"
              style={{
                fontSize: 'clamp(4rem, 12vw, 7rem)',
                color: 'rgba(255,255,255,0.06)',
                lineHeight: 1,
                letterSpacing: '-0.04em',
                position: 'absolute',
                right: '0.5rem',
                bottom: '-0.5rem',
              }}
            >
              {String(day.day).padStart(2, '0')}
            </span>
            <span style={{ fontSize: '2.5rem' }}>{emoji}</span>
          </div>

          {/* Bottom: date + title */}
          <div className="relative">
            <p className="font-space-mono text-xs tracking-widest mb-1" style={{ color: 'var(--secondary)' }}>
              {day.label}
            </p>
            <h3 className="font-playfair text-xl sm:text-2xl font-bold leading-tight" style={{ color: '#f5f0e8' }}>
              {day.title}
            </h3>
          </div>
        </div>

        {/* ── Collapsed preview ── */}
        {!isOpen && (
          <div className="px-5 py-4 flex items-center justify-between">
            <p className="text-sm" style={{ color: 'var(--muted)' }}>
              {day.activities.length} {day.activities.length === 1 ? 'actividad' : 'actividades'}
            </p>
            <div className="flex items-center gap-2">
              <span className="font-space-mono text-xs" style={{ color: 'var(--muted)' }}>Ver plan</span>
              <div
                className="w-6 h-6 rounded-full flex items-center justify-center"
                style={{ background: 'rgba(232,98,42,0.15)', color: 'var(--primary)' }}
              >
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                  <polyline points="6 9 12 15 18 9"/>
                </svg>
              </div>
            </div>
          </div>
        )}

        {/* ── Expanded content ── */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              key="content"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              style={{ overflow: 'hidden' }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="px-5 pb-6">
                {/* Collapse toggle */}
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-full flex items-center justify-between py-3 mb-2"
                  style={{ borderBottom: '1px solid var(--border)' }}
                >
                  <span className="font-space-mono text-xs tracking-wider" style={{ color: 'var(--muted)' }}>
                    Plan del día
                  </span>
                  <div
                    className="w-6 h-6 rounded-full flex items-center justify-center"
                    style={{ background: 'rgba(232,98,42,0.15)', color: 'var(--primary)' }}
                  >
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                      <polyline points="18 15 12 9 6 15"/>
                    </svg>
                  </div>
                </button>

                {/* Activities */}
                <div className="divide-y divide-white/5">
                  {day.activities.map((activity, i) => (
                    <ActivityItem
                      key={i}
                      activity={activity}
                      index={i}
                      isFiltered={activeFilter !== 'all' && activity.category !== activeFilter}
                    />
                  ))}
                </div>

                {/* Mini map */}
                <div className="mt-6 rounded-xl overflow-hidden" style={{ height: '200px', border: '1px solid var(--border)' }}>
                  <iframe
                    src={mapsUrl}
                    width="100%"
                    height="200"
                    style={{ border: 0 }}
                    loading="lazy"
                    title={`Mapa ${day.title}`}
                  />
                </div>

                {/* Notes */}
                <div className="mt-6">
                  <div className="flex items-center justify-between mb-2">
                    <p className="font-space-mono text-xs tracking-wider uppercase" style={{ color: 'var(--muted)' }}>
                      📝 Notas
                    </p>
                    {saved && (
                      <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="font-space-mono text-[10px]"
                        style={{ color: 'var(--secondary)' }}
                      >
                        ✓ Guardado
                      </motion.span>
                    )}
                  </div>
                  <textarea
                    ref={textareaRef}
                    value={notes}
                    onChange={(e) => handleNotesChange(e.target.value)}
                    onBlur={() => setSaved(true)}
                    placeholder="Añade tus notas para este día..."
                    className="w-full rounded-xl p-3 text-sm font-inter outline-none min-h-[80px] transition-all duration-200"
                    style={{
                      background: 'rgba(255,255,255,0.04)',
                      border: '1px solid var(--border)',
                      color: 'var(--text)',
                    }}
                  />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
