'use strict';

const webpack = require('webpack');
const PATHS = require('./paths');

const CleanPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  output: {
    path: PATHS.build,
    publicPath: '/',
    filename: '[name].[hash].js'
  },
  module: {
    rules: [
      {
        test: /\.(scss|css|sass)?$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader?modules&localIdentName=[name]__[local]___[hash:base64:5]', 'sass-loader']
        })
      }
    ]
  },
	devtool: 'source-map',
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"production"'
    }),
    new CleanPlugin([PATHS.build], {
      root: process.cwd() // because Windows
    }),
    new ExtractTextPlugin({
      filename: 'styles/[name].[hash].css',
      allChunks: true
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: ({ resource }) => /node_modules/.test(resource)
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      beautify: false,
      mangle: {
        screw_ie8: true,
        keep_fnames: true
      },
      compress: {
        screw_ie8: true,
        warnings: false
      },
      comments: false
    })
  ]
};
