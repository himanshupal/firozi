import { NextApiHandler, NextApiRequest, NextApiResponse } from "next"

const Api: NextApiHandler<JSON> = async (
	req: NextApiRequest,
	res: NextApiResponse
) => {
	res.json({
		message: `REST API is not being used, please use /api/graphql instead.`
	})
}

export default Api
