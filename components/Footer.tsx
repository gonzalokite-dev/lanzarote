'use client';

import { motion } from 'framer-motion';

export default function Footer() {
  return (
    <footer
      className="py-16 px-4 text-center relative overflow-hidden"
      style={{ background: 'var(--surface)', borderTop: '1px solid var(--border)' }}
    >
      {/* Background gradient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 50% 150%, rgba(232,98,42,0.08) 0%, transparent 70%)',
        }}
      />

      <div className="relative max-w-4xl mx-auto flex flex-col items-center gap-6">
        {/* Island illustration */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <svg width="120" height="60" viewBox="0 0 120 60" fill="none" aria-label="Lanzarote island illustration">
            {/* Ocean */}
            <ellipse cx="60" cy="52" rx="52" ry="8" fill="rgba(45,212,191,0.12)"/>
            {/* Island base */}
            <ellipse cx="60" cy="46" rx="42" ry="10" fill="rgba(232,98,42,0.1)" stroke="rgba(232,98,42,0.3)" strokeWidth="1"/>
            {/* Volcano left */}
            <path d="M28 46 L38 20 L42 28 L48 46Z" fill="rgba(100,80,60,0.6)"/>
            {/* Volcano center (main) */}
            <path d="M44 46 L60 8 L76 46Z" fill="rgba(140,100,60,0.7)"/>
            {/* Lava glow */}
            <path d="M58 8 L60 4 L62 8" fill="#e8622a" opacity="0.8"/>
            <ellipse cx="60" cy="8" rx="3" ry="1.5" fill="rgba(232,98,42,0.6)"/>
            {/* Volcano right */}
            <path d="M72 46 L82 24 L86 32 L92 46Z" fill="rgba(80,60,45,0.6)"/>
            {/* Ocean wave line */}
            <path d="M15 52 Q35 48 60 52 Q85 56 105 52" stroke="rgba(45,212,191,0.4)" strokeWidth="1.5" fill="none"/>
          </svg>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
        >
          <h3 className="font-playfair text-2xl font-bold mb-1" style={{ color: 'var(--text)' }}>
            Lanzarote <span style={{ color: 'var(--primary)' }}>·</span> Abril 2026
          </h3>
          <p className="font-inter text-sm" style={{ color: 'var(--muted)' }}>
            Gonzalo &amp; Paula
          </p>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
          className="font-space-mono text-xs tracking-widest"
          style={{ color: 'var(--secondary)' }}
        >
          29.0157°N · 13.4982°W
        </motion.p>

        {/* Icon links */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="flex items-center gap-5"
        >
          {[
            {
              label: 'Google Maps',
              href: 'https://maps.google.com/?q=Lanzarote,+Spain',
              icon: (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21"/>
                  <line x1="9" y1="3" x2="9" y2="18"/>
                  <line x1="15" y1="6" x2="15" y2="21"/>
                </svg>
              ),
            },
            {
              label: 'Weather',
              href: '#',
              icon: (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"/>
                </svg>
              ),
            },
            {
              label: 'Instagram',
              href: '#',
              icon: (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                </svg>
              ),
            },
          ].map(({ label, href, icon }) => (
            <a
              key={label}
              href={href}
              target={href !== '#' ? '_blank' : undefined}
              rel="noopener noreferrer"
              aria-label={label}
              className="w-10 h-10 rounded-full flex items-center justify-center transition-all hover:scale-110 hover:opacity-100"
              style={{
                border: '1px solid var(--border)',
                color: 'var(--muted)',
                opacity: 0.8,
              }}
            >
              {icon}
            </a>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="flex flex-col items-center gap-1"
        >
          <p className="font-inter text-sm font-medium flex items-center gap-2" style={{ color: 'var(--muted)' }}>
            Hecho con{' '}
            <motion.span
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
              className="inline-block text-red-400 text-base"
            >
              ❤️
            </motion.span>
            {' '}por{' '}
            <span className="font-playfair font-bold italic" style={{ color: 'var(--primary)' }}>
              Gonzi
            </span>
          </p>
          <p className="font-space-mono text-[10px] tracking-wider" style={{ color: 'var(--muted)', opacity: 0.4 }}>
            LZT '26
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
