var gulp = require('gulp'),
	gutil = require('gulp-util'),
	traceur = require('gulp-traceur'),
	webpack = require('webpack'),
	uglify = require('gulp-uglify'),
	rename = require('gulp-rename'),
	sass = require('gulp-sass'),
	karma = require('gulp-karma'),
	rimraf = require('rimraf'),
	sourcemaps = require('gulp-sourcemaps');

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function externalModule(modName, varName) {
	if (!varName) { return modName }
	var obj = {};
	obj[modName] = { root: varName, commonjs2: modName, commonjs: modName, amd: modName };
	return obj;
}

var EXTERNAL_MODULES = [
	externalModule('jquery', 'jQuery'),
	externalModule('bluebird', 'P'),
	externalModule('js-graph', 'JsGraph'),
	externalModule('jquery-ui')
];

var MODULES = [
	{ name: 'core', file: 'amy-circuitboard.js' },
	{ name: 'skin', file: 'amy-skin.js' },
	{ name: 'tilespacing', file: 'amy-tilespacing.js' }
];

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

gulp.task('clean-tmp', function (callback) {
	rimraf('./.intermediate-output', callback);
});

gulp.task('traceur', ['clean-tmp'], function (callback) {
	gulp.src('src/**/*.js')
		.pipe(sourcemaps.init())
		.pipe(traceur({
			script: true,
			sourceMaps: true
		}))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest('.intermediate-output'))
		.on('end', callback);
});

gulp.task('copy-styles', ['clean-tmp'], function (callback) {
	gulp.src('src/**/*.scss')
		.pipe(gulp.dest('.intermediate-output'))
		.on('end', callback);
});

MODULES.forEach(function (m) {
	gulp.task('webpack:' + m.name, ['traceur', 'copy-styles'], function (callback) {
		webpack({
			devtool: 'inline-source-map',
			entry: './.intermediate-output/' + m.file,
			output: {
				path: './dist',
				filename: m.file,
				libraryTarget: 'umd',
				sourceMapFilename: m.file+'.map'
			},
			externals: EXTERNAL_MODULES,
			module: {
				preLoaders: [
					{ test: /amy-.*\.js$/, loader: "source-map" }
				],
				loaders: [
					{ test: /\.scss$/, loader: "style!css!autoprefixer!sass" }
				]
			}
		}, function webpackCallback(err, stats) {
			if (err) { throw new gutil.PluginError('webpack', err) }
			gutil.log(stats.toString({ colors: true }));
			callback();
		});
	});
	gulp.task('uglify:' + m.name, ['webpack:' + m.name], function (callback) {
		gulp.src('dist/' + m.file)
			.pipe(uglify())
			.pipe(rename({suffix: '.min'}))
			.pipe(gulp.dest('dist'))
			.on('end', callback);
	});
	gulp.task('build:' + m.name, ['webpack:' + m.name, 'uglify:' + m.name]);
});

gulp.task('sass', function (callback) {
	gulp.src(['example/**/*.scss'])
		.pipe(sass())
		.pipe(gulp.dest('example'))
		.on('end', callback);
});

gulp.task('build', ['build:core', 'build:skin', 'build:tilespacing']);

gulp.task('build:example', ['build', 'sass']);

gulp.task('karma', ['build'], function () {
	return gulp.src([
		'bower_components/jquery/dist/jquery.js',
		'bower_components/jquery-ui/jquery-ui.js',
		'dist/**/*.min.js',
		'test/**/*.js'
	]).pipe(karma({ configFile: 'karma.conf.js' }));
});

gulp.task('watch', function () {
	gulp.watch(['src/**/*.js'], ['build']);
	gulp.watch(['example/**/*.scss'], ['sass']);
});
