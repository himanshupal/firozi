import { Collection, MongoClient, ObjectId } from "mongodb"

import { getCollection, getClient } from "helpers/dbclient"
import { User } from "models/User"

interface SaveAd {
	ad: string
	user: string
}

const saveAd = async (_, { ad, user }: SaveAd): Promise<Boolean> => {
	const client: MongoClient = await getClient()

	const usersCollection: Collection<User> = getCollection<User>("users", client)

	const { modifiedCount } = await usersCollection.updateOne(
		{ _id: new ObjectId(user) },
		{ $addToSet: { saved: ad } }
	)

	await client.close()

	return modifiedCount > 0
}

export default saveAd
