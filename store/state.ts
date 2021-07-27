import create from "zustand"

type LoadingState = string | boolean

interface AppState {
	menu: boolean
	subMenu: boolean
	setMenu: (state: boolean) => void
	setSubMenu: (state: boolean) => void

	error: string
	modal: boolean
	loading: LoadingState
	setError: (error: string) => void
	setModal: (modal: boolean) => void
	setLoading: (loading: LoadingState) => void
}

export default create<AppState>((set) => ({
	error: "",
	modal: false,
	loading: false,
	setError: (error: string) => set((state) => ({ ...state, error })),
	setModal: (modal: boolean) => set((state) => ({ ...state, modal })),
	setLoading: (message: LoadingState) =>
		set((state) => ({ ...state, loading: message })),

	menu: false,
	subMenu: false,
	setMenu: (menu: boolean) => set((state) => ({ ...state, menu })),
	setSubMenu: (subMenu: boolean) => set((state) => ({ ...state, subMenu }))
}))
