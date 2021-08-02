import { Collection, MongoClient } from "mongodb"

import { getCollection, getClient } from "helpers/dbclient"
import { Ad } from "models/Ad"
import { User } from "models/User"
import { GraphQLError } from "graphql"
import { ApolloError } from "apollo-server-micro"

const getAd = async (_, { slug }: Ad): Promise<Ad> => {
	try {
		const client: MongoClient = await getClient()

		const adsCollection: Collection<Ad> = getCollection<Ad>("ads", client)
		const usersCollection: Collection<User> = getCollection<User>(
			"users",
			client
		)

		const ad: Ad = await adsCollection.findOne({ slug })

		if (!ad) throw new ApolloError("Ad not found!")

		const user: User = await usersCollection.findOne({
			_id: ad?.createdBy?._id
		})

		if (user) {
			const userAds: Array<Ad> = await adsCollection
				.find({
					createdBy: { _id: user._id }
				})
				.toArray()
			user.ads = userAds
		}

		await client.close()

		return { ...ad, createdBy: user }
	} catch (error) {
		throw new GraphQLError(error)
	}
}

export default getAd
