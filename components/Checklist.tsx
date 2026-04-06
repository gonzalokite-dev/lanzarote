'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocalStorage } from '@/lib/useLocalStorage';
import { checklistItems } from '@/lib/tripData';

export default function Checklist() {
  const [checked, setChecked] = useLocalStorage<Record<string, boolean>>('checklist', {});
  const [isOpen, setIsOpen] = useState(false);

  const completedCount = checklistItems.filter((item) => checked[item.id]).length;
  const progress = Math.round((completedCount / checklistItems.length) * 100);

  const toggle = (id: string) => {
    setChecked((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <>
      {/* Toggle button */}
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1.5 }}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Lista de verificación"
        className="fixed bottom-24 right-5 z-40 w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-all hover:scale-110 active:scale-95"
        style={{ background: 'var(--secondary)', color: '#fff' }}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <polyline points="9 11 12 14 22 4"/>
          <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>
        </svg>
        {completedCount < checklistItems.length && (
          <span
            className="absolute -top-1 -right-1 w-5 h-5 rounded-full font-space-mono text-[10px] font-bold flex items-center justify-center"
            style={{ background: 'var(--primary)', color: '#fff' }}
          >
            {checklistItems.length - completedCount}
          </span>
        )}
      </motion.button>

      {/* Panel */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop (mobile) */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 lg:hidden"
              style={{ background: 'rgba(0,0,0,0.6)' }}
              onClick={() => setIsOpen(false)}
            />

            {/* Panel */}
            <motion.div
              key="panel"
              initial={{ x: '100%', opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: '100%', opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="fixed right-0 bottom-0 top-0 z-50 w-full max-w-sm flex flex-col"
              style={{ background: 'var(--surface)', borderLeft: '1px solid var(--border)' }}
            >
              {/* Header */}
              <div className="flex items-center justify-between px-6 pt-16 pb-5" style={{ borderBottom: '1px solid var(--border)' }}>
                <div>
                  <h3 className="font-playfair text-xl font-bold" style={{ color: 'var(--text)' }}>
                    Antes de volar ✈️
                  </h3>
                  <p className="font-space-mono text-xs mt-0.5" style={{ color: 'var(--muted)' }}>
                    {completedCount}/{checklistItems.length} completados
                  </p>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-8 h-8 rounded-full flex items-center justify-center"
                  style={{ border: '1px solid var(--border)', color: 'var(--muted)' }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                  </svg>
                </button>
              </div>

              {/* Progress */}
              <div className="px-6 py-4" style={{ borderBottom: '1px solid var(--border)' }}>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-space-mono text-xs" style={{ color: 'var(--muted)' }}>Progreso</span>
                  <span className="font-space-mono text-xs font-bold" style={{ color: 'var(--primary)' }}>{progress}%</span>
                </div>
                <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'var(--card)' }}>
                  <motion.div
                    className="h-full rounded-full progress-bar"
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
              </div>

              {/* Items */}
              <div className="flex-1 overflow-y-auto px-6 py-4 flex flex-col gap-3">
                {checklistItems.map((item, i) => (
                  <motion.label
                    key={item.id}
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.04 }}
                    className="flex items-start gap-3 cursor-pointer group"
                    htmlFor={`check-${item.id}`}
                  >
                    <div className="relative mt-0.5 shrink-0">
                      <input
                        id={`check-${item.id}`}
                        type="checkbox"
                        checked={!!checked[item.id]}
                        onChange={() => toggle(item.id)}
                        className="sr-only"
                      />
                      <div
                        className="w-5 h-5 rounded-md flex items-center justify-center transition-all duration-200"
                        style={{
                          background: checked[item.id] ? 'var(--primary)' : 'transparent',
                          border: `1.5px solid ${checked[item.id] ? 'var(--primary)' : 'var(--border)'}`,
                        }}
                      >
                        {checked[item.id] && (
                          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
                            <polyline points="20 6 9 17 4 12"/>
                          </svg>
                        )}
                      </div>
                    </div>
                    <span
                      className="text-sm font-inter leading-snug transition-all duration-200"
                      style={{
                        color: checked[item.id] ? 'var(--muted)' : 'var(--text)',
                        textDecoration: checked[item.id] ? 'line-through' : 'none',
                      }}
                    >
                      {item.label}
                    </span>
                  </motion.label>
                ))}
              </div>

              {/* Footer */}
              {progress === 100 && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="px-6 py-4 text-center"
                  style={{ borderTop: '1px solid var(--border)' }}
                >
                  <p className="font-playfair text-lg font-bold" style={{ color: 'var(--secondary)' }}>
                    ¡Listo para despegar! 🌋
                  </p>
                </motion.div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
