import { IResolvers } from "apollo-server-micro"

import user from "./user"
import ads from "./ads"
import ad from "./ad"

const resolution: IResolvers = {
	Query: {
		user,
		ads,
		ad
	},
	User: {
		ads
	}
}

const resolvers: Array<IResolvers> = [resolution]

export default resolvers
