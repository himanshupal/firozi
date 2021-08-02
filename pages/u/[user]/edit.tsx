import Head from "next/head"
import { GetStaticPaths, NextPageContext } from "next"
import { useRouter } from "next/router"
import { Fragment, useState, useRef, useEffect, useMemo } from "react"
import { useMutation, useLazyQuery } from "@apollo/client"
import { filter } from "helpers/filter"
import { toast } from "react-toastify"
import Modal from "components/Modal"

import { districts } from "data/districts"
import { District } from "models/District"

import userState from "store/user"
import appState from "store/state"

const nameRegex = /[\sa-zA-Z]+/
const contactRegex = /[\+\-0-9]+/

import { USER_DETAILS, UPDATE_USER } from "queries/user"

const EditUser = ({ cloudinaryUrl, cloudinarySecret }): JSX.Element => {
	const router = useRouter()

	const userId = userState((state) => state.userId)
	const setLoading = appState((state) => state.setLoading)

	const [toUpload, setToUpload] = useState<boolean>(false) // Will check if the image is uploaded now or is being used from state

	const imageInputRef = useRef<HTMLInputElement>()
	const locationListRef = useRef<HTMLUListElement>(null)

	const [locationList, setLocationList] = useState<Array<District>>()
	const [locationListActive, setLocationListActive] = useState<boolean>(false)

	const [name, setName] = useState<string>("")
	const [email, setEmail] = useState<string>("")
	const [image, setImage] = useState<string | ArrayBuffer>("")
	const [contact, setContact] = useState<string>("")
	const [location, setLocation] = useState<string>("")
	const [hidden, setHidden] = useState<Boolean>(false)

	const [updateUser, { loading: updating, error: updateError }] =
		useMutation(UPDATE_USER)

	const [getUser, { data, loading: fetchingUser, error }] =
		useLazyQuery(USER_DETAILS)

	const imageSelected = (e) => {
		const files: FileList = e.target.files

		if (files.length) {
			const reader: FileReader = new FileReader()
			reader.readAsDataURL(files.item(0))
			reader.onloadend = (e) => setImage(e.target.result)
		}

		setToUpload(true)
	}

	useEffect(() => {
		if (userId === "") router.push("/")
		if (userId && !data) getUser({ variables: { id: userId } })

		if (data?.user) {
			setName(data?.user?.name)
			setEmail(data?.user?.email)
			setImage(data?.user?.avatar)
			setContact(data?.user?.contact)
			setLocation(data?.user?.location)
			setHidden(data?.user?.hidden)
		}

		if (data) setLoading(false)
	}, [userId, data])

	useEffect(() => {
		if (fetchingUser) setLoading("Getting Profile Details")
		if (updating) setLoading("Saving Profile")
		return () => setLoading(false)
	}, [data, fetchingUser, updating])

	const updateProfile = async () => {
		let avatar

		if (image && toUpload) {
			setLoading("Uploading Image")

			const body = new FormData()
			body.append("file", image.toString())
			body.append("upload_preset", cloudinarySecret)
			body.append("tags", `firozi, user_images, ${userId}`)

			const res = await fetch(cloudinaryUrl, {
				method: "POST",
				body
			})

			const { url } = await res.json()
			avatar = url

			setLoading(false)
		} else {
			avatar = image
		}

		await updateUser({
			variables: filter({
				id: userId,
				name,
				email,
				avatar,
				contact,
				location,
				hidden
			}),
			update: (_, { data }) => {
				if (data?.updateUser?._id) toast.success("Profile Updated!")
			}
		})
	}

	useMemo(() => setLocationList(districts), [districts])

	const handleClickOutside = (e) => {
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

	if (error || updateError) {
		return <Modal title={error?.networkError?.name || error.message} fixed />
	}

	return (
		<Fragment>
			<Head>
				<title>Firozi | Edit Profile</title>
			</Head>

			<div className="flex justify-center">
				<form
					onSubmit={(e) => {
						e.preventDefault()
						updateProfile()
					}}
				>
					<div className="flex flex-col items-center sm:flex-row sm:items-start max-w-3xl flex-grow px-4 py-10">
						<div className="sm:w-1/2">
							<div className="flex relative justify-center">
								{image && (
									<img
										alt="Close Icon"
										src="/icons/cancel.svg"
										onClick={() => setImage("")}
										className="absolute w-6 h-6 rounded-full bg-blood p-1 cursor-pointer left-0 sm:left-1/4"
									/>
								)}
								<div
									className={`relative rounded-full shadow-md drop-shadow-md w-44 h-44 text-xs text-gray-400 flex flex-col items-center justify-center text-center ${
										image
											? "overflow-hidden"
											: "p-4 cursor-pointer border-2 border-blood"
									}`}
									onClick={() => (image ? null : imageInputRef.current.click())}
								>
									<img
										alt={image ? `User Avatar` : `Plus Icon`}
										src={image ? (image as string) : `/icons/plus-lg.svg`}
										className={image ? "w-full h-full object-cover" : "mb-2"}
									/>
									{!image && `Add Image`}
								</div>

								<input
									hidden
									name="image"
									type="file"
									accept="image/*"
									ref={imageInputRef}
									onChange={imageSelected}
								/>
							</div>
						</div>

						<div className="sm:w-1/2">
							<label
								htmlFor="name"
								className="block text-blood pb-1 pl-2 text-lg md:text-xl font-cursive"
							>
								Name
							</label>
							<input
								type="text"
								name="name"
								onKeyPress={(e) => !nameRegex.test(e.key) && e.preventDefault()}
								onChange={(e) => setName(e.target.value)}
								value={name}
								placeholder="Your full name"
								className="border-blood border-2 mb-3 w-full px-2 h-8 focus-visible:outline-none text-gray-600"
							/>

							<label
								htmlFor="email"
								className="block text-blood pb-1 pl-2 text-lg md:text-xl font-cursive"
							>
								Email
							</label>
							<input
								type="email"
								name="email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								placeholder="Your primary email address"
								className="border-blood border-2 mb-3 w-full px-2 h-8 focus-visible:outline-none text-gray-600"
							/>

							<label
								htmlFor="contact"
								className="block text-blood pb-1 pl-2 text-lg md:text-xl font-cursive"
							>
								Contact
							</label>
							<input
								type="tel"
								name="contact"
								onKeyPress={(e) =>
									!contactRegex.test(e.key) && e.preventDefault()
								}
								value={contact}
								onChange={(e) => setContact(e.target.value)}
								placeholder="Your mobile number"
								className="border-blood border-2 mb-3 w-full px-2 h-8 focus-visible:outline-none text-gray-600"
							/>

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
																...districts.map(
																	({ state, districts: list }) => {
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
																	}
																)
														  ])
										)
										setLocation(e.target.value)
									}}
									placeholder="Select your primary location"
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

							<label
								htmlFor="hidden"
								className="text-blood pb-1 pl-2 text-lg md:text-xl font-cursive"
							>
								Profile hidden
							</label>
							<div
								tabIndex={0}
								onClick={() => setHidden((hidden) => !hidden)}
								onKeyPress={(e) =>
									e.code === "Space" && setHidden((hidden) => !hidden)
								}
								className={
									hidden
										? `h-8 w-20 rounded-full mb-3 bg-blood text-xs flex items-center justify-center text-white cursor-pointer`
										: `h-8 w-20 rounded-full mb-3 border-2 border-blood text-xs flex items-center justify-center text-blood cursor-pointer`
								}
							>
								{hidden ? "Yes" : "No"}
							</div>

							<button
								type="submit"
								className="h-9 bg-blood border-2 border-white shadow-md drop-shadow-md rounded-md text-white w-full"
							>
								Update Profile
							</button>

							<div
								onClick={() => router.back()}
								className="text-sm text-center cursor-pointer pt-2"
							>
								Go back
							</div>
						</div>
					</div>
				</form>
			</div>
		</Fragment>
	)
}

export default EditUser

export const getStaticProps = (context: NextPageContext) => ({
	props: {
		cloudinaryUrl: process.env.CLOUDINARY_URL,
		cloudinarySecret: process.env.CLOUDINARY_SECRET
	}
})

export const getStaticPaths: GetStaticPaths = async () => ({
	paths: [],
	fallback: "blocking"
})
