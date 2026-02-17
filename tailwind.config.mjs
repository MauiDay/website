/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	safelist: [
		// Schedule component classes (generated dynamically in JS)
		'rounded-xl', 'rounded-full', 'rounded-lg',
		'hover:shadow-lg', 'hover:border-brand-extra/40',
		'from-brand-extra/5', 'to-brand-light/5',
		'border-brand-extra/40', 'border-gray-100', 'border-gray-200',
		'bg-gradient-to-r', 'bg-brand-extra', 'bg-gray-100',
		'group-hover:text-brand-extra',
		'w-10', 'h-10', 'w-3', 'h-3', 'w-px', 'w-8', 'h-8',
		'text-xl', 'text-2xl',
		'leading-tight', 'leading-relaxed',
		'border-2',
		'mb-8', 'md:mb-12',
		'line-clamp-3', 'shrink-0',
	],
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
