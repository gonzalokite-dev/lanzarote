'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface NavigationProps {
  activeFilter: string;
  setActiveFilter: (f: string) => void;
  isDark: boolean;
  toggleTheme: () => void;
}

const filters = [
  { id: 'all', label: 'Todo' },
  { id: 'restaurant', label: 'Restaurantes' },
  { id: 'beach', label: 'Playas' },
  { id: 'culture', label: 'Cultura' },
  { id: 'activity', label: 'Actividades' },
];

export default function Navigation({ activeFilter, setActiveFilter, isDark, toggleTheme }: NavigationProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'glass shadow-lg shadow-black/20' : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
          {/* Logo */}
          <div className="flex items-center gap-2.5 shrink-0">
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden>
              <ellipse cx="14" cy="19" rx="11" ry="6" fill="rgba(232,98,42,0.15)" stroke="#e8622a" strokeWidth="1.2"/>
              <path d="M14 4 L8 19 L14 16 L20 19 Z" fill="#e8622a" opacity="0.85"/>
              <path d="M11 12 L14 4 L17 12" fill="#c94d18"/>
              <circle cx="14" cy="19" r="2" fill="#2dd4bf"/>
            </svg>
            <span className="font-space-mono text-sm font-bold tracking-widest" style={{ color: 'var(--text)' }}>
              LZT <span style={{ color: 'var(--primary)' }}>'26</span>
            </span>
          </div>

          {/* Desktop filter pills */}
          <div className="hidden md:flex items-center gap-1 bg-black/20 rounded-full px-2 py-1.5 backdrop-blur-sm border border-white/5">
            {filters.map((f) => (
              <button
                key={f.id}
                onClick={() => setActiveFilter(f.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-space-mono font-bold tracking-wider transition-all duration-200 ${
                  activeFilter === f.id
                    ? 'text-[#0a0a0a]'
                    : 'hover:bg-white/10'
                }`}
                style={{
                  background: activeFilter === f.id ? 'var(--primary)' : 'transparent',
                  color: activeFilter === f.id ? '#fff' : 'var(--muted)',
                }}
              >
                {f.label}
              </button>
            ))}
          </div>

          {/* Right controls */}
          <div className="flex items-center gap-3">
            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 hover:bg-white/10"
              style={{ border: '1px solid var(--border)' }}
            >
              {isDark ? (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ color: 'var(--text)' }}>
                  <circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/>
                  <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
                  <line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/>
                  <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
                </svg>
              ) : (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ color: 'var(--text)' }}>
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
                </svg>
              )}
            </button>

            {/* Hamburger (mobile) */}
            <button
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
              className="md:hidden w-9 h-9 rounded-full flex items-center justify-center transition-all hover:bg-white/10"
              style={{ border: '1px solid var(--border)' }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ color: 'var(--text)' }}>
                <line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>
              </svg>
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center"
            style={{ background: 'rgba(10,10,10,0.97)' }}
          >
            <button
              onClick={() => setMobileOpen(false)}
              className="absolute top-5 right-5 w-10 h-10 flex items-center justify-center rounded-full"
              style={{ border: '1px solid var(--border)' }}
              aria-label="Close menu"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ color: 'var(--text)' }}>
                <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>
            <div className="flex flex-col items-center gap-6">
              {filters.map((f, i) => (
                <motion.button
                  key={f.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.07 }}
                  onClick={() => { setActiveFilter(f.id); setMobileOpen(false); }}
                  className="font-playfair text-3xl font-bold transition-colors duration-200"
                  style={{ color: activeFilter === f.id ? 'var(--primary)' : 'var(--text)' }}
                >
                  {f.label}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
