import { gql } from "apollo-server-micro"
import { DocumentNode } from "graphql"

import { User } from "./user"
import { Ad } from "./ad"

const Query: DocumentNode = gql`
	type Query {
		user(_id: String, email: String): User
		ads(skip: Int, limit: Int): [Ad]
		ad(slug: String): Ad
	}
	type Mutation {
		updateUser(
			id: ID
			name: String
			email: String
			avatar: String
			contact: String
			hidden: Boolean
		): Boolean
	}
`

const typeDefs: Array<DocumentNode> = [Query, User, Ad]

export default typeDefs
