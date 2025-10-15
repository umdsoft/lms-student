/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#00A392',
          50: '#E0F7F4',
          100: '#B3EBE2',
          200: '#80DED0',
          300: '#4DD1BE',
          400: '#26C6B0',
          500: '#00A392',
          600: '#008373',
          700: '#006257',
          800: '#00403A',
          900: '#00251F'
        },
        secondary: '#21516A',
        accent: '#FFB74D',
        surface: '#F5F7FA',
        ink: '#1F2A37',
        success: '#2ECC71',
        warning: '#F6C343',
        danger: '#F87171'
      },
      fontFamily: {
        sans: ['"Inter"', 'system-ui', 'sans-serif']
      },
      boxShadow: {
        dashboard: '0 20px 45px -24px rgba(0, 163, 146, 0.45)'
      }
    }
  },
  plugins: []
};
