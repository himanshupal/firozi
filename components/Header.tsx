import Link from "next/link"

import { signIn, signOut, useSession } from "next-auth/client"

const Header = (): JSX.Element => {
	const [session, loading] = useSession()

	return (
		<header className="header flex align-items-center justify-content-between">
			<div className="header__hero">
				<Link href="/">Firozi</Link>
			</div>
			<div className="header__content">
				{!loading && session ? (
					<div className="flex gap-3">
						<Link href={`/profile/${session?.user?.email}`}>
							{session?.user?.name}
						</Link>
						<div className="pointer" onClick={async () => await signOut()}>
							Signout
						</div>
					</div>
				) : (
					<div className="pointer" onClick={async () => await signIn()}>
						Sign In
					</div>
				)}
			</div>
		</header>
	)
}

export default Header
