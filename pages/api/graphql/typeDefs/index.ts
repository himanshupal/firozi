import { gql } from "apollo-server-micro"
import { DocumentNode } from "graphql"

const definition: DocumentNode = gql`
	type Ad {
		_id: ID
		title: String!
		description: String
		category: String!
		images: [String!]!
		price: Float!
		discount: Float
		discountTill: Float
		usedFor: String
		condition: String!
		shippingHandler: String
		pfAvailable: Boolean
		workingHours: Int!
		offlineOnly: Boolean
		location: String!
		createdAt: String!
		createdBy: User!
	}

	type User {
		_id: ID!
		name: String!
		email: String!
		avatar: String
		contact: Float
		username: String
		password: String
		private: Boolean
		ads: [Ad]
		saved: [Ad]
		follows: [User]
		createdAt: String!
		lastOnline: String!
	}

	type Query {
		user(name: String): User
	}
`

const typeDefs: Array<DocumentNode> = [definition]

export default typeDefs
