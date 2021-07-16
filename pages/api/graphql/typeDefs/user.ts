import { gql } from "apollo-server-micro"
import { DocumentNode } from "graphql"

export const User: DocumentNode = gql`
	type User {
		_id: ID
		name: String!
		email: String
		avatar: String
		contact: String
		hidden: Boolean
		ads(skip: Int, limit: Int): [Ad]
		saved(skip: Int, limit: Int): [Ad]
		follows(skip: Int, limit: Int): [User]
		createdAt: String!
		updatedAt: String!
		lastOnline: String!
	}
`
