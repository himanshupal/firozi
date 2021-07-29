import { Category } from "models/Category"
import create from "zustand"
import { persist } from "zustand/middleware"

interface FilterState {
	search: string
	searchTerm: string
	location: string
	categories: Array<Category>

	setSearch: (query: string) => void
	setLocation: (query: string) => void
	setCategory: (categories: Array<Category>) => void
	setSearchTerm: (term: string) => void
}

export default create<FilterState>(
	persist(
		(set) => ({
			search: "",
			searchTerm: "",
			location: "",
			categories: [],

			setSearch: (search: string) => set((state) => ({ ...state, search })),
			setSearchTerm: (searchTerm: string) =>
				set((state) => ({ ...state, searchTerm })),
			setLocation: (location: string) =>
				set((state) => ({ ...state, location })),
			setCategory: (categories: Array<Category>) =>
				set((state) => ({ ...state, categories }))
		}),
		{ name: "filter", getStorage: () => sessionStorage }
	)
)
