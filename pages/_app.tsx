import '../styles/globals.css'
import 'normalize.css/normalize.css'
import { AppProps } from 'next/app'
import Head from 'next/head'
import { Red_Hat_Display } from 'next/font/google'

const hat = Red_Hat_Display({ subsets: ['latin'] })

export default function App(props: AppProps) {
	const { Component, pageProps } = props

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
				<meta
					name="application-name"
					content="Is the party over? | An of analysis of recessionary indicators"
				/>
				<meta name="apple-mobile-web-app-capable" content="yes" />
				<meta name="apple-mobile-web-app-status-bar-style" content="default" />
				<meta name="apple-mobile-web-app-title" content="bred" />
				<meta name="format-detection" content="telephone=no" />
				<meta name="mobile-web-app-capable" content="yes" />
				<meta name="theme-color" content="#000000" />

				<link rel="apple-touch-icon" href="/images/any_maskable.png" />
				<link rel="manifest" href="/manifest.json" />
				<link
					rel="mask-icon"
					href="/apple/safari-pinned-tab.svg"
					color="#262322"
				/>
				<meta
					name="description"
					content="A data aggregation tool built to gauge the health of financial markets"
				/>

				<meta name="twitter:card" content="summary" />
				<meta name="twitter:url" content="https://bred.jevestobs.dev" />
				<meta
					name="twitter:title"
					content="Is the party over? | An of analysis of recessionary indicators"
				/>
				<meta
					name="twitter:description"
					content="A data aggregation tool built to gauge the health of financial markets"
				/>
				<meta name="twitter:image" content="/images/fredgraph.png" />
				<meta name="twitter:creator" content="@devstobs" />
				<meta property="og:type" content="website" />
				<meta property="og:locale" content="en_US" />
				<meta
					property="og:title"
					content="Is the party over? | An of analysis of recessionary indicators"
				/>
				<meta
					property="og:description"
					content="A data aggregation tool built to gauge the health of financial markets"
				/>
				<meta
					property="og:site_name"
					content="Is the party over? | An of analysis of recessionary indicators"
				/>
				<meta property="og:url" content="https://bred.jevestobs.dev" />
				<meta property="og:image" content="/images/fredgraph.png" />
				<meta
					name="Keywords"
					content="finance, fed, jerome powell, recession, financial analysis, indicators, charts, graphs, yield curve"
				/>
			</Head>

			<main className={hat.className}>
				<Component {...pageProps} />
			</main>
		</>
	)
}
