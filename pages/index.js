import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Image from 'next/image'
export default function Home({ tenYr, twoYr }) {
	const spread =
		JSON.parse(JSON.stringify(tenYr[tenYr.length - 1].open)) -
		JSON.parse(JSON.stringify(twoYr[twoYr.length - 1].open))
	const tenYearTwoYearSpread = round(spread, 3)
	return (
		<div className={styles.container}>
			<Head>
				<title>Are we fukt? | An of analysis of recessionary indicators</title>
				<meta name="description" content="I'll put something here laters" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<main className={styles.main}>
				<h1 className={styles.title}>Recession? 😨</h1>

				<p className={styles.description}>
					An of analysis of recessionary indicators.
				</p>

				<div className={styles.grid}>
					<p className={styles.card}>
						<h2>Has the yield curve inverted?</h2>
						<p>
							<strong>T10Y2Y: {tenYearTwoYearSpread}</strong>
							<br />
							<strong>
								{spread >= 0.93
									? "🤩 Wow, that's a lot of growth!"
									: spread == 0.93
									? '😀 This predicability is amazing!'
									: spread >= 0.3 && spread <= 0.93
									? "😅 I'm not sweating, you're sweating"
									: spread >= -0.3 && spread <= 0.3
									? '😨 Aw shit'
									: "🤮 Shit, you're in a recession"}
							</strong>
						</p>
					</p>

					<a className={styles.card}>
						<h2>Learn &rarr;</h2>
						<p>Learn about Next.js in an interactive course with quizzes!</p>
					</a>

					<a
						href="https://github.com/vercel/next.js/tree/canary/examples"
						className={styles.card}
					>
						<h2>Examples &rarr;</h2>
						<p>Discover and deploy boilerplate example Next.js projects.</p>
					</a>

					<a
						href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
						className={styles.card}
					>
						<h2>Deploy &rarr;</h2>
						<p>
							Instantly deploy your Next.js site to a public URL with Vercel.
						</p>
					</a>
				</div>
			</main>

			<footer className={styles.footer}>
				<a
					href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
					target="_blank"
					rel="noopener noreferrer"
				>
					Powered by{' '}
					<span className={styles.logo}>
						<Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
					</span>
				</a>
			</footer>
		</div>
	)
}

export async function getStaticProps() {
	const tenYearRes = await fetch(
		'https://ts-api.cnbc.com/harmony/app/bars/US10Y/1M/20220218000000/20220318000000/adjusted/EST5EDT.json'
	)
	const twoYearRes = await fetch(
		'https://ts-api.cnbc.com/harmony/app/bars/US2Y/1M/20220218000000/20220318000000/adjusted/EST5EDT.json'
	)
	const tenYR = await tenYearRes.json()
	const twoYr = await twoYearRes.json()
	return {
		props: {
			tenYr: tenYR.barData.priceBars || null,
			twoYr: twoYr.barData.priceBars || null
		}
	}
}
export function round(value, minimumFractionDigits) {
	const formattedValue = value.toLocaleString('en', {
		useGrouping: false,
		minimumFractionDigits
	})
	return Number(formattedValue)
}
