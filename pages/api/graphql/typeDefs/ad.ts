import { gql } from "apollo-server-micro"
import { DocumentNode } from "graphql"

export const Ad: DocumentNode = gql`
	type Ad {
		_id: ID
		title: String!
		slug: String!
		description: String
		category: ID
		images: [String!]!
		price: Float!
		usedFor: String
		condition: String
		shippingBy: String
		negotiable: Boolean
		workingHours: String
		offlineOnly: Boolean
		location: String!
		createdAt: String!
		updatedAt: String!
		createdBy: User!
	}
`
