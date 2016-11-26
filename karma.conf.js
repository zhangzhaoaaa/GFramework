var webpack = require('webpack');
var path = require('path');

module.exports = function(config) {
	config.set({
		frameworks: ['mocha','es6-shim'],
		files: [
			'./node_modules/jquery/dist/jquery.min.js',
			'./test/index.js'
		],
		preprocessors: { './test/index.js': ['webpack'] },
		reporters: ['mocha'],
		autoWatch: true,
		browsers: ['PhantomJS'],//Chrome
		singleRun: true,
		concurrency: Infinity,
		webpack: {
			resolve: {
				alias: {
					GMP: path.join(__dirname, 'src/index.js')
				}
			},
			module: {
				loaders: [
					{
						test: /\.js/,
						exclude: /node_modules/,
						loader: 'babel-loader'
					},
					{
						test: /\.html|\.css$/,
						loader: "html"
					}
				]
			},
			watch: true,
			plugins: [
				new webpack.DefinePlugin({
					'process.env': {
						NODE_ENV: '"development"'
					}
				})
			]
		},
		webpackServer: {
			noInfo: true
		}
	})
}
