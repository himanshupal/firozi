import { useRouter } from "next/router"

const Ad = (): JSX.Element => {
	const {
		query: { ad }
	} = useRouter()

	return <div>{ad}</div>
}

export default Ad
