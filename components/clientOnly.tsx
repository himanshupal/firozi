import { useEffect, useState } from "react"

const ClientOnly = ({ children, ...delegated }): JSX.Element => {
	const [mounted, setMounted] = useState<boolean>()

	useEffect(() => setMounted(true), [])

	if (!mounted) return null

	return (
		<div className="contents" {...delegated}>
			{children}
		</div>
	)
}

export default ClientOnly
