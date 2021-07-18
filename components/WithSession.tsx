import { useSession } from "next-auth/client"

const WithSession = ({ children }): JSX.Element => {
	const [session, loading] = useSession()

	loading && (
		<div className="w-full h-full text-5xl text-blood"> Loading...</div>
	)

	return <div>{children}</div>
}

export default WithSession
