import { IResolvers } from "apollo-server-micro"

import user from "./user"
import ads from "./ads"
import ad from "./ad"

import updateUser from "./updateUser"
import createAd from "./createAd"
import unsaveAd from "./unsaveAd"
import saveAd from "./saveAd"

const resolution: IResolvers = {
	Query: {
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
	}
}

const resolvers: Array<IResolvers> = [resolution]

export default resolvers
