import { AggregationCursor, Collection, MongoClient } from "mongodb"

import { getCollection, getClient } from "helpers/dbclient"
import { Ad } from "models/Ad"

import { GraphQLError } from "graphql"

const getAd = async (_, __): Promise<number> => {
	try {
		const client: MongoClient = await getClient()

		const adsCollection: Collection<Ad> = getCollection<Ad>("ads", client)

		const cursor: AggregationCursor<Ad> = await adsCollection.aggregate([
			{
				$group: {
					_id: "$_id",
					price: {
						$max: "$price"
					}
				}
			},
			{
				$sort: {
					price: -1
				}
			},
			{
				$limit: 1
			}
		])

		const ad: Ad = await cursor.next()

		await client.close()

		return Number(ad?.price)
	} catch (error) {
		throw new GraphQLError(error)
	}
}

export default getAd
