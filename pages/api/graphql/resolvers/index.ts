import { IResolvers } from "apollo-server-micro"

const resolution: IResolvers = {
	Query: {
		user: (_, { name }) => ({ name })
	}
}

const resolvers: Array<IResolvers> = [resolution]

export default resolvers
