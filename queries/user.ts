import { gql } from "@apollo/client"

export const USER_DETAILS_FRAGMENT = gql`
	fragment AllUserDetails on User {
		_id
		name
		email
		avatar
		contact
		location
		hidden
	}
`

export const USER_DETAILS = gql`
	${USER_DETAILS_FRAGMENT}
	query getUser($id: ID!) {
		user(_id: $id) {
			...AllUserDetails
		}
	}
`
export const UPDATE_USER = gql`
	${USER_DETAILS_FRAGMENT}
	mutation (
		$id: ID
		$name: String
		$email: String
		$avatar: String
		$contact: String
		$location: String
		$hidden: Boolean
	) {
		updateUser(
			id: $id
			name: $name
			email: $email
			avatar: $avatar
			contact: $contact
			location: $location
			hidden: $hidden
		) {
			...AllUserDetails
		}
	}
`
