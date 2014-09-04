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

gulp.task('traceur', function (callback) {
	gulp.src('src/**/*.js')
		  .pipe(traceur({
			  script: true,
			  sourceMaps: true
		  }))
		  .pipe(gulp.dest('dist'))
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

gulp.task('webpack:amd', ['traceur'], function (callback) {
	webpack({
		entry: './dist/amy-circuitboard.js',
		output: {
			path: './dist/amd',
			filename: 'amy-core.js',
			libraryTarget: 'amd'
		},
		externals: ['jquery', 'jquery-ui']
	}, getWebpackCallback(callback))
});
gulp.task('webpack:var', ['traceur'], function (callback) {
	webpack({
		entry: './dist/amy-circuitboard.js',
		output: {
			path: './dist/var',
			filename: 'amy-core.js',
			libraryTarget: 'var'
		},
		externals: {'jquery': 'jQuery', 'jquery-ui': 'jQuery'}
	}, getWebpackCallback(callback))
});

gulp.task('uglify', ['webpack:amd'], function (callback) {
	gulp.src('dist/amd/amy-core.js')
		  .pipe(uglify())
		  .pipe(rename({suffix: '.min'}))
		  .pipe(gulp.dest('dist/amd'))
		  .on('end', callback);
});

gulp.task('sass', function (callback) {
	gulp.src(['**/*.scss'].concat(NO_LIB))
		  .pipe(sass())
		  .pipe(gulp.dest('.'))
		  .on('end', callback);
});

gulp.task('karma', ['webpack:var'], function () {
	return gulp.src([
		'bower_components/jquery/dist/jquery.js',
		'bower_components/jquery-ui/jquery-ui.js',
		'dist/var/**/*.js',
		'test/**/*.js'
	])
		  .pipe(karma({ configFile: 'karma.conf.js' }));
});

gulp.task('build', ['traceur', 'webpack:amd', 'uglify', 'sass']);

gulp.task('watch', function () {
	gulp.watch(['src/**/*.js'], ['build']);
	gulp.watch(['**/*.scss'].concat(NO_LIB), ['sass']);
});
