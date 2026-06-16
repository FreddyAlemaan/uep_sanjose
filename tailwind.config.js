/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary:      '#1B3A6B',
        'primary-dark':'#0F2347',
        secondary:    '#C8972B',
        accent:       '#F5F0E8',
        neutral:      '#2D2D2D',
        light:        '#FFFFFF',
      },
      fontFamily: {
        sans:    ['Inter', 'system-ui', 'sans-serif'],
        display: ['"Playfair Display"', 'Georgia', 'serif'],
      },
      backgroundImage: {
        'hero-gradient': 'linear-gradient(to bottom, rgba(15,35,71,0.75) 0%, rgba(15,35,71,0.55) 50%, rgba(15,35,71,0.85) 100%)',
        'cta-gradient':  'linear-gradient(to right, rgba(27,58,107,0.88), rgba(27,58,107,0.72))',
      },
    },
  },
  plugins: [],
};
