module.exports = {
	purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
	mode: "jit",
	theme: {
		fontFamily: {
			cursive: ["Playball", "cursive"],
			sans: ["Sen", "sans-serif"]
		},
		extend: {
			colors: {
				blood: "#67000c"
			},
			height: {
				menu: "calc(100vh - 52px)"
			},
			inset: {
				header: "52px"
			}
		}
	}
}
