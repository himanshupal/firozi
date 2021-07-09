import Link from "next/link"
import { Dispatch, SetStateAction } from "react"
import Modal from "./Modal"

interface LoginProps {
	toggle: Dispatch<SetStateAction<Boolean>>
}

const Login = ({ toggle }: LoginProps): JSX.Element => {
	return (
		<Modal title="Login" toggle={toggle}>
			<label className="block pl-2 text-xl text-blood" htmlFor="email">
				Email Address
			</label>
			<input
				className="h-8 mb-1 px-2 border-2 border-blood focus-visible:outline-none"
				type="email"
			/>
			<label className="block pl-2 text-xl text-blood" htmlFor="password">
				Password
			</label>
			<input
				className="h-8 mb-3 px-2 border-2 border-blood focus-visible:outline-none"
				type="password"
			/>
			<button className="h-9 bg-blood border-2 border-white shadow-md drop-shadow-md rounded-md text-white block px-4 mx-auto">
				Continue
			</button>
			<div className="text-center text-xs py-1">
				Forgot password?
				<Link href="/recover"> Click here.</Link>
				<br />
				or login using
			</div>
			<div className="flex gap-2 justify-around">
				<img className="cursor-pointer" src="/icons/instagram.svg" />
				<img className="cursor-pointer" src="/icons/facebook.svg" />
				<img className="cursor-pointer" src="/icons/google.svg" />
				<img className="cursor-pointer" src="/icons/linkedin.svg" />
				<img className="cursor-pointer" src="/icons/github.svg" />
				<img className="cursor-pointer" src="/icons/zoom.svg" />
			</div>
			<div className="text-center text-xs py-1">
				Don't have an account?<Link href="/recover"> Signup here.</Link>
			</div>
		</Modal>
	)
}

export default Login
