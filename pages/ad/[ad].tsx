import Head from "next/head"
import { gql } from "@apollo/client"
import client from "helpers/apolloclient"
import { Ad as AdModel } from "models/Ad"
import { User } from "models/User"
import { GetServerSideProps } from "next"
import { getSession } from "next-auth/client"
import { Fragment } from "react"
import SwiperCore, { Pagination } from "swiper/core"
import { Swiper, SwiperSlide } from "swiper/react"
import { durationShort } from "helpers/duration"

import "swiper/swiper.min.css"
import "swiper/components/pagination/pagination.min.css"

interface AdProps {
	ad: AdModel
	user: User
}

SwiperCore.use([Pagination])

const Ad = ({ ad, user }: AdProps): JSX.Element => {
	return (
		<Fragment>
			<Head>
				<title>{ad.title} | Firozi</title>
			</Head>

			<div className="flex flex-col md:flex-row">
				<div className="flex flex-col w-full md:w-2/3">
					<Swiper
						className="w-full"
						pagination={{ dynamicBullets: true, clickable: true }}
					>
						{ad.images.map((image, index) => (
							<SwiperSlide key={`slide-${index + 1}`}>
								<div className="flex items-center justify-center">
									<img
										className="w-full h-56 sm:72 md:h-96 object-contain"
										src={image}
										alt={`${ad.title}-image-${index + 1}`}
									/>
								</div>
							</SwiperSlide>
						))}
					</Swiper>

					<div className="px-6 md:px-12 pb-3 pt-7">
						<div className="text-5xl md:text-7xl text-green-800 font-extrabold">
							{ad.title}
						</div>
						{ad?.condition && (
							<div className="text-2xl md:text-3xl pt-3 font-semibold">
								{ad.condition} condition
								{ad.usedFor && (
									<span className="text-xl font-light"> ({ad.usedFor})</span>
								)}
							</div>
						)}
						<div className="text-3xl md:text-5xl pt-3 pb-5 font-bold text text-red-900">
							&#8377; {ad.price}/-
							{ad?.salaryPeriod && (
								<span className="text-2xl md:text-4xl font-light">
									{durationShort(ad.salaryPeriod)}
								</span>
							)}
							{true && <span className="font-thin text-lg"> [Negotiable]</span>}
						</div>
						<div className="text-xl font-thin">{ad.description}</div>
					</div>

					<div className="px-6 md:px-12 pb-7">
						<div className="text-lg font-thin">
							Ad posted in
							<span className="font-bold"> {ad.location} </span>
							area
						</div>

						{ad?.shippingBy && (
							<div className="text-lg font-thin">
								Shipping handled by
								<span className="font-bold"> {ad.shippingBy}</span>
							</div>
						)}
					</div>
				</div>
				<div className="flex flex-col w-full md:w-1/3 items-center">
					<div className="text-3xl py-3 font-extralight">Ad posted by</div>
				</div>
			</div>
		</Fragment>
	)
}

export default Ad

export const getServerSideProps: GetServerSideProps = async ({
	req,
	params: { ad: slug }
}) => {
	const session = await getSession({ req })

	// @ts-ignore
	const userId = session?.user?.sub || null

	const {
		data: { ad, user }
	} = await client.query({
		query: gql`
			query ad($slug: String, $userId: String) {
				ad(slug: $slug) {
					description
					category
					images
					price
					adtype
					location
					salaryPeriod
					workingPeriod
					offlineOnly
					offlineOnly
					workingHours
					workingPeriod
					negotiable
					usedFor
					condition
					shippingBy
					title
					_id
				}
				user(_id: $userId) {
					_id
					name
					avatar
					contact
					hidden
				}
			}
		`,
		variables: {
			slug,
			userId
		}
	})

	return {
		props: {
			ad,
			user
		}
	}
}
