import Head from "next/head"
import { useRouter } from "next/router"
import { useLazyQuery } from "@apollo/client"
import { Fragment, useEffect, useState } from "react"
import SwiperCore, { Mousewheel, Navigation, Pagination } from "swiper/core"
import { Swiper, SwiperSlide } from "swiper/react"
import { durationShort } from "helpers/duration"
import userState from "store/user"
import appState from "store/state"
import Modal from "components/Modal"
import Login from "components/Login"

import { AD } from "queries/ads"

import AdCard from "components/Ad"
import { toast } from "react-toastify"
import flatList from "helpers/flatList"
import categories from "data/categories"
import { image } from "helpers/getImage"

SwiperCore.use([Pagination, Navigation, Mousewheel])

const Ad = (): JSX.Element => {
	const [avatar, setAvatar] = useState<string>()
	const [login, setLogin] = useState<boolean>(false)
	const [error, setError] = useState<string>("")

	const setLoading = appState((state) => state.setLoading)

	const userId = userState((state) => state.userId)

	const {
		query: { ad: slug }
	} = useRouter()

	const [getAd, { data, loading, error: errMessage }] = useLazyQuery(AD, {
		variables: {
			slug
		}
	})

	useEffect(() => {
		const getHash = async (email: string) => {
			const res = await fetch("/api/getMD5", {
				method: "POST",
				body: email || "gravatar"
			})
			setAvatar(await res.text())
		}
		if (data) {
			getHash(data.ad.createdBy?.email)
		}
	}, [data])

	useEffect(() => setError(errMessage?.message), [errMessage])

	const shareAd = async (e) => {
		if (navigator.share) {
			await navigator.share({
				title: data?.ad.title,
				text: "Check this Ad I found on Firozi",
				url: `/ad/${slug}`
			})
		} else {
			await navigator.clipboard.writeText(window.location.href)
			toast.success("Link to Ad has been copied to your clipboard")
		}
	}

	useEffect(() => {
		if (userId && slug) getAd()
	}, [userId, slug])

	useEffect(() => {
		if (loading) setLoading("Loading...")
		else setLoading(false)
	}, [loading])

	return (
		<Fragment>
			<Head>
				<title>{data?.ad.title || "Loading..."} | Firozi</title>
			</Head>

			{error && <Modal title={error} fixed />}

			{data && (
				<div className="flex flex-col md:flex-row text-blood">
					<div className="flex flex-col w-full md:w-2/3">
						<Swiper
							className="w-full"
							pagination={{ dynamicBullets: true, clickable: true }}
							mousewheel={true}
							loop={true}
						>
							{data?.ad.images?.map((image, index) => (
								<SwiperSlide key={`slide-${index + 1}`}>
									<div className="flex items-center justify-center">
										<img
											className="w-full h-56 sm:72 md:h-96 object-contain"
											src={image}
											alt={`${data?.ad.title}-image-${index + 1}`}
										/>
									</div>
								</SwiperSlide>
							))}
						</Swiper>

						<div className="my-4 md:mr-12 px-6 md:px-12 py-1 bg-blue-600 text-white text-sm font-thin overflow-x-auto md:rounded-r-full whitespace-nowrap">
							{
								flatList(categories).filter(
									(x) => x._id === data?.ad.category
								)[0]?.name
							}
						</div>

						<div className="px-6 md:px-12 pb-3">
							<div className="text-5xl md:text-7xl text-green-800 font-extrabold relative">
								{data?.ad.title}
								<img
									className="w-6 h-6 md:h-8 md:w-8 absolute top-0 right-0 cursor-pointer"
									onClick={shareAd}
									src="/icons/share.svg"
									alt="Share Icon"
								/>
							</div>

							{data?.ad.condition && (
								<div className="text-2xl md:text-3xl pt-3 font-semibold">
									{data?.ad.condition} condition
									{data?.ad.usedFor && (
										<span className="text-xl font-light">
											{" "}
											({data?.ad.usedFor})
										</span>
									)}
								</div>
							)}

							<div className="text-3xl md:text-5xl pt-3 pb-5 font-bold text text-red-900">
								&#8377; {data?.ad.price}/-
								{data?.ad.salaryPeriod && (
									<span className="text-2xl md:text-4xl font-light">
										{durationShort(data?.ad.salaryPeriod)}
									</span>
								)}
								{data?.ad.negotiable && (
									<span className="font-thin text-lg"> [Negotiable]</span>
								)}
							</div>

							<div className="md:text-xl font-thin">{data?.ad.description}</div>
						</div>

						<div className="px-6 md:px-12 pb-0 md:pb-7 border-t border-green-800">
							{data?.ad.workingHours && data?.ad.workingPeriod && (
								<div className="text-lg pt-1 font-extralight">
									Requires minimum working of{" "}
									<span className="font-bold">
										{data?.ad.workingHours} hrs/
										{data?.ad.workingPeriod.toLowerCase()}
									</span>
								</div>
							)}

							{data?.ad.offlineOnly && (
								<div className="text-sm pt-1 mt-2 font-mono bg-yellow-500 text-blood max-w-max">
									⚠️ This is an <span className="font-bold">offline only </span>
									job, apply only if you&#39;ve no issues relocating after
									pandemic ends.
								</div>
							)}

							{data?.ad.shippingBy && (
								<div className="md:text-lg pt-1 font-thin">
									Shipping handled by
									<span className="font-bold"> {data?.ad.shippingBy}</span>
								</div>
							)}

							<div className="text-sm pt-1 font-thin">
								<span className="font-bold">{data?.ad.adtype}</span> ad posted
								in
								<span className="font-bold"> {data?.ad.location} </span>
								region
							</div>
						</div>
					</div>

					{!!userId ? (
						<div className="flex flex-col flex-grow py-6 items-center text-center">
							<div className="text-2xl py-3 font-extralight">Ad posted by</div>
							{data?.ad.createdBy ? (
								<>
									<img
										src={
											image(data?.ad.createdBy?.avatar) ||
											`https://gravatar.com/avatar/${avatar}?s=220&d=robohash`
										}
										alt="User Avatar"
										className="rounded-full shadow-xl w-40 h-40 md:w-52 md:h-52 object-cover"
									/>
									<div className="text-4xl md:text-3xl lg:text-4xl font-semibold pt-4">
										{data?.ad.createdBy?.name}
									</div>
									{data?.ad.createdBy?.hidden ? (
										<div className="text-lg">
											The user has hidden its contact details
										</div>
									) : (
										<>
											{data?.ad.createdBy?.contact && (
												<a href={`tel:${data?.ad.createdBy.contact}`}>
													<div className="text-lg lg:text-2xl">
														{data?.ad.createdBy.contact}
													</div>
													<div className="text-xs text-green-800">
														[ MOBILE NUMBER ]
													</div>
												</a>
											)}
											{data?.ad.createdBy?.email && (
												<a
													href={`mailto:${data?.ad.createdBy.email}`}
													target="_blank"
													rel="noreferrer"
												>
													<div className="text-lg lg:text-2xl">
														{data?.ad.createdBy.email}
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
						<div className="text-lg lg:text-2xl font-bold text-center py-6">
							You need to{" "}
							<span
								className="border-b cursor-pointer"
								onClick={() => setLogin((l) => !l)}
							>
								login
							</span>{" "}
							to view contact details of the{" "}
							{data?.ad.adtype === "Job" ? "employer" : "seller"}
						</div>
					)}
				</div>
			)}

			{data && (
				<div className="flex flex-col">
					{data.ad?.createdBy && (
						<Fragment>
							<div className="px-6 py-3 md:px-12 text-3xl font-semibold border-b">
								More Ads by {(userId && data?.ad.createdBy?.name) ?? "User"}
							</div>
							<div className="w-full flex md:px-10 pb-0 md:pb-7 overflow-auto">
								<Swiper slidesPerView={"auto"} navigation={true}>
									{data.ad?.createdBy.ads.map((userAd, index) => (
										<SwiperSlide
											key={`slide-${index + 1}`}
											className="slide__width-auto flex"
										>
											<AdCard
												ad={userAd}
												userId={data.ad?.createdBy._id?.toString()}
												key={"UserAd-" + index}
											/>
										</SwiperSlide>
									))}
								</Swiper>
							</div>
						</Fragment>
					)}

					{data.similar.length > 0 && (
						<Fragment>
							<div className="px-6 py-3 md:px-12 text-3xl font-semibold border-b">
								Latest ads from this category
							</div>
							<div className="w-full flex md:px-10 pb-0 md:pb-7 overflow-auto">
								<Swiper slidesPerView={"auto"} navigation={true}>
									{data.similar.map((ad, index) => (
										<SwiperSlide
											key={`slide-${index + 1}`}
											className="slide__width-auto flex"
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
						</Fragment>
					)}
				</div>
			)}

			{login && <Login toggle={setLogin} />}
		</Fragment>
	)
}

export default Ad
