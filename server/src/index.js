const {
	createRest
} = require('@modular-rest/server')

const path = require('path')

// Load .env file
require('dotenv').config({
	path: path.resolve(__dirname, '../.env')
});

// Create the rest server
// The createRest function returns a promise
const app = createRest({
	port: 8080,
	modulesPath: path.join(__dirname, 'modules'),
	staticPath: path.join(__dirname, 'assets'),
	mongo: {
		mongoBaseAddress: 'mongodb://localhost:27017',
		dbPrefix: 'mrest_',
	},
	onBeforeInit: (koaApp) => {
		// do something before init with the koa app
	},
	adminUser: {
		email: process.env.ADMIN_EMAIL,
		password: process.env.ADMIN_PASSWORD,
	},
	verificationCodeGeneratorMethod: function () {
		return '123456'
	},
})