import type { NextPage } from 'next'
import useSWR from 'swr'
import Link from 'next/link'
import styles from '../styles/Home.module.css'
import Error from './_error'

const Home: NextPage = () => {
	const fetcher = (url: string) => fetch(url).then((r) => r.json())
	const { data, error } = useSWR('https://api.jevestobs.dev/data', fetcher)
	if (!data) return <div></div>
	if (error) return <Error />
	const spread = data.US10Y.value - data.US02Y.value
	const previous_spread_close = data.US10Y.previous - data.US02Y.previous

	return (
		<div className={styles.container}>
			<main className={styles.main}>
				<h1 className={styles.title}>Is the party over?</h1>

				<div className={styles.description}>
					An analysis of recessionary indicators.
				</div>

				<div className={styles.grid}>
					<div className={styles.card}>
						<h2 className={styles.card_title}>
							Has the yield curve gone negative?
						</h2>
						<span className={styles.info}>
							10Y minus 2Y:&nbsp;
							<span className={getClassName(spread, previous_spread_close)}>
								{spread.toFixed(2)}
							</span>
						</span>
						<br />
						<br />
						<span className={styles.card_footer}>
							{spread > previous_spread_close ? 'Up' : 'Down'}{' '}
							{Math.abs(spread - previous_spread_close).toFixed(2)} points from
							yesterday
						</span>
					</div>

					<div className={styles.card}>
						<h2 className={styles.card_title}>
							How&apos;s unemployment doing?
						</h2>
						<div className={styles.info}>
							<span
								className={getClassName(
									data.unemployment.fudged,
									data.unemployment.lastMonth
								)}
							>
								{data.unemployment.fudged}%
							</span>{' '}
							unemployed
							<br />
							<br />
							More like&nbsp;
							<span
								className={getClassName(
									data.unemployment.real,
									data.unemployment.lastMonth
								)}
							>
								{data.unemployment.real}%
							</span>
							<br />
							<br />
							<span className={styles.card_footer}>
								{data.unemployment.fudged > data.unemployment.lastMonth
									? 'Up'
									: 'Down'}{' '}
								{Math.abs(
									data.unemployment.fudged - data.unemployment.lastMonth
								).toFixed(1)}{' '}
								points from last month
							</span>
						</div>
					</div>

					<div className={styles.card}>
						<h2 className={styles.card_title}>CPI inflation</h2>
						<div className={styles.info}>
							<span className={getClassName(data.cpi.new, data.cpi.old)}>
								{getPercentageChange(data.cpi.new, data.cpi.old, false).toFixed(
									1
								)}
								%
							</span>{' '}
							since {new Date().toLocaleString('default', { month: 'short' })}{' '}
							{new Date().getFullYear() - 1}
							<br />
							<br />
							<div className={styles.card_footer}>
								{data.cpi.new > data.cpi.lastMonth ? 'Up' : 'Down'}{' '}
								{Math.abs(data.cpi.new - data.cpi.lastMonth).toFixed(2)} points
								from last month
							</div>
						</div>
					</div>

					<div className={styles.card}>
						<h2 className={styles.card_title}>
							Real interest rates (Inflation Indexed)
						</h2>
						<div className={styles.info}>
							Real rates:{' '}
							<span
								className={getClassName(
									Math.abs(data.realRates.new),
									Math.abs(data.realRates.old)
								)}
							>
								{data.realRates.new}%
							</span>
							<br />
							<br />
							<div className={styles.card_footer}>
								{Math.abs(data.realRates.new) > Math.abs(data.realRates.old)
									? 'Up'
									: 'Down'}{' '}
								{Math.abs(data.realRates.new - data.realRates.old).toFixed(1)}{' '}
								points from yesterday
							</div>{' '}
						</div>
					</div>

					<div className={styles.card}>
						<h2 className={styles.card_title}>
							How uncertain are investors of economic policy?
						</h2>
						<div className={styles.info}>
							Economic Policy Uncertainty:{' '}
							<span className={getClassName(data.policy.new, data.policy.old)}>
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
							<span
								className={getClassName(data.alcohol.new, data.alcohol.old)}
							>
								{data.alcohol.new}k
							</span>
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
					<div className={styles.card}>
						<h2 className={styles.card_title}>
							How many people are leaving their jobs?
						</h2>
						<div className={styles.info}>
							Initial claims:{' '}
							<span className={getClassName(data.claims.new, data.claims.old)}>
								{new String(data.claims.new).substring(0, 3)}k
							</span>
							<br />
							<br />
							<div className={styles.card_footer}>
								{data.claims.new > data.claims.old ? 'Up' : 'Down'}{' '}
								{getPercentageChange(
									data.claims.new,
									data.claims.old,
									true
								).toFixed(1)}
								% since last Saturday
							</div>{' '}
						</div>
					</div>
					<div className={styles.card}>
						<h2 className={styles.card_title}>
							How many people are contributing to the economy?
						</h2>
						<div className={styles.info}>
							Total Nonfarm Payroll:{' '}
							<span
								className={getClassName(data.payroll.new, data.payroll.old)}
							>
								{new String(data.payroll.new).substring(0, 3)}k
							</span>
							<br />
							<br />
							<div className={styles.card_footer}>
								{data.payroll.new > data.payroll.old ? 'Up' : 'Down'}{' '}
								{getPercentageChange(
									data.payroll.new,
									data.payroll.old,
									true
								).toFixed(1)}
								% from last month
							</div>{' '}
						</div>
					</div>
					<div className={styles.card}>
						<h2 className={styles.card_title}>
							What&apos;s the likelyhood that the USD will deflate?
						</h2>
						<div className={styles.info}>
							Deflation probability (like this&apos;ll ever happen): <br />
							<br />
							<span
								className={getClassName(data.deflation.new, data.deflation.old)}
							>
								{data.deflation.new}% chance
							</span>
							<br />
							<br />
							<div className={styles.card_footer}>
								{data.deflation.new > data.deflation.old ? 'Up' : 'Down'}{' '}
								{getPercentageChange(
									data.deflation.new,
									data.deflation.old,
									true
								).toFixed(1)}
								% from last month
							</div>{' '}
						</div>
					</div>
					<div className={styles.card}>
						<h2 className={styles.card_title}>
							Key inflation (the fed&apos;s favorite number)
						</h2>
						<div className={styles.info}>
							PCEPI:{' '}
							<span
								className={getClassName(data.inflation.new, data.inflation.old)}
							>
								{getPercentageChange(
									data.inflation.new,
									data.inflation.old,
									false
								).toFixed(1)}
								%
							</span>
							<br />
							<br />
							<div className={styles.card_footer}>
								{data.inflation.new > data.inflation.lastMonth ? 'Up' : 'Down'}{' '}
								{Math.abs(
									data.inflation.new - data.inflation.lastMonth
								).toFixed(1)}{' '}
								points from last month
							</div>{' '}
						</div>
					</div>
				</div>
			</main>

			<footer className={styles.footer}>
				<Link href="https://jevestobs.dev" passHref>
					a jevestobs project&nbsp;|&nbsp;
				</Link>
				<i className={styles.footer_info}>
					Automatically refreshes every 3 minutes
				</i>
			</footer>
		</div>
	)
}
export default Home

function getPercentageChange(
	newNum: number,
	oldNum: number,
	absolute: boolean
) {
	if (absolute) {
		return Math.abs(((newNum - oldNum) / oldNum) * 100)
	}
	return ((newNum - oldNum) / oldNum) * 100
}

function getClassName(a: number, b: number) {
	return a > b ? styles.green : styles.red
}
