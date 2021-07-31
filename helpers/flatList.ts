import { Category } from "models/Category"

const flatList = (list: Array<Category>, separator = ">") => {
	let result: Array<Category> = []

	list.map((item, index) => {
		if (item.hasOwnProperty("children")) {
			const { name } = item
			result = [
				...result,
				{ ...item },
				...flatList(item.children, separator).map((child) => ({
					...child,
					name: `${name} ${separator} ${child.name}`
				}))
			]
		} else {
			result = [...result, item]
		}
	})

	return result
}

export default flatList
