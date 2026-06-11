import type { Config } from "tailwindcss";
import animate from "tailwindcss-animate";

const config: Config = {
  darkMode: ["class", "class"],

  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],

  theme: {
    extend: {
      // colors: {
      //   beige: {
      //     500: "#98908B",
      //     100: "#F8F4F0",
      //   },

      //   grey: {
      //     900: "#201F24",
      //     500: "#696868",
      //     300: "#B3B3B3",
      //     100: "#F2F2F2",
      //   },

      //   secondary: {
      //     green: "#277C78",
      //     yellow: "#F2CDAC",
      //     cyan: "#82C9D7",
      //     navy: "#626070",
      //     red: "#C94736",
      //     purple: "#826CB0",
      //   },

      //   magenta: "#934F6F",
      //   purple: "#AF81BA",
      //   turquoise: "#597C7C",
      //   brown: "#93674F",
      //   "army-green": "#7F9161",
      //   gold: "#CAB361",
      //   orange: "#BE6C49",
      //   "navy-grey": "#97A0AC",
      //   blue: "#3F82B2",
      // },

      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },

  plugins: [animate],
};

export default config;
