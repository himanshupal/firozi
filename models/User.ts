import { Ad } from "models/Ad"

export interface User {
	_id?: string
	name?: string
	email?: string
	avatar?: string
	contact?: string
	hidden?: Boolean
	ads?: [Ad]
	saved?: [Ad]
	follows?: [User]
	createdAt?: string
	updatedAt?: string
	lastOnline?: string
}
