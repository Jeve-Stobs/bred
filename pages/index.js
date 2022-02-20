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

				<div className={styles.description}>
					An analysis of recessionary indicators.
				</div>

				<div className={styles.grid}>
					<div className={styles.card}>
						<h2 className={styles.card_title}>Has the yield curve inverted?</h2>
						<span className={styles.info}>
							T10Y2Y:&nbsp;
							<span className={styles.green}>{spread.toFixed(2)}%</span>
						</span>
					</div>

					<div className={styles.card}>
						<h2 className={styles.card_title}>
							How&apos;s unemployment doing?
						</h2>
						<div className={styles.info}>
							<span className={styles.green}>{data.unemployment.fudged}%</span>{' '}
							unemployed
							<br />
							<br />
							More like&nbsp;
							<span className={styles.green}>
								{data.unemployment.real}%
							</span>{' '}
							<Image
								src="/jerome.jpg"
								alt="Vercel Logo"
								width={38}
								height={41}
							/>
							<br />
							<br />
							<span className={styles.card_footer}>
								{data.unemployment.fudged > data.unemployment.lastMonth
									? 'Up'
									: 'Down'}{' '}
								{getPercentageChange(
									data.unemployment.fudged,
									data.unemployment.lastMonth
								).toFixed(1)}
								% from last month
							</span>
						</div>
					</div>

					<div className={styles.card}>
						<h2 className={styles.card_title}>
							Good god, here comes inflation
						</h2>
						<div className={styles.info}>
							<div className={styles.green}>
								{getPercentageChange(data.cpi.new, data.cpi.old).toFixed(1)}%
								since {new Date().toLocaleString('default', { month: 'short' })}{' '}
								{new Date().getFullYear() - 1}
							</div>
							<br />
							<div className={styles.card_footer}>
								{data.cpi.new > data.cpi.lastMonth ? 'Up' : 'Down'}{' '}
								{getPercentageChange(data.cpi.new, data.cpi.lastMonth).toFixed(
									1
								)}
								% from last month
							</div>
						</div>
					</div>

					<div className={styles.card}>
						<h2 className={styles.card_title}>Time for real interest rates</h2>
						<div className={styles.info}>
							<div className={styles.green}>DFII10: {data.realRates}%</div>
							<br />
							<div className={styles.card_footer}>
								That&apos;s{' '}
								{data.realRates < 0
									? 'not supposed to be negative'
									: 'more like it'}
							</div>{' '}
						</div>
					</div>

					<div className={styles.card}>
						<h2 className={styles.card_title}>
							How uncertain are investors of economic policy?
						</h2>
						<div className={styles.info}>
							<div className={styles.green}>
								Economic Policy Uncertainty:{' '}
								{parseInt(data.policy.new).toFixed(0)}
							</div>
							<br />
							<div className={styles.card_footer}>
								{data.policy.new > data.policy.old ? 'Up' : 'Down'}{' '}
								{getPercentageChange(data.policy.new, data.policy.old).toFixed(
									1
								)}
								% from yesterday
							</div>
						</div>
					</div>

					<div className={styles.card}>
						<h2 className={styles.card_title}>
							Are non-essential employees still employed?
						</h2>
						<div className={styles.info}>
							<div>Alcholic Beverage emplyees in CA: {data.alcohol.new}k</div>
							<br />
							<div className={styles.card_footer}>
								{data.alcohol.new > data.alcohol.old ? 'Up' : 'Down'}{' '}
								{getPercentageChange(
									data.alcohol.new,
									data.alcohol.old
								).toFixed(1)}
								% from last month
							</div>{' '}
						</div>
					</div>
				</div>
			</main>

			<footer className={styles.footer}>
				a jevestobs project&nbsp;|&nbsp;
				<i className={styles.footer_info}>Refreshes every 3 minutes</i>
			</footer>
		</div>
	)
}

function getPercentageChange(newNum, oldNum) {
	return Math.abs(((newNum - oldNum) / oldNum) * 100)
}
