'use strict';

const merge = require('webpack-merge');

module.exports = (conf) => {
	const env = conf.env;

	process.env.BABEL_ENV = env;

	const common = require('./webpack-config/common')(conf);

	if(env === 'development' || !env) {
		// these are flipped for react-hot-loader entry order requirements
		return merge(require('./webpack-config/dev')(conf), common);
	}

	if(env === 'test') {
		return merge(common, require('./webpack-config/test')(conf));
	}

	if(env === 'stats') {
		return merge(common, require('./webpack-config/build')(conf), require('./webpack-config/analyze')(conf));
	}

	return merge(common, require('./webpack-config/build')(conf));
};
