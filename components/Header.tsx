import Link from "next/link"
import { useRouter } from "next/router"

import { Fragment, useEffect, useRef, useState } from "react"
import { signOut, useSession } from "next-auth/client"
import { useLazyQuery } from "@apollo/client"

import appState from "store/state"
import userState from "store/user"
import filterState from "store/filter"
import shallow from "zustand/shallow"

import Menu from "components/Menu"
import Login from "components/Login"

import GET_AVATAR from "queries/getAvatar"

import { User } from "models/User"
import { icon } from "helpers/getImage"

const Header = (): JSX.Element => {
	const [session, sessionLoading] = useSession()

	const [getUserAvatar, { data: userData, loading, error: fetchError }] =
		useLazyQuery<{ user: User }>(GET_AVATAR)

	const [menu, subMenu, setMenu, setSubMenu, setLoading] = appState(
		(state) => [
			state.menu,
			state.subMenu,
			state.setMenu,
			state.setSubMenu,
			state.setLoading
		],
		shallow
	)

	const [profileIcon, setProfileIcon] = useState<string>("")
	const [inputPlaceholder, setInputPlaceholder] = useState<string>("Search")

	const [userId, avatar, setUserId, setUserAvatar, purge] = userState(
		(state) => [
			state.userId,
			state.avatar,
			state.setUserId,
			state.setUserAvatar,
			state.purgeUserDetails
		],
		shallow
	)

	const [
		searchQuery,
		setSearchQuery,
		locationQuery,
		setLocationQuery,
		setSearchTerm
	] = filterState(
		(state) => [
			state.search,
			state.setSearch,
			state.location,
			state.setLocation,
			state.setSearchTerm
		],
		shallow
	)

	useEffect(() => {
		if (!userId && session?.user) {
			getUserAvatar({
				// @ts-ignore
				variables: { id: session?.user?.sub }
			})
		}
		if (userData?.user) {
			setUserAvatar(icon(userData?.user?.avatar))
			setUserId(userData?.user?._id?.toString())
		}

		if (avatar) setProfileIcon(avatar)
	}, [session, userData, avatar])

	const [login, setLogin] = useState<Boolean>(false)

	const menuRef = useRef<HTMLDivElement>(null)
	const subMenuRef = useRef<HTMLDivElement>(null)

	const router = useRouter()

	const routeMap = {
		"/": "Firozi",
		"/ad/create": "Create new Ad",
		"/u/edit": "Update profile"
	}

	const routes = [
		{
			text: "My Ads",
			path: `/u/${userId}/ads`
		}
	]

	const location = Object.keys(routeMap).includes(router.pathname)
		? routeMap[router.pathname]
		: routeMap["/"]

	const handleClickOutside = (e) => {
		if (!menuRef?.current?.contains(e.target) && e.target.id !== "menuToggle") {
			setMenu(false)
		}

		if (
			!subMenuRef?.current?.contains(e.target) &&
			e.target.id !== "subMenuToggle"
		) {
			setSubMenu(false)
		}
	}

	useEffect(() => {
		document.addEventListener("click", handleClickOutside, true)
		return () => document.removeEventListener("click", handleClickOutside, true)
	}, [])

	useEffect(() => {
		if (sessionLoading) setLoading(true)
		else if (loading) setLoading("Loading Profile Details")
		return () => setLoading(false)
	}, [loading, sessionLoading])

	return (
		<Fragment>
			<header className="flex items-center justify-between bg-blood text-white px-3 py-2 sticky top-0 z-10">
				<div className="flex gap-3 font-cursive">
					<img
						id="menuToggle"
						className="cursor-pointer"
						alt="Close Icon"
						src={menu ? `/icons/cancel.svg` : `/icons/menu.svg`}
						onClick={() => setMenu(!menu)}
					/>
					<Link href="/" passHref>
						<span className="cursor-pointer text-3xl">{location}</span>
					</Link>
				</div>
				<div className="flex items-center gap-5">
					<form
						onSubmit={(e) => {
							e.preventDefault()
							setSearchTerm(searchQuery)
						}}
						className="hidden md:flex w-full lg:w-72 px-2 h-8 text-blood"
					>
						<span className="bg-white w-8 h-8 flex items-center justify-center">
							<img src="/icons/search.svg" alt="Search Icon" />
						</span>
						<input
							name="search"
							type="search"
							value={searchQuery}
							placeholder={inputPlaceholder}
							onChange={(e) => setSearchQuery(e.target.value)}
							onFocus={() => setInputPlaceholder("Press Enter to Search")}
							onBlur={() => setInputPlaceholder("Search")}
							className="w-full px-2 h-8"
						/>
						<button type="submit" style={{ display: "none" }} />
					</form>

					<div className="hidden md:flex w-full lg:w-72 px-2 h-8 text-blood">
						<span className="bg-white w-8 h-8 flex items-center justify-center">
							<img src="/icons/location.svg" alt="Search Icon" />
						</span>
						<select
							name="location"
							placeholder="Location"
							className="hidden md:block w-full lg:w-72 px-2 h-8 text-blood appearance-none"
						>
							<option value="priceInc">Price: Low to High</option>
							<option value="priceDec">Price: High to Low</option>
							<option value="postNew">Most Recent</option>
							<option value="postOld">Oldest First</option>
						</select>
					</div>

					<img
						className={
							!!profileIcon
								? `rounded-full cursor-pointer border-2 border-white`
								: `rounded-full cursor-pointer bg-white`
						}
						width="30"
						height="30"
						id="subMenuToggle"
						src={profileIcon || `/icons/${session ? "profile" : "key"}.svg`}
						onClick={() =>
							session ? setSubMenu(!subMenu) : setLogin((login) => !login)
						}
					/>
				</div>
			</header>

			{subMenu && session && (
				<div
					className="bg-blood rounded-lg text-lg text-white text-center font-cursive absolute right-0 py-2 m-2 z-10"
					ref={subMenuRef}
				>
					<Link href={`/u/${userId}`} passHref>
						<div className="cursor-pointer my-1 px-6">Profile</div>
					</Link>
					{routes.map(({ path, text }, index) => (
						<Link href={path} key={index} passHref>
							<div className="cursor-pointer my-1 px-6">{text}</div>
						</Link>
					))}
					<div
						className="cursor-pointer my-1 px-6"
						onClick={() => {
							signOut()
							purge()
						}}
					>
						Logout
					</div>
				</div>
			)}

			{menu && <Menu reference={menuRef} />}
			{login && <Login toggle={setLogin} />}
		</Fragment>
	)
}

export default Header
