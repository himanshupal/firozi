import Head from "next/head"
import Link from "next/link"

import { Fragment } from "react"

const Verify = () => (
	<Fragment>
		<Head>
			<title>Check your Email Inbox</title>
		</Head>

		<div className="h-content w-full grid place-content-center p-7">
			<div className="text-3xl md:text-7xl font-extrabold">
				Please check your <span className="bg-rust text-white">email.</span>
			</div>
			<div className="text-lg md:text-3xl font-semibold">
				You will be receiving a direct link to login shortly
			</div>
			<Link href="/">
				<div className="text-blood cursor-pointer">Back to Homepage</div>
			</Link>
		</div>
	</Fragment>
)

export default Verify
