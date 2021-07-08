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
				blood: "#67000c"
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
