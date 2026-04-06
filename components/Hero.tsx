'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import WeatherWidget from './WeatherWidget';

interface Particle {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  opacity: number;
  life: number;
  maxLife: number;
}

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animFrame: number;
    const particles: Particle[] = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const spawn = () => {
      if (particles.length < 60) {
        const maxLife = 180 + Math.random() * 120;
        particles.push({
          x: Math.random() * canvas.width,
          y: canvas.height + 10,
          size: 0.5 + Math.random() * 2,
          speedY: 0.4 + Math.random() * 0.8,
          speedX: (Math.random() - 0.5) * 0.4,
          opacity: 0,
          life: 0,
          maxLife,
        });
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (Math.random() < 0.3) spawn();

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.y -= p.speedY;
        p.x += p.speedX;
        p.life++;
        const progress = p.life / p.maxLife;
        p.opacity = progress < 0.1
          ? progress * 10
          : progress > 0.8
          ? (1 - progress) * 5
          : 1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        const color = Math.random() > 0.7 ? '45,212,191' : '232,98,42';
        ctx.fillStyle = `rgba(${color},${p.opacity * 0.7})`;
        ctx.fill();

        if (p.life >= p.maxLife || p.y < -10) {
          particles.splice(i, 1);
        }
      }

      animFrame = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      cancelAnimationFrame(animFrame);
      window.removeEventListener('resize', resize);
    };
  }, []);

  const scrollDown = () => {
    const el = document.getElementById('countdown');
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative h-screen min-h-[600px] flex flex-col items-center justify-center overflow-hidden">
      {/* Background gradient */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background: `
            radial-gradient(ellipse at 50% 120%, rgba(232,98,42,0.25) 0%, transparent 60%),
            radial-gradient(ellipse at 80% 50%, rgba(45,212,191,0.1) 0%, transparent 50%),
            linear-gradient(180deg, #050505 0%, #0f0806 40%, #0a0e0d 100%)
          `,
        }}
      />

      {/* Particle canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 z-[1] pointer-events-none" />

      {/* Weather widget */}
      <div className="absolute top-20 right-4 sm:right-8 z-20">
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1, duration: 0.7 }}
        >
          <WeatherWidget />
        </motion.div>
      </div>

      {/* Main content */}
      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <p className="font-space-mono text-xs sm:text-sm tracking-[0.5em] uppercase mb-6" style={{ color: 'var(--primary)' }}>
            Gonzalo &amp; Paula · Abril 2026
          </p>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="font-playfair font-black leading-none tracking-tighter"
          style={{
            fontSize: 'clamp(5rem, 18vw, 15rem)',
            color: 'var(--text)',
            textShadow: '0 0 80px rgba(232,98,42,0.15)',
          }}
        >
          Lanza
          <span style={{ color: 'var(--primary)' }}>rote</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.65 }}
          className="font-space-mono text-base sm:text-xl tracking-[0.4em] mt-6 uppercase"
          style={{ color: 'var(--secondary)' }}
        >
          19 — 25 Abril · 2026
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="font-space-mono text-xs tracking-[0.25em] mt-3 uppercase"
          style={{ color: 'var(--muted)' }}
        >
          7 días · Canarias · España
        </motion.p>
      </div>

      {/* Scroll indicator */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        onClick={scrollDown}
        aria-label="Scroll down"
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 group"
      >
        <span className="font-space-mono text-[10px] tracking-[0.3em] uppercase" style={{ color: 'var(--muted)' }}>
          Explorar
        </span>
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center animate-bounce-y transition-all group-hover:scale-110"
          style={{ border: '1px solid var(--primary)', color: 'var(--primary)' }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <polyline points="6 9 12 15 18 9"/>
          </svg>
        </div>
      </motion.button>

      {/* Bottom fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 z-[2] pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, transparent, var(--bg))' }}
      />
    </section>
  );
}
