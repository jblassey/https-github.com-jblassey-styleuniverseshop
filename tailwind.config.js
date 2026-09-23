/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    // Mobile-first breakpoints. sm is intentionally close to Tailwind's
    // default but the rest are tuned for the layouts this project needs.
    screens: {
      sm: '480px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      white: '#FAFAF8',
      black: '#0A0A0A',
      charcoal: {
        DEFAULT: '#1C1C1B',
        light: '#2B2B2A',
      },
      grey: {
        50: '#F5F5F3',
        100: '#E9E9E6',
        200: '#D4D4D0',
        300: '#B0B0AB',
        400: '#8A8A85',
        500: '#6B6B66',
        600: '#4C4C48',
      },
      silver: '#C7C7C1',
      tan: {
        DEFAULT: '#8C6F4E',
        light: '#B79C79',
      },
      success: '#3F6B4E',
      error: '#8C3B2E',
    },
    fontFamily: {
      display: ['"Archivo Expanded"', 'Archivo', 'sans-serif'],
      sans: ['Archivo', 'sans-serif'],
    },
    fontSize: {
      // Fluid-ish fixed scale, mobile-first. Pair with the .text-* utility
      // classes in index.css for the canonical type ramp.
      xs: ['0.75rem', { lineHeight: '1.4' }],
      sm: ['0.875rem', { lineHeight: '1.5' }],
      base: ['1rem', { lineHeight: '1.6' }],
      lg: ['1.125rem', { lineHeight: '1.6' }],
      xl: ['1.375rem', { lineHeight: '1.4' }],
      '2xl': ['1.75rem', { lineHeight: '1.25' }],
      '3xl': ['2.25rem', { lineHeight: '1.15' }],
      '4xl': ['2.75rem', { lineHeight: '1.1' }],
      '5xl': ['3.5rem', { lineHeight: '1.05' }],
      '6xl': ['4.5rem', { lineHeight: '1' }],
    },
    extend: {
      spacing: {
        18: '4.5rem',
        22: '5.5rem',
        30: '7.5rem',
      },
      maxWidth: {
        container: '1440px',
        prose: '65ch',
      },
      borderRadius: {
        none: '0px',
        sm: '2px',
        DEFAULT: '2px',
        md: '4px',
        full: '9999px',
      },
      boxShadow: {
        none: 'none',
        sm: '0 1px 2px rgba(10, 10, 10, 0.06)',
        DEFAULT: '0 2px 8px rgba(10, 10, 10, 0.08)',
      },
      transitionDuration: {
        DEFAULT: '200ms',
      },
      transitionTimingFunction: {
        DEFAULT: 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      letterSpacing: {
        wide: '0.04em',
        wider: '0.08em',
        widest: '0.16em',
      },
    },
  },
  plugins: [],
};
