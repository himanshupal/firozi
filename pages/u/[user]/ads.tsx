import { useRouter } from "next/router"
import Head from "next/head"
import { Fragment, useEffect } from "react"
import { gql, useQuery } from "@apollo/client"
import AdCard from "components/Ad"

import appState from "store/state"
import shallow from "zustand/shallow"

import { Swiper, SwiperSlide } from "swiper/react"
import SwiperCore, { Navigation } from "swiper/core"

import "swiper/swiper.min.css"
import "swiper/components/navigation/navigation.min.css"
import "swiper/components/pagination/pagination.min.css"

SwiperCore.use([Navigation])

const AD_FRAGMENT = gql`
	fragment AdCoreFields on Ad {
		_id
		slug
		price
		title
		adtype
		category
		location
		negotiable
		description
		images
		createdBy {
			_id
			name
		}
	}
`

const USER_ADS = gql`
	${AD_FRAGMENT}
	query UserAds($user: String) {
		user(_id: $user) {
			published: ads(limit: 3) {
				...AdCoreFields
			}
			drafts: ads {
				...AdCoreFields
			}
			saved: ads {
				...AdCoreFields
			}
		}
	}
`

const UserAds = () => {
	const {
		query: { user }
	} = useRouter()

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
				<div>
					<div className="text-5xl text-center sm:text-left font-bold px-10 lg:px-24 pb-2.5">
						Live Ads
					</div>
					<div className="w-full flex overflow-auto">
						<Swiper slidesPerView={"auto"} navigation={true}>
							{data?.user?.published?.map((ad, index) => (
								<SwiperSlide
									key={`slide-${index + 1}`}
									className="slide__width-auto flex"
								>
									<AdCard
										ad={ad}
										userId={ad.createdBy?._id?.toString()}
										key={"UserAd-" + index}
									/>
								</SwiperSlide>
							))}
						</Swiper>
					</div>
				</div>

				<div>
					<div className="text-5xl text-center sm:text-left font-bold px-10 lg:px-24 pb-2.5">
						Saved Ads
					</div>
					<div className="w-full flex overflow-auto">
						<div className="w-full flex md:px-10 pb-0 md:pb-7 overflow-auto">
							<Swiper slidesPerView={"auto"} navigation={true}>
								{data?.user?.saved?.map((ad, index) => (
									<SwiperSlide
										key={`slide-${index + 1}`}
										className="slide__width-auto flex"
									>
										<AdCard
											ad={ad}
											userId={ad.createdBy?._id?.toString()}
											key={"UserAd-" + index}
										/>
									</SwiperSlide>
								))}
							</Swiper>
						</div>
					</div>
				</div>

				<div>
					<div className="text-5xl text-center sm:text-left font-bold px-10 lg:px-24 pb-2.5">
						Drafts
					</div>
					<div className="w-full flex overflow-auto">
						<Swiper slidesPerView={"auto"} navigation={true}>
							{data?.user?.drafts?.map((ad, index) => (
								<SwiperSlide
									key={`slide-${index + 1}`}
									className="slide__width-auto flex"
								>
									<AdCard
										ad={ad}
										userId={ad.createdBy?._id?.toString()}
										key={"UserAd-" + index}
									/>
								</SwiperSlide>
							))}
						</Swiper>
					</div>
				</div>
			</div>
		</Fragment>
	)
}

export default UserAds
