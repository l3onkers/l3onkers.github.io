/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#8b5cf6',
        'primary-hover': '#7c3aed',
      },
      fontFamily: {
        sans: ['Onest Variable', 'system-ui', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
