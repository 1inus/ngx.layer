var path = require('path');
var webpack = require('webpack');

module.exports = {
	entry: {
		main: './app/main'
	},
	output: {
		path: path.resolve(__dirname, 'app/'),
		publicPath: 'app/',
		filename: 'main.pack.js'
	},
	module: {
		loaders: [{ test: /\.ts$/, loader: 'ts-loader' }],
		exprContextCritical: false,
	},
	resolve: {
		extensions: ['.js', '.ts']
	},
	plugins: [
		new webpack.BannerPlugin('created by liangwei<cnliangwei@foxmail.com>'),
		
		/* new webpack.optimize.UglifyJsPlugin({
			comments: false,
			compress: {warnings: false}
		}) */
	]
};