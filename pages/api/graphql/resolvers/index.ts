import { IResolvers } from "apollo-server-micro"

import maxPrice from "./maxPrice"
import similar from "./similar"
import user from "./user"
import ads from "./ads"
import ad from "./ad"

import updateUser from "./updateUser"
import deleteAd from "./deleteAd"
import updateAd from "./udpateAd"
import createAd from "./createAd"
import unsaveAd from "./unsaveAd"
import saveAd from "./saveAd"

const resolution: IResolvers = {
	Query: {
		maxPrice,
		similar,
		user,
		ads,
		ad
	},
	User: {
		ads
	},
	Mutation: {
		updateUser,
		deleteAd,
		updateAd,
		createAd,
		unsaveAd,
		saveAd
	}
}

const resolvers: Array<IResolvers> = [resolution]

export default resolvers
