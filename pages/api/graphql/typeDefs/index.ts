import { gql } from "apollo-server-micro"
import { DocumentNode } from "graphql"

import { User } from "./user"
import { Ad } from "./ad"

const Query: DocumentNode = gql`
	type Query {
		user(_id: ID, email: String): User
		ads(
			skip: Int
			limit: Int
			filter: String
			location: String
			exclude: [String]
			priceMin: Float
			priceMax: Float
			sortBy: String
			published: Boolean
			saved: Boolean
		): [Ad]
		ad(slug: String): Ad
		similar(slug: String): [Ad]
		maxPrice: Float
	}
	type Mutation {
		updateUser(
			id: ID
			name: String
			email: String
			avatar: String
			contact: String
			location: String
			hidden: Boolean
		): User

		createAd(
			title: String
			description: String
			category: String
			images: [String]
			price: Float
			adtype: String
			usedFor: String
			condition: String
			shippingBy: String
			negotiable: Boolean
			workingHours: String
			workingPeriod: String
			salaryPeriod: String
			offlineOnly: Boolean
			location: String
			createdBy: String
		): Boolean

		updateAd(
			slug: String
			title: String
			description: String
			category: String
			images: [String]
			price: Float
			usedFor: String
			condition: String
			shippingBy: String
			negotiable: Boolean
			workingHours: String
			workingPeriod: String
			salaryPeriod: String
			offlineOnly: Boolean
			location: String
		): Ad

		saveAd(ad: ID!, user: ID!): Boolean
		unsaveAd(ad: ID!, user: ID!): Boolean
	}
`

const typeDefs: Array<DocumentNode> = [Query, User, Ad]

export default typeDefs
