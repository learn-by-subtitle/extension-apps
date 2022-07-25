const path = require('path');
const CopyPlugin = require("copy-webpack-plugin");
const {
	VueLoaderPlugin
} = require('vue-loader')


module.exports = {
	mode: 'development',
	devtool: false,

	module: {
		rules: [
			//
			{
				test: /\.ts?$/,
				use: 'ts-loader',
				exclude: /node_modules/,
			},
			{
				test: /\.vue$/,
				loader: 'vue-loader'
			},
			// this will apply to both plain `.css` files
			// AND `<style>` blocks in `.vue` files
			{
				test: /\.css$/,
				use: [
					'vue-style-loader',
					'css-loader'
				]
			},
		],
	},

	resolve: {
		extensions: ['.ts', '.js'],
	},

	plugins: [
		new VueLoaderPlugin(),
		new CopyPlugin({
			patterns: [
				'static'
			],
		}),
	],

	entry: {
		main: './src/main.ts',
	},

	output: {
		filename: '[name].js',
		path: path.resolve(__dirname, 'dist'),
	},

	watchOptions: {
		ignored: /node_modules/,
	},
};