import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        inter: ["Inter", "sans-serif"],
        chakra: ["Chakra Petch", "sans-serif"],
        silkscreen: ["Silkscreen", "sans-serif"],
      },
    },
  },
  plugins: [],
} satisfies Config;
