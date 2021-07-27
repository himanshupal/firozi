export const icon = (
	url: string,
	height: number = 75,
	width: number = 75,
	quality: number = 33
) => url.replace(/upload/, `upload/c_limit,h_${height},q_${quality},w_${width}`)