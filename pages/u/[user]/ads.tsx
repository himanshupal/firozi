import { useRouter } from "next/router"
import Head from "next/head"
import { Fragment, useEffect } from "react"
import { gql, useQuery } from "@apollo/client"
import AdCard from "components/Ad"

import appState from "store/state"
import userState from "store/user"
import shallow from "zustand/shallow"

import { AD_CORE_FIELDS_FRAGMENT } from "queries/ads"

import { Swiper, SwiperSlide } from "swiper/react"
import SwiperCore, { Navigation } from "swiper/core"

import "swiper/swiper.min.css"
import "swiper/components/navigation/navigation.min.css"
import "swiper/components/pagination/pagination.min.css"

SwiperCore.use([Navigation])

const USER_ADS = gql`
	${AD_CORE_FIELDS_FRAGMENT}
	query UserAds($user: ID) {
		user(_id: $user) {
			_id
			name
			ads {
				...AdCoreFields
			}
			saved: ads(saved: true) {
				...AdCoreFields
			}
		}
	}
`

const Carousel = ({ data, title, key }) => (
	<div>
		<div className="text-5xl text-center sm:text-left font-bold px-10 lg:px-24 pb-2.5">
			{title}
		</div>
		<div className="w-full flex overflow-auto">
			<div className="w-full flex md:px-10 pb-0 md:pb-7 overflow-auto">
				<Swiper slidesPerView={"auto"} navigation={true}>
					{data?.map((ad, index) => (
						<SwiperSlide
							key={`slide-${key}-${index + 1}`}
							className="slide__width-auto flex"
						>
							<AdCard ad={ad} userId={ad.createdBy?._id?.toString()} />
						</SwiperSlide>
					))}
				</Swiper>
			</div>
		</div>
	</div>
)

const UserAds = () => {
	const {
		query: { user }
	} = useRouter()

	const { push } = useRouter()
	const userId = userState((state) => state.userId)

	useEffect(() => {
		if (userId === "") push("/")
	}, [userId])

	const { data, loading, error } = useQuery(USER_ADS, { variables: { user } })

	const [setAppLoading, setAppError] = appState(
		(state) => [state.setLoading, state.setError],
		shallow
	)

	useEffect(() => {
		setAppError(error?.message)
		setAppLoading(loading)
	}, [loading, error])

	return (
		<Fragment>
			<Head>
				<title>User Ads | Firozi</title>
			</Head>

			<div className="flex flex-col gap-10 py-10">
				{data?.user?.ads && (
					<Carousel title="Live Ads" data={data?.user?.ads} key="liveAds" />
				)}

				{data?.user?.saved && (
					<Carousel title="Saved Ads" data={data?.user?.saved} key="savedAds" />
				)}
			</div>
		</Fragment>
	)
}

export default UserAds
