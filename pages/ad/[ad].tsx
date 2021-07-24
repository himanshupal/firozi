import Head from "next/head"
import { gql } from "@apollo/client"
import client from "helpers/apolloclient"
import { Ad as AdModel } from "models/Ad"
import { GetServerSideProps } from "next"
import { getSession } from "next-auth/client"
import { Fragment, useEffect, useState } from "react"
import SwiperCore, { Pagination } from "swiper/core"
import { Swiper, SwiperSlide } from "swiper/react"
import { durationShort } from "helpers/duration"
import Modal from "components/Modal"

import "swiper/swiper.min.css"
import "swiper/components/pagination/pagination.min.css"

SwiperCore.use([Pagination])

interface AdProps {
	ad: AdModel
	error: string
}

const Ad = ({ ad, error }: AdProps): JSX.Element => {
	const [avatar, setAvatar] = useState<string>()

	useEffect(() => {
		const getHash = async () => {
			const res = await fetch("/api/getMD5", {
				method: "POST",
				body: ad.createdBy?.email || "gravatar"
			})
			setAvatar(await res.text())
		}
		getHash()
	}, [ad])

	return (
		<Fragment>
			<Head>
				<title>{ad.title} | Firozi</title>
			</Head>

			{error && <Modal title={error} fixed />}

			<div className="flex flex-col md:flex-row text-blood">
				<div className="flex flex-col w-full md:w-2/3">
					<Swiper
						className="w-full"
						pagination={{ dynamicBullets: true, clickable: true }}
					>
						{ad.images?.map((image, index) => (
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

					{/* <div className="my-4 py-1 mx-6 md:mx-12 px-6 bg-blood text-white text-sm font-thin rounded-full max-w-max">
						{ad.category}
					</div> */}

					<div className="my-4 md:mr-12 px-6 md:px-12 py-1 bg-blue-600 text-white text-sm font-thin overflow-x-auto md:rounded-r-full whitespace-nowrap">
						{ad.category}
					</div>

					<div className="px-6 md:px-12 pb-3">
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

						<div className="md:text-xl font-thin">{ad.description}</div>
					</div>

					<div className="px-6 md:px-12 pb-0 md:pb-7 border-t border-green-800">
						{ad?.workingHours && ad?.workingPeriod && (
							<div className="text-lg pt-1 font-extralight">
								Requires minimum working of{" "}
								<span className="font-bold">
									{ad?.workingHours} hrs/
									{ad.workingPeriod.toLowerCase()}
								</span>
							</div>
						)}

						{ad.offlineOnly && (
							<div className="text-sm pt-1 mt-2 font-mono bg-yellow-500 text-blood max-w-max">
								⚠️ This is an <span className="font-bold">offline only </span>
								job, apply only if you've no issues relocating.
							</div>
						)}

						{ad?.shippingBy && (
							<div className="md:text-lg pt-1 font-thin">
								Shipping handled by
								<span className="font-bold"> {ad.shippingBy}</span>
							</div>
						)}

						<div className="text-sm pt-1 font-thin">
							<span className="font-bold">{ad.adtype}</span> ad posted in
							<span className="font-bold"> {ad.location} </span>
							region
						</div>
					</div>
				</div>

				<div className="flex flex-col w-full md:w-1/3 px-6 md:items-center max-h-screen md:text-center pb-6 md:pb-0">
					<div className="text-2xl py-3 font-extralight">Created by</div>
					{ad.createdBy ? (
						<>
							<img
								src={
									ad.createdBy?.avatar?.replace(
										/upload/,
										"upload/c_limit,h_220,q_75,w_220"
									) || `https://gravatar.com/avatar/${avatar}?s=220&d=robohash`
								}
								alt="User Avatar"
								className="rounded-full shadow-xl w-40 h-40 md:w-52 md:h-52 object-cover"
							/>
							<div className="text-4xl md:text-3xl lg:text-4xl font-semibold pt-4">
								{ad.createdBy?.name}
							</div>
							{ad.createdBy?.hidden ? (
								<div className="text-lg">
									The user has hidden its contact details
								</div>
							) : (
								<>
									{ad.createdBy?.contact && (
										<a href={`tel:${ad.createdBy.contact}`}>
											<div className="text-lg lg:text-2xl">
												{ad.createdBy.contact}
											</div>
											<div className="text-xs text-green-800">
												[ MOBILE NUMBER ]
											</div>
										</a>
									)}
									{ad.createdBy?.email && (
										<a href={`mailto:${ad.createdBy.email}`} target="_blank">
											<div className="text-lg lg:text-2xl">
												{ad.createdBy.email}
											</div>
											<div className="text-xs text-green-800">
												[ EMAIL ADDRESS ]
											</div>
										</a>
									)}
								</>
							)}
						</>
					) : (
						<>
							<div className="text-lg text-red-600">Unknown!</div>
							<div className="text-xs text-green-800">[ ACCOUNT DELETED ]</div>
						</>
					)}
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
		data: { ad },
		error
	} = await client.query({
		query: gql`
			query ad($slug: String) {
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
					createdBy {
						_id
						name
						avatar
						contact
						email
						hidden
					}
				}
			}
		`,
		variables: {
			slug
		}
	})

	return {
		props: {
			ad,
			error: error?.message || null
		}
	}
}
