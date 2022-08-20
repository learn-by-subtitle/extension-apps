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
				test: /\.vue$/,
				loader: 'vue-loader'
			},
			{
				test: /\.ts?$/,
				loader: 'ts-loader',
				exclude: /node_modules/,
				options: {
					appendTsSuffixTo: [/\.vue$/]
				},
			},
			// this will apply to both plain `.css` files
			// AND `<style>` blocks in `.vue` files
			{
				test: /\.css$/,
				use: [
					'vue-style-loader',
					'css-loader',
					'postcss-loader',
				]
			},
			{
				test: /\.scss$/,
				use: [
					'vue-style-loader',
					'css-loader',
					'sass-loader',
				]
			}
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
		popup: './src/popup.ts',
	},

	output: {
		filename: '[name].js',
		path: path.resolve(__dirname, 'dist'),
	},

	watchOptions: {
		ignored: /node_modules/,
	},
};