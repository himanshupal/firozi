import { AppProps } from "next/app"
import { Provider } from "next-auth/client"

import { ApolloProvider } from "@apollo/client"
import client from "helpers/apolloclient"

import appState from "store/state"
import shallow from "zustand/shallow"

import Header from "components/Header"
import Footer from "components/Footer"

import Modal from "components/Modal"

import { ToastContainer } from "react-toastify"

import "styles/site.scss"
import "swiper/swiper.scss"
import "tailwindcss/tailwind.css"
import "react-toastify/dist/ReactToastify.css"
import { useEffect } from "react"
import Loading from "components/Loading"
import computed from "store/computed"

const App = ({ Component, pageProps }: AppProps): JSX.Element => {
	const [categories, setCategories] = computed(
		(state) => [state.categories, state.setCategories],
		shallow
	)

	const [error, modal, loading, setModal] = appState(
		(state) => [state.error, state.modal, state.loading, state.setModal],
		shallow
	)

	useEffect(() => {
		if (process?.env?.NODE_ENV === "development") document.designMode = "on"

		if (!categories) setCategories("Product")
	}, [])

	return (
		<Provider session={pageProps.session}>
			<ApolloProvider client={client}>
				<Header />

				<main className="h-content pb-6 overflow-auto">
					<Component {...pageProps} />
					<Footer />

					<ToastContainer position="bottom-right" />

					{modal && <Modal title={error} fixed toggle={setModal} />}

					{loading && <Loading message={loading} />}
				</main>
			</ApolloProvider>
		</Provider>
	)
}

export default App
