'use client';

import { motion } from 'framer-motion';
import { tripDays } from '@/lib/tripData';

const HOTEL_COORDS = { lat: 29.0157, lng: -13.4982 };

const categoryColors: Record<string, string> = {
  restaurant: '#f97316',
  beach: '#2dd4bf',
  culture: '#fbbf24',
  activity: '#34d399',
  hotel: '#a78bfa',
};

const locations = [
  { name: 'Barceló Teguise Beach', category: 'hotel', distance: '0 km (base)', coords: HOTEL_COORDS },
  { name: 'Timanfaya', category: 'activity', distance: '~60 km', coords: tripDays[2].coordinates },
  { name: 'Jameos del Agua', category: 'culture', distance: '~25 km', coords: { lat: 29.157, lng: -13.432 } },
  { name: 'Papagayo', category: 'beach', distance: '~55 km', coords: tripDays[4].coordinates },
  { name: 'Fundación Manrique', category: 'culture', distance: '~15 km', coords: tripDays[3].coordinates },
  { name: 'Puerto del Carmen', category: 'beach', distance: '~20 km', coords: tripDays[5].coordinates },
  { name: 'Teguise (casco)', category: 'culture', distance: '~5 km', coords: tripDays[0].coordinates },
  { name: 'Cueva de los Verdes', category: 'culture', distance: '~28 km', coords: { lat: 29.168, lng: -13.435 } },
];

export default function MapSection() {
  // OpenStreetMap — sin API key, gratis
  const mapSrc = `https://www.openstreetmap.org/export/embed.html?bbox=-14.05,28.75,-13.30,29.25&layer=mapnik`;

  return (
    <section id="map" className="py-16 sm:py-24 px-4" style={{ background: 'var(--surface)' }}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="font-space-mono text-xs tracking-[0.3em] uppercase mb-3"
            style={{ color: 'var(--primary)' }}
          >
            Explorar
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-playfair text-4xl sm:text-5xl font-bold"
            style={{ color: 'var(--text)' }}
          >
            Mapa de la Isla
          </motion.h2>
        </div>

        {/* Map embed — OpenStreetMap, sin API key */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="grad-border rounded-2xl overflow-hidden mb-8"
          style={{ height: '420px' }}
        >
          <iframe
            src={mapSrc}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            loading="lazy"
            title="Mapa de Lanzarote"
          />
        </motion.div>

        {/* Location cards */}
        <div className="overflow-x-auto pb-4 -mx-4 px-4">
          <div className="flex gap-4" style={{ width: 'max-content' }}>
            {locations.map((loc, i) => (
              <motion.a
                key={loc.name}
                href={`https://www.google.com/maps/dir/${HOTEL_COORDS.lat},${HOTEL_COORDS.lng}/${loc.coords.lat},${loc.coords.lng}`}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                whileHover={{ y: -3 }}
                className="grad-border rounded-xl p-4 w-44 shrink-0 cursor-pointer block"
                style={{ background: 'var(--card)' }}
              >
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center mb-3"
                  style={{
                    background: `${categoryColors[loc.category]}18`,
                    color: categoryColors[loc.category],
                    border: `1px solid ${categoryColors[loc.category]}33`,
                  }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                    <circle cx="12" cy="10" r="3"/>
                  </svg>
                </div>
                <p className="font-inter font-semibold text-xs leading-snug mb-1" style={{ color: 'var(--text)' }}>
                  {loc.name}
                </p>
                <p className="font-space-mono text-[10px]" style={{ color: 'var(--muted)' }}>
                  {loc.distance}
                </p>
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
