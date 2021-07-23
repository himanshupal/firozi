import create, { UseStore } from "zustand"

interface SavedStore {
	saved: Array<string>
	pullSaved: (_id: string) => void
	pushSaved: (_id: string) => void
	replaceSaved: (saved: Array<string>) => void
}

export default create<SavedStore>((set) => ({
	saved: [],
	pushSaved: (_id: string) => {
		set((state) => ({ saved: [...state.saved, _id] }))
	},
	pullSaved: (_id: string) => {
		set((state) => ({ saved: state.saved.filter((x) => x !== _id) }))
	},
	replaceSaved: (saved: Array<string>) => {
		set({ saved })
	}
}))
