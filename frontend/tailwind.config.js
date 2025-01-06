import daisyui from 'daisyui'
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [daisyui],
  daisyui:{
    themes : ["light", "dark", "cupcake", "sky", "forest", "sea", "chocolate", "midnight", "sunset", "frost", "halloween", "funky", "fresh", "nature", "aqua", "royal", "fire", "deep", "light", "dark"],
  },
}