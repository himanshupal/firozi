import { Collection, MongoClient } from "mongodb"

import { getCollection, getClient } from "helpers/dbclient"
import { Ad } from "models/Ad"

const getAd = async (_, { slug }: Ad): Promise<Ad> => {
	const client: MongoClient = await getClient()

	const adsCollection: Collection<Ad> = getCollection<Ad>("ads", client)

	const ad: Ad = await adsCollection.findOne({ slug })

	await client.close()

	return ad
}

export default getAd
