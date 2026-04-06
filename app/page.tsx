'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Hero from '@/components/Hero';
import Navigation from '@/components/Navigation';
import Countdown from '@/components/Countdown';
import Timeline from '@/components/Timeline';
import MapSection from '@/components/MapSection';
import StatsSection from '@/components/StatsSection';
import Footer from '@/components/Footer';
import Checklist from '@/components/Checklist';
import FloatingButton from '@/components/FloatingButton';

export default function Home() {
  const [isDark, setIsDark] = useState(true);
  const [activeFilter, setActiveFilter] = useState('all');
  const [highlightDay, setHighlightDay] = useState<number | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem('theme');
    if (saved === 'light') {
      setIsDark(false);
      document.documentElement.classList.add('light');
    }
  }, []);

  const toggleTheme = () => {
    setIsDark((prev) => {
      const next = !prev;
      if (next) {
        document.documentElement.classList.remove('light');
        localStorage.setItem('theme', 'dark');
      } else {
        document.documentElement.classList.add('light');
        localStorage.setItem('theme', 'light');
      }
      return next;
    });
  };

  const handleHighlightDay = (day: number) => {
    setHighlightDay(day);
    setTimeout(() => setHighlightDay(null), 3000);
  };

  return (
    <div style={{ background: 'var(--bg)', color: 'var(--text)', minHeight: '100vh' }}>
      {/* Global grain overlay */}
      <div className="grain-overlay" aria-hidden />

      <Navigation
        activeFilter={activeFilter}
        setActiveFilter={setActiveFilter}
        isDark={isDark}
        toggleTheme={toggleTheme}
      />

      <main>
        <Hero />
        <Countdown />
        <Timeline activeFilter={activeFilter} highlightDay={highlightDay} />
        <MapSection />
        <StatsSection />
      </main>

      <Footer />
      <Checklist />
      <FloatingButton onHighlightDay={handleHighlightDay} />
    </div>
  );
}
