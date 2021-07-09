import { AppProps } from "next/app"
import { Provider } from "next-auth/client"

import Header from "components/Header"
import Footer from "components/Footer"

import "styles/site.scss"
import "tailwindcss/tailwind.css"

const App = ({ Component, pageProps }: AppProps): JSX.Element => {
	return (
		<Provider session={pageProps.session}>
			<Header />

			<main className="h-content pb-6 overflow-auto">
				<Component {...pageProps} />
				<Footer />
			</main>
		</Provider>
	)
}

export default App
