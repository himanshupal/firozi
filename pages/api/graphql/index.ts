import { ApolloServer } from "apollo-server-micro"
import typeDefs from "./typeDefs/index"
import resolvers from "./resolvers/index"

const server: ApolloServer = new ApolloServer({
	typeDefs,
	resolvers,
	context: (ctx) => ctx.req,
	tracing: process.env.NODE_ENV === "development",
	playground: process.env.NODE_ENV === "development"
})

export default server.createHandler({ path: "/api/graphql" })

export const config = {
	api: {
		bodyParser: false
	}
}
