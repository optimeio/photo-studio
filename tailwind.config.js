/** @type {import('tailwindcss').Config} */
// Force Tailwind to reload config (variables mapped)
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        espresso: 'var(--color-espresso)',
        charcoal: 'var(--color-charcoal)',
        warmIvory: 'var(--color-warm-ivory)',
        champagneGold: 'var(--color-champagne-gold)',
        lightChampagne: 'var(--color-light-champagne)',
        dustyRose: 'var(--color-dusty-rose)',
        softWhite: 'var(--color-soft-white)',
      },
      fontFamily: {
        sans: ['Inter', 'Manrope', 'DM Sans', 'sans-serif'],
        serif: ['Playfair Display', 'Cormorant Garamond', 'DM Serif Display', 'serif']
      }
    },
  },
  plugins: [],
}
 
