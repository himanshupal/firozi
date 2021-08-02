import { Collection, MongoClient } from "mongodb"

import { getCollection, getClient } from "helpers/dbclient"
import { Ad } from "models/Ad"
import { GraphQLError } from "graphql"
import { ApolloError } from "apollo-server-micro"

const updateAd = async (
	_,
	{
		slug,
		title,
		description,
		category,
		images,
		price,
		usedFor,
		condition,
		shippingBy,
		negotiable,
		workingHours,
		workingPeriod,
		salaryPeriod,
		offlineOnly,
		location
	}
): Promise<Ad> => {
	try {
		const client: MongoClient = await getClient()

		const adsCollection: Collection<Ad> = getCollection<Ad>("ads", client)

		const {
			result: { n }
		} = await adsCollection.updateOne(
			{ slug },
			{
				$set: {
					title,
					description,
					category,
					images,
					price,
					usedFor,
					condition,
					shippingBy,
					negotiable,
					workingHours,
					workingPeriod,
					salaryPeriod,
					offlineOnly,
					location
				}
			}
		)

		let ad: Ad

		if (n === 1) {
			ad = await adsCollection.findOne({ slug })
			await client.close()
		} else throw new ApolloError("Unknown error updating ad...")

		return ad
	} catch (error) {
		throw new GraphQLError(error)
	}
}

export default updateAd
