const path = require('path');
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
	mode: 'development',
	devtool: false,

	module: {
		rules: [{
			test: /\.ts?$/,
			use: 'ts-loader',
			exclude: /node_modules/,
		}, ],
	},

	resolve: {
		extensions: ['.ts', '.js'],
	},

	plugins: [
		new CopyPlugin({
			patterns: [
				'static'
			],
		}),
	],

	entry: {
		index: './src/index.ts',
	},

	output: {
		filename: '[name].js',
		path: path.resolve(__dirname, 'dist'),
	},

	watchOptions: {
		ignored: /node_modules/,
	},
};