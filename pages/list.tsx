import ClientOnly from "components/clientOnly"
import computed from "store/computed"

const List = () => {
	const categories = computed((state) => state.categories)
	const setCategoryList = computed((state) => state.setCategories)

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
		</ClientOnly>
	)
}

export default List
