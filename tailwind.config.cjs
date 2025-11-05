module.exports = {
  content: ['./index.html', './src/**/*.{ts,tsx,js,jsx}'],
  theme: {
    extend: {
      colors: {
        brand: '#0f172a',
        accent: '#D4AF37'
      },
      perspective: {
        1000: '1000px'
      }
    }
  },
  plugins: [
    require('@tailwindcss/line-clamp') // optional; install plugin if needed
  ]
}
