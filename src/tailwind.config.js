module.exports = {
	theme: {
		extend: {
			colors: {
				ghost: {
					DEFAULT: '#f7f7ff',
					dark: '#d6d6ff',
				},
				onyx: {
					lighter: '#dee3e1',
					light: '#424c48',
					DEFAULT: '#2e3532',
					dark: '#1c211f',
				},
				celestial: {
					lighter: '#c5e4fb',
					light: '#79c0f6',
					DEFAULT: '#279af1',
					dark: '#0c72c0',
					darker: '#074473',
				},
				rufous: {
					DEFAULT: '#a72608',
					dark: '#881e06',
					darker: '#611605',
				},
			},
		},
	},
	variants: {
		extend: {
			display: ['group-hover'],
			borderWidth: ['last'],
			translate: ['group-hover'],
		},
	},
}