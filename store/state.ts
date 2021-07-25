import create from "zustand"

interface AppState {
	error: string
	modal: boolean
	loading: boolean
	setError: (error: string) => void
	setModal: (modal: boolean) => void
	setLoading: (loading: boolean) => void
}

export default create<AppState>((set) => ({
	error: "",
	modal: false,
	loading: false,
	setError: (error: string) => set((state) => ({ ...state, error })),
	setModal: (modal: boolean) => set((state) => ({ ...state, modal })),
	setLoading: (loading: boolean) =>
		set((state) => ({ ...state, loading, modal: loading && !state.modal }))
}))
