import { Fragment } from "react"

import Aside from "../components/Aside"
import Article from "../components/Article"

const Home = (): JSX.Element => (
	<Fragment>
		<Aside />
		<Article>
			<div>This is Text.</div>
		</Article>
	</Fragment>
)

export default Home
