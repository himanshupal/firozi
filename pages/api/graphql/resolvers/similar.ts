import { Collection, MongoClient } from "mongodb"

import { getCollection, getClient } from "helpers/dbclient"
import { Ad } from "models/Ad"
import { GraphQLError } from "graphql"

const getSimilar = async (_, { slug }: Ad): Promise<Array<Ad>> => {
	try {
		const client: MongoClient = await getClient()

		const adsCollection: Collection<Ad> = getCollection<Ad>("ads", client)

		const ad: Ad = await adsCollection.findOne({ slug })

		const ads: Array<Ad> = await adsCollection
			.aggregate([
				{ $match: { category: ad.category } },
				{
					$lookup: {
						from: "users",
						localField: "createdBy._id",
						foreignField: "_id",
						as: "createdBy"
					}
				},
				{
					$unwind: {
						path: "$createdBy"
					}
				}
			])
			.toArray()

		await client.close()

		return ads
	} catch (error) {
		throw new GraphQLError(error)
	}
}

export default getSimilar
