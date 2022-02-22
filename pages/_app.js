import '../styles/globals.css'
import Head from 'next/head'

function App({ Component, pageProps }) {
	return (
		<>
			<Head>
				<meta
					name="viewport"
					content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover"
				/>
				<title>
					Is the party over? | An analysis of recessionary indicators
				</title>
				<link rel="preconnect" href="https://api.jevestobs.dev/data" />
				<link rel="dns-prefetch" href="https://api.jevestobs.dev/data" />
				<link
					rel="preload"
					href="https://api.jevestobs.dev/data"
					as="fetch"
					crossOrigin="anonymous"
				/>
				<link
					rel="preload"
					href="/font/8b42e3fc6d1d161d6fbd7487babe6cfe.woff2"
					as="font"
					type="font/woff2"
					crossOrigin="anonymous"
				/>
				<link
					rel="preload"
					href="/font/f31b2ecb2f8e039d53bd75d5314229c7.woff2"
					as="font"
					type="font/woff2"
					crossOrigin="anonymous"
				/>
				<meta
					name="description"
					content="A content aggregation tool build to gauge the health of financial markets"
				/>
				<link rel="shortcut icon" href="/images/favicon.ico" />
				<meta
					property="og:title"
					content="Is the party over? | An of analysis of recessionary indicators"
				/>
				<meta property="og:locale" content="en_US" />
				<meta property="og:url" content="https://jevestobs.dev" />
				<meta property="og:type" content="website" />
				<meta
					property="og:description"
					content="A content aggregation tool build to gauge the health of financial markets"
				/>
				<meta name="twitter:card" content="summary_large_image" />
				<meta
					name="twitter:title"
					content="Is the party over? | An of analysis of recessionary indicators"
				/>
				<meta
					name="twitter:description"
					content="A content aggregation tool build to gauge the health of financial markets"
				/>
				<meta
					name="twitter:image"
					content="https://cms.qz.com/wp-content/uploads/2018/07/Jerome_Powell-Face.jpg"
				/>
				<meta
					name="Keywords"
					content="finance, fed, jerome powell, recession, financial analysis, indicators, charts, graphs, yield curve"
				/>
			</Head>
			<div className="container">
				<Component {...pageProps} />
			</div>
		</>
	)
}

export default App
export function reportWebVitals(metric) {
	console.log(metric)
}
