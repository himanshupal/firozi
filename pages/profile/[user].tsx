import { useRouter } from "next/router"

const User = (): JSX.Element => {
	const {
		query: { user }
	} = useRouter()

	return <div>{user}</div>
}

export default User
