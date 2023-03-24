const Koa = require('koa');
const cors = require('@koa/cors');
const Router = require('@koa/router');
const bodyParser = require('koa-bodyparser');

require('dotenv').config({
	path: require('path').join(__dirname, '.env')
})

const axios = require('axios').default.create();

const app = new Koa();
const router = new Router();
app.use(cors())
app.use(bodyParser());

router.post('/translate', async ctx => {
	let key = process.env.GOOGLE_TRANSLAE_KEY;
	let url = `https://translation.googleapis.com/language/translate/v2?key=${key}`;

	const body = ctx.request.body;

	ctx.body = await axios.post(url, body)
		.then(res => res.data)
		.catch(err => {
			ctx.status = err.response.status
			return err.response.data;
		})
});

app
	.use(router.routes())
	.use(router.allowedMethods());

app.listen(8080);