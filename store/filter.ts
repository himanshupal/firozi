import categories from "data/categories"
import flatList from "helpers/flatList"
import create from "zustand"
import { persist } from "zustand/middleware"

interface FilterState {
	search: string
	searchTerm: string
	location: string
	locationTerm: string
	categoryFilters: Array<string>

	setSearch: (query: string) => void
	setLocation: (query: string) => void
	setLocationTerm: (term: string) => void
	updateCategoryFilters: (categoryId: string) => void
	setSearchTerm: (term: string) => void
}

export default create<FilterState>(
	persist(
		(set) => ({
			search: "",
			searchTerm: "",
			location: "",
			locationTerm: "",
			categoryFilters: flatList(categories).map((x) => x._id),

			setSearch: (search: string) => set((state) => ({ ...state, search })),
			setSearchTerm: (searchTerm: string) =>
				set((state) => ({ ...state, searchTerm })),
			setLocation: (location: string) =>
				set((state) => ({ ...state, location })),
			setLocationTerm: (locationTerm: string) =>
				set((state) => ({ ...state, locationTerm })),
			updateCategoryFilters: (categoryId: string) =>
				set((state) => {
					console.table([
						...(state.categoryFilters.filter((x) =>
							new RegExp(`^${categoryId.slice(0, -1)}\\d{1}`).test(x)
						).length === 0
							? state.categoryFilters.filter(
									(x) => !new RegExp(`^${categoryId.slice(0, -1)}\\d`).test(x)
							  )
							: state.categoryFilters.filter(
									(x) => !new RegExp(`^${categoryId}`).test(x)
							  ))
					])

					return {
						...state,
						categoryFilters: state.categoryFilters.includes(categoryId)
							? state.categoryFilters.filter(
									(x) => !new RegExp(`^${categoryId}`).test(x)
							  )
							: [
									...state.categoryFilters,
									...(state.categoryFilters.includes(categoryId.slice(0, -1))
										? flatList(categories)
												.map((x) => x._id)
												.filter((x) => new RegExp(`^${categoryId}`).test(x))
										: [
												categoryId.slice(0, -1),
												...flatList(categories)
													.map((x) => x._id)
													.filter((x) => new RegExp(`^${categoryId}`).test(x))
										  ])
							  ]
					}
				})
		}),
		{ name: "filter", getStorage: () => sessionStorage }
	)
)
