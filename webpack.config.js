var webpack           = require('webpack');
var path              = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var names = require('./modules.json');

function chunks(extra) {
	extra = extra || {};
	var result = {};
	names.forEach(function (name) {
		result[name] = (extra[name] || []).concat(['./src/' + name + '.es6.js']);
	});
	return result;
}

module.exports = {
	devtool: 'source-map',
	entry: chunks(),
	output: {
		path: './dist',
		filename: '[name].js',
		sourceMapFilename: '[file].map',
		libraryTarget: 'umd'
	},
	externals: [
		'jquery',
		'bluebird',
		'chroma-js',
		'd3',
		'delta-js',
		'kefir',
		'kefir-jquery',
		'three-js',
		'tweenjs',
		'velocity'
	],
	module: {
		loaders: [
			{ test: /\.es6\.js$/,    loader: 'babel'                       },
			{ test: /\.(scss|css)$/, loader: 'style!css!autoprefixer!sass' },
			{ test: /\.(png|jpg)$/,  loader: 'file'                        },
			{ test: /\.obj$/,        loader: 'file'                        },
			{ test: /\.json$/,       loader: 'file'                        }
		]
	},
	resolve: {
		root: [
			path.join(__dirname, "node_modules"),
			path.join(__dirname, "bower_components")
		]
	},
	plugins: [
		new webpack.optimize.DedupePlugin(),
		new webpack.ResolverPlugin(
			new webpack.ResolverPlugin.DirectoryDescriptionFilePlugin("bower.json", ["main"])
		)
	]
};
