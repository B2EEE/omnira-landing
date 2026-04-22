/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'deep-navy': '#103F73',
        'dark-ink': '#0B1726',
        'omnira-blue': '#1E73D8',
        'signal-cyan': '#2FC7D6',
        'aqua-mint': '#57D6C7',
        'soft-ice': '#F5FAFD',
        'steel-gray': '#66758A',
        'light-border': '#D8E6F2',
        'muted-bg': '#EEF6FB',
      },
      fontFamily: {
        sora: ['Sora', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      keyframes: {
        barwave: {
          '0%, 100%': { transform: 'scaleY(0.4)' },
          '50%': { transform: 'scaleY(1)' },
        },
        floatY: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        pulseRing: {
          '0%': { transform: 'scale(1)', opacity: '1' },
          '100%': { transform: 'scale(1.8)', opacity: '0' },
        },
      },
      animation: {
        barwave: 'barwave 1s ease-in-out infinite',
        floatY: 'floatY 3s ease-in-out infinite',
        pulseRing: 'pulseRing 1.5s ease-out infinite',
      },
    },
  },
  plugins: [],
}
