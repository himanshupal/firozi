import { gql, useLazyQuery, useSubscription } from "@apollo/client"
import ClientOnly from "components/clientOnly"
import { useEffect } from "react"
import computed from "store/computed"

const List = () => {
	const categories = computed((state) => state.categories)
	const setCategoryList = computed((state) => state.setCategories)

	const { data, error } = useSubscription(gql`
		subscription {
			subTest
		}
	`)

	const [fetch, { data: maxPrice }] = useLazyQuery(
		gql`
			{
				maxPrice
			}
		`
	)

	useEffect(() => console.log({ data, maxPrice, error }))

	return (
		<ClientOnly>
			<div className="h-content w-full grid place-content-center">
				<select onChange={(e) => setCategoryList(e.target.value)}>
					<option>Job</option>
					<option>Product</option>
				</select>
				<select name="list" className="w-full px-2 h-8 appearance-none">
					{categories.map((item) => (
						<option key={item._id} value={item._id}>
							{item.name}
						</option>
					))}
				</select>
			</div>

			<button onClick={() => fetch()}>Fetch</button>
		</ClientOnly>
	)
}

export default List
