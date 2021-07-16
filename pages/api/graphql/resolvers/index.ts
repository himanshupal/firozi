import { IResolvers } from "apollo-server-micro"

import user from "./user"
import ads from "./ads"
import ad from "./ad"

import updateUser from "./updateUser"

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
		updateUser
	}
}

const resolvers: Array<IResolvers> = [resolution]

export default resolvers
