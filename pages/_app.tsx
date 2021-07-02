import { AppProps } from "next/app"
import { Provider } from "next-auth/client"

import Header from "../components/Header"
import Footer from "../components/Footer"

import "../styles/site.scss"
import "@egjs/react-flicking/dist/flicking.css"

const App = ({ Component, pageProps }: AppProps): JSX.Element => {
	return (
		<Provider session={pageProps.session}>
			<Header />

			<main className="container flex h-screen">
				<Component {...pageProps} />
			</main>

			<Footer />
		</Provider>
	)
}

export default App
