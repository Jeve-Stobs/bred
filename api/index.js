const axios = require('axios').default
const fs = require('fs')
const { TradingViewAPI } = require('tradingview-scraper')
require('dotenv').config()

const tv = new TradingViewAPI()
function getData() {
	const a = tv.getTicker('US10Y').catch((e) => console.log(e))
	const b = tv.getTicker('US02Y').catch((e) => console.log(e))
	const c = axios.get(
		`https://api.bls.gov/publicAPI/v2/timeseries/data/LNS14000000.json?registrationkey=${process.env.BLS_API_KEY}`
	)
	const d = axios.get(
		`https://api.bls.gov/publicAPI/v2/timeseries/data/LNS13327709.json?registrationkey=${process.env.BLS_API_KEY}`
	)
	const e = axios.get(
		`https://api.bls.gov/publicAPI/v2/timeseries/data/CUUR0000SA0.json?registrationkey=${process.env.BLS_API_KEY}`
	)
	const f = axios.get(
		`https://api.stlouisfed.org/fred/series/observations?series_id=DFII10&api_key=${process.env.FRED_API_KEY}&file_type=json`
	)
	const g = axios.get(
		`https://api.stlouisfed.org/fred/series/observations?series_id=USEPUINDXD&api_key=${process.env.FRED_API_KEY}&file_type=json`
	)
	const h = axios.get(
		`https://api.stlouisfed.org/fred/series/observations?series_id=SMU06000004244530001&api_key=${process.env.FRED_API_KEY}&file_type=json`
	)
	const i = axios.get(
		`https://api.stlouisfed.org/fred/series/observations?series_id=ICSA&api_key=${process.env.FRED_API_KEY}&file_type=json`
	)
	const j = axios.get(
		`https://api.stlouisfed.org/fred/series/observations?series_id=PAYEMS&api_key=${process.env.FRED_API_KEY}&file_type=json`
	)
	Promise.all([a, b, c, d, e, f, g, h, i, j]).then(function (json) {
		const a = json[0].lp
		const a1 = json[0].prev_close_price
		const b = json[1].lp
		const b1 = json[1].prev_close_price
		const c = json[2].data.Results.series[0].data[0].value
		const d = json[3].data.Results.series[0].data[0].value
		const e = json[4].data.Results.series[0].data[0].value
		const f = json[4].data.Results.series[0].data[12].value
		const g = json[4].data.Results.series[0].data[1].value
		const h =
			json[5].data.observations[json[5].data.observations.length - 1].value
		const h1 =
			json[5].data.observations[json[5].data.observations.length - 2].value
		const i =
			json[6].data.observations[json[6].data.observations.length - 1].value
		const j =
			json[6].data.observations[json[6].data.observations.length - 2].value
		const k =
			json[7].data.observations[json[7].data.observations.length - 1].value
		const l =
			json[7].data.observations[json[7].data.observations.length - 2].value
		const m = json[2].data.Results.series[0].data[1].value
		const n =
			json[8].data.observations[json[8].data.observations.length - 1].value
		const o =
			json[8].data.observations[json[8].data.observations.length - 2].value
		const p =
			json[9].data.observations[json[9].data.observations.length - 1].value
		const q =
			json[9].data.observations[json[9].data.observations.length - 2].value
		const index = {
			US10Y: {
				value: a,
				previous: a1
			},
			US02Y: {
				value: b,
				previous: b1
			},
			unemployment: {
				fudged: c,
				real: d,
				lastMonth: m
			},
			cpi: {
				new: e,
				old: f,
				lastMonth: g
			},
			realRates: {
				new: h,
				old: h1
			},
			policy: {
				new: i,
				old: j
			},
			alcohol: {
				new: k,
				old: l
			},
			claims: {
				new: n,
				old: o
			},
			payroll: {
				new: p,
				old: q
			}
		}
		const data = '{ "data":' + JSON.stringify(index) + '}'
		fs.writeFile('data.json', data, (err) => {
			if (err) {
				throw err
			}
			console.log('JSON data saved')
		})
	})
}
setInterval(getData, 1000)
