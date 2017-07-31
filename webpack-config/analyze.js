'use strict';

const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = (conf) => ({
	plugins: [
    new BundleAnalyzerPlugin({
      analyzerMode: 'server',
      analyzerPort: 8888,
      reportFilename: 'report.html',
      openAnalyzer: true,
      generateStatsFile: true,
      statsFilename: 'stats.json',
      statsOptions: null,
      logLevel: 'info'
    })
  ]
});
