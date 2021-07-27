import { gql } from "@apollo/client"

const GET_AVATAR = gql`
	query getAvatar($id: String!) {
		user(_id: $id) {
			_id
			avatar
		}
	}
`

export default GET_AVATAR
