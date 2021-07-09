import { IResolvers } from "apollo-server-micro"

const resolution: IResolvers = {
	Query: {
		user: (_, { name }) => ({ name })
	}
}

export default [resolution]
