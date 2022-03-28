import type { NextPage } from 'next'
import useSWR from 'swr'
import Link from 'next/link'
import styles from '../styles/Home.module.css'
import Error from './_error'
import Cards from '../components/Cards'

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
					<Cards
						title="Is the yield curve negative?"
						indicator="10Y minus 2Y"
						a={spread}
						b={previous_spread_close}
						symbol="bps"
						time="yesterday"
					/>
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
							unemployed <br /> <br />
							U-6 (Unemployment):&nbsp;
							<span
								className={getClassName(
									data.unemployment.real,
									data.unemployment.lastMonth
								)}
							>
								{data.unemployment.real}%
							</span>
						</div>
						<span className={styles.card_footer}>
							{upOrDown(data.unemployment.fudged, data.unemployment.lastMonth)}{' '}
							{Math.round(
								Math.abs(
									data.unemployment.fudged - data.unemployment.lastMonth
								) * 100
							)}{' '}
							bps from last month
						</span>
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
						</div>
						<div className={styles.card_footer}>
							{upOrDown(data.cpi.new, data.cpi.lastMonth)}{' '}
							{Math.round(Math.abs(data.cpi.new - data.cpi.lastMonth) * 100)}{' '}
							bps from last month
						</div>
					</div>

					<div className={styles.card}>
						<h2 className={styles.card_title}>
							Interest rates (inflation indexed)
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
						</div>
						<div className={styles.card_footer}>
							{upOrDown(data.realRates.new, data.realRates.old)}{' '}
							{Math.round(
								Math.abs(data.realRates.new - data.realRates.old) * 100
							)}{' '}
							bps from yesterday
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
						</div>
						<div className={styles.card_footer}>
							{upOrDown(data.policy.new, data.policy.old)}{' '}
							{getPercentageChange(
								data.policy.new,
								data.policy.old,
								true
							).toFixed(1)}
							% from yesterday
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
						</div>
						<div className={styles.card_footer}>
							{upOrDown(data.alcohol.new, data.alcohol.old)}{' '}
							{getPercentageChange(
								data.alcohol.new,
								data.alcohol.old,
								true
							).toFixed(1)}
							% from last month
						</div>
					</div>
					<div className={styles.card}>
						<h2 className={styles.card_title}>
							How many people are leaving their jobs?
						</h2>
						<div className={styles.info}>
							Initial claims:{' '}
							<span className={getClassName(data.claims.new, data.claims.old)}>
								{String(data.claims.new).substring(0, 3)}k
							</span>
						</div>
						<div className={styles.card_footer}>
							{upOrDown(data.claims.new, data.claims.old)}{' '}
							{getPercentageChange(
								data.claims.new,
								data.claims.old,
								true
							).toFixed(1)}
							% since last Saturday
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
								{String(data.payroll.new).substring(0, 3)}k
							</span>
						</div>
						<div className={styles.card_footer}>
							{upOrDown(data.payroll.new, data.payroll.old)}{' '}
							{getPercentageChange(
								data.payroll.new,
								data.payroll.old,
								true
							).toFixed(1)}
							% from last month
						</div>
					</div>
					<div className={styles.card}>
						<h2 className={styles.card_title}>
							What&apos;s the likelyhood that the USD will deflate?
						</h2>
						<div className={styles.info}>
							Deflation probability:{' '}
							<span
								className={getClassName(data.deflation.new, data.deflation.old)}
							>
								{data.deflation.new}% chance
							</span>
						</div>
						<div className={styles.card_footer}>
							{upOrDown(data.deflation.new, data.deflation.old)}{' '}
							{getPercentageChange(
								data.deflation.new,
								data.deflation.old,
								true
							).toFixed(1)}
							% from last month
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
						</div>
						<div className={styles.card_footer}>
							{upOrDown(data.inflation.new, data.inflation.old)}{' '}
							{Math.round(
								Math.abs(data.inflation.new - data.inflation.lastMonth) * 100
							)}{' '}
							bps from last month
						</div>
					</div>
				</div>
			</main>

			<footer className={styles.footer}>
				<Link
					href="https://github.com/Jeve-Stobs/bred?ref=bred.jevestobs.dev"
					passHref
				>
					GitHub&nbsp;|&nbsp;
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
	if (a === b) {
		return styles.grey
	}
	if (a > b) {
		return styles.green
	}
	return styles.red
}

function upOrDown(a: number, b: number) {
	if (a === b) {
		return 'UNCH'
	}
	if (a > b) {
		return 'Up'
	}
	return 'Down'
}

/* https://stackoverflow.com/a/36862114/15698722 */
function getFlooredFixed(v: number, d: number) {
	return (Math.floor(v * Math.pow(10, d)) / Math.pow(10, d)).toFixed(d)
}
