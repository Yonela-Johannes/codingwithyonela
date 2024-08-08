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
        bg_lightest: '#FFFCF9',
        bg_light: '#EFF2F1',
        bg_lighter: '#95A3A4',
        bg_grey: '#424B54',
        bg_dark: '#1E293B',
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