import { ObjectId } from "mongodb"

export interface Session {
	_id?: ObjectId
	userId?: string
	expires?: Date
	sessionToken?: string
	accessToken?: string
	createdAt?: Date
	updatedAt?: Date
}
