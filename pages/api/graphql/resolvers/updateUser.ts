import { Collection, MongoClient, ObjectId } from "mongodb"

import { getCollection, getClient } from "helpers/dbclient"
import { User } from "models/User"

const updateUser = async (_, user): Promise<User> => {
	const client: MongoClient = await getClient()

	const usersCollection: Collection<User> = getCollection<User>("users", client)

	const { modifiedCount } = await usersCollection.updateOne(
		{ _id: new ObjectId(user?.id) },
		{
			$set: { ...user }
		}
	)

	await client.close()

	return modifiedCount > 0 ? { ...user, _id: user?.id } : false
}

export default updateUser
