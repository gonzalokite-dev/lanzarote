'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocalStorage } from '@/lib/useLocalStorage';
import { checklistItems } from '@/lib/tripData';

interface CustomItem {
  id: string;
  label: string;
}

export default function Checklist() {
  const [checked, setChecked] = useLocalStorage<Record<string, boolean>>('checklist', {});
  const [customItems, setCustomItems] = useLocalStorage<CustomItem[]>('checklist_custom', []);
  const [deletedDefaults, setDeletedDefaults] = useLocalStorage<string[]>('checklist_deleted', []);
  const [isOpen, setIsOpen] = useState(false);
  const [newItem, setNewItem] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const visibleDefaults = checklistItems.filter((i) => !deletedDefaults.includes(i.id));
  const allItems = [...visibleDefaults, ...customItems];
  const completedCount = allItems.filter((item) => checked[item.id]).length;
  const progress = allItems.length > 0 ? Math.round((completedCount / allItems.length) * 100) : 0;

  const toggle = (id: string) => {
    setChecked((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const addItem = () => {
    const label = newItem.trim();
    if (!label) return;
    const id = `custom_${Date.now()}`;
    setCustomItems((prev) => [...prev, { id, label }]);
    setNewItem('');
    inputRef.current?.focus();
  };

  const removeItem = (id: string, isDefault: boolean) => {
    if (isDefault) {
      setDeletedDefaults((prev) => [...prev, id]);
    } else {
      setCustomItems((prev) => prev.filter((i) => i.id !== id));
    }
    setChecked((prev) => { const next = { ...prev }; delete next[id]; return next; });
  };

  return (
    <>
      {/* ── Toggle button: pill visible anchored bottom-right ── */}
      <motion.button
        initial={{ x: 120, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 1.5, type: 'spring', stiffness: 200, damping: 20 }}
        onClick={() => setIsOpen(true)}
        aria-label="Abrir checklist del viaje"
        className="fixed bottom-24 right-0 z-40 flex items-center gap-2 pl-4 pr-3 py-3 rounded-l-2xl shadow-xl transition-all hover:pr-5 group"
        style={{
          background: 'linear-gradient(135deg, var(--secondary), #0d9488)',
          color: '#fff',
          boxShadow: '0 4px 24px rgba(45,212,191,0.35)',
        }}
      >
        {/* Progress ring */}
        <div className="relative w-8 h-8 shrink-0">
          <svg width="32" height="32" viewBox="0 0 32 32" className="-rotate-90">
            <circle cx="16" cy="16" r="13" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="2.5"/>
            <circle
              cx="16" cy="16" r="13" fill="none"
              stroke="white" strokeWidth="2.5"
              strokeDasharray={`${2 * Math.PI * 13}`}
              strokeDashoffset={`${2 * Math.PI * 13 * (1 - progress / 100)}`}
              strokeLinecap="round"
              style={{ transition: 'stroke-dashoffset 0.5s ease' }}
            />
          </svg>
          <span className="absolute inset-0 flex items-center justify-center font-space-mono text-[9px] font-bold">
            {progress}%
          </span>
        </div>
        <div className="text-left">
          <p className="font-space-mono text-[10px] font-bold tracking-wider leading-none">CHECKLIST</p>
          <p className="font-inter text-[11px] opacity-80 leading-none mt-0.5">
            {completedCount}/{allItems.length} listos
          </p>
        </div>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="opacity-60 group-hover:opacity-100 transition-opacity">
          <polyline points="9 18 15 12 9 6"/>
        </svg>
      </motion.button>

      {/* ── Panel ── */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40"
              style={{ background: 'rgba(0,0,0,0.65)', backdropFilter: 'blur(4px)' }}
              onClick={() => setIsOpen(false)}
            />

            {/* Sliding panel */}
            <motion.div
              key="panel"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 320, damping: 32 }}
              className="fixed right-0 bottom-0 top-0 z-50 w-full max-w-sm flex flex-col"
              style={{ background: 'var(--surface)', borderLeft: '1px solid var(--border)' }}
            >
              {/* Header */}
              <div
                className="flex items-center justify-between px-6 pt-14 pb-5"
                style={{ borderBottom: '1px solid var(--border)' }}
              >
                <div>
                  <h3 className="font-playfair text-2xl font-bold" style={{ color: 'var(--text)' }}>
                    Antes de volar ✈️
                  </h3>
                  <p className="font-space-mono text-xs mt-0.5" style={{ color: 'var(--muted)' }}>
                    {completedCount} de {allItems.length} completados
                  </p>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-9 h-9 rounded-full flex items-center justify-center transition-all hover:bg-white/10"
                  style={{ border: '1px solid var(--border)', color: 'var(--muted)' }}
                  aria-label="Cerrar"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                  </svg>
                </button>
              </div>

              {/* Progress bar */}
              <div className="px-6 py-4" style={{ borderBottom: '1px solid var(--border)' }}>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-space-mono text-xs" style={{ color: 'var(--muted)' }}>Progreso</span>
                  <span className="font-space-mono text-xs font-bold" style={{ color: 'var(--secondary)' }}>{progress}%</span>
                </div>
                <div className="h-2 rounded-full overflow-hidden" style={{ background: 'var(--card)' }}>
                  <motion.div
                    className="h-full rounded-full"
                    style={{ background: 'linear-gradient(to right, var(--secondary), #0d9488)' }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
                {progress === 100 && (
                  <motion.p
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="font-playfair text-sm font-bold mt-2 text-center"
                    style={{ color: 'var(--secondary)' }}
                  >
                    ¡Listo para despegar! 🌋
                  </motion.p>
                )}
              </div>

              {/* Items list */}
              <div className="flex-1 overflow-y-auto px-6 py-4 flex flex-col gap-2">
                {/* Default items */}
                {visibleDefaults.map((item, i) => (
                  <CheckRow
                    key={item.id}
                    id={item.id}
                    label={item.label}
                    checked={!!checked[item.id]}
                    onToggle={() => toggle(item.id)}
                    onDelete={() => removeItem(item.id, true)}
                    delay={i * 0.03}
                  />
                ))}

                {/* Custom items */}
                {customItems.length > 0 && (
                  <>
                    <div className="my-2 flex items-center gap-3">
                      <div className="flex-1 h-px" style={{ background: 'var(--border)' }} />
                      <span className="font-space-mono text-[10px] tracking-widest uppercase" style={{ color: 'var(--muted)' }}>
                        Añadidos
                      </span>
                      <div className="flex-1 h-px" style={{ background: 'var(--border)' }} />
                    </div>
                    {customItems.map((item, i) => (
                      <CheckRow
                        key={item.id}
                        id={item.id}
                        label={item.label}
                        checked={!!checked[item.id]}
                        onToggle={() => toggle(item.id)}
                        onDelete={() => removeItem(item.id, false)}
                        delay={i * 0.03}
                      />
                    ))}
                  </>
                )}
              </div>

              {/* Add item input */}
              <div className="px-6 py-4" style={{ borderTop: '1px solid var(--border)' }}>
                <p className="font-space-mono text-[10px] tracking-widest uppercase mb-3" style={{ color: 'var(--muted)' }}>
                  Añadir tarea
                </p>
                <div className="flex gap-2">
                  <input
                    ref={inputRef}
                    type="text"
                    value={newItem}
                    onChange={(e) => setNewItem(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && addItem()}
                    placeholder="Ej: Comprar adaptador de enchufe..."
                    className="flex-1 rounded-xl px-4 py-2.5 text-sm font-inter outline-none transition-all"
                    style={{
                      background: 'var(--card)',
                      border: '1px solid var(--border)',
                      color: 'var(--text)',
                    }}
                    onFocus={(e) => (e.currentTarget.style.borderColor = 'var(--secondary)')}
                    onBlur={(e) => (e.currentTarget.style.borderColor = 'var(--border)')}
                  />
                  <button
                    onClick={addItem}
                    disabled={!newItem.trim()}
                    className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-all hover:opacity-90 active:scale-95 disabled:opacity-30"
                    style={{ background: 'var(--secondary)', color: '#fff' }}
                    aria-label="Añadir"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
                    </svg>
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

function CheckRow({
  id, label, checked, onToggle, onDelete, delay = 0,
}: {
  id: string; label: string; checked: boolean;
  onToggle: () => void; onDelete?: () => void;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 12 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay }}
      className="flex items-center gap-3 group/row rounded-xl px-3 py-2.5 transition-all hover:bg-white/5"
    >
      <button
        onClick={onToggle}
        aria-label={checked ? 'Desmarcar' : 'Marcar'}
        className="shrink-0 w-5 h-5 rounded-md flex items-center justify-center transition-all duration-200"
        style={{
          background: checked ? 'var(--secondary)' : 'transparent',
          border: `1.5px solid ${checked ? 'var(--secondary)' : 'var(--border)'}`,
        }}
      >
        {checked && (
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3.5">
            <polyline points="20 6 9 17 4 12"/>
          </svg>
        )}
      </button>

      <span
        className="flex-1 text-sm font-inter leading-snug transition-all duration-200 cursor-pointer"
        style={{
          color: checked ? 'var(--muted)' : 'var(--text)',
          textDecoration: checked ? 'line-through' : 'none',
        }}
        onClick={onToggle}
      >
        {label}
      </span>

      {onDelete && (
        <button
          onClick={onDelete}
          aria-label="Eliminar"
          className="opacity-0 group-hover/row:opacity-100 transition-opacity w-5 h-5 flex items-center justify-center rounded"
          style={{ color: 'var(--muted)' }}
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>
      )}
    </motion.div>
  );
}
