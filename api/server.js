const axios = require('axios').default
const fs = require('fs')
const { TradingViewAPI } = require('tradingview-scraper')

const tv = new TradingViewAPI()

const unemployment = axios.get(
	'https://api.bls.gov/publicAPI/v2/timeseries/data/LNS14000000.json?registrationkey=903887c141784882824c7f8cd7e1762c'
)
const realUnemployment = axios.get(
	'https://api.bls.gov/publicAPI/v2/timeseries/data/LNS13327709.json?registrationkey=903887c141784882824c7f8cd7e1762c'
)
const US10Y = tv.getTicker('US10Y').catch((e) => console.log(e))
const US02Y = tv.getTicker('US02Y').catch((e) => console.log(e))

Promise.all([US10Y, US02Y, unemployment, realUnemployment]).then(function (json) {
	const tenYear = json[0].lp
	const twoYear = json[1].lp
	const unemployment = json[2].data.Results.series[0].data[0].value
	const realUnemployment = json[3].data.Results.series[0].data[0].value
	const doota = {
		US10Y: tenYear,
		US02Y: twoYear,
		unemployment: unemployment,
		realunemployment: realUnemployment
	}
	const data = '{ "data":' + JSON.stringify(doota) + '}'
	fs.writeFile('data.json', data, (err) => {
		if (err) {
			throw err
		}
		console.log('JSON data saved')
	})
})
