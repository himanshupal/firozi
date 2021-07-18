import { Ad } from "models/Ad"
import { ObjectId } from "mongodb"

export interface User {
	_id?: ObjectId
	name?: string
	email?: string
	avatar?: string
	contact?: string
	hidden?: Boolean
	location?: string
	ads?: [Ad]
	saved?: [Ad]
	follows?: [User]
	createdAt?: string
	updatedAt?: string
	lastOnline?: string
}
