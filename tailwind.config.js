/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        canvas: '#f5f9ff',
        ink: '#0f172a',
        steel: '#d6e2ef',
        mist: '#4f6177',
        accent: '#0a66c2',
        accentDark: '#004182',
        mint: '#378fe9',
      },
      fontFamily: {
        sans: ['Sora', 'sans-serif'],
        display: ['Space Grotesk', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 16px 40px rgba(17, 24, 39, 0.1)',
        glow: '0 16px 34px rgba(10, 102, 194, 0.3)',
      },
      backgroundImage: {
        blueprint:
          'linear-gradient(rgba(10, 102, 194, 0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(10, 102, 194, 0.12) 1px, transparent 1px)',
        halo:
          'radial-gradient(circle at top, rgba(10, 102, 194, 0.2), transparent 42%), radial-gradient(circle at bottom right, rgba(55, 143, 233, 0.15), transparent 36%)',
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        pulseSlow: 'pulseSlow 3.6s ease-in-out infinite',
        shimmer: 'shimmer 2.6s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        pulseSlow: {
          '0%, 100%': { opacity: '0.75' },
          '50%': { opacity: '1' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
    },
  },
  plugins: [],
}
