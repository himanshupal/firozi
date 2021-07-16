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
			<form
				onSubmit={async (e) => {
					e.preventDefault()
					await signIn("email", { email: email.current.value })
				}}
			>
				<input
					ref={email}
					aria-label="Email Address"
					placeholder="Enter your email address"
					className="h-8 my-2 px-2 border-2 border-blood focus-visible:outline-none"
					type="email"
				/>

				<button
					type="submit"
					className="h-9 bg-blood border-2 border-white shadow-md drop-shadow-md rounded-md text-white block px-4 mx-auto"
				>
					Login with Email
				</button>
			</form>
		</Modal>
	)
}

export default Login
