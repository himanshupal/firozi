import { User } from "models/User"
import { ObjectId } from "mongodb"

export interface Ad {
	_id?: ObjectId
	title?: string
	slug?: string
	adtype?: string
	description?: string
	category?: string
	images?: [string]
	price?: number
	usedFor?: string
	condition?: string
	shippingBy?: string
	negotiable?: Boolean
	workingHours?: string
	workingPeriod?: string
	salaryPeriod?: string
	offlineOnly?: Boolean
	location?: string
	createdAt?: string
	updatedAt?: string
	createdBy?: User
}
