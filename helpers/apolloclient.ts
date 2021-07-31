import { WebSocketLink } from "@apollo/client/link/ws"
import { setContext } from "@apollo/client/link/context"
import { getMainDefinition } from "@apollo/client/utilities"
import {
	ApolloClient,
	createHttpLink,
	InMemoryCache,
	split
} from "@apollo/client"

import getConfig from "next/config"

const { publicRuntimeConfig } = getConfig()

const httpLink = setContext((_, { headers }) => ({
	headers: { ...headers, authorization: publicRuntimeConfig?.CLIENT_ID }
})).concat(createHttpLink({ uri: publicRuntimeConfig?.API_URL }))

const wsLink = process.browser
	? new WebSocketLink({
			uri: publicRuntimeConfig?.WS_URL,
			options: {
				reconnect: true,
				connectionParams: {
					authorization: publicRuntimeConfig?.CLIENT_ID
				}
			}
	  })
	: null

const splitLink = process.browser
	? split(
			({ query }) => {
				const definition = getMainDefinition(query)
				return (
					definition.kind === "OperationDefinition" &&
					definition.operation === "subscription"
				)
			},
			wsLink,
			httpLink
	  )
	: httpLink

const client = new ApolloClient({
	cache: new InMemoryCache(),
	link: splitLink
})

export default client
