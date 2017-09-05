'use strict';

const PATHS = require('./paths');
const path = require('path');
const pkg = require('../package.json');
const webpack = require('webpack');

const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = (conf) => {

	const APP_CONFIG = {
		RELEASE: new Date().getTime(),
		VERSION: pkg.version,
		COGNITO_POOL_DETAILS: {
			UserPoolId: 'us-east-1_uZnV6X67E',
			ClientId: '7aecufhfkk4s81daar8dqhm141'
		}
	};

	return {
		entry: [ PATHS.src ],
		module: {
			rules: [
	      {
	        test: /\.jsx?$/,
	        use: 'eslint-loader',
	        include: [ PATHS.src ],
					enforce: 'pre'
	      },
				{
					test: /.(js|jsx)$/,
					include: [ PATHS.src ],
					use: 'babel-loader'
				},
				{
					test: /\.json$/,
					exclude: [ PATHS.translations ],
					use: 'json-loader'
				},
				{
					test: /\.json$/,
					include: [ PATHS.translations ],
					use: 'file-loader?name=[path][name].[ext]'
				},
				{
					test: /\.jpe?g$|\.gif$|\.png$/,
					use: 'file-loader?name=/images/[name].[hash].[ext]'
				},
				{
					test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
					use: 'url-loader?limit=10000&mimetype=application/font-woff&name=/fonts/[name].[hash].[ext]'
				},
				{
					test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
					use: 'file-loader?name=/fonts/[name].[hash].[ext]'
				}
			]
		},
		resolve: {
			extensions: ['.js', '.jsx', '.scss'],
			modules: [ PATHS.src, PATHS.node_modules, PATHS.translations ]
		},
		externals: {
			'APP_CONFIG': JSON.stringify(APP_CONFIG)
		},
		plugins: [
			new webpack.NamedModulesPlugin(),
			new HtmlWebpackPlugin({
				template: 'node_modules/html-webpack-template/index.ejs',
				inject: false,
				env: process.env,
				title: 'Hello React',
				baseHref: '/',
	      appMountId: 'app',
				favicon: './favicon.ico'
			})
		]
	}
}
