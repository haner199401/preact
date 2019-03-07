/* eslint-disable */
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const preact = path.join(__dirname, '..', 'src');
const compat = path.join(__dirname, '..', 'compat', 'src');

module.exports = {
	context: __dirname,
	entry: './index',
	output: {
		publicPath: '/'
	},
	resolve: {
		alias: {
			["preact/debug"]: path.join(__dirname, '..', 'debug'),
			["preact/hooks"]: path.join(__dirname, '..', 'hooks', 'src'),
			preact: preact,
			react: compat,
			'react-dom': compat
		}
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				loader: 'babel-loader',
				options: {
					sourceMap: true,
					presets: [
						[require.resolve('@babel/preset-env'), {
							targets: {
								browsers: ['last 2 versions', 'IE >= 9']
							},
							modules: false,
							loose: true
						}],
						require.resolve('@babel/preset-react'),
					],
					plugins: [
						[require.resolve('@babel/plugin-transform-react-jsx'), { pragma: 'createElement', pragmaFrag: 'Fragment' }],
						require.resolve('@babel/plugin-proposal-class-properties'),
						require.resolve('@babel/plugin-transform-react-constant-elements'),
						[require.resolve('babel-plugin-jsx-pragmatic'), {
							module: 'preact',
							export: 'createElement',
							import: 'createElement'
						}]
					]
				}
			},
			{
				test: /\.s?css$/,
				use: [
					'style-loader',
					'css-loader',
					'sass-loader'
				]
			}
		]
	},
	devtool: 'inline-source-map',
	node: {
		process: 'mock',
		Buffer: false,
		setImmediate: false
	},
	devServer: {
		historyApiFallback: true
	},
	plugins: [
		new HtmlWebpackPlugin()
	]
};
