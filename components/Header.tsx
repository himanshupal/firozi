import Link from "next/link"

import { signIn, signOut, useSession } from "next-auth/client"
import { Fragment, useState } from "react"

import Menu from "../components/Menu"

const Header = (): JSX.Element => {
	const [session, loading] = useSession()
	const [menu, setMenu] = useState(false)

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
				{!loading && session ? (
					<div className="flex items-center gap-3">
						<div
							className="text-sm cursor-pointer"
							onClick={async () => await signOut()}
						>
							Logout
						</div>
						<Link href={`/profile/${session?.user?.email}`}>
							{/* {session?.user?.name} */}
							<img className="cursor-pointer" src="/icons/profile.svg" />
						</Link>
					</div>
				) : (
					<div
						className="text-sm cursor-pointer"
						onClick={async () => await signIn()}
					>
						Login
					</div>
				)}
			</header>

			{menu && <Menu />}
		</Fragment>
	)
}

export default Header
