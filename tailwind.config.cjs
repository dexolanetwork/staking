/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      transitionProperty: {
        transform: 'transform',
        opacity: 'opacity',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
        'border-glow': {
          '0%':   { borderColor: 'rgba(99,102,241,0.1)' },
          '50%':  { borderColor: 'rgba(99,102,241,0.5)' },
          '100%': { borderColor: 'rgba(99,102,241,0.1)' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up':   'accordion-up 0.2s ease-out',
        'border-glow':    'border-glow 2s infinite ease-in-out',
      },
    },
  },
  plugins: [
    require('tailwindcss-animate'),
  ],
};
