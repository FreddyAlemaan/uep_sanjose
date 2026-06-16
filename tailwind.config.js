/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        /* Paleta institucional: azul y blanco, con dorado como acento */
        primary:        '#1B4D8C', // Azul marino del borde y texto del escudo
        'primary-dark': '#102E54', // Variante oscura para fondos (footer, overlays)
        secondary:      '#D4A937', // Dorado amarillento — acento cálido (antes rosa)
        band:           '#7FA8D9', // Azul claro de la cinta diagonal "SAN JOSÉ"
        accent:         '#EAF1F8', // Gris plateado del fondo del escudo, en tono claro
        neutral:        '#2D2D2D',
        light:          '#FFFFFF',
      },
      fontFamily: {
        sans:    ['Inter', 'system-ui', 'sans-serif'],
        display: ['"Playfair Display"', 'Georgia', 'serif'],
      },
      backgroundImage: {
        'hero-gradient': 'linear-gradient(to bottom, rgba(16,46,84,0.75) 0%, rgba(16,46,84,0.55) 50%, rgba(16,46,84,0.85) 100%)',
        'cta-gradient':  'linear-gradient(to right, rgba(27,77,140,0.88), rgba(27,77,140,0.72))',
      },
    },
  },
  plugins: [],
};
