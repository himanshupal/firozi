import Link from "next/link"
import Modal from "components/Modal"
import UserProfile from "components/UserProfile"

import { Fragment, useEffect } from "react"
import { useRouter } from "next/router"
import { useLazyQuery } from "@apollo/client"
import Head from "next/head"

import { USER_DETAILS } from "queries/user"

import userStore from "store/user"
import appState from "store/state"

const User = (): JSX.Element => {
	const {
		query: { user }
	} = useRouter()

	const { push } = useRouter()

	const setLoading = appState((state) => state.setLoading)
	const userId = userStore((state) => state.userId)

	const [getUser, { data, loading, error }] = useLazyQuery(USER_DETAILS)

	useEffect(() => {
		if (userId === "") push("/")
		if (userId && !data) getUser({ variables: { id: userId } })
		if (loading) setLoading("Getting User Details")
		return () => setLoading(false)
	}, [data, loading, userId])

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
					{user === userId && (
						<Link href={`/u/${userId}/edit`} passHref>
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
