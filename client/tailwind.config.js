/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    'node_modules/flowbite-react/lib/esm/**/*.js',
    './node_modules/flowbite/**/*.js',
  ],
  theme: {
    extend: {
      colors: {
        cl_primary: '#DA9D3C',
        cl_alt: '#252335',
        bg_core: '#343541',
        bg_primary: '#242323',
        bg_card: '#101627',
        bg_opp: '#172a45',
        bg_light: '#b3b3b3',
        bg_lighter: '#ececec',
        bg_grey: '#a7a9be',
        clr_alt: "#7f57f1",
        cl_primary_alt: "#FFD343"
      },
      fontFamily: {
        'tech_mono': ['ShareTechMono'],
      }
    },
  },
  plugins: [
    require('flowbite/plugin'),
  ],
}