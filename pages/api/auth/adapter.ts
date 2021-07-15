import { AdapterInstance } from "next-auth/adapters"
import { EmailConfig } from "next-auth/providers"
import { AppOptions } from "next-auth/internals"
import { ObjectId } from "mongodb"

import { User } from "models/User"
import { Session } from "models/Session"

import { createHash, randomBytes } from "crypto"

import { getClient, getCollection } from "helpers/dbclient"
import { Account } from "models/Account"
import { VerificationRequest } from "models/VerificationRequest"

interface CustomAdapter {
	getAdapter(options: AppOptions): Promise<AdapterInstance<User, User, Session>>
}

const adapter: CustomAdapter = {
	getAdapter: async ({ session, secret, ...options }) => {
		const sessionMaxAge = session.maxAge * 1000 // default is 30 days
		const sessionUpdateAge = session.updateAge * 1000 // default is 1 day

		const hashToken = (token: string) =>
			createHash("sha256").update(`${token}${secret}`).digest("hex")

		return {
			displayName: "MONGO_DB",

			createUser: async (profile: User) => {
				console.info("createUser", profile)

				const client = await getClient()
				const usersCollection = getCollection<User>("users", client)

				const {
					ops: [user]
				} = await usersCollection.insertOne(profile)
				await client.close()

				return user
			},

			getUser: async (id: string) => {
				console.info("getUser", id)

				const client = await getClient()
				const usersCollection = getCollection<User>("users", client)

				const user: User = await usersCollection.findOne({
					_id: new ObjectId(id)
				})
				await client.close()

				return user
			},

			getUserByEmail: async (email: string) => {
				console.info("getUserByEmail", email)

				const client = await getClient()
				const usersCollection = getCollection<User>("users", client)

				const user: User = await usersCollection.findOne({ email })
				await client.close()

				return user
			},

			getUserByProviderAccountId: async (
				providerId: string,
				providerAccountId: string
			) => {
				console.info(`getUserByProviderAccountId`, {
					providerId,
					providerAccountId
				})

				const client = await getClient()
				const accountsCollection = getCollection<Account>("accounts", client)
				const usersCollection = getCollection<User>("users", client)

				const account = await accountsCollection.findOne({
					providerId,
					providerAccountId
				})

				const user = await usersCollection.findOne({ id: providerId })

				await client.close()

				return user
			},

			updateUser: async (user: User) => {
				console.info(`updateUser`, user)

				const client = await getClient()
				const usersCollection = getCollection<User>("users", client)

				await usersCollection.updateOne(
					{ _id: user._id },
					{ $set: { ...user } }
				)

				await client.close()

				return user
			},

			deleteUser: async (userId: string) => {
				console.info(`deleteUser`, userId)

				const client = await getClient()
				const usersCollection = getCollection<User>("users", client)

				await usersCollection.deleteOne({ _id: new ObjectId(userId) })

				await client.close()
			},

			updateSession: async (session: Session, force?: Boolean) => {
				console.info(`updateSession`, { session, force })

				if (
					!force &&
					Number(session.expires) - sessionMaxAge + sessionUpdateAge >
						Date.now()
				) {
					return null
				}

				const client = await getClient()
				const sessionsCollection = getCollection<Session>("sessions", client)

				const {
					upsertedId: { _id }
				} = await sessionsCollection.updateOne(
					{ _id: session._id },
					{ $set: { expires: new Date(Date.now() + sessionMaxAge) } }
				)

				const updatedSession = await sessionsCollection.findOne({ _id })
				await client.close()

				return updatedSession
			},

			deleteSession: async (sessionToken: string) => {
				console.info(`deleteSession`, { sessionToken })

				const client = await getClient()
				const sessionsCollection = getCollection<Session>("sessions", client)

				await sessionsCollection.deleteOne({ sessionToken })
			},

			linkAccount: async (
				userId: string,
				providerId: string,
				providerType: string,
				providerAccountId: string,
				refreshToken: string,
				accessToken: string,
				accessTokenExpires: string
			) => {
				console.info(`linkAccount`, {
					userId,
					providerId,
					providerType,
					providerAccountId,
					refreshToken,
					accessToken,
					accessTokenExpires
				})

				const client = await getClient()
				const accountsCollection = getCollection<Account>("accounts", client)

				await accountsCollection.insertOne({
					userId,
					providerId,
					providerType,
					providerAccountId,
					refreshToken,
					accessToken,
					accessTokenExpires
				})

				await client.close()

				return null
			},

			unlinkAccount: async (
				userId: string,
				providerId: string,
				providerAccountId: string
			) => {
				console.info(`unlinkAccount`, {
					userId,
					providerId,
					providerAccountId
				})

				const client = await getClient()
				const accountsCollection = getCollection<Account>("accounts", client)

				await accountsCollection.deleteOne({ providerId, providerAccountId })

				await client.close()

				return null
			},

			getSession: async (sessionToken: string) => {
				console.info(`getSession`, { sessionToken })

				const client = await getClient()
				const sessionsCollection = getCollection<Session>("sessions", client)

				const session = await sessionsCollection.findOne({ sessionToken })

				await client.close()

				return session
			},

			createSession: async (user: User) => {
				console.info(`createSession`, { user })

				const client = await getClient()
				const sessionsCollection = getCollection<Session>("sessions", client)

				const {
					ops: [session]
				} = await sessionsCollection.insertOne({
					userId: user._id.toString(),
					expires: new Date(Date.now() + sessionMaxAge),
					sessionToken: randomBytes(32).toString("hex"),
					accessToken: randomBytes(32).toString("hex")
				})

				await client.close()

				return session
			},

			getVerificationRequest: async (
				identifier: string,
				verificationToken: string,
				secret: string,
				provider: Required<EmailConfig>
			) => {
				console.info(`getVerificationRequest`, {
					identifier,
					verificationToken,
					secret,
					provider
				})

				const hashedToken = hashToken(verificationToken)

				const client = await getClient()
				const requestsCollection = getCollection<VerificationRequest>(
					"verification_requests",
					client
				)

				const verificationRequest = await requestsCollection.findOne({
					identifier,
					token: hashedToken
				})

				console.info(verificationRequest)

				if (verificationRequest && verificationRequest.expires < new Date()) {
					await requestsCollection.deleteOne({
						identifier_token: {
							identifier,
							token: hashToken(verificationToken)
						}
					})
					return null
				}

				return {
					...verificationRequest,
					id: verificationRequest._id.toString()
				}
			},

			createVerificationRequest: async (
				identifier: string,
				url: string,
				token: string,
				secret: string,
				provider: EmailConfig & { maxAge: number; from: string }
			) => {
				console.info(`createVerificationRequest`, {
					identifier,
					url,
					token,
					secret,
					provider
				})

				const client = await getClient()
				const requestsCollection = getCollection<VerificationRequest>(
					"verification_requests",
					client
				)

				await requestsCollection.insertOne({
					identifier,
					token: hashToken(token),
					expires: new Date(Date.now() + provider.maxAge * 1000)
				})

				await provider.sendVerificationRequest({
					identifier,
					url,
					token,
					baseUrl: options.baseUrl,
					provider
				})
			},

			deleteVerificationRequest: async (
				identifier: string,
				verificationToken: string,
				secret: string,
				provider: Required<EmailConfig>
			) => {
				console.info(`deleteVerificationRequest`, {
					identifier,
					verificationToken,
					secret,
					provider
				})

				const client = await getClient()
				const requestsCollection = getCollection<VerificationRequest>(
					"verification_requests",
					client
				)

				await requestsCollection.deleteOne({
					identifier,
					token: hashToken(verificationToken)
				})

				await client.close()
			}
		}
	}
}

export default adapter
