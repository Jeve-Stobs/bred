const cron = require('node-cron')
const shell = require('shelljs')
cron.schedule('*/10 * * * * *', function () {
	if (shell.exec('node index.js').code !== 0) {
		shell.exit(1)
	} else {
		shell.echo('Database backup complete')
	}
})
