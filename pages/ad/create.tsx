import Head from "next/head"
import { Fragment, useState, useRef } from "react"

const CreateAd = (): JSX.Element => {
	const [negotiable, setNegotiable] = useState<Boolean>(false)
	const [offlineOnly, setOfflineOnly] = useState<Boolean>(false)
	const [images, setImages] = useState<Array<string | ArrayBuffer>>([])
	const [list, setList] = useState<string>("")

	const imageInputRef = useRef<HTMLInputElement>()

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

	return (
		<Fragment>
			<Head>
				<title>Firozi | Create Ad</title>
			</Head>

			<div className="flex">
				<div className="flex flex-col w-2/3 flex-grow p-3">
					<div className="flex gap-4 items-center mb-3 pb-2 overflow-auto">
						{images.map((image, index) => (
							<img
								className="w-36 object-contain rounded-lg cursor-not-allowed"
								onClick={() =>
									setImages(images.filter((current) => current !== image))
								}
								src={image as string}
								key={index}
							/>
						))}

						<div
							className="border-2 border-blood rounded-md shadow-md drop-shadow-md p-4 w-max text-xs text-gray-400 flex flex-col items-center text-center cursor-pointer"
							onClick={() => imageInputRef.current.click()}
						>
							<img src="/icons/plus-lg.svg" className="mb-2" />
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
						htmlFor="title"
						className="block text-blood pb-1 pl-2 text-lg md:text-xl font-cursive"
					>
						Title
					</label>
					<input
						type="text"
						name="title"
						placeholder="Enter the Ad title"
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
							onBlur={() => setList("")}
							placeholder="Select a category"
							className="border-blood border-2 mb-3 w-full px-2 h-8 focus-visible:outline-none text-gray-600"
						/>
						<ul
							className="absolute max-h-60 min-h-0 left-0 top-8 bg-white text-blood overflow-auto w-full border-2 border-blood border-t-0 z-10"
							style={{ display: list === "category" ? "block" : "none" }}
						>
							<li className="px-2 cursor-pointer">
								Electronics &gt; Smartphones
							</li>
							<li className="px-2 cursor-pointer">Jobs &gt; Teacher</li>
							<li className="px-2 cursor-pointer">Water Purifier</li>
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
							onBlur={() => setList("")}
							placeholder="Select location for Ad"
							className="border-blood border-2 mb-3 w-full px-2 h-8 focus-visible:outline-none text-gray-600"
						/>
						<ul
							className="absolute max-h-60 min-h-0 left-0 top-8 bg-white text-blood overflow-auto w-full border-2 border-blood border-t-0 z-10"
							style={{ display: list === "location" ? "block" : "none" }}
						>
							<li className="px-2 cursor-pointer">
								Electronics &gt; Smartphones
							</li>
							<li className="px-2 cursor-pointer">Jobs &gt; Teacher</li>
							<li className="px-2 cursor-pointer">Water Purifier</li>
						</ul>
					</span>

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
							placeholder="Enter Duration"
							className="flex-grow focus-visible:outline-none"
						/>
						Hours /
						<select
							name="workingPeriod"
							className="flex-grow focus-visible:outline-none"
						>
							<option value="Day">Day</option>
							<option value="Week">Week</option>
							<option value="Month">Month</option>
						</select>
					</div>

					<label
						htmlFor="price"
						className="block text-blood pb-1 pl-2 text-lg md:text-xl font-cursive"
					>
						Price
					</label>
					<div className="flex items-center border-blood border-2 mb-3 w-full px-2 h-8 text-gray-600">
						₹
						<input
							type="number"
							min="0"
							max="250"
							name="price"
							placeholder="Enter Amount"
							className="flex-grow pl-1 focus-visible:outline-none appearance-none"
						/>
						INR /
						<select
							name="pricePeriod"
							className="flex-grow focus-visible:outline-none"
						>
							<option value="Day">Day</option>
							<option value="Week">Week</option>
							<option value="Month">Month</option>
							<option value="Contract">Contract</option>
						</select>
					</div>

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
							e.code === "Space" && setNegotiable((negotiable) => !negotiable)
						}
						className={
							negotiable
								? `h-5 w-9 rounded-full mb-3 bg-blood text-xs flex items-center justify-center text-white cursor-pointer`
								: `h-5 w-9 rounded-full mb-3 border-2 border-blood text-xs flex items-center justify-center text-blood cursor-pointer`
						}
					>
						{negotiable ? "Yes" : "No"}
					</div>

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
								? `h-5 w-9 rounded-full mb-3 bg-blood text-xs flex items-center justify-center text-white cursor-pointer`
								: `h-5 w-9 rounded-full mb-3 border-2 border-blood text-xs flex items-center justify-center text-blood cursor-pointer`
						}
					>
						{offlineOnly ? "Yes" : "No"}
					</div>

					<button className="h-9 bg-blood border-2 border-white shadow-md drop-shadow-md rounded-md text-white">
						Publish Ad
					</button>

					<div className="text-blood text-sm text-center mt-2 font-semibold cursor-pointer">
						Just save for now. I’ll publish it later.
					</div>
				</div>

				<div className="flex-col w-1/3 p-3 sm:flex hidden">
					<div className="text-2xl font-cursive text-center hidden lg:block">
						Your Previous Ads
					</div>
				</div>
			</div>
		</Fragment>
	)
}

export default CreateAd
