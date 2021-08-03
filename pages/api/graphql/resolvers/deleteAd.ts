import { Collection, MongoClient } from "mongodb"

import { getCollection, getClient } from "helpers/dbclient"
import { Ad } from "models/Ad"
import { GraphQLError } from "graphql"

const createAd = async (_, { slug }): Promise<Boolean> => {
	try {
		const client: MongoClient = await getClient()

		const adsCollection: Collection<Ad> = getCollection<Ad>("ads", client)

		const {
			result: { n }
		} = await adsCollection.deleteOne({ slug })

		await client.close()

		return n === 1
	} catch (error) {
		throw new GraphQLError(error)
	}
}

export default createAd
