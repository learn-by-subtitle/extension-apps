let Router = require('koa-router');

const {
	reply,
	getCollection,
} = require('@modular-rest/server')

let name = 'flower';
let backup = new Router();

backup.get('/', async (ctx) => {
	ctx.body = reply.create('s', {
		message: 'Your student module is working!'
	});
});

backup.get('/list', async (ctx) => {
	try {
		let collection = getCollection('flower', 'wildflowers');
		let result = await collection.find({}).exec();

		ctx.body = reply.create('s', {
			data: result
		});
	} catch (err) {
		ctx.code = 500;
		ctx.body = reply.create('e', {
			message: err.message || 'Something went wrong'
		});
	}
});

module.exports.name = name;
module.exports.main = backup;