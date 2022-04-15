import type { NextPage } from 'next'
import useSWR from 'swr'
import Link from 'next/link'
import styles from '../styles/Home.module.css'
import Error from './_error'
import Cards from '../components/Card'

const Home: NextPage = () => {
	const fetcher = (url: string) => fetch(url).then((r) => r.json())
	const { data, error } = useSWR('http://localhost:3002/data', fetcher)
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
						indicator="10Y minus 2Y:"
						a={spread}
						b={previous_spread_close}
						main={getFlooredFixed(spread * 100, 2)}
						footer={getFlooredFixed(
							Math.abs(spread - previous_spread_close) * 100,
							2
						)}
						symbol="bps"
						time="yesterday"
					/>
					<Cards
						title="How's unemployment doing?"
						indicator="Unemployment rate:"
						a={data.unemployment.fudged}
						b={data.unemployment.lastMonth}
						main={data.unemployment.fudged}
						footer={Math.round(
							Math.abs(data.unemployment.fudged - data.unemployment.lastMonth) *
								10
						)}
						symbol="bps"
						time="last month"
					/>
					<Cards
						title="CPI inflation"
						indicator={
							'Since ' +
							new Date(
								new Date().setMonth(new Date().getMonth() - 13)
							).toLocaleString('en-US', { month: 'short' }) +
							' ' +
							(new Date().getFullYear() - 1) +
							':'
						}
						a={data.cpi.new}
						b={data.cpi.old}
						main={getPercentageChange(
							data.cpi.new,
							data.cpi.old,
							false
						).toFixed(1)}
						footer={getPercentageChange(
							data.cpi.new,
							data.cpi.lastMonth,
							false
						).toFixed(1)}
						symbol="%"
						time="last month"
					/>
					<Cards
						title="Interest rates (inflation indexed)"
						indicator="Real rates:"
						a={data.realRates.old}
						b={data.realRates.new}
						main={data.realRates.new}
						footer={Math.abs(data.realRates.new - data.realRates.old).toFixed(
							2
						)}
						symbol="%"
						time="yesterday"
					/>
					<Cards
						title="How uncertain are investors of economic policy?"
						indicator="Econ Policy Uncertainty:"
						a={data.policy.new}
						b={data.policy.old}
						main={Math.round(data.policy.new)}
						footer={getPercentageChange(
							data.policy.new,
							data.policy.old,
							true
						).toFixed(1)}
						symbol="bps"
						time="yesterday"
					/>
					<Cards
						title="What ratio of the population is working?"
						indicator="Employment to population ratio:"
						a={data.emratio.new}
						b={data.emratio.old}
						main={data.emratio.new}
						footer={getPercentageChange(
							data.emratio.new,
							data.emratio.old,
							true
						).toFixed(1)}
						symbol="%"
						time="last month"
					/>
					<Cards
						title="How many people are leaving their jobs?"
						indicator="Initial jobless claims:"
						a={data.claims.new}
						b={data.claims.old}
						main={String(data.claims.new).substring(0, 3)}
						footer={String(
							Math.abs(data.claims.new - data.claims.old)
						).substring(0, 2)}
						symbol="k"
						time="last month"
					/>
					<Cards
						title="How many people are contributing to the economy?"
						indicator="Total Nonfarm Payroll:"
						a={data.payroll.new}
						b={data.payroll.old}
						main={String(data.payroll.new).substring(0, 3)}
						footer={String(
							Math.abs(data.payroll.new - data.payroll.old)
						).substring(0, 2)}
						symbol="k"
						time="last month"
					/>
					<Cards
						title="What's the current 30 year mortgage rate?"
						indicator="30-Year Fixed Rate Mortgage Avg:"
						a={data.mortgage30us.new}
						b={data.mortgage30us.old}
						main={data.mortgage30us.new}
						footer={String(
							getFlooredFixed(
								Math.abs(data.mortgage30us.new - data.mortgage30us.old),
								2
							)
						)}
						symbol="%"
						time="last thursday"
					/>
					<Cards
						title="Key inflation (PCEPI)"
						indicator="PCEPI:"
						a={data.inflation.new}
						b={data.inflation.old}
						main={getPercentageChange(
							data.inflation.new,
							data.inflation.old,
							false
						).toFixed(1)}
						footer={getPercentageChange(
							data.inflation.new,
							data.inflation.lastMonth,
							false
						).toFixed(1)}
						symbol="%"
						time="last month"
					/>
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
					New data every 30 seconds. Last updated:{' '}
					{new Date(parseInt(data.lastupdated)).toLocaleString('en-US', {
						hour: 'numeric',
						minute: 'numeric',
						second: 'numeric',
						hour12: true
					})}
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

/* https://stackoverflow.com/a/36862114/15698722 */
function getFlooredFixed(v: number, d: number) {
	return (Math.floor(v * Math.pow(10, d)) / Math.pow(10, d)).toFixed(d)
}
