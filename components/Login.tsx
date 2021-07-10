import Link from "next/link"
import { Dispatch, SetStateAction, useRef } from "react"
import { signIn } from "next-auth/client"
import Modal from "components/Modal"

interface LoginProps {
	toggle: Dispatch<SetStateAction<Boolean>>
}

const Login = ({ toggle }: LoginProps): JSX.Element => {
	const email = useRef<HTMLInputElement>()
	const password = useRef<HTMLInputElement>()

	return (
		<Modal title="Login" toggle={toggle}>
			<form
				onSubmit={async (e) => {
					e.preventDefault()
					await signIn("email", { email: email.current.value })
				}}
			>
				<label className="block pl-2 text-xl text-blood" htmlFor="email">
					Email Address
				</label>
				<input
					ref={email}
					className="h-8 mb-1 px-2 border-2 border-blood focus-visible:outline-none"
					type="email"
				/>
				<label className="block pl-2 text-xl text-blood" htmlFor="password">
					Password
				</label>
				<input
					ref={password}
					className="h-8 mb-3 px-2 border-2 border-blood focus-visible:outline-none"
					type="password"
				/>
				<button
					type="submit"
					className="h-9 bg-blood border-2 border-white shadow-md drop-shadow-md rounded-md text-white block px-4 mx-auto"
				>
					Continue
				</button>
			</form>
			<div className="text-center text-xs py-1">
				Forgot password?
				<Link href="/recover"> Click here</Link>
				<br />
				or login using
			</div>
			<div className="flex gap-2 justify-around">
				<img
					tabIndex={0}
					alt="Instagram Logo"
					className="cursor-pointer"
					src="/icons/instagram.svg"
					onClick={() => signIn("instagram")}
				/>
				<img
					tabIndex={0}
					alt="Facebook Logo"
					className="cursor-pointer"
					src="/icons/facebook.svg"
					onClick={() => signIn("facebook")}
				/>
				<img
					tabIndex={0}
					alt="Google Logo"
					className="cursor-pointer"
					src="/icons/google.svg"
					onClick={() => signIn("google")}
				/>
				<img
					tabIndex={0}
					alt="Linkedin Logo"
					className="cursor-pointer"
					src="/icons/linkedin.svg"
					onClick={() => signIn("linkedin")}
				/>
				<img
					tabIndex={0}
					alt="Github Logo"
					className="cursor-pointer"
					src="/icons/github.svg"
					onClick={() => signIn("github")}
				/>
				<img
					tabIndex={0}
					alt="Zoom Logo"
					className="cursor-pointer"
					src="/icons/zoom.svg"
					onClick={() => signIn("zoom")}
				/>
			</div>
			<div className="text-center text-xs py-1">
				Don&apos;t have an account?<Link href="/recover"> Signup here</Link>
			</div>
		</Modal>
	)
}

export default Login
