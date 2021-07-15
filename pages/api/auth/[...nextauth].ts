import { Session } from "models/Session"
import { User } from "models/User"
import { NextApiHandler } from "next"

import NextAuth, { NextAuthOptions } from "next-auth"
import { session } from "next-auth/client"
import Providers from "next-auth/providers"

import adapter from "./adapter"

const options: NextAuthOptions = {
	providers: [
		Providers.Email({
			server: {
				port: 465,
				host: "smtp.gmail.com",
				secure: true,
				auth: {
					user: process.env.EMAIL_USERNAME,
					pass: process.env.EMAIL_PASSWORD
				},
				tls: { rejectUnauthorized: false }
			},
			from: process.env.EMAIL_FROM
		}),
		Providers.Google({
			clientId: process.env.GOOGLE_ID,
			clientSecret: process.env.GOOGLE_SECRET
		}),
		Providers.LinkedIn({
			clientId: process.env.LINKEDIN_ID,
			clientSecret: process.env.LINKEDIN_SECRET
		}),
		Providers.GitHub({
			clientId: process.env.GITHUB_ID,
			clientSecret: process.env.GITHUB_SECRET
		}),
		Providers.Zoom({
			clientId: process.env.ZOOM_ID,
			clientSecret: process.env.ZOOM_SECRET
		})
	],
	session: {
		maxAge: 3 * 24 * 60 * 60
	},
	secret: process.env.AUTH_SECRET,
	// database: process.env.MONGO_URI,
	adapter,
	database: "mongodb://localhost/test"
	// debug: process.env.NODE_ENV === "development"
}

const authHandler: NextApiHandler = async (req, res) => {
	await NextAuth(req, res, options)
}

export default authHandler
