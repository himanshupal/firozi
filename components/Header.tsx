// @ts-nocheck

import Link from "next/link"
import { useRouter } from "next/router"

import { signOut, useSession } from "next-auth/client"
import { gql, useLazyQuery } from "@apollo/client"
import { Fragment, useEffect, useState } from "react"

import Menu from "components/Menu"
import Login from "components/Login"
import routes from "data/navlinks"

const GET_AVATAR = gql`
	query getUser($id: String!) {
		user(_id: $id) {
			_id
			avatar
		}
	}
`

const Header = (): JSX.Element => {
	const [session, loading] = useSession()
	const [menu, setMenu] = useState<Boolean>(false)
	const [hover, setHover] = useState<Boolean>(false)
	const [login, setLogin] = useState<Boolean>(false)
	const [avatar, setAvatar] = useState<string>("")

	const router = useRouter()

	const routeMap = {
		"/": "Firozi",
		"/ad/create": "Create new Ad",
		"/profile/edit": "Update profile"
	}

	const location = Object.keys(routeMap).includes(router.pathname)
		? routeMap[router.pathname]
		: routeMap["/"]

	const [getUser, { data }] = useLazyQuery(GET_AVATAR)

	useEffect(() => {
		if (session && !data) getUser({ variables: { id: session?.user?.sub } })
		if (data) {
			if (data?.user?.avatar)
				setAvatar(
					data.user.avatar.replace(/upload/, "upload/c_limit,h_50,q_33,w_50")
				)
		}
	}, [session, data])

	return (
		<Fragment>
			<header className="flex items-center justify-between bg-blood text-white px-3 py-2 sticky top-0 z-10">
				<div className="flex gap-3 font-cursive">
					<img
						className="cursor-pointer"
						alt="Close Icon"
						src={menu ? `/icons/cancel.svg` : `/icons/menu.svg`}
						onClick={() => setMenu((menu) => !menu)}
					/>
					<Link href="/" passHref>
						<span className="cursor-pointer text-3xl">{location}</span>
					</Link>
				</div>
				<div className="flex items-center gap-5">
					<input
						name="search"
						type="search"
						placeholder="Search"
						className="hidden md:block w-full px-2 h-8 text-blood"
					/>
					<input
						name="location"
						type="search"
						placeholder="Location"
						className="hidden md:block w-full px-2 h-8 text-blood"
					/>
					<img
						className={
							avatar
								? `rounded-full cursor-pointer border-2 border-white`
								: `rounded-full cursor-pointer`
						}
						width="30"
						height="30"
						alt="Profile Icon"
						src={avatar || "/icons/profile.svg"}
						onClick={() =>
							session
								? setHover((hover) => !hover)
								: setLogin((login) => !login)
						}
					/>
				</div>
			</header>

			{hover && !loading && session && (
				<div className="bg-blood rounded-lg text-lg text-white text-center font-cursive absolute right-0 py-2 m-2 z-10">
					<Link href={`/profile/${session?.user?.sub}`} passHref>
						<div className="cursor-pointer my-1 px-6">Profile</div>
					</Link>
					{routes.map(({ path, text }, index) => (
						<Link href={path} key={index} passHref>
							<div className="cursor-pointer my-1 px-6">{text}</div>
						</Link>
					))}
					<div
						className="cursor-pointer my-1 px-6"
						onClick={async () => await signOut()}
					>
						Logout
					</div>
				</div>
			)}

			{menu && <Menu />}
			{login && <Login toggle={setLogin} />}
		</Fragment>
	)
}

export default Header
