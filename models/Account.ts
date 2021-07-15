import { ObjectId } from "mongodb"

export interface Account {
	_id?: ObjectId
	userId?: string
	providerType?: string
	providerId?: string
	providerAccountId?: string
	refreshToken?: string
	accessToken?: string
	accessTokenExpires?: string
	createdAt?: Date
	updatedAt?: Date
}
