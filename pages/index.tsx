import Head from "next/head"
import Link from "next/link"
import { Fragment } from "react"

import AdCard from "components/Ad"
import { Ad } from "models/Ad"
import { gql, useQuery } from "@apollo/client"
import Loading from "components/Loading"
import Modal from "components/Modal"

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
	const { data, loading, error } = useQuery(GET_ADS)

	if (loading) {
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

			<Link href="/ad/create" passHref>
				<button className="bg-blood p-2 absolute bottom-6 right-0 text-center text-sm text-white">
					<img
						width="24"
						height="24"
						className="inline-block"
						src="/icons/plus-lg.svg"
						alt="Icon Plus"
					/>
					<div>New Ad</div>
				</button>
			</Link>

			{data?.ads?.length ? (
				<div className="bricks p-4 text-center gap-4">
					{data.ads.map((ad: Ad, index: number) => (
						<AdCard details={ad} key={`ad-${index + 1}`} />
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
		</Fragment>
	)
}
export default Home
