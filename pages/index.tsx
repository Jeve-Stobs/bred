import type { NextPage } from 'next'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import styles from '../styles/Home.module.css'
import Error from './_error'
import Cards from '../components/Card'
import { w3cwebsocket } from 'websocket'

const client = new w3cwebsocket('ws://localhost:3002/ws')

const Home: NextPage = () => {
	const [data, setData] = useState<any>()

	useEffect(() => {
		// @ts-ignore
		const data = JSON.parse(localStorage.getItem('data'))
		if (data) {
			setData(data)
		}
	}, [])
	client.onerror = function () {
		console.error('[Websockets] Connection Error')
	}

	client.onopen = function () {
		console.log('[WebSockets] Client Connected')
	}

	client.onclose = function () {
		console.log('[Websockets] Client Closed')
	}

	client.onmessage = function (e: any) {
		if (typeof e.data === 'string') {
			//console.log('[Websockets] Received: ' + e.data)
			const data = JSON.parse(e.data)
			setData(data)
		}
	}
	if (data == null) {
		return <div>loading</div>
	}
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
						a={data.US10Y.value - data.US02Y.value}
						b={data.US10Y.previous - data.US02Y.previous}
						main={getFlooredFixed(
							(data.US10Y.value - data.US02Y.value) * 100,
							2
						)}
						footer={getFlooredFixed(
							Math.abs(
								data.US10Y.value -
									data.US02Y.value -
									(data.US10Y.previous - data.US02Y.previous)
							) * 100,
							2
						)}
						symbol="bps"
						time="yesterday"
					/>
					<Cards
						title="How's unemployment doing?"
						indicator="Unemployment rate:"
						a={data.unemployment.unrate}
						b={data.unemployment.lastMonth}
						main={data.unemployment.unrate}
						footer={Math.round(
							Math.abs(data.unemployment.unrate - data.unemployment.lastMonth) *
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
						a={data.rates.old}
						b={data.rates.new}
						main={data.rates.new}
						footer={Math.abs(data.rates.new - data.rates.old).toFixed(2)}
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
						).toFixed(2)}
						symbol="bps"
						time="yesterday"
					/>
					<Cards
						title="Market expectation of near term volatility"
						indicator="CBOE VIX:"
						a={data.vix.value}
						b={data.vix.previous}
						main={data.vix.value}
						footer={Math.abs(data.vix.value - data.vix.previous).toFixed(2)}
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
					<Cards
						title="Smoothed Recession Probabilities"
						indicator="Recession Probability:"
						a={data.recp.new}
						b={data.recp.old}
						main={data.recp.new}
						footer={getFlooredFixed(Math.abs(data.recp.new - data.recp.old), 2)}
						symbol="bps"
						time="last month"
					/>
					<Cards
						title="Fed's Balance Sheet"
						indicator="Total Assets Less Eliminations from Consolidation:"
						a={data.balancesheet.new}
						b={data.balancesheet.old}
						main={getNumberFormat(data.balancesheet.new)}
						footer={getNumberFormat(
							data.balancesheet.new - data.balancesheet.old
						)}
						symbol=""
						time="last wednesday"
					/>
					<Cards
						title="Real GDP"
						indicator="GDP Inflation Indexed:"
						a={data.realgdp.new}
						b={data.realgdp.old}
						main={data.realgdp.new}
						footer={Math.abs(data.realgdp.new - data.realgdp.old)}
						symbol="bps"
						time="last quarter"
					/>
					<Cards
						title="Consumer Lending"
						indicator="Consumer Loans:"
						a={data.consumer.new}
						b={data.consumer.old}
						main={getNumberFormat(data.consumer.new * 1000)}
						footer={getNumberFormat(data.consumer.new - data.consumer.old)}
						symbol=""
						time="last week"
					/>
					<Cards
						title="Personal Saving Rate"
						indicator="Personal Savings Rate:"
						a={data.personal.new}
						b={data.personal.old}
						main={data.personal.new}
						footer={getPercentageChange(
							data.personal.new,
							data.personal.old,
							true
						).toPrecision(2)}
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
					GitHub
				</Link>
				<Link href="/citations" passHref>
					&nbsp;Citations&nbsp;
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
	isAbsolute: boolean
) {
	if (isAbsolute) {
		return Math.abs(((newNum - oldNum) / oldNum) * 100)
	}
	return ((newNum - oldNum) / oldNum) * 100
}

function getNumberFormat(num: number) {
	return Intl.NumberFormat('en', { notation: 'compact' }).format(
		Math.abs(num) * 1000000
	)
}

/* https://stackoverflow.com/a/36862114/15698722 */
function getFlooredFixed(v: number, d: number) {
	return (~~(v * Math.pow(10, d)) / Math.pow(10, d)).toFixed(d)
}
