import { gql } from "apollo-server-micro"
import { DocumentNode } from "graphql"

export const Ad: DocumentNode = gql`
	type Ad {
		_id: ID
		title: String
		slug: String
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
		offlineOnly: Boolean
		workingPeriod: String
		salaryPeriod: String
		location: String
		createdBy: User
	}
`
