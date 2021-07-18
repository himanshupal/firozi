export const filter = (source: Object) => {
	let filtered: Object = new Object()

	Object.keys(source).forEach((key: string) => {
		if (
			source[key] !== "" &&
			source[key] !== null &&
			source[key] !== undefined
		) {
			filtered = { ...filtered, [key]: source[key] }
		}
	})

	return filtered
}
