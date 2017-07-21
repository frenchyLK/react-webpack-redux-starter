'use strict';

const webpack = require('webpack');

module.exports = (conf) => ({
	entry: [ 'react-hot-loader/patch' ],
	performance: {
		hints: false
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
    new webpack.HotModuleReplacementPlugin()
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
