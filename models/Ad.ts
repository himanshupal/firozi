import { User } from "models/User"

export interface Ad {
	_id: string
	title: string
	slug: string
	description: string
	category: string
	images: [string]
	price: Number
	usedFor: string
	condition: string
	shippingBy: string
	negotiable: Boolean
	workingHours: string
	offlineOnly: Boolean
	location: string
	createdAt: string
	updatedAt: string
	createdBy: User
}
