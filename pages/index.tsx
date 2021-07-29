import Head from "next/head"
import { useRouter } from "next/router"
import { Fragment, useEffect, useState } from "react"

import { Ad } from "models/Ad"
import AdCard from "components/Ad"
import Login from "components/Login"
import { gql, useLazyQuery } from "@apollo/client"
import { User } from "models/User"

import store from "store"
import appState from "store/state"
import userState from "store/user"
import filterState from "store/filter"
import Modal from "components/Modal"

import { AD_CORE_FIELDS_FRAGMENT } from "queries/ads"

const Home = (): JSX.Element => {
	const [login, setLogin] = useState<boolean>(false)

	const replaceSaved = store((state) => state.replaceSaved)
	const userId = userState((state) => state.userId)
	const setLoading = appState((state) => state.setLoading)
	const searchTerm = filterState((state) => state.searchTerm)
	const locationTerm = filterState((state) => state.locationTerm)

	const router = useRouter()

	const [getAds, { data, loading, error }] = useLazyQuery<{
		user: User
		ads: Array<Ad>
	}>(
		gql`
			${AD_CORE_FIELDS_FRAGMENT}
			query ads($userId: ID, $searchTerm: String, $locationTerm: String) {
				ads(filter: $searchTerm, location: $locationTerm) {
					...AdCoreFields
					condition
					workingHours
					offlineOnly
					workingPeriod
					salaryPeriod
				}
				user(_id: $userId) {
					_id
					saved
				}
			}
		`,
		{
			variables: {
				userId: userId || null,
				searchTerm,
				locationTerm
			}
		}
	)

	useEffect(() => replaceSaved(data?.user?.saved), [data?.user])

	useEffect(() => {
		getAds()
		if (loading) setLoading("Loading Ads")
		else setLoading(false)
	}, [searchTerm, locationTerm, loading])

	useEffect(() => getAds(), [userId])

	return (
		<Fragment>
			<Head>
				<title>Ads | Firozi</title>
			</Head>

			{error && <Modal title={error?.message} fixed />}

			<button
				onClick={() =>
					!!userId ? router.push(`/ad/create`) : setLogin((login) => !login)
				}
				className="bg-blood p-2 absolute bottom-6 right-0 text-center text-sm text-white z-10"
			>
				<img
					width="24"
					height="24"
					className="inline-block"
					src="/icons/plus-lg.svg"
					alt="Icon Plus"
				/>
				<div>New Ad</div>
			</button>
			{data?.ads?.length ? (
				<div className="bricks p-4 text-center gap-4">
					{data?.ads.map((ad: Ad, index: number) => (
						<AdCard ad={ad} userId={userId} key={`ad-${index + 1}`} />
					))}
				</div>
			) : (
				<div className="h-full w-full text-blood font-mono text-8xl flex flex-col items-center justify-center p-5">
					No Ads Yet!
					<div className="font-sans font-thin text-base">
						Click the icon in bottom right corner to create a new Ad.
					</div>
				</div>
			)}
			{login && <Login toggle={setLogin} />}
		</Fragment>
	)
}
export default Home
