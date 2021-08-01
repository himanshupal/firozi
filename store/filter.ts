import categories from "data/categories"
import flatList from "helpers/flatList"
import create from "zustand"
import { persist } from "zustand/middleware"

interface FilterState {
	sort: string
	search: string
	searchTerm: string
	location: string
	maxPrice: number
	locationTerm: string
	price: Record<string, number>
	categoryFilters: Array<string>

	setSort: (method: string) => void
	setSearch: (query: string) => void
	setLocation: (query: string) => void
	setMaxPrice: (price: number) => void
	setLocationTerm: (term: string) => void
	setPrice: (min: number, max: number) => void
	updateCategoryFilters: (categoryId: string) => void
	setSearchTerm: (term: string) => void
	clearFilters: () => void
}

export default create<FilterState>(
	persist(
		(set) => ({
			sort: "",
			search: "",
			searchTerm: "",
			location: "",
			maxPrice: 10_000,
			locationTerm: "",
			price: { min: 100, max: 10_000 },
			categoryFilters: flatList(categories).map((x) => x._id),

			setSort: (method: string) => set((state) => ({ ...state, sort: method })),
			setSearch: (search: string) => set((state) => ({ ...state, search })),
			setSearchTerm: (searchTerm: string) =>
				set((state) => ({ ...state, searchTerm })),
			setLocation: (location: string) =>
				set((state) => ({ ...state, location })),
			setMaxPrice: (price: number) =>
				set((state) => ({ ...state, maxPrice: price })),
			setLocationTerm: (locationTerm: string) =>
				set((state) => ({ ...state, locationTerm })),
			setPrice: (min, max) =>
				set((state) => ({ ...state, price: { min, max } })),
			updateCategoryFilters: (categoryId: string) =>
				set((state) => ({
					...state,
					categoryFilters: state.categoryFilters.includes(categoryId)
						? state.categoryFilters.filter(
								(x) => !new RegExp(`^${categoryId}`).test(x)
						  )
						: [
								...state.categoryFilters,
								...flatList(categories)
									.map((x) => x._id)
									.filter((x) => new RegExp(`^${categoryId}`).test(x))
						  ]
				})),
			clearFilters: () =>
				set({
					sort: "",
					search: "",
					searchTerm: "",
					location: "",
					maxPrice: 10_000,
					locationTerm: "",
					price: { min: 100, max: 10_000 },
					categoryFilters: flatList(categories).map((x) => x._id)
				})
		}),
		{ name: "filter", getStorage: () => sessionStorage }
	)
)
