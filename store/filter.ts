import { Category } from "models/Category"
import create from "zustand"
import { persist } from "zustand/middleware"

interface FilterState {
	search: string
	location: string
	categories: Array<Category>

	setSearch: (query: string) => void
	setLocation: (query: string) => void
	setCategory: (categories: Array<Category>) => void
}

export default create(
	persist(
		(set) => ({
			search: "",
			location: "",
			categories: [],

			setSearch: (search: string) => set((state) => ({ ...state, search })),
			setLocation: (location: string) =>
				set((state) => ({ ...state, location })),
			setCategory: (categories: Array<Category>) =>
				set((state) => ({ ...state, categories }))
		}),
		{ name: "filter", getStorage: () => sessionStorage }
	)
)
