// @ts-nocheck

import { useSession } from "next-auth/client"
import { useRouter } from "next/router"
import Link from "next/link"
import { gql, useLazyQuery } from "@apollo/client"
import UserProfile from "components/UserProfile"
import { useEffect } from "react"

import { toast } from "react-toastify"

const USER_DETAILS = gql`
	query getUser($id: String!) {
		user(_id: $id) {
			name
			email
			avatar
			contact
			location
			hidden
		}
	}
`

const User = (): JSX.Element => {
	const {
		query: { user }
	} = useRouter()

	const [session, loading] = useSession()

	const [getUser, { data, loading: fetchingUser, error }] =
		useLazyQuery(USER_DETAILS)

	useEffect(() => {
		if (session) getUser({ variables: { id: user || session?.user?.sub } })
	}, [session])

	if (loading) return <div>Fetching Session...</div>
	if (fetchingUser) return <div>Fetching User...</div>

	if (error) return <div>{error.message}</div>

	return (
		<div className="flex flex-col overflow-auto px-14">
			<div className="text-5xl font-bold py-6 flex">
				About Me
				{user === session?.user?.sub && (
					<Link href="/profile/edit" passHref>
						<img
							className="-translate-y-5 cursor-pointer"
							src="/icons/edit.svg"
							alt="Edit Icon"
						/>
					</Link>
				)}
			</div>
			{data && <UserProfile userDetails={data?.user} />}
		</div>
	)
}

export default User
