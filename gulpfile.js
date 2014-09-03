var gulp = require('gulp'),
    gutil = require('gulp-util'),
    traceur = require('gulp-traceur'),
    webpack = require('webpack'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    rimraf = require('rimraf');

gulp.task('traceur', function (callback) {
	gulp.src('src/**/*.js')
		  .pipe(traceur({
			  script: true,
			  sourceMaps: true
		  }))
		  .pipe(gulp.dest('tmp-build'))
		  .on('end', callback);
});

gulp.task('webpack', ['traceur'], function (callback) {
	webpack({
		entry: './tmp-build/amy-circuitboard.js',
		output: {
			path: './dist',
			filename: 'amy-core.js',
			libraryTarget: 'amd'
		},
		externals: ['jquery', 'jquery-ui']
	}, function (err, stats) {
		if (err) { throw new gutil.PluginError('webpack', err) }
		gutil.log(stats.toString({ colors: true }));
		callback();
	})
});

gulp.task('uglify', ['webpack'], function (callback) {
	gulp.src('./dist/amy-core.js')
		  .pipe(uglify())
		  .pipe(rename({suffix: '.min'}))
		  .on('end', callback);
});

gulp.task('clean-tmp', ['traceur', 'webpack'], function (callback) {
	rimraf('tmp-build', callback);
});

gulp.task('build', ['traceur', 'webpack', 'uglify', 'clean-tmp']);

gulp.task('watch', function () {
	gulp.watch(['**/*.js', '!bower_components/**/*.*', '!node_modules/**/*.*'], ['traceur', 'webpack']);
});
