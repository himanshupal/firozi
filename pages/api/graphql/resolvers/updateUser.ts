import { Collection, MongoClient, ObjectId } from "mongodb"

import { getCollection, getClient } from "helpers/dbclient"
import { User } from "models/User"

const updateUser = async (
	_,
	{ id, email, avatar, contact, hidden, name, location }
): Promise<Boolean> => {
	const client: MongoClient = await getClient()

	const usersCollection: Collection<User> = getCollection<User>("users", client)

	const { modifiedCount } = await usersCollection.updateOne(
		// @ts-ignore
		{ _id: new ObjectId(id) },
		{
			$set: {
				name,
				email,
				avatar,
				contact,
				hidden,
				location
			}
		}
	)

	await client.close()

	return modifiedCount > 0
}

export default updateUser
