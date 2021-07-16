import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client"
import { setContext } from "@apollo/client/link/context"

import getConfig from "next/config"

const { publicRuntimeConfig } = getConfig()

const httpLink = createHttpLink({ uri: publicRuntimeConfig?.API_URL })

const client = new ApolloClient({
	cache: new InMemoryCache(),
	link: setContext((_, { headers }) => ({
		headers: { ...headers, authorization: publicRuntimeConfig?.CLIENT_ID }
	})).concat(httpLink)
})

export default client
