import { categories } from "data/categories"
import flatList from "helpers/flatList"

const List = () => (
	<div className="h-content w-full grid place-content-center">
		<select name="list" className="w-full px-2 h-8 appearance-none">
			{flatList(categories).map((item) => (
				<option key={item._id} value={item._id}>
					{item.name}
				</option>
			))}
		</select>
	</div>
)

export default List
