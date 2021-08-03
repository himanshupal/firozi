import { gql } from "apollo-server-micro"
import { DocumentNode } from "graphql"

export const User: DocumentNode = gql`
	type User {
		_id: ID
		name: String
		email: String
		avatar: String
		contact: String
		hidden: Boolean
		location: String
		ads(skip: Int, limit: Int, saved: Boolean): [Ad]
		saved(skip: Int, limit: Int): [String]
		createdAt: String!
		updatedAt: String!
	}
`
