'use client';

import { motion } from 'framer-motion';
import type { Activity, Category } from '@/lib/tripData';

const categoryIcons: Record<Category | 'hotel', { icon: JSX.Element; color: string; label: string }> = {
  hotel: {
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
        <polyline points="9 22 9 12 15 12 15 22"/>
      </svg>
    ),
    color: '#a78bfa',
    label: 'Hotel',
  },
  restaurant: {
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M18 8h1a4 4 0 0 1 0 8h-1"/><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/>
        <line x1="6" y1="1" x2="6" y2="4"/><line x1="10" y1="1" x2="10" y2="4"/><line x1="14" y1="1" x2="14" y2="4"/>
      </svg>
    ),
    color: '#f97316',
    label: 'Restaurante',
  },
  beach: {
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6"/>
        <path d="M2.5 18.5s2-4 7.5-4 7.5 4 7.5 4"/>
        <path d="M12 2v4"/><path d="M4.93 4.93l2.83 2.83"/><path d="M19.07 4.93l-2.83 2.83"/>
      </svg>
    ),
    color: '#2dd4bf',
    label: 'Playa',
  },
  culture: {
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/>
        <line x1="6" y1="20" x2="6" y2="14"/><line x1="2" y1="20" x2="22" y2="20"/>
      </svg>
    ),
    color: '#fbbf24',
    label: 'Cultura',
  },
  activity: {
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
      </svg>
    ),
    color: '#34d399',
    label: 'Actividad',
  },
};

interface Props {
  activity: Activity;
  index: number;
  isFiltered: boolean;
}

export default function ActivityItem({ activity, index, isFiltered }: Props) {
  const meta = categoryIcons[activity.category] ?? categoryIcons.activity;

  const handleBook = () => {
    const query = encodeURIComponent(`${activity.name} Lanzarote`);
    window.open(`https://www.google.com/maps/search/${query}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: isFiltered ? 0.2 : 1, x: 0 }}
      transition={{ delay: index * 0.06 }}
      className="flex gap-4 py-4 group"
      style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}
    >
      {/* Time */}
      <div className="shrink-0 w-14 pt-0.5">
        <span className="font-space-mono text-xs" style={{ color: 'var(--primary)' }}>
          {activity.time}
        </span>
      </div>

      {/* Icon */}
      <div
        className="shrink-0 w-8 h-8 rounded-lg flex items-center justify-center mt-0.5"
        style={{ background: `${meta.color}18`, color: meta.color, border: `1px solid ${meta.color}30` }}
      >
        {meta.icon}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2 flex-wrap">
          <div>
            <h4 className="font-inter font-semibold text-sm leading-snug" style={{ color: 'var(--text)' }}>
              {activity.name}
              {activity.mustBook && (
                <span
                  className="ml-2 inline-block text-[9px] font-space-mono font-bold px-1.5 py-0.5 rounded-full align-middle"
                  style={{ background: 'rgba(232,98,42,0.15)', color: 'var(--primary)', border: '1px solid rgba(232,98,42,0.3)' }}
                >
                  RESERVA
                </span>
              )}
            </h4>
            <p className="text-xs mt-1 leading-relaxed" style={{ color: 'var(--muted)' }}>
              {activity.description}
            </p>
            {activity.phone && (
              <a
                href={`tel:${activity.phone}`}
                className="font-space-mono text-[10px] mt-1 inline-block transition-opacity hover:opacity-80"
                style={{ color: 'var(--secondary)' }}
              >
                {activity.phone}
              </a>
            )}
          </div>
          {activity.category === 'restaurant' || activity.category === 'activity' || activity.category === 'culture' ? (
            <button
              onClick={handleBook}
              className="shrink-0 text-xs font-space-mono px-3 py-1.5 rounded-lg transition-all hover:opacity-90 active:scale-95"
              style={{
                background: 'rgba(232,98,42,0.1)',
                color: 'var(--primary)',
                border: '1px solid rgba(232,98,42,0.3)',
              }}
            >
              Ver →
            </button>
          ) : null}
        </div>
      </div>
    </motion.div>
  );
}
