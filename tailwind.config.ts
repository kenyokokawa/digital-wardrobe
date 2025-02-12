import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        chakra: ["Chakra Petch", "sans-serif"],
        inter: ["Inter", "sans-serif"],
        silkscreen: ["Silkscreen", "sans-serif"],
      },
    },
  },
  plugins: [],
} satisfies Config;
