import { ApolloServer } from "apollo-server-micro"
import typeDefs from "./typeDefs/index"
import resolvers from "./resolvers/index"

const server: ApolloServer = new ApolloServer({
	typeDefs,
	resolvers,
	tracing: true,
	playground: true
})

export default server.createHandler({ path: "/api/graphql" })

export const config = {
	api: {
		bodyParser: false
	}
}
