/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        theme: {
          bg: '#F4FBF3',
          card: '#FFFFFF',
          border: '#D8ECD6',
          borderSubtle: '#E6F4E5',
          primary: '#22A45D',
          primaryDark: '#1D8E50',
          mint: '#6FE3A6',
          textHead: '#1A2E22',
          textBody: '#4E5E54',
          textMuted: '#718778',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
