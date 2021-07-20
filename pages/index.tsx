import Head from "next/head"
import { Fragment, useState } from "react"

import AdCard from "components/Ad"
import { Ad } from "models/Ad"
import { gql, useQuery } from "@apollo/client"
import Loading from "components/Loading"
import Modal from "components/Modal"
import Login from "components/Login"
import { useRouter } from "next/router"
import { useSession } from "next-auth/client"

const GET_ADS = gql`
	{
		ads {
			title
			slug
			description
			images
			price
			adtype
			condition
			negotiable
			workingHours
			offlineOnly
			workingPeriod
			salaryPeriod
			location
		}
	}
`

const Home = (): JSX.Element => {
	const [login, setLogin] = useState<boolean>(false)

	const [session, sessionLoading] = useSession()
	const router = useRouter()

	const { data, loading, error } = useQuery(GET_ADS)

	if (loading || sessionLoading) {
		return <Loading message="Loading Ads" />
	}

	if (error) {
		return <Modal title={error?.networkError?.name || error.message} fixed />
	}

	return (
		<Fragment>
			<Head>
				<title>Firozi | Ads</title>
			</Head>

			<button
				onClick={() =>
					// @ts-ignore
					session?.user?.sub
						? router.push(`/ad/create`)
						: setLogin((login) => !login)
				}
				className="bg-blood p-2 absolute bottom-6 right-0 text-center text-sm text-white"
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
					{data.ads.map((ad: Ad, index: number) => (
						<AdCard
							details={ad}
							loginToggle={setLogin}
							router={router}
							// @ts-ignore
							loggedIn={!!session?.user?.sub}
							key={`ad-${index + 1}`}
						/>
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
