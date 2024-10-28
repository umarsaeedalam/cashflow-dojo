import type { Config } from "tailwindcss"
const {nextui} = require("@nextui-org/react");

const config = {
  darkMode: "class",
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  prefix: "",
  theme: {
  	container: {
  		center: true,
  		padding: '2rem',
  		screens: {
  			'2xl': '1400px'
  		}
  	},
  	extend: {
  		colors: {
            'primary': '#bde9c9',
            'primary-tint': '#cbefd6',
            'primary-shade': '#a7d0b2',
            'secondary': '#2d8c47',
            'secondary-tint': '#4c9d66',
            'secondary-shade': '#257339',
            'accent': '#ea5166',
            'accent-tint': '#ed6b80',
            'accent-shade': '#d64259',
            'neutral': '#fcf9e0',
            'neutral-tint': '#fdfcf5',
            'neutral-shade': '#ece7d2'
  		},
  	}
  },
  plugins: [
        require("tailwindcss-animate"), 
        nextui()
    ],
} satisfies Config

export default config