import { ApolloServer, AuthenticationError } from "apollo-server-micro"
import { NextApiRequest, NextApiResponse } from "next"
import typeDefs from "./typeDefs/index"
import resolvers from "./resolvers/index"

const apolloServer: ApolloServer = new ApolloServer({
	typeDefs,
	resolvers,
	context: (ctx) => {
		if (ctx.req) {
			if (ctx.req.headers.authorization === process.env.CLIENT_ID)
				return ctx.req
			console.error("HTTP AUTH ERR !")
			throw new AuthenticationError("Unauthorized request!")
		}
	},
	tracing: process.env.NODE_ENV === "development",
	playground: process.env.NODE_ENV === "development",
	subscriptions: {
		path: "/api/graphql",
		onConnect: async (connectionParams) => {
			if (connectionParams["authorization"] === process.env.CLIENT_ID)
				return { headers: connectionParams }
			console.error("WS AUTH ERR !")
			throw new AuthenticationError("Unauthorized request!")
		}
	}
})

// https://stackoverflow.com/questions/62371284/apollo-server-with-subscriptions-used-inside-next-js-api-routes-websockets-trou

https: type CustomSocket = Exclude<NextApiResponse<any>["socket"], null> & {
	server: Parameters<ApolloServer["installSubscriptionHandlers"]>[0] & {
		apolloServer?: ApolloServer
		apolloServerHandler?: any
	}
}

type CustomNextApiResponse<T = any> = NextApiResponse<T> & {
	socket: CustomSocket
}

const graphqlWithSubscriptionHandler = (
	req: NextApiRequest,
	res: CustomNextApiResponse
) => {
	const oldOne = res.socket.server.apolloServer

	if (oldOne && oldOne !== apolloServer) delete res.socket.server.apolloServer

	if (!res.socket.server.apolloServer) {
		apolloServer.installSubscriptionHandlers(res.socket.server)
		res.socket.server.apolloServer = apolloServer

		const handler = apolloServer.createHandler({ path: "/api/graphql" })

		res.socket.server.apolloServerHandler = handler
		oldOne?.stop()
	}

	return res.socket.server.apolloServerHandler(req, res)
}

export default graphqlWithSubscriptionHandler

export const config = {
	api: {
		bodyParser: false
	}
}
