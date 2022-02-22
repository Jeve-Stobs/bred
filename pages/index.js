import styles from '../styles/Home.module.css'
import Image from 'next/image'
import useSWR from 'swr'
const fetcher = (url) => fetch(url).then((res) => res.json())

export default function Home() {
	const { data, error } = useSWR('http://localhost:3002/data', fetcher, {
		refreshInterval: 5000
	})
	if (error) return 'An error has occurred.'
	if (!data) return
	const spread = data.US10Y.value - data.US02Y.value
	const previous_spread_close = data.US10Y.previous - data.US02Y.previous

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
						<br />
						<br />
						<span className={styles.card_footer}>
							{spread > previous_spread_close ? 'Up' : 'Down'}{' '}
							{getPercentageChange(spread, previous_spread_close, true).toFixed(
								1
							)}
							% from yesterday
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
									data.unemployment.lastMonth,
									true
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
							<span className={styles.green}>
								{getPercentageChange(data.cpi.new, data.cpi.old).toFixed(1)}%
							</span>{' '}
							since {new Date().toLocaleString('default', { month: 'short' })}{' '}
							{new Date().getFullYear() - 1}
							<br />
							<br />
							<div className={styles.card_footer}>
								{data.cpi.new > data.cpi.lastMonth ? 'Up' : 'Down'}{' '}
								{getPercentageChange(
									data.cpi.new,
									data.cpi.lastMonth,
									true
								).toFixed(1)}
								% from last month
							</div>
						</div>
					</div>

					<div className={styles.card}>
						<h2 className={styles.card_title}>Time for real interest rates</h2>
						<div className={styles.info}>
							Real rates:{' '}
							<span className={styles.green}>{data.realRates.new}%</span>
							<br />
							<br />
							<div className={styles.card_footer}>
								{data.realRates.old > data.realRates.new ? 'Up' : 'Down'}{' '}
								{getPercentageChange(
									data.realRates.new,
									data.realRates.old,
									true
								).toFixed(1)}
								% from yesterday
							</div>{' '}
						</div>
					</div>

					<div className={styles.card}>
						<h2 className={styles.card_title}>
							How uncertain are investors of economic policy?
						</h2>
						<div className={styles.info}>
							Economic Policy Uncertainty:{' '}
							<span className={styles.green}>
								{parseInt(data.policy.new).toFixed(0)}
							</span>
							<br />
							<br />
							<div className={styles.card_footer}>
								{data.policy.new > data.policy.old ? 'Up' : 'Down'}{' '}
								{getPercentageChange(
									data.policy.new,
									data.policy.old,
									true
								).toFixed(1)}
								% from yesterday
							</div>
						</div>
					</div>

					<div className={styles.card}>
						<h2 className={styles.card_title}>
							Are non-essential employees still employed?
						</h2>
						<div className={styles.info}>
							Adult beverage employees in CA:{' '}
							<span className={styles.green}>{data.alcohol.new}k</span>
							<br />
							<br />
							<div className={styles.card_footer}>
								{data.alcohol.new > data.alcohol.old ? 'Up' : 'Down'}{' '}
								{getPercentageChange(
									data.alcohol.new,
									data.alcohol.old,
									true
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

function getPercentageChange(newNum, oldNum, absolute) {
	if (absolute) {
		return Math.abs(((newNum - oldNum) / oldNum) * 100)
	}
	return ((newNum - oldNum) / oldNum) * 100
}
