import { Collection, Cursor, FilterQuery, MongoClient } from "mongodb"

import { getCollection, getClient } from "helpers/dbclient"
import { Arguments } from "models/Arguments"
import { Ad } from "models/Ad"
import { User } from "models/User"
import { GraphQLError } from "graphql"

const getAds = async (
	user: User,
	{
		limit = 10,
		skip = 0,
		filter = "",
		location = "",
		sortBy,
		exclude = [],
		priceMin = 0,
		priceMax = 10_000
	}: Arguments
): Promise<Array<Ad>> => {
	try {
		const client: MongoClient = await getClient()

		const adsCollection: Collection<Ad> = getCollection<Ad>("ads", client)

		const [sortValue, sortDirection] = (sortBy || "published_Inc").split(/_/)

		const query: FilterQuery<Ad> = {
			title: { $regex: filter, $options: "i" },
			location: { $regex: location, $options: "i" },
			price: { $gte: priceMin, $lte: priceMax },
			category: { $nin: exclude }
		}

		const adsCursor: Cursor<Ad> = adsCollection
			.find(user ? { ...query, createdBy: { _id: user?._id } } : query)
			.limit(limit)
			.skip(skip)
			.sort(sortValue, sortDirection === "Inc" ? 1 : -1)

		const ads: Array<Ad> = []

		while (await adsCursor.hasNext()) {
			ads.push(await adsCursor.next())
		}

		await adsCursor.close()

		await client.close()

		return ads
	} catch (error) {
		throw new GraphQLError(error)
	}
}

export default getAds
