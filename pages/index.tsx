import { Fragment } from "react"

import Aside from "../components/Aside"
import Article from "../components/Article"

const Home = (): JSX.Element => (
	<Fragment>
		<Aside />
		<Article />
	</Fragment>
)

export default Home
