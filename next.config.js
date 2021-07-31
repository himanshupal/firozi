module.exports = {
	reactStrictMode: true,
	telemetry: false,
	publicRuntimeConfig: {
		WS_URL: process.env.WS_URL,
		API_URL: process.env.API_URL,
		CLIENT_ID: process.env.CLIENT_ID
	}
}
