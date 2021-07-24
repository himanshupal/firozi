import { NextApiRequest, NextApiResponse } from "next"
import { createHash } from "crypto"

const handler = (req: NextApiRequest, res: NextApiResponse) => {
	res.send(createHash("md5").update(req.body).digest("hex"))
}

export default handler
