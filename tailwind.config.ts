import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: { 
      backgroundImage:{
        'loginImg':"url(/bgLogin.jpg)",
        'registerImg':"url(/bgRegister.jpg)",
      },
      colors:{
        lightBlue:'#44B8DC',
        lightGray:'#6C6C6C',
        red:'#F00',
        bgGray:'#F2F2F2'
      }
    },
  },
  plugins: [],
};
export default config;
