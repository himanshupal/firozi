import { Collection, MongoClient } from "mongodb"

import { getCollection, getClient } from "helpers/dbclient"
import { Ad } from "models/Ad"
import { User } from "models/User"

const getAd = async (_, { slug }: Ad): Promise<Ad> => {
	const client: MongoClient = await getClient()

	const adsCollection: Collection<Ad> = getCollection<Ad>("ads", client)
	const usersCollection: Collection<User> = getCollection<User>("users", client)

	const ad: Ad = await adsCollection.findOne({ slug })

	const user: User = await usersCollection.findOne({ _id: ad.createdBy._id })

	await client.close()

	return { ...ad, createdBy: user }
}

export default getAd
