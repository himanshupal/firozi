import Link from "next/link"

const Footer = (): JSX.Element => {
	return (
		<footer className="bg-blood py-1 px-2 text-xs text-white flex justify-between fixed w-full bottom-0 z-10">
			<div>
				<Link href="/">Feedback</Link>
				{` · `}
				<Link href="https://github.com/himanshupal/firozi/issues">
					Report an Issue
				</Link>
			</div>
		</footer>
	)
}

export default Footer
