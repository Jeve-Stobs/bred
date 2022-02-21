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
				<title>Are we fukt? | An analysis of recessionary indicators</title>
				<link rel="preconnect" href="http://localhost:3002" />
				<link rel="dns-prefetch" href="http://localhost:3002" />
				<link
					rel="preload"
					href="http://localhost:3002/api/data"
					as="fetch"
					crossOrigin="anonymous"
				/>
				<meta name="description" content="I'll put something here laters" />
				<link rel="icon" href="/favicon.ico" />
				<meta
					property="og:title"
					content="Are we fukt? | An of analysis of recessionary indicators"
				/>
				<meta property="og:locale" content="en_US" />
				<meta property="og:url" content="https://jevestobs.dev" />
				<meta property="og:image" content="/favicon.ico" />
				<meta property="og:image:width" content="120" />
				<meta property="og:image:height" content="108" />
				<meta property="og:type" content="website" />
				<meta
					property="og:description"
					content="I'll put something here laters"
				/>
				<meta name="twitter:card" content="summary_large_image" />
				<meta
					name="twitter:title"
					content="Are we fukt? | An of analysis of recessionary indicators"
				/>
				<meta
					name="twitter:description"
					content="I'll put something here laters"
				/>
				<meta name="twitter:image" content="/favicon.ico" />
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
