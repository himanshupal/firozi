import Head from "next/head"
import { gql } from "@apollo/client"
import client from "helpers/apolloclient"
import { Ad as AdModel } from "models/Ad"
import { GetServerSideProps } from "next"
import { getSession } from "next-auth/client"
import { useRouter } from "next/router"
import { Fragment, useEffect, useState } from "react"
import SwiperCore, { Mousewheel, Navigation, Pagination } from "swiper/core"
import { Swiper, SwiperSlide } from "swiper/react"
import { durationShort } from "helpers/duration"
import Modal from "components/Modal"
import Login from "components/Login"

import "swiper/swiper.min.css"
import "swiper/components/navigation/navigation.min.css"
import "swiper/components/pagination/pagination.min.css"
import AdCard from "components/Ad"
import { toast } from "react-toastify"

SwiperCore.use([Pagination, Navigation, Mousewheel])

interface AdProps {
	ad: AdModel
	error: string
	userId: string
}

const Ad = ({ ad, error, userId }: AdProps): JSX.Element => {
	const router = useRouter()

	const [avatar, setAvatar] = useState<string>()
	const [login, setLogin] = useState<boolean>(false)

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

	const shareAd = async (e) => {
		if (navigator.share) {
			await navigator.share({
				title: ad.title,
				text: "Check this Ad I found on Firozi",
				url: `/ad/${ad.slug}`
			})
		} else {
			await navigator.clipboard.writeText(window.location.href)
			toast.success("Link to Ad has been copied to your clipboard")
		}
	}

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
						mousewheel={true}
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

					<div className="my-4 md:mr-12 px-6 md:px-12 py-1 bg-blue-600 text-white text-sm font-thin overflow-x-auto md:rounded-r-full whitespace-nowrap">
						{ad.category}
					</div>

					<div className="px-6 md:px-12 pb-3">
						<div className="text-5xl md:text-7xl text-green-800 font-extrabold relative">
							{ad.title}
							<img
								className="w-6 h-6 md:h-8 md:w-8 absolute top-0 right-0"
								onClick={shareAd}
								src="/icons/share.svg"
								alt="Share Icon"
							/>
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
							{ad.negotiable && (
								<span className="font-thin text-lg"> [Negotiable]</span>
							)}
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
								job, apply only if you&#39;ve no issues relocating after
								pandemic ends.
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

				{!!userId ? (
					<div className="flex flex-col w-full md:w-1/3 px-6 items-center text-center pb-6">
						<div className="text-2xl py-3 font-extralight">Ad posted by</div>
						{ad.createdBy ? (
							<>
								<img
									src={
										ad.createdBy?.avatar?.replace(
											/upload/,
											"upload/c_limit,h_220,q_75,w_220"
										) ||
										`https://gravatar.com/avatar/${avatar}?s=220&d=robohash`
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
											<a
												href={`mailto:${ad.createdBy.email}`}
												target="_blank"
												rel="noreferrer"
											>
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
								<div className="text-xs text-green-800">
									[ ACCOUNT DELETED ]
								</div>
							</>
						)}
					</div>
				) : (
					<div className="text-lg lg:text-2xl font-bold text-center py-2 px-6 md:1/3">
						You need to{" "}
						<span
							className="border-b cursor-pointer"
							onClick={() => setLogin((l) => !l)}
						>
							login
						</span>{" "}
						to view contact details of the{" "}
						{ad.adtype === "Job" ? "employer" : "seller"}
					</div>
				)}
			</div>

			<div className="flex flex-col">
				<div className="px-6 py-3 md:px-12 text-3xl">
					More Ads by {(userId && ad.createdBy?.name) ?? "User"}
				</div>
				<div className="w-full flex md:px-10 pb-0 md:pb-7 overflow-auto">
					<Swiper slidesPerView={"auto"} navigation={true}>
						{new Array(5).fill(0).map((_, index) => (
							<SwiperSlide
								key={`slide-${index + 1}`}
								className="slide__width-auto"
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

				<div className="px-6 py-3 md:px-12 text-3xl">
					Latest ads from this category
				</div>
				<div className="w-full flex md:px-10 pb-0 md:pb-7 overflow-auto">
					<Swiper slidesPerView={"auto"} navigation={true}>
						{new Array(5).fill(0).map((_, index) => (
							<SwiperSlide
								key={`slide-${index + 1}`}
								className="slide__width-auto"
							>
								<AdCard
									ad={ad}
									userId={ad.createdBy?._id?.toString()}
									key={"LatestAd-" + index}
								/>
							</SwiperSlide>
						))}
					</Swiper>
				</div>
			</div>

			{login && <Login toggle={setLogin} />}
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
			userId,
			ad: { ...ad, slug },
			error: error?.message || null
		}
	}
}
