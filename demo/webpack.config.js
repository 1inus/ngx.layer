var path = require('path');
var webpack = require('webpack');

module.exports = {
	mode: 'production',
	entry: {
		main: './app/main'
	},
	optimization:{
		minimize:true
	},
	output: {
		path: path.resolve(__dirname, 'app/'),
		filename: 'main.pack.js'
	},
	module: {
		rules: [{ test: /\.ts$/, loader: 'ts-loader' }],
		exprContextCritical: false,
	},
	resolve: {
		extensions: ['.js', '.ts']
	},
	plugins: [
		new webpack.BannerPlugin('created by liangwei<cnliangwei@foxmail.com>')
	]
};