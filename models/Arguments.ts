export interface Arguments {
	skip?: number
	limit?: number
	filter?: string
	location?: string

	exclude: Array<string>
	priceMin: number
	priceMax: number
	sortBy: string
}
