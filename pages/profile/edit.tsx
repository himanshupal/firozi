import Head from "next/head"
import { Fragment, useState, useRef } from "react"

const EditUser = (): JSX.Element => {
	const [privateUser, setPrivateUser] = useState<Boolean>(false)
	const [image, setImage] = useState<string | ArrayBuffer>("")
	const [list, setList] = useState<string>("")
	const [location, setLocation] = useState<string>("")
	const [oldPassword, setOldPassword] = useState<string>("")
	const [newPassword, setNewPassword] = useState<string>("")

	const imageInputRef = useRef<HTMLInputElement>()

	const imageSelected = (e) => {
		const files: FileList = e.target.files

		if (files.length) {
			const reader: FileReader = new FileReader()

			reader.addEventListener("load", (e) => setImage(e.target.result))
			reader.readAsDataURL(files.item(0))
		}
	}

	return (
		<Fragment>
			<Head>
				<title>Firozi | Edit Profile</title>
			</Head>

			<div className="flex justify-center">
				<div className="flex flex-col items-center sm:flex-row sm:items-start max-w-3xl flex-grow p-3">
					<div className="sm:w-1/2">
						<div className="flex relative justify-center">
							{image && (
								<img
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
							placeholder="Your full name"
							className="border-blood border-2 mb-3 w-full px-2 h-8 focus-visible:outline-none text-gray-600"
						/>

						<label
							htmlFor="username"
							className="block text-blood pb-1 pl-2 text-lg md:text-xl font-cursive"
						>
							Username
						</label>
						<input
							type="text"
							name="username"
							placeholder="Your unique username"
							className="border-blood border-2 mb-3 w-full px-2 h-8 focus-visible:outline-none text-gray-600"
						/>

						<label
							htmlFor="email"
							className="block text-blood pb-1 pl-2 text-lg md:text-xl font-cursive"
						>
							Email
						</label>
						<input
							type="text"
							name="email"
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
							htmlFor="oldPassword"
							className="block text-blood pb-1 pl-2 text-lg md:text-xl font-cursive"
						>
							Old Password
						</label>
						<input
							type="password"
							name="oldPassword"
							onFocus={() => setList("")} // In case user is navigating through KBD & field is not accessible
							placeholder="Enter old password"
							onChange={(e) => setOldPassword(e.target.value)}
							className="border-blood border-2 mb-3 w-full px-2 h-8 focus-visible:outline-none text-gray-600"
						/>

						<label
							htmlFor="newPassword"
							className="block text-blood pb-1 pl-2 text-lg md:text-xl font-cursive"
						>
							New Password
						</label>
						<input
							type="password"
							name="newPassword"
							disabled={oldPassword.length <= 0}
							onChange={(e) => setNewPassword(e.target.value)}
							placeholder="Enter a strong new password"
							className="border-blood border-2 mb-3 w-full px-2 h-8 focus-visible:outline-none text-gray-600 disabled:bg-gray-100"
						/>

						<label
							htmlFor="privateUser"
							className="text-blood pb-1 pl-2 text-lg md:text-xl font-cursive"
						>
							Profile hidden
						</label>
						<div
							tabIndex={0}
							onClick={() => setPrivateUser((privateUser) => !privateUser)}
							onKeyPress={(e) =>
								e.code === "Space" &&
								setPrivateUser((privateUser) => !privateUser)
							}
							className={
								privateUser
									? `h-5 w-9 rounded-full mb-3 bg-blood text-xs flex items-center justify-center text-white cursor-pointer`
									: `h-5 w-9 rounded-full mb-3 border-2 border-blood text-xs flex items-center justify-center text-blood cursor-pointer`
							}
						>
							{privateUser ? "Yes" : "No"}
						</div>

						<button className="h-9 bg-blood border-2 border-white shadow-md drop-shadow-md rounded-md text-white w-full">
							Update Profile
						</button>
					</div>
				</div>
			</div>
		</Fragment>
	)
}

export default EditUser
