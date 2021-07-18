import { Collection, MongoClient, ObjectId } from "mongodb"

import { getCollection, getClient } from "helpers/dbclient"
import { Ad } from "models/Ad"

const createAd = async (
	_,
	{
		title,
		description,
		category,
		images,
		adtype,
		price,
		usedFor,
		condition,
		shippingBy,
		negotiable,
		workingHours,
		workingPeriod,
		salaryPeriod,
		offlineOnly,
		location,
		createdBy
	}
): Promise<Boolean> => {
	const client: MongoClient = await getClient()

	const adsCollection: Collection<Ad> = getCollection<Ad>("ads", client)

	const {
		result: { n }
	} = await adsCollection.insertOne({
		_id: new ObjectId(),
		title,
		description,
		category,
		images,
		adtype,
		price,
		usedFor,
		condition,
		shippingBy,
		negotiable,
		workingHours,
		workingPeriod,
		salaryPeriod,
		offlineOnly,
		location,
		createdBy: {
			_id: new ObjectId(createdBy)
		},
		slug:
			title &&
			encodeURI(
				title?.replace(/\s+/g, "-")?.slice(0, 50)?.toLowerCase() +
					"-" +
					Date.now()
			)
	})

	await client.close()

	return n === 1
}

export default createAd
