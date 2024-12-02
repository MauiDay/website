/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			colors: {
			brand: {
			  extra: '#E666CC',
			  extraDark: '#C93CAD',
			  light: '#D9EEFF', // light variant
			  DEFAULT: '#9780E5', // main brand color
			  dark: '#0B1D51', // dark variant
			},
		  },
		  fontFamily: {
			  sans: ['Inter', 'sans-serif'], // This makes Inter the default sans-serif font
			  header: ['Poppins', 'sans-serif'],  // This makes Poppins the default header font
		  },
		},
	},
	plugins: [],
}
