export interface Category {
	_id: string
	name: string
	children?: Array<Category>
}
