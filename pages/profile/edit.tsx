// @ts-nocheck

import Head from "next/head"
import { NextPageContext } from "next"

import { useSession } from "next-auth/client"
import { Fragment, useState, useRef, useEffect } from "react"
import { gql, useMutation, useLazyQuery } from "@apollo/client"
import { filter } from "helpers/filter"
import { toast } from "react-toastify"

const nameRegex = /[\sa-zA-Z]+/
const contactRegex = /[\+\-0-9]+/

const USER_DETAILS = gql`
	query getUser($id: String!) {
		user(_id: $id) {
			name
			email
			avatar
			contact
			location
			hidden
		}
	}
`

const UPDATE_USER = gql`
	mutation (
		$id: ID
		$name: String
		$email: String
		$avatar: String
		$contact: String
		$hidden: Boolean
		$location: String
	) {
		updateUser(
			id: $id
			name: $name
			email: $email
			avatar: $avatar
			hidden: $hidden
			contact: $contact
			location: $location
		)
	}
`

const EditUser = ({ cloudinaryUrl, cloudinarySecret }): JSX.Element => {
	const [session, loading] = useSession()

	const [privateUser, setPrivateUser] = useState<Boolean>(false)
	const [image, setImage] = useState<string | ArrayBuffer>("")
	const [list, setList] = useState<string>("")
	const [location, setLocation] = useState<string>("")
	const [imageUrl, setImageUrl] = useState<string>("")

	const imageInputRef = useRef<HTMLInputElement>()

	const [name, setName] = useState<string>("")
	const [email, setEmail] = useState<string>("")
	const [contact, setContact] = useState<string>("")

	const [updateUser, { loading: updating }] = useMutation(UPDATE_USER)

	const [getUser, { data, loading: fetchingUser, error }] =
		useLazyQuery(USER_DETAILS)

	const imageSelected = (e) => {
		const files: FileList = e.target.files

		if (files.length) {
			const reader: FileReader = new FileReader()
			reader.readAsDataURL(files.item(0))
			reader.onloadend = (e) => setImage(e.target.result)
		}
	}

	useEffect(() => {
		if (session && !data) getUser({ variables: { id: session?.user?.sub } })

		if (data?.user) {
			setName(data?.user?.name)
			setEmail(data?.user?.email)
			setImage(data?.user?.avatar)
			setContact(data?.user?.contact)
			setLocation(data?.user?.location)
			setPrivateUser(data?.user?.hidden)
		}
	}, [session, data])

	const updateProfile = async () => {
		let avatar

		if (image) {
			const body = new FormData()
			body.append("file", image.toString())
			body.append("upload_preset", cloudinarySecret)
			body.append("tags", `firozi, user_images, ${session?.user?.sub}`)

			const res = await fetch(cloudinaryUrl, {
				method: "POST",
				body
			})

			const { url } = await res.json()
			avatar = url
		}

		const { data } = await updateUser({
			variables: filter({
				id: session.user.sub,
				name,
				email,
				contact,
				location,
				avatar,
				hidden: privateUser
			})
		})

		if (data?.updateUser) toast.success("Profile Updated!")
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
								onFocus={() => setList("")} // In case user is navigating through KBD & field is not accessible
								placeholder="Your mobile number"
								className="border-blood border-2 mb-3 w-full px-2 h-8 focus-visible:outline-none text-gray-600"
							/>

							<label
								htmlFor="location"
								className="block text-blood pb-1 pl-2 text-lg md:text-xl font-cursive"
							>
								Primary Location
							</label>
							<span className="relative">
								<input
									type="search"
									name="location"
									autoComplete="off"
									onFocus={() => setList("location")}
									value={location}
									onChange={(e) => setLocation(e.target.value)}
									placeholder="Select your primary location"
									className="border-blood border-2 mb-3 w-full px-2 h-8 focus-visible:outline-none text-gray-600"
								/>
								<ul
									className="absolute max-h-60 min-h-0 left-0 top-6 bg-white text-blood overflow-auto w-full border-2 border-blood border-t-0 z-10"
									style={{ display: list === "location" ? "block" : "none" }}
								>
									<li
										onClick={() => {
											setLocation("Electronics > Smartphones")
											setList("")
										}}
										className="px-2 cursor-pointer"
									>
										Electronics &gt; Smartphones
									</li>
									<li
										onClick={() => {
											setLocation("Jobs > Teacher")
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

							<label
								htmlFor="privateUser"
								className="text-blood pb-1 pl-2 text-lg md:text-xl font-cursive"
							>
								Profile hidden
							</label>
							<div
								tabIndex={0}
								onFocus={() => setList("")}
								onClick={() => setPrivateUser((privateUser) => !privateUser)}
								onKeyPress={(e) =>
									e.code === "Space" &&
									setPrivateUser((privateUser) => !privateUser)
								}
								className={
									privateUser
										? `h-8 w-20 rounded-full mb-3 bg-blood text-xs flex items-center justify-center text-white cursor-pointer`
										: `h-8 w-20 rounded-full mb-3 border-2 border-blood text-xs flex items-center justify-center text-blood cursor-pointer`
								}
							>
								{privateUser ? "Yes" : "No"}
							</div>

							<button
								type="submit"
								className="h-9 bg-blood border-2 border-white shadow-md drop-shadow-md rounded-md text-white w-full"
							>
								Update Profile
							</button>
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
