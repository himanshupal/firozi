import { NextApiHandler, NextApiRequest, NextApiResponse } from "next"

const Api: NextApiHandler<JSON> = async (
	req: NextApiRequest,
	res: NextApiResponse
) => {
	res.json("API")
}

export default Api
