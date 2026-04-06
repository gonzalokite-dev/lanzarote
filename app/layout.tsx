import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: "Lanzaroute '26 · Gonzalo & Paula",
  description: '7 días de volcanes, playas y gastronomía. Abril 19–25, 2026.',
  openGraph: {
    title: "Lanzaroute '26 · Gonzalo & Paula",
    description: '7 días de volcanes, playas y gastronomía. Abril 19–25, 2026.',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1589053739346-2a4a5e1e3e28?w=1200&q=80',
        width: 1200,
        height: 630,
        alt: 'Lanzarote volcanic landscape',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Lanzaroute '26 · Gonzalo & Paula",
    description: '7 días de volcanes, playas y gastronomía. Abril 19–25, 2026.',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className="antialiased">{children}</body>
    </html>
  );
}
