import { gql } from "apollo-server-micro"
import { DocumentNode } from "graphql"

import { User } from "./user"
import { Ad } from "./ad"

const Query: DocumentNode = gql`
	type Query {
		user(username: String, email: String): User
		ads(skip: Int, limit: Int): [Ad]
		ad(slug: String): Ad
	}
`

const typeDefs: Array<DocumentNode> = [Query, User, Ad]

export default typeDefs
