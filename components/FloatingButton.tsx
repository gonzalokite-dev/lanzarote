'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCountdown } from '@/lib/useCountdown';

interface Props {
  onHighlightDay: (day: number) => void;
}

export default function FloatingButton({ onHighlightDay }: Props) {
  const { tripDay, isOver, hasStarted, days } = useCountdown();
  const [modal, setModal] = useState<'before' | 'after' | null>(null);

  const handleClick = () => {
    if (isOver) {
      setModal('after');
    } else if (hasStarted && tripDay) {
      // Scroll to current day card and highlight
      onHighlightDay(tripDay);
      const el = document.getElementById(`day-${tripDay}`);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    } else {
      setModal('before');
    }
  };

  return (
    <>
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 2, type: 'spring', stiffness: 200 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleClick}
        aria-label="¿Qué hacemos hoy?"
        className="fixed bottom-5 right-5 z-40 w-14 h-14 rounded-full flex items-center justify-center shadow-xl"
        style={{
          background: 'linear-gradient(135deg, var(--primary), #c94d18)',
          color: '#fff',
          boxShadow: '0 4px 20px rgba(232,98,42,0.4)',
        }}
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10"/>
          <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/>
        </svg>
      </motion.button>

      <AnimatePresence>
        {modal && (
          <motion.div
            key="modal-bg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center px-4"
            style={{ background: 'rgba(0,0,0,0.8)' }}
            onClick={() => setModal(null)}
          >
            <motion.div
              key="modal-content"
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              className="grad-border rounded-2xl p-8 max-w-sm w-full text-center"
              style={{ background: 'var(--card)' }}
              onClick={(e) => e.stopPropagation()}
            >
              {modal === 'before' ? (
                <>
                  <div className="text-5xl mb-4">🌋</div>
                  <h3 className="font-playfair text-2xl font-bold mb-3" style={{ color: 'var(--text)' }}>
                    ¡Pronto en Lanzarote!
                  </h3>
                  <p className="font-inter text-sm mb-2" style={{ color: 'var(--muted)' }}>
                    Faltan
                  </p>
                  <p className="font-space-mono text-4xl font-bold mb-2" style={{ color: 'var(--primary)' }}>
                    {days} días
                  </p>
                  <p className="font-inter text-sm" style={{ color: 'var(--muted)' }}>
                    para el viaje · 19 de Abril, 2026
                  </p>
                </>
              ) : (
                <>
                  <div className="text-5xl mb-4">🏝️</div>
                  <h3 className="font-playfair text-2xl font-bold mb-3" style={{ color: 'var(--text)' }}>
                    Un viaje inolvidable
                  </h3>
                  <div className="grid grid-cols-2 gap-3 mt-4 text-left">
                    {[
                      { n: '7', l: 'días en la isla' },
                      { n: '14+', l: 'restaurantes' },
                      { n: '5', l: 'playas visitadas' },
                      { n: '3', l: 'sitios Manrique' },
                      { n: '1', l: 'parque nacional' },
                      { n: '∞', l: 'recuerdos' },
                    ].map(({ n, l }) => (
                      <div key={l} className="rounded-xl p-3" style={{ background: 'var(--surface)' }}>
                        <p className="font-playfair text-xl font-bold" style={{ color: 'var(--primary)' }}>{n}</p>
                        <p className="font-inter text-xs" style={{ color: 'var(--muted)' }}>{l}</p>
                      </div>
                    ))}
                  </div>
                </>
              )}
              <button
                onClick={() => setModal(null)}
                className="mt-6 w-full py-2.5 rounded-xl font-space-mono text-sm transition-all hover:opacity-90"
                style={{ background: 'var(--primary)', color: '#fff' }}
              >
                Cerrar
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
