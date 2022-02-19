const axios = require('axios').default
const fs = require('fs')
const { TradingViewAPI } = require('tradingview-scraper')

const tv = new TradingViewAPI()

const US10Y = tv.getTicker('US10Y').catch((e) => console.log(e))
const US02Y = tv.getTicker('US02Y').catch((e) => console.log(e))
const unemployment = axios.get(
	'https://api.bls.gov/publicAPI/v2/timeseries/data/LNS14000000.json?registrationkey=903887c141784882824c7f8cd7e1762c'
)
const realUnemployment = axios.get(
	'https://api.bls.gov/publicAPI/v2/timeseries/data/LNS13327709.json?registrationkey=903887c141784882824c7f8cd7e1762c'
)
const inflation = axios.get(
	'https://api.bls.gov/publicAPI/v2/timeseries/data/CUUR0000SA0.json?registrationkey=903887c141784882824c7f8cd7e1762c'
)
const realRates = axios.get(
	'https://api.stlouisfed.org/fred/series/observations?series_id=DFII10&api_key=efdd93997b860dfcef2d8b0806e110d5&file_type=json'
)
const policyUncertainty = axios.get(
	'https://api.stlouisfed.org/fred/series/observations?series_id=USEPUINDXD&api_key=efdd93997b860dfcef2d8b0806e110d5&file_type=json'
)
const alcoholUsage = axios.get(
	'https://api.stlouisfed.org/fred/series/observations?series_id=SMU06000004244530001&api_key=efdd93997b860dfcef2d8b0806e110d5&file_type=json'
)
Promise.all([
	US10Y,
	US02Y,
	unemployment,
	realUnemployment,
	inflation,
	realRates,
	policyUncertainty,
	alcoholUsage
]).then(function (json) {
	const tenYear = json[0].lp
	const twoYear = json[1].lp
	const unemployment = json[2].data.Results.series[0].data[0].value
	const realUnemployment = json[3].data.Results.series[0].data[0].value
	const cpiNew = json[4].data.Results.series[0].data[0].value
	const cpiOld = json[4].data.Results.series[0].data[12].value
	const cpiLastMonth = json[4].data.Results.series[0].data[1].value
	const realRates =
		json[5].data.observations[json[5].data.observations.length - 1].value
	const policyUncertaintyNew =
		json[6].data.observations[json[6].data.observations.length - 1].value
	const policyUncertaintyOld =
		json[6].data.observations[json[6].data.observations.length - 2].value
	const alcoholUsageNew =
		json[7].data.observations[json[7].data.observations.length - 1].value
	const alcoholUsageOld =
		json[7].data.observations[json[7].data.observations.length - 2].value
	const doota = {
		US10Y: tenYear,
		US02Y: twoYear,
		unemployment: unemployment,
		realunemployment: realUnemployment,
		cpiNew: cpiNew,
		cpiOld: cpiOld,
		cpiLastMonth: cpiLastMonth,
		realRates: realRates,
		policyUncertaintyNew: policyUncertaintyNew,
		policyUncertaintyOld: policyUncertaintyOld,
		alcoholUsageNew: alcoholUsageNew,
		alcoholUsageOld: alcoholUsageOld
	}
	const data = '{ "data":' + JSON.stringify(doota) + '}'
	fs.writeFile('data.json', data, (err) => {
		if (err) {
			throw err
		}
		console.log('JSON data saved')
	})
})
