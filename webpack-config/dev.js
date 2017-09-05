'use strict';

const webpack = require('webpack');

module.exports = (conf) => ({
	entry: [
		'react-hot-loader/patch',
		'webpack-dev-server/client?https://localhost:8080',
		'webpack/hot/only-dev-server'
	],
	performance: {
		hints: false
	},
	output: {
		publicPath: '/'
	},
	module: {
		rules: [
			{
				test: /\.(css|scss)$/,
				use: ['style-loader', 'css-loader?modules&localIdentName=[name]__[local]___[hash:base64:5]', 'sass-loader']
			}
		]
	},
	plugins: [
    new webpack.HotModuleReplacementPlugin(),
		new webpack.NoEmitOnErrorsPlugin(),
		new webpack.NamedModulesPlugin()
	],
	devtool: 'source-map',
	devServer: {
		historyApiFallback: true,
		https: true,
		hot: true,
    inline: true,
		stats: {
			colors: true,
			chunks: false,
			children: false
		}
	}
})
