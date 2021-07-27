module.exports = {
	purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
	mode: "jit",
	theme: {
		extend: {
			fontFamily: {
				cursive: ["Playball", "cursive"],
				sans: ["Sen", "sans-serif"]
			},
			colors: {
				blood: "#364ac5"
			},
			height: {
				content: "calc(100vh - 52px)"
			},
			inset: {
				header: "52px"
			}
		}
	}
}
