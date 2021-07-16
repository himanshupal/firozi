import { AppProps } from "next/app"
import { Provider } from "next-auth/client"

import { ApolloProvider } from "@apollo/client"
import client from "helpers/apolloclient"

import Header from "components/Header"
import Footer from "components/Footer"

import "styles/site.scss"
import "swiper/swiper.scss"
import "tailwindcss/tailwind.css"

const App = ({ Component, pageProps }: AppProps): JSX.Element => {
	return (
		<Provider session={pageProps.session}>
			<ApolloProvider client={client}>
				<Header />

				<main className="h-content pb-6 overflow-auto">
					<Component {...pageProps} />
					<Footer />
				</main>
			</ApolloProvider>
		</Provider>
	)
}

export default App
