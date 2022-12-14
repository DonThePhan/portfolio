/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'bg-base-1': '#d2c59d',
        'bg-base-2': '#e4d8b4',
        'bg-base-3': '#FFFBF0',
        'bg-base-4': '#71C9CE',
        text: '#282425',
      },
      spacing: {
        project: '42rem',
      },
      aspectRatio: {
        '3/2': '3 / 2',
      },
      animation: {
        fade: 'fadeOut 1s forwards ease-in-out',
      },

      // that is actual animation
      keyframes: (theme) => ({
        fadeOut: {
          '0%': {
            'max-height': '200px',
          },
          '100%': {
            'max-height': 0,
            margin: 0,
          },
        },
      }),
    },
    screens: {
      xs: '480px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
      '3xl': '1920px',
    },
  },
  plugins: [require('daisyui')],
};
