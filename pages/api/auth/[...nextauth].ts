import { NextApiHandler } from "next"
import { PrismaClient } from "@prisma/client"

import NextAuth, { NextAuthOptions } from "next-auth"
import Adapters from "next-auth/adapters"
import Providers from "next-auth/providers"

const options: NextAuthOptions = {
	providers: [
		Providers.GitHub({
			clientId: process.env.GITHUB_ID,
			clientSecret: process.env.GITHUB_SECRET
		}),
		Providers.Google({
			clientId: process.env.GOOGLE_ID,
			clientSecret: process.env.GOOGLE_SECRET
		}),
		Providers.LinkedIn({
			clientId: process.env.LINKEDIN_ID,
			clientSecret: process.env.LINKEDIN_SECRET
		}),
		Providers.Zoom({
			clientId: process.env.ZOOM_ID,
			clientSecret: process.env.ZOOM_SECRET
		})
	],
	session: {
		maxAge: 30 * 24 * 60 * 60
	},
	secret: process.env.AUTH_SECRET,
	adapter: Adapters.Prisma.Adapter({ prisma: new PrismaClient() })
}

const authHandler: NextApiHandler = async (req, res) => {
	await NextAuth(req, res, options)
}

export default authHandler
