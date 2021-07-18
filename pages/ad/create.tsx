import { gql, useMutation } from "@apollo/client"
import { filter } from "helpers/filter"
import { useSession } from "next-auth/client"
import Head from "next/head"
import { Fragment, useState, useRef } from "react"

type Ad = "Product" | "Job"
type Condition = "New" | "Used"
type Handler = "Buyer" | "Seller"

const CREATE_AD = gql`
	mutation createAd(
		$title: String
		$description: String
		$category: String
		$images: [String]
		$price: Float
		$adtype: String
		$usedFor: String
		$condition: String
		$shippingBy: String
		$negotiable: Boolean
		$workingHours: String
		$workingPeriod: String
		$salaryPeriod: String
		$offlineOnly: Boolean
		$location: String
		$createdBy: String
	) {
		createAd(
			title: $title
			description: $description
			category: $category
			images: $images
			adtype: $adtype
			price: $price
			usedFor: $usedFor
			condition: $condition
			shippingBy: $shippingBy
			negotiable: $negotiable
			workingHours: $workingHours
			workingPeriod: $workingPeriod
			salaryPeriod: $salaryPeriod
			offlineOnly: $offlineOnly
			location: $location
			createdBy: $createdBy
		)
	}
`

const CreateAd = (): JSX.Element => {
	const [images, setImages] = useState<Array<string | ArrayBuffer>>([])
	const [list, setList] = useState<string>("")

	const [title, setTitle] = useState<string>("")
	const [description, setDescription] = useState<string>("")
	const [category, setCategory] = useState<string>("")
	const [location, setLocation] = useState<string>("")
	const [price, setPrice] = useState<string>("")
	const [usedFor, setUsedFor] = useState<string>("")
	const [workingHours, setWorkingHours] = useState<string>("")
	const [workingPeriod, setWorkingPeriod] = useState<string>("")
	const [salaryPeriod, setSalaryPeriod] = useState<string>("")
	const [adtype, setAdtype] = useState<Ad>("Product")
	const [negotiable, setNegotiable] = useState<Boolean>(false)
	const [offlineOnly, setOfflineOnly] = useState<Boolean>(false)
	const [condition, setCondition] = useState<Condition>("Used")
	const [handler, setHandler] = useState<Handler>("Buyer")

	const imageInputRef = useRef<HTMLInputElement>()

	const [session, loading] = useSession()

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

	const [uploadAd, { loading: uploadingAd }] = useMutation(CREATE_AD)

	const createAd = async (published) => {
		console.log({
			title,
			description,
			category,
			location,
			price,
			usedFor,
			workingHours,
			workingPeriod,
			salaryPeriod,
			adtype,
			negotiable,
			offlineOnly,
			condition,
			handler,
			published
		})

		const { data, errors } = await uploadAd({
			variables: filter({
				title,
				description,
				category,
				images,
				location,
				price: Number(price),
				usedFor,
				workingHours,
				workingPeriod,
				salaryPeriod,
				adtype,
				negotiable,
				offlineOnly,
				condition,
				shippingBy: handler,
				published,
				// @ts-ignore
				createdBy: session?.user?.sub
			})
		})

		if (errors) console.log(errors.map((x) => x.message))
		console.log(data)
	}

	if (loading) return <div>Loading...</div>

	return (
		<Fragment>
			<Head>
				<title>Firozi | Create Ad</title>
			</Head>

			<div className="flex justify-around">
				<form
					className="flex flex-col sm:w-2/3 p-3"
					onSubmit={(e) => e.preventDefault()}
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
						onFocus={() => setList("")}
						onChange={(e) => setDescription(e.target.value)}
						placeholder="Provide a detailed description"
						className="border-blood border-2 mb-3 w-full px-2 h-20 focus-visible:outline-none text-gray-600"
					/>

					<label
						htmlFor="category"
						className="block text-blood pb-1 pl-2 text-lg md:text-xl font-cursive"
					>
						Category
					</label>
					<span className="relative">
						<input
							type="search"
							name="category"
							autoComplete="off"
							onFocus={() => setList("category")}
							value={category}
							onChange={(e) => setCategory(e.target.value)}
							placeholder="Select a category"
							className="border-blood border-2 mb-3 w-full px-2 h-8 focus-visible:outline-none text-gray-600"
						/>
						<ul
							className="absolute max-h-60 min-h-0 left-0 top-8 bg-white text-blood overflow-auto w-full border-2 border-blood border-t-0 z-10"
							style={{ display: list === "category" ? "block" : "none" }}
						>
							<li
								onClick={() => {
									setCategory("Electronics & Smartphones")
									setList("")
								}}
								className="px-2 cursor-pointer"
							>
								Electronics &gt; Smartphones
							</li>
							<li
								onClick={() => {
									setCategory("Jobs & Teacher")
									setList("")
								}}
								className="px-2 cursor-pointer"
							>
								Jobs &gt; Teacher
							</li>
							<li
								onClick={() => {
									setCategory("Water Purifier")
									setList("")
								}}
								className="px-2 cursor-pointer"
							>
								Water Purifier
							</li>
						</ul>
					</span>

					<label
						htmlFor="location"
						className="block text-blood pb-1 pl-2 text-lg md:text-xl font-cursive"
					>
						Location
					</label>
					<span className="relative">
						<input
							type="search"
							name="location"
							autoComplete="off"
							onFocus={() => setList("location")}
							value={location}
							onChange={(e) => setLocation(e.target.value)}
							placeholder="Select location for Ad"
							className="border-blood border-2 mb-3 w-full px-2 h-8 focus-visible:outline-none text-gray-600"
						/>
						<ul
							className="absolute max-h-60 min-h-0 left-0 top-8 bg-white text-blood overflow-auto w-full border-2 border-blood border-t-0 z-10"
							style={{ display: list === "location" ? "block" : "none" }}
						>
							<li
								onClick={() => {
									setLocation("Electronics & Smartphones")
									setList("")
								}}
								className="px-2 cursor-pointer"
							>
								Electronics &gt; Smartphones
							</li>
							<li
								onClick={() => {
									setLocation("Jobs & Teacher")
									setList("")
								}}
								className="px-2 cursor-pointer"
							>
								Jobs &gt; Teacher
							</li>
							<li
								onClick={() => {
									setLocation("Water Purifier")
									setList("")
								}}
								className="px-2 cursor-pointer"
							>
								Water Purifier
							</li>
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
									max="250"
									name="workingHours"
									value={workingHours}
									onFocus={() => setList("")}
									onChange={(e) => setWorkingHours(e.target.value)}
									placeholder="Enter Duration"
									className="flex-grow focus-visible:outline-none"
								/>
								Hours /
								<select
									name="workingPeriod"
									value={workingPeriod}
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
							min="0"
							name="price"
							value={price}
							onFocus={() => setList("")}
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
						onClick={() => createAd(true)}
						className="h-9 bg-blood border-2 border-white shadow-md drop-shadow-md rounded-md text-white"
					>
						Publish Ad
					</button>

					<button
						type="submit"
						onClick={() => createAd(false)}
						className="text-blood text-sm text-center mt-2 font-semibold cursor-pointer"
					>
						Just save for now. I’ll publish it later.
					</button>
				</form>

				<div className="flex-col w-1/3 p-3 lg:flex hidden">
					<div className="text-2xl font-cursive text-center block">
						Your Previous Ads
					</div>
				</div>
			</div>
		</Fragment>
	)
}

export default CreateAd
