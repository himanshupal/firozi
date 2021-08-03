import { useLazyQuery, useMutation } from "@apollo/client"
import { filter } from "helpers/filter"
import Head from "next/head"
import { Fragment, useState, useRef, useEffect, useMemo } from "react"

import Modal from "components/Modal"
import { toast } from "react-toastify"
import { NextPageContext } from "next"
import { useRouter } from "next/router"
import AdCard from "components/Ad"
import { getWindowSize } from "helpers/getWindowSize"
import flatList from "helpers/flatList"
import categories from "data/categories"
import { Category } from "models/Category"
import { districts } from "data/districts"
import { District } from "models/District"

import userState from "store/user"

import { CREATE_AD, USER_ADS } from "queries/ads"

type Ad = "Product" | "Job"
type Condition = "New" | "Used"
type Handler = "Buyer" | "Seller"

const CreateAd = ({ cloudinaryUrl, cloudinarySecret }): JSX.Element => {
	const [images, setImages] = useState<Array<string | ArrayBuffer>>([])
	const [locationListActive, setLocationListActive] = useState<boolean>(false)
	const [categoryListActive, setCategoryListActive] = useState<boolean>(false)

	const [title, setTitle] = useState<string>("")
	const [description, setDescription] = useState<string>("")
	const [category, setCategory] = useState<string>("")
	const [location, setLocation] = useState<string>("")
	const [price, setPrice] = useState<string>("")
	const [usedFor, setUsedFor] = useState<string>("")
	const [workingHours, setWorkingHours] = useState<string>("")
	const [workingPeriod, setWorkingPeriod] = useState<string>("Day")
	const [salaryPeriod, setSalaryPeriod] = useState<string>("Month")
	const [adtype, setAdtype] = useState<Ad>("Product")
	const [negotiable, setNegotiable] = useState<Boolean>(false)
	const [offlineOnly, setOfflineOnly] = useState<Boolean>(false)
	const [condition, setCondition] = useState<Condition>("Used")
	const [handler, setHandler] = useState<Handler>("Buyer")

	const [modal, setModal] = useState<Boolean>(false)
	const [message, setMessage] = useState<string>("")

	const imageInputRef = useRef<HTMLInputElement>()

	const categoryListRef = useRef<HTMLUListElement>(null)
	const locationListRef = useRef<HTMLUListElement>(null)

	const [categoryList, setCategoryList] = useState<Array<Category>>()
	const [locationList, setLocationList] = useState<Array<District>>()

	const router = useRouter()
	const { width } = getWindowSize()

	const userId = userState((state) => state.userId)

	const imageSelected = (e) => {
		if (e.target.files) {
			const files: FileList = e.target.files

			for (let file = 0; file < files.length; file++) {
				const reader: FileReader = new FileReader()

				reader.addEventListener("load", (e) =>
					setImages((images) => [...images, e.target.result])
				)
				reader.readAsDataURL(files.item(file))
			}
		}
	}

	const [getUserAds, { data, loading: gettingUserAds, error }] =
		useLazyQuery(USER_ADS)
	const [uploadAd, { loading: uploadingAd }] = useMutation(CREATE_AD)

	useEffect(() => {
		if (uploadingAd) setMessage("Saving Data...")

		if (userId === "") router.replace("/")
		if (userId) if (width >= 1024) getUserAds({ variables: { id: userId } })

		if (uploadingAd || gettingUserAds) setModal(true)
		else setModal(false)
	}, [uploadingAd, data, width, userId])

	useMemo(
		() =>
			setCategoryList(
				flatList(
					categories.filter((x) =>
						adtype === "Job" ? x.name === "Jobs" : x.name !== "Jobs"
					)
				)
			),
		[categories]
	)
	useMemo(() => setLocationList(districts), [districts])

	const handleClickOutside = (e) => {
		if (
			!categoryListRef?.current?.contains(e.target) &&
			e.target.id !== "categoryInput"
		) {
			setCategoryListActive(false)
		}
		if (
			!locationListRef?.current?.contains(e.target) &&
			e.target.id !== "locationInput"
		) {
			setLocationListActive(false)
		}
	}

	useEffect(() => {
		document.addEventListener("click", handleClickOutside, true)
		return () => {
			document.removeEventListener("click", handleClickOutside, true)
		}
	}, [])

	const createAd = async () => {
		if (!images.length) {
			toast.error("A related image is required!")
			return null
		}

		let imageLinks = new Array<string>()

		if (images.length) {
			setMessage("Uploading Images...")
			setModal(true)

			imageLinks = await Promise.all(
				images.map(async (image) => {
					const body = new FormData()
					body.append("file", image.toString())
					body.append("upload_preset", cloudinarySecret)
					body.append("tags", `firozi, ads_images, ${adtype}, ${userId}`)

					const res = await fetch(cloudinaryUrl, {
						method: "POST",
						body
					})

					const { url } = await res.json()
					return url
				})
			)
		}

		const { data, errors } = await uploadAd({
			variables: filter({
				title,
				description,
				category,
				images: imageLinks,
				location,
				price: Number(price),
				usedFor,
				workingHours,
				workingPeriod: adtype === "Product" ? "" : workingPeriod,
				salaryPeriod: adtype === "Product" ? "" : salaryPeriod,
				adtype,
				negotiable,
				offlineOnly,
				condition: adtype === "Job" ? "" : condition,
				shippingBy: adtype === "Job" ? "" : handler,
				createdBy: userId
			})
		})

		if (errors) console.log(errors.map((x) => x.message))

		if (data.createAd) toast.success("Ad Created !")
	}

	return (
		<Fragment>
			<Head>
				<title>Firozi | Create Ad</title>
			</Head>

			{modal && <Modal title={message} toggle={setModal} fixed />}

			<div className="flex justify-around lg:px-12">
				<form
					className="flex flex-col sm:w-2/3 p-3"
					onSubmit={(e) => {
						e.preventDefault()
						createAd()
					}}
				>
					<div className="flex gap-3 items-center mb-3 pb-2 overflow-auto">
						{images.map((image, index) => (
							<div key={index} className="relative flex-shrink-0">
								<img
									className="h-28 object-contain rounded-lg"
									src={image as string}
									alt={`image-${index}`}
								/>
								<img
									onClick={() =>
										setImages(images.filter((current) => current !== image))
									}
									className="absolute right-2 top-2 w-4 h-4 cursor-pointer"
									src="/icons/cancel.svg"
									alt="Close Icon"
								/>
							</div>
						))}

						<div
							className="border-2 border-blood rounded-md shadow-md drop-shadow-md p-4 h-28 w-max text-xs text-gray-400 flex flex-col items-center justify-around text-center cursor-pointer"
							onClick={() => imageInputRef.current.click()}
						>
							<img src="/icons/plus-lg.svg" className="mb-2" alt="Plus Icon" />
							Add Image
						</div>

						<input
							hidden
							multiple
							name="image"
							type="file"
							accept="image/*"
							ref={imageInputRef}
							onChange={imageSelected}
						/>
					</div>

					<label
						htmlFor="adtype"
						className="block text-blood pb-1 pl-2 text-lg md:text-xl font-cursive"
					>
						Select Ad Type
					</label>
					<div
						tabIndex={0}
						onClick={() =>
							setAdtype((type) =>
								type === "Job" ? (type = "Product") : (type = "Job")
							)
						}
						onKeyPress={(e) =>
							e.code === "Space" &&
							setAdtype((type) =>
								type === "Job" ? (type = "Product") : (type = "Job")
							)
						}
						className="h-8 w-20 rounded-full mb-3 cursor-pointer flex items-center text-sm justify-center bg-blood text-white"
					>
						{adtype}
					</div>

					<label
						htmlFor="title"
						className="block text-blood pb-1 pl-2 text-lg md:text-xl font-cursive"
					>
						Title
					</label>
					<input
						type="text"
						name="title"
						value={title}
						onChange={(e) => setTitle(e.target.value)}
						placeholder={
							adtype === "Job" ? "Enter job title" : "Enter product name"
						}
						required
						className="border-blood border-2 mb-3 w-full px-2 h-8 focus-visible:outline-none text-gray-600"
					/>

					<label
						htmlFor="description"
						className="block text-blood pb-1 pl-2 text-lg md:text-xl font-cursive"
					>
						Description
					</label>
					<textarea
						name="description"
						value={description}
						onChange={(e) => setDescription(e.target.value)}
						placeholder="Provide a detailed description"
						required
						rows={5}
						className="border-blood border-2 mb-3 w-full px-2 focus-visible:outline-none text-gray-600"
					/>

					<label
						htmlFor="category"
						className="block text-blood pb-1 pl-2 text-lg md:text-xl font-cursive"
					>
						Category
					</label>
					<span className="relative" ref={categoryListRef}>
						<input
							required
							type="search"
							name="category"
							autoComplete="off"
							value={
								flatList(categories).filter((x) => x._id === category)[0]
									?.name || category
							}
							id="categoryInput"
							onFocus={() => setCategoryListActive(true)}
							onChange={(e) => {
								setCategoryList(
									(list) =>
										(list =
											e.target.value === ""
												? flatList(categories)
												: [
														...flatList(categories).filter((x) =>
															new RegExp(
																`(\w|\s)?${e.target.value}(\w|\s)?`,
																"i"
															).test(x.name)
														)
												  ])
								)
								setCategory(e.target.value)
							}}
							placeholder="Select a category"
							className="border-blood border-2 mb-3 w-full px-2 h-8 focus-visible:outline-none text-gray-600"
						/>
						<ul
							className="absolute max-h-60 min-h-0 left-0 top-8 bg-white text-blood overflow-auto w-full border-2 border-blood border-t-0 z-10 cursor-pointer"
							style={{ display: categoryListActive ? "block" : "none" }}
						>
							{categoryList?.map((item) => (
								<li
									key={item._id}
									onClick={() => {
										setCategory(item._id)
										setCategoryListActive(false)
									}}
									className="px-2 border-b border-gray-100 text-sm md:text-base"
								>
									{item.name}
								</li>
							))}
						</ul>
					</span>

					<label
						htmlFor="location"
						className="block text-blood pb-1 pl-2 text-lg md:text-xl font-cursive"
					>
						Location
					</label>
					<span className="relative" ref={locationListRef}>
						<input
							type="search"
							name="location"
							autoComplete="off"
							value={location}
							id="locationInput"
							onFocus={() => setLocationListActive(true)}
							onChange={(e) => {
								setLocationList(
									(list) =>
										(list =
											e.target.value === ""
												? districts
												: [
														...districts.map(({ state, districts: list }) => {
															const filtered = list.filter((x) =>
																new RegExp(
																	`(\w|\s)?${e.target.value}(\w|\s)?`,
																	"i"
																).test(x)
															)
															return {
																state: !!filtered.length && state,
																districts: filtered
															}
														})
												  ])
								)
								setLocation(e.target.value)
							}}
							placeholder="Select location for Ad"
							required
							className="border-blood border-2 mb-3 w-full px-2 h-8 focus-visible:outline-none text-gray-600"
						/>
						<ul
							className="absolute max-h-60 min-h-0 left-0 top-8 bg-white text-blood overflow-auto w-full border-2 border-blood border-t-0 z-10 cursor-pointer"
							style={{ display: locationListActive ? "block" : "none" }}
						>
							{locationList?.map((it: District, index: number) => (
								<Fragment key={`location-${index + 1}`}>
									{it.state && (
										<li className="px-2 font-semibold border-b border-gray-100 text-sm md:text-base">
											{it.state}
										</li>
									)}
									{it.districts.map((district, dIndex) => (
										<li
											onClick={() => {
												setLocation(district)
												setLocationListActive(false)
											}}
											className="pl-6 pr-2 border-b border-gray-100 text-sm md:text-base"
											key={`district-${dIndex + 1}`}
										>
											{district}
										</li>
									))}
								</Fragment>
							))}
						</ul>
					</span>

					{adtype === "Job" && (
						<>
							<label
								htmlFor="workingHours"
								className="block text-blood pb-1 pl-2 text-lg md:text-xl font-cursive"
							>
								Working Hours
							</label>
							<div className="flex items-center border-blood border-2 mb-3 w-full px-2 h-8 text-gray-600">
								<input
									type="number"
									min="0"
									max={1e3}
									name="workingHours"
									required={adtype === "Job"}
									value={workingHours}
									onChange={(e) => setWorkingHours(e.target.value)}
									placeholder="Enter Duration"
									className="flex-grow focus-visible:outline-none"
								/>
								Hours /
								<select
									name="workingPeriod"
									value={workingPeriod}
									required={adtype === "Job"}
									onChange={(e) => setWorkingPeriod(e.target.value)}
									className="flex-grow focus-visible:outline-none"
								>
									<option value="Day">Day</option>
									<option value="Week">Week</option>
									<option value="Month">Month</option>
								</select>
							</div>
						</>
					)}

					<label
						htmlFor="price"
						className="block text-blood pb-1 pl-2 text-lg md:text-xl font-cursive"
					>
						{adtype === "Job" ? "Salary" : "Price"}
					</label>
					<div className="flex items-center border-blood border-2 mb-3 w-full px-2 h-8 text-gray-600">
						₹
						<input
							type="number"
							required
							min="0"
							max={9e6} // Design fix
							name="price"
							value={price}
							onChange={(e) => setPrice(e.target.value)}
							placeholder="Enter Amount"
							className="flex-grow pl-1 focus-visible:outline-none appearance-none"
						/>
						{adtype === "Job" && (
							<>
								INR /
								<select
									name="salaryPeriod"
									value={salaryPeriod}
									required={adtype === "Job"}
									onChange={(e) => setSalaryPeriod(e.target.value)}
									className="flex-grow focus-visible:outline-none"
								>
									<option value="Day">Day</option>
									<option value="Week">Week</option>
									<option value="Month">Month</option>
									<option value="Contract">Contract</option>
								</select>
							</>
						)}
					</div>

					<div className="flex">
						<div className="w-1/2">
							<label
								htmlFor="negotiable"
								className="text-blood pb-1 pl-2 text-lg md:text-xl font-cursive"
							>
								Negotiable
							</label>
							<div
								tabIndex={0}
								onClick={() => setNegotiable((negotiable) => !negotiable)}
								onKeyPress={(e) =>
									e.code === "Space" &&
									setNegotiable((negotiable) => !negotiable)
								}
								className={
									negotiable
										? `h-8 w-20 rounded-full mb-3 bg-blood text-xs flex items-center justify-center text-white cursor-pointer`
										: `h-8 w-20 rounded-full mb-3 border-2 border-blood text-xs flex items-center justify-center text-blood cursor-pointer`
								}
							>
								{negotiable ? "Yes" : "No"}
							</div>
						</div>
						{adtype === "Job" ? (
							<div className="w-1/2">
								<label
									htmlFor="offlineOnly"
									className="text-blood pb-1 pl-2 text-lg md:text-xl font-cursive"
								>
									Offline Only
								</label>
								<div
									tabIndex={0}
									onClick={() => setOfflineOnly((offlineOnly) => !offlineOnly)}
									onKeyPress={(e) =>
										e.code === "Space" &&
										setOfflineOnly((offlineOnly) => !offlineOnly)
									}
									className={
										offlineOnly
											? `h-8 w-20 rounded-full mb-3 bg-blood text-xs flex items-center justify-center text-white cursor-pointer`
											: `h-8 w-20 rounded-full mb-3 border-2 border-blood text-xs flex items-center justify-center text-blood cursor-pointer`
									}
								>
									{offlineOnly ? "Yes" : "No"}
								</div>
							</div>
						) : (
							<div className="w-1/2">
								<label
									htmlFor="handler"
									className="text-blood pb-1 pl-2 text-lg md:text-xl font-cursive"
								>
									Shipping handler
								</label>
								<div
									tabIndex={0}
									onClick={() =>
										setHandler((ship) =>
											ship === "Buyer" ? (ship = "Seller") : (ship = "Buyer")
										)
									}
									onKeyPress={(e) =>
										e.code === "Space" &&
										setHandler((ship) =>
											ship === "Buyer" ? (ship = "Seller") : (ship = "Buyer")
										)
									}
									className={
										handler === "Buyer"
											? `h-8 w-20 rounded-full mb-3 bg-blood text-xs flex items-center justify-center text-white cursor-pointer`
											: `h-8 w-20 rounded-full mb-3 border-2 border-blood text-xs flex items-center justify-center text-blood cursor-pointer`
									}
								>
									{handler}
								</div>
							</div>
						)}
					</div>

					{adtype === "Product" && (
						<div className="flex">
							<div className="w-1/2">
								<label
									htmlFor="condition"
									className="text-blood pb-1 pl-2 text-lg md:text-xl font-cursive"
								>
									Product Condition
								</label>
								<div
									tabIndex={0}
									onClick={() =>
										setCondition((con) =>
											con === "New" ? (con = "Used") : (con = "New")
										)
									}
									onKeyPress={(e) =>
										e.code === "Space" &&
										setCondition((con) =>
											con === "New" ? (con = "Used") : (con = "New")
										)
									}
									className={
										condition === "Used"
											? `h-8 w-20 rounded-full mb-3 border-2 border-blood text-xs flex items-center justify-center text-blood cursor-pointer`
											: `h-8 w-20 rounded-full mb-3 bg-blood text-xs flex items-center justify-center text-white cursor-pointer`
									}
								>
									{condition}
								</div>
							</div>
							{condition === "Used" && (
								<div className="w-1/2">
									<label
										htmlFor="usedFor"
										className="text-blood pb-1 pl-2 text-lg md:text-xl font-cursive"
									>
										Used for
									</label>
									<input
										type="text"
										name="usedFor"
										value={usedFor}
										onChange={(e) => setUsedFor(e.target.value)}
										placeholder="e.g. 3 Months"
										className="border-blood border-2 mb-3 w-full px-2 h-8 focus-visible:outline-none text-gray-600"
									/>
								</div>
							)}
						</div>
					)}

					<button
						type="submit"
						className="h-9 bg-blood border-2 border-white shadow-md drop-shadow-md rounded-md text-white"
					>
						Publish Ad
					</button>
				</form>

				<div className="flex-col w-1/3 p-3 lg:flex hidden items-center">
					<div className="text-2xl font-cursive text-center block">
						Your Previous Ads
					</div>
					{data?.user &&
						data.user.ads
							.filter((_, i) => i < 2)
							.map((ad, index) => (
								<AdCard ad={ad} userId={userId} key={`ad-${index + 1}`} />
							))}

					<div className="pt-4">
						{gettingUserAds
							? `Loading Ads...`
							: data?.user?.ads?.length === 0
							? `You haven't posted any ads yet!`
							: data?.user?.ads?.length > 2 && (
									<div
										onClick={() => router.push(`/u/${userId}/ads`)}
										className="text-lg font-semibold pt-2 text-center cursor-pointer"
									>
										Show more
									</div>
							  )}
					</div>
				</div>
			</div>
		</Fragment>
	)
}

export default CreateAd

export const getStaticProps = (context: NextPageContext) => ({
	props: {
		cloudinaryUrl: process.env.CLOUDINARY_URL,
		cloudinarySecret: process.env.CLOUDINARY_SECRET
	}
})
