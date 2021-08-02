import { Collection, Cursor, FilterQuery, MongoClient, ObjectId } from "mongodb"

import { getCollection, getClient } from "helpers/dbclient"
import { Arguments } from "models/Arguments"
import { Ad } from "models/Ad"
import { User } from "models/User"
import { GraphQLError } from "graphql"

const getAds = async (
	user: User,
	{
		limit = 0,
		skip = 0,
		filter = "",
		location = "",
		sortBy,
		exclude = [],
		priceMin = 0,
		priceMax = 10_000,
		published,
		saved
	}: Arguments
): Promise<Array<Ad>> => {
	try {
		const client: MongoClient = await getClient()

		const adsCollection: Collection<Ad> = getCollection<Ad>("ads", client)

		const [sortValue, sortDirection] = (sortBy || "published_Inc").split(/_/)

		let query: FilterQuery<Ad> = {
			title: { $regex: filter, $options: "i" },
			location: { $regex: location, $options: "i" },
			price: { $gte: priceMin, $lte: priceMax },
			category: { $nin: exclude },
			published: { $ne: false }
		}

		if (published === false) {
			query = { ...query, published: false }
		}

		if (saved) {
			const usersCollection: Collection<User> = getCollection<User>(
				"users",
				client
			)
			const currentUser = await usersCollection
				.aggregate([
					{
						$match: {
							_id: user._id
						}
					},
					{
						$addFields: {
							saved: {
								$map: {
									input: "$saved",
									as: "ad",
									in: {
										$toObjectId: "$$ad"
									}
								}
							}
						}
					},
					{
						$lookup: {
							from: "ads",
							localField: "saved",
							foreignField: "_id",
							as: "saved"
						}
					},
					{
						$project: {
							saved: { $slice: ["$saved", 0, limit || 25] }
						}
					}
				])
				.next()

			await client.close()
			return currentUser.saved as Array<Ad>
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
