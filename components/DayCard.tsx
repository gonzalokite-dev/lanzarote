'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import ActivityItem from './ActivityItem';
import { useLocalStorage } from '@/lib/useLocalStorage';
import type { TripDay, Category } from '@/lib/tripData';

const categoryColors: Record<string, string> = {
  restaurant: '#f97316',
  beach: '#2dd4bf',
  culture: '#fbbf24',
  activity: '#34d399',
  hotel: '#a78bfa',
};

const dayLabels = ['LUN', 'MAR', 'MIÉ', 'JUE', 'VIE', 'SAB', 'DOM'];

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

  const filteredActivities = day.activities.filter((a) => {
    if (activeFilter === 'all') return true;
    return a.category === activeFilter;
  });

  const hasFilterMatch = activeFilter === 'all' || day.activities.some((a) => a.category === activeFilter);

  const mapsUrl = `https://www.google.com/maps/embed/v1/view?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY || ''}&center=${day.coordinates.lat},${day.coordinates.lng}&zoom=13&maptype=satellite`;

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
        className={`grad-border rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 hover:translate-y-[-2px] ${
          isHighlighted ? 'ring-2 ring-offset-2' : ''
        }`}
        style={{
          background: 'var(--card)',
          boxShadow: isHighlighted
            ? '0 0 30px rgba(232,98,42,0.3), 0 20px 40px rgba(0,0,0,0.4), 0 0 0 2px var(--primary)'
            : '0 8px 32px rgba(0,0,0,0.3)',
        }}
        onClick={() => setIsOpen(!isOpen)}
      >
        {/* Hero image */}
        <div className="relative h-52 sm:h-64 overflow-hidden group/img">
          <Image
            src={day.heroImage}
            alt={day.title}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover transition-transform duration-[1200ms] ease-out scale-105 group-hover/img:scale-110"
            loading="lazy"
          />
          {/* Rich gradient overlay */}
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(
                to bottom,
                rgba(10,10,10,0.05) 0%,
                rgba(10,10,10,0.15) 35%,
                rgba(10,10,10,0.85) 100%
              )`,
            }}
          />
          {/* Subtle color tint */}
          <div
            className="absolute inset-0 opacity-30"
            style={{
              background: 'linear-gradient(135deg, rgba(232,98,42,0.2) 0%, rgba(45,212,191,0.1) 100%)',
              mixBlendMode: 'overlay',
            }}
          />

          {/* Day badge */}
          <div
            className="absolute top-4 left-4 font-space-mono text-xs font-bold px-3 py-1.5 rounded-full"
            style={{ background: 'var(--primary)', color: '#fff' }}
          >
            D{day.day}
          </div>

          {/* Category pills */}
          <div className="absolute top-4 right-4 flex gap-1.5 flex-wrap justify-end">
            {categories.map((cat) => (
              <span
                key={cat}
                className="font-space-mono text-[10px] font-bold px-2 py-1 rounded-full capitalize"
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

          {/* Title overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-5">
            <p className="font-space-mono text-xs tracking-widest mb-1" style={{ color: 'var(--secondary)' }}>
              {day.label}
            </p>
            <h3 className="font-playfair text-xl sm:text-2xl font-bold" style={{ color: '#f5f0e8' }}>
              {day.title}
            </h3>
          </div>
        </div>

        {/* Activity preview (closed state) */}
        {!isOpen && (
          <div className="px-5 py-4 flex items-center justify-between">
            <p className="text-sm" style={{ color: 'var(--muted)' }}>
              {day.activities.length} {day.activities.length === 1 ? 'actividad' : 'actividades'}
            </p>
            <div className="flex items-center gap-2">
              <span className="font-space-mono text-xs" style={{ color: 'var(--muted)' }}>
                Ver plan
              </span>
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

        {/* Expanded content */}
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
                {process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY ? (
                  <div className="mt-6 rounded-xl overflow-hidden" style={{ height: '200px' }}>
                    <iframe
                      src={mapsUrl}
                      width="100%"
                      height="200"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title={`Mapa ${day.title}`}
                    />
                  </div>
                ) : (
                  <div
                    className="mt-6 rounded-xl flex items-center justify-center"
                    style={{ height: '180px', background: 'rgba(255,255,255,0.03)', border: '1px dashed var(--border)' }}
                  >
                    <div className="text-center">
                      <p className="font-space-mono text-xs" style={{ color: 'var(--muted)' }}>
                        {day.coordinates.lat.toFixed(4)}°N · {Math.abs(day.coordinates.lng).toFixed(4)}°W
                      </p>
                      <p className="font-space-mono text-[10px] mt-1" style={{ color: 'var(--muted)', opacity: 0.5 }}>
                        Añade NEXT_PUBLIC_GOOGLE_MAPS_KEY para ver el mapa
                      </p>
                    </div>
                  </div>
                )}

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
                        exit={{ opacity: 0 }}
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
                    className="w-full rounded-xl p-3 text-sm font-inter transition-all duration-200 outline-none min-h-[80px]"
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
