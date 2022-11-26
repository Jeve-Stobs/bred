import type { NextPage } from 'next'
import { useState, useEffect } from 'react'
import { w3cwebsocket } from 'websocket'
import { Github, Quote } from 'lucide-react'
import Skeleton from 'react-loading-skeleton'
import Link from 'next/link'
import styles from '../styles/Home.module.css'
import Cards from '../components/Card'
import 'react-loading-skeleton/dist/skeleton.css'

const client = new w3cwebsocket('wss://api.jevestobs.dev/ws')

const Home: NextPage = () => {
	const [data, setData] = useState<any>()

	useEffect(() => {
		if (data) {
			setData(data)
		} else {
			client.onopen = () => {
				console.log('WebSocket Client Connected')
			}
			client.onmessage = (message) => {
				const dataFromServer = JSON.parse(message.data.toString())
				setData(dataFromServer)
			}
		}
	}, [data])
	client.onerror = function () {
		console.error('[Websockets] Connection Error')
	}

	client.onopen = function () {
		console.info('[WebSockets] Client Connected')
	}

	client.onclose = function () {
		console.info('[Websockets] Client Closed')
	}

	client.onmessage = function (e: any) {
		if (typeof e.data === 'string') {
			//console.debug('[Websockets] Received: ' + e.data)
			const data = JSON.parse(e.data)
			setData(data)
		}
	}
	if (data == null) {
		return (
			<div className={styles.container}>
				<main className={styles.main}>
					<h1 className={styles.title}>Is the party over?</h1>

					<div className={styles.description}>
						An analysis of recessionary indicators.
					</div>
					<div className={styles.grid}>
						<div className={styles.card}>
							<Skeleton count={7} />
						</div>
						<div className={styles.card}>
							<Skeleton count={7} />
						</div>
						<div className={styles.card}>
							<Skeleton count={7} />
						</div>
						<div className={styles.card}>
							<Skeleton count={7} />
						</div>
					</div>
				</main>
			</div>
		)
	}
	const spreadChange =
		data.US10Y.last -
		data.US2Y.last -
		(data.US10Y.last - data.US10Y.change) +
		(data.US2Y.last - data.US2Y.change)
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
						a={data.US10Y.last - data.US2Y.last}
						b={
							data.US10Y.last -
							data.US10Y.change -
							(data.US2Y.last - data.US2Y.change)
						}
						main={getFlooredFixed((data.US10Y.last - data.US2Y.last) * 100, 3)}
						footer={getFlooredFixed(Math.abs(spreadChange * 100), 3)}
						symbol="bps"
						time="yesterday"
					/>
					<Cards
						title="How's unemployment doing?"
						indicator="Unemployment rate:"
						a={data.unemployment.unrate}
						b={data.unemployment.lastMonth}
						main={data.unemployment.unrate}
						footer={getFlooredFixed(
							Math.abs(data.unemployment.unrate - data.unemployment.lastMonth),
							2
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
						main={getFlooredFixed(
							getPercentageChange(data.cpi.new, data.cpi.old, false),
							2
						)}
						footer={getFlooredFixed(
							getPercentageChange(data.cpi.new, data.cpi.lastMonth, true),
							2
						)}
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
						a={data.vix.last}
						b={data.vix.last - data.vix.change}
						main={data.vix.last}
						footer={Math.abs(data.vix.change)}
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
						main={String(data.payroll.new - data.payroll.old)}
						footer={Math.abs(
							data.payroll.new -
								data.payroll.old -
								(data.payroll.old - data.payroll.twoMonthsAgo)
						)}
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
								3
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
						footer={getFlooredFixed(Math.abs(data.recp.new - data.recp.old), 3)}
						symbol="bps"
						time="last month"
					/>
					<Cards
						title="Fed's Balance Sheet"
						indicator="Total Assets Less Consolidation Eliminations:"
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
					<Cards
						title="5y Forward Inflation Expectations"
						indicator="5y5y Forward Expectations:"
						a={data.expectations.new}
						b={data.expectations.old}
						main={data.expectations.new}
						footer={getFlooredFixed(
							Math.abs(data.expectations.new - data.expectations.old),
							3
						)}
						symbol="%"
						time="last month"
					/>
					<Cards
						title="Credit spreads: HY-OAS"
						indicator="BofA US High Yield:"
						a={data.creditspreads.new}
						b={data.creditspreads.old}
						main={data.creditspreads.new}
						footer={getFlooredFixed(
							Math.abs(data.creditspreads.new - data.creditspreads.old),
							3
						)}
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
					<Github />
				</Link>
				<i className={styles.footer_info}>
					Last updated:{' '}
					{new Date(parseInt(data.lastupdated)).toLocaleString('en-US', {
						hour: 'numeric',
						minute: 'numeric',
						second: 'numeric',
						hour12: true
					})}
				</i>
				<Link href="/citations" passHref>
					<Quote />
				</Link>
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
	const t = v + ''
	return t.slice(0, t.indexOf('.') + d)
}
