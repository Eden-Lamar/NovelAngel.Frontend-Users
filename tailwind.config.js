/* @type {import('tailwindcss').Config} */
import { heroui } from "@heroui/theme";
import daisyui from "daisyui"

export default {
	content: [
		'./index.html',
		'./src/**/*.{js,ts,jsx,tsx}',
		"./node_modules/@heroui/theme/dist/**/*.{js,jsx}",
	],
	theme: {
		extend: {
			backgroundImage: {
				'custom-striped': 'repeating-linear-gradient(-45deg, transparent, transparent 14px, rgba(0, 0, 0, 0.3) 14px, rgba(0, 0, 0, 0.3) 15px)',
				'custom-striped-light': 'repeating-linear-gradient(-45deg, #ffffff, #ffffff 14px,#f8f8f8 14px,#f8f8f8 15px)',
			},
			colors: {
				gold: '#FFD700', // Define gold color shade
			},
			fontFamily: {
				vibes: ['"Great Vibes"', 'cursive'],
			},
		},
	},
	darkMode: "class",
	plugins: [heroui(), daisyui],
	daisyui: {
		themes: false, // disables all built-in themes
	},

};