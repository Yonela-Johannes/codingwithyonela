/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    'node_modules/flowbite-react/lib/esm/**/*.js',
  ],
  theme: {
    extend: {
      colors: {
        cl_primary: '#ff8906',
        cl_alt: '#252335',
        bg_core: '#343541',
        bg_primary: '#242323',
        bg_card: '#101627',
        bg_opp: '#172a45',
        bg_light: '#b3b3b3',
        bg_lighter: '#ccd6f6',
        bg_grey: '#a7a9be'
      },
      fontFamily:{
        'tech_mono': ['ShareTechMono'],
      }
    },
  },
  plugins: [
    require('flowbite/plugin'),
  ],
}