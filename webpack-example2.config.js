var webpack = require('webpack');
var path    = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	devtool: 'source-map',
	entry: { 'example2': ['./src/example2/example2.es6.js'] },
	output: {
		path: './dist/example2',
		filename: '[name].js',
		sourceMapFilename: '[file].map'
	},
	module: {
		loaders: [
			{ test: /\.es6\.js$/,    loader: 'babel'                       },
			{ test: /\.(scss|css)$/, loader: 'style!css!autoprefixer!sass' },
			{ test: /\.(png|jpg)$/,  loader: 'url'                         },
			{ test: /\.obj$/,        loader: 'file'                        },
			{ test: /\.json$/,       loader: 'file'                        },
			{ test: /\.JSON$/,       loader: 'json'                        }
		]
	},
	resolve: {
		root: [
			path.join(__dirname, "node_modules"),
			path.join(__dirname, "bower_components")
		],
		alias: {
			'delta-js$':     'delta.js/dist/delta.full.js',
			'three-js$':     'three.js',
			'velocity':      'velocity/velocity.js'
		}
	},
	plugins: [
		new webpack.optimize.DedupePlugin(),
		new webpack.ResolverPlugin(
			new webpack.ResolverPlugin.DirectoryDescriptionFilePlugin("bower.json", ["main"])
		),
		new HtmlWebpackPlugin({
			template: './src/example2/example2.html',
			filename: 'example2.html'
		})
	]
};
