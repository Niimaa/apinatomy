var gulp = require('gulp'),
    gutil = require('gulp-util'),
    jshint = require('gulp-jshint'),
	traceur = require('gulp-traceur'),
	webpack = require('webpack'),
	uglify = require('gulp-uglify'),
	rename = require('gulp-rename'),
	sass = require('gulp-sass'),
	karma = require('gulp-karma'),
	rimraf = require('rimraf'),
	sourcemaps = require('gulp-sourcemaps'),
	bump = require('gulp-bump');

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function externalModule(modName, varName) {
	if (!varName) { return modName }
	var obj = {};
	obj[modName] = { root: varName, commonjs2: modName, commonjs: modName, amd: modName };
	return obj;
}

function logAndKeepGoing(stream) {
	return function (e) { gutil.log(gutil.colors.red(e)); (stream || this).end(); }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

var EXTERNAL_MODULES = [
	externalModule('jquery', 'jQuery'),
	externalModule('bluebird', 'P'),
	externalModule('js-graph', 'JsGraph'),
	externalModule('jquery-ui')
];

var MODULES = [
	{ name: 'core', file: 'amy-circuitboard.js' },
	{ name: 'p-tileskin', file: 'amy-p-tileskin.js' },
	{ name: 'p-tilespacing', file: 'amy-p-tilespacing.js' },
	{ name: 'p-click-to-open', file: 'amy-p-click-to-open.js' }
];

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

gulp.task('lint', function () {
	return gulp.src('src/**/*.js')
		.pipe(jshint())
		.pipe(jshint.reporter('jshint-stylish'))
		.pipe(jshint.reporter('fail'));
});

gulp.task('clean-tmp', function (callback) {
	rimraf('./.intermediate-output', callback);
});

gulp.task('traceur', ['clean-tmp', 'lint'], function () {
	return gulp.src('src/**/*.js')
		.pipe(sourcemaps.init())
		.pipe(traceur({
			script: true,
			sourceMaps: true
		}))
		.on('error', logAndKeepGoing())
		.pipe(sourcemaps.write())
		.pipe(gulp.dest('.intermediate-output'));
});

gulp.task('copy-styles', ['clean-tmp'], function () {
	return gulp.src('src/**/*.scss')
		.pipe(gulp.dest('.intermediate-output'));
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
	gulp.task('uglify:' + m.name, ['webpack:' + m.name], function () {
		return gulp.src('dist/' + m.file)
			.pipe(uglify())
			.pipe(rename({suffix: '.min'}))
			.pipe(gulp.dest('dist'));
	});
	gulp.task('build:' + m.name, ['webpack:' + m.name, 'uglify:' + m.name]);
});

gulp.task('sass', function () {
	var stream = gulp.src(['example/**/*.scss']);
	return stream.pipe(sass({ onError: logAndKeepGoing(stream) }))
		.pipe(gulp.dest('example'));
});

gulp.task('build', ['build:core', 'build:p-tileskin', 'build:p-tilespacing', 'build:p-click-to-open']);

gulp.task('build:example', ['build', 'sass']);

gulp.task('karma', ['build'], function () {
	return gulp.src([
		'bower_components/jquery/dist/jquery.js',
		'bower_components/jquery-ui/jquery-ui.js',
		'dist/**/*.min.js',
		'test/**/*.js'
	]).pipe(karma({ configFile: 'karma.conf.js' }));
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

gulp.task('watch', function () {
	gulp.watch(['src/**/*.js'], ['build']);
	gulp.watch(['example/**/*.scss'], ['sass']);
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

['major', 'minor', 'patch', 'prerelease'].forEach(function (type) {
	gulp.task('bump:'+type, function () {
		return gulp.src(['package.json', 'bower.json'])
			.pipe(bump({ type: type }))
			.pipe(gulp.dest('./'));
	});
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

gulp.task('default', ['build:example', 'watch']);
