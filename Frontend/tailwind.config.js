/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        dimgreen :"#7BC678",
        darkgreen:"#00540E",
        extradarkgreen:"#3A6F43",
        sharpgreen:"#1CD84B",
        extrasharpgreen:"#77FE77",
        lightteal:"#DDEEDD",
        black:"#000000",
        purple:"#A55FEF",
        red:"#FF0000",
        lightblue:"#73BAEA",
        lightgray:"#545454",
        yellow:"#FFC300",
        orange:"#FD8916",
                
      }
    },
  },
  plugins: [],
}

