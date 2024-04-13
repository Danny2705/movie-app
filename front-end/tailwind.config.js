/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{js,jsx,ts,tsx}'],
	theme: {
		extend: {
			fontFamily: {
				josefin: 'Josefin Sans',
			},
			colors: {
				main: {
					red: '#dc143c',
					activate: '#da3354',
				},
			},
		},
	},
	plugins: [],
};
