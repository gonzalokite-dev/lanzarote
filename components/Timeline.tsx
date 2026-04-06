'use client';

import { motion, AnimatePresence } from 'framer-motion';
import DayCard from './DayCard';
import { tripDays } from '@/lib/tripData';

interface Props {
  activeFilter: string;
  highlightDay: number | null;
}

export default function Timeline({ activeFilter, highlightDay }: Props) {
  const filteredDays = activeFilter === 'all'
    ? tripDays
    : tripDays.filter((d) => d.activities.some((a) => a.category === activeFilter));

  const hiddenCount = tripDays.length - filteredDays.length;

  return (
    <section id="timeline" className="py-16 sm:py-24 px-4 sm:px-6" style={{ background: 'var(--bg)' }}>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="font-space-mono text-xs tracking-[0.3em] uppercase mb-3"
            style={{ color: 'var(--primary)' }}
          >
            Itinerario
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-playfair text-4xl sm:text-5xl font-bold"
            style={{ color: 'var(--text)' }}
          >
            7 Días en la Isla
          </motion.h2>

          {/* Filter result banner */}
          <AnimatePresence>
            {activeFilter !== 'all' && (
              <motion.div
                initial={{ opacity: 0, y: -10, height: 0 }}
                animate={{ opacity: 1, y: 0, height: 'auto' }}
                exit={{ opacity: 0, y: -10, height: 0 }}
                className="mt-5 inline-flex items-center gap-3 px-5 py-2.5 rounded-full"
                style={{ background: 'rgba(232,98,42,0.12)', border: '1px solid rgba(232,98,42,0.3)' }}
              >
                <span className="font-space-mono text-xs font-bold" style={{ color: 'var(--primary)' }}>
                  {filteredDays.length} {filteredDays.length === 1 ? 'día' : 'días'} con este tipo
                </span>
                {hiddenCount > 0 && (
                  <span className="font-space-mono text-xs" style={{ color: 'var(--muted)' }}>
                    · {hiddenCount} ocultos
                  </span>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Timeline */}
        <div className="relative">
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px timeline-spine -translate-x-1/2" />

          <motion.div layout className="flex flex-col gap-12 md:gap-16">
            <AnimatePresence mode="popLayout">
              {tripDays.map((day, index) => {
                const isVisible = activeFilter === 'all' || day.activities.some((a) => a.category === activeFilter);
                const side = index % 2 === 0 ? 'left' : 'right';

                if (!isVisible) return null;

                return (
                  <motion.div
                    key={day.day}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    className="relative"
                  >
                    {/* Spine dot */}
                    <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 top-8 z-10 items-center justify-center">
                      <motion.div
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2, type: 'spring' }}
                        className="w-5 h-5 rounded-full animate-pulse-glow flex items-center justify-center"
                        style={{ background: 'var(--bg)', border: '2px solid var(--primary)' }}
                      >
                        <div className="w-2 h-2 rounded-full" style={{ background: 'var(--primary)' }} />
                      </motion.div>
                    </div>

                    {/* Mobile dot */}
                    <div className="md:hidden flex items-center gap-3 mb-4">
                      <div
                        className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 animate-pulse-glow"
                        style={{ background: 'var(--primary)', color: '#fff' }}
                      >
                        <span className="font-space-mono text-xs font-bold">{day.day}</span>
                      </div>
                      <div className="h-px flex-1 opacity-30" style={{ background: 'var(--primary)' }} />
                    </div>

                    <DayCard
                      day={day}
                      side={side}
                      activeFilter={activeFilter}
                      isHighlighted={highlightDay === day.day}
                    />
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
