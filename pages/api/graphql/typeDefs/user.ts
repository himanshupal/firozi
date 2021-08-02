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
		ads(skip: Int, limit: Int, published: Boolean, saved: Boolean): [Ad]
		saved(skip: Int, limit: Int): [String]
		follows(skip: Int, limit: Int): [User]
		createdAt: String!
		updatedAt: String!
		lastOnline: String
	}
`
