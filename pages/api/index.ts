import { NextApiHandler, NextApiRequest, NextApiResponse } from "next"
import { ApolloServer } from "apollo-server-micro"
import typeDefs from "./graphql/typeDefs/index"
import { resolvers } from "./graphql/resolvers/index"

// const Api: NextApiHandler<JSON> = async (
// 	req: NextApiRequest,
// 	res: NextApiResponse
// ) => {
// 	res.json("API")
// }

// export default Api

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
