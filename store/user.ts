import create from "zustand"
import { persist } from "zustand/middleware"

interface UserDetails {
	userId: string
	avatar: string

	setUserId: (id: string) => void
	setUserAvatar: (url: string) => void

	purgeUserDetails: () => void
}

export default create<UserDetails>(
	persist(
		(set) => ({
			userId: "",
			avatar: "",
			setUserId: (id: string) => set((state) => ({ ...state, userId: id })),
			setUserAvatar: (url: string) =>
				set((state) => ({ ...state, avatar: url })),

			purgeUserDetails: () => set({}, true)
		}),
		{ name: "user-details" }
	)
)
