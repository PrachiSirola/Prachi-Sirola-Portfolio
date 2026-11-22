/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        paper: { DEFAULT: '#F6EFE4', 200: '#EFE5D6', 300: '#E4D6C2' },
        ink: { DEFAULT: '#141210', 700: '#3A342D', 500: '#6B6258', 400: '#8C8377' },
        terra: { DEFAULT: '#C65D3E', 600: '#AD4A2D', 100: '#F1D5C8' },
        obsidian: {
          950: '#07080A',
          900: '#0B0C10',
          850: '#101218',
          800: '#151820',
          700: '#1D212B',
        },
        silver: {
          100: '#F4F5F7',
          200: '#E2E5EB',
          300: '#B8BFC9',
          400: '#8A92A0',
          500: '#5C6472',
        },
      },
      fontFamily: {
        display: ['"Barlow Condensed"', 'system-ui', 'sans-serif'],
hero: ['Anton', 'Impact', 'sans-serif'],
script: ['"Mrs Saint Delafield"', 'cursive'],
        serif: ['"Cormorant Garamond"', '"Playfair Display"', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      backgroundImage: {
        'silver-sheen': 'linear-gradient(135deg, #F8FAFC 0%, #CBD5E1 48%, #94A3B8 100%)',
        'metallic-beam':
          'linear-gradient(122deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.04) 24%, rgba(226,232,240,0.32) 38%, rgba(255,255,255,0.06) 52%, rgba(255,255,255,0) 72%)',
      },
      boxShadow: {
        'card-dark': '0 20px 50px -20px rgba(0, 0, 0, 0.75)',
        'glow-subtle': '0 0 40px -12px rgba(226, 232, 240, 0.14)',
      },
    },
  },
  plugins: [],
};
