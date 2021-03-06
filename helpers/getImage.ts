export const icon = (
	url: string,
	height: number = 75,
	width: number = 75,
	quality: number = 33
) =>
	url
		.replace(/upload/, `upload/c_limit,h_${height},q_${quality},w_${width}`)
		.replace(/^http:/, "https:")

export const profile = (
	url: string,
	height: number = 325,
	width: number = 325,
	quality: number = 75
) =>
	url
		.replace(/upload/, `upload/c_limit,h_${height},q_${quality},w_${width}`)
		.replace(/^http:/, "https:")

export const image = (
	url: string,
	height?: number,
	width?: number,
	quality?: number
) => {
	let path = url.replace(/^http:/, "https:")

	if (height || width || quality) {
		path.replace(/upload/, `upload/c_limit`)

		if (height) path += `,h_${height}`
		if (width) path += `,w_${width}`
		if (quality) path += `,q_${quality}`
	}

	return path
}
