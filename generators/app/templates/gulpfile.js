var gulp = require('gulp');
var babel = require('gulp-babel');
var install = require('gulp-install');
var zip = require('gulp-zip');
var del = require('del');
var aws = require('./aws');

gulp.task('default', ['build']);

gulp.task('clean', function() {
	return del('temp');
});

gulp.task('build', ['clean', 'babel', 'copyAndInstall', 'zip']);

gulp.task('babel', function() {
	return gulp.src('src/**/*.js')
		.pipe(babel({
			presets: ['es2015']
		}))
		.pipe(gulp.dest('lib'));
});

gulp.task('copyAndInstall', ['clean', 'babel'], function() {
	var files = ['package.json', 'index.js', 'config.js', 'lib/**/*.js'];

	return gulp.src(files, {
			base: '.'
		})
		.pipe(gulp.dest('temp'))
		.pipe(install({
			production: true
		}));
});

gulp.task('zip', ['copyAndInstall', 'babel'], function() {
	return gulp.src('temp/**')
		.pipe(zip('build.zip'))
		.pipe(gulp.dest('dist'));
})



gulp.task('create', ['build'], function() {
	aws.createFunction();
});

gulp.task('deploy', ['build'], function() {
	aws.updateFunctionCode();
});

gulp.task('invoke', function() {
	aws.invoke();
});