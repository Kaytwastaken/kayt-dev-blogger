module.exports = {
	mode: 'jit',
	purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
	darkMode: false, // or 'media' or 'class'
	theme: {
		extend: {
			fontFamily: {
				'display': ['Nevis'],
				'body': ['RisingSun'],
			},
			spacing: {
				'1h': '10vh',
				'1.5h': '15vh',
				'2h': '20vh',
				'2.5h': '25vh',
				'3h': '30vh',
				'4h': '40vh',
				'5h': '50vh',
				'1p': '10%',
				'2p': '20%',
				'3p': '30%',
				'4p': '40%',
				'5p': '50%',
				'9p': '90%',
			},
			screens: {
				'xs': '450px',
				'xmd': '950px',
				// 'lg': '920px',
			},
			colors: {
				"primary-gray": "var(--primary-gray)",
				"secondary-gray": "var(--secondary-gray)",
			},
		}
	},
	variants: {
		extend: {
			backgroundClip: ['hover'],
			borderRadius: ['hover'],
		},
	},
	plugins: [],
}
