import { Collection, Cursor, MongoClient } from "mongodb"

import { getCollection, getClient } from "helpers/dbclient"
import { Arguments } from "models/Arguments"
import { Ad } from "models/Ad"
import { User } from "models/User"

const getAds = async (
	user: User,
	{ limit = 0, skip = 0, filter = "" }: Arguments
): Promise<Array<Ad>> => {
	const client: MongoClient = await getClient()

	const adsCollection: Collection<Ad> = getCollection<Ad>("ads", client)

	const adsCursor: Cursor<Ad> = adsCollection
		.find(
			user
				? {
						createdBy: { _id: user?._id },
						title: { $regex: filter, $options: "i" }
				  }
				: { title: { $regex: filter, $options: "i" } }
		)
		.limit(limit)
		.skip(skip)

	const ads: Array<Ad> = []

	while (await adsCursor.hasNext()) {
		ads.push(await adsCursor.next())
	}

	await adsCursor.close()

	await client.close()

	return ads
}

export default getAds
