import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Image from 'next/image'
import useSWR from 'swr'

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function Home() {
	const { data, error } = useSWR('http://localhost:3001/data', fetcher)
	if (error) return "An error has occurred."
	if (!data) return "Loading..."
	const spread = data.US10Y - data.US02Y;
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
					<div className={styles.card}>
						<h2>Has the yield curve inverted?</h2>
						<p>
							<strong>T10Y2Y: {round(spread, 3)}</strong>
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
					</div>

					<div className={styles.card}>
						<h2>How&apos;s unemployment doing?</h2>
						<p>
							{data.unemployment} yeah right{' '}
							<Image
								src="/jerome.jpg"
								alt="Vercel Logo"
								width={38}
								height={41}
							/>
						</p>
						<br />
						<p>
							Let&apos;s look at the <i>real</i> numbers
						</p>
					</div>

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

export function round(value, minimumFractionDigits) {
	const formattedValue = value.toLocaleString('en', {
		useGrouping: false,
		minimumFractionDigits
	})
	return Number(formattedValue)
}
