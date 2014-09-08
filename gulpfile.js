var gulp = require('gulp'),
    gutil = require('gulp-util'),
    traceur = require('gulp-traceur'),
    webpack = require('webpack'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    sass = require('gulp-sass'),
    karma = require('gulp-karma');

////////

var NO_LIB = ['!bower_components/**/*.*', '!node_modules/**/*.*'];

/////////

var MODULES = [
	{
		file: 'amy-circuitboard.js',
		externals: ['jquery', 'jquery-ui']
	}, {
		file: 'amy-skin.js',
		externals: ['jquery', 'jquery-ui']
	}
];

/////////

gulp.task('traceur', function (callback) {
	gulp.src('src/**/*.js')
		  .pipe(traceur({
			  script: true,
			  sourceMaps: true
		  }))
		  .pipe(gulp.dest('.traceur-output'))
		  .on('end', callback);
});

function getWebpackCallback(cb) {
	return function webpackCallback(err, stats) {
		if (err) {
			throw new gutil.PluginError('webpack', err)
		}
		gutil.log(stats.toString({ colors: true }));
		cb();
	};
}

gulp.task('webpack', ['traceur'], function (callback) {
	MODULES.forEach(function (m) {
		var nCall = callback;
		callback = function () {
			webpack({
				entry: './.traceur-output/' + m.file,
				output: {
					path: './dist',
					filename: m.file,
					libraryTarget: 'umd'
				},
				externals: m.externals
			}, getWebpackCallback(nCall));
		};
	});
	callback();
});

gulp.task('uglify', ['webpack'], function (callback) {
	MODULES.forEach(function (m) {
		var nCall = callback;
		callback = function () {
			gulp.src('dist/' + m.file)
				  .pipe(uglify())
				  .pipe(rename({suffix: '.min'}))
				  .pipe(gulp.dest('dist'))
				  .on('end', nCall);
		};
	});
	callback();
});

gulp.task('sass', function (callback) {
	gulp.src(['**/*.scss'].concat(NO_LIB))
		  .pipe(sass())
		  .pipe(gulp.dest('.'))
		  .on('end', callback);
});

gulp.task('karma', ['webpack'], function () {
	return gulp.src([
		'bower_components/jquery/dist/jquery.js',
		'bower_components/jquery-ui/jquery-ui.js',
		'dist/**/*.min.js',
		'test/**/*.js'
	]).pipe(karma({ configFile: 'karma.conf.js' }));
});

gulp.task('build', ['traceur', 'webpack', 'uglify', 'sass']);

gulp.task('watch', function () {
	gulp.watch(['src/**/*.js'], ['build']);
	gulp.watch(['**/*.scss'].concat(NO_LIB), ['sass']);
});
