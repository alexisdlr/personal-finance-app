import type { Config } from "tailwindcss";

const config: Config = {
    darkMode: ["class"],
    content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
  		colors: {
  			'beige-500': '#98908B',
  			'beige-100': '#F8F4F0',
  			'grey-900': '#201F24',
  			'grey-500': '#696868',
  			'grey-300': '#B3B3B3',
  			'grey-100': '#F2F2F2',
  			'secondary-green': '#277C78',
  			'secondary-yellow': '#F2CDAC',
  			'secondary-cyan': '#82C9D7',
  			'secondary-navy': '#626070',
  			'secondary-red': '#C94736',
  			'secondary-purple': '#826CB0',
  			'magenta': '#934F6F',
  			'purple': '#AF81BA',
  			'turquoise': '#597C7C',
  			'brown': '#93674F',
  			'army-green': '#7F9161',
  			'gold': '#CAB361',
  			'orange': '#BE6C49',
  			'navy-grey': '#97A0AC',
  			'blue': '#3F82B2'
  		},
  		backgroundImage: {
  			auth: "url('/images/illustration-authentication.svg')"
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
