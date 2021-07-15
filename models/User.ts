import { Ad } from "models/Ad"

import { Session } from "models/Session"
import { Account } from "models/Account"
import { ObjectId } from "mongodb"

export interface User {
	_id?: ObjectId
	name?: string
	email?: string
	avatar?: string
	contact?: string
	username?: string
	password?: string
	private?: Boolean
	ads?: Array<Ad>
	saved?: Array<Ad>
	follows?: Array<User>
	createdAt?: string
	updatedAt?: string
	lastOnline?: string
	accounts?: Array<Account>
	sessions?: Array<Session>
	emailVerified?: Date
}
