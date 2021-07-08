import { AppProps } from "next/app"
import { Provider } from "next-auth/client"

import Header from "../components/Header"

import "../styles/site.scss"
import "tailwindcss/tailwind.css"
import "@egjs/react-flicking/dist/flicking.css"

const App = ({ Component, pageProps }: AppProps): JSX.Element => {
	return (
		<Provider session={pageProps.session}>
			<Header />

			<main className="h-content">
				<Component {...pageProps} />
			</main>
		</Provider>
	)
}

export default App
