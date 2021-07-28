import create from "zustand"
import { persist } from "zustand/middleware"

import { categories } from "data/categories"
import { Category } from "models/Category"

import flatList from "helpers/flatList"

interface ComputedState {
	categories: Array<Category>
	allCategories: Array<Category>

	setCategories: (type?: string) => void
}

export default create<ComputedState>(
	persist(
		(set) => ({
			categories: [],
			allCategories: flatList(categories),

			setCategories: (type?: string) => {
				let categoryList: Array<Category> = categories

				if (type === "Job") {
					categoryList = categories.filter((cat) => cat.name === "Jobs")
				}
				if (type === "Product") {
					categoryList = categories.filter((cat) => cat.name !== "Jobs")
				}

				set((state) => ({ ...state, categories: flatList(categoryList) }))
			}
		}),
		{ name: "computed", getStorage: () => sessionStorage }
	)
)
