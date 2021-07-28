import { gql } from "@apollo/client"

export const AD_CORE_FIELDS_FRAGMENT = gql`
	fragment AdCoreFields on Ad {
		_id
		slug
		price
		title
		adtype
		category
		location
		negotiable
		description
		images
		createdBy {
			_id
			name
		}
	}
`
