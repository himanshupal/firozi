import { Collection, MongoClient, ObjectId } from "mongodb"

import { getCollection, getClient } from "helpers/dbclient"
import { User } from "models/User"
import { GraphQLError } from "graphql"

const getUser = async (_, { _id, email }: User): Promise<User> => {
	try {
		const client: MongoClient = await getClient()

		const usersCollection: Collection<User> = getCollection<User>(
			"users",
			client
		)

		const user: User = await usersCollection.findOne({
			$or: [{ _id: new ObjectId(_id) }, { email }]
		})

		await client.close()

		return user
	} catch (error) {
		throw new GraphQLError(error)
	}
}

export default getUser
