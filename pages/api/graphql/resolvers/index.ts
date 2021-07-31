import { IResolvers } from "apollo-server-micro"
import { PubSub } from "graphql-subscriptions"

import maxPrice from "./maxPrice"
import user from "./user"
import ads from "./ads"
import ad from "./ad"

import updateUser from "./updateUser"
import createAd from "./createAd"
import unsaveAd from "./unsaveAd"
import saveAd from "./saveAd"

export const pubsub = new PubSub()

const resolution: IResolvers = {
	Query: {
		maxPrice,
		user,
		ads,
		ad
	},
	User: {
		ads
	},
	Mutation: {
		updateUser,
		createAd,
		unsaveAd,
		saveAd
	},
	Subscription: {
		subTest: {
			subscribe: (_, args) => pubsub.asyncIterator("maxPrice")
		}
	}
}

const resolvers: Array<IResolvers> = [resolution]

export default resolvers
