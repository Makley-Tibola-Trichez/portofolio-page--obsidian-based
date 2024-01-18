import colors from 'tailwindcss/colors';
import _tailwindcssAnimate from 'tailwindcss-animate';

export const darkMode = ['class'];
export const content = [
  './pages/**/*.{ts,tsx}',
  './components/**/*.{ts,tsx}',
  './app/**/*.{ts,tsx}',
  './src/**/*.{ts,tsx}',
];

export const prefix = '';

/** @type {import('tailwindcss').Config['theme']} */
export const theme = {
  colors: {
    ...colors,
    border: {
      DEFAULT: '#363636',
    },
    tab: {
      DEFAULT: '#ffffff00',
      active: '#1e1e1e',
      hover: '#454545',
    },
  },
  container: {
    center: true,
    padding: '2rem',
    screens: {
      '2xl': '1400px',
    },
  },
  extend: {
    keyframes: {
      'accordion-down': {
        from: { height: '0' },
        to: { height: 'var(--radix-accordion-content-height)' },
      },
      'accordion-up': {
        from: { height: 'var(--radix-accordion-content-height)' },
        to: { height: '0' },
      },
    },
    animation: {
      'accordion-down': 'accordion-down 0.2s ease-out',
      'accordion-up': 'accordion-up 0.2s ease-out',
    },
  },
};

export const plugins = [_tailwindcssAnimate];
