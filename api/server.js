const express = require('express')
const data = require('./data.json')
const app = express()
const port = 3002

app.listen(port, function (err) {
	if (err) {
		console.log('Error while starting server')
	} else {
		console.log('Server has been started at %d', port)
	}
})

app.get('/api/data', function (req, res) {
	res.json(data)
})
