'use client';

import { useCountdown } from '@/lib/useCountdown';
import { motion } from 'framer-motion';

function Box({ value, label }: { value: number | string; label: string }) {
  return (
    <div
      className="grad-border flex flex-col items-center justify-center rounded-2xl px-4 sm:px-8 py-5 sm:py-7 min-w-[80px] sm:min-w-[110px]"
      style={{ background: 'var(--card)' }}
    >
      <span
        className="font-space-mono text-3xl sm:text-5xl font-bold animate-count-pulse tabular-nums"
        style={{ color: 'var(--primary)' }}
      >
        {String(value).padStart(2, '0')}
      </span>
      <span className="font-space-mono text-[9px] sm:text-[11px] tracking-[0.2em] uppercase mt-2" style={{ color: 'var(--muted)' }}>
        {label}
      </span>
    </div>
  );
}

export default function Countdown() {
  const { days, hours, minutes, seconds, tripDay, isOver, hasStarted } = useCountdown();

  return (
    <section id="countdown" className="py-16 sm:py-24 px-4" style={{ background: 'var(--surface)' }}>
      <div className="max-w-4xl mx-auto text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-space-mono text-xs tracking-[0.3em] uppercase mb-4"
          style={{ color: 'var(--primary)' }}
        >
          {isOver ? 'El viaje ha concluido' : hasStarted ? `Estamos en Lanzarote` : 'Cuenta atrás'}
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="font-playfair text-3xl sm:text-4xl font-bold mb-10"
          style={{ color: 'var(--text)' }}
        >
          {isOver
            ? 'Recuerdos de Lanzarote 🌋'
            : hasStarted && tripDay
            ? `Día ${tripDay} de 7 · ${['Llegada', 'Norte Volcánico', 'Timanfaya', 'Manrique', 'Papagayo', 'Puerto del Carmen', 'Vuelta a casa'][tripDay - 1]}`
            : '19 de Abril, 2026'}
        </motion.h2>

        {!hasStarted && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex items-center justify-center gap-3 sm:gap-5 flex-wrap"
          >
            <Box value={days} label="Días" />
            <Colon />
            <Box value={hours} label="Horas" />
            <Colon />
            <Box value={minutes} label="Min" />
            <Colon />
            <Box value={seconds} label="Seg" />
          </motion.div>
        )}

        {hasStarted && !isOver && tripDay && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="flex items-center justify-center gap-2 flex-wrap"
          >
            {Array.from({ length: 7 }, (_, i) => (
              <div
                key={i}
                className={`w-10 h-10 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center font-space-mono font-bold text-sm sm:text-base transition-all duration-300 ${
                  i + 1 === tripDay ? 'animate-pulse-glow scale-110' : ''
                }`}
                style={{
                  background: i + 1 === tripDay ? 'var(--primary)' : i + 1 < tripDay ? 'rgba(45,212,191,0.15)' : 'var(--card)',
                  color: i + 1 === tripDay ? '#fff' : i + 1 < tripDay ? 'var(--secondary)' : 'var(--muted)',
                  border: i + 1 === tripDay ? 'none' : '1px solid var(--border)',
                }}
              >
                D{i + 1}
              </div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
}

function Colon() {
  return (
    <span className="font-space-mono text-3xl sm:text-5xl font-bold pb-4 animate-count-pulse" style={{ color: 'var(--primary)', opacity: 0.5 }}>
      :
    </span>
  );
}
