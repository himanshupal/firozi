import Head from "next/head"
import { NextPageContext } from "next"
import { useRouter } from "next/router"
import { Fragment, useEffect, useState } from "react"
import { getSession } from "next-auth/client"

import { Ad } from "models/Ad"
import AdCard from "components/Ad"
import Login from "components/Login"
import client from "helpers/apolloclient"
import { gql } from "@apollo/client"
import { User } from "models/User"

import store from "store"

interface HomeProps {
	ads: Array<Ad>
	user: User
	userId: string
}

const Home = ({ ads, user, userId }: HomeProps): JSX.Element => {
	const [login, setLogin] = useState<boolean>(false)

	const replaceSaved = store((state) => state.replaceSaved)

	const router = useRouter()

	useEffect(() => replaceSaved(user?.saved), [user])

	return (
		<Fragment>
			<Head>
				<title>Firozi | Ads</title>
			</Head>

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

			{ads?.length ? (
				<div className="bricks p-4 text-center gap-4">
					{ads.map((ad: Ad, index: number) => (
						<AdCard
							details={ad}
							userId={userId}
							router={router}
							// saved={user?.saved}
							loginToggle={setLogin}
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

export const getServerSideProps = async ({ req }: NextPageContext) => {
	const session = await getSession({ req })

	// @ts-ignore
	const userId = session?.user?.sub || null

	const {
		data: { ads, user }
	} = await client.query({
		query: gql`
			query ads($userId: String) {
				ads {
					_id
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
				user(_id: $userId) {
					_id
					saved
				}
			}
		`,
		variables: { userId }
	})

	return { props: { ads, user, userId } }
}
