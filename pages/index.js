import styles from '../styles/Home.module.css'
import Image from 'next/image'
import useSWR from 'swr'

const fetcher = (url) => fetch(url).then((res) => res.json())

export default function Home() {
	const { data, error } = useSWR('http://localhost:3001/data', fetcher)
	if (error) return 'An error has occurred.'
	if (!data) return 'Loading...'
	const spread = data.US10Y - data.US02Y
	return (
		<div className={styles.container}>
			<main className={styles.main}>
				<h1 className={styles.title}>Recession? 😨</h1>

				<p className={styles.description}>
					An of analysis of recessionary indicators.
				</p>

				<div className={styles.grid}>
					<div className={styles.card}>
						<h2>Has the yield curve inverted?</h2>
						<p>
							<strong>T10Y2Y: {spread.toFixed(2)}</strong>
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
							{data.unemployment}% yeah right{' '}
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
						<br />
						<p> {data.realunemployment}% that&apos;s more like it</p>
					</div>

					<div className={styles.card}>
						<h2>Good god, here comes inflation</h2>
						<p>{getPercentageChange(data.cpiNew, data.cpiOld).toFixed(1)}</p>
						<br />
						And {data.cpiNew > data.cpiLastMonth ? 'up' : 'down'}{' '}
						{getPercentageChange(data.cpiNew, data.cpiLastMonth).toFixed(1)}%{' '}
						from last month
					</div>

					<div className={styles.card}>
						<h2>Time for real interest rates</h2>
						<p>DFII10: {data.realRates}</p>
						<br />
						That&apos;s{' '}
						{data.realRates < 0
							? 'not supposed to be negative'
							: 'more like it'}
					</div>

					<div className={styles.card}>
						<h2>How uncertain are investors of economic policy?</h2>
						<p>USEPUINDXD: {parseInt(data.policyUncertaintyNew).toFixed(0)}</p>
						<br />
						Well that&apos;s{' '}
						{data.policyUncertaintyNew > data.policyUncertaintyOld
							? 'up'
							: 'down'}{' '}
						{getPercentageChange(
							data.policyUncertaintyNew,
							data.policyUncertaintyOld
						).toFixed(1)}
						% from yesterday
					</div>
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

function getPercentageChange(newNum, oldNum) {
	return ((newNum - oldNum) / oldNum) * 100
}
