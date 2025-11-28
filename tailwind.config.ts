import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: '#061221',
          card: '#0b1220',
        },
        text: {
          primary: '#E6EEF6',
          secondary: '#9AA4B2',
        },
        accent: {
          primary: '#00C2A8',
          secondary: '#FFB86B',
        },
        error: '#FF4D4F',
        urgency: {
          low: '#52C41A',
          medium: '#FAAD14',
          high: '#FF4D4F',
        }
      },
      borderRadius: {
        'card': '12px',
      },
      screens: {
        'mobile': {'max': '520px'},
        'tablet': {'min': '521px', 'max': '900px'},
        'desktop': {'min': '901px'},
      },
    },
  },
  plugins: [],
};
export default config;
