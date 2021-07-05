import Link from "next/link"

import { signIn, signOut, useSession } from "next-auth/client"
import { Fragment, useState } from "react"

import Menu from "components/Menu"
import routes from "data/navlinks"

const Header = (): JSX.Element => {
	const [session, loading] = useSession()
	const [menu, setMenu] = useState(false)
	const [hover, setHover] = useState(false)

	return (
		<Fragment>
			<header className="flex items-center justify-between bg-blood text-white px-3 py-2 sticky top-0 z-10">
				<div className="flex gap-3 font-cursive">
					<img
						className="cursor-pointer"
						src={menu ? `/icons/cancel.svg` : `/icons/menu.svg`}
						onClick={() => setMenu((menu) => !menu)}
					/>
					<Link href="/">
						<span className="cursor-pointer text-3xl">Firozi</span>
					</Link>
				</div>
				<div className="flex items-center gap-5">
					<input name="search" className="hidden md:block w-full px-2 h-8" />
					<input name="location" className="hidden md:block w-full px-2 h-8" />
					<img
						className="rounded-full cursor-pointer"
						src="/icons/profile.svg"
						onClick={async () =>
							session ? setHover((hover) => !hover) : await signIn()
						}
					/>
				</div>
			</header>

			{hover && !loading && session && (
				<div className="bg-blood rounded-lg text-lg text-white text-center font-cursive absolute right-0 py-2 m-2">
					<Link href={`/profile/${session?.user?.email}`}>
						<div className="cursor-pointer my-1 px-6">Profile</div>
					</Link>
					{routes.map(({ path, text }, index) => (
						<Link href={path} key={index}>
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
		</Fragment>
	)
}

export default Header
