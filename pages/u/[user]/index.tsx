// @ts-nocheck

import Link from "next/link"
import Modal from "components/Modal"
import Loading from "components/Loading"
import UserProfile from "components/UserProfile"

import { Fragment, useEffect } from "react"
import { useRouter } from "next/router"
import { useSession } from "next-auth/client"
import { gql, useLazyQuery } from "@apollo/client"
import Head from "next/head"

const USER_DETAILS = gql`
	query getUser($id: String!) {
		user(_id: $id) {
			_id
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

	if (loading || fetchingUser) {
		return <Loading />
	}

	if (error) {
		return <Modal title={error?.networkError?.name || error.message} fixed />
	}

	return (
		<Fragment>
			<Head>
				<title>Profile | Firozi</title>
			</Head>

			<div className="flex flex-col justify-content items-center overflow-auto px-14">
				<div className="text-5xl font-bold py-6 flex">
					About Me
					{user === session?.user?.sub && (
						<Link href={`/u/${session?.user?.sub}/edit`} passHref>
							<img
								className="-translate-y-5 cursor-pointer"
								src="/icons/edit.svg"
								alt="Edit Icon"
							/>
						</Link>
					)}
				</div>
				{data?.user && <UserProfile userDetails={data.user} />}
			</div>
		</Fragment>
	)
}

export default User
