import type { Config } from "tailwindcss"

const config = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
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
  			'custom-background-color': {
  				light: '#80ffd4',
  				dark: '#00ffa6'
  			},
  			'custom-pink': {
  				'100': '#FDE7EF',
  				'200': '#FBCFDF',
  				'300': '#F8B7CF',
  				'400': '#F69FBF',
  				'500': '#F070A1',
  				'600': '#E34D84',
  				'700': '#C34271',
  				'800': '#A33660',
  				'900': '#832A4F'
  			},
  			'custom-teal': {
  				'100': '#E6FFF8',
  				'200': '#B3FFE6',
  				'300': '#80FFD4',
  				'400': '#4DFFC2',
  				'500': '#16FFBD',
  				'600': '#12C998',
  				'700': '#0E9573',
  				'800': '#0B614E',
  				'900': '#073C2A'
  			},
            'sage': {
                50: '#f1f8f3',
                100: '#e3f1e7',
                200: '#bde9c9',  // Primary color (60%)
                300: '#97dca9',
                400: '#71cf89',
                500: '#4bc269',
                600: '#36a954',
                700: '#36a954',
                800: '#2d8c47',  // Secondary color (30%)
                900: '#28572a',
            },
            'cream': {
                50: '#fefdf9',
                100: '#fcf9e0',  // Accent color (10%)
                200: '#f9f3c1',
                300: '#f6eda2',
                400: '#f3e783',
                500: '#f0e164',
                600: '#eddb45',
                700: '#e9d426',
                800: '#cbb60f',
                900: '#a8960d',
            },
            'stone': {
                50: '#fafaf9',
                100: '#f5f5f4',
                200: '#e7e5e4',
                300: '#d6d3d1',
                400: '#d6d3d1',
                500: '#78716c',
                600: '#57534e',
                700: '#44403c',
                800: '#292524',
                900: '#1c1917',
            },
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
  		keyframes: {
  			'accordion-down': {
  				from: {
  					height: '0'
  				},
  				to: {
  					height: 'var(--radix-accordion-content-height)'
  				}
  			},
  			'accordion-up': {
  				from: {
  					height: 'var(--radix-accordion-content-height)'
  				},
  				to: {
  					height: '0'
  				}
  			},
  			'border-beam': {
  				'100%': {
  					'offset-distance': '100%'
  				}
  			}
  		},
  		animation: {
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out',
  			'border-beam': 'border-beam calc(var(--duration)*1s) infinite linear'
  		},
  		boxShadow: {
  			custom: '0px 4px 16px rgba(0, 0, 0, 0.25)'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config