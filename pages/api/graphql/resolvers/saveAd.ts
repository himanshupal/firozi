import { Collection, MongoClient, ObjectId } from "mongodb"

import { getCollection, getClient } from "helpers/dbclient"
import { User } from "models/User"
import { GraphQLError } from "graphql"

interface SaveAd {
	ad: string
	user: string
}

const saveAd = async (_, { ad, user }: SaveAd): Promise<Boolean> => {
	try {
		const client: MongoClient = await getClient()

		const usersCollection: Collection<User> = getCollection<User>(
			"users",
			client
		)

		const { modifiedCount } = await usersCollection.updateOne(
			{ _id: new ObjectId(user) },
			{ $addToSet: { saved: ad } }
		)

		await client.close()

		return modifiedCount > 0
	} catch (error) {
		throw new GraphQLError(error)
	}
}

export default saveAd
