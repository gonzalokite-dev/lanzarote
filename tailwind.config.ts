import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'lz-bg': '#0a0a0a',
        'lz-surface': '#141414',
        'lz-card': '#1c1c1c',
        'lz-primary': '#e8622a',
        'lz-secondary': '#2dd4bf',
        'lz-text': '#f5f0e8',
        'lz-muted': '#6b6b6b',
      },
      fontFamily: {
        playfair: ['Playfair Display', 'Georgia', 'serif'],
        mono: ['Space Mono', 'monospace'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'volcanic-hero': `
          radial-gradient(ellipse at 50% 120%, rgba(232,98,42,0.25) 0%, transparent 60%),
          radial-gradient(ellipse at 80% 50%, rgba(45,212,191,0.1) 0%, transparent 50%),
          linear-gradient(180deg, #050505 0%, #0f0806 40%, #0a0e0d 100%)
        `,
      },
    },
  },
  plugins: [],
};

export default config;
