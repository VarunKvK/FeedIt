/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      keyframes: {
        topDown: {
          '0%': { opacity:'10%',top: '0rem' },
          '100%': { opacity:'100%',top: '5.4rem' }
        },
        move: {
          '0%': { opacity:'100%',right: '5rem' },
          '100%': { opacity:'0%',right: '0rem' }
        }
      },
      animation: {
        topDown: 'topDown .5s ease-in-out',
        topDown: 'topDown .2s ease-in-out',
        move: 'move .5s ease-in-out'
      }
    }
  },
  plugins: [],
};
