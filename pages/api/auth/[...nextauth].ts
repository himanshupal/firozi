import { NextApiHandler } from "next"

import NextAuth, { NextAuthOptions, Profile, Session } from "next-auth"
import Providers from "next-auth/providers"

interface UserSession extends Session {
	sub?: string
}

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
		jwt: true,
		maxAge: 3 * 24 * 60 * 60
	},
	secret: process.env.AUTH_SECRET,
	database: process.env.MONGO_URI,
	debug: process.env.NODE_ENV === "development",
	callbacks: {
		session: async (session: UserSession, user: Profile) => {
			session.user = user
			return session
		}
	},
	pages: {
		verifyRequest: "/verify"
	}
}

const authHandler: NextApiHandler = async (req, res) => {
	await NextAuth(req, res, options)
}

export default authHandler
