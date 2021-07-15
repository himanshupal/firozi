import { ObjectId } from "mongodb"

export interface VerificationRequest {
	_id?: ObjectId
	identifier: string
	token: string
	expires: Date
	createdAt?: Date
	updatedAt?: Date
}
